"use client";

import { useEffect, useRef, useState } from "react";
import { FONTS } from "./tokens";

export interface StoryState {
  eyebrow: string;
  text: string;
  // Render the MM:SS timer in the HUD. null hides the timer pill.
  timerMs: number | null;
  // Emphasized state for the final "Your turn" CTA.
  emphasize: boolean;
  // Toast message rendered in the HUD above the timer. null hides the
  // toast pill.
  toast: string | null;
  // Show the persistent "Replay demo" button in the HUD. Turned on in
  // Beat 3's interactive subphase, 1s after the "Your turn" toast lands.
  showReplay: boolean;
}

export const INITIAL_STORY: StoryState = {
  eyebrow: "",
  text: "",
  timerMs: null,
  emphasize: false,
  toast: null,
  showReplay: false,
};

interface StoryStripProps {
  state: StoryState;
  // When present, a "Replay demo" button is rendered on the right during
  // the emphasized ("Your turn") state.
  onReplay?: () => void;
}

function formatTimer(ms: number): string {
  const clamped = Math.max(0, Math.min(13 * 60 * 1000, ms));
  const totalSec = Math.floor(clamped / 1000);
  const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
  const ss = String(totalSec % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

// Dark inverted narration bar rendered above the laptop-framed reel. The
// whole story — eyebrow, narration, timer, final CTA, Replay button —
// lives here, so the screen itself stays clean and the text never
// competes for attention with the animation inside the frame.
//
// The strip is locked to a fixed height so the timer and Replay button
// appearing/disappearing can't nudge the layout.
const STRIP_HEIGHT = 64;

export function StoryStrip({ state, onReplay }: StoryStripProps) {
  const { eyebrow, text, timerMs, emphasize } = state;

  const [displayed, setDisplayed] = useState({ eyebrow, text, emphasize });
  const [fadingOut, setFadingOut] = useState(false);
  const prevKey = useRef(`${eyebrow}|${text}|${emphasize}`);

  useEffect(() => {
    const nextKey = `${eyebrow}|${text}|${emphasize}`;
    if (nextKey === prevKey.current) return;
    prevKey.current = nextKey;
    setFadingOut(true);
    const t = setTimeout(() => {
      setDisplayed({ eyebrow, text, emphasize });
      setFadingOut(false);
    }, 160);
    return () => clearTimeout(t);
  }, [eyebrow, text, emphasize]);

  const showReplay = emphasize && !!onReplay;

  return (
    <div
      style={{
        background: "#1a1c1c",
        color: "#fff",
        borderRadius: 12,
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        height: STRIP_HEIGHT,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          flex: 1,
          minWidth: 0,
          opacity: fadingOut ? 0 : 1,
          transform: fadingOut ? "translateY(3px)" : "translateY(0)",
          transition: "opacity 180ms ease, transform 180ms ease",
        }}
      >
        {displayed.eyebrow && (
          <>
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: displayed.emphasize ? "#fcd400" : "rgba(255,255,255,0.5)",
                flexShrink: 0,
              }}
            >
              {displayed.eyebrow}
            </span>
            <span
              aria-hidden
              style={{
                width: 1,
                height: 16,
                background: "rgba(255,255,255,0.22)",
                flexShrink: 0,
              }}
            />
          </>
        )}
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: displayed.emphasize ? 18 : 15,
            fontWeight: displayed.emphasize ? 700 : 500,
            letterSpacing: "-0.005em",
            color: "#fff",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {displayed.text || "\u00A0"}
        </span>
        {displayed.emphasize && !showReplay && (
          <span
            aria-hidden
            style={{
              display: "inline-block",
              color: "#fcd400",
              fontFamily: FONTS.display,
              fontSize: 18,
              fontWeight: 700,
              marginLeft: 4,
              animation: "yonasStoryArrow 1.6s ease-in-out infinite",
            }}
          >
            →
          </span>
        )}
      </div>

      {/* Right slot: Replay demo button during "Your turn", else timer if
          the current beat supplies one, else nothing. The slot keeps a
          stable width so the strip's height doesn't shift. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        {showReplay ? (
          <button
            type="button"
            onClick={onReplay}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: FONTS.display,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "8px 14px",
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: 6,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Replay demo
            <span
              aria-hidden
              style={{
                display: "inline-block",
                fontSize: 13,
                animation: "yonasReplayArrow 1.6s ease-in-out infinite",
              }}
            >
              ↓
            </span>
          </button>
        ) : timerMs !== null ? (
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "0.06em",
              padding: "6px 12px",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 6,
            }}
          >
            {formatTimer(timerMs)}
          </span>
        ) : null}
      </div>

      <style>{`
        @keyframes yonasStoryArrow {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(4px); }
        }
        @keyframes yonasReplayArrow {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(3px); }
        }
      `}</style>
    </div>
  );
}
