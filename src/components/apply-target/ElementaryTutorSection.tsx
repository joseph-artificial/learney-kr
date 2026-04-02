"use client";

import { Box, Flex, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import Link from "next/link";
import { PRICING_QUOTE_FORM_HREF } from "@/config/site";
import { keyframes } from "@emotion/react";
import { useRef, useState } from "react";

const dingIn = keyframes`
  0% { opacity: 0; transform: translateY(10px) scale(0.98); }
  60% { opacity: 1; transform: translateY(-2px) scale(1.01); }
  100% { opacity: 1; transform: translateY(0px) scale(1); }
`;

function Chip({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "solid" | "outline";
}) {
  return (
    <Flex
      bg={variant === "solid" ? "#E8F4F5" : "white"}
      border={variant === "outline" ? "1px solid #0E9384" : "0"}
      borderRadius="30px"
      px={{base: '10px', lg: '14px'}}
      py="2px"
      h={{base: '28px', lg: '36px'}}
      align="center"
      justify="center"
    >
      <Text color="#0E9384" fontWeight="600" fontSize={{base: '12px', lg: '16px'}} lineHeight={{base: '18px', lg: '24px'}}>
        {children}
      </Text>
    </Flex>
  );
}

export function TutorChatCard({
  promptIconSrc,
  promptText,
  promptSubText,
  teacherChatList,
  chatList,
  bgGradient,
}: {
  promptIconSrc: string;
  promptText: string;
  promptSubText: string;
  teacherChatList: string[];
  chatList: { isLeft: boolean; text: string }[];
  bgGradient: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(chatList.length - 1);
  const timeoutsRef = useRef<number[]>([]);

  const clearTimers = () => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  };

  const startChatReveal = () => {
    clearTimers();
    setHovered(true);
    setVisibleIndex(-1);

    // 요구사항:
    // 1) 마우스 올리고 1초 후 첫 번째 버블
    // 2) 첫 번째 버블 뒤 1~2초(여기서는 1500ms) 기다린 후
    // 3) 나머지 버블을 순차적으로 "띵" (간격 stepMs)
    const stepMs = 520;
    const firstDelayMs = 500;
    const afterFirstDelayMs = 750;

    const firstTimer = window.setTimeout(() => {
      setVisibleIndex(0);

      for (let idx = 1; idx < chatList.length; idx += 1) {
        const id = window.setTimeout(() => {
          setVisibleIndex(idx);
        }, afterFirstDelayMs + (idx - 1) * stepMs);
        timeoutsRef.current.push(id);
      }
    }, firstDelayMs);

    timeoutsRef.current.push(firstTimer);
  };

  const stopChatReveal = () => {
    clearTimers();
    setHovered(false);
    setVisibleIndex(chatList.length - 1);
  };

  return (
    <Box
      w={{ base: "100%", lg: "588px" }}
      h={{ base: "450px", lg: "596px" }}
      borderRadius="28px"
      position="relative"
      overflow="hidden"
      bgGradient={bgGradient}
      onMouseEnter={startChatReveal}
      onMouseLeave={stopChatReveal}
    >
      {/* prompt */}
      <Flex
        position="absolute"
        left={{ base: "16px", lg: "143px" }}
        top={{ base: "20px", lg: "29px" }}
        w={{ base: "calc(100% - 32px)", lg: "302px" }}
        textAlign="center"
        alignItems="center"
        flexDirection="column"
      >
        <Flex
          w={{base: '30px', lg: '40px'}}
          h={{base: '30px', lg: '40px'}}
          borderRadius="20px"
          bg="white"
          boxShadow="0px 0px 10px rgba(0,0,0,0.05)"
          align="center"
          justify="center"
          mb="8px"
        >
          <Box w={{base: '16px', lg: '18px'}} h={{base: '16px', lg: '18.67px'}} overflow="hidden"  >
            <Box as="img" src={promptIconSrc} alt="" w="100%" h="100%" objectFit="contain" />
          </Box>
        </Flex>
        <Text color="#667085" fontWeight="500" fontSize={{base: '14px', lg: '18px'}} lineHeight={{base: '20px', lg: '26px'}} whiteSpace="pre-line">
          {promptText}
          {"\n"}
          {promptSubText}
        </Text>
      </Flex>

      {/* chat */}
      <Flex display={{ base: 'none', lg: 'block' }}>
        <MiddleHighTutorChatCard
          teacherChatList={teacherChatList}
          chatList={chatList}
          hovered={hovered}
          visibleIndex={visibleIndex}
        />  
      </Flex>
      <Flex display={{ base: 'block', lg: 'none' }} justify="center" align="center">
        <MiddleHighTutorChatCard
          teacherChatList={teacherChatList}
          chatList={chatList}
          hovered={hovered}
          visibleIndex={visibleIndex}
          cssProps={{
             left: '50%',
             transform: 'translateX(-50%)',
          }}
        />
      </Flex>
    </Box>
  );
}

export function MiddleHighTutorChatCard({
  teacherChatList,
  chatList,
  alwaysHover = false,
  hovered,
  visibleIndex,
  cssProps,
  cssTop,
  cssLeft,
}: {
  teacherChatList: string[];
  chatList: { isLeft: boolean; text: string }[];
  alwaysHover?: boolean;
  hovered?: boolean;
  visibleIndex: number;
  cssProps?: BoxProps;
  cssTop?: BoxProps["top"];
  cssLeft?: BoxProps["left"];
}) {
  // props 에 css 받아서 사용할거임. top left가 아니라 어떤 css 가 올지 모름
  const css = cssProps ?? {};
  return (
    <Box
      position="absolute"
      left={cssLeft ?? { base: "16px", lg: "84px" }}
      top={cssTop ?? { base: "110px", lg: "152px" }}
      w={{ base: "80%", lg: "420px" }}
      h={{ base: "270px", lg: "389px" }}
      bg="white"
      borderRadius="16px"
      boxShadow="0px 0px 21.684px rgba(16,24,40,0.05)"
      {...css}
    >
      <Box
        borderBottom="0.672px solid #EAECF0"
        px="16px"
        py="16px"
        h="68px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Text color="#344054" fontWeight="600" fontSize={{base: '10px', lg: '16px'}} lineHeight={{base: '14px', lg: '21.5px'}}>
            대화창
          </Text>
          <Text color="#667085" fontWeight="400" fontSize={{base: '6px', lg: '9.4px'}} lineHeight={{base: '9px', lg: '13.4px'}}>
            대화를 따라가며 학습하세요
          </Text>
        </Box>
        <Box bg="#F2F4F7" borderRadius={{base: '5px', lg: '12px'}} w={{base: '25px', lg: '37px'}} h={{base: '25px', lg: '37px'}} display="flex" alignItems="center" justifyContent="center">
          <Box w={{base: '12px', lg: '19px'}} h={{base: '12px', lg: '19px'}}>
            <Box as="img" src="/images/apply-target/elementary-feature-intro/chat.png" alt="" w="100%" h="100%" objectFit="contain" />
          </Box>
        </Box>
      </Box>

      <Box px={{base: '10px', lg: '16px'}} py={{base: '10px', lg: '13.6px'}} h="calc(100% - 68px)" display="flex" flexDirection="column" justifyContent="flex-start" gap={{base: '10px', lg: '25px'}}>
        <Flex gap="10px" justify="flex-start">
          <Box
            w={{base: '21px', lg: '32px'}}
            h={{base: '21px', lg: '32px'}}
            borderRadius="12px"
            position="relative"
            overflow="hidden"
            flexShrink={0}
          >
            <Box
              as="img"
              src="/images/apply-target/elementary-tutor/avatar.png"
              alt=""
              w="100%"
              h="100%"
              objectFit="cover"
            />
            <Box
              position="absolute"
              inset={0}
              border="0.504px solid rgba(16,24,40,0.08)"
              opacity={0.08}
              borderRadius="12px"
            >
              <Box
                as="img"
                src="/images/apply-target/elementary-tutor/avatar-contrast.png"
                alt=""
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap="6px" flex="1">
            <Text fontWeight="500" fontSize={{base: '7px', lg: '10.7px'}} color={'#475467'} lineHeight={{base: '10px', lg: '16.14px'}}>
              아티쌤
            </Text>
            {teacherChatList.map((chat, index) => (
              <Box
                key={index}
                bg="#F9FAFB"
                border="0.672px solid #EAECF0"
                borderRadius="10.76px"
                px={{base: '7px', lg: '10px'}}
                py={{base: '5px', lg: '8px'}}
                width={'fit-content'}
              >
                <Text color="#101828" fontWeight="400" fontSize={{base: '7px', lg: '10.7px'}} lineHeight={{base: '10px', lg: '16.1px'}}>
                  {chat}
                </Text>
              </Box>
            ))}
  
          </Box>
        </Flex>

        <Flex width={'100%'} position="relative">
          {chatList.map((chat, index) => {
            const isVisible = alwaysHover ? true : hovered ? index <= visibleIndex : true;
            const isActiveBubble = alwaysHover ? true : hovered && index === visibleIndex;

            return (
            <Flex key={index} justifyContent={chat.isLeft ? "flex-start" : "flex-end"} width={'100%'}>
              <Flex
                w="auto"
                minH={'45.36px'}
                position="absolute"
                right={chat.isLeft ? undefined : -28.5}
                left={chat.isLeft ? -30 : undefined}
                top={(45.36 + 10.18) * index + 'px'}
                maxW="452.1px"
                px={{base: '9.5px', lg: '14.26px'}}
                py={{base: '7px', lg: '10.18px'}}
                bg={chat.isLeft ? "rgba(240, 255, 251, 0.8)" : "rgba(25, 163, 147, 0.8)"}
                border={chat.isLeft ? "0.95px solid #6ADDC8" : "0"}
                boxShadow="0 0 11.01px rgba(0, 0, 0, 0.05)"
                borderTopRightRadius={chat.isLeft ? "16.29px" : "0"}
                borderTopLeftRadius={chat.isLeft ? "0" : "16.29px"}
                borderBottomRightRadius={"16.29px"}
                borderBottomLeftRadius="16.29px"
                alignItems="center"
                opacity={isVisible ? 1 : 0}
                pointerEvents={isVisible ? "auto" : "none"}
                transform={isVisible ? "translateY(0px) scale(1)" : "translateY(10px) scale(0.98)"}
                transition="opacity 180ms ease, transform 260ms ease"
                sx={{
                  backdropFilter: "blur(16.7px)",
                  WebkitBackdropFilter: "blur(16.7px)",
                }}
                animation={isActiveBubble ? `${dingIn} 320ms ease both` : undefined}
              >
                <Flex align="center" gap="8.15px">
                  <Text color={chat.isLeft ? "gray.900" : "white"} fontWeight={chat.isLeft ? "400" : "500"} fontSize={{base: '12px', lg: '16.29px'}} lineHeight={{base: '16px', lg: '24.44px'}}>
                    {chat.text}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          );
          })}
        </Flex>
        
      </Box>
    </Box>
  );
}
export function ElementaryTutorSection() {
  const isLgSize = useBreakpointValue({base: false, lg: true})
  return (
    <Box bg="gray.25" py={{ base: '50px', lg: "60px" }} px={{ base: 4, lg: 6 }}>
      <Stack maxW="1200px" mx="auto" gap={6}>
        <Stack gap={{base: '16px', lg: '25px'}} data-aos="fade-up" alignItems={{ base: "center", lg: "flex-start" }}>
          <Flex gap={{base: '4px' , lg: 4}} wrap="wrap" align="center">
            <Chip variant="solid">주요 기능 03</Chip>
            <Chip variant="outline">대화형 학습</Chip>
          </Flex>

          <Text
            color="#1D2939"
            fontWeight="600"
            fontSize={{ base: "24px", lg: "56px" }}
            lineHeight={{ base: "34px", lg: "60px" }}
            textAlign={{ base: "center", lg: "left" }}
          >
            아이들이 먼저 하고 싶어 하는 이유,
            <br />
            <Box as="span"
              sx={{
                backgroundImage: "linear-gradient(90deg, #43D1BC 0%, #009B84 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              AI 튜터 아티쌤
            </Box>
          </Text>

          <Text
            color="#1D2939"
            fontWeight="500"
            fontSize={{ base: "16px", lg: "28px" }}
            lineHeight={{ base: "24px", lg: "40px" }}
            whiteSpace="pre-line"
            textAlign={{ base: "center", lg: "left" }}
          >
            러니의 AI 튜터 아티쌤은
            <br />
            아이의 답변에 따라 반응이 달라지는{ isLgSize ? " " : "\n"}대화형 학습을 이끌어줘요.
          </Text>
        </Stack>

        <Flex
          gap={{base: '24px', lg: 6}}
          direction={{ base: "column", lg: "row" }}
          align="center"
          justifyContent="center"
          pt={{base: '24px', lg: '35px'}} 
          data-aos="fade-up"
          data-aos-delay="80"
        >
          <TutorChatCard
            promptIconSrc="/images/apply-target/elementary-feature-intro/question.png"
            promptText={"학생이 모호하게 답변 한다면?"}
            promptSubText={"사고를 유도하는 후속 질문을 제시해요."}
            teacherChatList={["제시된 글은 신문 기사입니다.", "먼저 글의 목적을 생각하며 제시문을 읽어 본 후 질문에 대답해 보세요.", "이 글의 주요 목적은 무엇이라고 생각하나요?"]}
            chatList={[
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
            ]}
            bgGradient="linear(to-b, #EFFCF6, #F9FAFB)"
          />
          <TutorChatCard
            promptIconSrc="/images/apply-target/elementary-feature-intro/question.png"
            promptText={"학생이 근거를 들어 답변 한다면?"}
            promptSubText={"칭찬과 함께 확장 질문을 제시해요."}
            teacherChatList={["먼저 글의 목적을 생각하며 제시문을 읽어 본 후 질문에 대답해 보세요.", "이 글의 주요 목적은 무엇이라고 생각하나요?"]}
            chatList={[
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
            bgGradient="linear(to-b, #F5FCEF, #F9FAFB)"
          />
        </Flex>

        <Flex justify="center" pt={2} data-aos="fade-up" data-aos-delay="120">
          <Link href={PRICING_QUOTE_FORM_HREF}>
            <Box
              as="span"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w={{base: '117px', lg: '220px'}}
              h={{base: '36px', lg: '40px'}}
              borderWidth="1px"
              borderColor="gray.300"
              borderRadius="12px"
              bg="white"
              boxShadow="0 1px 2px rgba(16,24,40,0.05)"
              fontWeight="600"
              fontSize="14px"
              color="gray.700"
            >
              견적서 신청하기
            </Box>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
}
