import { ScrollDownAnimation } from "@/components/ScrollDownAnimation";
import { Box, Flex, Grid, GridItem, Image, Stack, Text } from "@chakra-ui/react";

type SolutionCard = { title: string; body: string; icon: string };

const WHY_CARDS: SolutionCard[] = [
  {
    title: "문해력 보장",
    body: "매일 10분,\n독서와 기초학력 루틴으로\n균형있게 훈련해요.",
    icon: "/images/apply-target/institution/WhyChooseBook.png",
  },
  {
    title: "교과 수업 지원",
    body: "22 개정 교육과정 국어과 성취 기준을 단위로\n콘텐츠가 구조화되어 있어\n정규 수업에 바로 적용할 수 있어요.",
    icon: "/images/apply-target/institution/WhyChooseInfo.png",
  },
  {
    title: "학교 인프라 그대로, 별도 설치 없이",
    body: "앱 설치나 프로그램 배포 없이,\n브라우저만 있으면 돼요.",
    icon: "/images/apply-target/institution/WhyChooseDevies.png",
  },
  {
    title: "이미 검증된 도입·운영 경험",
    body: "4개 시·도 교육청에 공급하며 축적한\n운영 노하우가 러니에 반영되어 있어요.",
    icon: "/images/apply-target/institution/WhyChooseCheck.png",
  },
];

function SolutionCardItem({ title, body, icon }: SolutionCard) {
  return (
    <Box
      bg="white"
      borderRadius="16px"
      p={{ base: 6, lg: "30px" }}
      boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.05)"
      h="full"
    >
      <Flex direction="column" gap={5} align="flex-end" justify="space-between" minH={{ base: "auto", lg: "280px" }}>
        <Stack gap={3} align="flex-start" w="full">
          <Text
            color="#1D2939"
            fontWeight="700"
            fontSize={{ base: "30px", lg: "24px" }}
            lineHeight={{ base: "38px", lg: "43.28px" }}
            wordBreak="keep-all"
          >
            {title}
          </Text>
          <Text
            color="#475467"
            fontWeight="500"
            fontSize={{ base: "24px", lg: "24px" }}
            lineHeight={{ base: "34px", lg: "34px" }}
            whiteSpace="pre-line"
          >
            {body}
          </Text>
        </Stack>
        <Flex w="100px" h="100px" justify="center" align="center" bg="#F0F5FF" borderRadius="50%">
          <Image src={icon} alt="" w="46px" h="46px" objectFit="contain" flexShrink={0} />
        </Flex>
      </Flex>
    </Box>
  );
}

export function InstitutionWhyChooseSection({ targetClassName }: { targetClassName?: string }) {
  return (
    <Box as="section" bg="#F6FBFF" pt={{ base: 16, lg: "120px" }} pb={{ base: 10, lg: "60px" }} px={{ base: 4, lg: 8 }}>
      <Stack maxW="1200px" mx="auto" gap={{ base: 10, lg: "60px" }}>
        <Stack gap={5} data-aos="fade-up">
          <Box px="16px" py="8px" bg="#EAECF0" borderRadius="40px" w="fit-content">
            <Text color="#1D2939" fontWeight="600" fontSize={{ base: "18px", lg: "22px" }} lineHeight={{ base: "28px", lg: "34px" }}>
              러니의 솔루션
            </Text>
          </Box>
          <Text color="black" fontWeight="600" fontSize={{ base: "36px", lg: "48px" }} lineHeight={{ base: "48px", lg: "60px" }}>
            교육청과 학교가 러니를 선택하는 이유
          </Text>
        </Stack>

        <Stack gap={5} data-aos="fade-up" data-aos-delay="80">
          <Grid
            templateColumns={{ base: "1fr", xl: "minmax(0,400px) minmax(0,1fr)" }}
            gap={5}
          >
            <GridItem>
              <SolutionCardItem {...WHY_CARDS[0]} />
            </GridItem>
            <GridItem>
              <SolutionCardItem {...WHY_CARDS[1]} />
            </GridItem>
          </Grid>
          <Grid
            templateColumns={{ base: "1fr", xl: "minmax(0,1fr) minmax(0,500px)" }}
            gap={5}
          >
            <GridItem>
              <SolutionCardItem {...WHY_CARDS[2]} />
            </GridItem>
            <GridItem>
              <SolutionCardItem {...WHY_CARDS[3]} />
            </GridItem>
          </Grid>
        </Stack>
        <Flex justify="center" align="center" w="full" data-aos="fade-up" data-aos-delay="120">
          <ScrollDownAnimation targetClassName={targetClassName} />
        </Flex>
      </Stack>
    </Box>
  );
}