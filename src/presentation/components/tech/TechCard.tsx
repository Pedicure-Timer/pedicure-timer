import React from 'react'
import type { Tech } from '@/domain/entities'
import { useAppDispatch } from '@/presentation/context/useAppDispatch'
import { useLanguage } from '@/shared/i18n'
import { Card, CardContent } from '@/presentation/components/ui/card'
import { Button } from '@/presentation/components/ui/button'
import { Badge } from '@/presentation/components/ui/badge'
import { User, CheckCircle } from 'lucide-react'

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
    },
    ready: {
      variant: 'default' as const,
      label: t.ready,
    },
    assigned: {
      variant: 'outline' as const,
      label: t.assigned,
    },
  }[tech.status]

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <h4 className="font-semibold">{tech.name}</h4>
          </div>
          <Badge variant={statusConfig.variant}>
            {statusConfig.label}
          </Badge>
        </div>

        {tech.status === 'busy' && (
          <Button onClick={handleReady} variant="outline" size="sm" className="w-full">
            <CheckCircle className="w-4 h-4 mr-2" />
            {t.imReady}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
