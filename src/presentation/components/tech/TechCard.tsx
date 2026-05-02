import React from 'react'
import type { Tech } from '@/domain/entities'
import { useAppDispatch } from '@/presentation/context/useAppDispatch'
import { useLanguage } from '@/shared/i18n'
import { Card, CardContent } from '@/presentation/components/ui/card'
import { Button } from '@/presentation/components/ui/button'
import { Badge } from '@/presentation/components/ui/badge'
import { User, CheckCircle2 } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

interface TechCardProps {
  tech: Tech
}

export const TechCard: React.FC<TechCardProps> = ({ tech }) => {
  const dispatch = useAppDispatch()
  const { t } = useLanguage()
  const canMarkReady = tech.status === 'busy' && !tech.chairId

  const statusDetails =
    tech.status === 'assigned'
      ? t.assignedHint
      : tech.status === 'busy' && tech.chairId
        ? t.busyHint
        : t.readyHint

  const handleReady = () => {
    dispatch({
      type: 'TECH_READY',
      payload: { techId: tech.id },
    })
  }

  const statusConfig = {
    busy: {
      variant: 'secondary' as const,
      label: t.busy,
      cardClass: 'border-border',
      iconClass: 'text-muted-foreground',
      helper: t.busyHint,
    },
    ready: {
      variant: 'default' as const,
      label: t.ready,
      cardClass: 'border-success/30 bg-success/[0.02]',
      iconClass: 'text-success',
      helper: t.readyHint,
    },
    assigned: {
      variant: 'outline' as const,
      label: t.assigned,
      cardClass: 'border-accent/30 bg-accent/[0.02]',
      iconClass: 'text-accent',
      helper: t.assignedHint,
    },
  }[tech.status]

  return (
    <Card className={cn(
      'transition-all duration-300 hover:shadow-elevated overflow-hidden',
      statusConfig.cardClass
    )}>
      <div className={cn(
        "h-1.5 w-full",
        tech.status === 'busy' && 'bg-muted-foreground',
        tech.status === 'ready' && 'bg-success',
        tech.status === 'assigned' && 'bg-accent'
      )} />
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3 gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-2xl bg-muted ring-1 ring-border/60 flex-shrink-0",
              tech.status === 'ready' && 'bg-success/10',
              tech.status === 'assigned' && 'bg-accent/10'
            )}>
              <User className={cn("h-4 w-4", statusConfig.iconClass)} />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-sm truncate">{tech.name}</h4>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{t.techDescription}</p>
            </div>
          </div>
          <Badge variant={statusConfig.variant} className="text-xs rounded-full px-3 py-1 whitespace-nowrap flex-shrink-0">
            {statusConfig.label}
          </Badge>
        </div>

        <div className="mb-3 rounded-2xl border border-border/70 bg-muted/20 px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <div className={cn(
              "flex h-7 w-7 items-center justify-center rounded-xl bg-muted ring-1 ring-border/60",
              tech.status === 'ready' && 'bg-success/10 text-success',
              tech.status === 'assigned' && 'bg-accent/10 text-accent',
              tech.status === 'busy' && 'bg-muted text-muted-foreground'
            )}>
              <User className="h-3.5 w-3.5" />
            </div>
            <span>{statusConfig.label}</span>
          </div>
          <div className="mt-2 text-xs leading-6 text-muted-foreground">
            {statusDetails}
          </div>
          {tech.chairId && (
            <div className="mt-2 text-xs text-foreground/80">
              {t.chair}: <span className="font-medium text-foreground">{tech.chairId}</span>
            </div>
          )}
        </div>

        {canMarkReady ? (
          <Button
            onClick={handleReady}
            variant="outline"
            size="sm"
            className="w-full mt-2 h-10 rounded-2xl"
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
            {t.imReady}
          </Button>
        ) : tech.status === 'busy' && tech.chairId ? (
          <div className="mt-2 rounded-2xl border border-border/70 bg-muted/20 px-4 py-3 text-xs leading-6 text-muted-foreground">
            {t.busyHint}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
