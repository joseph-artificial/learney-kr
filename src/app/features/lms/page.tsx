import { createPageMetadata } from "@/lib/seo";
import { Box, Text } from "@chakra-ui/react";
import { FeaturesSection } from "@/components/landing/FeaturesSection";

export const metadata = createPageMetadata({
  title: "주요 기능 (선생님용 LMS)",
  description:
    "러니 선생님용 LMS의 주요 기능을 확인하세요. 클래스 관리, 학습 배포, 학생 맞춤 문해력 솔루션.",
  path: "/features/lms",
});

export default function FeaturesLmsPage() {
  return (
    <Box bg="white">
      <Box px={{ base: 4, lg: 6 }} py={4} borderBottomWidth="1px" borderColor="gray.200">
        <Text fontSize="sm" color="gray.500">
          임시: 선생님용 LMS
        </Text>
      </Box>
      <FeaturesSection />
    </Box>
  );
}
