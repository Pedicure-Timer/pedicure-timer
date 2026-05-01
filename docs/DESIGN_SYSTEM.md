# Design System Documentation

## 🎨 Color Palette

### Primary Colors
- **Primary Blue** `hsl(221, 83%, 53%)` - Main actions, active states, primary CTAs
- **Accent Purple** `hsl(262, 52%, 47%)` - Queue highlights, secondary emphasis
- **Success Green** `hsl(142, 71%, 45%)` - Ready states, positive actions
- **Warning Amber** `hsl(38, 92%, 50%)` - Alerts, demo mode, attention states
- **Destructive Red** `hsl(0, 72%, 51%)` - Dangerous actions, errors

### Neutral Colors
- **Background** `hsl(240, 10%, 98%)` - Page background
- **Card** `hsl(0, 0%, 100%)` - Card backgrounds
- **Muted** `hsl(240, 5%, 96%)` - Subtle backgrounds
- **Border** `hsl(240, 6%, 90%)` - Borders and dividers

### Usage Guidelines
- Use **Primary** for main actions (Start, Assign)
- Use **Success** for ready/available states
- Use **Warning** for time-sensitive alerts
- Use **Destructive** only for irreversible actions
- Use **Accent** for queue and secondary highlights

## 📐 Typography

### Font Sizes
- **Display**: 2xl (24px) - Section headers
- **Title**: xl (20px) - Card titles
- **Body**: base (16px) - Default text
- **Small**: sm (14px) - Secondary text
- **Tiny**: xs (12px) - Labels, badges

### Font Weights
- **Bold**: 700 - Headers, important numbers
- **Semibold**: 600 - Subheaders, card titles
- **Medium**: 500 - Buttons, labels
- **Regular**: 400 - Body text

## 🔲 Spacing System

Based on 4px grid:
- **xs**: 0.5rem (8px)
- **sm**: 0.75rem (12px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)

### Component Spacing
- Card padding: 24px (p-6)
- Button padding: 16px horizontal (px-4)
- Section gaps: 32px (gap-8)
- Element gaps: 16px (gap-4)

## 🎯 Component Patterns

### Cards
```tsx
<Card className="shadow-elevated">
  <CardContent className="p-6">
    {/* Content */}
  </CardContent>
</Card>
```

**States:**
- Default: `border-border`
- Active: `border-primary/30 bg-primary/[0.02]`
- Warning: `border-warning/30 bg-warning/[0.02]`
- Success: `border-success/30 bg-success/[0.02]`

### Buttons
**Variants:**
- `default` - Primary actions
- `outline` - Secondary actions
- `destructive` - Dangerous actions
- `ghost` - Tertiary actions

**Sizes:**
- `sm` - 36px height
- `default` - 40px height
- `lg` - 44px height

### Badges
**Variants:**
- `default` - Primary status
- `secondary` - Neutral status
- `success` - Positive status
- `warning` - Alert status
- `destructive` - Error status

## 🎭 Visual Hierarchy

### Level 1: Page Header
- Sticky top bar
- Logo + title
- Stats display
- Language switcher

### Level 2: Section Headers
- Icon + title
- Subtitle description
- Clear visual separation

### Level 3: Cards
- Rounded corners (12px)
- Subtle shadows
- Border states for status
- Hover effects

### Level 4: Content
- Clear typography hierarchy
- Consistent spacing
- Icon + text combinations

## 🎬 Animations & Transitions

### Timing
- **Fast**: 150ms - Hover states
- **Normal**: 200ms - Default transitions
- **Slow**: 300ms - Complex animations

### Effects
- **Hover**: Scale 0.98, shadow elevation
- **Active**: Scale 0.98
- **Focus**: Ring 2px primary
- **Pulse**: Opacity animation for alerts

### Usage
```tsx
className="transition-all duration-200 hover:shadow-elevated active:scale-[0.98]"
```

## 🎨 Status Colors

### Chair Status
- **Idle**: Secondary (gray) - Available
- **Running**: Primary (blue) - Active timer
- **Finished**: Warning (amber) - Needs attention

