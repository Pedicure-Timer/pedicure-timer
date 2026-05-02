import React from 'react'
import { Bell, PlayCircle, TimerReset } from 'lucide-react'
import { Card, CardContent } from '@/presentation/components/ui/card'
import { cn } from '@/shared/utils/cn'

export type ChairToastKind = 'start' | 'finish'

export interface ChairToastData {
  id: string
  kind: ChairToastKind
  chairNumber: string
  title: string
  message: string
  dismissLabel: string
  sticky?: boolean
  badgeLabel?: string
}

interface ChairStatusToastProps {
  toast: ChairToastData
  onDismiss: () => void
}

export const ChairStatusToast: React.FC<ChairStatusToastProps> = ({ toast, onDismiss }) => {
  const isStart = toast.kind === 'start'
  const Icon = isStart ? PlayCircle : TimerReset

  return (
    <button
      type="button"
      onClick={onDismiss}
      className="pointer-events-auto w-full text-left"
      aria-label={toast.dismissLabel}
    >
      <Card
        className={cn(
          'overflow-hidden border shadow-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.22)]',
          isStart
            ? 'border-primary/30 bg-primary/[0.05]'
            : 'border-warning/35 bg-warning/[0.08]'
        )}
      >
        <div className={cn('h-1.5 w-full', isStart ? 'bg-primary' : 'bg-warning')} />
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                'mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1',
                isStart
                  ? 'bg-primary/10 text-primary ring-primary/15'
                  : 'bg-warning/15 text-warning ring-warning/20'
              )}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{toast.title}</p>
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold',
                    isStart ? 'bg-primary/10 text-primary' : 'bg-warning/15 text-warning'
                  )}
                >
                  #{toast.chairNumber}
                </span>
                {toast.badgeLabel && (
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]',
                      isStart
                        ? 'bg-sky-500/12 text-sky-700 dark:text-sky-300'
                        : 'bg-red-500/12 text-red-700 dark:text-red-300'
                    )}
                  >
                    {toast.badgeLabel}
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-foreground/85">{toast.message}</p>

              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Bell className="h-3.5 w-3.5" />
                <span>{toast.dismissLabel}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  )
}
