import type { Chair, Tech, QueueEntry } from '@/domain/entities'

export interface AppSettings {
  demoMode: boolean
  soundEnabled: boolean
}

export interface AppMeta {
  queueSeqCounter: number
  schemaVersion: number
}

export interface AppState {
  chairs: Chair[]
  techs: Tech[]
  queue: QueueEntry[]
  settings: AppSettings
  meta: AppMeta
}
