import { Box, Flex, Stack, Text } from "@chakra-ui/react";



interface ApplyTargetFeatureIntroSectionProps {
  title: React.ReactNode;
  description: string;
  categoryList: string[];
  checkItems: string[];
  contents: React.ReactNode;
}
export function ApplyTargetFeatureIntroSection(props: ApplyTargetFeatureIntroSectionProps) {
  const { title, description, categoryList, checkItems, contents } = props;
  return (
    <Box bg="white" py={{ base: 12, lg: "60px" }} px={{ base: 4, lg: 6 }} id="apply-target-feature-intro">
      <Stack maxW="1200px" mx="auto" gap={10}>
        <Stack gap={{base: '16px', lg: 8}} data-aos="fade-up">
          <Flex gap={4} wrap="wrap" justify={{ base: "center", lg: "flex-start" }}>
            {categoryList.map((item, index) => (
              <Flex key={item} bg={index === 0 ? "#E8F4F5" : "white"} border={index > 0 ? '1px solid #0E9384' : 'none'} borderRadius= {{ base: '30px', lg: "40px" }} px={{ base: '14px', lg: 3 }} py={{ base: '5px', lg: 1.5 }} align="center" justify="center" h={{ base: '28px', lg: '36px'}}>
                <Text color="primary.600" fontWeight="600" fontSize={{ base: '12px', lg: "16px" }} lineHeight={{ base: '18px', lg: "24px" }} >
                  {item}
                </Text>
              </Flex>
            ))}
          </Flex>

          {title}

          <Flex
            justify="space-between"
            align={{ base: "center", lg: "center" }}
            gap={{base: '16px' , lg: 8}}
            direction={{ base: "column", lg: "row" }}
          >
            <Text
              color="gray.800"
              fontWeight="500"
              fontSize={{ base: "16px", lg: "28px" }}
              lineHeight={{ base: "24px", lg: "40px" }}
              whiteSpace="pre-line"
              textAlign={{ base: "center", lg: "left" }}
            >
              {description}
            </Text>

            <Stack gap={1}>
              {checkItems.map((item) => (
                <Flex key={item} gap={{base: 0, lg: 2.5}} align="center">
                  <Text color="gray.500" fontSize={{ base: '14px', lg: '24px' }} lineHeight={{ base: '20px', lg: '34px' }}>
                    ✓
                  </Text>
                  <Text color="gray.500" fontWeight="500" fontSize={{ base: '14px', lg: '24px' }} lineHeight={{ base: '20px', lg: '34px' }}>
                    {item}
                  </Text>
                </Flex>
              ))}
            </Stack>
          </Flex>
        </Stack>

        <Box data-aos="fade-up" data-aos-delay="80">
          {contents}
        </Box>
      </Stack>
    </Box>
  );
}
