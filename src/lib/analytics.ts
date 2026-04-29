// GA4 wrapper. The gtag function is loaded by the next/script tags in
// app/layout.tsx; this module adds typed helpers for our custom events
// plus once-per-load guards for events that should only fire one time.

export const GA4_MEASUREMENT_ID = "G-2NFSBZM3N3";

type GtagCommand = "config" | "event" | "js" | "set" | "consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, ...args: unknown[]) => void;
  }
}

function gtag(command: GtagCommand, ...args: unknown[]): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag(command, ...args);
}

// Map the routing slug ("work/homedepot") to the friendly analytics
// label requested in the spec ("homedepot", "yonas", etc.).
export function caseStudySlugToAnalyticsId(slug: string): string {
  switch (slug) {
    case "work/homedepot":
      return "homedepot";
    case "work/yonas-media":
      return "yonas";
    case "work/akqaqt":
      return "akqa";
    case "work/cdlxqt":
      return "cardlytics";
    case "work/atqt":
      return "autotrader";
    default:
      return slug;
  }
}

export function trackCtaClick(caseStudy: string): void {
  gtag("event", "cta_click", { case_study: caseStudy });
}

const scrollDepthFired = new Set<string>();
export function trackScrollDepth(caseStudy: string, depth: 50 | 90): void {
  const key = `${caseStudy}:${depth}`;
  if (scrollDepthFired.has(key)) return;
  scrollDepthFired.add(key);
  gtag("event", "scroll_depth", { case_study: caseStudy, depth: String(depth) });
}

const prototypeFired = new Set<string>();
export function trackPrototypeInteraction(prototype: string): void {
  if (prototypeFired.has(prototype)) return;
  prototypeFired.add(prototype);
  gtag("event", "prototype_interaction", { prototype });
}
