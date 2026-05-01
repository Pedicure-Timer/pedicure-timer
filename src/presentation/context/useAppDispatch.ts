import { useContext } from 'react'
import { AppContext } from './AppContext'

export const useAppDispatch = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppDispatch must be used within AppProvider')
  }
  return context.dispatch
}

export const useAppState = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppState must be used within AppProvider')
  }
  return context.state
}
