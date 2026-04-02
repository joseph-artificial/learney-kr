import { SolutionsConcernCard } from "@/components/solutions/SolutionsNeedsConcernsSection";
import { Box, Stack, Text } from "@chakra-ui/react";

export const OperationSystemSolutionsNeedsConcernsConcers: SolutionsConcernCard[] = [
  {
    text: "같은 반이라도 수준 차이가 커서,\n전부 같은 학습을 주기도 그렇고,\n학생마다 다르게 주기도 현실적으로 어려워요.",
    bg: "#F8F6FF",
    borderRadius: "50px 80px 80px 10px",
    alignSelf: "flex-start",
  },
  {
    text: "자동으로 학습이 나가는 건 편한데,\n수업 진도에 맞춘 학습을 따로 줄 수가 없어요.",
    bg: "#F6FEFF",
    borderRadius: "80px 50px 10px 80px",
    alignSelf: "flex-end",
  },
  {
    text: "수업 시간에 쓸 자료는 제가 골라야 하는데,\n매일 아침 자습 시간에도 일일이 배정하자니\n너무 번거로워요.",
    bg: "#F8F6FF",
    borderRadius: "50px 80px 80px 10px",
    alignSelf: "flex-start",
  },
  {
    text: "아침 자습, 수업, 과제까지\n상황마다 필요한 학습이 다른데,\n하나의 방식으로는 다 맞추기 어려워요.",
    bg: "#F6FEFF",
    borderRadius: "50px 80px 80px 10px",
    alignSelf: "flex-end",
  },
  {
    text: "플랫폼은 많은데\n우리 반에 맞게 꾸준히 활용할 수 있는 건\n생각보다 많지 않아요.",
    bg: "#F8F6FF",
    borderRadius: "80px 50px 10px 80px",
    alignSelf: "flex-start",
  },
  {
    text: "수업 흐름에 맞게 쓰고 싶은데,\n툴에 맞춰 수업을 바꿔야 하는 느낌이 들어서\n부담스러워요.",
    bg: "#F6FEFF",
    borderRadius: "50px 80px 80px 10px",
    alignSelf: "flex-end",
  }
];
export const OperationSystemSolutionsNeedsConcernsTitle = (
  <Stack gap={{ base: 5, lg: "20px" }} w={{ base: "full", xl: "575px" }} pt={{ base: 0, xl: "52px" }} flexShrink={0}>
    <Box w="fit-content" bg="#EFE9FF" px="12px" py="6px" borderRadius="40px">
      <Text color="#451F77" fontWeight="600" fontSize="16px" lineHeight="24px">
        선생님의 고민
      </Text>
    </Box>
    <Text color="#98A2B3" fontWeight="600" fontSize={{ base: "48px", lg: "48px" }} lineHeight={{ base: "65px", lg: "65px" }} whiteSpace="pre-line">
      {"하나의 방식으로는"}<br />
      <Box as="span" color="#344054">
        {"교실의 모든 상황을 커버하기\n쉽지 않아요."}
      </Box>
    </Text>
  </Stack>
);