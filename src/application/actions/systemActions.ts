import type { AppState } from '../state/AppState'

export interface HydrateAction {
  type: 'HYDRATE'
  payload: {
    state: AppState
  }
}

export interface LoadSampleStateAction {
  type: 'LOAD_SAMPLE_STATE'
}

export interface ResetAllAction {
  type: 'RESET_ALL'
}

export interface SoundEnabledAction {
  type: 'SOUND_ENABLED'
  payload: {
    enabled: boolean
  }
}

export interface DemoModeSetAction {
  type: 'DEMO_MODE_SET'
  payload: {
    enabled: boolean
  }
}

export type SystemAction = HydrateAction | LoadSampleStateAction | ResetAllAction | SoundEnabledAction | DemoModeSetAction
