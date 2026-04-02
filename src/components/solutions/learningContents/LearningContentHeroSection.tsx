"use client";

import { Box, Button, Flex, HStack, Image as CImg, Stack, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import NextImage from "next/image";

const D = "/images/solutions/learning-content/hero-dual";

const arrowClipRevealFromLeft = keyframes`
  from {
    /* 왼쪽에서 오른쪽으로 자라나는 느낌 (left는 0, right를 100% → 0으로) */
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
`;

const ARROW_REVEAL_DELAY = "0.55s";
const ARROW_REVEAL_DURATION = "0.65s";

const TITLE_GRADIENT = "linear-gradient(90deg, #5eccff 0%, #0055a9 76.442%, #00a3a9 100%)";

function GradientEmphasis({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="span"
      sx={{
        backgroundImage: TITLE_GRADIENT,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </Box>
  );
}

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      px="9px"
      py="2px"
      borderRadius="18px"
      border="0.87px solid"
      borderColor="#98A2B3"
    >
      <Text as="span" fontWeight="600" fontSize="11px" lineHeight="22px" color="#98A2B3" whiteSpace="nowrap">
        {children}
      </Text>
    </Box>
  );
}

function ClassClipboardIcon() {
  return (
    <Box position="relative" w="58px" h="76px" flexShrink={0}>
      <Box
        position="absolute"
        left="0"
        top="8px"
        w="56px"
        h="69px"
        borderRadius="4.5px"
        bgGradient="linear(to-b, #daedff, #329cff)"
        opacity={0.85}
      />
      <Box
        position="absolute"
        left="8px"
        top="8px"
        w="37px"
        h="8px"
        borderTopLeftRadius="3.5px"
        borderTopRightRadius="3.5px"
        bgGradient="linear(to-r, #a5d5ff, #99cfff)"
        sx={{ transform: "scaleY(-1)" }}
        opacity={0.85}
      />
      <Box
        position="absolute"
        left="12px"
        top="0"
        w="27px"
        h="8px"
        borderTopLeftRadius="3.5px"
        borderTopRightRadius="3.5px"
        bgGradient="linear(to-r, #99cfff, #68aae6)"
        opacity={0.85}
      />
      <Box
        position="absolute"
        left="11px"
        top="12px"
        w="57px"
        h="73px"
        borderRadius="4.5px"
        border="0.9px solid"
        borderColor="white"
        bg="rgba(234, 245, 255, 0.5)"
        backdropFilter="blur(2.7px)"
        opacity={0.9}
      />
      <HStack position="absolute" left="21px" top="25px" spacing="6px" align="flex-start">
        <Box w="12px" h="12px" borderRadius="3.5px" border="2.7px solid white" boxShadow="0 0 7px #62b9ff" opacity={0.85} flexShrink={0} />
        <Box w="19px" h="3.5px" borderRadius="1.8px" bg="white" boxShadow="0 0 7px #62b9ff" mt="4px" opacity={0.85} />
      </HStack>
      <HStack position="absolute" left="21px" top="45px" spacing="6px" align="flex-start">
        <Box w="12px" h="12px" borderRadius="3.5px" border="2.7px solid white" boxShadow="0 0 7px #62b9ff" opacity={0.85} flexShrink={0} />
        <Box w="19px" h="3.5px" borderRadius="1.8px" bg="white" boxShadow="0 0 7px #62b9ff" mt="4px" opacity={0.85} />
      </HStack>
      <Box position="absolute" left="22px" bottom="14px" w="35px" h="8px">
        <CImg src={`${D}/icon-class-detail.svg`} alt="" w="100%" h="100%" objectFit="contain" />
      </Box>
    </Box>
  );
}

function HeroContentImage() {
  return (
    <Box w="full" maxW={{ base: "100%", lg: "720px" }} mx={{ base: "auto", lg: "unset" }} flexShrink={0}>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        align={{ base: "center", lg: "center" }}
        justify="center"
        gap={{ base: 5, lg: 0 }}
        position="relative"
        pb={{ base: 0, lg: 2 }}
        pt={'50px'}
      >
        {/* Left glass card — 오늘의 학습 */}
        <Flex
          w={{ base: "min(100%, 300px)", lg: "274px" }}
          h={{ base: "260px", lg: "362px" }}
          borderRadius="33px"
          border="2px solid"
          borderColor="white"
          bgGradient="linear(to-b, white, rgba(255,255,255,0.32))"
          boxShadow="0px 12px 48px rgba(15, 80, 100, 0.08)"
          display="flex"
          // justifyContent="between"
          flexShrink={0}
          zIndex={1}
          flexDirection="column"
          justifyContent="space-between"
          py={'27.43px'}
          px={'30px'}
        >
          <Flex
            w="133px"
            h="133px"
            borderRadius="34px"
            bg="#E5FEF8"
            border="1px solid"
            borderColor="#E5FEF8"
            align="center"
            justify="center"
            opacity={0.95}
          >
            <Box position="relative" w="90px" h="84px">
              <CImg src={`${D}/icon-today.svg`} alt="" w="100%" h="100%" objectFit="contain" />
            </Box>
          </Flex>
          <Stack spacing="6px" align={{ base: "center", lg: "flex-start" }} minW={0}>
            <Text fontWeight="700" fontSize={{ base: "17px", lg: "19px" }} lineHeight="25px" color="#79B7AC" textAlign={{ base: "center", lg: "left" }}>
              오늘의 학습
            </Text>
            <Text fontWeight="500" fontSize={{ base: "15px", lg: "16.5px" }} lineHeight="25px" color="#79B7AC" textAlign={{ base: "center", lg: "left" }}>
              기초 문해력 학습
            </Text>
            <HStack spacing="5px" flexWrap="wrap" justify={{ base: "center", lg: "flex-start" }} pt="6px">
              <TagPill># 과제,자습 시간에</TagPill>
              <TagPill># 5~10분</TagPill>
            </HStack>
          </Stack>
        </Flex>

        {/* Center hub + arrows */}
        <Box
          position="relative"
          w={{ base: "220px", lg: "200px" }}
          // minH={{ base: "200px", lg: "220px" }}
          h={'full'}
          flexShrink={0}
          mx={{ lg: "-60px" }}
          zIndex={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CImg
            src={`${D}/arrow-right.svg`}
            alt=""
            position="absolute"
            left={{ base: "-8px", lg: "-36px" }}
            top="50px"
            transform="translateY(-50%) rotate(180deg)"
            w="64px"
            h="37px"
            pointerEvents="none"
            zIndex={0}
            sx={{
              clipPath: "inset(0 100% 0 0)",
              WebkitClipPath: "inset(0 100% 0 0)",
              animation: `${arrowClipRevealFromLeft} ${ARROW_REVEAL_DURATION} cubic-bezier(0.22, 1, 0.36, 1) ${ARROW_REVEAL_DELAY} forwards`,
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
                clipPath: "inset(0 0 0 0)",
                WebkitClipPath: "inset(0 0 0 0)",
              },
            }}
          />
          <CImg
            src={`${D}/arrow-right.svg`}
            alt=""
            position="absolute"
            right={{ base: "-8px", lg: "-36px" }}
            bottom="25px"
            transform="translateY(-50%)"
            w="64px"
            h="37px"
            pointerEvents="none"
            zIndex={0}
            sx={{
              // 오른쪽에서 왼쪽으로 드러나도록 left 쪽을 잘라낸 뒤 줄여나감
              clipPath: "inset(0 100% 0 0)",
              WebkitClipPath: "inset(0 100% 0 0)",
              animation: `${arrowClipRevealFromLeft} ${ARROW_REVEAL_DURATION} cubic-bezier(0.22, 1, 0.36, 1) ${ARROW_REVEAL_DELAY} forwards`,
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
                clipPath: "inset(0 0 0 0)",
                WebkitClipPath: "inset(0 0 0 0)",
              },
            }}
          />
          <Box position="relative" w={{ base: "168px", lg: "182px" }} h={{ base: "168px", lg: "182px" }}>
            <Box position="absolute" inset="-8%" display="flex" alignItems="center" justifyContent="center">
              <CImg src={`${D}/hub-circle.svg`} alt="" w="100%" h="100%" objectFit="contain" />
            </Box>
            <Flex direction="column" align="center" justify="center" position="relative" h="full" pt="36px" px="10px" pb="10px">
              <Box w="22px" h="19px" mb="6px" flexShrink={0}>
                <CImg src={`${D}/book-icon.svg`} alt="" w="100%" h="100%" objectFit="contain" />
              </Box>
              <Text
                textAlign="center"
                fontWeight="700"
                fontSize={{ base: "15px", lg: "17.5px" }}
                lineHeight="1.45"
                color="#8DC0D7"
                whiteSpace="pre-line"
              >
                상황에 맞는 콘텐츠{"\n"}활용
              </Text>
            </Flex>
          </Box>
        </Box>

        {/* Right glass card — 클래스 학습 */}
        <Flex
          w={{ base: "min(100%, 300px)", lg: "274px" }}
          h={{ base: "260px", lg: "362px" }}
          borderRadius="33px"
          border="2px solid"
          borderColor="white"
          bgGradient="linear(to-b, white, rgba(255,255,255,0.32))"
          boxShadow="0px 12px 48px rgba(15, 80, 100, 0.08)"
          display="flex"
          flexShrink={0}
          zIndex={1}
          flexDirection="column"
          justifyContent="space-between"
          align={'flex-end'}
          py={'27.43px'}
          px={'30px'}
        >
          <Flex
            w="133px"
            h="133px"
            borderRadius="34px"
            bg="#EAF5FF"
            border="1px solid"
            borderColor="#EAF5FF"
            align="center"
            justify="center"
            opacity={0.95}
          >
            <Box position="relative" w="69px" h="84px">
              <CImg src={`${D}/icon-class.svg`} alt="" w="100%" h="100%" objectFit="contain" />
            </Box>
          </Flex>
          <Stack spacing="6px" align={{ base: "center", lg: "flex-end" }} minW={0}>
            <Text fontWeight="700" fontSize={{ base: "17px", lg: "19px" }} lineHeight="25px" color="#799AB7" textAlign={{ base: "center", lg: "right" }}>
              클래스 학습
            </Text>
            <Text fontWeight="500" fontSize={{ base: "15px", lg: "16.5px" }} lineHeight="25px" color="#799AB7" textAlign={{ base: "center", lg: "right" }}>
              교과 연계 학습
            </Text>
            <HStack spacing="5px" flexWrap="wrap" justify={{ base: "center", lg: "flex-start" }} pt="6px">
              <TagPill># 수업 시간에</TagPill>
              <TagPill># 10~20분</TagPill>
            </HStack>
          </Stack>
        </Flex>

      </Flex>

    </Box>
  );
}

