import { ReactNode } from "react";
import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import { PRICING_QUOTE_FORM_HREF } from "@/config/site";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MainNav } from "./MainNav";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  return (
    <Box className="app-layout-root">
      <Header
        isHome={isHome}
        logo={
          <Link href="/">
            <Image src="/images/logo/logo.svg" alt="logo" w="107.01651000976562px" h="29px" />
          </Link>
        }
        nav={<MainNav isHome={isHome} />}
        cta={
          <>
            <Link href={PRICING_QUOTE_FORM_HREF}>
              <Box
                as="span"
                display="inline-block"
                px={4}
                py={2}
                borderRadius="12px"
                fontWeight="600"
                fontSize="14px"
                bg="white"
                color="gray.700"
                borderWidth="1px"
                borderColor="gray.300"
                _hover={{ bg: "gray.50" }}
              >
                견적서 신청하기
              </Box>
            </Link>
            <Link href="/contact">
              <Box
                as="span"
                display="inline-block"
                px={4}
                py={2}
                borderRadius="12px"
                fontWeight="600"
                fontSize="14px"
                bg="brand.600"
                color="white"
                _hover={{ bg: "brand.700" }}
              >
                무료체험 신청하기
              </Box>
            </Link>
          </>
        }
      />
      <main
        className={
          isHome ? "app-layout-main app-layout-main--home" : "app-layout-main"
        }
      >
        {children}
      </main>
      <Footer />
    </Box>
  );
}

