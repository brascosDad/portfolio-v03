"use client";

import { useEffect, useRef, useState } from "react";
import { COLORS, FONTS, TIMING } from "./tokens";
import {
  SheetsTopBar,
  SheetsMenuBar,
  SheetsToolbar,
  ColumnHeaders,
  SheetTabStrip,
} from "./Beat2OldWay";

interface TransitionProps {
  reducedMotion: boolean;
  onComplete: () => void;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

const ROW_HEIGHT = 28;
const VISIBLE_ROWS = 15;
const FOCAL_ROW_INDEX = 7; // middle row holds the Mar 1 verdict

// Fall order: focal first, then alternate outward.
function computeFallOrder(n: number, focalIdx: number): { idx: number; delayMs: number }[] {
  const order: number[] = [];
  order.push(focalIdx);
  for (let step = 1; step < n; step++) {
    if (focalIdx - step >= 0) order.push(focalIdx - step);
    if (focalIdx + step < n) order.push(focalIdx + step);
  }
  return order.map((idx, i) => ({ idx, delayMs: i * TIMING.transition.rowCascadeStagger }));
}

const FAKE_ROWS: { dateLabel: string; venue: string; status: string; isFocal: boolean }[] = Array.from(
  { length: VISIBLE_ROWS },
  (_, i) => {
    const focal = i === FOCAL_ROW_INDEX;
    if (focal) {
      return { dateLabel: "3/1/26", venue: "Fox Theatre", status: "HOLD", isFocal: true };
    }
    const seed = (i * 13) % 4;
    if (seed === 0) return { dateLabel: dateFor(i), venue: "Orpheum", status: "CONFIRMED", isFocal: false };
    if (seed === 1) return { dateLabel: dateFor(i), venue: "", status: "HOLD", isFocal: false };
    if (seed === 2) return { dateLabel: dateFor(i), venue: "Mercury Lounge", status: "OFFER", isFocal: false };
    return { dateLabel: dateFor(i), venue: "", status: "", isFocal: false };
  },
);

function dateFor(i: number): string {
  const offsetFromFocal = i - FOCAL_ROW_INDEX;
  const mar1 = 60; // Jan (31) + Feb (28) + 1
  const absolute = mar1 + offsetFromFocal;
  const monthIdx = absolute <= 31 ? 0 : absolute <= 59 ? 1 : 2;
  const day = absolute - (monthIdx === 0 ? 0 : monthIdx === 1 ? 31 : 59);
  return `${monthIdx + 1}/${day}/26`;
}

export function TransitionCollapse({ reducedMotion, onComplete }: TransitionProps) {
  // Timer phases: starts in corner, pulses to center, holds, falls.
  const [timerPhase, setTimerPhase] = useState<"corner" | "center" | "falling" | "gone">("corner");
  const [rowsFalling, setRowsFalling] = useState(false);
  const [chromeFalling, setChromeFalling] = useState(false);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;
    const fallOrder = computeFallOrder(VISIBLE_ROWS, FOCAL_ROW_INDEX);
    const lastFallDelay = fallOrder[fallOrder.length - 1].delayMs;

    (async () => {
      if (reducedMotion) {
        await wait(500);
        if (cancelled) return;
        onCompleteRef.current();
        return;
      }

      // 1. Timer scales up to viewport center with spring overshoot.
      setTimerPhase("center");
      await wait(TIMING.transition.timerPulseInMs);
      if (cancelled) return;

      // 2. Hold at center.
      await wait(TIMING.transition.timerHoldMs);
      if (cancelled) return;

      // 3. Timer falls; rows cascade starting just before timer clears.
      setTimerPhase("falling");
      setTimeout(() => {
        if (!cancelled) setRowsFalling(true);
      }, Math.max(0, TIMING.transition.timerFallMs - TIMING.transition.timerFallAndRowsOverlap));

      // 4. Chrome (tab strip + column header) falls before the last row lands.
      const lastRowLandTime =
        Math.max(0, TIMING.transition.timerFallMs - TIMING.transition.timerFallAndRowsOverlap) +
        lastFallDelay +
        TIMING.transition.rowFallMs;
      setTimeout(() => {
        if (!cancelled) setChromeFalling(true);
      }, lastRowLandTime + TIMING.transition.tabStripFallLead);

      await wait(lastRowLandTime + 200);
      if (cancelled) return;
      setTimerPhase("gone");
      await wait(200);
      if (cancelled) return;
      onCompleteRef.current();
    })();

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  const fallOrder = computeFallOrder(VISIBLE_ROWS, FOCAL_ROW_INDEX);
  const rowDelayByIdx = new Map(fallOrder.map((o) => [o.idx, o.delayMs]));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.sheetsBg,
        fontFamily: FONTS.google,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Static sheet chrome snapshot. Falls away near the end. */}
      <div
        style={{
          transition: chromeFalling
            ? `transform ${TIMING.transition.rowFallMs}ms ${TIMING.transition.rowFallEase}, opacity ${TIMING.transition.rowFallMs}ms ease`
            : "transform 0s",
          transform: chromeFalling ? "translateY(900px) rotate(2deg)" : "translateY(0)",
          opacity: chromeFalling ? 0 : 1,
        }}
      >
        <SheetsTopBar />
        <SheetsMenuBar />
        <SheetsToolbar />
        <ColumnHeaders />
      </div>