export function LearningContentHeroSection() {
  return (
    <Box position="relative" w="full" overflow="hidden">
      <Box position="absolute" inset={0} zIndex={0} aria-hidden>
        <NextImage
          src="/images/landing/elementary-hero-learning-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Flex
        position="relative"
        zIndex={1}
        maxW="1440px"
        mx="auto"
        px={{ base: 6, lg: 10, xl: "120px" }}
        py={{ base: "64px", lg: "120px" }}
        minH={{ base: "auto", lg: "560px" }}
        direction={{ base: "column", lg: "row" }}
        align={{ base: "stretch", lg: "center" }}
        gap={{ base: 10, lg: 12 }}
      >
        <Stack gap={{ base: "32px", lg: "40px" }} align="flex-start" maxW={{ lg: "520px" }} flexShrink={0}>
          <Stack gap="20px" align="flex-start" data-aos="fade-up">
            <Box
              px="12px"
              py="4px"
              borderRadius="16px"
              border="1px solid"
              borderColor="#00e6c3"
              bg="rgba(255, 255, 255, 0.3)"
            >
              <Text fontWeight="500" fontSize="14px" lineHeight="20px" color="#0a2926" whiteSpace="nowrap">
                효과적인 학습 콘텐츠
              </Text>
            </Box>

            <Text
              as="h1"
              fontWeight="600"
              fontSize={{ base: "34px", lg: "48px" }}
              lineHeight={{ base: "44px", lg: "65px" }}
              color="black"
            >
              <GradientEmphasis>문해력</GradientEmphasis>부터 <GradientEmphasis>성취기준</GradientEmphasis>까지,
              <br />
              러니 하나로 완성하세요
            </Text>

            <Text
              fontWeight="400"
              fontSize={{ base: "18px", lg: "24px" }}
              lineHeight={{ base: "28px", lg: "36px" }}
              color="#667085"
              whiteSpace="pre-line"
            >
              {
                "문해력의 기초 체력을 만드는 학습과\n교과서·성취 기준에 맞춘 학습,\n러니의 콘텐츠는 두 축으로 설계되어 있어요."
              }
            </Text>
          </Stack>

          <Box data-aos="fade-up" data-aos-delay="80">
            <Button
              px="20px"
              h="48px"
              w="fit-content"
              borderRadius="12px"
              bg="primary.600"
              borderWidth="1px"
              borderColor="primary.600"
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              _hover={{ bg: "primary.700", borderColor: "primary.700" }}
              onClick={() => {
                window.open(process.env.NEXT_PUBLIC_LMS_URL ?? "/contact", "_blank");
              }}
            >
              <Text color="white" fontWeight="600" fontSize="16px" lineHeight="24px">
                2주 무료체험 시작하기
              </Text>
            </Button>
          </Box>
        </Stack>

        <Box flex="1" minW={0} data-aos="fade-up" data-aos-delay="100">
          <HeroContentImage />
        </Box>
      </Flex>
    </Box>
  );
}
