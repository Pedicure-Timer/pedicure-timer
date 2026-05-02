import type { AppState } from '../state/AppState'
import type { AppAction } from '../actions'
import { chairReducer } from './chairReducer'
import { techReducer } from './techReducer'
import { queueReducer } from './queueReducer'
import { buildInitialState } from '../state/initialState'
import { buildSampleState } from '../state/sampleState'
import { appendEventLog, createEventLogEntry } from '../state/eventLog'
import { findIdleChair } from '@/domain/rules/chairRules'
import { nowMs } from '@/shared/utils/time'

const recordEvent = (state: AppState, action: AppAction): AppState => {
  const entry = createEventLogEntry(action)
  if (!entry) return state

  return {
    ...state,
    meta: {
      ...state.meta,
      eventLog: appendEventLog(state.meta.eventLog, entry),
    },
  }
}

export const rootReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'HYDRATE': {
      return action.payload.state
    }

    case 'LOAD_SAMPLE_STATE': {
      return buildSampleState()
    }

    case 'RESET_ALL': {
      return recordEvent(buildInitialState(), action)
    }

    case 'SOUND_ENABLED': {
      return recordEvent({
        ...state,
        settings: {
          ...state.settings,
          soundEnabled: action.payload.enabled,
        },
      }, action)
    }

    case 'TOAST_ENABLED': {
      return recordEvent({
        ...state,
        settings: {
          ...state.settings,
          toastEnabled: action.payload.enabled,
        },
      }, action)
    }

    case 'DEMO_MODE_SET': {
      return recordEvent({
        ...state,
        settings: {
          ...state.settings,
          demoMode: action.payload.enabled,
        },
      }, action)
    }

    case 'CHAIR_STARTED':
    case 'CHAIR_EXPIRED':
    case 'CHAIR_RESET': {
      if (action.type === 'CHAIR_STARTED') {
        const startedChair = state.chairs.find((chair) => chair.id === action.payload.chairId)
        if (!startedChair || startedChair.status !== 'assigned' || !startedChair.customerName || !startedChair.techId) {
          return state
        }
      }

      const updatedChairs = chairReducer(state.chairs, action)

      if (action.type === 'CHAIR_STARTED') {
        const startedChair = state.chairs.find((chair) => chair.id === action.payload.chairId)
        const techId = startedChair?.techId ?? action.payload.techId ?? null

        return recordEvent({
          ...state,
          chairs: updatedChairs,
          techs: techId
            ? state.techs.map((tech) => {
                if (tech.id !== techId) return tech
                return {
                  ...tech,
                  status: 'busy',
                  chairId: action.payload.chairId,
                }
              })
            : state.techs,
        }, action)
      }

      if (action.type === 'CHAIR_EXPIRED') {
        const expiredChair = state.chairs.find((chair) => chair.id === action.payload.chairId)
        const techId = expiredChair?.techId ?? null

        return recordEvent({
          ...state,
          chairs: updatedChairs,
          techs: techId
            ? state.techs.map((tech) => {
                if (tech.id !== techId) return tech
                return {
                  ...tech,
                  status: 'ready',
                  readyAt: nowMs(),
                  chairId: null,
                }
              })
            : state.techs,
        }, action)
      }

      return recordEvent({
        ...state,
        chairs: updatedChairs,
      }, action)
    }

    case 'TECH_READY':
    case 'TECH_ASSIGNED':
    case 'TECH_BUSY': {
      return recordEvent({
        ...state,
        techs: techReducer(state.techs, action),
      }, action)
    }

    case 'QUEUE_ENQUEUE':
    case 'QUEUE_ASSIGN_NEXT': {
      if (action.type === 'QUEUE_ASSIGN_NEXT') {
        const next = state.queue
          .filter((entry) => entry.assignedTechId === null)
          .sort((a, b) => {
            if (a.enqueuedAt !== b.enqueuedAt) {
              return a.enqueuedAt - b.enqueuedAt
            }
            return a.seq - b.seq
          })[0]

        const readyTech = state.techs
          .filter((tech) => tech.status === 'ready')
          .sort((a, b) => {
            if (a.readyAt === null) return 1
            if (b.readyAt === null) return -1
            return a.readyAt - b.readyAt
          })[0]

        const idleChair = findIdleChair(state.chairs)

        if (!next || !readyTech || !idleChair) {
          return state
        }

        const queueSlice = queueReducer(
          { queue: state.queue, seqCounter: state.meta.queueSeqCounter },
          action
        )
        const assignedAt = nowMs()

        return recordEvent({
          ...state,
          chairs: state.chairs.map((chair) => {
            if (chair.id !== idleChair.id) return chair

            return {
              ...chair,
              status: 'assigned',
              techId: readyTech.id,
              customerName: next.customerName,
              assignedAt,
              startedAt: null,
              endsAt: null,
              completedAt: null,
              lastCompletionToken: null,
            }
          }),
          techs: techReducer(state.techs, {
            type: 'TECH_ASSIGNED',
            payload: {
              techId: readyTech.id,
              chairId: idleChair.id,
            },
          }),
          queue: queueSlice.queue,
          meta: {
            ...state.meta,
            queueSeqCounter: queueSlice.seqCounter,
          },
        }, action)
      }

      const queueSlice = queueReducer(
        { queue: state.queue, seqCounter: state.meta.queueSeqCounter },
        action
      )

      return recordEvent({
        ...state,
        queue: queueSlice.queue,
        meta: {
          ...state.meta,
          queueSeqCounter: queueSlice.seqCounter,
        },
      }, action)
    }

    default:
      return state
  }
}
