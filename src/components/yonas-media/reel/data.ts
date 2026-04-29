// Data for the Yonas Media hero reel.
// Months, artists, bookings, Beat 1 email body, Beat 2 procedural sheet filler.

export const MONTHS = [
  { name: "January 2027", firstDayOfWeek: 5, daysInMonth: 31 },
  { name: "February 2027", firstDayOfWeek: 1, daysInMonth: 28 },
  { name: "March 2027", firstDayOfWeek: 1, daysInMonth: 31 },
] as const;

export const ARTISTS = [
  { id: "cora", name: "Cora Lane" },
  { id: "jonah", name: "Jonah Ellery" },
  { id: "marcel", name: "The Marcel Trio" },
  { id: "lila", name: "Lila Moreno" },
  { id: "river", name: "River North" },
  { id: "juno", name: "Juno Waverly" },
  { id: "sable", name: "Sable Greene" },
  { id: "otis", name: "Otis Rowan" },
  { id: "marigold", name: "Marigold Fox" },
  { id: "theo", name: "Theo Calder" },
  { id: "nina", name: "Nina Abrams" },
  { id: "finn", name: "Finn Halloway" },
  { id: "ivy", name: "Ivy Rockwell" },
  { id: "hollis", name: "Hollis Day" },
  { id: "dune", name: "Dune & the Signal" },
] as const;

export type ArtistId = (typeof ARTISTS)[number]["id"];

export type BookingStatus =
  | "confirmed"
  | "hold"
  | "offer"
  | "serious"
  | "interest"
  | "needfill";

export interface Booking {
  monthIdx: 0 | 1 | 2;
  day: number;
  venue: string;
  city: string;
  type: string;
  status: BookingStatus;
  // Readiness toward the gig, 0–100. Everyone is ~a year out, so values
  // are intentionally low across the board. Render as a dark-gray bar
  // with no text label.
  readiness: number;
}

