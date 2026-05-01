import React from 'react'
import { useAppState } from '@/presentation/context/useAppDispatch'
import { useLanguage } from '@/shared/i18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Badge } from '@/presentation/components/ui/badge'
import { Armchair, Users } from 'lucide-react'

export const TopBar: React.FC = () => {
  const { chairs, queue } = useAppState()
  const { t } = useLanguage()

  const activeChairs = chairs.filter((c) => c.status === 'running').length
  const queueLength = queue.filter((e) => e.assignedTechId === null).length

  return (
    <div className="bg-background border-b shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {t.appTitle}
          </h1>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Armchair className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t.activeChairs}:</span>
                <Badge variant="default">{activeChairs}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t.queue}:</span>
                <Badge variant="secondary">{queueLength}</Badge>
              </div>
            </div>

            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  )
}
