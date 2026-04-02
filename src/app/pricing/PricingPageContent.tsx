"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Flex, Stack, Text, Image, useBreakpointValue } from "@chakra-ui/react";
import { PricingAdoptionStepsSection } from "@/components/pricing/PricingAdoptionStepsSection";
import { keyframes } from '@emotion/react'
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import FeaturesSection from "@/components/FeaturesSection";
// import ClassIcon from "/images/pricing/class.svg";
// import GradeIcon from "/images/pricing/grade.svg";
// import SchoolIcon from "@/images/pricing/school.svg";
// import ActiveCheckIcon from "public/images/pricing/active-check.svg";
// import InactiveCheckIcon from "public/images/pricing/inactive-check.svg";


gsap.registerPlugin(ScrollToPlugin);
type Period = "monthly" | "semester" | "yearly";


const scrollHintAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0.7;
  }
  50% {
    transform: translateY(8px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 0.7;
  }
`

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
const PERIOD_LABELS: Record<Period, string> = {
  monthly: "월 단위 도입",
  semester: "학기 단위 도입",
  yearly: "연 단위 도입",
};

const PERIOD_BADGES: Record<Period, string | null> = {
  monthly: null,
  semester: "10% 추가 할인",
  yearly: "25% 추가 할인",
};

const PERIOD_ORDER: Period[] = ["monthly", "semester", "yearly"];

const PLAN_CARDS = [
  {
    id: "class",
    pill: "반 단위",
    range: "1~99명",
    original: "정상가 6,000원",
    monthly: "3,000원",
    descriptionLines: [
      {
        active: false,
        text: "반 단위로 러니를 도입하고 싶은 경우\n(1~99명)"
      },
      {
        active: false,
        text: "특정 기간 동안 러니를 활용하고 싶은 경우\n(1~5개월)"
      },
    ],
    highlight: false,
    icon: <Image src={'/images/pricing/class.svg'} alt="class" w={'13.34px'} h={'14.13px'} />,
  },
  {
    id: "grade",
    pill: "학년 단위",
    range: "100~299명",
    original: "정상가 6,000원",
    monthly: "1,500원",
    descriptionLines: [
      {
        active: false,
        text: "학년 단위로 러니를 도입하고 싶은 경우\n(100~299명)"
      },
      {
        active: false,
        text: "특정 기간 동안 러니를 활용하고 싶은 경우\n(1~5개월)"
      },
      {
        active: true,
        text: "온/오프라인 맞춤형 연수 지원"
      },
    ],
    highlight: true,
    icon: <Image src={'/images/pricing/grade.svg'} alt="grade" w={'18.94px'} h={'14.6px'} />,
  },
  {
    id: "school",
    pill: "학교 단위",
    range: "300+명",
    original: "정상가 6,000원",
    monthly: "1,000원",
    descriptionLines: [
      {
        active: true,
        text: "학교 단위로 러니를 도입하고 싶은 경우\n(300명 이상)"
      },
      {
        active: false,
        text: "특정 기간 동안 러니를 활용하고 싶은 경우\n(1~5개월)"
      },
      {
        active: true,
        text: "온/오프라인 맞춤형 연수 지원"
      },
    ],
    highlight: false,
    icon: <Image src={'/images/pricing/school.svg'} alt="school" w={'14.4px'} h={'14.4px'} />,
  },
] as const;
const PLAN_CARDS_SEMESTER = [
  {
    id: "class",
    pill: "반 단위",
    range: "1~99명",
    original: "정상가 6,000원",
    monthly: "2,700원",
    descriptionLines: [
      {
        active: false,
        text: "반 단위로 러니를 도입하고 싶은 경우\n(1~99명)"
      },
      {
        active: false,
        text: "한 학기 동안 러니를 활용하고 싶은 경우\n(6~9개월)"
      },
    ],
    highlight: false,
    icon: <Image src={'/images/pricing/class.svg'} alt="class" w={'13.34px'} h={'14.13px'} />,
  },
  {
    id: "grade",
    pill: "학년 단위",
    range: "100~299명",
    original: "정상가 6,000원",
    monthly: "1,350원",
    descriptionLines: [
      {
        active: false,
        text: "학년 단위로 러니를 도입하고 싶은 경우\n(100~299명)"
      },
      {
        active: false,
        text: "한 학기 동안 러니를 활용하고 싶은 경우\n(6~9개월)"
      },
      {
        active: true,
        text: "온/오프라인 맞춤형 연수 지원"
      },
    ],
    highlight: true,
    icon: <Image src={'/images/pricing/grade.svg'} alt="grade" w={'18.94px'} h={'14.6px'} />,
  },
  {
    id: "school",
    pill: "학교 단위",
    range: "300+명",
    original: "정상가 6,000원",
    monthly: "900원",
    descriptionLines: [
      {
        active: true,
        text: "학교 단위로 러니를 도입하고 싶은 경우\n(300명 이상)"
      },
      {
        active: false,
        text: "한 학기 동안 러니를 활용하고 싶은 경우\n(6~9개월)"
      },
      {
        active: true,
        text: "온/오프라인 맞춤형 연수 지원"
      },
    ],
    highlight: false,
    icon: <Image src={'/images/pricing/school.svg'} alt="school" w={'14.4px'} h={'14.4px'} />,
  },
] as const;
const PLAN_CARDS_YEARLY = [
  {
    id: "class",
    pill: "반 단위",
    range: "1~99명",
    original: "정상가 6,000원",
    monthly: "2,250원",
    descriptionLines: [
      {
        active: false,
        text: "반 단위로 러니를 도입하고 싶은 경우\n(1~99명)",
      },
      {
        active: false,
        text: "러니를 연간 커리큘럼으로 활용하고 싶은 경우\n(10~12개월)",
      },
    ],
    highlight: false,
    icon: <Image src={"/images/pricing/class.svg"} alt="class" w={"13.34px"} h={"14.13px"} />,
  },
  {
    id: "grade",
    pill: "학년 단위",
    range: "100~299명",
    original: "정상가 6,000원",
    monthly: "1,125원",
    descriptionLines: [
      {
        active: false,
        text: "학년 단위로 러니를 도입하고 싶은 경우\n(100~299명)",
      },
      {
        active: false,
        text: "러니를 연간 커리큘럼으로 활용하고 싶은 경우\n(10~12개월)",
      },
      {
        active: true,
        text: "온/오프라인 맞춤형 연수 지원",
      },
    ],
    highlight: true,
    icon: <Image src={"/images/pricing/grade.svg"} alt="grade" w={"18.94px"} h={"14.6px"} />,
  },
  {
    id: "school",
    pill: "학교 단위",
    range: "300+명",
    original: "정상가 6,000원",
    monthly: "750원",
    descriptionLines: [
      {
        active: true,
        text: "학교 단위로 러니를 도입하고 싶은 경우\n(300명 이상)",
      },
      {
        active: false,
        text: "러니를 연간 커리큘럼으로 활용하고 싶은 경우\n(10~12개월)",
      },
      {
        active: true,
        text: "온/오프라인 맞춤형 연수 지원",
      },
    ],
    highlight: false,
    icon: <Image src={"/images/pricing/school.svg"} alt="school" w={"14.4px"} h={"14.4px"} />,
  },
] as const;

export function PricingPageContent() {
  const [period, setPeriod] = useState<Period>("monthly");
  const [isPriceVisible, setIsPriceVisible] = useState(true);
  const [autoPeriodPaused, setAutoPeriodPaused] = useState(false);
  const priceAnimTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const planCards =
    period === "semester"
      ? PLAN_CARDS_SEMESTER
      : period === "yearly"
        ? PLAN_CARDS_YEARLY
        : PLAN_CARDS;

  const handlePeriodChange = useCallback(
    (nextPeriod: Period) => {
      if (nextPeriod === period) return;

      // 현재 가격을 페이드아웃한 뒤 period를 바꾸고 페이드인
      setIsPriceVisible(false);
      if (priceAnimTimerRef.current) {
        clearTimeout(priceAnimTimerRef.current);
      }
      priceAnimTimerRef.current = setTimeout(() => {
        setPeriod(nextPeriod);
        setIsPriceVisible(true);
      }, 220);
    },
    [period]
  );

  useEffect(() => {
    if (autoPeriodPaused) return;
    const id = window.setInterval(() => {
      const idx = PERIOD_ORDER.indexOf(period);
      const next = PERIOD_ORDER[(idx + 1) % PERIOD_ORDER.length];
      handlePeriodChange(next);
    }, 2000);
    return () => window.clearInterval(id);
  }, [autoPeriodPaused, period, handlePeriodChange]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const stepsRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToSteps = () => {
    const target = stepsRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const offset = window.scrollY + rect.top;
    gsap.to(window, {
      duration: 1.1,
      scrollTo: { y: offset - 40 },
      ease: "power2.inOut",
    });
  };

  const handleScrollToForm = useCallback(() => {
    const target = formRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const offset = window.scrollY + rect.top;
    gsap.to(window, {
      duration: 1.1,
      scrollTo: { y: offset + 20 },
      ease: "power2.inOut",
    });
  }, []);

  /** `/pricing?quote=1` 등으로 진입 시 견적 신청 폼으로 스크롤 */
  useEffect(() => {
    const q = searchParams.get("quote");
    const wantsQuoteScroll =
      q === "1" || q === "true" || q === "";
    if (!wantsQuoteScroll) return;

    const id = window.setTimeout(() => {
      if (!formRef.current) return;
      handleScrollToForm();
      router.replace("/pricing", { scroll: false });
    }, 220);

    return () => window.clearTimeout(id);
  }, [searchParams, handleScrollToForm, router]);

  const isLgSize = useBreakpointValue({ base: false, lg: true })
  
  return (
    <Box as="main" bg="white" minH="100vh">
      {/* SECTION 1 – 상단 인트로 (125:9455) */}
      <Box
        // pb={{ base: 16, lg: '60px' }}
        px={{ base: 4, lg: 6 }}
        // mt={'60px'}
        h={{base: '500px', lg: '667px'}}
        bgGradient="linear(to-b, #F6FFFC 0%, #F6FFFC 30%, #DBFAF4 100%)"
        pt={{base: '50px', lg: '50px'}}
        position={'relative'}
      >
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          gap={'20px'}
          position={'absolute'}
          top={'0'}
          left={'50%'}
          transform={'translateX(-50%)'}
          transformOrigin="top center"
          h={'50px'}
          bgGradient="linear(to-r, #15B79E, #1550B7)"
          w={'100%'}
          animation={`${promoBarRevealAnimation} 820ms cubic-bezier(0.16, 1, 0.3, 1) 1000ms both`}
        >
          <Text fontSize={{base: '14px', lg: '20px'}} color={'white'} fontWeight={'600'}>지금, 러니는 2026 출시 프로모션 진행중</Text>
          <Text fontSize={{base: '12px', lg: '14px'}} color={'white'} fontWeight={'500'}>할인가, 놓치지 마세요!</Text>
        </Flex>
        <Stack maxW="1200px" mx="auto" h={'100%'} gap={'40px'} align={"center"} justifyContent={{base: 'flex-start', lg: 'center'}} pt={{base: '50px', lg: 0}}>
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            w={{ base: "50px", lg: "100px" }}
            h={{ base: "50px", lg: "100px" }}
            borderRadius="full"
            borderWidth="2px"
            borderColor="primary.100"
            bg="#F6FEFC"
            style={{
              boxShadow: '0 0 20px rgba(0,0,0,0.05)',
            }}

          >
            <Image src={'/images/pricing/pricingBell.png'} alt="logo" w={{base: '35px',lg:'50px'}} h={{base: '35px',lg:'50px'}} />
          </Flex>
          <Stack gap={'20px'} justifyContent={'center'} alignItems={'center'}>
            <Text
              fontFamily="heading"
              fontWeight="700"
              fontSize={{ base: "26px", lg: "48px" }}
              lineHeight={{ base: "34px", lg: "60px" }}
              color="gray.900"
              textAlign={'center'}
            >
              우리 학교에 딱-맞는{ isLgSize ? ' ' : <br />}<span style={{ color: 'primary.500' }}>플랜</span>을 알아보세요
            </Text>
            <Text
              fontFamily="body"
              fontWeight="400"
              fontSize={{ base: "12px", lg: "24px" }}
              lineHeight={{ base: "18px", lg: "32px" }}
              color="gray.700"
              textAlign={'center'}
            >
              반 단위부터 학교 전체 도입까지, 상황에 맞게 선택하세요!
              <br />
              이용 기간이 길수록, 학생 수가 많을 수록 더 큰 혜택을 제공합니다.
            </Text>
            {/* 하단 견적서 신청 버튼 */}
            <Box maxW="1200px" mx="auto" mt={{ base: '20px', lg: "20px" }}>
              <Box
                as="button"
                type="button"
                onClick={handleScrollToForm}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="154px"
                h="53px"
                py={3.5}
                borderRadius="12px"
                bg="primary.600"
                color="white"
                fontSize="16.89px"
                fontWeight="600"
                boxShadow="0 1px 2px rgba(16,24,40,0.05)"
                _hover={{ bg: "primary.700" }}
              >
                견적서 신청하기
              </Box>
            </Box>
          </Stack>
          
        </Stack>
      </Box>

      {/* SECTION 2 – 플랜/칩 영역 (125:10232) */}
      <Box py={{ base: '50px', lg: 16 }} px={{ base: 4, lg: 6 }}>
        {/* 칩 선택 */}
        <Flex justify="center" gap={3} mb={{ base: '20px', lg: 10 }} wrap="wrap">
          {(Object.keys(PERIOD_LABELS) as Period[]).map((key) => {
            const selected = period === key;
            const badge = PERIOD_BADGES[key];

            return (
              <Flex
                key={key}
                as="button"
                align="center"
                gap={2}
                py={{base: '10px', lg: '10px'}}
                px={{base: '10px', lg: '18px'}}
                borderRadius="12px"
                borderWidth="1px"
                bg={selected ? "primary.50" : "white"}
                borderColor={selected ? "primary.200" : "gray.300"}
                boxShadow="0 1px 2px rgba(16,24,40,0.05)"
                cursor={'pointer'}
                _hover={{ bg: selected ? "primary.50" : "gray.50" }}
                onClick={() => {
                  setAutoPeriodPaused(true);
                  handlePeriodChange(key);
                }}
              >
                <Text
                  fontWeight="600"
                  fontSize={{base: '12px', lg: '16px'}}
                  color={selected ? "primary.700" : "gray.700"}
                >
                  {isLgSize ? PERIOD_LABELS[key] : PERIOD_LABELS[key]?.replace(' 도입', '')}
                </Text>
                {badge && (
                  <Box
                    bg={selected ? "#FFE5E5" : "gray.200"}
                    borderRadius="4px"
                    px={{base: '6px', lg: 2}}
                    h="25px"
                    display="flex"
                    alignItems="center"
                  >
                    <Text fontSize={{ base: '12px', lg: '15px' }} fontWeight="600" color={selected ? "#E84E4E" : "gray.400"}>
                      {isLgSize ? badge : badge?.replace('추가', '')}
                    </Text>
                  </Box>
                )}
              </Flex>
            );
          })}
        </Flex>

        {/* 플랜 카드 3개 */}
        <Flex
          maxW="1100px"
          mx="auto"
          gap={4}
          wrap="wrap"
          justify="center"
          align="stretch"
          position="relative"
          flexDirection={{base: 'column', lg: 'row'}}
          
        >
          {planCards.map((plan) => (
            <Box
              key={plan.id}
              w={{ base: "100%", lg: "355px" }}
              bg={plan.highlight ? "primary.25" : "gray.25"}
              borderWidth="2px"
              borderColor={plan.highlight ? "primary.400" : "gray.200"}
              borderRadius="16px"
              p={'20px'}
              boxShadow={plan.highlight ? "0 0 10px rgba(0,0,0,0.04)" : "none"}
              position="relative"
              display="flex"
              flexDirection="column"
              gap={{base: '10px', lg: 5}}
            >
              {/* 상단 태그 */}
              <Flex gap={2} align="center">
                <Flex
                  bg={plan.highlight ? "primary.500" : "gray.500"}
                  borderRadius="4px"
                  align="center"
                  px={'10px'}
                  py={'6px'}
                  color="white"
                  h={'29.83px'}
                  fontSize={{base: '12px', lg: '14px'}}
                  fontWeight="600"
                  gap={'5.6px'}
                >
                  {plan.icon}
                  {plan.pill}
                </Flex>
                <Flex
                  borderWidth="1px"
                  borderColor={plan.highlight ? "primary.500" : "gray.500"}
                  borderRadius="4px"
                  px={2}
                  py={1}
                >
                  <Text fontSize="14px" fontWeight="600" color={plan.highlight ? "primary.600" : "gray.600"}>
                    {plan.range}
                  </Text>
                </Flex>
              </Flex>

              {/* 가격 */}
              <Stack gap={1}>
                <Text
                  fontSize={{base: '14px', lg: '16px'}}
                  color="gray.400"
                  textDecoration="line-through"
                  fontWeight="500"
                >
                  {plan.original}
                </Text>
                <Flex
                  gap={{base: '4px', lg: 2}}
                  align="flex-end"
                  opacity={isPriceVisible ? 1 : 0}
                  transform={isPriceVisible ? "translateY(0)" : "translateY(-10px)"}
                  transition="opacity 0.22s ease-in-out, transform 0.22s ease-in-out"
                >
                  <Text
                    fontFamily="heading"
                    fontWeight="700"
                    fontSize={{base: '26px', lg: '40px'}}
                    lineHeight={{base: '32px', lg: '44px'}}
                    backgroundImage={
                      plan.highlight
                        ? "linear-gradient(90deg, #15B79E 0%, #008873 50%, #00C0B6 100%)"
                        : "none"
                    }
                    backgroundClip={plan.highlight ? "text" : "initial"}
                    color={plan.highlight ? "transparent" : "gray.800"}
                    style={
                      plan.highlight
                        ? {
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }
                        : undefined
                    }
                  >
                    {plan.monthly}
                  </Text>
                  <Text fontSize={{base: '14px', lg: '16px'}} fontWeight="600" color="gray.600">
                    학생당/월
                  </Text>
                </Flex>
              </Stack>

              {/* 설명 리스트 */}
              <Box pt={5} borderTopWidth="1px" borderColor="gray.200">
                <Stack gap={3}>
                  {plan.descriptionLines.map((line, idx) => (
                    <Flex key={idx} gap={3} align="flex-start">
                      <Flex w={'20px'} h={'20px'} alignItems={'center'} justifyContent={'center'} pt={'2px'}>
                        <Image src={line.active ? '/images/pricing/activeCheck.svg' : '/images/pricing/inactiveCheck.svg'} alt="active-check" w={'13.33px'} h={'9.17px'}  />
                      </Flex>
                      
                      <Text
                        fontSize="14px"
                        fontWeight={idx === plan.descriptionLines.length - 1 && plan.highlight ? 600 : 500}
                        color={idx === plan.descriptionLines.length - 1 && plan.highlight ? "gray.700" : "gray.400"}
                        whiteSpace="pre-line"
                      >
                        {line?.text}
                      </Text>
                    </Flex>
                  ))}
                </Stack>
              </Box>

              {/* 인기 리본 */}
              {plan.highlight && (
                <Box
                        position="absolute"
                        top="0"
                        right="20.1px"
                        width="40.9px"
                        height="57px"
                        bg="#FF7777"
                        clipPath="polygon(0% 0%, 100% 0%, 100% 100%, 50% 85%, 0% 100%)"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        pb="10px"
                        borderRadius="2px"
                  
                >
                  <Text color="white" fontWeight="bold" fontSize="13px" lineHeight="1">
                    인기
                  </Text>
                </Box>
              )}
            </Box>
          ))}
          {isLgSize && (
              <Box
                position="absolute"
                bottom="-100px"
                left="50%"
                w="50px"
                h="50px"
                transform="translateX(-50%)"
                cursor="pointer"
                onClick={handleScrollToSteps}
              >
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  w="100%"
                  h="100%"
                  animation={`${scrollHintAnimation} 1.4s linear infinite`}
                >
                  <Image
                    src="/images/arrows/scrollDown.svg"
                    alt="scrollDown"
                    w="25px"
                    h="12.5px"
                  />
                </Flex>
              </Box>
            )
          }
        </Flex>
      </Box>


      <PricingAdoptionStepsSection stepsRef={stepsRef} onQuoteRequest={handleScrollToForm} />
      {/* SECTION 4 – 견적 신청 폼 */}
      <FeaturesSection formRef={formRef} />
    </Box>
  );
}