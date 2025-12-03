/**
 * CryptoMeACoffee Vercel Serverless Function
 * Handles crypto donations via x402 protocol
 */

import { paymentMiddleware } from 'x402-express';
import nodemailer from 'nodemailer';
import DOMPurify from 'isomorphic-dompurify';
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
 * Main serverless function handler
 * Handles x402 payment verification and donation processing
 */
export default async function handler(req, res) {
  // CORS handling
  const origin = req.headers.origin;
  const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [];

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Payment');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get network configuration
    const network = process.env.NETWORK || 'base-sepolia';
    const amount = req.body?.amount || 1.0;

    console.log('📥 Incoming donation request', {
      amount,
      hasPayment: !!req.headers['x-payment'],
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

    // Apply x402 payment middleware
    const x402Middleware = paymentMiddleware(process.env.WALLET_ADDRESS, dynamicConfig, {
      url: process.env.FACILITATOR_URL || 'https://x402.org/facilitator',
    });

    // Wrap x402 middleware for serverless
    await new Promise((resolve, reject) => {
      x402Middleware(req, res, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    // If we got here, payment was verified by x402 middleware
    console.log('✅ Payment verified successfully');

    // Run validation
    for (const validation of validateDonation) {
      await validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation failed', errors.array());
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { message } = req.body;

    // Send email notification asynchronously (non-blocking)
    if (emailTransporter && process.env.NOTIFICATION_EMAIL) {
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
    return res.status(200).json({
      success: true,
      message: 'Thank you for your donation!',
      amount: amount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Server error:', error);

    // Don't expose internal errors in production
    if (process.env.NODE_ENV === 'production') {
      return res.status(500).json({
        success: false,
        error: 'An error occurred. Please try again later.',
      });
    }

    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
      stack: error.stack,
    });
  }
}
