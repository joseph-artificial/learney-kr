import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import type { ReactNode } from "react";

const S = "/images/solutions/operation-system/scenario";

type Scenario = {
  border: string;
  icon: string;
  title: ReactNode;
  desc: string;
};

const SCENARIOS: Scenario[] = [
  {
    border: "#d8ddff",
    icon: "icon-1.png",
    title: (
      <>
        <Text as="span" fontWeight="700" fontSize="24px" lineHeight="34px" color="#1d2939">
          아침 자습 시간
        </Text>
        <Text as="span" fontSize="24px" lineHeight="34px" color="#1d2939">
          에는?{"\n"}
        </Text>
        <Text as="span" fontWeight="700" fontSize="24px" lineHeight="34px" color="#1d2939">
          오늘의 학습
        </Text>
        <Text as="span" fontSize="24px" lineHeight="34px" color="#1d2939">
          을 사용해요
        </Text>
      </>
    ),
    desc: "별도의 준비 없이\n매일 자동으로 학습 제공",
  },
  {
    border: "#e5d8ff",
    icon: "icon-2.png",
    title: (
      <>
        <Text as="span" fontWeight="700" fontSize="24px" lineHeight="34px" color="#1d2939">
          국어 수업 시간
        </Text>
        <Text as="span" fontSize="24px" lineHeight="34px" color="#1d2939">
          에는?{"\n"}
        </Text>
        <Text as="span" fontWeight="700" fontSize="24px" lineHeight="34px" color="#1d2939">
          클래스 학습
        </Text>
        <Text as="span" fontSize="24px" lineHeight="34px" color="#1d2939">
          을 사용해요
        </Text>
      </>
    ),
    desc: "교과서 진도에 맞는\n학습 탐색 후 배포",
  },
  {
    border: "#e5d8ff",
    icon: "icon-3.png",
    title: (
      <>
        <Text as="span" fontWeight="700" fontSize="24px" lineHeight="34px" color="#1d2939">
          과제
        </Text>
        <Text as="span" fontSize="24px" lineHeight="34px" color="#1d2939">
          가 필요한 때에는?{"\n"}
        </Text>
        <Text as="span" fontWeight="700" fontSize="24px" lineHeight="34px" color="#1d2939">
          클래스 학습
        </Text>
        <Text as="span" fontSize="24px" lineHeight="34px" color="#1d2939">
          을 사용해요
        </Text>
      </>
    ),
    desc: "반 전체에\n동일한 학습 배정",
  },
  {
    border: "#d8ddff",
    icon: "icon-4.png",
    title: (
      <>
        <Text as="span" fontWeight="700" fontSize="24px" lineHeight="34px" color="#1d2939">
          개인 보충 학습
        </Text>
        <Text as="span" fontSize="24px" lineHeight="34px" color="#1d2939">
          에는?{"\n"}
        </Text>
        <Text as="span" fontWeight="700" fontSize="24px" lineHeight="34px" color="#1d2939">
          오늘의 학습
        </Text>
        <Text as="span" fontSize="24px" lineHeight="34px" color="#1d2939">
          을 사용해요
        </Text>
      </>
    ),
    desc: "학생별 수준에 맞는\n학습 자동 추천",
  },
  {
    border: "#e5d8ff",
    icon: "icon-1.png",
    title: (
      <>
        <Text as="span" fontWeight="700" fontSize="24px" lineHeight="34px" color="#1d2939">
          남는 수업 시간
        </Text>
        <Text as="span" fontSize="24px" lineHeight="34px" color="#1d2939">
          에는?{"\n"}
        </Text>
        <Text as="span" fontWeight="700" fontSize="24px" lineHeight="34px" color="#1d2939">
          클래스 학습
        </Text>
        <Text as="span" fontSize="24px" lineHeight="34px" color="#1d2939">
          을 사용해요
        </Text>
      </>
    ),
    desc: "짧은 학습을\n바로 검색해서 배포",
  },
];

function ScenarioCard({ item }: { item: Scenario }) {
  return (
    <Box
      bg="white"
      border="2px solid"
      borderColor={item.border}
      borderRadius="20px"
      p="40px"
      w={{ base: "full", sm: "344px" }}
      maxW="344px"
      minH="360px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      boxShadow="0px 0px 10px 0px rgba(0,0,0,0.05)"
      data-aos="fade-up"
    >
      <Flex w="92px" h="92px" bg="#f9fafb" borderRadius="46px" p={2} align="flex-start" justify="center">
        <Box position="relative" w="75px" h="75px" flexShrink={0}>
          <Image src={`${S}/${item.icon}`} alt="" fill style={{ objectFit: "contain" }} sizes="75px" />
        </Box>
      </Flex>
      <Stack spacing="10px" align="flex-start" mt={6}>
        <Box lineHeight="34px">{item.title}</Box>
        <Text fontWeight="500" fontSize="22px" lineHeight="26px" color="#667085" whiteSpace="pre-line">
          {item.desc}
        </Text>
      </Stack>
    </Box>
  );
}

export function OperationSystemScenarioSection() {
  const top = SCENARIOS.slice(0, 3);
  const bottom = SCENARIOS.slice(3);

  return (
    <Box bg="#f7f4ff" py={{ base: 16, lg: "120px" }} px={{ base: 6, lg: 10, xl: "120px" }}>
      <Stack maxW="1200px" mx="auto" spacing={{ base: 10, lg: "60px" }} align="center">
        <Stack spacing="20px" align="center" data-aos="fade-up">
          <Text as="h2" fontWeight="600" fontSize={{ base: "32px", lg: "48px" }} lineHeight={{ base: "42px", lg: "60px" }} color="black" textAlign="center">
            상황에 따라 이렇게 활용하세요
          </Text>
          <Text fontWeight="500" fontSize={{ base: "18px", lg: "22px" }} lineHeight="26px" color="#667085" textAlign="center">
            상황에 따라 두 방식을 조합하면, 수업 전·중·후 어디에서든 학습이 끊기지 않아요.
          </Text>
        </Stack>

        <Stack spacing="21px" w="full" align="center"  py={2} data-aos="fade-up" data-aos-delay="60">
          <Flex wrap="wrap" gap="24px" justify="center" w="full">
            {top.map((item, i) => (
              <ScenarioCard key={i} item={item} />
            ))}
          </Flex>
          <Flex wrap="wrap" gap="24px" justify="center" w="full">
            {bottom.map((item, i) => (
              <ScenarioCard key={i + 3} item={item} />
            ))}
          </Flex>
        </Stack>
      </Stack>
    </Box>
  );
}
