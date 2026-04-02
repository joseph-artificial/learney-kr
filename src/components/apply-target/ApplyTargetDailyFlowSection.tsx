"use client";

import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { ReactNode, useEffect, useMemo, useState } from "react";

export type DailyFlowSectionFlowItem = {
  title: string;
  time: string;
  body: string;
};


interface ApplyTargetDailyFlowSectionProps {
  chip: ReactNode;
  title: ReactNode;
  description: string;
  flowItems: DailyFlowSectionFlowItem[];
}
export function ApplyTargetDailyFlowSection(props: ApplyTargetDailyFlowSectionProps) {
  const { chip, title, description, flowItems } = props;
  const total = flowItems.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const stepMs = 4200;

  useEffect(() => {
    if (!autoPlay || total <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, stepMs);

    return () => window.clearInterval(id);
  }, [autoPlay, total]);

  
  const progressRect = "/images/apply-target/elementary-daily-flow/progress-rect.png";
  const chatGptImages = ["/images/apply-target/elementary-daily-flow/dailyFlowSun.png", "/images/apply-target/elementary-daily-flow/dailyFlowBook.png", "/images/apply-target/elementary-daily-flow/dailyFlowTime.png"];

  
  

  const progressFillPct = useMemo(() => {
    // 디자인의 진행바는 “활성 카드” 기준으로 상단 이미지가 더 채워진 느낌
    return ((activeIndex + 1) / total) * 100;
  }, [activeIndex, total]);

  return (
    <Box bg="#fffbe8" py={{ base: '50px', lg: "120px" }} px={{ base: 4, lg: 6 }}>
      <Stack maxW="1200px" mx="auto" gap={14} align="center">
        {/* title */}
        {<Stack gap={6} align="center" data-aos="fade-up">
          {chip}
          {title}
          
        </Stack>}

        {/* body — 모바일: 상단 가로 진행바(Figma 741:44041), lg+: 좌측 세로 진행바 */}
        <Flex
          w="full"
          gap={{ base: "20px", lg: "40px" }}
          align="stretch"
          justify="center"
          direction={{ base: "column", lg: "row" }}
          data-aos="fade-up"
          data-aos-delay="60"
        >
          {/* lg+ 세로 진행바 */}
          <Flex display={{ base: "none", lg: "flex" }} w="12px" gap={3} direction="column" align="stretch" flexShrink={0}>
            <Box h="100%" borderRadius="10px" overflow="hidden" position="relative" minH="120px">
              <Box
                position="absolute"
                inset={0}
                bgImage={`url(${progressRect})`}
                bgSize="cover"
                bgPosition="top"
                height={`${progressFillPct}%`}
                transition="height 0.25s ease"
              />
            </Box>
            <Box flex="1" bg="white" borderRadius="10px" minH="40px" />
          </Flex>

          {/* base 가로 진행바: 흰 트랙 6px, 좌측부터 채움 */}
          <Box display={{ base: "block", lg: "none" }} w="full" maxW="350px" mx="auto" flexShrink={0}>
            <Box
              w="full"
              h="6px"
              bg="white"
              borderRadius="10px"
              overflow="hidden"
              boxShadow="0px 0px 10px 0px rgba(0,0,0,0.05)"
              position="relative"
            >
              <Box
                h="100%"
                w={`${progressFillPct}%`}
                minW={progressFillPct > 0 ? "4px" : 0}
                position="relative"
                transition="width 0.25s ease"
                overflow="hidden"
                borderLeftRadius="10px"
                borderRightRadius={progressFillPct >= 99.9 ? "10px" : "0"}
              >
                <Box
                  position="absolute"
                  inset={0}
                  bgImage={`url(${progressRect})`}
                  bgSize="cover"
                  bgPosition="left center"
                />
              </Box>
            </Box>
          </Box>

          {/* cards */}
          <Stack w="full" maxW={{ base: "100%", lg: "996px" }} gap="20px" flex="1" minW={0}>
            {flowItems.map((item, idx) => {
              const isActive = idx === activeIndex;

              return (
                <Box
                  key={item.title}
                  bg={'white'}
                  borderRadius="16px"
                  border={isActive ? "2px solid #ffd748" : "2px solid transparent"}
                  boxShadow="0px 0px 10px rgba(0,0,0,0.05)"
                  p="30px"
                  opacity={isActive ? 1 : 0.6}
                  cursor="pointer"
                  onClick={() => {
                    setAutoPlay(false);
                    setActiveIndex(idx);
                  }}
                  transition="opacity 0.2s ease, border-color 0.2s ease"
                >
                  <Stack gap="12px">
                    {isActive && (
                      <Flex align="center" justify={{base: 'center', lg: 'flex-start'}}>
                        <Box
                          w={{base: '60px', lg: '100px'}}
                          h={{base: '60px', lg: '100px'}}
                          borderRadius="full"
                          bg="#fffcef"
                          position="relative"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Box w="45px" h="45px">
                            <Image src={chatGptImages[idx]} alt="" w="100%" h="100%" />
                          </Box>
                        </Box>
                      </Flex>
                    )}

                    {/* title row */}
                    <Flex gap={{base: '5px', lg: '10px'}} align="center" flexDirection={{base: 'column', lg: 'row'}} pt={{base: '10px', lg: '0px'}}>
                      <Text
                        color="#1d2939"
                        fontWeight="600"
                        fontSize={{base: '20px', lg: '24px'}}
                        lineHeight={{base: '30px', lg: '34.282px'}}
                        textAlign="center"
                        whiteSpace="nowrap"
                      >
                        {item.title}
                      </Text>
                      <Box bg="#f2f4f7" borderRadius="10px" px={{base: '5px', lg: '10px'}} py={{base: '1px', lg: '2px'}}>
                        <Text color="#667085" fontWeight="500" fontSize={{base: '16px', lg: '20px'}} lineHeight={{base: '24px', lg: '32px'}} whiteSpace="nowrap">
                          {item.time}
                        </Text>
                      </Box>
                    </Flex>

                    {/* active subtitle */}
                    {isActive && (
                      <Text color="#475467" fontWeight="500" fontSize={{base: '16px', lg: '22px'}} lineHeight={{base: '24px', lg: '32px'}} whiteSpace="pre-line">
                        {item.body}
                      </Text>
                    )}
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
}
