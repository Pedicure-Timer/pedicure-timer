import React, { useEffect } from 'react'
import { useLanguage } from '@/shared/i18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useAppDispatch, useAppState } from '@/presentation/context/useAppDispatch'
import { useSound } from '@/presentation/hooks/useSound'
import { Bell, BellOff, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/presentation/components/ui/button'
import { cn } from '@/shared/utils/cn'

export const TopBar: React.FC = () => {
  const { t } = useLanguage()
  const { settings } = useAppState()
  const dispatch = useAppDispatch()
  const {
    getStoredPreference,
    getStoredToastPreference,
    getSoundConsentAsked,
    resetSoundConsentPrompt,
    setSoundEnabledPreference,
    setToastEnabledPreference,
  } = useSound()

  useEffect(() => {
    const storedSoundEnabled = getStoredPreference()
    if (storedSoundEnabled !== settings.soundEnabled) {
      dispatch({
        type: 'SOUND_ENABLED',
        payload: { enabled: storedSoundEnabled },
      })
    }

    const storedToastEnabled = getStoredToastPreference()
    if (storedToastEnabled !== settings.toastEnabled) {
      dispatch({
        type: 'TOAST_ENABLED',
        payload: { enabled: storedToastEnabled },
      })
    }
  }, [dispatch, getStoredPreference, getStoredToastPreference, settings.soundEnabled, settings.toastEnabled])

  const handleToggleSound = async () => {
    await setSoundEnabledPreference(!settings.soundEnabled, dispatch, {
      markConsent: true,
      preview: true,
    })
  }

  const handleToggleToast = () => {
    setToastEnabledPreference(!settings.toastEnabled, dispatch)
  }

  const handleResetAudioPrompt = () => {
    resetSoundConsentPrompt(dispatch)
  }

  const soundConsentAsked = getSoundConsentAsked()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-card/85 backdrop-blur-xl supports-[backdrop-filter]:bg-card/70 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-success">
                {t.liveDemoBadge}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-balance">{t.appTitle}</h1>
              <p className="max-w-2xl text-sm text-muted-foreground">{t.topBarDescription}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleResetAudioPrompt}
              className="h-11 w-11 rounded-2xl border border-border/70 text-muted-foreground hover:text-foreground"
              aria-label={t.resetAudioPrompt}
              title={t.resetAudioPrompt}
            >
              <RotateCcw className="h-4.5 w-4.5" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleToggleToast}
              className={cn(
                'h-11 w-11 rounded-2xl border transition-all duration-200',
                settings.toastEnabled
                  ? 'border-sky-500/40 bg-sky-500/12 text-sky-600 hover:bg-sky-500/18 hover:text-sky-700 dark:text-sky-400'
                  : 'border-slate-400/40 bg-slate-400/10 text-slate-500 hover:bg-slate-400/16 hover:text-slate-600 dark:text-slate-400'
              )}
              aria-label={settings.toastEnabled ? t.toastToggleOff : t.toastToggleOn}
              title={settings.toastEnabled ? t.toastOn : t.toastOff}
            >
              {settings.toastEnabled ? <Bell className="h-4.5 w-4.5" /> : <BellOff className="h-4.5 w-4.5" />}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleToggleSound}
              className={cn(
                'h-11 w-11 rounded-2xl border transition-all duration-200',
                settings.soundEnabled
                  ? 'border-emerald-500/40 bg-emerald-500/12 text-emerald-600 hover:bg-emerald-500/18 hover:text-emerald-700 dark:text-emerald-400'
                  : soundConsentAsked
                    ? 'border-red-500/40 bg-red-500/12 text-red-600 hover:bg-red-500/18 hover:text-red-700 dark:text-red-400'
                    : 'border-amber-500/40 bg-amber-500/12 text-amber-600 hover:bg-amber-500/18 hover:text-amber-700 dark:text-amber-400'
              )}
              aria-label={settings.soundEnabled ? t.soundToggleOff : t.soundToggleOn}
              title={settings.soundEnabled ? t.soundOn : t.soundOff}
            >
              {settings.soundEnabled ? <Volume2 className="h-4.5 w-4.5" /> : <VolumeX className="h-4.5 w-4.5" />}
            </Button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
