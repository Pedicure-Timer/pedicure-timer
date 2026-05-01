import React, { createContext, useReducer, type ReactNode } from 'react'
import type { AppState } from '@/application/state/AppState'
import type { AppAction } from '@/application/actions'
import { rootReducer } from '@/application/reducer'
import { buildInitialState } from '@/application/state/initialState'

interface AppContextValue {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

export const AppContext = createContext<AppContextValue | null>(null)

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, buildInitialState())

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
