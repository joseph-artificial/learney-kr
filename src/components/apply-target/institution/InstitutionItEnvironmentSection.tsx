import { Box, Flex, Stack, Text } from "@chakra-ui/react";

type ItCard = { title: string; body: string; icon: string; iconWidth: {base: string, lg: string} ; iconHeight: {base: string, lg: string} };

const IT_CARDS: ItCard[] = [
  {
    title: "웹 기반 서비스",
    body: "별도의 앱 설치 없이,\n브라우저만 있으면 돼요",
    icon: "/images/apply-target/institution/it-window-check.svg",
    iconWidth:{base:"37.500003814697266px", lg:"37.500003814697266px"},
    iconHeight:{base:"33.333335876464844px", lg:"33.333335876464844px"},
  },
  {
    title: "모든 기기에서",
    body: "PC, 태블릿, 크롬북, 모바일 등 다양한 기기를 지원해요",
    icon: "/images/apply-target/institution/it-devices.svg",
    iconWidth:{base:"37.5px", lg:"37.5px"},
    iconHeight:{base:"33.33333206176758px", lg:"33.33333206176758px"},
  },
  {
    title: "학교 네트워크로",
    body: "학교 내부망과 공공망 환경을\n고려해 오류를 최소화했어요.",
    icon: "/images/apply-target/institution/it-wifi.svg",
    iconWidth:{base:"36.449668884277344px", lg:"36.449668884277344px"},
    iconHeight:{base:"29.166820526123047px", lg:"29.166820526123047px"},
  },
];


export function InstitutionItEnvironmentSection() {
  return (
    <Box as="section" bg="#FCFCFD" py={{ base: 16, lg: "120px" }} px={{ base: 4, lg: 8 }}>
      <Stack maxW="1200px" mx="auto" gap={{ base: 10, lg: "60px" }}>
        <Stack gap={{ base: 6, lg: "25px" }} data-aos="fade-up">
          <Flex gap={4} wrap="wrap">
            <Flex h="36px" px="14px" py="2px" borderRadius="30px" bg="#DDF4FD" align="center" justify="center">
              <Text color="#4DABCE" fontWeight="600" fontSize="16px" lineHeight="24px">
                도입 기준 04
              </Text>
            </Flex>
            <Flex
              h="36px"
              px="14px"
              py="2px"
              borderRadius="30px"
              borderWidth="1px"
              borderColor="#4DABCE"
              align="center"
              justify="center"
            >
              <Text color="#4DABCE" fontWeight="600" fontSize="16px" lineHeight="24px">
                IT 환경 적합성
              </Text>
            </Flex>
          </Flex>
          <Text color="#1D2939" fontWeight="600" fontSize={{ base: "34px", lg: "48px" }} lineHeight={{ base: "44px", lg: "60px" }}>
            {"학교 인프라 그대로, "}
            <Box as="span" bgGradient="linear(to-r, #43B9D1, #933CB8)" bgClip="text">
              별도 설치 없이
            </Box>
            {" 바로 사용해요."}
          </Text>
        </Stack>

        <Flex direction={{ base: "column", lg: "row" }} gap={6} justify="center" align="stretch" data-aos="fade-up" data-aos-delay="80">
          {IT_CARDS.map((card) => (
            <Box
              key={card.title}
              flex="1"
              minW={{ lg: "384px" }}
              maxW={{ lg: "384px" }}
              mx={{ base: "auto", lg: "unset" }}
              w={{ base: "full", lg: "384px" }}
              bg="#F0F7FC"
              borderWidth="1px"
              borderColor="#EAECF0"
              borderRadius="20px"
              px={{ base: 6, lg: '40px' }}
              minH={{ base: "320px", lg: "360px" }}
            >
              <Stack gap={6} align="center" justify="center" h="full">
                <Flex
                  w="80px"
                  h="80px"
                  borderRadius="40px"
                  bg="#F9FAFB"
                  boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.05)"
                  align="center"
                  justify="center"
                >
                  <Box as="img" src={card.icon} alt="" w={card.iconWidth} h={card.iconHeight} objectFit="contain" />
                </Flex>
                <Text color="#1D2939" fontWeight="600" fontSize={{ base: "28px", lg: "30px" }} lineHeight={{ base: "36px", lg: "38px" }} textAlign="center">
                  {card.title}
                </Text>
                <Text color="#667085" fontWeight="500" fontSize={{ base: "22px", lg: "22px" }} lineHeight={{ base: "32px", lg: "32px" }} textAlign="center" whiteSpace="pre-line">
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