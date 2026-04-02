import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export function InstitutionHeroCTASection() {
  return (
    <Box
      as="section"
      py={{ base: 16, lg: "120px" }}
      px={{ base: 4, lg: 8 }}
      bgImage="url('/images/apply-target/institution/hero-cta-bg.png')"
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Stack maxW="1200px" mx="auto" gap={{ base: 8, lg: 10 }} align="center">
        <Stack gap={5} align="center" textAlign="center">
          <Box
            px={3}
            py={1}
            borderRadius="16px"
            bg="white"
            borderWidth="1px"
            borderColor="#00E6C3"
          >
            <Text color="#0A2926" fontWeight="500" fontSize="14px" lineHeight="20px">
              학교 도입 맞춤
            </Text>
          </Box>
          <Text
            color="black"
            fontWeight="600"
            fontSize={{ base: "36px", lg: "48px" }}
            lineHeight={{ base: "48px", lg: "65px" }}
            whiteSpace="pre-line"
          >
            <Box as="span" bgGradient="linear(to-r, #00A894, #00423A)" bgClip="text">
              교과 연계 학습
            </Box>
            {"부터 "}
            <Box as="span" bgGradient="linear(to-r, #00A894, #00423A)" bgClip="text">
              독서·문해력
            </Box>
            {`까지,\n러니 하나로 지원하세요.`}
          </Text>
          <Text
            color="#667085"
            fontWeight="400"
            fontSize={{ base: "20px", lg: "24px" }}
            lineHeight={{ base: "30px", lg: "36px" }}
            textAlign="center"
            whiteSpace="pre-line"
          >
            {"성취 기준 기반 콘텐츠, 설치 없이 사용하는 웹 환경, 운영 관리까지 한 번에.\n4개 교육청에 공급한 팀이 만든 검증된 서비스입니다."}
          </Text>
        </Stack>
        <Flex gap={3} wrap="wrap" justify="center">
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <Box
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={5}
              py={3}
              borderRadius="12px"
              bg="white"
              borderWidth="1px"
              borderColor="#D0D5DD"
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              _hover={{ bg: "gray.50" }}
            >
              <Text color="#344054" fontWeight="600" fontSize="16px" lineHeight="24px">
                서비스 소개서 받기
              </Text>
            </Box>
          </Link>
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <Box
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={5}
              py={3}
              borderRadius="12px"
              bg="#0E9384"
              borderWidth="1px"
              borderColor="#0E9384"
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              _hover={{ bg: "#0D8578" }}
            >
              <Text color="white" fontWeight="600" fontSize="16px" lineHeight="24px">
                1:1 미팅하기
              </Text>
            </Box>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
}