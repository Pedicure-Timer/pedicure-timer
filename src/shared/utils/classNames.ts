type ClassValue = string | number | boolean | undefined | null | ClassValue[]

export const cx = (...classes: ClassValue[]): string => {
  return classes
    .flat()
    .filter((c) => typeof c === 'string' && c.length > 0)
    .join(' ')
}
