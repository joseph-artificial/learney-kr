import { Client } from "@notionhq/client";

// .env에 정의된 값 그대로 사용 (서버에서만 접근)
const notionToken = process.env.NEXT_PUBLIC_NOTION_TOKEN;
const newsDbId = process.env.NEXT_PUBLIC_NOTION_NEWS_DATABASE_ID;
const faqDbId =
  process.env.NEXT_PUBLIC_NOTION_FAQ_DATABASE_ID;

if (!notionToken) {
  throw new Error("NEXT_PUBLIC_NOTION_TOKEN is not set");
}
if (!newsDbId) {
  throw new Error("NEXT_PUBLIC_NOTION_NEWS_DATABASE_ID is not set");
}

// ─────────────────────────────────────────────
// 타입 정의 (원래 사용하던 구조와 동일/유사)
// ─────────────────────────────────────────────

export type RichTextSpan = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  code?: boolean;
  color?: string;
};

export type BlockContent =
  | { type: "paragraph"; content: RichTextSpan[] }
  | { type: "heading_1"; content: RichTextSpan[] }
  | { type: "heading_2"; content: RichTextSpan[] }
  | { type: "heading_3"; content: RichTextSpan[] }
  | { type: "bulleted_list_item"; content: RichTextSpan[] }
  | { type: "numbered_list_item"; content: RichTextSpan[] }
  | { type: "quote"; content: RichTextSpan[] }
  | { type: "code"; content: RichTextSpan[]; language?: string }
  | { type: "image"; url: string; caption?: string }
  | { type: "divider" }
  | { type: "unsupported" };

// Notion에서 내려오는 "완전한" 뉴스 타입
export type NotionNewsItem = {
  id: string;
  title: string;
  body?: string;
  category: string;
  publishedAt: string;
  startAt?: string;
  endAt?: string;
  isShowOnMain: "SHOW" | "HIDE";
  seoTitle?: string;
  seoKeywords: string[];
  seoDescription?: string;
  seoOgImage?: string;
  seoCanonicalUrl?: string;
  thumbnail?: string;
  hasButton: boolean;
  buttonText?: string;
  buttonLink?: string;
  buttonIcon?: string;
  isPublished: boolean;
  blocks?: BlockContent[];
  relatedNews?: {
    id: string;
    title: string;
    category: string;
    publishedAt: string;
    thumbnail?: string;
  }[];
};

/** FAQ 노출 페이지 (Notion `page` select: institution | faq) */
export type NotionFaqPageTarget = "institution" | "faq";

export type NotionFaqItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
  /** Notion 표시 페이지. 미설정 시 앱에서는 `/faq`에만 노출 */
  page?: NotionFaqPageTarget;
  isPublished: boolean;
  seoTitle?: string;
  seoKeywords: string[];
  seoDescription?: string;
  seoOgImage?: string;
};

type NotionRichText = {
  plain_text?: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?: string;
  };
};

function parseRichText(richText: NotionRichText[]): RichTextSpan[] {
  if (!richText?.length) return [];
  return richText.map((r) => ({
    text: r.plain_text ?? "",
    bold: r.annotations?.bold,
    italic: r.annotations?.italic,
    strikethrough: r.annotations?.strikethrough,
    underline: r.annotations?.underline,
    code: r.annotations?.code,
    color:
      r.annotations?.color && r.annotations.color !== "default"
        ? r.annotations.color
        : undefined,
  }));
}

function blockToStructured(block: Record<string, unknown>): BlockContent | null {
  const type = (block as { type?: string }).type as string;
  const content = (block as Record<string, unknown>)[type] as
    | (Record<string, unknown> & { rich_text?: NotionRichText[] })
    | undefined;
  if (!content) {
    return type === "divider" ? { type: "divider" } : { type: "unsupported" };
  }

  if (type === "image") {
    const img = content as {
      file?: { url?: string };
      external?: { url?: string };
      caption?: Array<{ plain_text?: string }>;
    };
    const url = img.file?.url ?? img.external?.url ?? "";
    const caption =
      img.caption?.map((c) => c.plain_text).join("").trim() || undefined;
    return url ? { type: "image", url, caption } : null;
  }

  const richText = content.rich_text as NotionRichText[] | undefined;
  const spans = parseRichText(richText ?? []);

  const codeBlock = content as { language?: string };

  switch (type) {
    case "paragraph":
      return { type: "paragraph", content: spans };
    case "heading_1":
      return { type: "heading_1", content: spans };
    case "heading_2":
      return { type: "heading_2", content: spans };
    case "heading_3":
      return { type: "heading_3", content: spans };
    case "bulleted_list_item":
      return { type: "bulleted_list_item", content: spans };
    case "numbered_list_item":
      return { type: "numbered_list_item", content: spans };
    case "quote":
      return { type: "quote", content: spans };
    case "code":
      return {
        type: "code",
        content: spans,
        language: codeBlock.language,
      };
    case "divider":
      return { type: "divider" };
    default:
      return spans.length
        ? { type: "paragraph", content: spans }
        : { type: "unsupported" };
  }
}

