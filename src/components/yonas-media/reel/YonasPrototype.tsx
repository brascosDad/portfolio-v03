"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { Beat3Panel } from "./Beat3Panel";
import { COLORS, NATIVE_HEIGHT, NATIVE_WIDTH } from "./tokens";

// Case-study page variant: the Beat 3 tool mounted directly in
// interactive mode with no reel intro, no demo, no captions. Users can
// navigate Jan/Feb/Mar 2027, toggle artists in the roster, and watch
// the bookings table react.
export function YonasPrototype() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scalerRef = useRef<HTMLDivElement | null>(null);

  // Scale-to-fit: 1440px native → container width.
  useEffect(() => {
    const frame = containerRef.current;
    const scaler = scalerRef.current;
    if (!frame || !scaler) return;
    const apply = () => {
      const scale = Math.min(1, frame.clientWidth / NATIVE_WIDTH);
      scaler.style.transform = `scale(${scale})`;
      frame.style.height = `${NATIVE_HEIGHT * scale}px`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ background: COLORS.bg }}
    >
      <div
        ref={scalerRef}
        className="origin-top-left"
        style={{ width: NATIVE_WIDTH, height: NATIVE_HEIGHT, position: "relative" }}
      >
        <Beat3Panel reducedMotion={!!reducedMotion} startInteractive />
      </div>
    </div>
  );
}
