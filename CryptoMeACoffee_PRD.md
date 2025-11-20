# CryptoMeACoffee - Product Requirements Document (PRD)

## 📋 Document Information

**Product Name:** CryptoMeACoffee
**Version:** 1.1.0
**Document Status:** In Development - Architecture Refactoring
**Last Updated:** November 19, 2025
**Product Owner:** [Your Name]
**Repository:** Local (pending GitHub push)

## ⚠️ IMPORTANT: Architecture Refactoring Notice

**Status:** Sprint 1.5 - x402 Protocol Compliance Refactoring (Nov 19-21)

After comprehensive architecture review on November 19, 2025, we discovered our implementation was not properly leveraging the x402 protocol. We were building custom verification logic that x402-express already handles automatically.

**See:** `REFACTORING_PLAN.md` for complete refactoring strategy.

**Key Changes:**
- ✅ Remove custom payment verification code
- ✅ Properly integrate x402-express middleware
- ✅ Let Coinbase x402 Facilitator handle all verification
- ✅ Focus exclusively on UI/UX and integration examples

---

## 🎯 Executive Summary

### Product Vision
An open-source, self-hosted donation widget toolkit that enables content creators to accept cryptocurrency donations via the x402 protocol. Simple to install, zero fees, no intermediaries.

### Problem Statement
Current donation platforms charge fees (5-10%), require account creation, and hold funds in escrow. Creators need a simple, zero-fee solution that gives them full control and instant settlement.

### Solution
A plug-and-play JavaScript widget + backend examples that creators can add to any website in under 5 minutes. Donations go directly to creator wallets via x402 protocol with zero platform fees.

### Target Users
Content creators (bloggers, developers, artists, educators) who want to accept crypto donations without complexity.

---

## 🏗️ Product Architecture

### System Components

```
┌─────────────────────────────────────────────────────────┐
│                    Creator's Website                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │         CryptoMeACoffee Widget (Frontend)        │  │
│  │  - Button UI (Custom Design)                     │  │
│  │  - Wallet Connection via Viem                    │  │
│  │  - Payment Signing via Viem                      │  │
│  │  - Status Management                             │  │
│  └──────────────────────────────────────────────────┘  │
│                          ↕                               │
│  ┌──────────────────────────────────────────────────┐  │
│  │        Creator's Backend (Self-Hosted)           │  │
│  │  - x402-express Official Middleware              │  │
│  │  - Automatic 402 Response Handler                │  │
│  │  - Rate Limiting (custom)                        │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│         Coinbase x402 Facilitator (Official)             │
│  - Automatic Signature Verification                      │
│  - Nonce & Replay Attack Prevention                      │
│  - On-chain Transaction Settlement                       │
│  - Gas Sponsorship (Gasless for Users)                   │
│  - Zero Platform Fees                                    │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                   Blockchain Layer                       │
│  - Base Network (Mainnet & Sepolia Testnet)             │
│  - USDC Token Contract (EIP-3009 compliant)             │
│  - Direct Settlement to Creator Wallet                   │
└─────────────────────────────────────────────────────────┘
```

### Key Architecture Decisions

**✅ Use Official x402 Packages (CRITICAL):**
- **Server:** `x402-express` middleware (NOT custom code)
- **Client:** `viem` for wallet interaction (NOT raw Web3)
- **Facilitator:** Official Coinbase facilitator (automatic verification)

> **⚠️ IMPORTANT:** We must NEVER reimplement what x402 already provides. Our role is UI/UX, not protocol verification.

**✅ What We Build (Our Value-Add):**
- 🎨 **Beautiful Widget UI** - Custom button designs, themes, animations
- 📚 **Integration Guides** - Platform-specific setup instructions
- 🔧 **Backend Examples** - Express, Next.js, Vercel Edge examples using x402-express
- 📖 **Documentation** - Easy-to-follow guides for non-technical creators
- 🎯 **Creator UX** - Simplified configuration and deployment

