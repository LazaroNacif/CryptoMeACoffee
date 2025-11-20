/**
 * CryptoMeACoffee Widget
 * Accept USDC donations via x402 protocol
 */

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
      logoUrl: config.logoUrl || null, // Optional logo/icon URL

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
    this.publicClient = null;

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

  // Checksum an Ethereum address (EIP-55)
  toChecksumAddress(address) {
    if (!address) return address;

    address = address.toLowerCase().replace('0x', '');

    // Simple checksum implementation
    const hash = this.keccak256(address);
    let checksumAddress = '0x';

    for (let i = 0; i < address.length; i++) {
      if (parseInt(hash[i], 16) >= 8) {
        checksumAddress += address[i].toUpperCase();
      } else {
        checksumAddress += address[i];
      }
    }

    return checksumAddress;
  }

  // Simple Keccak256 (we'll use a lightweight version)
  // For production, use a proper crypto library
  keccak256(str) {
    // This is a placeholder - in production use @noble/hashes or similar
    // For now, return lowercase hash to avoid checksumming issues
    return str.split('').map(() => '0').join('');
  }

  initializeNetworkConfig() {
    // Network configurations
    this.networks = {
      'base-sepolia': {
        id: 84532,
        name: 'Base Sepolia',
        rpcUrls: ['https://sepolia.base.org'],
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        blockExplorers: ['https://sepolia.basescan.org']
      },
      'base': {
        id: 8453,
        name: 'Base',
        rpcUrls: ['https://mainnet.base.org'],
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        blockExplorers: ['https://basescan.org']
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

    // Check for standard ethereum provider
    if (typeof window.ethereum !== 'undefined') return true;

    // Check for Coinbase Wallet extension
    if (typeof window.coinbaseWalletExtension !== 'undefined') return true;

    // Check for providers array (multiple wallets installed)
    if (window.ethereum?.providers && window.ethereum.providers.length > 0) return true;

    return false;
  }

  // Get the appropriate ethereum provider
  getEthereumProvider() {
    // If only one provider, use it
    if (window.ethereum && !window.ethereum.providers) {
      return window.ethereum;
    }

    // If multiple providers, try to find Coinbase Wallet first, then any provider
    if (window.ethereum?.providers) {
      const coinbaseProvider = window.ethereum.providers.find(
        (p) => p.isCoinbaseWallet || p.isMetaMask
      );
      return coinbaseProvider || window.ethereum.providers[0];
    }

    // Fallback to Coinbase Wallet extension
    if (window.coinbaseWalletExtension) {
      return window.coinbaseWalletExtension;
    }

    return window.ethereum;
  }

  // Connect wallet
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

      // Store address in original format (wallets return checksummed addresses)
      // If lowercase, we'll need to match server's format
      this.state.userAddress = accounts[0];
      this.state.connected = true;

      // Get current chain ID
      const chainId = await provider.request({ method: 'eth_chainId' });
      this.state.currentChainId = parseInt(chainId, 16);

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
      // Try to switch to the network
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetChainIdHex }]
      });

      this.state.currentChainId = this.targetNetwork.id;
    } catch (error) {
      // If network doesn't exist, add it
      if (error.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: targetChainIdHex,
              chainName: this.targetNetwork.name,
              rpcUrls: this.targetNetwork.rpcUrls,
              nativeCurrency: this.targetNetwork.nativeCurrency,
              blockExplorerUrls: this.targetNetwork.blockExplorers
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

  // Disconnect wallet
  disconnectWallet() {
    this.state.connected = false;
    this.state.userAddress = null;
    this.state.currentChainId = null;
    this.walletClient = null;
    this.publicClient = null;

    // Update UI
    if (this.elements.container) {
      const donateBtn = this.elements.container.querySelector('.cmac-donate-btn');
      donateBtn.disabled = true;
      donateBtn.textContent = 'Connect Wallet';
    }
  }

  // Process x402 payment
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

      const paymentOption = paymentDetails.accepts[0];
      console.log('🎯 Payment option:', paymentOption);
      console.log('🎯 Extra fields:', paymentOption.extra);

      console.log('✍️ Step 2: Signing payment authorization...');

      // Step 2: Sign the payment using EIP-3009 transferWithAuthorization
      const signature = await this.signPayment(paymentOption);

      console.log('📤 Step 3: Submitting payment to server...');

      // Step 3: Base64 encode the signature (required by x402)
      const encodedSignature = btoa(signature);

      // Step 4: Submit payment with base64-encoded signature
      const paymentResponse = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-PAYMENT': encodedSignature
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

  // Sign payment using EIP-3009 transferWithAuthorization
  // Simplified: uses all data from server's 402 response
  async signPayment(paymentOption) {
    const provider = this.getEthereumProvider();

    // ✅ Use data from server response instead of hardcoding
    const toAddress = paymentOption.payTo;  // From server
    const assetAddress = paymentOption.asset;  // From server
    const fromAddress = this.state.userAddress;

    // Convert USD amount to USDC (6 decimals)
    const usdcAmount = Math.floor(this.state.selectedAmount * 1000000);

    // Generate nonce (current timestamp + random)
    const nonce = `0x${Date.now().toString(16)}${Math.random().toString(16).substring(2, 18)}`.padEnd(66, '0');

    // Valid for 1 hour
    const validAfter = 0;
    const validBefore = Math.floor(Date.now() / 1000) + 3600;

    // ✅ EIP-712 Domain - use server-provided parameters
    const domain = {
      name: paymentOption.extra.name,  // From server
      version: paymentOption.extra.version,  // From server
      chainId: this.targetNetwork.id,
      verifyingContract: assetAddress  // From server
    };

    // EIP-712 Types for transferWithAuthorization (standard)
    const types = {
      TransferWithAuthorization: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'validAfter', type: 'uint256' },
        { name: 'validBefore', type: 'uint256' },
        { name: 'nonce', type: 'bytes32' }
      ]
    };

    // Message to sign - use lowercase addresses for wallet compatibility
    const message = {
      from: fromAddress.toLowerCase(),
      to: toAddress.toLowerCase(),
      value: usdcAmount.toString(),
      validAfter: validAfter.toString(),
      validBefore: validBefore.toString(),
      nonce: nonce
    };

    console.log('📝 EIP-712 Domain (from server):', domain);
    console.log('📝 Signing message:', message);

    // Sign using eth_signTypedData_v4
    const signature = await provider.request({
      method: 'eth_signTypedData_v4',
      params: [
        this.state.userAddress,
        JSON.stringify({
          types,
          domain,
          primaryType: 'TransferWithAuthorization',
          message
        })
      ]
    });

    console.log('✍️ Signature:', signature);

    // ✅ Create x402 payment payload using server's network and scheme
    const x402Payment = {
      x402Version: 1,
      scheme: paymentOption.scheme,  // From server (usually 'exact')
      network: paymentOption.network,  // From server (base-sepolia)
      payload: {
        signature: signature,
        authorization: {
          from: fromAddress.toLowerCase(),
          to: toAddress.toLowerCase(),
          value: usdcAmount.toString(),
          validAfter: validAfter.toString(),
          validBefore: validBefore.toString(),
          nonce: nonce
        }
      }
    };

    console.log('💳 x402 payment payload:', x402Payment);

    // Return as JSON string (will be base64 encoded before sending)
    return JSON.stringify(x402Payment);
  }

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

      <!-- Custom Amount Modal -->
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

    // Preset amount buttons
    container.querySelectorAll('.cmac-amount-btn[data-amount]').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleAmountSelect(e));
    });

    // Custom amount button
    const customBtn = container.querySelector('.cmac-custom-btn');
    customBtn?.addEventListener('click', () => this.showCustomModal());

    // Donate button
    const donateBtn = container.querySelector('.cmac-donate-btn');
    donateBtn?.addEventListener('click', () => this.handleDonate());

    // Modal controls
    const modalClose = container.querySelector('.cmac-modal-close');
    const modalCancel = container.querySelector('.cmac-modal-cancel');
    const modalConfirm = container.querySelector('.cmac-modal-confirm');

    modalClose?.addEventListener('click', () => this.hideCustomModal());
    modalCancel?.addEventListener('click', () => this.hideCustomModal());
    modalConfirm?.addEventListener('click', () => this.confirmCustomAmount());

    // Close modal on outside click
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

    // Update UI
    const container = this.elements.container;
    container.querySelectorAll('.cmac-amount-btn').forEach(btn => {
      btn.classList.remove('selected');
    });

    const selectedBtn = container.querySelector(`[data-amount="${amount}"]`);
    selectedBtn?.classList.add('selected');

    // Update donate button
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

      // Step 1: Connect wallet if not connected
      if (!this.state.connected) {
        await this.connectWallet();
        this.updateDonateButton();
        this.showSuccess(`Connected: ${this.formatAddress(this.state.userAddress)}`);
        return;
      }

      // Step 2: Ensure amount is selected
      if (!this.state.selectedAmount) {
        this.showError('Please select a donation amount');
        return;
      }

      // Step 3: Verify we're on the correct network
      if (this.state.currentChainId !== this.targetNetwork.id) {
        await this.switchNetwork();
      }

      // Step 4: Process x402 payment
      await this.processPayment();

    } catch (error) {
      console.error('Donation error:', error);
      this.showError(error.message || 'Failed to process donation');
    } finally {
      this.setLoading(false);
    }
  }

  // Format address for display
  formatAddress(address) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  // Update donate button text based on state
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

// Export for both module and browser usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CryptoMeACoffee;
}
if (typeof window !== 'undefined') {
  window.CryptoMeACoffee = CryptoMeACoffee;
}
