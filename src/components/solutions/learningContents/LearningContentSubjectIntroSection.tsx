 "use client";

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VALIDATION_IMG = "/images/solutions/learning-content/validation";

const PUBLISHER_ROWS = [
  ["moef.png", "cheonjae.png", "miraen.png", "visang.png"],
  ["jihaksa.png", "goodbooks.png", "haenaem.png"],
  ["changbi.png", "gyohaksa.png", "donga.png", "geumseong.png"],
];

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
      <Flex minW={{ base: "86px", lg: "122px" }} h={{ base: "32px", lg: "37px" }} bg="#E1E9FF" borderRadius="5px" align="center" justify="center">
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
          px="30px"
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

function PublisherTile({ file }: { file: string }) {
  return (
    <Box
      bg="white"
      borderRadius="5px"
      p="10px"
      w={{ base: "88px", sm: "100px", lg: "108px" }}
      flexShrink={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      opacity={0.85}
    >
      <Box position="relative" w="full" h="36px">
        <Image
          src={`${VALIDATION_IMG}/${file}`}
          alt=""
          fill
          style={{ objectFit: "contain" }}
          sizes="108px"
        />
      </Box>
    </Box>
  );
}

function ChungnamChartCard() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const hasTriggeredRef = useRef(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const triggerWithDelay = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      window.setTimeout(() => {
        setShouldAnimate(true);
      }, 500);
    };

    const cardEl = cardRef.current;
    if (!cardEl) return;

    const checkAndTrigger = () => {
      if (cardEl.classList.contains("aos-animate")) {
        triggerWithDelay();
      }
    };

    checkAndTrigger();

    const observer = new MutationObserver(checkAndTrigger);
    observer.observe(cardEl, { attributes: true, attributeFilter: ["class"] });
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          triggerWithDelay();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(cardEl);

    return () => {
      observer.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <Box
      ref={cardRef}
      maxW="588px"
      w="full"
      mx="auto"
      data-aos="fade-right"
      data-aos-delay="60"
      boxShadow="0px 0px 10px 0px rgba(0,0,0,0.1)"
      borderRadius="20px"
      overflow="hidden"
    >
      <Flex bg="#F0F7FC" px={{ base: 5, lg: 9 }} py={{ base: 8, lg: 10 }} h={{ base: "360px", lg: "425px" }} align="center" justify="end" flexDirection="column" width="100%" height="100%">
        <Stack gap={4} width="100%">
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
  );
}

function CurriculumPublishersCard() {
  return (
    <Box
      maxW="588px"
      w="full"
      mx="auto"
      data-aos="fade-left"
      data-aos-delay="120"
      boxShadow="0px 0px 10px 0px rgba(0,0,0,0.1)"
      borderRadius="20px"
      overflow="hidden"
      mt={'90px'}
    >
      <Box bg="#f5f2fa" px={{ base: 4, lg: 6 }} py={{ base: 8, lg: "109px" }} minH={{ base: "280px", lg: "425px" }}>
        <Stack spacing="20px" align="center" maxW="494px" mx="auto" opacity={0.95}>
          {PUBLISHER_ROWS.map((row) => (
            <Flex key={row.join()} gap={{ base: "12px", lg: "20px" }} justify="center" flexWrap="wrap" w="full">
              {row.map((file) => (
                <PublisherTile key={file} file={file} />
              ))}
            </Flex>
          ))}
        </Stack>
      </Box>
      <Box bg="white" px={{ base: 5, lg: "30px" }} py={{ base: 6, lg: "30px" }}>
        <Stack spacing="16px" align="center" maxW="526px" mx="auto">
          <Flex gap="10px" align="center" justify="center" flexWrap="wrap">
            <Box bg="#fbf4ff" px="10px" py="5px" borderRadius="5px">
              <Text fontWeight="700" fontSize={{ base: "18px", lg: "24px" }} lineHeight="30px" color="#692a91" textAlign="center">
                2022 개정
              </Text>
            </Box>
            <Text fontWeight="700" fontSize={{ base: "18px", lg: "24px" }} lineHeight="30px" color="#475467" textAlign="center">
              교육과정 성취 기준 기반
            </Text>
          </Flex>
          <Text
            fontWeight="500"
            fontSize={{ base: "18px", lg: "24px" }}
            lineHeight="32px"
            color="#667085"
            textAlign="center"
            whiteSpace="pre-line"
          >
            {`초등 3학년부터 고등 1학년까지, \n국어과 성취 기준에 맞춰 학습이 제작돼요. \n동아, 미래엔 등 선생님의 교과서에 활용할 수 있어요.`}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}

export function LearningContentSubjectIntroSection() {
  return (
    <Box bg="white" py={{ base: 16, lg: "120px" }} px={{ base: 6, lg: 10, xl: "120px" }}>
      <Stack maxW="1200px" mx="auto" spacing={{ base: 10, lg: "60px" }} align="center">
        <Stack spacing={{ base: 6, lg: "40px" }} align="center" data-aos="fade-up">
          <Box
            as="img"
            src={`${VALIDATION_IMG}/header-icon.svg`}
            alt=""
            w="60px"
            h="60px"
            flexShrink={0}
            display="block"
          />
          <Text
            as="h2"
            textAlign="center"
            fontWeight="600"
            fontSize={{ base: "28px", lg: "48px" }}
            lineHeight={{ base: "38px", lg: "60px" }}
            color="black"
          >
            교육 전문가가 설계하고, 현장에서 검증했어요.
          </Text>
        </Stack>

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 8, lg: "30px" }}
          align={{ base: "stretch", lg: "flex-start" }}
          justify="center"
          w="full"
          data-aos="fade-up"
        >
          <ChungnamChartCard />
          <CurriculumPublishersCard />
        </Flex>
      </Stack>
    </Box>
  );
}
