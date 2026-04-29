"use client";

import { COLORS, FONTS } from "./reel/tokens";

interface Row {
  date: string;
  dateHighlight?: boolean;
  status: "confirmed" | "hold" | "offer" | "serious" | "needfill" | "interest";
  city: string | null;
  state: string | null;
  country: string | null;
  venue: string;
  gigType: string | null;
  artistConfig: string | null;
  readinessPct: number;
  readinessLabel: string;
  readinessColor: "green" | "yellow" | "red" | "gray";
}

const ROWS: Row[] = [
  { date: "Mon Feb 23", status: "confirmed", city: "San Francisco", state: "CA", country: "US", venue: "The Fillmore", gigType: "Four-piece", artistConfig: "Headliner", readinessPct: 100, readinessLabel: "Ready", readinessColor: "green" },
  { date: "Wed Feb 25", status: "confirmed", city: "Memphis", state: "TN", country: "US", venue: "Orpheum Theatre", gigType: "Three-piece", artistConfig: "Headliner", readinessPct: 65, readinessLabel: "4 left", readinessColor: "yellow" },
  { date: "Sun Mar 1", dateHighlight: true, status: "hold", city: "Atlanta", state: "GA", country: "US", venue: "Fox Theatre", gigType: "Four-piece", artistConfig: "Co-headline", readinessPct: 50, readinessLabel: "6 left", readinessColor: "red" },
  { date: "Thu Mar 5", status: "offer", city: "Chicago", state: "IL", country: "US", venue: "Silverline Arena", gigType: "Three-piece", artistConfig: "Support", readinessPct: 25, readinessLabel: "9 left", readinessColor: "gray" },
  { date: "Sat Mar 8", status: "needfill", city: null, state: null, country: null, venue: "Open date", gigType: null, artistConfig: null, readinessPct: 8, readinessLabel: "11 left", readinessColor: "red" },
  { date: "Fri Mar 13", status: "serious", city: "Detroit", state: "MI", country: "US", venue: "Warehouse 7", gigType: "Singer-SW", artistConfig: "Headliner", readinessPct: 42, readinessLabel: "7 left", readinessColor: "yellow" },
  { date: "Wed Mar 18", status: "confirmed", city: "Los Angeles", state: "CA", country: "US", venue: "The Blue Note", gigType: "Four-piece", artistConfig: "Headliner", readinessPct: 100, readinessLabel: "Ready", readinessColor: "green" },
  { date: "Sun Mar 22", status: "interest", city: "Milwaukee", state: "WI", country: "US", venue: "Turner Hall", gigType: "Four-piece", artistConfig: "Support", readinessPct: 83, readinessLabel: "10 left", readinessColor: "gray" },
];

const STATUS_STYLES: Record<Row["status"], { bg: string; fg: string; label: string }> = {
  confirmed: { bg: COLORS.statusConfirmedBg, fg: COLORS.statusConfirmedFg, label: "Confirmed" },
  hold: { bg: COLORS.statusHoldBg, fg: COLORS.statusHoldFg, label: "Hold" },
  offer: { bg: COLORS.statusOfferBg, fg: COLORS.statusOfferFg, label: "Offer" },
  serious: { bg: COLORS.statusSeriousBg, fg: COLORS.statusSeriousFg, label: "Serious" },
  needfill: { bg: COLORS.statusNeedfillBg, fg: COLORS.statusNeedfillFg, label: "Need to Fill" },
  interest: { bg: COLORS.statusInterestBg, fg: COLORS.statusInterestFg, label: "Interest" },
};

const BAR_COLOR: Record<Row["readinessColor"], string> = {
  green: COLORS.confirmed,
  yellow: COLORS.urgencyYellow,
  red: COLORS.urgencyRed,
  gray: COLORS.urgencyGray,
};

const READINESS_LABEL_COLOR: Record<Row["readinessColor"], string> = {
  green: COLORS.confirmed,
  yellow: "#854F0B",
  red: COLORS.urgencyRed,
  gray: COLORS.outline,
};

export function YonasMvpTable() {
  return (
    <div
      className="w-full overflow-hidden rounded-md"
      style={{
        fontFamily: FONTS.display,
        background: "#f9f9f9",
        border: `0.5px solid ${COLORS.outlineVariant}`,
      }}
    >
      <TopNav />
      <div style={{ padding: "20px 24px" }}>
        <FilterBar />
        <div
          className="mt-[14px] overflow-hidden"
          style={{
            background: "#ffffff",
            borderRadius: 6,
            border: `1.5px solid rgba(208,198,171,0.2)`,
          }}
        >
          <Table />
        </div>
      </div>
    </div>
  );
}

function TopNav() {
  return (
    <nav
      className="flex items-center"
      style={{
        background: COLORS.onSurface,
        padding: "0 20px",
        height: 44,
        gap: 24,
      }}
    >
      <span
        style={{
          color: COLORS.secondaryContainer,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
        }}
      >
        Yonas Media
      </span>
      <div className="flex" style={{ gap: 20, flex: 1 }}>
        {["Booking Doc", "Contract", "Ticket Counts", "Upcoming Shows", "Admin"].map((l, i) => (
          <span
            key={l}
            style={{
              color: i === 0 ? COLORS.secondaryContainer : "rgba(255,255,255,0.45)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              paddingBottom: 2,
              borderBottom: `2px solid ${i === 0 ? COLORS.secondaryContainer : "transparent"}`,
            }}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="flex items-center" style={{ gap: 8, marginLeft: "auto" }}>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 500 }}>
          ernestleeson
        </span>
        <div
          className="flex items-center justify-center"
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: COLORS.secondaryContainer,
            fontSize: 10,
            fontWeight: 700,
            color: COLORS.onSurface,
          }}
        >
          EL
        </div>
      </div>
    </nav>
  );
}

