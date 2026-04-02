"use client";

import { Box, Flex, Image, ListItem, Stack, Text, UnorderedList, useBreakpointValue } from "@chakra-ui/react";
import type { ReactNode, RefObject } from "react";

const IMG = "/images/pricing/adoption-steps";

const MINT_BAR = "linear(to-l, #a4ece2, #dbf3f0)";

function IllustrationShell({
  gradientTo,
  children,
}: {
  gradientTo: string;
  children: ReactNode;
}) {
  return (
    <Box
      flex="1"
      maxW={{ base: "100%", lg: "580px" }}
      w="full"
      minH={{ base: "220px", lg: "360px" }}
      h={{ lg: "360px" }}
      borderRadius="28px"
      border="1px solid"
      borderColor="#EAECF0"
      bgGradient={`linear(to-b, white, ${gradientTo})`}
      position="relative"
      overflow="hidden"
    >
      {children}
    </Box>
  );
}

function Step01Illustration() {
  return (
    <IllustrationShell gradientTo="#E7F8E5">
      <Flex w="full" h="full" justify="center" align="center" >
        <Image src={`${IMG}/step01Illustration.png`} alt="" w="100%" maxW="315px" h="auto" objectFit="contain" />
      </Flex>
    </IllustrationShell>
  );
}

function Step02Illustration() {
  return (
    <IllustrationShell gradientTo="#E5F8F3">
      <Flex w="full" h="full" justify="center" align="center" >
        <Image src={`${IMG}/step02Illustration.png`} alt="" w="100%" maxW="362px" h="auto" objectFit="contain" />
      </Flex>
    </IllustrationShell>
  );
}

function Step03Illustration() {
  return (
    <IllustrationShell gradientTo="#E7F8E5">
      <Flex w="full" h="full" justify="center" align="center" >
        <Image src={`${IMG}/step03Illustration.png`} alt="" w="100%" maxW="298.5px" h="auto" objectFit="contain" />
      </Flex>
    </IllustrationShell>
  );
}

function Step04Illustration() {
  return (
    <IllustrationShell gradientTo="#E5F8F3">
      <Flex w="full" h="full" justify="center" align="center" >
        <Image src={`${IMG}/step04Illustration.png`} alt="" w="100%" maxW="475px" h="auto" objectFit="contain" />
      </Flex>
    </IllustrationShell>
  );
}

const STEPS: Array<{
  step: string;
  body: string;
  cta?: string;
  detail?: { title: string; list: string[] };
  illustration: "01" | "02" | "03" | "04";
}> = [
  {
    step: "01. 견적서 확인하기",
    body: "견적서를 신청해보세요!\n영업일 기준 2-3일 내, 입력하신 이메일로 견적서를 발송해드립니다.\n이메일에 첨부된 견적서를 검토해 주세요.",
    cta: "견적서 신청하기",
    illustration: "01",
  },
  {
    step: "02. 도입 확정하고 결제하기",
    body: "도입을 확정하신 경우, 아래 계약 중 하나를 선택해 결제할 수 있습니다.\n\nA. 직접 계약\nB. S2B (학교장터 계약)",
    illustration: "02",
  },
  {
    step: "03. 결제 완료",
    body: "결제가 완료되었다면, 영수증 발행 요청 이메일을 보내주세요.\n현금영수증/세금계산서 발행이 가능합니다.",
    detail: {
      title: "결제 방법 안내",
      list: [
        "카드 결제, 계좌 이체",
        "S2B 에듀테크몰 (물품번호 : 202506172759728)",
        "청년 창업 기업 인증, 5천만 원 이하 수의계약 가능",
      ],
    },
    illustration: "03",
  },
  {
    step: "04. 이용권 지급",
    body: "결제 완료 시, 그룹에 이용권이 지급되며\n바로 러니를 사용하실 수 있습니다.",
    illustration: "04",
  },
];

function renderIllustration(id: (typeof STEPS)[number]["illustration"]) {
  switch (id) {
    case "01":
      return <Step01Illustration />;
    case "02":
      return <Step02Illustration />;
    case "03":
      return <Step03Illustration />;
    case "04":
      return <Step04Illustration />;
    default:
      return null;
  }
}

