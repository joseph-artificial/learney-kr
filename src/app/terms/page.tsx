import { Metadata } from "next";
import { TermsPageContent } from "./TermsPageContent";
import fs from "node:fs/promises";
import path from "node:path";

export const metadata: Metadata = {
  title: "요금 안내 | 러니",
  description: "도입 규모와 기간에 맞는 플랜을 확인하고, 서비스 소개서·무료체험을 신청하세요.",
};

const TERMS_SOURCE: Record<string, { file: string; title: string }> = {
  "app:terms": {
    file: "terms/app/terms-of-service.html",
    title: "러니 학생용 서비스 이용약관",
  },
  "app:privacy": {
    file: "terms/app/privacy-policy.html",
    title: "러니 학생용 개인정보처리방침",
  },
  "app:event": {
    file: "terms/app/event-policy.html",
    title: "이벤트 및 서비스 안내 수신 동의",
  },
  "lms:terms": {
    file: "terms/lms/lms-terms-of-service.html",
    title: "러니 선생님용 LMS 서비스 이용약관",
  },
  "lms:privacy": {
    file: "terms/lms/lms-privacy-policy.html",
    title: "러니 선생님용 LMS 개인정보처리방침",
  },
};

function extractRenderableHtml(rawHtml: string): string {
  const styleMatches = rawHtml.match(/<style[^>]*>[\s\S]*?<\/style>/gi) ?? [];
  const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : rawHtml;
  return `${styleMatches.join("\n")}\n${bodyContent}`;
}

type TermsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TermsPage({ searchParams }: TermsPageProps) {
  const params = (await searchParams) ?? {};
  const productParam = params.product;
  const docParam = params.doc;

  const product =
    typeof productParam === "string" && productParam.length > 0
      ? productParam
      : "app";
  const doc = typeof docParam === "string" && docParam.length > 0 ? docParam : "terms";
  const key = `${product}:${doc}`;

  const current = TERMS_SOURCE[key] ?? TERMS_SOURCE["app:terms"];
  const htmlPath = path.join(process.cwd(), "public", current.file);
  const rawHtml = await fs.readFile(htmlPath, "utf8");
  const html = extractRenderableHtml(rawHtml);

  return <TermsPageContent title={current.title} html={html} />;
}
