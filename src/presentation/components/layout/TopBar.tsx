import React from 'react'
import { useAppState } from '@/presentation/context/useAppDispatch'
import { useLanguage } from '@/shared/i18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Armchair, Users, Activity } from 'lucide-react'

export const TopBar: React.FC = () => {
  const { chairs, queue } = useAppState()
  const { t } = useLanguage()

  const activeChairs = chairs.filter((c) => c.status === 'running').length
  const queueLength = queue.filter((e) => e.assignedTechId === null).length

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                {t.appTitle}
              </h1>
              <p className="text-xs text-muted-foreground">Real-time management</p>
            </div>
          </div>

          {/* Stats & Controls */}
          <div className="flex items-center gap-6">
            {/* Stats */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2">
                <Armchair className="h-4 w-4 text-primary" />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-medium text-muted-foreground">{t.activeChairs}</span>
                  <span className="text-lg font-bold text-primary">{activeChairs}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-accent/5 px-3 py-2">
                <Users className="h-4 w-4 text-accent" />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-medium text-muted-foreground">{t.queue}</span>
                  <span className="text-lg font-bold text-accent">{queueLength}</span>
                </div>
              </div>
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
