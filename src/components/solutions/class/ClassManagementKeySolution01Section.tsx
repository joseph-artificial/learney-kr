import { Box, Flex, Stack, Text } from "@chakra-ui/react";

function FormLabel({ label, required = true }: { label: string; required?: boolean }) {
  return (
    <Flex gap="4px" align="center">
      <Text color="#344054" fontWeight="500" fontSize="10px" lineHeight="14px">
        {label}
      </Text>
      {required ? (
        <Text color="#F04438" fontWeight="400" fontSize="10px" lineHeight="14px">
          (필수)
        </Text>
      ) : null}
    </Flex>
  );
}

function FormInput({ value, focused = false }: { value: string; focused?: boolean }) {
  return (
    <Flex
      h="32px"
      px="12px"
      align="center"
      borderRadius="12px"
      bg="white"
      borderWidth={focused ? "0px" : "1px"}
      borderColor={focused ? "transparent" : "#D0D5DD"}
      boxShadow={focused ? "0 0 0 2px white, 0 0 0 4px #15B79E" : "0px 1px 2px rgba(16, 24, 40, 0.05)"}
    >
      <Text color={focused ? "#101828" : "#667085"} fontWeight="400" fontSize="11px" lineHeight="17px">
        {value}
      </Text>
    </Flex>
  );
}

export function ClassManagementKeySolution01Section() {
  return (
    <Box as="section" bg="white" py={{ base: 16, lg: "60px" }} px={{ base: 4, lg: 8 }}>
      <Stack maxW="1200px" mx="auto" gap={{ base: 8, lg: "40px" }}>
        <Stack gap={{ base: 5, lg: "25px" }} data-aos="fade-up">
          <Flex gap={4} wrap="wrap">
            <Flex h="36px" px="12px" py="6px" borderRadius="40px" bg="#E8F9EB" align="center">
              <Text color="#51A986" fontWeight="600" fontSize="16px" lineHeight="24px">
                솔루션 1
              </Text>
            </Flex>
            <Flex h="36px" px="12px" py="6px" borderRadius="40px" borderWidth="1px" borderColor="#51A986" align="center">
              <Text color="#51A986" fontWeight="600" fontSize="16px" lineHeight="24px">
                학생 등록
              </Text>
            </Flex>
          </Flex>

          <Text color="#1D2939" fontWeight="600" fontSize={{ base: "34px", lg: "48px" }} lineHeight={{ base: "44px", lg: "60px" }}>
            01. 간편한{" "}
            <Box as="span" bgGradient="linear(to-r, #65E2B0, #00A98A)" bgClip="text" color="transparent">
              클래스 생성 & 학생 등록
            </Box>
          </Text>

          <Box bg="#F9FAFB" borderRadius="20px" px={{ base: 5, lg: "30px" }} py={{ base: 5, lg: "30px" }} w={'100%'} maxW={'970px'}>
            <Stack gap={2.5}>
              <Text color="#1D2939" fontWeight="600" fontSize={{ base: "26px", lg: "22px" }} lineHeight={{ base: "36px", lg: "32px" }}>
                5분이면 우리 반이 완성돼요!
              </Text>
              <Text color="#475467" fontWeight="500" fontSize={{ base: "22px", lg: "22px", xl: "22px" }} lineHeight={{ base: "34px", lg: "32px", xl: "32px" }} whiteSpace="pre-line">
                {"학년과 반 이름만 정하면 바로 클래스가 생성돼요.\n학생 등록은 더 쉬워요. 학생 정보를 엑셀로 업로드하면, 자동으로 계정이 생성되어 바로 학습시킬 수 있어요."}
              </Text>
            </Stack>
          </Box>
        </Stack>

        <Box
          bg="#F9FAFB"
          borderRadius="20px"
          px={{ base: 4, lg: "60px" }}
          py={{ base: 6, lg: "62px" }}
          overflow="hidden"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          <Box position="relative" h={{ base: "290px", lg: "480px" }}>
            <Box as="img" src="/images/solutions/class-management/ClassManagementKeySolution01Section.svg" alt="setup-flow" w={'100%'} h={'100%'} objectFit="contain" />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}


