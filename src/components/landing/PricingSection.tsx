import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { PRICING_QUOTE_FORM_HREF } from "@/config/site";

const CARD_SHADOW = "0px 0px 60px rgba(86, 216, 197, 0.1)";
const BUTTON_SHADOW = "0px 1px 2px 0px rgba(16, 24, 40, 0.05)";

function PlanIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <Flex w="50px" h="50px" borderRadius="28px" bg="#F6F6F6" p="6px" align="center" justify="center" flexShrink={0}>
      <Box position="relative" w="50px" h="50px" borderRadius="md" overflow="hidden">
        <Image src={src} alt={alt} fill sizes="50px" style={{ objectFit: "cover" }} />
      </Box>
    </Flex>
  );
}

interface PricingSectionProps {
  titleSection?: ReactNode;
}
export function PricingSection(props: PricingSectionProps) {
  const { titleSection } = props;

  return (
    <Box
      as="section"
      id="pricing"
      bg="white"
      py={{ base: "50px", lg: "120px" }}
      px={{ base: '60px', lg: 6 }}
      data-aos="fade-up"
      data-aos-delay="0"
      data-aos-duration="900"
      data-aos-offset="120"
      data-aos-anchor-placement="top-bottom"
      data-aos-once="true"
      data-aos-easing="ease-out-cubic"
    >
      {titleSection}
      <Flex
        maxW="1200px"
        mx="auto"
        gap={{ base: '32px', lg: "32px" }}
        flexWrap="wrap"
        justify="center"
        align="stretch"
        data-aos="fade-up"
        data-aos-delay="0"
        data-aos-duration="900"
        data-aos-offset="140"
        data-aos-anchor-placement="top-bottom"
        data-aos-once="true"
        data-aos-easing="ease-out-cubic"
      >
        {/* 견적서 */}
        <Stack
          w={{ base: "full", lg: "486px" }}
          maxW={{ base: "486px", lg: "486px" }}
          mx={{ base: "auto", lg: 0 }}
          align="center"
          gap="20px"
          pt={{ base: "20px", lg: "50px" }}
          pb={{ base: "20px", lg: "60px" }}
          pl={{ base: "20px", lg: "46px" }}
          pr={{ base: "20px", lg: "45px" }}
          bg="white"
          borderWidth="2px"
          borderColor="#F2F4F7"
          borderRadius="28px"
          boxShadow={CARD_SHADOW}
          data-aos="fade-up"
          data-aos-delay="0"
          data-aos-duration="900"
          data-aos-offset="180"
          data-aos-anchor="#pricing"
          data-aos-anchor-placement="top-bottom"
          data-aos-once="true"
          data-aos-easing="ease-out-cubic"
        >
          <Stack align="center" gap="10px" textAlign="center">
            <PlanIcon src="/images/landing/pricing-cta/icon-quote.png" alt="" />
            <Text fontFamily="heading" fontWeight="600" fontSize={{ base: '20px', lg: '36px'}} lineHeight={{ base: '30px', lg: '44px'}} color="#1D2939">
              견적서
            </Text>
            <Text fontFamily="body" fontWeight="500" fontSize={{ base: '14px', lg: '18px'}} lineHeight={{ base: '20px', lg: '28px'}} color="#1D2939" whiteSpace="pre-line">
              러니를 도입하고 싶다면?{"\n"}학생 수, 기간에 따른 견적을 확인해보세요!
            </Text>
          </Stack>
          <Box position="relative" w="full" maxW="395px" h="221px" borderRadius="28px" overflow="hidden" flexShrink={0}>
            <Box display={{ base: "block", lg: "none" }} w="full" h="full" position="relative">
              <Image
                src="/images/landing/pricing-cta/illustration-quote.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 395px"
                style={{ objectFit: "contain" }}
              />
              
            </Box>
            
            <Box display={{ base: "none", lg: "block" }} w="full" h="full" position="relative">
              <Image
                src="/images/landing/pricing-cta/illustration-quote.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 395px"
                style={{ objectFit: "cover" }}
              />
              
            </Box>
          </Box>
          <Box w="auto" mt={{ base: '-10px', lg: 0 }}>
            <Link href={PRICING_QUOTE_FORM_HREF} style={{ textDecoration: "none" }}>
              <Flex
                align="center"
                justify="center"
                gap="8px"
                px={{ base: '10px', lg: '20px'}}
                py={{ base: '6px', lg: '12px'}}
                borderRadius="12px"
                bg="white"
                borderWidth="1px"
                borderColor="#D0D5DD"
                boxShadow={BUTTON_SHADOW}
                _hover={{ bg: "gray.50" }}
              >
                <Text fontFamily="body" fontWeight="600" fontSize={{ base: '12px', lg: '16px'}} lineHeight={{ base: '18px', lg: '24px'}} color="#344054">
                  견적서 받기
                </Text>
              </Flex>
            </Link>
          </Box>
          
        </Stack>

        {/* 무료체험 */}
        <Stack
          w={{ base: "full", lg: "486px" }}
          maxW={{ base: "486px", lg: "486px" }}
          mx={{ base: "auto", lg: 0 }}
          align="center"
          gap="20px"
          pt={{ base: '20px', lg: "50px" }}
          pb={{ base: '20px', lg: "60px" }}
          pl={{ base: '20px', lg: "46px" }}
          pr={{ base: '20px', lg: "45px" }}
          bg="#475467"
          borderRadius="28px"
          boxShadow={CARD_SHADOW}
          data-aos="fade-up"
          data-aos-delay="120"
          data-aos-duration="900"
          data-aos-offset="220"
          data-aos-anchor="#pricing"
          data-aos-anchor-placement="top-bottom"
          data-aos-once="true"
          data-aos-easing="ease-out-cubic"
        >
          <Stack align="center" gap="10px" textAlign="center">
            <PlanIcon src="/images/landing/pricing-cta/icon-trial.png" alt=""  />
            <Text fontFamily="heading" fontWeight="600" fontSize={{ base: '20px', lg: '36px'}} lineHeight={{ base: '30px', lg: '44px'}} color="white">
              무료체험
            </Text>
            <Text fontFamily="body" fontWeight="500" fontSize={{ base: '14px', lg: '18px'}} lineHeight={{ base: '20px', lg: '28px'}} color="white" whiteSpace="pre-line">
              지금 바로 러니를 활용해보고 싶다면?{"\n"}회원가입하고 2주간 무료체험해보세요!
            </Text>
          </Stack>
          <Box position="relative" w="full" maxW="395px" h="221px" borderRadius="28px" overflow="hidden" flexShrink={0}>
            <Image
              src="/images/landing/pricing-cta/illustration-trial.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 395px"
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <Flex
              align="center"
              justify="center"
              gap="8px"
              px={{ base: '10px', lg: '20px'}}
              py={{ base: '6px', lg: '12px'}}
              borderRadius="12px"
              bgGradient="linear(to-r, #15B79E, #00A289)"
              boxShadow={BUTTON_SHADOW}
              _hover={{ opacity: 0.95 }}
            >
              <Text fontFamily="body" fontWeight="600" fontSize={{ base: '12px', lg: '16px'}} lineHeight={{ base: '18px', lg: '24px'}} color="white">
                무료체험 신청하기
              </Text>
            </Flex>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
}
