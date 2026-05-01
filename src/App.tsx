import React, { useEffect } from 'react'
import { AppProvider } from './presentation/context/AppContext'
import { useAppState, useAppDispatch } from './presentation/context/useAppDispatch'
import { usePersistence } from './presentation/hooks/usePersistence'
import { useHydration } from './presentation/hooks/useHydration'
import { useSound } from './presentation/hooks/useSound'
import { DashboardPage } from './presentation/pages/DashboardPage'
import { shouldTransitionToFinished } from './domain/rules/chairRules'
import { generateId } from './shared/utils/id'

const AppContent: React.FC = () => {
  const state = useAppState()
  const dispatch = useAppDispatch()
  const { beep } = useSound()

  usePersistence(state)
  useHydration(dispatch)

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

          if (state.settings.soundEnabled) {
            beep()
          }

          dispatch({
            type: 'QUEUE_ENQUEUE',
            payload: {
              customerName: `Customer from Chair ${chair.id.slice(-1)}`,
              source: 'chair-finished',
            },
          })
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [state.chairs, state.settings.soundEnabled, dispatch, beep])

  return <DashboardPage />
}

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
