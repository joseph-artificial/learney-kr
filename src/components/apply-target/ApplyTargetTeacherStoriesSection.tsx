"use client";

import { Box, Flex, Image, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const rollStories = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

export type TeacherStoriesStory = {
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

function StoryCard({
  item,
  color,
  cardRef,
  fixedSize,
}: {
  item: TeacherStoriesStory;
  cardRef?: (el: HTMLDivElement | null) => void;
  /** 모바일 Swiper 등: rAF 없이 항상 큰 카드 스타일 */
  fixedSize?: "large";
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
      data-size={fixedSize ?? "small"}
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
      <Stack className="story-review" p="22px" gap="10px" flex={1} >
        <Flex gap="4px" mb={"5px"}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Image key={index} className="story-star" src={color?.color === 'primary.700' ? `/images/apply-target/Star.png` : `/images/apply-target/Star2.png`} alt={`star-${index + 1}`} w="22.81px" h="22.81px" />
          ))}
        </Flex>
        
        <Text className="story-quote" color={color?.color} fontWeight="600" fontSize={{base: '16px', lg: '26px'}} lineHeight={{base: '24px', lg: '38px'}} whiteSpace="pre-line">
          {item.quote}
        </Text>
        <Text className="story-body" color="gray.500" fontWeight="500" fontSize={{base: '14px', lg: '20px'}} lineHeight={{base: '20px', lg: '28px'}} whiteSpace="pre-line">
          {item.body}
        </Text>
      </Stack>
      <Flex className="story-info" borderTopWidth="1px" borderColor="gray.300" p="22px" gap="14px" align="center">
        <Stack gap={0}>
          <Text className="story-name" color="gray.600" fontWeight="500" fontSize={{base: '14px', lg: '19px'}} lineHeight={{base: '20px', lg: '26px'}}>{item.name}</Text>
          <Text className="story-role" color="gray.600" fontWeight="500" fontSize={{base: '14px', lg: '16px'}} lineHeight={{base: '20px', lg: '24px'}}>{item.role}</Text>
        </Stack>
      </Flex>
    </Box>
  );
}

interface ApplyTargetTeacherStoriesSectionProps {
  title: ReactNode;
  description: string;
  stories: TeacherStoriesStory[];
  button?: ReactNode;
}
export function ApplyTargetTeacherStoriesSection({ title, description, stories, button }: ApplyTargetTeacherStoriesSectionProps) {
  const isLgSize = useBreakpointValue({ base: false, lg: true }) ?? false;
  const rolling = Array.from({ length: 20 }, () => stories).flat();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const largePairRef = useRef<number[]>([]);
  const mobileScrollBlockRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (isLgSize) return;
    const el = mobileScrollBlockRef.current;
    if (!el) return;
    const blockTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    el.addEventListener("touchmove", blockTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", blockTouchMove);
  }, [isLgSize]);

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
        ".teacher-story-card[data-size='large'] .story-star": {
          width: "22.81px",
          height: "22.81px",
        },
        ".teacher-story-card[data-size='small'] .story-star": {
          width: "17.11px",
          height: "17.11px",
        },
        ".teacher-stories-mobile-swiper .swiper-slide": {
          opacity: 0.5,
          transition: "opacity 0.35s ease",
        },
        ".teacher-stories-mobile-swiper .swiper-slide-active": {
          opacity: 1,
        },
        ".teacher-stories-mobile-swiper .teacher-story-card[data-size='large']": {
          width: "100%",
          maxWidth: "100%",
          height: "auto",
        },
      }}
    >
      <Stack maxW="1200px" mx="auto" px={{ base: 4, lg: 6 }} gap={'20px'} align="center" data-aos="fade-up">
        {title}
        
        {description && (<Text color="gray.500" fontWeight="400" fontSize={{ base: "24px", lg: "24px" }} lineHeight={{ base: "34px", lg: "32px" }} textAlign="center">
          {description}
        </Text>)}
        
        {button}
      </Stack>

      {isLgSize ? (
        <Box ref={viewportRef} mt={{ base: "20px", lg: "60px" }} overflow="hidden" data-aos="fade-up" data-aos-delay="80">
          <Flex
            gap={{ base: "10px", lg: 5 }}
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
        <Box mt={{ base: "20px", lg: "60px" }} w="full" px={4} data-aos="fade-up" data-aos-delay="80">
          <Box position="relative" w="full">
            <Swiper
              className="teacher-stories-mobile-swiper"
              style={{ width: "100%" }}
              modules={[Autoplay]}
              slidesPerView={1}
              centeredSlides
              spaceBetween={16}
              speed={600}
              loop={stories.length > 1}
              allowTouchMove={false}
              simulateTouch={false}
              autoplay={{
                delay: 4200,
                disableOnInteraction: false,
              }}
            >
              {stories.map((item, idx) => (
                <SwiperSlide key={`${item.name}-${idx}`}>
                  <Box w="full" maxW="398px" mx="auto">
                    <StoryCard item={item} color={StoryColors[idx % StoryColors.length]} fixedSize="large" />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
            <Box
              ref={mobileScrollBlockRef}
              position="absolute"
              inset={0}
              zIndex={2}
              bg="transparent"
              pointerEvents="auto"
              aria-hidden
              onWheel={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