**✅ What x402 Handles (Don't Touch):**
- ✅ Payment signature verification (Coinbase Facilitator)
- ✅ EIP-712 validation (x402-express middleware)
- ✅ Blockchain settlement (x402 protocol)
- ✅ Gas fee sponsorship (Coinbase)
- ✅ Replay attack prevention (automatic nonce checking)
- ✅ On-chain transaction execution (facilitator)

**❌ What We Must NOT Build:**
- ❌ Custom payment verification logic
- ❌ Manual signature validation
- ❌ Direct blockchain interaction for payments
- ❌ Custom facilitator communication
- ❌ Nonce management
- ❌ Gas estimation or handling

---

### Architecture Boundaries (Critical Understanding)

```
┌────────────────────────────────────────────────────────┐
│                    OUR RESPONSIBILITY                   │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Widget Layer (UI/UX)                            │ │
│  │  - Button designs                                │ │
│  │  - Wallet connection UX                          │ │
│  │  - Amount selection                              │ │
│  │  - Loading/success/error states                  │ │
│  └──────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Integration Layer (Examples)                    │ │
│  │  - Platform-specific setup guides                │ │
│  │  - x402-express configuration examples           │ │
│  │  - Environment setup documentation               │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
                          ↕
┌────────────────────────────────────────────────────────┐
│              x402 PROTOCOL RESPONSIBILITY              │
│  ┌──────────────────────────────────────────────────┐ │
│  │  x402-express Middleware                         │ │
│  │  - Automatic 402 responses                       │ │
│  │  - Payment requirement generation                │ │
│  │  - Request validation                            │ │
│  └──────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Coinbase x402 Facilitator                       │ │
│  │  - Signature verification                        │ │
│  │  - Nonce checking                                │ │
│  │  - On-chain settlement                           │ │
│  │  - Gas sponsorship                               │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

**Violation Examples:**
```typescript
// ❌ WRONG - Custom verification (violates boundary)
export const verifyPayment = async (signature: string) => {
  // Custom signature validation
  const recovered = recoverAddress(signature);
  // Custom nonce checking
  // etc...
};

// ✅ CORRECT - Use x402-express
import { paymentMiddleware } from 'x402-express';
app.use(paymentMiddleware(config, facilitator));
// Verification handled automatically
```

---

## 📁 Repository Structure

```
cryptomeacoffee/
├── README.md                    # Project overview and quick start
├── LICENSE                      # MIT License
├── .gitignore                   # Git ignore rules
├── package.json                 # npm package configuration (optional)
│
├── src/                         # Source code
│   ├── widget.js                # Main widget code (unminified)
│   ├── widget.min.js            # Minified widget for production
│   ├── styles.css               # Widget styles
│   └── styles.min.css           # Minified styles
│
├── assets/                      # Visual assets
│   ├── logos/
│   │   ├── crypto-coffee-primary.svg
│   │   ├── crypto-coffee-white.svg
│   │   ├── crypto-coffee-dark.svg
│   │   └── icon-only.svg
│   └── screenshots/
│       ├── demo-desktop.png
│       ├── demo-mobile.png
│       └── demo.gif
│
├── docs/                        # Documentation
│   ├── SETUP-GUIDE.md          # Complete setup instructions
│   ├── SECURITY-CHECKLIST.md   # Security best practices
│   ├── FAQ.md                  # Frequently asked questions
│   ├── TROUBLESHOOTING.md      # Common issues and solutions
│   └── CUSTOMIZATION.md        # Styling and theming guide
│
├── examples/                    # Implementation examples
│   ├── vanilla-html/
│   │   └── index.html          # Simple HTML example
│   ├── react/
│   │   ├── CoffeeDonation.jsx  # React component
│   │   └── package.json
│   ├── vue/
│   │   └── CoffeeDonation.vue  # Vue component
│   └── nextjs/
│       └── components/
│           └── CoffeeDonation.tsx
│
├── server-examples/             # Backend implementations
│   ├── express/
│   │   ├── server.js
│   │   ├── package.json
│   │   ├── .env.example
│   │   └── README.md
│   ├── nextjs-api/
│   │   ├── pages/api/donate.js
│   │   └── README.md
│   ├── vercel-edge/
│   │   ├── api/donate.js
│   │   └── README.md
│   └── cloudflare-worker/
│       ├── index.js
│       ├── wrangler.toml
│       └── README.md
│
├── tests/                       # Test files
│   ├── widget.test.js
│   ├── eip712.test.js
│   ├── validation.test.js
│   └── integration/
│       └── payment-flow.test.js
│
└── scripts/                     # Build and utility scripts
    ├── build.js                 # Build minified versions
    └── deploy-demo.js           # Deploy demo site
```

---

## 🛠️ Technical Stack

### Official x402 Packages (Core Dependencies)

**Server-Side:**
- **x402-express** - Official x402 middleware for Express.js
- **@coinbase/x402** - Mainnet facilitator package
- Handles: 402 responses, payment verification, blockchain settlement

**Client-Side:**
- **Viem** (v2.x) - Modern Ethereum library for wallet interaction
- Handles: Wallet connection, typed data signing, network switching

**Client-Side (Optional Alternatives):**
- **x402-fetch** - Official client for fetch API
- **x402-axios** - Official client for axios
- Note: We use Viem directly, but these are available for different approaches

### What We Build (Custom)

**Frontend:**
- Widget UI/UX (HTML + CSS)
- Button components and states
- Custom amount modal
- Loading/success/error animations

**Backend (Thin Layer):**
- Rate limiting (on top of x402-express)
- Custom donation logic
- Thank you messages
- Analytics hooks (optional)

**Documentation:**
- Setup guides
- Security checklist
- Platform-specific examples
- Troubleshooting

### Official x402 Facilitator

**Testnet:**
- URL: `https://x402.org/facilitator`
- Networks: Base Sepolia, Solana Devnet
- Free to use
- No authentication required

**Mainnet:**
- Package: `@coinbase/x402`
- Networks: Base Mainnet
- Fee-free USDC payments
- **Requires CDP API Keys:**
  - `CDP_API_KEY_ID` - Your Coinbase Developer Platform API Key ID
  - `CDP_API_KEY_SECRET` - Your CDP API Key Secret
  - Obtain from: https://portal.cdp.coinbase.com

**What Facilitator Provides:**
- ✅ Signature verification (automatic)
- ✅ Nonce management (automatic)
- ✅ Replay attack prevention (automatic)
- ✅ On-chain settlement (automatic)
- ✅ Gas sponsorship (gasless for users)
- ✅ x402 Bazaar listing (automatic if discoverable: true)

### Blockchain Layer

**Network:** Base (Ethereum L2)
- **Mainnet:** Chain ID 8453
- **Testnet:** Base Sepolia (Chain ID 84532)

**Token:** USDC (Circle's USD Coin)
- **Base Mainnet:** `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Base Sepolia:** `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- EIP-3009 compliant (gasless transfers)

### Development Tools

**Testing:**
- Jest for unit tests
- Playwright for E2E tests
- Base Sepolia testnet
- Circle USDC faucet

**Build:**
- Vite for bundling
- TypeScript for type safety
- ESLint for code quality

---

## 📦 Core Features & Requirements

### MVP (Minimum Viable Product)

#### 1.1 Frontend Widget
**Status:** 🟢 Complete (Testing)

| Feature | Priority | Description | Acceptance Criteria | Status |
|---------|----------|-------------|---------------------|--------|
| Button UI | P0 | Display donation button with preset amounts | - Shows 3 preset amounts + custom<br>- Responsive design<br>- Light/dark themes | 🟢 Complete |
| Wallet Connection | P0 | Connect via Viem wallet client | - Detects wallet automatically<br>- Requests account access<br>- Handles rejection gracefully | 🟢 Complete |
| Network Detection | P0 | Verify correct blockchain network | - Detects current network via Viem<br>- Prompts to switch if wrong<br>- Adds network if missing | 🟢 Complete |
| Payment Signing | P0 | Sign payment with Viem | - Uses Viem's signTypedData<br>- Proper EIP-712 structure<br>- Handles cancellation | 🟢 Complete |
| Status Feedback | P0 | Show loading/success/error states | - Loading spinner during process<br>- Success animation<br>- Clear error messages | 🟢 Complete |
| Custom Amount | P1 | Allow users to enter custom donation | - Modal with input field<br>- Validation (min/max)<br>- USD denomination | 🟢 Complete |
| Coinbase Onramp | P2 | Optional "Get more USDC" button | - Integrates Coinbase Onramp<br>- Helps non-crypto users buy USDC<br>- Requires CDP Client API key<br>- Built into x402-express | 🔴 Not Started |

**Technical Requirements:**
- Use **Viem** (v2.x) for wallet interaction (not raw window.ethereum)
- Use **Wagmi** (optional) for React implementation
- Pure JavaScript widget with no framework dependencies for vanilla usage
- < 50KB minified (excluding Viem which users can load via CDN)
- Modern browsers (ES6+)

**Key Libraries:**
```json
{
  "dependencies": {
    "viem": "^2.0.0"
  }
}
```

**Testing Criteria:**
- [x] Widget renders on vanilla HTML
- [x] Wallet connection works via Viem
- [x] Network switching via Viem works correctly
- [x] Payment signature uses Viem's signTypedData
- [x] Custom amount validation works
- [x] All UI states display correctly
- [x] Responsive on mobile/tablet/desktop

---

#### 1.2 Server-Side Examples
**Status:** 🟡 In Progress

| Example | Priority | Description | Acceptance Criteria | Status |
|---------|----------|-------------|---------------------|--------|
| Express.js | P0 | Basic Node.js server with x402-express | - Uses official x402-express middleware<br>- Returns 402 on initial request<br>- Facilitator verifies payment<br>- Returns success on valid payment | 🟢 Complete |
| Next.js Middleware | P0 | Using official x402-next package | - Uses x402-next middleware<br>- Works on Vercel<br>- TypeScript support<br>- Middleware-based (not API routes) | 🔴 Not Started |
| Vercel Edge Function | P1 | Ultra-fast edge deployment | - Adapted from x402-express<br>- < 100ms response time<br>- Global deployment | 🔴 Not Started |
| Cloudflare Worker | P1 | Edge compute alternative | - Adapted for Workers environment<br>- KV storage for nonces (optional)<br>- < 50ms p99 latency | 🔴 Not Started |

**Technical Requirements:**
- Use **x402-express** official package (not custom middleware)
- Use official **Coinbase facilitator**:
  - Testnet: `https://x402.org/facilitator`
  - Mainnet: `@coinbase/x402` package
- Environment variable configuration
- Rate limiting (custom implementation on top of x402)
- Dynamic pricing support (based on request body)

**Package Dependencies:**
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "x402-express": "latest",
    "x402-next": "latest",        // For Next.js projects
    "@coinbase/x402": "latest",
    "dotenv": "^16.0.0"
  }
}
```

**Next.js Example (Using x402-next):**
```typescript
// middleware.ts
import { paymentMiddleware } from "x402-next";
import { facilitator } from "@coinbase/x402";

