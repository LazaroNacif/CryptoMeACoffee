/**
 * CryptoMeACoffee Widget - Using Official x402 Client Library
 * Accept USDC donations via x402 protocol
 */

import { createPaymentHeader, selectPaymentRequirements } from 'x402/client';
import { createWalletClient, custom } from 'viem';
import { baseSepolia, base } from 'viem/chains';

class CryptoMeACoffee {
  constructor(config = {}) {
    this.config = {
      // Required
      walletAddress: config.walletAddress || '',
      apiEndpoint: config.apiEndpoint || '',

      // Optional
      presetAmounts: config.presetAmounts || [1, 3, 5],
      theme: config.theme || 'light',
      network: config.network || 'base-sepolia',
      buttonText: config.buttonText || '☕ Buy me a coffee',
      successMessage: config.successMessage || 'Thank you for your support!',
      logoUrl: config.logoUrl || null,

      // Advanced
      minAmount: config.minAmount || 0.01,
      maxAmount: config.maxAmount || 1000,
      ...config
    };

    this.state = {
      connected: false,
      loading: false,
      error: null,
      selectedAmount: null,
      userAddress: null,
      currentChainId: null
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
    // Network configurations using viem chains
    this.networks = {
      'base-sepolia': {
        chain: baseSepolia,
        id: 84532,
        name: 'Base Sepolia'
      },
      'base': {
        chain: base,
        id: 8453,
        name: 'Base'
      }
    };

    this.targetNetwork = this.networks[this.config.network];
    if (!this.targetNetwork) {
      throw new Error(`Unsupported network: ${this.config.network}`);
    }
  }

  // Check if wallet is available
  isWalletAvailable() {
    if (typeof window === 'undefined') return false;
    if (typeof window.ethereum !== 'undefined') return true;
    if (typeof window.coinbaseWalletExtension !== 'undefined') return true;
    if (window.ethereum?.providers && window.ethereum.providers.length > 0) return true;
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
        method: 'eth_requestAccounts'
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
        transport: custom(provider)
      });

