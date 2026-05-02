import type { AppState } from './AppState'
import { chairId, techId } from '@/shared/types/branded'
import { SCHEMA_VERSION } from '@/shared/constants/schema'

export const buildInitialState = (): AppState => ({
  chairs: [
    { id: chairId('chair-1'), status: 'idle', serviceType: 'pedi', techId: null, customerName: null, assignedAt: null, startedAt: null, endsAt: null, completedAt: null, lastCompletionToken: null },
    { id: chairId('chair-2'), status: 'idle', serviceType: 'pedi', techId: null, customerName: null, assignedAt: null, startedAt: null, endsAt: null, completedAt: null, lastCompletionToken: null },
    { id: chairId('chair-3'), status: 'idle', serviceType: 'pedi', techId: null, customerName: null, assignedAt: null, startedAt: null, endsAt: null, completedAt: null, lastCompletionToken: null },
    { id: chairId('chair-4'), status: 'idle', serviceType: 'pedi', techId: null, customerName: null, assignedAt: null, startedAt: null, endsAt: null, completedAt: null, lastCompletionToken: null },
  ],
  techs: [
    { id: techId('tech-1'), name: 'Lan', role: 'mani', status: 'busy', readyAt: null, chairId: null },
    { id: techId('tech-2'), name: 'Mai', role: 'mani', status: 'busy', readyAt: null, chairId: null },
    { id: techId('tech-3'), name: 'Hoa', role: 'mani', status: 'busy', readyAt: null, chairId: null },
    { id: techId('tech-4'), name: 'Ngọc', role: 'mani', status: 'busy', readyAt: null, chairId: null },
  ],
  queue: [],
  settings: {
    demoMode: true,
    soundEnabled: false,
  },
  meta: {
    queueSeqCounter: 0,
    schemaVersion: SCHEMA_VERSION,
    eventLog: [],
  },
})
