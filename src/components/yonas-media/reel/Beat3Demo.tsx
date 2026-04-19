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
  onComplete,
}: Beat3DemoProps) {
  const [cursorPos, setCursorPos] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const pulseIdRef = useRef(0);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Convert a target's viewport rect to native scaler coordinates (1440×900 space).
  const resolveNativePoint = (target: DemoTarget): { x: number; y: number } | null => {
    const rect = getTargetRect(target);
    const scalerRect = getScalerRect();
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

  useEffect(() => {
    let cancelled = false;

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

    (async () => {
      if (reducedMotion) {
        // Reduced-motion path: no cursor, state changes only with pulses.
        onAdvanceMonth();
        await wait(TIMING.demo.calendarMonthStepMs);
        if (cancelled) return;
        onAdvanceMonth();
        await wait(TIMING.demo.calendarMonthStepMs);
        if (cancelled) return;
        onSelectDay(1);
        await wait(TIMING.demo.dateClickPauseMs);
        if (cancelled) return;
        for (const id of ["cora", "jonah", "marcel"] as ArtistId[]) {
          if (cancelled) return;
          onToggleArtist(id);
          await wait(TIMING.demo.artistClickIntervalMs);
        }
        await wait(TIMING.demo.threeRowsHoldMs);
        if (cancelled) return;
        onToggleArtist("lila");
        await wait(TIMING.caption.showDelayMs);
        if (cancelled) return;
        onCompleteRef.current();
        return;
      }

      // 1. Fade cursor in near center of main content.
      const scalerRect = getScalerRect();
      if (scalerRect) {
        setCursorPos({ x: 720, y: 450 });
      }
      await wait(200);
      if (cancelled) return;
      setCursorVisible(true);
      await wait(300);

      // 2. Move to next-month arrow, pulse, advance Jan → Feb.
      await moveCursorTo({ type: "nextMonth" }, 0);
      if (cancelled) return;
      onAdvanceMonth();
      await wait(TIMING.demo.calendarMonthStepMs);
      if (cancelled) return;

      // 3. Move to next-month again, advance Feb → Mar.
      await moveCursorTo({ type: "nextMonth" }, 0);
      if (cancelled) return;
      onAdvanceMonth();
      await wait(TIMING.demo.calendarMonthStepMs);
      if (cancelled) return;

      // 4. Move to March 1 cell.
      await moveCursorTo({ type: "day", day: 1 }, 0);
      if (cancelled) return;
      onSelectDay(1);
      await wait(TIMING.demo.dateClickPauseMs);
      if (cancelled) return;

      // 5. Cora → Jonah → Marcel (same-answer beat).
      for (const id of ["cora", "jonah", "marcel"] as ArtistId[]) {
        if (cancelled) return;
        await moveCursorTo({ type: "artist", id }, 0);
        if (cancelled) return;
        onToggleArtist(id);
        await wait(TIMING.demo.artistClickIntervalMs);
      }

      // 6. Hold on the three unavailable rows.
      await wait(TIMING.demo.threeRowsHoldMs);
      if (cancelled) return;

      // 7. Lila Moreno — the open night.
      await moveCursorTo({ type: "artist", id: "lila" }, 0);
      if (cancelled) return;
      onToggleArtist("lila");
      await wait(TIMING.caption.showDelayMs);
      if (cancelled) return;

      // Hide cursor for caption phase.
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
