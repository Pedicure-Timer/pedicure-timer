# Pedicure Timer & Digital Queue Demo

A modern, professional React application for managing pedicure chair timers and manicure queue with a beautiful, minimalist UI built with shadcn/ui.

## ✨ Features

### Core Features
- **4 Pedicure Chairs** with countdown timers and real-time status
- **4 Manicure Techs** with availability management
- **Digital Queue** with FIFO ordering and smart assignment
- **Demo Mode** (40s/70s timers) for quick testing
- **Sound Alerts** when timers finish
- **Persistent State** across page refreshes using localStorage
- **Fully Responsive** design for desktop, tablet, and mobile

### UI/UX Highlights
- **Modern Design System** - Professional, minimalist interface with shadcn/ui
- **Semantic Colors** - Intuitive color coding for different states
- **Smooth Animations** - Subtle transitions and micro-interactions
- **Visual Feedback** - Clear status indicators and hover effects
- **Accessibility First** - WCAG AA compliant with keyboard navigation
- **Multi-language** - Switch between English and Vietnamese
- **Quick Guide** - Built-in user instructions

## 🎨 Design System

### Color Palette
- **Primary Blue** - Main actions and active states
- **Success Green** - Ready and available states
- **Warning Amber** - Alerts and finished states
- **Accent Purple** - Queue highlights
- **Neutral Gray** - Backgrounds and borders

### Components
Built with [shadcn/ui](https://ui.shadcn.com/) for consistency:
- Button (multiple variants)
- Card (with header, content, footer)
- Badge (status indicators)
- Switch (toggles)
- AlertDialog (confirmations)

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation.

## 🏗️ Architecture

Built following Clean Architecture principles:

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (React Components, Hooks, Context)     │
├─────────────────────────────────────────┤
│        Application Layer                │
│   (State Management, Actions, Reducer)  │
├─────────────────────────────────────────┤
│          Domain Layer                   │
│  (Entities, Value Objects, Rules)       │
├─────────────────────────────────────────┤
│       Infrastructure Layer              │
│  (Storage, Audio, External Adapters)    │
└─────────────────────────────────────────┘
```

### Key Architectural Decisions
- **Absolute Timestamps**: Timers use `endsAt` instead of countdown
- **Idempotent Reducer**: Prevents duplicate actions
- **Immutable State**: All state updates create new objects
- **Event-Driven**: State persisted on every change
- **User Gesture Required**: Sound needs explicit user activation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🚀 Deploy to Vercel

### Vercel Checklist

1. Push the latest code to your Git provider.
2. In Vercel, choose **New Project** and import this repository.
3. Select the **Vite** preset.
4. Use these build settings:
    - **Root Directory**: `./`
    - **Build Command**: `npm run build`
    - **Output Directory**: `dist`
    - **Install Command**: `npm install`
5. Deploy the project.

### Do You Need `vercel.json`?

For the current app, **no**. This repo is a single-page Vite app and does not use React Router or nested client routes, so Vercel can serve it with the default static build settings.

Add a `vercel.json` only if you later introduce client-side routing that needs SPA rewrites, for example:

```json
{
   "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
   ]
}
```

## 📖 Usage

See [USER_GUIDE.md](./USER_GUIDE.md) for detailed instructions.

### Quick Start

1. **Start a Chair Timer**
   - Click **Start** on any idle chair
   - Timer begins countdown
   - Status changes to Running (blue)

2. **Add Customers to Queue**
   - Enter customer name
   - Click **Add** button
   - Customer appears in queue with position

3. **Assign to Technician**
   - Tech clicks **I'm Ready**
   - Click **Assign to [Tech Name]**
   - Customer is assigned

4. **Complete Session**
   - Timer finishes automatically
   - Sound alert plays
   - Click **Reset** to make chair available

### Language Selection
Click **EN/VI** toggle in top right to switch languages. Preference is saved automatically.

### Demo Mode
Toggle **Demo Mode** for shorter timers (40s/70s) perfect for testing and demonstrations.

## 📁 Project Structure

```
src/
├── domain/                    # Pure business logic
│   ├── entities/             # Chair, Tech, QueueEntry
│   ├── value-objects/        # Duration, TimerSnapshot
│   └── rules/                # Business rules
├── application/              # State management
│   ├── state/                # AppState types
│   ├── actions/              # Action types
│   └── reducer/              # Reducer slices
├── infrastructure/           # External adapters
│   ├── persistence/          # LocalStorageAdapter
│   ├── audio/                # WebAudioAdapter
│   └── timer/                # Timer engine
├── presentation/             # React UI
│   ├── context/              # AppContext, hooks
│   ├── hooks/                # Custom hooks
│   ├── components/           # UI components
│   │   ├── ui/              # shadcn/ui primitives
│   │   ├── chair/           # ChairCard
│   │   ├── tech/            # TechCard
│   │   ├── queue/           # QueuePanel
│   │   ├── demo/            # DemoControls
│   │   └── layout/          # TopBar, SoundBanner
│   └── pages/                # DashboardPage
└── shared/                   # Utilities
    ├── utils/                # Helpers
    ├── constants/            # Constants
    ├── i18n/                 # Internationalization
    └── types/                # TypeScript types
```

## 🛠️ Tech Stack

- **React 18** - UI library with TypeScript
- **Vite** - Fast build tooling
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible primitives
- **Lucide React** - Beautiful icons
- **Web Audio API** - Sound alerts
- **localStorage** - Client-side persistence

## 📱 Responsive Design

- **Desktop** (>1024px): 3-column layout
- **Tablet** (768-1024px): 2-column layout
- **Mobile** (<768px): Single column, stacked

All touch targets are minimum 44x44px for mobile usability.

## ♿ Accessibility

- WCAG AA compliant color contrast
- Keyboard navigation support
- Focus indicators on all interactive elements
- Screen reader friendly
- Semantic HTML structure

## 🧪 Testing Notes

- **Do NOT test in incognito/private mode** - localStorage is cleared when tab closes
- State persists across page refreshes in normal browsing mode
- Multiple tabs on same device share state via localStorage
- Different devices do NOT sync (single-device demo)

## 📚 Documentation

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Complete design system documentation
- [USER_GUIDE.md](./USER_GUIDE.md) - Detailed user instructions
- [SHADCN_MIGRATION.md](./SHADCN_MIGRATION.md) - shadcn/ui migration notes
- [CHANGELOG.md](./CHANGELOG.md) - Version history

## 🔮 Future Enhancements

- [ ] Shelly Plug integration for hardware chair detection
- [ ] Backend API for multi-device sync
- [ ] Authentication and multi-salon support
- [ ] Analytics and reporting dashboard
- [ ] Mobile app (React Native)
- [ ] Dark mode support
- [ ] Print receipts
- [ ] Customer notifications (SMS/Email)

## 🤝 Contributing

This is a demo project. For production use, consider:
- Adding comprehensive test coverage
- Implementing error boundaries
- Adding logging and monitoring
- Setting up CI/CD pipeline
- Adding backend API
- Implementing authentication

## 📄 License

ISC

---

**Built with ❤️ using React, TypeScript, and shadcn/ui**
