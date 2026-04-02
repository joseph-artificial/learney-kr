"use client";

import { HStack, Text, Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";

export type NavChild = { href: string; label: string; mobileLabel?: string };
export type NavItem = {
  href: string;
  label: string;
  children?: NavChild[];
  defaultHref?: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/apply-target/elementary",
    defaultHref: "/apply-target",
    label: "적용 대상",
    children: [
      { href: "/apply-target/elementary", label: "초등", mobileLabel: "초등학교" },
      { href: "/apply-target/middle-high", label: "중/고등", mobileLabel: "중·고등학교" },
      { href: "/apply-target/institution", label: "교육청·학교" },
    ],
  },
  // {
  //   href: "/features/lms",
  //   label: "주요 기능",
  //   children: [
  //     { href: "/features/lms", label: "선생님용 LMS" },
  //     { href: "/features/app", label: "학생용 APP" },
  //   ],
  // },
  {
    href: "/solutions/class-management",
    defaultHref: "/solutions",
    label: "솔루션",
    children: [
      { href: "/solutions/class-management", label: "간편한 클래스 관리" },
      { href: "/solutions/learning-content", label: "효과적인 학습 콘텐츠" },
      { href: "/solutions/operation-system", label: "유연한 운영 방식" },
    ],
  },
  { href: "/pricing", label: "요금 안내" },
  { href: "/news", label: "러니 뉴스" },
  { href: "/faq", label: "자주 묻는 질문" },
];

export function MainNav({ isHome = false }: { isHome?: boolean }) {
  const [openHref, setOpenHref] = useState<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const pathname = usePathname();

  const cancelClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenHref(null);
      closeTimerRef.current = null;
    }, 200);
  };

  const openFor = (href: string) => {
    cancelClose();
    setOpenHref(href);
  };


  return (
    <HStack as="nav" gap="10px" fontSize="sm">
      {NAV_ITEMS.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const isOpen = hasChildren && openHref === item.href;
        const isActive = pathname === item.defaultHref || pathname?.startsWith(`${item.defaultHref}/`) === true;
        const buttonLabelColor = isOpen || isActive ? "primary.700" : "gray.600";
        
        return (
          <Box
            key={item.href}
            position="relative"
            role="group"
            onMouseEnter={() => {
              if (hasChildren) openFor(item.href);
            }}
            onMouseLeave={() => {
              if (hasChildren) scheduleClose();
            }}
          >
            <Link href={item.href} onClick={() => hasChildren && scheduleClose()}>
              <Flex
                as="span"
                alignItems="center"
                justifyContent="center"
                px="20px"
                py="12px"
                borderRadius="12px"
                gap="8px"
                _hover={{ bg: "gray.50" }}
              >
                <Text
                  as="span"
                  color={hasChildren ? buttonLabelColor : "gray.600"}
                  _groupHover={{ color: "primary.700" }}
                  fontWeight="600"
                  fontSize="16px"
                  lineHeight="24px"
                >
                  {item.label}
                </Text>
                {hasChildren && (
                  <ChevronDownIcon boxSize="18px" color={buttonLabelColor} />
                )}
              </Flex>
            </Link>

            {hasChildren && isOpen && (
              <Box
                position="absolute"
                top="calc(100% + 14px)"
                left="0"
                minW="240px"
                bg="#ffffff"
                borderBottomWidth="1px"
                borderBottomColor="gray.200"
                borderRadius="12px"
                zIndex={40}
                py="4px"
                boxShadow="0 8px 24px rgba(15, 23, 42, 0.12)"
                onMouseEnter={() => cancelClose()}
                onMouseLeave={() => scheduleClose()}
              >
                <Box>
                  {item.children?.map((child) => {
                    const isActiveChild =
                      pathname === child.href ||
                      pathname?.startsWith(`${child.href}/`) === true;

                    return (
                    <Box key={child.href} px="6px" py="2px" w="full">
                      <Link
                        href={child.href}
                        onClick={() => {
                          cancelClose();
                          setOpenHref(null);
                        }}
                      >
                        <Box
                          px="10px"
                          py="9px"
                          borderRadius="6px"
                          bg={isActiveChild ? "gray.50" : "transparent"}
                          _hover={{ bg: "gray.50" }}
                          cursor={'pointer'}
                        >
                          <Text
                            fontSize="14px"
                            fontWeight="500"
                            color="gray.700"
                            lineHeight="20px"
                          >
                            {child.label}
                          </Text>
                        </Box>
                      </Link>
                    </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Box>
        );
      })}
    </HStack>
  );
}

