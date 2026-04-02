import { Box, Flex, Stack, Text } from "@chakra-ui/react";

type ConvenienceCard = {
  label: string;
  labelBg: string;
  title: string;
  titleColor: string;
  body: string;
  cardBg: string;
  footnote?: string;
};

const CONVENIENCE_CARDS: ConvenienceCard[] = [
  {
    label: "쉽게",
    labelBg: "#7AC6E6",
    title: "바로 사용 가능",
    titleColor: "#7AC6E6",
    body: "수업 흐름에 맞춘 직관적인 설계로 별도의 연수 없이,\n현장에서 쉽게 활용할 수 있어요.",
    cardBg: "#F1F9FF",
  },
  {
    label: "편리하게",
    labelBg: "#7A90E6",
    title: "1:1 문의 및 기술 지원",
    titleColor: "#7A90E6",
    body: "서비스 내 1:1 문의하기 기능과\n이메일 고객 지원 창구를 운영하고 있어요.",
    cardBg: "#F1F5FF",
  },
  {
    label: "한 번에",
    labelBg: "#7A90E6",
    title: "학생 계정 일괄 생성",
    titleColor: "#7A90E6",
    body: "엑셀 파일로 학생 명단을 업로드하면 학생 계정이 한 번에 생성돼요.\n학생 한 명 한 명에게 가입을 시킬 필요 없이, 선생님이 명단만 올리면 바로 학습을 시작할 수 있어요.",
    footnote: "학생 계정은 학년이 바뀌어도 학습 이력이 그대로 유지돼요.",
    cardBg: "#F1F5FF",
  },
];

function ConvenienceCardItem({ card, isWide = false }: { card: ConvenienceCard; isWide?: boolean }) {
  return (
    <Box
      w="full"
      h={{ base: "auto", lg: "315px" }}
      bg={card.cardBg}
      borderRadius="20px"
      px={{ base: 6, lg: 10 }}
      py={{ base: 8, lg: 10 }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minH={{ base: "250px", lg: "315px" }}
    >
      <Box bg={card.labelBg} borderRadius="5px" px="10px" py="5px" w="fit-content">
        <Text color="white" fontWeight="600" fontSize="17px" lineHeight="25px">
          {card.label}
        </Text>
      </Box>

      <Stack gap={4} align="flex-start" w="full">
        <Text color={card.titleColor} fontWeight="600" fontSize={{ base: "30px", lg: "32px" }} lineHeight={{ base: "40px", lg: "44px" }}>
          {card.title}
        </Text>
        <Text color="#475467" fontWeight="500" fontSize={{ base: "20px", lg: "22px" }} lineHeight={{ base: "30px", lg: "32px" }} whiteSpace="pre-line">
          {card.body}
        </Text>
        {isWide && card.footnote ? (
          <Text color="#98A2B3" fontWeight="500" fontSize={{ base: "20px", lg: "22px" }} lineHeight={{ base: "30px", lg: "32px" }}>
            {card.footnote}
          </Text>
        ) : null}
      </Stack>
    </Box>
  );
}

export function InstitutionOperationalConvenienceSection() {
  return (
    <Box as="section" bg="white" py={{ base: 16, lg: "120px" }} px={{ base: 4, lg: 8 }}>
      <Stack maxW="1200px" mx="auto" gap={{ base: 10, lg: "60px" }}>
        <Stack gap={{ base: 6, lg: "25px" }} data-aos="fade-up">
          <Flex gap={4} wrap="wrap">
            <Flex h="36px" px="14px" py="2px" borderRadius="30px" bg="#DDF4FD" align="center" justify="center">
              <Text color="#4DABCE" fontWeight="600" fontSize="16px" lineHeight="24px">
                도입 기준 05
              </Text>
            </Flex>
            <Flex h="36px" px="14px" py="2px" borderRadius="30px" borderWidth="1px" borderColor="#4DABCE" align="center" justify="center">
              <Text color="#4DABCE" fontWeight="600" fontSize="16px" lineHeight="24px">
                운영 편의성
              </Text>
            </Flex>
          </Flex>

          <Text color="#1D2939" fontWeight="600" fontSize={{ base: "34px", lg: "48px" }} lineHeight={{ base: "44px", lg: "60px" }}>
            선생님도 관리자도{" "}
            <Box as="span" bgGradient="linear(to-r, #43B9D1, #933CB8)" bgClip="text">
              쉽게 쓸 수 있어요.
            </Box>
          </Text>

          <Text color="#1D2939" fontWeight="500" fontSize={{ base: "24px", lg: "24px" }} lineHeight={{ base: "34px", lg: "24px" }} whiteSpace="pre-line">
            {`학교 단위로 도입해도, 실제로 매일 쓰는 건 선생님이에요.\n선생님이 쉽게 쓸 수 있도록 설계했어요.`}
          </Text>
        </Stack>

        <Stack gap={5} w="full" px={'40px'} data-aos="fade-up" data-aos-delay="80">
          <Flex direction={{ base: "column", lg: "row" }} gap={5} w="full">
            <Box flex={1}>
              <ConvenienceCardItem card={CONVENIENCE_CARDS[0]} />
            </Box>
            <Box flex={1}>
              <ConvenienceCardItem card={CONVENIENCE_CARDS[1]} />
            </Box>
          </Flex>
          <ConvenienceCardItem card={CONVENIENCE_CARDS[2]} isWide />
        </Stack>
      </Stack>
    </Box>
  );
}
