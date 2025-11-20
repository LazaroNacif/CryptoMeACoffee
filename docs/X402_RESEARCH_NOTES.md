# x402 Protocol - Research Notes

**Research Date:** November 20, 2025
**Purpose:** Phase 1 of x402 refactoring - Understanding official implementation

---

## 📋 Executive Summary

The x402 protocol is a **chain-agnostic HTTP payment standard** that enables internet-native cryptocurrency payments with minimal code. Coinbase provides official packages (`x402-express`, `@coinbase/x402`) that handle **all payment verification and settlement automatically** through a hosted facilitator service.

**Key Insight:** Our current implementation reinvents the protocol layer. We should use x402-express middleware exclusively and let Coinbase's facilitator handle all verification/settlement.

---

## 🔑 Core Concepts

### What is x402?

- **HTTP-native payment protocol** using status code 402 (Payment Required)
- **1 line of code** to accept payments on the server
- **No fees** for testnet, fee-free USDC on Base mainnet
- **2-second settlement** times
- **$0.001 minimum** payment (micropayments enabled)
- **Chain agnostic** (Base, Solana, others)

### Five Design Principles

1. **Open Standard** — No single-party dependency
2. **HTTP Native** — Seamless web integration
3. **Chain/Token Agnostic** — Multi-blockchain support
4. **Trust Minimizing** — Facilitators can't move funds without authorization
5. **Ease of Use** — Abstracts crypto complexity

---

## 🏗️ Architecture

### Payment Flow (12 Steps)

1. Client requests protected resource
2. Server responds **402 Payment Required** with payment requirements
3. Client constructs payment payload (with wallet signature)
4. Client resubmits with `X-PAYMENT` header
5. Server verifies payment via **facilitator**
6. Facilitator validates signature and payment details
7. Server grants access
8. Response includes `X-PAYMENT-RESPONSE` header with settlement details

### Key Components

#### 1. Payment Requirements (Server → Client)
```json
{
  "scheme": "exact",
  "network": "base-sepolia",
  "amount": "$0.001",
  "asset": "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  "recipient": "0xYourWalletAddress"
}
```

#### 2. Payment Payload (Client → Server)
Base64-encoded JSON with:
- **x402Version**: Protocol version
- **scheme**: Payment method (e.g., "exact")
- **network**: Blockchain network
- **payload**: Scheme-specific data (signature, nonce, etc.)

#### 3. Facilitator Service
Provides three endpoints:
- **`/verify`** — Validate payment signatures
- **`/settle`** — Execute on-chain transfers
- **`/supported`** — List capabilities (networks, schemes)

**Testnet Facilitator:** `https://x402.org/facilitator`
**Mainnet Facilitator:** Coinbase CDP (requires API keys)

---

## 📦 Official Packages

### 1. x402-express (Server Middleware)

**NPM:** `x402-express` (v0.7.0)
**Purpose:** Express middleware for payment-protected routes

**Installation:**
```bash
npm install x402-express @coinbase/x402
```

**Basic Usage (Testnet):**
```javascript
import express from "express";
import { paymentMiddleware } from "x402-express";

const app = express();

app.use(paymentMiddleware(
  "0xYourWalletAddress",  // Recipient address
  {
    "GET /weather": {
      price: "$0.001",
      network: "base-sepolia",
      config: {
        description: "Get weather data",
        inputSchema: { /* JSON schema */ },
        outputSchema: { /* JSON schema */ }
      }
    }
  },
  { url: "https://x402.org/facilitator" }  // Testnet facilitator
));

app.get("/weather", (req, res) => {
  // Payment already verified by middleware
  res.json({ temp: 72, condition: "sunny" });
});

app.listen(3000);
```

**Mainnet Usage:**
```javascript
import { facilitator } from "@coinbase/x402";

app.use(paymentMiddleware(
  "0xYourWalletAddress",
  routes,
  facilitator  // Uses CDP_API_KEY_ID and CDP_API_KEY_SECRET from env
));
```

### 2. @coinbase/x402 (Facilitator Client)

**NPM:** `@coinbase/x402` (v0.7.1)
**Purpose:** Coinbase-hosted facilitator for mainnet

**Environment Variables (Mainnet Only):**
```bash
CDP_API_KEY_ID=your-key-id
CDP_API_KEY_SECRET=your-key-secret
```

**Usage:**
```javascript
import { facilitator } from "@coinbase/x402";
// OR
import { createFacilitatorConfig } from "@coinbase/x402";
const customFacilitator = createFacilitatorConfig(apiKeyId, apiKeySecret);
```

### 3. x402-next (Next.js Integration)

**NPM:** `x402-next`
**Purpose:** Next.js API route middleware

### 4. x402-hono (Hono Framework)

**NPM:** `x402-hono`
**Purpose:** Hono framework middleware

---

## 🌐 Supported Networks

### Testnet
- **base-sepolia** (Base testnet)
- **solana-devnet** (Solana testnet)

### Mainnet
- **base** (Base L2)
- **solana** (Solana mainnet)

