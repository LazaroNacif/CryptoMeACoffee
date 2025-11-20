# Logo Assets

## Current Status

The logos in this directory are **temporary placeholders** from Buy Me a Coffee branding.

## Placeholder Files

- `bmc-brand-icon.png` - Icon version (PNG)
- `bmc-brand-icon.svg` - Icon version (SVG) - **Recommended**
- `bmc-brand-logo.png` - Full logo (PNG)
- `bmc-brand-logo.svg` - Full logo (SVG) - **Recommended**

## Final Logo Requirements

When creating the final CryptoMeACoffee logos, ensure:

### Format Requirements
- **SVG format** (primary) - Scalable, small file size
- PNG exports at multiple sizes (16x16, 32x32, 48x48, 128x128, 256x256)

### Design Requirements
- Coffee + Crypto theme
- Works on both light and dark backgrounds
- Clean, recognizable at small sizes
- Professional appearance

### File Naming Convention
```
crypto-coffee-icon.svg       # Icon only (48x48 recommended size)
crypto-coffee-logo.svg       # Full logo with text
crypto-coffee-white.svg      # White version for dark backgrounds
crypto-coffee-dark.svg       # Dark version for light backgrounds
```

### Usage in Widget

```javascript
const widget = new CryptoMeACoffee({
  logoUrl: 'assets/logos/crypto-coffee-icon.svg',
  // ... other config
});
```

## Design Notes

- Keep file sizes small (< 20KB for SVG, < 50KB for PNG)
- Optimize SVG files using SVGO
- Consider animation possibilities for success states
- Ensure WCAG 2.1 AA contrast ratios

## TODO

- [ ] Design final logo concept
- [ ] Create icon version
- [ ] Create full logo version
- [ ] Export in multiple formats
- [ ] Add to repository
- [ ] Update widget demo
