import type { TechId } from '@/shared/types/branded'

export type TechRole = 'mani'
export type TechStatus = 'busy' | 'ready' | 'assigned'

export interface Tech {
  id: TechId
  name: string
  role: TechRole
  status: TechStatus
  readyAt: number | null
}

export const isTechReady = (tech: Tech): boolean => tech.status === 'ready'
export const isTechBusy = (tech: Tech): boolean => tech.status === 'busy'
export const isTechAssigned = (tech: Tech): boolean => tech.status === 'assigned'
