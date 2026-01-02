# CryptoMeACoffee - Implementation Plan
## Fix CORS, Build Configuration, TypeScript Support

---

## 🚨 Critical Issue: CORS Blocking Production Demo

### Current Status
- ✅ **Localhost**: Works perfectly at `http://localhost:3000`
- ❌ **Production**: Fails at `https://lazaronacif.github.io/CryptoMeACoffee/`

### Error in Browser Console
```
Access to fetch at 'https://bucolic-cannoli-49fd18.netlify.app/api/donate'
from origin 'https://lazaronacif.github.io' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.

Failed to fetch
```

### Root Cause
The server responds with **402 Payment Required** (x402 middleware working correctly), but the 402 response **lacks the `Access-Control-Allow-Origin` header** because the origin matching is failing.

**Why localhost works but production doesn't:**
- `http://localhost:3000` matches the CORS_ORIGIN env var → CORS header added → ✅
- `https://lazaronacif.github.io` should match but doesn't (case/formatting issue) → No CORS header → ❌

---

## 📋 Implementation Steps

### Phase 1: Fix CORS (CRITICAL - Do This First)

**File to Edit**: `netlify/functions/donate.js`

#### Step 1: Add Debug Logging

**Location**: After line 56 (right after `const allowedOrigins = ...`)

**Add this code**:
```javascript
// Debug logging for CORS troubleshooting
console.log('🔍 CORS Debug:', {
  requestOrigin: origin,
  requestMethod: event.httpMethod,
  corsOriginEnv: process.env.CORS_ORIGIN,
  allowedOriginsParsed: allowedOrigins,
  originMatches: allowedOrigins.includes(origin),
  hasOriginHeader: !!origin
});

// Validate environment configuration
if (!process.env.CORS_ORIGIN) {
  console.error('❌ CRITICAL: CORS_ORIGIN environment variable is not set!');
}
```

#### Step 2: Add Origin Normalization

**Location**: Replace lines 55-69

**Replace this**:
```javascript
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
```

**With this**:
```javascript
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

// Debug logging
console.log('🔍 CORS Debug:', {
  requestOrigin: origin,
  normalizedOrigin,
  requestMethod: event.httpMethod,
  corsOriginEnv: process.env.CORS_ORIGIN,
  allowedOriginsParsed: allowedOrigins,
  originMatches: allowedOrigins.includes(normalizedOrigin),
  hasOriginHeader: !!origin
});

// Validate environment
if (!process.env.CORS_ORIGIN) {
  console.error('❌ CRITICAL: CORS_ORIGIN not set');
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
```

#### Step 3: Deploy to Netlify

```bash
# From project root
netlify deploy --prod
```

Or if you prefer the Netlify dashboard:
1. Commit and push changes to git
2. Netlify will auto-deploy

#### Step 4: Test and Monitor

1. **Check Netlify Function Logs**:
   - Go to Netlify Dashboard
   - Navigate to: Functions → donate → Logs
   - Look for "🔍 CORS Debug" output

2. **Test Production Demo**:
   - Open: https://lazaronacif.github.io/CryptoMeACoffee/
   - Open Browser DevTools → Console
   - Try to make a donation
   - Check for CORS errors

3. **Expected Log Output**:
   ```
   🔍 CORS Debug: {
     requestOrigin: 'https://lazaronacif.github.io',
     normalizedOrigin: 'https://lazaronacif.github.io',
     allowedOrigins: ['https://lazaronacif.github.io', 'http://localhost:3000'],
     originMatches: true
   }
   ✅ CORS: Origin matched and header added
   ```

4. **Expected Browser Network Tab**:
   - OPTIONS request: Status 200, has `Access-Control-Allow-Origin` header
   - POST request: Status 402 or 200, has `Access-Control-Allow-Origin` header
   - No CORS errors in console

#### Troubleshooting CORS

If it still fails after deployment:

**Check the debug logs** to see exactly what's happening:

1. **If `originMatches: false`**:
   - Compare `requestOrigin` vs `allowedOrigins` in the logs
   - Manually update CORS_ORIGIN in Netlify to match exact origin value
   - Redeploy

2. **If `CORS_ORIGIN not set`**:
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add `CORS_ORIGIN` = `https://lazaronacif.github.io,http://localhost:3000`
   - Trigger new deployment

3. **If origin is `null` or `undefined`**:
   - Browser might not be sending Origin header
   - Try adding wildcard support (less secure) for testing

---

### Phase 2: Fix Logo Reference (Quick Win)

**File**: `examples/vanilla-html/index.html`

**Line 166**: Change from:
```html
<img src="../../assets/logos/logo_CMC.png" alt="CryptoMeACoffee Logo" class="logo">
```

