/**
 * CryptoMeACoffee Widget - Floating Buy Me a Coffee Style
 * Accept USDC donations via x402 protocol
 *
 * Usage:
 * <script data-name="CMAC-Widget"
 *         src="widget.min.js"
 *         data-wallet="0x..."
 *         data-api="https://..."
 *         data-color="#5F7FFF"
 *         data-position="Right"
 *         data-x_margin="18"
 *         data-y_margin="18"
 *         data-creator-name="Your Name"></script>
 */

import { createPaymentHeader, selectPaymentRequirements } from 'x402/client';
import { createWalletClient, custom } from 'viem';
import { baseSepolia, base } from 'viem/chains';
import { logger } from './logger.js';

class CryptoMeACoffee {
  // Minimal HTML escaping for XSS protection
  static escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  constructor(config = {}) {
    this.config = {
      // Required
      walletAddress: config.walletAddress || '',
      apiEndpoint: config.apiEndpoint || '',

      // Display
      creatorName: config.creatorName || 'this creator',
      message: config.message || 'Thanks for the coffee!',
      color: config.color || '#5F7FFF',

      // Position (Buy Me a Coffee style)
      position: config.position || 'Right', // 'Left' or 'Right'
      xMargin: config.xMargin || '18',
      yMargin: config.yMargin || '18',

      // Optional
      presetAmounts: config.presetAmounts || [1, 3, 5],
      theme: config.theme || 'light',
      network: config.network || 'base-sepolia',
      logoUrl: config.logoUrl || null,

      // Advanced
      minAmount: config.minAmount || 0.01,
      maxAmount: config.maxAmount || 1000000,
      ...config,
    };

    this.state = {
      modalOpen: false, // NEW: Track modal visibility
      connected: false,
      loading: false,
      error: null,
      selectedAmount: null,
      customAmount: '', // NEW: Separate custom amount input
      userAddress: null,
      currentChainId: null,
      message: '', // NEW: Message from supporter
    };

    this.elements = {};
    this.walletClient = null;

    this.validateConfig();
    this.initializeNetworkConfig();
  }

  validateConfig() {
    if (!this.config.walletAddress) {
      throw new Error('CryptoMeACoffee: walletAddress is required');
    }
    if (!this.config.apiEndpoint) {
      throw new Error('CryptoMeACoffee: apiEndpoint is required');
    }
  }

  initializeNetworkConfig() {
    this.networks = {
      'base-sepolia': {
        chain: baseSepolia,
        id: 84532,
        name: 'Base Sepolia',
      },
      base: {
        chain: base,
        id: 8453,
        name: 'Base',
      },
    };

    this.targetNetwork = this.networks[this.config.network];
    if (!this.targetNetwork) {
      throw new Error(`Unsupported network: ${this.config.network}`);
    }
  }

  // Check if wallet is available
  isWalletAvailable() {
    if (typeof window === 'undefined') {
      return false;
    }
    if (typeof window.ethereum !== 'undefined') {
      return true;
    }
    if (typeof window.coinbaseWalletExtension !== 'undefined') {
      return true;
    }
    if (window.ethereum?.providers && window.ethereum.providers.length > 0) {
      return true;
    }
    return false;
  }

  // Get the appropriate ethereum provider
  getEthereumProvider() {
    if (window.ethereum && !window.ethereum.providers) {
      return window.ethereum;
    }

    if (window.ethereum?.providers) {
      const coinbaseProvider = window.ethereum.providers.find(
        (p) => p.isCoinbaseWallet || p.isMetaMask
      );
      return coinbaseProvider || window.ethereum.providers[0];
    }

    if (window.coinbaseWalletExtension) {
      return window.coinbaseWalletExtension;
    }

    return window.ethereum;
  }

  // Connect wallet and create viem wallet client
  async connectWallet() {
    if (!this.isWalletAvailable()) {
      throw new Error('No Web3 wallet detected. Please install MetaMask or Coinbase Wallet.');
    }

    try {
      const provider = this.getEthereumProvider();

      // Request account access
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      this.state.userAddress = accounts[0];
      this.state.connected = true;

      // Get current chain ID
      const chainId = await provider.request({ method: 'eth_chainId' });
      this.state.currentChainId = parseInt(chainId, 16);

      // Create viem wallet client for x402
      this.walletClient = createWalletClient({
        account: this.state.userAddress,
        chain: this.targetNetwork.chain,
        transport: custom(provider),
      });

      logger.log('✅ Viem wallet client created:', this.walletClient);

      // Check if on correct network
      if (this.state.currentChainId !== this.targetNetwork.id) {
        await this.switchNetwork();
      }

      return this.state.userAddress;
    } catch (error) {
      if (error.code === 4001) {
        throw new Error('Wallet connection rejected by user');
      }
      throw error;
    }
  }

