

import { ClassManagementHeroSection } from "@/components/solutions/ClassManagementHeroSection";
import { ClassManagementSetupFlowSection } from "@/components/solutions/ClassManagementSetupFlowSection";
import { ClassManagementSolutionSection } from "@/components/solutions/ClassManagementSolutionSection";
import { createPageMetadata } from "@/lib/seo";
import { Box, Stack, Text } from "@chakra-ui/react";
import { ClassManagementKeySolution01Section } from "@/components/solutions/class/ClassManagementKeySolution01Section";
import { ClassManagementKeySolution02Section } from "@/components/solutions/class/ClassManagementKeySolution02Section";
import { ClassManagementKeySolution03Section } from "@/components/solutions/class/ClassManagementKeySolution03Section";
import { PricingSection } from "@/components/landing/PricingSection";
import { SolutionsNeedsConcernsSection } from "@/components/solutions/SolutionsNeedsConcernsSection";
import { ClassManagementKeySolution04Section } from "@/components/solutions/class/ClassManagementKeySolution04Section";
import { ClassManagementSolutionsNeedsConcernsConcers, ClassManagementSolutionsNeedsConcernsTitle } from "./solutionsNeedsConcerns";

export const metadata = createPageMetadata({
  title: "클래스 관리",
  description:
    "5분이면 우리 반이 완성돼요. 학생 등록, 학습 배포 자동화, 주목할 학생 관리, 학습 탐색까지 러니의 클래스 관리 솔루션을 확인하세요.",
  path: "/solutions/class-management",
  imagePath: "/images/og/class-management.png",
  keywords: [
    "러니",
    "클래스 관리",
    "학생 등록",
    "에듀테크",
    "문해력",
    "학습 배포",
    "AI 교육",
    "초등",
    "학교",
  ],
});

const ClassManagementPricingSectionTitle = (
  <Stack gap={6} align="center" pb={'60px'}>
     <Text
      color="black"
      fontWeight="600"
      fontSize={{ base: "34px", lg: "48px" }}
      lineHeight={{ base: "48px", lg: "60px" }}
    >
      <Box as="span" bgGradient="linear(to-r, #43D1BC, #009B84)" bgClip="text" color="transparent">
        5분
      </Box>
      이면 우리 반 세팅 끝.<br />지금 시작해 보세요!
    </Text>
    <Text fontFamily="body" fontWeight="500" fontSize="18px" lineHeight="28px" color="#1D2939" whiteSpace="pre-line" textAlign="center">
      회원가입 후 클래스를 만들고 학생을 등록하면, 바로 다음 날부터 오늘의 학습이 자동으로 시작돼요.{"\n"}2주 동안 무료로 모든 기능을 체험할 수 있어요.
    </Text>
  </Stack>
);

export default function ClassManagementPage() {
  return (
    <Box bg="white">
      <ClassManagementHeroSection />
      <SolutionsNeedsConcernsSection title={ClassManagementSolutionsNeedsConcernsTitle}  concerns={ClassManagementSolutionsNeedsConcernsConcers} />
      {/* <NeedsConcernsSection title="선생님의 고민" description={`에듀테크를 도입할 때,\n시작하는 것 부터\n막막하지 않으셨나요?`} concerns={CONCERNS} /> */}
      <ClassManagementSolutionSection />
      <ClassManagementKeySolution01Section />
      <ClassManagementKeySolution02Section />
      <ClassManagementKeySolution03Section />
      <ClassManagementKeySolution04Section />
      <ClassManagementSetupFlowSection />
      <PricingSection titleSection={ClassManagementPricingSectionTitle} />
    </Box>
  );
}
