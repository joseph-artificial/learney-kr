"use client";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { ReactNode } from "react";

export type SolutionsConcernCard = {
  text: string;
  bg: string;
  borderRadius: string;
  alignSelf?: "flex-start" | "flex-end";
};


const rollDown = keyframes`
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(0);
  }
`;

interface SolutionsNeedsConcernsSectionProps {
  title: ReactNode;
  concerns: SolutionsConcernCard[];
}
export function SolutionsNeedsConcernsSection(props: SolutionsNeedsConcernsSectionProps) {
  const { title, concerns } = props;
  return (
    <Box as="section" bg="white"  px={{ base: 4, lg: 8 }}>
      <Flex
        maxW="1200px"
        mx="auto"
        direction={{ base: "column", xl: "row" }}
        align={{ base: "stretch", xl: "center" }}
        gap={{ base: 10, xl: "60px" }}
        data-aos="fade-up"
      >
        <Box data-aos="fade-right">{title}</Box>
        <Box
          w={{ base: "full", xl: "625px" }}
          h={{ base: "auto", xl: "560px" }}
          overflow={{ base: "visible", xl: "hidden" }}
          data-aos="fade-left"
          data-aos-delay="80"
        >
          <Stack
            gap={'40px'}
            animation={{ base: "none", xl: `${rollDown} 18s linear infinite` }}
          >
            {[...concerns, ...concerns].map((card, idx) => (
              <Flex key={`${card.text}-${idx}`} justify={{ base: "stretch", xl: card.alignSelf === "flex-end" ? "flex-end" : "flex-start" }}>
                <Flex
                  bg={card.bg}
                  borderWidth="1px"
                  borderColor="#EAECF0"
                  borderRadius={card.borderRadius}
                  px={5}
                  py={5}
                  w={{ base: "full", xl: "540px" }}
                  justify="center"
                >
                  <Text color="#475467" fontWeight="500" fontSize={{ base: "22px", lg: "22px" }} lineHeight="30px" textAlign="center" whiteSpace="pre-line">
                    {card.text}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}



