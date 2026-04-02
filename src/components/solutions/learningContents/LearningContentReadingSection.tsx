"use client";

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const GREEN_GRADIENT = "linear-gradient(90deg, #65e2b0 0%, #00a98a 100%)";

function GradientGreen({ children }: { children: React.ReactNode }) {
  return (
    <Text
      as="span"
      sx={{
        backgroundImage: GREEN_GRADIENT,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </Text>
  );
}

type TabId = "read" | "write" | "speak";

const TABS: { id: TabId; label: string }[] = [
  { id: "read", label: "읽기 학습" },
  { id: "write", label: "쓰기 학습" },
  { id: "speak", label: "듣기·말하기 학습" },
];

const READ_STEPS: { title: string; desc: string }[] = [
  { title: "STEP 1. 단어 학습", desc: "꼭 필요한 핵심 단어부터 짚고 시작해요." },
  { title: "STEP 2. 끊어 읽고 요약하기", desc: "중요한 내용을 짧게 정리해요." },
  { title: "STEP 3. 구조화하기", desc: "글이 어떤 흐름으로 전개되는지 익혀요." },
  { title: "STEP 4. 문제 풀이", desc: "문제를 풀며 세부 내용을 파악해요." },
];

const WRITE_STEPS: { title: string; desc: string }[] = [
  { title: "STEP 1. 틀 만들기", desc: "글의 목적에 맞는 글쓰기를 학습해요." },
  { title: "STEP 2. 생각 열기", desc: "질문에 답하며 아이디어를 꺼내요." },
  { title: "STEP 3. 개요 잡기", desc: "아이디어를 글의 구조에 맞게 배치해요." },
  { title: "STEP 4. 초고 쓰기", desc: "개요를 바탕으로 실제 글을 써요." },
  { title: "STEP 5. 수정하기·정리하기", desc: "AI의 피드백을 바탕으로 다듬어요." },
];

const SPEAK_STEPS: { title: string; desc: string }[] = [
  { title: "STEP 1. 틀 만들기", desc: "주제와 핵심 포인트를 살펴봐요." },
  { title: "STEP 2. 장면 듣기", desc: "뉴스 등 음성 콘텐츠를 듣고 내용을 파악해요." },
  { title: "STEP 3. 말하기 미션", desc: "마이크로 직접 말하고, AI가 피드백을 줘요." },
  { title: "STEP 4. 정리하기", desc: "결과를 확인하고 학습을 마무리해요." },
];

const TAB_COPY: Record<
  TabId,
  { lead: string; emphasis: string; steps: { title: string; desc: string }[]; index: number; images: string[] }
> = {
  read: {
    lead: "대충 읽고 넘어가지 않도록,",
    emphasis: "읽기 학습",
    steps: READ_STEPS,
    index: 1,
    images: ['/images/solutions/learning-content/read-1.png', '/images/solutions/learning-content/read-2.png', '/images/solutions/learning-content/read-3.png', '/images/solutions/learning-content/read-4.png']
  },
  write: {
    lead: "생각을 글로 옮기는 과정,",
    emphasis: "쓰기 학습",
    steps: WRITE_STEPS,
    index: 2,
    images: ['/images/solutions/learning-content/write-1.png', '/images/solutions/learning-content/write-2.png', '/images/solutions/learning-content/write-3.png', '/images/solutions/learning-content/write-4.png', '/images/solutions/learning-content/write-5.png']
  },
  speak: {
    lead: "듣고 이해하고, 표현하기",
    emphasis: "듣기·말하기 학습",
    steps: SPEAK_STEPS,
    index: 3,
    images: ['/images/solutions/learning-content/speak-1.png', '/images/solutions/learning-content/speak-2.png', '/images/solutions/learning-content/speak-3.png', '/images/solutions/learning-content/speak-4.png']
  },
};

function TabChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <Box
      as="button"
      type="button"
      px="12px"
      py="6px"
      borderRadius="40px"
      border="none"
      cursor="pointer"
      bg={active ? "#dbfae1" : "#f2f4f7"}
      boxShadow={active ? "0px 0px 10px 0px rgba(0,0,0,0.1)" : "none"}
      onClick={onClick}
    >
      <Text
        fontWeight="600"
        fontSize="16px"
        lineHeight="24px"
        color={active ? "#00a98a" : "#98a2b3"}
        whiteSpace="nowrap"
      >
        {label}
      </Text>
    </Box>
  );
}