  // Switch to target network
  async switchNetwork() {
    if (!this.isWalletAvailable()) {
      throw new Error('No wallet available');
    }

    const provider = this.getEthereumProvider();
    const targetChainIdHex = `0x${this.targetNetwork.id.toString(16)}`;

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetChainIdHex }],
      });

      this.state.currentChainId = this.targetNetwork.id;
    } catch (error) {
      if (error.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: targetChainIdHex,
                chainName: this.targetNetwork.name,
                rpcUrls: this.targetNetwork.chain.rpcUrls.default.http,
                nativeCurrency: this.targetNetwork.chain.nativeCurrency,
                blockExplorerUrls: [this.targetNetwork.chain.blockExplorers.default.url],
              },
            ],
          });

          this.state.currentChainId = this.targetNetwork.id;
        } catch (addError) {
          throw new Error('Failed to add network to wallet');
        }
      } else if (error.code === 4001) {
        throw new Error('Network switch rejected by user');
      } else {
        throw error;
      }
    }
  }

  // Process x402 payment using official client library
  async processPayment() {
    try {
      logger.log('🔄 Step 1: Requesting payment details from server...');

      const amount = this.state.selectedAmount || parseFloat(this.state.customAmount);

      if (!amount || amount <= 0) {
        throw new Error('Please enter a valid amount');
      }

      // Step 1: Make initial request to get 402 response with payment details
      const initialResponse = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          message: this.state.message, // ✅ Include message
        }),
      });

      // Should get 402 Payment Required
      if (initialResponse.status !== 402) {
        throw new Error(`Expected 402 response, got ${initialResponse.status}`);
      }

      const paymentDetails = await initialResponse.json();
      logger.log('💳 Payment details received:', paymentDetails);

      if (!paymentDetails.accepts || paymentDetails.accepts.length === 0) {
        throw new Error('No payment options available');
      }

      // Use x402 client library to select appropriate payment requirements
      const paymentRequirements = selectPaymentRequirements(
        paymentDetails.accepts,
        this.config.network,
        'exact'
      );

      logger.log('🎯 Selected payment requirements:', paymentRequirements);

      logger.log('✍️ Step 2: Creating payment header using x402 client...');

      // ✅ USE OFFICIAL x402 CLIENT LIBRARY
      const paymentHeader = await createPaymentHeader(
        this.walletClient,
        paymentDetails.x402Version,
        paymentRequirements
      );

      logger.log('💳 Payment header created:', paymentHeader.substring(0, 100) + '...');

      logger.log('📤 Step 3: Submitting payment to server...');

      // Step 3: Submit payment with x402-generated header
      const paymentResponse = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-PAYMENT': paymentHeader,
        },
        body: JSON.stringify({
          amount: amount,
          message: this.state.message, // ✅ Include message
        }),
      });

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json().catch(() => ({}));
        const errorMessage =
          errorData.error || errorData.message || `Payment failed (${paymentResponse.status})`;
        throw new Error(errorMessage);
      }

      const result = await paymentResponse.json();
      logger.log('✅ Payment successful:', result);

      this.showSuccess();
    } catch (error) {
      logger.error('❌ Payment error:', error);
      throw error;
    }
  }

  // NEW: Modal management
  openModal() {
    this.state.modalOpen = true;
    const overlay = this.elements.container.querySelector('.cmac-modal-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
      // Trigger reflow for animation
      setTimeout(() => overlay.classList.add('show'), 10);
    }
  }

  closeModal() {
    this.state.modalOpen = false;
    const overlay = this.elements.container.querySelector('.cmac-modal-overlay');
    if (overlay) {
      overlay.classList.remove('show');
      setTimeout(() => (overlay.style.display = 'none'), 200);
    }
    // Reset form
    this.resetForm();
  }

  resetForm() {
    this.state.selectedAmount = null;
    this.state.customAmount = '';
    this.state.message = '';

    // Clear input fields
    const customInput = this.elements.container.querySelector('.cmac-custom-amount');
    const messageInput = this.elements.container.querySelector('.cmac-message-input');

    if (customInput) {
      customInput.value = '';
    }
    if (messageInput) {
      messageInput.value = '';
      this.updateCharCounter();
    }

    // Deselect amount buttons
    this.elements.container.querySelectorAll('.cmac-preset-btn').forEach((btn) => {
      btn.classList.remove('selected');
    });
  }

  // NEW: Handle preset amount click
  handlePresetAmount(amount) {
    logger.log('💰 Preset amount clicked:', amount);
    this.state.selectedAmount = amount;
    this.state.customAmount = ''; // Clear custom amount

    // Update input field to show selected preset amount
    const customInput = this.elements.container.querySelector('.cmac-custom-amount');
    logger.log('Input field found:', customInput);
    if (customInput) {
      customInput.value = amount;
      logger.log('Input field updated to:', amount);
    }

    // Update button states
    this.elements.container.querySelectorAll('.cmac-preset-btn').forEach((btn) => {
      if (parseFloat(btn.dataset.amount) === amount) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });
  }

  // NEW: Handle custom amount input
  handleCustomAmountInput(value) {
    this.state.customAmount = value;
    if (value) {
      this.state.selectedAmount = null; // Deselect preset amounts
      this.elements.container.querySelectorAll('.cmac-preset-btn').forEach((btn) => {
        btn.classList.remove('selected');
      });
    }
  }

  // NEW: Handle message input with character limit
  handleMessageInput(value) {
    if (value.length <= 500) {
      this.state.message = value;
      this.updateCharCounter();
    }
  }

  updateCharCounter() {
    const counter = this.elements.container.querySelector('.cmac-char-count');
    if (counter) {
      counter.textContent = `${this.state.message.length}/500`;
    }
  }

  // NEW: Handle support button click
  async handleSupport() {
    try {
      this.setLoading(true);

      // Validate amount
      const amount = this.state.selectedAmount || parseFloat(this.state.customAmount);
      if (!amount || amount < this.config.minAmount || amount > this.config.maxAmount) {
        this.showError(
          `Please enter an amount between $${this.config.minAmount} and $${this.config.maxAmount}`
        );
        return;
      }

      // Connect wallet if not connected
      if (!this.state.connected) {
        await this.connectWallet();
      }

      // Check/switch network
      if (this.state.currentChainId !== this.targetNetwork.id) {
        await this.switchNetwork();
      }

      // Process payment
      await this.processPayment();
    } catch (error) {
      logger.error('Support error:', error);
      this.showError(error.message || 'Failed to process donation');
    } finally {
      this.setLoading(false);
    }
  }

  // Render floating widget
  render(containerId = 'body') {
    let container;

    if (containerId === 'body') {
      // Create container and append to body
      container = document.createElement('div');
      container.id = 'cryptomeacoffee-widget-container';
      document.body.appendChild(container);
    } else {
      container = document.getElementById(containerId);
      if (!container) {
        throw new Error(`Container #${containerId} not found`);
      }
    }

    container.innerHTML = this.getWidgetHTML();
    container.className = `cryptomeacoffee-widget theme-${this.config.theme}`;

    this.elements.container = container;
    this.attachEventListeners();
  }

  getWidgetHTML() {
    const position = this.config.position.toLowerCase();
    const xMargin = this.config.xMargin + 'px';
    const yMargin = this.config.yMargin + 'px';

    const floatButtonStyle =
      position === 'left'
        ? `left: ${xMargin}; bottom: ${yMargin};`
        : `right: ${xMargin}; bottom: ${yMargin};`;

    // Use logo if provided, otherwise use SVG icon
    const buttonContent = this.config.logoUrl
      ? `<img src="${CryptoMeACoffee.escapeHTML(this.config.logoUrl)}" alt="Support" style="width: 73%; height: 73%; object-fit: contain;" />`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 21h19v-3H2v3zM20 8H4V5h16v3zm0 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill="white"/>
        </svg>`;

    return `
      <!-- Floating Button -->
      <div class="cmac-floating-widget" style="${floatButtonStyle}">
        <button class="cmac-float-button" style="background-color: ${this.config.color || '#000000'};">
          ${buttonContent}
        </button>
      </div>

      <!-- Modal Overlay -->
      <div class="cmac-modal-overlay" style="display: none;">
        <div class="cmac-modal">
          <!-- Close button -->
          <button class="cmac-modal-close">&times;</button>

          <!-- Header -->
          <div class="cmac-modal-header">
            <h2>Support ${CryptoMeACoffee.escapeHTML(this.config.creatorName)}</h2>
            <p style="font-size: 15px; color: var(--cmac-text-secondary); margin-top: 0.5rem; font-weight: 500;">Buy them a coffee with USDC</p>
          </div>

          <!-- Amount Section -->
          <div class="cmac-amount-section">
            <div class="cmac-amount-input-wrapper">
              <span class="cmac-currency-symbol">$</span>
              <input
                type="number"
                class="cmac-custom-amount"
                placeholder="5"
                min="${this.config.minAmount}"
                max="${this.config.maxAmount}"
                step="0.01"
              />
            </div>
            <div class="cmac-preset-amounts">
              ${this.config.presetAmounts
                .map(
                  (amount) => `
                <button class="cmac-preset-btn" data-amount="${amount}">
                  $${amount}
                </button>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Message Section -->
          <div class="cmac-message-section">
            <textarea
              class="cmac-message-input"
              placeholder="Leave a message (optional)"
              maxlength="500"
              rows="3"
            ></textarea>
            <div class="cmac-char-count">0/500</div>
          </div>

          <!-- Status Message -->
          <div class="cmac-status-message" style="display: none;"></div>

          <!-- Support Button -->
          <button class="cmac-support-button">
            Support with USDC
          </button>

          <!-- Branding Footer -->
          <div class="cmac-branding">
            <a href="https://cryptomeacoffee.com" target="_blank" rel="noopener">
              ☕ Powered by CryptoMeACoffee
            </a>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const container = this.elements.container;

    // Floating button - open modal
    const floatButton = container.querySelector('.cmac-float-button');
    floatButton?.addEventListener('click', () => this.openModal());

    // Modal close buttons
    const modalClose = container.querySelector('.cmac-modal-close');
    modalClose?.addEventListener('click', () => this.closeModal());

    // Close on overlay click
    const overlay = container.querySelector('.cmac-modal-overlay');
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.closeModal();
      }
    });

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.state.modalOpen) {
        this.closeModal();
      }
    });

    // Preset amount buttons
    const presetBtns = container.querySelectorAll('.cmac-preset-btn');
    logger.log('🔘 Found preset buttons:', presetBtns.length);
    presetBtns.forEach((btn) => {
      logger.log('🔘 Attaching listener to button:', btn.dataset.amount);
      btn.addEventListener('click', () => {
        logger.log('🔘 Button clicked!', btn.dataset.amount);
        const amount = parseFloat(btn.dataset.amount);
        this.handlePresetAmount(amount);
      });
    });

    // Custom amount input
    const customInput = container.querySelector('.cmac-custom-amount');
    customInput?.addEventListener('input', (e) => {
      this.handleCustomAmountInput(e.target.value);
    });

    // Message input
    const messageInput = container.querySelector('.cmac-message-input');
    messageInput?.addEventListener('input', (e) => {
      this.handleMessageInput(e.target.value);
    });

    // Support button
    const supportButton = container.querySelector('.cmac-support-button');
    supportButton?.addEventListener('click', () => this.handleSupport());
  }

  formatAddress(address) {
    if (!address) {
      return '';
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  setLoading(loading) {
    this.state.loading = loading;
    const supportButton = this.elements.container.querySelector('.cmac-support-button');

    if (loading) {
      supportButton.disabled = true;
      supportButton.innerHTML = '<span class="cmac-spinner"></span> Processing...';
    } else {
      supportButton.disabled = false;
      supportButton.innerHTML = 'Support';
    }
  }

  showError(message) {
    this.state.error = message;
    const statusDiv = this.elements.container.querySelector('.cmac-status-message');

    if (statusDiv) {
      statusDiv.style.display = 'block';
      statusDiv.className = 'cmac-status-message cmac-status-error';
      statusDiv.textContent = '❌ ' + message;

      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 5000);
    }
  }

  showSuccess() {
    const statusDiv = this.elements.container.querySelector('.cmac-status-message');

    if (statusDiv) {
      statusDiv.style.display = 'block';
      statusDiv.className = 'cmac-status-message cmac-status-success';
      statusDiv.textContent = '✅ ' + this.config.message;

      setTimeout(() => {
        statusDiv.style.display = 'none';
        this.closeModal();
      }, 3000);
    }
  }

  destroy() {
    if (this.elements.container) {
      this.elements.container.remove();
    }
  }
}

// AUTO-INITIALIZATION from script tag
(function () {
  if (typeof window === 'undefined') {
    return;
  }

  // Find the script tag with data attributes
  const currentScript =
    document.currentScript || document.querySelector('script[data-name="CMAC-Widget"]');

  function initWidget() {
    const config = {
      walletAddress: currentScript.dataset.wallet,
      apiEndpoint: currentScript.dataset.api,
      creatorName: currentScript.dataset.creatorName || 'this creator',
      message: currentScript.dataset.message || 'Thanks for the coffee!',
      color: currentScript.dataset.color || '#5F7FFF',
      position: currentScript.dataset.position || 'Right',
      xMargin: currentScript.dataset.xMargin || '18',
      yMargin: currentScript.dataset.yMargin || '18',
      network: currentScript.dataset.network || 'base-sepolia',
      theme: currentScript.dataset.theme || 'light',
      logoUrl: currentScript.dataset.logoUrl || null,
    };

    // Parse preset amounts if provided
    if (currentScript.dataset.presetAmounts) {
      try {
        config.presetAmounts = JSON.parse(currentScript.dataset.presetAmounts);
      } catch (e) {
        logger.warn('Invalid presetAmounts format, using defaults');
      }
    }

    window.CryptoMeACoffeeWidget = new CryptoMeACoffee(config);
    window.CryptoMeACoffeeWidget.render('body');
  }

  if (currentScript && currentScript.dataset.wallet && currentScript.dataset.api) {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initWidget);
    } else {
      initWidget();
    }
  }
})();

export default CryptoMeACoffee;
