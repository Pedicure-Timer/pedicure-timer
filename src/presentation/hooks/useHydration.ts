import { useEffect } from 'react'
import type { AppAction } from '@/application/actions'
import { LocalStorageAdapter } from '@/infrastructure/persistence'

const storage = new LocalStorageAdapter()

export const useHydration = (dispatch: React.Dispatch<AppAction>) => {
  useEffect(() => {
    const savedState = storage.load()
    if (savedState) {
      dispatch({ type: 'HYDRATE', payload: { state: savedState } })
    }
  }, [dispatch])
}
