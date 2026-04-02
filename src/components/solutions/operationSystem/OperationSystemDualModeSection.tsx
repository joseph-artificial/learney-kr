import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

const D = "/images/solutions/operation-system/dual";
const TITLE_GRADIENT = "linear-gradient(90deg, #43b9d1 0%, #933cb8 100%)";

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <Text
      as="span"
      sx={{
        backgroundImage: TITLE_GRADIENT,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </Text>
  );
}

export function OperationSystemDualModeSection() {
  return (
    <Box bg="#f9fafb" py={{ base: 16, lg: "120px" }} px={{ base: 6, lg: 10, xl: "120px" }}>
      <Stack maxW="1200px" mx="auto" spacing={{ base: 8, lg: "40px" }} align="center">
        <Stack spacing="30px" align="center" data-aos="fade-up">
          <Box bg="#efe9ff" px="12px" py="6px" borderRadius="40px">
            <Text fontWeight="600" fontSize="16px" lineHeight="24px" color="#451f77">
              솔루션
            </Text>
          </Box>
          <Text
            as="h2"
            textAlign="center"
            fontWeight="600"
            fontSize={{ base: "32px", lg: "48px" }}
            lineHeight={{ base: "42px", lg: "60px" }}
            color="#1d2939"
          >
            <GradientText>두가지 학습 방식</GradientText>으로
            <br />
            선생님의 니즈에 맞춰 활용해요
          </Text>
        </Stack>

        <Flex direction={{ base: "column", lg: "row" }} gap="13px" w="full" align="stretch" data-aos="fade-up">
          <Box
            flex={1}
            bg="#fcfcfd"
            border="1px solid"
            borderColor="#d0d5dd"
            borderRadius="20px"
            p={5}
            display="flex"
            flexDirection="column"
            gap="26px"
            data-aos="fade-right"
            data-aos-delay="60"
          >
            <Stack spacing="24px" align="flex-start">
              <Flex gap={5} align="center" wrap="wrap">
                <Flex
                  w="100px"
                  h="100px"
                  borderRadius="25px"
                  bg="#e5fef8"
                  border="0.75px solid"
                  borderColor="#f2f4f7"
                  align="center"
                  justify="center"
                  opacity={0.95}
                >
                  <Box position="relative" w="67px" h="63px">
                  <Image src={`${D}/icon-today.png`} alt="" fill style={{ objectFit: "contain" }} sizes="100px" />
                  </Box>
                </Flex>
                <Stack spacing={0} lineHeight="30px">
                  <Text fontWeight="600" fontSize="22px" color="#1d2939">
                    오늘의 학습
                  </Text>
                  <Text fontWeight="500" fontSize="22px" color="#475467">
                    설정만 하면, 매일 자동으로
                  </Text>
                </Stack>
              </Flex>
              <Text fontWeight="500" fontSize={{ base: "18px", lg: "20px" }} lineHeight="26px" color="#667085" whiteSpace="pre-line">
                학생 수준에 맞춰 AI가 학습을 자동으로 제공해요.
                {"\n"}한 번만 설정하면 매일 자동으로 운영돼요.
              </Text>
            </Stack>
            <Box bg="#f9fafb" borderRadius="20px" pt={9} px={{ base: 4, lg: "85px" }} pb={4} overflow="hidden">
              <Box
                mx="auto"
                maxW="380px"
                border="1px solid"
                borderColor="#eaecf0"
                borderBottom="none"
                borderTopRadius="10px"
                h="242px"
                position="relative"
                overflow="hidden"
                boxShadow="0px 0px 30px 0px rgba(102,227,160,0.1)"
              >
                <Image src={`${D}/screenshot-today.png`} alt="" fill style={{ objectFit: "cover", objectPosition: "top center" }} sizes="380px" />
              </Box>
            </Box>
          </Box>

          <Box
            flex={1}
            bg="#fcfcfd"
            border="1px solid"
            borderColor="#d0d5dd"
            borderRadius="20px"
            p={5}
            display="flex"
            flexDirection="column"
            gap="26px"
            data-aos="fade-left"
            data-aos-delay="120"
          >
            <Stack spacing="24px" align="flex-start">
              <Flex gap={5} align="center" wrap="wrap">
                <Flex
                  w="100px"
                  h="100px"
                  borderRadius="25px"
                  bg="#eaf5ff"
                  border="1px solid"
                  borderColor="#f2f4f7"
                  align="center"
                  justify="center"
                  opacity={0.95}
                >
                  <Box position="relative" w="52px" h="56px">
                    <Image src={`${D}/icon-class.png`} alt="" fill style={{ objectFit: "contain" }} sizes="100px" />
                  </Box>
                </Flex>
                <Stack spacing={0} lineHeight="30px" maxW="252px">
                  <Text fontWeight="600" fontSize="22px" color="#1d2939">
                    클래스 학습
                  </Text>
                  <Text fontWeight="500" fontSize="22px" color="#475467">
                    수업에 맞게, 직접 선택
                  </Text>
                </Stack>
              </Flex>
              <Text fontWeight="500" fontSize={{ base: "18px", lg: "20px" }} lineHeight="26px" color="#667085" whiteSpace="pre-line">
                클래스의 학생 전원에게 교과서,단원,소재별로 원하는 학습을 선택해
                {"\n"}
                수업 시간, 과제, 보충 학습에 바로 활용할 수 있어요.
              </Text>
            </Stack>
            <Box bg="#f9fafb" borderRadius="20px" pt={9} px={{ base: 4, lg: 10 }} pb={4} overflow="hidden">
              <Box
                mx="auto"
                maxW="390px"
                border="1px solid"
                borderColor="#eaecf0"
                borderBottom="none"
                borderTopRadius="10px"
                h="242px"
                position="relative"
                overflow="hidden"
                boxShadow="0px 0px 30px 0px rgba(102,227,160,0.1)"
              >
                <Image src={`${D}/screenshot-class.png`} alt="" fill style={{ objectFit: "cover", objectPosition: "top center" }} sizes="390px" />
              </Box>
            </Box>
          </Box>
        </Flex>

        <Image
              src="/images/arrows/scrollDown.svg"
              alt="scrollDown"
              width={25}
              height={12.5}
            />

        <Box
          w="full"
          maxW="1200px"
          minH={{ base: "auto", lg: "219px" }}
          py={{ base: 8, lg: 10 }}
          px={6}
          borderRadius="20px"
          boxShadow="0px 4px 10px 0px rgba(0,0,0,0.1)"
          bgGradient="linear(to-b, #efe9ff, white)"
          data-aos="fade-up"
        >
          <Stack spacing="10px" align="center" textAlign="center" color="#451f77">
            <Text fontWeight="500" fontSize={{ base: "16px", lg: "20px" }} lineHeight="30px" opacity={0.5}>
              자동 추천만으로는 부족하고, 선생님이 직접 고르는 학습 만으로는 꾸준함을 만들기 어려우니까,
            </Text>
            <Text fontWeight="600" fontSize={{ base: "20px", lg: "30px" }} lineHeight={{ base: "28px", lg: "38px" }} whiteSpace="pre-line">
              {`자동화가 필요한 건 자동으로, 선생님의 판단이 필요하면 직접. `}
              {"\n"}
              러니는 현장에 맞도록, 균형있게 설계했어요.
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
