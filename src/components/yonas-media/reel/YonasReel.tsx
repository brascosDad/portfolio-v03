"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Beat1Email } from "./Beat1Email";
import { Beat2OldWay } from "./Beat2OldWay";
import { TransitionCollapse } from "./TransitionCollapse";
import { Beat3Panel } from "./Beat3Panel";
import { COLORS, NATIVE_HEIGHT, NATIVE_WIDTH } from "./tokens";

type Phase = "beat1" | "beat2" | "transition" | "beat3";

type Token = { cancelled: boolean };

export function YonasReel() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scalerRef = useRef<HTMLDivElement | null>(null);

  const [phase, setPhase] = useState<Phase>("beat1");
  const [replayCount, setReplayCount] = useState(0);
  const hasPlayedOnceRef = useRef(false);

  const currentTokenRef = useRef<Token | null>(null);

  const beatDoneRef = useRef<(() => void) | null>(null);
  const awaitBeat = useCallback(
    () =>
      new Promise<void>((resolve) => {
        beatDoneRef.current = resolve;
      }),
    [],
  );
  const handleBeatComplete = useCallback(() => {
    const resolver = beatDoneRef.current;
    beatDoneRef.current = null;
    resolver?.();
  }, []);

  const handleReplay = useCallback(() => {
    setReplayCount((n) => n + 1);
  }, []);

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

  // Orchestrator. Runs on mount and on each replay. Cancels on unmount.
  useEffect(() => {
    const token: Token = { cancelled: false };
    if (currentTokenRef.current) currentTokenRef.current.cancelled = true;
    currentTokenRef.current = token;

    (async () => {
      setPhase("beat1");
      await awaitBeat();
      if (token.cancelled) return;

      setPhase("beat2");
      await awaitBeat();
      if (token.cancelled) return;

      setPhase("transition");
      await awaitBeat();
      if (token.cancelled) return;

      setPhase("beat3");
      // Beat 3 runs autonomously; orchestrator ends here.
    })();

    return () => {
      token.cancelled = true;
      beatDoneRef.current = null;
    };
  }, [replayCount, awaitBeat]);

  // Viewport-based replay: when the reel re-enters the viewport after leaving, replay from the top.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (hasPlayedOnceRef.current) {
              setReplayCount((n) => n + 1);
            }
            hasPlayedOnceRef.current = true;
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
          style={{ width: NATIVE_WIDTH, height: NATIVE_HEIGHT, position: "relative" }}
        >
          {phase === "beat1" && (
            <Beat1Email reducedMotion={!!reducedMotion} onComplete={handleBeatComplete} />
          )}
          {phase === "beat2" && (
            <Beat2OldWay reducedMotion={!!reducedMotion} onComplete={handleBeatComplete} />
          )}
          {phase === "transition" && (
            <TransitionCollapse reducedMotion={!!reducedMotion} onComplete={handleBeatComplete} />
          )}
          {phase === "beat3" && (
            <Beat3Panel reducedMotion={!!reducedMotion} onReplay={handleReplay} />
          )}
        </div>
      </div>
    </>
  );
}
