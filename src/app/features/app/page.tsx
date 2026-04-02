import { Metadata } from "next";
import { Box, Stack, Text } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "주요 기능 (학생용 앱) | 러니",
  description: "러니 학생용 앱 주요 기능 (임시 페이지).",
};

export default function FeaturesAppPage() {
  return (
    <Box bg="white" minH="60vh" px={{ base: 4, lg: 6 }} py={{ base: 16, lg: 24 }}>
      <Stack maxW="720px" mx="auto" gap={4} textAlign="center">
        <Text fontSize="sm" color="gray.500">
          임시 페이지
        </Text>
        <Text fontFamily="heading" fontWeight="700" fontSize={{ base: "28px", lg: "36px" }} color="gray.900">
          학생용 앱 · 주요 기능
        </Text>
        <Text fontSize="md" color="gray.600">
          콘텐츠 준비 중입니다.
        </Text>
      </Stack>
    </Box>
  );
}
