import { useState, useEffect } from 'react'
import { computeSnapshot } from '@/domain/value-objects/TimerSnapshot'

export const useCountdown = (endsAt: number | null) => {
  const [snapshot, setSnapshot] = useState(() =>
    computeSnapshot(endsAt, Date.now())
  )

  useEffect(() => {
    if (endsAt === null) {
      setSnapshot({ remainingMs: 0, isExpired: false })
      return
    }

    const updateSnapshot = () => {
      setSnapshot(computeSnapshot(endsAt, Date.now()))
    }

    updateSnapshot()
    const interval = setInterval(updateSnapshot, 500)

    return () => clearInterval(interval)
  }, [endsAt])

  return snapshot
}
