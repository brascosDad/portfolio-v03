"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ReelPoster } from "./ReelPoster";
import { COLORS, NATIVE_WIDTH, NATIVE_HEIGHT } from "./tokens";

type Phase =
  | "idle"
  | "beat1"
  | "beat2"
  | "transition"
  | "construction"
  | "demo"
  | "caption"
  | "interactive";

type Token = { cancelled: boolean };

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function YonasReel() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scalerRef = useRef<HTMLDivElement | null>(null);

  // Viewport-gated mount of the heavy interior. Poster renders until we're near viewport.
  const [mountInterior, setMountInterior] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");

  const currentTokenRef = useRef<Token | null>(null);

  // IntersectionObserver: mount interior when within ~1.5× viewport, unmount when far.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setMountInterior(true);
        }
      },
      { rootMargin: `${Math.round(vh * 1.5)}px 0px` },
    );
    observer.observe(el);

    // Unmount when we're more than 2× viewport away (scrolled far past).
    const farObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            setMountInterior(false);
          }
        }
      },
      { rootMargin: `${Math.round(vh * 2)}px 0px` },
    );
    farObserver.observe(el);

    return () => {
      observer.disconnect();
      farObserver.disconnect();
    };
  }, []);

  // Scale-to-fit: 1440px native → container width, with container height matching scaled content.
  useEffect(() => {
    if (!mountInterior) return;
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
  }, [mountInterior]);

  // Master orchestrator. Runs when the interior is mounted and visible.
  useEffect(() => {
    if (!mountInterior) {
      currentTokenRef.current && (currentTokenRef.current.cancelled = true);
      setPhase("idle");
      return;
    }

    const token: Token = { cancelled: false };
    currentTokenRef.current && (currentTokenRef.current.cancelled = true);
    currentTokenRef.current = token;

    (async () => {
      // DECISION: scaffold stubs advance through each phase on a fixed timer so the
      // orchestration pipeline can be validated before each beat is implemented.
      // Individual beats replace these awaits with their own async choreography in
      // subsequent commits. Reduced motion is respected with compressed timing.
      const r = reducedMotion;
      setPhase("beat1");
      await wait(r ? 300 : 8000);
      if (token.cancelled) return;
      setPhase("beat2");
      await wait(r ? 300 : 16000);
      if (token.cancelled) return;
      setPhase("transition");
      await wait(r ? 500 : 3500);
      if (token.cancelled) return;
      setPhase("construction");
      await wait(r ? 300 : 2200);
      if (token.cancelled) return;
      setPhase("demo");
      await wait(r ? 300 : 6000);
      if (token.cancelled) return;
      setPhase("caption");
      await wait(400);
      if (token.cancelled) return;
      setPhase("interactive");
    })();

    return () => {
      token.cancelled = true;
    };
  }, [mountInterior, reducedMotion]);

  if (!mountInterior) {
    return (
      <div ref={containerRef} className="relative w-full">
        <ReelPoster />
      </div>
    );
  }

  return (
    <>
      <h2 className="sr-only">
        An animated case-study reel showing a booking inquiry being answered. First an
        email arrives asking about three artists. The old workflow takes 13 minutes
        across three spreadsheets and finds all three unavailable. A new booking tool
        is introduced and answers the same inquiry in seconds, finding a fourth artist
        available.
      </h2>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ background: COLORS.bg }}
      >
        <div
          ref={scalerRef}
          className="origin-top-left"
          style={{
            width: NATIVE_WIDTH,
            height: NATIVE_HEIGHT,
            position: "relative",
          }}
        >
          {/* Phase placeholder — beat components replace this panel-by-panel. */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: COLORS.bg, color: COLORS.onSurface }}
          >
            <div className="text-center">
              <p
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(26, 28, 28, 0.5)",
                }}
              >
                Yonas Media · Hero Reel
              </p>
              <p
                style={{
                  marginTop: 8,
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: 40,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {phaseLabel(phase)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function phaseLabel(phase: Phase) {
  switch (phase) {
    case "beat1": return "Beat 1 · Email";
    case "beat2": return "Beat 2 · Sheets";
    case "transition": return "Transition · Collapse";
    case "construction": return "Beat 3a · Construction";
    case "demo": return "Beat 3b · Demo";
    case "caption": return "Caption";
    case "interactive": return "Beat 3c · Interactive";
    default: return "Loading…";
  }
}
