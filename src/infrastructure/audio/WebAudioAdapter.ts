import type { IAudioAdapter } from './AudioAdapter'

export class WebAudioAdapter implements IAudioAdapter {
  private context: AudioContext | null = null
  private enabled = false
  private loopTimer: number | null = null

  constructor() {
    // Listen for first user interaction to unlock audio context
    const unlockAudio = async () => {
      if (this.context?.state === 'suspended') {
        try {
          await this.context.resume()
          console.log('Audio context unlocked after user interaction')
        } catch (error) {
          console.error('Failed to resume audio context:', error)
        }
      }
    }

    // These events indicate user interaction
    const events = ['click', 'touchstart', 'keydown']
    events.forEach(event => {
      document.addEventListener(event, unlockAudio, { once: true, passive: true })
    })
  }

  async enable(): Promise<void> {
    try {
      if (!this.context) {
        this.context = new AudioContext()
      }

      if (this.context.state !== 'running') {
        await this.context.resume()
      }

      this.enabled = this.context.state === 'running'

      // If context is still suspended, it will be resumed on first user interaction
      if (this.context.state === 'suspended') {
        console.log('Audio context suspended - waiting for user interaction')
      }
    } catch (error) {
      this.enabled = false
      console.error('Failed to enable audio:', error)
    }
  }

  beep(): void {
    this.playSequence([
      { frequency: 800, duration: 0.3, gain: 0.3, type: 'sine' },
    ])
  }

  startLoop(kind: 'start' | 'finish'): void {
    if (!this.canPlay()) return

    this.stopLoop()

    const pattern =
      kind === 'start'
        ? {
            intervalMs: 1100,
            notes: [
              { frequency: 740, duration: 0.16, gain: 0.18, type: 'sine' as const },
              { frequency: 988, duration: 0.2, gain: 0.22, type: 'sine' as const, offset: 0.2 },
            ],
          }
        : {
            intervalMs: 1350,
            notes: [
              { frequency: 880, duration: 0.18, gain: 0.24, type: 'square' as const },
              { frequency: 660, duration: 0.18, gain: 0.24, type: 'square' as const, offset: 0.24 },
              { frequency: 880, duration: 0.24, gain: 0.28, type: 'square' as const, offset: 0.48 },
            ],
          }

    this.playSequence(pattern.notes)
    this.loopTimer = window.setInterval(() => {
      this.playSequence(pattern.notes)
    }, pattern.intervalMs)
  }

  stopLoop(): void {
    if (this.loopTimer !== null) {
      window.clearInterval(this.loopTimer)
      this.loopTimer = null
    }
  }

  private canPlay(): boolean {
    return Boolean(this.enabled && this.context && this.context.state === 'running')
  }

  private playSequence(
    notes: Array<{
      frequency: number
      duration: number
      gain: number
      type: OscillatorType
      offset?: number
    }>
  ): void {
    if (!this.canPlay()) return

    try {
      const context = this.context as AudioContext
      const baseTime = context.currentTime

      notes.forEach(({ frequency, duration, gain, type, offset = 0 }) => {
        const oscillator = context.createOscillator()
        const gainNode = context.createGain()
        const startTime = baseTime + offset

        oscillator.connect(gainNode)
        gainNode.connect(context.destination)

        oscillator.frequency.value = frequency
        oscillator.type = type

        gainNode.gain.setValueAtTime(0.0001, startTime)
        gainNode.gain.exponentialRampToValueAtTime(gain, startTime + 0.02)
        gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

        oscillator.start(startTime)
        oscillator.stop(startTime + duration)
      })
    } catch (error) {
      console.error('Failed to play sound sequence:', error)
    }
  }

  isEnabled(): boolean {
    return this.enabled
  }
}
