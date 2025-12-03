# CryptoMeACoffee Netlify Serverless Function

Deploy CryptoMeACoffee's donation backend as a **Netlify serverless function**. Perfect for low-medium traffic with excellent Git integration.

## 🌊 Why Netlify?

- **Deploy in 60 seconds** - Fast deployment with Git integration
- **Free tier** - 125k requests/month (more than Vercel!)
- **Auto-scaling** - Handles traffic spikes automatically
- **Zero maintenance** - No servers to manage
- **Global CDN** - Low latency worldwide
- **$0 when idle** - Only pay for actual usage
- **Excellent Git workflow** - Deploy previews for PRs

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

### 3. Deploy to Netlify

**Option A: Deploy via GitHub (Recommended)**

1. Push your code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect to GitHub and select your repository
5. Netlify auto-detects settings from `netlify.toml`
6. Click **"Deploy site"**

**Option B: Deploy via CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy (first time - interactive)
netlify deploy

# Production deploy
netlify deploy --prod
```

### 4. Configure Environment Variables in Netlify

After deployment, add environment variables:

1. Go to **Site settings** → **Environment variables**
2. Add all variables from your `.env` file
3. Click **"Redeploy site"** after adding variables

Your API endpoint will be:

```
https://your-site.netlify.app/api/donate
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

Test locally using Netlify CLI:

```bash
# Install dependencies
npm install

# Start local dev server (includes functions)
npm run dev
```

The function will run on `http://localhost:8888/api/donate`

### Test Donation Flow

1. Start local dev server: `npm run dev`
2. Update widget config to use `http://localhost:8888/api/donate`
3. Connect wallet and try a donation!

### Test with curl

```bash
curl -X POST http://localhost:8888/api/donate \
  -H "Content-Type: application/json" \
  -d '{"amount": 5.00, "message": "Test donation"}'
```

Expected: `402 Payment Required` with payment details

## 📊 Netlify vs Vercel vs Express

| Feature             | Netlify        | Vercel         | Express      |
| ------------------- | -------------- | -------------- | ------------ |
| **Setup Time**      | 1-2 minutes    | 1-2 minutes    | 5-10 minutes |
| **Free Tier**       | 125k req/month | 100k req/month | N/A          |
| **Cold Starts**     | Yes (~500ms)   | Yes (~500ms)   | No           |
| **Max Timeout**     | 10s (26s Pro)  | 10s (60s Pro)  | Unlimited    |
| **Scaling**         | Automatic      | Automatic      | Manual       |
| **Cost at Idle**    | $0             | $0             | Server cost  |
| **Deploy Previews** | ✅ Yes         | ✅ Yes         | ❌ No        |
| **Git Integration** | ⭐ Excellent   | Good           | Manual       |

**Netlify is Best For:**

- ✅ Low-medium traffic (< 125k donations/month)
- ✅ Teams using Git workflows
- ✅ Projects needing deploy previews
- ✅ Cost-sensitive projects
- ✅ Quick deployments

**Express is Better For:**

- ❌ High traffic (> 125k requests/month)
- ❌ Websockets/real-time features
- ❌ Stateful connections
- ❌ Custom server requirements

## 🚨 Limitations

### Free Tier Limits

- **125,000 function invocations/month** - More generous than Vercel!
- **100 hours of function runtime/month** - Rarely hit with donation endpoints
- **10 seconds max execution time** - Plenty for payment verification

### Cold Starts

- First request after inactivity: ~500ms latency
- Subsequent requests: ~50ms latency
- Consider Pro plan ($19/month) for faster cold starts

### Timeout

- Free: 10 seconds max
- Pro ($19/month): 26 seconds max
- Payment verification typically takes < 2 seconds

## 📈 Monitoring

### View Logs

**In Netlify Dashboard:**

1. Go to **Functions** tab
2. Click on the `donate` function
3. View real-time logs
4. Filter by time range

**Via CLI:**

```bash
netlify functions:log donate
```

### Function Analytics

1. Go to **Analytics** tab in Netlify dashboard
2. View:
   - Invocation count
   - Error rate
   - Execution duration
   - Bandwidth usage

### Deploy Previews

- Every PR gets a unique preview URL
- Test changes before merging
- Automatic cleanup after merge

## 🔐 Security

### Built-in Security

- ✅ CORS validation
- ✅ Input validation (amount, message)
- ✅ XSS sanitization (DOMPurify)
- ✅ Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- ✅ HTTPS by default
- ✅ DDoS protection included

### Best Practices

1. **Never commit `.env`** - Contains sensitive wallet address
2. **Set CORS_ORIGIN** - Restrict to your actual domain(s)
3. **Use environment variables** - Never hardcode secrets
4. **Monitor logs** - Watch for suspicious activity

## 🛠️ Troubleshooting

### "WALLET_ADDRESS is required"

- Ensure environment variable is set in Netlify dashboard
- Redeploy after adding environment variables

### CORS Errors

- Check `CORS_ORIGIN` matches your frontend domain
- Include protocol (https://) in CORS_ORIGIN
- For multiple domains, use comma-separated list

### Function Not Found

- Verify `netlify.toml` is in project root
- Check function path: `netlify/functions/donate.js`
- Redeploy after making changes

### Cold Start Latency

- First request after inactivity is slower (~500ms)
- This is normal for serverless
- Consider Pro plan for background functions

### Email Not Sending

- Verify SMTP credentials are correct
- For Gmail, use an App Password
- Check Netlify function logs for email errors
- Email failures don't break the donation flow

## 💰 Cost Estimation

### Free Tier Usage Example

**1,000 donations/month:**

- Invocations: 2,000 (widget makes 2 requests per donation) ✅
- Runtime: ~400 seconds total ✅
- **Cost: $0/month**

**10,000 donations/month:**

- Invocations: 20,000 ✅ (within 125k limit)
- Runtime: ~4,000 seconds (~1.1 hours) ✅
- **Cost: $0/month**

**50,000 donations/month:**

- Invocations: 100,000 ✅ (within 125k limit)
- Runtime: ~20,000 seconds (~5.5 hours) ✅
- **Cost: $0/month**

### When to Upgrade to Pro ($19/month)

Upgrade when you need:

- More than 125k invocations/month
- More than 100 hours runtime/month
- Functions running >10 seconds
- Background functions
- Priority support

## 📦 What's Included

```
server-examples/netlify/
├── netlify/
│   └── functions/
│       └── donate.js      # Main serverless function
├── package.json           # Dependencies
├── netlify.toml           # Netlify configuration
├── .env.example           # Example configuration
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🔗 Resources

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [x402 Protocol Docs](https://docs.cdp.coinbase.com/x402/)
- [Base Network Docs](https://docs.base.org)
- [CDP Portal](https://portal.cdp.coinbase.com) (for mainnet API keys)

## 📝 Next Steps

After getting this working:

1. ✅ Test full donation flow with widget
2. ✅ Set up deploy previews for PRs
3. ✅ Configure custom domain (optional)
4. ✅ Set up email notifications (optional)
5. ✅ Switch to mainnet when ready
6. ✅ Monitor analytics regularly

## 🆚 Alternative Deployment Options

- **[Vercel](../vercel/README.md)** - Alternative serverless option
- **[Express](../express/README.md)** - Traditional server for high traffic

---

**Need help?** Check the main project [README](../../README.md) or open an issue on GitHub.
