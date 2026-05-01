export const DEMO_SHORT_MS = 40_000
export const DEMO_LONG_MS = 70_000
export const FULL_PEDI_MS = 40 * 60 * 1000
export const FULL_MANI_MS = 30 * 60 * 1000

export type DurationPreset = 'demo-short' | 'demo-long' | 'full-pedi' | 'full-mani'

export const getDurationMs = (preset: DurationPreset): number => {
  switch (preset) {
    case 'demo-short':
      return DEMO_SHORT_MS
    case 'demo-long':
      return DEMO_LONG_MS
    case 'full-pedi':
      return FULL_PEDI_MS
    case 'full-mani':
      return FULL_MANI_MS
  }
}
