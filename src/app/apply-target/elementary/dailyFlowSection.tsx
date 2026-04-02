import { DailyFlowSectionFlowItem } from "@/components/apply-target/ApplyTargetDailyFlowSection";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";


export const ElementaryDailyFlowSectionChip = (
  <Flex
    position="relative"
    align="center"
    justify="center"
    px="14px"
    h={{base: '28px', lg: '36px'}}
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
    <Text position="relative" color={'#A7765A'} fontWeight="600" fontSize={{base: '12px', lg: '16px'}} lineHeight={{base: '18px', lg: '24px'}}>
      러니 활용 시나리오
    </Text>
  </Flex>
)
export const ElementaryDailyFlowSectionTitle = (
  <Text
    color="black"
    fontWeight="600"
    fontSize={{ base: "24px", lg: "48px" }}
    lineHeight={{ base: "34px", lg: "60px" }}
  >
    <Box as="span" bg={"linear-gradient(90deg, #FFA600 0%, #934900 100%)"} bgClip="text" color="transparent">
      선생님의 하루
    </Box>
    에 러니가 이렇게 들어가요.
  </Text>
);

export const ElementaryDailyFlowSectionDescription = ''

export const ElementaryDailyFlowSectionFlowItems: DailyFlowSectionFlowItem[] = [
  {
    title: "아침 자습 시간 : 오늘의 학습",
    time: "10분",
    body: "어제의 학습 결과에 따라 AI가 오늘의 학습을 자동으로 준비해뒀어요.\n읽기, 쓰기, 듣기·말하기가 매일 다르게, 학생 개개인의 수준에 맞게 제공돼요.",
  },
  {
    title: "국어 수업 시간 : 클래스 학습",
    time: "10~20분",
    body: "교과서 진도에 맞춘 클래스 학습을 수업 중에 활용해요.\n국정 교과서에 따라 정리된 콘텐츠를 골라 배정하면 끝이에요.",
  },
  {
    title: "수업 후 남는 시간 : 짧은 학습",
    time: "5~10분",
    body: "수업이 일찍 끝나서 애매하게 남는 시간, 러니의 10분 미만 추천 학습을 활용해요.\n수업에서 다룬 주제와 관련된 짧은 학습을 검색해서 바로 배정할 수 있어요.",
  },
];