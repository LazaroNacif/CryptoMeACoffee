# Deploying to Render

Render is a unified cloud platform that makes it easy to deploy and run your CryptoMeACoffee server. This guide covers deployment using both the Render Dashboard and Infrastructure as Code (render.yaml).

## Prerequisites

- Render account (free tier available at [render.com](https://render.com))
- GitHub repository with your code
- Base wallet address for receiving donations

## Method 1: Deploy via Dashboard (Quickest)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### 2. Create Web Service on Render

1. Log in to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Grant Render access to your repository

### 3. Configure Your Service

Fill in the following settings:

**Basic Settings:**

- **Name**: `cryptomeacoffee` (or your preferred name)
- **Region**: Choose closest to your users (e.g., Oregon, Frankfurt)
- **Branch**: `main`
- **Runtime**: `Node`

**Build & Deploy:**

- **Build Command**: `npm install`
- **Start Command**: `cd server-examples/express && node server.js`

**Plan:**

- Select **Free** tier (or paid for production)

### 4. Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

```env
WALLET_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
NETWORK=base-sepolia
FACILITATOR_URL=https://x402.org/facilitator
NODE_ENV=production
PORT=10000
```

**Optional (Email Notifications):**

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NOTIFICATION_EMAIL=notifications@example.com
```

**Optional (Monitoring):**

```env
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

### 5. Deploy

1. Click **"Create Web Service"**
2. Render will build and deploy your app (usually 2-3 minutes)
3. Your service URL will be: `https://cryptomeacoffee.onrender.com`

### 6. Update Your Widget

```html
<script
  src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
  data-wallet="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  data-api="https://cryptomeacoffee.onrender.com/api/donate"
  data-creator-name="Your Name"
></script>
```

## Method 2: Deploy via render.yaml (Infrastructure as Code)

This method lets you define your infrastructure in code, making it easier to version control and replicate.

### 1. Create render.yaml

Create `render.yaml` in your project root:

```yaml
services:
  - type: web
    name: cryptomeacoffee
    runtime: node
    region: oregon
    plan: free
    buildCommand: npm install
    startCommand: cd server-examples/express && node server.js
    healthCheckPath: /health
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: NETWORK
        value: base-sepolia
      - key: FACILITATOR_URL
        value: https://x402.org/facilitator
      - key: WALLET_ADDRESS
        sync: false # Set manually in dashboard (sensitive)
      - key: CORS_ORIGIN
        sync: false # Set manually in dashboard
      # Email config (optional)
      - key: EMAIL_HOST
        sync: false
      - key: EMAIL_PORT
        value: 587
      - key: EMAIL_SECURE
        value: false
      - key: EMAIL_USER
        sync: false
      - key: EMAIL_PASS
        sync: false
      - key: NOTIFICATION_EMAIL
        sync: false
      # Monitoring (optional)
      - key: SENTRY_DSN
        sync: false
```

### 2. Push to GitHub

```bash
git add render.yaml
git commit -m "Add Render configuration"
git push
```

### 3. Deploy from Blueprint

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Blueprint"**
3. Select your repository
4. Render will detect `render.yaml`
5. Click **"Apply"**
6. Set sensitive environment variables (`sync: false` ones) in the dashboard

## Production Configuration

### Switch to Base Mainnet

Update environment variables:

```env
NETWORK=base
```

### Add Custom Domain

1. Go to your service → **Settings** → **Custom Domain**
2. Click **"Add Custom Domain"**
3. Enter your domain: `api.yourdomain.com`
4. Add the provided CNAME record to your DNS:
   ```
   CNAME api.yourdomain.com → cryptomeacoffee.onrender.com
   ```
5. Wait for DNS propagation (5-30 minutes)
6. Render automatically provisions SSL certificate

Update your widget:

```html
<script data-api="https://api.yourdomain.com/api/donate"></script>
```

## Monitoring & Maintenance

### View Logs

1. Go to your service dashboard
2. Click **"Logs"** tab
3. Filter by:
   - Date range
   - Log level (info, warn, error)
   - Search text

**Live tail logs:**

```bash
# Install Render CLI
npm install -g render-cli

# Tail logs
render logs -f cryptomeacoffee
```

### Health Checks

Render automatically monitors your `/health` endpoint. If it returns non-200 status 3 times in a row, Render alerts you.

**Configure health check:**

1. Go to **Settings** → **Health & Alerts**
2. Set **Health Check Path**: `/health`
3. Set **Health Check Grace Period**: 60 seconds

### Set Up Alerts

1. Go to **Settings** → **Notifications**
2. Add email or Slack webhook
3. Configure alert triggers:
   - Deploy failures
   - Health check failures
   - Crash loops

## Scaling

### Free Tier Limits

- 750 hours/month of runtime
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds

### Upgrade to Paid Plan

To eliminate spin-down:

1. Go to **Settings** → **Plan**
2. Upgrade to **Starter** ($7/month) or higher
3. Your service stays always-on
4. Get more RAM and CPU

### Horizontal Scaling

For high traffic:

1. Upgrade to **Standard** plan or higher
2. Enable **Auto-Scaling**
3. Set min/max instances
4. Render distributes load automatically

## Troubleshooting

### Service Fails to Build

**Check build logs:**

1. Go to **Events** tab
2. Click on failed deploy
3. Review build output

**Common issues:**

- Missing dependencies in `package.json`
- Build command incorrect
- Node version mismatch

**Solution:**

```json
// package.json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Service Crashes on Start

**Check runtime logs:**

1. Go to **Logs** tab
2. Look for error messages
3. Common issues:
   - Missing environment variables
   - Port already in use
   - Uncaught exceptions

**Solution:**

```javascript
// server.js - Use Render's PORT
const PORT = process.env.PORT || 3000;
```

### Slow First Request (Free Tier)

**This is expected behavior on free tier:**

- Service spins down after 15 min inactivity
- First request wakes it up (~30 seconds)
- Subsequent requests are fast

**Solutions:**

1. Upgrade to paid plan (always-on)
2. Use a cron job to ping health endpoint every 10 minutes
3. Accept the tradeoff for free hosting

### CORS Errors

**Issue:** Widget can't connect to API

**Solution:**

1. Set `CORS_ORIGIN` environment variable:
   ```env
   CORS_ORIGIN=https://yourwebsite.com,https://www.yourwebsite.com
   ```
2. Redeploy service

### Database Connection (Future)

When you add a database:

1. Create database in Render
2. Render provides `DATABASE_URL` automatically
3. Use it in your server:
   ```javascript
   const dbUrl = process.env.DATABASE_URL;
   ```

## Cost Optimization

### Stay on Free Tier

1. **Accept spin-down** - 15 min inactivity → service sleeps
2. **Use health pinger** - Free services like UptimeRobot
3. **Monitor usage** - Check dashboard monthly
4. **Optimize build** - Cache dependencies

### Reduce Costs on Paid Plans

1. **Right-size resources** - Don't over-provision
2. **Use auto-scaling** - Scale down during low traffic
3. **Optimize images** - If using Docker
4. **Review monthly** - Adjust as needed

## Advanced: Docker Deployment

Render supports Docker natively:

1. Your project includes a `Dockerfile`
2. Change **Runtime** to `Docker` in settings
3. Render builds and deploys your container
4. No other changes needed

**render.yaml for Docker:**

```yaml
services:
  - type: web
    name: cryptomeacoffee
    runtime: docker
    dockerfilePath: ./Dockerfile
    healthCheckPath: /health
```

## CI/CD Integration

### Auto-Deploy on Push

Render auto-deploys when you push to your connected branch:

1. Go to **Settings** → **Build & Deploy**
2. **Auto-Deploy**: Yes (default)
3. Choose branch (e.g., `main`, `production`)

### Manual Deploys Only

1. **Auto-Deploy**: No
2. Click **"Manual Deploy"** when ready
3. Select branch to deploy

### Deploy Notifications

Get notified on every deploy:

1. **Settings** → **Notifications**
2. Add Slack webhook or email
3. Choose events:
   - Deploy started
   - Deploy succeeded
   - Deploy failed

## Backup & Disaster Recovery

### Database Backups (When Added)

1. Render auto-backs up PostgreSQL daily (paid plans)
2. Manual backups via dashboard
3. Download backups for external storage

### Environment Variable Backups

1. Export variables from dashboard
2. Store in password manager
3. Version control `render.yaml` (non-sensitive only)

## Support Resources

- **Documentation**: https://render.com/docs
- **Community**: https://community.render.com
- **Status Page**: https://status.render.com
- **Support Email**: support@render.com (paid plans)

## Next Steps

After deployment:

1. ✅ Test donation flow on testnet
2. ✅ Verify health endpoint: `https://your-app.onrender.com/health`
3. ✅ Test email notifications (if configured)
4. ✅ Monitor logs for errors
5. ✅ Set up custom domain (optional)
6. ✅ Configure alerts
7. ✅ When ready, switch to Base mainnet
8. ✅ Consider upgrading to paid plan (eliminates spin-down)

**Congratulations!** Your CryptoMeACoffee server is live on Render! 🚀
