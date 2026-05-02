import type { ChairId, TechId } from '@/shared/types/branded'

export type ChairStatus = 'idle' | 'assigned' | 'running' | 'finished'
export type ServiceType = 'pedi' | 'mani'

export interface Chair {
  id: ChairId
  status: ChairStatus
  serviceType: ServiceType
  techId: TechId | null
  customerName: string | null
  assignedAt: number | null
  startedAt: number | null
  endsAt: number | null
  completedAt: number | null
  lastCompletionToken: string | null
}

export const isChairRunning = (chair: Chair): boolean => chair.status === 'running'
export const isChairIdle = (chair: Chair): boolean => chair.status === 'idle'
export const isChairAssigned = (chair: Chair): boolean => chair.status === 'assigned'
export const isChairFinished = (chair: Chair): boolean => chair.status === 'finished'
