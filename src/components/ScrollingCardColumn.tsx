"use client";

import type { ComponentProps } from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";

export type ScrollingLearningCardsProps = ComponentProps<typeof Flex> & {
  containerProps?: ComponentProps<typeof Flex>;
  isRight?: boolean;
  INTRO_INITIAL_VELOCITY_PX_S?: number;
};

export type HeroCardDef = {
  title: string;
  tag: string;
  learningType: "WRITE" | "READ" | "SPEAK" | "INTERACTIVE" | "TEXTBOOK";
  grade: string;
  time: string;
  image: string;
  hashtag?: string;
  description?: React.ReactNode;
};

export const miniCardsImageList = {
  WRITE: {
    categoryBorderColor: "#F9DBAF",
    categoryTextColor: "#B93815",
    categoryBgColor: "#FEF6EE",
    icon: "",
  },
  READ: {
    categoryBorderColor: "#99F6E0",
    categoryTextColor: "#107569",
    categoryBgColor: "#F0FDF9",
    icon: "",
  },
  SPEAK: {
    categoryBorderColor: "#B9E6FE",
    categoryTextColor: "#026AA2",
    categoryBgColor: "#F0F9FF",
    icon: "",
  },
  INTERACTIVE: {
    categoryBorderColor: "",
    categoryTextColor: "",
    categoryBgColor: "",
    icon: "",
  },
  TEXTBOOK: {
    categoryBorderColor: "#D9D6FE",
    categoryTextColor: "#5925DC",
    categoryBgColor: "#F4F3FF",
    icon: "",
  },
};

const HERO_CARDS_LEFT: HeroCardDef[] = [
  {
    title: "친구가 실수했을 때 어떤 태도로 대해야 할까요?",
    learningType: "SPEAK",
    tag: "논리와 분석",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Speak_Analysis.png",
  },
  {
    title: "딸기의 독특한 구조와 번식 전략 이해하기",
    learningType: "READ",
    tag: "과학",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Read_Science.png",
  },
  {
    title: "스마트폰 사용을 줄이자 - 글 쓰고 고쳐 쓰기",
    learningType: "SPEAK",
    tag: "비상(박영민)",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Visang.png",
  },
  {
    title: "물건 제자리 습관 만들기",
    learningType: "WRITE",
    tag: "소통하는 글",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Write_Social.png",
  },
  {
    title: "뱅크시의 찢어진 그림, 가치 상승의 비밀",
    learningType: "READ",
    tag: "예술",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Read_Art.png",
  },
  {
    title: "하루 6시간만 자도 된다는 말, 진짜일까?",
    learningType: "TEXTBOOK",
    tag: "비판과 표현",
    grade: "중1",
    time: "15분",
    image: "/images/learning/Speak_Criticism.png",
  },
  {
    title: "미래를 여는 쉬운 길 찾기",
    learningType: "SPEAK",
    tag: "이해와 전달",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Speak_Understanding.png",
  },
  {
    title: "문단 만들기 활동의 효과와 응용 방법",
    learningType: "READ",
    tag: "인문",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Read_Humanities.png",
  },
  {
    title: "초콜릿과 바다를 지켜라!",
    learningType: "SPEAK",
    tag: "이해와 전달",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Speak_Understanding.png",
  },
  {
    title: "스마트팜 기술로 변화하는 현대 농업 읽기 기술",
    learningType: "READ",
    tag: "기술",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Read_Tech.png",
  },
  {
    title: "사라진 자료, 망가진 파일 말하기",
    learningType: "SPEAK",
    tag: "논리와 분석",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Speak_Analysis.png",
  },
  {
    title: "음식물 쓰레기 분리배출과 처리법 이해하기",
    learningType: "READ",
    tag: "사회",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Read_Society.png",
  },
];

