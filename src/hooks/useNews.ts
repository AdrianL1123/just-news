import { useQuery } from '@tanstack/react-query'
import { newsQueryOptions } from '@/lib/news'

/** Thin useQuery wrapper around newsQueryOptions for component-side ergonomics. */
export function useNews(country: string, category: string) {
  return useQuery(newsQueryOptions(country, category))
}
