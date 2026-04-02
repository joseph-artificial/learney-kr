"use client";

import { useEffect, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";

/**
 * 메인(홈)에서만 채널톡 부트.
 * `.env.local` 에 `NEXT_PUBLIC_CHANNEL_PLUGIN_KEY` 설정 필요.
 */
export function HomeChannelTalk() {
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);

  useEffect(() => {
    const pluginKey = process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY;
    if (!pluginKey) return;

    ChannelService.loadScript();
    ChannelService.boot({
      pluginKey,
      language: "ko",
      hideChannelButtonOnBoot: true,
    });
    ChannelService.onShowMessenger(() => setIsMessengerOpen(true));
    ChannelService.onHideMessenger(() => setIsMessengerOpen(false));

    return () => {
      ChannelService.shutdown();
    };
  }, []);

  return (
    <Box
      as="button"
      type="button"
      zIndex={isMessengerOpen ? 99999999 : 1000}
      aria-label={isMessengerOpen ? "채널톡 닫기" : "채널톡 열기"}
      onClick={() => {
        if (isMessengerOpen) {
          ChannelService.hideMessenger();
          return;
        }
        ChannelService.showMessenger();
      }}
      position="fixed"
      right={{ base: "16px", lg: "24px" }}
      bottom={{ base: "16px", lg: "24px" }}
      w="64px"
      h="64px"
      borderRadius="20px"
      bg="white"
      border="1px solid #F2F4F7"
      boxShadow={"0px 10px 24px rgba(23, 23, 25, 0.14)"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
    >
      {isMessengerOpen ? (
        <Box
          as="span"
          color="#171719"
          fontSize="30px"
          lineHeight="1"
          fontWeight="500"
          transform="translateY(-1px)"
        >
          ×
        </Box>
      ) : (
        <Image src="/images/etc/ChannelTalkIcon.png" alt="채널톡" width={33} height={33} />
      )}
    </Box>
  );
}
