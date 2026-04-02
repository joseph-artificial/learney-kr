"use client";

import { Box, Flex, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import { PRICING_QUOTE_FORM_HREF } from "@/config/site";

/** 피그마 히어로 배경의 완만한 컬러 이동 */
const heroGradientFlow = keyframes`
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

const glowFloatA = keyframes`
  0% { transform: translate3d(-6%, 0, 0) scale(1); opacity: 0.9; }
  25% { transform: translate3d(-2%, -1%, 0) scale(1.03); opacity: 0.96; }
  50% { transform: translate3d(6%, 0, 0) scale(1.06); opacity: 1; }
  75% { transform: translate3d(2%, 1%, 0) scale(1.03); opacity: 0.96; }
  100% { transform: translate3d(-6%, 0, 0) scale(1); opacity: 0.9; }
`;

const glowFloatB = keyframes`
  0% { transform: translate3d(5%, 0, 0) scale(1); opacity: 0.85; }
  25% { transform: translate3d(1%, 1%, 0) scale(0.98); opacity: 0.92; }
  50% { transform: translate3d(-5%, 0, 0) scale(0.95); opacity: 1; }
  75% { transform: translate3d(-1%, -1%, 0) scale(0.98); opacity: 0.92; }
  100% { transform: translate3d(5%, 0, 0) scale(1); opacity: 0.85; }
`;

export function HeroSection() {
  const isLgSize = useBreakpointValue({ base: false, lg: true })
  return (
    <Box
      as="section"
      id="main-hero-section"
      position="relative"
      overflow="hidden"
      px={{ base: 6, lg: "60px", xl: "120px" }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minH={{ base: "auto", lg: "780px" }}
      h={{ base: "auto", lg: "700px" }}
      pb={{ base: "72px", lg: 0 }}
      pt={{ base: "72px", lg: "120px" }}
    >
      <Box
        position="absolute"
        inset={0}
        zIndex={0}
        aria-hidden
        sx={{
          backgroundImage:
            "linear-gradient(165deg, #A6EDE3 0%, #B8F0E7 34%, #CFEFF4 68%, #DDEFF8 100%)",
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 0%",
          animation: `${heroGradientFlow} 12s ease-in-out infinite`,
        }}
      />
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        h={{ base: "88px", lg: "160px" }}
        zIndex={1}
        pointerEvents="none"
        aria-hidden
        bgGradient="linear(to-b, rgba(221,239,248,0) 0%, #FFFFFF 100%)"
      />
      <Box
        position="absolute"
        inset={0}
        zIndex={0}
        pointerEvents="none"
        aria-hidden
      >
        <Box
          position="absolute"
          top={{ base: "-18%", lg: "-12%" }}
          right={{ base: "-16%", lg: "-10%" }}
          w={{ base: "min(92vw, 980px)", lg: "min(54vw, 980px)" }}
          h={{ base: "min(92vw, 980px)", lg: "min(54vw, 980px)" }}
          borderRadius="full"
          minW="775px"
          minH="775px"
          sx={{
            background:
              "radial-gradient(circle at 55% 54%, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.34) 40%, rgba(255,255,255,0.14) 62%, rgba(255,255,255,0) 84%)",
            filter: "blur(8px)",
            animation: `${glowFloatA} 7s ease-in-out infinite`,
          }}
        />
        <Box
          position="absolute"
          top={{ base: "34%", lg: "58%" }}
          left={{ base: "30%", lg: "26%" }}
          w={{ base: "min(82vw, 900px)", lg: "min(48vw, 900px)" }}
          h={{ base: "min(82vw, 900px)", lg: "min(48vw, 900px)" }}
          borderRadius="full"
          minW="775px"
          minH="775px"
          sx={{
            background:
              "radial-gradient(circle at 44% 40%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.12) 62%, rgba(255,255,255,0) 84%)",
            filter: "blur(10px)",
            animation: `${glowFloatB} 8.2s ease-in-out infinite`,
          }}
        />
        <Box
          position="absolute"
          bottom={{ base: "-12%", lg: "16%" }}
          left={{ base: "-12%", lg: "-8%" }}
          w={{ base: "min(88vw, 940px)", lg: "min(52vw, 940px)" }}
          h={{ base: "min(88vw, 940px)", lg: "min(52vw, 940px)" }}
          borderRadius="full"
          minW="775px"
          minH="775px"
          sx={{
            background:
              "radial-gradient(circle at 56% 42%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.36) 40%, rgba(255,255,255,0.15) 62%, rgba(255,255,255,0) 84%)",
            filter: "blur(9px)",
            animation: `${glowFloatA} 9.2s ease-in-out infinite`,
          }}
        />
        <Box
          position="absolute"
          bottom={{ base: "-16%", lg: "-20%" }}
          right={{ base: "-14%", lg: "-8%" }}
          w={{ base: "min(86vw, 900px)", lg: "min(50vw, 900px)" }}
          h={{ base: "min(86vw, 900px)", lg: "min(50vw, 900px)" }}
          borderRadius="full"
          minW="775px"
          minH="775px"
          sx={{
            background:
              "radial-gradient(circle at 42% 40%, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.32) 40%, rgba(255,255,255,0.13) 62%, rgba(255,255,255,0) 84%)",
            filter: "blur(8px)",
            animation: `${glowFloatB} 8.6s ease-in-out infinite`,
          }}
        />
      </Box>
      <Flex
        position="relative"
        zIndex={1}
        w="full"
        maxW="1200px"
        mx="auto"
        align="center"
        justify="space-between"
        gap={{ base: 0, lg: 14 }}
        direction={{ base: "column", lg: "row" }}
      >
        <Stack
          w={'100%'}
          gap={{ base: 5, lg: "28px" }}
          align={{ base: "center", lg: "flex-start" }}
          textAlign={{ base: "center", lg: "left" }}
          zIndex={1}
        >
          <Text
            as="h1"
            fontFamily="heading"
            fontWeight="600"
            fontSize={{ base: "26px", sm: "26px", lg: "52px", xl: "60px" }}
            lineHeight={{ base: "34px", sm: "34px", lg: "68px", xl: "80px" }}
            color="black"
            whiteSpace="pre-line"
          >
            {"학교에서 바로 쓰는\n선생님의 국어 수업 파트너\n"}
            <Text
              as="span"
              display="block"
              fontWeight="700"
              sx={{
                backgroundImage:
                  "linear-gradient(90deg, #00B6A1 0%, #00413A 58.65%, #0094C1 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              러니 Learney
            </Text>
          </Text>
          <Text
            fontFamily="body"
            fontWeight="500"
            fontSize={{ base: "14px", lg: "24px" }}
            lineHeight={{ base: "20px", lg: "36px" }}
            color="gray.600"
          >
            자습부터 수업까지, 준비는 줄이고 학습은 깊게
          </Text>
          <Flex
            gap={{ base: 2, lg: "18px" }}
            flexWrap="wrap"
            justify={{ base: "center", lg: "flex-start" }}
            display={{base: 'none', lg: 'flex'}}
          >
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <Box
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={{ base: 4, lg: "18px" }}
                py={{ base: 2.5, lg: "10px" }}
                minH="49px"
                borderRadius="12px"
                bg="#0E9384"
                borderWidth="1px"
                borderColor="#0E9384"
                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                _hover={{ bg: "#0D8578" }}
              >
                <Text color="white" fontWeight="600" fontSize="16px" lineHeight="24px">
                  무료체험 신청하기
                </Text>
              </Box>
            </Link>
            <Link href={PRICING_QUOTE_FORM_HREF} style={{ textDecoration: "none" }}>
              <Box
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={{ base: 4, lg: "18px" }}
                py={{ base: 2.5, lg: "10px" }}
                minH="49px"
                borderRadius="12px"
                bg="white"
                borderWidth="1px"
                borderColor="gray.300"
                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                _hover={{ bg: "gray.50" }}
              >
                <Text color="gray.700" fontWeight="600" fontSize="16px" lineHeight="24px">
                  견적서 신청하기
                </Text>
              </Box>
            </Link>
          </Flex>
        </Stack>

        <Box
          position="relative"
          flex={{ base: "none", lg: "1" }}
          w="full"
          minW={0}
          display="flex"
          flexDirection="column"
          alignItems={{ base: "center", lg: "flex-end" }}
          minH={{ base: "220px", sm: "220px", lg: "574px" }}
          flexShrink={0}
          sx={{
            transform: isLgSize ? "translateX(182px)" : "translateX(0)" 
          }}
        >
          <Box
            position="absolute"
            right={{ base: "-8%", lg: 0 }}
            top={{ base: "-4%", lg: "0" }}
            w={{ base: "min(280px, 70vw)", lg: "500px" }}
            h={{ base: "min(280px, 70vw)", lg: "500px" }}
            pointerEvents="none"
            aria-hidden
          >
            <Box
              as="img"
              src="/images/landing/hero2-decoration.svg"
              alt=""
              w="full"
              h="full"
              objectFit="contain"
            />
          </Box>
          <Box
            position="relative"
            w={{ base: "full", lg: "765px" }}
            maxW="765px"
            sx={{ aspectRatio: "765 / 574" }}
          >
            <Image
              src="/images/landing/mainHeroBg.png"
              alt="러니 데스크톱·모바일 서비스 화면"
              fill
              sizes="(max-width: 1024px) 100vw, 765px"
              quality={100}
              unoptimized
              style={{ objectFit: "contain" }}
              priority
            />
          </Box>
          <Flex
            gap={{ base: 2, lg: "18px" }}
            flexWrap="wrap"
            justify={{ base: "center", lg: "flex-start" }}
            display={{base: 'flex', lg: 'none'}}
          >
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <Box
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={{ base: '10px' }}
                py={{ base: '6px' }}
                minH="30px"
                borderRadius="12px"
                bg="#0E9384"
                borderWidth="1px"
                borderColor="#0E9384"
                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                _hover={{ bg: "#0D8578" }}
              >
                <Text color="white" fontWeight="600" fontSize="12px" lineHeight="18px">
                  무료체험 신청하기
                </Text>
              </Box>
            </Link>
            <Link href={PRICING_QUOTE_FORM_HREF} style={{ textDecoration: "none" }}>
              <Box
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={{ base: '10px' }}
                py={{ base: '6px' }}
                minH="30px"
                borderRadius="12px"
                bg="white"
                borderWidth="1px"
                borderColor="gray.300"
                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                _hover={{ bg: "gray.50" }}
              >
                <Text color="gray.700" fontWeight="600" fontSize="12px" lineHeight="18px">
                  견적서 신청하기
                </Text>
              </Box>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
