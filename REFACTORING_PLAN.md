# CryptoMeACoffee - x402 Protocol Refactoring Plan

**Date Created:** November 19, 2025
**Last Verified Against Official Docs:** November 19, 2025
**Status:** 🔴 Not Started
**Priority:** P0 - Critical for Protocol Compliance
**Estimated Duration:** 2-3 days

---

## ✅ Verification Status: Aligned with Official x402 Documentation

**Last Verified:** November 19, 2025

This refactoring plan has been verified against official Coinbase x402 documentation:
- ✅ Official docs: https://docs.cdp.coinbase.com/x402/
- ✅ Quickstart guide: https://docs.cdp.coinbase.com/x402/quickstart-for-sellers
- ✅ GitBook: https://x402.gitbook.io/x402
- ✅ GitHub repo: https://github.com/coinbase/x402

**Alignment Summary:**
- ✅ Package names confirmed (`x402-express`, `x402-next`, `@coinbase/x402`)
- ✅ Facilitator URLs confirmed (testnet: `https://x402.org/facilitator`)
- ✅ Middleware approach matches official examples
- ✅ Configuration format matches official docs
- ⚠️ Some details need verification during Phase 1 (dynamic pricing, req properties)

**Open Questions for Phase 1:**
1. Dynamic pricing support (function vs static string)
2. Request property name for payment details
3. POST vs GET for donation endpoints
4. Automatic facilitator `/verify` and `/settle` handling

---

## 🎯 Executive Summary

### Why This Refactoring Is Critical

**Current State:**
- ❌ Custom payment verification logic (bypassing x402)
- ❌ Manual signature validation (should be automatic)
- ❌ Not using official `x402-express` middleware
- ❌ No Coinbase x402 Facilitator integration

**Target State:**
- ✅ Official x402-express middleware handles all verification
- ✅ Coinbase Facilitator validates signatures automatically
- ✅ We focus ONLY on UI/UX and integration examples
- ✅ Full protocol compliance per x402 specification

**Core Principle:**
> "Don't reinvent what x402 already does perfectly. Focus on making it beautiful and easy to use."

---

## 📋 Three-Phase Refactoring Approach

### **Phase 1: Install & Configure x402 Official Packages** (Day 1)
**Goal:** Add official dependencies and remove custom verification logic

### **Phase 2: Refactor Server Examples** (Day 2)
**Goal:** Replace custom middleware with x402-express

### **Phase 3: Update Widget & Documentation** (Day 3)
**Goal:** Align client-side with x402 standards and document properly

---

## 🔧 Phase 1: Install & Configure x402 Official Packages

### 1.1 Research Official x402 Packages

**Action:** Review official x402 documentation and packages

```bash
# Research official packages
npm search x402
npm info x402-express
npm info x402-next
npm info x402-hono
npm info @coinbase/x402
```

**Resources to Review:**
- https://docs.cdp.coinbase.com/x402/welcome
- https://github.com/coinbase/x402
- https://docs.cdp.coinbase.com/x402/quickstart-for-sellers
- https://x402.gitbook.io/x402

**Expected Findings:**
- [ ] Confirm `x402-express` package exists and is maintained (✅ Verified in official docs)
- [ ] Identify correct Facilitator URL for testnet (✅ `https://x402.org/facilitator`)
- [ ] Understand middleware configuration options (price, network, config)
- [ ] Review example implementations from Coinbase GitHub
- [ ] **NEW:** Verify if dynamic pricing (function) is supported or only static prices
- [ ] **NEW:** Understand facilitator `/verify` and `/settle` endpoint behavior
- [ ] **NEW:** Check if `x402-express` automatically handles facilitator calls

**Official Package Confirmed:**
- ✅ `x402-express` - Express.js middleware (official)
- ✅ `x402-next` - Next.js middleware (official)
- ✅ `x402-hono` - Hono framework middleware (official)
- ✅ `@coinbase/x402` - Mainnet facilitator (production only)
- ✅ Testnet facilitator: `https://x402.org/facilitator` (no auth required)

**Deliverables:**
- `docs/X402_RESEARCH_NOTES.md` - Summary of findings
- List of official packages with versions
- Facilitator URLs (testnet + mainnet)
- Clarification on dynamic vs static pricing
- Understanding of facilitator endpoint calls

---

### 1.2 Add Official Dependencies

**Server-Side Packages:**