function spanToHtml(span: RichTextSpan): string {
  let text = span.text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  if (!text) return "";

  if (span.code) {
    text = `<code>${text}</code>`;
  }
  if (span.bold) {
    text = `<strong>${text}</strong>`;
  }
  if (span.italic) {
    text = `<em>${text}</em>`;
  }
  if (span.strikethrough) {
    text = `<s>${text}</s>`;
  }
  if (span.underline) {
    text = `<u>${text}</u>`;
  }
  if (span.color) {
    text = `<span style="color:${span.color}">${text}</span>`;
  }

  return text;
}

function blockToHtml(block: BlockContent): string {
  switch (block.type) {
    case "paragraph": {
      const inner = block.content.map(spanToHtml).join("");
      return inner ? `<p>${inner}</p>` : "";
    }
    case "heading_1": {
      const inner = block.content.map(spanToHtml).join("");
      return inner ? `<h1>${inner}</h1>` : "";
    }
    case "heading_2": {
      const inner = block.content.map(spanToHtml).join("");
      return inner ? `<h2>${inner}</h2>` : "";
    }
    case "heading_3": {
      const inner = block.content.map(spanToHtml).join("");
      return inner ? `<h3>${inner}</h3>` : "";
    }
    case "bulleted_list_item": {
      const inner = block.content.map(spanToHtml).join("");
      return inner ? `<ul><li>${inner}</li></ul>` : "";
    }
    case "numbered_list_item": {
      const inner = block.content.map(spanToHtml).join("");
      return inner ? `<ol start="1"><li>${inner}</li></ol>` : "";
    }
    case "quote": {
      const inner = block.content.map(spanToHtml).join("");
      return inner ? `<blockquote>${inner}</blockquote>` : "";
    }
    case "code": {
      const inner = block.content.map(spanToHtml).join("");
      const lang = block.language ? ` data-language="${block.language}"` : "";
      return inner ? `<pre><code${lang}>${inner}</code></pre>` : "";
    }
    case "image": {
      const alt = block.caption ?? "";
      return `<figure><img src="${block.url}" alt="${alt}"/>${
        alt ? `<figcaption>${alt}</figcaption>` : ""
      }</figure>`;
    }
    case "divider":
      return "<hr />";
    case "unsupported":
    default:
      return "";
  }
}

