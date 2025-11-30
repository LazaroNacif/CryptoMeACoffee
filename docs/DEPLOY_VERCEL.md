# Deploying to Vercel (Serverless)

Vercel specializes in serverless deployments and is perfect for frontend-heavy applications. This guide shows how to deploy CryptoMeACoffee's backend as a Vercel serverless function.

> **Note**: Vercel is optimized for serverless architectures. For traditional Node.js servers, consider Railway or Render instead. This guide adapts the Express server to work with Vercel's serverless model.

## Prerequisites

- Vercel account (free tier available at [vercel.com](https://vercel.com))
- GitHub, GitLab, or Bitbucket repository
- Node.js 18+ installed locally
- Base wallet address

## Architecture Overview

**Traditional Server (Express):**

```
HTTP Request → Express Server (always running) → Response
```

**Vercel Serverless:**

```
HTTP Request → Lambda Function (runs on-demand) → Response
```

Each request spins up a new function instance, executes, and terminates.

## Method 1: Quick Deploy (Frontend + Backend)

This method deploys both your website and API endpoint together.

### 1. Project Structure

Reorganize your project for Vercel:

```
your-project/
├── public/              # Your website files
│   ├── index.html
│   └── ...
├── api/                 # Serverless functions
│   └── donate.js        # Your donation endpoint
├── .env.local           # Local environment variables
├── vercel.json          # Vercel configuration
└── package.json
```

### 2. Create Serverless Function

Create `api/donate.js`:

```javascript
import { paymentMiddleware } from 'x402-express';
import nodemailer from 'nodemailer';
import DOMPurify from 'isomorphic-dompurify';
import { body, validationResult } from 'express-validator';

// Initialize email transporter (optional)
let emailTransporter = null;
if (process.env.EMAIL_HOST) {
  emailTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// Validation middleware
const validateDonation = [
  body('amount')
    .isFloat({ min: 0.01, max: 1000000 })
    .withMessage('Amount must be between $0.01 and $1,000,000'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Message must be 500 characters or less')
    .escape(),
];

// Main serverless function
export default async function handler(req, res) {
  // CORS handling
  const origin = req.headers.origin;
  const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [];

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Run validation
  for (const validation of validateDonation) {
    await validation.run(req);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { amount, message, email } = req.body;

  // x402 payment verification middleware
  const x402Middleware = paymentMiddleware({
    walletAddress: process.env.WALLET_ADDRESS,
    facilitatorUrl: process.env.FACILITATOR_URL,
    network: process.env.NETWORK || 'base-sepolia',
  });

  // Wrap x402 middleware for Vercel
  await new Promise((resolve, reject) => {
    x402Middleware(req, res, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });

  // If we got here, payment was verified
  console.log('✅ Payment verified:', { amount, hasMessage: !!message });

  // Send email notification (optional)
  if (emailTransporter && process.env.NOTIFICATION_EMAIL) {
    try {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.NOTIFICATION_EMAIL,
        subject: `New donation: $${amount}`,
        html: `
          <h2>New Donation Received</h2>
          <p><strong>Amount:</strong> $${amount} USDC</p>
          <p><strong>Message:</strong> ${DOMPurify.sanitize(message || 'No message')}</p>
          <p><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        `,
      });
    } catch (error) {
      console.error('Email send failed:', error);
      // Don't fail the request if email fails
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Thank you for your support!',
  });
}
```

### 3. Create vercel.json

Create `vercel.json` in your project root:

```json
{
  "version": 2,
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "api/**/*.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 4. Deploy via GitHub

**Push to GitHub:**

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

**Deploy on Vercel:**

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Vercel auto-detects settings
5. Click **"Deploy"**

### 5. Configure Environment Variables

In Vercel dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add these variables:

```env
WALLET_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
NETWORK=base-sepolia
FACILITATOR_URL=https://x402.org/facilitator
CORS_ORIGIN=https://yourdomain.com

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NOTIFICATION_EMAIL=notifications@example.com

# Monitoring (optional)
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

### 6. Redeploy

After adding environment variables:

1. Go to **Deployments**
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**

### 7. Update Your Widget

Your API endpoint will be:

```
https://your-project.vercel.app/api/donate
```

Update your widget:

```html
<script
  src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
  data-wallet="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  data-api="https://your-project.vercel.app/api/donate"
></script>
```

## Method 2: Vercel CLI Deploy

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login

```bash
vercel login
```

### 3. Deploy

```bash
# First deploy (interactive)
vercel

# Production deploy
vercel --prod
```

### 4. Set Environment Variables via CLI

```bash
vercel env add WALLET_ADDRESS
# Enter value when prompted

vercel env add NETWORK
# Enter: base-sepolia

vercel env add FACILITATOR_URL
# Enter: https://x402.org/facilitator
```

## Production Configuration

### Switch to Base Mainnet

Update environment variable:

```env
NETWORK=base
```

Then redeploy.

### Add Custom Domain

1. Go to **Settings** → **Domains**
2. Enter your domain: `yourdomain.com`
3. Add DNS records as shown:
   - A record: `76.76.21.21`
   - Or CNAME: `cname.vercel-dns.com`
4. Vercel auto-provisions SSL
5. Update widget with new domain

## Monitoring

### View Logs

**In Dashboard:**

1. Go to **Deployments**
2. Click on a deployment
3. Click **"Functions"** tab
4. View logs for each invocation

**Via CLI:**

```bash
vercel logs your-project.vercel.app
```

### Function Analytics

1. Go to **Analytics** tab
2. View:
   - Invocation count
   - Error rate
   - Duration (p50, p95, p99)
   - Cold starts

### Error Tracking

Integrate Sentry:

```javascript
// api/donate.js
import * as Sentry from '@sentry/node';

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: 'production',
  });
}

export default async function handler(req, res) {
  try {
    // Your code
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
}
```

## Scaling & Performance

### Free Tier Limits

- 100 GB-hours of function execution/month
- 100,000 function invocations/month
- 1000ms max execution time
- Usually sufficient for low-medium traffic

### Serverless Benefits

- Auto-scales to zero (no cost when idle)
- Handles traffic spikes automatically
- Pay per invocation
- Global edge network

### Optimization Tips

**1. Minimize Cold Starts:**

```javascript
// Keep dependencies minimal
// Lazy load heavy modules
const heavyModule = await import('heavy-module');
```

**2. Cache API Responses:**

```javascript
res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
```

**3. Use Edge Functions (Beta):**

```javascript
// api/donate.js
export const config = {
  runtime: 'edge', // Faster cold starts
};
```

## Troubleshooting

### Function Timeout

**Error:** Function exceeded 10s timeout

**Solution:**

```json
// vercel.json
{
  "functions": {
    "api/**/*.js": {
      "maxDuration": 30
    }
  }
}
```

Note: Pro plan required for >10s timeout.

### CORS Errors

**Issue:** Cross-origin requests blocked

**Solution:**

```javascript
// api/donate.js
res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
res.setHeader('Access-Control-Allow-Credentials', 'true');
```

### Cold Start Latency

**Issue:** First request slow (~500ms)

**This is normal for serverless:**

- Function needs to initialize
- Subsequent requests are fast (~50ms)
- Consider Edge Functions for lower latency

### Environment Variables Not Working

**Check:**

1. Variables set in Vercel dashboard
2. Redeploy after adding variables
3. Check variable scope (Production/Preview/Development)

## Cost Estimation

### Free Tier Usage Example

**1000 donations/month:**

- Invocations: 1,000 (within 100k limit) ✅
- Execution time: ~200ms each = 200 seconds
- GB-hours: ~0.05 (within 100 GB-hours) ✅
- **Cost: $0/month**

### When to Upgrade

Upgrade to Pro ($20/month) if you need:

- More than 100k invocations/month
- Functions running >10 seconds
- Advanced analytics
- More concurrent executions

## Limitations vs Traditional Server

| Feature      | Vercel Serverless | Traditional Server |
| ------------ | ----------------- | ------------------ |
| Cold starts  | Yes (~500ms)      | No                 |
| State        | Stateless         | Can be stateful    |
| Websockets   | No                | Yes                |
| Max duration | 10s (60s Pro)     | Unlimited          |
| Scaling      | Automatic         | Manual             |
| Cost at idle | $0                | Server runs 24/7   |

**Best for:**

- ✅ Low-medium traffic
- ✅ Bursty traffic patterns
- ✅ Cost-sensitive projects
- ✅ Global distribution

**Not ideal for:**

- ❌ Websockets/long polling
- ❌ Stateful connections
- ❌ Very high traffic (use Railway/Render)

## Advanced: Edge Functions

For lowest latency, use Edge Functions (Beta):

```javascript
// api/donate.js
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // Your code (limited Node.js APIs available)
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'content-type': 'application/json' },
  });
}
```

**Benefits:**

- ~50ms cold starts (vs 500ms)
- Runs on global edge network
- Lower latency worldwide

**Limitations:**

- No Node.js file system
- Limited npm packages
- Smaller memory (128 MB)

## Support Resources

- **Documentation**: https://vercel.com/docs
- **Community**: https://github.com/vercel/vercel/discussions
- **Status**: https://vercel-status.com
- **Support**: Pro/Enterprise plans only

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Test donation on testnet
3. ✅ Monitor function analytics
4. ✅ Optimize cold start times
5. ✅ Add custom domain
6. ✅ Set up error tracking (Sentry)
7. ✅ Switch to Base mainnet
8. ✅ Consider upgrading for production traffic

**Congratulations!** Your CryptoMeACoffee backend is now serverless on Vercel! ⚡
