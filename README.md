# Bynn Verification SDK

A JavaScript SDK for integrating Bynn's identity verification service into web applications.

## Installation

```bash
npm install @bynn-intelligence/verify
```

## Basic Usage

```javascript
import { Bynn } from '@bynn-intelligence/verify';

const bynn = Bynn({
  apiKey: 'your_api_key',
  parentId: 'verification-form',
  fields: [
    { name: 'first_name', visible: true },
    { name: 'last_name', visible: true },
    { name: 'email_address', visible: true },
    { name: 'phone_number', visible: true }
  ]
});

bynn.mount();
```

## Configuration Options

### Fields Configuration

The `fields` array accepts objects with the following properties:

```javascript
{
  name: string;       // Field name (required)
  visible: boolean;   // Whether to show the field (default: true)
  value: string;      // Pre-filled value (optional)
  label: string;      // Custom label text (optional)
}
```

Available field names:
- `first_name`
- `last_name`
- `email_address`
- `phone_number`
- `unique_id`

Example with all options:
```javascript
const bynn = Bynn({
  apiKey: 'your_api_key',
  parentId: 'verification-form',
  fields: [
    { 
      name: 'first_name',
      visible: true,
      label: 'Given Name',
      value: 'John'
    },
    {
      name: 'unique_id',
      visible: false,
      value: 'USER123'
    }
  ]
});
```

### Customizing Text

You can customize button and loading text:

```javascript
bynn.mount({
  submitBtnText: 'Verify Identity',
  loadingText: 'Please wait...'
});
```

### Event Handling

Handle verification session events:

```javascript
const bynn = Bynn({
  // ...other options
  onSession: (error, response) => {
    if (error) {
      console.error('Verification error:', error);
      return;
    }
    console.log('Verification started:', response);
  }
});
```

## Styling

The SDK uses CSS custom properties (variables) for styling. Override these variables to customize the appearance:

```css
:root {
  /* Primary colors */
  --bynn-primary: #6366F1;
  --bynn-primary-hover: #4F46E5;
  --bynn-primary-disabled: #C7D2FE;
  --bynn-primary-light: #EEF2FF;
  
  /* Background colors */
  --bynn-bg-white: #FFFFFF;
  --bynn-bg-input: #F9FAFB;
  
  /* Neutral colors */
  --bynn-neutral-50: #F9FAFB;
  --bynn-neutral-100: #F3F4F6;
  --bynn-neutral-200: #E5E7EB;
  --bynn-neutral-300: #D1D5DB;
  --bynn-neutral-600: #4B5563;
  --bynn-neutral-800: #1F2937;
}
```

### CSS Classes

You can also style specific elements using these CSS classes:

- `.bynn-form` - The form container
- `.bynn-input-wrapper` - Input field wrapper
- `.bynn-input` - Input fields
- `.bynn-submit` - Submit button
- `.bynn-description` - Footer text
- `.bynn-modal-overlay` - Verification modal overlay
- `.bynn-modal-container` - Modal container
- `.bynn-modal-content` - Modal content
- `.bynn-modal-close` - Modal close button

Example custom styles:

```css
.bynn-form {
  max-width: 500px;
  padding: 2rem;
}

.bynn-input {
  border-radius: 8px;
  border: 2px solid var(--bynn-neutral-200);
}

.bynn-submit {
  background: var(--bynn-primary);
  font-weight: 600;
}
```

## Internationalization

Set the language for the verification interface:

```javascript
const bynn = Bynn({
  apiKey: 'your_api_key',
  parentId: 'verification-form',
  i18n: 'en-US' // Language code
});
```

## API Reference

### Bynn Configuration

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `apiKey` | string | Yes | Your Bynn API key |
| `parentId` | string | Yes | ID of container element |
| `fields` | Field[] | No | Form field configuration |
| `i18n` | string | No | Language code |
| `onSession` | function | No | Session callback |

### Field Configuration

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `name` | string | Yes | Field identifier |
| `visible` | boolean | No | Show/hide field |
| `value` | string | No | Default value |
| `label` | string | No | Custom label |

## Browser Support

The SDK supports all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)