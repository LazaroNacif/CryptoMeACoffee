# CryptoMeACoffee Vercel Serverless Function

Deploy CryptoMeACoffee's donation backend as a **Vercel serverless function**. Perfect for low-medium traffic with zero server management.

## ⚡ Why Vercel?

- **Deploy in 60 seconds** - Fastest deployment option
- **Free tier** - 100k requests/month, sufficient for most creators
- **Auto-scaling** - Handles traffic spikes automatically
- **Zero maintenance** - No servers to manage
- **Global CDN** - Low latency worldwide
- **$0 when idle** - Only pay for actual usage

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
CORS_ORIGIN=https://yourdomain.com      # Your frontend domain
```

### 3. Deploy to Vercel

**Option A: Deploy via GitHub (Recommended)**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Import your GitHub repository
5. Vercel auto-detects settings
6. Click **"Deploy"**

**Option B: Deploy via CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (first time - interactive)
vercel

# Production deploy
vercel --prod
```

### 4. Configure Environment Variables in Vercel

After deployment, add environment variables:

1. Go to **Settings** → **Environment Variables**
2. Add all variables from your `.env` file
3. Click **"Redeploy"** after adding variables

Your API endpoint will be:

```
https://your-project.vercel.app/api/donate
```

## 📡 API Endpoint

### POST /api/donate

Accept crypto donations via x402 protocol.

**Request Body:**

```json
{
  "amount": 5.0,
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
  "amount": 5.0,
  "timestamp": "2025-11-30T20:00:00.000Z"
}
```

## 🔧 Configuration

### Environment Variables

#### Required Configuration

| Variable          | Required | Default                      | Description                              |
| ----------------- | -------- | ---------------------------- | ---------------------------------------- |
| `WALLET_ADDRESS`  | **Yes**  | -                            | Your wallet address (where donations go) |
| `NETWORK`         | No       | base-sepolia                 | Network: "base-sepolia" or "base"        |
| `FACILITATOR_URL` | No       | https://x402.org/facilitator | x402 facilitator endpoint                |
| `CORS_ORIGIN`     | **Yes**  | -                            | Allowed CORS origin(s), comma-separated  |

#### Optional: Email Notifications

| Variable             | Required | Default | Description                        |
| -------------------- | -------- | ------- | ---------------------------------- |
| `EMAIL_HOST`         | No       | -       | SMTP server (e.g., smtp.gmail.com) |
| `EMAIL_PORT`         | No       | 587     | SMTP port                          |
| `EMAIL_SECURE`       | No       | false   | Use TLS (true/false)               |
| `EMAIL_USER`         | No       | -       | SMTP username/email                |
| `EMAIL_PASS`         | No       | -       | SMTP password/app password         |
| `NOTIFICATION_EMAIL` | No       | -       | Where to send donation alerts      |

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

### Local Development

Test locally using Vercel CLI:

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

The function will run on `http://localhost:3000/api/donate`

### Test Donation Flow

1. Start local dev server: `npm run dev`
2. Start widget demo (in project root):
   ```bash
   python3 -m http.server 8000
   ```
3. Open http://localhost:8000/examples/vanilla-html/index.html
4. Update widget config to use `http://localhost:3000/api/donate`
5. Connect wallet and try a donation!

### Test with curl

```bash
curl -X POST http://localhost:3000/api/donate \
  -H "Content-Type: application/json" \
  -d '{"amount": 5.00, "message": "Test donation"}'
```

Expected: `402 Payment Required` with payment details

## 📊 Vercel vs Express Comparison

| Feature          | Vercel Serverless | Express (Traditional) |
| ---------------- | ----------------- | --------------------- |
| **Setup Time**   | 1-2 minutes       | 5-10 minutes          |
| **Cold Starts**  | Yes (~500ms)      | No                    |
| **State**        | Stateless         | Can be stateful       |
| **Websockets**   | No                | Yes                   |
| **Max Duration** | 10s (60s Pro)     | Unlimited             |
| **Scaling**      | Automatic         | Manual                |
| **Cost at Idle** | $0                | Server runs 24/7      |
| **Free Tier**    | 100k req/month    | N/A                   |
| **Monitoring**   | Built-in          | Setup required        |

**Vercel is Best For:**