```json
// server-examples/express/package.json
{
  "dependencies": {
    "express": "^4.18.0",
    "x402-express": "latest",          // Official middleware
    "@coinbase/x402": "latest",         // Mainnet facilitator
    "dotenv": "^16.0.0",
    "cors": "^2.8.5"
  }
}
```

**Client-Side Packages (keep existing):**

```json
// package.json (root)
{
  "dependencies": {
    "viem": "^2.0.0",                  // Already present ✅
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

**Tasks:**
- [ ] Update `server-examples/express/package.json`
- [ ] Update `server-examples/nextjs/package.json`
- [ ] Run `npm install` in each server example
- [ ] Verify no dependency conflicts
- [ ] Document package versions in PROGRESS_TRACKER.md

---

### 1.3 Remove Custom Verification Code

**Files to Delete/Refactor:**

```bash
# Identify custom verification logic
src/lib/x402.ts                 # DELETE or refactor to use x402-client
src/lib/payment.ts              # REFACTOR to use official patterns
server-examples/express/src/middleware/  # DELETE custom middleware
```

**Verification Logic to Remove:**
- ❌ Custom signature validation
- ❌ Manual nonce checking
- ❌ Custom EIP-712 verification
- ❌ Manual facilitator communication

**What to Keep:**
- ✅ UI/UX components
- ✅ Wallet connection logic (Viem)
- ✅ Amount selection interface
- ✅ Thank you messages

**Tasks:**
- [ ] Audit `src/lib/` directory for custom verification
- [ ] Create backup branch: `git checkout -b backup/pre-x402-refactor`
- [ ] Remove custom middleware from Express example
- [ ] Remove manual signature validation code
- [ ] Keep UI components untouched

---

### 1.4 Configure Environment Variables

**Create `.env.example` files:**

```bash
# server-examples/express/.env.example
# x402 Protocol Configuration
X402_FACILITATOR_URL=https://x402.org/facilitator
NETWORK=base-sepolia
RECIPIENT_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb

# USDC Token Configuration
USDC_ADDRESS=0x036CbD53842c5426634e7929541eC2318f3dCF7e

# Server Configuration
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Optional: For mainnet deployment
# CDP_API_KEY_ID=your_cdp_api_key_id
# CDP_API_KEY_SECRET=your_cdp_api_key_secret
```

**Tasks:**
- [ ] Create `.env.example` in `server-examples/express/`
- [ ] Create `.env.example` in `server-examples/nextjs/`
- [ ] Add `.env` to `.gitignore` (if not already)
- [ ] Document environment variables in README
- [ ] Create setup script: `scripts/setup-env.sh`

---

## 🖥️ Phase 2: Refactor Server Examples

### 2.1 Refactor Express Server with x402-express

**Current Implementation (WRONG):**

```typescript
// server-examples/express/src/index.ts (CURRENT)
app.post('/api/donate', async (req, res) => {
  // Custom verification logic
  const signature = req.headers['x-payment'];
  const isValid = await verifyPaymentSignature(signature); // ❌ Custom

  if (!isValid) {
    return res.status(402).json({ error: 'Invalid payment' });
  }

  res.json({ success: true });
});
```

**Target Implementation (CORRECT - Based on Official Docs):**

```typescript
// server-examples/express/src/index.ts (TARGET)
import express from 'express';
import { paymentMiddleware } from 'x402-express';
import { facilitator } from '@coinbase/x402'; // Mainnet only
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// x402 middleware handles ALL verification automatically
app.use(paymentMiddleware(
  process.env.RECIPIENT_ADDRESS!,
  {
    // ✅ Using GET per official x402 examples (not POST)
    // x402 pattern: Payment is required to "GET access" to the resource
    'GET /api/donate': {
      price: '$1.00', // ⚠️ Static price (verify dynamic pricing support in Phase 1)
      network: 'base-sepolia',
      config: {
        description: 'Support this creator with crypto donations',
        // ✅ Added per official docs for x402 Bazaar discoverability
        inputSchema: {
          type: 'object',
          properties: {
            amount: {
              type: 'number',
              description: 'Donation amount in USD',
              minimum: 0.01,
              default: 1.00
            },
            message: {
              type: 'string',
              description: 'Optional message for creator',
              maxLength: 280
            }
          }
        },
        outputSchema: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            transactionHash: { type: 'string' }
          }
        }
      }
    }
  },
  // Testnet: { url: 'https://x402.org/facilitator' }
  // Mainnet: facilitator (requires CDP API keys)
  { url: process.env.X402_FACILITATOR_URL || 'https://x402.org/facilitator' }
));

