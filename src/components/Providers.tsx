"use client";

import * as React from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider as EmotionCacheProvider } from "@emotion/react";
import { useEmotionCache } from "@chakra-ui/next-js/use-emotion-cache";
import theme from "@/theme";
import { Layout } from "@/components/layout/Layout";
import { ColorModeProvider } from "@/components/ui/color-mode";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const pathname = usePathname();
  const clientEmotionCache = useEmotionCache();

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
    const initRefreshId = window.setTimeout(() => {
      AOS.refreshHard();
    }, 120);
    return () => {
      window.clearTimeout(initRefreshId);
    };
  }, []);

  useEffect(() => {
    const refreshId = window.setTimeout(() => {
      AOS.refreshHard();
    }, 80);
    return () => {
      window.clearTimeout(refreshId);
    };
  }, [pathname]);

  return (
    <EmotionCacheProvider value={clientEmotionCache}>
      <ChakraProvider theme={theme}>
        <ColorModeProvider>
          <Layout>{children}</Layout>
        </ColorModeProvider>
      </ChakraProvider>
    </EmotionCacheProvider>
  );
}