export const middleware = paymentMiddleware(
  process.env.WALLET_ADDRESS,
  {
    "/protected": {
      price: "$1.00",
      network: "base-sepolia",
      config: {
        description: "Support this creator"
      }
    }
  },
  facilitator
);

export const config = {
  matcher: ["/protected/:path*"]
};
```

**Example Implementation (Express):**
```javascript
import express from "express";
import { paymentMiddleware } from "x402-express";

const app = express();

app.use(paymentMiddleware(
  process.env.WALLET_ADDRESS,
  {
    "POST /api/donate": {
      price: "$1.00", // or dynamic based on req.body.amount
      network: process.env.NETWORK || "base-sepolia",
      config: {
        description: "Support this creator with a crypto donation",
        discoverable: true, // Enable x402 Bazaar listing
        inputSchema: {
          type: "object",
          properties: {
            amount: {
              type: "number",
              description: "Donation amount in USD",
              minimum: 0.01
            }
          }
        }
      }
    }
  },
  { 
    url: process.env.FACILITATOR_URL || "https://x402.org/facilitator"
  }
));

// Your donation endpoint logic
app.post("/api/donate", (req, res) => {
  res.json({
    success: true,
    message: "Thank you for your donation!",
    amount: req.body.amount
  });
});
```

**Testing Criteria:**
- [x] Express example runs locally with x402-express
- [ ] Next.js deploys to Vercel with official middleware
- [ ] Edge function handles concurrent requests
- [x] All examples verify payments via facilitator
- [ ] Rate limiting prevents spam (custom implementation)
- [ ] Dynamic pricing works based on request
- [x] Testnet facilitator URL works correctly
- [x] Environment variables configure properly

---

#### 1.3 Documentation
**Status:** 🔴 Not Started

| Document | Priority | Description | Acceptance Criteria |
|----------|----------|-------------|---------------------|
| README.md | P0 | Project overview and quick start | - Clear value proposition<br>- 30-second pitch<br>- Quick start in 5 minutes |
| SETUP-GUIDE.md | P0 | Complete implementation guide | - Step-by-step instructions<br>- Platform-specific guides<br>- Troubleshooting section |
| SECURITY-CHECKLIST.md | P0 | Security best practices | - Pre-launch checklist<br>- Common vulnerabilities<br>- Mitigation strategies |
| API-REFERENCE.md | P1 | Widget API documentation | - All configuration options<br>- Method signatures<br>- Code examples |
| CUSTOMIZATION.md | P1 | Styling and theming guide | - CSS customization<br>- Theme creation<br>- Logo guidelines |
| FAQ.md | P1 | Frequently asked questions | - Setup questions<br>- Technical issues<br>- Best practices |

**Testing Criteria:**
- [ ] New user can set up in <5 minutes following docs
- [ ] All code examples are tested and work
- [ ] Security checklist covers all critical items
- [ ] FAQs answer 80% of common questions
- [ ] Documentation is clear to non-technical users

---

#### 1.4 Visual Assets
**Status:** 🔴 Not Started

| Asset | Priority | Description | Acceptance Criteria |
|-------|----------|-------------|---------------------|
| Logo - Primary | P0 | Main logo (coffee + crypto theme) | - SVG format<br>- Scalable<br>- Works on light/dark bg |
| Logo - Variations | P1 | Different color/size variants | - White version<br>- Dark version<br>- Icon-only version |
| Button Designs | P0 | Pre-styled button templates | - 3-4 design options<br>- Light/dark themes<br>- Different sizes |
| GitHub Assets | P1 | Social preview, banner | - Open Graph image (1200x630)<br>- Repository banner<br>- Demo GIF/video |
| Demo Screenshots | P1 | Example implementations | - Desktop view<br>- Mobile view<br>- Success states |

**Testing Criteria:**
- [ ] Logo renders clearly at all sizes
- [ ] Buttons match design specs
- [ ] All assets are optimized (<50KB each)
- [ ] Dark mode works correctly
- [ ] Accessibility contrast ratios met

---

## 🧪 Testing & Validation Strategy

### Testing Framework

```
Testing Pyramid:
┌──────────────────┐
│   Manual E2E     │  <- User acceptance testing
├──────────────────┤
│  Integration     │  <- API + Wallet interaction
├──────────────────┤
│   Unit Tests     │  <- Individual functions
└──────────────────┘
```

### Test Categories

#### 1. Unit Tests
**Target Coverage:** 80%

| Component | Test Cases | Status |
|-----------|------------|--------|
| Widget Constructor | Valid/invalid config, defaults | 🔴 |
| Payment Payload Builder | EIP-712 structure, all networks | 🔴 |
| Network Detection | Chain ID matching, switching | 🔴 |
| Signature Generation | Valid typed data, error handling | 🔴 |
| UI State Management | All states transition correctly | 🔴 |
| Amount Validation | Min/max, decimal handling, edge cases | 🔴 |

**Tools:**
- Jest for JavaScript testing
- Test coverage reports
- CI/CD integration

---

#### 2. Integration Tests
**Focus:** End-to-end payment flows

| Scenario | Steps | Expected Result | Status |
|----------|-------|-----------------|--------|
| Happy Path - Preset Amount | 1. Click $5 button<br>2. Connect wallet<br>3. Sign payment<br>4. Verify | Success message, funds received | 🔴 |
| Happy Path - Custom Amount | 1. Click custom<br>2. Enter $7.50<br>3. Sign<br>4. Verify | Custom amount processed | 🔴 |
| Wrong Network | 1. User on Ethereum<br>2. Widget expects Base<br>3. Prompt switch | Network switched, payment continues | 🔴 |
| User Rejection | 1. Click donate<br>2. Reject wallet signature | Clear error, can retry | 🔴 |
| Network Failure | 1. Disconnect internet<br>2. Try payment | Timeout error, helpful message | 🔴 |
| Replay Attack | 1. Complete payment<br>2. Replay signature | Server rejects duplicate | 🔴 |

**Test Environments:**
- Base Sepolia Testnet (primary)
- Local hardhat node
- Base Mainnet (final validation)

---

#### 3. Security Tests

| Test | Description | Priority | Status |
|------|-------------|----------|--------|
| Signature Validation | Verify EIP-712 signatures properly | P0 | 🔴 |
| Nonce Uniqueness | Prevent replay attacks | P0 | 🔴 |
| Amount Tampering | Prevent client-side amount changes | P0 | 🔴 |
| Recipient Verification | Ensure funds go to correct address | P0 | 🔴 |
| Rate Limiting | Prevent spam/DOS attacks | P0 | 🔴 |
| CORS Configuration | Proper origin restrictions | P1 | 🔴 |
| XSS Prevention | No script injection via widget | P0 | 🔴 |
| Private Key Exposure | Never expose keys in client | P0 | 🔴 |

**Security Audit:**
- [ ] Self-review against OWASP Top 10
- [ ] Third-party security review (if budget allows)
- [ ] Bug bounty program (post-launch)

---

#### 4. Browser/Wallet Compatibility

| Browser | MetaMask | Coinbase Wallet | WalletConnect | Status |
|---------|----------|-----------------|---------------|--------|
| Chrome Desktop | ✓ | ✓ | ✓ | 🔴 |
| Firefox Desktop | ✓ | ✓ | ✓ | 🔴 |
| Safari Desktop | ✓ | ✓ | ✓ | 🔴 |
| Edge Desktop | ✓ | ✓ | ✓ | 🔴 |
| Chrome Mobile | ✓ | ✓ | ✓ | 🔴 |
| Safari Mobile | ✓ | ✓ | ✓ | 🔴 |

---

#### 5. Performance Tests

| Metric | Target | Test Method | Status |
|--------|--------|-------------|--------|
| Widget Load Time | < 500ms | Lighthouse | 🔴 |
| Payment Completion | < 5s | End-to-end timing | 🔴 |
| Bundle Size | < 50KB | Webpack bundle analyzer | 🔴 |
| Server Response | < 200ms | Load testing (k6) | 🔴 |
| Concurrent Users | 100 req/s | Stress testing | 🔴 |

---

#### 6. User Acceptance Testing (UAT)

**Test Users:** 5-10 creators across different platforms

| Criteria | Success Metric | Test Method |
|----------|----------------|-------------|
| Setup Time | < 5 minutes | Timed task completion |
| Setup Success | 90% complete without help | Observation + survey |
| Documentation Clarity | 4/5 rating | Post-test survey |
| Payment Success Rate | > 95% | Transaction monitoring |
| User Satisfaction | 4/5 rating | NPS survey |

**UAT Phases:**
1. **Alpha:** Internal team + 2-3 friendly users
2. **Beta:** 10 real creators, private launch
3. **Public:** Open to all with monitoring

---

## 📊 Progress Tracking

### Sprint Planning (2-week sprints)

#### Sprint 1: Foundation (Week 1-2)
**Goal:** Basic widget + Express example using official x402 packages
**Status:** 🟡 In Progress (95% complete - Final debugging)

- [x] Set up repository structure
- [x] Install x402-express and viem packages
- [x] Study official x402-express examples from GitHub
- [x] Create basic widget skeleton (HTML/CSS)
- [x] Implement wallet connection via Viem
- [x] Create Express.js server with x402-express middleware
- [x] Configure testnet facilitator (`https://x402.org/facilitator`)
- [ ] Test on Base Sepolia testnet (browser cache blocker)

