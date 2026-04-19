"use client";

import { useEffect, useState } from "react";
import { COLORS, FONTS, TIMING } from "./tokens";

interface ReelCaptionProps {
  reducedMotion: boolean;
  fading: boolean;
  onDismiss: () => void;
}

export function ReelCaption({ reducedMotion, fading, onDismiss }: ReelCaptionProps) {
  const [step, setStep] = useState(reducedMotion ? 5 : 0);

  useEffect(() => {
    if (reducedMotion) return;
    const stagger = TIMING.caption.piecewiseStaggerMs;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= 5; i++) {
      timers.push(setTimeout(() => setStep(i), i * stagger));
    }
    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [reducedMotion]);

  const lineStyle = (visible: boolean): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 300ms ease, transform 300ms ease",
  });

  return (
    <div
      onClick={onDismiss}
      role="presentation"
      style={{
        position: "absolute",
        bottom: 28,
        right: 28,
        width: 340,
        background: COLORS.surfaceLowest,
        border: `4px solid rgba(208, 198, 171, 0.5)`,
        padding: "18px 20px",
        fontFamily: FONTS.display,
        color: COLORS.onSurface,
        zIndex: 25,
        pointerEvents: "auto",
        cursor: "pointer",
        opacity: fading ? 0 : 1,
        transition: `opacity ${TIMING.caption.fadeOutMs}ms ease`,
      }}
    >
      {/* Eyebrow */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, ...lineStyle(step >= 1) }}>
        <span
          aria-hidden
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: COLORS.confirmed,
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: COLORS.onSurfaceVariant,
          }}
        >
          The New Way
        </span>
      </div>

      {/* Line 1 */}
      <p
        style={{
          margin: "12px 0 0 0",
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          ...lineStyle(step >= 2),
        }}
      >
        Dana has her answer.
      </p>

      {/* Line 2 */}
      <p style={{ margin: "6px 0 0 0", fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em", ...lineStyle(step >= 3) }}>
        She books{" "}
        <span
          style={{
            display: "inline-block",
            background: COLORS.secondaryContainer,
            padding: "0 4px",
            fontWeight: 600,
          }}
        >
          Lila Moreno.
        </span>
      </p>

      {/* Divider */}
      <hr
        style={{
          margin: "14px 0",
          border: "none",
          borderTop: `1px solid rgba(26,28,28,0.35)`,
          ...lineStyle(step >= 4),
        }}
      />

      {/* CTA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: FONTS.body,
          fontSize: 13,
          color: COLORS.onSurfaceVariant,
          ...lineStyle(step >= 5),
        }}
      >
        <span>Your turn — click around</span>
        <span
          aria-hidden
          style={{
            display: "inline-block",
            animation: "yonasCaptionArrow 1.8s ease-in-out 600ms infinite",
          }}
        >
          →
        </span>
      </div>
      <style>{`
        @keyframes yonasCaptionArrow {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
