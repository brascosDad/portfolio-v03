"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Beat3Tool, BuildPiece } from "./Beat3Tool";
import { Beat3Demo, DemoTarget } from "./Beat3Demo";
import { StoryState } from "./StoryStrip";
import { ArtistId, DateKey, compareDateKeys } from "./data";
import { TIMING } from "./tokens";

type Subphase = "construction" | "demo" | "caption" | "value" | "interactive";

// Payoff claim lifted from the case-study outcome:
//   booking inquiry time: 13 min → 1 min 10 sec (about 91% faster).
// The new-way timer ticks up toward this value during the demo and
// freezes there through the caption + value-statement beats.
const NEW_WAY_TIMER_MS = 70 * 1000;
// Rough real-time length of the Beat 3 demo. The timer tick maps real
// elapsed to the displayed 1:10 so viewers see the number climb during
// the demo rather than jumping at the end.
const BEAT3_DEMO_REAL_MS = 12000;
const VALUE_DWELL_MS = 2800;

interface Beat3PanelProps {
  reducedMotion: boolean;
  // Narration strip callback. When absent (e.g. interactive prototype on
  // case-study page), the beat runs silent.
  onStoryUpdate?: (patch: Partial<StoryState>) => void;
  // Skip construction/demo/caption and mount directly in interactive mode.
  startInteractive?: boolean;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

const CAPTION_DWELL_MS = 2600;

export function Beat3Panel({
  reducedMotion,
  onStoryUpdate,
  startInteractive = false,
}: Beat3PanelProps) {
  const [subphase, setSubphase] = useState<Subphase>(
    startInteractive ? "interactive" : "construction",
  );
  const [placedPieces, setPlacedPieces] = useState<Set<BuildPiece>>(
    startInteractive ? new Set(["nav", "sidebar", "head", "metrics", "table"]) : new Set(),
  );
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<0 | 1 | 2>(0);
  const [rangeStart, setRangeStart] = useState<DateKey | null>(
    startInteractive ? { monthIdx: 0, day: 10 } : null,
  );
  const [rangeEnd, setRangeEnd] = useState<DateKey | null>(
    startInteractive ? { monthIdx: 0, day: 25 } : null,
  );
  const [pendingCommit, setPendingCommit] = useState(false);
  const [selectedArtists, setSelectedArtists] = useState<Set<ArtistId>>(
    startInteractive ? new Set<ArtistId>(["cora", "jonah", "marcel"]) : new Set(),
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const prevArrowRef = useRef<HTMLElement | null>(null);
  const nextArrowRef = useRef<HTMLElement | null>(null);
  const dayCellsRef = useRef<Map<number, HTMLElement>>(new Map());
  const artistRowsRef = useRef<Map<ArtistId, HTMLElement>>(new Map());
  const subphaseRef = useRef<Subphase>(subphase);
  const onStoryRef = useRef(onStoryUpdate);
  useEffect(() => {
    subphaseRef.current = subphase;
  }, [subphase]);
  useEffect(() => {
    onStoryRef.current = onStoryUpdate;
  }, [onStoryUpdate]);

  const emitStory = useCallback((patch: Partial<StoryState>) => {
    onStoryRef.current?.(patch);
  }, []);

  const handleMonthChange = useCallback((delta: -1 | 1) => {
    setSelectedMonthIdx((prev) => {
      const next = Math.max(0, Math.min(2, prev + delta));
      return next as 0 | 1 | 2;
    });
  }, []);

  const handleAdvanceMonth = useCallback(() => handleMonthChange(1), [handleMonthChange]);

  const handleDayClick = useCallback(
    (day: number) => {
      const clicked: DateKey = { monthIdx: selectedMonthIdx, day };
      if (!pendingCommit) {
        setRangeStart(clicked);
        setRangeEnd(null);
        setPendingCommit(true);
        return;
      }
      if (!rangeStart) {
        setRangeStart(clicked);
        setRangeEnd(null);
        return;
      }
      if (rangeEnd) {
        setRangeStart(clicked);
        setRangeEnd(null);
        return;
      }
      const cmp = compareDateKeys(clicked, rangeStart);
      if (cmp > 0) {
        setRangeEnd(clicked);
      } else {
        setRangeStart(clicked);
        setRangeEnd(null);
      }
    },
    [selectedMonthIdx, pendingCommit, rangeStart, rangeEnd],
  );

  const handleCommitSelection = useCallback(() => {
    setPendingCommit((p) => (p ? false : p));
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
    // No-op while not in interactive mode. Beat3Tool's internal click
    // handlers check interactiveMode before mutating state.
  }, []);

  // Construction sequence.
  useEffect(() => {
    if (subphase !== "construction") return;
    let cancelled = false;

    emitStory({
      eyebrow: "The new way",
      text: "Same inquiry. New tool.",
      timerMs: null,
      emphasize: false,
    });

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
  }, [subphase, reducedMotion, emitStory]);

  // New-way timer: ticks 0 → NEW_WAY_TIMER_MS during the demo, mapped to
  // the real demo duration. Freezes (stops ticking) when the demo
  // completes; the caption and value subphases render the final value.
  useEffect(() => {
    if (subphase !== "demo" || reducedMotion) return;
    emitStory({ timerMs: 0 });
    const start = performance.now();
    const iv = setInterval(() => {
      const elapsed = performance.now() - start;
      const displayed = Math.min(
        NEW_WAY_TIMER_MS,
        (elapsed / BEAT3_DEMO_REAL_MS) * NEW_WAY_TIMER_MS,
      );
      emitStory({ timerMs: displayed });
    }, 100);
    return () => clearInterval(iv);
  }, [subphase, reducedMotion, emitStory]);

  // Caption: the story closes with Lila Moreno as the answer. Frozen
  // timer stays visible so the next beat can compare it against 13:00.
  useEffect(() => {
    if (subphase !== "caption") return;
    let cancelled = false;

    emitStory({
      eyebrow: "The new way",
      text: "Dana has her answer. She books Lila Moreno.",
      timerMs: NEW_WAY_TIMER_MS,
      emphasize: false,
    });

    (async () => {
      await wait(CAPTION_DWELL_MS);
      if (cancelled) return;
      setSubphase("value");
    })();

    return () => {
      cancelled = true;
    };
  }, [subphase, emitStory]);

  // Value statement: the payoff. Same answer, 91% faster. Timer still
  // shows 01:10 so the comparison lands.
  useEffect(() => {
    if (subphase !== "value") return;
    let cancelled = false;

    emitStory({
      eyebrow: "The new way",
      text: "01:10 vs 13:00 — 91% faster.",
      timerMs: NEW_WAY_TIMER_MS,
      emphasize: false,
    });

    (async () => {
      await wait(VALUE_DWELL_MS);
      if (cancelled) return;
      // Clear any pending-commit state from the demo's programmatic day
      // click so the user's first interactive click starts a fresh range.
      setPendingCommit(false);
      setSubphase("interactive");
    })();

    return () => {
      cancelled = true;
    };
  }, [subphase, emitStory]);

  // When interactive mode activates, the narration strip hands over to the
  // user with a playful CTA. The Replay button lives in the strip itself
  // (owned by YonasReel) so nothing here renders it.
  useEffect(() => {
    if (subphase !== "interactive") return;
    if (!startInteractive) {
      emitStory({
        eyebrow: "Your turn",
        text: "Click around!",
        timerMs: null,
        emphasize: true,
      });
    }
  }, [subphase, startInteractive, emitStory]);

  const handleDemoComplete = useCallback(() => {
    setSubphase("caption");
  }, []);

  const handleAnnotationChange = useCallback(
    (text: string) => {
      emitStory({ text });
    },
    [emitStory],
  );

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
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        pendingCommit={pendingCommit}
        selectedArtists={selectedArtists}
        interactiveMode={interactiveMode}
        onMonthChange={handleMonthChange}
        onDayClick={handleDayClick}
        onCommitSelection={handleCommitSelection}
        onArtistToggle={handleArtistToggle}
        onAnyInteraction={handleAnyInteraction}
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
          onAnnotationChange={handleAnnotationChange}
          onComplete={handleDemoComplete}
        />
      )}
    </div>
  );
}
