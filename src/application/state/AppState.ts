import type { Chair, Tech, QueueEntry } from '@/domain/entities'

export interface EventLogEntry {
  id: string
  timestamp: number
  label: string
  detail?: string
}

export interface AppSettings {
  demoMode: boolean
  soundEnabled: boolean
}

export interface AppMeta {
  queueSeqCounter: number
  schemaVersion: number
  eventLog: EventLogEntry[]
}

export interface AppState {
  chairs: Chair[]
  techs: Tech[]
  queue: QueueEntry[]
  settings: AppSettings
  meta: AppMeta
}
