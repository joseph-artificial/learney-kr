"use client";

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { keyframes } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";

export type LiteracyCard = {
  title: string;
  subtitle: string;
  body: string;
  bgGradient: string;
  imageSrc: string;
};

const slideFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(22px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

interface ApplyTargetLiteracySectionProps {
  title: React.ReactNode;
  description?: string;
  categoryList: string[];
  cards: LiteracyCard[];
}
export function ApplyTargetLiteracySection(props: ApplyTargetLiteracySectionProps) {
  const { title, description, categoryList, cards } = props;
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const total = cards.length;

  const cardImageMap = useMemo<Record<string, string>>(
    () => ({
      "읽기 학습": "/images/apply-target/elementary-daily-literacy/LiteracySectionCards1.png",
      "쓰기 학습": "/images/apply-target/elementary-daily-literacy/LiteracySectionCards2.png",
      "듣기·말하기 학습": "/images/apply-target/elementary-daily-literacy/LiteracySectionCards3.png",
    }),
    [],
  );

  useEffect(() => {
    if (!isAutoPlay || total <= 1) return;

    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3500);

    return () => {
      window.clearInterval(timer);
    };
  }, [isAutoPlay, total]);

  const movePrev = () => {
    if (total <= 1) return;
    setIsAutoPlay(false);
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const moveNext = () => {
    if (total <= 1) return;
    setIsAutoPlay(false);
    setCurrent((prev) => (prev + 1) % total);
  };

  const activeCard = cards[current];
  const activeCardImage =
    cardImageMap[activeCard?.title] ?? "/images/apply-target/elementary-daily-literacy/LiteracySectionCards1.png";

  return (
    <Box bg={{base: '#F9FAFB', lg: "#FCFCFD"}} py={{ base: '50px', lg: "120px" }} px={{ base: 4, lg: 6 }}>
      <Stack maxW="1200px" mx="auto" gap={{ base: '10px', lg: "48px" }}>
        <Stack gap={{ base: '16px', lg: "25px" }} data-aos="fade-up" alignItems={{ base: "center", lg: "flex-start" }} >
          <Flex gap={{base: '4px', lg: 4}} wrap="wrap" align="center">
            {categoryList.map((item) => (
              <Flex
                key={item}
                bg={item.includes("주요 기능") ? "#E8F4F5" : "white"}
                borderRadius="30px"
                borderWidth={item.includes("주요 기능") ? "0" : "1px"}
                borderColor="#0E9384"
                px={{ base: '10px', lg: '14px' }}
                py={{ base: '5px', lg: '2px' }}
                h={{ base: '28px', lg: '36px' }}
                align="center"
              >
                <Text color="#0E9384" fontWeight="600" fontSize={{ base: '12px', lg: '16px' }} lineHeight={{ base: '18px', lg: '24px' }}>
                  {item}
                </Text>
              </Flex>
            ))}
          </Flex>

          {title}

          <Text color="#1D2939" fontWeight="500" fontSize={{ base: "16px", lg: "24px" }} lineHeight={{ base: '24px', lg: '34px' }} whiteSpace="pre-line" textAlign={{ base: "center", lg: "left" }}>
            {description}
          </Text>
        </Stack>

        <Flex overflow="hidden" w="full" align="center" justify="center" data-aos="fade-up" data-aos-delay="60" mt={{base: '24px', lg: 0}}>
          <Box
            as="button"
            type="button"
            onClick={movePrev}
            w="70px"
            h="80px"
            borderRadius="12px"
            color="#D0D5DD"
            _hover={{ color: "#98A2B3" }}
            transition="color 0.2s ease"
            cursor="pointer"
             display={{ base: "none", lg: "flex" }}
          >
            <ChevronLeftIcon boxSize={10} />
          </Box>
          <Flex
            key={activeCard?.title ?? current}
            h={{ base: "auto", lg: "512px" }}
            borderRadius="20px"
            boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.05)"
            overflow="hidden"
            bg="white"
            animation={`${slideFadeIn} 420ms ease`}
            direction={{base: 'column', lg: 'row'}}
          >
            <Box
              w={{ base: "100%", lg: "460px" }}
              minW={0}
              position="relative"
              zIndex={1}
              bg="white"
              px={{ base: '22px', lg: "36px" }}
              py={{ base: '20px', lg: "36px" }}
              display="flex"
              alignItems="flex-end"
            >
              <Stack gap={{base: '4px', lg: 4}}>
                <Flex display={{ base: "flex", lg: "none" }} gap={{base: '10px', lg: 4}} >
                  <Text color="#1D2939" fontWeight="600" fontSize={{ base: "18px", lg: "32px" }} lineHeight={{ base: "24px", lg: "44px" }}>
                    {activeCard?.title}
                  </Text>
                  <Text color="#1D2939" fontWeight="500" fontSize={{ base: "16px", lg: "22px" }} lineHeight={{ base: "24px", lg: "31px" }}>
                    {activeCard?.subtitle}
                  </Text>
                </Flex>
                <Text color="#1D2939" fontWeight="600" fontSize={{ base: "18px", lg: "32px" }} lineHeight={{ base: "24px", lg: "44px" }} display={{ base: "none", lg: "block" }}>
                  {activeCard?.title}
                </Text>
                <Text color="#1D2939" fontWeight="500" fontSize={{ base: "16px", lg: "22px" }} lineHeight={{ base: "24px", lg: "31px" }} display={{ base: "none", lg: "block" }}>
                  {activeCard?.subtitle}
                </Text>
                <Text color="#475467" fontWeight="500" fontSize={{ base: "14px", lg: "22px" }} lineHeight={{ base: "20px", lg: "32px" }} whiteSpace="pre-line">
                  {activeCard?.body}
                </Text>
              </Stack>
            </Box>

            <Box
              flex="1"
              minW={0}
              position="relative"
              zIndex={2}
              ml={{ base: 0, lg: "-20px" }}
              bgGradient={activeCard?.bgGradient}
              p={{ base: 5, lg: "34px" }}
              alignItems="center"
              justifyContent="center"
              display={'flex'}
            >
              <Box
                as="img"
                src={activeCardImage}
                alt={activeCard?.title ?? "학습 카드 이미지"}
                position="relative"
                zIndex={1}
                w="full"
                h="full"
                maxH="100%"
                objectFit="contain"
                objectPosition="center"
              />
            </Box>
          </Flex>
          <Box
            as="button"
            type="button"
            onClick={moveNext}
            w="70px"
            h="80px"
            borderRadius="12px"
            color="#D0D5DD"
            _hover={{ color: "#98A2B3" }}
            transition="color 0.2s ease"
            cursor="pointer"
            display={{ base: "none", lg: "flex" }}
          >
            <ChevronRightIcon boxSize={10} />
          </Box>
        </Flex>

        <Flex justify="center" gap={3} data-aos="fade-up" data-aos-delay="100">
          {cards.map((card, idx) => (
            <Box
              key={card.title}
              w={{base: '8px', lg: '12px'}}
              h={{base: '8px', lg: '12px'}}
              borderRadius="full"
              bg={idx === current ? "#98A2B3" : "#EAECF0"}
              transition="all 0.2s ease"
              onClick={() => {
                setCurrent(idx)
                setIsAutoPlay(false)
              }}
              cursor="pointer"
              _hover={{
                bg: "#98A2B3",
              }}
            />
          ))}
        </Flex>
      </Stack>
    </Box>
  );
}
