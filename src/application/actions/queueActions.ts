import type { QueueSource } from '@/domain/entities'

export interface QueueEnqueueAction {
  type: 'QUEUE_ENQUEUE'
  payload: {
    customerName: string
    source: QueueSource
  }
}

export interface QueueAssignNextAction {
  type: 'QUEUE_ASSIGN_NEXT'
}

export type QueueAction = QueueEnqueueAction | QueueAssignNextAction
