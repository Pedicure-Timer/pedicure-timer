export const nowMs = (): number => Date.now()

export const formatCountdown = (ms: number): string => {
  if (ms <= 0) return '00:00'
  const totalSeconds = Math.ceil(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export const epochToHuman = (epochMs: number): string => {
  return new Date(epochMs).toLocaleTimeString()
}
