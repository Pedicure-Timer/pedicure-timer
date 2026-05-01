import React from 'react'
import { useAppState, useAppDispatch } from '@/presentation/context/useAppDispatch'

export const DemoControls: React.FC = () => {
  const { settings } = useAppState()
  const dispatch = useAppDispatch()

  const handleToggleDemo = () => {
    dispatch({
      type: 'DEMO_MODE_SET',
      payload: { enabled: !settings.demoMode },
    })
  }

  const handleResetAll = () => {
    if (confirm('Reset all chairs, techs, and queue?')) {
      dispatch({ type: 'RESET_ALL' })
    }
  }

  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 p-6">
      <h3 className="text-lg font-semibold mb-4">Demo Controls</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Demo Mode (40s/70s)</span>
          <button
            onClick={handleToggleDemo}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              settings.demoMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {settings.demoMode ? 'ON' : 'OFF'}
          </button>
        </div>

        <button
          onClick={handleResetAll}
          className="w-full py-2 px-4 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          Reset All
        </button>
      </div>
    </div>
  )
}