**Success Criteria:**
- [x] Widget displays and connects wallet via Viem
- [x] Server uses x402-express middleware (not custom code)
- [x] Returns 402 with proper payment requirements
- [ ] Can complete test donation on testnet (pending browser cache clear)
- [ ] Facilitator verifies payment automatically (pending final test)

---

#### Sprint 2: Payment Flow (Week 3-4)
**Goal:** Complete payment signing and verification using official tools
**Status:** 🟡 Partially Complete (Early Start)

- [x] Implement payment signing via Viem's signTypedData
- [x] Build payment submission with X-PAYMENT header
- [x] Verify facilitator handles signature verification
- [x] Add network detection and switching via Viem
- [x] Create loading/success/error states
- [x] Handle edge cases (rejection, timeout, wrong network)
- [ ] Write unit tests for widget functions
- [ ] Test full flow with official facilitator (pending browser cache fix)

**Success Criteria:**
- [ ] End-to-end payment works on testnet using official packages (pending)
- [x] Viem handles wallet signing (no custom EIP-712 code)
- [ ] Facilitator verifies payment automatically (pending final test)
- [x] All error scenarios handled gracefully
- [ ] 60% unit test coverage

---

#### Sprint 3: Documentation & Polish (Week 5-6)
**Goal:** Production-ready with complete docs

