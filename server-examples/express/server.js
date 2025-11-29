/**
 * CryptoMeACoffee Express Server
 * Handles crypto donations via x402 protocol
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { paymentMiddleware } from 'x402-express';
import nodemailer from 'nodemailer';
import DOMPurify from 'isomorphic-dompurify';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { logger } from './logger.js';

// Load environment variables
dotenv.config();

// Initialize Sentry (optional, only if DSN is provided)
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: isProduction ? 0.1 : 1.0,
    profilesSampleRate: 1.0,
  });
  logger.info('Sentry error tracking initialized');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - with strict false to allow multiple reads
app.use(express.json({ strict: false }));

// Request sanitization - prevent NoSQL injection and XSS
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS in request data

// CORS Configuration - Allow multiple origins
const allowedOrigins = [
  'http://localhost:3001', // Next.js
  'http://localhost:5173', // Vite
  'http://localhost:8000', // Other
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // In production, require origin header for security
      if (!origin && process.env.NODE_ENV === 'production') {
        return callback(new Error('Origin header required'));
      }

      // Allow localhost in development (no origin header)
      if (!origin && process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// HTTPS enforcement in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      return res.redirect(301, `https://${req.header('host')}${req.url}`);
    }
    next();
  });
}

// Validate required environment variables
if (!process.env.WALLET_ADDRESS) {
  logger.error('WALLET_ADDRESS is required in .env file');
  process.exit(1);
}

logger.info('Starting CryptoMeACoffee Server', {
  network: process.env.NETWORK,
  walletAddress: process.env.WALLET_ADDRESS,
  facilitator: process.env.FACILITATOR_URL,
  environment: process.env.NODE_ENV || 'development',
});

// Email configuration (optional)
let emailTransporter = null;
if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  emailTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  logger.info('Email notifications enabled', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || '587',
  });
} else {
  logger.info('Email notifications disabled (configure EMAIL_* in .env to enable)');
}

// USDC Token addresses
const USDC_ADDRESSES = {
  'base-sepolia': '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  base: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
};

// Rate limiting for donation endpoint - prevent DOS attacks
const donationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 requests per window per IP
  message: {
    success: false,
    error: 'Too many donation attempts. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting for successful payments
  skip: (req, res) => res.statusCode < 400,
});

// Input validation for donation endpoint
const validateDonation = [
  body('amount')
    .isFloat({ min: 0.01, max: 1000000 })
    .withMessage('Amount must be between $0.01 and $1,000,000'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Message must be 500 characters or less')
    .escape(), // Prevent XSS
];

// x402 Payment Middleware Configuration
// This middleware handles the 402 Payment Required protocol automatically
const network = process.env.NETWORK || 'base-sepolia';

// Add logging middleware before x402
app.use((req, res, next) => {
  if (req.path === '/api/donate' && req.method === 'POST') {
    logger.info('Incoming donation request', {
      path: req.path,
      method: req.method,
      hasPayment: !!req.headers['x-payment'],
    });

    if (req.headers['x-payment'] && isDevelopment) {
      try {
        const decoded = JSON.parse(Buffer.from(req.headers['x-payment'], 'base64').toString());
        logger.debug('X-PAYMENT decoded', { payment: decoded });
      } catch (e) {
        logger.warn('X-PAYMENT decode error', { error: e.message });
      }
    }
  }
  next();
});

// Custom middleware to handle dynamic pricing for donations
app.use((req, res, next) => {
  if (req.path === '/api/donate' && req.method === 'POST') {
    // Store original body for later use
    const originalBody = req.body;
    const amount = originalBody?.amount || 1.0;

    // Dynamically configure x402 middleware for this request
    const dynamicConfig = {
      ['POST /api/donate']: {
        price: `$${amount.toFixed(2)}`,
        network: network,
        asset: {
          address: USDC_ADDRESSES[network],
          symbol: 'USDC',
          decimals: 6,
        },
        extra: {
          name: 'USDC',
          version: '2',
        },
        description: `CryptoMeACoffee donation of $${amount.toFixed(2)} - Thank you for your support!`,
        discoverable: false, // Don't list dynamic amounts in bazaar
      },
    };

    // Apply dynamic middleware
    const dynamicMiddleware = paymentMiddleware(process.env.WALLET_ADDRESS, dynamicConfig, {
      url: process.env.FACILITATOR_URL || 'https://x402.org/facilitator',
    });

    // Wrap next to restore body after x402 middleware
    return dynamicMiddleware(req, res, (err) => {
      // Restore original body in case x402 middleware consumed it
      req.body = originalBody;
      next(err);
    });
  }

  next();
});

// Donation endpoint
// This is only reached if payment verification succeeds
app.post('/api/donate', donationLimiter, validateDonation, async (req, res) => {
  // Check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { amount, message } = req.body;

  logger.donation(amount, message, {
    timestamp: new Date().toISOString(),
    ip: req.ip,
  });

  // Send email notification asynchronously (non-blocking)
  if (emailTransporter && process.env.NOTIFICATION_EMAIL) {
    // Sanitize message to prevent XSS in email
    const sanitizedMessage = DOMPurify.sanitize(message || 'No message');

    emailTransporter
      .sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.NOTIFICATION_EMAIL,
        subject: `💰 New Donation: $${amount} USDC`,
        html: `
        <h2>New Donation Received!</h2>
        <p><strong>Amount:</strong> $${amount} USDC</p>
        <p><strong>Message:</strong> ${sanitizedMessage}</p>
        <p><strong>Network:</strong> ${process.env.NETWORK}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <hr>
        <p><em>Powered by CryptoMeACoffee</em></p>
      `,
        text: `
New Donation Received!

Amount: $${amount} USDC
Message: ${message || 'No message'}
Network: ${process.env.NETWORK}
Timestamp: ${new Date().toISOString()}

Powered by CryptoMeACoffee
      `,
      })
      .then(() => logger.info('Email notification sent', { to: process.env.NOTIFICATION_EMAIL }))
      .catch((emailError) =>
        logger.error('Failed to send email notification', { error: emailError.message })
      );
  }

  // TODO: Here you can add additional logic:
  // - Store donation in database
  // - Trigger webhooks
  // - Update analytics

  res.json({
    success: true,
    message: 'Thank you for your donation!',
    amount: amount,
    timestamp: new Date().toISOString(),
  });
});

// Enhanced health check endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.1.0',
    checks: {},
  };

  // Check x402 facilitator availability
  try {
    const facilitatorUrl = process.env.FACILITATOR_URL || 'https://x402.org/facilitator';
    const facilitatorCheck = await fetch(facilitatorUrl, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });
    health.checks.facilitator = facilitatorCheck.ok ? 'ok' : 'degraded';
  } catch (error) {
    health.checks.facilitator = 'down';
    health.status = 'degraded';
    logger.warn('Facilitator health check failed', { error: error.message });
  }

  // Check email service
  health.checks.email = emailTransporter ? 'configured' : 'disabled';

  // Check environment configuration
  health.checks.config = {
    wallet: !!process.env.WALLET_ADDRESS,
    network: !!process.env.NETWORK,
    facilitator: !!process.env.FACILITATOR_URL,
  };

  const allOk = health.status === 'ok' && health.checks.facilitator !== 'down';
  res.status(allOk ? 200 : 503).json(health);
});

// Readiness check for Kubernetes/Docker
app.get('/ready', (req, res) => {
  res.status(200).json({ ready: true });
});

// Liveness check
app.get('/live', (req, res) => {
  res.status(200).json({ alive: true });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'CryptoMeACoffee Server',
    version: '1.0.0',
    network: process.env.NETWORK,
    endpoints: {
      donate: 'POST /api/donate',
      health: 'GET /health',
    },
    documentation: 'https://github.com/yourusername/cryptomeacoffee',
  });
});

// Sentry error handler (must be before other error handlers)
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// Error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error('Server error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Don't expose stack traces in production
  if (isProduction) {
    res.status(500).json({
      success: false,
      error: 'An error occurred. Please try again later.',
    });
  } else {
    res.status(500).json({
      success: false,
      error: err.message || 'Internal server error',
      stack: err.stack,
    });
  }
});

// Production-specific security headers
if (isProduction) {
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
  });
}

// Start server
const server = app.listen(PORT, () => {
  logger.info('Server started successfully', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      donate: `POST http://localhost:${PORT}/api/donate`,
      health: `GET http://localhost:${PORT}/health`,
      ready: `GET http://localhost:${PORT}/ready`,
      live: `GET http://localhost:${PORT}/live`,
    },
  });
});

// Graceful shutdown handler
const shutdown = (signal) => {
  logger.info(`Received ${signal}, closing server gracefully...`);

  server.close(() => {
    logger.info('HTTP server closed');

    // Close email transporter
    if (emailTransporter) {
      emailTransporter.close();
      logger.info('Email transporter closed');
    }

    logger.info('Graceful shutdown complete');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
