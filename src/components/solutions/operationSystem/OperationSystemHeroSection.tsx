"use client";

import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

const H = "/images/solutions/operation-system/hero";
const TITLE_GRADIENT = "linear-gradient(90deg, #43b9d1 0%, #933cb8 100%)";

function GradientEmphasis({ children }: { children: React.ReactNode }) {
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

export function OperationSystemHeroSection() {
  return (
    <Box position="relative" w="full" overflow="hidden" minH={{ base: "auto", lg: "640px" }}>
      <Box position="absolute" inset={0} zIndex={0} aria-hidden>
        <Image src={`${H}/hero-bg.png`} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      </Box>

      <Flex
        position="relative"
        zIndex={1}
        maxW="1440px"
        mx="auto"
        px={{ base: 6, lg: 10, xl: "120px" }}
        py={{ base: 16, lg: "120px" }}
        direction={{ base: "column", lg: "row" }}
        align={{ base: "stretch", lg: "center" }}
        gap={{ base: 12, lg: 8 }}
      >
        <Stack gap="20px" maxW={{ lg: "560px" }} flexShrink={0} data-aos="fade-up">
          <Box bg="white" border="1px solid" borderColor="#00e6c3" borderRadius="16px" px="12px" py="4px" w="fit-content">
            <Text fontWeight="500" fontSize="14px" lineHeight="20px" color="#0a2926">
              유연한 운영 방식
            </Text>
          </Box>

          <Text
            as="h1"
            fontWeight="600"
            fontSize={{ base: "34px", lg: "48px" }}
            lineHeight={{ base: "44px", lg: "65px" }}
            color="black"
          >
            <GradientEmphasis>자동으로</GradientEmphasis>
            {" 배포되는 학습과,"}
            <br />
            <GradientEmphasis>선생님이 직접 </GradientEmphasis>
            고르는 학습.
            <br />
            상황에 맞게 활용하세요.
          </Text>

          <Text fontWeight="400" fontSize={{ base: "18px", lg: "24px" }} lineHeight={{ base: "28px", lg: "36px" }} color="#667085" whiteSpace="pre-line">
            {`유연한 운영 방식으로 \n수업 전·중·후 어떤 상황에서든 빈틈 없이 학습이 이어져요.`}
          </Text>

          <Button
            mt={2}
            px="20px"
            h="48px"
            w="fit-content"
            borderRadius="12px"
            bg="primary.600"
            borderWidth="1px"
            borderColor="primary.600"
            boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
            _hover={{ bg: "primary.700", borderColor: "primary.700" }}
            onClick={() => window.open(process.env.NEXT_PUBLIC_LMS_URL ?? "/contact", "_blank")}
          >
            <Text color="white" fontWeight="600" fontSize="16px" lineHeight="24px">
              2주 무료체험 시작하기
            </Text>
          </Button>
        </Stack>

        <Box flex="1" position="relative" minH={{ base: "280px", lg: "520px" }} data-aos="fade-up">
          <Box position="relative" w="full" h={{ base: "280px", lg: "480px" }} maxW={{ lg: "752px" }} ml={{ lg: "auto" }} left={'25%'}>
            <Image
              src={`${H}/hero-laptop.png`}
              alt=""
              fill
              sizes="(max-width: 992px) 100vw, 752px"
              style={{ objectFit: "contain", objectPosition: "center bottom" }}
            />

            <Flex
              position="absolute"
              left={{ base: "4%", lg: "50px" }}
              bottom={{ base: "12%", lg: "0" }}
              gap={'10px'}
            >
              <Box
                borderRadius="25px"
                border="1.5px solid white"
                bgGradient="linear(to-b, white, rgba(255,255,255,0.3))"
                backdropFilter="blur(10px)"
                boxShadow="0px 0px 4px 0px rgba(0,0,0,0.1)"
                py={'22px'}
                px={'21px'}
                textAlign="center"
                width={'143px'}
                height={'188px'}
              >
                <Flex justify="center" mb={2}>
                  <Box position="relative" w="100px" h="100px">
                    <Box position="absolute" inset={0} bg="#e5fef8" borderRadius="25px" opacity={0.9} />
                    <Box position="relative" w="full" h="full" display="flex" alignItems="center" justifyContent="center">
                      <Box position="relative" w="60px" h="60px">
                        <Image src={`${H}/hero-icon-target.png`} alt="" fill style={{ objectFit: "contain" }} sizes="60px" />
                      </Box>
                    </Box>
                  </Box>
                </Flex>
                <Text fontWeight="700" fontSize="14px" color="#79b7ac" lineHeight="1.3">
                  오늘의 학습
                </Text>
                <Text fontWeight="500" fontSize="12px" color="#79b7ac" mt={1}>
                  기초 문해력 학습
                </Text>
              </Box>
              <Box
                borderRadius="25px"
                border="1.5px solid white"
                bgGradient="linear(to-b, white, rgba(255,255,255,0.3))"
                backdropFilter="blur(10px)"
                boxShadow="0px 0px 4px 0px rgba(0,0,0,0.1)"
                py={'22px'}
                px={'21px'}
                textAlign="center"
                width={'143px'}
                height={'188px'}
                gap={'10px'}
              >
                <Flex justify="center" mb={2}>
                  <Box w="100px" h="100px" bg="#eaf5ff" borderRadius="25px" opacity={0.95} display="flex" alignItems="center" justifyContent="center">
                    <Box position="relative" w="60px" h="60px">
                      <Image src={`${H}/hero-icon-shape.png`} alt="" fill style={{ objectFit: "contain" }} sizes="60px" />
                    </Box>
                  </Box>
                </Flex>
                <Text fontWeight="700" fontSize="14px" color="#799ab7" lineHeight="1.3">
                  클래스 학습
                </Text>
                <Text fontWeight="500" fontSize="12px" color="#799ab7" mt={1}>
                  교과 연계 학습
                </Text>
              </Box>
            </Flex>

          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
