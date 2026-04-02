import fs from "node:fs/promises";
import path from "node:path";
import { fetchNewsFromNotion, type NotionNewsItem } from "./notion";

const CACHE_FILE = path.join(process.cwd(), "news-cache.json");
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export type CachedNewsItem = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  publishedAt: string;
  startAt?: string;
  endAt?: string;
  isShowOnMain: "SHOW" | "HIDE";
  seoTitle?: string;
  seoKeywords: string[];
  seoDescription?: string;
  seoOgImage?: string;
  seoCanonicalUrl?: string;
  category?: string;
  thumbnail?: string;
  isPublished: boolean;
  hasButton: boolean;
  buttonText?: string;
  buttonLink?: string;
  buttonIcon?: string;
  relatedNews?: {
    id: string;
    title: string;
    category: string;
    publishedAt: string;
    thumbnail?: string;
  }[];
};

export type NewsCache = {
  updatedAt: string;
  items: CachedNewsItem[];
};

async function readCacheFile(): Promise<NewsCache | null> {
  try {
    const raw = await fs.readFile(CACHE_FILE, "utf8");
    const parsed = JSON.parse(raw) as NewsCache;
    if (!parsed || !Array.isArray(parsed.items)) return null;
    return parsed;
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "code" in err && (err as { code?: string }).code === "ENOENT") {
      return null;
    }
    return null;
  }
}

async function writeCacheFile(cache: NewsCache): Promise<void> {
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), "utf8");
}

function mapNotionItem(item: NotionNewsItem): CachedNewsItem {
  return {
    slug: item.id,
    title: item.title,
    summary: item.body ?? "",
    body: item.body ?? "",
    publishedAt: item.publishedAt,
    startAt: item.startAt,
    endAt: item.endAt,
    isShowOnMain: item.isShowOnMain,
    seoTitle: item.seoTitle,
    seoKeywords: item.seoKeywords ?? [],
    seoDescription: item.seoDescription,
    seoOgImage: item.seoOgImage,
    seoCanonicalUrl: item.seoCanonicalUrl,
    category: item.category,
    thumbnail: item.thumbnail,
    isPublished: item.isPublished,
    hasButton: item.hasButton,
    buttonText: item.buttonText,
    buttonLink: item.buttonLink,
    buttonIcon: item.buttonIcon,
    relatedNews: item.relatedNews,
  };
}

function parseDotDate(value?: string): number | null {
  if (!value) return null;
  const normalized = value.trim().replace(/\./g, "-");
  const ts = new Date(normalized).getTime();
  return Number.isNaN(ts) ? null : ts;
}

function startOfTodayTs(): number {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

function isVisibleNews(item: CachedNewsItem): boolean {
  // 1) isPublished가 true인 데이터만 노출
  if (!item.isPublished) return false;

  const today = startOfTodayTs();
  const start = parseDotDate(item.startAt);
  const end = parseDotDate(item.endAt);

  // 2) startAt와 endAt가 둘 다 있으면 해당 기간 내 데이터만 노출
  if (start !== null && end !== null) {
    return today >= start && today <= end;
  }

  // 3) startAt만 있으면 startAt 이후(오늘 포함) 데이터 노출
  if (start !== null) {
    return today >= start;
  }

  // 4) endAt만 있으면 endAt 이전(포함) 데이터만 노출
  if (end !== null) {
    return today <= end;
  }

  // 날짜 조건이 없으면 노출
  return true;
}

/** 1. 로컬에서 전체 리스트 가져오기 (없으면 빈 배열) */
export async function getLocalNewsList(): Promise<NewsCache | null> {
  const cache = await readCacheFile();
  if (!cache) return null;
  return {
    ...cache,
    items: cache.items.filter(isVisibleNews),
  };
}

/** 2. 로컬에서 상세 1건 찾기 */
export async function getLocalNewsDetail(
  slug: string,
): Promise<CachedNewsItem | null> {
  const cache = await readCacheFile();
  if (!cache) return null;
  return cache.items.find((item) => item.slug === slug) ?? null;
}

/** 3. Notion에서 최신 데이터 받아와 로컬 캐시 갱신 */
export async function updateNewsFromNotion(): Promise<NewsCache> {
  const notionItems = await fetchNewsFromNotion();
  const items = notionItems.map(mapNotionItem);
  const updatedAt = new Date().toISOString();
  const cache: NewsCache = { updatedAt, items };
  await writeCacheFile(cache);
  return cache;
}

/** 캐시가 하루 이상 지났는지 검사 */
export function isCacheStale(cache: NewsCache | null): boolean {
  if (!cache?.updatedAt) return true;
  const ts = new Date(cache.updatedAt).getTime();
  if (Number.isNaN(ts)) return true;
  return Date.now() - ts > ONE_DAY_MS;
}

/**
 * 메인 랜딩 뉴스 미리보기: 노출 조건(`isVisibleNews`)을 통과한 항목 중
 * `isShowOnMain === "SHOW"`인 것만, 캐시 순서(Notion 최신순)대로 최대 `maxCount`개.
 * 뉴스 목록 페이지와 동일한 캐시/백그라운드 갱신 패턴을 사용합니다.
 */
export async function getMainPreviewNewsList(maxCount = 4): Promise<CachedNewsItem[]> {
  let local = await getLocalNewsList();

  if (local && isCacheStale(local)) {
    void updateNewsFromNotion().catch(() => {});
  }

  if (!local) {
    try {
      await updateNewsFromNotion();
    } catch {
      return [];
    }
    local = await getLocalNewsList();
  }

  if (!local) return [];

  return local.items.filter((item) => item.isShowOnMain === "SHOW").slice(0, maxCount);
}

