import { Box, Stack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

const GREEN_GRADIENT = "linear-gradient(90deg, #65e2b0 0%, #00a98a 100%)";

function GradientGreen({ children }: { children: ReactNode }) {
  return (
    <Text
      as="span"
      sx={{
        backgroundImage: GREEN_GRADIENT,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </Text>
  );
}

export function LearningContentBasicIntroSection() {
  return (
    <Box bg="#fcfcfd" pt={{ base: 16, lg: "120px" }} pb={{ base: 8, lg: "40px" }} px={{ base: 6, lg: 10, xl: "120px" }}>
      <Stack maxW="1200px" mx="auto" gap="30px" align="center" data-aos="fade-up">
        <Box
          border="1.134px solid"
          borderColor="#51a986"
          px="13.608px"
          py="6.804px"
          borderRadius="45.361px"
        >
          <Text fontWeight="600" fontSize="18.144px" lineHeight="27.216px" color="#51a986" whiteSpace="nowrap">
            문해력 학습
          </Text>
        </Box>
        <Text
          as="h2"
          textAlign="center"
          fontWeight="600"
          fontSize={{ base: "36px", lg: "48px" }}
          lineHeight={{ base: "48px", lg: "60px" }}
          color="#1d2939"
          whiteSpace={{ base: "normal", lg: "nowrap" }}
        >
          <GradientGreen>읽고, 쓰고, 듣고 말하는 힘</GradientGreen>을 매일 키워요
        </Text>
        <Text
          textAlign="center"
          fontWeight="500"
          fontSize={{ base: "18px", lg: "20px" }}
          lineHeight="26px"
          color="#667085"
          whiteSpace="pre-line"
        >
          문해력은 읽기·쓰기·듣기·말하기가 함께 연결되어야 완성됩니다.
          {"\n"}
          러니는 이를 하나의 루틴으로 묶어, 매일 10분씩 부담 없이 꾸준히 이어갈 수 있도록 설계했어요.
        </Text>
      </Stack>
    </Box>
  );
}
