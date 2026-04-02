import { Metadata } from "next";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import Topbanner from "@/components/NewsTopBanner";
import {
  getLocalNewsList,
  updateNewsFromNotion,
  type CachedNewsItem,
} from "@/lib/news-local";
import { siteConfig } from "@/config/site";

type Params = { slug: string };
/** 뉴스 상세 페이지 ISR (24시간) */
export const revalidate = 86400;

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

async function fetchDetailAndIds(
  slug: string,
): Promise<{ item: CachedNewsItem | null; ids: string[] }> {
  // 1차: 로컬 캐시에서 조회
  let cache = await getLocalNewsList();
  let item = cache?.items.find((n) => n.slug === slug) ?? null;

  // 없으면 Notion에서 갱신 후 한 번 더 시도
  if (!item) {
    cache = await updateNewsFromNotion();
    item = cache.items.find((n) => n.slug === slug) ?? null;
  }

  const ids = cache?.items.map((n) => n.slug) ?? [];
  return { item, ids };
}

export async function generateStaticParams(): Promise<Params[]> {
  // 빌드 시 상세 페이지를 정적으로 생성
  let cache = await getLocalNewsList();
  if (!cache) {
    try {
      cache = await updateNewsFromNotion();
    } catch {
      return [];
    }
  }
  return cache.items.map((item) => ({ slug: item.slug }));
}


function mapCategoryToColor(category?: string): {bg: string, color: string} {
  if (!category) return {bg: "#FEF6EE", color: "#772917"};
  if (category === "가이드") return {bg: "#F5F3FF", color: "#491C96"};
  if (category === "스토리") return {bg: "#E0F2FE", color: "#0B4A6F"};
  if (category === "인사이트") return {bg: "#ECFDFF", color: "#344054"};
  if (category === "뉴스") return {bg: "#EDFCF2", color: "#084C2E"};
  return {bg: "#FEF6EE", color: "#772917"};
}

