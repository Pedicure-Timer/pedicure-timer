export interface IAudioAdapter {
  enable(): Promise<void>
  beep(): void
  startLoop(kind: 'start' | 'finish'): void
  stopLoop(): void
  isEnabled(): boolean
}