// Your donation endpoint - verification already done by middleware
// ✅ Using GET to match x402 pattern (payment to access resource)
app.get('/api/donate', (req, res) => {
  // ⚠️ Verify: Does x402-express add req.payment or different property?
  // TODO: Check official examples for exact property name

  res.json({
    success: true,
    message: 'Thank you for your donation! ☕',
    transactionHash: 'pending' // Facilitator handles settlement
  });
});

app.listen(process.env.PORT || 3001);
```

**⚠️ Questions to Resolve in Phase 1:**
1. Does `x402-express` support dynamic pricing functions or only static prices?
2. What property does middleware add to `req` for payment details?
3. Does middleware automatically call facilitator `/verify` and `/settle`?
4. ✅ **RESOLVED:** Use GET (not POST) to match official x402 examples

**Key Changes:**
1. ✅ Import official `x402-express` package
2. ✅ Use `paymentMiddleware()` for automatic verification
3. ✅ Configure `facilitator` from `@coinbase/x402`
4. ✅ Remove all custom verification logic
5. ✅ Access verified payment via `req.payment`

**Tasks:**
- [ ] Refactor `server-examples/express/src/index.ts`
- [ ] Remove custom middleware files
- [ ] Update error handling to use x402 errors
- [ ] Test 402 response format
- [ ] Verify facilitator communication
- [ ] Update server README with new setup

---

### 2.2 Refactor Next.js Example

**Target Implementation:**

```typescript
// server-examples/nextjs/src/app/api/donate/route.ts
import { paymentMiddleware } from 'x402-next';
import { facilitator } from '@coinbase/x402';

export const middleware = paymentMiddleware(
  process.env.RECIPIENT_ADDRESS!,
  {
    '/api/donate': {
      price: '$1.00',
      network: 'base-sepolia',
      config: {
        description: 'Support this creator'
      }
    }
  },
  facilitator
);

export async function POST(request: Request) {
  // Payment already verified by middleware
  const payment = request.payment; // TypeScript types from x402-next

  return Response.json({
    success: true,
    transaction: payment.transactionHash
  });
}

export const config = {
  matcher: ['/api/donate']
};
```

**Tasks:**
- [ ] Research `x402-next` package (if exists)
- [ ] Refactor Next.js API route
- [ ] Test on Vercel deployment
- [ ] Update Next.js README
- [ ] Add middleware configuration docs

---

### 2.3 Test Server Refactoring

**Test Checklist:**

```bash
# 1. Start Express server
cd server-examples/express
npm run dev

# 2. Test 402 response (should return payment requirements)
curl -X POST http://localhost:3001/api/donate \
  -H "Content-Type: application/json" \
  -d '{"amount": 5}'

# Expected: 402 Payment Required with x402 payment details

# 3. Test with valid payment (after widget integration)
curl -X POST http://localhost:3001/api/donate \
  -H "Content-Type: application/json" \
  -H "X-PAYMENT: <base64-encoded-signature>" \
  -d '{"amount": 5}'

# Expected: 200 OK with success message
```

**Tasks:**
- [ ] Test 402 response format matches x402 spec
- [ ] Verify facilitator URL is correct
- [ ] Test invalid payment rejection
- [ ] Test replay attack prevention
- [ ] Document test results in TESTING_GUIDE.md

---

## 🎨 Phase 3: Update Widget & Documentation

### 3.1 Refactor Widget to Use x402 Patterns

**Current Payment Flow (src/lib/payment.ts):**

```typescript
// CURRENT (Custom implementation) ❌
export const processPayment = async (amount: bigint) => {
  // Custom signature building
  // Manual facilitator communication
  // Custom verification
};
```

**Target Payment Flow:**

```typescript
// TARGET (Using x402 patterns) ✅
import { createWalletClient, custom } from 'viem';
import { base } from 'viem/chains';

