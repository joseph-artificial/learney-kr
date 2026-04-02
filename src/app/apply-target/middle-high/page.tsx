import { ApplyTargetConcernCard, ApplyTargetConcernsSection } from "@/components/apply-target/ApplyTargetConcernsSection";
import { ApplyTargetDailyFlowSection } from "@/components/apply-target/ApplyTargetDailyFlowSection";
import { ApplyTargetGrowthSection } from "@/components/apply-target/ApplyTargetGrowthSection";
import { ApplyTargetLiteracySection } from "@/components/apply-target/ApplyTargetLiteracySection";
import { ApplyTargetTeacherStoriesSection } from "@/components/apply-target/ApplyTargetTeacherStoriesSection";
import { MiddleHighAiTutorSection } from "@/components/apply-target/MiddleHighAiTutorSection";
import { MiddleHighClassLearningSection } from "@/components/apply-target/MiddleHighClassLearningSection";
import { MiddleHighExploreSection } from "@/components/apply-target/MiddleHighExploreSection";
import { MiddleHighHeroSection } from "@/components/apply-target/MiddleHighHeroSection";
import { MiddleHighTextbookSection } from "@/components/apply-target/MiddleHighTextbookSection";
import { Box, Stack, Text } from "@chakra-ui/react";
import { Metadata } from "next";
import { MiddleHighGrowthSectionDescription, MiddleHighGrowthSectionTitle } from "./growthSection";
import { MiddleHighLiteracySectionCards, MiddleHighLiteracySectionCateforyList, MiddleHighLiteracySectionDescription, MiddleHighLiteracySectionTitle } from "./literacySection";
import { MiddleHighTeacherStoriesSectionButton, MiddleHighTeacherStoriesSectionDescription, MiddleHighTeacherStoriesSectionStories, MiddleHighTeacherStoriesSectionTitle } from "./teacherStoriesSection";
import { MiddleHighDailyFlowSectionChip, MiddleHighDailyFlowSectionDescription, MiddleHighDailyFlowSectionFlowItems, MiddleHighDailyFlowSectionTitle } from "./dailyFlowSection";
import { PricingSection } from "@/components/landing/PricingSection";
export const metadata: Metadata = {
  title: "적용 대상 (중·고등) | 러니",
  description: "중·고등 적용 대상 (임시 페이지).",
};

//TODO 내용 변경해야함

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

const MiddleHighPricingSectionTitle = (
  <Stack gap={6} align="center" pb={'60px'}>
     <Text
      color="black"
      fontWeight="600"
      fontSize={{ base: "34px", lg: "48px" }}
      lineHeight={{ base: "48px", lg: "60px" }}
    >
      <Box as="span" bgGradient="linear(to-r, #43D1BC, #009B84)" bgClip="text" color="transparent">
        다음 수업
      </Box>
      에 바로 써보세요!
    </Text>
    <Text fontFamily="body" fontWeight="500" fontSize="18px" lineHeight="28px" color="#1D2939" whiteSpace="pre-line" textAlign="center">
      회원가입하고 클래스에 학생을 등록하면, 바로 학생별 맞춤 학습이 자동으로 시작돼요.{"\n"}2주 동안 무료로 모든 기능을 체험할 수 있어요.
    </Text>
  </Stack>
);
export default function ApplyTargetMiddleHighPage() {
  return (
    <Box bg="white">
      <MiddleHighHeroSection />
      <ApplyTargetConcernsSection description={`국어 선생님이라면\n한 번쯤 이런 생각, 해보셨을 거예요.`} concerns={CONCERNS} />
      
      <MiddleHighClassLearningSection  targetClassName="apply-target-explore-intro" />
      
      
      <MiddleHighExploreSection />
      <MiddleHighTextbookSection />
      <MiddleHighAiTutorSection />
      <ApplyTargetLiteracySection title={MiddleHighLiteracySectionTitle} description={MiddleHighLiteracySectionDescription} categoryList={MiddleHighLiteracySectionCateforyList} cards={MiddleHighLiteracySectionCards} />
      <ApplyTargetGrowthSection title={MiddleHighGrowthSectionTitle} description={MiddleHighGrowthSectionDescription} />
      <ApplyTargetDailyFlowSection chip={MiddleHighDailyFlowSectionChip} title={MiddleHighDailyFlowSectionTitle} description={MiddleHighDailyFlowSectionDescription} flowItems={MiddleHighDailyFlowSectionFlowItems} />
      <ApplyTargetTeacherStoriesSection title={MiddleHighTeacherStoriesSectionTitle} description={MiddleHighTeacherStoriesSectionDescription} stories={MiddleHighTeacherStoriesSectionStories} button={MiddleHighTeacherStoriesSectionButton} />
      <PricingSection titleSection={MiddleHighPricingSectionTitle} />
    </Box>
  );
}
