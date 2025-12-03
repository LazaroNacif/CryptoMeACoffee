# Vanilla HTML Example

A simple demonstration of the CryptoMeACoffee widget using plain HTML, CSS, and JavaScript.

## How to Run

### Option 1: Direct File Open

Simply open `index.html` in your web browser:

```bash
open index.html
```

### Option 2: Local Server (Recommended)

For better testing, use a local server:

**Using Python:**

```bash
# Python 3
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

**Using Node.js (http-server):**

```bash
npx http-server -p 8000
```

**Using PHP:**

```bash
php -S localhost:8000
```

## What's Included

- **Floating Widget** - Non-intrusive button in bottom corner
- **Modal Popup** - Clean, centered donation interface
- **Message Support** - Supporters can include optional messages (500 chars)
- **x402 Integration** - Official client library with Viem
- **Auto-Initialization** - Zero JavaScript required
- **Responsive Design** - Works on all screen sizes

## Features Demonstrated

✅ **Floating button widget** - Bottom-right corner placement
✅ **Preset amount buttons** - $1, $3, $5 quick select
✅ **Custom amount input** - User-defined donation amounts
✅ **Message support** - Optional 500-character supporter messages
✅ **x402 protocol** - Gasless USDC donations via official client library
✅ **Wallet connection** - MetaMask, Coinbase Wallet, WalletConnect
✅ **Network detection** - Automatic Base Sepolia/Mainnet detection
✅ **Network switching** - Seamless network change prompts
✅ **Loading states** - Real-time transaction feedback
✅ **Success/error handling** - Clear user feedback messages
✅ **Responsive design** - Mobile and desktop support

## Testing the Widget

1. **Install a Web3 Wallet**:
   - [MetaMask](https://metamask.io)
   - [Coinbase Wallet](https://www.coinbase.com/wallet)

2. **Start the Backend Server**:

   ```bash
   cd ../../server-examples/express
   npm install
   npm start
   ```

3. **Open the Demo**:

   ```bash
   open index.html
   # or use a local server (recommended)
   python3 -m http.server 8000
   ```

4. **Test Flow**:
   - Click the floating coffee button in bottom-right
   - Select donation amount ($1, $3, $5, or Custom)
   - Optionally add a message (up to 500 characters)
   - Click "Support"
   - Widget connects to your wallet via x402 protocol
   - Approve the transaction
   - Receive confirmation message

## Configuration

The widget auto-initializes from script tag data attributes:

```html
<script
  data-name="CMAC-Widget"
  src="../../dist/widget.umd.js"
  data-wallet="0x..."                      <!-- Required: Your wallet address -->
  data-api="http://localhost:3000/api/donate"  <!-- Required: Backend endpoint -->
  data-creator-name="Your Name"            <!-- Optional: Display name in modal -->
  data-message="Thank you!"                <!-- Optional: Default thank you message -->
  data-color="#5F7FFF"                     <!-- Optional: Primary color (hex) -->
  data-position="Right"                    <!-- Optional: "Left" or "Right" -->
  data-x_margin="18"                       <!-- Optional: Horizontal margin (px) -->
  data-y_margin="18"                       <!-- Optional: Vertical margin (px) -->
  data-network="base-sepolia"              <!-- Optional: "base-sepolia" or "base" -->
  data-logo-url="/path/to/logo.svg"        <!-- Optional: Custom logo URL -->
></script>
```

### Available Options

| Attribute           | Type   | Required | Default        | Description                                     |
| ------------------- | ------ | -------- | -------------- | ----------------------------------------------- |
| `data-wallet`       | string | ✅       | -              | Your wallet address where donations are sent    |
| `data-api`          | string | ✅       | -              | Your backend x402 endpoint                      |
| `data-creator-name` | string | ❌       | -              | Display name shown in the modal header          |
| `data-message`      | string | ❌       | "Thank you!"   | Default thank you message                       |
| `data-color`        | string | ❌       | "#5F7FFF"      | Primary color for the floating button (hex)     |
| `data-position`     | string | ❌       | "Right"        | Position of floating button ("Left" or "Right") |
| `data-x_margin`     | number | ❌       | 18             | Horizontal margin from edge (pixels)            |
| `data-y_margin`     | number | ❌       | 18             | Vertical margin from bottom (pixels)            |
| `data-network`      | string | ❌       | "base-sepolia" | Blockchain network ("base-sepolia" or "base")   |
| `data-logo-url`     | string | ❌       | -              | Custom logo/icon URL for branding               |