- ✅ Low-medium traffic (< 100k donations/month)
- ✅ Bursty traffic patterns
- ✅ Cost-sensitive projects
- ✅ Quick deployments
- ✅ Global distribution

**Express is Better For:**

- ❌ High traffic (> 100k requests/month)
- ❌ Websockets/real-time features
- ❌ Stateful connections
- ❌ Custom server requirements

## 🚨 Limitations

### Free Tier Limits

- **100,000 function invocations/month** - Usually sufficient for small-medium creators
- **100 GB-hours of execution/month** - Rarely hit with donation endpoints
- **1000ms max execution time** - Plenty for payment verification

### Cold Starts

- First request after inactivity: ~500ms latency
- Subsequent requests: ~50ms latency
- Consider Pro plan for faster cold starts

### Timeout

- Free: 10 seconds max
- Pro ($20/month): 60 seconds max
- Payment verification typically takes < 2 seconds

## 📈 Monitoring

### View Logs

**In Vercel Dashboard:**

1. Go to **Deployments**
2. Click on a deployment
3. Click **"Functions"** tab
4. View logs for each invocation

**Via CLI:**

```bash
vercel logs your-project.vercel.app
```

### Function Analytics

1. Go to **Analytics** tab in Vercel dashboard
2. View:
   - Invocation count
   - Error rate
   - Duration (p50, p95, p99)
   - Cold starts

## 🔐 Security

### Built-in Security

- ✅ CORS validation
- ✅ Input validation (amount, message)
- ✅ XSS sanitization (DOMPurify)
- ✅ Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- ✅ HTTPS by default

### Best Practices

1. **Never commit `.env`** - Contains sensitive wallet address
2. **Set CORS_ORIGIN** - Restrict to your actual domain(s)
3. **Use environment variables** - Never hardcode secrets
4. **Monitor logs** - Watch for suspicious activity

## 🛠️ Troubleshooting

### "WALLET_ADDRESS is required"

- Ensure environment variable is set in Vercel dashboard
- Redeploy after adding environment variables

### CORS Errors

- Check `CORS_ORIGIN` matches your frontend domain
- Include protocol (https://) in CORS_ORIGIN
- For multiple domains, use comma-separated list

### Function Timeout

**Error:** Function exceeded 10s timeout

**Solution:**

- Upgrade to Pro plan for 60s timeout
- Or optimize function (usually not needed for donations)

### Cold Start Latency

- First request after inactivity is slower (~500ms)
- This is normal for serverless
- Consider Pro plan for faster cold starts via Edge Functions

### Email Not Sending

- Verify SMTP credentials are correct
- For Gmail, use an App Password
- Check Vercel logs for email errors
- Email failures don't break the donation flow

## 💰 Cost Estimation

### Free Tier Usage Example

**1,000 donations/month:**

- Invocations: 2,000 (widget makes 2 requests per donation) ✅
- Execution time: ~200ms each = 400 seconds total
- GB-hours: ~0.1 (well within 100 GB-hours limit) ✅
- **Cost: $0/month**

**10,000 donations/month:**

- Invocations: 20,000 ✅ (within 100k limit)
- GB-hours: ~1.0 ✅ (within limit)
- **Cost: $0/month**

### When to Upgrade to Pro ($20/month)

Upgrade when you need:

- More than 100k invocations/month
- Functions running >10 seconds
- Advanced analytics
- Faster cold starts
- More concurrent executions

## 📦 What's Included

```
server-examples/vercel/
├── api/
│   └── donate.js          # Main serverless function
├── package.json           # Dependencies
├── vercel.json            # Vercel configuration
├── .env.example           # Example configuration
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🔗 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [x402 Protocol Docs](https://docs.cdp.coinbase.com/x402/)
- [Base Network Docs](https://docs.base.org)
- [CDP Portal](https://portal.cdp.coinbase.com) (for mainnet API keys)

## 📝 Next Steps

After getting this working:

1. ✅ Test full donation flow with widget
2. ✅ Configure custom domain (optional)
3. ✅ Set up email notifications (optional)
4. ✅ Switch to mainnet when ready
5. ✅ Monitor analytics regularly

## 🆚 Alternative Deployment Options

- **[Netlify](../netlify/README.md)** - Similar serverless option
- **[Express](../express/README.md)** - Traditional server for high traffic

---

**Need help?** Check the main project [README](../../README.md) or open an issue on GitHub.
