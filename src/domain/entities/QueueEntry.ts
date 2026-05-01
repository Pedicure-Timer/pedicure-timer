import type { QueueId, TechId } from '@/shared/types/branded'

export type QueueSource = 'manual' | 'chair-finished'

export interface QueueEntry {
  id: QueueId
  customerName: string
  source: QueueSource
  enqueuedAt: number
  seq: number
  assignedTechId: TechId | null
}

export const isQueueEntryAssigned = (entry: QueueEntry): boolean => entry.assignedTechId !== null
