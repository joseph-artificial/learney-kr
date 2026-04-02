import { Box, Flex, Stack, Text } from "@chakra-ui/react";

type InclusiveCard = {
  title: string;
  body: string;
  icon: string;
  iconWidth: {base: string, lg: string};
  iconHeight: {base: string, lg: string};
};

const INCLUSIVE_CARDS: InclusiveCard[] = [
  {
    title: "기초 학력 부진 학생도\n참여할 수 있어요",
    body: "문해력이 낮은 학생도\n자신의 속도에 맞춰\n학습에 참여할 수 있어요.",
    icon: "/images/apply-target/institution/inclusive-card-icon-user.svg",
    iconWidth:{base:"55px", lg:"55px"},
    iconHeight:{base:"55px", lg:"55px"},
  },
  {
    title: "웹 접근성 기준을\n준수해요",
    body: "WCAG 2.1 Level A 수준의\n웹 접근성을 제공하고 있어\n학습에 쉽게 참여할 수 있어요.",
    icon: "/images/apply-target/institution/inclusive-card-icon-access.svg",
    iconWidth:{base:"55px", lg:"55px"},
    iconHeight:{base:"55px", lg:"55px"},
  },
  {
    title: "다문화 학생을 위해,\n다국어를 지원해요.",
    body: "서비스 화면이 한국어, 영어,\n일본어로 제공되어 다문화 학생도\n어려움 없이 사용할 수 있어요.",
    icon: "/images/apply-target/institution/inclusive-card-icon-user.svg",
    iconWidth:{base:"55px", lg:"55px"},
    iconHeight:{base:"55px", lg:"55px"},
  },
];

export function InstitutionInclusiveLearningSection() {
  return (
    <Box as="section" bg="white" py={{ base: 16, lg: "120px" }} px={{ base: 4, lg: 8 }}>
      <Stack maxW="1200px" mx="auto" gap={{ base: 10, lg: "60px" }} align="center">
        <Stack gap={5} align="center" data-aos="fade-up">
          <Box
            as="img"
            src="/images/apply-target/institution/inclusive-main-icon.svg"
            alt=""
            w="80px"
            h="80px"
            objectFit="contain"
          />
          <Text color="#101828" fontWeight="600" fontSize={{ base: "34px", lg: "48px" }} lineHeight={{ base: "44px", lg: "60px" }} textAlign="center">
            {"모든 학생이 "}
            <Box as="span" bgGradient="linear(to-r, #43B9D1, #933CB8)" bgClip="text">
              소외되지 않는 학습 환경
            </Box>
            을 지향해요.
          </Text>
        </Stack>

        <Flex direction={{ base: "column", xl: "row" }} gap={5} w="full" align="stretch">
          {INCLUSIVE_CARDS.map((card, idx) => (
            <Box
              key={card.title}
              flex={1}
              data-aos="fade-up"
              data-aos-delay={60 + idx * 60}
              minW={{ xl: "380px" }}
              h={{ base: "auto", lg: "440px" }}
              bg="#F9FAFB"
              borderWidth="1px"
              borderColor="#D0D5DD"
              borderRadius="40px"
              p={{ base: 6, lg: 10 }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Flex
                w="76px"
                h="76px"
                borderRadius="22px"
                bg="white"
                borderWidth="1px"
                borderColor="#EAECF0"
                align="center"
                justify="center"
              >
                <Box as="img" src={card.icon} alt="" w={card.iconWidth} h={card.iconHeight} objectFit="contain" />
              </Flex>

              <Stack gap={4}>
                <Text color="#475467" fontWeight="700" fontSize="24px" lineHeight="30px" whiteSpace="pre-line">
                  {card.title}
                </Text>
                <Text color="#667085" fontWeight="500" fontSize="22px" lineHeight="30px" whiteSpace="pre-line">
                  {card.body}
                </Text>
              </Stack>
            </Box>
          ))}
        </Flex>
      </Stack>
    </Box>
  );
}
