import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";

export function ClassManagementKeySolution04Section() {
  return (
    <Box as="section" bg="#FCFCFD" py={{ base: 16, lg: "120px" }} px={{ base: 4, lg: 8 }}>
      <Stack maxW="1200px" mx="auto" gap={{ base: 8, lg: "40px" }}>
        <Stack gap={{ base: 5, lg: "25px" }} data-aos="fade-up">
          <Flex gap={4} wrap="wrap">
            <Flex h="36px" px="12px" py="6px" borderRadius="40px" bg="#E8F9EB" align="center">
              <Text color="#51A986" fontWeight="600" fontSize="16px" lineHeight="24px">
                솔루션 4
              </Text>
            </Flex>
            <Flex h="36px" px="12px" py="6px" borderRadius="40px" borderWidth="1px" borderColor="#51A986" align="center">
              <Text color="#51A986" fontWeight="600" fontSize="16px" lineHeight="24px">
                학습 탐색
              </Text>
            </Flex>
          </Flex>

          <Text color="#1D2939" fontWeight="600" fontSize={{ base: "34px", lg: "48px" }} lineHeight={{ base: "44px", lg: "60px" }}>
            04. 상황에 맞는 학습을 한 번에,{" "}
            <Box as="span" bgGradient="linear(to-r, #65E2B0, #00A98A)" bgClip="text" color="transparent">
              학습 탐색
            </Box>
          </Text>

          <Box borderWidth="2px" borderColor="#EAECF0" borderRadius="20px" px={{ base: 5, lg: "30px" }} py={{ base: 5, lg: "30px" }}>
            <Stack gap={2.5}>
              <Text color="#1D2939" fontWeight="600" fontSize={{ base: "26px", lg: "22px" }} lineHeight={{ base: "36px", lg: "32px" }}>
                원하는 학습을 바로바로 찾아 적용해요!
              </Text>
              <Text color="#475467" fontWeight="500" fontSize={{ base: "22px", lg: "22px", xl: "22px" }} lineHeight={{ base: "34px", lg: "32px", xl: "32px" }} whiteSpace="pre-line">
                {"수업 중 남는 시간에도, 교과서·단원 기반으로 맞는 학습을 바로 찾아 활용할 수 있어요.\n소재·시간 기준으로도 쉽게 선택할 수 있어, 짧은 10분도 알찬 학습 시간으로 만들 수 있어요."}
              </Text>
            </Stack>
          </Box>
        </Stack>

        <Box
          bg="#F9FAFB"
          borderWidth="1px"
          borderColor="#EAECF0"
          borderRadius="20px"
          h={{ base: "320px", lg: "480px" }}
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          overflow="hidden"
          pt={'10px'}
          data-aos="fade-up"
          data-aos-delay="80"
        >
          <Image src="/images/solutions/class-management/ClassManagementKeySolution04Section.svg" alt="explore-ui" w={'100%'} h={'100%'} objectFit="contain" />
         
        </Box>
      </Stack>
    </Box>
  );
}



