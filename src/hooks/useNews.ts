import { useState, useEffect, useRef } from 'react'
import type { Article } from '@/types'

const CACHE_TTL = 5 * 60 * 1000

interface CacheEntry {
  articles: Article[]
  timestamp: number
}

const cache = new Map<string, CacheEntry>()

interface UseNewsResult {
  articles: Article[]
  loading: boolean
  refreshing: boolean
  error: string | null
  updatedAt: Date | null
  refresh: () => void
}

export function useNews(locale: string, category: string): UseNewsResult {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)
  const [tick, setTick] = useState(0)
  const isBust = useRef(false)

  useEffect(() => {
    const key = `${locale}:${category}`
    const bust = isBust.current
    isBust.current = false

    if (!bust) {
      const hit = cache.get(key)
      if (hit && Date.now() - hit.timestamp < CACHE_TTL) {
        setArticles(hit.articles)
        setUpdatedAt(new Date(hit.timestamp))
        return
      }
    }

    bust ? setRefreshing(true) : setLoading(true)
    setError(null)

    let cancelled = false

    fetch(
      `/api/news?locale=${encodeURIComponent(locale)}&category=${encodeURIComponent(category)}`
    )
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json() as Promise<{ data?: Article[] }>
      })
      .then((json) => {
        if (cancelled) return
        const data = json.data ?? []
        cache.set(key, { articles: data, timestamp: Date.now() })
        setArticles(data)
        setUpdatedAt(new Date())
      })
      .catch(() => {
        if (!cancelled) setError('Could not load news. Try refreshing.')
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
          setRefreshing(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [locale, category, tick])

  const refresh = () => {
    isBust.current = true
    setTick((t) => t + 1)
  }

  return { articles, loading, refreshing, error, updatedAt, refresh }
}
