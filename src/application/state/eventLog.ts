import type { AppAction } from '@/application/actions'
import type { EventLogEntry } from './AppState'
import { generateId } from '@/shared/utils/id'
import { nowMs } from '@/shared/utils/time'

const actionLabelMap: Partial<Record<AppAction['type'], string>> = {
  CHAIR_STARTED: 'Chair started',
  CHAIR_EXPIRED: 'Chair finished',
  CHAIR_RESET: 'Chair reset',
  TECH_READY: 'Tech marked ready',
  TECH_ASSIGNED: 'Tech assigned',
  TECH_BUSY: 'Tech marked busy',
  QUEUE_ENQUEUE: 'Customer added to queue',
  QUEUE_ASSIGN_NEXT: 'Next customer assigned',
  RESET_ALL: 'Reset all state',
  DEMO_MODE_SET: 'Demo mode changed',
  SOUND_ENABLED: 'Sound setting changed',
  LOAD_SAMPLE_STATE: 'Sample state loaded',
}

export const createEventLogEntry = (action: AppAction): EventLogEntry | null => {
  const label = actionLabelMap[action.type]
  if (!label) return null

  const detail =
    action.type === 'CHAIR_STARTED'
      ? `Chair ${action.payload.chairId}`
      : action.type === 'CHAIR_EXPIRED'
        ? `Completion token ${action.payload.completionToken}`
        : action.type === 'CHAIR_RESET'
          ? `Chair ${action.payload.chairId}`
          : action.type === 'TECH_READY' || action.type === 'TECH_ASSIGNED' || action.type === 'TECH_BUSY'
            ? `Tech ${action.payload.techId}`
            : action.type === 'QUEUE_ENQUEUE'
              ? action.payload.customerName
              : action.type === 'DEMO_MODE_SET' || action.type === 'SOUND_ENABLED'
                ? `${action.payload.enabled ? 'Enabled' : 'Disabled'}`
                : undefined

  return {
    id: generateId(),
    timestamp: nowMs(),
    label,
    detail,
  }
}

export const appendEventLog = (log: EventLogEntry[], entry: EventLogEntry | null): EventLogEntry[] => {
  if (!entry) return log
  return [...log, entry].slice(-12)
}