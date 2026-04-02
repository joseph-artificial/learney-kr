"use client";

import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ScrollingLearningCards } from "@/components/ScrollingCardColumn";
import { Image } from "@chakra-ui/next-js";

export function MiddleHighHeroSection() {
  return (
    <Box
      bgImage="url('/images/apply-target/middle-hero/middle-hero-bgGradient.png')"
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      h="700px"
      overflow="hidden"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        minH={{ base: "auto", lg: "730px" }}
        direction={{ base: "column", lg: "row" }}
        position="relative"
        align={'center'}
        h={'full'}
      >
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          
        >
          <Stack gap={{base: '16px', lg: '20px'}} maxW="520px" align={{base: 'center', lg: 'flex-start'}} >
            <Box borderRadius="16px" overflow="hidden" w="fit-content" >
              <Box
                px={{base: '12px', lg: 3}}
                py={{base: '4px', lg: 1}}
                border="1px solid #0000"
                borderRadius="25px"
                background="conic-gradient(#fff  0 0) padding-box, linear-gradient(#FF4E50,#40C0CB) border-box"
              >
                중·고등 맞춤
              </Box>
            </Box>
            <Text
              fontWeight="600"
              color="black"
              fontSize={{ base: "26px", lg: "48px" }}
              lineHeight={{ base: "34px", lg: "60px" }}
              whiteSpace="pre-line"
            >
              <Box
                as="span"
                bgGradient="linear(to-r, #00A894, #00423A)"
                bgClip="text"
                color="transparent"
              >
                교과서에 딱 맞는
              </Box>{" 국어 수업,"}<br />{"준비는 러니가 할게요."}
            </Text>
            <Text
              fontSize={{ base: "14px", lg: "24px" }}
              lineHeight={{ base: "20px", lg: "36px" }}
              color="gray.500"
              whiteSpace="pre-line"
              display={{base: 'none', lg: 'block'}}
            >
              {"교과서와 성취 기준에 맞춰 콘텐츠가 준비되어 있어요.\n찾고, 고르고, 배정하는 데 5분이면 충분해요."}
            </Text>
            <Text
              fontSize={{ base: "14px", lg: "24px" }}
              lineHeight={{ base: "20px", lg: "36px" }}
              color="gray.500"
              whiteSpace="pre-line"
              display={{base: 'block', lg: 'none'}}
            >
              {"교과서와 성취 기준에 맞춰\n콘텐츠가 준비되어 있어요.\n찾고, 고르고, 배정하는 데 5분이면 충분해요."}
            </Text>
            <Flex h={'full'} w={'full'} alignItems="center" display={{base: 'block', lg: 'none'}}>
              <Image
                src="/images/apply-target/middle-hero/middle-hero.png"
                alt="middle-hero-mobile"
                width={375}
                height={250}
                unoptimized
                quality={100}
                style={{ objectFit: "cover", width: "110%", height: "110%" }}
              />
            </Flex>
            
              <Button
                px={{base: '10px', lg: '20px'}}
              h={{base: '30px', lg: '48px'}}
              w={'fit-content'}
                borderRadius="12px"
                bg="primary.600"
                boxShadow="0 1px 2px rgba(16,24,40,0.05)"
                mt="20px"
              _hover={{ bg: "primary.700" }}
              onClick={() => {
                window.open(process.env.NEXT_PUBLIC_LMS_URL ?? "/contact", "_blank");
              }}
              >
                <Text
                  color="white"
                  fontWeight="600"
                  fontSize={{base: '12px', lg: '16px'}}
                >
                  2주 무료체험 시작하기
                </Text>
                
              </Button>
            
          </Stack>
        </Box>

        
        <Flex position="absolute" right="-110px" top="60%" transform="translateY(-50%)" h={'full'} alignItems="center" display={{base: 'none', lg: 'block'}}>
          <Image
            src="/images/apply-target/middle-hero/middle-hero.png"
            alt="middle-hero"
            width={805}
            height={567}
            unoptimized
            quality={100}
            style={{ objectFit: "cover" }}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
