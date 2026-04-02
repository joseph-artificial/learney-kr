import { createPageMetadata } from "@/lib/seo";
import { Box } from "@chakra-ui/react";
import { FaqSection } from "@/components/landing/FaqSection";
import {
  type CachedFaqItem,
  filterFaqsByPage,
  getLocalFaqList,
  isFaqCacheStale,
  updateFaqFromNotion,
} from "@/lib/faq-local";

export const metadata = createPageMetadata({
  title: "자주 묻는 질문",
  description: "러니 서비스, 요금, 도입 방법 등 자주 묻는 질문을 확인해보세요. 빠르게 답변을 찾을 수 있어요.",
  path: "/faq",
});

async function fetchFaqs(): Promise<CachedFaqItem[]> {
  const local = await getLocalFaqList();
  let items: CachedFaqItem[];

  if (local && local.items.length > 0) {
    if (isFaqCacheStale(local)) {
      void updateFaqFromNotion();
    }
    items = local.items;
  } else {
    const fresh = await updateFaqFromNotion();
    items = fresh.items;
  }

  return filterFaqsByPage(items, "faq");
}

export default async function FaqPage() {
  const faqs = await fetchFaqs();

  return (
    <Box bg="white">
      <FaqSection faqs={faqs} />
    </Box>
  );
}
