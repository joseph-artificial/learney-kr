import { Box, Flex, Stack, Text } from "@chakra-ui/react";

export function InstitutionCurriculumLinkSection() {
  const items = [
    "초등 3학년부터 고등 1학년까지, 성취 기준을 기반으로 콘텐츠를 선택할 수 있어요.",
    "교과서별로 정리되어 있어, 학급별 진도 차이가 있어도 유연하게 운영할 수 있어요.",
  ];

  return (
    <Box as="section" bg="white" py={{ base: 16, lg: "120px" }} px={{ base: 4, lg: 8 }} id="apply-target-curriculum-link-intro">
      <Stack maxW="1200px" mx="auto" gap={{ base: 10, lg: "60px" }}>
        <Stack gap={{ base: 6, lg: "25px" }} data-aos="fade-up">
          <Flex gap={4} wrap="wrap">
            <Flex
              h="36px"
              px="14px"
              py="2px"
              borderRadius="30px"
              bg="#DDF4FD"
              align="center"
              justify="center"
            >
              <Text color="#4DABCE" fontWeight="600" fontSize="16px" lineHeight="24px">
                도입 기준 01
              </Text>
            </Flex>
            <Flex
              h="36px"
              px="14px"
              py="2px"
              borderRadius="30px"
              borderWidth="1px"
              borderColor="#4DABCE"
              align="center"
              justify="center"
            >
              <Text color="#4DABCE" fontWeight="600" fontSize="16px" lineHeight="24px">
                교육과정 연계
              </Text>
            </Flex>
          </Flex>

          <Text
            color="#1D2939"
            fontWeight="600"
            fontSize={{ base: "34px", lg: "48px" }}
            lineHeight={{ base: "44px", lg: "60px" }}
            whiteSpace="pre-line"
          >
            <Box as="span" bgGradient="linear(to-r, #43B9D1, #933CB8)" bgClip="text">
              2022 개정 교육과정
            </Box>
            {" 성취 기준에 맞춰 제작했어요."}
          </Text>

          <Stack gap={2.5} w="full">
            {items.map((line) => (
              <Flex key={line} gap={2.5} align="center">
                <Box
                  as="img"
                  src="/images/etc/DefalutCheck.svg"
                  alt=""
                  w="16px"
                  h="11px"
                  objectFit="contain"
                  flexShrink={0}
                />
                <Text
                  color="#667085"
                  fontWeight="500"
                  fontSize={{ base: "22px", lg: "24px" }}
                  lineHeight={{ base: "32px", lg: "32px" }}
                  wordBreak="keep-all"
                >
                  {line}
                </Text>
              </Flex>
            ))}
          </Stack>
        </Stack>

        <Box
          w="full"
          h={{ base: "320px", lg: "480px" }}
          borderRadius="28px"
          bgGradient="linear(136deg, #EFF7FC 0%, #F7F0F8 100%)"
          position="relative"
          overflow="hidden"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          <Box
            as="img"
            src="/images/apply-target/institution/curriculum-section-image.png"
            alt=""
            w={{ base: "76%", lg: "550px" }}
            h="auto"
            position="absolute"
            left={{ base: "6%", lg: "155px" }}
            top={{ base: "48px", lg: "60px" }}
            borderRadius="10px"
            borderWidth={{ base: "2px", lg: "4px" }}
            borderColor="#FEFDFD"
            boxShadow="0px 0px 20px 0px rgba(0,0,0,0.05)"
          />

          <Box
            position="absolute"
            right={{ base: "4%", lg: "90px" }}
            bottom={{ base: "24px", lg: "30px" }}
            w={{ base: "52%", lg: "435px" }}
            p={{ base: 3, lg: "18px" }}
            borderRadius={{ base: "12px", lg: "18px" }}
            bg="rgba(255,255,255,0.5)"
            backdropFilter="blur(9px)"
            borderWidth="1px"
            borderColor="white"
            boxShadow="0px 0px 10px 0px rgba(0,0,0,0.1)"
          >
            <Flex
              bg="white"
              borderWidth="1px"
              borderColor="#D0D5DD"
              borderRadius="12px"
              px={{ base: 3, lg: "12px" }}
              py={{ base: 2, lg: "8px" }}
              align="center"
              justify="space-between"
              boxShadow="0px 1px 2px 0px rgba(16,24,40,0.05)"
              mb={{ base: 2, lg: "14px" }}
            >
              <Text color="#101828" fontWeight="400" fontSize={{ base: "13px", lg: "14px" }} lineHeight="22px">
                6국 02-05
              </Text>
              <Box
                as="img"
                src="/images/etc/search-sm.svg"
                alt=""
                w={{ base: "16px", lg: "18px" }}
                h={{ base: "16px", lg: "18px" }}
                objectFit="contain"
              />
            </Flex>

            <Flex
              bg="white"
              borderWidth="1px"
              borderColor="#D0D5DD"
              borderRadius="12px"
              px={{ base: 3, lg: "18px" }}
              py={{ base: 3, lg: "14px" }}
              align="center"
              gap={{ base: 2, lg: 3 }}
              boxShadow="0px 1px 2px 0px rgba(16,24,40,0.05)"
            >
              <Flex
                bg="#F2F4F7"
                borderWidth="1px"
                borderColor="#D0D5DD"
                borderRadius="5px"
                h={{ base: "28px", lg: "30px" }}
                px={{ base: 2, lg: "14px" }}
                align="center"
                justify="center"
                flexShrink={0}
              >
                <Text color="#101828" fontWeight="500" fontSize={{ base: "13px", lg: "14px" }} lineHeight="22px">
                  성취기준
                </Text>
              </Flex>
              <Text color="#344054" fontWeight="600" fontSize={{ base: "14px", lg: "16px" }} lineHeight={{ base: "22px", lg: "25px" }}>
                매체에 따른 다양한 읽기 방법을 이해하고
                <br />
                적절하게 적용하며 읽는다.{" "}
                <Box as="span" fontWeight="400">
                  [6국 02-05]
                </Box>
              </Text>
            </Flex>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