      {/* Rows — cascade outward from focal on the fall. */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {FAKE_ROWS.map((row, i) => {
          const delay = rowDelayByIdx.get(i) ?? 0;
          const rotation = ((i % 2 === 0 ? -1 : 1) * (2 + (i % 3))) / 1;
          const falling = rowsFalling;
          return (
            <div
              key={i}
              style={{
                height: ROW_HEIGHT,
                display: "grid",
                gridTemplateColumns: "54px 140px 1fr 180px 90px",
                fontSize: 12,
                color: COLORS.gmailTextPrimary,
                background: i % 2 === 0 ? COLORS.sheetsBg : "#fbfbfb",
                borderBottom: `1px solid ${COLORS.sheetsGridLine}`,
                transition: falling
                  ? `transform ${TIMING.transition.rowFallMs}ms ${TIMING.transition.rowFallEase} ${delay}ms, opacity ${TIMING.transition.rowFallMs}ms ease ${delay}ms`
                  : "transform 0s",
                transform: falling
                  ? `translateY(900px) rotate(${rotation}deg)`
                  : "translateY(0)",
                opacity: falling ? 0 : 1,
                willChange: "transform, opacity",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.sheetsColumnHeaderFg, borderRight: `1px solid ${COLORS.sheetsGridLine}` }}>
                {i + 1}
              </span>
              <span style={{ display: "flex", alignItems: "center", padding: "0 10px", borderRight: `1px solid ${COLORS.sheetsGridLine}` }}>
                {row.dateLabel}
              </span>
              <span style={{ display: "flex", alignItems: "center", padding: "0 10px", borderRight: `1px solid ${COLORS.sheetsGridLine}` }}>
                {row.venue}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 10px",
                  borderRight: `1px solid ${COLORS.sheetsGridLine}`,
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  color: row.status === "HOLD" ? "#b5830c" : row.status === "CONFIRMED" ? "#087f5b" : row.status === "OFFER" ? "#1864ab" : COLORS.gmailTextSecondary,
                }}
              >
                {row.status}
              </span>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {row.isFocal && (
                  <span
                    aria-hidden
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.9)",
                      border: "1.5px solid #d48a00",
                    }}
                  >
                    <svg width="10" height="10" viewBox="-5 -5 10 10" aria-hidden>
                      <line x1="-3" y1="0" x2="3" y2="0" stroke="#d48a00" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* Tab strip — falls with chrome. */}
      <div
        style={{
          transition: chromeFalling
            ? `transform ${TIMING.transition.rowFallMs}ms ${TIMING.transition.rowFallEase}, opacity ${TIMING.transition.rowFallMs}ms ease`
            : "transform 0s",
          transform: chromeFalling ? "translateY(900px) rotate(-2deg)" : "translateY(0)",
          opacity: chromeFalling ? 0 : 1,
        }}
      >
        <SheetTabStrip activeTabIdx={2} />
      </div>

      {/* Timer — starts in corner, flies to center, pulses, falls. */}
      <FlyingTimer phase={timerPhase} />
    </div>
  );
}

function FlyingTimer({
  phase,
}: {
  phase: "corner" | "center" | "falling" | "gone";
}) {
  const base: React.CSSProperties = {
    position: "absolute",
    padding: "8px 14px",
    background: "rgba(26,28,28,0.9)",
    color: "#fff",
    fontFamily: FONTS.mono,
    fontWeight: 700,
    letterSpacing: "0.04em",
    borderRadius: 6,
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
  };

  if (phase === "gone") return null;

  if (phase === "corner") {
    return <div style={{ ...base, bottom: 56, right: 28, fontSize: 14 }}>13:00</div>;
  }

  if (phase === "center") {
    return (
      <div
        style={{
          ...base,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1)",
          fontSize: 140,
          padding: "24px 44px",
          transition: `transform ${TIMING.transition.timerPulseInMs}ms ${TIMING.transition.timerPulseEase}, font-size ${TIMING.transition.timerPulseInMs}ms ease`,
          animation: `yonasTimerPulse ${TIMING.transition.timerPulseInMs}ms ${TIMING.transition.timerPulseEase} both`,
        }}
      >
        13:00
        <style>{`
          @keyframes yonasTimerPulse {
            0%   { transform: translate(-50%, -50%) scale(0.6); opacity: 0; }
            40%  { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1);    opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // phase === "falling"
  return (
    <div
      style={{
        ...base,
        top: "50%",
        left: "50%",
        fontSize: 140,
        padding: "24px 44px",
        transform: `translate(-50%, 900px) scale(0.9) rotate(-3deg)`,
        opacity: 0,
        transition: `transform ${TIMING.transition.timerFallMs}ms ${TIMING.transition.timerFallEase}, opacity ${TIMING.transition.timerFallMs}ms ease`,
      }}
    >
      13:00
    </div>
  );
}
