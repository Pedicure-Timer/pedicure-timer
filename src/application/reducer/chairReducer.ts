import type { Chair } from '@/domain/entities'
import type { ChairAction } from '../actions/chairActions'
import { nowMs } from '@/shared/utils/time'

export const chairReducer = (chairs: Chair[], action: ChairAction): Chair[] => {
  switch (action.type) {
    case 'CHAIR_STARTED': {
      const { chairId, durationMs, techId } = action.payload
      return chairs.map((chair) => {
        if (chair.id !== chairId) return chair
        if (chair.status !== 'idle' && chair.status !== 'assigned') return chair
        const now = nowMs()
        return {
          ...chair,
          status: 'running',
          techId: techId ?? null,
          assignedAt: chair.assignedAt ?? now,
          startedAt: now,
          endsAt: now + durationMs,
          completedAt: null,
          lastCompletionToken: null,
        }
      })
    }

    case 'CHAIR_EXPIRED': {
      const { chairId, completionToken } = action.payload
      return chairs.map((chair) => {
        if (chair.id !== chairId) return chair
        if (chair.status !== 'running') return chair
        if (chair.lastCompletionToken === completionToken) return chair
        return {
          ...chair,
          status: 'finished',
          completedAt: nowMs(),
          lastCompletionToken: completionToken,
        }
      })
    }

    case 'CHAIR_RESET': {
      const { chairId } = action.payload
      return chairs.map((chair) => {
        if (chair.id !== chairId) return chair
        return {
          ...chair,
          status: 'idle',
          techId: null,
          customerName: null,
          assignedAt: null,
          startedAt: null,
          endsAt: null,
          completedAt: null,
          lastCompletionToken: null,
        }
      })
    }

    default:
      return chairs
  }
}
