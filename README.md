# ☕ CryptoMeACoffee

> Accept USDC donations on your website via x402 protocol. Zero fees, self-hosted, fully open-source.

[![npm version](https://img.shields.io/npm/v/cryptomeacoffee.svg)](https://www.npmjs.com/package/cryptomeacoffee)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- ✅ **Zero Platform Fees** - Direct wallet-to-wallet via USDC
- ✅ **Self-Hosted** - You control everything
- ✅ **Gasless for Users** - x402 protocol sponsors gas fees
- ✅ **Instant Settlement** - Funds arrive immediately
- ✅ **Buy Me a Coffee Style** - Floating widget with modern UX
- ✅ **Easy Integration** - One script tag or npm install
- ✅ **Message Support** - Supporters can include messages (500 chars)

## 🚀 Quick Start

### Via CDN (Easiest - No Build Required)

Add this to your HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/cryptomeacoffee@1/src/styles.css">
</head>
<body>
  <!-- Auto-initialization from script tag data attributes -->
  <script
    src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
    data-wallet="0xYourWalletAddress"
    data-api="https://your-api.com/api/donate"
    data-creator-name="Your Name"
    data-color="#5F7FFF">
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
  apiEndpoint: 'https://your-api.com/api/donate',
  creatorName: 'Your Name'
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
  walletAddress: '0x...',        // Your wallet address
  apiEndpoint: 'https://...',    // Your x402 server endpoint

  // Optional
  creatorName: 'Your Name',      // Shown in modal header
  presetAmounts: [1, 3, 5],      // Preset donation amounts (USD)
  theme: 'light',                // 'light' or 'dark'
  network: 'base-sepolia',       // 'base-sepolia' or 'base'
  color: '#5F7FFF',              // Primary color
  position: 'Right',             // 'Left' or 'Right'
  marginX: 18,                   // Horizontal margin (px)
  marginY: 18,                   // Vertical margin (px)
  minAmount: 0.01,               // Minimum donation (USD)
  maxAmount: 1000                // Maximum donation (USD)
});
```

## 🖥️ Server Setup Required

This widget requires a backend server running x402-express middleware.

**Quick Backend Setup (Express):**

```bash
# Clone repository
git clone https://github.com/yourusername/cryptomeacoffee
cd server-examples/express

# Configure environment
cp .env.example .env
# Edit .env with your WALLET_ADDRESS

# Install and run
npm install
npm start
```

**Minimal Express Server:**

```javascript
import express from 'express';
import { paymentMiddleware } from 'x402-express';

const app = express();

app.use(paymentMiddleware(
  process.env.WALLET_ADDRESS,
  {
    "POST /api/donate": {
      price: "$1.00",
      network: "base-sepolia",
      config: { description: "Support this creator" }
    }
  },
  { url: "https://x402.org/facilitator" }
));

app.post("/api/donate", (req, res) => {
  res.json({
    success: true,
    message: "Thank you!",
    amount: req.body.amount,
    supporterMessage: req.body.message
  });
});

app.listen(3000);
```

See [server examples](https://github.com/yourusername/cryptomeacoffee/tree/main/server-examples) for complete implementations.

## 📖 Documentation

- **Widget Configuration**: All configuration options and data attributes
- **Server Setup**: Express, Next.js, Vercel Edge examples
- **Security**: Best practices and security checklist
- **Testing**: Local testing and deployment guides

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT - See [LICENSE](LICENSE) file

## 🔗 Links

- [GitHub Repository](https://github.com/yourusername/cryptomeacoffee)
- [NPM Package](https://www.npmjs.com/package/cryptomeacoffee)
- [Report Issues](https://github.com/yourusername/cryptomeacoffee/issues)
- [x402 Protocol Docs](https://docs.cdp.coinbase.com/x402/)

## 💬 Support

- [GitHub Issues](https://github.com/yourusername/cryptomeacoffee/issues)
- [GitHub Discussions](https://github.com/yourusername/cryptomeacoffee/discussions)

---

Built with ❤️ using the [x402 protocol](https://www.x402.org)
