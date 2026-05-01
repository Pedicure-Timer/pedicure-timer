import type { IStorageAdapter } from './StorageAdapter'
import type { AppState } from '@/application/state/AppState'
import { STORAGE_KEY, SCHEMA_VERSION } from '@/shared/constants/schema'

export class LocalStorageAdapter implements IStorageAdapter {
  save(state: AppState): void {
    try {
      const serialized = JSON.stringify(state)
      localStorage.setItem(STORAGE_KEY, serialized)
    } catch (error) {
      console.error('Failed to save state:', error)
    }
  }

  load(): AppState | null {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY)
      if (!serialized) return null

      const parsed = JSON.parse(serialized) as AppState
      if (parsed.meta?.schemaVersion !== SCHEMA_VERSION) {
        console.warn('Schema version mismatch, clearing storage')
        this.clear()
        return null
      }

      return parsed
    } catch (error) {
      console.error('Failed to load state:', error)
      return null
    }
  }

  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear storage:', error)
    }
  }
}