export async function generateMetadata(
  props: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await props.params;
  const { item } = await fetchDetailAndIds(slug);
  if (!item) {
    return { title: "러니 뉴스" };
  }
  const siteUrl = siteConfig.url.replace(/\/$/, "");
  const canonical = item.seoCanonicalUrl || `${siteUrl}/news/${encodeURIComponent(slug)}`;
  const description = item.seoDescription || item.summary || item.body || "";
  const ogImage = item.seoOgImage || item.thumbnail;
  const title = item.seoTitle || `${item.title} | 러니 뉴스`;

  return {
    title,
    description,
    ...(item.seoKeywords?.length ? { keywords: item.seoKeywords } : {}),
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: item.title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function NewsDetailPage(props: {
  params: Promise<Params>;
}) {
  const { slug } = await props.params;
  const { item, ids } = await fetchDetailAndIds(slug);

  const currentIndex = item ? ids.indexOf(item.slug) : -1;
  const currentPage = currentIndex >= 0 ? currentIndex + 1 : 1;
  const totalPages = ids.length || 1;

  if (!item) {
    return (
      <Box bg="white" py={{ base: 8, lg: 20 }} pb={{ base: 16, lg: 32 }}>
        <Container maxW="980px" px={{ base: 4, lg: 0 }}>
          <Flex direction="column" align="center" gap={4} py={20}>
            <Text color="#475467">뉴스를 찾을 수 없습니다.</Text>
            <Link href="/news">
              <Button>
                목록으로 돌아가기
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>
    );
  }

  const prevId = currentIndex > 0 ? ids[currentIndex - 1] : null;
  const nextId =
    currentIndex >= 0 && currentIndex < ids.length - 1
      ? ids[currentIndex + 1]
      : null;

  return (
    <>
      <Box bg="white" py={{ base: 8, lg: 20 }} pb={{ base: 16, lg: 32 }}>
        <Container maxW="980px" px={{ base: 4, lg: 0 }} mx="auto">
        {/* 상단 썸네일 + 메타 영역 */}
        <Box
          borderBottomWidth="2px"
          borderColor="#CECECE"
          pb={{ base: '24px', lg: 10 }}
          mb={{ base: '24px', lg: 12 }}
        >
          <Box px={{ base: 0, lg: 2.5 }} mb={{ base: 5, lg: 6 }}>
            <Topbanner image={item.thumbnail ? `${item.thumbnail}` : undefined} />
            {/* <Box
              h={{ base: "200px", lg: "360px" }}
              w="100%"
              borderRadius="20px"
              bg="#737D92"
              backgroundImage={
                item.thumbnail ? `url(${item.thumbnail})` : undefined
              }
              backgroundSize="cover"
              backgroundPosition="center"
              style={
                item.thumbnail
                  ? undefined
                  : {
                      backgroundImage:
                        "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #737D92 0%, #737D92 100%)",
                    }
              }
            /> */}
          </Box>

          <Box
            px={{ base: '10px', lg: 5 }}
            display="flex"
            flexDir="column"
            gap={{base: '16px', lg: 3}}
          >
            <Box
              as="span"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={{base: '10px', lg: 3.5}}
              py={{base: '3px', lg: 1}}
              borderRadius="20px"
              bg={mapCategoryToColor(item.category)?.bg}
              w="fit-content"
              fontSize={{base: '14px', lg: '20px'}}
              fontWeight={500}
              lineHeight={{base: '22px', lg: '30px'}}
              color={mapCategoryToColor(item.category)?.color}
            >
              {item.category || "뉴스"}
            </Box>
            <Text
              fontWeight={600}
              fontSize={{ base: "20px", lg: "48px" }}
              lineHeight={{ base: "30px", lg: "60px" }}
              color="#000000"
              whiteSpace="pre-wrap"
            >
              {item.title}
            </Text>
            <Text
              fontWeight={500}
              fontSize={{base: '14px', lg: '20px'}}
              lineHeight={{base: '20px', lg: '30px'}}
              color="#475467"
            >
              {formatDate(item.publishedAt)}
            </Text>
          </Box>
        </Box>

        {/* 본문 + 큰 이미지 + CTA 영역 */}
        <Box
          borderBottomWidth="2px"
          borderColor="#CECECE"
          pb={{ base: 8, lg: 10 }}
          mb={{ base: 8, lg: 10 }}
        >
          <Box
            px={{ base: '10px', lg: 2.5 }}
            mb={{ base: 6, lg: 8 }}
            display="flex"
            justifyContent="center"
          >
            <Box
              flex="1"
              color="#000000"
              css={{
                /* 모바일 기본 (text_body) */
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "160%",
                "& > h1:first-child, & > h2:first-child, & > h3:first-child, & > h4:first-child":
                  {
                    marginTop: 0,
                  },
                "& h1": {
                  fontSize: "24px",
                  fontWeight: 700,
                  lineHeight: "140%",
                  // marginTop: "1.5rem",
                  // marginBottom: "0.75rem",
                },
                "& h2": {
                  fontSize: "22px",
                  fontWeight: 600,
                  lineHeight: "140%",
                  // marginTop: "1.5rem",
                  // marginBottom: "0.75rem",
                },
                "& h3": {
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "145%",
                  // marginTop: "1.5rem",
                  // marginBottom: "0.75rem",
                },
                "& h4": {
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "145%",
                  // marginTop: "1.5rem",
                  // marginBottom: "0.75rem",
                },
                "& p": {
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "160%",
                  // marginBottom: "1.5rem",
                },
                "& ul, & ol": {
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "160%",
                  // paddingLeft: "1.5rem",
                  // marginBottom: "1.5rem",
                },
                "& li": {
                  marginBottom: "0.25rem",
                },
                "& blockquote": {
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "160%",
                  color: "#475467",
                  borderLeft: "4px solid #EAECF0",
                  // paddingLeft: "1rem",
                  // marginBottom: "1.5rem",
                },
                "& blockquote p": {
                  fontSize: "inherit",
                  fontWeight: 500,
                  lineHeight: "inherit",
                  color: "inherit",
                  // marginBottom: "0.75rem",
                },
                "& blockquote p:last-of-type": {
                  marginBottom: 0,
                },
                "& hr": {
                  margin: "1.5rem 0",
                },
                "& figure": {
                  marginTop: "1.5rem",
                  marginBottom: "1.5rem",
                },
                "& img": {
                  maxWidth: "100%",
                  borderRadius: "20px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                },
                "& figcaption": {
                  marginTop: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#98A2B3",
                },
                "@media screen and (min-width: 48em)": {
                  fontSize: "24px",
                  "& h1": {
                    fontSize: "36px",
                    fontWeight: 700,
                    lineHeight: "140%",
                  },
                  "& h2": {
                    fontSize: "30px",
                    fontWeight: 600,
                    lineHeight: "140%",
                  },
                  "& h3": {
                    fontSize: "24px",
                    fontWeight: 600,
                    lineHeight: "145%",
                  },
                  "& h4": {
                    fontSize: "24px",
                    fontWeight: 500,
                    lineHeight: "145%",
                  },
                  "& p": {
                    fontSize: "24px",
                    fontWeight: 500,
                    lineHeight: "160%",
                  },
                  "& ul, & ol": {
                    fontSize: "18px",
                    fontWeight: 500,
                    lineHeight: "160%",
                  },
                  "& blockquote": {
                    fontSize: "18px",
                    fontWeight: 500,
                    lineHeight: "160%",
                    color: "#475467",
                  },
                  "& img": {
                    paddingTop: "12px",
                    paddingBottom: "12px",
                  },
                },
              }}
              dangerouslySetInnerHTML={{ __html: item.body ?? "" }}
            />
          </Box>

          {item.hasButton && (item.buttonText || item.buttonLink) && (
            <Flex justify="center" py={{base: '24px', lg: 0}}>
              {item.buttonLink ? (
                <Button
                  as="a"
                  href={item.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  borderRadius="12px"
                  borderColor="#0E9384"
                  minH={{base: '40px', lg: '60px'}}
                  bg="#0E9384"
                  color="white"
                  px={{base: '16px', lg: 7}}
                  py={{base: '10px', lg: 4}}
                  fontSize={{base: '14px', lg: '18px'}}
                  fontWeight={600}
                  boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                  _hover={{ bg: "#107569" }}
                >
                  {item.buttonIcon && (
                    <Box
                      as="span"
                      mr={2}
                      display="inline-flex"
                      w={6}
                      h={6}
                    >
                      <img
                        src={item.buttonIcon}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      />
                    </Box>
                  )}
                  {item.buttonText ?? "자료 받아보기"}
                </Button>
              ) : (
                <Button
                  borderRadius="12px"
                  borderColor="#0E9384"
                  minH="60px"
                  bg="#0E9384"
                  color="white"
                  px={{base: '16px', lg: 7}}
                  py={{base: '10px', lg: 4}}
                  fontSize={{base: '14px', lg: '18px'}}
                  fontWeight={600}
                  boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                  _hover={{ bg: "#107569" }}
                >
                  {item.buttonIcon && (
                    <Box
                      as="span"
                      mr={2}
                      display="inline-flex"
                      w={6}
                      h={6}
                    >
                      <img
                        src={item.buttonIcon}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      />
                    </Box>
                  )}
                  {item.buttonText ?? "자료 받아보기"}
                </Button>
              )}
            </Flex>
          )}
        </Box>

        {/* 하단 목록/페이지네이션 영역 */}
        <Flex align="center" justify="space-between" maxW="100%" h="53px">
          <Link href="/news">
            <Button
              variant="ghost"
              fontWeight={500}
              fontSize={{base: '14px', lg: '24px'}}
              color="#98A2B3"
              textDecoration="underline"
              px={{base: '10px', lg: 0}}
              _hover={{ bg: "transparent", color: "#667085" }}
            >
              목록보기
            </Button>
          </Link>

          <Flex align="center" gap={6} h="40px">
            {prevId ? (
              <Link href={`/news/${encodeURIComponent(prevId)}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="이전 글"
                >
                  <Text fontSize="24px" color="#37383C">
                    ‹
                  </Text>
                </Button>
              </Link>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                aria-label="이전 글"
                isDisabled
              >
                <Text fontSize="24px" color="#37383C">
                  ‹
                </Text>
              </Button>
            )}
            <Text fontSize={{base: '14px', lg: '24px'}} color="#344054">
              {currentPage} / {totalPages}
            </Text>
            {nextId ? (
              <Link href={`/news/${encodeURIComponent(nextId)}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="다음 글"
                >
                  <Text fontSize="24px" color="#37383C">
                    ›
                  </Text>
                </Button>
              </Link>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                aria-label="다음 글"
                isDisabled
              >
                <Text fontSize="24px" color="#37383C">
                  ›
                </Text>
              </Button>
            )}
          </Flex>
        </Flex>
        </Container>
      </Box>

      {item.relatedNews && item.relatedNews.length > 0 && (
        <Box as="section" bg="#F2F4F7" py={{ base: 12, lg: "60px" }} px={{ base: 4, lg: "10px" }}>
          <Stack maxW="1200px" mx="auto" spacing="30px" align="center">
            <Text
              fontWeight={600}
              fontSize={{ base: "28px", lg: "36px" }}
              lineHeight={{ base: "40px", lg: "50px" }}
              color="#667085"
              textAlign="center"
            >
              함께 읽어보면 좋은 글
            </Text>

            <Flex gap="20px" align="center" justify="center" wrap={{ base: "wrap", lg: "nowrap" }}>
              {item.relatedNews.slice(0, 2).map((related, index) => {
                const chipText = related.category || (index === 0 ? "가이드" : "인사이트");
               
                const chipColor = mapCategoryToColor(related.category);
                
                return (
                  <Link key={related.id} href={`/news/${related.id}`}>
                    <Box
                      role="group"
                      border="1px solid"
                      borderColor="#D0D5DD"
                      borderRadius="20px"
                      overflow="hidden"
                      bg="white"
                      w={{ base: "full", lg: "340px" }}
                      transform="translateY(0)"
                      transition="transform 0.25s ease, box-shadow 0.25s ease"
                      _hover={{
                        transform: "translateY(-6px)",
                        boxShadow: "0px 14px 28px rgba(16, 24, 40, 0.14)",
                      }}
                    >
                      <Box
                        h="200px"
                        w="100%"
                        bg="#737D92"
                        backgroundImage={
                          related.thumbnail
                            ? `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.2) 100%), url(${related.thumbnail})`
                            : "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #737D92 0%, #737D92 100%)"
                        }
                        backgroundSize="cover"
                        backgroundPosition="center"
                      />
                      <Stack gap="10px" px="20px" py="20px">
                        <Box
                          h="28px"
                          w="fit-content"
                          display="inline-flex"
                          alignItems="center"
                          justifyContent="center"
                          px="10px"
                          py="2px"
                          borderRadius="14px"
                          bg={chipColor?.bg}
                        >
                          <Text
                            fontWeight={500}
                            fontSize="16px"
                            lineHeight="24px"
                            color={chipColor?.color}
                          >
                            {chipText}
                          </Text>
                        </Box>

                        <Text
                          fontWeight={600}
                          fontSize="24px"
                          lineHeight="32px"
                          color="#1D2939"
                          whiteSpace="pre-wrap"
                          noOfLines={2}
                        >
                          {related.title}
                        </Text>

                        <Text fontWeight={500} fontSize="14px" lineHeight="20px" color="#98A2B3">
                          {formatDate(related.publishedAt)}
                        </Text>
                      </Stack>
                    </Box>
                  </Link>
                );
              })}
            </Flex>
          </Stack>
        </Box>
      )}
    </>
  );
}
