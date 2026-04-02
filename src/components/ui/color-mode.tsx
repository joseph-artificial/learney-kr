"use client";

import * as React from "react";
import { IconButton, type IconButtonProps } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

type ColorMode = "light" | "dark";

type ColorModeContextValue = {
  colorMode: ColorMode;
  toggleColorMode: () => void;
  setColorMode: (mode: ColorMode) => void;
};

const ColorModeContext = React.createContext<ColorModeContextValue | undefined>(
  undefined,
);

export interface ColorModeProviderProps {
  children: React.ReactNode;
}

export function ColorModeProvider({ children }: ColorModeProviderProps) {
  const [colorMode, setColorModeState] = React.useState<ColorMode>("light");

  // 초기 모드 결정: localStorage -> 시스템 설정
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setColorModeState(stored);
      return;
    }

    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)",
    ).matches;
    setColorModeState(prefersDark ? "dark" : "light");
  }, []);

  // html 클래스 동기화 (._dark 스타일을 위해)
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    if (colorMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    window.localStorage.setItem("theme", colorMode);
  }, [colorMode]);

  const setColorMode = React.useCallback((mode: ColorMode) => {
    setColorModeState(mode);
  }, []);

  const toggleColorMode = React.useCallback(() => {
    setColorModeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = React.useMemo(
    () => ({ colorMode, toggleColorMode, setColorMode }),
    [colorMode, toggleColorMode, setColorMode],
  );

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const ctx = React.useContext(ColorModeContext);
  if (!ctx) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return ctx;
}

export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode();
  return colorMode === "light" ? light : dark;
}

export function ColorModeButton(
  props: Omit<IconButtonProps, "aria-label" | "children">,
) {
  const { colorMode, toggleColorMode } = useColorMode();
  const label =
    colorMode === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <IconButton
      size="sm"
      variant="ghost"
      onClick={toggleColorMode}
      aria-label={label}
      {...props}
    >
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
}

