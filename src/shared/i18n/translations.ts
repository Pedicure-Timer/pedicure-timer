export type Language = 'en' | 'vi'

export interface Translations {
  // Top Bar
  appTitle: string
  activeChairs: string
  queue: string

  // Chair Card
  chair: string
  idle: string
  running: string
  finished: string
  startTimer: string
  reset: string
  timesUp: string

  // Tech Card
  busy: string
  ready: string
  assigned: string
  imReady: string

  // Queue Panel
  manicureQueue: string
  customerName: string
  add: string
  queueEmpty: string
  next: string
  assignTo: string
  waitingForTech: string

  // Demo Controls
  demoControls: string
  demoMode: string
  demoModeDesc: string
  resetAll: string
  resetConfirm: string

  // Sound Banner
  soundBannerText: string
  enableSound: string

  // Sections
  pedicureChairs: string
  manicureTechs: string
}

export const translations: Record<Language, Translations> = {
  en: {
    appTitle: 'Pedicure Timer & Queue',
    activeChairs: 'Active Chairs',
    queue: 'Queue',

    chair: 'Chair',
    idle: 'Idle',
    running: 'Running',
    finished: 'Finished',
    startTimer: 'Start Timer',
    reset: 'Reset',
    timesUp: "Time's Up!",

    busy: 'Busy',
    ready: 'Ready',
    assigned: 'Assigned',
    imReady: "I'm Ready",

    manicureQueue: 'Manicure Queue',
    customerName: 'Customer name',
    add: 'Add',
    queueEmpty: 'Queue is empty',
    next: 'Next',
    assignTo: 'Assign',
    waitingForTech: 'Waiting for a tech to be ready...',

    demoControls: 'Demo Controls',
    demoMode: 'Demo Mode',
    demoModeDesc: '40s/70s timers',
    resetAll: 'Reset All',
    resetConfirm: 'Reset all chairs, techs, and queue?',

    soundBannerText: 'Enable sound to hear alerts when timers finish',
    enableSound: 'Enable Sound',

    pedicureChairs: 'Pedicure Chairs',
    manicureTechs: 'Manicure Techs',
  },
  vi: {
    appTitle: 'Hẹn Giờ & Hàng Đợi Pedicure',
    activeChairs: 'Ghế Đang Dùng',
    queue: 'Hàng Đợi',

    chair: 'Ghế',
    idle: 'Rảnh',
    running: 'Đang Chạy',
    finished: 'Hoàn Thành',
    startTimer: 'Bắt Đầu',
    reset: 'Đặt Lại',
    timesUp: 'Hết Giờ!',

    busy: 'Bận',
    ready: 'Sẵn Sàng',
    assigned: 'Đã Phân',
    imReady: 'Tôi Sẵn Sàng',

    manicureQueue: 'Hàng Đợi Manicure',
    customerName: 'Tên khách hàng',
    add: 'Thêm',
    queueEmpty: 'Hàng đợi trống',
    next: 'Tiếp Theo',
    assignTo: 'Phân Công',
    waitingForTech: 'Đang chờ nhân viên sẵn sàng...',

    demoControls: 'Điều Khiển Demo',
    demoMode: 'Chế Độ Demo',
    demoModeDesc: 'Hẹn giờ 40s/70s',
    resetAll: 'Đặt Lại Tất Cả',
    resetConfirm: 'Đặt lại tất cả ghế, nhân viên và hàng đợi?',

    soundBannerText: 'Bật âm thanh để nghe thông báo khi hết giờ',
    enableSound: 'Bật Âm Thanh',

    pedicureChairs: 'Ghế Pedicure',
    manicureTechs: 'Nhân Viên Manicure',
  },
}
