import { createPageMetadata } from "@/lib/seo";
import { Box, Stack, Text } from "@chakra-ui/react";
import { ApplyTargetConcernCard, ApplyTargetConcernsSection } from "@/components/apply-target/ApplyTargetConcernsSection";
import { ElementarySolutionSection } from "@/components/apply-target/ElementarySolutionSection";
import { ApplyTargetFeatureIntroSection } from "@/components/apply-target/ApplyTargetFeatureIntroSection";
import { ApplyTargetLiteracySection, LiteracyCard } from "@/components/apply-target/ApplyTargetLiteracySection";
import { ElementaryTutorSection } from "@/components/apply-target/ElementaryTutorSection";
import { ApplyTargetDailyFlowSection } from "@/components/apply-target/ApplyTargetDailyFlowSection";
import { ApplyTargetTeacherStoriesSection } from "@/components/apply-target/ApplyTargetTeacherStoriesSection";
import { ElementaryHeroSection } from "@/components/apply-target/ElementaryHeroSection";
import { FeatureIntroSectionCateforyList, FeatureIntroSectionCheckItems, FeatureIntroSectionContents, FeatureIntroSectionTitle } from "./featureIntroSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ElementaryTeacherStoriesSectionButton, ElementaryTeacherStoriesSectionDescription, ElementaryTeacherStoriesSectionStories, ElementaryTeacherStoriesSectionTitle } from "./teacherStoriesSection";
import { ElementaryLiteracySectionCards, ElementaryLiteracySectionCateforyList, ElementaryLiteracySectionDescription, ElementaryLiteracySectionTitle } from "./literacySection";
import { ApplyTargetGrowthSection } from "@/components/apply-target/ApplyTargetGrowthSection";
import { ElementaryGrowthSectionDescription, ElementaryGrowthSectionTitle } from "./growthSection";
import { ElementaryDailyFlowSectionChip, ElementaryDailyFlowSectionDescription, ElementaryDailyFlowSectionFlowItems, ElementaryDailyFlowSectionTitle } from "./dailyFlowSection";
// import Image from "next/image";

export const metadata = createPageMetadata({
  title: "적용 대상 (초등)",
  description:
    "초등 선생님을 위한 AI 문해력 솔루션 러니. 아침 자습, 문해력 루틴부터 읽기·쓰기·듣기·말하기까지. 2주 무료체험 신청하세요.",
  path: "/apply-target/elementary",
  imagePath: "/images/og/apply-target-elementary.png",
});

const CONCERNS: ApplyTargetConcernCard[] = [
  {
    bg: "gray.100",
    text: "읽기는 되는데 쓰기가 안 되는 아이,\n듣기는 잘하는데 말하기가 약한 아이...\n수준 차이가 커서 같은 자료를 주기가 어려워요.",
    highlight: true,
  },
  {
    bg: "gray.50",
    text: "국어만 가르치는 게 아니라 전 과목을 봐야 하니까,\n국어 보충 자료까지 일일이 챙기기가\n현실적으로 힘들어요.",
  },
  {
    bg: "gray.100",
    text: "아침 자습 시간,\n뭘 시켜야 할지 매번 고민이에요.\n프린트를 준비하기도 부담되고요.",
    highlight: true,
  },
  {
    bg: "gray.50",
    text: "문해력은 하루아침에 되는 게 아니라\n꾸준히 학습해야 하는데...\n아이들이 며칠 지나면 흥미를 잃어버려요.",
    highlight: true,
  },
];

const ElementaryPricingSectionTitle = (
  <Stack gap={{base: '24px', lg: 6}} align="center" pb={{base: '20px', lg: '60px'}}>
     <Text
      color="black"
      fontWeight="600"
      fontSize={{ base: "24px", lg: "48px" }}
      lineHeight={{ base: "34px", lg: "60px" }}
      textAlign={{base: 'center', lg: 'left'}}
    >
      내일 { ' ' }
      <Box as="span" bgGradient="linear(to-r, #43D1BC, #009B84)" bgClip="text" color="transparent">
        아침 자습 시간
      </Box>
      
      부터 <Box as="br" display={{base: 'block', lg: 'none'}} />시작해 보세요! 
    </Text>
    <Text fontFamily="body" fontWeight="500" fontSize={{base: '14px', lg: '18px'}} lineHeight={{base: '20px', lg: '28px'}} color="#1D2939" whiteSpace="pre-line" textAlign="center">
      회원가입하고 클래스에 학생을 등록하면, 바로 학생별 맞춤 학습이 자동으로 시작돼요.{"\n"}2주 동안 무료로 모든 기능을 체험할 수 있어요.
    </Text>
  </Stack>
);

export default function ApplyTargetElementaryPage() {
  return (
    <Box bg="white">
      <ElementaryHeroSection />
      <ApplyTargetConcernsSection
        description={`담임 선생님이라면\n매일 아침 이런 고민,\n하고 계실 거예요.`}
        descriptionLg={`담임 선생님이라면\n매일 아침 이런 고민, 하고 계실 거예요.`}
        concerns={CONCERNS}
      />
      <ElementarySolutionSection targetClassName="apply-target-feature-intro" />
      
      <ApplyTargetFeatureIntroSection title={FeatureIntroSectionTitle} description={`‘오늘의 학습’은 학생 수준에 맞춰\nAI가 매일 자동으로 구성하는 문해력 학습이에요.`} categoryList={FeatureIntroSectionCateforyList} checkItems={FeatureIntroSectionCheckItems} contents={FeatureIntroSectionContents} />
      <ApplyTargetLiteracySection title={ElementaryLiteracySectionTitle} description={ElementaryLiteracySectionDescription} categoryList={ElementaryLiteracySectionCateforyList} cards={ElementaryLiteracySectionCards} />
      <ElementaryTutorSection />
      <ApplyTargetDailyFlowSection chip={ElementaryDailyFlowSectionChip} title={ElementaryDailyFlowSectionTitle} description={ElementaryDailyFlowSectionDescription} flowItems={ElementaryDailyFlowSectionFlowItems} />
      <ApplyTargetGrowthSection title={ElementaryGrowthSectionTitle} description={ElementaryGrowthSectionDescription} />
      <ApplyTargetTeacherStoriesSection title={ElementaryTeacherStoriesSectionTitle} description={ElementaryTeacherStoriesSectionDescription} stories={ElementaryTeacherStoriesSectionStories} button={ElementaryTeacherStoriesSectionButton} />
      <PricingSection titleSection={ElementaryPricingSectionTitle} />
      {/* <ApplyTargetSection /> */}
    </Box>
  );
}
