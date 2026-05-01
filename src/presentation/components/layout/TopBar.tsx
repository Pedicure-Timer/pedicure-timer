import React from 'react'
import { useAppState } from '@/presentation/context/useAppDispatch'

export const TopBar: React.FC = () => {
  const { chairs, queue } = useAppState()

  const activeChairs = chairs.filter((c) => c.status === 'running').length
  const queueLength = queue.filter((e) => e.assignedTechId === null).length

  return (
    <div className="bg-white border-b-2 border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Pedicure Timer & Queue
        </h1>
        <div className="flex gap-6 text-sm">
          <div>
            <span className="text-gray-600">Active Chairs:</span>{' '}
            <span className="font-semibold">{activeChairs}</span>
          </div>
          <div>
            <span className="text-gray-600">Queue:</span>{' '}
            <span className="font-semibold">{queueLength}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
