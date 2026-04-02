import { createPageMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";

export const metadata = createPageMetadata({
  title: "솔루션",
  description:
    "클래스 관리, 학습 배포 자동화, 주목할 학생 관리, 학습 탐색까지. 러니의 AI 문해력 솔루션을 확인하세요.",
  path: "/solutions",
});

export default function SolutionsPage() {
  redirect("/solutions/class-management");
}
