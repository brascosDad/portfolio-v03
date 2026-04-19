"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Beat3Tool, BuildPiece } from "./Beat3Tool";
import { Beat3Demo, DemoTarget } from "./Beat3Demo";
import { ReelCaption } from "./ReelCaption";
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
  const [captionFading, setCaptionFading] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const prevArrowRef = useRef<HTMLElement | null>(null);
  const nextArrowRef = useRef<HTMLElement | null>(null);
  const dayCellsRef = useRef<Map<number, HTMLElement>>(new Map());
  const artistRowsRef = useRef<Map<ArtistId, HTMLElement>>(new Map());
  const subphaseRef = useRef<Subphase>("construction");
  subphaseRef.current = subphase;

  const handleMonthChange = useCallback((delta: -1 | 1) => {
    setSelectedMonthIdx((prev) => {
      const next = Math.max(0, Math.min(2, prev + delta));
      return next as 0 | 1 | 2;
    });
  }, []);

  const handleAdvanceMonth = useCallback(() => handleMonthChange(1), [handleMonthChange]);

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

  // Clicks anywhere on the tool while the caption is visible dismiss it. We don't
  // use pointer-events: none to gate the tool during caption — hover states stay
  // alive; click handlers inside Beat3Tool call this even when interactiveMode is
  // false (they just short-circuit the actual state change).
  const handleAnyInteraction = useCallback(() => {
    if (subphaseRef.current === "caption" && !captionFading) {
      setCaptionFading(true);
      setTimeout(() => {
        setSubphase("interactive");
        setShowReplay(true);
      }, TIMING.caption.fadeOutMs);
    }
  }, [captionFading]);

  // Construction sequence.
  useEffect(() => {
    if (subphase !== "construction") return;
    let cancelled = false;

    (async () => {
      if (reducedMotion) {
        setPlacedPieces(new Set(["nav", "sidebar", "head", "metrics", "table"]));
        await wait(300);
        if (cancelled) return;
        setSubphase("demo");
        return;
      }

      const sequence = TIMING.construction.sequence;
      let prev = 0;
      for (const step of sequence) {
        if (cancelled) return;
        await wait(step.startAtMs - prev);
        prev = step.startAtMs;
        if (cancelled) return;
        setPlacedPieces((p) => new Set(p).add(step.key));
      }
      await wait(TIMING.construction.completionPauseMs);
      if (cancelled) return;
      setSubphase("demo");
    })();

    return () => {
      cancelled = true;
    };
  }, [subphase, reducedMotion]);

  const handleDemoComplete = useCallback(() => {
    setSubphase("caption");
  }, []);

  const getTargetRect = useCallback((target: DemoTarget): DOMRect | null => {
    if (target.type === "prevMonth") return prevArrowRef.current?.getBoundingClientRect() ?? null;
    if (target.type === "nextMonth") return nextArrowRef.current?.getBoundingClientRect() ?? null;
    if (target.type === "day") return dayCellsRef.current.get(target.day)?.getBoundingClientRect() ?? null;
    if (target.type === "artist") return artistRowsRef.current.get(target.id)?.getBoundingClientRect() ?? null;
    return null;
  }, []);

  const getScalerRect = useCallback(
    () => rootRef.current?.getBoundingClientRect() ?? null,
    [],
  );

  return (
    <div ref={rootRef} style={{ position: "relative", width: "100%", height: "100%" }}>
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
        dayCellRefCallback={(day, el) => {
          if (el) dayCellsRef.current.set(day, el);
          else dayCellsRef.current.delete(day);
        }}
        prevMonthArrowRef={(el) => {
          prevArrowRef.current = el;
        }}
        nextMonthArrowRef={(el) => {
          nextArrowRef.current = el;
        }}
        artistRowRefCallback={(id, el) => {
          if (el) artistRowsRef.current.set(id, el);
          else artistRowsRef.current.delete(id);
        }}
      />

      {subphase === "demo" && (
        <Beat3Demo
          reducedMotion={reducedMotion}
          getTargetRect={getTargetRect}
          getScalerRect={getScalerRect}
          onAdvanceMonth={handleAdvanceMonth}
          onSelectDay={handleDayClick}
          onToggleArtist={handleArtistToggle}
          onComplete={handleDemoComplete}
        />
      )}

      {subphase === "caption" && (
        <ReelCaption
          reducedMotion={reducedMotion}
          fading={captionFading}
          onDismiss={handleAnyInteraction}
        />
      )}
    </div>
  );
}
