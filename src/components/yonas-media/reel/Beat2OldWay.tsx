"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BEAT2_TABS,
  BEAT2_FOCAL,
  SHEET_FOCAL_ROW_INDEX,
  buildOldWaySheetData,
  SheetRow,
} from "./data";
import { COLORS, FONTS, TIMING } from "./tokens";

interface Beat2Props {
  reducedMotion: boolean;
  onComplete: () => void;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

// Sheet layout constants (native 1440×900).
const ROW_HEIGHT = 28;
const SHEET_BODY_HEIGHT = 660;
// Scroll offset that centers the focal row in the sheet body viewport.
const TARGET_SCROLL_Y = -(
  SHEET_FOCAL_ROW_INDEX * ROW_HEIGHT -
  SHEET_BODY_HEIGHT / 2 +
  ROW_HEIGHT / 2
);

// Total real-time duration of Beat 2 (used to scale the fake 13:00 timer).
const BEAT2_TOTAL_REAL_MS =
  BEAT2_TABS.length *
    (300 + // per-tab settle
      TIMING.beat2.scrollDurationMs +
      TIMING.beat2.rowScaleMs +
      TIMING.beat2.verdictStampDelay +
      TIMING.beat2.verdictStampMs +
      TIMING.beat2.tabDwellMs) +
  (BEAT2_TABS.length - 1) * (TIMING.beat2.tabDipMs + TIMING.beat2.tabFadeInMs);

function formatTimer(ms: number) {
  const totalSec = Math.min(13 * 60, Math.floor(ms / 1000));
  const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
  const ss = String(totalSec % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export function Beat2OldWay({ reducedMotion, onComplete }: Beat2Props) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [focused, setFocused] = useState(false);
  const [verdictShown, setVerdictShown] = useState(false);
  const [innerFaded, setInnerFaded] = useState(false);
  const [fakeElapsedMs, setFakeElapsedMs] = useState(0);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const tab = BEAT2_TABS[activeTabIdx];
  const focal = BEAT2_FOCAL[tab.id as "cora" | "jonah" | "marcel"];

  const rows = useMemo(
    () => buildOldWaySheetData(tab.seed, focal),
    [tab.seed, focal.venue, focal.verdict],
  );

  // Fake timer: ticks 100ms, maps real elapsed → 0..13:00 over BEAT2_TOTAL_REAL_MS.
  useEffect(() => {
    if (reducedMotion) return;
    const start = performance.now();
    const iv = setInterval(() => {
      const elapsed = performance.now() - start;
      const fake = Math.min(
        TIMING.beat2.timerTotalMs,
        (elapsed / BEAT2_TOTAL_REAL_MS) * TIMING.beat2.timerTotalMs,
      );
      setFakeElapsedMs(fake);
    }, TIMING.beat2.timerTickMs);
    return () => clearInterval(iv);
  }, [reducedMotion]);

  // Main orchestration.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (reducedMotion) {
        for (let i = 0; i < BEAT2_TABS.length; i++) {
          if (cancelled) return;
          setActiveTabIdx(i);
          await wait(300);
        }
        if (cancelled) return;
        onCompleteRef.current();
        return;
      }

      for (let tabIdx = 0; tabIdx < BEAT2_TABS.length; tabIdx++) {
        if (cancelled) return;
        setActiveTabIdx(tabIdx);
        setScrollY(0);
        setFocused(false);
        setVerdictShown(false);
        setInnerFaded(false);
        // Allow the tab switch + fade-in to settle before the scroll begins.
        await wait(TIMING.beat2.tabFadeInMs);
        if (cancelled) return;

        // Fast scroll to focal row (Mar 1).
        setScrollY(TARGET_SCROLL_Y);
        await wait(TIMING.beat2.scrollDurationMs);
        if (cancelled) return;

        // Focus: dim others, scale focal row.
        setFocused(true);
        await wait(TIMING.beat2.rowScaleMs + TIMING.beat2.verdictStampDelay);
        if (cancelled) return;

        // Pop verdict stamp.
        setVerdictShown(true);
        await wait(TIMING.beat2.verdictStampMs);
        if (cancelled) return;

        // Dwell.
        await wait(TIMING.beat2.tabDwellMs);
        if (cancelled) return;

        // Tab dip between tabs.
        if (tabIdx < BEAT2_TABS.length - 1) {
          setInnerFaded(true);
          await wait(TIMING.beat2.tabDipMs);
        }
      }

      if (cancelled) return;
      onCompleteRef.current();
    })();

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.sheetsBg,
        fontFamily: FONTS.google,
        color: COLORS.gmailTextPrimary,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SheetsTopBar />
      <SheetsMenuBar />
      <SheetsToolbar />
      <ColumnHeaders />

      {/* Body — fades in/out for the tab-dip swap. */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
          background: COLORS.sheetsBg,
          opacity: innerFaded ? 0 : 1,
          transition: innerFaded ? "opacity 0s" : `opacity ${TIMING.beat2.tabFadeInMs}ms ease`,
        }}
      >
        <div
          style={{
            transform: `translateY(${scrollY}px)`,
            transition: scrollY === 0
              ? "transform 0s"
              : `transform ${TIMING.beat2.scrollDurationMs}ms ${TIMING.beat2.scrollEase}`,
            willChange: "transform",
          }}
        >
          {rows.map((row, i) => (
            <SheetRowView
              key={`${tab.id}-${i}`}
              row={row}
              rowIndex={i}
              focused={focused}
              verdictShown={verdictShown}
            />
          ))}
        </div>
      </div>

      <SheetTabStrip activeTabIdx={activeTabIdx} />
      <SheetTimer fakeMs={fakeElapsedMs} />
    </div>
  );
}

