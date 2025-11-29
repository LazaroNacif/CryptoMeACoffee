import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';

// Mock viem and x402 before importing the widget
jest.mock('viem', () => ({
  createWalletClient: jest.fn(() => ({})),
  custom: jest.fn(() => ({}))
}));

jest.mock('viem/chains', () => ({
  baseSepolia: {
    id: 84532,
    name: 'Base Sepolia',
    rpcUrls: { default: { http: ['https://sepolia.base.org'] } },
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    blockExplorers: { default: { url: 'https://sepolia.basescan.org' } }
  },
  base: {
    id: 8453,
    name: 'Base',
    rpcUrls: { default: { http: ['https://mainnet.base.org'] } },
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    blockExplorers: { default: { url: 'https://basescan.org' } }
  }
}));

jest.mock('x402/client', () => ({
  createPaymentHeader: jest.fn(() => Promise.resolve('mock-payment-header')),
  selectPaymentRequirements: jest.fn(() => ({}))
}));

// Import widget after mocks are set up
const CryptoMeACoffee = (await import('../../src/widget.js')).default;

describe('CryptoMeACoffee Widget', () => {
  describe('Constructor', () => {
    it('should throw error if walletAddress is missing', () => {
      expect(() => {
        new CryptoMeACoffee({ apiEndpoint: 'https://api.example.com' });
      }).toThrow('walletAddress is required');
    });

    it('should throw error if apiEndpoint is missing', () => {
      expect(() => {
        new CryptoMeACoffee({ walletAddress: '0x123' });
      }).toThrow('apiEndpoint is required');
    });

    it('should set default values correctly', () => {
      const widget = new CryptoMeACoffee({
        walletAddress: '0x123',
        apiEndpoint: 'https://api.example.com'
      });

      expect(widget.config.creatorName).toBe('this creator');
      expect(widget.config.presetAmounts).toEqual([1, 3, 5]);
      expect(widget.config.theme).toBe('light');
      expect(widget.config.minAmount).toBe(0.01);
      expect(widget.config.maxAmount).toBe(1000000);
    });

    it('should accept custom configuration', () => {
      const widget = new CryptoMeACoffee({
        walletAddress: '0x123',
        apiEndpoint: 'https://api.example.com',
        creatorName: 'Alice',
        color: '#FF6B6B',
        presetAmounts: [5, 10, 20],
        theme: 'dark'
      });

      expect(widget.config.creatorName).toBe('Alice');
      expect(widget.config.color).toBe('#FF6B6B');
      expect(widget.config.presetAmounts).toEqual([5, 10, 20]);
      expect(widget.config.theme).toBe('dark');
    });

    it('should throw error for unsupported network', () => {
      expect(() => {
        new CryptoMeACoffee({
          walletAddress: '0x123',
          apiEndpoint: 'https://api.example.com',
          network: 'invalid-network'
        });
      }).toThrow('Unsupported network: invalid-network');
    });
  });

  describe('Network Configuration', () => {
    it('should detect Base Sepolia correctly', () => {
      const widget = new CryptoMeACoffee({
        walletAddress: '0x123',
        apiEndpoint: 'https://api.example.com',
        network: 'base-sepolia'
      });

      expect(widget.targetNetwork.id).toBe(84532);
      expect(widget.targetNetwork.name).toBe('Base Sepolia');
    });

    it('should detect Base Mainnet correctly', () => {
      const widget = new CryptoMeACoffee({
        walletAddress: '0x123',
        apiEndpoint: 'https://api.example.com',
        network: 'base'
      });

      expect(widget.targetNetwork.id).toBe(8453);
      expect(widget.targetNetwork.name).toBe('Base');
    });
  });

  describe('State Management', () => {
    let widget;

    beforeEach(() => {
      widget = new CryptoMeACoffee({
        walletAddress: '0x123',
        apiEndpoint: 'https://api.example.com'
      });
    });

    it('should initialize with correct default state', () => {
      expect(widget.state.modalOpen).toBe(false);
      expect(widget.state.connected).toBe(false);
      expect(widget.state.loading).toBe(false);
      expect(widget.state.error).toBe(null);
      expect(widget.state.selectedAmount).toBe(null);
      expect(widget.state.customAmount).toBe('');
      expect(widget.state.message).toBe('');
    });
  });

  describe('Amount Validation', () => {
    let widget;

    beforeEach(() => {
      // Set up DOM
      document.body.innerHTML = `
        <div id="test-container">
          <input class="cmac-custom-amount" />
          <button class="cmac-preset-btn" data-amount="5"></button>
        </div>
      `;

      widget = new CryptoMeACoffee({
        walletAddress: '0x123',
        apiEndpoint: 'https://api.example.com',
        minAmount: 0.01,
        maxAmount: 1000
      });

      widget.elements.container = document.getElementById('test-container');
    });

    afterEach(() => {
      document.body.innerHTML = '';
    });

    it('should accept valid preset amount', () => {
      widget.handlePresetAmount(5);
      expect(widget.state.selectedAmount).toBe(5);
      expect(widget.state.customAmount).toBe('');
    });

    it('should handle custom amount input', () => {
      widget.handleCustomAmountInput('10.50');
      expect(widget.state.customAmount).toBe('10.50');
      expect(widget.state.selectedAmount).toBe(null);
    });

    it('should clear preset when custom amount entered', () => {
      widget.handlePresetAmount(5);
      expect(widget.state.selectedAmount).toBe(5);

      widget.handleCustomAmountInput('10');
      expect(widget.state.selectedAmount).toBe(null);
      expect(widget.state.customAmount).toBe('10');
    });
  });

  describe('Message Validation', () => {
    let widget;

    beforeEach(() => {
      // Set up DOM
      document.body.innerHTML = `
        <div id="test-container">
          <div class="cmac-char-count">0/500</div>
        </div>
      `;

      widget = new CryptoMeACoffee({
        walletAddress: '0x123',
        apiEndpoint: 'https://api.example.com'
      });

      widget.elements.container = document.getElementById('test-container');
    });

    afterEach(() => {
      document.body.innerHTML = '';
    });

    it('should enforce 500 character limit', () => {
      const longMessage = 'a'.repeat(501);
      widget.handleMessageInput(longMessage);

      // Should not accept message longer than 500 chars
      expect(widget.state.message).toBe('');
    });

    it('should accept message within limit', () => {
      const validMessage = 'Thank you for the great content!';
      widget.handleMessageInput(validMessage);

      expect(widget.state.message).toBe(validMessage);
    });

    it('should accept exactly 500 characters', () => {
      const exactMessage = 'a'.repeat(500);
      widget.handleMessageInput(exactMessage);

      expect(widget.state.message.length).toBe(500);
    });

    it('should update character counter', () => {
      const message = 'Hello world';
      widget.handleMessageInput(message);

      const counter = widget.elements.container.querySelector('.cmac-char-count');
      expect(counter.textContent).toBe('11/500');
    });
  });

  describe('Modal Management', () => {
    let widget;

    beforeEach(() => {
      document.body.innerHTML = `
        <div id="test-container">
          <div class="cmac-modal-overlay" style="display: none;">
            <div class="cmac-modal"></div>
          </div>
          <div class="cmac-preset-btn"></div>
          <input class="cmac-custom-amount" />
          <textarea class="cmac-message-input"></textarea>
          <div class="cmac-char-count">0/500</div>
        </div>
      `;

      widget = new CryptoMeACoffee({
        walletAddress: '0x123',
        apiEndpoint: 'https://api.example.com'
      });

      widget.elements.container = document.getElementById('test-container');
    });

    afterEach(() => {
      document.body.innerHTML = '';
    });

    it('should open modal', () => {
      widget.openModal();
      expect(widget.state.modalOpen).toBe(true);

      const overlay = widget.elements.container.querySelector('.cmac-modal-overlay');
      expect(overlay.style.display).toBe('flex');
    });

    it('should close modal', (done) => {
      widget.openModal();
      widget.closeModal();

      expect(widget.state.modalOpen).toBe(false);

      setTimeout(() => {
        const overlay = widget.elements.container.querySelector('.cmac-modal-overlay');
        expect(overlay.style.display).toBe('none');
        done();
      }, 250);
    });

    it('should reset form on close', () => {
      widget.state.selectedAmount = 5;
      widget.state.customAmount = '10';
      widget.state.message = 'Test message';

      widget.resetForm();

      expect(widget.state.selectedAmount).toBe(null);
      expect(widget.state.customAmount).toBe('');
      expect(widget.state.message).toBe('');
    });
  });

  describe('Wallet Detection', () => {
    let widget;

    beforeEach(() => {
      widget = new CryptoMeACoffee({
        walletAddress: '0x123',
        apiEndpoint: 'https://api.example.com'
      });
    });

    it('should detect wallet when ethereum is available', () => {
      global.window.ethereum = {};
      expect(widget.isWalletAvailable()).toBe(true);
    });

    it('should return false when no wallet available', () => {
      delete global.window.ethereum;
      delete global.window.coinbaseWalletExtension;

      expect(widget.isWalletAvailable()).toBe(false);
    });

    it('should detect Coinbase Wallet extension', () => {
      delete global.window.ethereum;
      global.window.coinbaseWalletExtension = {};

      expect(widget.isWalletAvailable()).toBe(true);
    });

    it('should detect multiple providers', () => {
      global.window.ethereum = {
        providers: [
          { isMetaMask: true },
          { isCoinbaseWallet: true }
        ]
      };

      expect(widget.isWalletAvailable()).toBe(true);
    });
  });

  describe('Address Formatting', () => {
    let widget;

    beforeEach(() => {
      widget = new CryptoMeACoffee({
        walletAddress: '0x123',
        apiEndpoint: 'https://api.example.com'
      });
    });

    it('should format address correctly', () => {
      const address = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
      const formatted = widget.formatAddress(address);

      expect(formatted).toBe('0x742d...0bEb');
    });

    it('should handle empty address', () => {
      expect(widget.formatAddress('')).toBe('');
      expect(widget.formatAddress(null)).toBe('');
    });
  });

  describe('Destroy Method', () => {
    it('should remove widget from DOM', () => {
      document.body.innerHTML = '<div id="test-container"></div>';

      const widget = new CryptoMeACoffee({
        walletAddress: '0x123',
        apiEndpoint: 'https://api.example.com'
      });

      const container = document.createElement('div');
      container.id = 'widget-container';
      document.body.appendChild(container);

      widget.elements.container = container;
      expect(document.getElementById('widget-container')).toBeTruthy();

      widget.destroy();
      expect(document.getElementById('widget-container')).toBeFalsy();

      document.body.innerHTML = '';
    });
  });
});