export const processPayment = async (
  endpoint: string,
  amount: number
) => {
  // 1. Make initial GET request to trigger 402 response
  // ✅ Using GET to match official x402 pattern
  const initialResponse = await fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (initialResponse.status !== 402) {
    throw new Error('Expected 402 Payment Required');
  }

  // 2. Parse x402 payment requirements from 402 response
  const paymentRequired = await initialResponse.json();
  const { payload, chain, token } = paymentRequired;

  // 3. Use Viem to sign payment (wallet interaction only)
  const client = createWalletClient({
    chain: base,
    transport: custom(window.ethereum)
  });

  const signature = await client.signTypedData({
    domain: payload.domain,
    types: payload.types,
    primaryType: payload.primaryType,
    message: payload.message
  });

  // 4. Retry GET request with X-PAYMENT header
  // ✅ Using GET with payment header (x402 pattern)
  const paymentResponse = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-PAYMENT': btoa(JSON.stringify({
        x402Version: '0.2.0',
        scheme: 'eip3009',
        network: chain,
        payload: {
          signature,
          authorization: payload.message
        }
      }))
    }
  });

  if (!paymentResponse.ok) {
    throw new Error('Payment verification failed');
  }

  return paymentResponse.json();
};
```

**Key Changes:**
1. ✅ Let server return 402 with payment requirements
2. ✅ Use server-provided EIP-712 structure (don't build client-side)
3. ✅ Use Viem for signing only
4. ✅ Send X-PAYMENT header in standard x402 format
5. ✅ Let facilitator handle verification

**Tasks:**
- [ ] Refactor `src/lib/payment.ts`
- [ ] Remove custom EIP-712 building
- [ ] Use server-provided payment requirements
- [ ] Update widget components to use new flow
- [ ] Test with refactored server

---

### 3.2 Update Widget Configuration

**Target Configuration API:**

```typescript
// examples/basic.html
<script type="module">
  import { CryptoMeACoffee } from './src/widget/CryptoMeACoffee.tsx';

  const widget = new CryptoMeACoffee({
    // Server endpoint (must use x402-express)
    endpoint: 'http://localhost:3001/api/donate',

    // UI Configuration (this is what we focus on!)
    theme: 'dark',
    amounts: [1, 3, 5],
    showCustomAmount: true,

    // Optional callbacks
    onSuccess: (tx) => console.log('Donation successful!', tx),
    onError: (err) => console.error('Donation failed:', err)
  });

  widget.render('#donation-widget');
</script>
```

**What Widget Should Handle:**
- ✅ Beautiful UI/UX
- ✅ Wallet connection via Viem
- ✅ Amount selection
- ✅ Network switching
- ✅ Success/error states
- ✅ Loading animations

**What Widget Should NOT Handle:**
- ❌ Payment verification
- ❌ Signature validation
- ❌ Facilitator communication
- ❌ On-chain settlement

**Tasks:**
- [ ] Simplify widget configuration
- [ ] Remove verification-related options
- [ ] Focus config on UI/UX only
- [ ] Update TypeScript types
- [ ] Update examples to use new config

---

### 3.3 Update Documentation

**Documents to Update:**

#### 3.3.1 README.md
```markdown
# CryptoMeACoffee

> Open-source donation widget using x402 protocol

## How It Works

1. **Add Widget** - Drop our widget into your website
2. **Run Server** - Deploy server example with x402-express
3. **Receive Donations** - Get USDC directly to your wallet

## Under the Hood

- **x402 Protocol** - Official Coinbase payment standard
- **x402-express** - Handles all verification automatically
- **Coinbase Facilitator** - Validates signatures and settles on-chain
- **Zero Fees** - Direct to your wallet, no intermediaries

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/yourusername/cryptomeacoffee
cd cryptomeacoffee
npm install

# 2. Set up server
cd server-examples/express
cp .env.example .env
# Edit .env with your wallet address
npm install
npm run dev

# 3. Add widget to your site
<script src="https://unpkg.com/cryptomeacoffee/dist/widget.min.js"></script>
```

## Architecture

We focus on:
- 🎨 Beautiful widget UI
- 📚 Easy integration guides
- 🔧 Platform examples

x402 handles:
- ✅ Payment verification
- ✅ Signature validation
- ✅ Blockchain settlement
- ✅ Gas sponsorship
```

**Tasks:**
- [ ] Rewrite README.md with x402 focus
- [ ] Emphasize "built on x402 protocol"
- [ ] Clarify what we build vs what x402 does
- [ ] Add architecture diagram
- [ ] Include quick start guide

---

#### 3.3.2 SETUP-GUIDE.md

