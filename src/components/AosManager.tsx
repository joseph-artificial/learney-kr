"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";

export function AosManager() {
  const pathname = usePathname();

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

  return null;
}

