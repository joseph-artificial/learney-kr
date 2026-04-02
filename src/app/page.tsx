import { Box } from "@chakra-ui/react";
import { HomeChannelTalk } from "@/components/HomeChannelTalk";
import { ApplyTargetSection } from "@/components/landing/ApplyTargetSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HomeLandingMiddleSections } from "@/components/landing/HomeLandingMiddleSections";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { NewsPreviewSection } from "@/components/landing/NewsPreviewSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { LandingIntroOverlay } from "@/components/landing/LandingIntroOverlay";

/** 메인 뉴스 미리보기 등 ISR과 맞춤 (뉴스 목록과 동일 24시간) */
export const revalidate = 86400;

const targets = [
  {
    title: "초등학교 선생님이신가요?",
    mobileTitle: "초등학교\n선생님이신가요?",
    link: "초등 적용사례 바로가기",
    href: "/apply-target/elementary",
    top: "40px",
  },
  {
    title: "중·고등학교 선생님이신가요?",
    mobileTitle: "중·고등학교\n선생님이신가요?",
    link: "중·고등 적용사례 바로가기",
    href: "/apply-target/middle-high",
    top: "45px",
  },
  {
    title: "교육청·학교 관리자이신가요?",
    mobileTitle: "교육청·학교\n관리자이신가요?",
    link: "학교 적용사례 바로가기",
    href: "/apply-target/institution",
    top: "40px",
  },
];



export default function Home() {
  return (
    <Box overflowX="hidden">
      <LandingIntroOverlay />
      <HomeChannelTalk />
      <HeroSection />
      <ApplyTargetSection targets={targets} />
      <FeaturesSection />
      <HomeLandingMiddleSections />
      <TestimonialsSection />
      <NewsPreviewSection />
      <PricingSection />
    </Box>
  );
}
