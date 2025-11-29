# CryptoMeACoffee - Complete Setup Guide

**Get your donation widget live in 10 minutes**

This guide will walk you through setting up CryptoMeACoffee from scratch. No prior blockchain or backend experience required!

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start (5 Minutes)](#quick-start-5-minutes)
3. [Detailed Server Setup](#detailed-server-setup)
4. [Widget Integration](#widget-integration)
5. [Testing Locally](#testing-locally)
6. [Production Deployment](#production-deployment)
7. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before you begin, make sure you have:

### Required

- ✅ **A Base wallet address** (MetaMask or Coinbase Wallet)
  - Create one at [MetaMask](https://metamask.io) (free, takes 2 minutes)
  - This is where donations will be sent
- ✅ **A website** where you want to add the widget
  - Can be any HTML website, React app, WordPress, etc.
- ✅ **Basic terminal knowledge** (copy/paste commands)

### Optional

- 📧 **Email account** for donation notifications (Gmail works great)
- 🌐 **Domain name** for production (not required for testing)

### For Local Development

- 📦 **Node.js 16+** ([Download](https://nodejs.org))
- 🔧 **Git** ([Download](https://git-scm.com))

**Don't have all of these?** No problem - you can still test with Railway's free hosting!

---

## 🚀 Quick Start (5 Minutes)

The fastest way to get started using Railway's free tier.

### Step 1: Get Your Wallet Address (1 minute)

1. Install [MetaMask](https://metamask.io) browser extension
2. Create a new wallet or use existing
3. Copy your wallet address (starts with `0x...`)
   - Click your account name → Copy address

**Example:** `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`

---

### Step 2: Deploy Server to Railway (3 minutes)

Railway offers free hosting - perfect for getting started!

#### Option A: One-Click Deploy (Easiest)

1. **Fork this repository** to your GitHub account
   - Go to: `https://github.com/yourusername/cryptomeacoffee`
   - Click "Fork" button

2. **Deploy to Railway:**

   [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template)

3. **Configure Environment Variables** in Railway dashboard:

   ```
   WALLET_ADDRESS=0xYourWalletAddress
   NETWORK=base-sepolia
   FACILITATOR_URL=https://x402.org/facilitator
   ```

4. **Done!** Copy your Railway URL:
   ```
   https://your-app.up.railway.app
   ```

#### Option B: Manual Railway Setup

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your forked `cryptomeacoffee` repository
4. Set start command: `cd server-examples/express && npm install && npm start`
5. Add environment variables:
   ```
   WALLET_ADDRESS=0xYourWalletAddress
   NETWORK=base-sepolia
   FACILITATOR_URL=https://x402.org/facilitator
   PORT=3000
   ```
6. Deploy! 🚀

**Railway automatically:**

- ✅ Installs dependencies
- ✅ Starts your server
- ✅ Provides HTTPS URL
- ✅ Auto-redeploys on git push

---

### Step 3: Add Widget to Your Website (1 minute)

Add this code to your HTML file (before closing `</body>` tag):

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/cryptomeacoffee@1/src/styles.css" />
  </head>
  <body>
    <!-- Your website content -->

    <!-- CryptoMeACoffee Widget -->
    <script
      src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
      data-wallet="0xYourWalletAddress"
      data-api="https://your-app.up.railway.app/api/donate"
      data-creator-name="Your Name"
      data-color="#5F7FFF"
    ></script>
  </body>
</html>
```

**Replace:**

- `0xYourWalletAddress` → Your actual wallet address
- `https://your-app.up.railway.app` → Your Railway URL
- `Your Name` → Your name or brand

---

### Step 4: Test It! (1 minute)

1. Open your website in a browser
2. You should see a floating "Buy Me a Coffee" button
3. Click it and try a test donation
4. Check your wallet - you should receive testnet USDC!

**Need testnet USDC?** Get free test tokens:

- [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-sepolia-faucet)

---

## 🔧 Detailed Server Setup

For more control, set up the server locally or on your own infrastructure.

### Local Development Setup

#### 1. Clone Repository

```bash
git clone https://github.com/yourusername/cryptomeacoffee.git
cd cryptomeacoffee
```

#### 2. Install Dependencies

```bash
# Install widget dependencies
npm install

# Install server dependencies
cd server-examples/express
npm install
```

#### 3. Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit .env file
nano .env  # or use any text editor
```

**Edit `.env` with your settings:**

```env
# Required
WALLET_ADDRESS=0xYourWalletAddress
NETWORK=base-sepolia
FACILITATOR_URL=https://x402.org/facilitator

# Optional - Email Notifications
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
NOTIFICATION_EMAIL=your-email@gmail.com

# Optional - CORS
CORS_ORIGIN=http://localhost:8000
```

#### 4. Start Server

```bash
npm start
```

You should see:

```
🚀 Starting CryptoMeACoffee Server...
📍 Network: base-sepolia
💰 Wallet Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
🌐 Facilitator: https://x402.org/facilitator
✅ Server running on http://localhost:3000
```

---

### Environment Variables Explained

| Variable             | Required | Description                                   | Example                        |
| -------------------- | -------- | --------------------------------------------- | ------------------------------ |
| `WALLET_ADDRESS`     | ✅ Yes   | Your Base wallet address (where donations go) | `0x742d35Cc...`                |
| `NETWORK`            | ✅ Yes   | `base-sepolia` (testnet) or `base` (mainnet)  | `base-sepolia`                 |
| `FACILITATOR_URL`    | ✅ Yes   | x402 facilitator endpoint                     | `https://x402.org/facilitator` |
| `PORT`               | No       | Server port (default: 3000)                   | `3000`                         |
| `CORS_ORIGIN`        | No       | Allowed website origin                        | `https://yoursite.com`         |
| `EMAIL_HOST`         | No       | SMTP server for notifications                 | `smtp.gmail.com`               |
| `EMAIL_PORT`         | No       | SMTP port                                     | `587`                          |
| `EMAIL_USER`         | No       | Email account username                        | `you@gmail.com`                |
| `EMAIL_PASS`         | No       | Email account password                        | `app-password`                 |
| `NOTIFICATION_EMAIL` | No       | Where to send donation alerts                 | `you@gmail.com`                |

---

## 🎨 Widget Integration

### Method 1: Auto-Initialization (Recommended)

Add script tag with data attributes:

```html
<script
  src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
  data-wallet="0xYourAddress"
  data-api="https://your-server.com/api/donate"
  data-creator-name="Your Name"
  data-color="#5F7FFF"
  data-position="Right"
  data-theme="light"
></script>
```

### Method 2: NPM + JavaScript

For React, Vue, Next.js, etc:

```bash
npm install cryptomeacoffee
```

```javascript
import CryptoMeACoffee from 'cryptomeacoffee';
import 'cryptomeacoffee/styles.css';

const widget = new CryptoMeACoffee({
  walletAddress: '0xYourAddress',
  apiEndpoint: 'https://your-server.com/api/donate',
  creatorName: 'Your Name',
  color: '#5F7FFF',
  position: 'Right',
  theme: 'light',
});

widget.render();
```

### Configuration Options

| Option          | Type          | Default        | Description                                        |
| --------------- | ------------- | -------------- | -------------------------------------------------- |
| `walletAddress` | string        | -              | **Required.** Your Base wallet address             |
| `apiEndpoint`   | string        | -              | **Required.** Your server's `/api/donate` endpoint |
| `creatorName`   | string        | "this creator" | Name shown in modal header                         |
| `presetAmounts` | number[]      | [1, 3, 5]      | Preset donation amounts (USD)                      |
| `color`         | string        | "#5F7FFF"      | Primary button color (hex)                         |
| `position`      | string        | "Right"        | Button position: "Left" or "Right"                 |
| `theme`         | string        | "light"        | Color theme: "light" or "dark"                     |
| `network`       | string        | "base-sepolia" | Network: "base-sepolia" or "base"                  |
| `xMargin`       | string/number | "18"           | Horizontal margin (px)                             |
| `yMargin`       | string/number | "18"           | Vertical margin (px)                               |
| `minAmount`     | number        | 0.01           | Minimum donation (USD)                             |
| `maxAmount`     | number        | 1000000        | Maximum donation (USD)                             |

See [API Reference](./API-REFERENCE.md) for complete documentation.

---

## 🧪 Testing Locally

### 1. Get Testnet USDC

Before testing, you need testnet USDC:

1. **Get testnet ETH** (for initial gas):
   - [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-sepolia-faucet)

2. **Get testnet USDC**:
   - Visit [Circle Faucet](https://faucet.circle.com/)
   - Or bridge testnet USDC from Ethereum Sepolia

### 2. Test the Widget

1. **Start your server:**

   ```bash
   cd server-examples/express
   npm start
   ```

2. **Open test page:**

   ```bash
   cd examples/vanilla-html
   python3 -m http.server 8000
   ```

   Visit `http://localhost:8000`

3. **Make a test donation:**
   - Click the floating button
   - Enter amount (e.g., $1)
   - Add optional message
   - Click "Donate"
   - Approve in MetaMask
   - Wait for confirmation

4. **Verify:**
   - ✅ Check your wallet for USDC
   - ✅ Check server logs for success message
   - ✅ Check email (if configured)

### Common Test Issues

| Issue                | Solution                                   |
| -------------------- | ------------------------------------------ |
| "No wallet detected" | Install MetaMask extension                 |
| "Wrong network"      | Switch to Base Sepolia in MetaMask         |
| "Insufficient funds" | Get testnet USDC from faucet               |
| "CORS error"         | Add your origin to `CORS_ORIGIN` in `.env` |
| "402 error"          | Check `FACILITATOR_URL` is correct         |

---

## 🌐 Production Deployment

Ready to go live? Here's how to deploy to production.

### Pre-Production Checklist

Before launching, complete the [Security Checklist](./SECURITY-CHECKLIST.md):

- [ ] Switch to mainnet (`NETWORK=base`)
- [ ] Use production wallet address
- [ ] Enable HTTPS enforcement
- [ ] Configure CORS for your domain
- [ ] Set secure environment variables
- [ ] Test with real USDC (small amount)
- [ ] Enable email notifications
- [ ] Review rate limiting settings

### Deployment Options

#### Option 1: Railway (Recommended)

**Pros:** Free tier, auto-deploys, HTTPS included
**Time:** 5 minutes

1. Connect GitHub repository
2. Set production environment variables
3. Deploy automatically

**Cost:** Free for ~500 hours/month

#### Option 2: Render

**Pros:** Free tier, good performance
**Time:** 5 minutes

1. Create `render.yaml`:

   ```yaml
   services:
     - type: web
       name: cryptomeacoffee
       env: node
       buildCommand: cd server-examples/express && npm install
       startCommand: cd server-examples/express && npm start
       envVars:
         - key: WALLET_ADDRESS
           sync: false
         - key: NETWORK
           value: base
   ```

2. Connect to Render
3. Deploy

**Cost:** Free tier available

#### Option 3: Vercel (Serverless)

**Pros:** Edge functions, fast, free tier
**Time:** 10 minutes

**Note:** Requires adapting Express server to Vercel serverless format.

See [deployment examples](../server-examples/) for platform-specific guides.

#### Option 4: VPS (Advanced)

**Pros:** Full control, lowest cost
**Cons:** More setup required

Recommended VPS providers:

- DigitalOcean ($5/month)
- Linode ($5/month)
- AWS Lightsail ($3.50/month)

---

### Switching to Mainnet

When ready for real donations:

1. **Update `.env`:**

   ```env
   NETWORK=base
   WALLET_ADDRESS=0xYourRealWallet
   ```

2. **Verify wallet:**
   - Triple-check the address is correct
   - Send a test $0.10 USDC first
   - Confirm you receive it

3. **Get real USDC:**
   - Buy on Coinbase, send to Base network
   - Or bridge from Ethereum mainnet

4. **Test with small amount:**
   - Make a $1 donation to yourself
   - Verify everything works

5. **Go live!**

---

### Domain & HTTPS

All production servers need HTTPS. Fortunately, most platforms provide it automatically:

- ✅ Railway: Automatic HTTPS
- ✅ Render: Automatic HTTPS
- ✅ Vercel: Automatic HTTPS

**Custom domain:**

1. Add CNAME record: `donations.yourdomain.com` → `your-app.railway.app`
2. Configure in platform dashboard
3. Wait for DNS propagation (5-60 minutes)

---

### Email Notifications Setup

Get notified when you receive donations:

#### Gmail Setup (Free)

1. **Enable 2-Step Verification** in Google Account
2. **Generate App Password:**
   - Google Account → Security → App passwords
   - Create password for "Mail"
   - Copy the 16-character password

3. **Update `.env`:**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=xxxx-xxxx-xxxx-xxxx  # App password
   NOTIFICATION_EMAIL=your-email@gmail.com
   ```

#### SendGrid Setup (Scalable)

For higher volume:

1. Sign up at [SendGrid](https://sendgrid.com) (free 100 emails/day)
2. Create API key
3. Update `.env`:
   ```env
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASS=YOUR_SENDGRID_API_KEY
   NOTIFICATION_EMAIL=your-email@gmail.com
   ```

---

## 🐛 Troubleshooting

### Server Issues

#### "Error: WALLET_ADDRESS is required"

**Solution:** Add `WALLET_ADDRESS` to `.env` file

#### "Port 3000 already in use"

**Solution:**

```bash
# Change port in .env
PORT=3001

# Or kill process using port 3000
lsof -ti:3000 | xargs kill
```

#### "CORS error"

**Solution:** Add your website origin to `.env`:

```env
CORS_ORIGIN=https://yoursite.com
```

---

### Widget Issues

#### "No Web3 wallet detected"

**Solution:**

- Install MetaMask or Coinbase Wallet extension
- Refresh page after installation

#### "Wrong network"

**Solution:**

- Open MetaMask
- Switch to Base Sepolia (testnet) or Base (mainnet)
- Widget will auto-detect

#### "Widget doesn't appear"

**Solution:**

1. Check browser console for errors (F12)
2. Verify script URL is correct
3. Ensure CSS is loaded:
   ```html
   <link rel="stylesheet" href="https://unpkg.com/cryptomeacoffee@1/src/styles.css" />
   ```

#### "Payment failed"

**Solution:**

1. Check server is running
2. Verify `apiEndpoint` URL is correct
3. Check server logs for errors
4. Ensure sufficient USDC in donor wallet

---

### Payment Issues

#### "Insufficient funds"

**Testnet:** Get USDC from [Circle Faucet](https://faucet.circle.com/)
**Mainnet:** Buy USDC on Coinbase, send to Base network

#### "Transaction failed"

**Common causes:**

- Wrong network (Ethereum instead of Base)
- Insufficient gas (shouldn't happen with x402)
- Network congestion (rare on Base)

**Solution:** Try again, usually resolves immediately

---

### Email Issues

#### "Email not received"

**Solution:**

1. Check spam folder
2. Verify `NOTIFICATION_EMAIL` in `.env`
3. Test SMTP credentials:

   ```bash
   # Check server logs for email errors
   npm start
   # Look for "📧 Email notification sent"
   ```

4. For Gmail, verify App Password is correct

---

## 📚 Next Steps

Now that you're set up:

1. **Customize:** See [Customization Guide](./CUSTOMIZATION.md)
2. **Secure:** Complete [Security Checklist](./SECURITY-CHECKLIST.md)
3. **Reference:** Check [API Reference](./API-REFERENCE.md)
4. **Questions:** Read [FAQ](./FAQ.md)

---

## 🆘 Getting Help

Still stuck?

- 📖 **Documentation:** Check other guides in `/docs`
- 🐛 **Bug Report:** [GitHub Issues](https://github.com/yourusername/cryptomeacoffee/issues)
- 💬 **Questions:** [GitHub Discussions](https://github.com/yourusername/cryptomeacoffee/discussions)
- 🔧 **x402 Issues:** [x402 Documentation](https://x402.org/docs)

---

**Happy fundraising! 💝**
