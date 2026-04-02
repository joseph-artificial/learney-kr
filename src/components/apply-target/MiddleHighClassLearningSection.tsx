import { Box, Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ScrollDownAnimation } from "../ScrollDownAnimation";

type MiddleHighCard = {
  title: string;
  body: string;
  fullWidth?: boolean;
};

const CARDS: MiddleHighCard[] = [
  {
    title: "내가 쓰는 교과서에 맞는 콘텐츠",
    body: "2022 개정 교육과정 성취 기준 기반으로 제작된 학습이 선생님의 교과서별로 정리되어 있어요.\n동아, 미래엔, 비상, 천재 등 주요 교과서에 맞춰 바로 적용할 수 있어요",
    fullWidth: true,
  },
  {
    title: "클릭 몇 번이면 수업 준비 끝",
    body: "교과서를 선택하면 복잡한 설정 없이\n수업 흐름 그대로 사용할 수 있어요.",
  },
  {
    title: "교과서 보충부터 성취 기준 달성까지",
    body: "교과서 내용을 보충하는 '교과서 학습'과,\n성취 기준을 달성하는 '교과 연계 학습'이 제공돼요.",
  },
];

function MiddleHighSolutionCard({ title, body }: MiddleHighCard) {
  return (
    <Box
      bg="white"
      borderRadius="16px"
      px="30px"
      py="30px"
      boxShadow="0px 0px 20px 0px rgba(0,0,0,0.05)"
      minH={{ base: "auto", lg: "156px" }}
    >
      <Stack gap="12px">
        <Text color="#1D2939" fontWeight="700" fontSize={{base: '20px', lg: '24px'}} lineHeight={{base: '30px', lg: '34.282px'}}>
          {title}
        </Text>
        <Text color="#475467" fontWeight="500" fontSize={{base: '16px', lg: '24px'}} lineHeight={{base: '24px', lg: '34px'}} whiteSpace="pre-line">
          {body}
        </Text>
      </Stack>
    </Box>
  );
}

export function MiddleHighClassLearningSection({ targetClassName }: { targetClassName?: string }) {
  return (
    <Box
      position="relative"
      overflow="hidden"
      pt={{ base: '50px', lg: "120px" }}
      pb={{ base: 10, lg: "60px" }}
      px={{ base: 4, lg: "120px" }}
      bgImage="url('/images/apply-target/middle-class-learning/class-learrning-bgGradient.png')"
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Box
        position="absolute"
        inset={0}
        opacity={0.4}
        pointerEvents="none"
        bgGradient="radial(circle at 85% 90%, #FFFFFF 0%, rgba(255,255,255,0) 48%)"
      />

      <Stack position="relative" maxW="1200px" mx="auto" gap={{ base: 10, lg: "60px" }} align="center">
        <Stack gap={{base: '10px', lg: '20px'}} align={{ base: "stretch", lg: "center" }} width={'100%'} data-aos="fade-up">
          <Box px={{base: '10px', lg: '14px'}} py={{base: '2px', lg: '2px'}} h={{base: '30px', lg: '51px'}} bg="#E8F4F5" borderRadius="30px" w="fit-content" alignSelf={{ base: "center", lg: "flex-start" }}>
            <Flex h="full" align="center" justify="center">
              <Text color={{base: '#136F64', lg: "#1D2939"}} fontWeight="600" fontSize={{base: '16px', lg: '22px'}} lineHeight={{base: '24px', lg: '34.282px'}}>
                러니의 솔루션
              </Text>
            </Flex>
          </Box>
          <Text color="black" fontWeight="600" fontSize={{ base: "24px", lg: "48px" }} lineHeight={{ base: "34px", lg: "60px" }} whiteSpace="pre-line" width={'100%'} textAlign={{base: 'center', lg: 'left'}}>
            {"러니의 "}
            <Box as="span" bgGradient="linear(to-r, #43D1BC 0%, #009B84 100%)" bgClip="text" color="transparent">
              중·고등학교 맞춤형
            </Box>
            <Box as="br" display={{base: 'block', lg: 'none'}} />
            {" 클래스 학습,"}<Box as="br" display={{base: 'none', lg: 'block'}} />{"이런 점이 달라요."}
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, xl: 2 }} spacing="24px" w="full" data-aos="fade-up" data-aos-delay="80">
          <Box gridColumn={{ base: "auto", xl: "1 / -1" }}>
            <MiddleHighSolutionCard {...CARDS[0]} />
          </Box>
          <MiddleHighSolutionCard {...CARDS[1]} />
          <MiddleHighSolutionCard {...CARDS[2]} />
        </SimpleGrid>

        <Flex justify="center" align="center" w="full" data-aos="fade-up" data-aos-delay="120">
          <ScrollDownAnimation targetClassName={targetClassName} />
        </Flex>
      </Stack>
    </Box>
  );
}
