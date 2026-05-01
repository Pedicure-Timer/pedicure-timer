```
pedicure-timer/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   │
│   ├── domain/                        # Nghiệp vụ thuần túy, zero dependencies
│   │   ├── entities/
│   │   │   ├── Chair.ts               # Types + guards: ChairStatus, Chair
│   │   │   ├── Tech.ts                # TechRole, TechStatus, Tech
│   │   │   ├── QueueEntry.ts          # QueueEntry, source literals
│   │   │   └── index.ts
│   │   ├── value-objects/
│   │   │   ├── Duration.ts            # DEMO_SHORT_MS, DEMO_LONG_MS, FULL_*
│   │   │   ├── TimerSnapshot.ts       # { remainingMs, isExpired } – derived, không persist
│   │   │   └── index.ts
│   │   └── rules/                     # Pure functions, không side-effect
│   │       ├── queueRules.ts          # canEnqueue, sortQueue, nextInQueue
│   │       ├── chairRules.ts          # canStart, canReset, isExpired
│   │       └── index.ts
│   │
│   ├── application/                   # Use-cases, orchestrates domain
│   │   ├── state/
│   │   │   ├── AppState.ts            # AppState, AppSettings, AppMeta types
│   │   │   ├── initialState.ts        # Factory: buildInitialState()
│   │   │   └── index.ts
│   │   ├── actions/
│   │   │   ├── chairActions.ts        # CHAIR_STARTED, CHAIR_EXPIRED, CHAIR_RESET
│   │   │   ├── techActions.ts         # TECH_READY, TECH_ASSIGNED, TECH_BUSY
│   │   │   ├── queueActions.ts        # QUEUE_ENQUEUE, QUEUE_ASSIGN_NEXT
│   │   │   ├── systemActions.ts       # HYDRATE, RESET_ALL, SOUND_ENABLED, DEMO_MODE_SET
│   │   │   └── index.ts               # AppAction union type
│   │   └── reducer/
│   │       ├── chairReducer.ts        # Slice xử lý chairs
│   │       ├── techReducer.ts         # Slice xử lý techs
│   │       ├── queueReducer.ts        # Slice xử lý queue + seq counter
│   │       ├── rootReducer.ts         # Compose slices, guard idempotency
│   │       └── index.ts
│   │
│   ├── infrastructure/                # Adapters ra ngoài (ISP: mỗi file một concern)
│   │   ├── persistence/
│   │   │   ├── StorageAdapter.ts      # Interface IStorageAdapter { save, load, clear }
│   │   │   ├── LocalStorageAdapter.ts # Impl: serialize/deserialize + schemaVersion guard
│   │   │   └── index.ts
│   │   ├── audio/
│   │   │   ├── AudioAdapter.ts        # Interface IAudioAdapter { enable, beep }
│   │   │   ├── WebAudioAdapter.ts     # Impl: AudioContext, resume on gesture
│   │   │   └── index.ts
│   │   ├── timer/
│   │   │   ├── TimerEngine.ts         # Interface ITimerEngine { start, stop }
│   │   │   ├── IntervalTimerEngine.ts # Impl: setInterval, dispatch CHAIR_EXPIRED
│   │   │   └── index.ts
│   │   └── hardware/                  # Slot cho Shelly sau này
│   │       ├── HardwareAdapter.ts     # Interface IHardwareAdapter { onChairOn }
│   │       └── MockHardwareAdapter.ts # Impl: button click → CHAIR_STARTED
│   │
│   ├── presentation/                  # React layer
│   │   ├── context/
│   │   │   ├── AppContext.tsx         # createContext + Provider bọc useReducer
│   │   │   └── useAppDispatch.ts      # Hook tiện gọi dispatch
│   │   ├── hooks/
│   │   │   ├── useCountdown.ts        # endsAt → remainingMs, update mỗi 500ms
│   │   │   ├── usePersistence.ts      # Effect: ghi state sau action + visibilitychange
│   │   │   ├── useHydration.ts        # Effect: đọc storage lúc mount, dispatch HYDRATE
│   │   │   ├── useSound.ts            # Wrap WebAudioAdapter, expose enable/beep
│   │   │   └── useEventLog.ts         # Maintain event log array cho demo panel
│   │   ├── components/
│   │   │   ├── chair/
│   │   │   │   ├── ChairCard.tsx      # Container: đọc state, gọi dispatch
│   │   │   │   ├── ChairCountdown.tsx # Presentational: countdown lớn
│   │   │   │   ├── ChairStatusBadge.tsx
│   │   │   │   └── ChairActions.tsx   # Start / Reset button theo context
│   │   │   ├── queue/
│   │   │   │   ├── QueuePanel.tsx
│   │   │   │   ├── QueueEntry.tsx
│   │   │   │   └── AssignButton.tsx
│   │   │   ├── tech/
│   │   │   │   ├── TechCard.tsx
│   │   │   │   └── ReadyButton.tsx
│   │   │   ├── layout/
│   │   │   │   ├── TopBar.tsx         # Metric tức thời: active chairs, queue length
│   │   │   │   ├── TwoColumnLayout.tsx
│   │   │   │   └── SoundBanner.tsx    # "Bật âm thanh" gate
│   │   │   └── demo/
│   │   │       ├── DemoControls.tsx   # Toggle mode, Reset all, Load sample
│   │   │       └── EventLog.tsx       # Drawer / sidebar log
│   │   └── pages/
│   │       └── DashboardPage.tsx      # Ghép layout + panels
│   │
│   └── shared/                        # Utilities không thuộc tầng nào
│       ├── utils/
│       │   ├── time.ts                # nowMs(), formatCountdown(), epochToHuman()
│       │   ├── id.ts                  # generateId() bằng crypto.randomUUID
│       │   └── classNames.ts          # cx() helper cho Tailwind
│       ├── constants/
│       │   └── schema.ts              # SCHEMA_VERSION, STORAGE_KEY
│       └── types/
│           └── branded.ts             # Branded types: ChairId, TechId, QueueId
│
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

Các quyết định kiến trúc chính:
Domain không import gì từ React hay browser. chairRules.ts, queueRules.ts là pure functions, test được bằng Vitest không cần DOM. Đây là điểm then chốt của DIP: tầng cao (domain) không phụ thuộc tầng thấp (localStorage, AudioContext).
ISP trên infrastructure. Mỗi adapter có interface riêng (IStorageAdapter, IAudioAdapter, ITimerEngine, IHardwareAdapter). Sau này swap Shelly thật vào, chỉ cần viết ShellyHardwareAdapter implements IHardwareAdapter, không đụng reducer.
Reducer chia slice, compose ở root. chairReducer, techReducer, queueReducer mỗi cái chỉ biết slice của mình (SRP). rootReducer gọi từng slice và guard idempotency ở một chỗ.
Không bao giờ persist derived state. remainingMs, queueLength, servingCount không có trong storage schema — chúng là output của useCountdown và selectors, tính lại từ endsAt và readyAt sau mỗi hydration.
hardware/ là slot placeholder. MockHardwareAdapter là button click, ShellyHardwareAdapter sau này là webhook/event — cả hai đều dispatch cùng action CHAIR_STARTED({ chairId, durationMs, source }).