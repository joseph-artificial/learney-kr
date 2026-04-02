"use client";

import { MiddleHighTutorChatCard } from "@/components/apply-target/ElementaryTutorSection";
import { MiniCard } from "@/components/ScrollingCardColumn";
import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const BLUE_GRADIENT = "linear-gradient(90deg, #5eccff 0%, #0055a9 76.442%, #00a3a9 100%)";
const STEP_MS = 520;
const FIRST_DELAY_MS = 500;
const AFTER_FIRST_DELAY_MS = 750;

const DIFFICULT_TEACHER_CHAT_LIST = [
  "제시된 글은 신문 기사입니다.",
  "먼저 글의 목적을 생각하며 제시문을 읽어 본 후 질문에 대답해 보세요.",
  "이 글의 주요 목적은 무엇이라고 생각하나요?",
];

const DIFFICULT_CHAT_LIST = [
  { isLeft: false, text: "목적,,? 잘 모르겠어요,,,,ㅠㅠ" },
  { isLeft: true, text: "좋아요. 이렇게 고민해보는 게 정말 중요해요." },
  { isLeft: true, text: "이 글에서는 어떤 내용을 사람들에게 알려주려고 했을까요?" },
];

const ADVANCED_TEACHER_CHAT_LIST = [
  "먼저 글의 목적을 생각하며 제시문을 읽어 본 후 질문에 대답해 보세요.",
  "이 글의 주요 목적은 무엇이라고 생각하나요?",
];

const ADVANCED_CHAT_LIST = [
  { isLeft: false, text: "이 글의 목적은 정보를 전달하는,,," },
  { isLeft: true, text: "좋아요! 글의 목적을 잘 이해하고 있네요." },
  { isLeft: true, text: "그렇다면 그 목적을 드러내기 위해 글에서는 어떤 내용이나 사례를 사용했을까요?" },
];

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <Text
      as="span"
      sx={{
        backgroundImage: BLUE_GRADIENT,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </Text>
  );
}

function ModuleTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Box
      as="button"
      type="button"
      px="12px"
      py="6px"
      borderRadius="40px"
      border="none"
      cursor="pointer"
      bg={active ? "#d1f3fc" : "#f2f4f7"}
      boxShadow={active ? "0px 0px 10px 0px rgba(0,0,0,0.1)" : "none"}
      onClick={onClick}
    >
      <Text fontWeight="600" fontSize="16px" lineHeight="24px" color={active ? "#0082a9" : "#98a2b3"} whiteSpace="nowrap">
        {label}
      </Text>
    </Box>
  );
}
function ComparisonCard({
  mockup,
  title,
  body,
  helperGap = "10px",
  index,
  onHoverStart,
  onHoverEnd,
}: {
  mockup: React.ReactNode;
  title: string;
  body: string;
  helperGap?: string;
  index: number;
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
}) {
  return (
    <Box
      maxW="588px"
      w="full"
      mx="auto"
      onMouseEnter={() => onHoverStart(index)}
      onMouseLeave={onHoverEnd}
      onClick={() => onHoverStart(index)}
      onTouchStart={() => onHoverStart(index)}
    >
      <Box
        minH={{ base: "240px", lg: "500px" }}
        borderTopRadius="20px"
        border="1px solid"
        borderColor="#f2f4f7"
        borderBottom="none"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ base: 3, lg: 6 }}
        py={{ base: 6, lg: 8 }}
        sx={{
          background: "linear-gradient(129.04deg, #e1f5ff 0.1%, #e2f1ff 112%)",
        }}
        position="relative"
      >
        {mockup}
      </Box>
      <Box bg="white" borderBottomRadius="20px" border="1px solid" borderColor="#f2f4f7" borderTop="none" px={5} py={5}>
        <Stack spacing={helperGap} align="center" textAlign="center" maxW="498px" mx="auto" color="#344054">
          <Text fontWeight="600" fontSize="16px" lineHeight="24px" w="full">
            {title}
          </Text>
          <Text fontWeight="400" fontSize="16px" lineHeight="24px" w="full" whiteSpace="pre-line">
            {body}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}

type Module = "linked" | "textbook";

