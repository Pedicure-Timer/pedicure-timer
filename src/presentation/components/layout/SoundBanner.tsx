import React from 'react'
import { useAppState, useAppDispatch } from '@/presentation/context/useAppDispatch'
import { useSound } from '@/presentation/hooks/useSound'

export const SoundBanner: React.FC = () => {
  const { settings } = useAppState()
  const dispatch = useAppDispatch()
  const { enable } = useSound()

  const handleEnable = async () => {
    await enable()
    dispatch({
      type: 'SOUND_ENABLED',
      payload: { enabled: true },
    })
  }

  if (settings.soundEnabled) return null

  return (
    <div className="bg-yellow-50 border-b-2 border-yellow-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-yellow-800">
          Enable sound to hear alerts when timers finish
        </p>
        <button
          onClick={handleEnable}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
        >
          Enable Sound
        </button>
      </div>
    </div>
  )
}
