import type { IAudioAdapter } from './AudioAdapter'

export class WebAudioAdapter implements IAudioAdapter {
  private context: AudioContext | null = null
  private enabled = false

  async enable(): Promise<void> {
    if (this.enabled) return

    try {
      this.context = new AudioContext()
      await this.context.resume()
      this.enabled = true
    } catch (error) {
      console.error('Failed to enable audio:', error)
    }
  }

  beep(): void {
    if (!this.enabled || !this.context) return

    try {
      const oscillator = this.context.createOscillator()
      const gainNode = this.context.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.context.destination)

      oscillator.frequency.value = 800
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.3, this.context.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.context.currentTime + 0.3
      )

      oscillator.start(this.context.currentTime)
      oscillator.stop(this.context.currentTime + 0.3)
    } catch (error) {
      console.error('Failed to play beep:', error)
    }
  }

  isEnabled(): boolean {
    return this.enabled
  }
}
