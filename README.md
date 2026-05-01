# Pedicure Timer & Digital Queue Demo

A client-side React application for managing pedicure chair timers and manicure queue following Clean Architecture principles.

## Features

- **4 Pedicure Chairs** with countdown timers
- **4 Manicure Techs** with ready status management
- **Digital Queue** with FIFO ordering
- **Demo Mode** (40s/70s timers) for quick testing
- **Sound Alerts** when timers finish
- **Persistent State** across page refreshes using localStorage
- **Responsive Design** for desktop and tablet

## Architecture

Built following Clean Architecture with:
- **Domain Layer**: Pure business logic (entities, value objects, rules)
- **Application Layer**: State management with useReducer
- **Infrastructure Layer**: Adapters for storage, audio, timer
- **Presentation Layer**: React components and hooks

Key architectural decisions:
- Timer based on absolute timestamps (endsAt), not countdown
- Idempotent reducer to prevent duplicate actions
- State persisted on every change + visibilitychange event
- Sound requires user gesture (Enable Sound button)

## Getting Started

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

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

The production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Pedicure Chairs

1. Click **Start Timer** on any idle chair
2. Timer counts down from 40s (demo mode) or 40 minutes (full mode)
3. When finished, customer is automatically added to queue
4. Click **Reset** to return chair to idle state

### Manicure Techs

1. Click **I'm Ready** when tech is available
2. Tech status changes to "Ready"
3. When assigned to customer, status changes to "Assigned"

### Queue Management

1. Add customers manually using the input field
2. Customers from finished chairs are added automatically
3. Click **Assign Next Customer** when a tech is ready
4. Queue follows FIFO order with tie-breaker by sequence number

### Demo Controls

- **Demo Mode Toggle**: Switch between 40s/70s (demo) and 40min/30min (full) timers
- **Reset All**: Clear all chairs, techs, and queue to initial state
- **Enable Sound**: Activate audio alerts (requires user interaction)

## Testing Notes

- **Do NOT test in incognito/private mode** - localStorage is cleared when tab closes
- State persists across page refreshes in normal browsing mode
- Multiple tabs on same device will share state via localStorage
- Different devices will NOT sync (this is a single-device demo)

## Project Structure

```
src/
├── domain/              # Pure business logic
│   ├── entities/        # Chair, Tech, QueueEntry
│   ├── value-objects/   # Duration, TimerSnapshot
│   └── rules/           # Pure functions for business rules
├── application/         # State management
│   ├── state/           # AppState types
│   ├── actions/         # Action types
│   └── reducer/         # Reducer slices
├── infrastructure/      # External adapters
│   ├── persistence/     # LocalStorageAdapter
│   ├── audio/           # WebAudioAdapter
│   └── timer/           # Timer engine (placeholder)
├── presentation/        # React UI
│   ├── context/         # AppContext, hooks
│   ├── hooks/           # useCountdown, usePersistence, etc.
│   ├── components/      # UI components
│   └── pages/           # DashboardPage
└── shared/              # Utilities
    ├── utils/           # time, id, classNames
    ├── constants/       # schema version, storage key
    └── types/           # branded types
```

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Web Audio API** for sound alerts
- **localStorage** for persistence

## Future Enhancements

- Shelly Plug integration for hardware chair detection
- Backend API for multi-device sync
- Authentication and multi-salon support
- Analytics and reporting
- Mobile app

## License

ISC