### Tech Status
- **Busy**: Secondary (gray) - Unavailable
- **Ready**: Success (green) - Available
- **Assigned**: Accent (purple) - Working

### Queue Status
- **Waiting**: Muted background
- **Next**: Primary highlight with badge

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px - Single column
- **Tablet**: 768px - 1024px - 2 columns
- **Desktop**: > 1024px - 3 columns

### Mobile Optimizations
- Stack sections vertically
- Full-width buttons
- Larger touch targets (44px min)
- Hide secondary stats on small screens

## ♿ Accessibility

### Focus States
- 2px ring with primary color
- 2px offset for visibility
- Clear keyboard navigation

### Color Contrast
- All text meets WCAG AA standards
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text

### Interactive Elements
- Minimum 44x44px touch targets
- Clear hover/focus states
- Descriptive labels
- Icon + text combinations

## 🎯 UX Guidelines

### Feedback
- Immediate visual feedback on actions
- Loading states for async operations
- Success/error messages
- Pulse animation for urgent items

### Clarity
- Clear action buttons with icons
- Status badges always visible
- Consistent terminology
- Helpful empty states

### Efficiency
- Quick actions accessible
- Keyboard shortcuts support
- Minimal clicks to complete tasks
- Smart defaults

## 🔧 Implementation

### CSS Variables
All colors use CSS variables for easy theming:
```css
--primary: 221 83% 53%;
--success: 142 71% 45%;
--warning: 38 92% 50%;
```

### Utility Classes
```css
.shadow-elevated - Enhanced shadow
.transition-smooth - Smooth transitions
.focus-ring - Standard focus ring
```

### Component Structure
```
Card
├── CardHeader (optional)
│   └── CardTitle
├── CardContent
│   ├── Status indicator
│   ├── Main content
│   └── Actions
└── CardFooter (optional)
```

## 📊 Component Inventory

### Layout
- TopBar - Navigation header
- SoundBanner - Alert banner
- DashboardPage - Main layout

### Features
- ChairCard - Timer display
- TechCard - Staff status
- QueuePanel - Customer queue
- DemoControls - Settings

### UI Primitives
- Button - Actions
- Card - Containers
- Badge - Status indicators
- Switch - Toggles
- AlertDialog - Confirmations

## 🎨 Design Principles

1. **Clarity over Cleverness** - Clear, obvious UI over fancy effects
2. **Consistency** - Same patterns throughout
3. **Feedback** - Always show what's happening
4. **Efficiency** - Minimize steps to complete tasks
5. **Accessibility** - Usable by everyone
6. **Professional** - Clean, modern, trustworthy

## 🚀 Best Practices

### Do's
✅ Use semantic colors (success for ready, warning for alerts)
✅ Maintain consistent spacing (4px grid)
✅ Provide clear visual feedback
✅ Use icons with text labels
✅ Keep animations subtle
✅ Test with keyboard navigation

### Don'ts
❌ Don't use gradients excessively
❌ Don't mix different border radius values
❌ Don't use colors without meaning
❌ Don't hide important actions
❌ Don't use animation for decoration only
❌ Don't sacrifice clarity for aesthetics

## 📝 Quick Reference

### Common Patterns

**Section Header:**
```tsx
<div className="flex items-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
    <Icon className="h-5 w-5 text-primary" />
  </div>
  <div>
    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    <p className="text-sm text-muted-foreground">{subtitle}</p>
  </div>
</div>
```

**Status Badge:**
```tsx
<Badge variant="default" className="font-medium">
  {status}
</Badge>
```

**Action Button:**
```tsx
<Button className="w-full h-11 shadow-sm" size="lg">
  <Icon className="w-4 h-4 mr-2" />
  {label}
</Button>
```

**Empty State:**
```tsx
<div className="flex flex-col items-center justify-center py-12">
  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
    <Icon className="w-8 h-8 text-muted-foreground" />
  </div>
  <p className="text-sm font-medium text-muted-foreground">{message}</p>
</div>
```

## 🎓 User Guide Integration

The dashboard includes a Quick Guide panel with:
1. Step-by-step instructions
2. Numbered list format
3. Clear, concise language
4. Visual hierarchy with primary color accents

This helps new users understand the workflow without external documentation.
