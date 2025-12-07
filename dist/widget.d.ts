/**
 * CryptoMeACoffee Widget TypeScript Definitions
 * Accept USDC donations via x402 protocol
 * 
 * @packageDocumentation
 */

/**
 * Widget configuration options
 */
export interface CryptoMeACoffeeConfig {
  /**
   * Required: Your wallet address to receive donations
   * @example "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
   */
  walletAddress: string;

  /**
   * Required: Your x402 server endpoint
   * @example "https://your-api.vercel.app/api/donate"
   */
  apiEndpoint: string;

  /**
   * Optional: Creator name displayed in the widget
   * @default "this creator"
   */
  creatorName?: string;

  /**
   * Optional: Thank you message displayed after donation
   * @default "Thanks for the coffee!"
   */
  message?: string;

  /**
   * Optional: Primary color for the widget (hex color)
   * @default "#5F7FFF"
   */
  color?: string;

  /**
   * Optional: Widget position on screen
   * @default "Right"
   */
  position?: 'Left' | 'Right';

  /**
   * Optional: Horizontal margin in pixels
   * @default "18"
   */
  xMargin?: string | number;

  /**
   * Optional: Vertical margin in pixels
   * @default "18"
   */
  yMargin?: string | number;

  /**
   * Optional: Preset donation amounts in USD
   * @default [1, 3, 5]
   */
  presetAmounts?: number[];

  /**
   * Optional: Widget theme
   * @default "light"
   */
  theme?: 'light' | 'dark';

  /**
   * Optional: Blockchain network to use
   * @default "base-sepolia"
   */
  network?: 'base-sepolia' | 'base';

  /**
   * Optional: Custom logo URL
   * @default null
   */
  logoUrl?: string | null;

  /**
   * Optional: Minimum donation amount in USD
   * @default 0.01
   */
  minAmount?: number;

  /**
   * Optional: Maximum donation amount in USD
   * @default 1000000
   */
  maxAmount?: number;
}

/**
 * Widget state object
 */
export interface CryptoMeACoffeeState {
  /** Modal visibility state */
  modalOpen: boolean;
  /** Wallet connection status */
  connected: boolean;
  /** Loading state during transactions */
  loading: boolean;
  /** Error message if any */
  error: string | null;
  /** Currently selected preset amount */
  selectedAmount: number | null;
  /** Custom amount input value */
  customAmount: string;
  /** Connected user's wallet address */
  userAddress: string | null;
  /** Current blockchain chain ID */
  currentChainId: number | null;
  /** Supporter's message */
  message: string;
}

/**
 * Main CryptoMeACoffee Widget Class
 * 
 * @example
 * ```typescript
 * import CryptoMeACoffee from 'cryptomeacoffee';
 * 
 * const widget = new CryptoMeACoffee({
 *   walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
 *   apiEndpoint: 'https://your-api.vercel.app/api/donate',
 *   creatorName: 'Your Name',
 *   color: '#5F7FFF'
 * });
 * 
 * widget.render('donation-widget');
 * ```
 */
export default class CryptoMeACoffee {
  /** Widget configuration */
  config: CryptoMeACoffeeConfig;
  
  /** Current widget state */
  state: CryptoMeACoffeeState;
  
  /** DOM elements */
  elements: Record<string, HTMLElement>;
  
  /** Wallet client instance */
  walletClient: any;

  /**
   * Create a new CryptoMeACoffee widget
   * @param config - Widget configuration options
   * @throws {Error} If required config options are missing
   */
  constructor(config?: CryptoMeACoffeeConfig);

  /**
   * Render the widget into a DOM element
   * @param containerId - ID of the container element (without #)
   * @throws {Error} If container element is not found
   */
  render(containerId: string): void;

  /**
   * Check if a wallet is available in the browser
   * @returns {boolean} True if wallet is available
   */
  isWalletAvailable(): boolean;

  /**
   * Connect to the user's wallet
   * @returns {Promise<void>}
   */
  connectWallet(): Promise<void>;

  /**
   * Disconnect from the wallet
   */
  disconnect(): void;

  /**
   * Process a donation
   * @param amount - Donation amount in USD
   * @param message - Optional message from supporter
   * @returns {Promise<void>}
   */
  donate(amount: number, message?: string): Promise<void>;

  /**
   * Open the donation modal
   */
  openModal(): void;

  /**
   * Close the donation modal
   */
  closeModal(): void;

  /**
   * Destroy the widget and clean up
   */
  destroy(): void;
}

/**
 * Module exports
 */
export { CryptoMeACoffee };
