import React, { useEffect, useRef, useState } from 'react'
import { AppProvider } from './presentation/context/AppContext'
import { useAppState, useAppDispatch } from './presentation/context/useAppDispatch'
import { usePersistence } from './presentation/hooks/usePersistence'
import { useHydration } from './presentation/hooks/useHydration'
import { useStorageSync } from './presentation/hooks/useStorageSync'
import { useSound } from './presentation/hooks/useSound'
import { DashboardPage } from './presentation/pages/DashboardPage'
import { shouldTransitionToFinished } from './domain/rules/chairRules'
import { generateId } from './shared/utils/id'
import { LanguageProvider, useLanguage } from './shared/i18n'
import type { Chair } from './domain/entities'
import { ChairStatusToast, type ChairToastData, type ChairToastKind } from './presentation/components/feedback/ChairStatusToast'

const AppContent: React.FC = () => {
  const state = useAppState()
  const dispatch = useAppDispatch()
  const {
    startLoop,
    stopLoop,
    enable,
    enabled,
    beep,
    getStoredPreference,
    getStoredToastPreference,
  } = useSound()
  const { t } = useLanguage()
  const [activeToasts, setActiveToasts] = useState<ChairToastData[]>([])
  const previousChairsRef = useRef<Chair[]>(state.chairs)
  const toastTimeoutsRef = useRef<Map<string, number>>(new Map())
  const toastRemainingTimeRef = useRef<Map<string, { remaining: number; pausedAt: number }>>(new Map())
  const soundQueueRef = useRef<ChairToastData[]>([])
  const soundInitializedRef = useRef(false)

  usePersistence(state)
  useHydration(dispatch)
  useStorageSync(dispatch)

  const dismissToast = React.useCallback((toastId: string) => {
    const timeoutId = toastTimeoutsRef.current.get(toastId)
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId)
      toastTimeoutsRef.current.delete(toastId)
    }

    toastRemainingTimeRef.current.delete(toastId)
    soundQueueRef.current = soundQueueRef.current.filter((toast) => toast.id !== toastId)
    setActiveToasts((current) => current.filter((toast) => toast.id !== toastId))
  }, [])

  const scheduleToastRemoval = React.useCallback((toastId: string, delay: number = 5000) => {
    const timeoutId = window.setTimeout(() => {
      toastTimeoutsRef.current.delete(toastId)
      toastRemainingTimeRef.current.delete(toastId)
      soundQueueRef.current = soundQueueRef.current.filter((toast) => toast.id !== toastId)
      setActiveToasts((current) => current.filter((toast) => toast.id !== toastId))
    }, delay)

    toastTimeoutsRef.current.set(toastId, timeoutId)
    toastRemainingTimeRef.current.set(toastId, {
      remaining: delay,
      pausedAt: Date.now(),
    })
  }, [])

  const showChairToast = React.useCallback((kind: ChairToastKind, chair: Chair) => {
    const toastId = `${kind}-${chair.id}-${chair.startedAt ?? chair.completedAt ?? Date.now()}-${crypto.randomUUID()}`
    const sticky = kind === 'finish'

    const nextToast: ChairToastData = {
      id: toastId,
      kind,
      sticky,
      chairNumber: chair.id.slice(-1),
      title: kind === 'start' ? t.chairStartedToastTitle : t.chairFinishedToastTitle,
      message:
        kind === 'start'
          ? t.chairStartedToastMessage(chair.id.slice(-1))
          : t.chairFinishedToastMessage(chair.id.slice(-1)),
      dismissLabel: t.chairToastDismiss,
      badgeLabel: kind === 'start' ? t.temporaryToastBadge : t.mandatoryToastBadge,
    }

    if (sticky) {
      soundQueueRef.current = [
        ...soundQueueRef.current.filter((toast) => toast.id !== toastId),
        nextToast,
      ]
    } else {
      soundQueueRef.current = [...soundQueueRef.current, nextToast]
    }

    if (state.settings.toastEnabled) {
      setActiveToasts((current) => [nextToast, ...current].slice(0, 6))
      if (!sticky) {
        scheduleToastRemoval(toastId)
      }
    }
  }, [scheduleToastRemoval, state.settings.toastEnabled, t])

  useEffect(() => {
    if (soundInitializedRef.current) return

    soundInitializedRef.current = true

    if (getStoredPreference()) {
      void enable()
    }

    dispatch({
      type: 'TOAST_ENABLED',
      payload: { enabled: getStoredToastPreference() },
    })
  }, [dispatch, enable, getStoredPreference, getStoredToastPreference])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      state.chairs.forEach((chair) => {
        if (shouldTransitionToFinished(chair, now)) {
          const completionToken = generateId()
          dispatch({
            type: 'CHAIR_EXPIRED',
            payload: {
              chairId: chair.id,
              completionToken,
            },
          })

          dispatch({
            type: 'QUEUE_ENQUEUE',
            payload: {
              customerName: t.customerFromChair(chair.id.slice(-1)),
              source: 'chair-finished',
            },
          })
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [state.chairs, dispatch, t])

  useEffect(() => {
    const previousChairs = previousChairsRef.current

    state.chairs.forEach((chair) => {
      const previousChair = previousChairs.find((item) => item.id === chair.id)
      if (!previousChair) return

      if (previousChair.status !== 'running' && chair.status === 'running') {
        showChairToast('start', chair)
        return
      }

      if (previousChair.status !== 'finished' && chair.status === 'finished') {
        showChairToast('finish', chair)
        return
      }

      // When chair is reset from finished to idle, remove its toast and sound
      if (previousChair.status === 'finished' && chair.status === 'idle') {
        const chairNumber = chair.id.slice(-1)

        // Remove all toasts for this chair
        setActiveToasts((current) =>
          current.filter((toast) => toast.chairNumber !== chairNumber)
        )

        // Remove from sound queue
        soundQueueRef.current = soundQueueRef.current.filter(
          (toast) => toast.chairNumber !== chairNumber
        )

        // If no more finish toasts in queue, stop the loop
        const hasFinishToasts = soundQueueRef.current.some((toast) => toast.kind === 'finish')
        if (!hasFinishToasts) {
          stopLoop()
        }
      }
    })

    previousChairsRef.current = state.chairs
  }, [showChairToast, state.chairs, stopLoop])

  useEffect(() => {
    if (!state.settings.toastEnabled && activeToasts.length > 0) {
      toastTimeoutsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
      toastTimeoutsRef.current.clear()
      setActiveToasts([])
    }
  }, [activeToasts.length, state.settings.toastEnabled])

  useEffect(() => {
    if (!state.settings.toastEnabled) {
      soundQueueRef.current = []
      stopLoop()
      return
    }

    if (!state.settings.soundEnabled || !enabled) {
      stopLoop()
      return
    }

    const nextQueuedToast = soundQueueRef.current[0]

    if (!nextQueuedToast) {
      stopLoop()
      return
    }

    // Only loop for 'finish' kind, beep once for 'start'
    if (nextQueuedToast.kind === 'start') {
      beep()
      const timer = window.setTimeout(() => {
        soundQueueRef.current = soundQueueRef.current.filter((toast) => toast.id !== nextQueuedToast.id)
      }, 5000)
      return () => {
        window.clearTimeout(timer)
      }
    }

    // Loop for 'finish' kind
    startLoop('finish')

    if (nextQueuedToast.sticky) {
      return () => {
        stopLoop()
      }
    }

    const timer = window.setTimeout(() => {
      soundQueueRef.current = soundQueueRef.current.filter((toast) => toast.id !== nextQueuedToast.id)
    }, 5000)

    return () => {
      window.clearTimeout(timer)
      stopLoop()
    }
  }, [activeToasts, beep, enabled, startLoop, state.settings.soundEnabled, state.settings.toastEnabled, stopLoop])

  // Handle page visibility to pause/resume toast auto-dismiss
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden - pause all timers and record remaining time
        const now = Date.now()
        toastTimeoutsRef.current.forEach((timeoutId, toastId) => {
          window.clearTimeout(timeoutId)
          const timeInfo = toastRemainingTimeRef.current.get(toastId)
          if (timeInfo) {
            const elapsed = now - timeInfo.pausedAt
            const remaining = Math.max(0, timeInfo.remaining - elapsed)
            toastRemainingTimeRef.current.set(toastId, {
              remaining,
              pausedAt: now,
            })
          }
        })
        toastTimeoutsRef.current.clear()
      } else {
        // Page is visible - resume timers with remaining time
        const toastsToResume: Array<{ id: string; remaining: number }> = []
        toastRemainingTimeRef.current.forEach((timeInfo, toastId) => {
          if (timeInfo.remaining > 0) {
            toastsToResume.push({ id: toastId, remaining: timeInfo.remaining })
          }
        })

        toastsToResume.forEach(({ id, remaining }) => {
          scheduleToastRemoval(id, remaining)
        })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [scheduleToastRemoval])

  useEffect(() => {
    return () => {
      toastTimeoutsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
      toastTimeoutsRef.current.clear()
      soundQueueRef.current = []
      stopLoop()
    }
  }, [stopLoop])

  return (
    <>
      <DashboardPage />

      {state.settings.toastEnabled && activeToasts.length > 0 && (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-[70] flex justify-center px-4 sm:top-6">
          <div className="flex w-full max-w-md flex-col gap-3">
            {activeToasts.map((toast) => (
              <ChairStatusToast
                key={toast.id}
                toast={toast}
                onDismiss={() => dismissToast(toast.id)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LanguageProvider>
  )
}
