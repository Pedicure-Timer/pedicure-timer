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
    },
    ready: {
      variant: 'default' as const,
      label: t.ready,
      cardClass: 'border-success/30 bg-success/[0.02]',
      iconClass: 'text-success',
    },
    assigned: {
      variant: 'outline' as const,
      label: t.assigned,
      cardClass: 'border-accent/30 bg-accent/[0.02]',
      iconClass: 'text-accent',
    },
  }[tech.status]

  return (
    <Card className={cn(
      'transition-all duration-300 hover:shadow-elevated',
      statusConfig.cardClass
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg bg-muted",
              tech.status === 'ready' && 'bg-success/10',
              tech.status === 'assigned' && 'bg-accent/10'
            )}>
              <User className={cn("h-4 w-4", statusConfig.iconClass)} />
            </div>
            <h4 className="font-semibold text-sm">{tech.name}</h4>
          </div>
          <Badge variant={statusConfig.variant} className="text-xs">
            {statusConfig.label}
          </Badge>
        </div>

        {tech.status === 'busy' && (
          <Button
            onClick={handleReady}
            variant="outline"
            size="sm"
            className="w-full mt-2 h-9"
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
            {t.imReady}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
