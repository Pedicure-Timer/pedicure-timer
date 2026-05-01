import type { AppState } from '@/application/state/AppState'

export interface IStorageAdapter {
  save(state: AppState): void
  load(): AppState | null
  clear(): void
}
