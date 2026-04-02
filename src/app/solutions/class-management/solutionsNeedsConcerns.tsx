import { SolutionsConcernCard } from "@/components/solutions/SolutionsNeedsConcernsSection";
import { Box, Stack, Text } from "@chakra-ui/react";

export const ClassManagementSolutionsNeedsConcernsConcers: SolutionsConcernCard[] = [
  {
    text: "에듀테크를 도입하려면 학생이 다 가입해야 한다던데,\n로그인 시키는 것만으로도 한 시간이에요.",
    bg: "#F1FCF4",
    borderRadius: "50px 80px 80px 10px",
    alignSelf: "flex-start",
  },
  {
    text: "세팅이 복잡한 플랫폼은 결국 안쓰게 돼요.\n처음 한 번 해보고, 귀찮아서 손을 놓게 되더라고요.",
    bg: "#FDFDF3",
    borderRadius: "80px 50px 10px 80px",
    alignSelf: "flex-end",
  },
  {
    text: "학습 결과를 보려면 여기저기 들어가야 해서,\n정작 누가 못따라오고 있는지 파악하기 어려워요.",
    bg: "#F1FCF4",
    borderRadius: "50px 80px 80px 10px",
    alignSelf: "flex-start",
  },
  {
    text: "수업 시간에 남는 10분, 뭔가 시키고 싶은데\n그때그때 적당한 학습을 찾는 게 쉽지 않아요.",
    bg: "#FDFDF3",
    borderRadius: "80px 50px 10px 80px",
    alignSelf: "flex-end",
  },
  {
    text: "AI 학습이라고 해서 기대했는데,\n막상 써보면 수업 흐름이 끊길 때가 더 많아요.",
    bg: "#F1FCF4",
    borderRadius: "50px 80px 80px 10px",
    alignSelf: "flex-start",
  },
  {
    text: "과제를 내줘도 누가 제대로 이해했는지,\n누가 그냥 넘겼는지 알기가 어려워요.",
    bg: "#FDFDF3",
    borderRadius: "80px 50px 10px 80px",
    alignSelf: "flex-end",
  },
];
export const ClassManagementSolutionsNeedsConcernsTitle = (
  <Stack gap={{ base: 5, lg: "20px" }} w={{ base: "full", xl: "575px" }} pt={{ base: 0, xl: "52px" }} flexShrink={0}>
    <Box w="fit-content" bg="#E8F9EB" px="12px" py="6px" borderRadius="40px">
      <Text color="#1D2939" fontWeight="600" fontSize="16px" lineHeight="24px">
        선생님의 고민
      </Text>
    </Box>
    <Text color="#98A2B3" fontWeight="600" fontSize={{ base: "48px", lg: "48px" }} lineHeight={{ base: "65px", lg: "65px" }} whiteSpace="pre-line">
      {"에듀테크를 도입할 때,\n"}
      <Box as="span" color="#344054">
        {"시작하는 것 부터\n막막하지 않으셨나요?"}
      </Box>
    </Text>
  </Stack>
);