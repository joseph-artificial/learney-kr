import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import CheckIcon from "@/components/icon/CheckIcon";
import NextImage from "next/image";
import { Image as ChakraImage } from "@chakra-ui/react";
const CHECK_ITEMS = [
  "교과서에서 다룬 핵심 내용을\n스스로 복습하고 점검할 수 있어요.",
  "수업 시간에 다 다루지 못한 내용이나 개념을\n문제로 확인해볼 수 있어요.",
];

export function MiddleHighTextbookSection() {
  return (
    <Box bg="#FCFCFD" py={{ base: 16, lg: "120px" }} px={{ base: 4, lg: "120px" }}>
      <Stack maxW="1200px" mx="auto" gap={{ base: 10, lg: "40px" }}>
        <Stack gap={{ base: 6, lg: "33px" }} data-aos="fade-up">
          <Flex gap={4} wrap="wrap">
            <Flex h="36px" align="center" justify="center" px="14px" py="2px" bg="#E8F4F5" borderRadius="30px">
              <Text color="#0E9384" fontWeight="600" fontSize="16px" lineHeight="24px">
                주요 기능 02
              </Text>
            </Flex>
            <Flex h="36px" align="center" justify="center" px="14px" py="2px" border="1px solid #0E9384" borderRadius="30px">
              <Text color="#0E9384" fontWeight="600" fontSize="16px" lineHeight="24px">
                교과서 학습
              </Text>
            </Flex>
          </Flex>

          <Text color="#1D2939" fontWeight="600" fontSize={{ base: "38px", lg: "48px" }} lineHeight={{ base: "52px", lg: "60px" }}>
            교과서 내용을 탄탄하게 보충해요.
            <br />
            <Box as="span" bgGradient="linear(to-r, #43D1BC 0%, #009B84 100%)" bgClip="text" color="transparent">
              교과서 학습
            </Box>
          </Text>
        </Stack>

        <Flex direction={{ base: "column", xl: "row" }} gap={{ base: 8, xl: "60px" }} align="center">
<Box
  w={{ base: "full", xl: "588px" }}
  h={{ base: "380px", lg: "480px" }}
  border="1px solid #EAECF0"
  borderRadius="28px"
  bgGradient="linear(117deg, #EFFCFA 0.1%, #F9FAFB 112%)"
  position="relative"
  display="flex"
  alignItems="center"
  justifyContent="center"
>
  <Box
    w={{ base: "90%", lg: "484px" }}
    maxW="484px"
    flexShrink={0}
  >
    <NextImage
  src="/images/apply-target/Middle-textbook/middle-textbook.svg"
  alt="example"
  width={2418}
  height={1824}
  // sizes="(max-width: 768px) 90vw, 484px"
  quality={100}
  // style={{
  //   width: "100%",
  //   height: "auto",
  //   display: "block",
  // }}
  priority
/>
  </Box>

  <Flex
    position="absolute"
    top={{ base: "24px", lg: "40px" }}
    right={{ base: "24px", lg: "43px" }}
    w="52px"
    h="52px"
    borderRadius="26px"
    bg="#47B5A9"
    boxShadow="0px 0px 10px 0px rgba(0,0,0,0.1)"
    align="center"
    justify="center"
  >
    <Text color="white" fontSize="20px" lineHeight="1">
      🔖
    </Text>
  </Flex>
</Box>
          <Stack flex={1} gap={5} align="stretch" data-aos="fade-left" data-aos-delay="120">
            <Text color="#1D2939" fontWeight="600" fontSize={{ base: "24px", lg: "28px" }} lineHeight={{ base: "34px", lg: "40px" }} whiteSpace="pre-line">
              {"수업에서 다룬 교과서 내용,\n학생이 제대로 이해했는지 확인하고 싶을 때"}
            </Text>

            <Box bg="#F9FAFB" border="1px solid #EAECF0" borderRadius="10px" p="30px">
              <Stack gap="10px">
                {CHECK_ITEMS.map((item) => (
                  <Flex key={item} gap="10px" align="flex-start">
                    <Box pt="6px">
                      <CheckIcon boxSize="20px" color="#667085" />
                    </Box>
                    <Text color="#667085" fontWeight="500" fontSize={{ base: "20px", lg: "24px" }} lineHeight={{ base: "30px", lg: "34px" }} whiteSpace="pre-line">
                      {item}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
}

