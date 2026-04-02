import { createPageMetadata } from "@/lib/seo";
import { Box, Stack, Text } from "@chakra-ui/react";
import { InstitutionFaqAccordionSection } from "@/components/apply-target/InstitutionFaqAccordionSection";
import { InstitutionHeroCTASection } from "@/components/apply-target/institution/InstitutionHeroCTASection";
import { InstitutionWhyChooseSection } from "@/components/apply-target/institution/InstitutionWhyChooseSection";
import { InstitutionCurriculumLinkSection } from "@/components/apply-target/institution/InstitutionCurriculumLinkSection";
import { InstitutionStatsStripSection } from "@/components/apply-target/institution/InstitutionStatsStripSection";
import { InstitutionContentSafetySection } from "@/components/apply-target/institution/InstitutionContentSafetySection";
import { InstitutionItEnvironmentSection } from "@/components/apply-target/institution/InstitutionItEnvironmentSection";
import { InstitutionEducationalEffectivenessSection } from "@/components/apply-target/institution/InstitutionEducationalEffectivenessSection";
import { InstitutionOperationalConvenienceSection } from "@/components/apply-target/institution/InstitutionOperationalConvenienceSection";
import { InstitutionAdoptionProcessSection } from "@/components/apply-target/institution/InstitutionAdoptionProcessSection";
import { InstitutionTeacherLessonIdeasSection } from "@/components/apply-target/InstitutionTeacherLessonIdeasSection";
import { InstitutionInclusiveLearningSection } from "@/components/apply-target/institution/InstitutionInclusiveLearningSection";
import { PricingSection } from "@/components/landing/PricingSection";
import {
  filterFaqsByPage,
  getLocalFaqList,
  isFaqCacheStale,
  updateFaqFromNotion,
} from "@/lib/faq-local";

export const metadata = createPageMetadata({
  title: "적용 대상 (교육청·학교)",
  description:
    "교육청·학교를 위한 AI 문해력 솔루션 러니. 아침 자습, 문해력 루틴부터 읽기·쓰기·듣기·말하기까지. 2주 무료체험 신청하세요.",
  path: "/apply-target/institution",
  imagePath: "/images/og/apply-target-institution.png",
});

const MiddleHighPricingSectionTitle = (
  <Stack gap={6} align="center" pb={'60px'}>
     <Text
      color="black"
      fontWeight="600"
      fontSize={{ base: "34px", lg: "48px" }}
      lineHeight={{ base: "48px", lg: "60px" }}
    >
      <Box as="span" bgGradient="linear(to-r, #43B9D1, #933CB8)" bgClip="text" color="transparent">
        교육청 및 학교
      </Box>
      에 러니를 도입해 보세요.
    </Text>
    <Text fontFamily="body" fontWeight="500" fontSize="18px" lineHeight="28px" color="#1D2939" whiteSpace="pre-line" textAlign="center">
      파일럿 운영부터 전체 도입까지, 규모와 상황에 맞게 상담해 드려요.{"\n"}학습지원 소프트웨어 선택기준 검토 자료도 함께 제공해요.
    </Text>
  </Stack>
);

async function fetchInstitutionFaqs() {
  const local = await getLocalFaqList();
  const items =
    local && local.items.length > 0
      ? local.items
      : (await updateFaqFromNotion()).items;
  if (local && local.items.length > 0 && isFaqCacheStale(local)) {
    void updateFaqFromNotion();
  }
  return filterFaqsByPage(items, "institution");
}

export default async function ApplyTargetInstitutionPage() {
  const faqs = await fetchInstitutionFaqs();

  return (
    <Box bg="white">
      <InstitutionHeroCTASection />
      <InstitutionStatsStripSection />
      <InstitutionWhyChooseSection targetClassName="apply-target-curriculum-link-intro" />
      <InstitutionCurriculumLinkSection />
      <InstitutionEducationalEffectivenessSection />
      <InstitutionContentSafetySection />
      <InstitutionItEnvironmentSection />
      <InstitutionOperationalConvenienceSection />
      <InstitutionAdoptionProcessSection />
      <InstitutionInclusiveLearningSection />
      <InstitutionTeacherLessonIdeasSection />
      <InstitutionFaqAccordionSection faqs={faqs} />
      <PricingSection titleSection={MiddleHighPricingSectionTitle} />
    </Box>
  );
}
