let initialized = false;

export function initAnalytics() {
  if (typeof window === "undefined") return;
  if (initialized) return;
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return;
  initialized = true;
}

export function trackPageView(url: string) {
  if (typeof window === "undefined") return;
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || !(window as any).gtag) return;
  (window as any).gtag("config", id, {
    page_path: url,
  });
}

export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || !(window as any).gtag) return;
  (window as any).gtag("event", action, params ?? {});
}

