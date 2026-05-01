import React, { useState } from 'react'
import { useAppState, useAppDispatch } from '@/presentation/context/useAppDispatch'
import { sortQueue, nextInQueue, findReadyTech } from '@/domain/rules/queueRules'

export const QueuePanel: React.FC = () => {
  const { queue, techs } = useAppState()
  const dispatch = useAppDispatch()
  const [customerName, setCustomerName] = useState('')

  const sortedQueue = sortQueue(queue)
  const next = nextInQueue(queue)
  const readyTech = findReadyTech(techs)

  const handleEnqueue = (e: React.FormEvent) => {
    e.preventDefault()
    if (customerName.trim().length === 0) return

    dispatch({
      type: 'QUEUE_ENQUEUE',
      payload: {
        customerName,
        source: 'manual',
      },
    })
    setCustomerName('')
  }

  const handleAssignNext = () => {
    if (!next || !readyTech) return

    dispatch({ type: 'QUEUE_ASSIGN_NEXT' })
    dispatch({
      type: 'TECH_ASSIGNED',
      payload: { techId: readyTech.id },
    })
  }

  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 p-6">
      <h2 className="text-xl font-bold mb-4">Manicure Queue</h2>

      <form onSubmit={handleEnqueue} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer name"
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      {sortedQueue.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Queue is empty</p>
      ) : (
        <div className="space-y-2 mb-6">
          {sortedQueue.map((entry, index) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-600">#{index + 1}</span>
                <span className="font-medium">{entry.customerName}</span>
              </div>
              {entry.id === next?.id && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  Next
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {next && readyTech && (
        <button
          onClick={handleAssignNext}
          className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Assign {next.customerName} to {readyTech.name}
        </button>
      )}

      {next && !readyTech && (
        <div className="text-center py-3 text-gray-500">
          Waiting for a tech to be ready...
        </div>
      )}
    </div>
  )
}
