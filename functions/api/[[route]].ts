import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { cors } from "hono/cors";

type Bindings = {
  NEWS_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", cors());

app.get("/api/news", async (c) => {
  const locale = c.req.query("locale") ?? "us";
  const category = c.req.query("category") ?? "general";
  const apiKey = c.env.NEWS_API_KEY;

  if (!apiKey) {
    return c.json({ error: "API key not configured" }, 500);
  }

  const url = new URL("https://api.thenewsapi.com/v1/news/top");
  url.searchParams.set("api_token", apiKey);
  url.searchParams.set("locale", locale);
  url.searchParams.set("language", "en");
  url.searchParams.set("limit", "3");

  if (category !== "general") {
    url.searchParams.set("categories", category);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    return c.json({ error: `Upstream error: ${res.status}` }, 502);
  }

  const data = await res.json();

  return c.json(data);
});

export const onRequest = handle(app);
