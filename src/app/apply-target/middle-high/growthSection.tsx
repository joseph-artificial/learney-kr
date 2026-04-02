import { Box, Text } from "@chakra-ui/react";

export const MiddleHighGrowthSectionTitle = (
  <Text color="#101828" fontWeight={600} fontSize={{ base: "36px", lg: "48px" }} lineHeight={{ base: "48px", lg: "60px" }} >
      {'누가 어디서 막혔는지 바로 보여요.'} <br />
      <Box as="span" bgGradient="linear(to-r, #43D1BC 0%, #009B84 100%)" bgClip="text" color="transparent">
        학습 결과 확인
      </Box>
  </Text>
);

export const MiddleHighGrowthSectionDescription = '학생이 학습을 마치는 순간 결과가 자동으로 정리돼요.\n학기 말 생기부 작성 때도 이 데이터가 큰 힘이 돼요.'