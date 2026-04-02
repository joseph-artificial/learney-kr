import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageSeoParams = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  /** meta keywords (Google은 거의 미사용, 일부 검색엔진·도구에서만 참고) */
  keywords?: string | string[];
};

/** 페이지별 SEO 메타데이터 생성 (canonical, Open Graph, Twitter, robots) */
export function createPageMetadata({
  title,
  description,
  path,
  imagePath = "/images/og/default.png",
  keywords,
}: PageSeoParams): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const url = `${siteConfig.url.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    title: fullTitle,
    description,
    ...(keywords != null ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: imagePath, width: 1200, height: 630, alt: title }],
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imagePath],
    },
    robots: { index: true, follow: true },
  };
}
