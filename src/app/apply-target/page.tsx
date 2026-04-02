import { createPageMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";

export const metadata = createPageMetadata({
  title: "적용 대상",
  description:
    "초등·중고등 선생님, 교육청·학교 관리자를 위한 러니 적용 대상과 사례를 확인하세요. AI 문해력 솔루션.",
  path: "/apply-target",
});

export default function ApplyTargetPage() {
  redirect("/apply-target/elementary");
}
