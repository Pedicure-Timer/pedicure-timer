import { useState, useCallback } from 'react'
import { WebAudioAdapter } from '@/infrastructure/audio'

const audioAdapter = new WebAudioAdapter()

export const useSound = () => {
  const [enabled, setEnabled] = useState(audioAdapter.isEnabled())

  const enable = useCallback(async () => {
    await audioAdapter.enable()
    setEnabled(audioAdapter.isEnabled())
  }, [])

  const beep = useCallback(() => {
    audioAdapter.beep()
  }, [])

  return { enabled, enable, beep }
}