- [ ] Write README.md with quick start
- [ ] Create SETUP-GUIDE.md
- [ ] Write SECURITY-CHECKLIST.md
- [ ] Design and export logo assets
- [ ] Create button design variants
- [ ] Add custom amount modal
- [ ] Polish UI animations
- [ ] Create demo video

**Success Criteria:**
- New user can set up in <5 minutes
- All documentation complete
- Visual assets ready
- Demo site deployed

---

#### Sprint 4: Additional Examples (Week 7-8)
**Goal:** Support major platforms using x402 official packages

- [ ] Create Next.js API route example with x402-express
- [ ] Create Vercel Edge function example (adapted from x402-express)
- [ ] Build WordPress plugin POC (if feasible)
- [ ] Write integration tests for all server examples
- [ ] Add x402 Bazaar metadata (discoverable endpoints)
- [ ] Create example deployments (Railway, Vercel)
- [ ] Test on Base mainnet with small amounts

**Success Criteria:**
- 3+ server examples using official x402 packages
- Integration tests passing
- Endpoints discoverable in x402 Bazaar
- Successfully processed real mainnet donation

---

#### Sprint 5: Launch Prep (Week 9-10)
**Goal:** Public launch ready

- [ ] Conduct security audit
- [ ] Complete UAT with 5 beta users
- [ ] Set up analytics/monitoring
- [ ] Create social media assets
- [ ] Write launch blog post
- [ ] Prepare Product Hunt launch
- [ ] Set up community Discord/Telegram
- [ ] Create video walkthrough

