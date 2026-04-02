import { DailyFlowSectionFlowItem } from "@/components/apply-target/ApplyTargetDailyFlowSection";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";


export const MiddleHighDailyFlowSectionChip = (
  <Flex
    position="relative"
    align="center"
    justify="center"
    px="14px"
    h="36px"
    borderRadius="30px"
    bg="transparent"
  >
    <Box
      position="absolute"
      inset={0}
      bgImage={`url("/images/apply-target/elementary-daily-flow/chip.png")`}
      bgSize="cover"
      bgPosition="center"
      borderRadius="30px"
      pointerEvents="none"
    />
    <Text position="relative" color={'#A7765A'} fontWeight="600" fontSize="16px" lineHeight="24px">
      러니 활용 시나리오
    </Text>
  </Flex>
)
export const MiddleHighDailyFlowSectionTitle = (
  <Text
    color="black"
    fontWeight="600"
    fontSize={{ base: "34px", lg: "48px" }}
    lineHeight={{ base: "48px", lg: "60px" }}
  >
    <Box as="span" bg={"linear-gradient(90deg, #FFA600 0%, #934900 100%)"} bgClip="text" color="transparent">
      선생님의 하루
    </Box>
    에 러니가 이렇게 들어가요.
  </Text>
);

export const MiddleHighDailyFlowSectionDescription = ''

export const MiddleHighDailyFlowSectionFlowItems: DailyFlowSectionFlowItem[] = [
  {
    title: "수업 전 : [탐색하기]에서 학습 고르기",
    time: "3분",
    body: "이번 주 진도에 맞는 교과서를 선택하고,\n추천된 학습 중 적절한 것을 골라 클래스에 추가해요.",
  },
  {
    title: "수업 중 : 학습 진행하기",
    time: "10~20분",
    body: "교과서 진도에 맞춘 클래스 학습을 수업 중에 활용해요.\n국정 교과서에 따라 정리된 콘텐츠를 골라 배정하면 끝이에요.",
  },
  {
    title: "수업 후 : 학습 결과 확인하기",
    time: "2분",
    body: "학습 결과 리포트에서\n우리 반의 평균 점수, 주목할 학생 등 지도 인사이트를 한 눈에 확인해요.",
  },
];