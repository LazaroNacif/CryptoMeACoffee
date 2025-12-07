# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | :white_check_mark: |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of CryptoMeACoffee seriously. If you discover a security vulnerability, please follow these steps:

### Where to Report

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please report security issues by emailing:
**[MAINTAINER EMAIL - UPDATE THIS]**

### What to Include

Please include the following information in your report:

1. **Description** - A clear description of the vulnerability
2. **Impact** - What an attacker could do with this vulnerability
3. **Steps to Reproduce** - Detailed steps to reproduce the issue
4. **Affected Versions** - Which versions are affected
5. **Proof of Concept** - Code samples or screenshots (if applicable)
6. **Suggested Fix** - If you have a fix in mind (optional)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: Within 7 days
  - High: Within 14 days
  - Medium: Within 30 days
  - Low: Within 90 days

### Disclosure Policy

- We will acknowledge your email within 48 hours
- We will provide a detailed response indicating the next steps within 7 days
- We will keep you informed of the progress towards a fix
- We will notify you when the vulnerability is fixed
- We will publicly disclose the vulnerability once a fix is available

### Safe Harbor

We support responsible disclosure. If you follow this policy:

- We will not pursue legal action against you
- We will work with you to understand and resolve the issue
- We will acknowledge your contribution in the security advisory (if desired)

## Security Best Practices for Users

When deploying CryptoMeACoffee:

### 1. Server Security

- ✅ Use HTTPS for all API endpoints
- ✅ Implement rate limiting on donation endpoints
- ✅ Validate all environment variables on startup
- ✅ Keep dependencies up to date (`npm audit`)
- ✅ Use environment variables for sensitive data (never commit secrets)

### 2. Wallet Security

- ✅ Use a dedicated wallet for receiving donations (not your main wallet)
- ✅ Regularly withdraw funds to a secure cold wallet
- ✅ Monitor wallet activity for suspicious transactions
- ✅ Use a hardware wallet for storing large amounts

### 3. Frontend Security

- ✅ Validate wallet addresses before rendering
- ✅ Sanitize user-provided messages before display
- ✅ Implement CSP (Content Security Policy) headers
- ✅ Use Subresource Integrity (SRI) for CDN resources

### 4. Dependency Security

```bash
# Run regular security audits
npm audit

# Fix vulnerabilities automatically (review changes!)
npm audit fix

# Update dependencies
npm update
```

### 5. Monitoring

- ✅ Monitor server logs for unusual activity
- ✅ Set up alerts for large donations
- ✅ Track failed transaction attempts
- ✅ Monitor API rate limits

## Known Security Considerations

### 1. Gas Sponsorship Limits

The x402 protocol sponsors gas fees, but sponsors may have daily limits. Monitor your sponsor's allowance.

### 2. Amount Validation

Always validate donation amounts server-side. The widget validates client-side, but this can be bypassed.

### 3. Message Content

User messages are limited to 500 characters but should be sanitized before display to prevent XSS.

### 4. Network Security

This widget only supports Base network (testnet and mainnet). Cross-chain transactions are not supported.

## Security Updates

Subscribe to security updates:

- Watch this repository for security advisories
- Follow [@LazaroNacif](https://github.com/LazaroNacif) for updates
- Check [CHANGELOG.md](CHANGELOG.md) for security patches

## Compliance

CryptoMeACoffee is designed to be compliant with:

- **GDPR**: No personal data is collected by the widget
- **SOC 2**: Recommended security practices for server deployments
- **OWASP Top 10**: Protection against common web vulnerabilities

## Additional Resources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [x402 Protocol Security](https://docs.cdp.coinbase.com/x402/docs/security)
- [Ethereum Smart Contract Security](https://consensys.github.io/smart-contract-best-practices/)

---

**Last Updated**: 2025-12-07
**Policy Version**: 1.0
