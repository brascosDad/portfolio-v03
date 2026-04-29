"use client";

import { useEffect, useRef } from "react";
import { Beat3Tool, BuildPiece } from "./Beat3Tool";
import { ArtistId } from "./data";
import { COLORS, NATIVE_HEIGHT, NATIVE_WIDTH } from "./tokens";

// Mobile fallback for YonasReel / YonasPrototype. Renders the Beat 3
// tool in a frozen, pre-populated state — the same layout the reel ends
// on — with pointer-events disabled so the view behaves like a
// screenshot. Aspect ratio matches NATIVE_WIDTH × NATIVE_HEIGHT so a
// swap between this and the live reel incurs no layout shift.
const PLACED_PIECES: Set<BuildPiece> = new Set(["nav", "sidebar", "head", "metrics", "table"]);
const SELECTED_ARTISTS: Set<ArtistId> = new Set(["cora", "jonah", "marcel"]);

const noop = () => {};

export function YonasStatic() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scalerRef = useRef<HTMLDivElement | null>(null);

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
      style={{ background: COLORS.bg, pointerEvents: "none" }}
      aria-hidden
    >
      <div
        ref={scalerRef}
        className="origin-top-left"
        style={{ width: NATIVE_WIDTH, height: NATIVE_HEIGHT, position: "relative" }}
      >
        <Beat3Tool
          placedPieces={PLACED_PIECES}
          selectedMonthIdx={0}
          rangeStart={{ monthIdx: 0, day: 10 }}
          rangeEnd={{ monthIdx: 0, day: 25 }}
          pendingCommit={false}
          selectedArtists={SELECTED_ARTISTS}
          interactiveMode={false}
          onMonthChange={noop}
          onDayClick={noop}
          onCommitSelection={noop}
          onArtistToggle={noop}
          onAnyInteraction={noop}
        />
      </div>
    </div>
  );
}
