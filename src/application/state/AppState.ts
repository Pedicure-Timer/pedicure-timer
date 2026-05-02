import type { AppAction } from '@/application/actions'
import type { Chair, Tech, QueueEntry } from '@/domain/entities'

export type EventLogDetail =
  | { kind: 'chair'; chairId: string }
  | { kind: 'completionToken'; completionToken: string }
  | { kind: 'tech'; techId: string }
  | { kind: 'customer'; customerName: string }
  | { kind: 'state'; enabled: boolean }

export type EventLogLabel = AppAction['type']

export interface EventLogEntry {
  id: string
  timestamp: number
  label: EventLogLabel
  detail?: EventLogDetail
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
