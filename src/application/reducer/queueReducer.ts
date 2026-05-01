import type { QueueEntry } from '@/domain/entities'
import type { QueueAction } from '../actions/queueActions'
import { nextInQueue } from '@/domain/rules/queueRules'
import { generateId } from '@/shared/utils/id'
import { queueId } from '@/shared/types/branded'
import { nowMs } from '@/shared/utils/time'

interface QueueSlice {
  queue: QueueEntry[]
  seqCounter: number
}

export const queueReducer = (
  slice: QueueSlice,
  action: QueueAction,
): QueueSlice => {
  switch (action.type) {
    case 'QUEUE_ENQUEUE': {
      const { customerName, source } = action.payload
      if (customerName.trim().length === 0) return slice

      const newSeq = slice.seqCounter + 1
      const newEntry: QueueEntry = {
        id: queueId(generateId()),
        customerName: customerName.trim(),
        source,
        enqueuedAt: nowMs(),
        seq: newSeq,
        assignedTechId: null,
      }
      return {
        queue: [...slice.queue, newEntry],
        seqCounter: newSeq,
      }
    }

    case 'QUEUE_ASSIGN_NEXT': {
      const next = nextInQueue(slice.queue)
      if (!next) return slice

      const updatedQueue = slice.queue.map((entry) =>
        entry.id === next.id
          ? { ...entry, assignedTechId: null }
          : entry
      ).filter((entry) => entry.id !== next.id)

      return {
        ...slice,
        queue: updatedQueue,
      }
    }

    default:
      return slice
  }
}
