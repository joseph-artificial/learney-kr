import { ElementaryHeroSection } from "@/components/apply-target/ElementaryHeroSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { LearningContentBasicIntroSection } from "@/components/solutions/learningContents/LearningContentBasicIntroSection";
import { LearningContentHeroSection } from "@/components/solutions/learningContents/LearningContentHeroSection";
import { LearningContentReadingSection } from "@/components/solutions/learningContents/LearningContentReadingSection";
import { LearningContentStructureSection } from "@/components/solutions/learningContents/LearningContentStructureSection";
import { LearningContentSubjectIntroSection } from "@/components/solutions/learningContents/LearningContentSubjectIntroSection";
import { LearningContentTutorSection } from "@/components/solutions/learningContents/LearningContentTutorSection";
// import { LearningContentBasicIntroSection, LearningContentReadingSection, LearningContentStructureSection, LearningContentSubjectIntroSection, LearningContentTutorSection } from "@/components/solutions/LearningContentSections";

import { createPageMetadata } from "@/lib/seo";
import { Box, Stack, Text } from "@chakra-ui/react";

export const metadata = createPageMetadata({
  title: "학습 콘텐츠",
  description: "러니 학습 콘텐츠 솔루션을 확인하세요. 콘텐츠 준비 중입니다.",
  path: "/solutions/learning-content",
});

const LearningContentPricingSectionTitle = (
  <Stack gap={6} align="center" pb={'60px'}>
     <Text
      color="black"
      fontWeight="600"
      fontSize={{ base: "34px", lg: "48px" }}
      lineHeight={{ base: "48px", lg: "60px" }}
      textAlign="center"
    >
      <Box as="span" bgGradient="linear(to-r, #5ECCFF, #0055A9, #00A3A9)" bgClip="text" color="transparent" textAlign="center">
        문해력의 기초부터 교과 성취까지,
      </Box>
      <br />직접 경험해 보세요.
    </Text>
    <Text fontFamily="body" fontWeight="500" fontSize="18px" lineHeight="28px" color="#1D2939" whiteSpace="pre-line" textAlign="center">
      회원가입 후 바로 모든 학습 콘텐츠를 확인할 수 있어요.{"\n"}2주 동안 무료로 모든 기능을 체험할 수 있어요.
    </Text>
  </Stack>
);


export default function LearningContentPage() {
  return (
    <Box bg="white">
      <LearningContentHeroSection />
      <LearningContentStructureSection />
      <LearningContentBasicIntroSection />
      <LearningContentReadingSection />
      <LearningContentTutorSection />
      <LearningContentSubjectIntroSection />
      <PricingSection titleSection={LearningContentPricingSectionTitle} />
      {/* <LearningContentValidationSection /> */}
    </Box>
  );
}
