"use client";

import { Box, Button, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { TeacherStoriesStory } from "@/components/apply-target/ApplyTargetTeacherStoriesSection";

export const MiddleHighTeacherStoriesSectionTitle = (
  <Text color="#000000" fontWeight="600" fontSize={{ base: "34px", lg: "48px" }} lineHeight={{ base: "48px", lg: "60px" }} textAlign="center">
    이미 교실에서 쓰고 있는{" "}
    <Box as="span" bgGradient="linear(to-r, #43D1BC 0%, #009B84 100%)" bgClip="text" color="transparent">
      선생님들의 이야기
    </Box>
  </Text>
);

export const MiddleHighTeacherStoriesSectionDescription = "";

/** Figma node 476:29083 — secondary outline + chevron */
export const MiddleHighTeacherStoriesSectionButton = (
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
    px="18px"
    py="10px"
    minH="unset"
    h="auto"
    boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
    fontSize="16px"
    fontWeight={600}
    lineHeight="24px"
    color="#344054"
    rightIcon={<ChevronRightIcon w="20px" h="20px" />}
    _hover={{ bg: "gray.50" }}
    _active={{ bg: "gray.100" }}
    _focusVisible={{
      boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0 0 0 3px rgba(15, 179, 158, 0.35)",
    }}
  >
    중등 국어 교사, 박재형 선생님의 아티클
  </Button>
);

export const MiddleHighTeacherStoriesSectionStories: TeacherStoriesStory[] = [
  {
    quote: "“수업 시간에 바로 적용되니까\n부담이 없어요”",
    body: '수업 준비 시 자료를 따로 만들지 않아도 바로 활용할 수 있어 좋았어요. 학생들도 자기 생각을 정리하는 활동에 더 집중하게 되더라고요.',
    name: "김00 선생님",
    role: "고등 국어과",
  },
  {
    quote: "“러니를 활용하니\n수업 시간 운영이 딱 맞았어요!”",
    body: "중학교 45분 수업 시간 동안 학습하고 피드백까지 마칠 수 있는 분량이라 수업 시간에 활용하기 너무 좋았어요.",
    name: "박재형 선생님",
    role: "중등 국어과",
  },
  {
    quote: `“러니 학습 기록을 이용하니\n생기부 작성이 훨씬 빨라졌어요!”`,
    body: '학생마다 성취도 변화가 보여 풍부해진 기록으로 생기부 작성을 하루만에 끝낸 적이 있어요. 러니 덕분이에요!',
    name: "이00 선생님",
    role: "중등 국어과",
  },
  {
    quote: `“수업 설계 시간이\n확실히 줄었어요”`,
    body: `자료 찾고, 활동 구성하는 데 쓰던 시간이 많이 줄어들었어요. 이미 구조화된 콘텐츠가 있어서 수업 흐름만 잡으면 바로 활용 가능했어요.`,
    name: "최00 선생님",
    role: "중등 국어과",
  },
  
];