**Success Criteria:**
- Zero critical security issues
- 90% UAT success rate
- All launch materials ready
- Beta users successfully receiving donations

---

### Feature Status Legend

| Symbol | Status | Description |
|--------|--------|-------------|
| 🔴 | Not Started | Not yet begun |
| 🟡 | In Progress | Actively being worked on |
| 🟢 | Complete | Done and tested |
| 🔵 | In Review | Awaiting review/approval |
| ⚫ | Blocked | Waiting on dependency |
| ⚪ | Backlog | Planned for future |

---

## 🎯 Key Milestones

| Milestone | Target Date | Description | Status |
|-----------|-------------|-------------|--------|
| M1: Repository Created | Nov 15 | GitHub repo initialized, basic structure | 🟢 Complete |
| M2: Widget Renders | Nov 15 | Widget displays and connects wallet | 🟢 Complete |
| M3: Testnet Payment Works | Nov 16 | First successful testnet donation | 🟡 In Progress (95%) |
| M4: Documentation Complete | Dec 13 | All core docs written | 🔴 Not Started |
| M5: Multiple Platform Support | Dec 27 | Express, Next.js, Vercel working | 🔴 Not Started |
| M6: Beta Launch | Jan 3 | 5 creators using in production | 🔴 Not Started |
| M7: Public Launch | Jan 10 | Product Hunt launch, public release | 🔴 Not Started |
| M8: First 100 Users | Jan 24 | 100 creators actively using | 🔴 Not Started |

---

## 🔍 Validation Criteria

### Technical Validation

**Must Pass Before Launch:**
- [ ] All P0 features implemented and tested
- [ ] Security checklist 100% complete
- [ ] Zero critical bugs
- [ ] Payment success rate > 95% in testing
- [ ] Widget loads in < 500ms
- [ ] Works on all major browsers
- [ ] Mobile responsive
- [ ] Accessibility standards met (WCAG 2.1 AA)

---

### Business Validation

**Success Indicators:**
- [ ] 10+ beta users successfully deployed
- [ ] Average setup time < 5 minutes
- [ ] User satisfaction > 4/5
- [ ] Zero security incidents
- [ ] Documentation rated 4/5+
- [ ] At least 3 different hosting platforms supported

---

### Community Validation

**Pre-Launch:**
- [ ] 5+ contributors to codebase
- [ ] 50+ GitHub stars
- [ ] Active Discord/Telegram community
- [ ] Positive feedback from web3 community
- [ ] Endorsements from crypto influencers

---

## 🔍 Validation Criteria

### Technical Validation