// Each artist has a handful of bookings spread across Jan/Feb/Mar 2027 so
// the interactive prototype has something to react to on arbitrary dates.
// Lila Moreno intentionally has no booking on March 1 — that's the "open
// night" answer at the end of the reel.
export const BOOKINGS: Record<ArtistId, Booking[]> = {
  cora: [
    { monthIdx: 0, day: 22, venue: "Lincoln Hall", city: "Chicago IL", type: "four-piece", status: "confirmed", readiness: 35 },
    { monthIdx: 1, day: 14, venue: "9:30 Club", city: "Washington DC", type: "four-piece", status: "hold", readiness: 10 },
    { monthIdx: 2, day: 1, venue: "Town Hall", city: "New York NY", type: "four-piece", status: "confirmed", readiness: 25 },
  ],
  jonah: [
    { monthIdx: 0, day: 10, venue: "The Basement", city: "Nashville TN", type: "three-piece", status: "confirmed", readiness: 30 },
    { monthIdx: 1, day: 20, venue: "3rd & Lindsley", city: "Nashville TN", type: "three-piece", status: "hold", readiness: 8 },
    { monthIdx: 2, day: 1, venue: "Orpheum", city: "Memphis TN", type: "three-piece", status: "confirmed", readiness: 20 },
  ],
  marcel: [
    { monthIdx: 0, day: 18, venue: "Ogden Theatre", city: "Denver CO", type: "four-piece", status: "offer", readiness: 12 },
    { monthIdx: 1, day: 5, venue: "Variety Playhouse", city: "Atlanta GA", type: "four-piece", status: "confirmed", readiness: 28 },
    { monthIdx: 2, day: 1, venue: "Fox Theatre", city: "Atlanta GA", type: "four-piece", status: "hold", readiness: 5 },
  ],
  lila: [
    // Intentionally no March 1 — Lila is the "open night" answer at the end.
    { monthIdx: 0, day: 8, venue: "Cafe du Nord", city: "San Francisco CA", type: "singer songwriter", status: "offer", readiness: 15 },
    { monthIdx: 1, day: 20, venue: "Bootleg Theater", city: "Los Angeles CA", type: "singer songwriter", status: "confirmed", readiness: 30 },
  ],
  river: [
    { monthIdx: 0, day: 15, venue: "Metro", city: "Chicago IL", type: "three-piece", status: "confirmed", readiness: 32 },
    { monthIdx: 1, day: 24, venue: "Riviera Theatre", city: "Chicago IL", type: "three-piece", status: "hold", readiness: 7 },
    { monthIdx: 2, day: 5, venue: "Silverline Arena", city: "Chicago IL", type: "three-piece", status: "confirmed", readiness: 40 },
  ],
  juno: [
    { monthIdx: 0, day: 12, venue: "Warehouse 7", city: "Detroit MI", type: "singer songwriter", status: "confirmed", readiness: 22 },
    { monthIdx: 1, day: 28, venue: "Magic Bag", city: "Detroit MI", type: "singer songwriter", status: "hold", readiness: 6 },
    { monthIdx: 2, day: 2, venue: "El Club", city: "Detroit MI", type: "singer songwriter", status: "serious", readiness: 8 },
  ],
  sable: [
    { monthIdx: 0, day: 25, venue: "Hollywood Forever", city: "Los Angeles CA", type: "four-piece", status: "offer", readiness: 14 },
    { monthIdx: 1, day: 2, venue: "Teragram Ballroom", city: "Los Angeles CA", type: "four-piece", status: "confirmed", readiness: 38 },
    { monthIdx: 2, day: 8, venue: "The Blue Note", city: "Los Angeles CA", type: "four-piece", status: "confirmed", readiness: 25 },
  ],
  otis: [
    { monthIdx: 0, day: 28, venue: "Showbox", city: "Seattle WA", type: "three-piece", status: "confirmed", readiness: 30 },
    { monthIdx: 1, day: 18, venue: "Neptune Theatre", city: "Seattle WA", type: "three-piece", status: "hold", readiness: 9 },
    { monthIdx: 2, day: 10, venue: "Paramount Theater", city: "Seattle WA", type: "festival", status: "confirmed", readiness: 42 },
  ],
  marigold: [
    { monthIdx: 0, day: 5, venue: "Union Transfer", city: "Philadelphia PA", type: "three-piece", status: "offer", readiness: 10 },
    { monthIdx: 1, day: 10, venue: "Johnny Brenda's", city: "Philadelphia PA", type: "three-piece", status: "confirmed", readiness: 27 },
    { monthIdx: 2, day: 12, venue: "The Foundry", city: "Philadelphia PA", type: "three-piece", status: "serious", readiness: 6 },
  ],
  theo: [
    { monthIdx: 0, day: 11, venue: "Gothic Theatre", city: "Denver CO", type: "four-piece", status: "confirmed", readiness: 24 },
    { monthIdx: 1, day: 22, venue: "Bluebird Theater", city: "Denver CO", type: "four-piece", status: "hold", readiness: 8 },
    { monthIdx: 2, day: 14, venue: "Zion Dome", city: "Denver CO", type: "four-piece", status: "confirmed", readiness: 36 },
  ],
  nina: [
    { monthIdx: 0, day: 7, venue: "Exit/In", city: "Nashville TN", type: "singer songwriter", status: "confirmed", readiness: 22 },
    { monthIdx: 1, day: 13, venue: "Mercy Lounge", city: "Nashville TN", type: "singer songwriter", status: "offer", readiness: 12 },
    { monthIdx: 2, day: 16, venue: "The Basement", city: "Nashville TN", type: "singer songwriter", status: "interest", readiness: 4 },
  ],
  finn: [
    { monthIdx: 0, day: 20, venue: "Music Hall of Williamsburg", city: "New York NY", type: "three-piece", status: "hold", readiness: 7 },
    { monthIdx: 1, day: 7, venue: "Bowery Ballroom", city: "New York NY", type: "three-piece", status: "confirmed", readiness: 33 },
    { monthIdx: 2, day: 18, venue: "Mercury Lounge", city: "New York NY", type: "three-piece", status: "confirmed", readiness: 28 },
  ],
  ivy: [
    { monthIdx: 0, day: 9, venue: "Crocodile", city: "Seattle WA", type: "singer songwriter", status: "hold", readiness: 5 },
    { monthIdx: 1, day: 16, venue: "Tractor Tavern", city: "Seattle WA", type: "singer songwriter", status: "confirmed", readiness: 26 },
    { monthIdx: 2, day: 20, venue: "Neumos", city: "Seattle WA", type: "singer songwriter", status: "offer", readiness: 13 },
  ],
  hollis: [
    { monthIdx: 0, day: 26, venue: "Cactus Club", city: "Milwaukee WI", type: "four-piece", status: "confirmed", readiness: 30 },
    { monthIdx: 1, day: 4, venue: "The Rave", city: "Milwaukee WI", type: "four-piece", status: "hold", readiness: 6 },
    { monthIdx: 2, day: 22, venue: "Turner Hall", city: "Milwaukee WI", type: "four-piece", status: "needfill", readiness: 3 },
  ],
  dune: [
    { monthIdx: 0, day: 14, venue: "Subterranean", city: "Chicago IL", type: "festival", status: "offer", readiness: 11 },
    { monthIdx: 1, day: 12, venue: "House of Blues", city: "Chicago IL", type: "festival", status: "confirmed", readiness: 38 },
    { monthIdx: 2, day: 28, venue: "Thalia Hall", city: "Chicago IL", type: "festival", status: "confirmed", readiness: 45 },
  ],
};

// Beat 2 sheet rows — procedural filler per artist seed.
// Generates rows spanning January, February, and March 2027 so the fast-scroll
// reads as sweeping across months to land on March 1.
export interface SheetRow {
  monthIdx: number;
  day: number;
  dateLabel: string;
  status: string;
  venue: string;
  isFocal?: boolean;
}

const SHEET_MONTHS = [
  { idx: 0, name: "Jan", days: 31 },
  { idx: 1, name: "Feb", days: 28 },
  { idx: 2, name: "Mar", days: 31 },
];

