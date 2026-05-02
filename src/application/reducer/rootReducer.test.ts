import { describe, expect, it } from 'vitest'
import { rootReducer } from './rootReducer'
import { buildInitialState } from '../state/initialState'
import { buildSampleState } from '../state/sampleState'
import { chairId, techId } from '@/shared/types/branded'

describe('rootReducer', () => {
  it('loads the sample state preset', () => {
    const state = buildInitialState()
    const nextState = rootReducer(state, { type: 'LOAD_SAMPLE_STATE' })

    expect(nextState.chairs[0].status).toBe('running')
    expect(nextState.techs[1].status).toBe('ready')
    expect(nextState.queue).toHaveLength(2)
    expect(nextState.meta.eventLog).toHaveLength(3)
  })

  it('records queue activity in the event log', () => {
    const state = buildInitialState()
    const nextState = rootReducer(state, {
      type: 'QUEUE_ENQUEUE',
      payload: {
        customerName: 'Linh',
        source: 'manual',
      },
    })

    expect(nextState.queue).toHaveLength(1)
    expect(nextState.meta.queueSeqCounter).toBe(1)
    expect(nextState.meta.eventLog[nextState.meta.eventLog.length - 1]?.label).toBe('QUEUE_ENQUEUE')
  })

  it('keeps chair expiration idempotent', () => {
    const assignedState = {
      ...buildInitialState(),
      chairs: buildInitialState().chairs.map((chair) => {
        if (chair.id !== chairId('chair-1')) return chair

        return {
          ...chair,
          status: 'assigned' as const,
          techId: techId('tech-1'),
          customerName: 'Linh',
          assignedAt: Date.now(),
        }
      }),
    }

    const startedState = rootReducer(assignedState, {
      type: 'CHAIR_STARTED',
      payload: {
        chairId: chairId('chair-1'),
        durationMs: 1000,
        source: 'manual',
        techId: techId('tech-1'),
      },
    })

    const runningChair = startedState.chairs[0]
    const completionToken = 'token-1'

    const finishedState = rootReducer(startedState, {
      type: 'CHAIR_EXPIRED',
      payload: {
        chairId: runningChair.id,
        completionToken,
      },
    })

    const finishedAgain = rootReducer(finishedState, {
      type: 'CHAIR_EXPIRED',
      payload: {
        chairId: runningChair.id,
        completionToken,
      },
    })

    expect(finishedState.chairs[0].status).toBe('finished')
    expect(finishedAgain.chairs[0].completedAt).toBe(finishedState.chairs[0].completedAt)
  })

  it('resets a running chair', () => {
    const startedState = rootReducer(buildInitialState(), {
      type: 'CHAIR_STARTED',
      payload: {
        chairId: chairId('chair-1'),
        durationMs: 1000,
        source: 'manual',
      },
    })

    const resetState = rootReducer(startedState, {
      type: 'CHAIR_RESET',
      payload: {
        chairId: chairId('chair-1'),
      },
    })

    expect(resetState.chairs[0].status).toBe('idle')
    expect(resetState.chairs[0].techId).toBeNull()
  })

  it('blocks starting an unassigned chair', () => {
    const nextState = rootReducer(buildInitialState(), {
      type: 'CHAIR_STARTED',
      payload: {
        chairId: chairId('chair-1'),
        durationMs: 1000,
        source: 'manual',
      },
    })

    expect(nextState.chairs[0].status).toBe('idle')
    expect(nextState.meta.eventLog).toHaveLength(0)
  })

  it('builds a sample state independently', () => {
    const sample = buildSampleState()

    expect(sample.meta.eventLog).toHaveLength(3)
    expect(sample.chairs.some((chair) => chair.status === 'running')).toBe(true)
  })
})