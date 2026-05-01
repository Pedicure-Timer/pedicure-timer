import React, { useState } from 'react'
import { useAppState, useAppDispatch } from '@/presentation/context/useAppDispatch'
import { sortQueue, nextInQueue, findReadyTech } from '@/domain/rules/queueRules'
import { useLanguage } from '@/shared/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Button } from '@/presentation/components/ui/button'
import { Badge } from '@/presentation/components/ui/badge'
import { Plus, UserPlus, Users } from 'lucide-react'
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
    dispatch({
      type: 'TECH_ASSIGNED',
      payload: { techId: readyTech.id },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          {t.manicureQueue}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleEnqueue} className="flex gap-2">
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder={t.customerName}
            className="flex-1 px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
          />
          <Button type="submit" size="default">
            <Plus className="w-4 h-4 mr-2" />
            {t.add}
          </Button>
        </form>

        {sortedQueue.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
            <div className="text-muted-foreground text-sm">{t.queueEmpty}</div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {sortedQueue.map((entry, index) => (
                <div
                  key={entry.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-all",
                    entry.id === next?.id
                      ? "bg-primary/5 border-primary"
                      : "bg-muted border-border"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="font-medium">{entry.customerName}</span>
                  </div>
                  {entry.id === next?.id && (
                    <Badge variant="default">{t.next}</Badge>
                  )}
                </div>
              ))}
            </div>

            {next && (
              <div className="pt-4 border-t">
                {readyTech ? (
                  <Button onClick={handleAssignNext} className="w-full" size="lg">
                    <UserPlus className="w-4 h-4 mr-2" />
                    {t.assignTo} {readyTech.name}
                  </Button>
                ) : (
                  <div className="text-center py-3 text-sm text-muted-foreground">
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
