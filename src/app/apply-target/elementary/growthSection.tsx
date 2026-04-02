import { Box, Text } from "@chakra-ui/react";

export const ElementaryGrowthSectionTitle = (
  <Text color="#101828" fontWeight={600} fontSize={{ base: "24px", lg: "48px" }} lineHeight={{ base: "34px", lg: "60px" }} textAlign="center">
      <Box as="span" bgGradient="linear(to-r, #43D1BC 0%, #009B84 100%)" bgClip="text" color="transparent">
        데이터
      </Box>{" "}
      로 확인하는 문해력 성장
  </Text>
);

export const ElementaryGrowthSectionDescription = '러니는 매일의 학습 기록이 자동으로 쌓이니까, 아이의 성장을 숫자로 확인할 수 있어요.\n학기 말 생활기록부를 쓸 때도 이 데이터가 큰 도움이 돼요.'