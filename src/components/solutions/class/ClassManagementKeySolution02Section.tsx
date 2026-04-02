import { Box, Flex, Grid, GridItem, Image, Stack, Text } from "@chakra-ui/react";

const FOCUS_STUDENTS = [
  { name: "이민서", score: "36", delta: "-30", recent: "-10", stage: "끊어 읽고 요약하기" },
  { name: "오수민", score: "36", delta: "-30", recent: "-5", stage: "단어 학습" },
  { name: "조민준", score: "42", delta: "-24", recent: "+5", stage: "구조화하기" },
  { name: "한지우", score: "40", delta: "-26", recent: "-15", stage: "문제 풀이" },
];

const CLASS_RESULTS = [
  { name: "김건우", score: "100", delta: "+23.5", recent: "0", stage: "끊어 읽고 요약하기" },
  { name: "김유리", score: "98", delta: "+21.5", recent: "-2", stage: "단어 학습" },
  { name: "박시우", score: "76.5", delta: "0", recent: "+2.5", stage: "문제 풀이" },
  { name: "박지훈", score: "76.5", delta: "0", recent: "+2.5", stage: "문제 풀이" },
  { name: "이강빈", score: "76.5", delta: "0", recent: "+2.5", stage: "문제 풀이" },
];

function TrendLine() {
  return (
    <Flex align="center" gap="4px">
      <Box w="14px" h="2px" bg="#15B79E" />
      <Box w="16px" h="2px" bg="#15B79E" />
      <Box w="14px" h="2px" bg="#15B79E" />
      <Box w="18px" h="2px" bg="#15B79E" />
    </Flex>
  );
}

export function ClassManagementKeySolution02Section() {
  return (
    <Box as="section" bg="white" py={{ base: 16, lg: "60px" }} px={{ base: 4, lg: 8 }}>
      <Stack maxW="1200px" mx="auto" gap={{ base: 8, lg: "40px" }}>
        <Stack gap={{ base: 5, lg: "25px" }} data-aos="fade-up">
          <Flex gap={4} wrap="wrap">
            <Flex h="36px" px="12px" py="6px" borderRadius="40px" bg="#E8F9EB" align="center">
              <Text color="#51A986" fontWeight="600" fontSize="16px" lineHeight="24px">
                솔루션 2
              </Text>
            </Flex>
            <Flex h="36px" px="12px" py="6px" borderRadius="40px" borderWidth="1px" borderColor="#51A986" align="center">
              <Text color="#51A986" fontWeight="600" fontSize="16px" lineHeight="24px">
                학생 관리
              </Text>
            </Flex>
          </Flex>

          <Text color="#1D2939" fontWeight="600" fontSize={{ base: "34px", lg: "48px" }} lineHeight={{ base: "44px", lg: "60px" }}>
            02. 우리 반을 관리하는 방법,{" "}
            <Box as="span" bgGradient="linear(to-r, #65E2B0, #00A98A)" bgClip="text" color="transparent">
              주목할 학생
            </Box>
          </Text>

          <Box borderWidth="2px" borderColor="#EAECF0" borderRadius="20px" px={{ base: 5, lg: "30px" }} py={{ base: 5, lg: "30px" }}>
            <Stack gap={2.5}>
              <Text color="#1D2939" fontWeight="600" fontSize={{ base: "26px", lg: "22px" }} lineHeight={{ base: "36px", lg: "32px" }}>
                누가 어려워하는지 바로 보여요!
              </Text>
              <Text color="#475467" fontWeight="500" fontSize={{ base: "22px", lg: "22px", xl: "22px" }} lineHeight={{ base: "34px", lg: "32px", xl: "32px" }} whiteSpace="pre-line">
                {"학습 결과를 자동으로 정리해, 정오표에서 반 전체 현황을 한눈에 확인할 수 있어요.\n'주목할 학생'으로 지금 케어가 필요한 학생을 빠르게 파악하고, 학습 데이터로 생기부까지 근거 있게 작성해요."}
              </Text>
            </Stack>
          </Box>
        </Stack>

        <Grid templateColumns={{ base: "1fr", xl: "repeat(2, minmax(0, 1fr))" }} gap={4}>
          <GridItem data-aos="fade-right" data-aos-delay="60">
            <Box bg="#F9FAFB" borderWidth="1px" borderColor="#EAECF0" borderRadius="20px" width={'100%'} height={'431px'} pt={'100px'} overflow={'hidden'} position={'relative'}>
              <Image src="/images/solutions/class-management/ClassManagementKeySolution02Section1.svg" alt="focus-students" w={'100%'} h={'100%'} objectFit="contain" position={'absolute'} bottom={'-30px'} loading="lazy" />
            </Box>
          </GridItem>
          <GridItem data-aos="fade-left" data-aos-delay="120">
            <Box bg="#F9FAFB" borderWidth="1px" borderColor="#EAECF0" borderRadius="20px" width={'100%'} height={'431px'} pt={'100px'} overflow={'hidden'} position={'relative'}>
              <Image src="/images/solutions/class-management/ClassManagementKeySolution02Section2.svg" alt="focus-students" w={'100%'} h={'100%'} objectFit="contain" position={'absolute'} bottom={'-30px'} loading="lazy" />
            </Box>
          </GridItem>
        </Grid>
      </Stack>
    </Box>
  );
}