```markdown
# Setup Guide

## Prerequisites

1. Wallet address for receiving donations
2. Node.js 18+ installed
3. (Optional) Coinbase Developer Platform account for mainnet

## Server Setup

### Using x402-express (Express.js)

```bash
cd server-examples/express
npm install
cp .env.example .env
```

Edit `.env`:
```bash
RECIPIENT_ADDRESS=0xYourWalletAddress
NETWORK=base-sepolia
X402_FACILITATOR_URL=https://x402.org/facilitator
```

Run server:
```bash
npm run dev
```

**That's it!** x402-express handles everything else automatically.

## Widget Integration

Add to your website:

```html
<div id="donation-widget"></div>
<script src="https://unpkg.com/cryptomeacoffee/dist/widget.min.js"></script>
<script>
  CryptoMeACoffee.init({
    endpoint: 'https://your-server.com/api/donate',
    amounts: [1, 3, 5]
  });
</script>
```

## Testing

1. Get testnet USDC: https://faucet.circle.com
2. Connect wallet to Base Sepolia
3. Test donation on your site
4. Verify transaction: https://sepolia.basescan.org
```

**Tasks:**
- [ ] Create comprehensive SETUP-GUIDE.md
- [ ] Focus on x402-express setup
- [ ] Include troubleshooting section
- [ ] Add testnet instructions
- [ ] Link to x402 official docs

---

#### 3.3.3 X402_INTEGRATION.md (NEW)

```markdown
# x402 Protocol Integration Guide

## What is x402?

x402 is Coinbase's open standard for micropayments on the web. It's like HTTP 402 ("Payment Required") but for crypto.

## How CryptoMeACoffee Uses x402

### Server Side: x402-express Middleware

We use the official `x402-express` package to handle all payment verification:

```typescript
import { paymentMiddleware } from 'x402-express';

app.use(paymentMiddleware(
  recipientAddress,
  routeConfigs,
  facilitator
));
```

This automatically:
- Returns 402 with payment requirements
- Validates signatures via Coinbase Facilitator
- Prevents replay attacks
- Settles on-chain

### Client Side: Standard x402 Flow

1. **Initial Request** → Server returns 402 with payment details
2. **Sign Payment** → User signs with wallet (Viem)
3. **Retry with X-PAYMENT Header** → Server validates via facilitator
4. **Success** → Direct settlement to your wallet

### Facilitator

Coinbase's x402 Facilitator handles:
- Signature verification
- Nonce checking
- On-chain settlement
- Gas sponsorship

**Testnet:** `https://x402.org/facilitator`
**Mainnet:** `@coinbase/x402` package

## Benefits

- ✅ No custom verification code
- ✅ Battle-tested security
- ✅ Automatic updates from Coinbase
- ✅ Free gas for users
- ✅ Direct wallet settlement

## Further Reading

