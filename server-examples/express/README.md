# CryptoMeACoffee Express Server

Express.js server example using **x402-express** middleware for handling crypto donations via the x402 protocol.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update with your settings:

```bash
cp .env.example .env
```

**Required Configuration:**
```env
WALLET_ADDRESS=0xYourWalletAddressHere  # Your Base wallet address
NETWORK=base-sepolia                    # or "base" for mainnet
FACILITATOR_URL=https://x402.org/facilitator  # Testnet facilitator
```

### 3. Start Server

```bash
npm start
```

The server will run on `http://localhost:3000`

## 📡 API Endpoints

### POST /api/donate
Accept crypto donations via x402 protocol.

**Request Body:**
```json
{
  "amount": 5.00,
  "message": "Great work!"
}
```

**x402 Flow:**
1. First request → Server returns `402 Payment Required` with payment details
2. Client signs payment with wallet
3. Client resends request with `X-PAYMENT` header containing signature
4. x402 middleware verifies payment via facilitator
5. On success → Endpoint processes donation
6. Server returns success response

**Success Response:**
```json
{
  "success": true,
  "message": "Thank you for your donation!",
  "amount": 5.00,
  "timestamp": "2025-11-15T20:00:00.000Z"
}
```

### GET /health
Health check endpoint.

```json
{
  "status": "ok",
  "timestamp": "2025-11-15T20:00:00.000Z",
  "network": "base-sepolia",
  "walletAddress": "0x742d..."
}
```

### GET /
Service information.

## ✨ Features

### Dynamic Pricing
- **Accepts any donation amount** from $0.01 to $1,000,000
- Automatically configures x402 payment requirements based on user input
- No static pricing limitations

### Email Notifications (Optional)
- **Receive instant email alerts** when donations are received
- **Async/non-blocking** - doesn't slow down widget response
- **Fully optional** - works without email configuration
- **Supports any SMTP provider** - Gmail, SendGrid, Mailgun, etc.

### Message Support
- Supporters can include optional messages (up to 500 characters)
- Messages delivered in request body and email notifications
- Perfect for thank-you notes and community engagement

## 🔧 Configuration

### Environment Variables

#### Required Configuration

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 3000 | Server port |
| `WALLET_ADDRESS` | **Yes** | - | Your wallet address (where donations go) |
| `NETWORK` | No | base-sepolia | Network: "base-sepolia" or "base" |
| `FACILITATOR_URL` | No | https://x402.org/facilitator | x402 facilitator endpoint |
| `CORS_ORIGIN` | No | http://localhost:8000 | Allowed CORS origin |

#### Optional: Email Notifications

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `EMAIL_HOST` | No | - | SMTP server (e.g., smtp.gmail.com) |
| `EMAIL_PORT` | No | 587 | SMTP port |
| `EMAIL_SECURE` | No | false | Use TLS (true/false) |
| `EMAIL_USER` | No | - | SMTP username/email |
| `EMAIL_PASS` | No | - | SMTP password/app password |
| `NOTIFICATION_EMAIL` | No | - | Where to send donation alerts |

**Email Setup Example (Gmail):**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NOTIFICATION_EMAIL=your-email@gmail.com
```

Note: Gmail requires an [App Password](https://support.google.com/accounts/answer/185833), not your regular password.

### Testnet vs Mainnet

**Testnet (Base Sepolia):**
```env
NETWORK=base-sepolia
FACILITATOR_URL=https://x402.org/facilitator
```
- Free to use
- No CDP API keys required
- Uses fake USDC for testing

**Mainnet (Base):**
```env
NETWORK=base
CDP_API_KEY_ID=your_api_key_id
CDP_API_KEY_SECRET=your_api_key_secret
```
- Requires CDP API keys from https://portal.cdp.coinbase.com
- Real USDC transfers
- Zero platform fees

## 🧪 Testing

### Test with curl

**1. Get Payment Requirements (402 Response):**
```bash
curl -X POST http://localhost:3000/api/donate \
  -H "Content-Type: application/json" \
  -d '{"amount": 5.00, "message": "Test donation"}'
```

Expected: `402 Payment Required` with payment details

**2. Health Check:**
```bash
curl http://localhost:3000/health
```

### Test with Widget

1. Start this server: `npm start`
2. Start the widget demo server (in project root):
   ```bash
   python3 -m http.server 8000
   ```
3. Open http://localhost:8000/examples/vanilla-html/index.html
4. Connect wallet and try a donation!

## 🔐 How x402-express Works

The `paymentMiddleware` automatically handles:

1. **402 Response**: Returns payment requirements on first request
2. **Payment Verification**: Validates signatures via x402 facilitator
3. **Nonce Management**: Prevents replay attacks
4. **Blockchain Settlement**: Processes USDC transfer on-chain
5. **Gas Sponsorship**: Users don't pay gas fees

**You don't write any verification code!** The middleware handles everything.

## 📦 What's Included

```
server-examples/express/
├── server.js           # Main server file with x402 middleware
├── package.json        # Dependencies
├── .env.example        # Example configuration
├── .env                # Your actual config (gitignored)
└── README.md           # This file
```

## 🚨 Security Notes

- **Never commit `.env`** - Contains sensitive configuration
- **Validate amounts** - Middleware uses inputSchema for validation
- **Rate limiting** - Consider adding rate limiting in production
- **HTTPS only** - Use HTTPS in production (facilitator requires it)

## 🔗 Resources

- [x402 Protocol Docs](https://docs.cdp.coinbase.com/x402/)
- [x402-express GitHub](https://github.com/coinbase/x402)
- [Base Network Docs](https://docs.base.org)
- [CDP Portal](https://portal.cdp.coinbase.com) (for mainnet API keys)

## 🐛 Troubleshooting

### "WALLET_ADDRESS is required"
Make sure `.env` file exists and contains your wallet address.

### "x402-express not found"
Run `npm install` to install dependencies.

### CORS errors in browser
Check that `CORS_ORIGIN` in `.env` matches your frontend URL.

### 402 response but payment not verifying
- Ensure facilitator URL is correct
- Check network matches between server and widget
- Verify wallet has USDC on the correct network

## 📝 Next Steps

After getting this working:
1. ✅ Test full donation flow with widget
2. ✅ Configure email notifications (optional)
3. 📝 Add database to store donations
4. 📊 Add analytics tracking
5. 🚀 Deploy to production (Railway, Render, Fly.io)

## 📧 Email Notification Details

When enabled, you'll receive beautifully formatted emails for each donation:

**Email includes:**
- 💰 Donation amount in USDC
- 💬 Supporter's message (if provided)
- 🌐 Network used (testnet/mainnet)
- ⏰ Timestamp

**Performance:**
- Emails send asynchronously in the background
- Widget response time is not affected
- Errors are logged but don't break the donation flow

**Privacy:**
- Messages are NOT stored on the blockchain (too expensive)
- Messages are only sent to your server/email
- You control all message data

---

**Need help?** Check the main project README or open an issue on GitHub.
