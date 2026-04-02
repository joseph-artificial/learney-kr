import Link from "next/link";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";


const ADOPTION_PROCESS_STEPS = [
  {
    title: "도입 상담 및 파일럿",
    body:
      "교육청 또는 학교의 도입 목적과 규모를 확인하고,\n필요한 경우 파일럿 학교를 선정해 2~4주간 시범 운영을 진행해요.",
  },
  {
    title: "계약 및 학교별 세팅",
    body:
      "도입 규모와 기간을 확정하고 계약을 진행해요.\n각 학교에서 교사가 클래스를 만들고 학생을 등록하면 세팅이 완료돼요.",
  },
  {
    title: "학습 운영 시작",
    body:
      "학생이 등록되는 순간 \"오늘의 학습\"이 자동으로 시작돼요.\n별도의 연수 없이도 교사가 바로 사용할 수 있지만, 요청 시 온라인 연수도 지원해요.",
  },
  {
    title: "운영 현황 확인 및 지원",
    body:
      "교사는 학급별 학습 결과 리포트를 통해 학생 참여율과 성취도를 확인해요.\n교육청은 도입 학교의 전체 운영 현황을 보고받을 수 있어요.",
  },
] as const;


export function InstitutionAdoptionProcessSection() {
  return (
    <Box as="section" bgGradient="linear(to-b, #F3FAFF, #D8E9F5)" py={{ base: 16, lg: "120px" }} px={{ base: 4, lg: 8 }}>
      <Stack maxW="1200px" mx="auto" align="center" gap={{ base: 10, lg: "60px" }}>
        <Stack gap={5} align="center" data-aos="fade-up">
          <Flex h="36px" px="14px" py="2px" borderRadius="30px" borderWidth="1px" borderColor="#4DABCE" align="center" justify="center">
            <Text color="#4DABCE" fontWeight="600" fontSize="16px" lineHeight="24px">
              도입 과정
            </Text>
          </Flex>
          <Text color="#0C111D" fontWeight="600" fontSize={{ base: "34px", lg: "48px" }} lineHeight={{ base: "44px", lg: "60px" }} textAlign="center">
            <Box as="span" bgGradient="linear(to-r, #43B9D1, #933CB8)" bgClip="text">
              교육청·학교 단위 도입
            </Box>
            은 이렇게 진행돼요.
          </Text>
        </Stack>

        <Stack w="full" maxW="957px" gap={{ base: 6, lg: "30px" }} align="stretch">
          {ADOPTION_PROCESS_STEPS.map((step, idx) => (
            <Flex
              key={step.title}
              gap={{ base: 4, lg: "34px" }}
              align="flex-start"
              data-aos="fade-up"
              data-aos-delay="0"
              data-aos-duration="900"
              data-aos-offset={120 + idx * 70}
              data-aos-anchor-placement="top-bottom"
              data-aos-once="true"
              data-aos-easing="ease-out-cubic"
            >
              <Flex direction="column" align="center" w={{ base: "44px", lg: "50px" }} flexShrink={0} position="relative">
                <Flex
                  w={{ base: "44px", lg: "50px" }}
                  h={{ base: "44px", lg: "50px" }}
                  borderRadius="30px"
                  bg="#94D8F5"
                  align="center"
                  justify="center"
                >
                  <Text color="white" fontWeight="600" fontSize={{ base: "24px", lg: "24px" }} lineHeight="30px">
                    {idx + 1}
                  </Text>
                </Flex>
                {idx < ADOPTION_PROCESS_STEPS.length - 1 ? (
                  <Box
                    mt={{ base: 1, lg: "2px" }}
                    w="8px"
                    h={{ base: "74px", lg: "100px" }}
                    borderRadius="10px"
                    bgGradient="linear(to-b, #94D8F5 0%, rgba(148,216,245,0) 100%)"
                  />
                ) : null}
              </Flex>

              <Stack flex={1} minW={0} gap={5} pt={{ base: 0, lg: "2px" }}>
                <Text color="#1D2939" fontWeight="600" fontSize={{ base: "28px", lg: "32px" }} lineHeight={{ base: "38px", lg: "48px" }}>
                  {step.title}
                </Text>
                <Box bg="#F9FAFB" borderRadius="10px" px={5} py={5}>
                  <Text color="#667085" fontWeight="500" fontSize={{ base: "20px", lg: "22px" }} lineHeight={{ base: "30px", lg: "30px" }} whiteSpace="pre-line">
                    {step.body}
                  </Text>
                </Box>
              </Stack>
            </Flex>
          ))}
        </Stack>

        <Box
          data-aos="fade-up"
          data-aos-delay="80"
          data-aos-duration="900"
          data-aos-offset="180"
          data-aos-anchor-placement="top-bottom"
          data-aos-once="true"
        >
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <Flex
              bg="white"
              borderWidth="1px"
              borderColor="#D0D5DD"
              borderRadius="12px"
              px="28px"
              py="16px"
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0px 0px 30px 0px rgba(0, 0, 0, 0.1)"
              align="center"
              justify="center"
            >
              <Text color="#344054" fontWeight="600" fontSize="18px" lineHeight="28px">
                1:1 미팅하기
              </Text>
            </Flex>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
}
