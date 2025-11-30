# Deploying to Railway

Railway is a modern platform-as-a-service that makes deploying your CryptoMeACoffee server simple and fast. This guide will walk you through deploying your server to Railway in under 10 minutes.

## Prerequisites

- Railway account (free tier available at [railway.app](https://railway.app))
- GitHub repository with your CryptoMeACoffee code
- Base wallet address for receiving donations

## Quick Start

### 1. Push to GitHub

If you haven't already, push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### 2. Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository from the list
5. Railway will automatically detect it's a Node.js project

### 3. Configure Environment Variables

In your Railway project dashboard:

1. Click on your service
2. Go to the **"Variables"** tab
3. Add the following environment variables:

#### Required Variables

```env
WALLET_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
NETWORK=base-sepolia
FACILITATOR_URL=https://x402.org/facilitator
NODE_ENV=production
PORT=3000
```

#### Optional Variables (Email Notifications)

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NOTIFICATION_EMAIL=notifications@example.com
```

#### Optional Variables (Monitoring)

```env
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

### 4. Configure Build Settings

Railway usually auto-detects your Node.js app, but if you need to customize:

**Option A: Use Procfile (Recommended)**

Create a `Procfile` in your project root:

```
web: cd server-examples/express && node server.js
```

**Option B: Configure in Railway Dashboard**

1. Go to **Settings** → **Deploy**
2. Set **Start Command**: `cd server-examples/express && node server.js`
3. Set **Build Command**: `npm install` (usually auto-detected)

### 5. Deploy

Railway automatically deploys on every push to your connected branch:

1. Wait for the build to complete (usually 1-2 minutes)
2. Check the **Deployments** tab for status
3. Once deployed, Railway provides a public URL like:
   ```
   https://your-app-production.up.railway.app
   ```

### 6. Update Your Widget

Update your website's widget configuration to use your new Railway URL:

```html
<script
  src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
  data-wallet="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  data-api="https://your-app-production.up.railway.app/api/donate"
  data-creator-name="Your Name"
  data-network="base-sepolia"
></script>
```

## Production Configuration

### Switch to Base Mainnet

When ready for production, update these variables:

```env
NETWORK=base
FACILITATOR_URL=https://x402.org/facilitator
```

### Add Custom Domain

1. Go to **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `api.yourdomain.com`)
4. Add the provided CNAME record to your DNS settings
5. Wait for DNS propagation (usually 5-15 minutes)

Then update your widget:

```html
<script
  src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
  data-wallet="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  data-api="https://api.yourdomain.com/api/donate"
></script>
```

## Monitoring

### View Logs

1. Go to your Railway project
2. Click **"Deployments"**
3. Click on a deployment to view logs
4. Use the search/filter to find specific events

### Health Checks

Railway automatically monitors your service's health. Visit these endpoints to check status:

- **Health**: `https://your-app.up.railway.app/health`
- **Ready**: `https://your-app.up.railway.app/ready`
- **Live**: `https://your-app.up.railway.app/live`

### Set Up Alerts

1. Install the Railway mobile app
2. Enable push notifications
3. You'll be alerted if your service goes down

## Scaling

Railway's free tier includes:

- 512 MB RAM
- Shared CPU
- $5 of usage per month

To scale up:

1. Go to **Settings** → **Resources**
2. Upgrade to a paid plan
3. Increase RAM/CPU as needed

## Troubleshooting

### Deployment Fails

**Check build logs:**

1. Go to **Deployments**
2. Click on the failed deployment
3. Review the build logs for errors

**Common issues:**

- Missing `package.json` in root
- Incorrect start command
- Missing environment variables

**Solution:**

```bash
# Verify your package.json exists
ls -la package.json

# Check your start command
node server-examples/express/server.js
```

### Server Crashes After Deployment

**Check runtime logs:**

1. Click on your service
2. View the **Logs** tab
3. Look for error messages

**Common issues:**

- Missing environment variables
- Port conflicts (Railway sets PORT automatically)
- Missing dependencies

**Solution:**

```javascript
// In server.js, use Railway's PORT
const PORT = process.env.PORT || 3000;
```

### "Cannot GET /api/donate"

**Issue:** CORS or routing problem

**Solution:**

1. Check CORS_ORIGIN environment variable
2. Verify your server is running: `https://your-app.up.railway.app/health`
3. Check server logs for errors

### Database Connection Issues

If you add a database later:

1. Railway provides automatic database URLs
2. Use the `DATABASE_URL` environment variable
3. Example: PostgreSQL plugin adds `DATABASE_URL` automatically

## Cost Optimization

### Tips to Stay on Free Tier

1. **Use sleep mode** - Enable in Settings → Sleep Mode
   - Your app sleeps after 30 minutes of inactivity
   - Wakes up automatically on first request (~5 seconds)

2. **Monitor usage** - Check your usage dashboard
   - Track monthly spend
   - Set up budget alerts

3. **Optimize resources** - Remove unused dependencies
   ```bash
   npm prune --production
   ```

## Advanced: Using Docker

If you prefer Docker deployment:

1. Railway auto-detects `Dockerfile`
2. It will build and deploy using your Docker configuration
3. No additional setup needed!

Your project already includes:

- `Dockerfile` - Production-optimized container
- `docker-compose.yml` - Local development setup
- `.dockerignore` - Excludes unnecessary files

## CI/CD Integration

Railway automatically deploys on git push. To customize:

### Deploy on Specific Branch

1. Go to **Settings** → **Source**
2. Change **Branch** to your preferred branch (e.g., `production`)

### Manual Deployments Only

1. Go to **Settings** → **Source**
2. Disable **Auto Deploy**
3. Use "Deploy Now" button when ready

## Support

- **Railway Docs**: https://docs.railway.app
- **Community Discord**: https://discord.gg/railway
- **Status Page**: https://status.railway.app

## Next Steps

After successful deployment:

1. ✅ Test a donation on testnet (Base Sepolia)
2. ✅ Verify email notifications work (if configured)
3. ✅ Check health endpoint returns 200
4. ✅ Monitor logs for any errors
5. ✅ When ready, switch to Base mainnet
6. ✅ Add custom domain (optional)
7. ✅ Set up monitoring/alerts

**Congratulations!** Your CryptoMeACoffee server is now live on Railway! 🎉
