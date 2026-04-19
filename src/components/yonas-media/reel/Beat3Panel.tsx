"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Beat3Tool, BuildPiece } from "./Beat3Tool";
import { ArtistId } from "./data";
import { TIMING } from "./tokens";

type Subphase = "construction" | "demo" | "caption" | "interactive";

interface Beat3PanelProps {
  reducedMotion: boolean;
  onReplay: () => void;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function Beat3Panel({ reducedMotion, onReplay }: Beat3PanelProps) {
  const [subphase, setSubphase] = useState<Subphase>("construction");
  const [placedPieces, setPlacedPieces] = useState<Set<BuildPiece>>(new Set());
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<0 | 1 | 2>(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedArtists, setSelectedArtists] = useState<Set<ArtistId>>(new Set());
  const [showReplay, setShowReplay] = useState(false);

  const handleMonthChange = useCallback((delta: -1 | 1) => {
    setSelectedMonthIdx((prev) => {
      const next = Math.max(0, Math.min(2, prev + delta));
      return next as 0 | 1 | 2;
    });
  }, []);

  const handleDayClick = useCallback((day: number) => {
    setSelectedDay(day);
  }, []);

  const handleArtistToggle = useCallback((id: ArtistId) => {
    setSelectedArtists((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const interactiveMode = subphase === "interactive";

  const handleAnyInteraction = useCallback(() => {
    // No-op for now; wired to caption dismissal in a later commit.
  }, []);

  // Construction sequence: place pieces according to TIMING.construction.sequence.
  useEffect(() => {
    if (subphase !== "construction") return;
    let cancelled = false;

    (async () => {
      if (reducedMotion) {
        setPlacedPieces(new Set(["nav", "sidebar", "head", "metrics", "table"]));
        await wait(300);
        if (cancelled) return;
        setSubphase("interactive");
        setShowReplay(true);
        return;
      }

      const sequence = TIMING.construction.sequence;
      for (const step of sequence) {
        if (cancelled) return;
        await wait(step.startAtMs - (sequence[sequence.indexOf(step) - 1]?.startAtMs ?? 0));
        if (cancelled) return;
        setPlacedPieces((prev) => new Set(prev).add(step.key));
      }
      await wait(TIMING.construction.completionPauseMs);
      if (cancelled) return;

      // DECISION: demo + caption land in subsequent commits. For now, jump to
      // interactive mode immediately after construction. The tool is usable as
      // soon as all pieces are placed — a valid fallback state.
      setSubphase("interactive");
      setShowReplay(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [subphase, reducedMotion]);

  return (
    <Beat3Tool
      placedPieces={placedPieces}
      selectedMonthIdx={selectedMonthIdx}
      selectedDay={selectedDay}
      selectedArtists={selectedArtists}
      interactiveMode={interactiveMode}
      onMonthChange={handleMonthChange}
      onDayClick={handleDayClick}
      onArtistToggle={handleArtistToggle}
      onAnyInteraction={handleAnyInteraction}
      showReplay={showReplay}
      onReplay={onReplay}
    />
  );
}
