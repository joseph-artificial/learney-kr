"use client";

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

const R = "/images/solutions/operation-system/recommendation";
const TITLE_GRADIENT = "linear-gradient(90deg, #43b9d1 0%, #933cb8 100%)";

const barFill = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`;

const arrowAppear = keyframes`
  from {
    opacity: 0;
    transform: scale(0.88);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const cardAppear = keyframes`
  from {
    opacity: 0;
    transform: translateX(18px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const scoreRevealDefault = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 10px));
  }
  to {
    opacity: 0.5;
    transform: translate(-50%, -50%);
  }
`;

const scoreRevealEmphasis = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 10px));
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

function GradientText({ children }: { children: ReactNode }) {
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

const FAST_BAR_DURATION = "0.5s";
const SLOW_BAR_DELAY = "0.4s";
const SLOW_BAR_DURATION = "1.2s";
/** 느린 막대(쓰기) 끝난 뒤 화살표 */
const ARROW_DELAY_AFTER_SLOW_START = 0.15;
const ARROW_DURATION = "0.45s";
const CARD_GAP_AFTER_ARROW = 0.22;

function SkillBar({
  score,
  label,
  variant,
  barSpeed,
  play,
  reducedMotion,
}: {
  score: number;
  label: string;
  variant: "default" | "emphasis";
  barSpeed: "fast" | "slow";
  play: boolean;
  reducedMotion: boolean;
}) {
  const slowEase = "cubic-bezier(0.5, 0.05, 0.45, 1)";
  const fastEase = "cubic-bezier(0.22, 1, 0.36, 1)";

  const fillAnimation =
    barSpeed === "fast"
      ? `${barFill} ${FAST_BAR_DURATION} ${fastEase} forwards`
      : `${barFill} ${SLOW_BAR_DURATION} ${slowEase} ${SLOW_BAR_DELAY} forwards`;

  const scoreAnim =
    variant === "emphasis"
      ? `${scoreRevealEmphasis} 0.35s ease-out forwards`
      : `${scoreRevealDefault} 0.35s ease-out forwards`;

  const scoreDelay =
    barSpeed === "fast"
      ? "0.32s"
      : `calc(${SLOW_BAR_DELAY} + ${SLOW_BAR_DURATION} - 0.12s)`;

  const showStatic = reducedMotion || !play;

  return (
    <Stack align="center" spacing={2} w="70px" h="100%" minH={0} justify="flex-end">
      <Box
        flex={1}
        w="70px"
        minH="160px"
        position="relative"
        borderRadius="4px"
        bg={variant === "emphasis" ? "rgba(195,202,254,0.4)" : "rgba(222,225,253,0.3)"}
      >
        <Box position="absolute" bottom={0} left={0} right={0} h={`${score}%`} overflow="hidden" borderRadius="inherit">
          <Box
            h="100%"
            w="100%"
            borderTopLeftRadius="3px"
            borderTopRightRadius="10px"
            borderBottomRadius="3px"
            sx={{
              transformOrigin: "bottom center",
              background: "linear-gradient(to bottom, #909bff 0%, #ebf0ff 100%)",
              opacity: variant === "emphasis" ? 0.9 : 0.3,
              ...(showStatic
                ? { transform: "scaleY(1)" }
                : {
                    transform: "scaleY(0)",
                    animation: fillAnimation,
                  }),
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none !important",
                transform: "scaleY(1) !important",
              },
            }}
          />
        </Box>
        <Text
          fontSize="13.3px"
          fontWeight="600"
          color={variant === "emphasis" ? "white" : "#5B54C4"}
          textAlign="center"
          position="absolute"
          top={`calc(${100 - score}% + 30px)`}
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={1}
          sx={{
            ...(showStatic
              ? { opacity: variant === "emphasis" ? 1 : 0.5 }
              : {
                  opacity: 0,
                  animation: `${scoreAnim}`,
                  animationDelay: scoreDelay,
                }),
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none !important",
              opacity: variant === "emphasis" ? "1 !important" : "0.5 !important",
            },
          }}
        >
          {score}점
        </Text>
      </Box>
      <Box
        bg="#e5e1ff"
        border={variant === "emphasis" ? "1px solid #9b8afb" : "1px solid transparent"}
        px="10px"
        py="6px"
        borderRadius="5px"
        minH="37px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontWeight="700" fontSize="19px" color={variant === "emphasis" ? "#5b54c4" : "#bcb8f2"} textAlign="center" whiteSpace="nowrap">
          {label}
        </Text>
      </Box>
    </Stack>
  );
}

