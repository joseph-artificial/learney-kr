"use client";

import { Box, Button, Flex, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { ScrollingLearningCards, ScrollingLearningCardsMobile } from "@/components/ScrollingCardColumn";

export function ElementaryHeroSection() {

  const isLgSize = useBreakpointValue({ base: false, lg: true });
  return (
    <Box bgGradient="linear(to-b, #FFF4E0 0%, #FFF4E0 10%, #D0FEF8 100%)" h="700px" overflow="hidden">
      <Flex
        maxW="1440px"
        mx="auto"
        h={{ base: "auto", lg: "730px" }}
        minH={{ base: "auto", lg: "730px" }}
        direction={{ base: "column", lg: "row" }}
        position="relative"
        
      >
        <Box
          flex={1}
          
          py={{ base: '40px', lg: "140px" }}
          display="flex"
          alignItems="center"
        >
          <Stack gap={{ base: '16px', lg: "20px" }} maxW={{ base: "full", lg: "520px" }} w="full" align={{ base: "center", lg: "flex-start" }}>
            <Box borderRadius="16px" overflow="hidden" w="fit-content">
              <Box
                px={3}
                py={1}
                border="1px solid #0000"
                borderRadius="25px"
                background="conic-gradient(#fff  0 0) padding-box, linear-gradient(#FF4E50,#40C0CB) border-box"
              >
                초등 맞춤
              </Box>
            </Box>
            <Text
              fontWeight="600"
              color="black"
              fontSize={{ base: "26px", lg: "48px" }}
              lineHeight={{ base: "34px", lg: "60px" }}
              whiteSpace="pre-line"
              textAlign={{ base: "center", lg: "left" }}
            >
              {"아침 자습 시간,"}<br /><Box as="span" color="#2CA395">문해력 루틴</Box>{"을 만드세요."}
            </Text>
            <Text
              fontSize={{ base: "14px", lg: "24px" }}
              lineHeight={{ base: "20px", lg: "36px" }}
              color="gray.600"
              whiteSpace="pre-line"
              textAlign={{ base: "center", lg: "left" }}
            >
              {"읽기, 쓰기, 듣기·말하기까지,\n수준에 맞춰 AI가 매일 학습을 준비해줘요.\n선생님은 처음 한 번만 설정하세요."}
            </Text>
            {!isLgSize && <ScrollingLearningCardsMobile INTRO_INITIAL_VELOCITY_PX_S={-3100} />}
              <Button
                px="20px"
              h="48px"
              w={'fit-content'}
                borderRadius="12px"
                bg="primary.600"
                boxShadow="0 1px 2px rgba(16,24,40,0.05)"
                mt={{ base: '0px', lg: "20px" }}
              _hover={{ bg: "primary.700" }}
              onClick={() => {
                window.open(process.env.NEXT_PUBLIC_LMS_URL ?? "/contact", "_blank");
              }}
              >
                <Text
                  color="white"
                  fontWeight="600"
                  fontSize="16px"
                >
                  2주 무료체험 시작하기
                </Text>
                
              </Button>
            
          </Stack>
        </Box>

        {isLgSize && (<ScrollingLearningCards containerProps={{ right: "0", top: "-46px" }} />)}
        
      </Flex>
    </Box>
  );
}
