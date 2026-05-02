import type { Tech } from '@/domain/entities'
import type { TechAction } from '../actions/techActions'
import { nowMs } from '@/shared/utils/time'

export const techReducer = (techs: Tech[], action: TechAction): Tech[] => {
  switch (action.type) {
    case 'TECH_READY': {
      const { techId } = action.payload
      return techs.map((tech) => {
        if (tech.id !== techId) return tech
        if (tech.status === 'ready') return tech
        return {
          ...tech,
          status: 'ready',
          readyAt: nowMs(),
        }
      })
    }

    case 'TECH_ASSIGNED': {
      const { techId, chairId } = action.payload
      return techs.map((tech) => {
        if (tech.id !== techId) return tech
        return {
          ...tech,
          status: 'assigned',
          readyAt: null,
          chairId: chairId ?? tech.chairId,
        }
      })
    }

    case 'TECH_BUSY': {
      const { techId } = action.payload
      return techs.map((tech) => {
        if (tech.id !== techId) return tech
        return {
          ...tech,
          status: 'busy',
          readyAt: null,
          chairId: null,
        }
      })
    }

    default:
      return techs
  }
}