const HERO_CARDS_RIGHT: HeroCardDef[] = [
  {
    title: "도시의 건축물 묘사하기",
    learningType: "WRITE",
    tag: "이야기하는 글",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Write_Narrative.png",
  },
  {
    title: "대중매체와 개인 인터넷 방송의 이해",
    learningType: "TEXTBOOK",
    tag: "지학사",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Jihaksa.png",
  },
  {
    title: "시간을 알차게 관리하는 법",
    learningType: "WRITE",
    tag: "설명하는 글",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Write_Informative.png",
  },
  {
    title: "타당한 근거로 독자를 설득하는 글쓰기",
    learningType: "INTERACTIVE",
    tag: "쓰기",
    grade: "중1~중2",
    time: "20분",
    image: "/images/learning/Standard_Writing.png",
  },
  {
    title: "신뢰와 지속",
    learningType: "WRITE",
    tag: "이야기하는 글",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Write_Narrative.png",
  },
  {
    title: "많은 사람 앞에서 자신감 있게 말하기",
    learningType: "INTERACTIVE",
    tag: "듣기·말하기",
    grade: "중1~중2",
    time: "20분",
    image: "/images/learning/Standard_Writing.png",
  },
  {
    title: "우연히 되살아난 가족 모임 추억",
    learningType: "WRITE",
    tag: "소통하는 글",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Write_Social.png",
  },
  {
    title: "자료를 활용하여 통일감 있는 글쓰기 완성하기",
    learningType: "INTERACTIVE",
    tag: "쓰기",
    grade: "중1~중2",
    time: "20분",
    image: "/images/learning/Standard_Writing.png",
  },
  {
    title: "독서가 생각하는 힘을 기르는 과정",
    learningType: "WRITE",
    tag: "설명하는 글",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Write_Informative.png",
  },
  {
    title: "나와 세상을 잇는 연결고리",
    learningType: "WRITE",
    tag: "이야기하는 글",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Write_Narrative.png",
  },
  {
    title: "선물은 비싼 것보다 정성이 들어간 것이 더 감동적인가?",
    learningType: "WRITE",
    tag: "주장하는 글",
    grade: "중1",
    time: "9분",
    image: "/images/learning/Write_Opinion.png",
  },
  {
    title: "소통을 위한 화법과 작문의 중요성",
    learningType: "INTERACTIVE",
    tag: "쓰기",
    grade: "중1~중2",
    time: "20분",
    image: "/images/learning/Standard_Writing.png",
  },
];

/** 무한 루프 한 세트 높이 = 전체 트랙 높이 / 복제 횟수 */
const LOOP_COPIES = 3;
const MOBILE_HORIZONTAL_COPIES = 3;
/** 가로 트랙 시작 위치 보정 (세로 SETTLE_UP_BIAS_PX와 대응) */
const MOBILE_SETTLE_X_BIAS_PX = 0;

