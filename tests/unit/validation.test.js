import { describe, it, expect } from '@jest/globals';

describe('Input Validation', () => {
  describe('Email Format Validation', () => {
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    it('should validate correct email format', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.user@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email format', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
      expect(validateEmail('@invalid.com')).toBe(false);
      expect(validateEmail('invalid@domain')).toBe(false);
    });
  });

  describe('HTML Sanitization', () => {
    const sanitizeHTML = (text) => {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    };

    it('should sanitize HTML in messages', () => {
      const malicious = '<script>alert("XSS")</script>';
      const sanitized = sanitizeHTML(malicious);

      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('&lt;script&gt;');
    });

    it('should sanitize HTML tags', () => {
      const malicious = '<img src=x onerror=alert("XSS")>';
      const sanitized = sanitizeHTML(malicious);

      expect(sanitized).not.toContain('<img');
      expect(sanitized).toContain('&lt;img');
    });

    it('should preserve plain text', () => {
      const plain = 'Hello, world!';
      const sanitized = sanitizeHTML(plain);

      expect(sanitized).toBe(plain);
    });
  });

  describe('Amount Validation', () => {
    const validateAmount = (amount, min = 0.01, max = 1000000) => {
      const num = parseFloat(amount);
      if (isNaN(num)) return false;
      if (num < min || num > max) return false;
      return true;
    };

    it('should reject negative amounts', () => {
      expect(validateAmount(-1)).toBe(false);
      expect(validateAmount(-0.01)).toBe(false);
    });

    it('should reject zero amount', () => {
      expect(validateAmount(0)).toBe(false);
    });

    it('should accept valid amounts', () => {
      expect(validateAmount(1)).toBe(true);
      expect(validateAmount(5.50)).toBe(true);
      expect(validateAmount(100)).toBe(true);
    });

    it('should reject amounts below minimum', () => {
      expect(validateAmount(0.001, 0.01, 1000)).toBe(false);
    });

    it('should reject amounts above maximum', () => {
      expect(validateAmount(1001, 0.01, 1000)).toBe(false);
    });

    it('should handle decimal precision', () => {
      expect(validateAmount(5.99)).toBe(true);
      expect(validateAmount(0.01)).toBe(true);
      expect(validateAmount(999999.99)).toBe(true);
    });

    it('should reject non-numeric values', () => {
      expect(validateAmount('abc')).toBe(false);
      expect(validateAmount('')).toBe(false);
      expect(validateAmount(null)).toBe(false);
    });
  });

  describe('Wallet Address Validation', () => {
    const validateWalletAddress = (address) => {
      if (!address || typeof address !== 'string') return false;
      // Ethereum address: 0x followed by 40 hex characters
      const addressRegex = /^0x[a-fA-F0-9]{40}$/;
      return addressRegex.test(address);
    };

    it('should validate correct Ethereum address', () => {
      expect(validateWalletAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0')).toBe(true);
      expect(validateWalletAddress('0x0000000000000000000000000000000000000000')).toBe(true);
    });

    it('should reject invalid format', () => {
      expect(validateWalletAddress('742d35Cc6634C0532925a3b844Bc9e7595f0bEb')).toBe(false); // Missing 0x
      expect(validateWalletAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bE')).toBe(false); // Too short
      expect(validateWalletAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbZ')).toBe(false); // Invalid char
    });

    it('should reject empty or null addresses', () => {
      expect(validateWalletAddress('')).toBe(false);
      expect(validateWalletAddress(null)).toBe(false);
      expect(validateWalletAddress(undefined)).toBe(false);
    });
  });

  describe('Message Length Validation', () => {
    const validateMessageLength = (message, maxLength = 500) => {
      if (typeof message !== 'string') return false;
      return message.length <= maxLength;
    };

    it('should accept messages within limit', () => {
      expect(validateMessageLength('Hello')).toBe(true);
      expect(validateMessageLength('a'.repeat(500))).toBe(true);
    });

    it('should reject messages exceeding limit', () => {
      expect(validateMessageLength('a'.repeat(501))).toBe(false);
    });

    it('should handle empty messages', () => {
      expect(validateMessageLength('')).toBe(true);
    });

    it('should reject non-string values', () => {
      expect(validateMessageLength(null)).toBe(false);
      expect(validateMessageLength(undefined)).toBe(false);
      expect(validateMessageLength(123)).toBe(false);
    });
  });

  describe('Network ID Validation', () => {
    const VALID_NETWORKS = {
      'base-sepolia': 84532,
      'base': 8453
    };

    const validateNetwork = (network) => {
      return network in VALID_NETWORKS;
    };

    it('should validate supported networks', () => {
      expect(validateNetwork('base-sepolia')).toBe(true);
      expect(validateNetwork('base')).toBe(true);
    });

    it('should reject unsupported networks', () => {
      expect(validateNetwork('ethereum')).toBe(false);
      expect(validateNetwork('polygon')).toBe(false);
      expect(validateNetwork('invalid')).toBe(false);
    });
  });
});
