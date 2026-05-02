import { SOUND_STORAGE_KEY, TOAST_STORAGE_KEY, SOUND_CONSENT_ASKED_STORAGE_KEY } from '@/shared/constants/schema'
import type { AppState } from '@/application/state/AppState'

const readBooleanPreference = (storageKey: string, defaultValue: boolean): boolean => {
  try {
    const stored = localStorage.getItem(storageKey)
    if (stored === null) return defaultValue
    return stored === 'true'
  } catch {
    return defaultValue
  }
}

export const readStoredSoundEnabled = (defaultValue = false): boolean => {
  return readBooleanPreference(SOUND_STORAGE_KEY, defaultValue)
}

export const readStoredToastEnabled = (defaultValue = true): boolean => {
  return readBooleanPreference(TOAST_STORAGE_KEY, defaultValue)
}

export const readStoredSoundConsentAsked = (): boolean => {
  return readBooleanPreference(SOUND_CONSENT_ASKED_STORAGE_KEY, false)
}

export const writeStoredSoundConsentAsked = (asked: boolean): void => {
  try {
    localStorage.setItem(SOUND_CONSENT_ASKED_STORAGE_KEY, String(asked))
  } catch (error) {
    console.error('Failed to persist sound consent state:', error)
  }
}

export const applyStoredUiPreferences = (state: AppState): AppState => {
  return {
    ...state,
    settings: {
      ...state.settings,
      soundEnabled: readStoredSoundEnabled(state.settings.soundEnabled),
      toastEnabled: readStoredToastEnabled(state.settings.toastEnabled),
    },
  }
}
