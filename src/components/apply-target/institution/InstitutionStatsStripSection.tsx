import { Box, Flex, Stack, Text } from "@chakra-ui/react";

export function InstitutionStatsStripSection() {
  const items = [
    {
      label: "충남교육청 실증평가 4.95 / 5.0점",
      icon: "/images/apply-target/institution/stat-cap.png",
    },
    {
      label: "초등부터 고등까지 지원",
      icon: "/images/apply-target/institution/stat-school.png",
    },
    {
      label: "4개 시·도 교육청 공급 경험",
      icon: "/images/apply-target/institution/stat-medal.png",
    },
  ];

  return (
    <Box as="section" bg="white" py={{ base: 12, lg: "60px" }} px={{ base: 4, lg: 8 }}>
      <Flex
        maxW="1200px"
        mx="auto"
        w="full"
        direction={{ base: "column", lg: "row" }}
        align="center"
        justify="center"
        gap={{ base: 8, lg: 0 }}
      >
        {items.map((item, idx) => (
          <Flex key={item.label} align="center" w={{ base: "full", lg: "auto" }} justify="center">
            <Stack
              w={{ base: "full", sm: "400px" }}
              maxW="400px"
              h={{ base: "auto", lg: "273px" }}
              pt={{ base: 0, lg: "59px" }}
              pb={{ base: 0, lg: "58px" }}
              px={2}
              gap={5}
              align="center"
              justify="center"
              data-aos="fade-up"
              data-aos-delay={idx * 80}
            >
              <Flex
                w="100px"
                h="100px"
                borderRadius="50px"
                bg="#F9FAFB"
                borderWidth="1px"
                borderColor="#6DF0DD"
                align="center"
                justify="center"
              >
                <Box as="img" src={item.icon} alt="" w="80px" h="80px" objectFit="contain" />
              </Flex>
              <Text
                color="#1D2939"
                fontWeight="500"
                fontSize="24px"
                lineHeight="36px"
                textAlign="center"
                wordBreak="keep-all"
              >
                {item.label}
              </Text>
            </Stack>
            {idx < items.length - 1 ? (
              <Flex p={'10px'} align="center" justify="center">
                <Box
                  bg="#8FD7CD"
                  w="10px"
                  h="10px"
                  borderRadius="50%"
                  mx="10px"
                  
                  />
                </Flex>
            ) : null}
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
