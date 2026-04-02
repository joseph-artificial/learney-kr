import { Box, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";

type SolutionCard = {
  iconSrc: string;
  title: string;
  body: string;
  iconWidth: {base: string, lg: string};
  iconHeight: {base: string, lg: string};
};

const SOLUTIONS: SolutionCard[] = [
  {
    iconSrc: "/images/solutions/class-management/Solution1min.png",
    title: "1분만에 학생 등록",
    body: "엑셀을 이용해\n한번에 학생 계정을 생성하고\n바로 학습을 시작해보세요.",
    iconWidth: {base: "33.33px", lg: "33.33px"},
    iconHeight: {base: "40px", lg: "40px"},
  },
  {
    iconSrc: "/images/solutions/class-management/SolutionAuto.png",
    title: "등록하면 학습이 자동으로",
    body: "학생을 클래스에 등록하는 순간\n오늘의 학습이 시작돼요.\n매일 학습을 배정할 필요가 없어요.",
    iconWidth: {base: "26.67px", lg: "26.67px"},
    iconHeight: {base: "40px", lg: "40px"},
  },
  {
    iconSrc: "/images/solutions/class-management/SolutionTable.png",
    title: "놓치는 학생 없이, 한눈에",
    body: "성적이 떨어진 학생,\n학습을 안 한 학생이 자동으로 표시되어\n바로 확인할 수 있어요.",
    iconWidth: {base: "40px", lg: "40px"},
    iconHeight: {base: "33.33px", lg: "33.33px"},

  },
  {
    iconSrc: "/images/solutions/class-management/SolutionSearch.png",
    title: "간편하게 필요한 학습 탐색",
    body: "내가 쓰는 교과서와 매칭되거나\n특정 소재의 학습을 간편하게 검색해\n바로 찾을 수 있어요.",
    iconWidth: {base: "31.11px", lg: "31.11px"},
    iconHeight: {base: "40px", lg: "40px"},
  },
];

function SolutionCardItem({ iconSrc, title, body, iconWidth, iconHeight }: SolutionCard) {
  return (
    <Flex
      bg="white"
      borderRadius="16px"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.05)"
      p="30px"
      h={{ base: "auto", lg: "343px" }}
      minH={{ base: "280px", lg: "343px" }}
      direction="column"
      justify="space-between"
    >
      <Flex justify="center" align="center" bg={'#E5F9F2'} borderRadius="16px" width={'80px'} height={'80px'}>
        <Box as="img" src={iconSrc} alt="" w={iconWidth} h={iconHeight} objectFit="contain" />
      </Flex>
      
      <Stack gap={3} w="full">
        <Text color="#1D2939" fontWeight="700" fontSize={{ base: "28px", lg: "38px", xl: "24px" }} lineHeight={{ base: "42px", lg: "46px", xl: "34.28px" }}>
          {title}
        </Text>
        <Text color="#475467" fontWeight="500" fontSize={{ base: "24px", lg: "32px", xl: "22px" }} lineHeight={{ base: "38px", lg: "42px", xl: "32px" }} whiteSpace="pre-line">
          {body}
        </Text>
      </Stack>
    </Flex>
  );
}

export function ClassManagementSolutionSection() {
  return (
    <Box as="section" bg="#F6FEF9" py={{ base: 20, lg: "120px" }}>
      <Flex
        maxW="1200px"
        mx="auto"
        direction={{ base: "column", xl: "row" }}
        align={{ base: "stretch", xl: "flex-start" }}
        gap={{ base: 10, xl: "60px" }}
      >
        <Stack
          gap={5}
          w={{ base: "full", xl: "371px" }}
          flexShrink={0}
          justifyContent={'center'}
          h={'100%'}
          my={'auto'}
          data-aos="fade-right"
        >
          <Box px="12px" py="6px" bg="#E8F9EB" borderRadius="40px" w="fit-content">
            <Text color="#1D2939" fontWeight="600" fontSize="16px" lineHeight="24px">
              러니의 솔루션
            </Text>
          </Box>
          <Text color="black" fontWeight="600" fontSize={{ base: "54px", lg: "62px", xl: "48px" }} lineHeight={{ base: "70px", lg: "80px", xl: "65px" }} whiteSpace="pre-line">
            {"러니의\n클래스 관리,\n이런 점이 달라요."}
          </Text>
        </Stack>

        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(2, minmax(0, 1fr))" }}
          gap={8}
          w="full"
          maxW={{ base: "full", xl: "820px" }}
          data-aos="fade-left"
          data-aos-delay="80"
        >
          <GridItem>
            <SolutionCardItem {...SOLUTIONS[0]} />
          </GridItem>
          <GridItem mt={{ base: 0, lg: "86px" }}>
            <SolutionCardItem {...SOLUTIONS[1]} />
          </GridItem>
          <GridItem mt={{ base: 0, lg: "-60px" }}>
            <SolutionCardItem {...SOLUTIONS[2]} />
          </GridItem>
          <GridItem mt={{ base: 0, lg: "24px" }}>
            <SolutionCardItem {...SOLUTIONS[3]} />
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  );
}
