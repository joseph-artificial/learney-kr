 "use client";

import { useEffect, useState } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";

export function InstitutionContentSafetySection() {
  const rows = [
    {
      chip: "콘텐츠",
      title: "교육과정 기반 콘텐츠",
      desc: "러니 콘텐츠는 교육부 국어 성취 기준 기반으로 설계되어, 교과 목표에서 벗어난 내용을 제한해요.\n현직 교사 출신 콘텐츠 리더가 기획부터 검수까지 전 과정에 참여해요.",
      isSky: true,
    },
    {
      chip: "학습 환경",
      title: "폐쇄형 학습 환경",
      desc: "외부 링크 없이 운영되는 폐쇄형 학습 환경으로, 학생이 부적절한 콘텐츠에 노출되지 않아요.\nAI 튜터도 학습 목적에 한해 작동해, 학습과 무관한 주제나 부적절한 대화로 확장되지 않아요.",
      isSky: false
    },
    {
      chip: "개인정보",
      title: "개인정보 보호",
      desc: "교사가 승인된 학생만 초대하는 폐쇄형 그룹 관리 시스템으로 학생의 데이터를 안전하게 보호해요.\n이용약관 및 개인정보 처리방침도 언제든 확인할 수 있어요.",
      isSky: true
    },
    {
      chip: "적합성",
      title: "연령 적합성",  
      desc: "초등학교 3학년부터 고등학교까지 학년군별로 콘텐츠 난이도와 학습 목표가 구분되어 설계돼요. \n폭력성, 선정성, 비속어 등 유해 요소가 전혀 없는 교육 전용 콘텐츠만 제공해요.",
      isSky: false
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rows.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [isAutoPlay, rows.length]);

  return (
    <Box as="section" py={{ base: 16, lg: "120px" }} px={{ base: 4, lg: 8 }} position="relative" overflow="hidden">
      <Box position="absolute" inset={0} bgImage="url('/images/apply-target/institution/content-safety-bg.png')" bgSize="cover" bgPosition="center" bgRepeat="no-repeat" opacity={0.5} />
      <Box position="absolute" inset={0} bg="rgba(0, 0, 0, 0.7)" />

      <Stack position="relative" maxW="1200px" mx="auto" gap={{ base: 10, lg: "60px" }}>
        <Stack gap={{ base: 6, lg: "25px" }} data-aos="fade-up">
          <Flex gap={4} wrap="wrap">
            <Flex h="36px" px="14px" py="2px" borderRadius="30px" bg="#DDF4FD" align="center" justify="center">
              <Text color="#4DABCE" fontWeight="600" fontSize="16px" lineHeight="24px">
                도입 기준 03
              </Text>
            </Flex>
            <Flex h="36px" px="14px" py="2px" borderRadius="30px" borderWidth="1px" borderColor="#DDF4FD" align="center" justify="center">
              <Text color="#DDF4FD" fontWeight="600" fontSize="16px" lineHeight="24px">
                콘텐츠 안전성
              </Text>
            </Flex>
          </Flex>

          <Text color="white" fontWeight="600" fontSize={{ base: "34px", lg: "48px" }} lineHeight={{ base: "44px", lg: "60px" }}>
            {"교육 환경에 적합한 "}
            <Box as="span" bgGradient="linear(to-r, #CBF6FF, #9EBBFF)" bgClip="text">
              안전한 학습 환경
            </Box>
            이에요.
          </Text>

          <Text color="white" fontWeight="500" fontSize={{ base: "24px", lg: "24px" }} lineHeight={{ base: "34px", lg: "34px" }}>
            학생이 사용하는 서비스인 만큼, 콘텐츠 안전성은 타협할 수 없는 기준이에요.
          </Text>
        </Stack>

        <Stack gap={{ base: 4, lg: "26px" }} align="center" w="full" data-aos="fade-up" data-aos-delay="80">
          {rows.map((row, idx) => {
            const isActive = idx === activeIndex;
            return (
            <Flex
              key={row.title}
                w={isActive ? { base: "100%", lg: "950px" } : { base: "100%", lg: "730px" }}
                minH={isActive ? { base: "360px", lg: "248.9356231689453px" } : { base: "300px", lg: "89.78912353515625px" }}
              bg="rgba(240, 247, 252, 0.25)"
              borderRadius={isActive ? "20px" : "15px"}
              px={isActive ? { base: 5, lg: '40px' } : { base: 4, lg: "30px" }}
              py={isActive ? { base: 6, lg: '40px' } : { base: 4, lg: "30px" }}
              direction="column"
              align="flex-start"
              gap={isActive ? 3 : 0}
              cursor="pointer"
              // transition="all 0.35s ease"
              boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.05)"
              onClick={() => {
                setActiveIndex(idx);
                setIsAutoPlay(false);
              }}
            >
              <Box
                bg={row.isSky ? "#D8CDFF" : "#ABEDFF"}
                px={row.isSky ? "13px" : "10px"}
                py={row.isSky ? "6px" : "5px"}
                borderRadius={row.isSky ? "7px" : "5px"}
              >
                <Text color={"#5D5D5D"} fontWeight="600" fontSize={isActive ? "16px" : "12px"} lineHeight={isActive ? "26px" : "20px"}>
                  {row.chip}
                </Text>
              </Box>

              {isActive ? (
                <>
                  <Text color={row.isSky ? "#D8CDFF" : "#ABEDFF"} fontWeight="600" fontSize={{ base: "28px", lg: "32px" }} lineHeight={{ base: "38px", lg: "44px" }}>
                    {idx + 1}. {row.title}
                  </Text>
                  <Text color="white" fontWeight="500" fontSize={{ base: "20px", lg: "22px" }} lineHeight={{ base: "30px", lg: "32px" }} whiteSpace="pre-line">
                    {row.desc}
                  </Text>
                </>
              ) : null}
            </Flex>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
}