function StepRow({ title, desc, isSelected, onClick }: { title: string; desc: string; isSelected: boolean; onClick: () => void }) {
  return (
    <Box bg={isSelected ? "#F3FBF8" : "#f9fafb"} border={"1px solid"} borderColor={isSelected ? "#A0E7CA" : "#eaecf0"} borderRadius="10px" px="20px" py="15px" w="full" onClick={onClick} cursor="pointer">
      <Flex gap="10px" align="flex-start" wrap="wrap" fontSize="16px" lineHeight="24px" color="#344054">
        <Text as="span" fontWeight="600">
          {title}
        </Text>
        <Text as="span" fontWeight="400" >
          {desc}
        </Text>
      </Flex>
    </Box>
  );
}




export function LearningContentReadingSection() {
  const [tab, setTab] = useState<TabId>("read");
  const copy = TAB_COPY[tab];
  const [imageIndex, setImageIndex] = useState(0);
  const [isAutoSlide, setIsAutoSlide] = useState(true);

  useEffect(() => {
    
    const interval = setInterval(() => {
        if (isAutoSlide) {
          setImageIndex((prev) => (prev + 1) % copy.images.length);
        }
      }, 2000);
      return () => clearInterval(interval);
  }, [copy.images.length, isAutoSlide, imageIndex]);

  return (
    <Box bg="#fcfcfd" pt={{ base: 8, lg: "40px" }} pb={{ base: 16, lg: "120px" }} px={{ base: 6, lg: 10, xl: "120px" }}>
      <Stack maxW="1200px" mx="auto" gap={{ base: 8, lg: "40px" }} align="center">
        <Flex gap="20px" wrap="wrap" justify="center" data-aos="fade-up">
          {TABS.map((t) => (
            <TabChip
              key={t.id}
              label={t.label}
              active={tab === t.id}
              onClick={() => {
                setTab(t.id);
                setImageIndex(0);
              }}
            />
          ))}
        </Flex>

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 8, lg: "70px" }}
          align={{ base: "stretch", lg: "flex-start" }}
          w="full"
          data-aos="fade-up"
          data-aos-delay="60"
        >
          <Stack flex="0 0 auto" w={{ base: "full", lg: "500px" }} gap="30px" data-aos="fade-up">
            <Flex
              w="50px"
              h="50px"
              borderRadius="30px"
              bg="#dbfae1"
              align="center"
              justify="center"
            >
              <Text fontWeight="600" fontSize="24px" lineHeight="24px" color="#00a98a">
                {copy.index}
              </Text>
            </Flex>
            <Text
              fontWeight="600"
              fontSize={{ base: "28px", lg: "36px" }}
              lineHeight={{ base: "38px", lg: "44px" }}
              color="#1d2939"
            >
              {copy.lead}
              <br />
              <GradientGreen>{copy.emphasis}</GradientGreen>
            </Text>
            <Stack gap="10px" w="full" >
              {copy.steps.map((s, index) => (
                <StepRow key={s.title} title={s.title} desc={s.desc} isSelected={imageIndex === copy.steps.indexOf(s)} onClick={() => {
                  setImageIndex(index);
                  setIsAutoSlide(false);
                }} />
              ))}
            </Stack>
          </Stack>

          <Box flex="1" minW={0} w="full" data-aos="fade-left" data-aos-delay="120">
            <Stack align="center" gap={4}>
                <Box
                  w="full"
                  maxW="680px"
                  mx="auto"
                  minH={{ base: "360px", lg: "500px" }}
                  borderRadius="20px"
                  border="1px solid #f2f4f7"
                  position="relative"
                  overflow="hidden"
                  sx={{
                    background: "linear-gradient(119.37deg, #effcf6 0.1%, #f9fafb 112%)",
                  }}
                  p={{ base: 4, lg: "50px 41px" }}
                >
                <Image src={copy.images[imageIndex]} alt="reading" fill style={{ padding: '50px 41px' }} />
                <Flex position="absolute" bottom="20px" left="0" right="0" justify="center" gap="10px">
                  {copy.images.length > 1 && (
                    <Flex justify="center" gap="10px">
                      {copy.images.map((image, index) => (
                        <Box key={index} w="10px" h="10px" borderRadius="50%" bg={index === imageIndex ? "#98A2B3" : "#EAECF0"} cursor="pointer" onClick={() => {
                          setImageIndex(index);
                          setIsAutoSlide(false);
                        }} />
                      ))}
                    </Flex>
                  )}
                </Flex>
              </Box>
              </Stack>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
