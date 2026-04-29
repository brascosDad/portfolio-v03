"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Beat1Email } from "./Beat1Email";
import { Beat2OldWay } from "./Beat2OldWay";
import { Beat3Panel } from "./Beat3Panel";
import { Interstitial } from "./Interstitial";
import { StoryState, INITIAL_STORY } from "./StoryStrip";
import { ReelHud } from "./ReelHud";
import { COLORS, FONTS, NATIVE_HEIGHT, NATIVE_WIDTH } from "./tokens";

type Phase =
  | "beat1"
  | "interstitial-old"
  | "beat2"
  | "interstitial-new"
  | "beat3";

const OLD_WAY_BULLETS = [
  "Scanning 15 spreadsheets for a single answer",
  "No way to see multiple artists at once",
];

const emphasis = { fontWeight: 700, textDecoration: "underline" } as const;
const NEW_WAY_BULLETS = [
  <>
    <span style={emphasis}>1</span> interface to replace{" "}
    <span style={emphasis}>15</span>
  </>,
  "All artists visible at once",
];

const NEW_WAY_INTRO = "Old way. Couldn't find a slot — let's try something else.";

function formatBeat2Timer(ms: number): string {
  const clamped = Math.max(0, Math.min(13 * 60 * 1000, ms));
  const totalSec = Math.floor(clamped / 1000);
  const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
  const ss = String(totalSec % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

type Token = { cancelled: boolean };

// MacBook-style silver bezel. Darker than polished silver, closer to
// space-gray so the frame reads as a discrete object against the light
// bento-cell background.
const LAPTOP_BEZEL_COLOR = "#8a8a8c";

export function YonasReel() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scalerRef = useRef<HTMLDivElement | null>(null);

  const [phase, setPhase] = useState<Phase>("beat1");
  const [replayCount, setReplayCount] = useState(0);
  const [story, setStory] = useState<StoryState>(INITIAL_STORY);

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

  const handleStoryUpdate = useCallback((patch: Partial<StoryState>) => {
    setStory((s) => ({ ...s, ...patch }));
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
      setStory(INITIAL_STORY);
      setPhase("beat1");
      await awaitBeat();
      if (token.cancelled) return;

      setPhase("interstitial-old");
      await awaitBeat();
      if (token.cancelled) return;

      setPhase("beat2");
      await awaitBeat();
      if (token.cancelled) return;

      // Clear the frozen 13:00 timer + "Old way…" toast before the
      // interstitial — the white screen should be uncluttered.
      setStory((s) => ({ ...s, timerMs: null, toast: null }));
      setPhase("interstitial-new");
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
        style={{
          border: `15px solid ${LAPTOP_BEZEL_COLOR}`,
          borderRadius: 20,
          overflow: "hidden",
          background: LAPTOP_BEZEL_COLOR,
        }}
      >
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
              <Beat1Email
                reducedMotion={!!reducedMotion}
                onStoryUpdate={handleStoryUpdate}
                onComplete={handleBeatComplete}
              />
            )}
            {phase === "interstitial-old" && (
              <Interstitial
                heading="The old way"
                bullets={OLD_WAY_BULLETS}
                reducedMotion={!!reducedMotion}
                onComplete={handleBeatComplete}
              />
            )}
            {phase === "beat2" && (
              <Beat2OldWay
                reducedMotion={!!reducedMotion}
                onStoryUpdate={handleStoryUpdate}
                onComplete={handleBeatComplete}
              />
            )}
            {phase === "interstitial-new" && (
              <Interstitial
                heading="The new way"
                intro={NEW_WAY_INTRO}
                bullets={NEW_WAY_BULLETS}
                reducedMotion={!!reducedMotion}
                onComplete={handleBeatComplete}
              />
            )}
            {phase === "beat3" && (
              <Beat3Panel
                reducedMotion={!!reducedMotion}
                onStoryUpdate={handleStoryUpdate}
              />
            )}

            {/* Large countdown timer overlay — Beat 2 only. Renders inside
                the scaled native canvas so its size scales with the reel. */}
            {phase === "beat2" && story.timerMs !== null && (
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 110,
                  display: "flex",
                  justifyContent: "center",
                  pointerEvents: "none",
                  zIndex: 90,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 96,
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "0.04em",
                    color: "#1a1c1c",
                    background: "rgba(255,255,255,0.92)",
                    border: "1px solid rgba(26,28,28,0.18)",
                    borderRadius: 16,
                    padding: "12px 32px",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
                  }}
                >
                  {formatBeat2Timer(story.timerMs)}
                </span>
              </div>
            )}
          </div>
          <ReelHud
            timerMs={phase === "beat2" ? null : story.timerMs}
            toast={story.toast}
            showReplay={story.showReplay}
            onReplay={handleReplay}
          />
        </div>
      </div>
    </>
  );
}
