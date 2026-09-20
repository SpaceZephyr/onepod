import type { NewsItem } from "./types";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import staticNews from "../news.json";

let newsCache: NewsItem[] | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 60 * 1000;
const DEFAULT_KV_CACHE_KEY = "news";
const localNews = staticNews as NewsItem[];

interface NewsKvNamespace {
  get<T = unknown>(key: string, type: "json"): Promise<T | null>;
}

interface OnepodCloudflareEnv {
  ONEPOD_CACHE?: NewsKvNamespace;
  NEWS_CACHE_KEY?: string;
}

function sortNews(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    const tb = new Date(b.time || 0).getTime();
    const ta = new Date(a.time || 0).getTime();
    return tb - ta;
  });
}

async function getNewsFromKv(): Promise<NewsItem[] | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const onepodEnv = env as unknown as OnepodCloudflareEnv;
    const kv = onepodEnv.ONEPOD_CACHE;
    if (!kv) return null;

    const cacheKey = onepodEnv.NEWS_CACHE_KEY || DEFAULT_KV_CACHE_KEY;
    const items = await kv.get<NewsItem[]>(cacheKey, "json");
    if (!Array.isArray(items) || items.length === 0) {
      return null;
    }

    return items;
  } catch {
    return null;
  }
}

async function getNews(): Promise<NewsItem[]> {
  const now = Date.now();

  if (newsCache && now - cacheTime < CACHE_TTL_MS) {
    return newsCache;
  }

  const fromKv = await getNewsFromKv();
  newsCache = sortNews(fromKv || localNews);
  cacheTime = now;
  return newsCache;
}

export async function getAllNewsItems(): Promise<NewsItem[]> {
  return getNews();
}

export async function getNewsItemById(
  id: string
): Promise<NewsItem | undefined> {
  const items = await getNews();
  return items.find((item) => item.id === id);
}
