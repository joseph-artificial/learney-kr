"use client";

import { useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Box, Flex, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollingLearningCards } from "../ScrollingCardColumn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type BuiltForTeachersSectionProps = {
  isShowGsap?: boolean;
};

const GRADIENT_MINT_WARM =
  "linear(122deg, rgb(239, 252, 251) 0%, rgb(255, 254, 234) 112%)";
const GRADIENT_MINT_BLUE =
  "linear(120deg, rgb(240, 251, 250) 0%, rgb(236, 243, 255) 112%)";

function SolutionChip({ children }: { children: ReactNode }) {
  return (
    <Box
      alignSelf="flex-start"
      px="10px"
      py={{base: '5px', lg: "2px"}}
      h="28px"
      borderRadius="14px"
      bg="#E8F4F5"
      display="flex"
      alignItems="center"
    >
      <Text
        fontFamily="body"
        fontWeight="500"
        fontSize={{base: '12px', lg: '16px'}}
        lineHeight={{base: '18px', lg: '24px'}}
        color="#136F64"
      >
        {children}
      </Text>
    </Box>
  );
}

function PillActive() {
  return (
    <Box
      px={{ base: "10px", lg: "18px" }}
      py={{ base: "10px", lg: "10px" }}
      borderRadius={{base: '5px', lg: '10px'}}
      bg="white"
      borderWidth="1.1px"
      borderColor="#82DDD0"
      boxShadow="0 0 22px rgba(0,0,0,0.05)"
    >
      <Box
        fontSize={{ base: "12px", lg: "12px" }}
        lineHeight={{base: '20px', lg: '17px'}}
        color="#2D9485"
      >
        <Box as="span" fontWeight="500">
          매일 자동으로,{" "}
        </Box>
        <Box as="span" fontWeight="600">
          오늘의 학습
        </Box>
      </Box>
    </Box>
  );
}

function PillInactive() {
  return (
    <Box
      px={{ base: "10px", lg: "18px" }}
      py={{ base: "10px", lg: "10px" }}
      borderRadius={{base: '5px', lg: '10px'}}
      bg="white"
      borderWidth="1.1px"
      borderColor="#FFB061"
      boxShadow="0 0 22px rgba(0,0,0,0.05)"
    >
      <Box
        fontSize={{ base: "12px", lg: "12px" }}
        lineHeight={{base: '20px', lg: '17px'}}
        color="#8A5623"
        fontWeight="500"
      >
        수업 시간에 직접,{" "}
        <Box as="span" fontWeight="600">
          클래스 학습
        </Box>
      </Box>
    </Box>
  );
}

type StoryPanelProps = {
  chip: string;
  title: ReactNode;
  description: ReactNode;
  hashtags?: ReactNode;
  visual: ReactNode;
  visualFirst?: boolean;
};

function StoryPanel({
  chip,
  title,
  description,
  hashtags,
  visual,
  visualFirst = true,
}: StoryPanelProps) {
  return (
    <Flex
      gap={{ base: 5, lg: "24px" }}
      align="stretch"
      direction={{ base: "column-reverse", lg: visualFirst ? "row" : "row-reverse" }}
      w="full"
      minH={{ base: "auto", lg: "480px" }}
      px={{base: '10px', lg: '0'}}
    >
      <Box flex={{ lg: visualFirst ? "1 1 58%" : "1 1 56%" }}>{visual}</Box>

      <Flex
        flex={{ lg: visualFirst ? "1 1 42%" : "1 1 44%" }}
        maxW={{ lg: visualFirst ? "450px" : "500px" }}
        borderRadius="28px"
        p={{ base: "8px 0 0", lg: "30px" }}
        align="center"
      >
        <Stack gap={{ base: '16px', lg: '19px' }} w="full">
          <Flex justifyContent={{base: 'center', lg: 'flex-start'}} w="full">
            <SolutionChip>{chip}</SolutionChip>
          </Flex>
          

          <Text
            fontFamily="heading"
            fontWeight="600"
            fontSize={{ base: "20px", lg: "36px" }}
            lineHeight={{ base: "30px", lg: "50px" }}
            color="#1D2939"
            whiteSpace="pre-line"
            textAlign={{base: 'center', lg: 'left'}}
          >
            {title}
          </Text>

          <Text
            fontFamily="body"
            fontWeight="500"
            fontSize={{ base: "12px", lg: "20px" }}
            lineHeight={{base: '18px', lg: '30px'}}
            color="#667085"
            whiteSpace="pre-line"
            textAlign={{base: 'center', lg: 'left'}}
          >
            {description}
          </Text>

          {hashtags ? (
            <Text
              fontFamily="body"
              fontWeight="500"
              fontSize={{ base: "12px", lg: "20px" }}
              lineHeight={{base: '14px', lg: '30px'}}
              color="#98A2B3"
              textAlign={{base: 'center', lg: 'left'}}
            >
              {hashtags}
            </Text>
          ) : null}
        </Stack>
      </Flex>
    </Flex>
  );
}

