/**
 * CryptoMeACoffee Express Server
 * Handles crypto donations via x402 protocol
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { paymentMiddleware } from 'x402-express';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8000',
  credentials: true
}));

// Validate required environment variables
if (!process.env.WALLET_ADDRESS) {
  console.error('❌ Error: WALLET_ADDRESS is required in .env file');
  process.exit(1);
}

console.log('🚀 Starting CryptoMeACoffee Server...');
console.log('📍 Network:', process.env.NETWORK);
console.log('💰 Wallet Address:', process.env.WALLET_ADDRESS);
console.log('🌐 Facilitator:', process.env.FACILITATOR_URL);

// USDC Token addresses
const USDC_ADDRESSES = {
  'base-sepolia': '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  'base': '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
};

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

app.use(paymentMiddleware(
  process.env.WALLET_ADDRESS,
  {
    "POST /api/donate": {
      price: "$1.00", // Static price for now (can make dynamic later)
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
      description: 'CryptoMeACoffee donation - Thank you for your support!',
      discoverable: true // Enable x402 Bazaar listing
    }
  },
  {
    url: process.env.FACILITATOR_URL || 'https://x402.org/facilitator'
  }
));

// Donation endpoint
// This is only reached if payment verification succeeds
app.post('/api/donate', (req, res) => {
  const { amount, message } = req.body;

  console.log('✅ Payment verified and accepted!');
  console.log('💵 Amount:', amount);
  console.log('💬 Message:', message || 'No message');

  // TODO: Here you can add additional logic:
  // - Store donation in database
  // - Send thank you email
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
