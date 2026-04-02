import fs from "node:fs/promises";
import path from "node:path";
import {
  fetchFaqFromNotion,
  type NotionFaqItem,
  type NotionFaqPageTarget,
} from "./notion";

export type { NotionFaqPageTarget as FaqPageTarget };

const CACHE_FILE = path.join(process.cwd(), "faq-cache.json");
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export type CachedFaqItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
  /** `institution`: 교육청·학교 랜딩만. `faq`·미설정: /faq 페이지 */
  page?: NotionFaqPageTarget;
  isPublished: boolean;
  seoTitle?: string;
  seoKeywords: string[];
  seoDescription?: string;
  seoOgImage?: string;
};

export type FaqCache = {
  updatedAt: string;
  items: CachedFaqItem[];
};

async function readCacheFile(): Promise<FaqCache | null> {
  try {
    const raw = await fs.readFile(CACHE_FILE, "utf8");
    const parsed = JSON.parse(raw) as FaqCache;
    if (!parsed || !Array.isArray(parsed.items)) return null;
    return parsed;
  } catch (err: any) {
    if (err && err.code === "ENOENT") return null;
    return null;
  }
}

async function writeCacheFile(cache: FaqCache): Promise<void> {
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), "utf8");
}

function mapNotionItem(item: NotionFaqItem): CachedFaqItem {
  return {
    id: item.id,
    question: item.question,
    answer: item.answer,
    category: item.category,
    page: item.page,
    isPublished: item.isPublished,
    seoTitle: item.seoTitle,
    seoKeywords: item.seoKeywords ?? [],
    seoDescription: item.seoDescription,
    seoOgImage: item.seoOgImage,
  };
}

/** Notion `page` 기준으로 노출 대상 필터 */
export function filterFaqsByPage(
  items: CachedFaqItem[],
  target: NotionFaqPageTarget,
): CachedFaqItem[] {
  if (target === "institution") {
    return items.filter((i) => i.page === "institution");
  }
  return items.filter((i) => i.page === "faq" || i.page == null);
}

/** 1. 로컬에서 FAQ 전체 리스트 가져오기 */
export async function getLocalFaqList(): Promise<FaqCache | null> {
  return await readCacheFile();
}

/** 2. 로컬에서 FAQ 상세 1건 찾기 */
export async function getLocalFaqDetail(
  id: string,
): Promise<CachedFaqItem | null> {
  const cache = await readCacheFile();
  if (!cache) return null;
  return cache.items.find((item) => item.id === id) ?? null;
}

/** 3. Notion에서 최신 FAQ 받아와 로컬 캐시 갱신 */
export async function updateFaqFromNotion(): Promise<FaqCache> {
  const notionItems = await fetchFaqFromNotion();
  const items = notionItems.map(mapNotionItem);
  const updatedAt = new Date().toISOString();
  const cache: FaqCache = { updatedAt, items };
  await writeCacheFile(cache);
  return cache;
}

/** FAQ 캐시가 하루 이상 지났는지 검사 */
export function isFaqCacheStale(cache: FaqCache | null): boolean {
  if (!cache?.updatedAt) return true;
  const ts = new Date(cache.updatedAt).getTime();
  if (Number.isNaN(ts)) return true;
  return Date.now() - ts > ONE_DAY_MS;
}
