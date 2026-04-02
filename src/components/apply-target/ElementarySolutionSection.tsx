import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { ScrollDownAnimation } from "../ScrollDownAnimation";

type SolutionCard = {
  title: string;
  body: string;
  iconSrc: string;
  wide?: boolean;
};

const SOLUTIONS: SolutionCard[] = [
  {
    title: "매일 자동으로 준비되는 학습",
    body: "선생님이 한 번만 클래스를 세팅하면,\nAI가 학생별 수준에 맞는 학습을 자동으로 추천해요.",
    iconSrc: "/images/apply-target/elementary-solution/icon-auto-learning.png",
  },
  {
    title: "읽기, 쓰기, 듣기·말하기, 한 곳에서 다",
    body: "읽기, 쓰기, 듣기·말하기 학습을 매일 제공해\n종합적으로 문해력을 키워줘요.",
    iconSrc: "/images/apply-target/elementary-solution/icon-book.png",
  },
  {
    title: "아이들이 스스로 재밌게 해요",
    body: 'AI 튜터 아티쌤이 대화로 학습을 이끌어줘서, 혼자 하는 문제 풀이가 아닌 "누군가와 함께하는 학습"으로 느껴요.\n선생님이 시키지 않아도 먼저 하고 싶어 하는 시간이 돼요.',
    iconSrc: "/images/apply-target/elementary-solution/icon-music.png",
    wide: true,
  },
];

function SolutionCardView({ item }: { item: SolutionCard }) {
  return (
    <Box
      bg="white"
      borderRadius="16px"
      boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.05)"
      p={{ base: '30px', lg: "30px" }}
      minH={{ base: "224px", lg: "319px" }}
      gridColumn={item.wide ? { base: "auto", lg: "1 / -1" } : "auto"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap={{ base: '0px', lg: "20px" }}
    >
      <Stack gap="12px">
        <Text
          color="#1D2939"
          fontWeight="700"
          fontSize={{ base: "20px", lg: "24px" }}
          lineHeight={{ base: "30px", lg: "34px" }}
        >
          {item.title}
        </Text>
        <Text
          color="#475467"
          fontWeight="500"
          fontSize={{ base: "16px", lg: "24px" }}
          lineHeight={{ base: "24px", lg: "34px" }}
          whiteSpace="pre-line"
        >
          {item.body}
        </Text>
      </Stack>

      <Flex justify="flex-end">
        <Box
          as="img"
          src={item.iconSrc}
          alt=""
          w={{ base: "50px", lg: "90px" }}
          h={{ base: "50px", lg: "90px" }}
          opacity={0.8}
        />
      </Flex>
    </Box>
  );
}

export function ElementarySolutionSection({ targetClassName }: { targetClassName?: string }) {
  return (
    <Box
      position="relative"
      pt={{ base: '50px', lg: "120px" }}
      pb={{ base: '100px', lg: "170px" }}
      px={{ base: 4, lg: 6 }}
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset={0}
        bgImage="url('/images/apply-target/elementary-solution/section-bg.png')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        opacity={0.4}
      />

      <Stack maxW="1200px" mx="auto" gap={{ base: '24px', lg: "60px" }} position="relative">
        <Stack gap={5} data-aos="fade-up"  alignItems={{ base: "center", lg: "flex-start" }}>
          <Flex
            bg="#E8F4F5"
            borderRadius="30px"
            px={{ base: '14px', lg: '14px' }}
            py={{ base: '5px', lg: '2px' }}
            h={{ base: '28px', lg: '40px' }}
            w="fit-content"
            align="center"
            justify="center"
          >
            <Text color="#125D56" fontWeight="600" fontSize={{ base: '12px', lg: '16px' }} lineHeight={{ base: '18px', lg: '24px' }}>
              러니의 솔루션
            </Text>
          </Flex>

          <Text
            color="black"
            fontWeight="600"
            fontSize={{ base: "24px", lg: "48px" }}
            lineHeight={{ base: "34px", lg: "60px" }}
            whiteSpace="pre-line"
          >
            {"러니의 "}
            <Box
              as="span"
              sx={{
                backgroundImage: "linear-gradient(90deg, #43D1BC 0%, #009B84 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              초등학교 맞춤형 기능
            </Box>
            {"으로\n더욱 편리하게 수업을 설계해 보세요"}
          </Text>
        </Stack>

        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: '24px', lg: 6 }}
          data-aos="fade-up"
          data-aos-delay="80"
        >
          {SOLUTIONS.map((item) => (
            <SolutionCardView key={item.title} item={item} />
          ))}
        </Box>
      </Stack>
      <Flex justify="center" align="center" w="full" position={'absolute'} left={0} right={0} bottom={{ base: '20px', lg: '40px' }} >
        <ScrollDownAnimation targetClassName={targetClassName} />
      </Flex>
      
    </Box>
  );
}
