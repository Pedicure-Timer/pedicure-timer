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
  const canStart = chair.status === 'assigned' && Boolean(chair.customerName) && Boolean(chair.techId)
  const isRunning = chair.status === 'running'

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
        techId: chair.techId ?? undefined,
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
    assigned: {
      badge: 'outline' as const,
      label: t.assigned,
      cardClass: 'border-accent/30 bg-accent/[0.02] hover:border-accent/50',
      timerClass: 'text-accent',
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
      'transition-all duration-300 hover:shadow-elevated overflow-hidden',
      statusConfig.cardClass
    )}>
      <div className={cn(
        "h-1.5 w-full",
        chair.status === 'idle' && 'bg-muted',
        chair.status === 'assigned' && 'bg-accent',
        chair.status === 'running' && 'bg-primary',
        chair.status === 'finished' && 'bg-warning'
      )} />
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted text-foreground ring-1 ring-border/60">
              <span className="text-sm font-bold text-foreground">
                {chair.id.slice(-1)}
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold">
              {t.chair} {chair.id.slice(-1)}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{t.chairDescription}</p>
            </div>
          </div>
          <Badge variant={statusConfig.badge} className="font-semibold rounded-full px-3 py-1">
            {statusConfig.label}
          </Badge>
        </div>

        {/* Timer Display */}
        <div className={cn(
          'mb-6 rounded-3xl border p-5 sm:p-6 transition-colors',
          isRunning
            ? 'border-primary/25 bg-primary/[0.03]'
            : chair.status === 'assigned'
              ? 'border-accent/25 bg-accent/[0.03]'
              : 'border-border/70 bg-muted/20'
        )}>
          {isRunning ? (
            <div className="flex flex-col items-center justify-center text-center">
              <Clock className={cn('h-7 w-7 mb-3', statusConfig.timerClass)} />
              <div className={cn(
                'text-4xl sm:text-5xl font-extrabold tabular-nums tracking-tight',
                statusConfig.timerClass
              )}>
                {formatCountdown(remainingMs)}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {t.remaining}
              </div>
            </div>
          ) : chair.status === 'assigned' ? (
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/15">
                <Clock className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground">{t.assigned}</div>
                <div className="mt-1 text-xs leading-6 text-muted-foreground">
                  {chair.customerName ? chair.customerName : t.chairWaitingHint}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-muted/70 text-muted-foreground ring-1 ring-border/60">
                <Clock className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground">{t.chairReadyHint}</div>
                <div className="mt-1 text-xs leading-6 text-muted-foreground">
                  {t.chairWaitingHint}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {canStart && (
            <Button
              onClick={handleStart}
              className="w-full h-12 shadow-sm rounded-2xl"
              size="lg"
            >
              <Play className="w-4 h-4 mr-2" />
              {t.start}
            </Button>
          )}
          {!canStart && chair.status !== 'running' && chair.status !== 'finished' && (
            <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 px-4 py-3 text-xs leading-6 text-muted-foreground">
              {t.startRequiresAssignment}
            </div>
          )}
          {(chair.status === 'running' || chair.status === 'finished') && (
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full h-12 rounded-2xl"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t.reset}
            </Button>
          )}
        </div>

        {chair.customerName && (
          <div className="mt-4 rounded-2xl border border-border/70 bg-muted/25 px-4 py-3 text-sm">
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {t.customer}
            </div>
            <p className="mt-1 font-semibold text-foreground">{chair.customerName}</p>
          </div>
        )}

        {/* Technician Info */}
        {chair.techId && (
          <div className="mt-4 pt-4 border-t border-border/70 flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{t.technician}:</span>
            <span className="font-semibold text-foreground">{chair.techId}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
