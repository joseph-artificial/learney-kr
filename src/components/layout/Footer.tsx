"use client";

import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export function Footer() {
  return (
    <Box as="footer" bg="gray.700" py={{ base: 12, lg: 16 }} px={{ base: 4, lg: 6 }}>
      <Box maxW="1200px" mx="auto">
        <Box pb={'52px'}>
            <Image src="/images/logo/artificialLogo.svg" alt="logo" w="155px" h="37.35px" />
          </Box>
        <Flex
          gap={{ lg: 12 }}
          flexWrap="wrap"
          justify="space-between"
          mb={10}
          direction={{ base: "column", lg: "row" }}
        >
          
          <Stack gap={4} minW="132px">
            <Stack gap={2}>
              {[
                { label: "인스타그램", href: "https://www.instagram.com/learney.kr", external: true, icon: <Image src="/images/footer/Instagram.svg" alt="instagram" w="16px" h="16px" /> },
                { label: "유튜브", href: "https://www.youtube.com/@artificial_society_", external: true, icon: <Image src="/images/footer/Youtube.svg" alt="youtube" w="16px" h="16px" /> },
                { label: "고객센터", href: "/contact", external: false, icon: <Image src="/images/footer/CustomerCenter.svg" alt="customer center" w="16px" h="16px" /> },
                { label: "회사소개", href: "https://www.artificial.sc", external: true, icon: <Image src="/images/footer/Company.svg" alt="company" w="16px" h="16px" /> },
              ].map(({ label, href, external, icon }) => (
                <Flex key={label} align="center" gap={'10px'} cursor={'pointer'}>
                  {icon}
                  {external ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Text as="span" fontWeight="600" fontSize="18px" color="white" _hover={{ opacity: 0.9 }}>
                        {label}
                      </Text>
                    </a>
                  ) : (
                    <Link href={href}>
                      <Text as="span" fontWeight="600" fontSize="18px" color="white" _hover={{ opacity: 0.9 }}>
                        {label}
                      </Text>
                    </Link>
                  )}
                </Flex>
              ))}
            </Stack>
          </Stack>
          <Stack gap={3} fontFamily="body" fontWeight="400" fontSize="18px" lineHeight="28px" color="white">
            <Text>(주) 아티피셜소사이어티</Text>
            <Text>대표이사 김기영</Text>
            <Text>서울시 중구 동호로 20길 6, 아세아 빌딩 401호</Text>
            <Text>learney@artificial.sc</Text>
          </Stack>
          <Stack gap={8}>
            <Stack gap={2}>
              <Text fontFamily="body" fontWeight="400" fontSize="18px" color="white">
                러니 학생용
              </Text>
              <Flex gap={6} fontWeight="600" fontSize="16px" color="white" flexWrap="wrap">
                <Link href="/terms?product=app&doc=terms"><Text as="span">서비스 이용약관</Text></Link>
                <Link href="/terms?product=app&doc=privacy"><Text as="span">개인정보처리방침</Text></Link>
                <Link href="/terms?product=app&doc=event"><Text as="span">이벤트 및 서비스 안내 수신 동의</Text></Link>
              </Flex>
            </Stack>
            <Stack gap={2}>
              <Text fontFamily="body" fontWeight="400" fontSize="18px" color="white">
                러니 선생님용 LMS
              </Text>
              <Flex gap={6} fontWeight="600" fontSize="16px" color="white">
                <Link href="/terms?product=lms&doc=terms"><Text as="span">서비스 이용약관</Text></Link>
                <Link href="/terms?product=lms&doc=privacy"><Text as="span">개인정보처리방침</Text></Link>
              </Flex>
            </Stack>
          </Stack>
        </Flex>
        <Box pt={6} borderTopWidth="1px" borderColor="gray.600">
          <Text fontFamily="body" fontWeight="400" fontSize="12px" color="gray.400">
            Copyright ⓒ2026 Artificial Society Inc. All rights reserved.
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
