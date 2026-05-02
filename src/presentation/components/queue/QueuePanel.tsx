import React, { useState } from 'react'
import { useAppState, useAppDispatch } from '@/presentation/context/useAppDispatch'
import { sortQueue, nextInQueue, findReadyTech } from '@/domain/rules/queueRules'
import { useLanguage } from '@/shared/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Button } from '@/presentation/components/ui/button'
import { Badge } from '@/presentation/components/ui/badge'
import { Plus, UserPlus, Users, Sparkles, Clock } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export const QueuePanel: React.FC = () => {
  const { queue, techs } = useAppState()
  const dispatch = useAppDispatch()
  const [customerName, setCustomerName] = useState('')
  const { t } = useLanguage()

  const sortedQueue = sortQueue(queue)
  const next = nextInQueue(queue)
  const readyTech = findReadyTech(techs)

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
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Users className="w-4 h-4 text-accent" />
          </div>
          {t.manicureQueue}
          {sortedQueue.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {sortedQueue.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Customer Form */}
        <form onSubmit={handleEnqueue} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder={t.customerName}
              className="w-full h-10 px-4 pr-10 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            />
            <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button type="submit" size="default" className="shadow-sm">
            <Plus className="w-4 h-4 mr-1.5" />
            {t.add}
          </Button>
        </form>

        {/* Queue List */}
        {sortedQueue.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{t.queueEmpty}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Add customers to get started</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {sortedQueue.map((entry, index) => (
                <div
                  key={entry.id}
                  className={cn(
                    "group relative flex items-center justify-between p-3 rounded-lg border transition-all duration-200",
                    entry.id === next?.id
                      ? "bg-primary/5 border-primary/30 shadow-sm"
                      : "bg-muted/30 border-border hover:bg-muted/50"
                  )}
                >
                  {/* Position Badge */}
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg font-bold text-sm transition-all",
                      entry.id === next?.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-background text-muted-foreground group-hover:bg-muted"
                    )}>
                      {index + 1}
                    </div>
                    <div>
                      <span className="font-medium text-sm">{entry.customerName}</span>
                      {entry.id === next?.id && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Clock className="h-3 w-3 text-primary" />
                          <span className="text-xs text-primary font-medium">Ready to assign</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Next Badge */}
                  {entry.id === next?.id && (
                    <Badge variant="default" className="shadow-sm">
                      {t.next}
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            {/* Assign Button */}
            {next && (
              <div className="pt-2 border-t">
                {readyTech ? (
                  <Button
                    onClick={handleAssignNext}
                    className="w-full h-11 shadow-sm"
                    size="lg"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {t.assignTo} {readyTech.name}
                  </Button>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-warning animate-pulse" />
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
