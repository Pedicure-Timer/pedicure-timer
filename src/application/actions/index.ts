import type { ChairAction } from './chairActions'
import type { TechAction } from './techActions'
import type { QueueAction } from './queueActions'
import type { SystemAction } from './systemActions'

export * from './chairActions'
export * from './techActions'
export * from './queueActions'
export * from './systemActions'

export type AppAction = ChairAction | TechAction | QueueAction | SystemAction
