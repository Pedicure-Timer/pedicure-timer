import React from 'react'
import type { Chair } from '@/domain/entities'
import { useCountdown } from '@/presentation/hooks/useCountdown'
import { useAppDispatch, useAppState } from '@/presentation/context/useAppDispatch'
import { formatCountdown } from '@/shared/utils/time'
import { getDurationMs } from '@/domain/value-objects/Duration'
import { useLanguage } from '@/shared/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Button } from '@/presentation/components/ui/button'
import { Badge } from '@/presentation/components/ui/badge'
import { Clock, Play, RotateCcw } from 'lucide-react'

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
      variant: 'secondary' as const,
      label: t.idle,
    },
    running: {
      variant: 'default' as const,
      label: t.running,
    },
    finished: {
      variant: 'destructive' as const,
      label: t.finished,
    },
  }[chair.status]

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            {t.chair} {chair.id.slice(-1)}
          </CardTitle>
          <Badge variant={statusConfig.variant}>
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <Clock className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
            <div className="text-4xl font-bold tabular-nums">
              {chair.status === 'idle' ? '--:--' : formatCountdown(remainingMs)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {chair.status === 'idle' ? t.ready : t.remaining}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {chair.status === 'idle' && (
            <Button onClick={handleStart} className="flex-1" size="lg">
              <Play className="w-4 h-4 mr-2" />
              {t.start}
            </Button>
          )}
          {chair.status !== 'idle' && (
            <Button onClick={handleReset} variant="outline" className="flex-1" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              {t.reset}
            </Button>
          )}
        </div>

        {chair.techId && (
          <div className="pt-2 border-t">
            <div className="text-xs text-muted-foreground">{t.technician}</div>
            <div className="text-sm font-medium">{chair.techId}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
