import Link from "next/link";
import { PRICING_QUOTE_FORM_HREF } from "@/config/site";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";

type StepItem = {
  step: number;
  title: string;
  duration?: string;
  description: string;
};

const STEPS: StepItem[] = [
  {
    step: 1,
    title: "클래스 만들기",
    duration: "1분 소요",
    description: "학생 정보 (학년, 반, 이름)를 입력하고 교과서를 선택해 클래스를 만들어요.",
  },
  {
    step: 2,
    title: "학생 등록하기",
    duration: "3분 소요",
    description: "엑셀로 학생 명단을 등록하고, 자동으로 생성된 계정을 학생에게 공지해요.",
  },
  {
    step: 3,
    title: "오늘의 학습 방식 선택하기",
    duration: "1분 소요",
    description: "반 전체에게 배포하는 [공통학습], 학생별로 배포하는 [맞춤학습] 중 선택해 자동으로 제공해요.",
  },
  {
    step: 4,
    title: "그 다음은 러니가 알아서 할게요!",
    description:
      "학생은 매일 접속해서 학습하고, 선생님은 리포트에서 학습 결과를 확인해요.\n필요하면 탐색하기에서 추가 학습을 찾아 클래스에 바로 적용할 수 있어요.",
  },
];

function StepRow({ item, isLast }: { item: StepItem; isLast: boolean }) {
  return (
    <Flex gap={{ base: 4, lg: "34px" }} align="flex-start">
      <Flex direction="column" align="center" w="50px" position="relative" flexShrink={0}>
        {!isLast ? <Box position="absolute" top="41px" w="8px" h="100px" borderRadius="10px" bgGradient="linear(to-b, #9EE7C0 0%, rgba(158,231,192,0) 100%)" /> : null}
        <Flex w="50px" h="50px" borderRadius="30px" bg="#9EE7C0" align="center" justify="center">
          <Text color="white" fontWeight="600" fontSize="32px" lineHeight="30px">
            {item.step}
          </Text>
        </Flex>
      </Flex>

      <Stack w="full" maxW="873px" gap={5}>
        <Flex gap={2.5} align="center" wrap="wrap">
          <Text color="#1D2939" fontWeight="600" fontSize={{ base: "28px", lg: "44px", xl: "43px" }} lineHeight={{ base: "42px", lg: "64px", xl: "48px" }}>
            {item.title}
          </Text>
          {item.duration ? (
            <Box bg="#DDF2E5" borderWidth="1px" borderColor="#B1E7CB" px={3} py={1.5} borderRadius="40px">
              <Text color="#344054" fontWeight="600" fontSize="16px" lineHeight="24px">
                {item.duration}
              </Text>
            </Box>
          ) : null}
        </Flex>
        <Box bg="#FCFCFD" borderWidth="1px" borderColor="#EAECF0" borderRadius="10px" px={5} py={5}>
          <Text color="#667085" fontWeight="500" fontSize={{ base: "22px", lg: "32px", xl: "22px" }} lineHeight={{ base: "34px", lg: "42px", xl: "30px" }} whiteSpace="pre-line">
            {item.description}
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
}

export function ClassManagementSetupFlowSection() {
  return (
    <Box
      bgGradient="linear(to-b, white, #DDF2E5)"
      py={{ base: 20, lg: "120px" }}
      px={{ base: 4, lg: 8 }}
      data-aos="fade-up"
      data-aos-delay="0"
      data-aos-duration="900"
      data-aos-offset="120"
      data-aos-anchor-placement="top-bottom"
      data-aos-once="true"
      data-aos-easing="ease-out-cubic"
    >
      <Stack maxW="1200px" mx="auto" gap={{ base: 10, lg: "60px" }} align="center">
        <Stack
          gap={5}
          align="center"
          data-aos="fade-up"
          data-aos-delay="0"
          data-aos-duration="900"
          data-aos-offset="120"
          data-aos-anchor-placement="top-bottom"
          data-aos-once="true"
          data-aos-easing="ease-out-cubic"
        >
          <Flex h="36px" px="14px" py="2px" borderRadius="30px" borderWidth="1px" borderColor="#51A986" align="center" justify="center">
            <Text color="#51A986" fontWeight="600" fontSize="16px" lineHeight="24px">
              도입 과정
            </Text>
          </Flex>
          <Text color="#0C111D" fontWeight="600" fontSize={{ base: "34px", lg: "48px" }} lineHeight={{ base: "44px", lg: "60px" }} textAlign="center">
            처음 한 번만 세팅하면,{" "}
            <Box as="span" bgGradient="linear(to-r, #65E2B0, #00A98A)" bgClip="text" color="transparent">
              한 학기가 편해져요!
            </Box>
          </Text>
        </Stack>

        <Stack w={{ base: "100%", xl: "957px" }} gap={{ base: 6, lg: "30px" }}>
          {STEPS.map((item, idx) => (
            <Box
              key={item.step}
              data-aos="fade-up"
              data-aos-delay="0"
              data-aos-duration="900"
              data-aos-offset={120 + idx * 70}
              data-aos-anchor-placement="top-bottom"
              data-aos-once="true"
              data-aos-easing="ease-out-cubic"
            >
              <StepRow item={item} isLast={idx === STEPS.length - 1} />
            </Box>
          ))}
        </Stack>

        <Box
          data-aos="fade-up"
          data-aos-delay="80"
          data-aos-duration="900"
          data-aos-offset="180"
          data-aos-anchor-placement="top-bottom"
          data-aos-once="true"
        >
          <Link href={PRICING_QUOTE_FORM_HREF} style={{ textDecoration: "none" }}>
            <Flex
              bg="white"
              borderWidth="1px"
              borderColor="#D0D5DD"
              borderRadius="12px"
              px="28px"
              py="16px"
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0px 0px 30px 0px rgba(0, 0, 0, 0.1)"
              align="center"
              justify="center"
            >
              <Text color="#344054" fontWeight="600" fontSize="18px" lineHeight="28px">
                견적서 신청하기
              </Text>
            </Flex>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
}
