import type { ChairId, TechId } from '@/shared/types/branded'

export interface ChairStartedAction {
  type: 'CHAIR_STARTED'
  payload: {
    chairId: ChairId
    durationMs: number
    source: 'manual' | 'hardware'
    techId?: TechId
  }
}

export interface ChairExpiredAction {
  type: 'CHAIR_EXPIRED'
  payload: {
    chairId: ChairId
    completionToken: string
  }
}

export interface ChairResetAction {
  type: 'CHAIR_RESET'
  payload: {
    chairId: ChairId
  }
}

export type ChairAction = ChairStartedAction | ChairExpiredAction | ChairResetAction
