import React from 'react'
import { useAppState, useAppDispatch } from '@/presentation/context/useAppDispatch'
import { useSound } from '@/presentation/hooks/useSound'
import { useLanguage } from '@/shared/i18n'
import { Button } from '@/presentation/components/ui/button'
import { Volume2, X } from 'lucide-react'

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

  const handleDismiss = () => {
    dispatch({
      type: 'SOUND_ENABLED',
      payload: { enabled: true },
    })
  }

  if (settings.soundEnabled) return null

  return (
    <div className="border-b bg-warning/5 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
              <Volume2 className="h-4 w-4 text-warning" />
            </div>
            <p className="text-sm font-medium text-foreground">
              {t.soundBannerText}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleEnable} size="sm" className="shadow-sm">
              {t.enableSound}
            </Button>
            <Button onClick={handleDismiss} variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
