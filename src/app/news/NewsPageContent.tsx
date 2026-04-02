"use client";

import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  { id: "all", label: "전체" },
  { id: "guide", label: "가이드" },
  { id: "story", label: "스토리" },
  { id: "update", label: "업데이트" },
  { id: "news", label: "뉴스" },
  { id: "etc", label: "기타" },
];

const PAGE_SIZE = 9;

function formatDate(value: string): string {
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}.${m}.${day}`;
  } catch {
    return value;
  }
}

type NewsItem = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  category?: string;
  thumbnail?: string;
};

function mapCategoryToId(category?: string): string {
  if (!category) return "etc";
  if (category === "가이드") return "guide";
  if (category === "스토리") return "story";
  if (category === "인사이트") return "update";
  if (category === "뉴스") return "news";
  // 위 네 가지를 제외한 나머지는 모두 "기타"
  return "etc";
}

function mapCategoryToColor(category?: string): {bg: string, color: string} {
  if (!category) return {bg: "#FEF6EE", color: "#772917"};
  if (category === "가이드") return {bg: "#F5F3FF", color: "#491C96"};
  if (category === "스토리") return {bg: "#E0F2FE", color: "#0B4A6F"};
  if (category === "인사이트") return {bg: "#ECFDFF", color: "#344054"};
  if (category === "뉴스") return {bg: "#EDFCF2", color: "#084C2E"};
  // 위 네 가지를 제외한 나머지는 모두 "기타"
  return {bg: "#FEF6EE", color: "#772917"};
}

export function NewsPageContent({
  newsList,
  lastUpdated,
}: {
  newsList: NewsItem[];
  lastUpdated?: string;
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);

  const filteredList =
    activeCategory === "all"
      ? newsList
      : newsList.filter(
          (n) => mapCategoryToId(n.category) === activeCategory,
        );
  const totalPages = Math.max(1, Math.ceil(filteredList.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filteredList.slice(start, start + PAGE_SIZE);

  console.log("[NewsPageContent] state", {
    newsListLength: newsList.length,
    activeCategory,
    page,
    filteredLength: filteredList.length,
    totalPages,
    currentPage,
    pageItemsLength: pageItems.length,
    firstNewsSlug: newsList[0]?.slug,
  });

  return (
    <Box bg="white" w="full">
      {/* Title section */}
      <Stack gap={{base: 3, lg: 5}} align="center" pt={{ base: '50px', lg: "120px" }} pb={10} px={{ base: '25px', lg: 6 }}>
        <Flex w={{base: '50px', lg: '100px'}} h={{base: '50px', lg: '100px'}} borderRadius="full" bg="#F6FEFC" border={'2px solid #CCFBEF'} flexShrink={0} align="center" justify="center">
          <Image src={"/images/news/news.png"} alt="news-title" width={{base: '50px', lg: 100}} height={{base: '50px', lg: 100}} objectFit="contain" />
        </Flex>
        
        <Stack gap={{base: '16px', lg: 5}} textAlign="center" maxW="718px">
          <Text
            fontFamily="heading"
            fontWeight="600"
            fontSize={{ base: "26px", lg: "48px" }}
            lineHeight={{base: '34px', lg: '60px'}}
            color="black"
          >
            러니 뉴스
          </Text>
          <Text
            fontFamily="body"
            fontWeight="400"
            fontSize={{base: '12px', lg: '24px'}}
            lineHeight={{base: '18px', lg: '32px'}}
            color="black"
          >
            러니의 업데이트된 소식을 확인하세요
          </Text>
        </Stack>
      </Stack>

      {/* Category chips */}
      <Flex
        gap={{base: '10px', lg: 3}}
        justify={"center"}
        flexWrap="wrap"
        px={{ base: '22px', lg: 6 }}
        py={{base: '16px', lg: 10}}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <Box
              key={cat.id}
              as="button"
              type="button"
              px={{base: '16px', lg: '18px'}}
              py="10px"
              borderRadius="12px"
              fontWeight="600"
              fontSize={{base: '14px', lg: '16px'}}
              lineHeight={{base: '20px', lg: '24px'}}
              bg={isActive ? "#F0FDF9" : "white"}
              color={isActive ? "#107569" : "gray.700"}
              borderWidth="1px"
              borderColor={isActive ? "#99F6E0" : "gray.300"}
              _hover={{ bg: isActive ? "#F0FDF9" : "gray.50" }}
              onClick={() => {
                console.log("[NewsPageContent] category click", {
                  from: activeCategory,
                  to: cat.id,
                });
                setActiveCategory(cat.id);
                setPage(1);
              }}
            >
              {cat.label}
            </Box>
          );
        })}
      </Flex>

      {/* Cards grid */}
      <Box
        px={{ base: 4, lg: 6 }}
        pt={5}
        pb={{ base: 16, lg: "120px" }}
      >
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          gap={{ base: 6, lg: "20px" }}
          maxW="1060px"
          mx="auto"
        >
          {pageItems.length === 0 ? (
            <Box gridColumn="1 / -1" textAlign="center" py={12}>
              <Text color="gray.500">해당하는 뉴스가 없습니다.</Text>
            </Box>
          ) : (
            pageItems.map((news) => (
              <Link key={news.slug} href={`/news/${news.slug}`}>
                <Box
                  w="full"
                  maxW="340px"
                  mx={{ base: "auto", lg: 0 }}
                  role="group"
                  borderWidth="1px"
                  borderColor="gray.300"
                  borderRadius="20px"
                  overflow="hidden"
                  _hover={{ borderColor: "brand.500", shadow: "md" }}
                >
                  <Box
                    w="full"
                    h="200px"
                    bg="gray.500"
                    position="relative"
                    overflow="hidden"
                  >
                    {news.thumbnail && (
                      <Image
                        src={news.thumbnail}
                        alt={news.title}
                        w="full"
                        h="full"
                        objectFit="cover"
                        transition="transform 0.35s ease"
                        _groupHover={{ transform: "scale(1.05)" }}
                      />
                    )}
                    <Box
                      position="absolute"
                      inset={0}
                      bgGradient="linear(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.2) 100%)"
                      pointerEvents="none"
                    />
                  </Box>
                  <Stack gap={{base: '10px', lg: '20px'}} p="20px">
                    <Box
                      as="span"
                      display="inline-block"
                      alignSelf="flex-start"
                      px="10px"
                      py="2px"
                      borderRadius="14px"
                      bg={mapCategoryToColor(news.category)?.bg}
                      fontWeight="500"
                      fontSize={{base: '14px', lg: '16px'}}
                      color={mapCategoryToColor(news.category)?.color}
                    >
                      {news.category ?? "가이드"}
                    </Box>
                    <Text
                      fontFamily="heading"
                      fontWeight="600"
                      fontSize={{base: '16px', lg: '24px'}}
                      lineHeight={{base: '24px', lg: '32px'}}
                      color="gray.800"
                      noOfLines={2}
                    >
                      {news.title}
                    </Text>
                    <Text
                      fontFamily="body"
                      fontWeight="500"
                      fontSize="14px"
                      lineHeight="20px"
                      color="gray.400"
                    >
                      {formatDate(news.publishedAt)}
                    </Text>
                  </Stack>
                </Box>
              </Link>
            ))
          )}
        </SimpleGrid>

        {/* Pagination */}
        {/* {totalPages > 1 && ( */}
          <Flex justify="center" align="center" gap={6} mt={{base: '36px', lg: '60px'}} h="40px">
            <Box
              as="button"
              type="button"
              aria-label="이전 페이지"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              opacity={currentPage <= 1 ? 0.5 : 1}
              cursor={currentPage <= 1 ? "not-allowed" : "pointer"}
          >
            
            <ChevronLeftIcon w={'16.46px'} h={'32.71px'} style={{width: '16.46px', height: '32.71px'}} />
              
            
            </Box>
            <Text fontFamily="body" fontWeight="400" fontSize="24px" color="gray.800">
              {currentPage} / {totalPages}
            </Text>
            <Box
              as="button"
              type="button"
              aria-label="다음 페이지"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              opacity={currentPage >= totalPages ? 0.5 : 1}
              cursor={currentPage >= totalPages ? "not-allowed" : "pointer"}
          >
            <ChevronRightIcon w={'16.46px'} h={'32.71px'} style={{width: '16.46px', height: '32.71px'}} />
            </Box>
          </Flex>
        {/* )} */}
      </Box>
    </Box>
  );
}
