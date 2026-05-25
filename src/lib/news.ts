import { queryOptions } from "@tanstack/react-query";
import { format } from "date-fns";
import type { Article } from "@/types";

/** YYYY-MM-DD key in the user's local timezone — drives day-based cache invalidation. */
export const todayKey = (): string => format(new Date(), "yyyy-MM-dd");

async function fetchNews(country: string, category: string): Promise<Article[]> {
  const url = `/api/news?locale=${encodeURIComponent(country)}&category=${encodeURIComponent(category)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`News fetch failed: ${res.status}`);
  const json = (await res.json()) as { data?: Article[] };
  return json.data ?? [];
}

/**
 * Caching policy:
 *   - Day rollover: todayKey() changes → queryKey differs → automatic refetch.
 *   - Within the same day: data considered fresh for 30 min, then refetch on tab focus.
 *     Trades a small amount of API quota for catching new headlines mid-day.
 */
export const newsQueryOptions = (country: string, category: string) =>
  queryOptions({
    queryKey: ["news", country, category, todayKey()] as const,
    queryFn: () => fetchNews(country, category),
    staleTime: 1000 * 60 * 30, // 30 min
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
  });

export type NewsQueryKey = ReturnType<typeof newsQueryOptions>["queryKey"];
