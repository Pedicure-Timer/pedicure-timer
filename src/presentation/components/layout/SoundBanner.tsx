import React, { useState } from 'react'
import { useAppDispatch, useAppState } from '@/presentation/context/useAppDispatch'
import { useSound } from '@/presentation/hooks/useSound'
import { readStoredSoundConsentAsked } from '@/presentation/hooks/uiPreferences'
import { useLanguage } from '@/shared/i18n'
import { Button } from '@/presentation/components/ui/button'
import { BellRing, Volume2, X } from 'lucide-react'

export const SoundBanner: React.FC = () => {
  const { settings } = useAppState()
  const dispatch = useAppDispatch()
  const { setSoundEnabledPreference } = useSound()
  const { t } = useLanguage()
  const [hidden, setHidden] = useState(false)

  const alreadyAsked = readStoredSoundConsentAsked()

  const handleEnable = async () => {
    await setSoundEnabledPreference(true, dispatch, {
      markConsent: true,
      preview: true,
    })
  }

  const handleDismiss = async () => {
    await setSoundEnabledPreference(false, dispatch, {
      markConsent: true,
      preview: false,
    })
    setHidden(true)
  }

  if (alreadyAsked || hidden || settings.soundEnabled) return null

  return (
    <div className="border-b border-warning/20 bg-warning/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col gap-3 rounded-2xl border border-warning/20 bg-card/90 px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-warning/15 text-warning ring-1 ring-warning/20">
              <BellRing className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">{t.soundBannerTitle}</p>
              <p className="text-sm text-muted-foreground">{t.soundBannerDescription}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleEnable} size="sm" className="shadow-sm">
              <Volume2 className="h-4 w-4" />
              {t.enableSound}
            </Button>
            <Button onClick={handleDismiss} variant="ghost" size="sm" className="text-muted-foreground">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
