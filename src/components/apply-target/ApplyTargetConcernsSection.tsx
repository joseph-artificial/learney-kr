"use client";

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const rollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

export type ApplyTargetConcernCard = {
  text: string;
  highlight?: boolean;
  bg: string;
};



function ConcernCardView({ item }: { item: ApplyTargetConcernCard }) {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="#D0D5DD"
      borderRadius="16px"
      minW={{ base: "250px", lg: "540px" }}
      // h={{ base: "180px", lg: "220px" }}
      px={{ base: '8px', lg: "30px" }}
      py={{ base: '13px', lg: "30px" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={{ base: '10px', lg: "20px" }}
    >
      <Flex
        w={{ base: '30px', lg: '56px' }}
        minW={{ base: '30px', lg: '56px' }}
        minH={{ base: '30px', lg: '56px' }}
        h={{ base: '30px', lg: '56px' }}
        borderRadius="50%"
        bg="white"
        align="center"
        justify="center"
        boxShadow="0px 0px 10px 0px rgba(0, 116, 107, 0.10)"
      >
        <Box
          as="img"
          src={item.highlight ? "/images/etc/man.png" : "/images/etc/woman.png"}
          alt=""
          w={{ base: '19px', lg: '35px' }}
          h={{ base: '19px', lg: '35px' }}
          opacity={0.5}
        />
      </Flex>
      <Text
        textAlign="center"
        whiteSpace="pre-line"
        color="#1D2939"
        fontWeight={{ base: 700, lg: 500}}
        fontSize={{ base: "12px", lg: "24px" }}
        lineHeight={{ base: "18px", lg: "36px" }}
      >
        {item.text}
      </Text>
    </Box>
  );
}

interface ApplyTargetConcernsSectionProps {
  description: string;
  /** `lg` 이상에서만 다른 문구(줄바꿈 등). 없으면 모든 구간에서 `description`만 사용 */
  descriptionLg?: string;
  concerns: ApplyTargetConcernCard[];
}
export function ApplyTargetConcernsSection(props: ApplyTargetConcernsSectionProps) {
  const { description, descriptionLg, concerns } = props;
  const rollingItems = [...concerns, ...concerns];

  const titleTextProps = {
    fontFamily: "heading" as const,
    fontWeight: "600" as const,
    fontSize: { base: "24px", lg: "48px" },
    lineHeight: { base: "32px", lg: "60px" },
    color: "#344054",
    whiteSpace: "pre-line" as const,
  };

  return (
    <Box bg="#ffffff" py={{ base: 14, lg: "50px" }} overflow="hidden">
      <Stack maxW="1200px" mx="auto" px={{ base: 4, lg: 6 }} gap={{ base: 8, lg: "60px" }} data-aos="fade-up" textAlign={{ base: "center", lg: "left" }}>
        {descriptionLg != null ? (
          <>
            <Text {...titleTextProps} display={{ base: "block", lg: "none" }}>
              {description}
            </Text>
            <Text {...titleTextProps} display={{ base: "none", lg: "block" }}>
              {descriptionLg}
            </Text>
          </>
        ) : (
          <Text {...titleTextProps}>{description}</Text>
        )}
      </Stack>

      <Box mt={{ base: '40px', lg: '60px' }} w="full" overflow="hidden" data-aos="fade-up" data-aos-delay="80">
        <Box
          display="flex"
          gap={6}
          width="max-content"
          px={{ base: 4, lg: 6 }}
          animation={`${rollLeft} 36s linear infinite`}
        >
          {rollingItems.map((item, idx) => (
            <ConcernCardView key={`${item.text}-${idx}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
