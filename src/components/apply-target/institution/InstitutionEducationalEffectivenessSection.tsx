"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const growBar = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

function ScoreBar({
  label,
  score,
  width,
  delayMs = 0,
  shouldAnimate = true,
}: {
  label: string;
  score: string;
  width: string;
  delayMs?: number;
  shouldAnimate?: boolean;
}) {
  return (
    <Flex align="center" gap={3} w="full">
      <Flex
        minW={{ base: "86px", lg: "122px" }}
        h={{ base: "32px", lg: "37px" }}
        bg="#E1E9FF"
        borderRadius={'5px'}
        align="center"
        justify="center"
      >
        <Text color="#5472C4" fontWeight="700" fontSize={{ base: "16px", lg: "19px" }} lineHeight="30px">
          {label}
        </Text>
      </Flex>
      <Box
        flex={1}
        h={{ base: "52px", lg: "70px" }}
        bg="#D5DDF0"
        borderTopLeftRadius="3px"
        borderTopRightRadius="10px"
        borderBottomLeftRadius="3px"
        borderBottomRightRadius="10px"
        position="relative"
        overflow="hidden"
      >
        <Flex
          h="full"
          w={width}
          bgGradient="linear(to-r, #EBF0FF 0%, #DCE5FF 15%, #90ACFF 100%)"
          borderTopLeftRadius="3px"
          borderTopRightRadius="3px"
          borderBottomLeftRadius="3px"
          borderBottomRightRadius="20px"
          align="center"
          justify="end"
          px={'30px'}
          transformOrigin="left center"
          transform={shouldAnimate ? undefined : "scaleX(0)"}
          animation={shouldAnimate ? `${growBar} 900ms ease-out both` : undefined}
          style={shouldAnimate ? { animationDelay: `${delayMs}ms` } : undefined}
          boxShadow="inset 0 0 10px rgba(255,255,255,0.35), 0 0 18px rgba(144,172,255,0.2)"
        >
          <Text
            color="white"
            fontWeight="700"
            fontSize={{ base: "30px", lg: "24px" }}
            lineHeight="27px"
            opacity={shouldAnimate ? 0 : 1}
            animation={shouldAnimate ? `${fadeInUp} 420ms ease-out both` : undefined}
            style={shouldAnimate ? { animationDelay: `${delayMs + 420}ms` } : undefined}
          >
            {score}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}

export function InstitutionEducationalEffectivenessSection() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const hasTriggeredRef = useRef(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const triggerWithDelay = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      window.setTimeout(() => {
        setShouldAnimate(true);
      }, 500);
    };

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    // AOS가 뷰포트 진입 시 섹션에 부여하는 클래스를 기준으로 트리거
    const checkAndTrigger = () => {
      if (sectionEl.classList.contains("aos-animate")) {
        triggerWithDelay();
      }
    };

    checkAndTrigger();

    const observer = new MutationObserver(checkAndTrigger);
    observer.observe(sectionEl, { attributes: true, attributeFilter: ["class"] });
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          triggerWithDelay();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(sectionEl);

    return () => {
      observer.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      as="section"
      bg="#FCFCFD"
      py={{ base: 16, lg: "120px" }}
      px={{ base: 4, lg: 8 }}
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <Stack maxW="1200px" mx="auto" gap={{ base: 10, lg: "60px" }}>
        <Stack gap={{ base: 6, lg: "25px" }}>
          <Flex gap={4} wrap="wrap">
            <Flex h="36px" px="14px" py="2px" borderRadius="30px" bg="#DDF4FD" align="center" justify="center">
              <Text color="#4DABCE" fontWeight="600" fontSize="16px" lineHeight="24px">
                도입 기준 02
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
                교육적 효과성
              </Text>
            </Flex>
          </Flex>

          <Text color="#1D2939" fontWeight="600" fontSize={{ base: "34px", lg: "48px" }} lineHeight={{ base: "44px", lg: "60px" }}>
            <Box as="span" bgGradient="linear(to-r, #43B9D1, #933CB8)" bgClip="text">
              실증 데이터
            </Box>
            {"와 제3자 평가로 검증했어요."}
          </Text>

          <Text color="#1D2939" fontWeight="500" fontSize={{ base: "24px", lg: "24px" }} lineHeight={{ base: "34px", lg: "34px" }} whiteSpace="pre-line">
            {`"효과가 있는 건지"는 도입 전에 가장 불안한 부분이에요.\n러니는 제3자 기관의 엄정한 평가와 현장 실증 데이터로 이 질문에 답해요.`}
          </Text>
        </Stack>

        <Flex direction={{ base: "column", xl: "row" }} gap={6} w="full">
          <Box flex={1} minW={0} borderRadius="20px" overflow="hidden" boxShadow="0px 0px 10px 0px rgba(0,0,0,0.1)" >
            <Flex bg="#F0F7FC" px={{ base: 5, lg: 9 }} py={{ base: 8, lg: 10 }} h={{ base: "360px", lg: "425px" }} align="center" justify="end" flexDirection="column" width={'100%'} height={'100%'}>
              <Stack gap={4} width={'100%'} >
                <ScoreBar label="교육적 유용성" score="4.95/5.0" width="98.2%" delayMs={0} shouldAnimate={shouldAnimate} />
                <ScoreBar label="시스템 사용성" score="4.89/5.0" width="96.6%" delayMs={220} shouldAnimate={shouldAnimate} />
                <ScoreBar label="감성" score="4.51/5.0" width="92.6%" delayMs={440} shouldAnimate={shouldAnimate} />
              </Stack>
              <Text mt={7} textAlign="center" color="#98A2B3" fontWeight="600" fontSize="16px" lineHeight="30px">
                인수레 실증 평가 점수
              </Text>
            </Flex>
            <Stack bg="white" px={8} py={{ base: 8, lg: "30px" }} align="center" gap={4}>
              <Flex gap={2} align="center" wrap="wrap" justify="center">
                <Text color="#475467" fontWeight="700" fontSize="24px" lineHeight="30px">
                  충남교육청 교사 실증 평가
                </Text>
                <Box px={2.5} py={1} borderRadius="5px" bg="#F0F7FC">
                  <Text color="#2A2C91" fontWeight="700" fontSize="24px" lineHeight="30px">
                    4.95/5점
                  </Text>
                </Box>
              </Flex>
              <Text color="#475467" fontWeight="500" fontSize="22px" lineHeight="32px" textAlign="center" whiteSpace="pre-line">
                {`충남교육청 소속 초·중·고 현장 교사 10명이 참여한\n실증 평가에서, 교육공학 및 HCI 관점으로 개발된\n평가 도구를 기반으로 엄정하게 평가했어요.`}
              </Text>
            </Stack>
          </Box>

          <Box flex={1} minW={0} borderRadius="20px" overflow="hidden" boxShadow="0px 0px 10px 0px rgba(0,0,0,0.1)">
            <Flex bg="#F5F2FA" h={{ base: "360px", lg: "425px" }} align="center" justify="center">
              <Box as="img" src="/images/apply-target/institution/essa.png" alt="" w={{ base: "170px", lg: "234px" }} h={{ base: "170px", lg: "234px" }} objectFit="contain" />
            </Flex>
            <Stack bg="white" px={8} py={{ base: 8, lg: "30px" }} align="center" gap={4}>
              <Flex gap={2} align="center" wrap="wrap" justify="center">
                <Text color="#475467" fontWeight="700" fontSize="24px" lineHeight="30px">
                  미국
                </Text>
                <Box px={2.5} py={1} borderRadius="5px" bg="#FBF4FF">
                  <Text color="#692A91" fontWeight="700" fontSize="24px" lineHeight="30px">
                    ESSA TIER IV
                  </Text>
                </Box>
                <Text color="#475467" fontWeight="700" fontSize="24px" lineHeight="30px">
                  인증 획득
                </Text>
              </Flex>
              <Text color="#475467" fontWeight="500" fontSize="22px" lineHeight="32px" textAlign="center" whiteSpace="pre-line">
                {`미국 에듀테크에서 요구하는 효과성 증거 수준의\n4단계 인증을 획득했어요. 수백 개 학교에서 적용된\n실증 데이터를 보유하고 있어요.`}
              </Text>
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
