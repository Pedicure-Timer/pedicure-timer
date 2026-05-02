import type { AppState, EventLogEntry } from './AppState'
import { buildInitialState } from './initialState'
import { chairId, queueId, techId } from '@/shared/types/branded'
import { generateId } from '@/shared/utils/id'
import { nowMs } from '@/shared/utils/time'

const buildEventLog = (baseTime: number): EventLogEntry[] => [
  {
    id: generateId(),
    timestamp: baseTime - 240000,
    label: 'LOAD_SAMPLE_STATE',
  },
  {
    id: generateId(),
    timestamp: baseTime - 120000,
    label: 'CHAIR_EXPIRED',
    detail: { kind: 'chair', chairId: 'chair-2' },
  },
  {
    id: generateId(),
    timestamp: baseTime - 45000,
    label: 'TECH_READY',
    detail: { kind: 'tech', techId: 'tech-2' },
  },
]

export const buildSampleState = (): AppState => {
  const baseTime = nowMs()
  const chairOneEnd = baseTime + 18000
  const chairTwoEnd = baseTime - 6000

  return {
    ...buildInitialState(),
    chairs: [
      {
        id: chairId('chair-1'),
        status: 'running',
        serviceType: 'pedi',
        techId: techId('tech-1'),
        customerName: 'An',
        assignedAt: baseTime - 22000,
        startedAt: baseTime - 22000,
        endsAt: chairOneEnd,
        completedAt: null,
        lastCompletionToken: null,
      },
      {
        id: chairId('chair-2'),
        status: 'finished',
        serviceType: 'pedi',
        techId: techId('tech-2'),
        customerName: 'Bình',
        assignedAt: baseTime - 86000,
        startedAt: baseTime - 86000,
        endsAt: chairTwoEnd,
        completedAt: baseTime - 6000,
        lastCompletionToken: generateId(),
      },
      {
        id: chairId('chair-3'),
        status: 'assigned',
        serviceType: 'pedi',
        techId: techId('tech-4'),
        customerName: 'Linh',
        assignedAt: baseTime - 1500,
        startedAt: null,
        endsAt: null,
        completedAt: null,
        lastCompletionToken: null,
      },
      {
        id: chairId('chair-4'),
        status: 'idle',
        serviceType: 'pedi',
        techId: null,
        customerName: null,
        assignedAt: null,
        startedAt: null,
        endsAt: null,
        completedAt: null,
        lastCompletionToken: null,
      },
    ],
    techs: [
      { id: techId('tech-1'), name: 'Lan', role: 'mani', status: 'busy', readyAt: null, chairId: chairId('chair-1') },
      { id: techId('tech-2'), name: 'Mai', role: 'mani', status: 'ready', readyAt: baseTime - 45000, chairId: null },
      { id: techId('tech-3'), name: 'Hoa', role: 'mani', status: 'ready', readyAt: baseTime - 30000, chairId: null },
      { id: techId('tech-4'), name: 'Ngọc', role: 'mani', status: 'assigned', readyAt: null, chairId: chairId('chair-3') },
    ],
    queue: [
      {
        id: queueId(generateId()),
        customerName: 'Bình',
        source: 'chair-finished',
        enqueuedAt: baseTime - 6000,
        seq: 1,
        assignedTechId: null,
      },
      {
        id: queueId(generateId()),
        customerName: 'Linh',
        source: 'manual',
        enqueuedAt: baseTime - 1500,
        seq: 2,
        assignedTechId: null,
      },
    ],
    meta: {
      queueSeqCounter: 2,
      schemaVersion: buildInitialState().meta.schemaVersion,
      eventLog: buildEventLog(baseTime),
    },
  }
}