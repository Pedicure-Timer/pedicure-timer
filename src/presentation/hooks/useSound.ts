import { useState, useCallback, useEffect } from 'react'
import type { AppAction } from '@/application/actions'
import { WebAudioAdapter } from '@/infrastructure/audio'
import { SOUND_STORAGE_KEY, TOAST_STORAGE_KEY, SOUND_CONSENT_ASKED_STORAGE_KEY } from '@/shared/constants/schema'
import {
  readStoredSoundEnabled,
  readStoredToastEnabled,
  readStoredSoundConsentAsked,
  writeStoredSoundConsentAsked,
} from './uiPreferences'

const audioAdapter = new WebAudioAdapter()

const writeBooleanPreference = (storageKey: string, enabled: boolean): void => {
  try {
    localStorage.setItem(storageKey, String(enabled))
  } catch (error) {
    console.error(`Failed to persist preference for ${storageKey}:`, error)
  }
}

export const useSound = () => {
  const [enabled, setEnabled] = useState(audioAdapter.isEnabled())

  const syncEnabled = useCallback(() => {
    setEnabled(audioAdapter.isEnabled())
  }, [])

  const enable = useCallback(async () => {
    await audioAdapter.enable()
    setEnabled(audioAdapter.isEnabled())
    return audioAdapter.isEnabled()
  }, [])

  const getStoredPreference = useCallback(() => {
    return readStoredSoundEnabled(false)
  }, [])

  const getStoredToastPreference = useCallback(() => {
    return readStoredToastEnabled(true)
  }, [])

  const setStoredPreference = useCallback((nextEnabled: boolean) => {
    writeBooleanPreference(SOUND_STORAGE_KEY, nextEnabled)
  }, [])

  const setStoredToastPreference = useCallback((nextEnabled: boolean) => {
    writeBooleanPreference(TOAST_STORAGE_KEY, nextEnabled)
  }, [])

  const getSoundConsentAsked = useCallback(() => {
    return readStoredSoundConsentAsked()
  }, [])

  const markSoundConsentAsked = useCallback((asked: boolean) => {
    writeStoredSoundConsentAsked(asked)
  }, [])

  const stopLoop = useCallback(() => {
    audioAdapter.stopLoop()
  }, [])

  const resetSoundConsentPrompt = useCallback((dispatch: React.Dispatch<AppAction>) => {
    try {
      localStorage.removeItem(SOUND_CONSENT_ASKED_STORAGE_KEY)
      localStorage.removeItem(SOUND_STORAGE_KEY)
    } catch (error) {
      console.error('Failed to reset sound consent prompt:', error)
    }

    dispatch({
      type: 'SOUND_ENABLED',
      payload: { enabled: false },
    })

    stopLoop()
  }, [stopLoop])

  const setSoundEnabledPreference = useCallback(async (
    nextEnabled: boolean,
    dispatch: React.Dispatch<AppAction>,
    options?: { markConsent?: boolean; preview?: boolean }
  ) => {
    const { markConsent = true, preview = false } = options ?? {}

    if (markConsent) {
      writeStoredSoundConsentAsked(true)
    }

    writeBooleanPreference(SOUND_STORAGE_KEY, nextEnabled)

    if (nextEnabled) {
      await audioAdapter.enable()
      setEnabled(audioAdapter.isEnabled())

      if (audioAdapter.isEnabled() && preview) {
        audioAdapter.beep()
      }
    } else {
      audioAdapter.stopLoop()
      setEnabled(audioAdapter.isEnabled())
    }

    dispatch({
      type: 'SOUND_ENABLED',
      payload: { enabled: nextEnabled },
    })
  }, [])

  const setToastEnabledPreference = useCallback((
    nextEnabled: boolean,
    dispatch: React.Dispatch<AppAction>
  ) => {
    writeBooleanPreference(TOAST_STORAGE_KEY, nextEnabled)

    dispatch({
      type: 'TOAST_ENABLED',
      payload: { enabled: nextEnabled },
    })
  }, [])

  useEffect(() => {
    if (!readStoredSoundConsentAsked()) return
    if (!readStoredSoundEnabled(false)) return
    void enable()
  }, [enable])

  const beep = useCallback(() => {
    audioAdapter.beep()
  }, [])

  const startLoop = useCallback((kind: 'start' | 'finish') => {
    audioAdapter.startLoop(kind)
  }, [])

  return {
    enabled,
    enable,
    syncEnabled,
    getStoredPreference,
    setStoredPreference,
    getStoredToastPreference,
    setStoredToastPreference,
    getSoundConsentAsked,
    markSoundConsentAsked,
    resetSoundConsentPrompt,
    setSoundEnabledPreference,
    setToastEnabledPreference,
    beep,
    startLoop,
    stopLoop,
  }
}
