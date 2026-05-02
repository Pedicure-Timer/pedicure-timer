export type Language = 'en' | 'vi'

export interface Translations {
  // Top Bar
  appTitle: string
  liveDemoBadge: string
  topBarDescription: string
  activeChairs: string
  queue: string
  resetAudioPrompt: string

  // Language
  languageEnglish: string
  languageVietnamese: string

  // Sound
  soundOn: string
  soundOff: string
  soundToggleOn: string
  soundToggleOff: string

  // Toast
  toastOn: string
  toastOff: string
  toastToggleOn: string
  toastToggleOff: string
  mandatoryToastBadge: string
  temporaryToastBadge: string

  // Dashboard
  dashboardHeroBadge: string
  dashboardHeroTitle: string
  dashboardHeroDescription: string
  dashboardRunningChairs: (count: number) => string
  dashboardSeatedChairs: (count: number) => string
  dashboardReadyTechs: (count: number) => string
  pedicureChairsDescription: string
  manicureTechsDescription: string

  // Chair Card
  chair: string
  customer: string
  idle: string
  running: string
  finished: string
  start: string
  startTimer: string
  reset: string
  timesUp: string
  remaining: string
  technician: string
  startRequiresAssignment: string
  chairReadyHint: string
  chairWaitingHint: string

  // Chair Toast
  chairStartedToastTitle: string
  chairFinishedToastTitle: string
  chairStartedToastMessage: (chairNumber: string) => string
  chairFinishedToastMessage: (chairNumber: string) => string
  chairToastDismiss: string

  // Tech Card
  busy: string
  ready: string
  assigned: string
  imReady: string
  busyHint: string
  readyHint: string
  assignedHint: string
  assignedChairHint: string
  chairDescription: string
  techDescription: string

  // Queue Panel
  manicureQueue: string
  customerName: string
  add: string
  queueEmpty: string
  queueEmptyDescription: string
  next: string
  assignTo: string
  waitingForTech: string
  queueSectionHint: string
  queueWaitingLabel: string
  queueReadyTechsLabel: string
  queueNextCustomerLabel: string
  assignToTech: (techName: string) => string

  // Demo Controls
  demoControls: string
  demoMode: string
  demoModeDesc: string
  demoControlsHint: string
  resetAll: string
  resetConfirm: string
  loadSampleState: string
  cancel: string
  confirm: string

  // Event Log
  eventLogTitle: string
  eventLogEmpty: string
  eventLogHint: string
  eventLogChairStarted: string
  eventLogChairFinished: string
  eventLogChairReset: string
  eventLogTechMarkedReady: string
  eventLogTechAssigned: string
  eventLogTechMarkedBusy: string
  eventLogCustomerAddedToQueue: string
  eventLogNextCustomerAssigned: string
  eventLogResetAllState: string
  eventLogDemoModeChanged: string
  eventLogSoundSettingChanged: string
  eventLogToastSettingChanged: string
  eventLogSampleStateLoaded: string
  eventLogChairDetail: (chairId: string) => string
  eventLogCompletionTokenDetail: (completionToken: string) => string
  eventLogTechDetail: (techId: string) => string
  eventLogCustomerDetail: (customerName: string) => string
  eventLogSettingDetail: (enabled: boolean) => string
  search: string
  noResults: string

  // Sound Banner
  soundBannerTitle: string
  soundBannerDescription: string
  soundBannerText: string
  enableSound: string

  // Sections
  pedicureChairs: string
  manicureTechs: string

  // Quick Guide
  quickGuideTitle: string
  quickGuideSteps: string[]

  // Data helpers
  customerFromChair: (chairNumber: string) => string
}

