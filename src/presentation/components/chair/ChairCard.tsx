import React from 'react'
import type { Chair } from '@/domain/entities'
import { useCountdown } from '@/presentation/hooks/useCountdown'
import { useAppDispatch, useAppState } from '@/presentation/context/useAppDispatch'
import { formatCountdown } from '@/shared/utils/time'
import { getDurationMs } from '@/domain/value-objects/Duration'
import { cx } from '@/shared/utils/classNames'

interface ChairCardProps {
  chair: Chair
}

export const ChairCard: React.FC<ChairCardProps> = ({ chair }) => {
  const dispatch = useAppDispatch()
  const { settings } = useAppState()
  const { remainingMs } = useCountdown(chair.endsAt)

  const handleStart = () => {
    const durationMs = settings.demoMode
      ? getDurationMs('demo-short')
      : getDurationMs('full-pedi')

    dispatch({
      type: 'CHAIR_STARTED',
      payload: {
        chairId: chair.id,
        durationMs,
        source: 'manual',
      },
    })
  }

  const handleReset = () => {
    dispatch({
      type: 'CHAIR_RESET',
      payload: { chairId: chair.id },
    })
  }

  const statusColor = {
    idle: 'bg-gray-100 border-gray-300',
    running: 'bg-blue-50 border-blue-400',
    finished: 'bg-yellow-50 border-yellow-400',
  }[chair.status]

  const statusLabel = {
    idle: 'Idle',
    running: 'Running',
    finished: 'Finished',
  }[chair.status]

  return (
    <div className={cx('border-2 rounded-lg p-6', statusColor)}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">Chair {chair.id.slice(-1)}</h3>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-white border">
          {statusLabel}
        </span>
      </div>

      {chair.status === 'running' && (
        <div className="text-center my-6">
          <div className="text-5xl font-bold text-blue-600">
            {formatCountdown(remainingMs)}
          </div>
        </div>
      )}

      {chair.status === 'finished' && (
        <div className="text-center my-6">
          <div className="text-3xl font-bold text-yellow-600">
            Time's Up!
          </div>
        </div>
      )}

      <div className="mt-4">
        {chair.status === 'idle' && (
          <button
            onClick={handleStart}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Timer
          </button>
        )}

        {chair.status === 'finished' && (
          <button
            onClick={handleReset}
            className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
