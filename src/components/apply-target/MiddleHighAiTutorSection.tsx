"use client";

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CheckIcon from "@/components/icon/CheckIcon";
import { MiddleHighTutorChatCard, TutorChatCard } from "./ElementaryTutorSection";

const CHECK_ITEMS = [
  "서술형 문항에 답하면,\nAI 튜터 아티쌤이 피드백을 제공해요.",
  "교사가 모두에게 피드백을 주기 어려워도\n괜찮아요. 맞춤형 피드백은 아티쌤이 책임져요.",
];

export function MiddleHighAiTutorSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slides = [
    "/images/etc/middle-high.png",
    "/images/etc/middle-high.png",
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [isAutoPlay, slides.length]);

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlay(false);
  };

  return (
    <Box bg="white" py={{ base: 16, lg: "120px" }} px={{ base: 4, lg: "120px" }}>
      <Stack maxW="1200px" mx="auto" gap={{ base: 10, lg: "40px" }}>
        <Stack gap={{ base: 6, lg: "33px" }} data-aos="fade-up">
          <Flex gap={4} wrap="wrap">
            <Flex h="36px" align="center" justify="center" px="14px" py="2px" bg="#E8F4F5" borderRadius="30px">
              <Text color="#0E9384" fontWeight="600" fontSize="16px" lineHeight="24px">
                주요 기능 03
              </Text>
            </Flex>
            <Flex h="36px" align="center" justify="center" px="14px" py="2px" border="1px solid #0E9384" borderRadius="30px">
              <Text color="#0E9384" fontWeight="600" fontSize="16px" lineHeight="24px">
                교과 연계 학습
              </Text>
            </Flex>
          </Flex>

          <Text color="#1D2939" fontWeight="600" fontSize={{ base: "38px", lg: "48px" }} lineHeight={{ base: "52px", lg: "60px" }}>
            AI 튜터와 함께 성취 기준에 도달해요.
            <br />
            <Box as="span" bgGradient="linear(to-r, #43D1BC 0%, #009B84 100%)" bgClip="text" color="transparent">
              교과 연계 학습
            </Box>
          </Text>
        </Stack>

        <Flex direction={{ base: "column", xl: "row" }} gap={{ base: 8, xl: "60px" }} align="center">
          <Stack flex={1} gap={5} pb={'60px'} data-aos="fade-right" data-aos-delay="60">
            <Text color="#1D2939" fontWeight="600" fontSize={{ base: "24px", lg: "28px" }} lineHeight={{ base: "34px", lg: "40px" }} whiteSpace="pre-line">
              {"읽고 문제 풀고 끝?\n직접 생각하고, 표현하고, 피드백받아요."}
            </Text>

            <Box bg="#F9FAFB" border="1px solid #EAECF0" borderRadius="10px" p="30px">
              <Stack gap="10px">
              {CHECK_ITEMS.map((item) => (
                <Flex key={item} gap="10px" align="flex-start">
                  <Box pt="6px">
                    <CheckIcon boxSize="24px" color="#667085" />
                  </Box>
                  <Text color="#667085" fontWeight="500" fontSize={{ base: "20px", lg: "24px" }} lineHeight={{ base: "30px", lg: "32px" }} whiteSpace="pre-line">
                    {item}
                  </Text>
                </Flex>
              ))}
              </Stack>
            </Box>
          </Stack>

          <Stack w={{ base: "full", xl: "609px" }} gap={4} align="center" data-aos="fade-left" data-aos-delay="120">
            <Box
              w={{ base: "full", xl: "588px" }}
              h={{ base: "420px", lg: "538px" }}
              borderRadius="28px"
              overflow="hidden"
              bgGradient="linear(114deg, #EFFCFA 0.1%, #EEF5FC 112%)"
              position="relative"
              pointerEvents="none"
            >
              {slides.map((src, index) => (
                <Box
                  key={`${src}-${index}`}
                  position="absolute"
                  inset={0}
                  opacity={activeIndex === index ? 1 : 0}
                  transform={activeIndex === index ? "translateX(0)" : "translateX(14px)"}
                  transition="opacity 360ms ease, transform 360ms ease"
                  p={{ base: 5, lg: "24px" }}
                >
                  <Flex
                    w="40px"
                    h="40px"
                    borderRadius="20px"
                    bg="white"
                    boxShadow="0px 0px 10px rgba(0,0,0,0.05)"
                    align="center"
                    justify="center"
                    mb="8px"
                    mx={'auto'}
                  >
                    <Box w="18px" h="18.67px" overflow="hidden"  >
                      <Box as="img" src={'/images/apply-target/elementary-feature-intro/question.png'} alt="" w="100%" h="100%" objectFit="contain" />
                    </Box>
                  </Flex>
                  <MiddleHighTutorChatCard
                    cssProps={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                    teacherChatList={index === 0 ? ["제시된 글은 신문 기사입니다.", "먼저 글의 목적을 생각하며 제시문을 읽어 본 후 질문에 대답해 보세요.", "이 글의 주요 목적은 무엇이라고 생각하나요?"] : ["먼저 글의 목적을 생각하며 제시문을 읽어 본 후 질문에 대답해 보세요.", "이 글의 주요 목적은 무엇이라고 생각하나요?"]}
                    chatList={
                      index === 0 ? [
                        {
                          isLeft: false,
                          text: "목적,,? 잘 모르겠어요,,,,ㅠㅠ",
                        },
                        {
                          isLeft: true,
                          text: "좋아요. 이렇게 고민해보는 게 정말 중요해요.",
                        },
                        {
                          isLeft: true,
                          text: "이 글에서는 어떤 내용을 사람들에게 알려주려고 했을까요?",
                        }
                      ] : [
                      {
                        isLeft: false,
                        text: "이 글의 목적은 정보를 전달하는,,,",
                      },
                      {
                        isLeft: true,
                        text: "좋아요! 글의 목적을 잘 이해하고 있네요.",
                      },
                      {
                        isLeft: true,
                        text: "그렇다면 그 목적을 드러내기 위해 글에서는 어떤 내용이나 사례를 사용했을까요?",
                      }
                    ]}
                    alwaysHover={true}
                    hovered={true}
                    visibleIndex={0}
                  />
                </Box>
              ))}
            </Box>

            <Flex gap="8px" justify="center" align="center">
              {slides.map((_, index) => (
                <Box
                  as="button"
                  key={`middle-high-ai-dot-${index}`}
                  aria-label={`${index + 1}번 슬라이드로 이동`}
                  onClick={() => handleIndicatorClick(index)}
                  w={'16px'}
                  h="16px"
                  borderRadius="50%"
                  bg={activeIndex === index ? "#8A8A8A" : "#D9D9D9"}
                  transition="all 0.25s ease"
                />
              ))}
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
}
