import { Suspense } from "react";
import { Box } from "@chakra-ui/react";
import { createPageMetadata } from "@/lib/seo";
import { PricingPageContent } from "./PricingPageContent";

export const metadata = createPageMetadata({
  title: "요금 안내",
  description:
    "도입 규모와 기간에 맞는 플랜을 확인하고, 서비스 소개서·무료체험을 신청하세요. 학교·학원 맞춤 문해력 솔루션 러니.",
  path: "/pricing",
  imagePath: "/images/og/pricing.png",
  keywords: [
    "러니",
    "요금",
    "가격",
    "무료체험",
    "문해력",
    "에듀테크",
    "학교 도입",
    "견적",
  ],
});

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <Box as="main" minH="100vh" bg="white" aria-busy="true" />
      }
    >
      <PricingPageContent />
    </Suspense>
  );
}