### Token Support
- **USDC** (primary stablecoin)
- Native tokens (ETH on Base, SOL on Solana)

---

## 🎯 Integration Best Practices

### Server-Side

1. **Use Official Middleware** — Don't build custom verification
2. **Start with Testnet** — Use `https://x402.org/facilitator`
3. **Add Metadata** — Include `description`, `inputSchema`, `outputSchema` for x402 Bazaar discovery
4. **Environment Variables** — Only needed for mainnet (CDP keys)
5. **Trust the Middleware** — It handles all validation automatically

### Client-Side

1. **Handle 402 Responses** — Parse payment requirements
2. **Connect Wallet** — Use viem, ethers, or WalletConnect
3. **Sign Payments** — Follow EIP-712 or blockchain-specific standards
4. **Retry with X-PAYMENT** — Include payment header in retry
5. **Process X-PAYMENT-RESPONSE** — Contains settlement details

---

## 📚 GitHub Examples

**Repository:** https://github.com/coinbase/x402

### TypeScript Server Examples

1. **`examples/typescript/servers/express/`**
   - Basic Express server with x402-express
   - Weather API example ($0.001 per request)
   - Testnet configuration

2. **`examples/typescript/servers/advanced/`**
   - Delayed settlement
   - Dynamic pricing
   - Advanced patterns

3. **`examples/typescript/servers/mainnet/`**
   - Production Base mainnet setup
   - CDP facilitator integration

### TypeScript Client Examples

1. **`examples/typescript/clients/fetch/`**
   - x402-fetch wrapper
   - Automatic payment handling

2. **`examples/typescript/clients/axios/`**
   - Axios interceptor pattern
   - Payment retry logic

3. **`examples/typescript/clients/cdp-sdk/`**
   - CDP Server Wallets as signer
   - Backend-to-backend payments

### Fullstack Examples

1. **`examples/fullstack/next/`**
   - Next.js with x402-next
   - Full-stack integration

2. **`examples/fullstack/browser-wallet-example/`**
   - Hono server + React client
   - Browser wallet integration (MetaMask, Coinbase Wallet)

3. **`examples/fullstack/farcaster-miniapp/`**
   - Farcaster Mini App template
   - Social app integration

---

## 🚨 What We Did Wrong

### ❌ Custom Implementation Issues

1. **Manual Signature Verification**
   - We built custom EIP-712 verification
   - Should use x402-express middleware exclusively
   - Facilitator handles all verification

2. **Custom Payment Envelope**
   - We constructed x402 payload manually
   - Should let middleware handle payload structure
   - Client libraries handle envelope automatically

3. **Not Using Facilitator**
   - We validate signatures server-side ourselves
   - Should delegate to Coinbase facilitator
   - Facilitator provides security, replay protection, settlement

4. **Overengineering**
   - Implemented features x402 already provides
   - Should focus on UI/UX, not protocol layer

### ✅ What We Should Do

1. **Server:** Use `paymentMiddleware()` from x402-express
2. **Client:** Use x402-fetch or build simple payment client
3. **Verification:** Trust the facilitator (testnet or CDP)
4. **Settlement:** Let facilitator handle on-chain transactions
5. **Focus:** Widget UI/UX, not payment protocol

---

## 🔧 Migration Path

### Phase 1: Server Refactor
1. Install `x402-express` and `@coinbase/x402`
2. Replace custom verification with `paymentMiddleware()`
3. Configure testnet facilitator
4. Remove all manual signature validation
5. Test 402 responses

### Phase 2: Client Refactor
1. Simplify payment.ts to handle wallet connection only
2. Remove custom EIP-712 payload building
3. Use server-provided payment requirements from 402 response
4. Sign payment as instructed by server
5. Include payment in `X-PAYMENT` header

### Phase 3: Documentation
1. Update README with x402 focus
2. Create integration guide
3. Document testnet setup
4. Add mainnet deployment guide

---

## 📖 Documentation Links

- **Official Docs:** https://docs.cdp.coinbase.com/x402/
- **GitHub Repo:** https://github.com/coinbase/x402
- **npm (x402-express):** https://www.npmjs.com/package/x402-express
- **npm (@coinbase/x402):** https://www.npmjs.com/package/@coinbase/x402
- **Whitepaper:** https://www.x402.org/x402-whitepaper.pdf
- **Community Docs:** https://x402.gitbook.io/x402

---

## 🎓 Key Learnings

1. **Don't Reinvent Protocols** — Use official implementations
2. **Read Examples First** — GitHub examples show correct patterns
3. **Trust the Middleware** — It's designed to handle complexity
4. **Focus on Value-Add** — Our value is widget UX, not protocol
5. **Testnet First** — Always test on testnet before mainnet

---

## ✅ Next Steps

1. ✅ Research completed
2. ✅ Findings documented
3. ⏭️ Create backup branch
4. ⏭️ Update package.json with correct dependencies
5. ⏭️ Refactor Express server to use x402-express properly
6. ⏭️ Simplify widget payment logic

---

**Research completed by:** Claude Code
**Status:** Ready for Phase 2 (Server Refactoring)
