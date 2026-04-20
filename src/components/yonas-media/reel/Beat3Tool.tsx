"use client";

import React, { useEffect, useRef } from "react";
import {
  MONTHS,
  ARTISTS,
  BOOKINGS,
  ArtistId,
  Booking,
  DateKey,
  compareDateKeys,
  dateKeysEqual,
  isDateInRange,
  iterateDateRange,
  formatDateKeyLong,
  formatDateKeyShort,
} from "./data";
import { COLORS, FONTS, TIMING } from "./tokens";

export type BuildPiece = "nav" | "sidebar" | "head" | "metrics" | "table";

export interface Beat3ToolProps {
  placedPieces: Set<BuildPiece>;
  selectedMonthIdx: 0 | 1 | 2;
  rangeStart: DateKey | null;
  rangeEnd: DateKey | null;
  pendingCommit: boolean;
  selectedArtists: Set<ArtistId>;
  interactiveMode: boolean;
  onMonthChange: (delta: -1 | 1) => void;
  onDayClick: (day: number) => void;
  onCommitSelection: () => void;
  onArtistToggle: (id: ArtistId) => void;
  onAnyInteraction: () => void;
  dayCellRefCallback?: (day: number, el: HTMLElement | null) => void;
  prevMonthArrowRef?: (el: HTMLElement | null) => void;
  nextMonthArrowRef?: (el: HTMLElement | null) => void;
  artistRowRefCallback?: (id: ArtistId, el: HTMLElement | null) => void;
}

const PIECE_TRANSITION = `opacity ${TIMING.construction.pieceDurationMs}ms ${TIMING.construction.pieceEase}, transform ${TIMING.construction.pieceDurationMs}ms ${TIMING.construction.pieceEase}`;
function pieceStyle(placed: boolean): React.CSSProperties {
  return {
    transition: PIECE_TRANSITION,
    opacity: placed ? 1 : 0,
    transform: placed ? "translateY(0)" : "translateY(12px)",
    willChange: "opacity, transform",
  };
}

export function Beat3Tool(props: Beat3ToolProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.bg,
        fontFamily: FONTS.body,
        color: COLORS.onSurface,
        display: "grid",
        gridTemplateRows: "56px 1fr",
        gridTemplateColumns: "280px 1fr",
        gridTemplateAreas: `
          "nav nav"
          "side main"
        `,
      }}
    >
      <div style={{ gridArea: "nav", ...pieceStyle(props.placedPieces.has("nav")) }}>
        <ToolNav />
      </div>
      <div
        style={{
          gridArea: "side",
          padding: "20px 18px",
          background: COLORS.bg,
          ...pieceStyle(props.placedPieces.has("sidebar")),
        }}
      >
        <SidebarCalendar
          monthIdx={props.selectedMonthIdx}
          rangeStart={props.rangeStart}
          rangeEnd={props.rangeEnd}
          pendingCommit={props.pendingCommit}
          onChangeMonth={props.onMonthChange}
          onDayClick={props.onDayClick}
          onCommitSelection={props.onCommitSelection}
          interactiveMode={props.interactiveMode}
          onAnyInteraction={props.onAnyInteraction}
          dayCellRefCallback={props.dayCellRefCallback}
          prevMonthArrowRef={props.prevMonthArrowRef}
          nextMonthArrowRef={props.nextMonthArrowRef}
        />
        <SidebarRoster
          selectedArtists={props.selectedArtists}
          onToggle={props.onArtistToggle}
          interactiveMode={props.interactiveMode}
          onAnyInteraction={props.onAnyInteraction}
          artistRowRefCallback={props.artistRowRefCallback}
        />
      </div>
      <div
        style={{
          gridArea: "main",
          padding: "24px 28px 24px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div style={pieceStyle(props.placedPieces.has("head"))}>
          <PageHead
            onNewBookingClick={props.onAnyInteraction}
            interactiveMode={props.interactiveMode}
          />
        </div>
        <div style={pieceStyle(props.placedPieces.has("metrics"))}>
          <MetricsRow />
        </div>
        <div style={{ flex: 1, minHeight: 0, ...pieceStyle(props.placedPieces.has("table")) }}>
          <BookingsTable
            selectedMonthIdx={props.selectedMonthIdx}
            rangeStart={props.rangeStart}
            rangeEnd={props.rangeEnd}
            selectedArtists={props.selectedArtists}
          />
        </div>
      </div>
    </div>
  );
}

