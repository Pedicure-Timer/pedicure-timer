import type { Chair } from '../entities/Chair'

export const canStart = (chair: Chair): boolean => {
  return chair.status === 'idle' || chair.status === 'assigned'
}

export const canReset = (chair: Chair): boolean => {
  return chair.status === 'finished'
}

export const isExpired = (chair: Chair, nowMs: number): boolean => {
  if (chair.status !== 'running' || chair.endsAt === null) {
    return false
  }
  return nowMs >= chair.endsAt
}

export const shouldTransitionToFinished = (chair: Chair, nowMs: number): boolean => {
  return chair.status === 'running' && isExpired(chair, nowMs)
}

export const findIdleChair = (chairs: Chair[]): Chair | null => {
  return chairs.find((chair) => chair.status === 'idle') ?? null
}
