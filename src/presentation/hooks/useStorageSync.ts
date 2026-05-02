import { useEffect } from 'react'
import type { AppAction } from '@/application/actions'
import { LocalStorageAdapter } from '@/infrastructure/persistence'
import { STORAGE_KEY } from '@/shared/constants/schema'

const storage = new LocalStorageAdapter()

export const useStorageSync = (dispatch: React.Dispatch<AppAction>) => {
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return

      if (event.newValue === null) {
        dispatch({ type: 'RESET_ALL' })
        return
      }

      const state = storage.load()
      if (state) {
        dispatch({ type: 'HYDRATE', payload: { state } })
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [dispatch])
}