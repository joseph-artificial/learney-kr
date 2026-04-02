"use client";

import { Box, Flex, Heading, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";

export type ApplyTarget = {
  title: string;
  mobileTitle: string;
  link: string;
  href: string;
  top: string;
};

interface ApplyTargetSectionProps {
  targets: ApplyTarget[];
}

const CARD_ICON_IMAGES = [
  "/images/etc/elementary.png",
  "/images/etc/middle-high.png",
  "/images/etc/institution.png",
];

export function ApplyTargetSection({ targets }: ApplyTargetSectionProps) {
  const isLgSize = useBreakpointValue({ base: false, lg: true })
  return (
    <Box as="section" id="apply-target" py={{ base: "48px", lg: "60px" }} px={{ base: '10px', lg: 6 }}>
      <Flex
        maxW="1200px"
        mx="auto"
        justify="center"
        align="center"
        gap={{ base: '10px', lg: 6 }}
        flexWrap="wrap"
      >
        {targets.map((target, index) => {
          const iconSrc = CARD_ICON_IMAGES[index % CARD_ICON_IMAGES.length];

          return (
            <Link key={target.title} href={target.href} style={isLgSize ? { textDecoration: "none" } : { textDecoration: "none", flex: 1 }}>
              <Flex
                bg="#ffffff"
                borderRadius="21px"
                w={{ base: "auto", lg: "288px" }}
                
                h={{base: '136px', lg: '230.25px'}}
                px={{base: '15px', lg: '28.5px'}}
                py={{base: '20px', lg: '30px'}}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="18px"
                boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.08)"
                position="relative"
                _before={{
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  p: "1.5px",
                  borderRadius: "21px",
                  background: "linear-gradient(135deg, #ADF4EA 0%, #D3E2FF 100%)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  pointerEvents: "none",
                }}
                transition="transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease"
                _hover={{
                  bg: "gray.50",
                  transform: "translateY(-2px)",
                  boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.12)",
                }}
              >
                <Flex 
                  bg={'gray.50'}
                  borderRadius="50%"
                  w={{base: '50px', lg: '84px'}}
                  h={{base: '50px', lg: '84px'}}
                  position={'relative'}
                  overflow={'hidden'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Box
                    as="img"
                    src={iconSrc}
                    alt={target.title}
                    objectFit="contain"
                    flexShrink={0}
                    w={{base: '40px', lg: '84px'}}
                    h={{base: '40px', lg: '84px'}}
                    position={'absolute'}
                    top={{base: '50%', lg: target?.top}}
                    left={'50%'}
                    transform={'translate(-50%, -50%)'}
                  />
                </Flex>
                
                <Stack gap="10px" align="center" textAlign="center" whiteSpace="nowrap">
                  <Heading
                    as="h3"
                    fontFamily="heading"
                    fontWeight="600"
                    fontSize={{base: '12px', lg: '20px'}}
                    lineHeight={{base: '18px', lg: '24px'}}
                    color="black"
                  >
                    {isLgSize ? target.title : target.mobileTitle.split('\n').map((line, index) => (
                      <Box key={index}>
                        {line}
                        {index < target.mobileTitle.split('\n').length - 1 && <br />}
                      </Box>
                    ))}
                  </Heading>
                  <Text
                    fontFamily="body"
                    fontWeight="500"
                    fontSize="14px"
                    lineHeight="21px"
                    color="gray.500"
                    display={{base: 'none', lg: 'block'}}
                  >
                    {target.link} {"->"}
                  </Text>
                </Stack>
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
}
