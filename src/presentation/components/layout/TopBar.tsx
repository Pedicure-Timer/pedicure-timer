import React from 'react'
import { useLanguage } from '@/shared/i18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Activity } from 'lucide-react'

export const TopBar: React.FC = () => {
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-card/85 backdrop-blur-xl supports-[backdrop-filter]:bg-card/70 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/10">
              <Activity className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-success">
                {t.liveDemoBadge}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-balance">{t.appTitle}</h1>
              <p className="max-w-2xl text-sm text-muted-foreground">{t.topBarDescription}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
