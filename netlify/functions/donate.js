/**
 * CryptoMeACoffee Netlify Serverless Function
 * Handles crypto donations via x402 protocol
 * Updated: Manual x402 implementation for serverless compatibility
 */

import { useFacilitator } from 'x402/verify';
import { exact } from 'x402/schemes';
import { processPriceToAtomicAmount, toJsonSafe } from 'x402/shared';
import { SupportedEVMNetworks, settleResponseHeader } from 'x402/types';
import { getAddress } from 'viem';
import { Resend } from 'resend';
import { body, validationResult } from 'express-validator';

// Email configuration (Resend)
let resend = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
  console.log('✅ Email notifications enabled (Resend)');
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
  console.log('🚀 Function invoked:', event.httpMethod, event.headers.origin);
  console.log('📋 Has X-Payment header:', !!event.headers['x-payment']);

  // CORS headers with improved origin matching
  const origin = event.headers.origin;
  const allowedOriginsRaw = process.env.CORS_ORIGIN?.split(',').map(o => o.trim()) || [];

  // Normalize origins: lowercase and remove trailing slashes
  const normalizeOrigin = (url) => {
    if (!url) return '';
    return url.toLowerCase().replace(/\/$/, '');
  };

  const allowedOrigins = allowedOriginsRaw.map(normalizeOrigin);
  const normalizedOrigin = normalizeOrigin(origin);

  // Debug logging for CORS troubleshooting
  console.log('🔍 CORS Debug:', {
    requestOrigin: origin,
    normalizedOrigin,
    requestMethod: event.httpMethod,
    corsOriginEnv: process.env.CORS_ORIGIN,
    allowedOriginsParsed: allowedOrigins,
    originMatches: allowedOrigins.includes(normalizedOrigin),
    hasOriginHeader: !!origin
  });

  // Validate environment configuration
  if (!process.env.CORS_ORIGIN) {
    console.error('❌ CRITICAL: CORS_ORIGIN environment variable is not set!');
  }

  const corsHeaders = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Payment',
    'Access-Control-Allow-Credentials': 'true',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
  };

  // Add origin header if origin is in allowed list
  if (origin && allowedOrigins.includes(normalizedOrigin)) {
    corsHeaders['Access-Control-Allow-Origin'] = origin;
    console.log('✅ CORS: Origin matched and header added');
  } else {
    console.warn('⚠️ CORS: Origin not matched', {
      hasOrigin: !!origin,
      matched: allowedOrigins.includes(normalizedOrigin)
    });
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
    const paymentHeader = event.headers['x-payment'];

    console.log('📥 Incoming donation request', {
      amount,
      hasPayment: !!paymentHeader,
      network,
    });

    // Validate network is supported
    if (!SupportedEVMNetworks.includes(network)) {
      throw new Error(`Unsupported network: ${network}`);
    }

    // Process price to atomic amount
    const price = `$${amount.toFixed(2)}`;
    const atomicAmountForAsset = processPriceToAtomicAmount(price, network);

    if ('error' in atomicAmountForAsset) {
      throw new Error(atomicAmountForAsset.error);
    }

    const { maxAmountRequired, asset } = atomicAmountForAsset;

    console.log('💰 Atomic amount:', maxAmountRequired);
    console.log('💰 Asset:', JSON.stringify(asset, null, 2));

    // Construct payment requirements manually
    const payTo = getAddress(process.env.WALLET_ADDRESS);
    const resourceUrl = `https://${event.headers.host || 'bucolic-cannoli-49fd18.netlify.app'}/api/donate`;

    const paymentRequirements = [{
      scheme: 'exact',
      network,
      maxAmountRequired,
      resource: resourceUrl,
      description: `CryptoMeACoffee donation of $${amount.toFixed(2)} - Thank you for your support!`,
      mimeType: 'application/json',
      payTo,
      maxTimeoutSeconds: 60,
      asset: getAddress(asset.address), // Use asset.address from processPriceToAtomicAmount
      outputSchema: {
        input: {
          type: 'http',
          method: 'POST',
          discoverable: false,
        },
        output: undefined,
      },
      extra: asset.eip712, // EIP-712 domain from processPriceToAtomicAmount
    }];

    const x402Version = 1;

    // Check for payment header
    if (!paymentHeader) {
      console.log('❌ No X-Payment header - returning 402');
      return {
        statusCode: 402,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          x402Version,
          error: 'X-PAYMENT header is required',
          accepts: toJsonSafe(paymentRequirements),
        }),
      };
    }

    // Payment header exists - verify it
    console.log('🔄 Verifying payment...');

    // Initialize facilitator
    const facilitatorConfig = {
      url: process.env.FACILITATOR_URL || 'https://x402.org/facilitator',
    };
    const { verify, settle } = useFacilitator(facilitatorConfig);

    // Decode payment
    let decodedPayment;
    try {
      decodedPayment = exact.evm.decodePayment(paymentHeader);
      decodedPayment.x402Version = x402Version;
    } catch (error) {
      console.error('❌ Failed to decode payment:', error);
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          error: 'Invalid payment header format',
        }),
      };
    }

    // Verify payment
    const matchingRequirement = paymentRequirements[0];

    console.log('🔍 Decoded payment:', JSON.stringify(decodedPayment, null, 2));
    console.log('🔍 Payment requirement:', JSON.stringify(matchingRequirement, null, 2));

    const verifyResult = await verify(decodedPayment, matchingRequirement);

    console.log('🔍 Verify result:', JSON.stringify(verifyResult, null, 2));

    if (!verifyResult.isValid) {
      console.error('❌ Payment verification failed:', verifyResult.reason || 'No reason provided');
      return {
        statusCode: 402,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          x402Version,
          error: 'Payment verification failed',
          reason: verifyResult.reason || 'Verification failed',
          accepts: toJsonSafe(paymentRequirements),
        }),
      };
    }

    console.log('✅ Payment verified successfully');

    // Settle payment (execute the USDC transfer on-chain)
    console.log('💸 Settling payment on-chain...');
    let settleResult;
    try {
      settleResult = await settle(decodedPayment, matchingRequirement);
      console.log('🔍 Settle result:', JSON.stringify(settleResult, null, 2));
    } catch (settleError) {
      console.error('❌ Settlement failed:', settleError);
      return {
        statusCode: 402,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          x402Version,
          error: 'Payment settlement failed',
          reason: settleError.message || 'Unable to execute transfer',
          accepts: toJsonSafe(paymentRequirements),
        }),
      };
    }

    // Check if settlement was successful
    if (!settleResult.success) {
      console.error('❌ Settlement unsuccessful:', settleResult.errorReason);
      return {
        statusCode: 402,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'X-PAYMENT-RESPONSE': settleResponseHeader(settleResult),
        },
        body: JSON.stringify({
          x402Version,
          error: 'Payment settlement failed',
          reason: settleResult.errorReason || 'Settlement unsuccessful',
          accepts: toJsonSafe(paymentRequirements),
        }),
      };
    }

    console.log('✅ Payment settled successfully');

    // Add settlement response header
    console.log('📝 Creating payment response header...');
    const paymentResponseHeader = settleResponseHeader(settleResult);
    corsHeaders['X-PAYMENT-RESPONSE'] = paymentResponseHeader;
    console.log('✅ Payment response header added');

    // Run validation (create minimal mock for validation)
    console.log('🔍 Running validation...');
    const validationReq = { body: requestBody };
    for (const validation of validateDonation) {
      await validation.run(validationReq);
    }

    const errors = validationResult(validationReq);
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
    console.log('✅ Validation passed');

    const { message } = requestBody;

    // Send email notification asynchronously (non-blocking)
    // Note: message is already sanitized by express-validator's .escape()
    if (resend && process.env.NOTIFICATION_EMAIL) {
      const sanitizedMessage = message || 'No message';

      resend.emails
        .send({
          from: 'CryptoMeACoffee <onboarding@resend.dev>',
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
        })
        .then(() => console.log('📧 Email notification sent via Resend'))
        .catch((emailError) => console.error('❌ Failed to send email:', emailError.message || emailError));
    }

    // Return success response
    console.log('✅ Returning 200 success response');
    const successResponse = {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Thank you for your donation!',
        amount: amount,
        timestamp: new Date().toISOString(),
      }),
    };
    console.log('📤 Response:', JSON.stringify(successResponse, null, 2));
    return successResponse;
  } catch (error) {
    console.error('❌ Server error caught in try/catch:', error);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);

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

    console.log('📤 Returning 500 error response');
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify(errorResponse),
    };
  }
}
