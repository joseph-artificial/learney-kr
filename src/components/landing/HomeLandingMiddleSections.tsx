"use client";

import { useState } from "react";
import { BuiltForTeachersSection } from "@/components/landing/BuiltForTeachersSection";
import { ClassroomChangeSection } from "@/components/landing/ClassroomChangeSection";

/**
 * 메인에서 GSAP 표시 여부를 두 섹션에 공유합니다.
 * 토글이 필요하면 `useState`에 setter를 쓰거나 Context로 올리면 됩니다.
 */
export function HomeLandingMiddleSections() {
  const [isShowGsap, setIsShowGsap] = useState(true);

  return (
    <>
      <BuiltForTeachersSection isShowGsap={isShowGsap} />
      <ClassroomChangeSection isShowGsap={isShowGsap} setIsShowGsap={setIsShowGsap} />
    </>
  );
}