export function MiniCard({
  title,
  tag,
  learningType,
  image,
  categoryBorderColor,
  categoryTextColor,
  categoryBgColor,
  grade,
  time,
  hashtag,
  description,
}: {
  title: string;
  tag: string;
  learningType: "WRITE" | "READ" | "SPEAK" | "INTERACTIVE" | "TEXTBOOK";
  image: string;
  categoryBorderColor: string;
  categoryTextColor: string;
  categoryBgColor: string;
  grade: string;
  time: string;
  hashtag?: string;
  description?: React.ReactNode;
}) {
  return (
    <Box
      bg="white"
      borderRadius="17px"
      boxShadow="sm"
      w={{ base: "220px", lg: "276px" }}
      flexShrink={0}
      position="relative"
    >
      {description && (
        <Flex position="absolute" top="-40px" left="-20px"  zIndex="10" width={'192px'} height={'min-content'} py={'9.2px'} px={'14.6px'} borderRadius={'5.29px'} bg={'rgba(255, 255, 255, 0.5)'} boxShadow={'0px 1px 2px 0px rgba(16, 24, 40, 0.05);'} border={'1px solid #EAECF0'}>
          {description}
        </Flex>
      )}
      
      <Box h={{ base: "90px", lg: "127px" }} borderTopRadius="17px" overflow="hidden">
        <Image src={image} alt={title} height="100%" width="100%" objectFit="cover" />
      </Box>
      <Stack p={{ base: 3, lg: 4 }} gap={2}>
        <Flex gap={2} wrap="wrap">
          {learningType && (
            <Box px={2} borderRadius="12px" bg={categoryBgColor} border={`1px solid ${categoryBorderColor}`}>
              <Text fontSize={{ base: "10px", lg: "11px" }} color={categoryTextColor} pt="3px">
                {learningType === "WRITE"
                  ? "쓰기"
                  : learningType === "READ"
                    ? "읽기"
                    : learningType === "SPEAK"
                      ? "듣기·말하기"
                      : learningType === "INTERACTIVE"
                        ? "교과 연계"
                        : "교과서"}
              </Text>
            </Box>
          )}
          {tag && (
            <Box px={2} borderRadius="12px" bg="gray.100">
              <Text fontSize={{ base: "10px", lg: "11px" }} color="gray.500" pt="3px">
                {tag}
              </Text>
            </Box>
          )}
        </Flex>
        <Text
          fontWeight="600"
          color="gray.900"
          fontSize={{ base: "16px", lg: "19px" }}
          lineHeight={{ base: "24px", lg: "29px" }}
          noOfLines={1}
          minH={'65px'}
        >
          {title}
        </Text>
        <Text fontSize={{ base: "11px", lg: "12px" }} color="gray.500">
          예상 시간: {time} | 적정 학년: {grade}
        </Text>
        {hashtag && (
          <Text fontSize={{ base: "11px", lg: "12px" }} color="gray.400">
            {hashtag}
          </Text>
        )}
      </Stack>
    </Box>
  );
}



/** 초당 속도 감쇠 (작을수록 오래 미끄러짐 — 휠 관성 느낌) */
const WHEEL_FRICTION_PER_S = 2.85;
const STOP_EPS_PX_S = 2;
/** 중앙에 가까울수록 opacity → 1, 멀수록 → 약 0.42 */
const CENTER_FADE_PX = 160;
/** 시작 위치를 미리 위로 맞추는 보정값 (정지 시 추가 보정 없이 자연스럽게 도달) */
const SETTLE_UP_BIAS_PX = -66;

