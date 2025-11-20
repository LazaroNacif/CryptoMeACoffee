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

- **Light Theme Widget** - Clean, modern light design
- **Dark Theme Widget** - Sleek dark mode design
- **Custom Amounts** - Users can enter any amount
- **Responsive Design** - Works on all screen sizes
- **Theme Toggle** - Switch page background theme

## Features Demonstrated

✅ Preset amount buttons ($1, $3, $5)
✅ Custom amount modal
✅ Light/dark theme support
✅ Responsive design
✅ Loading states
✅ Error/success messages
✅ Accessible UI
✅ **Wallet connection** (MetaMask, Coinbase Wallet)
✅ **Network detection** (Base Sepolia/Mainnet)
✅ **Network switching** (automatic prompts)

## Testing Wallet Connection

1. **Install a Web3 Wallet**:
   - [MetaMask](https://metamask.io)
   - [Coinbase Wallet](https://www.coinbase.com/wallet)

2. **Open the Demo**:
   ```bash
   open index.html
   # or use a local server (recommended)
   python3 -m http.server 8000
   ```

3. **Test Flow**:
   - Click any donation amount ($1, $3, $5, or Custom)
   - Click "Connect Wallet"
   - Approve the connection in your wallet
   - Widget will detect your network
   - If not on Base Sepolia, you'll be prompted to switch
   - After connection, button shows your address (e.g., "Connected: 0x1234...5678")

## Next Steps

Payment signing and x402 integration will be added in the next sprint.

## Configuration

The widget accepts these options:

```javascript
{
  walletAddress: 'your-wallet-address',    // Required: where donations go
  apiEndpoint: 'your-api-endpoint',        // Required: your backend URL
  presetAmounts: [1, 3, 5],                // Optional: preset donation amounts
  theme: 'light',                          // Optional: 'light' or 'dark'
  network: 'base-sepolia',                 // Optional: blockchain network
  buttonText: '☕ Buy me a coffee',        // Optional: main button text
  successMessage: 'Thank you!',            // Optional: success message
  logoUrl: '/path/to/logo.svg',            // Optional: logo/icon URL
  minAmount: 0.01,                         // Optional: minimum donation
  maxAmount: 1000                          // Optional: maximum donation
}
```
