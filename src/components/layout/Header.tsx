"use client";

import { ReactNode, useEffect, useState } from "react";
import { Box, Flex, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { MobileMenuOpenButton, MobileNavDrawer } from "./MobileNavDrawer";

interface HeaderProps {
  logo: ReactNode;
  nav: ReactNode;
  cta: ReactNode;
  isHome?: boolean;
}

export function Header({ logo, nav, cta, isHome = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isInMainHeroSection, setIsInMainHeroSection] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const updateSectionState = () => {
      const section = document.getElementById("main-hero-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const headerOffset = 80;
      const isInside = rect.top <= headerOffset && rect.bottom >= headerOffset;
      setIsInMainHeroSection(isInside);
    };

    updateSectionState();
    window.addEventListener("scroll", updateSectionState, { passive: true });
    window.addEventListener("resize", updateSectionState);

    return () => {
      window.removeEventListener("scroll", updateSectionState);
      window.removeEventListener("resize", updateSectionState);
    };
  }, [isHome]);

  const useHeroTransparentHeader = isHome && isInMainHeroSection;

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={useHeroTransparentHeader ? "rgba(255, 255, 255, 0.6)" : "white"}
      borderBottomWidth="1px"
      backdropFilter={useHeroTransparentHeader ? "blur(10px)" : "none"}
      borderColor="#F2F4F7"
      transition="background-color 0.2s ease, border-color 0.2s ease"
    >
      <Flex
        display={{ base: "none", lg: "flex" }}
        maxW="1200px"
        mx="auto"
        px={{ lg: 6 }}
        py={{ lg: "15px" }}
        h={{ lg: "80px" }}
        align="center"
        justify="space-between"
      >
        <HStack gap="10px" alignItems="center" flex={1}>
          {logo}
          <Flex minW="126px" alignItems="center" pt="5px" pl="34px">
            {nav}
          </Flex>
        </HStack>
        <HStack gap={4}>
          <Box display="flex" gap={2}>
            {cta}
          </Box>
        </HStack>
      </Flex>

      <Flex
        display={{ base: "flex", lg: "none" }}
        maxW="1200px"
        mx="auto"
        px="30px"
        h="56px"
        align="center"
        justify="space-between"
        w="full"
      >
        <HStack gap="10px" alignItems="center" flex={1} minW={0}>
          {logo}
        </HStack>
        <HStack spacing={2} alignItems="center" flexShrink={0}>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
            <Box
              as="span"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px="10px"
              py="6px"
              borderRadius="12px"
              borderWidth="1px"
              borderColor="#D0D5DD"
              bg="white"
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              fontWeight="600"
              fontSize="12px"
              lineHeight="18px"
              color="#344054"
              whiteSpace="nowrap"
            >
              무료체험 시작하기
            </Box>
          </Link>
          <MobileMenuOpenButton onOpen={() => setMobileMenuOpen(true)} />
        </HStack>
      </Flex>

      <MobileNavDrawer
        logo={logo}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </Box>
  );
}