function FilterBar() {
  return (
    <div
      className="flex items-center"
      style={{
        background: "#fff",
        border: `1.5px solid rgba(208,198,171,0.25)`,
        borderRadius: 6,
        padding: "12px 16px",
        gap: 12,
      }}
    >
      <FilterGroup label="Artist" value="Los Rakas" />
      <FilterGroup label="Status" value="All Statuses" />
      <button
        style={{
          fontFamily: FONTS.display,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.05em",
          background: "transparent",
          border: `1.5px solid rgba(208,198,171,0.4)`,
          borderRadius: 4,
          padding: "5px 12px",
          color: COLORS.onSurfaceVariant,
          marginLeft: "auto",
          cursor: "default",
        }}
      >
        ⌗ Jump to Date
      </button>
      <button
        style={{
          fontFamily: FONTS.display,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.05em",
          background: COLORS.secondaryContainer,
          border: "none",
          borderRadius: 4,
          padding: "6px 14px",
          color: COLORS.onSurface,
          cursor: "default",
        }}
      >
        + Add Venue
      </button>
    </div>
  );
}

function FilterGroup({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center" style={{ gap: 8 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: COLORS.outline,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: FONTS.display,
          fontSize: 12,
          fontWeight: 500,
          color: COLORS.onSurface,
          background: "#f9f9f9",
          border: `1.5px solid rgba(208,198,171,0.4)`,
          borderRadius: 4,
          padding: "5px 10px",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function Table() {
  const headerStyle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "10px 14px",
    background: COLORS.onSurface,
    color: "#fff",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    textAlign: "left",
  };

  const cellStyle: React.CSSProperties = {
    fontSize: 12,
    color: COLORS.onSurface,
    padding: "10px 14px",
    borderBottom: `0.5px solid rgba(208,198,171,0.15)`,
    verticalAlign: "middle",
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
      <colgroup>
        <col style={{ width: "12%" }} />
        <col style={{ width: "11%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "6%" }} />
        <col style={{ width: "7%" }} />
        <col style={{ width: "18%" }} />
        <col style={{ width: "11%" }} />
        <col style={{ width: "11%" }} />
        <col style={{ width: "14%" }} />
      </colgroup>
      <thead>
        <tr>
          <th style={headerStyle}>Date (2026)</th>
          <th style={headerStyle}>Status</th>
          <th style={headerStyle}>City</th>
          <th style={headerStyle}>State</th>
          <th style={headerStyle}>Country</th>
          <th style={headerStyle}>Venue</th>
          <th style={headerStyle}>Gig Type</th>
          <th style={headerStyle}>Artist Config</th>
          <th style={headerStyle}>Readiness</th>
        </tr>
      </thead>
      <tbody>
        {ROWS.map((row, i) => {
          const status = STATUS_STYLES[row.status];
          const bg = i % 2 === 1 ? "rgba(249,249,249,0.7)" : "transparent";
          const missing = row.city === null;
          const subtleFg = "#888780";
          const mutedFg = "#b4b2a9";
          return (
            <tr key={i}>
              <td
                style={{
                  ...cellStyle,
                  background: bg,
                  fontWeight: row.dateHighlight ? 600 : 500,
                  color: row.dateHighlight ? COLORS.confirmed : COLORS.onSurface,
                }}
              >
                {row.date}
              </td>
              <td style={{ ...cellStyle, background: bg }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: 3,
                    background: status.bg,
                    color: status.fg,
                  }}
                >
                  {status.label}
                </span>
              </td>
              <td style={{ ...cellStyle, background: bg, fontSize: 11, color: missing ? mutedFg : subtleFg }}>
                {row.city ?? "\u2014"}
              </td>
              <td style={{ ...cellStyle, background: bg, fontSize: 11, color: missing ? mutedFg : subtleFg }}>
                {row.state ?? "\u2014"}
              </td>
              <td style={{ ...cellStyle, background: bg, fontSize: 11, color: missing ? mutedFg : subtleFg }}>
                {row.country ?? "\u2014"}
              </td>
              <td style={{ ...cellStyle, background: bg }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                    color: missing ? mutedFg : COLORS.onSurface,
                  }}
                >
                  {row.venue}
                </div>
              </td>
              <td style={{ ...cellStyle, background: bg, fontSize: 11, color: missing ? mutedFg : COLORS.onSurface }}>
                {row.gigType ?? "\u2014"}
              </td>
              <td style={{ ...cellStyle, background: bg, fontSize: 11, color: missing ? mutedFg : COLORS.onSurface }}>
                {row.artistConfig ?? "\u2014"}
              </td>
              <td style={{ ...cellStyle, background: bg }}>
                <div className="flex items-center" style={{ gap: 8 }}>
                  <div
                    style={{
                      flex: 1,
                      height: 4,
                      background: "#e8e8e8",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${row.readinessPct}%`,
                        background: BAR_COLOR[row.readinessColor],
                        borderRadius: 2,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: READINESS_LABEL_COLOR[row.readinessColor],
                      minWidth: 28,
                      textAlign: "right",
                    }}
                  >
                    {row.readinessLabel}
                  </span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