**Must Pass Before Launch:**
- [ ] All P0 features implemented using official x402 packages
- [ ] Server uses x402-express middleware (not custom code)
- [ ] Client uses Viem for wallet interaction
- [ ] Facilitator handles verification automatically
- [ ] Security checklist 100% complete
- [ ] Zero critical bugs
- [ ] Payment success rate > 95% in testing
- [ ] Widget loads in < 500ms
- [ ] Works on all major browsers
- [ ] Mobile responsive
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] Endpoints discoverable in x402 Bazaar (if configured)

---

### User Validation

**Success Indicators:**
- [ ] 5+ beta users successfully deployed
- [ ] Average setup time < 5 minutes
- [ ] Documentation is clear and complete
- [ ] Zero security incidents in testing
- [ ] Positive feedback from testers

---

## 🚧 Known Limitations

### Current Scope (MVP)

1. **Network Support:** Base network only (Base Sepolia for testing, Base Mainnet for production)
2. **Token Support:** USDC only
3. **Wallet Support:** MetaMask and Coinbase Wallet
4. **Language:** English only
5. **Analytics:** None (creators track via blockchain explorer)

### Out of Scope (May be community contributions later)

- Multi-chain support (Ethereum, Polygon, etc.)
- Multi-token support (ETH, DAI, etc.)
- Analytics dashboard
- Recurring donations
- Creator profiles or directories
- Mobile app

---

## 🌐 x402 Ecosystem Integration

### Official Resources We Leverage

**Documentation:**
- Official x402 docs: https://docs.cdp.coinbase.com/x402/
- GitHub examples: https://github.com/coinbase/x402
- Community Discord: https://discord.gg/invite/cdp

**Packages:**
- `x402-express` - Express.js middleware
- `@coinbase/x402` - Mainnet facilitator
- Official TypeScript types included

**Discovery Layer:**
When creators deploy with `discoverable: true`, their donation endpoints automatically appear in:
- **x402 Bazaar** - Official discovery platform for x402 services
- Searchable by AI agents and users
- Free listing (no fees)

### What This Gives Us

