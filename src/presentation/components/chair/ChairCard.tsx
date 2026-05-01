import React from 'react'
import type { Chair } from '@/domain/entities'
import { useCountdown } from '@/presentation/hooks/useCountdown'
import { useAppDispatch, useAppState } from '@/presentation/context/useAppDispatch'
import { formatCountdown } from '@/shared/utils/time'
import { getDurationMs } from '@/domain/value-objects/Duration'
import { useLanguage } from '@/shared/i18n'
import { Card, CardContent } from '@/presentation/components/ui/card'
import { Button } from '@/presentation/components/ui/button'
import { Badge } from '@/presentation/components/ui/badge'
import { Clock, Play, RotateCcw, User } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

interface ChairCardProps {
  chair: Chair
}

export const ChairCard: React.FC<ChairCardProps> = ({ chair }) => {
  const dispatch = useAppDispatch()
  const { settings } = useAppState()
  const { remainingMs } = useCountdown(chair.endsAt)
  const { t } = useLanguage()

  const handleStart = () => {
    const durationMs = settings.demoMode
      ? getDurationMs('demo-short')
      : getDurationMs('full-pedi')

    dispatch({
      type: 'CHAIR_STARTED',
      payload: {
        chairId: chair.id,
        durationMs,
        source: 'manual',
      },
    })
  }

  const handleReset = () => {
    dispatch({
      type: 'CHAIR_RESET',
      payload: { chairId: chair.id },
    })
  }

  const statusConfig = {
    idle: {
      badge: 'secondary' as const,
      label: t.idle,
      cardClass: 'border-border hover:border-muted-foreground/20',
      timerClass: 'text-muted-foreground',
    },
    running: {
      badge: 'default' as const,
      label: t.running,
      cardClass: 'border-primary/30 bg-primary/[0.02] hover:border-primary/50',
      timerClass: 'text-primary',
    },
    finished: {
      badge: 'destructive' as const,
      label: t.finished,
      cardClass: 'border-warning/30 bg-warning/[0.02] hover:border-warning/50 animate-pulse',
      timerClass: 'text-warning',
    },
  }[chair.status]

  return (
    <Card className={cn(
      'transition-all duration-300 hover:shadow-elevated',
      statusConfig.cardClass
    )}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
              <span className="text-sm font-bold text-foreground">
                {chair.id.slice(-1)}
              </span>
            </div>
            <h3 className="text-base font-semibold">
              {t.chair} {chair.id.slice(-1)}
            </h3>
          </div>
          <Badge variant={statusConfig.badge} className="font-medium">
            {statusConfig.label}
          </Badge>
        </div>

        {/* Timer Display */}
        <div className="mb-6 rounded-xl bg-muted/50 p-6">
          <div className="flex flex-col items-center justify-center">
            <Clock className={cn("h-8 w-8 mb-3", statusConfig.timerClass)} />
            <div className={cn(
              "text-5xl font-bold tabular-nums tracking-tight",
              statusConfig.timerClass
            )}>
              {chair.status === 'idle' ? '--:--' : formatCountdown(remainingMs)}
            </div>
            <div className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {chair.status === 'idle' ? t.ready : t.remaining}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {chair.status === 'idle' && (
            <Button
              onClick={handleStart}
              className="w-full h-11 shadow-sm"
              size="lg"
            >
              <Play className="w-4 h-4 mr-2" />
              {t.start}
            </Button>
          )}
          {chair.status !== 'idle' && (
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full h-11"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t.reset}
            </Button>
          )}
        </div>

        {/* Technician Info */}
        {chair.techId && (
          <div className="mt-4 pt-4 border-t flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{t.technician}:</span>
            <span className="font-medium">{chair.techId}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
