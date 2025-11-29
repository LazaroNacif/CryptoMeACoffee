# CryptoMeACoffee - Security Checklist

**Complete this checklist before launching to production**

This comprehensive security checklist ensures your donation widget is secure and production-ready. Follow each section carefully.

---

## 📋 Quick Reference

### Critical Priorities

- 🔴 **P0 - CRITICAL:** Must be completed before launch
- 🟡 **P1 - HIGH:** Should be completed before launch
- 🟢 **P2 - RECOMMENDED:** Complete soon after launch

### Status Indicators

- ✅ Completed and verified
- ⏳ In progress
- ❌ Not started
- ⚠️ Needs attention

---

## 🔴 P0: CRITICAL SECURITY (Must Complete Before Launch)

### Environment & Configuration

- [ ] **All environment variables use `.env` file** (no hardcoded secrets)

  ```bash
  # Verify no secrets in code
  grep -r "WALLET_ADDRESS\|EMAIL_PASS\|API_KEY" src/ server-examples/
  # Should return no results
  ```

- [ ] **`.env` file added to `.gitignore`**

  ```bash
  # Verify .env is ignored
  cat .gitignore | grep ".env"
  # Should show: .env
  ```

- [ ] **No secrets committed to git**

  ```bash
  # Check git history
  git log --all --full-history --source -- **/.env
  # Should return no results
  ```

- [ ] **`NODE_ENV=production` set in production**

  ```env
  NODE_ENV=production
  ```

