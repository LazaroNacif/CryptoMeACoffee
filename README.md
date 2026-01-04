# ☕ CryptoMeACoffee

> Accept USDC donations on your website via x402 protocol. Zero fees, self-hosted, fully open-source.

**🌐 Live Demo:** [cryptomeacoffee.com](https://cryptomeacoffee.com)

[![npm version](https://img.shields.io/npm/v/cryptomeacoffee.svg)](https://www.npmjs.com/package/cryptomeacoffee)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/LazaroNacif/cryptomeacoffee/actions)
[![Tests](https://img.shields.io/badge/tests-46%20passing-brightgreen.svg)](https://github.com/LazaroNacif/cryptomeacoffee)
[![Coverage](https://img.shields.io/badge/coverage-31%25-yellow.svg)](https://github.com/LazaroNacif/cryptomeacoffee)
[![Code Quality](https://img.shields.io/badge/code%20quality-A-brightgreen.svg)](https://github.com/LazaroNacif/cryptomeacoffee)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## ✨ Features

- ✅ **Zero Platform Fees** - Direct wallet-to-wallet via USDC
- ✅ **Self-Hosted** - You control everything
- ✅ **Gasless for Users** - x402 protocol sponsors gas fees
- ✅ **Instant Settlement** - Funds arrive immediately
- ✅ **Buy Me a Coffee Style** - Floating widget with modern UX
- ✅ **Easy Integration** - One script tag or npm install
- ✅ **Message Support** - Supporters can include messages (500 chars)
- ✅ **Email Notifications** - Get notified via Resend when donations arrive

## 🚀 Quick Start

### Via CDN (Easiest - No Build Required)

Add this to your HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/cryptomeacoffee@1/src/styles.css" />
  </head>
  <body>
    <!-- Auto-initialization from script tag data attributes -->
    <script
      src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
      data-wallet="0xYourWalletAddress"
      data-api="https://your-api.com/api/donate"
      data-creator-name="Your Name"
      data-color="#5F7FFF"
    ></script>
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
  apiEndpoint: 'https://your-api.com/api/donate',
  creatorName: 'Your Name',
});

widget.render('donation-widget');
```

## ⚙️ Configuration

### Auto-Initialization (Recommended)

The widget auto-initializes from script tag data attributes:

```html
<script
  src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
  data-wallet="0xYourWalletAddress"           <!-- Required -->
  data-api="https://your-api.com/api/donate"  <!-- Required -->
  data-creator-name="Your Name"               <!-- Optional -->
  data-color="#5F7FFF"                        <!-- Optional -->
  data-position="Right"                       <!-- Optional: Left/Right -->
  data-margin-x="18"                          <!-- Optional: pixels -->
  data-margin-y="18">                         <!-- Optional: pixels -->
</script>
```

### Manual Initialization

```javascript
const widget = new CryptoMeACoffee({
  // Required
  walletAddress: '0x...', // Your wallet address
  apiEndpoint: 'https://...', // Your x402 server endpoint

  // Optional
  creatorName: 'Your Name', // Shown in modal header
  presetAmounts: [1, 3, 5], // Preset donation amounts (USD)
  theme: 'light', // 'light' or 'dark'
  network: 'base-sepolia', // 'base-sepolia' or 'base'
  color: '#5F7FFF', // Primary color
  position: 'Right', // 'Left' or 'Right'
  marginX: 18, // Horizontal margin (px)
  marginY: 18, // Vertical margin (px)
  minAmount: 0.01, // Minimum donation (USD)
  maxAmount: 1000, // Maximum donation (USD)
});
```

## 🖥️ Server Setup Required

This widget requires a backend server running x402-express middleware. Choose your deployment method:

### 📧 Optional: Email Notifications

Get notified when donations arrive! Configure Resend for email alerts:

1. **Sign up for Resend**: https://resend.com (free: 3,000 emails/month)
2. **Get your API key**: https://resend.com/api-keys
3. **Add to your environment variables**:
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   NOTIFICATION_EMAIL=your-email@example.com
   ```

The backend will automatically send email notifications for each donation with amount, message, and timestamp.

---

### Option 1: Vercel (Serverless - Easiest) ⚡

Perfect for low-medium traffic, zero server management:

```bash
# Clone and deploy
git clone https://github.com/LazaroNacif/cryptomeacoffee
cd server-examples/vercel
cp .env.example .env
# Edit .env with your WALLET_ADDRESS
npm install
vercel deploy
```

**Benefits:**

- Deploy in 60 seconds
- Free tier: 100k requests/month
- Auto-scaling
- No server maintenance

**See:** [server-examples/vercel/README.md](server-examples/vercel/README.md)

---

### Option 2: Netlify (Serverless Alternative) 🌊

Similar to Vercel with excellent Git integration:

```bash
# Clone and deploy
git clone https://github.com/LazaroNacif/cryptomeacoffee
cd server-examples/netlify
cp .env.example .env
# Edit .env with your WALLET_ADDRESS
npm install
netlify deploy
```

**Benefits:**

- Deploy in 60 seconds
- Free tier: 125k requests/month
- Deploy previews for PRs
- Excellent Git workflow

**See:** [server-examples/netlify/README.md](server-examples/netlify/README.md)

---

### Option 3: Express (Traditional Server) 🖥️

Full control, best for high traffic or custom requirements:

```bash
# Clone repository
git clone https://github.com/LazaroNacif/cryptomeacoffee
cd server-examples/express

# Configure environment
cp .env.example .env
# Edit .env with your WALLET_ADDRESS

# Install and run
npm install
npm start
```

**Deploy to:** Railway, Render, Fly.io, VPS

**See:** [server-examples/express/README.md](server-examples/express/README.md)

---

### 📊 Deployment Comparison

| Feature         | Vercel         | Netlify        | Express      |
| --------------- | -------------- | -------------- | ------------ |
| **Setup Time**  | 1 min          | 1 min          | 5 min        |
| **Free Tier**   | 100k req/month | 125k req/month | N/A          |
| **Cold Starts** | ~500ms         | ~500ms         | None         |
| **Max Timeout** | 10s (60s Pro)  | 10s (26s Pro)  | Unlimited    |
| **Scaling**     | Automatic      | Automatic      | Manual       |
| **Best For**    | Quick deploys  | Git workflows  | High traffic |
| **Cost (idle)** | $0             | $0             | Server cost  |

## 📖 Documentation

Comprehensive guides available in the [`docs/`](docs/) directory:

- **[Setup Guide](docs/SETUP-GUIDE.md)** - Complete installation and configuration
- **[API Reference](docs/API-REFERENCE.md)** - All widget options and methods
- **[Security Checklist](docs/SECURITY-CHECKLIST.md)** - Pre-launch security validation
- **[FAQ](docs/FAQ.md)** - Frequently asked questions (20+ Q&A)
- **[Customization](docs/CUSTOMIZATION.md)** - Themes, colors, and styling
- **[Vercel Deployment](docs/DEPLOY_VERCEL.md)** - Serverless deployment guide
- **[Server Examples](server-examples/)** - Vercel, Netlify, Express templates

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

**Requires:** MetaMask or Coinbase Wallet browser extension

## 🏗️ Technical Stack

- **Frontend**: Viem for wallet interaction
- **Backend**: x402-express official middleware
- **Protocol**: x402 (gasless USDC transfers)
- **Network**: Base (Ethereum L2)
- **Token**: USDC

## 📦 Bundle Size

- **UMD Bundle**: 459 KB (133 KB gzipped)
- **Includes**: viem + x402 client library (no external dependencies)

## 📁 Project Structure

```
cryptomeacoffee/
├── src/                  # Source code
│   ├── widget.js         # Main widget class
│   ├── logger.js         # Environment-aware logging
│   └── styles.css        # Widget styles
├── dist/                 # Build output (generated)
│   ├── widget.umd.js     # UMD bundle for CDN
│   ├── widget.es.js      # ES module bundle
│   └── widget.d.ts       # TypeScript definitions
├── tests/                # Test files
│   ├── unit/            # Unit tests (46 tests, 31% coverage)
│   └── integration/     # Integration tests
├── docs/                 # Documentation
│   ├── SETUP-GUIDE.md   # Complete setup instructions
│   ├── API-REFERENCE.md # Full API documentation
│   ├── SECURITY-CHECKLIST.md
│   ├── FAQ.md           # Frequently asked questions
│   └── CUSTOMIZATION.md # Theming and styling
├── examples/            # Usage examples
│   ├── vanilla-html/    # Pure HTML/JS example
│   └── server-examples/ # Backend implementations
│       └── express/     # Express.js server
├── CHANGELOG.md         # Version history
└── CONTRIBUTING.md      # Contribution guidelines
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on:

- Setting up development environment
- Code style guidelines
- Testing requirements
- Pull request process

See also: [CHANGELOG.md](CHANGELOG.md) for version history.

## 📄 License

MIT - See [LICENSE](LICENSE) file

## 🔗 Links

- [GitHub Repository](https://github.com/LazaroNacif/cryptomeacoffee)
- [NPM Package](https://www.npmjs.com/package/cryptomeacoffee)
- [Report Issues](https://github.com/LazaroNacif/cryptomeacoffee/issues)
- [x402 Protocol Docs](https://docs.cdp.coinbase.com/x402/)

## 💬 Support

- [GitHub Issues](https://github.com/LazaroNacif/cryptomeacoffee/issues)
- [GitHub Discussions](https://github.com/LazaroNacif/cryptomeacoffee/discussions)

---

Built with ❤️ using the [x402 protocol](https://www.x402.org)
