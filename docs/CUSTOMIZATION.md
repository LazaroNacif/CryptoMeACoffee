# CryptoMeACoffee - Customization Guide

Make the donation widget match your brand and style.

---

## 📋 Table of Contents

1. [Quick Customization](#quick-customization)
2. [CSS Variables](#css-variables)
3. [Custom Themes](#custom-themes)
4. [Position & Layout](#position--layout)
5. [Colors & Branding](#colors--branding)
6. [Advanced Styling](#advanced-styling)
7. [Examples](#examples)

---

## ⚡ Quick Customization

The easiest way to customize is through configuration options:

```html
<script
  src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
  data-wallet="0x..."
  data-api="https://..."
  data-creator-name="Alice"
  data-color="#FF6B6B"          <!-- Brand color -->
  data-position="Left"           <!-- Left or Right -->
  data-theme="dark"              <!-- Light or dark -->
  data-margin-x="20"             <!-- Distance from edge -->
  data-margin-y="20">            <!-- Distance from bottom -->
</script>
```

---

## 🎨 CSS Variables

CryptoMeACoffee uses CSS custom properties (variables) for deep customization.

### Colors

| Variable                  | Default (Light)    | Default (Dark)    | Description                   |
| ------------------------- | ------------------ | ----------------- | ----------------------------- |
| `--cmac-primary`          | `#000000`          | `#ffffff`         | Primary text/icon color       |
| `--cmac-primary-hover`    | `#333333`          | `#e0e0e0`         | Hover state                   |
| `--cmac-accent`           | `#5F7FFF`          | `#5F7FFF`         | Accent color (buttons, links) |
| `--cmac-accent-hover`     | `#4a6adb`          | `#4a6adb`         | Accent hover state            |
| `--cmac-success`          | `#00D084`          | `#00D084`         | Success messages              |
| `--cmac-error`            | `#FF4444`          | `#FF4444`         | Error messages                |
| `--cmac-bg`               | `#ffffff`          | `#1a1a1a`         | Background color              |
| `--cmac-bg-secondary`     | `#f5f5f5`          | `#2a2a2a`         | Secondary background          |
| `--cmac-text-primary`     | `#000000`          | `#ffffff`         | Primary text                  |
| `--cmac-text-secondary`   | `#666666`          | `#a0a0a0`         | Secondary text                |
| `--cmac-text-placeholder` | `#999999`          | `#666666`         | Placeholder text              |
| `--cmac-border`           | `#e0e0e0`          | `#404040`         | Border color                  |
| `--cmac-shadow`           | `rgba(0,0,0,0.08)` | `rgba(0,0,0,0.3)` | Box shadow                    |
| `--cmac-overlay`          | `rgba(0,0,0,0.6)`  | `rgba(0,0,0,0.8)` | Modal overlay                 |

### Spacing

| Variable             | Value            | Description         |
| -------------------- | ---------------- | ------------------- |
| `--cmac-spacing-xs`  | `0.25rem` (4px)  | Extra small spacing |
| `--cmac-spacing-sm`  | `0.5rem` (8px)   | Small spacing       |
| `--cmac-spacing-md`  | `0.75rem` (12px) | Medium spacing      |
| `--cmac-spacing-lg`  | `1rem` (16px)    | Large spacing       |
| `--cmac-spacing-xl`  | `1.5rem` (24px)  | Extra large spacing |
| `--cmac-spacing-2xl` | `2rem` (32px)    | 2X large spacing    |

### Border Radius

| Variable             | Value            | Description           |
| -------------------- | ---------------- | --------------------- |
| `--cmac-radius-sm`   | `0.375rem` (6px) | Small corners         |
| `--cmac-radius-md`   | `0.75rem` (12px) | Medium corners        |
| `--cmac-radius-lg`   | `1.25rem` (20px) | Large corners         |
| `--cmac-radius-xl`   | `1.5rem` (24px)  | Extra large corners   |
| `--cmac-radius-full` | `9999px`         | Fully rounded (pills) |

### Transitions

| Variable                 | Value           | Description        |
| ------------------------ | --------------- | ------------------ |
| `--cmac-transition`      | `all 0.2s ease` | Default transition |
| `--cmac-transition-slow` | `all 0.3s ease` | Slow transition    |

---

## 🎨 Custom Themes

### Method 1: Override CSS Variables

Add custom CSS after loading the widget stylesheet:

```html
<link rel="stylesheet" href="https://unpkg.com/cryptomeacoffee@1/src/styles.css" />

<style>
  :root {
    /* Your brand colors */
    --cmac-accent: #ff6b6b;
    --cmac-accent-hover: #ff5252;

    /* Custom button */
    --cmac-bg: #ffffff;
    --cmac-border: #eeeeee;

    /* Rounded corners */
    --cmac-radius-md: 1rem;
    --cmac-radius-lg: 1.5rem;
  }
</style>
```

---

### Method 2: Theme Presets

#### Minimal Theme

```css
:root {
  --cmac-accent: #000000;
  --cmac-accent-hover: #333333;
  --cmac-border: #000000;
  --cmac-radius-md: 0;
  --cmac-radius-lg: 0;
  --cmac-shadow: none;
}
```

#### Gradient Theme

```css
:root {
  --cmac-accent: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --cmac-accent-hover: linear-gradient(135deg, #5568d3 0%, #63408b 100%);
}
```

#### Neon Theme

```css
:root {
  --cmac-accent: #00ff88;
  --cmac-accent-hover: #00dd77;
  --cmac-bg: #0a0a0a;
  --cmac-text-primary: #00ff88;
  --cmac-border: #00ff88;
  --cmac-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}
```

#### Glassmorphism Theme

```css
:root {
  --cmac-bg: rgba(255, 255, 255, 0.1);
  --cmac-border: rgba(255, 255, 255, 0.2);
  --cmac-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

[data-name='CMAC-Widget'] {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
```

---

## 📐 Position & Layout

### Button Position

```javascript
// Configuration
{
  position: 'Left',    // or 'Right'
  xMargin: 20,         // Pixels from edge
  yMargin: 20          // Pixels from bottom
}
```

```html
<!-- HTML -->
<script data-position="Left" data-margin-x="20" data-margin-y="20"></script>
```

### Custom Positioning with CSS

```css
/* Override default position */
[data-name='CMAC-Widget'] .cmac-button {
  /* Top right instead of bottom */
  bottom: auto !important;
  top: 20px !important;
  right: 20px !important;
}
```

```css
/* Center button at bottom */
[data-name='CMAC-Widget'] .cmac-button {
  left: 50% !important;
  right: auto !important;
  transform: translateX(-50%) !important;
}
```

---

## 🎨 Colors & Branding

### Brand Color Integration

Set your primary brand color:

```javascript
{
  color: '#FF6B6B'; // Your brand color
}
```

This affects:

- Button background
- Accent elements
- Active states
- Progress indicators

---

### Multi-Color Branding

```css
:root {
  /* Primary brand color */
  --cmac-accent: #ff6b6b;

  /* Secondary brand color */
  --cmac-bg-secondary: #fff5f5;

  /* Text matches brand */
  --cmac-text-primary: #2d3748;

  /* Success uses brand green */
  --cmac-success: #00d084;
}
```

---

### Logo Integration

```javascript
{
  logoUrl: 'https://yoursite.com/logo.png';
}
```

```html
<script data-logo-url="https://yoursite.com/logo.png"></script>
```

**Logo specs:**

- Recommended size: 120x120px
- Format: PNG with transparency
- Appears in modal header

---

## 🔧 Advanced Styling

### Custom Button Styles

```css
/* Make button larger */
[data-name='CMAC-Widget'] .cmac-button {
  width: 80px !important;
  height: 80px !important;
  font-size: 32px !important;
}

/* Pulse animation */
[data-name='CMAC-Widget'] .cmac-button {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Custom shadow */
[data-name='CMAC-Widget'] .cmac-button {
  box-shadow: 0 10px 40px rgba(95, 127, 255, 0.3);
}
```

---

### Custom Modal Styles

```css
/* Larger modal */
[data-name='CMAC-Widget'] .cmac-modal-content {
  max-width: 600px !important;
  padding: 3rem !important;
}

/* Custom backdrop */
[data-name='CMAC-Widget'] .cmac-modal-overlay {
  background: rgba(0, 0, 0, 0.8) !important;
  backdrop-filter: blur(5px) !important;
}

/* Animated entrance */
[data-name='CMAC-Widget'] .cmac-modal-content {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

### Custom Input Styles

```css
/* Rounded inputs */
[data-name='CMAC-Widget'] input {
  border-radius: 50px !important;
  padding: 1rem 1.5rem !important;
}

/* Underline style */
[data-name='CMAC-Widget'] input {
  border: none !important;
  border-bottom: 2px solid var(--cmac-border) !important;
  border-radius: 0 !important;
  background: transparent !important;
}

/* Focus effect */
[data-name='CMAC-Widget'] input:focus {
  border-color: var(--cmac-accent) !important;
  box-shadow: 0 4px 12px rgba(95, 127, 255, 0.15) !important;
}
```

---

### Custom Button Text

```css
/* Hide default coffee emoji */
[data-name='CMAC-Widget'] .cmac-button::before {
  content: '💝' !important; /* Heart instead of coffee */
}

/* Add text below icon */
[data-name='CMAC-Widget'] .cmac-button::after {
  content: 'Support';
  display: block;
  font-size: 10px;
  margin-top: 4px;
}
```

---

## 💡 Examples

### Example 1: Minimal Black & White

```html
<style>
  :root {
    --cmac-accent: #000000;
    --cmac-accent-hover: #333333;
    --cmac-bg: #ffffff;
    --cmac-text-primary: #000000;
    --cmac-border: #000000;
    --cmac-radius-md: 0;
    --cmac-radius-lg: 0;
  }
</style>

<script
  src="https://unpkg.com/cryptomeacoffee@1/dist/widget.umd.js"
  data-wallet="0x..."
  data-api="https://..."
  data-color="#000000"
  data-theme="light"
></script>
```

---

### Example 2: Vibrant & Colorful

```html
<style>
  :root {
    --cmac-accent: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --cmac-bg: #ffffff;
    --cmac-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
  }
</style>

<script data-color="#667eea" data-theme="light"></script>
```

---

### Example 3: Dark Mode Optimized

```html
<style>
  :root {
    --cmac-bg: #1a1a1a;
    --cmac-bg-secondary: #2a2a2a;
    --cmac-text-primary: #ffffff;
    --cmac-border: #404040;
    --cmac-accent: #00d084;
  }
</style>

<script data-color="#00D084" data-theme="dark"></script>
```

---

### Example 4: Retro/Gaming Theme

```html
<style>
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  :root {
    --cmac-accent: #00ff00;
    --cmac-bg: #000000;
    --cmac-text-primary: #00ff00;
    --cmac-border: #00ff00;
    --cmac-radius-md: 0;
    font-family: 'Press Start 2P', monospace !important;
  }

  [data-name='CMAC-Widget'] * {
    font-family: 'Press Start 2P', monospace !important;
    image-rendering: pixelated;
  }
</style>

<script data-color="#00ff00" data-theme="dark"></script>
```

---

### Example 5: Glassmorphism (iOS Style)

```html
<style>
  :root {
    --cmac-bg: rgba(255, 255, 255, 0.7);
    --cmac-border: rgba(255, 255, 255, 0.3);
    --cmac-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  }

  [data-name='CMAC-Widget'] .cmac-modal-content {
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    background: rgba(255, 255, 255, 0.7) !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
  }
</style>
```

---

## 🎯 Best Practices

### Do's ✅

- **Match your brand:** Use your existing color palette
- **Test both themes:** Ensure light and dark modes work
- **Mobile-first:** Test on small screens
- **Accessibility:** Maintain sufficient color contrast (WCAG AA: 4.5:1)
- **Performance:** Keep CSS overrides minimal

### Don'ts ❌

- **Don't hide required elements:** Users need to see amounts, inputs, etc.
- **Don't break functionality:** Avoid `display: none` on interactive elements
- **Don't use `!important` excessively:** CSS variables are cleaner
- **Don't make text unreadable:** Ensure contrast ratios

---

## 🔍 Debugging Custom Styles

### Browser DevTools

1. Right-click widget → Inspect Element
2. Find element classes (`.cmac-button`, `.cmac-modal`, etc.)
3. Test styles in DevTools first
4. Copy working styles to your CSS

### CSS Specificity

If your styles aren't applying:

```css
/* Increase specificity */
[data-name='CMAC-Widget'] .cmac-button {
  /* Your styles */
}

/* Or use !important (last resort) */
.cmac-button {
  color: #ff6b6b !important;
}
```

---

## 📱 Responsive Customization

### Mobile-Specific Styles

```css
/* Smaller button on mobile */
@media (max-width: 768px) {
  [data-name='CMAC-Widget'] .cmac-button {
    width: 50px !important;
    height: 50px !important;
    font-size: 20px !important;
  }
}

/* Full-screen modal on mobile */
@media (max-width: 640px) {
  [data-name='CMAC-Widget'] .cmac-modal-content {
    width: 100% !important;
    height: 100vh !important;
    max-width: none !important;
    border-radius: 0 !important;
  }
}
```

---

## 🌐 Framework-Specific Styling

### React/Next.js

```jsx
// styles/widget.css
import 'cryptomeacoffee/styles.css';

:root {
  --cmac-accent: #FF6B6B;
}
```

### Vue

```vue
<style scoped>
:deep([data-name='CMAC-Widget']) {
  --cmac-accent: #ff6b6b;
}
</style>
```

### Tailwind CSS

```html
<style>
  [data-name='CMAC-Widget'] {
    @apply font-sans;
    --cmac-accent: theme('colors.blue.500');
    --cmac-bg: theme('colors.white');
  }
</style>
```

---

## 📚 Additional Resources

- **Design Inspiration:** [Dribbble](https://dribbble.com/search/donate-button)
- **Color Palettes:** [Coolors](https://coolors.co)
- **Accessibility:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **CSS Variables Guide:** [MDN CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

## 🆘 Need Help?

- **Examples:** See `/examples` directory in repository
- **Questions:** [GitHub Discussions](https://github.com/yourusername/cryptomeacoffee/discussions)
- **Issues:** [GitHub Issues](https://github.com/yourusername/cryptomeacoffee/issues)

---

**Happy customizing! 🎨**
