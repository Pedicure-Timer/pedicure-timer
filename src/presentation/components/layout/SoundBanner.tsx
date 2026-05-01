import React from 'react'
import { useAppState, useAppDispatch } from '@/presentation/context/useAppDispatch'
import { useSound } from '@/presentation/hooks/useSound'
import { useLanguage } from '@/shared/i18n'
import { Button } from '@/presentation/components/ui/button'
import { Volume2 } from 'lucide-react'

export const SoundBanner: React.FC = () => {
  const { settings } = useAppState()
  const dispatch = useAppDispatch()
  const { enable } = useSound()
  const { t } = useLanguage()

  const handleEnable = async () => {
    await enable()
    dispatch({
      type: 'SOUND_ENABLED',
      payload: { enabled: true },
    })
  }

  if (settings.soundEnabled) return null

  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-amber-900 font-medium flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            {t.soundBannerText}
          </p>
          <Button onClick={handleEnable} variant="default" size="sm">
            {t.enableSound}
          </Button>
        </div>
      </div>
    </div>
  )
}
