import React, { useState } from 'react'
import { useAppState, useAppDispatch } from '@/presentation/context/useAppDispatch'
import { sortQueue, nextInQueue, findReadyTech } from '@/domain/rules/queueRules'
import { useLanguage } from '@/shared/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Button } from '@/presentation/components/ui/button'
import { Badge } from '@/presentation/components/ui/badge'
import { Plus, UserPlus, Users, Sparkles, Clock, CircleCheckBig } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export const QueuePanel: React.FC = () => {
  const { queue, techs } = useAppState()
  const dispatch = useAppDispatch()
  const [customerName, setCustomerName] = useState('')
  const { t } = useLanguage()

  const sortedQueue = sortQueue(queue)
  const next = nextInQueue(queue)
  const readyTech = findReadyTech(techs)
  const readyTechCount = techs.filter((tech) => tech.status === 'ready').length
  const waitingCount = sortedQueue.filter((entry) => entry.assignedTechId === null).length

  const handleEnqueue = (e: React.FormEvent) => {
    e.preventDefault()
    if (customerName.trim().length === 0) return

    dispatch({
      type: 'QUEUE_ENQUEUE',
      payload: {
        customerName,
        source: 'manual',
      },
    })
    setCustomerName('')
  }

  const handleAssignNext = () => {
    if (!next || !readyTech) return

    dispatch({ type: 'QUEUE_ASSIGN_NEXT' })
  }

  return (
    <Card className="shadow-elevated">
      <CardHeader className="pb-4">
        <div className="space-y-3">
          <CardTitle className="flex items-start gap-3 text-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-bold">{t.manicureQueue}</div>
              <div className="text-xs text-muted-foreground font-normal">{t.queueSectionHint}</div>
            </div>
          </CardTitle>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-2xl bg-muted/35 px-3 py-2">
              <div className="text-muted-foreground">{t.queueWaitingLabel}</div>
              <div className="mt-1 text-sm font-semibold text-foreground">{waitingCount}</div>
            </div>
            <div className="rounded-2xl bg-success/10 px-3 py-2">
              <div className="text-muted-foreground">{t.queueReadyTechsLabel}</div>
              <div className="mt-1 text-sm font-semibold text-foreground">{readyTechCount}</div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Customer Form */}
        <form onSubmit={handleEnqueue} className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder={t.customerName}
              className="w-full h-12 px-4 pr-10 border border-input rounded-2xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all shadow-sm"
            />
            <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button type="submit" size="default" className="shadow-sm rounded-2xl px-5 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-1.5" />
            {t.add}
          </Button>
        </form>

        {/* Queue List */}
        {sortedQueue.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center rounded-3xl border border-dashed border-border/70 bg-muted/20">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 mb-4 text-primary">
              <CircleCheckBig className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-foreground">{t.queueEmpty}</p>
            <p className="text-xs text-muted-foreground/70 mt-1 max-w-xs">{t.queueEmptyDescription}</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {sortedQueue.map((entry, index) => (
                <div
                  key={entry.id}
                  className={cn(
                    "group relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-200",
                    entry.id === next?.id
                      ? "bg-primary/8 border-primary/20 shadow-sm"
                      : "bg-card/70 border-border hover:bg-muted/40"
                  )}
                >
                  {/* Position Badge */}
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-2xl font-bold text-sm transition-all",
                      entry.id === next?.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground group-hover:bg-background"
                    )}>
                      {index + 1}
                    </div>
                    <div>
                      <span className="font-semibold text-sm text-foreground">{entry.customerName}</span>
                      {entry.id === next?.id && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Clock className="h-3 w-3 text-primary" />
                          <span className="text-xs text-primary font-semibold">{t.queueNextCustomerLabel}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Next Badge */}
                  {entry.id === next?.id && (
                    <Badge variant="default" className="shadow-sm rounded-full px-3 py-1">
                      {t.next}
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            {/* Assign Button */}
            {next && (
              <div className="pt-4 border-t border-border/70">
                {readyTech ? (
                  <Button
                    onClick={handleAssignNext}
                    className="w-full h-12 shadow-sm rounded-2xl bg-accent hover:bg-accent/90"
                    size="lg"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {t.assignToTech(readyTech.name)}
                  </Button>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-2xl border border-warning/20 bg-warning/10 py-4 text-sm font-medium text-foreground">
                    <div className="h-2.5 w-2.5 rounded-full bg-warning animate-pulse" />
                    {t.waitingForTech}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
