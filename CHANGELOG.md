# Changelog

## [0.2.0] - 2026-05-01

### ✨ New Features

#### 🌐 Internationalization (i18n)
- Added multi-language support for English and Vietnamese
- Language switcher in top bar (EN/VI toggle)
- All UI text is now translatable
- Language preference persists in localStorage

#### 🎨 Modern UI Redesign
- Complete visual overhaul with minimalist, modern design
- New color palette with semantic colors:
  - Primary (Blue): Main actions and running states
  - Success (Green): Ready states and positive actions
  - Warning (Orange): Alerts and finished states
  - Danger (Red): Reset and destructive actions
  - Neutral (Gray scale): Base UI elements
- Improved typography with better hierarchy
- Enhanced shadows and depth for better visual separation
- Smooth transitions and hover effects
- Active state animations (scale on click)
- Rounded corners (xl radius) for modern look

#### 🎯 UX Improvements
- Better visual indicators:
  - Animated pulse dot for active chairs
  - Numbered badges in queue
  - Status badges with semantic colors
  - Section headers with colored accent bars
- Improved spacing and layout
- Better contrast and readability
- More intuitive button states
- Enhanced form inputs with focus states

### 🔧 Technical Changes

#### New Files
- `src/shared/i18n/translations.ts` - Translation definitions
- `src/shared/i18n/LanguageContext.tsx` - Language context provider
- `src/shared/i18n/index.ts` - i18n exports
- `src/presentation/components/layout/LanguageSwitcher.tsx` - Language toggle component

#### Updated Files
- `src/index.css` - Added CSS custom properties for design tokens
- `tailwind.config.ts` - Added custom color palette
- `src/App.tsx` - Wrapped with LanguageProvider
- All component files - Updated with translations and modern styling

### 🎨 Design System

#### Color Tokens
```css
--color-primary: #2563eb (Blue)
--color-success: #10b981 (Green)
--color-warning: #f59e0b (Orange)
--color-danger: #ef4444 (Red)
--color-neutral-*: Gray scale (50-900)
```

#### Typography
- System font stack for optimal performance
- Clear hierarchy with font weights
- Improved line heights and spacing

#### Shadows
- Subtle elevation system (sm, md, lg, xl)
- Consistent depth across components

### 📱 Responsive Design
- Maintained responsive grid layout
- Improved mobile experience
- Better touch targets

### 🌍 Supported Languages
- **English (EN)** - Default
- **Vietnamese (VI)** - Tiếng Việt

### 🔄 Migration Notes
- No breaking changes to existing functionality
- Language preference is stored in localStorage as `app-language`
- All existing features work as before with enhanced UI

---

## [0.1.0] - Initial Release

### Features
- 4 Pedicure Chairs with countdown timers
- 4 Manicure Techs with ready status management
- Digital Queue with FIFO ordering
- Demo Mode (40s/70s timers) for quick testing
- Sound Alerts when timers finish
- Persistent State across page refreshes using localStorage
- Responsive Design for desktop and tablet
