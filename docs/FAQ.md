# CryptoMeACoffee - Frequently Asked Questions

**Everything you need to know about CryptoMeACoffee**

---

## 📋 Table of Contents

- [General Questions](#general-questions)
- [Setup & Installation](#setup--installation)
- [Technical Questions](#technical-questions)
- [Wallet & Crypto](#wallet--crypto)
- [Payment Questions](#payment-questions)
- [Troubleshooting](#troubleshooting)
- [Security & Privacy](#security--privacy)
- [Costs & Fees](#costs--fees)
- [Customization](#customization)
- [Comparison](#comparison)

---

## General Questions

### What is CryptoMeACoffee?

CryptoMeACoffee is an open-source, self-hosted donation widget that lets you accept USDC cryptocurrency donations on your website via the x402 protocol. Unlike centralized platforms like Buy Me a Coffee, you host your own server and keep 100% of donations with zero platform fees.

---

### How is this different from Buy Me a Coffee?

| Feature            | CryptoMeACoffee           | Buy Me a Coffee          |
| ------------------ | ------------------------- | ------------------------ |
| **Platform Fees**  | 0% (you keep everything)  | 5% platform fee          |
| **Hosting**        | Self-hosted (you control) | They host (they control) |
| **Payment Method** | Crypto (USDC)             | Fiat (credit cards)      |
| **Account Risk**   | Can't be banned           | Can be banned/suspended  |
| **Data Ownership** | You own all data          | They own your data       |
| **Customization**  | Fully customizable        | Limited theming          |
| **Open Source**    | Yes (MIT license)         | No (proprietary)         |

---

### Do I need to know how to code?

Not necessarily! If you can follow step-by-step instructions, you can set this up. Our [Setup Guide](./SETUP-GUIDE.md) walks you through deployment to Railway (no coding required). However, basic HTML knowledge helps for adding the widget to your site.

---

### Is this really zero fees?

Yes! There are **no platform fees**. The only costs are:

- **Gas fees:** Covered by x402 protocol (gasless for donors!)
- **Server hosting:** Free tier available on Railway/Render
- **Network fees:** Minimal on Base network (~$0.01)

You keep 100% of donations.

---

### What does "self-hosted" mean?

It means YOU run the server, not us. You deploy the code to a hosting provider (Railway, Render, Vercel, or your own VPS). Benefits:

- ✅ Full control over your data
- ✅ No platform can ban you
- ✅ You own the code (open source)
- ✅ Zero platform fees
- ✅ Privacy for you and donors

---

## Setup & Installation

### What do I need to get started?

**Minimum requirements:**

1. A Base wallet address (create free at [MetaMask.io](https://metamask.io))
2. A website where you want to add the widget
3. 5-10 minutes to deploy the server

**Optional:**

- Email account for notifications
- Custom domain (not required)

---

### How long does setup take?

**Quick setup:** 5-10 minutes using Railway one-click deploy
**Full setup with custom domain:** 15-20 minutes
**Local development setup:** 10 minutes

See our [Quick Start Guide](./SETUP-GUIDE.md#quick-start-5-minutes).

---

### Which hosting providers work?

**Recommended (free tiers available):**

- **Railway** - Easiest, auto-deploys, HTTPS included
- **Render** - Great performance, free tier
- **Vercel** - Edge functions (requires adaptation)
- **Fly.io** - Good free tier

**Also supported:**

- Any VPS (DigitalOcean, Linode, AWS Lightsail)
- Your own server
- Docker container

See [deployment guides](./SETUP-GUIDE.md#production-deployment).

---

### Do I need a custom domain?

No! Your hosting provider gives you a free URL:

- Railway: `https://your-app.up.railway.app`
- Render: `https://your-app.onrender.com`

Custom domains are optional.

---

### Can I run this locally for testing?

Yes!

```bash
git clone https://github.com/yourusername/cryptomeacoffee
cd server-examples/express
npm install
cp .env.example .env
# Edit .env with your wallet address
npm start
```

Server runs on `http://localhost:3000`. See [Testing Locally](./SETUP-GUIDE.md#testing-locally).

---

## Technical Questions

### Which blockchain does this use?

**Base** network (Ethereum Layer 2) for:

- ✅ Low fees (~$0.01 per transaction)
- ✅ Fast transactions (1-2 seconds)
- ✅ Ethereum security
- ✅ USDC support

You can test on **Base Sepolia** (testnet) before going live.

---

### Which cryptocurrency does it accept?

**USDC only** (USD Coin) - a stablecoin pegged to the US dollar.

Why USDC?

- ✅ Stable value ($1 = 1 USDC)
- ✅ Widely supported
- ✅ Easy to convert to fiat
- ✅ Works with x402 protocol

---

###Do supporters need cryptocurrency?

Yes, supporters need:

1. **A Web3 wallet** (MetaMask or Coinbase Wallet)
2. **USDC on Base network**

They can buy USDC directly in MetaMask/Coinbase Wallet and bridge to Base.

---

### Do supporters pay gas fees?

**No!** The x402 protocol sponsors gas fees, making donations **completely gasless** for supporters. They only pay the donation amount (e.g., exactly $5 for a $5 donation).

---

### Why do I need a server?

The server handles:

- ✅ **Gasless donations** (via x402 protocol)
- ✅ **Dynamic amounts** ($1, $5, or custom)
- ✅ **Email notifications** when you receive donations
- ✅ **Message storage** from supporters
- ✅ **Rate limiting** (spam/DOS protection)
- ✅ **Input validation** (security)

The widget alone can't do all this - but the server is lightweight and easy to deploy!

---

### Which wallets are supported?

**For creators (you):**

- Any Base-compatible wallet (MetaMask, Coinbase Wallet, Rainbow, etc.)

**For donors:**

- MetaMask (browser extension or mobile)
- Coinbase Wallet (browser extension or mobile)
- Any WalletConnect-compatible wallet

---

### Can I accept multiple cryptocurrencies?

Not currently. CryptoMeACoffee only supports USDC on Base. Multi-token support may be added in future versions.

---

## Wallet & Crypto

### How do I create a Base wallet?

1. Install [MetaMask](https://metamask.io) browser extension
2. Create new wallet (follow prompts)
3. **IMPORTANT:** Write down your seed phrase and store it securely
4. Add Base network to MetaMask
5. Copy your wallet address (starts with `0x...`)

Your wallet address is free and takes 2 minutes to create.

---

### Is my wallet address safe to share publicly?

**Yes!** Your wallet **address** (0x...) is public information - like an email address. It's safe to share.

**Never share:**

- ❌ Private keys
- ❌ Seed phrase (12-24 words)
- ❌ Password

Only share your public address (`0x...`).

---

### Where do donations go?

Donations go **directly to your wallet address** via blockchain transaction. You see them instantly in your MetaMask/Coinbase Wallet. No intermediary, no escrow, no delay.

---

### How do I convert USDC to regular money?

1. **Send USDC to exchange:**
   - Coinbase, Kraken, Binance, etc.
   - Or use on-ramp like MoonPay

2. **Sell for fiat:**
   - Exchange USDC → USD/EUR/etc.

3. **Withdraw to bank:**
   - Transfer to your bank account

Most exchanges process this in 1-3 business days.

---

### What if I lose access to my wallet?

If you lose your seed phrase, **your funds are gone forever**. No one can recover them.

**Protect your seed phrase:**

- ✅ Write it down on paper
- ✅ Store in a safe place
- ✅ Never share it
- ✅ Consider a hardware wallet for large amounts

---

## Payment Questions

### How long do payments take?

**Instant!** Donations appear in your wallet within 1-2 seconds of approval.

**Flow:**

1. Supporter clicks "Donate $5"
2. Approves in wallet (~5 seconds)
3. Transaction processes (~1-2 seconds)
4. You receive USDC ✅
5. Email notification sent (if configured)

Total time: ~10 seconds.

---

### Are there any fees?

**Platform fees:** $0 (zero!)

**Other costs:**

- Gas fees: $0 (x402 covers it)
- Server hosting: $0 (free tiers available)
- Network fees: ~$0.01 (Base network fee)

**You keep 99.99% of donations.**

---

### What's the minimum donation amount?

Default: **$0.01** (1 cent)

You can configure this:

```javascript
{
  minAmount: 0.01,  // or any amount
  maxAmount: 1000000
}
```

---

### Can supporters donate custom amounts?

**Yes!** Supporters can:

- Choose preset amounts ($1, $3, $5)
- Enter any custom amount ($0.01 - $1,000,000)

You configure preset amounts:

```javascript
{
  presetAmounts: [1, 3, 5, 10, 20];
}
```

---

### Can supporters include a message?

**Yes!** Supporters can include a message up to 500 characters. You'll receive it via:

- Email notification (if configured)
- Server logs
- Your database (if you add one)

---

### Can I refund a donation?

Yes, manually:

1. Copy donor's wallet address from transaction
2. Send USDC back from your wallet

There's no automatic refund system (it's blockchain - transactions are final).

---

## Troubleshooting

### Widget doesn't appear on my website

**Check:**

1. Is the script tag before `</body>`?
2. Is the CSS loaded?
   ```html
   <link rel="stylesheet" href="https://unpkg.com/cryptomeacoffee@1/src/styles.css" />
   ```
3. Open browser console (F12) - any errors?
4. Is `data-wallet` and `data-api` set correctly?

---

### "No Web3 wallet detected" error

**Solution:**

1. Install [MetaMask](https://metamask.io) browser extension
2. Refresh page
3. Try donating again

Mobile users need MetaMask or Coinbase Wallet app.

---

### "Wrong network" error

**Solution:**

1. Open MetaMask
2. Click network dropdown (top of extension)
3. Select "Base Sepolia" (testnet) or "Base" (mainnet)
4. Widget detects automatically

Or click "Switch Network" button in widget.

---

### Payment fails but wallet is connected

**Common causes:**

1. **Insufficient USDC** - Add USDC to wallet
2. **Wrong network** - Switch to Base/Base Sepolia
3. **Server down** - Check server logs
4. **CORS error** - Add your domain to `CORS_ORIGIN` in `.env`

Check browser console (F12) for specific error.

---

### Email notifications not working

**Check:**

1. `NOTIFICATION_EMAIL` set in `.env`?
2. Using Gmail App Password (not regular password)?
3. Check spam folder
4. Look for "📧 Email notification sent" in server logs

See [Email Setup Guide](./SETUP-GUIDE.md#email-notifications-setup).

---

### Server responds with 429 "Too Many Requests"

You hit the rate limit (5 donations per 15 minutes per IP). This is intentional spam protection.

**Solutions:**

- Wait 15 minutes
- For testing: Temporarily disable rate limiting
- For production: This protects against abuse

---

## Security & Privacy

### Is this secure?

Yes, when properly configured! We've implemented:

- ✅ XSS prevention (DOMPurify sanitization)
- ✅ Input validation (express-validator)
- ✅ Rate limiting (5 requests/15min)
- ✅ CORS protection
- ✅ HTTPS enforcement
- ✅ NoSQL injection prevention

Complete our [Security Checklist](./SECURITY-CHECKLIST.md) before launch.

---

### Can donations be traced?

**Yes** - all blockchain transactions are public. Anyone can see:

- ✅ Transaction amount
- ✅ Sender address
- ✅ Recipient address (your wallet)
- ✅ Timestamp

**But messages are private** (only sent to your server).

---

### Where are donor messages stored?

Messages are sent to your server via HTTP request. By default, they're:

- ✅ Shown in server logs
- ✅ Sent to your email (if configured)

They're **not** stored on the blockchain (too expensive). If you want permanent storage, add a database.

---

### Can my account be banned?

**No!** There's no central authority. You control:

- Your wallet (blockchain-based)
- Your server (self-hosted)
- Your code (open source)

No one can ban or suspend you.

---

## Costs & Fees

### How much does hosting cost?

**Free tier options:**

- **Railway:** 500 hours/month free (~$0/month for small usage)
- **Render:** 750 hours/month free
- **Vercel:** Unlimited (with limits on serverless functions)

**Paid options:**

- **Railway:** $5/month after free tier
- **DigitalOcean:** $5/month (VPS)
- **AWS Lightsail:** $3.50/month

Most creators stay on free tier.

---

### Are there transaction limits?

**Widget:** No limit on number or size of donations

**Rate limiting:** 5 donations per 15 minutes per IP (configurable)

**Hosting limits:**

- Free tiers: ~10,000 requests/month
- Usually sufficient for most creators

---

## Customization

### Can I change the button color?

Yes!

```javascript
{
  color: '#FF6B6B'; // Any hex color
}
```

Or via HTML:

```html
<script data-color="#FF6B6B"></script>
```

---

### Can I customize the appearance?

**Yes!** Extensive customization via:

- CSS variables (colors, spacing, borders)
- Custom CSS overrides
- Logo upload
- Light/dark themes

See [Customization Guide](./CUSTOMIZATION.md).

---

### Can I change the button position?

Yes!

```javascript
{
  position: 'Left',  // or 'Right'
  xMargin: 20,       // pixels from edge
  yMargin: 20        // pixels from bottom
}
```

---

### Can I translate the widget?

Not automatically yet. You can override text via CSS `content` properties or by forking and modifying the source code. Multi-language support is planned for future versions.

---

## Comparison

### Why not just use PayPal/Stripe?

**PayPal/Stripe require:**

- Business verification
- Bank account linking
- Can freeze your account
- 2.9% + $0.30 per transaction
- 5-7 day payout delays

**CryptoMeACoffee:**

- ✅ No verification needed
- ✅ Direct to your wallet
- ✅ Can't be frozen
- ✅ ~0% fees
- ✅ Instant payouts

---

### Why not use Patreon/Ko-fi?

**Patreon/Ko-fi:**

- 5-8% platform fees
- They control your account
- Monthly subscription focus
- Limited customization

**CryptoMeACoffee:**

- ✅ 0% fees
- ✅ You control everything
- ✅ One-time donations
- ✅ Fully customizable

---

### Why not use GitHub Sponsors?

GitHub Sponsors is great! But:

- Only for open source developers
- No crypto support
- Limited to GitHub audience

CryptoMeACoffee works for any creator, any website, crypto-native.

---

## Getting Help

### Where can I get help?

- 📖 **Documentation:** [Setup Guide](./SETUP-GUIDE.md) | [API Reference](./API-REFERENCE.md)
- 💬 **Community:** [GitHub Discussions](https://github.com/yourusername/cryptomeacoffee/discussions)
- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/yourusername/cryptomeacoffee/issues)
- 🔧 **x402 Protocol:** [x402.org/docs](https://x402.org/docs)

---

### How do I report a bug?

1. Check if it's already reported: [GitHub Issues](https://github.com/yourusername/cryptomeacoffee/issues)
2. Create new issue with:
   - Clear description
   - Steps to reproduce
   - Browser/environment details
   - Screenshots (if applicable)

---

### How can I contribute?

We welcome contributions!

- 🐛 **Bug fixes:** Submit a PR
- ✨ **Features:** Open an issue first to discuss
- 📖 **Documentation:** Improvements always welcome
- 🌍 **Translations:** Help translate the widget

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

---

### Can I hire someone to set this up for me?

Yes! Post in [GitHub Discussions](https://github.com/yourusername/cryptomeacoffee/discussions) or hire a developer from:

- Upwork
- Fiverr
- Toptal

Setup is simple - should cost $50-200 for a dev to do it.

---

## Roadmap

### What features are coming next?

**Planned features:**

- 🌍 Multi-language support
- 📊 Built-in analytics dashboard
- 💬 Discord/Slack webhooks
- 🎨 More preset themes
- 🪙 Multi-token support (ETH, DAI, etc.)
- 📱 Mobile app
- 🔔 Push notifications

**Want something else?** [Request a feature](https://github.com/yourusername/cryptomeacoffee/issues/new)!

---

### Is this production-ready?

**Phases 1-3 complete:**

- ✅ Security fixes
- ✅ Testing infrastructure
- ✅ CI/CD pipeline

**For production:**

- Complete [Security Checklist](./SECURITY-CHECKLIST.md)
- Deploy to production hosting
- Test with small amount first

Current status: **Ready for production with proper setup**.

---

**Still have questions?** Ask in [GitHub Discussions](https://github.com/yourusername/cryptomeacoffee/discussions)!