- [ ] **HTTPS enforced in production**
  - ✅ Automatic on Railway/Render/Vercel
  - ⚠️ Manual setup required for VPS (use Nginx + Let's Encrypt)

- [ ] **CORS origins explicitly defined (no wildcards)**

  ```env
  # ❌ BAD (allows any origin)
  CORS_ORIGIN=*

  # ✅ GOOD (specific domains)
  CORS_ORIGIN=https://yoursite.com
  ```

---

### Input Validation & Sanitization

- [ ] **Amount validation enforced (min/max)**
  - Server validates: `0.01 <= amount <= 1000000`
  - Check: `server-examples/express/server.js:117-128`

- [ ] **Message sanitization active (XSS prevention)**
  - DOMPurify sanitizes HTML in messages
  - Check: `server-examples/express/server.js:219`

- [ ] **Wallet address format validation**
  - Widget validates `0x` prefix and 42-character length
  - Test with invalid address: `0x123` (should reject)

- [ ] **All user inputs validated server-side**
  - express-validator middleware active
  - Check: `server-examples/express/server.js:117-128`

---

### Rate Limiting & DOS Protection

- [ ] **Rate limiting configured and tested**
  - Default: 5 requests per 15 minutes per IP
  - Check: `server-examples/express/server.js:103-115`

- [ ] **Rate limiting tested**

  ```bash
  # Test: Make 6 rapid requests
  for i in {1..6}; do
    curl -X POST http://localhost:3000/api/donate \
      -H "Content-Type: application/json" \
      -d '{"amount": 1, "message": "test"}';
  done
  # 6th request should return 429 Too Many Requests
  ```

- [ ] **Request size limits enforced**
  - express.json() has default 100kb limit
  - Message length capped at 500 characters

---

### Authentication & Payment Verification

- [ ] **x402 payment verification working**
  - Test donation completes successfully
  - Check server logs show "✅ Payment verified"

- [ ] **Facilitator URL correct for environment**

  ```env
  # Testnet
  FACILITATOR_URL=https://x402.org/facilitator

  # Mainnet (requires CDP keys)
  FACILITATOR_URL=https://x402.org/facilitator
  ```

- [ ] **Replay attack prevention tested**
  - x402 handles nonce checking automatically
  - Verify: Same payment header rejected if resubmitted

---

### Wallet & Network Security

- [ ] **Wallet address verified**

  ```bash
  # Test: Send $0.10 USDC to your wallet
  # Confirm you receive it before going live
  ```

- [ ] **Correct network configured**

  ```env
  # Testnet
  NETWORK=base-sepolia

  # Production
  NETWORK=base
  ```

- [ ] **Network mismatch handled gracefully**
  - Widget prompts user to switch networks
  - Test: Connect on Ethereum mainnet (should show switch prompt)

---

## 🟡 P1: HIGH PRIORITY (Should Complete Before Launch)

### Monitoring & Logging

- [ ] **Error tracking configured** (Sentry, LogRocket, etc.)
  - Optional but highly recommended
  - See Phase 5 in implementation plan

- [ ] **Access logs enabled**
  - Server logs all donation attempts
  - Check: Server console shows donation details

- [ ] **Health check endpoint active**

  ```bash
  curl http://localhost:3000/health
  # Should return: {"status": "ok", ...}
  ```

- [ ] **Alert system for critical errors**
  - Email notifications working (test)
  - Consider: Uptime monitoring (UptimeRobot, Pingdom)

- [ ] **No sensitive data in logs**
  ```bash
  # Verify logs don't contain:
  # - Full wallet addresses (OK to show last 4 chars)
  # - Email passwords
  # - API keys
  grep -i "password\|api_key\|secret" logs/*.log
  ```

---

### Infrastructure Security

- [ ] **SSL/TLS certificate valid**

  ```bash
  # Check certificate
  curl -vI https://your-server.com 2>&1 | grep "SSL certificate"
  # Should show valid certificate
  ```

- [ ] **Firewall configured** (if using VPS)
  - Only ports 80 (HTTP) and 443 (HTTPS) open
  - Port 3000 (or server port) not publicly accessible

- [ ] **Database secured** (if using database)
  - Not applicable for basic setup
  - If added: Use connection pooling, encryption at rest

- [ ] **Backups configured** (if storing data)
  - Not critical for basic setup (donations on-chain)
  - If logging: Daily backups of donation logs

- [ ] **DDoS protection enabled**
  - Railway/Render/Vercel provide basic protection
  - Consider: Cloudflare for additional protection

---

### Testing & Validation

- [ ] **All security tests passing**

  ```bash
  npm test
  # All tests should pass
  ```

- [ ] **Manual security testing completed**
  - [ ] XSS attempt in message field (should be sanitized)
  - [ ] SQL injection attempt (N/A - no SQL database)
  - [ ] Rate limiting (6th request rejected)
  - [ ] CORS bypass attempt (should fail)
  - [ ] Amount tampering (server validation catches it)

- [ ] **Penetration testing completed** (optional but recommended)
  - Use tools like OWASP ZAP or Burp Suite
  - Or hire professional penetration tester

---

### Email Security (If Configured)

- [ ] **SMTP credentials use app password** (not main password)
  - Gmail: Use App Password, not account password
  - SendGrid: Use API key

- [ ] **Email credentials in environment variables**

  ```env
  EMAIL_USER=your-email@gmail.com
  EMAIL_PASS=xxxx-xxxx-xxxx-xxxx  # App password
  ```

- [ ] **No email credentials in code**

  ```bash
  grep -r "EMAIL_PASS\|password" src/ server-examples/
  # Should only find references to env vars
  ```

- [ ] **Email notifications tested**
  - Make test donation
  - Confirm email received
  - Check spam folder

---

## 🟢 P2: RECOMMENDED (Complete Soon After Launch)

### Code Quality & Dependencies

- [ ] **Dependencies up to date**

  ```bash
  npm audit
  npm outdated
  ```

- [ ] **No high/critical vulnerabilities**

  ```bash
  npm audit --production --audit-level=moderate
  # Should show 0 vulnerabilities
  ```

- [ ] **Dependency scanning in CI/CD**
  - GitHub Dependabot enabled
  - Or use Snyk, WhiteSource

- [ ] **Security headers configured**
  ```javascript
  // Already implemented in Phase 1
  // Verify in browser DevTools → Network → Response Headers:
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Strict-Transport-Security: max-age=31536000
  ```

---

### Incident Response

- [ ] **Security contact email defined**

  ```markdown
  # In README.md or SECURITY.md

  Security issues: security@yourproject.com
  ```

- [ ] **Incident response plan documented**
  - What to do if wallet compromised
  - What to do if server breached
  - Emergency contacts

- [ ] **Backup/restore procedure tested**
  - If storing data: Test backup restoration
  - If serverless: Code in git = automatic backup

- [ ] **Emergency shutdown procedure ready**
  ```bash
  # Quick way to disable widget:
  # 1. Stop server (Railway: pause deployment)
  # 2. Or change WALLET_ADDRESS to dummy address
  # 3. Or enable maintenance mode
  ```

---

### Compliance & Legal (if applicable)

- [ ] **Privacy policy published** (if collecting emails/messages)
  - Disclose what data you collect
  - How it's stored and used
  - User's rights

- [ ] **Terms of service published**
  - Donation refund policy
  - Service limitations
  - Liability disclaimers

- [ ] **GDPR compliance** (if EU users)
  - Right to delete data
  - Data export capability
  - Cookie consent (if using analytics)

---

## ✅ Pre-Launch Validation

Run through this final checklist right before going live:

### Configuration Verification

```bash
# 1. Verify environment variables
cat .env

# Required variables present:
✓ WALLET_ADDRESS=0x...
✓ NETWORK=base
✓ FACILITATOR_URL=https://x402.org/facilitator

# 2. Verify secrets not in code
grep -r "0x742d35Cc\|your-email@gmail" src/ server-examples/

# Should return no results

# 3. Verify .gitignore
cat .gitignore | grep -E "\.env|node_modules|\.DS_Store"

# Should show all three

# 4. Check for uncommitted secrets
git status
git diff

# No sensitive files should be staged
```

---

### Functional Testing

```bash
# 1. Server starts successfully
cd server-examples/express
npm start
# Look for: ✅ Server running on http://localhost:3000

# 2. Health check passes
curl http://localhost:3000/health
# Should return: {"status": "ok", ...}

# 3. Widget loads without errors
# Open browser console (F12)
# Visit page with widget
# Look for: No red errors in console

# 4. Test donation (small amount)
# Complete a $0.10 donation
# Verify:
  ✓ Transaction successful
  ✓ USDC received in wallet
  ✓ Email notification sent (if configured)
  ✓ Server logs show success
```

---

### Security Testing

```bash
# 1. Test XSS prevention
# Try donating with message: <script>alert('xss')</script>
# Verify: Sanitized in email/logs

# 2. Test rate limiting
# Make 6 rapid donation attempts
# Verify: 6th request gets 429 error

# 3. Test CORS
curl -X POST http://localhost:3000/api/donate \
  -H "Origin: https://evil-site.com" \
  -H "Content-Type: application/json" \
  -d '{"amount": 1}'
# Should return CORS error

# 4. Test invalid amounts
curl -X POST http://localhost:3000/api/donate \
  -H "Content-Type: application/json" \
  -d '{"amount": -5}'
# Should return 400 validation error

curl -X POST http://localhost:3000/api/donate \
  -H "Content-Type: application/json" \
  -d '{"amount": 9999999}'
# Should return 400 validation error
```

---

## 🚨 Security Incident Response

### If Wallet Compromised

1. **Immediately:**
   - Transfer all funds to new secure wallet
   - Generate new wallet address
   - Update `WALLET_ADDRESS` in `.env`
   - Redeploy server

2. **Investigate:**
   - Check server logs for suspicious activity
   - Review access logs
   - Change all credentials

3. **Prevent recurrence:**
   - Review how wallet was compromised
   - Improve key management
   - Consider hardware wallet

---

### If Server Breached

1. **Immediately:**
   - Shut down server
   - Assess damage (what data was accessed?)
   - Preserve logs for forensics

2. **Recovery:**
   - Deploy fresh server instance
   - Regenerate all secrets (API keys, passwords)
   - Update environment variables
   - Verify code hasn't been modified

3. **Notify:**
   - Inform users if personal data affected
   - Report to authorities if required

---

## 📚 Additional Resources

### Security Best Practices

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

### Tools

- **Vulnerability Scanning:** `npm audit`, Snyk, WhiteSource
- **Penetration Testing:** OWASP ZAP, Burp Suite
- **Monitoring:** Sentry, LogRocket, Datadog
- **Uptime Monitoring:** UptimeRobot, Pingdom

### Getting Help

- **Security Issues:** Report privately to security@yourproject.com
- **Questions:** [GitHub Discussions](https://github.com/yourusername/cryptomeacoffee/discussions)
- **Bug Reports:** [GitHub Issues](https://github.com/yourusername/cryptomeacoffee/issues)

---

## ✅ Sign-Off

Before launching to production, confirm:

**I have:**

- [ ] Completed all P0 (Critical) items
- [ ] Completed most P1 (High) items
- [ ] Tested with real USDC (small amount)
- [ ] Verified wallet address is correct
- [ ] Reviewed all environment variables
- [ ] Enabled HTTPS
- [ ] Tested donation flow end-to-end
- [ ] Set up monitoring/alerts
- [ ] Have incident response plan ready

**Signed:** ******\_\_\_\_******
**Date:** ******\_\_\_\_******
**Environment:** Production / Staging

---

**Remember: Security is ongoing. Review this checklist monthly and after any major changes.**
