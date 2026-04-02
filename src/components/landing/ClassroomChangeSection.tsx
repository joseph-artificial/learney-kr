"use client";

import { useLayoutEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const changes = [
  {
    title: "수업 준비 시간이 많이 줄었어요!",
    accent: "수업 준비 시간",
    statPrefix: "학습 배정까지, ",
    statEmphasis: "단 5분",
  },
  {
    title: "학습에 적극적인 학생이 늘었어요!",
    accent: "적극적인 학생",
    statPrefix: "학생 자발적 ",
    statEmphasis: "참여율 증가",
  },
  {
    title: "수업에 활용할 콘텐츠가 충분해요!",
    accent: "콘텐츠가 충분",
    statPrefix: "2022 개정 교육과정 성취 기준 기반 콘텐츠 ",
    statEmphasis: "3,600+",
  },
  {
    title: "현장 전문가가 검증했어요!",
    accent: "현장 전문가",
    statPrefix: "충남교육청 실증 평가 교육적 유용성 ",
    statEmphasis: "4.95 / 5.0",
  },
];

type ClassroomChangeSectionProps = {
  isShowGsap?: boolean;
  setIsShowGsap?: (isShowGsap: boolean) => void;
};

export function ClassroomChangeSection({
  isShowGsap = true,
  setIsShowGsap,
}: ClassroomChangeSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const didSwitchRef = useRef(false);
  const isShowGsapRef = useRef(isShowGsap);

  useLayoutEffect(() => {
    isShowGsapRef.current = isShowGsap;
  }, [isShowGsap]);

  useGSAP(
    () => {
      if (!sectionRef.current || !pinRef.current) return;

      const isDesktop =
        typeof window !== "undefined" &&
        window.matchMedia("(min-width: 768px)").matches;

      if (!isDesktop) return;

      /**
       * BuiltForTeachersSection 에서 setIsShowGsap(false) 시 GSAP 해제 → 세로 리스트로 늘어나며
       * 문서 높이가 위쪽에서 증가한다. scrollY 는 그대로라 뷰포트에 보이는 내용이 밀려 보인다.
       * 동기 렌더 후 이 섹션 상단이 뷰포트에서의 위치를 유지하도록 scroll 보정 + 보정 끝날 때까지 휠 잠금.
       */
      const stabilizeViewportAfterTeachersExpand = () => {
        const el = sectionRef.current;
        if (!el) return;

        let finished = false;
        const preventScroll = (e: Event) => {
          e.preventDefault();
        };
        window.addEventListener("wheel", preventScroll, { passive: false });
        window.addEventListener("touchmove", preventScroll, { passive: false });

        const finish = () => {
          if (finished) return;
          finished = true;
          window.clearTimeout(safetyTimer);
          window.removeEventListener("wheel", preventScroll);
          window.removeEventListener("touchmove", preventScroll);
          ScrollTrigger.refresh();
        };

        const safetyTimer = window.setTimeout(finish, 450);

        let frames = 0;
        const maxFrames = 12;
        const step = () => {
          frames += 1;
          const top = el.getBoundingClientRect().top;
          if (Math.abs(top) > 1.5) {
            window.scrollTo({
              top: window.scrollY + top,
              left: 0,
              behavior: "instant" as ScrollBehavior,
            });
          }
          const topAfter = el.getBoundingClientRect().top;
          if ((Math.abs(topAfter) < 2 && frames >= 2) || frames >= maxFrames) {
            finish();
            return;
          }
          requestAnimationFrame(step);
        };

        requestAnimationFrame(() => {
          requestAnimationFrame(step);
        });
      };

      const applyTeachersListModeAndStabilizeScroll = () => {
        flushSync(() => {
          setIsShowGsap?.(false);
        });
        stabilizeViewportAfterTeachersExpand();
      };

      /** 한 번 이 섹션 트리거 구간을 벗어나면 핀 제거 — 다시 올라왔다 내려갈 때마다 잠깐 고정되는 현상 방지 */
      let scrollTrigger: ScrollTrigger | null = null;

      const disposeScrollPin = () => {
        if (!scrollTrigger) return;
        const st = scrollTrigger;
        scrollTrigger = null;
        st.kill(true);
        ScrollTrigger.refresh();
      };

      scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=900",
        pin: pinRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          if (!didSwitchRef.current) {
            didSwitchRef.current = true;
            if (isShowGsapRef.current) {
              applyTeachersListModeAndStabilizeScroll();
            }
          }
        },
        onEnterBack: () => {
          if (!didSwitchRef.current) {
            didSwitchRef.current = true;
            if (isShowGsapRef.current) {
              applyTeachersListModeAndStabilizeScroll();
            }
          } else if (isShowGsapRef.current) {
            flushSync(() => {
              setIsShowGsap?.(false);
            });
          }
        },
        onLeave: () => {
          disposeScrollPin();
        },
        onLeaveBack: () => {
          disposeScrollPin();
        },
      });

      return () => {
        scrollTrigger?.kill(true);
        scrollTrigger = null;
      };
    },
    { scope: sectionRef, dependencies: [setIsShowGsap] }
  );

  return (
    <Box
      ref={sectionRef}
      as="section"
      position="relative"
      minH={{ base: "auto", lg: "100vh" }}
      overflow="hidden"
      zIndex={2}
    >
      <Box
        ref={pinRef}
        position="relative"
        minH={{ base: "auto", lg: "100vh" }}
        display="flex"
        alignItems="center"
        py={{ base: "50px", lg: "120px" }}
        px={{ base: 4, lg: "120px" }}
      >
        <Box
          position="absolute"
          inset={0}
          bgImage="url('/images/landing/background.jpeg')"
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
        />
        <Box position="absolute" inset={0} bg="rgba(0, 0, 0, 0.7)" />

        <Box maxW="1200px" mx="auto" position="relative" zIndex={1} w="full">
          <Stack gap={{ base: '16px', lg: 5}} textAlign="center" mb={{ base: 10, lg: "60px" }}>
            <Text
              fontFamily="heading"
              fontWeight="600"
              fontSize={{ base: "24px", lg: "48px" }}
              lineHeight={{ base: "34px", lg: "60px" }}
              color="white"
            >
              러니는 이미{" "}
              <Box as="span" color="#99F6E0">
                전국의 학교
              </Box>
              에서 사용되고 있어요.
            </Text>
            <Text
              fontFamily="body"
              fontWeight="400"
              fontSize={{ base: "14px", lg: "24px" }}
              lineHeight={{base: '18px', lg: '32px'}}
              color="white"
            >
              러니 도입 후, 이렇게 달라졌어요
            </Text>
          </Stack>

          <Stack gap={5} align="center">
            {changes.map((item, idx) => (
              <Flex
                key={item.title}
                w="full"
                maxW="1080px"
                bg="rgba(0, 0, 0, 0.3)"
                backdropFilter="blur(9.4px)"
                borderWidth="2px"
                borderColor="#737373"
                borderRadius="28px"
                h="102px"
                align={{base: 'flex-start', lg: 'center'}}
                justify="space-between"
                px={{ base: 4, lg: "42px" }}
                py="20px"
                gap={{ base: '0', lg: 4}}
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay={80 + idx * 90}
                data-aos-once="true"
                data-aos-offset="40"
                flexDirection={{ base: "column", lg: "row" }}
              >
                <Flex align="center" minW={0} flex={1}>
                  <Text
                    fontFamily="heading"
                    fontWeight="600"
                    fontSize={{ base: "16px", lg: "30px" }}
                    lineHeight={{ base: "24px", lg: "44.8px" }}
                    color="white"
                    whiteSpace={{ base: "normal", lg: "nowrap" }}
                  >
                    {item.title.replace(item.accent, "") ? (
                      <>
                        {item.title.split(item.accent)[0]}
                        <Box as="span" color="#81FFED">
                          {item.accent}
                        </Box>
                        {item.title.split(item.accent)[1]}
                      </>
                    ) : (
                      <Box as="span" color="#81FFED">
                        {item.accent}
                      </Box>
                    )}
                  </Text>
                </Flex>
                <Text
                  fontFamily="body"
                  fontWeight="500"
                  fontSize={{ base: "12px", lg: "18px" }}
                  lineHeight={{base: '24px', lg: '32px'}}
                  color="rgba(255, 255, 255, 0.8)"
                  whiteSpace="nowrap"
                  textAlign="right"
                >
                  {item.statPrefix}
                  <Box
                    as="span"
                    fontSize={{ base: "16px", lg: "32px" }}
                    color="white"
                  >
                    {item.statEmphasis}
                  </Box>
                </Text>
              </Flex>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}