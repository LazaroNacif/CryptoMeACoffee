# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-29

### Added

- 🎨 **Environment-aware logging system** - Console output only in development mode
- 📘 **TypeScript definitions** - Full type support with `dist/widget.d.ts`
- 🔒 **Production hardening** - Sentry error tracking, Winston structured logging
- 📊 **Enhanced health checks** - Facilitator connectivity, environment validation
- ✅ **Comprehensive testing** - 46 tests with 31% coverage baseline
- 📚 **Complete documentation** - 5 critical guides (9,682 words)
- 🔧 **CI/CD pipeline** - GitHub Actions with automated testing and linting
- 🛡️ **Security improvements** - XSS protection, rate limiting, input validation

### Security

- Fixed XSS vulnerability in email notifications (DOMPurify sanitization)
- Added rate limiting (5 requests per 15 minutes)
- Implemented input validation with express-validator
- Added request sanitization (express-mongo-sanitize, xss-clean)
- Fixed CORS configuration (requires origin in production)
- Added HTTPS enforcement in production mode

### Changed

- Replaced all console statements with environment-aware logger
- Improved error messages in production (no stack traces)
- Enhanced health check endpoints (`/health`, `/ready`, `/live`)
- Updated build output (133.77 KB gzipped)

### Fixed

- ESLint issues (0 errors, 0 warnings)
- Function declarations moved to proper scope
- Added curly braces to all if statements

## [1.0.0] - 2025-11-23

### Added

- Initial release of CryptoMeACoffee widget
- USDC donation support via x402 protocol
- Floating Buy Me a Coffee style widget
- Base Sepolia and Base Mainnet support
- Message support (500 character limit)
- Viem integration for wallet connectivity
- Express server example
- Vanilla HTML example

### Features

- Zero platform fees (direct wallet-to-wallet)
- Self-hosted donation system
- Gasless transactions for supporters (x402 sponsors gas)
- Instant settlement
- Customizable themes (light/dark)
- Preset donation amounts
- Custom amount input
- Message inclusion

---

## Unreleased

### Planned

- NPM publication (Phase 7)
- Docker support (Phase 8)
- Additional deployment guides
- Multi-token support
- Enhanced customization options

---

**Legend:**

- 🎨 Code Quality
- 📘 Documentation
- 🔒 Security
- ✅ Testing
- 🔧 Infrastructure
- 📊 Monitoring
