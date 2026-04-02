
import { OperationSystemDualModeSection } from "@/components/solutions/operationSystem/OperationSystemDualModeSection";
import { OperationSystemHeroSection } from "@/components/solutions/operationSystem/OperationSystemHeroSection";
import { OperationSystemRecommendationSection } from "@/components/solutions/operationSystem/OperationSystemRecommendationSection";
import { OperationSystemScenarioSection } from "@/components/solutions/operationSystem/OperationSystemScenarioSection";
import { SolutionsNeedsConcernsSection } from "@/components/solutions/SolutionsNeedsConcernsSection";

import { createPageMetadata } from "@/lib/seo";
import { Box, Stack, Text } from "@chakra-ui/react";
import { OperationSystemSolutionsNeedsConcernsConcers, OperationSystemSolutionsNeedsConcernsTitle } from "./solutionsNeedsConcerns";
import { PricingSection } from "@/components/landing/PricingSection";

export const metadata = createPageMetadata({
  title: "운영체제",
  description: "러니 운영체제 솔루션을 확인하세요. 콘텐츠 준비 중입니다.",
  path: "/solutions/operation-system",
});

const COperationSystemPricingSectionTitle = (
  <Stack gap={6} align="center" pb={'60px'} textAlign="center">
     <Text
      color="black"
      fontWeight="600"
      fontSize={{ base: "34px", lg: "48px" }}
      lineHeight={{ base: "48px", lg: "60px" }}
    >
      <Box as="span" bgGradient="linear(to-r, #43B9D1, #933CB8)" bgClip="text" color="transparent">
       자동 학습과 맞춤 수업,
      </Box>
      <br />두 가지를 함께 경험해 보세요.
    </Text>
    <Text fontFamily="body" fontWeight="500" fontSize="18px" lineHeight="28px" color="#1D2939" whiteSpace="pre-line" textAlign="center">
      회원가입 후 클래스를 만들고 학생을 등록하면, 바로 다음 날부터 오늘의 학습이 자동으로 시작돼요.{"\n"}2주 동안 무료로 모든 기능을 체험해 보세요.
    </Text>
  </Stack>
);

export default function OperationSystemPage() {
  return (
    <Box bg="white">
      <OperationSystemHeroSection />
      <SolutionsNeedsConcernsSection title={OperationSystemSolutionsNeedsConcernsTitle}  concerns={OperationSystemSolutionsNeedsConcernsConcers} />
      <OperationSystemDualModeSection />
      <OperationSystemScenarioSection />
      <OperationSystemRecommendationSection />
      <PricingSection titleSection={COperationSystemPricingSectionTitle} />
    </Box>
  );
}
