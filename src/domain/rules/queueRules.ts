import type { QueueEntry } from '../entities/QueueEntry'
import type { Tech } from '../entities/Tech'

export const canEnqueue = (customerName: string): boolean => {
  return customerName.trim().length > 0
}

export const sortQueue = (queue: QueueEntry[]): QueueEntry[] => {
  return [...queue].sort((a, b) => {
    if (a.enqueuedAt !== b.enqueuedAt) {
      return a.enqueuedAt - b.enqueuedAt
    }
    return a.seq - b.seq
  })
}

export const nextInQueue = (queue: QueueEntry[]): QueueEntry | null => {
  const unassigned = queue.filter((e) => e.assignedTechId === null)
  if (unassigned.length === 0) return null
  const sorted = sortQueue(unassigned)
  return sorted[0]
}

export const findReadyTech = (techs: Tech[]): Tech | null => {
  const ready = techs.filter((t) => t.status === 'ready')
  if (ready.length === 0) return null
  ready.sort((a, b) => {
    if (a.readyAt === null) return 1
    if (b.readyAt === null) return -1
    return a.readyAt - b.readyAt
  })
  return ready[0]
}
