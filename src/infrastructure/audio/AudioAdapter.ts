export interface IAudioAdapter {
  enable(): Promise<void>
  beep(): void
  isEnabled(): boolean
}
