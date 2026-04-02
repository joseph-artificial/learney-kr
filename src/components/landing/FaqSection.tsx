"use client";

import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useMemo } from "react";
import type { CachedFaqItem } from "@/lib/faq-local";
import { keyframes } from "@emotion/react";

const CATEGORIES = [
  { id: "all", label: "전체" },
  { id: "service", label: "러니 서비스" },
  { id: "lms", label: "선생님용 lms" },
  { id: "app", label: "학생용 app" },
  { id: "pricing", label: "요금/무료 체험" },
  { id: "etc", label: "기타" },
] as const;

const CATEGORY_ID_MAP: Record<string, string> = {
  "러니 서비스": "service",
  "선생님용 lms": "lms",
  "선생님용 LMS": "lms",
  "학생용 app": "app",
  "학생용 App": "app",
  "요금/무료 체험": "pricing",
  "기타": "etc",
};

const CATEGORY_LABEL_MAP: Record<string, string> = {
  service: "러니 서비스",
  lms: "선생님용 lms",
  app: "학생용 app",
  pricing: "요금/무료 체험",
  etc: "기타",
};

const promoBarRevealAnimation = keyframes`
  0% {
    transform: translateX(-50%) translateY(-14px) scaleY(0.86);
    transform-origin: top center;
    opacity: 0;
    filter: blur(6px);
  }
  65% {
    transform: translateX(-50%) translateY(0) scaleY(1.015);
    transform-origin: top center;
    opacity: 1;
    filter: blur(0);
  }
  100% {
    transform: translateX(-50%) translateY(0) scaleY(1);
    transform-origin: top center;
    opacity: 1;
    filter: blur(0);
  }
`

function normalizeCategory(cat?: string): string {
  if (!cat?.trim()) return "etc";
  const trimmed = cat.trim();
  return CATEGORY_ID_MAP[trimmed] ?? "etc";
}

type FaqSectionProps = {
  faqs: CachedFaqItem[];
};

