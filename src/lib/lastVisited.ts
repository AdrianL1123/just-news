const KEY = 'just-news.lastVisited'

export interface LastVisited {
  country: string
  category: string
}

const DEFAULT: LastVisited = { country: 'us', category: 'general' }

export function readLastVisited(): LastVisited {
  if (typeof window === 'undefined') return DEFAULT
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return DEFAULT
    const parsed = JSON.parse(raw) as Partial<LastVisited>
    if (
      typeof parsed.country === 'string' &&
      typeof parsed.category === 'string'
    ) {
      return { country: parsed.country, category: parsed.category }
    }
    return DEFAULT
  } catch {
    return DEFAULT
  }
}

export function writeLastVisited(lv: LastVisited): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lv))
  } catch {
    /* quota / disabled — ignore */
  }
}
