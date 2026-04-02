"use client";

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const BLUE_TITLE = "linear-gradient(90deg, #5eccff 0%, #0055a9 76.442%, #00a3a9 100%)";
const GREEN_TITLE = "linear-gradient(90deg, #65e2b0 0%, #00a98a 100%)";
const BLUE_ACCENT = "linear-gradient(90deg, #5eccff 0%, #0055a9 76.442%, #00a3a9 100%)";

function GradientText({ gradient, children }: { gradient: string; children: React.ReactNode }) {
  return (
    <Text
      as="span"
      sx={{
        backgroundImage: gradient,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </Text>
  );
}

const IMG = {
  informative: "/images/solutions/learning-content/informative.png",
  communication: "/images/solutions/learning-content/communication.png",
  humanities: "/images/solutions/learning-content/humanities.png",
  standardWriting: "/images/solutions/learning-content/standard-writing.png",
} as const;

type ImageList = {
  src: string;
  label: string[];
  imageW: number;
  imageH: number;
  imageTransform?: string;
};
interface CardProps {
  isFocused: boolean;
  imageList: ImageList[];
  title: React.ReactNode;
  body: string;
  bodyColor: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  tagBorderColor: string;
}
function Card(props: CardProps) {
  const { isFocused, imageList, title, body, bodyColor, tag, tagColor, tagBg, tagBorderColor } = props;

  const containerBorderColor = isFocused ? "#b2ebe0" : "#eaecf0";
  const containerShadow = isFocused
    ? "0px 0px 40px 0px rgba(193, 247, 240, 0.75)"
    : "0px 0px 24px 0px rgba(193, 247, 240, 0.25)";
  const topBg = isFocused ? "#ebfefa" : "#f3fbf8";
  const bottomBg = isFocused ? bodyColor : "#fcfcfd";

  return (
    <Box
      w="full"
      border="1px solid"
      borderColor={containerBorderColor}
      borderRadius="20px"
      overflow="hidden"
      boxShadow={containerShadow}
      bg="white"
      h={isFocused ? "595px" : "446px"}
      // 내부는 한 번에 바뀌고, 카드 전체만 부드럽게 커지도록
      transition="box-shadow 0.3s ease, border-color 0.3s ease"
    >
      <Flex
        bg={topBg}
        h={isFocused ? "300px" : "225px"}
        align="flex-end"
        justify="center"
        py={isFocused ? "46px" : "45px"}
        borderTopRadius="20px"
        w="100%"
      >
        <Flex gap={{ base: 2, lg: 3 }} align="flex-end" justify="center" w="100%" px="53px">
          {imageList.map((item) => (
            <MiniLiteracyColumn
              key={item.src}
              imageSrc={item.src}
              label={item.label}
              imageW={item.imageW}
              imageH={item.imageH}
              imageTransform={item.imageTransform}
              isFocused={isFocused}
            />
          ))}
        </Flex>
      </Flex>
      <Stack
        bg={bottomBg}
        p={{ base: 6, lg: "30px" }}
        spacing="15px"
        align="flex-start"
        borderBottomRadius="20px"
        minH={{ lg: "295px" }}
      >
        <Box bg={tagBg} px="12px" py="6px" borderRadius="40px" border="1px solid" borderColor={tagBorderColor}>
          <Text fontWeight="600" fontSize="16px" lineHeight="24px" color={tagColor}>
            {tag}
          </Text>
        </Box>
        <Text
          fontWeight="600"
          fontSize={isFocused ? "28px" : "21px"}
          lineHeight={isFocused ? "40px" : "30px"}
          color="#1d2939"
        >
          {/* 매일 쌓는 체력, <GradientText gradient={GREEN_TITLE}>문해력 학습</GradientText> */}
          {title}
        </Text>
        <Text
          fontWeight="500"
          fontSize={isFocused ? "22px" : "16.5px"}
          lineHeight={isFocused ? "32px" : "24px"}
          color="#475467"
          whiteSpace="pre-line"
        >
          {body}
        </Text>
      </Stack>
    </Box>
  );
}

function MiniLiteracyColumn({
  imageSrc,
  label,
  imageW,
  imageH,
  imageTransform,
  isFocused,
}: {
  imageSrc: string;
  label: string[];
  imageW: number;
  imageH: number;
  imageTransform?: string;
  isFocused: boolean;
}) {
  return (
    <Flex direction="column" align="center" gap="10px" minW={{ base: "28%", lg: "114px" }} flex={1}>
      <Flex
        h={isFocused ? "188px" : "141px"}
        w="100%"
        borderRadius="28px"
        border="1px solid white"
        bgGradient="linear(to-b, rgba(255,255,255,0.5), white)"
        boxShadow="0px 0px 10px 0px rgba(0,0,0,0.05)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        flexDirection="column"
        py="16.12px"
      >
        {/* <Box position="relative" w={`${imageW}px`} h={`${imageH}px`} transform={imageTransform}> */}
        <Box
          position="relative"
          w={isFocused ? `${imageW}px` : "61.5px"}
          h={isFocused ? `${imageH}px` : "60px"}
          transform={imageTransform}
        >
          <Image src={imageSrc} alt="" fill style={{ objectFit: "contain" }} sizes="131px" />
        </Box>
        <Flex wrap="wrap" justify="center" gap="6px" maxW={isFocused ? "290px" : "242px"} w="100%">
          {label.map((item) => (
            <Box
              key={item}
              bg="white"
              border="1px solid"
              borderColor="#eaecf0"
              borderRadius="20px"
              px={isFocused ? "10px" : "7.5px"}
            >
              <Text
                fontWeight="500"
                fontSize={isFocused ? "14px" : "10.5px"}
                lineHeight={isFocused ? "24px" : "18px"}
                color="#98a2b3"
                whiteSpace="nowrap"
              >
                {item}
              </Text>
            </Box>
          ))}
        </Flex>
        
      </Flex>
      
    </Flex>
  );
}

// 카드별 이미지 리스트
const LITERACY_IMAGES: ImageList[] = [
  { src: IMG.informative, label: ["# 읽기"], imageW: 109, imageH: 109 },
  { src: IMG.communication, label: ["# 듣기·말하기"], imageW: 120, imageH: 120 },
  {
    src: IMG.humanities,
    label: ["# 쓰기"],
    imageW: 110,
    imageH: 110,
    imageTransform: "rotate(180deg) scaleY(-1)",
  },
];

const SUBJECT_IMAGES: ImageList[] = [
  {
    src: IMG.standardWriting,
    label: ["# 국정", "# 미래엔", "# 비상", "# 지학사", "# 창비", "# 천재", "# 해냄"],
    imageW: 120,
    imageH: 120,
  },
];

export function LearningContentStructureSection() {
  const [focusRight, setFocusRight] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const enableAuto = Boolean(isLg);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 992px)");
    const sync = () => setIsLg(mq.matches);
    sync();

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }

    mq.addListener(sync);
    return () => mq.removeListener(sync);
  }, []);

  const disableAutoByUserAction = useCallback(() => {
    setAutoPaused(true);
  }, []);

  const selectLeftCard = useCallback(() => {
    disableAutoByUserAction();
    setFocusRight(false);
  }, [disableAutoByUserAction]);

  const selectRightCard = useCallback(() => {
    disableAutoByUserAction();
    setFocusRight(true);
  }, [disableAutoByUserAction]);

  useEffect(() => {
    if (!enableAuto || autoPaused) return;
    const id = window.setInterval(() => {
      setFocusRight((v) => !v);
    }, 2200);
    return () => window.clearInterval(id);
  }, [enableAuto, autoPaused]);

  const leftFocused = !focusRight;
  const rightFocused = focusRight;

  const leftOpacity = leftFocused ? 1 : 0.72;
  const rightOpacity = rightFocused ? 1 : 0.68;

  return (
    <Box bg="white" py={{ base: 16, lg: "120px" }} px={{ base: 6, lg: 10, xl: "120px" }}>
      <Stack maxW="1200px" mx="auto" gap={{ base: 10, lg: "60px" }} align="center">
        <Stack gap={{ base: 6, lg: "40px" }} align="center" data-aos="fade-up">
          <Box
            as="h2"
            textAlign="center"
            fontWeight="600"
            fontSize={{ base: "28px", lg: "48px" }}
            lineHeight={{ base: "38px", lg: "65px" }}
            color="black"
          >
            <Text as="span" color="#98a2b3">
              러니의 학습 콘텐츠는{" "}
            </Text>
            <br />
            <GradientText gradient={BLUE_TITLE}>문해력 학습</GradientText>
            <Text as="span" color="black">
              과{" "}
            </Text>
            <GradientText gradient={BLUE_TITLE}>교과 학습,</GradientText>
            <Text as="span" color="black">
              {" "}
              두 축으로 이루어져 있어요.
            </Text>
          </Box>

          <Box bg="#f9fafb" borderRadius="20px" p={{ base: 6, lg: "30px" }} w="full" maxW="960px">
            <Stack spacing="10px" align="center" textAlign="center">
              <Text fontWeight="600" fontSize="20px" lineHeight="26px" color="#344054">
                왜 이렇게 설계했을까요?
              </Text>
              <Text fontWeight="500" fontSize={{ base: "16px", lg: "20px" }} lineHeight="26px" color="#667085" whiteSpace="pre-line">
                {`기존 에듀테크는 기초 학습과 교과 학습이 분리되어 있어 실제 수업과의 연결이 어려웠어요.\n러니는 기초학력 기초를 쌓고 이를 교과 학습 성과로 이어지도록 설계된, ‘쌓이는 구조’의 학습이에요.`}
              </Text>
            </Stack>
          </Box>
        </Stack>

        <Flex
          direction={{ base: "column", xl: "row" }}
          align="center"
          justify="center"
          gap={{ base: 8, xl: 6 }}
          w="full"
          data-aos="fade-up"
          sx={{
            "&": { touchAction: "manipulation" },
          }}
          width={'100%'}
        >
          <Box
            w={{ base: "full", xl: leftFocused ? "590px" : "442.5px" }}
            transition="width 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease"
            opacity={enableAuto ? leftOpacity : 1}
            zIndex={leftFocused ? 2 : 1}
            style={{ willChange: "width, opacity" }}
            cursor="pointer"
            role="button"
            tabIndex={0}
            aria-pressed={leftFocused}
            onClick={selectLeftCard}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectLeftCard();
              }
            }}
          >
            <Card
              isFocused={leftFocused}
              imageList={LITERACY_IMAGES}
              title={
                <>
                  매일 쌓는 체력, <GradientText gradient={GREEN_TITLE}>문해력 학습</GradientText>
                </>
              }
              body={`읽기, 쓰기, 듣기·말하기를 \n매일 균형 있게 훈련해 문해력 핵심 역량을 키워요.\n짧은 시간으로도 꾸준히 학습할 수 있도록 설계했어요.`}
              bodyColor="#fcfcfd"
              tag="기초"
              tagColor="#5baa9c"
              tagBg="#d3efea"
              tagBorderColor="#d3efea"
            />
          </Box>

          <Image
            src="/images/etc/right.svg"
            alt="arrow-right"
            width={48}
            height={48}
            style={{ transform: rightFocused ? "rotate(180deg)" : "rotate(0deg)" }}
          />

          <Box
            w={{ base: "full", xl: rightFocused ? "590px" : "442.5px" }}
            transition="width 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease"
            opacity={enableAuto ? rightOpacity : 1}
            zIndex={rightFocused ? 2 : 1}
            style={{ willChange: "width, opacity" }}
            cursor="pointer"
            role="button"
            tabIndex={0}
            aria-pressed={rightFocused}
            onClick={selectRightCard}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectRightCard();
              }
            }}
          >
        <Card
          isFocused={rightFocused}
          imageList={SUBJECT_IMAGES}
          title={
            <>
              수업에서 바로 쓰는 콘텐츠, <GradientText gradient={BLUE_ACCENT}>교과 학습</GradientText>
            </>
          }
          body={`교과서와 성취 기준에 맞춘 학습으로, \nAI 튜터와 대화하며 함께하는 교과 연계 학습과 \n교과서 보충 학습으로 구성돼요.`}
          bodyColor="#fcfcfd"
          tag="성취"
          tagColor="#174d7a"
          tagBg="#cce8ff"
          tagBorderColor="#cce8ff"
        />
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
