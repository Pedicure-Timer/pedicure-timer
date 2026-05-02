import React from 'react'
import { useAppState } from '@/presentation/context/useAppDispatch'
import { useLanguage } from '@/shared/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Badge } from '@/presentation/components/ui/badge'
import { ScrollText } from 'lucide-react'
import { epochToHuman } from '@/shared/utils/time'

export const EventLogPanel: React.FC = () => {
  const { meta } = useAppState()
  const { t } = useLanguage()

  return (
    <Card className="shadow-elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            <ScrollText className="w-4 h-4 text-foreground" />
          </div>
          {t.eventLogTitle}
          <Badge variant="secondary" className="ml-auto">
            {meta.eventLog.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {meta.eventLog.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
            {t.eventLogEmpty}
          </p>
        ) : (
          <div className="space-y-2">
            {[...meta.eventLog].reverse().map((entry) => (
              <div key={entry.id} className="rounded-lg border bg-muted/30 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">{entry.label}</p>
                  <span className="text-[11px] text-muted-foreground">{epochToHuman(entry.timestamp)}</span>
                </div>
                {entry.detail ? (
                  <p className="mt-1 text-xs text-muted-foreground">{entry.detail}</p>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}