export function FaqSection({ faqs }: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const groups = new Map<
      string,
      { label: string; items: CachedFaqItem[] }
    >();
    for (const faq of faqs) {
      const catId = normalizeCategory(faq.category);
      const label = CATEGORY_LABEL_MAP[catId] ?? faq.category ?? "기타";
      if (!groups.has(catId)) {
        groups.set(catId, { label, items: [] });
      }
      groups.get(catId)!.items.push(faq);
    }
    return groups;
  }, [faqs]);

  const filteredGroups = useMemo(() => {
    if (activeCategory === "all") return grouped;
    const g = grouped.get(activeCategory);
    return g ? new Map([[activeCategory, g]]) : new Map();
  }, [activeCategory, grouped]);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      as="section"
      id="faq"
      bg="white"

    >
      <Box
        // pb={{ base: 16, lg: '60px' }}
        px={{ base: 4, lg: 6 }}
        position={'relative'}
      >
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          gap={'20px'}
          position={'absolute'}
          top={0}
          left={'50%'}
          transform={'translateX(-50%)'}
          transformOrigin="top center"
          h={'50px'}
          bgGradient="linear(to-r, #15B79E, #1550B7)"
          w={'100%'}
          animation={`${promoBarRevealAnimation} 820ms cubic-bezier(0.16, 1, 0.3, 1) 1000ms both`}
        >
          <Flex maxW={'1200px'} mx="auto" w={'100%'} justifyContent={'space-between'} alignItems={'center'} px={{base: '20px', lg: 0}}>
            <Flex flexDirection={'row'} gap={'10px'} alignItems={'center'} justifyContent={'flex-start'}>
              <Text fontSize={'11px'} color={'white'} fontWeight={'500'} lineHeight={'21px'} display={{base: 'none', lg: 'block'}}>선생님, 안녕하세요!</Text>
              <Text fontSize={{base: '14px', lg: '17px'}} color={'white'} fontWeight={'600'} lineHeight={{base: '22px', lg:'21px'}}>2026 학운위 심사 자료가 필요하시다면?</Text>
            </Flex>
            <Button
              variant={'solid'}
              borderColor={'#D0D5DD'}
              borderWidth={'1px'}
              borderRadius={{base: '12px', lg: '18.24px'}}
              h={'30px'}
              padding={{base: '4px 8px', lg: '6px 10px'}}
              bg={'rgba(255, 255, 255, 0.4)'}
            >
              <Text
                fontSize={'12px'}
                fontWeight={'600'}
                lineHeight={'18px'}
                color={'#ffffff'}
              >
                심의 자료 신청
              </Text>
            </Button>
          </Flex>
          </Flex>
          
      </Box>
      
      <Box maxW="1200px" mx="auto" py={{ base: 16, lg: 20 }} px={{ base: 4, lg: 6 }}>
        <Stack
          gap={{base: '16px', lg: 5}}
          align="center"
          textAlign="center"
          mb={10}
          pt={{ base: 8, lg: 12 }}
        >
          <Flex w={{base: '50px', lg: '100px'}} h={{base: '50px', lg: '100px'}} borderRadius="full" bg="#F6FEFC" border={'2px solid #CCFBEF'} flexShrink={0} align="center" justify="center">
            <Image src={"/images/faq/faq.png"} alt="news-title" width={{base: '35px', lg: '70px'}} height={{base: '35px', lg: '70px'}} objectFit="contain" />
          </Flex>
          <Text
            fontFamily="heading"
            fontWeight="600"
            fontSize={{ base: "26px", lg: "48px" }}
            lineHeight={{base: '34px', lg: '60px'}}
            color="black"
          >
            자주 묻는 질문
          </Text>
          <Text
            fontFamily="body"
            fontWeight="400"
            fontSize={{base: '12px', lg: '24px'}}
            lineHeight={{base: '18px', lg: '32px'}}
            color="black"
          >
            러니에 대해 궁금한 점을 빠르게 해결해보세요
          </Text>
        </Stack>

        <Flex
          gap={3}
          justify="center"
          flexWrap="wrap"
          mb={10}
          pt={{ base: '10px', lg: 10 }}
          pb={{ base: '20px', lg: 10 }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <Box
                key={cat.id}
                as="button"
                type="button"
                px={{base: '16px', lg: '18px'}}
                py={{base: '10px', lg: '10px'}}
                borderRadius="12px"
                fontWeight="600"
                fontSize={{base: '14px', lg: '16px'}}
                lineHeight={{base: '20px', lg: '24px'}}
                bg={isActive ? "primary.50" : "white"}
                color={isActive ? "primary.700" : "gray.700"}
                borderWidth="1px"
                borderColor={isActive ? "primary.200" : "gray.300"}
                boxShadow={isActive ? "sm" : "sm"}
                _hover={{
                  bg: isActive ? "primary.50" : "gray.50",
                }}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.label}
              </Box>
            );
          })}
        </Flex>

        
        <Stack gap={8} pb={{ base: 16, lg: 24 }} pt={5}>
          {Array.from(filteredGroups.entries()).map(([categoryId, { label, items }]) => (
            <Box key={categoryId}>
              <Text
                fontFamily="heading"
                fontWeight="700"
                fontSize="20px"
                lineHeight="30px"
                color="primary.600"
                mb={2}
                px={2}
              >
                {label}
              </Text>
              <Stack spacing={0}>
                {items.map((item: CachedFaqItem) => {
                  const isOpen = openId === item.id;
                  return (
                    <Box
                      key={item.id}
                      borderBottomWidth="1px"
                      borderColor="gray.200"
                    >
                      <Flex
                        align="center"
                        justify="space-between"
                        py={2}
                        px={2}
                        gap={4}
                        as="button"
                        type="button"
                        w="full"
                        textAlign="left"
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                      >
                        <Text
                          fontFamily="heading"
                          fontWeight="600"
                          fontSize="20px"
                          lineHeight="30px"
                          color={isOpen ? "gray.950" : "gray.600"}
                          flex={1}
                        >
                          {item.question}
                        </Text>
                        <Box
                          as="span"
                          display="inline-flex"
                          p={4}
                          borderRadius="12px"
                          transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                          transition="transform 0.2s"
                        >
                          <ChevronDownIcon boxSize={6} />
                        </Box>
                      </Flex>
                      {isOpen && (
                        <Box px={2} py={{base: '20px', lg: 5}}>
                          <Text
                            fontFamily="body"
                            fontWeight="400"
                            fontSize="16px"
                            lineHeight="24px"
                            color="gray.600"
                            whiteSpace="pre-wrap"
                          >
                            {item.answer}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
