"use client";

import { useEffect, useState } from "react";

// Matches Tailwind's `lg` breakpoint (1024px). Returns `null` on the
// first render so callers can render an SSR-safe fallback until the
// real viewport width is known.
export function useIsLg(): boolean | null {
  const [isLg, setIsLg] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isLg;
}
