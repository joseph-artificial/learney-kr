"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

const STAGE_1_AT = 300;
const STAGE_2_AT = 1400;
const STAGE_3_AT = 2800;
const START_FADE_OUT_AT = 3400;
const UNMOUNT_AT = 4000;
const OVERLAY_LAST_SHOWN_KEY = "landing-intro-overlay-last-shown-at";
const ONE_DAY_MS = 12 * 60 * 60 * 1000;

export function LandingIntroOverlay() {
  const [stage, setStage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const gradient = useMemo(
    () =>
      "linear-gradient(180deg, #7FF4E3 0%, #8EEDE0 22%, #B8F4EA 45%, #D9FAF3 66%, #EEFCF9 84%, #FFFFFF 100%)",
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const lastShownAtRaw = window.localStorage.getItem(OVERLAY_LAST_SHOWN_KEY);
      if (lastShownAtRaw) {
        const lastShownAt = Number(lastShownAtRaw);
        if (!Number.isNaN(lastShownAt) && Date.now() - lastShownAt < ONE_DAY_MS) {
          window.setTimeout(() => setIsVisible(false), 0);
          return;
        }
      }
      window.localStorage.setItem(OVERLAY_LAST_SHOWN_KEY, String(Date.now()));
    } catch {
      // localStorage 접근이 제한된 환경에서는 기존 동작 유지
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      window.setTimeout(() => setIsVisible(false), 0);
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timers = [
      window.setTimeout(() => setStage(1), STAGE_1_AT),
      window.setTimeout(() => setStage(2), STAGE_2_AT),
      window.setTimeout(() => setStage(3), STAGE_3_AT),
      window.setTimeout(() => setStage(4), START_FADE_OUT_AT),
      window.setTimeout(() => setIsVisible(false), UNMOUNT_AT),
    ];

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      document.body.style.overflow = "";
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={3000}
      pointerEvents="none"
      opacity={stage >= 4 ? 0 : 1}
      transition="opacity 560ms ease"
      bg="white"
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset={0}
        bgGradient={gradient}
        opacity={stage >= 1 ? 1 : 0}
        transform={stage >= 1 ? "translateY(0)" : "translateY(-100%)"}
        transformOrigin="top center"
        transition="opacity 780ms ease, transform 780ms cubic-bezier(0.22, 1, 0.36, 1)"
      />

      <Flex position="absolute" inset={0} align="center" justify="center" px={6} zIndex={2}>
        <Box textAlign="center">
          <Text
            color="black"
            fontFamily="heading"
            fontWeight="600"
            fontSize={{ base: "32px", sm: "40px", lg: "52px", xl: "60px" }}
            lineHeight={{ base: "42px", sm: "52px", lg: "68px", xl: "80px" }}
            whiteSpace="pre-line"
            opacity={stage >= 1 ? 1 : 0}
            transform={stage >= 3 ? "scale(0.98)" : stage >= 1 ? "translateY(0)" : "translateY(-26px)"}
            transition="opacity 620ms ease, transform 620ms cubic-bezier(0.22, 1, 0.36, 1)"
          >
            {"학교에서 바로 쓰는\n선생님의 국어 수업 파트너"}
          </Text>

          <Box
            opacity={stage >= 2 ? 1 : 0}
            transform={stage >= 3 ? "scale(0.98)" : stage >= 2 ? "translateY(0)" : "translateY(-22px)"}
            transition="opacity 620ms ease, transform 620ms cubic-bezier(0.22, 1, 0.36, 1)"
          >
            <Text
              as="span"
              display="block"
              fontFamily="heading"
              fontWeight="600"
              fontSize={{ base: "32px", sm: "40px", lg: "52px", xl: "60px" }}
              lineHeight={{ base: "42px", sm: "52px", lg: "68px", xl: "80px" }}
              whiteSpace="pre-line"
              sx={{
                backgroundImage: "linear-gradient(90deg, #00B6A1 0%, #00413A 58.65%, #0094C1 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              러니 Learney
            </Text>
          </Box>
        </Box>
      </Flex>

      <Box
        position="absolute"
        left="50%"
        bottom="-45vh"
        transform={
          stage >= 3
            ? "translateX(-50%) scale(2.8)"
            : "translateX(-50%) scale(0.2)"
        }
        transformOrigin="center center"
        w={{ base: "140vw", lg: "120vw", xl: "1100px" }}
        h={{ base: "140vw", lg: "120vw", xl: "1100px" }}
        borderRadius="full"
        opacity={stage >= 3 ? 1 : 0}
        transition="
          opacity 2240ms ease,
          transform 900ms cubic-bezier(0.22, 1, 0.36, 1)
        "
        bg="radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(238,252,249,0.98) 30%, rgba(217,250,243,0.9) 52%, rgba(217,250,243,0.45) 66%, rgba(217,250,243,0) 78%)"
        filter="blur(34px)"
        zIndex={3}
      />

      <Box
  position="absolute"
  left="50%"
  bottom="-45vh"
  transform={
    stage >= 3
      ? "translateX(-50%) scale(2.15)"
      : "translateX(-50%) scale(0.9)"
  }
  transformOrigin="center center"
  w={{ base: "140vw", lg: "120vw", xl: "1100px" }}
  h={{ base: "140vw", lg: "120vw", xl: "1100px" }}
  borderRadius="full"
  opacity={stage >= 3 ? 0.82 : 0}
  transition="
    opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 1600ms cubic-bezier(0.16, 1, 0.3, 1)
  "
  bg="radial-gradient(circle, rgba(255,255,255,0.82) 0%, rgba(238,252,249,0.72) 28%, rgba(217,250,243,0.5) 48%, rgba(217,250,243,0.2) 64%, rgba(217,250,243,0) 78%)"
  filter="blur(42px)"
  zIndex={3}
/>

      <Box
        position="absolute"
        inset={0}
        opacity={stage >= 3 ? 1 : 0}
        transition="opacity 500ms ease"
        bg="radial-gradient(circle at 50% 72%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 32%, rgba(255,255,255,0.36) 54%, rgba(255,255,255,0.78) 74%, rgba(255,255,255,1) 100%)"
        zIndex={1}
      />
    </Box>
  );
}