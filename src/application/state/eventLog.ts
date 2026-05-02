import type { AppAction } from '@/application/actions'
import type { EventLogEntry, EventLogDetail } from './AppState'
import { generateId } from '@/shared/utils/id'
import { nowMs } from '@/shared/utils/time'

export const createEventLogEntry = (action: AppAction): EventLogEntry | null => {
  const detail =
    action.type === 'CHAIR_STARTED'
      ? ({ kind: 'chair', chairId: action.payload.chairId } as EventLogDetail)
      : action.type === 'CHAIR_EXPIRED'
        ? ({ kind: 'completionToken', completionToken: action.payload.completionToken } as EventLogDetail)
        : action.type === 'CHAIR_RESET'
          ? ({ kind: 'chair', chairId: action.payload.chairId } as EventLogDetail)
          : action.type === 'TECH_READY' || action.type === 'TECH_ASSIGNED' || action.type === 'TECH_BUSY'
            ? ({ kind: 'tech', techId: action.payload.techId } as EventLogDetail)
            : action.type === 'QUEUE_ENQUEUE'
              ? ({ kind: 'customer', customerName: action.payload.customerName } as EventLogDetail)
              : action.type === 'DEMO_MODE_SET' || action.type === 'SOUND_ENABLED' || action.type === 'TOAST_ENABLED'
                ? ({ kind: 'state', enabled: action.payload.enabled } as EventLogDetail)
                : undefined

  if (!detail) return null

  return {
    id: generateId(),
    timestamp: nowMs(),
    label: action.type,
    detail,
  }
}

export const appendEventLog = (log: EventLogEntry[], entry: EventLogEntry | null): EventLogEntry[] => {
  if (!entry) return log
  return [...log, entry].slice(-12)
}
