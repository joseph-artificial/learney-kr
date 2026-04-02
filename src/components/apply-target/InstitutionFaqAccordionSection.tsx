"use client";

import { useState } from "react";
import { Box, Collapse, Flex, Stack, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import type { CachedFaqItem } from "@/lib/faq-local";

type InstitutionFaqAccordionSectionProps = {
  faqs: CachedFaqItem[];
};

export function InstitutionFaqAccordionSection({ faqs }: InstitutionFaqAccordionSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Box as="section" bg="white" py={{ base: 16, lg: "120px" }} px={{ base: 4, lg: 8 }}>
      <Stack maxW="1200px" mx="auto" align="center" gap={{ base: 10, lg: "60px" }}>
        <Text
          color="#101828"
          fontWeight="600"
          fontSize={{ base: "34px", lg: "48px" }}
          lineHeight={{ base: "44px", lg: "60px" }}
          textAlign="center"
          data-aos="fade-up"
        >
          도입 전, 자주 묻는 질문
        </Text>

        <Stack w="full" bg="white" align="stretch" spacing={0} data-aos="fade-up" data-aos-delay="60">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <Box key={item.id} borderBottom="1px solid" borderColor="#EAECF0" w="full">
                <Box py="10px">
                  <Flex
                    as="button"
                    type="button"
                    w="full"
                    align="center"
                    justify="space-between"
                    gap={4}
                    px="10px"
                    py={1}
                    textAlign="left"
                    bg="transparent"
                    cursor="pointer"
                    onClick={() => handleToggle(item.id)}
                    aria-expanded={isOpen}
                    _hover={{ opacity: 0.92 }}
                  >
                    <Text
                      fontWeight="600"
                      fontSize="20px"
                      lineHeight="30px"
                      color={isOpen ? "#0C111D" : "#475467"}
                      flex={1}
                      minW={0}
                    >
                      Q. {item.question}
                    </Text>
                    <Flex
                      align="center"
                      justify="center"
                      p={4}
                      borderRadius="12px"
                      flexShrink={0}
                      aria-hidden
                    >
                      <ChevronDownIcon
                        boxSize={6}
                        color="#475467"
                        transition="transform 0.2s ease"
                        transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                      />
                    </Flex>
                  </Flex>

                  <Collapse in={isOpen} animateOpacity>
                    <Box px="10px" pt={2} pb={5}>
                      <Text color="#475467" fontSize="16px" lineHeight="24px" whiteSpace="pre-wrap">
                        {item.answer}
                      </Text>
                    </Box>
                  </Collapse>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
}
