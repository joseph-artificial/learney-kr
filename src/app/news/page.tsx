import { createPageMetadata } from "@/lib/seo";
import { NewsPageContent } from "./NewsPageContent";
import {
  getLocalNewsList,
  updateNewsFromNotion,
  isCacheStale,
  type CachedNewsItem,
} from "@/lib/news-local";

/** 뉴스 목록 페이지 ISR (24시간) */
export const revalidate = 86400;

type NewsItem = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  category?: string;
  thumbnail?: string;
};

export const metadata = createPageMetadata({
  title: "뉴스",
  description: "러니의 최신 소식, 업데이트, 교육 트렌드를 확인하세요. AI 문해력 솔루션 러니.",
  path: "/news",
});

function mapCachedToNewsItem(item: CachedNewsItem): NewsItem {
  return {
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    publishedAt: item.publishedAt,
    category: item.category ?? "뉴스",
    thumbnail: item.thumbnail,
  };
}

async function fetchNews(): Promise<{ items: NewsItem[]; lastUpdated: string }> {
  const local = await getLocalNewsList();

  // 로컬 캐시가 있으면 우선 사용
  if (local) {
    // 오래된 캐시는 백그라운드에서 갱신 시도
    if (isCacheStale(local)) {
      void updateNewsFromNotion().catch(() => {});
    }

    return {
      items: local.items.map(mapCachedToNewsItem),
      lastUpdated: local.updatedAt,
    };
  }

  // 로컬에 없으면 Notion에서 최초 1회 가져와서 캐시 생성
  try {
    const fresh = await updateNewsFromNotion();
    return {
      items: fresh.items.map(mapCachedToNewsItem),
      lastUpdated: fresh.updatedAt,
    };
  } catch {
    return { items: [], lastUpdated: new Date().toISOString() };
  }
}

export default async function NewsPage() {
  const { items, lastUpdated } = await fetchNews();

  return <NewsPageContent newsList={items} lastUpdated={lastUpdated} />;
}
