"use client";

import { AnimatePresence, motion } from "motion/react";
import { FONTS } from "./tokens";

interface ReelHudProps {
  timerMs: number | null;
  toast: string | null;
  showReplay: boolean;
  onReplay: () => void;
}

function formatTimer(ms: number): string {
  const clamped = Math.max(0, Math.min(13 * 60 * 1000, ms));
  const totalSec = Math.floor(clamped / 1000);
  const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
  const ss = String(totalSec % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

// Shared pill treatment. Dark translucent chip so it reads over both the
// white Gmail/Sheets beats and the off-white Atelier beat.
const PILL_BG = "rgba(26, 28, 28, 0.92)";
const PILL_BORDER = "1px solid rgba(255, 255, 255, 0.16)";
const PILL_RADIUS = 8;
const PILL_PADDING = "8px 14px";
const PILL_SHADOW = "0 2px 8px rgba(0,0,0,0.15)";
const PILL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// The hud floats in the bottom-right of the laptop-framed reel
// container. Stack order is column-reverse so the bottom anchor is
// occupied by the timer (during the reel) or the Replay-demo button
// (during interactive handoff) — they're mutually exclusive.
//
// Generous gap keeps the toast and the persistent Replay button reading
// as distinct elements, not one cluster.
export function ReelHud({ timerMs, toast, showReplay, onReplay }: ReelHudProps) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 16,
        right: 16,
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "flex-end",
        gap: 16,
        zIndex: 100,
      }}
    >
      {/* Bottom anchor: timer or Replay button, never both. */}
      <AnimatePresence>
        {timerMs !== null && (
          <motion.div
            key="timer"
            initial={{ x: 28, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 28, opacity: 0 }}
            transition={{ duration: 0.3, ease: PILL_EASE }}
            style={{
              background: PILL_BG,
              border: PILL_BORDER,
              borderRadius: PILL_RADIUS,
              padding: PILL_PADDING,
              color: "#fff",
              fontFamily: FONTS.mono,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.06em",
              fontVariantNumeric: "tabular-nums",
              minWidth: 90,
              textAlign: "center",
              boxShadow: PILL_SHADOW,
              pointerEvents: "none",
            }}
          >
            {formatTimer(timerMs)}
          </motion.div>
        )}
        {timerMs === null && showReplay && (
          <motion.button
            key="replay"
            type="button"
            onClick={onReplay}
            initial={{ x: 28, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 28, opacity: 0 }}
            transition={{ duration: 0.3, ease: PILL_EASE }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: PILL_BG,
              border: PILL_BORDER,
              borderRadius: PILL_RADIUS,
              padding: "8px 14px 8px 12px",
              color: "#fff",
              fontFamily: FONTS.display,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.02em",
              cursor: "pointer",
              boxShadow: PILL_SHADOW,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M2.5 8a5.5 5.5 0 1 1 1.64 3.92"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M2 4.5v3h3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Replay demo
          </motion.button>
        )}
      </AnimatePresence>

      {/* Upper slot: narration toast. */}
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ duration: 0.32, ease: PILL_EASE }}
            style={{
              background: PILL_BG,
              border: PILL_BORDER,
              borderRadius: PILL_RADIUS,
              padding: PILL_PADDING,
              color: "#fff",
              fontFamily: FONTS.display,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "-0.005em",
              lineHeight: 1.3,
              maxWidth: 360,
              boxShadow: PILL_SHADOW,
              pointerEvents: "none",
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
