# Contributing to CryptoMeACoffee

Thank you for your interest in contributing to CryptoMeACoffee! This document provides guidelines and instructions for contributing to the project.

## 🚀 Quick Start for Contributors

### Prerequisites

- Node.js 16+
- Git
- Basic knowledge of JavaScript/ES6
- Familiarity with x402 protocol (optional, we have docs!)

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/yourusername/cryptomeacoffee.git
cd cryptomeacoffee

# Install dependencies
npm install

# Run tests
npm test

# Start development build
npm run dev

# Run linter
npm run lint
```

## 📋 How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**Good bug reports include:**

- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues.

**Good enhancement suggestions include:**

- Clear use case description
- Why this enhancement would be useful
- Possible implementation approach
- Any relevant examples from other projects

### Pull Request Process

1. **Fork the repository** and create your branch from `main`

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style (ESLint + Prettier enforced)
   - Add tests for new functionality
   - Update documentation as needed

3. **Ensure all tests pass**

   ```bash
   npm test
   npm run lint
   npm run build
   ```

4. **Commit your changes**
   - Use conventional commit messages
   - Follow the format: `<type>: <description>`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

   Examples:

   ```
   feat: Add dark mode support for widget
   fix: Resolve network switching on mobile
   docs: Update API reference with new parameters
   ```

5. **Push to your fork** and submit a pull request

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Describe your PR clearly**
   - What changes you made
   - Why you made them
   - Any breaking changes
   - Related issues (if any)

## 🎨 Code Style

This project uses:

- **ESLint** for code quality
- **Prettier** for code formatting
- **Husky** for pre-commit hooks

### Style Guidelines

- Use ES6+ features (const/let, arrow functions, destructuring)
- Prefer functional programming patterns
- Keep functions small and focused
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Avoid console.log in production code (use the logger utility)

### Example

```javascript
// ❌ Bad
function x(a, b) {
  console.log(a, b);
  return a + b;
}

// ✅ Good
/**
 * Calculates the sum of two numbers
 * @param {number} firstNumber - First number to add
 * @param {number} secondNumber - Second number to add
 * @returns {number} Sum of the two numbers
 */
function calculateSum(firstNumber, secondNumber) {
  logger.log('Calculating sum:', { firstNumber, secondNumber });
  return firstNumber + secondNumber;
}
```

## 🧪 Testing

All new features and bug fixes must include tests.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run CI tests
npm run test:ci
```

### Writing Tests

- Place unit tests in `tests/unit/`
- Place integration tests in `tests/integration/`
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)

Example:

```javascript
describe('CryptoMeACoffee Widget', () => {
  describe('Constructor', () => {
    it('should throw error if walletAddress missing', () => {
      expect(() => {
        new CryptoMeACoffee({});
      }).toThrow('walletAddress is required');
    });
  });
});
```

## 📚 Documentation

Documentation is as important as code!

### Update Documentation When You:

- Add new features
- Change existing functionality
- Add new configuration options
- Fix bugs that affect user behavior

### Documentation Files to Update:

- `README.md` - If changing core functionality
- `docs/API-REFERENCE.md` - If changing widget API
- `docs/SETUP-GUIDE.md` - If changing setup process
- `CHANGELOG.md` - Always update for your PR

## 🔒 Security

- **Never commit secrets** (.env files, private keys, API keys)
- **Report security vulnerabilities** privately via email (not GitHub issues)
- **Follow security best practices** (input validation, XSS prevention, etc.)
- **Use the security checklist** in `docs/SECURITY-CHECKLIST.md`

## 🌟 Code Review Process

All submissions require review before merging.

**Reviewers will check:**

- Code quality and style compliance
- Test coverage (aim for 80%+)
- Documentation updates
- Breaking changes clearly documented
- Security implications

**Expected timeline:**

- Initial review: 1-3 days
- Follow-up reviews: 1-2 days
- Merge after approval: Same day

## 📦 Project Structure

```
cryptomeacoffee/
├── src/                  # Source code
│   ├── widget.js         # Main widget class
│   ├── logger.js         # Logging utility
│   └── styles.css        # Widget styles
├── tests/                # Test files
│   ├── unit/            # Unit tests
│   └── integration/     # Integration tests
├── docs/                 # User documentation
│   ├── API-REFERENCE.md
│   ├── SETUP-GUIDE.md
│   ├── FAQ.md
│   └── planning/        # Internal planning docs
├── examples/            # Usage examples
│   ├── vanilla-html/
│   └── server-examples/
└── dist/                # Build output (generated)
```

## 🙏 Attribution

Contributors are recognized in:

- GitHub contributors list
- CHANGELOG.md (for significant contributions)
- Project README (for major features)

## 📞 Getting Help

- 💬 **Questions:** Open a GitHub Discussion
- 🐛 **Bugs:** Open a GitHub Issue
- 💡 **Ideas:** Open a GitHub Discussion or Issue
- 📧 **Email:** For security issues only

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to CryptoMeACoffee!** 🙏

Your contributions help make crypto donations accessible to everyone.
