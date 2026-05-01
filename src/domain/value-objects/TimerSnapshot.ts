export interface TimerSnapshot {
  remainingMs: number
  isExpired: boolean
}

export const computeSnapshot = (endsAt: number | null, nowMs: number): TimerSnapshot => {
  if (endsAt === null) {
    return { remainingMs: 0, isExpired: false }
  }
  const remainingMs = Math.max(0, endsAt - nowMs)
  return {
    remainingMs,
    isExpired: remainingMs === 0,
  }
}
