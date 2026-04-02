"use client";

import { Box, Button, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { TeacherStoriesStory } from "@/components/apply-target/ApplyTargetTeacherStoriesSection";

export const ElementaryTeacherStoriesSectionTitle = (
  <>
    <Text color="#000000" fontWeight="600" fontSize={{ base: "24px", lg: "48px" }} lineHeight={{ base: "34px", lg: "60px" }} textAlign="center" display={{base: 'block', lg: 'none'}}>
      이미 교실에서 쓰고 있는 <br />
      <Box as="span" color="#2CA395">
        선생님들의 이야기
      </Box>
    </Text>
    <Text color="#000000" fontWeight="600" fontSize={{ base: "24px", lg: "48px" }} lineHeight={{ base: "34px", lg: "60px" }} textAlign="center" display={{base: 'none', lg: 'block'}}>
      이미 교실에서 쓰고 있는{" "}
      <Box as="span" color="#2CA395">
        선생님들의 이야기
      </Box>
    </Text>
  </>
  
);

export const ElementaryTeacherStoriesSectionDescription = "";

/** Figma node 476:29083 — secondary outline + chevron */
export const ElementaryTeacherStoriesSectionButton = (
  <Button
    variant="unstyled"
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    gap="8px"
    bg="white"
    borderWidth="1px"
    borderColor="#D0D5DD"
    borderStyle="solid"
    borderRadius="12px"
    px={{base: '14px', lg: '18px'}}
    py={{base: '8px', lg: '10px'}}
    minH="unset"
    h="auto"
    boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
    fontSize={{base: '14px', lg: '16px'}}
    fontWeight={600}
    lineHeight={{base: '2px', lg: '24px'}}
    color="#344054"
    rightIcon={<ChevronRightIcon w="20px" h="20px" />}
    _hover={{ bg: "gray.50" }}
    _active={{ bg: "gray.100" }}
    _focusVisible={{
      boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0 0 0 3px rgba(15, 179, 158, 0.35)",
    }}
  >
    초등학교 4학년 담임, 손미주 선생님의 아티클
  </Button>
);

export const ElementaryTeacherStoriesSectionStories: TeacherStoriesStory[] = [
  {
    quote: "“아이들이 부담 없이 끝까지\n답하려고 하더라고요”",
    body: "“학생이 엉뚱하게 대답해도 틀렸다고 하지 않고, 다시 생각해 볼 수 있도록 이야기해줘서 좋아요. 특히 아이들의 답변에 따라 달라지는 아티쌤의 피드백이 인상적이었어요!”",
    name: "나00 선생님",
    role: "초등학교",
  },
  {
    quote: "“아이들이 아티쌤한테 말 걸고\n싶어서 아침마다 러니를 켜요.”",
    body: "다른 플랫폼은 시키면 하는 느낌인데, 러니는 아이들이 먼저 하고 싶어 해요!",
    name: "손미주 선생님",
    role: "초등학교 4학년 담임",
  },
  {
    quote: "“AI가 학습을 추천해 주니까,\n수업 준비 시간이 확실히 줄었어요”",
    body: "학생마다 부족한 부분도 바로 보여서 지도하기가 훨씬 수월해요. 덕분에 수업을 편하게 준비할 수 있어요!",
    name: "박00 선생님",
    role: "초등학교",
  },
  {
    quote: "“1학기 대비 2학기에 정답률이\n눈에 띄게 올라갔어요.”",
    body: `특히 '구조화하기'를 반복하다 보니 아이들이 문단 개념과 핵심 내용을 자연스럽게 파악하게 됐어요!`,
    name: "손미주 선생님",
    role: "초등학교 4학년 담임",
  },
  
];