To:
```html
<img src="../../assets/logos/logo_v3.png" alt="CryptoMeACoffee Logo" class="logo">
```

**Verification**:
- Open `examples/vanilla-html/index.html` in browser
- Verify logo loads without 404 error

---

### Phase 3: Add Build Script & Dependencies

**File**: `package.json`

#### Step 1: Update Package Metadata

**Replace lines 1-6**:
```json
{
  "name": "cryptomeacoffee",
  "version": "1.0.0",
  "type": "module",
  "description": "Accept USDC donations via x402 protocol - widget library and Netlify backend",
  "main": "dist/widget.umd.js",
  "module": "dist/widget.es.js",
  "types": "dist/widget.d.ts",
```

**Add exports section** (after line 6):
```json
  "exports": {
    ".": {
      "import": "./dist/widget.es.js",
      "require": "./dist/widget.umd.js",
      "types": "./dist/widget.d.ts"
    }
  },
```

#### Step 2: Update Scripts

**Replace the scripts section**:
```json
  "scripts": {
    "dev": "netlify dev",
    "build": "vite build",
    "build:watch": "vite build --watch",
    "preview": "vite preview",
    "deploy": "netlify deploy",
    "deploy:prod": "netlify deploy --prod"
  },
```

#### Step 3: Add Widget Dependencies

**Update dependencies section**:
```json
  "dependencies": {
    "@coinbase/x402": "^0.7.1",
    "express-validator": "^7.3.1",
    "isomorphic-dompurify": "^2.33.0",
    "nodemailer": "^7.0.10",
    "x402-express": "^0.7.0",
    "x402": "^0.7.0",
    "viem": "^2.21.0"
  },
```

**Update devDependencies section**:
```json
  "devDependencies": {
    "netlify-cli": "^17.38.1",
    "vite": "^5.4.11",
    "vite-plugin-dts": "^4.3.0",
    "typescript": "^5.7.2"
  },
```

#### Step 4: Install Dependencies

```bash
npm install
```

#### Step 5: Test Build

```bash
npm run build
```

**Expected output**:
- `dist/widget.umd.js` (~450 KB)
- `dist/widget.es.js`
- Source maps (.js.map files)

**Verify**:
```bash
ls -lh dist/
```

---

### Phase 4: Add TypeScript Support

#### Step 1: Update Vite Configuration

**File**: `vite.config.js`

**Replace entire file**:
```javascript
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      include: ['src/**/*.js']
    })
  ],
  define: {
    'process.env': '{}',
    'process.env.NODE_ENV': '"production"',
    'global': 'globalThis',
    'process': '{"env":{}}'
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/widget.js'),
      name: 'CryptoMeACoffee',
      fileName: (format) => `widget.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    outDir: 'dist',
    sourcemap: true
  }
});
```

#### Step 2: Create TypeScript Configuration

**Create file**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "bundler",
    "allowJs": true,
    "checkJs": false,
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "dist",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "netlify", "server-examples"]
}
```

#### Step 3: Add JSDoc Type Annotations

**File**: `src/widget.js`

**Add at the top** (before the class definition):

```javascript
/**
 * @typedef {Object} CryptoMeACoffeeConfig
 * @property {string} walletAddress - Recipient wallet address (required)
 * @property {string} apiEndpoint - Backend API endpoint URL (required)
 * @property {string} [creatorName='this creator'] - Display name for the creator
 * @property {string} [message='Thanks for the coffee!'] - Thank you message after donation
 * @property {string} [color='#5F7FFF'] - Primary color for the widget
 * @property {'Left' | 'Right'} [position='Right'] - Widget position on screen
 * @property {string | number} [xMargin='18'] - Horizontal margin in pixels
 * @property {string | number} [yMargin='18'] - Vertical margin in pixels
 * @property {number[]} [presetAmounts=[1, 3, 5]] - Preset donation amounts in USD
 * @property {'light' | 'dark'} [theme='light'] - Widget theme
 * @property {'base-sepolia' | 'base'} [network='base-sepolia'] - Blockchain network
 * @property {string} [logoUrl] - Custom logo URL
 * @property {number} [minAmount=0.01] - Minimum donation amount in USD
 * @property {number} [maxAmount=1000000] - Maximum donation amount in USD
 */

/**
 * CryptoMeACoffee Widget
 * Accept USDC donations on your website via x402 protocol
 * @class
 */
class CryptoMeACoffee {
  /**
   * Create a new CryptoMeACoffee widget instance
   * @param {CryptoMeACoffeeConfig} config - Widget configuration
   */
  constructor(config = {}) {
    // ... existing code
  }

  /**
   * Render the widget in the specified container
   * @param {string} [containerId='body'] - Container element ID or 'body'
   * @returns {void}
   */
  render(containerId = 'body') {
    // ... existing code
  }

  /**
   * Destroy the widget and clean up
   * @returns {void}
   */
  destroy() {
    // ... existing code
  }

  /**
   * Connect to user's wallet
   * @returns {Promise<string>} Connected wallet address
   */
  async connectWallet() {
    // ... existing code
  }
}

export default CryptoMeACoffee;
```

