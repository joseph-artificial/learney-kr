"use client";

import {
  Box,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { PRICING_QUOTE_FORM_HREF } from "@/config/site";
import { NAV_ITEMS, type NavItem } from "./MainNav";

function sectionKey(item: NavItem): string {
  return item.defaultHref ?? item.href;
}

type MobileNavDrawerProps = {
  logo: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function MobileNavDrawer({ logo, isOpen, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => {
      const first = NAV_ITEMS.find((i) => i.children?.length);
      if (!first) return {};
      return { [sectionKey(first)]: true };
    },
  );

  const pathnameRef = useRef(pathname);
  const closeUnmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [mounted, setMounted] = useState(false);
  const [enter, setEnter] = useState(false);

  const PANEL_MS = 340;

  useEffect(() => {
    let cancelled = false;
    let openRaf1 = 0;

    if (isOpen) {
      if (closeUnmountTimerRef.current) {
        clearTimeout(closeUnmountTimerRef.current);
        closeUnmountTimerRef.current = null;
      }
      openRaf1 = requestAnimationFrame(() => {
        if (cancelled) return;
        setMounted(true);
        requestAnimationFrame(() => {
          if (cancelled) return;
          setEnter(true);
        });
      });
      return () => {
        cancelled = true;
        cancelAnimationFrame(openRaf1);
      };
    }

    const closeRaf = requestAnimationFrame(() => {
      if (cancelled) return;
      setEnter(false);
      closeUnmountTimerRef.current = setTimeout(() => {
        closeUnmountTimerRef.current = null;
        if (cancelled) return;
        setMounted(false);
      }, PANEL_MS);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(closeRaf);
      if (closeUnmountTimerRef.current) {
        clearTimeout(closeUnmountTimerRef.current);
        closeUnmountTimerRef.current = null;
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  useEffect(() => {
    if (!isOpen) {
      pathnameRef.current = pathname;
      return;
    }
    if (pathnameRef.current !== pathname) {
      pathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, isOpen, onClose]);

  if (!mounted) return null;

  const toggleSection = (key: string) => {
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));
  };

  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={1100}
      pointerEvents={enter ? "auto" : "none"}
    >
      <Box
        position="absolute"
        inset={0}
        bg="blackAlpha.500"
        opacity={enter ? 1 : 0}
        transition="opacity 0.28s ease"
        aria-hidden
        onClick={onClose}
      />
      <Box
        position="absolute"
        inset={0}
        bg="white"
        display="flex"
        flexDirection="column"
        boxShadow={enter ? "-8px 0 32px rgba(15, 23, 42, 0.12)" : "none"}
        style={{
          transform: enter ? "translate3d(0,0,0)" : "translate3d(100%,0,0)",
          transition: `transform ${PANEL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          willChange: "transform",
        }}
      >
      <Flex
        h="56px"
        px="30px"
        align="center"
        justify="space-between"
        flexShrink={0}
        borderBottomWidth="1px"
        borderColor="#F2F4F7"
      >
        <Box flex={1} minW={0}>
          {logo}
          </Box>
        <Image src="/images/etc/CloseButtonIcon.svg" alt="logo" w="107.01651000976562px" h="24px" width={'24px'} height={44} onClick={onClose} cursor={'pointer'} />
      </Flex>

      <Box flex={1} overflowY="auto" px="20px" py="10px">
        <Flex direction="column" gap="10px" align="stretch" maxW="100%">
          {NAV_ITEMS.map((item) => {
            const key = sectionKey(item);
            const hasChildren = Boolean(item.children?.length);
            const expanded = Boolean(openSections[key]);

            if (!hasChildren) {
              return (
                <Link key={item.href} href={item.href} onClick={onClose}>
                  <Flex px="10px" py="10px" align="center">
                    <Text
                      fontWeight="600"
                      fontSize="20px"
                      lineHeight="30px"
                      color="#101828"
                    >
                      {item.label}
                    </Text>
                  </Flex>
                </Link>
              );
            }

            return (
              <Box key={key} w="full">
                <Flex
                  as="button"
                  type="button"
                  w="full"
                  align="center"
                  justify="space-between"
                  gap="10px"
                  px="10px"
                  py="10px"
                  bg="transparent"
                  cursor="pointer"
                  onClick={() => toggleSection(key)}
                >
                  <Text
                    fontWeight="600"
                    fontSize="20px"
                    lineHeight="30px"
                    color="#101828"
                    textAlign="left"
                  >
                    {item.label}
                  </Text>
                  {expanded ? (
                    <ChevronUpIcon boxSize="20px" color="gray.600" />
                  ) : (
                    <ChevronDownIcon boxSize="20px" color="gray.600" />
                  )}
                </Flex>

                {expanded && item.children && (
                  <Box
                    bg="#F9FAFB"
                    borderRadius="10px"
                    p="10px"
                    display="flex"
                    flexDirection="column"
                    gap="4px"
                  >
                    {item.children.map((child) => {
                      const label = child.mobileLabel ?? child.label;
                      const isActiveChild =
                        pathname === child.href ||
                        pathname?.startsWith(`${child.href}/`) === true;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                        >
                          <Flex
                            align="center"
                            justify="space-between"
                            px="10px"
                            py="8px"
                            borderRadius="10px"
                            bg={isActiveChild ? "#F2F4F7" : "transparent"}
                            _hover={{ bg: "#F2F4F7" }}
                          >
                            <Text
                              fontWeight="500"
                              fontSize="16px"
                              lineHeight="26px"
                              color="#667085"
                            >
                              {label}
                            </Text>
                            <Image src="/images/etc/ArrowRight.svg" alt="logo" w="20px" h="20px" width={'20px'} height={'20px'} />
                            {/* <ChevronRightIcon boxSize="20px" color="gray.400" /> */}
                          </Flex>
                        </Link>
                      );
                    })}
                  </Box>
                )}
              </Box>
            );
          })}
        </Flex>
      </Box>

      <Box
        flexShrink={0}
        borderTopWidth="1px"
        borderColor="#F2F4F7"
        p="20px"
        display="flex"
        flexDirection="column"
        gap="11px"
      >
        <Link href={PRICING_QUOTE_FORM_HREF} onClick={onClose} style={{ width: "100%" }}>
          <Flex
            as="span"
            w="full"
            justify="center"
            align="center"
            px="14px"
            py="8px"
            borderRadius="12px"
            borderWidth="1px"
            borderColor="#D0D5DD"
            bg="white"
            boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
          >
            <Text fontWeight="600" fontSize="14px" lineHeight="20px" color="#344054">
              견적서 신청하기
            </Text>
          </Flex>
        </Link>
        <Link href="/contact" onClick={onClose} style={{ width: "100%" }}>
          <Flex
            as="span"
            w="full"
            justify="center"
            align="center"
            px="14px"
            py="8px"
            borderRadius="12px"
            borderWidth="1px"
            borderColor="#0E9384"
            bg="#0E9384"
            boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
          >
            <Text fontWeight="600" fontSize="14px" lineHeight="20px" color="white">
              무료체험 시작하기
            </Text>
          </Flex>
        </Link>
      </Box>
      </Box>
    </Box>
  );
}

export function MobileMenuOpenButton({ onOpen }: { onOpen: () => void }) {
  return (
    <IconButton
      aria-label="메뉴 열기"
      icon={<HamburgerIcon boxSize="24px" color="gray.600" />}
      variant="ghost"
      minW="44px"
      h="44px"
      onClick={onOpen}
    />
  );
}