      console.log('✅ Viem wallet client created:', this.walletClient);

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
        params: [{ chainId: targetChainIdHex }]
      });

      this.state.currentChainId = this.targetNetwork.id;
    } catch (error) {
      if (error.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: targetChainIdHex,
              chainName: this.targetNetwork.name,
              rpcUrls: this.targetNetwork.chain.rpcUrls.default.http,
              nativeCurrency: this.targetNetwork.chain.nativeCurrency,
              blockExplorerUrls: [this.targetNetwork.chain.blockExplorers.default.url]
            }]
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
      console.log('🔄 Step 1: Requesting payment details from server...');

      // Step 1: Make initial request to get 402 response with payment details
      const initialResponse = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: this.state.selectedAmount
        })
      });

      // Should get 402 Payment Required
      if (initialResponse.status !== 402) {
        throw new Error(`Expected 402 response, got ${initialResponse.status}`);
      }

      const paymentDetails = await initialResponse.json();
      console.log('💳 Payment details received:', paymentDetails);

      if (!paymentDetails.accepts || paymentDetails.accepts.length === 0) {
        throw new Error('No payment options available');
      }

      // Use x402 client library to select appropriate payment requirements
      const paymentRequirements = selectPaymentRequirements(
        paymentDetails.accepts,
        this.config.network,
        'exact'
      );

      console.log('🎯 Selected payment requirements:', paymentRequirements);

      console.log('✍️ Step 2: Creating payment header using x402 client...');

      // ✅ USE OFFICIAL x402 CLIENT LIBRARY
      // This handles all signature creation and payload formatting correctly!
      const paymentHeader = await createPaymentHeader(
        this.walletClient,
        paymentDetails.x402Version,
        paymentRequirements
      );

      console.log('💳 Payment header created:', paymentHeader.substring(0, 100) + '...');

      console.log('📤 Step 3: Submitting payment to server...');

      // Step 3: Submit payment with x402-generated header
      const paymentResponse = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-PAYMENT': paymentHeader
        },
        body: JSON.stringify({
          amount: this.state.selectedAmount
        })
      });

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.message || `Payment failed (${paymentResponse.status})`;
        throw new Error(errorMessage);
      }

      const result = await paymentResponse.json();
      console.log('✅ Payment successful:', result);

      this.showSuccess(this.config.successMessage);

    } catch (error) {
      console.error('❌ Payment error:', error);
      throw error;
    }
  }

  // ... Rest of the UI methods remain the same ...
  // (render, attachEventListeners, handleDonate, etc.)
  // For brevity, I'm showing the key payment logic changes

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container #${containerId} not found`);
    }

    container.innerHTML = this.getWidgetHTML();
    container.className = `cryptomeacoffee-widget theme-${this.config.theme}`;

    this.elements.container = container;
    this.attachEventListeners();
  }

  getWidgetHTML() {
    return `
      <div class="cmac-widget">
        <div class="cmac-header">
          ${this.config.logoUrl ? `<img src="${this.config.logoUrl}" alt="Logo" class="cmac-logo" />` : ''}
          <h3 class="cmac-title">${this.config.buttonText}</h3>
        </div>

        <div class="cmac-amounts">
          ${this.config.presetAmounts.map(amount => `
            <button class="cmac-amount-btn" data-amount="${amount}">
              $${amount}
            </button>
          `).join('')}
          <button class="cmac-amount-btn cmac-custom-btn" data-custom="true">
            Custom
          </button>
        </div>

        <div class="cmac-status" style="display: none;">
          <div class="cmac-status-message"></div>
        </div>

        <button class="cmac-donate-btn" disabled>
          Connect Wallet
        </button>
      </div>

      <div class="cmac-modal" style="display: none;">
        <div class="cmac-modal-content">
          <div class="cmac-modal-header">
            <h3>Enter Custom Amount</h3>
            <button class="cmac-modal-close">&times;</button>
          </div>
          <div class="cmac-modal-body">
            <div class="cmac-input-group">
              <span class="cmac-input-prefix">$</span>
              <input
                type="number"
                class="cmac-custom-input"
                placeholder="0.00"
                min="${this.config.minAmount}"
                max="${this.config.maxAmount}"
                step="0.01"
              />
            </div>
            <div class="cmac-input-hint">
              Min: $${this.config.minAmount} - Max: $${this.config.maxAmount}
            </div>
          </div>
          <div class="cmac-modal-footer">
            <button class="cmac-btn cmac-btn-secondary cmac-modal-cancel">Cancel</button>
            <button class="cmac-btn cmac-btn-primary cmac-modal-confirm">Confirm</button>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const container = this.elements.container;

    container.querySelectorAll('.cmac-amount-btn[data-amount]').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleAmountSelect(e));
    });

    const customBtn = container.querySelector('.cmac-custom-btn');
    customBtn?.addEventListener('click', () => this.showCustomModal());

    const donateBtn = container.querySelector('.cmac-donate-btn');
    donateBtn?.addEventListener('click', () => this.handleDonate());

    const modalClose = container.querySelector('.cmac-modal-close');
    const modalCancel = container.querySelector('.cmac-modal-cancel');
    const modalConfirm = container.querySelector('.cmac-modal-confirm');

    modalClose?.addEventListener('click', () => this.hideCustomModal());
    modalCancel?.addEventListener('click', () => this.hideCustomModal());
    modalConfirm?.addEventListener('click', () => this.confirmCustomAmount());

    const modal = container.querySelector('.cmac-modal');
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) this.hideCustomModal();
    });
  }

  handleAmountSelect(e) {
    const amount = parseFloat(e.target.dataset.amount);
    this.selectAmount(amount);
  }

  selectAmount(amount) {
    this.state.selectedAmount = amount;

    const container = this.elements.container;
    container.querySelectorAll('.cmac-amount-btn').forEach(btn => {
      btn.classList.remove('selected');
    });

    const selectedBtn = container.querySelector(`[data-amount="${amount}"]`);
    selectedBtn?.classList.add('selected');

    this.updateDonateButton();
  }

  showCustomModal() {
    const modal = this.elements.container.querySelector('.cmac-modal');
    modal.style.display = 'flex';

    const input = this.elements.container.querySelector('.cmac-custom-input');
    input.value = '';
    input.focus();
  }

  hideCustomModal() {
    const modal = this.elements.container.querySelector('.cmac-modal');
    modal.style.display = 'none';
  }

  confirmCustomAmount() {
    const input = this.elements.container.querySelector('.cmac-custom-input');
    const amount = parseFloat(input.value);

    if (isNaN(amount) || amount < this.config.minAmount || amount > this.config.maxAmount) {
      this.showError(`Please enter an amount between $${this.config.minAmount} and $${this.config.maxAmount}`);
      return;
    }

    this.selectAmount(amount);
    this.hideCustomModal();
  }

  async handleDonate() {
    try {
      this.setLoading(true);

      if (!this.state.connected) {
        await this.connectWallet();
        this.updateDonateButton();
        this.showSuccess(`Connected: ${this.formatAddress(this.state.userAddress)}`);
        return;
      }

      if (!this.state.selectedAmount) {
        this.showError('Please select a donation amount');
        return;
      }

      if (this.state.currentChainId !== this.targetNetwork.id) {
        await this.switchNetwork();
      }

      await this.processPayment();

    } catch (error) {
      console.error('Donation error:', error);
      this.showError(error.message || 'Failed to process donation');
    } finally {
      this.setLoading(false);
    }
  }

  formatAddress(address) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  updateDonateButton() {
    const donateBtn = this.elements.container.querySelector('.cmac-donate-btn');

    if (!donateBtn) return;

    if (this.state.connected) {
      if (this.state.selectedAmount) {
        donateBtn.textContent = `Donate $${this.state.selectedAmount}`;
        donateBtn.disabled = false;
      } else {
        donateBtn.textContent = `Connected: ${this.formatAddress(this.state.userAddress)}`;
        donateBtn.disabled = true;
      }
    } else {
      donateBtn.textContent = 'Connect Wallet';
      donateBtn.disabled = false;
    }
  }

  setLoading(loading) {
    this.state.loading = loading;
    const donateBtn = this.elements.container.querySelector('.cmac-donate-btn');

    if (loading) {
      donateBtn.disabled = true;
      donateBtn.innerHTML = '<span class="cmac-spinner"></span> Processing...';
    } else {
      this.updateDonateButton();
    }
  }

  showError(message) {
    this.state.error = message;
    const statusDiv = this.elements.container.querySelector('.cmac-status');
    const messageDiv = this.elements.container.querySelector('.cmac-status-message');

    statusDiv.style.display = 'block';
    statusDiv.className = 'cmac-status cmac-status-error';
    messageDiv.textContent = message;

    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 5000);
  }

  showSuccess(message) {
    const statusDiv = this.elements.container.querySelector('.cmac-status');
    const messageDiv = this.elements.container.querySelector('.cmac-status-message');

    statusDiv.style.display = 'block';
    statusDiv.className = 'cmac-status cmac-status-success';
    messageDiv.textContent = message;

    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 5000);
  }

  destroy() {
    if (this.elements.container) {
      this.elements.container.innerHTML = '';
    }
  }
}

export default CryptoMeACoffee;