function ToolNav() {
  return (
    <div
      style={{
        height: 56,
        background: COLORS.surfaceLow,
        borderBottom: `4px solid rgba(208, 198, 171, 0.18)`,
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        gap: 30,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.display,
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: COLORS.onSurface,
        }}
      >
        Yonas Media
      </span>
      <div style={{ display: "flex", gap: 22 }}>
        {["Booking", "Contracts", "Ticket Counts"].map((label, i) => (
          <span
            key={label}
            style={{
              fontFamily: FONTS.display,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: i === 0 ? COLORS.onSurface : COLORS.onSurfaceVariant,
              borderBottom: i === 0 ? `2px solid ${COLORS.secondaryContainer}` : "none",
              paddingBottom: i === 0 ? 4 : 0,
            }}
          >
            {label}
          </span>
        ))}
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 12, color: COLORS.onSurfaceVariant }}>Simon Ashworth</span>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: COLORS.secondaryContainer,
            color: COLORS.onSecondaryContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontFamily: FONTS.display,
            fontWeight: 700,
          }}
        >
          SA
        </div>
      </div>
    </div>
  );
}

function SidebarCalendar({
  monthIdx,
  rangeStart,
  rangeEnd,
  pendingCommit,
  onChangeMonth,
  onDayClick,
  onCommitSelection,
  interactiveMode,
  onAnyInteraction,
  dayCellRefCallback,
  prevMonthArrowRef,
  nextMonthArrowRef,
}: {
  monthIdx: 0 | 1 | 2;
  rangeStart: DateKey | null;
  rangeEnd: DateKey | null;
  pendingCommit: boolean;
  onChangeMonth: (delta: -1 | 1) => void;
  onDayClick: (day: number) => void;
  onCommitSelection: () => void;
  interactiveMode: boolean;
  onAnyInteraction: () => void;
  dayCellRefCallback?: (day: number, el: HTMLElement | null) => void;
  prevMonthArrowRef?: (el: HTMLElement | null) => void;
  nextMonthArrowRef?: (el: HTMLElement | null) => void;
}) {
  const month = MONTHS[monthIdx];
  const cells: (number | null)[] = [];
  for (let i = 0; i < month.firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= month.daysInMonth; d++) cells.push(d);
  while (cells.length < 42) cells.push(null);

  const prevDisabled = monthIdx === 0;
  const nextDisabled = monthIdx === 2;

  // Card wrapper ref drives the commit triggers: mouse-leave (desktop),
  // pointerdown-outside (touch or clicks elsewhere), and blur with the
  // next focused element outside the card (keyboard tab-out).
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pendingCommit) return;
    const onPointerDown = (e: PointerEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const target = e.target as Node | null;
      if (target && card.contains(target)) return;
      onCommitSelection();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [pendingCommit, onCommitSelection]);

  const handleCardMouseLeave = () => {
    if (!pendingCommit) return;
    onCommitSelection();
  };

  const handleCardBlur = (e: React.FocusEvent) => {
    if (!pendingCommit) return;
    const card = cardRef.current;
    if (!card) return;
    const next = e.relatedTarget as Node | null;
    if (next && card.contains(next)) return;
    onCommitSelection();
  };

  // Compute the highlight state for a given day cell in the current month.
  const dayHighlight = (
    day: number,
  ): "none" | "endpoint" | "intermediate" => {
    const key: DateKey = { monthIdx, day };
    if (dateKeysEqual(rangeStart, key) || dateKeysEqual(rangeEnd, key)) return "endpoint";
    if (rangeStart && rangeEnd && isDateInRange(key, rangeStart, rangeEnd)) return "intermediate";
    return "none";
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
          paddingLeft: 18,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: COLORS.onSurfaceVariant,
          }}
        >
          Calendar
        </span>
      </div>
      <div
        ref={cardRef}
        onMouseLeave={handleCardMouseLeave}
        onBlur={handleCardBlur}
        style={{
          background: COLORS.surfaceLowest,
          padding: 14,
          border: `4px solid rgba(208, 198, 171, 0.12)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontFamily: FONTS.display, fontSize: 14, fontWeight: 600 }}>{month.name}</span>
          <div style={{ display: "flex", gap: 4 }}>
            <button
              ref={(el) => prevMonthArrowRef?.(el)}
              type="button"
              onClick={() => {
                onAnyInteraction();
                if (interactiveMode && !prevDisabled) onChangeMonth(-1);
              }}
              disabled={prevDisabled && interactiveMode}
              style={{
                width: 24,
                height: 24,
                border: `2px solid ${COLORS.outlineVariant}`,
                background: "transparent",
                color: prevDisabled ? "rgba(0,0,0,0.25)" : COLORS.onSurface,
                fontFamily: FONTS.display,
                fontSize: 12,
                cursor: interactiveMode && !prevDisabled ? "pointer" : "default",
              }}
            >
              ‹
            </button>
            <button
              ref={(el) => nextMonthArrowRef?.(el)}
              type="button"
              onClick={() => {
                onAnyInteraction();
                if (interactiveMode && !nextDisabled) onChangeMonth(1);
              }}
              disabled={nextDisabled && interactiveMode}
              style={{
                width: 24,
                height: 24,
                border: `2px solid ${COLORS.outlineVariant}`,
                background: "transparent",
                color: nextDisabled ? "rgba(0,0,0,0.25)" : COLORS.onSurface,
                fontFamily: FONTS.display,
                fontSize: 12,
                cursor: interactiveMode && !nextDisabled ? "pointer" : "default",
              }}
            >
              ›
            </button>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 2,
            fontFamily: FONTS.body,
            fontSize: 10,
            color: COLORS.onSurfaceVariant,
            marginBottom: 4,
          }}
        >
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={i} style={{ textAlign: "center" }}>
              {d}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 2,
            minHeight: 168,
          }}
        >
          {cells.map((day, i) => {
            const hi = day !== null ? dayHighlight(day) : "none";
            const bg =
              hi === "endpoint"
                ? COLORS.secondaryContainer
                : hi === "intermediate"
                  ? "rgba(252, 212, 0, 0.4)"
                  : "transparent";
            return (
              <button
                key={i}
                ref={(el) => {
                  if (day !== null) dayCellRefCallback?.(day, el);
                }}
                type="button"
                disabled={day === null}
                onClick={() => {
                  if (day === null) return;
                  onAnyInteraction();
                  if (interactiveMode) onDayClick(day);
                }}
                style={{
                  aspectRatio: "1 / 1",
                  border: "none",
                  background: bg,
                  color: day === null ? "transparent" : COLORS.onSurface,
                  fontFamily: FONTS.body,
                  fontSize: 11,
                  cursor: day !== null && interactiveMode ? "pointer" : "default",
                  padding: 0,
                  transition: "background 180ms ease",
                }}
              >
                {day ?? ""}
              </button>
            );
          })}
        </div>
        <RangeFooter
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          pendingCommit={pendingCommit}
        />
      </div>
    </div>
  );
}

function RangeFooter({
  rangeStart,
  rangeEnd,
  pendingCommit,
}: {
  rangeStart: DateKey | null;
  rangeEnd: DateKey | null;
  pendingCommit: boolean;
}) {
  const baseStyle: React.CSSProperties = {
    marginTop: 12,
    paddingTop: 10,
    borderTop: `1px solid rgba(208, 198, 171, 0.35)`,
    fontFamily: FONTS.display,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: COLORS.onSurface,
    display: "flex",
    alignItems: "center",
    gap: 6,
    minHeight: 22,
  };

  if (!rangeStart) {
    return (
      <div style={{ ...baseStyle, color: COLORS.onSurfaceVariant, fontWeight: 500 }}>
        Pick a date
      </div>
    );
  }

  if (rangeStart && !rangeEnd) {
    return (
      <div style={baseStyle}>
        <span>{formatDateKeyLong(rangeStart)}</span>
        <span style={{ color: COLORS.onSurfaceVariant }} aria-hidden>
          →
        </span>
        {pendingCommit && (
          <span
            style={{
              color: COLORS.onSurfaceVariant,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            pick end
          </span>
        )}
      </div>
    );
  }

  return (
    <div style={baseStyle}>
      <span>{formatDateKeyLong(rangeStart!)}</span>
      <span style={{ color: COLORS.onSurfaceVariant }} aria-hidden>
        →
      </span>
      <span>{formatDateKeyLong(rangeEnd!)}</span>
    </div>
  );
}

function SidebarRoster({
  selectedArtists,
  onToggle,
  interactiveMode,
  onAnyInteraction,
  artistRowRefCallback,
}: {
  selectedArtists: Set<ArtistId>;
  onToggle: (id: ArtistId) => void;
  interactiveMode: boolean;
  onAnyInteraction: () => void;
  artistRowRefCallback?: (id: ArtistId, el: HTMLElement | null) => void;
}) {
  return (
    <div>
      <span
        style={{
          display: "block",
          fontFamily: FONTS.display,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: COLORS.onSurfaceVariant,
          marginBottom: 10,
          paddingLeft: 16,
        }}
      >
        Roster
      </span>
      <div
        style={{
          background: COLORS.surfaceLowest,
          padding: "6px 12px",
          border: `4px solid rgba(208, 198, 171, 0.12)`,
          maxHeight: 360,
          overflowY: "auto",
        }}
      >
        {ARTISTS.map((a) => {
          const checked = selectedArtists.has(a.id as ArtistId);
          return (
            <button
              key={a.id}
              ref={(el) => artistRowRefCallback?.(a.id as ArtistId, el)}
              type="button"
              onClick={() => {
                onAnyInteraction();
                if (interactiveMode) onToggle(a.id as ArtistId);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 6px",
                width: "100%",
                border: "none",
                background: checked ? "rgba(252, 212, 0, 0.18)" : "transparent",
                color: COLORS.onSurface,
                fontFamily: FONTS.body,
                fontSize: 12,
                cursor: interactiveMode ? "pointer" : "default",
                transition: "background 180ms ease",
              }}
            >
              <span
                aria-hidden
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 14,
                  height: 14,
                  border: `2px solid ${checked ? COLORS.onSurface : COLORS.outlineVariant}`,
                  background: checked ? COLORS.onSurface : "transparent",
                  color: "#fff",
                  fontSize: 10,
                }}
              >
                {checked ? "✓" : ""}
              </span>
              <span style={{ textAlign: "left", flex: 1 }}>{a.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PageHead({
  onNewBookingClick,
  interactiveMode,
}: {
  onNewBookingClick: () => void;
  interactiveMode: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <h2
        style={{
          margin: 0,
          fontFamily: FONTS.display,
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: COLORS.onSurface,
        }}
      >
        Booking
      </h2>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          type="button"
          style={{
            padding: "10px 18px",
            border: `2px solid ${COLORS.outlineVariant}`,
            background: "transparent",
            color: COLORS.onSurface,
            fontFamily: FONTS.display,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: interactiveMode ? "pointer" : "default",
          }}
        >
          Export CSV
        </button>
        <button
          type="button"
          onClick={onNewBookingClick}
          style={{
            padding: "10px 18px",
            border: "none",
            background: COLORS.onSurface,
            color: COLORS.surfaceLowest,
            fontFamily: FONTS.display,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: interactiveMode ? "pointer" : "default",
          }}
        >
          + New booking
        </button>
      </div>
    </div>
  );
}

function MetricsRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
      <DailyTasksCard />
      <MetricCard
        label="Leftover tasks"
        value="3"
        bg={COLORS.secondaryContainer}
        labelColor={COLORS.onSecondaryContainer}
        valueColor={COLORS.onSecondaryContainer}
        iconColor="#705d00"
        icon={<WarningTriangleIcon />}
      />
      <MetricCard
        label="Today's gigs"
        value="5"
        bg={COLORS.surfaceLowest}
        labelColor={COLORS.onSurfaceVariant}
        valueColor={COLORS.onSurface}
        iconColor={COLORS.outlineVariant}
        icon={<CalendarIcon />}
      />
      <MetricCard
        label="Monthly revenue"
        value="$24.2K"
        bg={COLORS.surfaceLowest}
        labelColor={COLORS.onSurfaceVariant}
        valueColor={COLORS.onSurface}
        iconColor={COLORS.outlineVariant}
        icon={<CashIcon />}
      />
    </div>
  );
}

function DailyTasksCard() {
  const pct = 88;
  const circumference = 2 * Math.PI * 42;
  const dash = (pct / 100) * circumference;
  return (
    <div
      style={{
        background: COLORS.surfaceLowest,
        padding: 20,
        border: `4px solid rgba(208, 198, 171, 0.12)`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        minHeight: 140,
      }}
    >
      <div style={{ flex: 1 }}>
        <span
          style={{
            display: "block",
            fontFamily: FONTS.display,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: COLORS.onSurfaceVariant,
            marginBottom: 8,
          }}
        >
          Daily tasks
        </span>
        <span
          style={{
            display: "block",
            fontFamily: FONTS.display,
            fontSize: 38,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: COLORS.onSurface,
            lineHeight: 1,
          }}
        >
          88%
        </span>
        <span
          style={{
            display: "block",
            fontSize: 11,
            color: COLORS.onSurfaceVariant,
            marginTop: 6,
          }}
        >
          on track
        </span>
      </div>
      <svg width="72" height="72" viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
        <circle cx="50" cy="50" r="42" fill="none" stroke={COLORS.donutGreenRing} strokeWidth="14" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={COLORS.donutGreenFill}
          strokeWidth="14"
          strokeDasharray={`${dash.toFixed(2)} ${circumference.toFixed(2)}`}
          strokeLinecap="butt"
          transform="rotate(-90 50 50)"
        />
      </svg>
    </div>
  );
}

function MetricCard({
  label,
  value,
  bg,
  labelColor,
  valueColor,
  iconColor,
  icon,
}: {
  label: string;
  value: string;
  bg: string;
  labelColor: string;
  valueColor: string;
  iconColor: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: bg,
        padding: 20,
        border: `4px solid rgba(208, 198, 171, 0.12)`,
        minHeight: 140,
      }}
    >
      <span
        style={{
          display: "block",
          fontFamily: FONTS.display,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: labelColor,
          marginBottom: 8,
        }}
      >
        {label}
      </span>
      <span
        style={{
          display: "block",
          fontFamily: FONTS.display,
          fontSize: 38,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: valueColor,
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: -18,
          top: "50%",
          transform: "translateY(-50%)",
          opacity: bg === COLORS.secondaryContainer ? 0.32 : 0.18,
          color: iconColor,
        }}
      >
        {icon}
      </div>
    </div>
  );
}

function WarningTriangleIcon() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      <path
        d="M45 10L82 76H8L45 10Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M45 38V54" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="45" cy="64" r="3" fill="currentColor" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      <rect x="10" y="18" width="70" height="60" rx="4" stroke="currentColor" strokeWidth="4" />
      <path d="M10 36H80" stroke="currentColor" strokeWidth="4" />
      <path d="M24 8V26M66 8V26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg width="92" height="90" viewBox="0 0 92 90" fill="none">
      <rect x="8" y="20" width="76" height="50" rx="4" stroke="currentColor" strokeWidth="4" />
      <circle cx="46" cy="45" r="10" stroke="currentColor" strokeWidth="4" />
      <circle cx="18" cy="32" r="3" fill="currentColor" />
      <circle cx="74" cy="58" r="3" fill="currentColor" />
    </svg>
  );
}

// Resolve a booking for a specific date, or null if none on that date.
function bookingOn(artist: ArtistId, d: DateKey): Booking | null {
  return BOOKINGS[artist].find((b) => b.monthIdx === d.monthIdx && b.day === d.day) ?? null;
}

// Fallback when no date is selected: surface the artist's first booking
// in the currently-viewed month so the table isn't empty.
function firstBookingInMonth(artist: ArtistId, monthIdx: 0 | 1 | 2): Booking | null {
  return BOOKINGS[artist].find((b) => b.monthIdx === monthIdx) ?? null;
}

interface TableRow {
  artistId: ArtistId;
  artistName: string;
  showArtistName: boolean;
  dateKey: DateKey | null;
  booking: Booking | null;
}

function buildTableRows(
  selectedMonthIdx: 0 | 1 | 2,
  rangeStart: DateKey | null,
  rangeEnd: DateKey | null,
  selectedArtistIds: Set<ArtistId>,
): TableRow[] {
  const artistList = ARTISTS.filter((a) => selectedArtistIds.has(a.id as ArtistId));
  const out: TableRow[] = [];

  // Range mode: one row per (artist, date-in-range), grouped by artist.
  if (rangeStart && rangeEnd && compareDateKeys(rangeStart, rangeEnd) !== 0) {
    const dates = iterateDateRange(rangeStart, rangeEnd);
    for (const artist of artistList) {
      let first = true;
      for (const dateKey of dates) {
        out.push({
          artistId: artist.id as ArtistId,
          artistName: artist.name,
          showArtistName: first,
          dateKey,
          booking: bookingOn(artist.id as ArtistId, dateKey),
        });
        first = false;
      }
    }
    return out;
  }

  // Single-date mode (start set, no end / equal dates).
  if (rangeStart) {
    for (const artist of artistList) {
      out.push({
        artistId: artist.id as ArtistId,
        artistName: artist.name,
        showArtistName: true,
        dateKey: rangeStart,
        booking: bookingOn(artist.id as ArtistId, rangeStart),
      });
    }
    return out;
  }

  // No selection: fall back to each artist's first booking in the current
  // month so the table still has something useful.
  for (const artist of artistList) {
    const b = firstBookingInMonth(artist.id as ArtistId, selectedMonthIdx);
    out.push({
      artistId: artist.id as ArtistId,
      artistName: artist.name,
      showArtistName: true,
      dateKey: b ? { monthIdx: b.monthIdx, day: b.day } : null,
      booking: b,
    });
  }
  return out;
}

function BookingsTable({
  selectedMonthIdx,
  rangeStart,
  rangeEnd,
  selectedArtists,
}: {
  selectedMonthIdx: 0 | 1 | 2;
  rangeStart: DateKey | null;
  rangeEnd: DateKey | null;
  selectedArtists: Set<ArtistId>;
}) {
  const hasSelection = selectedArtists.size > 0;
  const rows = buildTableRows(selectedMonthIdx, rangeStart, rangeEnd, selectedArtists);

  return (
    <div
      style={{
        background: COLORS.surfaceLowest,
        border: `4px solid rgba(208, 198, 171, 0.12)`,
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.7fr 1.3fr 0.8fr 0.8fr 0.8fr",
          padding: "14px 20px",
          fontFamily: FONTS.display,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: COLORS.onSurfaceVariant,
          borderBottom: `4px solid rgba(208, 198, 171, 0.12)`,
        }}
      >
        <span>Artist</span>
        <span>Date</span>
        <span>Venue</span>
        <span>Type</span>
        <span>Status</span>
        <span>Readiness</span>
      </div>

      {!hasSelection && (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.onSurfaceVariant,
            fontSize: 13,
            padding: 40,
          }}
        >
          No artists selected — pick one from the roster.
        </div>
      )}

      {hasSelection && (
        <div style={{ overflowY: "auto" }}>
          {rows.map((row, i) => (
            <BookingRow key={`${row.artistId}-${i}`} row={row} />
          ))}
        </div>
      )}
    </div>
  );
}

function BookingRow({ row }: { row: TableRow }) {
  const { artistName, showArtistName, dateKey, booking } = row;

  // "Available" row: artist has no booking on the queried date.
  if (!booking) {
    const contextDate = dateKey ? formatDateKeyShort(dateKey) : "—";
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.7fr 1.3fr 0.8fr 0.8fr 0.8fr",
          padding: "14px 20px",
          alignItems: "center",
          fontSize: 13,
          color: COLORS.onSurface,
          borderBottom: `1px solid rgba(208, 198, 171, 0.18)`,
        }}
      >
        <span style={{ fontFamily: FONTS.display, fontSize: 12, fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase" }}>
          {showArtistName ? artistName : ""}
        </span>
        <span style={{ color: COLORS.onSurfaceVariant }}>{contextDate}</span>
        <span style={{ color: COLORS.onSurfaceVariant }}>—</span>
        <span style={{ fontSize: 11, color: COLORS.onSurfaceVariant }}>—</span>
        <span style={{ color: COLORS.onSurface }}>Available</span>
        <ReadinessBar readiness={0} />
      </div>
    );
  }

  const dateLabel = formatDateKeyShort({ monthIdx: booking.monthIdx, day: booking.day });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 0.7fr 1.3fr 0.8fr 0.8fr 0.8fr",
        padding: "14px 20px",
        alignItems: "center",
        fontSize: 13,
        color: COLORS.onSurface,
        borderBottom: `1px solid rgba(208, 198, 171, 0.18)`,
      }}
    >
      <span style={{ fontFamily: FONTS.display, fontSize: 12, fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase" }}>
        {showArtistName ? artistName : ""}
      </span>
      <span>{dateLabel}</span>
      <span>
        <span style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 13, letterSpacing: "0.02em", textTransform: "uppercase" }}>
          {booking.venue}
        </span>
        <br />
        <span style={{ fontSize: 11, color: COLORS.onSurfaceVariant }}>{booking.city}</span>
      </span>
      <span style={{ fontSize: 11, color: COLORS.onSurfaceVariant }}>{booking.type}</span>
      <StatusPill status={booking.status} />
      <ReadinessBar readiness={booking.readiness} />
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; fg: string; label: string }> = {
    confirmed: { bg: COLORS.statusConfirmedBg, fg: COLORS.statusConfirmedFg, label: "Confirmed" },
    hold: { bg: COLORS.statusHoldBg, fg: COLORS.statusHoldFg, label: "Hold" },
    offer: { bg: COLORS.statusOfferBg, fg: COLORS.statusOfferFg, label: "Offer" },
    serious: { bg: COLORS.statusSeriousBg, fg: COLORS.statusSeriousFg, label: "Serious" },
    interest: { bg: COLORS.statusInterestBg, fg: COLORS.statusInterestFg, label: "Interest" },
    needfill: { bg: COLORS.statusNeedfillBg, fg: COLORS.statusNeedfillFg, label: "Need to fill" },
  };
  const s = map[status] ?? map.interest;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        background: s.bg,
        color: s.fg,
        fontFamily: FONTS.display,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        width: "fit-content",
      }}
    >
      {s.label}
    </span>
  );
}

function ReadinessBar({ readiness }: { readiness: number }) {
  const pct = Math.max(0, Math.min(100, readiness));
  return (
    <div style={{ width: 120 }}>
      <div
        style={{
          height: 4,
          background: "rgba(208, 198, 171, 0.3)",
          position: "relative",
        }}
      >
        {pct > 0 && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${pct}%`,
              background: COLORS.onSurfaceVariant,
            }}
          />
        )}
      </div>
    </div>
  );
}
