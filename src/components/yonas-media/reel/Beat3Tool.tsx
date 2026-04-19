"use client";

import React from "react";
import { MONTHS, ARTISTS, BOOKINGS, ArtistId } from "./data";
import { COLORS, FONTS, TIMING } from "./tokens";

export type BuildPiece = "nav" | "sidebar" | "head" | "metrics" | "table";

export interface Beat3ToolProps {
  placedPieces: Set<BuildPiece>;
  selectedMonthIdx: 0 | 1 | 2;
  selectedDay: number | null;
  selectedArtists: Set<ArtistId>;
  interactiveMode: boolean;
  onMonthChange: (delta: -1 | 1) => void;
  onDayClick: (day: number) => void;
  onArtistToggle: (id: ArtistId) => void;
  onAnyInteraction: () => void;
  showReplay: boolean;
  onReplay: () => void;
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
          selectedDay={props.selectedDay}
          onChangeMonth={props.onMonthChange}
          onDayClick={props.onDayClick}
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
        {props.showReplay && (
          <button
            type="button"
            onClick={props.onReplay}
            style={{
              position: "absolute",
              top: 24,
              right: 28,
              zIndex: 10,
              background: "transparent",
              border: `2px solid ${COLORS.outlineVariant}`,
              color: COLORS.onSurfaceVariant,
              fontFamily: FONTS.display,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "8px 14px",
              cursor: "pointer",
            }}
          >
            ↺ Replay
          </button>
        )}
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
            selectedDay={props.selectedDay}
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
  selectedDay,
  onChangeMonth,
  onDayClick,
  interactiveMode,
  onAnyInteraction,
  dayCellRefCallback,
  prevMonthArrowRef,
  nextMonthArrowRef,
}: {
  monthIdx: 0 | 1 | 2;
  selectedDay: number | null;
  onChangeMonth: (delta: -1 | 1) => void;
  onDayClick: (day: number) => void;
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

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
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
            const isSelected = day !== null && selectedDay === day && monthIdx === 2;
            return (
              <button
                key={i}
                ref={(el) => {
                  if (day !== null && monthIdx === 2) dayCellRefCallback?.(day, el);
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
                  background: isSelected ? COLORS.secondaryContainer : "transparent",
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
      </div>
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

function BookingsTable({
  selectedMonthIdx,
  selectedDay,
  selectedArtists,
}: {
  selectedMonthIdx: 0 | 1 | 2;
  selectedDay: number | null;
  selectedArtists: Set<ArtistId>;
}) {
  const rows = ARTISTS.filter((a) => selectedArtists.has(a.id as ArtistId)).flatMap((a) => {
    const b = BOOKINGS[a.id as ArtistId][0];
    return [{ artist: a, booking: b }];
  });

  const hasSelection = selectedArtists.size > 0;

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
          {rows.map(({ artist, booking }) => (
            <BookingRow
              key={artist.id}
              artistName={artist.name}
              booking={booking}
              selectedMonthIdx={selectedMonthIdx}
              selectedDay={selectedDay}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BookingRow({
  artistName,
  booking,
  selectedMonthIdx,
  selectedDay,
}: {
  artistName: string;
  booking: (typeof BOOKINGS)[ArtistId][number];
  selectedMonthIdx: 0 | 1 | 2;
  selectedDay: number | null;
}) {
  const dateLabel = `${booking.monthIdx + 1}/${booking.day}/26`;
  const daysToGig =
    selectedDay !== null && selectedMonthIdx === booking.monthIdx
      ? booking.day - selectedDay
      : 30;

  const urgency = getUrgency(daysToGig, booking.remaining, booking.status);

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
        {artistName}
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
      <ReadinessBar urgency={urgency} />
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
    available: { bg: COLORS.statusAvailableBg, fg: COLORS.statusAvailableFg, label: "Open night" },
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

function getUrgency(
  daysToGig: number,
  remaining: number,
  status: string,
): { bar: string; label: string; barWidth: number; labelText: string } {
  if (status === "available") {
    return { bar: COLORS.confirmed, label: COLORS.confirmed, barWidth: 100, labelText: "Open night" };
  }
  if (remaining === 0) {
    return { bar: COLORS.confirmed, label: COLORS.confirmed, barWidth: 100, labelText: "Ready" };
  }
  let bar = COLORS.urgencyGray;
  let label = COLORS.onSurfaceVariant;
  if (daysToGig <= 3) {
    bar = COLORS.urgencyRed;
    label = COLORS.urgencyRed;
  } else if (daysToGig <= 14) {
    bar = COLORS.urgencyYellow;
    label = "#854F0B";
  }
  return { bar, label, barWidth: Math.min(100, (remaining / 12) * 100), labelText: `${remaining} left` };
}

function ReadinessBar({ urgency }: { urgency: ReturnType<typeof getUrgency> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 120 }}>
      <div
        style={{
          height: 4,
          background: "rgba(208, 198, 171, 0.3)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${urgency.barWidth}%`,
            background: urgency.bar,
          }}
        />
      </div>
      <span style={{ fontSize: 10, color: urgency.label, fontFamily: FONTS.display, letterSpacing: "0.04em" }}>
        {urgency.labelText}
      </span>
    </div>
  );
}