export const translations: Record<Language, Translations> = {
  en: {
    appTitle: 'Pedicure Timer & Queue',
    liveDemoBadge: 'Live demo',
    topBarDescription: 'A simple operations screen for salon owners: chairs, techs, queue, and live status in one place.',
    activeChairs: 'Active Chairs',
    queue: 'Queue',
    resetAudioPrompt: 'Reset audio permission prompt',

    languageEnglish: 'English',
    languageVietnamese: 'Vietnamese',

    soundOn: 'Sound On',
    soundOff: 'Sound Off',
    soundToggleOn: 'Turn sound on',
    soundToggleOff: 'Turn sound off',

    toastOn: 'Toasts On',
    toastOff: 'Toasts Off',
    toastToggleOn: 'Turn toasts on',
    toastToggleOff: 'Turn toasts off',
    mandatoryToastBadge: 'Required alert',
    temporaryToastBadge: 'Temporary notice',

    dashboardHeroBadge: 'Salon operations screen',
    dashboardHeroTitle: 'Track chairs, technicians, and the queue in one view.',
    dashboardHeroDescription: 'See chair status at a glance, know who is serving, and spot the next customer in line immediately.',
    dashboardRunningChairs: (count) => `${count} chairs running`,
    dashboardSeatedChairs: (count) => `${count} chairs assigned`,
    dashboardReadyTechs: (count) => `${count} techs ready`,
    pedicureChairsDescription: 'Which chairs are running and which ones are ready is visible at a glance.',
    manicureTechsDescription: 'Who is serving, who is waiting for a chair, and who is ready for the next customer.',

    chair: 'Chair',
    customer: 'Customer',
    idle: 'Idle',
    running: 'Running',
    finished: 'Finished',
    start: 'Start',
    startTimer: 'Start Timer',
    reset: 'Reset',
    timesUp: "Time's Up!",
    remaining: 'Remaining',
    technician: 'Technician',
    startRequiresAssignment: 'Assign a customer and tech before starting.',
    chairReadyHint: 'Ready to start',
    chairWaitingHint: 'Waiting for a customer and technician',
    chairStartedToastTitle: 'Chair started',
    chairFinishedToastTitle: 'Chair finished',
    chairStartedToastMessage: (chairNumber) => `Chair ${chairNumber} has started.`,
    chairFinishedToastMessage: (chairNumber) => `Chair ${chairNumber} has finished.`,
    chairToastDismiss: 'Tap to dismiss',

    busy: 'Busy',
    ready: 'Ready',
    assigned: 'Seated',
    imReady: "I'm Ready",
    busyHint: 'Working with a client',
    readyHint: 'Available for a new client',
    assignedHint: 'Waiting to start on this chair',
    assignedChairHint: 'Linked to this chair, timer has not started yet',
    chairDescription: 'Main chair for the pedicure area',
    techDescription: 'Manicure technician',

    manicureQueue: 'Manicure Queue',
    customerName: 'Customer name',
    add: 'Add',
    queueEmpty: 'Queue is empty',
    queueEmptyDescription: 'Add customers here so the receptionist can quickly see who is next.',
    next: 'Next',
    assignTo: 'Assign',
    waitingForTech: 'Waiting for a tech to be ready...',
    queueSectionHint: 'The next customer in line is always shown first.',
    queueWaitingLabel: 'Waiting',
    queueReadyTechsLabel: 'Techs ready',
    queueNextCustomerLabel: 'Next customer',
    assignToTech: (techName) => `Assign to ${techName}`,

    demoControls: 'Demo Controls',
    demoMode: 'Demo Mode',
    demoModeDesc: '40s/70s timers',
    demoControlsHint: 'Three main actions that are easy to remember and hard to mix up.',
    resetAll: 'Reset All',
    resetConfirm: 'Reset all chairs, techs, and queue?',
    loadSampleState: 'Load Sample State',
    cancel: 'Cancel',
    confirm: 'Continue',

    eventLogTitle: 'Activity Log',
    eventLogEmpty: 'Actions will appear here as the demo runs.',
    eventLogHint: 'See the latest actions without looking through the whole screen.',
    eventLogChairStarted: 'Chair started',
    eventLogChairFinished: 'Chair finished',
    eventLogChairReset: 'Chair reset',
    eventLogTechMarkedReady: 'Tech marked ready',
    eventLogTechAssigned: 'Tech assigned',
    eventLogTechMarkedBusy: 'Tech marked busy',
    eventLogCustomerAddedToQueue: 'Customer added to queue',
    eventLogNextCustomerAssigned: 'Next customer assigned',
    eventLogResetAllState: 'Reset all state',
    eventLogDemoModeChanged: 'Demo mode changed',
    eventLogSoundSettingChanged: 'Sound setting changed',
    eventLogToastSettingChanged: 'Toast setting changed',
    eventLogSampleStateLoaded: 'Sample state loaded',
    eventLogChairDetail: (chairId) => `Chair ${chairId}`,
    eventLogCompletionTokenDetail: (completionToken) => `Completion token ${completionToken}`,
    eventLogTechDetail: (techId) => `Tech ${techId}`,
    eventLogCustomerDetail: (customerName) => customerName,
    eventLogSettingDetail: (enabled) => (enabled ? 'Enabled' : 'Disabled'),
    search: 'Search logs...',
    noResults: 'No results found',

    soundBannerTitle: 'Enable sound to hear alerts when timers finish',
    soundBannerDescription: 'The browser only allows audio after you click once.',
    soundBannerText: 'Enable sound to hear alerts when timers finish',
    enableSound: 'Enable Sound',

    pedicureChairs: 'Pedicure Chairs',
    manicureTechs: 'Manicure Techs',

    quickGuideTitle: 'Quick Guide',
    quickGuideSteps: [
      'Click Start on any idle chair to begin timer',
      'Add customers to queue for manicure service',
      'Techs mark themselves ready when available',
      'Assign next customer to ready technician',
    ],

    customerFromChair: (chairNumber) => `Customer from Chair ${chairNumber}`,
  },
  vi: {
    appTitle: 'Hẹn Giờ & Hàng Đợi Pedicure',
    liveDemoBadge: 'Bản demo trực tiếp',
    topBarDescription: 'Màn hình vận hành đơn giản cho chủ salon: ghế, thợ, hàng đợi và trạng thái chạy theo thời gian thực.',
    activeChairs: 'Ghế Đang Dùng',
    queue: 'Hàng Đợi',
    resetAudioPrompt: 'Đặt lại hỏi quyền âm thanh',

    languageEnglish: 'Tiếng Anh',
    languageVietnamese: 'Tiếng Việt',

    soundOn: 'Âm Thanh Bật',
    soundOff: 'Âm Thanh Tắt',
    soundToggleOn: 'Bật âm thanh',
    soundToggleOff: 'Tắt âm thanh',

    toastOn: 'Toast Bật',
    toastOff: 'Toast Tắt',
    toastToggleOn: 'Bật hiển thị toast',
    toastToggleOff: 'Tắt hiển thị toast',
    mandatoryToastBadge: 'Cảnh báo bắt buộc',
    temporaryToastBadge: 'Thông báo tạm thời',

    dashboardHeroBadge: 'Màn hình vận hành salon',
    dashboardHeroTitle: 'Theo dõi ghế, thợ và hàng đợi trong một màn hình.',
    dashboardHeroDescription: 'Nhìn nhanh trạng thái ghế, biết thợ nào đang phục vụ, và nhận ra ngay khách nào đang chờ lượt tiếp theo.',
    dashboardRunningChairs: (count) => `${count} ghế đang chạy`,
    dashboardSeatedChairs: (count) => `${count} ghế đã gán`,
    dashboardReadyTechs: (count) => `${count} thợ sẵn sàng`,
    pedicureChairsDescription: 'Ghế nào đang chạy, ghế nào đã sẵn sàng, nhìn một lần là biết.',
    manicureTechsDescription: 'Ai đang phục vụ, ai đang chờ ghế, ai đã sẵn sàng nhận khách.',

    chair: 'Ghế',
    customer: 'Khách',
    idle: 'Rảnh',
    running: 'Đang Chạy',
    finished: 'Hoàn Thành',
    start: 'Bắt Đầu',
    startTimer: 'Bắt Đầu',
    reset: 'Đặt Lại',
    timesUp: 'Hết Giờ!',
    remaining: 'Còn Lại',
    technician: 'Nhân Viên',
    startRequiresAssignment: 'Cần gán khách và nhân viên trước khi bắt đầu.',
    chairReadyHint: 'Sẵn sàng để bắt đầu',
    chairWaitingHint: 'Đang chờ khách và nhân viên được gán',
    chairStartedToastTitle: 'Ghế đã bắt đầu',
    chairFinishedToastTitle: 'Ghế đã kết thúc',
    chairStartedToastMessage: (chairNumber) => `Ghế ${chairNumber} đã bắt đầu.`,
    chairFinishedToastMessage: (chairNumber) => `Ghế ${chairNumber} đã kết thúc.`,
    chairToastDismiss: 'Nhấn để tắt',

    busy: 'Đang phục vụ',
    ready: 'Sẵn Sàng',
    assigned: 'Đã Gán Ghế',
    imReady: 'Tôi Sẵn Sàng',
    busyHint: 'Đang phục vụ khách',
    readyHint: 'Có thể nhận khách mới',
    assignedHint: 'Đã gán vào ghế, chờ bắt đầu',
    assignedChairHint: 'Đã gán cho ghế này, chưa bắt đầu đếm giờ',
    chairDescription: 'Ghế chính của khu pedicure',
    techDescription: 'Nhân viên manicure',

    manicureQueue: 'Hàng Đợi Manicure',
    customerName: 'Tên khách hàng',
    add: 'Thêm',
    queueEmpty: 'Hàng đợi trống',
    queueEmptyDescription: 'Thêm khách vào đây để lễ tân nhìn thấy người tiếp theo nhanh hơn.',
    next: 'Tiếp Theo',
    assignTo: 'Phân Công',
    waitingForTech: 'Đang chờ nhân viên sẵn sàng...',
    queueSectionHint: 'Khách đứng đầu hàng sẽ được nhìn thấy rõ nhất.',
    queueWaitingLabel: 'Đang chờ',
    queueReadyTechsLabel: 'Thợ sẵn sàng',
    queueNextCustomerLabel: 'Khách tiếp theo',
    assignToTech: (techName) => `Phân công ${techName}`,

    demoControls: 'Điều Khiển Demo',
    demoMode: 'Chế Độ Demo',
    demoModeDesc: 'Hẹn giờ 40s/70s',
    demoControlsHint: 'Chỉ có 3 nút chính, dễ nhớ và khó nhầm.',
    resetAll: 'Đặt Lại Tất Cả',
    resetConfirm: 'Đặt lại tất cả ghế, nhân viên và hàng đợi?',
    loadSampleState: 'Tải Dữ Liệu Mẫu',
    cancel: 'Hủy',
    confirm: 'Tiếp tục',

    eventLogTitle: 'Nhật Ký Hoạt Động',
    eventLogEmpty: 'Các thao tác sẽ xuất hiện ở đây khi demo chạy.',
    eventLogHint: 'Xem nhanh các thao tác mới nhất mà không phải rà lại toàn bộ màn hình.',
    eventLogChairStarted: 'Ghế đã bắt đầu',
    eventLogChairFinished: 'Ghế đã hoàn thành',
    eventLogChairReset: 'Ghế đã đặt lại',
    eventLogTechMarkedReady: 'Nhân viên đã sẵn sàng',
    eventLogTechAssigned: 'Nhân viên đã được phân công',
    eventLogTechMarkedBusy: 'Nhân viên đang phục vụ',
    eventLogCustomerAddedToQueue: 'Khách đã thêm vào hàng đợi',
    eventLogNextCustomerAssigned: 'Đã gán khách tiếp theo',
    eventLogResetAllState: 'Đặt lại toàn bộ trạng thái',
    eventLogDemoModeChanged: 'Đã đổi chế độ demo',
    eventLogSoundSettingChanged: 'Đã đổi cài đặt âm thanh',
    eventLogToastSettingChanged: 'Đã đổi cài đặt toast',
    eventLogSampleStateLoaded: 'Đã tải trạng thái mẫu',
    eventLogChairDetail: (chairId) => `Ghế ${chairId}`,
    eventLogCompletionTokenDetail: (completionToken) => `Mã hoàn tất ${completionToken}`,
    eventLogTechDetail: (techId) => `Nhân viên ${techId}`,
    eventLogCustomerDetail: (customerName) => customerName,
    eventLogSettingDetail: (enabled) => (enabled ? 'Bật' : 'Tắt'),
    search: 'Tìm kiếm logs...',
    noResults: 'Không tìm thấy kết quả',

    soundBannerTitle: 'Bật âm thanh để dễ theo dõi khi hết giờ',
    soundBannerDescription: 'Trình duyệt chỉ cho phát âm thanh sau khi bạn bấm một lần.',
    soundBannerText: 'Bật âm thanh để nghe thông báo khi hết giờ',
    enableSound: 'Bật Âm Thanh',

    pedicureChairs: 'Ghế Pedicure',
    manicureTechs: 'Nhân Viên Manicure',

    quickGuideTitle: 'Hướng Dẫn Nhanh',
    quickGuideSteps: [
      'Nhấn Bắt Đầu trên bất kỳ ghế rảnh nào để chạy hẹn giờ',
      'Thêm khách hàng vào hàng đợi cho dịch vụ manicure',
      'Nhân viên tự đánh dấu sẵn sàng khi có thể phục vụ',
      'Phân khách tiếp theo cho nhân viên đang sẵn sàng',
    ],

    customerFromChair: (chairNumber) => `Khách từ ghế ${chairNumber}`,
  },
}
