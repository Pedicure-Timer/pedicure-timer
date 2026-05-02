import type { ChairId, TechId } from '@/shared/types/branded'

export interface TechReadyAction {
  type: 'TECH_READY'
  payload: {
    techId: TechId
  }
}

export interface TechAssignedAction {
  type: 'TECH_ASSIGNED'
  payload: {
    techId: TechId
    chairId?: ChairId | null
  }
}

export interface TechBusyAction {
  type: 'TECH_BUSY'
  payload: {
    techId: TechId
  }
}

export type TechAction = TechReadyAction | TechAssignedAction | TechBusyAction
