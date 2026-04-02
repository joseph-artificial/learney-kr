import Link from "next/link";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";

export function ClassManagementHeroSection() {
  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      py={{ base: 16, lg: "120px" }}
      px={{ base: 4, lg: 8 }}
      bgImage="url('/images/solutions/class-management/hero-bg.png')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Stack
        maxW="1200px"
        mx="auto"
        minH={{ base: "auto", xl: "560px" }}
        direction={{ base: "column", xl: "row" }}
        justify="space-between"
        align={{ base: "flex-start", xl: "center" }}
        gap={{ base: 10, xl: 6 }}
        position={'relative'}
      >
        <Stack maxW={{ base: "full", xl: "620px" }} gap={{ base: 6, lg: 8 }} zIndex={1}>
          <Box
            w="fit-content"
            px="12px"
            py="4px"
            borderRadius="16px"
            borderWidth="1px"
            borderColor="#00E6C3"
            bg="white"
          >
            <Text color="#0A2926" fontWeight="500" fontSize="14px" lineHeight="20px">
              간편한 클래스 관리
            </Text>
          </Box>

          <Text color="#101828" fontWeight="600" fontSize={{ base: "42px", lg: "48px" }} lineHeight={{ base: "56px", lg: "65px" }}>
            <Box as="span" bgGradient="linear(to-r, #00A894, #00423A)" bgClip="text" color="transparent">
              클래스 만들고, 학생 등록하면 끝.
            </Box>
            <br />
            나머지는 러니가 알아서 해요!
          </Text>

          <Text color="#667085" fontWeight="500" fontSize={{ base: "24px", lg: "24px" }} lineHeight={{ base: "36px", lg: "36px" }} whiteSpace="pre-line">
            {`클래스 생성부터 학생 등록, 학습 시작, 결과 확인까지.\n복잡한 세팅 없이 선생님의 수업 운영을 하나로 관리할 수 있어요.`}
          </Text>

          <Box>
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <Flex
                as="span"
                w="fit-content"
                bg="#0E9384"
                borderWidth="1px"
                borderColor="#0E9384"
                borderRadius="12px"
                px="20px"
                py="12px"
                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                align="center"
                justify="center"
              >
                <Text color="white" fontWeight="600" fontSize="16px" lineHeight="24px">
                  2주 무료체험 시작하기
                </Text>
              </Flex>
            </Link>
          </Box>
        </Stack>

        <Box
          w={{ base: "100%", xl: "791px" }}
          maxW="791px"
          h={{ base: "auto", xl: "593px" }}
          minH={{ base: "220px", lg: "300px", xl: "593px" }}
          alignSelf={{ base: "stretch", xl: "flex-start" }}
          bgImage="url('/images/solutions/class-management/hero-monitor.png')"
          bgSize="contain"
          bgPosition="center"
          bgRepeat="no-repeat"
          flexShrink={0}
          position={'absolute'}
          right={'-15%'}
          bottom={0}
        />
      </Stack>
    </Box>
  );
}
