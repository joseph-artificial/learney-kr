import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { siteConfig } from "@/config/site";
import "./globals.css";
import "aos/dist/aos.css";
import {
  getLocalNewsList,
  isCacheStale,
  updateNewsFromNotion,
} from "@/lib/news-local";
import {
  getLocalFaqList,
  isFaqCacheStale,
  updateFaqFromNotion,
} from "@/lib/faq-local";

export const metadata: Metadata = {
  title: `${siteConfig.name} | 회사 소개 랜딩`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

// 앱 레벨에서 뉴스 캐시를 하루에 한 번만 백그라운드에서 최신화
void (async () => {
  try {
    const newsCache = await getLocalNewsList();
    if (!newsCache || isCacheStale(newsCache)) {
      await updateNewsFromNotion();
    }

    const faqCache = await getLocalFaqList();
    if (!faqCache || isFaqCacheStale(faqCache)) {
      await updateFaqFromNotion();
    }
  } catch {
    // 실패해도 앱 렌더링에는 영향 없음
  }
})();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico?v=20260324" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png?v=20260324" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png?v=20260324" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=20260324" sizes="180x180" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
          `,
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