**Note**: You only need to add JSDoc for the main public methods. Private methods can skip JSDoc.

#### Step 4: Build with TypeScript Definitions

```bash
npm run build
```

**Expected output**:
- `dist/widget.umd.js`
- `dist/widget.es.js`
- `dist/widget.d.ts` ← **NEW!**
- Source maps

**Verify TypeScript definitions**:
```bash
cat dist/widget.d.ts
```

You should see TypeScript type definitions for the CryptoMeACoffee class.

---

### Phase 5: Commit Package Lock Files

```bash
git add server-examples/express/package-lock.json
git add server-examples/netlify/package-lock.json
git commit -m "chore: Track package-lock files for server examples"
```

---

## 🧪 Testing Checklist

### CORS Testing (Critical)

After deploying CORS fix:

- [ ] Open https://lazaronacif.github.io/CryptoMeACoffee/
- [ ] Open Browser DevTools → Network tab
- [ ] Click widget button to open donation modal
- [ ] Connect wallet
- [ ] Attempt donation
- [ ] **Check Network tab**:
  - [ ] OPTIONS request has `Access-Control-Allow-Origin` header
  - [ ] POST request has `Access-Control-Allow-Origin` header
  - [ ] No CORS errors in console
- [ ] **Check Netlify Logs**:
  - [ ] See "🔍 CORS Debug" output
  - [ ] `originMatches: true`
  - [ ] "✅ CORS: Origin matched" message

### Build Testing

After adding build scripts:

- [ ] Run `npm run build`
- [ ] Check `dist/` directory:
  - [ ] `widget.umd.js` exists (~450 KB)
  - [ ] `widget.es.js` exists
  - [ ] Source maps exist
- [ ] Test locally:
  ```bash
  cd examples/vanilla-html
  python3 -m http.server 8000
  # Open http://localhost:8000
  ```
- [ ] Widget renders correctly
- [ ] All functionality works

### TypeScript Testing

After adding TypeScript support:

- [ ] `dist/widget.d.ts` file exists
- [ ] Create test TypeScript file:
  ```typescript
  import CryptoMeACoffee from './dist/widget.es.js';

  const widget = new CryptoMeACoffee({
    walletAddress: '0x...',
    apiEndpoint: 'https://...',
    position: 'Left' // Should autocomplete
  });
  ```
- [ ] Run `npx tsc --noEmit test.ts` (should have no errors)
- [ ] IDE shows autocomplete for config options

---

## 📝 Summary

### What Gets Fixed

1. ✅ **CORS**: Production demo will work like localhost
2. ✅ **Logo**: Examples will display correct logo
3. ✅ **Build**: `npm run build` command available
4. ✅ **TypeScript**: IDE support and type safety for widget users
5. ✅ **Git**: Package lock files tracked properly

### Priority Order

1. **Phase 1 (CRITICAL)**: Fix CORS → Deploy → Test (15 minutes)
2. **Phase 2**: Fix logo → Commit (2 minutes)
3. **Phase 3**: Add build script → Install deps → Test build (10 minutes)
4. **Phase 4**: Add TypeScript → Rebuild (15 minutes)
5. **Phase 5**: Commit package locks (1 minute)

### Expected Timeline

- **Minimum to fix demo**: Phase 1 only (15 minutes)
- **Complete all fixes**: All phases (45 minutes)

---

## 🚀 Quick Start (Minimum Fix)

If you just want to fix the production demo ASAP:

```bash
# 1. Edit netlify/functions/donate.js (add normalization code from Phase 1)
# 2. Deploy
netlify deploy --prod

# 3. Wait 30 seconds for deployment
# 4. Test: https://lazaronacif.github.io/CryptoMeACoffee/
# 5. Check Netlify logs for CORS debug output
```

That's it! The rest of the phases are quality-of-life improvements.

---

## 📞 Need Help?

If something doesn't work as expected:

1. **Check Netlify function logs** for debug output
2. **Check browser console** for error messages
3. **Verify environment variables** in Netlify dashboard
4. **Run `netlify env:list`** to see if CORS_ORIGIN is set

Common issues:
- CORS_ORIGIN not set in Netlify → Add it in dashboard
- Origin still not matching → Check debug logs for exact values
- Build fails → Run `npm install` first

---

## ✅ Done!

Once all phases are complete:
- Production demo works ✅
- Build process standardized ✅
- TypeScript support added ✅
- Code quality improved ✅
