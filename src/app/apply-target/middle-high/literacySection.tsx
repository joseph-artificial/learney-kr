
import { LiteracyCard } from "@/components/apply-target/ApplyTargetLiteracySection";
import { Box, Text } from "@chakra-ui/react";

export const MiddleHighLiteracySectionTitle = (
  <Text
    color="gray.800"
    fontWeight="600"
    fontSize={{ base: "36px", lg: "48px" }}
    lineHeight={{ base: "48px", lg: "60px" }}
  >
    문해력을 균형 있게,<br />
    <Box as="span" bgGradient="linear(to-r, #43D1BC, #009B84)" bgClip="text" color="transparent">
      읽기, 쓰기, 듣기·말하기 학습
    </Box>
  </Text>
);

export const MiddleHighLiteracySectionDescription = '문해력은 한 영역만 잘한다고 되는 게 아니에요.\n러니는 세 가지 영역을 하나의 루틴 안에서 균형있게 다뤄요.'

export const MiddleHighLiteracySectionCateforyList: string[] = [
  "주요 기능 02",
  "기초학력 학습",
];

export const MiddleHighLiteracySectionCards: LiteracyCard[] = [
  {
    title: "읽기 학습",
    subtitle: "대충 읽고 넘어가지 않도록",
    body: "글의 전체 구조를 직접 채워보는\n단계별 학습이에요.",
    bgGradient: "linear(to-r, #EFFCF6, #F9FAFB)",
    imageSrc: "/images/apply-target/elementary-daily-literacy/LiteracySectionCards1.png",
  },
  {
    title: "쓰기 학습",
    subtitle: "생각을 글로 옮기는 연습",
    body: "주장하는 글쓰기, 정보 전달 글쓰기, 등\n목적별 글쓰기를 단계적으로 연습해요.",
    bgGradient: "linear(to-r, #F7FCEF, #F9FAFB)",
    imageSrc: "/images/apply-target/elementary-daily-literacy/LiteracySectionCards2.png",
  },
  {
    title: "듣기·말하기 학습",
    subtitle: "듣고, 이해하고, 말로 표현하기",
    body: "뉴스 등 다양한 음성 콘텐츠를 듣고,\n질문에 말로 답하는 학습이에요.",
    bgGradient: "linear(to-r, #EFFCF6, #F9FAFB)",
    imageSrc: "/images/apply-target/elementary-daily-literacy/LiteracySectionCards3.png",
  },
];