type PanelItem = {
  id: string;
  node: ReactNode;
};

function SectionTitle() {
  return (
    <Text
      fontFamily="heading"
      fontWeight="600"
      fontSize={{ base: "24px", lg: "48px" }}
      lineHeight={{ base: "34px", lg: "60px" }}
      textAlign="center"
      color="black"
      textShadow="0 0 50px rgba(20, 178, 155, 0.2)"
      maxW="718px"
    >
      <Box as="span" color="#2CA395">
        러니
      </Box>
      는 선생님의 고민들을
      <br />
      하나씩 풀어가며 만들어졌어요.
    </Text>
  );
}

export function BuiltForTeachersSection({
  isShowGsap = true,
}: BuiltForTeachersSectionProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const currentIndexRef = useRef(0);
  const wheelLockRef = useRef(false);
  const snapEnabledRef = useRef(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLgSize = useBreakpointValue({ base: false, lg: true });

  const panels = useMemo<PanelItem[]>(
    () => [
      {
        id: "panel-1",
        node: (
          <StoryPanel
            chip="01. 학습 격차 완화 솔루션"
            title={
              <>
                <Box as="span" fontWeight="700" color="#2CA395">
                  러니의 2가지 학습 모듈
                </Box>
                로{"\n"}학생 개개인의 수준에 맞는{"\n"}학습을 운영하세요
              </>
            }
            description={
              <>
                자동화가 필요한 건 AI가,{"\n"}선생님의 판단이 필요한 건 선생님이 운영해요.
              </>
            }
            visualFirst
            visual={
              <Flex
                position={{base: 'unset', lg: 'relative'}}
                minH={{ base: "279px", lg: "480px" }}
                borderRadius={{base: '13.14px', lg: '28px'}}
                bgGradient={GRADIENT_MINT_WARM}
                overflow="hidden"
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={{base: 'column', lg: 'row'}}
              >
                <Flex
                  position={{base: 'unset', lg: 'absolute'}}
                  top={{ base: "unset", lg: "24px" }}
                  left={{ base: "unset", lg: "50%" }}
                  transform={{ base: "unset", lg: "translateX(-50%)" }}
                  gap="10px"
                  flexWrap="wrap"
                  zIndex={2}
                  px={2}
                  pt={{base: '16px', lg: '0'}}
                  w={'100%'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  pb={{base: '10px', lg: '0'}}
                >
                  <Flex
                    flexDirection={{ base: "column", lg: "row" }}
                    gap={{ base: "4px", lg: "10.75px" }}
                    w={'100%'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <PillActive />
                    <PillInactive />
                  </Flex>
                  
                </Flex>

                <Box
                  position={{base: 'unset', lg: 'absolute'}}
                  left={{ base: "unset", lg: "50%" }}
                  bottom={{ base: "unset", lg: "0" }}
                  transform={{ base: "unset", lg: "translateX(-50%)" }}
                  w={{ base: "90%", lg: "102%" }}
                  maxW="660px"
                  borderTopLeftRadius={'10px'}
                  borderTopRightRadius={'10px'}
                  overflow={'hidden'}
                  borderLeft={'2px solid #E0E0E0'}
                  borderRight={'2px solid #E0E0E0'}
                  borderTop={'2px solid #E0E0E0'}
                  
                >
                  <Image
                    src="/images/landing/TeachersSection1.png"
                    alt="러니 오늘의 학습·클래스 학습 화면"
                    width={646}
                    height={371}
                    quality={100}
                    unoptimized
                    style={{ width: "100%", height: "auto", display: "block" }}
                    priority
                  />
                </Box>
              </Flex>
            }
          />
        ),
      },
      {
        id: "panel-2",
        node: (
          <StoryPanel
            chip="02. 수업 설계 솔루션"
            title={
              <>
                <Box as="span" fontWeight="700" color="#2CA395">
                  교과 연계 콘텐츠
                </Box>
                부터{"\n"}
                <Box as="span" fontWeight="700" color="#2CA395">
                  기초 학력 콘텐츠
                </Box>
                까지,{"\n"}자료는 러니가 준비했어요
              </>
            }
            description={
              <>
                선생님은 교과서와 단원만 선택하면,{"\n"}수업에 바로 쓸 수 있는
                학습이 준비되어 있어요.
              </>
            }
            hashtags="#기초학력 #문해력 #독서 #토론 #사회정서학습"
            visualFirst={false}
            visual={
              <Box
                position="relative"
                minH={{ base: "240px", lg: "480px" }}
                borderRadius="28px"
                bgGradient={GRADIENT_MINT_BLUE}
                overflow="hidden"
              >
                <Image
                    src="/images/landing/TeachersSection2.png"
                    alt="러니 오늘의 학습·클래스 학습 화면"
                    width={646}
                    height={371}
                    quality={100}
                    unoptimized
                    style={isLgSize ? { width: "90%", height: "auto", display: "block" } : { width: "100%", height: "auto", display: "block" }}
                    priority
                  />
              </Box>
            }
          />
        ),
      },
      {
        id: "panel-3",
        node: (
          <StoryPanel
            chip="03. 학생 참여 솔루션"
            title={
              <>
                <Box as="span" fontWeight="700" color="#2CA395">
                  AI 튜터, 아티쌤
                </Box>
                과 대화하며{"\n"}자연스럽게 학습하고 몰입하는 학습 태도를
                경험해보세요
              </>
            }
            description={
              <>
                다시 생각해 보게 질문을 던지고,{"\n"}학생이 스스로 성취 기준에
                도달할 수 있도록 대화로 이끌어요.
              </>
            }
            visualFirst
            visual={
              <Box
                minH={{ base: "240px", lg: "480px" }}
                borderRadius="28px"
                bgGradient={GRADIENT_MINT_WARM}
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={{base: '10px', lg: 8}}
              >
                <Box
                  position="relative"
                  w={{ base: "100%", lg: "280px" }}
                  h={{ base: "auto", lg: "280px" }}
                >
                  <Image
                    src="/images/landing/TeachersSection3.png"
                    alt="러니 오늘의 학습·클래스 학습 화면"
                    width={646}
                    height={371}
                    quality={100}
                    unoptimized
                    style={{ width: "100%", height: "auto", display: "block" }}
                    priority
                  />
                </Box>
              </Box>
            }
          />
        ),
      },
      {
        id: "panel-4",
        node: (
          <StoryPanel
            chip="04. 학습 관리 솔루션"
            title={
              <>
                우리반의 실시간 학습 현황을{"\n"}한눈에 확인하고{"\n"}
                <Box as="span" fontWeight="700" color="#2CA395">
                  지도 인사이트
                </Box>
                를 얻어보세요
              </>
            }
            description={
              <>
                클래스를 만들고 엑셀로 학생을 등록하면 끝.{"\n"}학습은 자동으로
                시작돼요.
              </>
            }
            visualFirst={false}
            visual={
              <Flex
                minH={{ base: "260px", lg: "480px" }}
                borderRadius="28px"
                bgGradient={GRADIENT_MINT_BLUE}
                alignItems="center"
                justifyContent="center"
              >
                <Flex
                  w={'100%'}
                  h={'100%'}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src="/images/landing/TeachersSection4.png"
                    alt="러니 오늘의 학습·클래스 학습 화면"
                    width={588}
                    height={480}
                    quality={100}
                    unoptimized
                    style={{ width: "90%", height: "auto", display: "block" }}
                    priority
                  />
                </Flex>
              </Flex>
            }
          />
        ),
      },
    ],
    [isLgSize]
  );

  useGSAP(
    () => {
      if (!rootRef.current || !pinRef.current) return;
      if (!isShowGsap) return;

      const isDesktop =
        typeof window !== "undefined" &&
        window.matchMedia("(min-width: 768px)").matches;

      if (!isDesktop) return;

      const items = panelsRef.current.filter(Boolean);
      if (!items.length) return;

      const lastIndex = items.length - 1;

      const resetPanels = () => {
        items.forEach((panel) => {
          gsap.killTweensOf(panel);
          gsap.set(panel, { clearProps: "all" });
        });
      };

      const setPanelImmediate = (targetIndex: number) => {
        items.forEach((panel, index) => {
          gsap.set(panel, {
            position: "absolute",
            inset: 0,
            autoAlpha: index === targetIndex ? 1 : 0,
            y: 0,
            display: index === targetIndex ? "block" : "none",
          });
        });

        currentIndexRef.current = targetIndex;
        setActiveIndex(targetIndex);
      };

      const setInitial = () => {
        items.forEach((panel, index) => {
          gsap.set(panel, {
            position: "absolute",
            inset: 0,
            autoAlpha: index === 0 ? 1 : 0,
            y: index === 0 ? 0 : 60,
            display: index === 0 ? "block" : "none",
          });
        });

        currentIndexRef.current = 0;
        setActiveIndex(0);
        snapEnabledRef.current = true;
      };

      const showPanel = (nextIndex: number, direction: 1 | -1) => {
        const prevIndex = currentIndexRef.current;
        if (nextIndex === prevIndex) return;

        const current = items[prevIndex];
        const next = items[nextIndex];
        if (!current || !next) return;

        gsap.killTweensOf([current, next]);

        gsap.set(next, {
          display: "block",
          autoAlpha: 0,
          y: direction > 0 ? 72 : -72,
        });

        const tl = gsap.timeline({
          defaults: {
            duration: 0.45,
            ease: "power3.out",
          },
        });

        tl.to(
          current,
          {
            autoAlpha: 0,
            y: direction > 0 ? -36 : 36,
          },
          0
        ).to(
          next,
          {
            autoAlpha: 1,
            y: 0,
          },
          0.08
        );

        tl.set(current, { display: "none", y: 0 });

        currentIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      };

      const syncPanelByScroll = () => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const scrollTop = window.scrollY;
        if (scrollTop < trigger.start || scrollTop > trigger.end) return;

        const raw = (scrollTop - trigger.start) / window.innerHeight;
        const nextIndex = Math.max(0, Math.min(lastIndex, Math.round(raw)));

        if (nextIndex !== currentIndexRef.current) {
          setPanelImmediate(nextIndex);
        }

        snapEnabledRef.current = nextIndex < lastIndex;
      };

      const snapDownToNext = () => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const currentIndex = currentIndexRef.current;
        const nextIndex = currentIndex + 1;
        if (nextIndex > lastIndex) return;

        wheelLockRef.current = true;
        showPanel(nextIndex, 1);

        const nextTop = trigger.start + nextIndex * window.innerHeight;

        window.scrollTo({
          top: nextTop,
          behavior: "smooth",
        });

        window.setTimeout(() => {
          wheelLockRef.current = false;
          snapEnabledRef.current = nextIndex < lastIndex;
        }, 700);
      };

      setInitial();

      const trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (items.length - 1)}`,
        pin: pinRef.current,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: () => {
          if (!wheelLockRef.current) {
            syncPanelByScroll();
          }
        },
        onEnter: () => {
          snapEnabledRef.current = currentIndexRef.current < lastIndex;
        },
        onEnterBack: () => {
          snapEnabledRef.current = currentIndexRef.current < lastIndex;
        },
        onLeave: () => {
          snapEnabledRef.current = false;
        },
        onLeaveBack: () => {
          snapEnabledRef.current = true;
        },
      });

      triggerRef.current = trigger;

      const onWheel = (event: WheelEvent) => {
        const currentTrigger = triggerRef.current;
        if (!currentTrigger || !currentTrigger.isActive) return;
        if (event.deltaY <= 0) return;

        if (wheelLockRef.current) {
          event.preventDefault();
          return;
        }

        if (!snapEnabledRef.current) {
          return;
        }

        if (currentIndexRef.current >= lastIndex) {
          snapEnabledRef.current = false;
          return;
        }

        event.preventDefault();
        snapDownToNext();
      };

      window.addEventListener("wheel", onWheel, { passive: false });

      return () => {
        window.removeEventListener("wheel", onWheel);
        if (triggerRef.current) {
          triggerRef.current.kill(true);
          triggerRef.current = null;
        }
        resetPanels();
      };
    },
    {
      scope: rootRef,
      dependencies: [isShowGsap],
      revertOnUpdate: true,
    }
  );
  console.log({isShowGsap});
  

  return (
    <Box
      ref={rootRef}
      as="section"
      bg="white"
      position="relative"
      px={{ base: 4, lg: 6 }}
      py={{ base: "50px", lg: 0 }}
    >
      {/* desktop + gsap */}
      <Box
        ref={pinRef}
        display={{
          base: "none",
          lg: isShowGsap ? "flex" : "none",
        }}
        minH="100vh"
        alignItems="center"
      >
        <Stack
          align="center"
          gap={{ base: "40px", lg: "48px" }}
          maxW="1200px"
          mx="auto"
          w="full"
          pt={{ base: 0, lg: "160px" }}
          pb={{ base: 0, lg: "80px" }}
        >
          <SectionTitle />

          <Box
            position="relative"
            w="full"
            minH={{ base: "auto", lg: "560px" }}
          >
            {panels.map((panel, index) => (
              <Box
                key={`desktop-gsap-${panel.id}`}
                ref={(el) => {
                  if (el) {
                    panelsRef.current[index] = el;
                  }
                }}
                w="full"
              >
                {panel.node}
              </Box>
            ))}
          </Box>

          <Flex gap="8px" justify="center" align="center">
            {panels.map((panel, index) => (
              <Box
                key={`${panel.id}-dot`}
                w={activeIndex === index ? "28px" : "8px"}
                h="8px"
                borderRadius="999px"
                bg={activeIndex === index ? "#2CA395" : "gray.300"}
                transition="all 0.25s ease"
              />
            ))}
          </Flex>
        </Stack>
      </Box>

      {/* desktop + list */}
      <Box
        display={{
          base: "none",
          lg: isShowGsap ? "none" : "block",
        }}
      >
        <Stack
          align="center"
          gap={{ base: "40px", lg: "60px" }}
          maxW="1200px"
          mx="auto"
          py={{ base: 0, lg: "120px" }}
        >
          <SectionTitle />

          <Stack gap={{ base: "32px", lg: "40px" }} w="full">
            {panels.map((panel) => (
              <Box key={`desktop-list-${panel.id}`}>{panel.node}</Box>
            ))}
          </Stack>
        </Stack>
      </Box>

      {/* mobile */}
      <Box display={{ base: "block", lg: "none" }}>
        <Stack
          align="center"
          gap={{ base: "40px", lg: "60px" }}
          maxW="1200px"
          mx="auto"
        >
          <SectionTitle />

          <Stack gap={{ base: "32px", lg: "40px" }} w="full">
            {panels.map((panel) => (
              <Box key={`mobile-${panel.id}`}>{panel.node}</Box>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}