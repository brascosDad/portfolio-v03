// Data for the Yonas Media hero reel.
// Months, artists, bookings, Beat 1 email body, Beat 2 procedural sheet filler.

export const MONTHS = [
  { name: "January 2026", firstDayOfWeek: 4, daysInMonth: 31 },
  { name: "February 2026", firstDayOfWeek: 0, daysInMonth: 28 },
  { name: "March 2026", firstDayOfWeek: 0, daysInMonth: 31 },
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
  | "needfill"
  | "available";

export interface Booking {
  monthIdx: number;
  day: number;
  venue: string;
  city: string;
  type: string;
  status: BookingStatus;
  remaining: number;
}

export const BOOKINGS: Record<ArtistId, Booking[]> = {
  cora: [{ monthIdx: 2, day: 1, venue: "Town Hall", city: "New York NY", type: "four-piece", status: "confirmed", remaining: 2 }],
  jonah: [{ monthIdx: 2, day: 1, venue: "Orpheum", city: "Memphis TN", type: "three-piece", status: "confirmed", remaining: 1 }],
  marcel: [{ monthIdx: 2, day: 1, venue: "Fox Theatre", city: "Atlanta GA", type: "four-piece", status: "hold", remaining: 6 }],
  lila: [{ monthIdx: 2, day: 1, venue: "—", city: "—", type: "singer songwriter", status: "available", remaining: 0 }],
  river: [{ monthIdx: 2, day: 5, venue: "Silverline Arena", city: "Chicago IL", type: "three-piece", status: "confirmed", remaining: 3 }],
  juno: [{ monthIdx: 2, day: 2, venue: "Warehouse 7", city: "Detroit MI", type: "singer songwriter", status: "serious", remaining: 11 }],
  sable: [{ monthIdx: 2, day: 8, venue: "The Blue Note", city: "Los Angeles CA", type: "four-piece", status: "confirmed", remaining: 2 }],
  otis: [{ monthIdx: 2, day: 10, venue: "Paramount Theater", city: "Seattle WA", type: "festival", status: "confirmed", remaining: 4 }],
  marigold: [{ monthIdx: 2, day: 12, venue: "The Foundry", city: "Philadelphia PA", type: "three-piece", status: "serious", remaining: 7 }],
  theo: [{ monthIdx: 2, day: 14, venue: "Zion Dome", city: "Denver CO", type: "four-piece", status: "confirmed", remaining: 2 }],
  nina: [{ monthIdx: 2, day: 16, venue: "The Basement", city: "Nashville TN", type: "singer songwriter", status: "interest", remaining: 9 }],
  finn: [{ monthIdx: 2, day: 18, venue: "Mercury Lounge", city: "New York NY", type: "three-piece", status: "confirmed", remaining: 1 }],
  ivy: [{ monthIdx: 2, day: 20, venue: "Neumos", city: "Seattle WA", type: "singer songwriter", status: "offer", remaining: 5 }],
  hollis: [{ monthIdx: 2, day: 22, venue: "Turner Hall", city: "Milwaukee WI", type: "four-piece", status: "needfill", remaining: 10 }],
  dune: [{ monthIdx: 2, day: 28, venue: "Thalia Hall", city: "Chicago IL", type: "festival", status: "confirmed", remaining: 2 }],
};

// Beat 2 sheet rows — procedural filler per artist seed.
export interface SheetRow {
  day: number;
  status: string;
  venue: string;
}

export function buildOldWaySheetData(artistSeed: number): SheetRow[] {
  const filler = ["Town Hall", "Orpheum", "Fox Theatre", "The Blue Note", "Warehouse 7"];
  const offerFiller = ["Mercury Lounge", "Neumos", "Silverline", "Paramount"];
  const rows: SheetRow[] = [];
  for (let i = 1; i <= 30; i++) {
    const seedVal = (i + artistSeed) % 4;
    let status = "";
    let venue = "";
    if (seedVal === 0) {
      status = "CONFIRMED";
      venue = filler[(seedVal + i) % filler.length];
    } else if (seedVal === 1) {
      status = "HOLD";
    } else if (seedVal === 3) {
      status = "OFFER";
      venue = offerFiller[i % offerFiller.length];
    }
    rows.push({ day: i, status, venue });
  }
  return rows;
}

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

export const BEAT1_EMAIL = {
  senderName: "Dana Reyes",
  senderEmail: "dana@blueheronvenue.com",
  senderInitials: "DR",
  senderAvatarColor: "#8e44ad",
  to: "ben@yonasmedia.com",
  subject: "Booking inquiry — March 1",
  timestamp: "Mon, Feb 16, 2:47 PM",
  lines: [
    { text: "Hi Ben,", pauseAfter: 180 },
    { text: "", pauseAfter: 0 },
    {
      text: "Hope you're doing well! We've got an open slot at The Blue Heron on March 1 and would love to fill it with one of your artists. Is Cora Lane, Jonah Ellery, or The Marcel Trio available that night? Happy to send the full offer once we know who's free.",
      pauseAfter: 180,
    },
    { text: "", pauseAfter: 0 },
    { text: "Thanks,", pauseAfter: 80 },
    { text: "Dana", pauseAfter: 0 },
  ],
} as const;