function blocksToHtml(blocks: BlockContent[]): string {
  return blocks.map(blockToHtml).filter(Boolean).join("\n");
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
    2,
    "0",
  )}.${String(d.getDate()).padStart(2, "0")}`;
};

type PageWithCover = {
  cover?: {
    type?: string;
    external?: { url?: string };
    file?: { url?: string };
  };
  properties: Record<string, unknown>;
};

function getCoverUrl(
  cover: PageWithCover["cover"],
): string | undefined {
  if (!cover || typeof cover !== "object") return undefined;
  if (cover.type === "external" && cover.external?.url) return cover.external.url;
  if (cover.type === "file" && cover.file?.url) return cover.file.url;
  if (cover.external?.url) return cover.external.url;
  if (cover.file?.url) return cover.file.url;
  return undefined;
}

type PageProps = Record<
  string,
  {
    type: string;
    title?: Array<{ plain_text: string }>;
    rich_text?: Array<{ plain_text: string }>;
    select?: { name: string };
    multi_select?: Array<{ name: string }>;
    date?: { start: string; end?: string } | null;
    relation?: Array<{ id: string }>;
  }
>;

function parseRelationIdsFromProp(v: PageProps[string]): string[] {
  if (v.type === "relation") {
    return (v.relation ?? []).map((r) => r.id).filter(Boolean);
  }

  // relation 속성이 텍스트(JSON 문자열)로 저장된 경우도 허용
  if (v.type === "rich_text" && v.rich_text?.length) {
    const raw = v.rich_text.map((t) => t.plain_text).join("").trim();
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as Array<{ id?: string }>;
      if (!Array.isArray(parsed)) return [];
      return parsed.map((r) => r.id ?? "").filter(Boolean);
    } catch {
      return [];
    }
  }

  return [];
}

function mapPageToItem(page: Record<string, unknown>): Omit<
  NotionNewsItem,
  "body" | "blocks"
> {
  const p = page as PageWithCover;
  let thumbnail: string | undefined = getCoverUrl(p.cover);
  const props = (p.properties ?? {}) as PageProps;

  let title = "";
  let category = "뉴스";
  let publishedAt = "";
  let startAt: string | undefined;
  let endAt: string | undefined;
  let buttonText: string | undefined;
  let buttonLink: string | undefined;
  let buttonIcon: string | undefined;
  let isShowOnMain: "SHOW" | "HIDE" = "HIDE";
  let seoTitle: string | undefined;
  let seoKeywords: string[] = [];
  let seoDescription: string | undefined;
  let seoOgImage: string | undefined;
  let seoCanonicalUrl: string | undefined;
  let isPublished = false;
  let hasButton = false;
  let relatedNews:
    | {
        id: string;
        title: string;
        category: string;
        publishedAt: string;
        thumbnail?: string;
      }[]
    | undefined;
  
  for (const [key, v] of Object.entries(props)) {
    if (!v || typeof v !== "object") continue;

    if (key === "title") {
      if (v.type === "title" && v.title?.length) {
        title = v.title.map((t) => t.plain_text).join("");
      }
    } else if (
      (key === "buttonText" ||
        key === "thumbnail" ||
        key === "buttonLink" ||
        key === "category" ||
        key === "buttonIcon") &&
      v.type === "rich_text" &&
      v.rich_text?.length
    ) {
      const txt = v.rich_text.map((t) => t.plain_text).join("").trim();
      if (key === "buttonText") buttonText = txt;
      if (key === "thumbnail") thumbnail = txt;
      if (key === "buttonLink") buttonLink = txt;
      if (key === "category") category = txt;
      if (key === "buttonIcon") buttonIcon = txt;
    } else if (
      (key === "seoTitle" ||
        key === "seoDescription" ||
        key === "seoOgImage" ||
        key === "seoCanonicalUrl") &&
      v.type === "rich_text" &&
      v.rich_text?.length
    ) {
      const txt = v.rich_text.map((t) => t.plain_text).join("").trim();
      if (key === "seoTitle") seoTitle = txt;
      if (key === "seoDescription") seoDescription = txt;
      if (key === "seoOgImage") seoOgImage = txt;
      if (key === "seoCanonicalUrl") seoCanonicalUrl = txt;
    } else if (
      (key === "publishedAt" || key === "startAt" || key === "endAt") &&
      v.type === "date" &&
      v.date?.start
    ) {
      const start = v.date.start;
      if (key === "publishedAt") publishedAt = formatDate(start);
      if (key === "startAt") startAt = formatDate(start);
      if (key === "endAt") endAt = formatDate(start);
    } else if (key === "hasButton" && v.type === "select" && v.select?.name) {
      hasButton = v.select.name === "WITH_BUTTON";
    } else if (key === "isPublished" && v.type === "select" && v.select?.name) {
      isPublished = v.select.name === "PUBLISHED";
    } else if (key === "isShowOnMain" && v.type === "select" && v.select?.name) {
      isShowOnMain = v.select.name === "SHOW" ? "SHOW" : "HIDE";
    } else if (key === "seoKeywords" && v.type === "multi_select") {
      seoKeywords = (v.multi_select ?? []).map((m) => m.name).filter(Boolean);
    } else if (key === "relatedNews") {
      const relationIds = parseRelationIdsFromProp(v);
      if (relationIds.length) {
        relatedNews = relationIds.map((id) => ({
          id,
          title: "",
          category: "",
          publishedAt: "",
          thumbnail: undefined,
        }));
      }
    } else if (!relatedNews) {
      // fallback: 다른 이름의 relation 필드가 하나만 있는 경우도 허용
      const relationIds = parseRelationIdsFromProp(v);
      if (relationIds.length) {
        relatedNews = relationIds.map((id) => ({
          id,
          title: "",
          category: "",
          publishedAt: "",
          thumbnail: undefined,
        }));
      }
    }
  }

  return {
    id: (page as { id: string }).id,
    title,
    category,
    publishedAt,
    startAt,
    endAt,
    isShowOnMain,
    seoTitle,
    seoKeywords,
    seoDescription,
    seoOgImage,
    seoCanonicalUrl,
    thumbnail,
    hasButton,
    buttonText,
    buttonLink,
    buttonIcon,
    isPublished,
    relatedNews,
  };
}

async function fetchBlocks(
  notion: InstanceType<typeof Client>,
  blockId: string,
): Promise<BlockContent[]> {
  const result: BlockContent[] = [];
  let cursor: string | undefined;
  do {
    const resp = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    for (const block of resp.results) {
      const b = block as unknown as Record<string, unknown>;
      const parsed = blockToStructured(b);
      if (parsed) result.push(parsed);
    }
    cursor = resp.next_cursor ?? undefined;
  } while (cursor);
  return result;
}

// ─────────────────────────────────────────────
// 외부에서 사용할 Notion fetch 유틸들
// ─────────────────────────────────────────────

/** 노션 DB의 모든 뉴스 페이지를 가져와 정렬 + 블록/HTML까지 채워서 반환 */
export async function fetchNewsFromNotion(): Promise<NotionNewsItem[]> {
  const token = notionToken;
  const databaseId = newsDbId;

  if (!token || !databaseId) {
    throw new Error(
      "NEXT_PUBLIC_NOTION_TOKEN, NEXT_PUBLIC_NOTION_NEWS_DATABASE_ID 환경변수를 설정해주세요.",
    );
  }

  const notion = new Client({ auth: token });

  const items: NotionNewsItem[] = [];
  let cursor: string | undefined;

  // 노션 DB 전체 페이지를 모두 가져오기 (100개 단위)
  do {
    const response = await notion.request({
      path: `databases/${databaseId}/query`,
      method: "post",
      body: {
        page_size: 1000,
        start_cursor: cursor,
        sorts: [{ timestamp: "created_time", direction: "descending" }],
      },
    });

    const { results, next_cursor } = response as {
      results: Array<Record<string, unknown>>;
      next_cursor?: string | null;
    };
    items.push(...results.map((p) => mapPageToItem(p)));
    cursor = next_cursor ?? undefined;
  } while (cursor);

  // 각 아이템별 블록/본문/썸네일 채우기
  for (const item of items) {
    try {
      const blocks = await fetchBlocks(notion, item.id);
      item.blocks = blocks;
      item.body = blocksToHtml(blocks);
      if (!item.thumbnail) {
        const firstImage = blocks.find(
          (b): b is Extract<BlockContent, { type: "image" }> =>
            b.type === "image",
        );
        if (firstImage) item.thumbnail = firstImage.url;
      }
    } catch {
      item.blocks = [];
      item.body = "";
    }
  }

  // relatedNews relation id를 실제 뉴스 정보로 보강 (게시된 뉴스만)
  const newsById = new Map(items.map((item) => [item.id, item] as const));
  items.forEach((item) => {
    if (!item.relatedNews?.length) return;
    item.relatedNews = item.relatedNews
      .map((related) => newsById.get(related.id))
      .filter((related): related is NotionNewsItem => Boolean(related && related.isPublished))
      .map((related) => ({
        id: related.id,
        title: related.title,
        category: related.category,
        publishedAt: related.publishedAt,
        thumbnail: related.thumbnail,
      }));
  });

  return items;
}

/** 생성일 기준 정렬된 뉴스 id 목록 (가벼운 용도, 블록 미조회) */
export async function fetchNewsIdsFromNotion(): Promise<string[]> {
  const token = notionToken;
  const databaseId = newsDbId;

  if (!token || !databaseId) {
    throw new Error(
      "NEXT_PUBLIC_NOTION_TOKEN, NEXT_PUBLIC_NOTION_NEWS_DATABASE_ID 환경변수를 설정해주세요.",
    );
  }

  const notion = new Client({ auth: token });
  const response = await notion.request({
    path: `databases/${databaseId}/query`,
    method: "post",
    body: {
      page_size: 100,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    },
  });
  const results = (response as { results: Array<{ id: string }> }).results;
  return results.map((p) => p.id);
}

/** 단일 뉴스 페이지 조회 (상세용) */
export async function fetchNewsItemById(
  pageId: string,
): Promise<NotionNewsItem | null> {
  const token = notionToken;

  if (!token || !pageId) return null;
  const notion = new Client({ auth: token });

  try {
    const page = (await notion.pages.retrieve({
      page_id: pageId,
    })) as unknown as Record<string, unknown>;

    const item = mapPageToItem(page) as NotionNewsItem;
    const blocks = await fetchBlocks(notion, pageId);
    item.blocks = blocks;
    item.body = blocksToHtml(blocks);
    if (!item.thumbnail) {
      const firstImage = blocks.find(
        (b): b is Extract<BlockContent, { type: "image" }> =>
          b.type === "image",
      );
      if (firstImage) item.thumbnail = firstImage.url;
    }
    return item;
  } catch {
    return null;
  }
}

type FaqPageProps = Record<
  string,
  {
    type: string;
    title?: Array<{ plain_text: string }>;
    rich_text?: Array<{ plain_text: string }>;
    select?: { name: string };
    multi_select?: Array<{ name: string }>;
  }
>;

function getRichTextValue(
  props: FaqPageProps,
  keys: string[],
): string | undefined {
  for (const key of keys) {
    const v = props[key];
    if (!v || typeof v !== "object") continue;

    if (v.type === "title" && v.title?.length) {
      return v.title.map((t) => t.plain_text).join("").trim();
    }
    if (v.type === "rich_text" && v.rich_text?.length) {
      return v.rich_text.map((t) => t.plain_text).join("").trim();
    }
  }
  return undefined;
}

function parseFaqPageSelect(props: FaqPageProps): NotionFaqPageTarget | undefined {
  const keys = ["page", "페이지", "Page"];
  for (const key of keys) {
    const v = props[key];
    if (v?.type !== "select" || !v.select?.name) continue;
    const n = v.select.name.trim().toLowerCase();
    if (n === "institution") return "institution";
    if (n === "faq") return "faq";
  }
  return undefined;
}

function mapFaqPageToItem(page: Record<string, unknown>): NotionFaqItem {
  const props = ((page as { properties?: unknown }).properties ?? {}) as FaqPageProps;

  const question =
    getRichTextValue(props, ["question", "질문", "title"]) ?? "";
  const answer =
    getRichTextValue(props, ["answer", "답변", "content", "body"]) ?? "";
  const seoTitle = getRichTextValue(props, ["seoTitle"]);
  const seoDescription = getRichTextValue(props, ["seoDescription"]);
  const seoOgImage = getRichTextValue(props, ["seoOgImage"]);
  const isPublished =
    props.isPublished?.type === "select" &&
    props.isPublished.select?.name === "PUBLISHED";
  const seoKeywords =
    props.seoKeywords?.type === "multi_select"
      ? (props.seoKeywords.multi_select ?? [])
          .map((m) => m.name)
          .filter(Boolean)
      : [];
  const category =
    props.category?.type === "select"
      ? props.category.select?.name
      : props.카테고리?.type === "select"
        ? props.카테고리.select?.name
        : undefined;
  const pageTarget = parseFaqPageSelect(props);

  return {
    id: (page as { id: string }).id,
    question,
    answer,
    category,
    page: pageTarget,
    isPublished,
    seoTitle,
    seoKeywords,
    seoDescription,
    seoOgImage,
  };
}

/** FAQ DB 조회 (게시 상태 + 질문/답변 + SEO) */
export async function fetchFaqFromNotion(): Promise<NotionFaqItem[]> {
  const token = notionToken;
  const databaseId = faqDbId;

  if (!token || !databaseId) {
    throw new Error(
      "NEXT_PUBLIC_NOTION_TOKEN, NEXT_PUBLIC_NOTION_FAQ_DATABASE_ID 환경변수를 설정해주세요.",
    );
  }

  const notion = new Client({ auth: token });
  const items: NotionFaqItem[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.request({
      path: `databases/${databaseId}/query`,
      method: "post",
      body: {
        page_size: 100,
        start_cursor: cursor,
        sorts: [{ timestamp: "created_time", direction: "descending" }],
      },
    });

    const { results, next_cursor } = response as {
      results: Array<Record<string, unknown>>;
      next_cursor?: string | null;
    };
    items.push(...results.map(mapFaqPageToItem));
    cursor = next_cursor ?? undefined;
  } while (cursor);

  return items.filter((item) => item.isPublished);
}