**Automatic Features:**
- ✅ Payment verification (handled by facilitator)
- ✅ Security (signatures, nonces, replay prevention)
- ✅ Gas sponsorship (users don't pay gas)
- ✅ Settlement (direct to creator wallet)
- ✅ Discovery (x402 Bazaar listing)

**Community Benefits:**
- ✅ Best practices from Coinbase engineers
- ✅ Active development and updates
- ✅ Security audits by Coinbase
- ✅ Growing ecosystem of compatible tools
- ✅ Support from official Discord

### Our Value-Add

While we use official x402 packages, we provide:

1. **Simplified UX for Donations**
   - Pre-built donation button designs
   - Optimized for content creator use case
   - Clear setup guides for non-technical creators

2. **Platform-Specific Examples**
   - WordPress integration guide
   - Ghost CMS setup
   - Static site generators (Hugo, Jekyll)
   - CMS platforms (Webflow, Framer)

3. **Creator-Focused Documentation**
   - Security checklist for creators
   - Tax reporting guidance
   - Customization guides
   - Troubleshooting specific to donations

4. **Open Source Community**
   - Gather feedback from creators
   - Share best practices
   - Build integrations
   - Support each other

---

## 🔐 Risk Assessment

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| Security vulnerability | Critical | Medium | Thorough testing, security audit, bug bounty |
| x402 protocol changes | High | Low | Monitor protocol updates, maintain flexibility |
| Wallet compatibility issues | Medium | Medium | Extensive testing, fallback options |
| Low adoption rate | Medium | Medium | Strong marketing, excellent docs, community |
| Regulatory concerns | Medium | Low | Operate as tool, not service; no custody |
| Competition | Low | High | Open source advantage, zero fees |
| Blockchain congestion | Medium | Low | Multi-chain support, L2 focus |

---

## 📅 Review Schedule

| Review Type | Frequency | Notes |
|-------------|-----------|-------|
| Sprint Planning | Every 2 weeks | Plan next 2 weeks of work |
| Security Review | Pre-launch | Before going public |
| User Feedback | After beta testing | Incorporate feedback before launch |

---

## 📚 References & Resources

### Official x402 Protocol Resources
- **x402 Documentation:** https://docs.cdp.coinbase.com/x402/welcome
- **x402 GitBook:** https://x402.gitbook.io/x402
- **x402 GitHub Repository:** https://github.com/coinbase/x402
- **x402 Quickstart (Sellers):** https://docs.cdp.coinbase.com/x402/quickstart-for-sellers
- **x402 Whitepaper:** https://www.x402.org/x402-whitepaper.pdf
- **x402 Community Discord:** https://discord.gg/invite/cdp
- **CDP Portal (API Keys):** https://portal.cdp.coinbase.com

### Official Packages
- **x402-express:** npm package for Express.js middleware
- **x402-next:** npm package for Next.js middleware
- **@coinbase/x402:** Mainnet facilitator package
- **x402-fetch:** Official client for fetch API (optional)
- **x402-axios:** Official client for axios (optional)
- **Viem:** https://viem.sh - Modern Ethereum library (recommended for wallets)
- **Wagmi:** https://wagmi.sh - React Hooks for Ethereum (optional)

### Blockchain Technical References
- **EIP-712 Specification:** https://eips.ethereum.org/EIPS/eip-712
- **EIP-3009 (Transfer Authorization):** https://eips.ethereum.org/EIPS/eip-3009
- **Base Network Docs:** https://docs.base.org
- **USDC Contract Addresses:** https://www.circle.com/en/usdc

### Testing Resources
- **Base Sepolia Explorer:** https://sepolia.basescan.org
- **Base Mainnet Explorer:** https://basescan.org
- **Circle USDC Faucet:** https://faucet.circle.com
- **x402 Testnet Facilitator:** https://x402.org/facilitator

### x402 Ecosystem
- **x402 Bazaar:** Discovery platform for x402 services
- **x402 Official Site:** https://www.x402.org
- **Coinbase Developer Platform:** https://www.coinbase.com/developer-platform

### Inspiration & Competitors
- Buy Me a Coffee: https://www.buymeacoffee.com
- Ko-fi: https://ko-fi.com
- Gitcoin Grants: https://gitcoin.co

---

## ✅ Definition of Done

### Feature Complete Checklist

A feature is considered "done" when:

- [ ] Code is written and follows style guide
- [ ] Unit tests written and passing (>80% coverage)
- [ ] Integration tests passing
- [ ] Documentation updated
- [ ] Security review completed
- [ ] Tested on all target browsers
- [ ] Tested on mobile devices
- [ ] Performance benchmarks met
- [ ] Accessibility checked
- [ ] Code reviewed and approved
- [ ] Merged to main branch
- [ ] Deployed to staging environment
- [ ] User acceptance testing passed

---

## 🔄 Architecture Refactoring (Sprint 1.5)

### Status: In Progress (Nov 19-21, 2025)

#### Why Refactoring?

After Sprint 1 reached 95% completion, we conducted a comprehensive architecture review and discovered critical misalignment with x402 protocol best practices:

**Problems Identified:**
1. ❌ Built custom payment verification (x402-express does this automatically)
2. ❌ Manual signature validation (Coinbase Facilitator handles this)
3. ❌ Not leveraging official x402 packages correctly
4. ❌ Violating architecture boundaries (implementing protocol layer)

**Impact:**
- High priority - must fix before launch
- Does not invalidate Sprint 1 work (UI/UX remains valuable)
- Estimated 3 days to refactor properly

#### Refactoring Approach

**See:** `REFACTORING_PLAN.md` for detailed 3-phase plan

**Phase 1: Install & Configure (Day 1)**
- Research official x402 packages
- Install x402-express, @coinbase/x402
- Remove custom verification code
- Create backup branch

**Phase 2: Refactor Servers (Day 2)**
- Replace custom middleware with x402-express
- Configure Coinbase Facilitator
- Test 402 responses
- Update error handling

**Phase 3: Update Widget & Docs (Day 3)**
- Refactor widget payment flow
- Use server-provided payment requirements
- Update all documentation
- Test end-to-end

#### Success Criteria

Refactoring complete when:
- [ ] Zero custom verification code remains
- [ ] All servers use x402-express middleware
- [ ] Coinbase Facilitator validates all payments
- [ ] Architecture boundaries respected
- [ ] End-to-end testnet payment succeeds
- [ ] Documentation reflects x402-first approach

#### Key Lessons

1. **Read Official Docs First** - Would have saved 3 days
2. **Respect Protocol Boundaries** - Don't reinvent what exists
3. **Progressive Validation** - Review architecture at 25%, 50%, 75%
4. **PRD Compliance** - Treat PRD as source of truth

---

## 📝 Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-11-08 | 1.0.0 | Initial PRD created | [Your name] |
| 2025-11-16 | 1.0.1 | Updated progress: Sprint 1 95% complete, widget and Express server done | [Your name] |
| 2025-11-19 | 1.1.0 | **MAJOR UPDATE**: Architecture review and refactoring plan<br>- Added architecture boundaries section<br>- Added refactoring notice<br>- Clarified what we build vs what x402 handles<br>- Added violation examples<br>- Created REFACTORING_PLAN.md | [Your name] |

---

## 💬 Feedback & Questions

For questions or feedback on this PRD:
- GitHub Discussions: [Link when available]
- Discord: [Link when available]
- Email: [Your email]

---

## 📋 Current Action Items

**Immediate (Sprint 1.5 - Nov 19-21):**
1. ✅ Architecture review complete
2. ✅ Refactoring plan created
3. ⏳ Begin Phase 1: Research & install x402 packages
4. ⏳ Execute Phase 2: Refactor server examples
5. ⏳ Execute Phase 3: Update widget & documentation

**After Refactoring (Sprint 2):**
1. Complete first testnet transaction (x402 compliant)
2. Write comprehensive documentation
3. Add unit and integration tests
4. Prepare for beta testing

