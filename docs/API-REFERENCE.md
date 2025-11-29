# CryptoMeACoffee - API Reference

Complete API documentation for developers integrating the CryptoMeACoffee widget.

---

## 📋 Table of Contents

1. [Constructor](#constructor)
2. [Configuration Options](#configuration-options)
3. [Methods](#methods)
4. [Data Attributes](#data-attributes-auto-initialization)
5. [Events](#events)
6. [Error Codes](#error-codes)
7. [TypeScript](#typescript)
8. [Examples](#examples)

---

## Constructor

### `new CryptoMeACoffee(config)`

Creates a new donation widget instance.

```javascript
import CryptoMeACoffee from 'cryptomeacoffee';
import 'cryptomeacoffee/styles.css';

const widget = new CryptoMeACoffee({
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  apiEndpoint: 'https://api.example.com/api/donate',
  creatorName: 'Alice',
  color: '#FF6B6B',
});

widget.render();
```

---

## Configuration Options

### Required Parameters

| Parameter       | Type     | Description                                                                                    |
| --------------- | -------- | ---------------------------------------------------------------------------------------------- |
| `walletAddress` | `string` | **Required.** Your Base network wallet address (0x...) where donations will be sent            |
| `apiEndpoint`   | `string` | **Required.** Your server's donation endpoint URL (e.g., `https://api.example.com/api/donate`) |

### Display Options

| Parameter     | Type     | Default                    | Description                                                |
| ------------- | -------- | -------------------------- | ---------------------------------------------------------- |
| `creatorName` | `string` | `"this creator"`           | Name displayed in the modal header (e.g., "Support Alice") |
| `message`     | `string` | `"Thanks for the coffee!"` | Success message shown after donation                       |
| `color`       | `string` | `"#5F7FFF"`                | Primary color for button and UI elements (hex color code)  |

**Example:**

```javascript
{
  creatorName: 'Alice',
  message: 'Thank you for supporting my work!',
  color: '#FF6B6B'
}
```

---

### Position & Layout

| Parameter  | Type               | Default   | Description                                      |
| ---------- | ------------------ | --------- | ------------------------------------------------ |
| `position` | `string`           | `"Right"` | Button position on screen: `"Left"` or `"Right"` |
| `xMargin`  | `string \| number` | `"18"`    | Horizontal margin from screen edge (pixels)      |
| `yMargin`  | `string \| number` | `"18"`    | Vertical margin from screen bottom (pixels)      |

**Example:**

```javascript
{
  position: 'Left',
  xMargin: 20,
  yMargin: 20
}
```

---

### Donation Options

| Parameter       | Type       | Default     | Description                             |
| --------------- | ---------- | ----------- | --------------------------------------- |
| `presetAmounts` | `number[]` | `[1, 3, 5]` | Array of preset donation amounts in USD |
| `minAmount`     | `number`   | `0.01`      | Minimum allowed donation amount (USD)   |
| `maxAmount`     | `number`   | `1000000`   | Maximum allowed donation amount (USD)   |

**Example:**

```javascript
{
  presetAmounts: [5, 10, 20, 50],
  minAmount: 1,
  maxAmount: 10000
}
```

---

### Network & Theme

| Parameter | Type             | Default          | Description                                                          |
| --------- | ---------------- | ---------------- | -------------------------------------------------------------------- |
| `network` | `string`         | `"base-sepolia"` | Blockchain network: `"base-sepolia"` (testnet) or `"base"` (mainnet) |
| `theme`   | `string`         | `"light"`        | Color theme: `"light"` or `"dark"`                                   |
| `logoUrl` | `string \| null` | `null`           | Optional custom logo URL (shown in modal header)                     |

**Example:**

```javascript
{
  network: 'base',  // Mainnet
  theme: 'dark',
  logoUrl: 'https://yoursite.com/logo.png'
}
```

---

### Complete Configuration Example

```javascript
const widget = new CryptoMeACoffee({
  // Required
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  apiEndpoint: 'https://api.example.com/api/donate',

  // Display
  creatorName: 'Alice',
  message: 'Thanks for the support!',
  color: '#FF6B6B',

  // Position
  position: 'Right',
  xMargin: 18,
  yMargin: 18,

  // Donation amounts
  presetAmounts: [3, 5, 10],
  minAmount: 0.01,
  maxAmount: 1000,

  // Network & theme
  network: 'base-sepolia',
  theme: 'light',
  logoUrl: null,
});
```

---

## Methods

### `render(containerId?)`

Renders the widget into the specified container or document body.

**Parameters:**

- `containerId` (string, optional): ID of the container element. Defaults to `'body'`.

**Returns:** `void`

**Example:**

```javascript
// Render to body (default)
widget.render();

// Render to specific container
widget.render('donation-widget');
```

```html
<div id="donation-widget"></div>
<script>
  widget.render('donation-widget');
</script>
```

---

### `destroy()`

Removes the widget from the DOM and cleans up event listeners.

**Parameters:** None

**Returns:** `void`

**Example:**

```javascript
// Clean up widget when no longer needed
widget.destroy();
```

**Use cases:**

- Single-page applications (SPA) cleanup
- Conditional widget display
- Testing/debugging

---

### Internal Methods (Not Public API)

The following methods are internal and should not be called directly:

- `validateConfig()` - Validates configuration on initialization
- `initializeNetworkConfig()` - Sets up network configuration
- `connectWallet()` - Initiates wallet connection
- `switchNetwork()` - Prompts user to switch networks
- `processPayment()` - Handles x402 payment flow
- `openModal()` / `closeModal()` - Modal state management
- `resetForm()` - Resets form state

---

## Data Attributes (Auto-Initialization)

The widget can auto-initialize from HTML `data-*` attributes on the script tag.

### Basic Usage

```html
<script
  src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
  data-wallet="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  data-api="https://api.example.com/api/donate"
></script>
```

### All Attributes

| Attribute           | Maps To         | Type   | Example                       |
| ------------------- | --------------- | ------ | ----------------------------- |
| `data-wallet`       | `walletAddress` | string | `data-wallet="0x..."`         |
| `data-api`          | `apiEndpoint`   | string | `data-api="https://..."`      |
| `data-creator-name` | `creatorName`   | string | `data-creator-name="Alice"`   |
| `data-message`      | `message`       | string | `data-message="Thanks!"`      |
| `data-color`        | `color`         | string | `data-color="#FF6B6B"`        |
| `data-position`     | `position`      | string | `data-position="Left"`        |
| `data-margin-x`     | `xMargin`       | number | `data-margin-x="20"`          |
| `data-margin-y`     | `yMargin`       | number | `data-margin-y="20"`          |
| `data-network`      | `network`       | string | `data-network="base"`         |
| `data-theme`        | `theme`         | string | `data-theme="dark"`           |
| `data-logo-url`     | `logoUrl`       | string | `data-logo-url="https://..."` |

### Complete Example

```html
<script
  src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
  data-wallet="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  data-api="https://api.example.com/api/donate"
  data-creator-name="Alice"
  data-message="Thanks for the coffee!"
  data-color="#FF6B6B"
  data-position="Right"
  data-margin-x="18"
  data-margin-y="18"
  data-network="base-sepolia"
  data-theme="light"
></script>
```

---

## Events

**Note:** The widget currently does not expose custom events. This is a planned feature for future releases.

### Planned Events (Future)

```javascript
// Future API (not yet implemented)
widget.on('donation:start', (data) => {
  console.log('Donation started', data);
});

widget.on('donation:success', (data) => {
  console.log('Donation successful', data);
});

widget.on('donation:error', (error) => {
  console.error('Donation failed', error);
});
```

**Workaround:** For now, use server-side webhooks or email notifications to track donations.

---

## Error Codes

### Widget Initialization Errors

| Code            | Message                     | Cause                             | Solution                         |
| --------------- | --------------------------- | --------------------------------- | -------------------------------- |
| `CONFIG_ERROR`  | "walletAddress is required" | Missing `walletAddress` in config | Provide valid wallet address     |
| `CONFIG_ERROR`  | "apiEndpoint is required"   | Missing `apiEndpoint` in config   | Provide server endpoint URL      |
| `NETWORK_ERROR` | "Unsupported network: xxx"  | Invalid network name              | Use `"base-sepolia"` or `"base"` |

**Example:**

```javascript
try {
  const widget = new CryptoMeACoffee({
    // Missing walletAddress
    apiEndpoint: 'https://...',
  });
} catch (error) {
  console.error(error.message);
  // "CryptoMeACoffee: walletAddress is required"
}
```

---

### Wallet Connection Errors

| Code            | Message                           | Cause                         | Solution                              |
| --------------- | --------------------------------- | ----------------------------- | ------------------------------------- |
| `NO_WALLET`     | "No Web3 wallet detected"         | No wallet extension installed | Install MetaMask or Coinbase Wallet   |
| `WRONG_NETWORK` | "Please switch to Base Sepolia"   | User on different network     | Prompt user to switch (auto-prompted) |
| `USER_REJECTED` | "User rejected wallet connection" | User declined in wallet       | Ask user to approve connection        |
| `WALLET_ERROR`  | Various                           | Wallet extension error        | Check wallet extension, try reloading |

---

### Payment Errors

| Code                 | Message                       | Cause                                 | Solution                                |
| -------------------- | ----------------------------- | ------------------------------------- | --------------------------------------- |
| `INVALID_AMOUNT`     | "Please enter a valid amount" | Amount is 0, negative, or non-numeric | Enter valid amount ($0.01 - $1,000,000) |
| `AMOUNT_TOO_LOW`     | "Amount below minimum"        | Amount < minAmount                    | Increase amount                         |
| `AMOUNT_TOO_HIGH`    | "Amount above maximum"        | Amount > maxAmount                    | Decrease amount                         |
| `PAYMENT_FAILED`     | "Payment failed (status)"     | Various payment issues                | Check console for details               |
| `INSUFFICIENT_FUNDS` | "Insufficient USDC balance"   | Not enough USDC in wallet             | Add USDC to wallet                      |
| `NETWORK_TIMEOUT`    | "Network request timeout"     | Slow/failed network request           | Try again, check internet connection    |

---

### Server Errors

| HTTP Status | Message               | Cause                       | Solution                           |
| ----------- | --------------------- | --------------------------- | ---------------------------------- |
| `400`       | "Invalid request"     | Validation failed on server | Check amount and message           |
| `402`       | "Payment Required"    | Normal x402 flow            | Widget handles automatically       |
| `429`       | "Too many requests"   | Rate limit exceeded         | Wait 15 minutes, try again         |
| `500`       | "Server error"        | Server-side issue           | Check server logs, contact support |
| `503`       | "Service unavailable" | Server down                 | Check server status, try later     |

---

### Error Handling Example

```javascript
// The widget displays errors automatically in the UI
// For custom error handling, check browser console

// Server-side validation example
app.post('/api/donate', validateDonation, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  // Process donation...
});
```

---

## TypeScript

TypeScript definitions are available (requires v1.1.0+).

### Installation

```bash
npm install cryptomeacoffee
```

### Type Definitions

```typescript
interface CryptoMeACoffeeConfig {
  // Required
  walletAddress: string;
  apiEndpoint: string;

  // Display
  creatorName?: string;
  message?: string;
  color?: string;

  // Position
  position?: 'Left' | 'Right';
  xMargin?: string | number;
  yMargin?: string | number;

  // Donation amounts
  presetAmounts?: number[];
  minAmount?: number;
  maxAmount?: number;

  // Network & theme
  network?: 'base-sepolia' | 'base';
  theme?: 'light' | 'dark';
  logoUrl?: string | null;
}

interface WidgetState {
  modalOpen: boolean;
  connected: boolean;
  loading: boolean;
  error: string | null;
  selectedAmount: number | null;
  customAmount: string;
  userAddress: string | null;
  currentChainId: number | null;
  message: string;
}

declare class CryptoMeACoffee {
  constructor(config: CryptoMeACoffeeConfig);

  config: CryptoMeACoffeeConfig;
  state: WidgetState;

  render(containerId?: string): void;
  destroy(): void;
}

export default CryptoMeACoffee;
```

### TypeScript Usage

```typescript
import CryptoMeACoffee, { CryptoMeACoffeeConfig } from 'cryptomeacoffee';
import 'cryptomeacoffee/styles.css';

const config: CryptoMeACoffeeConfig = {
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  apiEndpoint: 'https://api.example.com/api/donate',
  creatorName: 'Alice',
  color: '#FF6B6B',
  network: 'base-sepolia',
  theme: 'light',
};

const widget = new CryptoMeACoffee(config);
widget.render();
```

---

## Examples

### React Integration

```jsx
import React, { useEffect, useRef } from 'react';
import CryptoMeACoffee from 'cryptomeacoffee';
import 'cryptomeacoffee/styles.css';

function DonationWidget() {
  const widgetRef = useRef(null);

  useEffect(() => {
    const widget = new CryptoMeACoffee({
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      apiEndpoint: 'https://api.example.com/api/donate',
      creatorName: 'Alice',
    });

    widget.render();
    widgetRef.current = widget;

    // Cleanup on unmount
    return () => {
      widget.destroy();
    };
  }, []);

  return <div id="donation-widget" />;
}

export default DonationWidget;
```

---

### Next.js Integration

```jsx
// components/DonationWidget.js
'use client';

import { useEffect } from 'react';
import CryptoMeACoffee from 'cryptomeacoffee';
import 'cryptomeacoffee/styles.css';

export default function DonationWidget() {
  useEffect(() => {
    const widget = new CryptoMeACoffee({
      walletAddress: process.env.NEXT_PUBLIC_WALLET_ADDRESS,
      apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
      creatorName: 'Alice',
      color: '#FF6B6B',
    });

    widget.render();

    return () => widget.destroy();
  }, []);

  return null; // Widget renders to body
}
```

```jsx
// app/page.js
import DonationWidget from '@/components/DonationWidget';

export default function Home() {
  return (
    <div>
      <h1>My Website</h1>
      <DonationWidget />
    </div>
  );
}
```

---

### Vue Integration

```vue
<template>
  <div id="app">
    <h1>My Website</h1>
  </div>
</template>

<script>
import CryptoMeACoffee from 'cryptomeacoffee';
import 'cryptomeacoffee/styles.css';

export default {
  name: 'App',

  mounted() {
    this.widget = new CryptoMeACoffee({
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      apiEndpoint: 'https://api.example.com/api/donate',
      creatorName: 'Alice',
    });

    this.widget.render();
  },

  beforeUnmount() {
    if (this.widget) {
      this.widget.destroy();
    }
  },
};
</script>
```

---

### Vanilla HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Website</title>
    <link rel="stylesheet" href="https://unpkg.com/cryptomeacoffee@1/src/styles.css" />
  </head>
  <body>
    <h1>My Website</h1>

    <!-- Widget auto-initializes -->
    <script
      src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
      data-wallet="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
      data-api="https://api.example.com/api/donate"
      data-creator-name="Alice"
      data-color="#FF6B6B"
    ></script>
  </body>
</html>
```

---

### WordPress Integration

Add to your theme's `footer.php` before `</body>`:

```html
<link rel="stylesheet" href="https://unpkg.com/cryptomeacoffee@1/src/styles.css" />
<script
  src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
  data-wallet="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  data-api="https://your-server.com/api/donate"
  data-creator-name="<?php bloginfo('name'); ?>"
></script>
```

---

### Dynamic Configuration

```javascript
// Load config from API
fetch('/api/widget-config')
  .then((res) => res.json())
  .then((config) => {
    const widget = new CryptoMeACoffee({
      walletAddress: config.walletAddress,
      apiEndpoint: config.apiEndpoint,
      creatorName: config.creatorName,
      color: config.brandColor,
    });

    widget.render();
  });
```

---

## Version History

### v1.1.0 (Current)

- ✅ x402 protocol integration
- ✅ Gasless donations for users
- ✅ Custom amount support
- ✅ Message support (500 chars)
- ✅ Light/dark themes
- ✅ Network detection & switching
- ✅ TypeScript definitions

### v1.0.0

- Initial release

---

## Support

- **Documentation:** [Setup Guide](./SETUP-GUIDE.md) | [Customization](./CUSTOMIZATION.md) | [FAQ](./FAQ.md)
- **Issues:** [GitHub Issues](https://github.com/yourusername/cryptomeacoffee/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/cryptomeacoffee/discussions)
- **x402 Docs:** [x402.org/docs](https://x402.org/docs)

---

**Last Updated:** November 29, 2025
**Version:** 1.1.0