type PricingAdoptionStepsSectionProps = {
  stepsRef: RefObject<HTMLDivElement | null>;
  onQuoteRequest: () => void;
};

export function PricingAdoptionStepsSection({ stepsRef, onQuoteRequest }: PricingAdoptionStepsSectionProps) {
  const isLgSize = useBreakpointValue({ base: false, lg: true })
  return (
    <Box
      pt={{ base: "40px", lg: "60px" }}
      pb={{ base: "80px", lg: "120px" }}
      px={{ base: 4, lg: 6, xl: "120px" }}
      mt={{base: '0px', lg: '55px'}}
      ref={stepsRef}
      data-aos="fade-up"
      bgGradient="linear(to-b, #FFFFFF 0%, #EFFFFD 100%)"
    >
      <Stack maxW="1200px" mx="auto" gap={{ base: "20px", lg: "60px" }} align="center">
        <Stack gap={{base: '10px', lg: '20px'}} textAlign="center" maxW="718px" data-aos="fade-up" data-aos-delay="80">
          <Text fontFamily="heading" fontWeight="600" fontSize={{ base: "24px", lg: "48px" }} lineHeight={{ base: "32px", lg: "60px" }} color="gray.900">
            러니, 학교에서 도입하기
          </Text>
          <Text fontSize={{ base: "12px", lg: "24px" }} lineHeight={{ base: "18px", lg: "32px" }} color="black" fontWeight="400">
            러니 도입은 이렇게 진행 돼요!
          </Text>
        </Stack>

        <Stack w="full" gap={{ base: "32px", lg: "40px" }}>
          {STEPS.map(({ step, body, cta, detail, illustration }, idx) => (
            <Flex
              key={step}
              gap={{ base: 5, lg: "24px" }}
              align="center"
              direction={{ base: "column", lg: "row" }}
              data-aos="fade-up"
              data-aos-delay={120 + idx * 70}
              w="full"
              border={isLgSize ? 'none' : '1px solid #EAECF0'}
              borderRadius={isLgSize ? 'none' : '10px'}
            >
              <Box
                flex="1"
                borderRadius="28px"
                bg="transparent"
                minH={{ base: "auto", lg: "360px" }}
                h={{ lg: "360px" }}
                p={{base: '20px', lg: 5}}
                display="flex"
                alignItems="center"
                w={{ base: "full", lg: "auto" }}
              >
                <Stack gap="20px" w="full">
                  <Text fontSize={{ base: "20px", lg: "36px" }} lineHeight={{ base: "30px", lg: "50px" }} fontWeight="600" color="primary.600">
                    {step}
                  </Text>
                  <Text whiteSpace="pre-line" fontSize={{base: '14px', lg: '20px'}} lineHeight={{base: '22px', lg: '30px'}} fontWeight="500" color="#667085">
                    {body}
                  </Text>
                  {cta && (
                    <Box
                      as="button"
                      type="button"
                      w="fit-content"
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                      onClick={onQuoteRequest}
                      px={5}
                      py={3}
                      borderRadius="12px"
                      bg="primary.600"
                      border="1px solid"
                      borderColor="primary.600"
                      color="white"
                      fontSize={{base: '14px', lg: '16px'}}
                      fontWeight="600"
                      lineHeight={{base: '22px', lg: '24px'}}
                      boxShadow="0px 1px 2px 0px rgba(16,24,40,0.05)"
                      _hover={{ bg: "primary.700", borderColor: "primary.700" }}
                    >
                      {cta}
                    </Box>
                  )}
                  {detail && (
                    <Stack gap="12px" maxW="390px" p="20px" borderRadius="12px" bg="rgba(234, 236, 240, 0.5)">
                      <Text fontSize="16px" fontWeight="600" color="#667085">
                        {detail.title}
                      </Text>
                      <UnorderedList spacing={0} pl="2px">
                        {detail.list.map((item) => (
                          <ListItem key={item} color="#667085" fontSize="16px" lineHeight="24px" fontWeight="500">
                            {item}
                          </ListItem>
                        ))}
                      </UnorderedList>
                    </Stack>
                  )}
                </Stack>
              </Box>
              {isLgSize ? renderIllustration(illustration) : null}
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
