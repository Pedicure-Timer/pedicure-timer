export type ChairId = string & { readonly __brand: 'ChairId' }
export type TechId = string & { readonly __brand: 'TechId' }
export type QueueId = string & { readonly __brand: 'QueueId' }

export const chairId = (id: string): ChairId => id as ChairId
export const techId = (id: string): TechId => id as TechId
export const queueId = (id: string): QueueId => id as QueueId