- [x402 Official Docs](https://docs.cdp.coinbase.com/x402/)
- [x402 Whitepaper](https://www.x402.org/x402-whitepaper.pdf)
- [GitHub Examples](https://github.com/coinbase/x402)
```

**Tasks:**
- [ ] Create X402_INTEGRATION.md
- [ ] Explain x402 protocol clearly
- [ ] Document our specific usage
- [ ] Link to official resources
- [ ] Add FAQ section

---

### 3.4 Update Testing Guide

**TESTING_GUIDE.md Updates:**

```markdown
# Testing Guide

## Testing with x402 Protocol

### Server Tests

```bash
# Test 402 response
curl -X POST http://localhost:3001/api/donate \
  -H "Content-Type: application/json" \
  -d '{"amount": 5}'

# Should return:
# HTTP/1.1 402 Payment Required
# {
#   "x402Version": "0.2.0",
#   "scheme": "eip3009",
#   "network": "base-sepolia",
#   "payload": { ... }
# }
```

### Widget Integration Tests

1. **Connect Wallet**
   - Click "Buy Me a Coffee"
   - Approve wallet connection
   - Verify correct network (Base Sepolia)

2. **Select Amount**
   - Click preset amount (1☕, 3☕, 5☕)
   - Or enter custom amount
   - Verify amount displays correctly

3. **Sign Payment**
   - Click "Donate"
   - Sign EIP-712 message in wallet
   - Verify signature format

4. **Verify Transaction**
   - Wait for success message
   - Check transaction on block explorer
   - Verify recipient received USDC

### Facilitator Integration Tests

Test that facilitator is working:

```bash
# Valid payment should succeed
# Invalid signature should fail with clear error
# Replay attack should be rejected
# Expired payment should be rejected
```
```

**Tasks:**
- [ ] Update TESTING_GUIDE.md
- [ ] Add x402-specific tests
- [ ] Document facilitator testing
- [ ] Add troubleshooting section
- [ ] Include test wallet addresses

---

## 📊 Success Criteria

### Phase 1 Complete When:
- [ ] Official x402 packages installed
- [ ] Custom verification code removed
- [ ] Environment variables documented
- [ ] Backup branch created

### Phase 2 Complete When:
- [ ] Express server uses x402-express
- [ ] Server returns valid 402 responses
- [ ] Facilitator communication working
- [ ] Tests passing

### Phase 3 Complete When:
- [ ] Widget uses x402 payment flow
- [ ] Documentation updated
- [ ] Examples working end-to-end
- [ ] Testing guide complete

### Overall Success Criteria:
- [ ] ✅ Zero custom verification code
- [ ] ✅ All verification via x402-express
- [ ] ✅ Facilitator validates all payments
- [ ] ✅ Clear documentation of architecture
- [ ] ✅ End-to-end test on Base Sepolia succeeds
- [ ] ✅ PRD updated to reflect refactoring

---

## 🚨 Critical Risks & Mitigation

### Risk 1: x402-express Package Doesn't Exist
**Likelihood:** Medium
**Impact:** High
**Mitigation:**
- Research official x402 packages first (Phase 1.1)
- If package doesn't exist, use official x402 patterns
- Fallback: Adapt official examples from Coinbase GitHub

### Risk 2: Breaking Existing Functionality
**Likelihood:** High
**Impact:** Medium
**Mitigation:**
- Create backup branch before refactoring
- Test each phase thoroughly before moving forward
- Keep UI components unchanged
- Document rollback procedure

### Risk 3: Facilitator Integration Issues
**Likelihood:** Medium
**Impact:** High
**Mitigation:**
- Test with testnet facilitator first
- Review official documentation thoroughly
- Join Coinbase CDP Discord for support
- Have fallback to manual testing

---

## 📅 Timeline

| Phase | Duration | Start Date | Target Completion |
|-------|----------|------------|-------------------|
| Phase 1: Packages | 1 day | Nov 19 | Nov 19 EOD |
| Phase 2: Server | 1 day | Nov 20 | Nov 20 EOD |
| Phase 3: Widget & Docs | 1 day | Nov 21 | Nov 21 EOD |
| **Total** | **3 days** | **Nov 19** | **Nov 21 EOD** |

---

## 🔄 Rollback Plan

If refactoring fails, rollback procedure:

```bash
# 1. Switch to backup branch
git checkout backup/pre-x402-refactor

# 2. Restore server
cd server-examples/express
npm install
npm run dev

# 3. Test original functionality
npm test

# 4. Document issues encountered
# Add to docs/REFACTORING_ISSUES.md
```

---

## 📚 References

### Official x402 Resources
- [x402 Docs](https://docs.cdp.coinbase.com/x402/)
- [x402 GitHub](https://github.com/coinbase/x402)
- [Quickstart for Sellers](https://docs.cdp.coinbase.com/x402/quickstart-for-sellers)
- [x402 Whitepaper](https://www.x402.org/x402-whitepaper.pdf)

### Community
- [CDP Discord](https://discord.gg/invite/cdp)
- [x402 GitBook](https://x402.gitbook.io/x402)

---

## ✅ Checklist Summary

### Phase 1: Packages
- [ ] Research x402 packages
- [ ] Install x402-express
- [ ] Remove custom verification
- [ ] Configure environment

### Phase 2: Server
- [ ] Refactor Express server
- [ ] Refactor Next.js server
- [ ] Test 402 responses
- [ ] Verify facilitator

### Phase 3: Widget & Docs
- [ ] Refactor widget payment flow
- [ ] Update configuration API
- [ ] Rewrite README.md
- [ ] Create X402_INTEGRATION.md
- [ ] Update TESTING_GUIDE.md
- [ ] Update PROGRESS_TRACKER.md
- [ ] Update PRD

---

**Last Updated:** November 19, 2025
**Next Review:** After Phase 1 Completion
**Status:** 🔴 Ready to Start
