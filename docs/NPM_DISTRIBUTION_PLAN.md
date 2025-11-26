# NPM Distribution Plan - CryptoMeACoffee Widget

**Status**: Ready for Implementation (after floating widget completion)
**Feasibility**: ✅ CONFIRMED - Widget is 95% ready for NPM publication
**Estimated Time**: 3-4 hours total
**Last Updated**: November 22, 2025

---

## Executive Summary

The CryptoMeACoffee widget is fully compatible with NPM distribution and CDN delivery. The build system correctly bundles x402 client and viem into a single UMD file suitable for CDN usage via unpkg/jsDelivr.

### Key Findings

**✅ What's Working:**
- x402 client library properly bundled (~80 KB)
- Viem integration correctly included (~350 KB)
- UMD format compatible with `<script>` tags
- ES module format available for bundlers
- Bundle size: 447 KB → 132 KB gzipped (acceptable)
- No server-side dependencies in bundle
- Browser-only code, fully compatible

**⚠️ What Needs Fixing:**
- package.json missing NPM publication fields (2 hours)
- No .npmignore file to control published files (15 minutes)
- README needs NPM-focused version (1 hour)

---

## Table of Contents

1. [Current Build Configuration](#1-current-build-configuration)
2. [x402 Client Library Bundling](#2-x402-client-library-bundling)
3. [Package.json Configuration](#3-packagejson-configuration)
4. [Required Changes](#4-required-changes-for-npm-publication)
5. [Implementation Steps](#5-step-by-step-implementation)
6. [Testing Strategy](#6-testing-strategy)
7. [Post-Publication](#7-post-publication-tasks)

---

## 1. Current Build Configuration

### Vite Configuration (vite.config.js)

```javascript
export default defineConfig({
  build: {
    lib: {
      entry: 'src/widget.js',
      name: 'CryptoMeACoffee',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [],  // ✅ Bundles everything (x402 + viem)
      output: { globals: {} }
    }
  }
});
```

**Analysis:**
- ✅ Correct approach: Bundles x402 and viem dependencies
- ✅ UMD format: Compatible with `<script>` tags
- ✅ ES format: Compatible with modern bundlers
- ✅ Global namespace: `window.CryptoMeACoffee` available

### Build Output

```
dist/
├── widget.umd.js        447 KB (132 KB gzipped) - CDN ready
├── widget.umd.js.map    2.8 MB - Source maps
├── widget.es.js         113 B  - ES module entry
├── widget.es.js.map     94 B   - Source maps
└── widget-[hash].mjs    628 KB - Actual ES module code
```

**Bundle Composition:**
- Viem: ~350 KB (78%)
- x402: ~80 KB (18%)
- Widget code: ~17 KB (4%)

---

## 2. x402 Client Library Bundling

### Integration Status: ✅ PERFECT

The widget correctly uses official x402 client functions:

```javascript
import { createPaymentHeader, selectPaymentRequirements } from 'x402/client';
```

**Bundled x402 Functions:**
- `createPaymentHeader()` - Official payment signing
- `selectPaymentRequirements()` - Payment option selection
- All EIP-712 signing utilities
- Payment requirement validation
- Authorization structure creation

**Compatibility:**
- ✅ x402@0.7.2 supports both ESM and CJS
- ✅ Vite correctly resolves `x402/client` subpath
- ✅ All functions available in bundled output
- ✅ No dynamic imports (everything static)
- ✅ Browser-compatible (uses native crypto APIs)

### Viem Integration

**Bundled Viem Functions:**
```javascript
import { createWalletClient, custom } from 'viem';
import { baseSepolia, base } from 'viem/chains';
```

**Included:**
- `createWalletClient()` - Wallet client creation
- `custom()` transport - window.ethereum integration
- Chain configs (Base, Base Sepolia)
- Address validation
- Transaction signing utilities

**Compatibility:**
- ✅ viem@2.39.3 fully browser-compatible
- ✅ No Node.js dependencies
- ✅ Uses native browser APIs
- ✅ Works with window.ethereum providers

---

## 3. Package.json Configuration

### Current State (Incomplete)

```json
{
  "name": "cryptomeacoffee",
  "version": "1.0.0",
  "description": "Open-source, self-hosted donation widget...",
  "main": "dist/widget.umd.js",  // ✅ GOOD
  "scripts": {
    "build": "vite build"
  },
  "keywords": ["crypto", "donations", "x402", "web3"],
  "license": "MIT",
  "dependencies": {
    "viem": "^2.39.3",
    "x402": "^0.7.2"
  }
}
```

### ❌ Missing Critical Fields

1. **`module`** - ES module entry point
2. **`exports`** - Modern package entry points
3. **`unpkg`** - Specify UMD file for unpkg CDN
4. **`jsdelivr`** - Specify file for jsDelivr CDN
5. **`files`** - Whitelist what gets published
6. **`author`** - Publisher information
7. **`repository.url`** - GitHub URL
8. **`bugs.url`** - Issue tracker
9. **`homepage`** - Project website
10. **`types`** - TypeScript definitions (optional)

---

## 4. Required Changes for NPM Publication

### Priority 1: Critical (Must Have)

#### A. Update package.json

```json
{
  "name": "cryptomeacoffee",
  "version": "1.0.0",
  "description": "Open-source, self-hosted donation widget for accepting cryptocurrency donations via x402 protocol. Zero fees, direct to wallet.",

  "main": "dist/widget.umd.js",
  "module": "dist/widget.es.js",
  "unpkg": "dist/widget.umd.js",
  "jsdelivr": "dist/widget.umd.js",

  "exports": {
    ".": {
      "import": "./dist/widget.es.js",
      "require": "./dist/widget.umd.js"
    },
    "./styles.css": "./src/styles.css"
  },

  "files": [
    "dist/",
    "src/styles.css",
    "README.md",
    "LICENSE"
  ],

  "keywords": [
    "crypto",
    "cryptocurrency",
    "donations",
    "x402",
    "usdc",
    "base",
    "base-network",
    "web3",
    "ethereum",
    "payment",
    "widget",
    "viem",
    "self-hosted",
    "zero-fees"
  ],

  "author": "Your Name <your.email@example.com>",
  "license": "MIT",

  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/cryptomeacoffee.git"
  },

  "bugs": {
    "url": "https://github.com/yourusername/cryptomeacoffee/issues"
  },

  "homepage": "https://github.com/yourusername/cryptomeacoffee#readme",

  "dependencies": {
    "viem": "^2.39.3",
    "x402": "^0.7.2"
  },

  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "vite": "^5.0.0"
  },

  "scripts": {
    "build": "vite build",
    "prepublishOnly": "npm run build",
    "test": "jest"
  },

  "engines": {
    "node": ">=16.0.0"
  }
}
```

#### B. Create .npmignore

```
# Source files (already in dist/)
src/

# Development files
examples/
server-examples/
tests/
docs/
.claude/

# Build artifacts
node_modules/
.vite/
*.log

# Git files
.git/
.gitignore
.gitattributes

# Environment files
.env
.env.*

# Documentation (except main README)
PROGRESS_TRACKER.md
TESTING_GUIDE.md
CryptoMeACoffee_PRD.md
*.md
!README.md

# CI/CD
.github/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
```

#### C. Create NPM-Focused README.md

```markdown
# CryptoMeACoffee

> Accept USDC donations on your website via x402 protocol. Zero fees, self-hosted, fully open-source.

## Quick Start

### Via CDN (Easiest)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/cryptomeacoffee@1/src/styles.css">
</head>
<body>
  <div id="donation-widget"></div>

  <script src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"></script>
  <script>
    const widget = new CryptoMeACoffee({
      walletAddress: '0xYourAddress',
      apiEndpoint: 'https://your-api.com/api/donate'
    });
    widget.render('donation-widget');
  </script>
</body>
</html>
```

### Via NPM

```bash
npm install cryptomeacoffee
```

```javascript
import CryptoMeACoffee from 'cryptomeacoffee';
import 'cryptomeacoffee/styles.css';

const widget = new CryptoMeACoffee({
  walletAddress: '0xYourAddress',
  apiEndpoint: 'https://your-api.com/api/donate'
});

widget.render('donation-widget');
```

## Configuration

```javascript
const widget = new CryptoMeACoffee({
  // Required
  walletAddress: '0x...',        // Your wallet address
  apiEndpoint: 'https://...',    // Your x402 server endpoint

  // Optional
  presetAmounts: [1, 3, 5],      // Preset donation amounts (USD)
  theme: 'light',                // 'light' or 'dark'
  network: 'base-sepolia',       // 'base-sepolia' or 'base'
  buttonText: '☕ Buy me a coffee',
  successMessage: 'Thank you for your support!',
  logoUrl: null,                 // Custom logo URL
  minAmount: 0.01,               // Minimum donation (USD)
  maxAmount: 1000                // Maximum donation (USD)
});
```

## Server Setup Required

This widget requires a backend server running x402-express middleware. See [server examples](https://github.com/yourusername/cryptomeacoffee/tree/main/server-examples).

**Quick Backend Setup:**

```bash
# Clone server example
git clone https://github.com/yourusername/cryptomeacoffee
cd server-examples/express

# Set environment variables
cp .env.example .env
# Edit .env with your WALLET_ADDRESS

# Install and run
npm install
npm start
```

## Features

- ✅ **Zero Platform Fees** - Direct wallet-to-wallet via USDC
- ✅ **Self-Hosted** - You control everything
- ✅ **Gasless for Users** - x402 protocol sponsors gas fees
- ✅ **Instant Settlement** - Funds arrive immediately
- ✅ **Open Source** - MIT licensed
- ✅ **Easy Integration** - One script tag or npm install

## Documentation

- [Full Documentation](https://github.com/yourusername/cryptomeacoffee)
- [API Reference](https://github.com/yourusername/cryptomeacoffee/blob/main/docs/WIDGET_CONFIGURATION.md)
- [Examples](https://github.com/yourusername/cryptomeacoffee/tree/main/examples)
- [Server Setup](https://github.com/yourusername/cryptomeacoffee/tree/main/server-examples)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

**Requires:** MetaMask or Coinbase Wallet browser extension

## License

MIT - See [LICENSE](LICENSE) file

## Support

- [GitHub Issues](https://github.com/yourusername/cryptomeacoffee/issues)
- [GitHub Discussions](https://github.com/yourusername/cryptomeacoffee/discussions)
```

---

## 5. Step-by-Step Implementation

### Phase 1: Prepare Package (2 hours)

**Step 1.1: Update package.json**
```bash
# Add all missing fields from section 4A
# Update author, repository URLs
# Add exports, unpkg, jsdelivr fields
# Add files whitelist
```

**Step 1.2: Create .npmignore**
```bash
# Create file from section 4B
# Verify with: npm pack --dry-run
```

**Step 1.3: Create NPM-focused README.md**
```bash
# Write condensed README for npm
# Include CDN and npm usage examples
# Link to GitHub for full documentation
```

**Step 1.4: Verify Build**
```bash
npm run build
ls -lh dist/
# Verify all files present
```

### Phase 2: Test Package Locally (1 hour)

**Step 2.1: Create Test Tarball**
```bash
npm pack
# Creates: cryptomeacoffee-1.0.0.tgz
```

**Step 2.2: Test in Clean Project**
```bash
mkdir /tmp/test-cryptomeacoffee
cd /tmp/test-cryptomeacoffee
npm init -y
npm install /path/to/cryptomeacoffee-1.0.0.tgz

# Test UMD usage
cat > test.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/cryptomeacoffee/src/styles.css">
</head>
<body>
  <div id="widget"></div>
  <script src="node_modules/cryptomeacoffee/dist/widget.umd.js"></script>
  <script>
    console.log('CryptoMeACoffee:', typeof CryptoMeACoffee);
    const widget = new CryptoMeACoffee({
      walletAddress: '0x518Cb6A5475097Ac3dDe6D2AF98F7cb1593262FB',
      apiEndpoint: 'http://localhost:3001/api/donate'
    });
    widget.render('widget');
  </script>
</body>
</html>
EOF

# Open test.html in browser
open test.html
```

**Step 2.3: Verify Package Contents**
```bash
tar -tzf cryptomeacoffee-1.0.0.tgz

# Should only contain:
# package/dist/widget.umd.js
# package/dist/widget.umd.js.map
# package/dist/widget.es.js
# package/dist/widget.es.js.map
# package/src/styles.css
# package/README.md
# package/LICENSE
# package/package.json
```

### Phase 3: Publish to NPM (30 minutes)

**Step 3.1: NPM Account Setup**
```bash
# If you don't have an account
npm adduser

# If you already have an account
npm login
```

**Step 3.2: Verify Package Name**
```bash
npm view cryptomeacoffee
# Should return 404 (name available)
# Or check: https://www.npmjs.com/package/cryptomeacoffee
```

**Step 3.3: Dry Run**
```bash
npm publish --dry-run
# Review output, verify files list
```

**Step 3.4: Publish**
```bash
npm publish

# Output should show:
# + cryptomeacoffee@1.0.0
```

**Step 3.5: Verify Publication**
```bash
npm view cryptomeacoffee

# Check package page
open https://www.npmjs.com/package/cryptomeacoffee
```

### Phase 4: Test CDN Delivery (30 minutes)

**Step 4.1: Wait for CDN Propagation**
```
Wait 5-10 minutes for unpkg/jsDelivr to index the package
```

**Step 4.2: Test unpkg**
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/cryptomeacoffee@1/src/styles.css">
</head>
<body>
  <div id="widget"></div>
  <script src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"></script>
  <script>
    const widget = new CryptoMeACoffee({
      walletAddress: '0x518Cb6A5475097Ac3dDe6D2AF98F7cb1593262FB',
      apiEndpoint: 'https://your-server.vercel.app/api/donate',
      network: 'base-sepolia'
    });
    widget.render('widget');
  </script>
</body>
</html>
```

**Step 4.3: Test jsDelivr**
```html
<script src="https://cdn.jsdelivr.net/npm/cryptomeacoffee@1/dist/widget.umd.js"></script>
```

**Step 4.4: End-to-End Payment Test**
- Load widget from CDN
- Connect MetaMask/Coinbase Wallet
- Select donation amount
- Sign and submit payment
- Verify server receives payment
- Verify facilitator processes payment
- Confirm success message displays

---

## 6. Testing Strategy

### Pre-Publication Tests

✅ **Package Structure**
```bash
npm pack --dry-run
# Verify only necessary files included
```

✅ **UMD Bundle**
```bash
# Check global namespace
grep "window.CryptoMeACoffee" dist/widget.umd.js
```

✅ **Dependencies Bundled**
```bash
# Verify x402 included
grep "createPaymentHeader" dist/widget.umd.js
# Verify viem included
grep "createWalletClient" dist/widget.umd.js
```

✅ **No Server Code**
```bash
# Should find nothing
grep "require('fs')" dist/widget.umd.js
grep "require('http')" dist/widget.umd.js
```

### Post-Publication Tests

✅ **NPM Installation**
```bash
npm install cryptomeacoffee
node -e "const W = require('cryptomeacoffee'); console.log(typeof W);"
# Should output: function
```

✅ **CDN Loading**
```javascript
// In browser console
typeof CryptoMeACoffee  // Should be 'function'
typeof window.CryptoMeACoffee  // Should be 'function'
```

✅ **Widget Functionality**
- [ ] Widget renders
- [ ] Wallet connection works
- [ ] Network detection/switching works
- [ ] Payment signing works
- [ ] x402 flow completes end-to-end
- [ ] Success/error states display

✅ **Cross-Browser**
- [ ] Chrome Desktop
- [ ] Firefox Desktop
- [ ] Safari Desktop
- [ ] Chrome Mobile
- [ ] Safari iOS

---

## 7. Post-Publication Tasks

### Immediate (Day 1)

1. **Update Project README**
   - Add NPM badge: `[![npm version](https://badge.fury.io/js/cryptomeacoffee.svg)](https://www.npmjs.com/package/cryptomeacoffee)`
   - Add CDN usage example
   - Link to npm package

2. **Update Examples**
   - Change vanilla-html/index.html to use CDN URL
   - Add note about npm package availability

3. **Announce**
   - GitHub README update
   - Social media (if applicable)

### Short-term (Week 1)

4. **Monitor**
   - Check npm download stats
   - Watch for issues/questions
   - Monitor bundle size on bundlephobia

5. **Documentation**
   - Create migration guide for existing users
   - Add troubleshooting section for CDN usage
   - Document CORS requirements clearly

### Medium-term (Month 1)

6. **Improvements**
   - Add TypeScript definitions
   - Optimize bundle size (code splitting)
   - Add more examples (React, Vue, Next.js)
   - Create video tutorial

7. **Community**
   - Respond to issues
   - Accept pull requests
   - Build community around project

---

## Appendix: Technical Details

### Bundle Composition

```
Total Size: 447 KB (100%)
├── viem: ~350 KB (78%)
├── x402: ~80 KB (18%)
└── widget code: ~17 KB (4%)

Gzipped: 132 KB (compression ratio: 3.4x)
```

### x402 Functions Included

- `createPaymentHeader()` - Create payment authorization header
- `selectPaymentRequirements()` - Select appropriate payment method
- EIP-712 signing utilities
- Payment requirement validation
- Authorization structure creation

### Viem Functions Included

- `createWalletClient()` - Wallet client creation
- `custom()` transport - window.ethereum integration
- Chain configs (Base, Base Sepolia)
- Address validation
- Transaction signing utilities

### CDN URLs

**unpkg (Recommended):**
```
https://unpkg.com/cryptomeacoffee@1.0.0/dist/widget.umd.js
https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js  (latest v1.x)
https://unpkg.com/cryptomeacoffee/dist/widget.umd.js     (latest)
```

**jsDelivr (Alternative):**
```
https://cdn.jsdelivr.net/npm/cryptomeacoffee@1.0.0/dist/widget.umd.js
https://cdn.jsdelivr.net/npm/cryptomeacoffee@1/dist/widget.umd.js
```

### Version Strategy

- **1.0.x** - Current inline widget implementation
- **1.1.x** - Floating widget (Buy Me a Coffee style)
- **2.0.x** - Breaking API changes (if needed)

Use semantic versioning:
- Patch (1.0.1): Bug fixes
- Minor (1.1.0): New features, backwards compatible
- Major (2.0.0): Breaking changes

---

## Summary

### Current State: ✅ 95% Ready for NPM

**Working:**
- ✅ Build system bundles x402 + viem correctly
- ✅ UMD format compatible with CDN
- ✅ ES module available for bundlers
- ✅ Widget implements official x402 pattern
- ✅ Browser-only code, no server dependencies
- ✅ Reasonable bundle size (132 KB gzipped)

**Needs Work:**
- ⚠️ package.json missing NPM fields (2 hours)
- ⚠️ .npmignore file needed (15 minutes)
- ⚠️ NPM-focused README needed (1 hour)

### Timeline to Publish: 3-4 Hours

- **Phase 1** (Package prep): 2 hours
- **Phase 2** (Testing): 1 hour
- **Phase 3** (Publishing): 30 minutes
- **Phase 4** (CDN verification): 30 minutes

### Next Steps

1. Complete floating widget redesign (current sprint)
2. Test new widget thoroughly
3. Update version to 1.1.0
4. Execute this NPM distribution plan
5. Public launch with CDN availability

---

**Document Version**: 1.0
**Author**: CryptoMeACoffee Team
**Last Review**: November 22, 2025