/** 스크롤 방향은 항상 동일(위로). `cards`는 컬럼마다 서로 다른 배열을 넘겨야 함. */
export function ScrollingCardColumn({
  cards,
  pt,
  INTRO_INITIAL_VELOCITY_PX_S = -5600
}: {
  cards: HeroCardDef[];
  pt?: string | number;
  /** 마운트 시 한 번: 스크롤 휠을 세게 돌린 것처럼 빠른 초기 속도 (음수 = 위로, px/s). 카드·루프 길이에 맞춰 키움 */
  INTRO_INITIAL_VELOCITY_PX_S?: number;
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef = useRef(-SETTLE_UP_BIAS_PX);
  const wheelBoostRef = useRef(0);
  const loopHeightRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const introKickDoneRef = useRef(false);

  const loopCards = useMemo(() => Array.from({ length: LOOP_COPIES }, () => cards).flat(), [cards]);

  const measureLoop = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const h = track.scrollHeight / LOOP_COPIES;
    if (h > 0) loopHeightRef.current = h;
  }, []);

  useEffect(() => {
    measureLoop();
    const ro = new ResizeObserver(() => measureLoop());
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [measureLoop]);

  /** 첫 로드 시 휠을 확 돌린 것 같은 초기 관성 한 방 */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (introKickDoneRef.current) return;
    introKickDoneRef.current = true;
    wheelBoostRef.current = INTRO_INITIAL_VELOCITY_PX_S;
  }, [INTRO_INITIAL_VELOCITY_PX_S]);

  useEffect(() => {
    let rafId = 0;

    const tick = (now: number) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        track.style.transform = "translate3d(0, 0, 0)";
        cardWrapRefs.current.forEach((wrap) => {
          if (wrap) wrap.style.opacity = "1";
        });
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (lastTimeRef.current === null) lastTimeRef.current = now;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.064);
      lastTimeRef.current = now;

      let loopH = loopHeightRef.current;
      if (loopH <= 0) {
        loopH = track.scrollHeight / LOOP_COPIES;
        loopHeightRef.current = loopH;
      }

      const friction = Math.exp(-WHEEL_FRICTION_PER_S * dt);
      wheelBoostRef.current *= friction;
      if (Math.abs(wheelBoostRef.current) < STOP_EPS_PX_S) {
        wheelBoostRef.current = 0;
      }
      offsetRef.current += wheelBoostRef.current * dt;

      if (loopH > 0) {
        while (offsetRef.current <= -loopH) offsetRef.current += loopH;
        while (offsetRef.current > 0) offsetRef.current -= loopH;
      }

      track.style.transform = `translate3d(0, ${offsetRef.current}px, 0)`;

      const vRect = viewport.getBoundingClientRect();
      const centerY = vRect.top + vRect.height / 2;

      cardWrapRefs.current.forEach((wrap) => {
        if (!wrap) return;
        const r = wrap.getBoundingClientRect();
        const cy = r.top + r.height / 2;
        const dist = Math.abs(cy - centerY);
        const t = Math.max(0, 1 - dist / CENTER_FADE_PX);
        const op = 0.42 + 0.58 * t * t;
        wrap.style.opacity = op.toFixed(3);
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      lastTimeRef.current = null;
    };
  }, []);

  return (
    <Box
      ref={viewportRef}
      flex={1}
      minW={0}
      h="746px"
      position="relative"
      pt={pt}
      sx={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <Flex ref={trackRef} data-marquee-track direction="column" gap={4} w="full" willChange="transform">
        {loopCards.map((card, idx) => (
          <Box
            key={`${card.title}-${idx}`}
            ref={(el) => {
              cardWrapRefs.current[idx] = el;
            }}
          >
            <MiniCard
              title={card.title}
              tag={card.tag}
              learningType={card.learningType}
              image={card?.image ?? ""}
              hashtag={card.hashtag}
              description={card.description}
              categoryBorderColor={miniCardsImageList[card.learningType].categoryBorderColor}
              categoryTextColor={miniCardsImageList[card.learningType].categoryTextColor}
              categoryBgColor={miniCardsImageList[card.learningType].categoryBgColor}
              grade={card.grade}
              time={card.time}
            />
          </Box>
        ))}
      </Flex>
      <Box
        position="absolute"
        inset={0}
        zIndex={2}
        bg="transparent"
        pointerEvents="auto"
        onWheel={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
    </Box>
  );
}

const SCROLLING_LEARNING_CARDS_FLEX_DEFAULTS: ComponentProps<typeof Flex> = {
  display: { base: "none", lg: "flex" },
  w: "564px",
  overflow: "hidden",
  h: "746px",
  position: "absolute",
  // right: "0",
  // top: "-46px",
  gap: 4,
};

export function ScrollingLearningCards({
  isRight = true,
  INTRO_INITIAL_VELOCITY_PX_S,
  containerProps,
  ...flexProps
}: ScrollingLearningCardsProps) {
  return (
    <Flex {...SCROLLING_LEARNING_CARDS_FLEX_DEFAULTS} {...containerProps} {...flexProps}>
      <ScrollingCardColumn cards={HERO_CARDS_LEFT} INTRO_INITIAL_VELOCITY_PX_S={INTRO_INITIAL_VELOCITY_PX_S} />
      {
        isRight && (
          <ScrollingCardColumn cards={HERO_CARDS_RIGHT} pt="46px" INTRO_INITIAL_VELOCITY_PX_S={INTRO_INITIAL_VELOCITY_PX_S} />
        )
      }
    </Flex>
  );
}

type ScrollingLearningCardsMobileProps = ComponentProps<typeof Box> & {
  containerProps?: ComponentProps<typeof Flex>;
  /** 마운트 시 가로 관성 한 방 (음수 = 왼쪽으로 흐름, px/s) */
  INTRO_INITIAL_VELOCITY_PX_S?: number;
};

const MOBILE_SHARP_CARD_COUNT = 1;
const MOBILE_FADED_OPACITY = 0.42;
/** 정지 후 중앙 정렬: 매 프레임 남은 오차에 곱할 지수 감쇠 계수 (클수록 빨리 수렴) */
const MOBILE_CENTER_SNAP_LAMBDA = 22;
/** 이 픽셀 이내면 스냅 완료로 간주 */
const MOBILE_CENTER_SNAP_DONE_PX = 0.35;
/** 이보다 가까우면 한 프레임에 남은 오차 전부 보정(미세 떨림·부동소수점 종료) */
const MOBILE_CENTER_SNAP_HARD_PX = 4;

/** 모바일 전용: 가로 한 줄, 관성·감쇠 후 정지 시 중앙으로 부드럽게 수렴. 가장 가까운 1장만 선명. */
export function ScrollingLearningCardsMobile({
  containerProps,
  INTRO_INITIAL_VELOCITY_PX_S = -3400,
  ...boxProps
}: ScrollingLearningCardsMobileProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef = useRef(-MOBILE_SETTLE_X_BIAS_PX);
  const wheelBoostRef = useRef(0);
  const loopWidthRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const introKickDoneRef = useRef(false);
  const snapLockIndexRef = useRef<number | null>(null);

  const allCards = useMemo(
    () => [...HERO_CARDS_LEFT, ...HERO_CARDS_RIGHT],
    [],
  );
  const loopCards = useMemo(
    () => Array.from({ length: MOBILE_HORIZONTAL_COPIES }, () => allCards).flat(),
    [allCards],
  );

  const measureLoop = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const w = track.scrollWidth / MOBILE_HORIZONTAL_COPIES;
    if (w > 0) loopWidthRef.current = w;
  }, []);

  useEffect(() => {
    measureLoop();
    const ro = new ResizeObserver(() => measureLoop());
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [measureLoop]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (introKickDoneRef.current) return;
    introKickDoneRef.current = true;
    wheelBoostRef.current = INTRO_INITIAL_VELOCITY_PX_S;
  }, [INTRO_INITIAL_VELOCITY_PX_S]);

  useEffect(() => {
    let rafId = 0;

    const tick = (now: number) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        track.style.transform = "translate3d(0, 0, 0)";
        cardWrapRefs.current.forEach((wrap) => {
          if (wrap) wrap.style.opacity = "1";
        });
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (lastTimeRef.current === null) lastTimeRef.current = now;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.064);
      lastTimeRef.current = now;

      let loopW = loopWidthRef.current;
      if (loopW <= 0) {
        loopW = track.scrollWidth / MOBILE_HORIZONTAL_COPIES;
        loopWidthRef.current = loopW;
      }

      const boostAtStart = wheelBoostRef.current;
      const friction = Math.exp(-WHEEL_FRICTION_PER_S * dt);
      wheelBoostRef.current *= friction;
      if (Math.abs(wheelBoostRef.current) < STOP_EPS_PX_S) {
        wheelBoostRef.current = 0;
      }
      offsetRef.current += wheelBoostRef.current * dt;

      if (boostAtStart !== 0 && wheelBoostRef.current === 0) {
        snapLockIndexRef.current = null;
      }

      if (loopW > 0) {
        while (offsetRef.current <= -loopW) offsetRef.current += loopW;
        while (offsetRef.current > 0) offsetRef.current -= loopW;
      }

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;

      const stopped = wheelBoostRef.current === 0;
      const wraps = cardWrapRefs.current;
      if (stopped && loopW > 0) {
        const vRectSnap = viewport.getBoundingClientRect();
        const centerXSnap = vRectSnap.left + vRectSnap.width / 2;

        if (snapLockIndexRef.current === null) {
          let bestIdx = -1;
          let bestDist = Infinity;
          for (let i = 0; i < wraps.length; i++) {
            const wrap = wraps[i];
            if (!wrap) continue;
            const r = wrap.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const d = Math.abs(cx - centerXSnap);
            if (d < bestDist) {
              bestDist = d;
              bestIdx = i;
            }
          }
          if (bestIdx >= 0) snapLockIndexRef.current = bestIdx;
        }

        const lockIdx = snapLockIndexRef.current;
        if (lockIdx !== null) {
          const lockedWrap = wraps[lockIdx];
          if (!lockedWrap) {
            snapLockIndexRef.current = null;
          } else {
            const r = lockedWrap.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const errorPx = centerXSnap - cx;
            const dist = Math.abs(errorPx);
            if (dist <= MOBILE_CENTER_SNAP_DONE_PX) {
              snapLockIndexRef.current = null;
            } else if (dist < MOBILE_CENTER_SNAP_HARD_PX) {
              offsetRef.current += errorPx;
              while (offsetRef.current <= -loopW) offsetRef.current += loopW;
              while (offsetRef.current > 0) offsetRef.current -= loopW;
              track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
              snapLockIndexRef.current = null;
            } else {
              const alpha = 1 - Math.exp(-MOBILE_CENTER_SNAP_LAMBDA * dt);
              offsetRef.current += errorPx * alpha;
              while (offsetRef.current <= -loopW) offsetRef.current += loopW;
              while (offsetRef.current > 0) offsetRef.current -= loopW;
              track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
            }
          }
        }
      }

      const vRect = viewport.getBoundingClientRect();
      const centerX = vRect.left + vRect.width / 2;

      const lockIdxForSharp = snapLockIndexRef.current;
      const lockedForSharp =
        lockIdxForSharp !== null ? wraps[lockIdxForSharp] : null;
      let sharp: Set<HTMLDivElement>;
      if (lockedForSharp) {
        sharp = new Set([lockedForSharp]);
      } else {
        const withDist: { wrap: HTMLDivElement; dist: number }[] = [];
        wraps.forEach((wrap) => {
          if (!wrap) return;
          const r = wrap.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          withDist.push({ wrap, dist: Math.abs(cx - centerX) });
        });
        withDist.sort((a, b) => a.dist - b.dist);
        sharp = new Set(
          withDist.slice(0, MOBILE_SHARP_CARD_COUNT).map((e) => e.wrap),
        );
      }
      cardWrapRefs.current.forEach((wrap) => {
        if (!wrap) return;
        const op = sharp.has(wrap) ? 1 : MOBILE_FADED_OPACITY;
        wrap.style.opacity = op.toFixed(3);
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      lastTimeRef.current = null;
    };
  }, []);

  return (
    <Box
      ref={viewportRef}
      display={{ base: "block", lg: "none" }}
      overflow="hidden"
      w="full"
      py="10px"
      position="relative"
      sx={{
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
      {...boxProps}
    >
      <Flex
        ref={trackRef}
        data-marquee-track
        direction="row"
        w="max-content"
        align="stretch"
        gap={3}
        willChange="transform"
        {...containerProps}
      >
        {loopCards.map((card, idx) => (
          <Box
            key={`${card.title}-mobile-${idx}`}
            ref={(el) => {
              cardWrapRefs.current[idx] = el;
            }}
            flexShrink={0}
          >
            <MiniCard
              title={card.title}
              tag={card.tag}
              learningType={card.learningType}
              image={card.image}
              hashtag={card.hashtag}
              description={card.description}
              categoryBorderColor={miniCardsImageList[card.learningType].categoryBorderColor}
              categoryTextColor={miniCardsImageList[card.learningType].categoryTextColor}
              categoryBgColor={miniCardsImageList[card.learningType].categoryBgColor}
              grade={card.grade}
              time={card.time}
            />
          </Box>
        ))}
      </Flex>
      <Box
        position="absolute"
        inset={0}
        zIndex={2}
        bg="transparent"
        pointerEvents="auto"
        onWheel={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
    </Box>
  );
}
