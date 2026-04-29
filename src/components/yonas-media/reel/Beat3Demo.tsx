"use client";

import { useEffect, useRef, useState } from "react";
import { FauxCursor } from "./FauxCursor";
import { ArtistId } from "./data";
import { TIMING, NATIVE_WIDTH } from "./tokens";

export type DemoTarget =
  | { type: "prevMonth" }
  | { type: "nextMonth" }
  | { type: "day"; day: number }
  | { type: "artist"; id: ArtistId };

interface Beat3DemoProps {
  reducedMotion: boolean;
  getTargetRect: (target: DemoTarget) => DOMRect | null;
  getScalerRect: () => DOMRect | null;
  onAdvanceMonth: () => void;
  onSelectDay: (day: number) => void;
  onToggleArtist: (id: ArtistId) => void;
  onAnnotationChange?: (text: string) => void;
  onComplete: () => void;
}

interface Pulse {
  id: number;
  x: number;
  y: number;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function Beat3Demo({
  reducedMotion,
  getTargetRect,
  getScalerRect,
  onAdvanceMonth,
  onSelectDay,
  onToggleArtist,
  onAnnotationChange,
  onComplete,
}: Beat3DemoProps) {
  const [cursorPos, setCursorPos] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const pulseIdRef = useRef(0);

  // All callback props are threaded through refs so the demo-orchestration
  // effect can be a one-shot (empty deps, cancels on unmount). Stale
  // closures can't bite us because we always read `*.current` at call time.
  const onCompleteRef = useRef(onComplete);
  const onAnnotationRef = useRef(onAnnotationChange);
  const getTargetRectRef = useRef(getTargetRect);
  const getScalerRectRef = useRef(getScalerRect);
  const onAdvanceMonthRef = useRef(onAdvanceMonth);
  const onSelectDayRef = useRef(onSelectDay);
  const onToggleArtistRef = useRef(onToggleArtist);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  useEffect(() => {
    onAnnotationRef.current = onAnnotationChange;
  }, [onAnnotationChange]);
  useEffect(() => {
    getTargetRectRef.current = getTargetRect;
  }, [getTargetRect]);
  useEffect(() => {
    getScalerRectRef.current = getScalerRect;
  }, [getScalerRect]);
  useEffect(() => {
    onAdvanceMonthRef.current = onAdvanceMonth;
  }, [onAdvanceMonth]);
  useEffect(() => {
    onSelectDayRef.current = onSelectDay;
  }, [onSelectDay]);
  useEffect(() => {
    onToggleArtistRef.current = onToggleArtist;
  }, [onToggleArtist]);

  useEffect(() => {
    let cancelled = false;

    const resolveNativePoint = (target: DemoTarget): { x: number; y: number } | null => {
      const rect = getTargetRectRef.current(target);
      const scalerRect = getScalerRectRef.current();
      if (!rect || !scalerRect || scalerRect.width === 0) return null;
      const scale = scalerRect.width / NATIVE_WIDTH;
      const cx = (rect.left + rect.width / 2 - scalerRect.left) / scale;
      const cy = (rect.top + rect.height / 2 - scalerRect.top) / scale;
      return { x: cx, y: cy };
    };

    const firePulse = (x: number, y: number) => {
      const id = ++pulseIdRef.current;
      setPulses((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setPulses((prev) => prev.filter((p) => p.id !== id));
      }, TIMING.demo.pulseDurationMs);
    };

    const moveCursorTo = async (target: DemoTarget, dwellMs: number) => {
      const pt = resolveNativePoint(target);
      if (!pt) return null;
      setCursorPos(pt);
      await wait(TIMING.demo.cursorMoveMs);
      if (cancelled) return null;
      firePulse(pt.x, pt.y);
      await wait(dwellMs);
      return pt;
    };

    const setAnnotation = (text: string) => {
      onAnnotationRef.current?.(text);
    };

    (async () => {
      if (reducedMotion) {
        // Reduced-motion path: no cursor, state changes only with pulses.
        setAnnotation("Pick the date");
        onAdvanceMonthRef.current();
        await wait(TIMING.demo.calendarMonthStepMs);
        if (cancelled) return;
        onAdvanceMonthRef.current();
        await wait(TIMING.demo.calendarMonthStepMs);
        if (cancelled) return;
        onSelectDayRef.current(1);
        await wait(TIMING.demo.dateClickPauseMs);
        if (cancelled) return;
        setAnnotation("Scan the roster");
        for (const id of ["cora", "jonah", "marcel"] as ArtistId[]) {
          if (cancelled) return;
          onToggleArtistRef.current(id);
          await wait(TIMING.demo.artistClickIntervalMs);
        }
        await wait(TIMING.demo.threeRowsHoldMs);
        if (cancelled) return;
        setAnnotation("Who's free?");
        onToggleArtistRef.current("lila");
        await wait(TIMING.caption.showDelayMs);
        if (cancelled) return;
        onCompleteRef.current();
        return;
      }

      // 1. Fade cursor in near center of main content.
      const scalerRect = getScalerRectRef.current();
      if (scalerRect) {
        setCursorPos({ x: 720, y: 450 });
      }
      await wait(200);
      if (cancelled) return;
      setCursorVisible(true);
      await wait(300);

      // 2. Annotation: Pick the date. Cursor heads to the next-month arrow.
      setAnnotation("Pick the date");
      await moveCursorTo({ type: "nextMonth" }, 0);
      if (cancelled) return;
      onAdvanceMonthRef.current();
      await wait(TIMING.demo.calendarMonthStepMs);
      if (cancelled) return;

      // 3. Next-month arrow again, Feb → Mar.
      await moveCursorTo({ type: "nextMonth" }, 0);
      if (cancelled) return;
      onAdvanceMonthRef.current();
      await wait(TIMING.demo.calendarMonthStepMs);
      if (cancelled) return;

      // 4. Click March 1.
      await moveCursorTo({ type: "day", day: 1 }, 0);
      if (cancelled) return;
      onSelectDayRef.current(1);
      await wait(TIMING.demo.dateClickPauseMs);
      if (cancelled) return;

      // 5. Annotation: Scan the roster. Cora → Jonah → Marcel.
      setAnnotation("Scan the roster");
      for (const id of ["cora", "jonah", "marcel"] as ArtistId[]) {
        if (cancelled) return;
        await moveCursorTo({ type: "artist", id }, 0);
        if (cancelled) return;
        onToggleArtistRef.current(id);
        await wait(TIMING.demo.artistClickIntervalMs);
      }

      // 6. Hold on the three booked/hold rows.
      await wait(TIMING.demo.threeRowsHoldMs);
      if (cancelled) return;

      // 7. Annotation: Who's free? Then reveal Lila Moreno as the open night.
      setAnnotation("Who's free?");
      await moveCursorTo({ type: "artist", id: "lila" }, 0);
      if (cancelled) return;
      onToggleArtistRef.current("lila");
      await wait(TIMING.caption.showDelayMs);
      if (cancelled) return;

      // Hide cursor for the caption/your-turn phases.
      setCursorVisible(false);
      await wait(300);
      if (cancelled) return;
      onCompleteRef.current();
    })();

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20 }}>
      <FauxCursor x={cursorPos.x} y={cursorPos.y} visible={cursorVisible} />
      {pulses.map((p) => (
        <span
          key={p.id}
          aria-hidden
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(252, 212, 0, 0.45)",
            transform: "translate(-50%, -50%) scale(0)",
            animation: `yonasPulseFire ${TIMING.demo.pulseDurationMs}ms ease-out forwards`,
            pointerEvents: "none",
          }}
        />
      ))}
      <style>{`
        @keyframes yonasPulseFire {
          0%   { transform: translate(-50%, -50%) scale(0);   opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(${TIMING.demo.pulseScale}); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
