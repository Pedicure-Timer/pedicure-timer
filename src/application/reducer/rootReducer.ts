import type { AppState } from '../state/AppState'
import type { AppAction } from '../actions'
import { chairReducer } from './chairReducer'
import { techReducer } from './techReducer'
import { queueReducer } from './queueReducer'
import { buildInitialState } from '../state/initialState'

export const rootReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'HYDRATE': {
      return action.payload.state
    }

    case 'RESET_ALL': {
      return buildInitialState()
    }

    case 'SOUND_ENABLED': {
      return {
        ...state,
        settings: {
          ...state.settings,
          soundEnabled: action.payload.enabled,
        },
      }
    }

    case 'DEMO_MODE_SET': {
      return {
        ...state,
        settings: {
          ...state.settings,
          demoMode: action.payload.enabled,
        },
      }
    }

    case 'CHAIR_STARTED':
    case 'CHAIR_EXPIRED':
    case 'CHAIR_RESET': {
      return {
        ...state,
        chairs: chairReducer(state.chairs, action),
      }
    }

    case 'TECH_READY':
    case 'TECH_ASSIGNED':
    case 'TECH_BUSY': {
      return {
        ...state,
        techs: techReducer(state.techs, action),
      }
    }

    case 'QUEUE_ENQUEUE':
    case 'QUEUE_ASSIGN_NEXT': {
      const queueSlice = queueReducer(
        { queue: state.queue, seqCounter: state.meta.queueSeqCounter },
        action
      )
      return {
        ...state,
        queue: queueSlice.queue,
        meta: {
          ...state.meta,
          queueSeqCounter: queueSlice.seqCounter,
        },
      }
    }

    default:
      return state
  }
}
