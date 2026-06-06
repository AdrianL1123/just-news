import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { cors } from "hono/cors";

type Bindings = {
  NEWS_API_KEY: string;
  NEWSDATA_API_KEY: string;
};

interface Article {
  uuid: string;
  title: string;
  url: string;
  source: string;
  published_at: string;
  categories: string[];
  image_url?: string;
}

interface TheNewsAPIArticle {
  uuid: string;
  title: string;
  url: string;
  source: string;
  published_at: string;
  categories?: string[];
  image_url?: string | null;
}

interface NewsDataArticle {
  article_id: string;
  title: string;
  link: string;
  source_id: string;
  source_name?: string;
  pubDate: string;
  category?: string[];
  image_url?: string | null;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", cors());

app.get("/api/news", async (c) => {
  const locale = c.req.query("locale") ?? "us";
  const category = c.req.query("category") ?? "general";
  const provider = c.req.query("provider") ?? "thenewsapi";

  if (provider === "newsdataio") {
    const apiKey = c.env.NEWSDATA_API_KEY;
    if (!apiKey) {
      return c.json({ error: "NewsData API key not configured" }, 500);
    }

    const url = new URL("https://newsdata.io/api/1/latest");
    url.searchParams.set("apikey", apiKey);
    url.searchParams.set("country", locale);
    url.searchParams.set("language", "en");
    url.searchParams.set("size", "10");
    url.searchParams.set("image", "1");
    url.searchParams.set("category", category);

    const res = await fetch(url.toString());
    if (!res.ok) {
      return c.json({ error: `Upstream error: ${res.status}` }, 502);
    }

    const json = (await res.json()) as { results?: NewsDataArticle[] };

    const data: Article[] = (json.results ?? []).map((r) => ({
      uuid: r.article_id,
      title: r.title,
      url: r.link,
      source: r.source_name ?? titleize(r.source_id),
      published_at: r.pubDate.replace(" ", "T") + "Z",
      categories: r.category ?? [],
      image_url: r.image_url ?? undefined,
    }));

    return c.json({ data });
  }

  const apiKey = c.env.NEWS_API_KEY;
  if (!apiKey) {
    return c.json({ error: "TheNewsAPI key not configured" }, 500);
  }

  const url = new URL("https://api.thenewsapi.com/v1/news/top");
  url.searchParams.set("api_token", apiKey);
  url.searchParams.set("locale", locale);
  url.searchParams.set("language", "en");
  url.searchParams.set("limit", "10");

  if (category !== "general") {
    url.searchParams.set("categories", category);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    return c.json({ error: `Upstream error: ${res.status}` }, 502);
  }

  const json = (await res.json()) as { data?: TheNewsAPIArticle[] };

  const data: Article[] = (json.data ?? []).map((r) => ({
    uuid: r.uuid,
    title: r.title,
    url: r.url,
    source: stripDomainNoise(r.source),
    published_at: r.published_at,
    categories: r.categories ?? [],
    image_url: r.image_url ?? undefined,
  }));

  return c.json({ data });
});

function titleize(s: string): string {
  return s
    .replace(/-/g, " ")
    .split(" ")
    .map((w) => (w.length > 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function stripDomainNoise(s: string): string {
  return s
    .replace(/^www\./i, "")
    .replace(/\.(com|net|org|io|co\.uk|co|news|tv)$/i, "")
    .replace(/-/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const onRequest = handle(app);
