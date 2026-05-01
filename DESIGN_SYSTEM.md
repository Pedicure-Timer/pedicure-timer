# Design System

## Overview

This application uses a minimalist, modern design system with semantic colors and consistent spacing.

## Color Palette

### Primary Colors

#### Primary (Blue)
- **Default**: `#2563eb` - Main actions, running states
- **Hover**: `#1d4ed8` - Hover state
- **Light**: `#dbeafe` - Background tint

Usage: Start buttons, active indicators, primary actions

#### Success (Green)
- **Default**: `#10b981` - Ready states, positive actions
- **Hover**: `#059669` - Hover state
- **Light**: `#d1fae5` - Background tint

Usage: Ready status, assign buttons, success states

#### Warning (Orange)
- **Default**: `#f59e0b` - Alerts, finished states
- **Hover**: `#d97706` - Hover state
- **Light**: `#fef3c7` - Background tint

Usage: Timer finished, sound banner, warnings

#### Danger (Red)
- **Default**: `#ef4444` - Destructive actions
- **Hover**: `#dc2626` - Hover state
- **Light**: `#fee2e2` - Background tint

Usage: Reset buttons, delete actions

### Neutral Colors

Gray scale from 50 (lightest) to 900 (darkest):
- **50**: `#fafafa` - Page background
- **100**: `#f5f5f5` - Card backgrounds
- **200**: `#e5e5e5` - Borders
- **300**: `#d4d4d4` - Dividers
- **400**: `#a3a3a3` - Disabled text
- **500**: `#737373` - Secondary text
- **600**: `#525252` - Primary text
- **700**: `#404040` - Headings
- **800**: `#262626` - Dark text
- **900**: `#171717` - Darkest text

## Typography

### Font Family
System font stack for optimal performance:
```css
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif
```

### Font Sizes
- **6xl**: 3.75rem (60px) - Timer countdown
- **3xl**: 1.875rem (30px) - Time's up message
- **2xl**: 1.5rem (24px) - Page title, section headers
- **xl**: 1.25rem (20px) - Card titles
- **lg**: 1.125rem (18px) - Subsection headers
- **base**: 1rem (16px) - Body text
- **sm**: 0.875rem (14px) - Secondary text
- **xs**: 0.75rem (12px) - Labels, badges

### Font Weights
- **bold**: 700 - Headings, important text
- **semibold**: 600 - Subheadings, emphasis
- **medium**: 500 - Buttons, labels
- **normal**: 400 - Body text

## Spacing

Consistent spacing scale (in rem):
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **12**: 3rem (48px)

## Border Radius

- **sm**: 0.375rem (6px) - Small elements
- **md**: 0.5rem (8px) - Buttons, inputs
- **lg**: 0.75rem (12px) - Cards
- **xl**: 1rem (16px) - Large cards
- **full**: 9999px - Pills, badges

## Shadows

Subtle elevation system:
- **sm**: `0 1px 2px 0 rgb(0 0 0 / 0.05)` - Subtle lift
- **md**: `0 4px 6px -1px rgb(0 0 0 / 0.1)` - Cards
- **lg**: `0 10px 15px -3px rgb(0 0 0 / 0.1)` - Modals
- **xl**: `0 20px 25px -5px rgb(0 0 0 / 0.1)` - Popovers

## Transitions

- **fast**: 150ms - Hover effects
- **base**: 200ms - Standard transitions
- **slow**: 300ms - Complex animations

Easing: `cubic-bezier(0.4, 0, 0.2, 1)` - Smooth, natural motion

## Components

### Buttons

#### Primary Button
```tsx
className="px-6 py-3 bg-primary text-white rounded-lg font-medium 
           hover:bg-primary-hover transition-all shadow-sm 
           hover:shadow-md active:scale-95"
```

#### Success Button
```tsx
className="px-6 py-3 bg-success text-white rounded-lg font-medium 
           hover:bg-success-hover transition-all shadow-sm 
           hover:shadow-md active:scale-95"
```

#### Danger Button
```tsx
className="px-6 py-3 bg-danger text-white rounded-lg font-medium 
           hover:bg-danger-hover transition-all shadow-sm 
           hover:shadow-md active:scale-95"
```

### Cards

#### Standard Card
```tsx
className="bg-white rounded-xl border border-neutral-200 p-6 
           shadow-sm hover:shadow-md transition-all"
```

#### Status Card (with semantic color)
```tsx
className="rounded-xl border-2 p-6 transition-all duration-200 
           shadow-sm hover:shadow-md bg-{color}-light border-{color}"
```

### Inputs

```tsx
className="px-4 py-2.5 border border-neutral-300 rounded-lg 
           focus:outline-none focus:ring-2 focus:ring-primary 
           focus:border-transparent transition-all"
```

### Badges

```tsx
className="px-3 py-1 rounded-full text-xs font-semibold 
           uppercase tracking-wide bg-white border-2 
           border-{color} text-{color}"
```

## Status Colors

### Chair Status
- **Idle**: Neutral (gray)
- **Running**: Primary (blue)
- **Finished**: Warning (orange)

### Tech Status
- **Busy**: Neutral (gray)
- **Ready**: Success (green)
- **Assigned**: Primary (blue)

## Accessibility

### Focus States
All interactive elements have visible focus states:
```css
focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
```

### Color Contrast
All text meets WCAG AA standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum

### Touch Targets
Minimum 44x44px for all interactive elements on mobile.

## Usage Examples

### Section Header
```tsx
<div className="flex items-center gap-3 mb-6">
  <div className="w-1 h-8 bg-primary rounded-full" />
  <h2 className="text-2xl font-bold text-neutral-900">
    {t.pedicureChairs}
  </h2>
</div>
```

### Status Indicator
```tsx
<div className="flex items-center gap-2">
  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
  <span className="text-neutral-600">{t.activeChairs}:</span>
  <span className="font-semibold text-neutral-900">{count}</span>
</div>
```

### Queue Item
```tsx
<div className="flex items-center justify-between p-3 
                bg-neutral-50 rounded-lg border border-neutral-200 
                hover:border-neutral-300 transition-all">
  <div className="flex items-center gap-3">
    <span className="flex items-center justify-center w-7 h-7 
                     rounded-full bg-primary text-white text-xs font-bold">
      {index + 1}
    </span>
    <span className="font-medium text-neutral-900">
      {customerName}
    </span>
  </div>
</div>
```
