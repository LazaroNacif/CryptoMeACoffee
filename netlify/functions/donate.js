/**
 * CryptoMeACoffee Netlify Serverless Function
 * Handles crypto donations via x402 protocol
 * Updated: CORS configuration with origin trimming for GitHub Pages
 */

import { paymentMiddleware } from 'x402-express';
import nodemailer from 'nodemailer';
import { body, validationResult } from 'express-validator';

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
  console.log('✅ Email notifications enabled');
}

// USDC Token addresses
const USDC_ADDRESSES = {
  'base-sepolia': '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  base: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
};

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
    .escape(),
];

/**
 * Netlify serverless function handler
 * Handles x402 payment verification and donation processing
 */
export async function handler(event) {
  // CORS headers
  const origin = event.headers.origin;
  const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map(o => o.trim()) || [];

  const corsHeaders = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Payment',
    'Access-Control-Allow-Credentials': 'true',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
  };

  if (allowedOrigins.includes(origin)) {
    corsHeaders['Access-Control-Allow-Origin'] = origin;
  }

  // Handle OPTIONS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const requestBody = JSON.parse(event.body || '{}');

    // Get network configuration
    const network = process.env.NETWORK || 'base-sepolia';
    const amount = requestBody?.amount || 1.0;

    console.log('📥 Incoming donation request', {
      amount,
      hasPayment: !!event.headers['x-payment'],
      network,
    });

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
        discoverable: false,
      },
    };

    // Create mock Express-compatible request/response objects for x402 middleware
    const mockReq = {
      method: 'POST',
      path: '/api/donate',
      headers: event.headers || {},
      body: requestBody,
      // Express compatibility methods
      header: function(name) {
        return this.headers[name.toLowerCase()];
      },
      get: function(name) {
        return this.header(name);
      },
    };

    let mockResStatusCode = 200;
    let mockResBody = null;
    const mockResHeaders = {};
    let middlewareResolved = false;
    let middlewareResolve, middlewareReject;

    const middlewarePromise = new Promise((resolve, reject) => {
      middlewareResolve = resolve;
      middlewareReject = reject;
    });

    const mockRes = {
      status: (code) => {
        mockResStatusCode = code;
        return mockRes;
      },
      json: (data) => {
        mockResBody = data;
        if (!middlewareResolved) {
          middlewareResolved = true;
          middlewareResolve();
        }
        return mockRes;
      },
      setHeader: (key, value) => {
        mockResHeaders[key] = value;
        return mockRes;
      },
      end: () => {
        if (!middlewareResolved) {
          middlewareResolved = true;
          middlewareResolve();
        }
        return mockRes;
      },
    };

    // Apply x402 payment middleware
    const x402Middleware = paymentMiddleware(process.env.WALLET_ADDRESS, dynamicConfig, {
      url: process.env.FACILITATOR_URL || 'https://x402.org/facilitator',
    });

    // Wrap x402 middleware for Netlify
    x402Middleware(mockReq, mockRes, (error) => {
      if (error && !middlewareResolved) {
        middlewareResolved = true;
        middlewareReject(error);
      } else if (!middlewareResolved) {
        middlewareResolved = true;
        middlewareResolve();
      }
    });

    await middlewarePromise;

    // Check if x402 middleware sent a 402 response
    if (mockResStatusCode === 402) {
      return {
        statusCode: 402,
        headers: { ...corsHeaders, ...mockResHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(mockResBody),
      };
    }

    // If we got here, payment was verified by x402 middleware
    console.log('✅ Payment verified successfully');

    // Run validation
    mockReq.body = requestBody; // Ensure body is set for validation
    for (const validation of validateDonation) {
      await validation.run(mockReq);
    }

    const errors = validationResult(mockReq);
    if (!errors.isEmpty()) {
      console.log('❌ Validation failed', errors.array());
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          errors: errors.array(),
        }),
      };
    }

    const { message } = requestBody;

    // Send email notification asynchronously (non-blocking)
    // Note: message is already sanitized by express-validator's .escape()
    if (emailTransporter && process.env.NOTIFICATION_EMAIL) {
      const sanitizedMessage = message || 'No message';

      emailTransporter
        .sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.NOTIFICATION_EMAIL,
          subject: `💰 New Donation: $${amount} USDC`,
          html: `
          <h2>New Donation Received!</h2>
          <p><strong>Amount:</strong> $${amount} USDC</p>
          <p><strong>Message:</strong> ${sanitizedMessage}</p>
          <p><strong>Network:</strong> ${network}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <hr>
          <p><em>Powered by CryptoMeACoffee</em></p>
        `,
          text: `
New Donation Received!

Amount: $${amount} USDC
Message: ${message || 'No message'}
Network: ${network}
Timestamp: ${new Date().toISOString()}

Powered by CryptoMeACoffee
        `,
        })
        .then(() => console.log('📧 Email notification sent'))
        .catch((emailError) => console.error('❌ Failed to send email:', emailError.message));
    }

    // Return success response
    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Thank you for your donation!',
        amount: amount,
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error('❌ Server error:', error);

    // Don't expose internal errors in production
    const errorResponse = {
      success: false,
      error:
        process.env.NODE_ENV === 'production'
          ? 'An error occurred. Please try again later.'
          : error.message || 'Internal server error',
    };

    if (process.env.NODE_ENV !== 'production') {
      errorResponse.stack = error.stack;
    }

    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify(errorResponse),
    };
  }
}
