import { queryOptions } from "@tanstack/react-query";

export type Article = {
  uuid: string;
  title: string;
  url: string;
  source: string;
  published_at: string;
  categories: string[];
  image_url?: string;
};

async function fetchNews(country: string, category: string, provider: string): Promise<Article[]> {
  const url = `/api/news?locale=${encodeURIComponent(country)}&category=${encodeURIComponent(category)}&provider=${encodeURIComponent(provider)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`News fetch failed: ${res.status}`);
  const json = (await res.json()) as { data?: Article[] };
  return json.data ?? [];
}

export const newsQueryOptions = (country: string, category: string, provider: string) =>
  queryOptions({
    queryKey: ["news", country, category] as const,
    queryFn: () => fetchNews(country, category, provider),
  });

export type NewsQueryKey = ReturnType<typeof newsQueryOptions>["queryKey"];
