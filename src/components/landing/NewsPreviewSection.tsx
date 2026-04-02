import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { getMainPreviewNewsList } from "@/lib/news-local";

export async function NewsPreviewSection() {
  const newsCards = await getMainPreviewNewsList(4);

  return (
    <Box
      as="section"
      id="news-preview"
      bg="gray.50"
      py={{ base: '50px', lg: 20 }}
      px={{ base: 4, lg: 6 }}
      data-aos="fade-up"
      data-aos-delay="0"
      data-aos-duration="900"
      data-aos-offset="120"
      data-aos-anchor-placement="top-bottom"
      data-aos-once="true"
      data-aos-easing="ease-out-cubic"
    >
      <Box maxW="1200px" mx="auto">
        <Stack
          gap={{ base: '16px', lg: 5}}
          textAlign="center"
          mb={{ base: '24px', lg: 12}}
          data-aos="fade-up"
          data-aos-delay="0"
          data-aos-duration="900"
          data-aos-offset="120"
          data-aos-anchor-placement="top-bottom"
          data-aos-once="true"
          data-aos-easing="ease-out-cubic"
        >
          <Text
            fontFamily="heading"
            fontWeight="600"
            fontSize={{ base: "24px", lg: "48px" }}
            lineHeight={{ base: "34px", lg: "60px" }}
            color="black"
          >
            러니 이야기가 더 궁금하다면
          </Text>
          <Flex gap={5} justify="center" flexWrap="wrap">
            <Link href="/news">
              <Flex
                px={{ base: '10px', lg: '18px'}}
                py={{ base: '6px', lg: '10px'}}
                borderRadius="12px"
                bg="white"
                borderWidth="1px"
                borderColor="gray.300"
                _hover={{ bg: "gray.100", boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
                gap={'8px'}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                
                <Text fontWeight="600" fontSize={{ base: '12px', lg: '16px'}} color="gray.700">블로그 글 보러가기</Text>
                <Image src="/images/etc/search-sm.svg" alt="blog" w="20px" h="20px" display={{ base: 'none', lg: 'block'}} />
              </Flex>
            </Link>
            <Flex
              as="a"
              href="https://www.instagram.com/learney.kr"
              target="_blank"
              rel="noopener noreferrer"
              px={{ base: '10px', lg: '18px'}}
              py={{ base: '6px', lg: '10px'}}
              borderRadius="12px"
              bg="white"
              borderWidth="1px"
              borderColor="gray.300"
              _hover={{ bg: "gray.100", boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
              gap={'8px'}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              
              <Text fontWeight="600" fontSize={{ base: '12px', lg: '16px'}} color="gray.700">인스타그램 바로가기</Text>
              <Image src="/images/etc/camera.svg" alt="blog" w="20px" h="20px" display={{ base: 'none', lg: 'block'}} />
            </Flex>
          </Flex>
        </Stack>
        <Flex
          flexWrap="wrap"
          justify="flex-start"
          data-aos="fade-up"
          data-aos-delay="80"
          data-aos-duration="900"
          data-aos-offset="180"
          data-aos-anchor-placement="top-bottom"
          data-aos-once="true"
          data-aos-easing="ease-out-cubic"
          flexDirection="row"
          alignItems="flex-start"
          gap={{ base: '10px', lg: 6}}
        >
          {newsCards.length === 0 ? (
            <Text fontFamily="body" color="gray.500" py={4}>
              표시할 뉴스가 없습니다.
            </Text>
          ) : (
            newsCards.map((card) => {
              const chip = card.category ?? "가이드";
              const overlayGradient = "linear-gradient(to-t, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0) 100%)";
              const bgLayers = card.thumbnail
                ? `${overlayGradient}, url(${card.thumbnail})`
                : overlayGradient;

              return (
                <Box key={card.slug} w={{ base: "calc(50% - 5px)", lg: "280px" }} flexShrink={0}>
                  <Link href={`/news/${card.slug}`}>
                    <Box
                      role="group"
                      w="100%"
                      h={{ base: "230.7142791748047px", md: "380px", xl: "380px" }}
                      borderRadius="28px"
                      boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.05)"
                      p={5}
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      position="relative"
                      overflow="hidden"
                      data-aos="fade-up"
                      data-aos-delay="0"
                      data-aos-duration="900"
                      data-aos-offset="220"
                      data-aos-anchor="#news-preview"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-once="true"
                      data-aos-easing="ease-out-cubic"
                    >
                      <Box
                        position="absolute"
                        inset={0}
                        backgroundImage={bgLayers}
                        backgroundSize="cover"
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        transition="transform 0.35s ease"
                        _groupHover={{ transform: "scale(1.06)" }}
                      />
                      <Box
                        as="span"
                        position="relative"
                        zIndex={1}
                        alignSelf="flex-start"
                        px={{ base: '6px', lg: '10px'}}
                        py="2px"
                        borderRadius="14px"
                        bg="#0000004D"
                        fontWeight="500"
                        fontSize={{ base: '12px', lg: '16px'}}
                        color="white"
                      >
                        {chip}
                      </Box>
                      <Text
                        position="relative"
                        zIndex={1}
                        fontFamily="heading"
                        fontWeight="600"
                        fontSize={{ base: '16px', lg: '24px'}}
                        lineHeight={{ base: '24px', lg: '36px'}}
                        color="white"
                        whiteSpace="pre-line"
                        noOfLines={4}
                      >
                        {card.title}
                      </Text>
                    </Box>
                  </Link>
                </Box>
              );
            })
          )}
        </Flex>
      </Box>
    </Box>
  );
}
