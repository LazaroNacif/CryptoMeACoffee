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

// Load environment variables
dotenv.config();

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
  process.env.CORS_ORIGIN
].filter(Boolean);

app.use(cors({
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
  credentials: true
}));

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
  console.error('❌ Error: WALLET_ADDRESS is required in .env file');
  process.exit(1);
}

console.log('🚀 Starting CryptoMeACoffee Server...');
console.log('📍 Network:', process.env.NETWORK);
console.log('💰 Wallet Address:', process.env.WALLET_ADDRESS);
console.log('🌐 Facilitator:', process.env.FACILITATOR_URL);

// Email configuration (optional)
let emailTransporter = null;
if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  emailTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  console.log('📧 Email notifications enabled');
} else {
  console.log('📧 Email notifications disabled (configure EMAIL_* in .env to enable)');
}

// USDC Token addresses
const USDC_ADDRESSES = {
  'base-sepolia': '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  'base': '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
};

// Rate limiting for donation endpoint - prevent DOS attacks
const donationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 requests per window per IP
  message: {
    success: false,
    error: 'Too many donation attempts. Please try again later.'
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
    .escape() // Prevent XSS
];

// x402 Payment Middleware Configuration
// This middleware handles the 402 Payment Required protocol automatically
const network = process.env.NETWORK || 'base-sepolia';

// Add logging middleware before x402
app.use((req, res, next) => {
  if (req.path === '/api/donate' && req.method === 'POST') {
    console.log('\n📨 Incoming donation request:');
    console.log('  Headers:', JSON.stringify(req.headers, null, 2));
    if (req.headers['x-payment']) {
      console.log('  X-PAYMENT (raw):', req.headers['x-payment'].substring(0, 100) + '...');
      try {
        const decoded = JSON.parse(Buffer.from(req.headers['x-payment'], 'base64').toString());
        console.log('  X-PAYMENT (decoded):', JSON.stringify(decoded, null, 2));
      } catch (e) {
        console.log('  X-PAYMENT decode error:', e.message);
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
    const amount = originalBody?.amount || 1.00;

    // Dynamically configure x402 middleware for this request
    const dynamicConfig = {
      [`POST /api/donate`]: {
        price: `$${amount.toFixed(2)}`,
        network: network,
        asset: {
          address: USDC_ADDRESSES[network],
          symbol: 'USDC',
          decimals: 6
        },
        extra: {
          name: 'USDC',
          version: '2'
        },
        description: `CryptoMeACoffee donation of $${amount.toFixed(2)} - Thank you for your support!`,
        discoverable: false // Don't list dynamic amounts in bazaar
      }
    };

    // Apply dynamic middleware
    const dynamicMiddleware = paymentMiddleware(
      process.env.WALLET_ADDRESS,
      dynamicConfig,
      {
        url: process.env.FACILITATOR_URL || 'https://x402.org/facilitator'
      }
    );

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
      errors: errors.array()
    });
  }

  const { amount, message } = req.body;

  console.log('✅ Payment verified and accepted!');
  console.log('💵 Amount:', amount);
  console.log('💬 Message:', message || 'No message');

  // Send email notification asynchronously (non-blocking)
  if (emailTransporter && process.env.NOTIFICATION_EMAIL) {
    // Sanitize message to prevent XSS in email
    const sanitizedMessage = DOMPurify.sanitize(message || 'No message');

    emailTransporter.sendMail({
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
      `
    })
      .then(() => console.log('📧 Email notification sent to', process.env.NOTIFICATION_EMAIL))
      .catch(emailError => console.error('❌ Failed to send email notification:', emailError.message));
  }

  // TODO: Here you can add additional logic:
  // - Store donation in database
  // - Trigger webhooks
  // - Update analytics

  res.json({
    success: true,
    message: 'Thank you for your donation!',
    amount: amount,
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    network: process.env.NETWORK,
    walletAddress: process.env.WALLET_ADDRESS
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'CryptoMeACoffee Server',
    version: '1.0.0',
    network: process.env.NETWORK,
    endpoints: {
      donate: 'POST /api/donate',
      health: 'GET /health'
    },
    documentation: 'https://github.com/yourusername/cryptomeacoffee'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n✅ Server running!');
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`📡 Endpoints:`);
  console.log(`   - POST http://localhost:${PORT}/api/donate`);
  console.log(`   - GET  http://localhost:${PORT}/health`);
  console.log('\n💡 Ready to accept donations via x402 protocol!\n');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  process.exit(0);
});
