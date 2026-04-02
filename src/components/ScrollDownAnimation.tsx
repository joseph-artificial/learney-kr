"use client";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import type { MouseEvent } from "react";

type ScrollDownAnimationProps = {
  /** `#id`, `.class`, 또는 접두사 없이 id 우선 → 없으면 클래스로 탐색 */
  targetClassName?: string;
};

function getHeaderOffsetPx(): number {
  const header = document.querySelector("header");
  if (header instanceof HTMLElement) return header.offsetHeight;
  return 80;
}

/** fixed 헤더 아래에 요소 상단이 오도록 스크롤 */
function scrollElementIntoViewBelowHeader(target: HTMLElement) {
  const offset = getHeaderOffsetPx();
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

function resolveScrollTarget(raw: string): HTMLElement | null {
  const s = raw.trim();
  if (!s) return null;
  if (s.startsWith("#")) return document.querySelector(s);
  if (s.startsWith(".")) return document.querySelector(s);
  const byId = document.getElementById(s);
  if (byId) return byId;
  return document.querySelector(`.${s}`);
}

export function ScrollDownAnimation({ targetClassName }: ScrollDownAnimationProps) {
  const handleScrollNext = (e: MouseEvent<HTMLElement>) => {
    if (targetClassName?.trim()) {
      const targetEl = resolveScrollTarget(targetClassName);
      if (targetEl) {
        scrollElementIntoViewBelowHeader(targetEl);
        return;
      }
    }

    // 클릭한 버튼 기준으로 가장 가까운 section → 다음 형제
    const trigger = e.currentTarget;
    const section = trigger.closest("section");
    const nextSection = section?.nextElementSibling as HTMLElement | null;

    if (nextSection) {
      scrollElementIntoViewBelowHeader(nextSection);
      return;
    }

    window.scrollBy({ top: window.innerHeight * 0.35, behavior: "smooth" });
  };

  const isLgSize = useBreakpointValue({ base: false, lg: true });
  return (
    <Flex justifyContent="center" alignItems="center" pb={'20px'}>
      <Flex
        as="button"
        type="button"
        onClick={handleScrollNext}
        bg="transparent"
        border="none"
        p={0}
        cursor="pointer"
        direction="column"
        align="center"
        justify="center"
        _hover={{ opacity: 0.95 }}
        _focusVisible={{ outline: "2px solid #15B79E", outlineOffset: "4px", borderRadius: "8px" }}
      >
        <ScrollDownIcon size={isLgSize ? 37.5 : 24} strokeWidth={5} opacity={0.75} animation="bounce" />
      </Flex>
    </Flex>
  );
}


type ScrollDownIconProps = {
  color?: string;
  size?: number;
  strokeWidth?: number;
  opacity?: number;
  animation?: "bounce" | "pulse" | "none";
};

export default function ScrollDownIcon({
  color = "#98A2B3",
  size = 44,
  strokeWidth = 6,
  opacity = 0.6,
  animation = "bounce",
}: ScrollDownIconProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w={`${size}px`}
      gap={'7px'}
      h={`${((size * 25) / 44) * 2}px`}
      sx={{
        "@keyframes chevronFlow": {
          "0%": {
            opacity: 0.12,
          },
          "25%": {
            opacity: 0.55,
          },
          "50%": {
            opacity: 1,
          },
          "75%": {
            opacity: 0.55,
          },
          "100%": {
            opacity: 0.12,
          },
        },
        "@keyframes pulse": {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 1 },
        },
      }}
    >
      {[0, 1, 2].map((idx) => (
        <Box
          key={idx}
          mt={idx === 0 ? "0px" : "-10px"}
          animation={
            animation === "none"
              ? undefined
              : animation === "pulse"
              ? "pulse 1.6s infinite"
              : "chevronFlow 1.6s infinite"
          }
          style={animation === "none" ? undefined : { animationDelay: `${idx * 0.22}s` }}
        >
          <svg
            width={size}
            height={(size * 25) / 44}
            viewBox="0 0 44 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity={opacity}
              d="M3 3L21.75 21.75L40.5 3"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
      ))}
    </Box>
  );
}