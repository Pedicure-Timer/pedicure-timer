import { useEffect } from 'react'
import type { AppState } from '@/application/state/AppState'
import { LocalStorageAdapter } from '@/infrastructure/persistence'

const storage = new LocalStorageAdapter()

export const usePersistence = (state: AppState) => {
  useEffect(() => {
    storage.save(state)
  }, [state])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        storage.save(state)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [state])
}