export function buildOldWaySheetData(
  artistSeed: number,
  focal?: { venue: string; verdict: "confirmed" | "hold" },
): SheetRow[] {
  const filler = ["Town Hall", "Orpheum", "Fox Theatre", "The Blue Note", "Warehouse 7"];
  const offerFiller = ["Mercury Lounge", "Neumos", "Silverline", "Paramount"];
  const rows: SheetRow[] = [];

  for (const m of SHEET_MONTHS) {
    for (let d = 1; d <= m.days; d++) {
      const isFocal = m.idx === 2 && d === 1;
      if (isFocal && focal) {
        rows.push({
          monthIdx: m.idx,
          day: d,
          dateLabel: `${m.idx + 1}/${d}/27`,
          status: focal.verdict === "confirmed" ? "CONFIRMED" : "HOLD",
          venue: focal.venue,
          isFocal: true,
        });
        continue;
      }
      const seedVal = (d + m.idx * 7 + artistSeed) % 5;
      let status = "";
      let venue = "";
      if (seedVal === 0) {
        status = "CONFIRMED";
        venue = filler[(d + m.idx) % filler.length];
      } else if (seedVal === 1) {
        status = "HOLD";
      } else if (seedVal === 2) {
        status = "OFFER";
        venue = offerFiller[d % offerFiller.length];
      }
      rows.push({
        monthIdx: m.idx,
        day: d,
        dateLabel: `${m.idx + 1}/${d}/27`,
        status,
        venue,
      });
    }
  }
  return rows;
}

// Index of the focal (March 1) row within the 90-row dataset.
export const SHEET_FOCAL_ROW_INDEX = 31 + 28; // Jan 31 rows + Feb 28 rows

// Beat 2 focal row: the March 1 entry for each artist, hand-authored to match the verdict.
export const BEAT2_FOCAL: Record<"cora" | "jonah" | "marcel", { venue: string; verdict: "confirmed" | "hold" }> = {
  cora: { venue: "Town Hall", verdict: "confirmed" },
  jonah: { venue: "Orpheum", verdict: "confirmed" },
  marcel: { venue: "Fox Theatre", verdict: "hold" },
};

// Beat 2 artist tab order + seeds (different seeds so sheets don't look identical).
export const BEAT2_TABS = [
  { id: "cora", name: "Cora Lane", seed: 0 },
  { id: "jonah", name: "Jonah Ellery", seed: 2 },
  { id: "marcel", name: "The Marcel Trio", seed: 5 },
] as const;

// Calendar date helpers. Beat 3 supports a single date OR a date range.
// A DateKey identifies a day in the three-month window by month index + day.
export interface DateKey {
  monthIdx: 0 | 1 | 2;
  day: number;
}

export function compareDateKeys(a: DateKey, b: DateKey): number {
  if (a.monthIdx !== b.monthIdx) return a.monthIdx - b.monthIdx;
  return a.day - b.day;
}

export function dateKeysEqual(a: DateKey | null, b: DateKey | null): boolean {
  if (!a || !b) return false;
  return a.monthIdx === b.monthIdx && a.day === b.day;
}

export function isDateInRange(d: DateKey, start: DateKey, end: DateKey): boolean {
  return compareDateKeys(d, start) >= 0 && compareDateKeys(d, end) <= 0;
}

export function iterateDateRange(start: DateKey, end: DateKey): DateKey[] {
  const days = [31, 28, 31];
  const out: DateKey[] = [];
  let cur: DateKey = { monthIdx: start.monthIdx, day: start.day };
  while (compareDateKeys(cur, end) <= 0) {
    out.push({ monthIdx: cur.monthIdx, day: cur.day });
    if (cur.day < days[cur.monthIdx]) {
      cur = { monthIdx: cur.monthIdx, day: cur.day + 1 };
    } else if (cur.monthIdx < 2) {
      cur = { monthIdx: (cur.monthIdx + 1) as 0 | 1 | 2, day: 1 };
    } else {
      break;
    }
  }
  return out;
}

const MONTH_SHORT = ["Jan", "Feb", "Mar"];
export function formatDateKeyLong(d: DateKey): string {
  return `${MONTH_SHORT[d.monthIdx]} ${d.day}, 2027`;
}

export function formatDateKeyShort(d: DateKey): string {
  return `${d.monthIdx + 1}/${d.day}/27`;
}

export const BEAT1_EMAIL = {
  senderName: "Dana Reyes",
  senderEmail: "dana@blueheronvenue.com",
  senderInitials: "DR",
  senderAvatarColor: "#8e44ad",
  to: "ben@yonasmedia.com",
  subject: "Booking inquiry — March 1, 2027",
  timestamp: "Mon, Feb 15, 2:47 PM",
  lines: [
    { text: "Hi Ben,", pauseAfter: 180 },
    { text: "", pauseAfter: 0 },
    {
      text: "Hope you're doing well! We've got an open slot at The Blue Heron on March 1, 2027 and would love to fill it with one of your artists. Is Cora Lane, Jonah Ellery, or The Marcel Trio available that night? Happy to send the full offer once we know who's free.",
      pauseAfter: 180,
    },
    { text: "", pauseAfter: 0 },
    { text: "Thanks,", pauseAfter: 80 },
    { text: "Dana", pauseAfter: 0 },
  ],
} as const;