export function SheetsTopBar() {
  return (
    <div
      style={{
        height: 56,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "0 20px",
        background: COLORS.sheetsBg,
        borderBottom: `1px solid ${COLORS.sheetsGridLine}`,
      }}
    >
      {/* Green grid glyph */}
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
        <rect x="2" y="2" width="22" height="22" rx="2" fill={COLORS.sheetsGreenAccent} />
        <path d="M7 8h12M7 13h12M7 18h12M12 8v12M17 8v12" stroke="#fff" strokeWidth="1.5" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, color: COLORS.gmailTextPrimary, fontWeight: 500 }}>
            Yonas_Bookings_2026
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 2l3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-8.5L2 9h7l3-7z"
              stroke={COLORS.gmailTextSecondary}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span style={{ fontSize: 11, color: COLORS.gmailTextSecondary }}>
          Last edit was seconds ago
        </span>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              border: `2px solid ${COLORS.gmailToolbarIcon}`,
              opacity: 0.35,
            }}
          />
        ))}
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "#1a73e8",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          B
        </div>
      </div>
    </div>
  );
}

export function SheetsMenuBar() {
  const items = ["File", "Edit", "View", "Insert", "Format", "Data", "Tools", "Extensions", "Help"];
  return (
    <div
      style={{
        height: 28,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "0 20px",
        background: COLORS.sheetsBg,
        color: COLORS.gmailTextSecondary,
        fontSize: 12,
      }}
    >
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export function SheetsToolbar() {
  return (
    <div
      style={{
        height: 36,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 20px",
        background: COLORS.sheetsHeaderBg,
        borderBottom: `1px solid ${COLORS.sheetsGridLine}`,
      }}
    >
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            display: "inline-block",
            width: 22,
            height: 22,
            borderRadius: 4,
            background: i % 3 === 0 ? "rgba(95,99,104,0.15)" : "transparent",
            border: `1px solid rgba(95,99,104,0.25)`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}

export function ColumnHeaders() {
  return (
    <div
      style={{
        height: 24,
        flexShrink: 0,
        display: "grid",
        gridTemplateColumns: "54px 140px 1fr 180px 90px",
        fontFamily: FONTS.google,
        background: COLORS.sheetsColumnHeaderBg,
        color: COLORS.sheetsColumnHeaderFg,
        fontSize: 11,
        fontWeight: 500,
        borderBottom: `1px solid ${COLORS.sheetsGridLine}`,
      }}
    >
      {["", "A", "B", "C", "D"].map((label, i) => (
        <span
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: i < 4 ? `1px solid ${COLORS.sheetsGridLine}` : "none",
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function SheetRowView({
  row,
  rowIndex,
  focused,
  verdictShown,
}: {
  row: SheetRow;
  rowIndex: number;
  focused: boolean;
  verdictShown: boolean;
}) {
  const isFocal = row.isFocal;
  const dim = focused && !isFocal;
  const scaled = focused && isFocal;

  return (
    <div
      style={{
        height: ROW_HEIGHT,
        display: "grid",
        gridTemplateColumns: "54px 140px 1fr 180px 90px",
        fontSize: 12,
        color: COLORS.gmailTextPrimary,
        background: rowIndex % 2 === 0 ? COLORS.sheetsBg : "#fbfbfb",
        borderBottom: `1px solid ${COLORS.sheetsGridLine}`,
        opacity: dim ? 0.22 : 1,
        transform: scaled ? "scale(1.9)" : "scale(1)",
        transformOrigin: "right center",
        transition:
          `opacity 200ms ease, transform ${TIMING.beat2.rowScaleMs}ms ${TIMING.beat2.rowScaleEase}`,
        position: "relative",
        zIndex: scaled ? 2 : 0,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.sheetsColumnHeaderFg, borderRight: `1px solid ${COLORS.sheetsGridLine}` }}>
        {rowIndex + 1}
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
      {/* Verdict stamp slot — stamp pops in here when this row is the focal row. */}
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isFocal && (
          <VerdictStamp
            verdict={row.status === "HOLD" ? "hold" : "confirmed"}
            visible={verdictShown}
          />
        )}
      </span>
    </div>
  );
}

function VerdictStamp({
  verdict,
  visible,
}: {
  verdict: "confirmed" | "hold";
  visible: boolean;
}) {
  const color = verdict === "confirmed" ? "#d13b1f" : "#d48a00";
  return (
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
        border: `1.5px solid ${color}`,
        transform: visible ? "scale(1)" : "scale(0)",
        transition: `transform ${TIMING.beat2.verdictStampMs}ms ${TIMING.beat2.verdictStampEase} ${TIMING.beat2.verdictStampDelay}ms`,
      }}
    >
      <svg width="10" height="10" viewBox="-5 -5 10 10" aria-hidden>
        {verdict === "confirmed" ? (
          <g stroke={color} strokeWidth="1.6" strokeLinecap="round">
            <line x1="-3" y1="-3" x2="3" y2="3" />
            <line x1="3" y1="-3" x2="-3" y2="3" />
          </g>
        ) : (
          <line x1="-3" y1="0" x2="3" y2="0" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        )}
      </svg>
    </span>
  );
}

export function SheetTabStrip({ activeTabIdx }: { activeTabIdx: number }) {
  return (
    <div
      style={{
        height: 32,
        flexShrink: 0,
        display: "flex",
        alignItems: "flex-end",
        gap: 2,
        padding: "0 20px",
        background: COLORS.sheetsBg,
        borderTop: `1px solid ${COLORS.sheetsGridLine}`,
        fontFamily: FONTS.google,
      }}
    >
      {BEAT2_TABS.map((t, i) => {
        const active = i === activeTabIdx;
        return (
          <div
            key={t.id}
            style={{
              padding: "6px 18px",
              fontSize: 12,
              background: active ? COLORS.sheetsTabActiveBg : COLORS.sheetsTabInactiveBg,
              color: active ? COLORS.gmailTextPrimary : COLORS.gmailTextSecondary,
              fontWeight: active ? 600 : 400,
              borderTop: `2px solid ${active ? COLORS.sheetsGreenAccent : "transparent"}`,
              borderLeft: `1px solid ${COLORS.sheetsGridLine}`,
              borderRight: `1px solid ${COLORS.sheetsGridLine}`,
              borderRadius: "2px 2px 0 0",
              transition: "background 200ms ease, color 200ms ease",
            }}
          >
            {t.name}
          </div>
        );
      })}
    </div>
  );
}

function SheetTimer({ fakeMs }: { fakeMs: number }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        right: 28,
        padding: "8px 14px",
        background: "rgba(26,28,28,0.82)",
        color: "#fff",
        fontFamily: FONTS.mono,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.04em",
        borderRadius: 6,
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
      }}
    >
      {formatTimer(fakeMs)}
    </div>
  );
}
