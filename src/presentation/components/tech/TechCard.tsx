import React from 'react'
import type { Tech } from '@/domain/entities'
import { useAppDispatch } from '@/presentation/context/useAppDispatch'
import { cx } from '@/shared/utils/classNames'

interface TechCardProps {
  tech: Tech
}

export const TechCard: React.FC<TechCardProps> = ({ tech }) => {
  const dispatch = useAppDispatch()

  const handleReady = () => {
    dispatch({
      type: 'TECH_READY',
      payload: { techId: tech.id },
    })
  }

  const statusColor = {
    busy: 'bg-gray-100 border-gray-300',
    ready: 'bg-green-50 border-green-400',
    assigned: 'bg-blue-50 border-blue-400',
  }[tech.status]

  const statusLabel = {
    busy: 'Busy',
    ready: 'Ready',
    assigned: 'Assigned',
  }[tech.status]

  return (
    <div className={cx('border-2 rounded-lg p-4', statusColor)}>
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold">{tech.name}</h4>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-white border">
          {statusLabel}
        </span>
      </div>

      {tech.status === 'busy' && (
        <button
          onClick={handleReady}
          className="w-full py-2 px-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          I'm Ready
        </button>
      )}
    </div>
  )
}