export function LearningContentTutorSection() {
  const [module, setModule] = useState<Module>("linked");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [visibleIndexByCard, setVisibleIndexByCard] = useState([
    DIFFICULT_CHAT_LIST.length - 1,
    ADVANCED_CHAT_LIST.length - 1,
  ]);
  const timeoutsRef = useRef<number[]>([]);

  const clearTimers = () => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  };

  const startChatReveal = (cardIndex: number) => {
    const chatLength = cardIndex === 0 ? DIFFICULT_CHAT_LIST.length : ADVANCED_CHAT_LIST.length;

    clearTimers();
    setHoverIndex(cardIndex);
    setVisibleIndexByCard((prev) => prev.map((v, idx) => (idx === cardIndex ? -1 : v)));

    const firstTimer = window.setTimeout(() => {
      setVisibleIndexByCard((prev) => prev.map((v, idx) => (idx === cardIndex ? 0 : v)));

      for (let idx = 1; idx < chatLength; idx += 1) {
        const timerId = window.setTimeout(() => {
          setVisibleIndexByCard((prev) => prev.map((v, cardIdx) => (cardIdx === cardIndex ? idx : v)));
        }, AFTER_FIRST_DELAY_MS + (idx - 1) * STEP_MS);
        timeoutsRef.current.push(timerId);
      }
    }, FIRST_DELAY_MS);

    timeoutsRef.current.push(firstTimer);
  };

  const stopChatReveal = () => {
    clearTimers();
    setHoverIndex(null);
    setVisibleIndexByCard([DIFFICULT_CHAT_LIST.length - 1, ADVANCED_CHAT_LIST.length - 1]);
  };

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  return (
    <Box>
      <Box bg="#f2fafe" pt={{ base: 16, lg: "120px" }} pb={{ base: 8, lg: "40px" }} px={{ base: 6, lg: 10, xl: "120px" }}>
        <Stack maxW="1200px" mx="auto" spacing="30px" align="center" data-aos="fade-up">
          <Box
            border="1.134px solid"
            borderColor="#5180a9"
            px="13.608px"
            py="6.804px"
            borderRadius="45.361px"
          >
            <Text fontWeight="600" fontSize="18.144px" lineHeight="27.216px" color="#5180a9" whiteSpace="nowrap">
              교과 학습
            </Text>
          </Box>
          <Text
            as="h2"
            textAlign="center"
            fontWeight="600"
            fontSize={{ base: "32px", lg: "48px" }}
            lineHeight={{ base: "42px", lg: "60px" }}
            color="#1d2939"
            whiteSpace={{ base: "normal", lg: "nowrap" }}
          >
            <GradientText>성취 기준</GradientText>에 실질적으로 도달해요
          </Text>
          <Text
            textAlign="center"
            fontWeight="500"
            fontSize={{ base: "16px", lg: "20px" }}
            lineHeight="26px"
            color="#667085"
            whiteSpace="pre-line"
          >
            {`문해력 학습이 "기초 체력"을 만드는 거라면, 교과 학습은 그 체력을 "수업 성과"로 연결하는 거예요. `}
            {"\n"}
            교과 학습에는 두 가지 모듈이 포함되어 있어요.
          </Text>
        </Stack>
      </Box>

      <Box bg="#f2fafe" pt={{ base: 6, lg: "40px" }} pb={{ base: 16, lg: "120px" }} px={{ base: 6, lg: 10, xl: "120px" }}>
        <Stack maxW="1200px" mx="auto" spacing={{ base: 8, lg: "40px" }} align="center">
          <Flex gap="20px" wrap="wrap" justify="center" data-aos="fade-up">
            <ModuleTab label="교과 연계 학습" active={module === "linked"} onClick={() => setModule("linked")} />
            <ModuleTab label="교과서 학습" active={module === "textbook"} onClick={() => setModule("textbook")} />
          </Flex>

          {module === "linked" ? (
            <Stack spacing={{ base: 8, lg: "40px" }} w="full" align="center" data-aos="fade-up" data-aos-delay="60">
              <Stack spacing="30px" align="center" w="full" data-aos="fade-up" data-aos-delay="80">
                <Flex
                  w="50px"
                  h="50px"
                  borderRadius="30px"
                  bg="#d1f3fc"
                  align="center"
                  justify="center"
                >
                  <Text fontWeight="600" fontSize="24px" lineHeight="24px" color="#0082a9">
                    1
                  </Text>
                </Flex>
                <Text
                  textAlign="center"
                  fontWeight="600"
                  fontSize={{ base: "26px", lg: "36px" }}
                  lineHeight={{ base: "34px", lg: "44px" }}
                  color="#1d2939"
                >
                  AI 튜터와 대화하는 <GradientText>교과 연계 학습</GradientText>
                </Text>
                <Box
                  bg="#f9fafb"
                  border="1px solid"
                  borderColor="#eaecf0"
                  borderRadius="10px"
                  p={5}
                  w="full"
                  maxW="1091px"
                >
                  <Stack spacing="10px" textAlign="center" fontSize="20px" lineHeight="26px">
                    <Text fontWeight="600" color="#344054">
                      왜 교과 연계 학습을 대화형으로 설계했을까요?
                    </Text>
                    <Text fontWeight="500" color="#667085">
                      성취 기준은 모두에게 같은 목표지만, 도달하는 방식은 학생마다 다릅니다. 러니는 AI 튜터를 통해 학생마다 다른 학습 경로를
                      제공합니다.
                    </Text>
                  </Stack>
                </Box>
              </Stack>

              <Flex
                direction={{ base: "column", lg: "row" }}
                gap={{ base: 8, lg: "24px" }}
                align="stretch"
                justify="center"
                w="full"
                data-aos="fade-up"
                data-aos-delay="120"
              >
                <ComparisonCard
                  index={0}
                  onHoverStart={startChatReveal}
                  onHoverEnd={stopChatReveal}
                  mockup={
                    <MiddleHighTutorChatCard
                      cssProps={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      teacherChatList={DIFFICULT_TEACHER_CHAT_LIST}
                      chatList={DIFFICULT_CHAT_LIST}
                      hovered={hoverIndex === 0}
                      visibleIndex={visibleIndexByCard[0]}
                    />
                  }
                  title="어려워하는 학생에게는?"
                  body={"정답을 바로 알려주지 않고,\n힌트와 질문으로 스스로 답에 도달하도록 돕습니다."}
                />
                <ComparisonCard
                  index={1}
                  onHoverStart={startChatReveal}
                  onHoverEnd={stopChatReveal}
                  mockup={
                    <MiddleHighTutorChatCard
                      cssProps={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      teacherChatList={ADVANCED_TEACHER_CHAT_LIST}
                      chatList={ADVANCED_CHAT_LIST}
                      hovered={hoverIndex === 1}
                      visibleIndex={visibleIndexByCard[1]}
                    />
                  }
                  title="잘하는 학생에게는?"
                  body={"추가 질문을 통해 사고를 확장하고,\n더 깊이 있는 이해로 이끌어줍니다."}
                  helperGap="15px"
                />
              </Flex>
            </Stack>
          ) : (
            <Stack spacing="30px" align="center" w="full" data-aos="fade-up" data-aos-delay="60">
                <Flex
                  w="50px"
                  h="50px"
                  borderRadius="30px"
                  bg="#d1f3fc"
                  align="center"
                  justify="center"
                >
                  <Text fontWeight="600" fontSize="24px" lineHeight="24px" color="#0082a9">
                    2
                  </Text>
                </Flex>
                <Text
                  textAlign="center"
                  fontWeight="600"
                  fontSize={{ base: "26px", lg: "36px" }}
                  lineHeight={{ base: "34px", lg: "44px" }}
                  color="#1d2939"
                >
                  교과서를 탄탄하게 보충하는{" "} <GradientText>교과서 학습</GradientText>
                </Text>
                <Box
                  bg="#f9fafb"
                  border="1px solid"
                  borderColor="#eaecf0"
                  borderRadius="10px"
                  p={5}
                  w="full"
                  maxW="1091px"
                >
                  <Stack spacing="10px" textAlign="center" fontSize="20px" lineHeight="26px">
                    <Text fontWeight="600" color="#344054">
                      교과서 학습은 선생님이 교과서로 수업을 진행할 때 함께 쓸 수 있는 보충 학습이에요. 
                    </Text>
                    <Text fontWeight="500" color="#667085">
                      지문 이해부터 어휘까지, 진도에 맞춰 수업에서 다룬 내용을 학생이 제대로 이해했는지 확인하고, 부족한 부분을 보강할 수 있어요.
                    </Text>
                  </Stack>
                </Box>
                <Flex
                  direction={{ base: "column", lg: "row" }}
                  gap={{ base: 8, lg: "24px" }}
                  align="stretch"
                  justify="flex-start"
                  w="full"
                  border={'1px solid #F2F4F7'}
                  borderRadius="20px"
                  px={'70px'}
                  py={'31px'}
                  sx={{
                    background: "linear-gradient(129.04deg, #e1f5ff 0.1%, #e2f1ff 112%)",
                  }}
                  data-aos="fade-up"
                  data-aos-delay="120"
                >
                  <Flex position={'relative'}>
                    <Image src={"/images/solutions/learning-content/textbook-module.png"} alt="textbook-module" width={537} height={339} objectFit="contain" />
                                      
                    <Flex position={'absolute'} bottom={'-20px'} right={'-400px'} gap={'0px'}>
                      <Image src={"/images/solutions/learning-content/textbookCard1.png"} alt="textbook-module" width={260} height={261} objectFit="contain" />
                      <Image src={"/images/solutions/learning-content/textbookCard2.png"} alt="textbook-module" width={260} height={261} objectFit="contain" mx={'-20px'} />
                      
                    </Flex>
                  </Flex>
                  
  
                </Flex>
              </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