export function OperationSystemRecommendationSection() {
  const chartRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [inView, setInView] = useState(false);
  const play = reducedMotion || inView;

  useEffect(() => {
    if (reducedMotion) return;
    const el = chartRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  const slowDelaySec = parseFloat(SLOW_BAR_DELAY);
  const slowDurSec = parseFloat(SLOW_BAR_DURATION);
  const arrowDelaySec = slowDelaySec + slowDurSec + ARROW_DELAY_AFTER_SLOW_START;
  const cardDelaySec = arrowDelaySec + parseFloat(ARROW_DURATION) + CARD_GAP_AFTER_ARROW;

  const arrowAnim = reducedMotion
    ? undefined
    : play
      ? `${arrowAppear} ${ARROW_DURATION} cubic-bezier(0.34, 1.2, 0.64, 1) ${arrowDelaySec}s both`
      : undefined;

  const cardAnim = reducedMotion
    ? undefined
    : play
      ? `${cardAppear} 0.5s ease-out ${cardDelaySec}s both`
      : undefined;

  return (
    <Box bg="white" py={{ base: 16, lg: "120px" }} px={{ base: 6, lg: 10, xl: "120px" }}>
      <Stack maxW="1200px" mx="auto" spacing={{ base: 10, lg: "60px" }} align="center">
        <Stack spacing="30px" align="center" data-aos="fade-up">
          <Box bg="#efe9ff" px="12px" py="6px" borderRadius="40px">
            <Text fontWeight="600" fontSize="16px" lineHeight="24px" color="#451f77">
              자세히
            </Text>
          </Box>
          <Text
            as="h2"
            textAlign="center"
            fontWeight="600"
            fontSize={{ base: "32px", lg: "48px" }}
            lineHeight={{ base: "42px", lg: "60px" }}
            color="black"
          >
            오늘의 학습은 이렇게 <GradientText>추천</GradientText>됩니다.
          </Text>
          <Text
            fontWeight="500"
            fontSize={{ base: "18px", lg: "22px" }}
            lineHeight="26px"
            color="#667085"
            textAlign="center"
            whiteSpace="pre-line"
          >
            학생별 읽기·쓰기·듣기·말하기 데이터를 기반으로{"\n"}AI가 부족한 영역을 보완하도록 학습을 자동 구성합니다.
          </Text>
        </Stack>

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap="20px"
          w="full"
          align={{ base: "stretch", lg: "flex-start" }}
          justify="center"
        >
          <Box
            flexShrink={0}
            w={{ base: "full", lg: "380px" }}
            minH={{ base: "auto", lg: "480px" }}
            bg="white"
            border="2px solid"
            borderColor="#f2f4f7"
            borderRadius="20px"
            p="40px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            data-aos="fade-up"
          >
            <Flex position="relative" align="center" justify="center" w="100px" h="100px" bg="#F7F4FF" borderRadius="50%">
              <Flex align="center" justify="center" w="100px" h="100px">
                <Image src={`${R}/chart-icon.png`} alt="" style={{ objectFit: "contain" }} width={42} height={35} sizes="100px" />
              </Flex>
            </Flex>

            <Stack spacing="20px" color="#667085" fontSize="22px" lineHeight="26px">
              <Text fontWeight="600" textAlign="left">
                학습할수록 정교해지는 추천
              </Text>
              <Text fontWeight="500" whiteSpace="pre-line">
                {`학생이 학습을 많이 할수록 \n데이터가 쌓이고, \n추천의 정확도도 올라가요.`}
              </Text>
            </Stack>
          </Box>

          <Flex
            ref={chartRef}
            flex={1}
            minH={{ base: "400px", lg: "480px" }}
            h={{ base: "auto", lg: "480px" }}
            bg="#f9fafb"
            borderRadius="20px"
            position="relative"
            overflow="hidden"
            data-aos="fade-up"
            flexDirection="row"
            align="center"
            gap="20px"
            px={{ base: 4, lg: "70px" }}
            py={{ base: 6, lg: "38px" }}
            flexWrap="wrap"
            justify="center"
          >
            <Flex
              align="stretch"
              justify="center"
              gap={{ base: 6, lg: "20px" }}
              flexWrap="wrap"
              h="100%"
              minW={0}
              minH={0}
              flex={{ base: "1 1 100%", lg: "1 1 auto" }}
            >
              <SkillBar score={90} label="읽기" variant="default" barSpeed="fast" play={play} reducedMotion={reducedMotion} />
              <SkillBar score={60} label="쓰기" variant="emphasis" barSpeed="slow" play={play} reducedMotion={reducedMotion} />
              <SkillBar score={80} label="듣·말" variant="default" barSpeed="fast" play={play} reducedMotion={reducedMotion} />
            </Flex>

            <Box
              position="relative"
              w="143px"
              h="88px"
              flexShrink={0}
              sx={{
                opacity: reducedMotion || !play ? 1 : 0,
                transform: reducedMotion || !play ? "scale(1)" : "scale(0.88)",
                animation: arrowAnim,
                "@media (prefers-reduced-motion: reduce)": {
                  animation: "none !important",
                  opacity: "1 !important",
                  transform: "scale(1) !important",
                },
              }}
            >
              <Image src={`${R}/arrow-union.svg`} alt="" fill style={{ objectFit: "contain" }} sizes="142px" />
              <Text
                position="absolute"
                left="50%"
                top="50%"
                transform="translate(-50%, -50%)"
                fontWeight="700"
                fontSize="18px"
                color="white"
                textAlign="center"
                whiteSpace="nowrap"
                w="full"
                px={1}
              >
                학습 결과 반영
              </Text>
            </Box>

            <Box
              position="relative"
              w={{ base: "200px", lg: "227px" }}
              h="249px"
              borderRadius="20px"
              border="1px solid"
              borderColor="#d0d5dd"
              bgGradient="linear(to-b, #d0d5ff, #f6f4ff)"
              flexShrink={0}
              sx={{
                opacity: reducedMotion || !play ? 1 : 0,
                transform: reducedMotion || !play ? "none" : "translateX(18px) scale(0.96)",
                animation: cardAnim,
                "@media (prefers-reduced-motion: reduce)": {
                  animation: "none !important",
                  opacity: "1 !important",
                  transform: "none !important",
                },
              }}
            >
              <Box position="absolute" left="50%" top="24px" transform="translateX(-50%)" w="160px" h="160px">
                <Image src={`${R}/writing-illustration.png`} alt="" fill style={{ objectFit: "contain" }} sizes="160px" />
              </Box>
              <Text
                position="absolute"
                bottom="16px"
                left="50%"
                transform="translateX(-50%)"
                fontWeight="700"
                fontSize="19px"
                color="#5b54c4"
                whiteSpace="nowrap"
              >
                쓰기 학습 추천
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
}
