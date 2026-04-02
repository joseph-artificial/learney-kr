"use client";

import { useEffect, useRef } from "react";
import { Box, Flex, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const rollStories = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

type Story = {
  quote: string;
  body: string;
  name: string;
  role: string;
};

export const StoryColors = [{
      bg: "#F6FEFC",
    borderColor: "#99F6E0",
    color: "primary.700",
  },
  {
    bg: "#F5FBFF",
    borderColor: "#B9E6FE",
    color: "#026AA2",
}]
const STORIES: Story[] = [
  {
    quote: "아이들이 부담없이\n끝까지 답하려고 하더라고요!",
    body: `“학생이 엉뚱하게 대답해도 틀렸다고 하지 않고, 다시 생각해 볼 수 있도록 이야기해줘서 좋아요. 특히 아이들의 답변에 따라 달라지는 아티쌤의 피드백이 인상적이었어요!"`,
    name: "박00 선생님",
    role: "여울초등학교",

  },
  {
    quote: "생활기록부 작성을 신속하고\n풍부하게 할 수 있었어요!",
    body: "“모든 학습 기록이 저장되어 자료 정리 부담이 줄고, 러니에서 개개인의 성취도 변화를 확인한 덕분에 생활기록부를 쉽고 빠르게 작성할 수 있었어요!”",
    name: "박00 선생님",
    role: "남성중학교",
  },
  {
    quote: "AI 아티쌤 덕분에 초등학교 학생도 쉽게 참여하고 활용했어요!",
    body: "“상호작용 하면서 자연스럽게 학습하는 방식을 학생들이 재미있게 받아들여 교실에서 걱정없이 활용했어요.아이들이 아티쌤이랑 이야기하고 싶어해요!”",
    name: "손00 선생님",
    role: "중산초등학교",
  },
  {
    quote: "여러 유형의 학습,지문 덕분에\n아이들이 흥미롭게 학습했어요!",
    body: `“그냥 글을 읽고 요약하라고 하면 학생들이 어려워했을 것 같은데, 여러 유형의 학습과 지문을 활용하니 러니를 흥미롭게 사용했던 것 같아요!”`,
    name: "박00 선생님",
    role: "여울초등학교",
  },
  {
    quote: "수업 준비시간이\n눈에 띄게 확 줄었어요!",
    body: "“교과서를 선택하기만 하면 추천학습이 바로 뜨니까, 그때 그때 필요한 자료를 골라서 바로 배포할 수 있었어요. 남는 시간에 학생 개별지도에 더 신경 쓸 수 있었어요!”",
    name: "박00 선생님",
    role: "남성중학교",
  },
  {
    quote: "아침 조회 시간에\n학생들이 집중해서 참여해요!",
    body: "“아침 자습시간에 학생들이 집중하며 문해력을 향상시키고 긴 문장을 읽는 습관을 들여보고자 시작했어요! 단순히 책이나 글을 읽는 것 보다 재미있어 하더라구요.”",
    name: "안00 선생님",
    role: "제물포여자중학교",
  },
];

function StoryCard({
  item,
  color,
  cardRef,
}: {
  item: Story;
  cardRef?: (el: HTMLDivElement | null) => void;
  color: {
    bg: string;
    borderColor: string;
    color: string;
  };
}) {
  return (
    <Box
      ref={cardRef}
      className="teacher-story-card"
      data-size="small"
      bg={color?.bg}
      borderWidth="2px"
      borderColor={color?.borderColor}
      borderStyle="solid"
      borderRadius="31.73px"
      overflow="hidden"
      flexShrink={0}
      transition="width 0.35s ease, height 0.35s ease, border-radius 0.35s ease, opacity 0.25s ease"
      display="flex"
      flexDirection="column"
    >
      <Stack className="story-review" p="22px" gap="10px" flex={1}>
        <Text className="story-quote" color={color?.color} fontWeight="600" fontSize="26px" lineHeight="38px" whiteSpace="pre-line">
          {item.quote}
        </Text>
        <Text className="story-body" color="gray.500" fontWeight="500" fontSize="20px" lineHeight="28px" whiteSpace="pre-line">
          {item.body}
        </Text>
      </Stack>
      <Flex className="story-info" borderTopWidth="1px" borderColor="gray.300" p="22px" gap="14px" align="center">
        <Stack gap={0}>
          <Text className="story-name" color="gray.600" fontWeight="500" fontSize="19px" lineHeight="26px">{item.name}</Text>
          <Text className="story-role" color="gray.600" fontWeight="500" fontSize="16px" lineHeight="24px">{item.role}</Text>
        </Stack>
      </Flex>
    </Box>
  );
}

function MobileStoryPreviewCard({
  item,
  color,
}: {
  item: Story;
  color: { bg: string; borderColor: string; color: string };
}) {
  return (
    <Flex
      bg={color.bg}
      borderWidth="2px"
      borderColor={color.borderColor}
      borderRadius="16px"
      overflow="hidden"
      w="100%"
      minH="224px"
      transition="opacity 0.35s ease"
      flexDirection="column"
    >
      <Stack p="20px" gap="6px" flex={1}>
        <Text
          color={color.color}
          fontWeight="600"
          fontSize="14px"
          lineHeight="18px"
          whiteSpace="pre-line"
          noOfLines={2}
        >
          {item.quote}
        </Text>
        <Text color="gray.500" fontWeight="500" fontSize="12px" lineHeight="18px" noOfLines={4}>
          {item.body}
        </Text>
      </Stack>
      <Flex borderTopWidth="1px" borderColor="gray.300" p="20px" align="center" h={'76px'}>
        <Stack gap={0}>
          <Text color="gray.600" fontWeight="500" fontSize="12px" lineHeight="18px">
            {item.name}
          </Text>
          <Text color="gray.600" fontWeight="500" fontSize="12px" lineHeight="18px">
            {item.role}
          </Text>
        </Stack>
      </Flex>
    </Flex>
  );
}

export function TestimonialsSection() {
  const rolling = Array.from({ length: 20 }, () => STORIES).flat();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const largePairRef = useRef<number[]>([]);
  const isLgSize = useBreakpointValue({ base: false, lg: true }) ?? false;

  useEffect(() => {
    if (!isLgSize) return;
    let rafId = 0;

    const tick = () => {
      const viewport = viewportRef.current;
      if (!viewport) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const viewportRect = viewport.getBoundingClientRect();
      const viewportCenter = viewportRect.left + viewportRect.width / 2;
      const measured = cardRefs.current
        .map((card, index) => {
          if (!card) return null;
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(cardCenter - viewportCenter);
          return { card, index, distance };
        })
        .filter(
          (item): item is { card: HTMLDivElement; index: number; distance: number } =>
            item !== null,
        )
        .sort((a, b) => a.distance - b.distance);

      if (measured.length < 2) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const candidate = [measured[0].index, measured[1].index];
      const prev = largePairRef.current;

      if (prev.length === 2) {
        const prevDist = measured
          .filter((m) => prev.includes(m.index))
          .reduce((sum, m) => sum + m.distance, 0);
        const nextDist = measured
          .filter((m) => candidate.includes(m.index))
          .reduce((sum, m) => sum + m.distance, 0);

        // Hysteresis to prevent rapid flicker near the center boundary.
        if (nextDist + 18 < prevDist) {
          largePairRef.current = candidate;
        }
      } else {
        largePairRef.current = candidate;
      }

      const largeSet = new Set(largePairRef.current);

      measured.forEach(({ card, index, distance }) => {
        const normalized = Math.min(distance / (viewportRect.width * 0.45), 1);
        const opacity = 1 - normalized * 0.35;
        card.dataset.size = largeSet.has(index) ? "large" : "small";
        card.style.opacity = opacity.toFixed(3);
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isLgSize]);
  return (
    <Box
      bg="#ffffff"
      py={{ base: '50px', lg: "120px" }}
      overflow="hidden"
      data-aos="fade-up"
      data-aos-delay="0"
      data-aos-duration="900"
      data-aos-offset="120"
      data-aos-anchor-placement="top-bottom"
      data-aos-once="true"
      data-aos-easing="ease-out-cubic"
      sx={{
        ".teacher-story-card, .story-review, .story-quote, .story-body, .story-info, .story-avatar, .story-name, .story-role": {
          transition: "all 0.35s ease",
        },
        ".teacher-story-card[data-size='small']": {
          width: "304.6153869628906px",
          height: "292.4711608886719px",
          borderRadius: "18px",
        },
        ".teacher-story-card[data-size='large']": {
          width: "406.1538391113281px",
          height: "389.9615478515625px",
          borderRadius: "24px",
        },
        ".teacher-story-card[data-size='small'] .story-review": {
          p: "17px",
          gap: "7px",
        },
        ".teacher-story-card[data-size='large'] .story-review": {
          p: "22px",
          gap: "10px",
        },
        ".teacher-story-card[data-size='small'] .story-quote": {
          fontSize: "19.5px",
          lineHeight: "28.5px",
        },
        ".teacher-story-card[data-size='small'] .story-body": {
          fontSize: "15px",
          lineHeight: "21px",
        },
        ".teacher-story-card[data-size='large'] .story-quote": {
          fontSize: "26px",
          lineHeight: "38px",
        },
        ".teacher-story-card[data-size='large'] .story-body": {
          fontSize: "20px",
          lineHeight: "28px",
        },
        ".teacher-story-card[data-size='small'] .story-info": {
          p: "17px",
          gap: "12px",
        },
        ".teacher-story-card[data-size='large'] .story-info": {
          p: "22px",
          gap: "14px",
        },
        ".teacher-story-card[data-size='small'] .story-avatar": {
          width: "44px",
          height: "44px",
        },
        ".teacher-story-card[data-size='large'] .story-avatar": {
          width: "58px",
          height: "58px",
        },
        ".teacher-story-card[data-size='small'] .story-name": {
          fontSize: "15px",
          lineHeight: "21px",
        },
        ".teacher-story-card[data-size='small'] .story-role": {
          fontSize: "15px",
          lineHeight: "21px",
        },
        ".teacher-story-card[data-size='large'] .story-name": {
          fontSize: "20px",
          lineHeight: "28px",
        },
        ".teacher-story-card[data-size='large'] .story-role": {
          fontSize: "20px",
          lineHeight: "28px",
        },
        ".testimonials-mobile-swiper .swiper-slide": {
          opacity: 0.55,
          transition: "opacity 0.35s ease",
        },
        ".testimonials-mobile-swiper .swiper-slide-active": {
          opacity: 1,
        },
      }}
    >
      <Stack
        maxW="1200px"
        mx="auto"
        px={{ base: 4, lg: 6 }}
        gap={{ base: '16px', lg: 20}}
        align="center"
        data-aos="fade-up"
        data-aos-delay="0"
        data-aos-duration="900"
        data-aos-offset="120"
        data-aos-anchor-placement="top-bottom"
        data-aos-once="true"
        data-aos-easing="ease-out-cubic"
      >
        <Text color="#000000" fontWeight="600" fontSize={{ base: "24px", lg: "48px" }} lineHeight={{ base: "34px", lg: "60px" }} textAlign="center">
          러니를 사용한 선생님들의{ isLgSize ? " " : <br /> }
          <Box as="span" color="#2CA395">
            실제 이야기
          </Box>
        </Text>
        <Text color="gray.500" fontWeight="400" fontSize={{ base: "14px", lg: "24px" }} lineHeight={{ base: "18px", lg: "32px" }} textAlign="center">
          수업 속 러니가 기억에 남는 순간, 선생님들이 직접 들려줬어요.
        </Text>
      </Stack>

      {isLgSize ? (
        <Box
          ref={viewportRef}
          mt={{ base: "24px", lg: 60 }}
          overflow="hidden"
          data-aos="fade-up"
          data-aos-delay="80"
          data-aos-duration="900"
          data-aos-offset="180"
          data-aos-anchor-placement="top-bottom"
          data-aos-once="true"
          data-aos-easing="ease-out-cubic"
        >
          <Flex
            gap={5}
            width="max-content"
            px={{ base: 4, lg: 6 }}
            align="center"
            animation={`${rollStories} 200s linear infinite`}
          >
            {rolling.map((item, idx) => (
              <StoryCard
                key={`${item.name}-${idx}`}
                item={item}
                color={StoryColors[idx % StoryColors.length]}
                cardRef={(el) => {
                  cardRefs.current[idx] = el;
                }}
              />
            ))}
          </Flex>
        </Box>
      ) : (
        <Box
          mt="24px"
          px={4}
          data-aos="fade-up"
          data-aos-delay="80"
          data-aos-duration="900"
          data-aos-offset="180"
          data-aos-anchor-placement="top-bottom"
          data-aos-once="true"
          data-aos-easing="ease-out-cubic"
        >
          <Swiper
            className="testimonials-mobile-swiper"
            modules={[Autoplay]}
            // 가운데 90%, 좌우 미리보기 합 10%
            slidesPerView={1.111}
            centeredSlides
            loop
            spaceBetween={8}
            speed={700}
            autoplay={{ delay: 2200, disableOnInteraction: false }}
            allowTouchMove={false}
            simulateTouch={false}
            touchMoveStopPropagation
          >
            {STORIES.map((item, idx) => (
              <SwiperSlide key={`${item.name}-${idx}`}>
                <MobileStoryPreviewCard
                  item={item}
                  color={StoryColors[idx % StoryColors.length]}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </Box>
  );
}
