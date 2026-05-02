import { useEffect } from 'react'
import type { AppAction } from '@/application/actions'
import { LocalStorageAdapter } from '@/infrastructure/persistence'
import { STORAGE_KEY, SOUND_STORAGE_KEY, TOAST_STORAGE_KEY } from '@/shared/constants/schema'
import { applyStoredUiPreferences } from './uiPreferences'

const storage = new LocalStorageAdapter()

export const useStorageSync = (dispatch: React.Dispatch<AppAction>) => {
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== SOUND_STORAGE_KEY && event.key !== TOAST_STORAGE_KEY) return

      if (event.key === STORAGE_KEY && event.newValue === null) {
        dispatch({ type: 'RESET_ALL' })
        return
      }

      const state = storage.load()
      if (state) {
        dispatch({
          type: 'HYDRATE',
          payload: { state: applyStoredUiPreferences(state) },
        })
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [dispatch])
}
