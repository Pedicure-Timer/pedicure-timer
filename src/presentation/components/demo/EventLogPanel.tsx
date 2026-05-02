import React, { useState } from 'react'
import { useAppState } from '@/presentation/context/useAppDispatch'
import { useLanguage } from '@/shared/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Badge } from '@/presentation/components/ui/badge'
import { ScrollText, Search, X } from 'lucide-react'
import { epochToHuman } from '@/shared/utils/time'
import type { EventLogDetail } from '@/application/state/AppState'
import type { Translations } from '@/shared/i18n'
import { cn } from '@/shared/utils/cn'

const getEventLogLabel = (type: string, t: Translations) => {
  switch (type) {
    case 'CHAIR_STARTED':
      return t.eventLogChairStarted
    case 'CHAIR_EXPIRED':
      return t.eventLogChairFinished
    case 'CHAIR_RESET':
      return t.eventLogChairReset
    case 'TECH_READY':
      return t.eventLogTechMarkedReady
    case 'TECH_ASSIGNED':
      return t.eventLogTechAssigned
    case 'TECH_BUSY':
      return t.eventLogTechMarkedBusy
    case 'QUEUE_ENQUEUE':
      return t.eventLogCustomerAddedToQueue
    case 'QUEUE_ASSIGN_NEXT':
      return t.eventLogNextCustomerAssigned
    case 'RESET_ALL':
      return t.eventLogResetAllState
    case 'DEMO_MODE_SET':
      return t.eventLogDemoModeChanged
    case 'SOUND_ENABLED':
      return t.eventLogSoundSettingChanged
    case 'TOAST_ENABLED':
      return t.eventLogToastSettingChanged
    case 'LOAD_SAMPLE_STATE':
      return t.eventLogSampleStateLoaded
    default:
      return type
  }
}

const renderEventLogDetail = (detail: EventLogDetail | undefined, t: Translations) => {
  if (!detail) return null

  switch (detail.kind) {
    case 'chair':
      return t.eventLogChairDetail(detail.chairId)
    case 'completionToken':
      return t.eventLogCompletionTokenDetail(detail.completionToken)
    case 'tech':
      return t.eventLogTechDetail(detail.techId)
    case 'customer':
      return t.eventLogCustomerDetail(detail.customerName)
    case 'state':
      return t.eventLogSettingDetail(detail.enabled)
    default:
      return null
  }
}

export const EventLogPanel: React.FC = () => {
  const { meta } = useAppState()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLog = searchQuery.trim() === '' 
    ? meta.eventLog
    : meta.eventLog.filter((entry) => {
        const labelText = getEventLogLabel(entry.label, t).toLowerCase()
        const detailText = renderEventLogDetail(entry.detail, t)?.toLowerCase() || ''
        const query = searchQuery.toLowerCase()
        return labelText.includes(query) || detailText.includes(query)
      })

  return (
    <Card className="shadow-elevated flex flex-col">
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted text-foreground">
            <ScrollText className="w-4 h-4 text-foreground" />
          </div>
          <div>
            <div className="text-base font-bold">{t.eventLogTitle}</div>
            <div className="text-xs text-muted-foreground font-normal">{t.eventLogHint}</div>
          </div>
          <Badge variant="secondary" className="ml-auto rounded-full px-3 py-1">
            {meta.eventLog.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 flex flex-col flex-1 min-h-0">
        <div className="relative flex-shrink-0">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full pl-9 pr-8 py-2 text-sm rounded-xl border border-border/70",
              "bg-card/50 text-foreground placeholder-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
            )}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-2.5 p-0.5 hover:bg-muted rounded-md transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        <div className="flex-1 min-h-0 max-h-[500px] overflow-y-auto">
          {meta.eventLog.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-4 text-sm text-muted-foreground leading-6">
              {t.eventLogEmpty}
            </p>
          ) : filteredLog.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-4 text-sm text-muted-foreground leading-6">
              {t.noResults}
            </p>
          ) : (
            <div className="space-y-2 pr-2">
              {[...filteredLog].reverse().map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-border/70 bg-card/80 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">{getEventLogLabel(entry.label, t)}</p>
                    <span className="text-[11px] text-muted-foreground flex-shrink-0">{epochToHuman(entry.timestamp)}</span>
                  </div>
                  {entry.detail ? <p className="mt-1 text-xs leading-6 text-muted-foreground">{renderEventLogDetail(entry.detail, t)}</p> : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
