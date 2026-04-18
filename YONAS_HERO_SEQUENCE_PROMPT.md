# Claude Code Build Prompt — Yonas Media Case Study Reel

**You are building the primary hero asset for the Yonas Media work card on Ernest Leeson's portfolio home page at ernestleeson.com.** This is a multi-beat animated narrative that tells the story of how a 13-minute manual booking workflow was replaced by a 7-second interactive tool. It is one of the first things a visitor to the portfolio sees. Build it with performance and polish appropriate to that prominence.

## Execution Contract

**Do not stop to ask clarifying questions.** This prompt contains every design token, timing constant, data value, and behavior decision you need. If you encounter genuine ambiguity, make the call using the design principles stated below, add a brief `// DECISION:` comment explaining your reasoning, and keep going. The user is away from the computer and cannot answer questions mid-build.

**If you are blocked by a build error, missing dependency, or failing test**, fix it yourself using best judgment (installing missing packages is pre-approved). Only surface blockers that are truly unresolvable.

---

## 0. Pre-flight Inspection

Before writing any code, inspect the repo:

1. **Detect language.** Is this TypeScript (`.tsx`) or JavaScript (`.jsx`)? Match the convention you find. Assume TypeScript as a tiebreaker.
2. **Detect styling approach.** Tailwind v4 is present. Check whether the project uses CSS Modules, styled-components, or a mix. Use CSS Modules for animation-heavy components (Beats 2 and 3) where keyframes are cleaner than Tailwind.
3. **Detect component structure.** Look for existing case-study components (likely under `components/case-studies/`, `app/work/`, or similar). Place the new files in a sibling pattern consistent with what exists.
4. **Verify dependencies.** Framer Motion must be available (`framer-motion`). If not installed, install it — pre-approved. Also check for `lucide-react` (commonly used for icons); install if missing.
5. **Verify fonts.** Space Grotesk and Inter must be loaded. If the project uses `next/font/google`, add them there. If not, add a Google Fonts `@import` to the component's CSS module.
6. **Check how existing work cards render their primary asset on the home page.** The Yonas reel needs to slot in consistently with that pattern. Match the container padding and background that other work cards use.

---

## 1. What You're Building

A self-contained React component called `YonasReel` that renders a six-beat animated sequence telling a single booking story:

1. **Beat 1:** An email inquiry arrives (rendered as a Gmail conversation view)
2. **Beat 2:** The old-way workflow attempting to answer it (rendered as a Google Sheets view with three artist tabs)
3. **Transition:** The 13:00 elapsed-time reckoning, then the sheet collapses
4. **Beat 3a (Construction):** The new booking tool assembles itself in stop-motion
5. **Beat 3b (Demo):** An auto-play demonstration resolves the inquiry by finding Lila Moreno available
6. **Beat 3c (Live):** The tool becomes fully interactive; the user can take over

The full sequence runs roughly 80–100 seconds end to end.

**Where this lives in the portfolio:**

- **Home page Yonas Media work card:** Primary hero asset. Autoplay on viewport entry. Lazy-loaded so it doesn't block the home page initial paint.
- **Yonas Media case study page:** Same component, same autoplay behavior. This is also the hero at the top of that page.

The component renders at a native internal design width of 1440px and auto-scales (`transform: scale`) to fit whatever container it's placed into, so both placements use the same component with zero prop changes. A `ResizeObserver` keeps it scaled correctly when the container resizes.

---

## 2. File Structure

Place these files in a directory matching the existing case-study pattern (e.g., `components/case-studies/yonas-reel/` — adjust to match the repo):

```
yonas-reel/
├── YonasReel.tsx                 # Composes all beats, handles orchestration + mount gating
├── Beat1Email.tsx                # Gmail-style email typing
├── Beat2OldWay.tsx               # Google Sheets-style three-tab workflow
├── TransitionCollapse.tsx        # Timer pulse + sheet row cascade
├── Beat3Construction.tsx         # Stop-motion build of the Atelier tool
├── Beat3Tool.tsx                 # The Atelier tool itself (used for both demo and live — props gate interactivity)
├── Beat3Demo.tsx                 # Orchestrates the auto-demo on top of Beat3Tool
├── ReelCaption.tsx               # The caption card
├── FauxCursor.tsx                # The fake mouse cursor for the demo
├── tokens.ts                     # Design tokens, timing constants
├── data.ts                       # Artists, bookings, months
├── styles.module.css             # Shared Atelier styles
├── beat1.module.css              # Gmail-specific chrome
├── beat2.module.css              # Sheets-specific chrome
└── index.ts                      # Re-exports YonasReel
```

**Performance contract for the parent `YonasReel`:**

- Lazy mount: wrap the component in `next/dynamic` with `{ ssr: false }` wherever it's imported from a page.
- Use an `IntersectionObserver` inside `YonasReel` to detect viewport entry.
- Until the section is within ~1.5× viewport height of being visible, render a lightweight poster placeholder instead of the full reel (see section 11).
- When the section scrolls far out of view (more than ~2× viewport height away in either direction), unmount the heavy beat children and return to the poster placeholder.
- Use Framer Motion's `useReducedMotion` hook. If the user prefers reduced motion, skip the construction stop-motion and the row cascade — instead, cross-fade Beat 2 out and Beat 3 in with a simple 500ms opacity transition. Demo still plays (but without the faux cursor, just the state changes).

**Animation discipline:**

- Only animate `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, `padding`, or anything else that triggers layout.
- Use Framer Motion's `motion` components for all animated elements. Use CSS `@keyframes` only when Framer Motion's declarative API can't express the behavior (rare — row cascades with staggered delays can be done either way; Framer Motion's `staggerChildren` is cleaner).
- Every orchestration sequence (Beat 1 typing, Beat 2 tab switching, Transition collapse, Beat 3 demo) uses a cancellation token pattern: each async step checks `token.cancelled` before proceeding. When the component unmounts or the viewport exits, the current token is marked cancelled and all in-flight animations halt cleanly.

---

## 3. Design Tokens (exact values)

### `tokens.ts`

```ts
// The "Atelier" system — Beat 3's native visual language
export const COLORS = {
  bg:                   '#f9f9f9',
  surfaceLow:           '#f3f3f3',
  surfaceLowest:        '#ffffff',
  surfaceHigh:          '#e8e8e8',
  onSurface:            '#1a1c1c',
  onSurfaceVariant:     '#4d4732',
  outline:              '#7e775f',
  outlineVariant:       '#d0c6ab',

  // Accent
  secondary:            '#705d00',
  secondaryContainer:   '#fcd400',   // primary yellow accent
  onSecondaryContainer: '#6e5c00',

  // Semantic
  confirmed:            '#1D9E75',
  confirmedLight:       'rgba(29, 158, 117, 0.22)',
  donutGreenRing:       '#E1F5EE',
  donutGreenFill:       '#1D9E75',

  // Urgency — used by the readiness column in Beat 3's table
  urgencyRed:           '#D4442B',   // 0–3 days to gig
  urgencyYellow:        '#F5B500',   // 4–14 days
  urgencyGray:          '#B4B2A9',   // 15+ days

  // Status pills (bg uses rgba, fg is a darker hue of the same family)
  statusConfirmedBg:    'rgba(29, 158, 117, 0.15)', statusConfirmedFg: '#085041',
  statusOfferBg:        'rgba(23, 95, 165, 0.12)',  statusOfferFg:     '#0C447C',
  statusSeriousBg:      'rgba(120, 50, 150, 0.12)', statusSeriousFg:   '#3C3489',
  statusInterestBg:     'rgba(180, 178, 169, 0.3)', statusInterestFg:  '#444441',
  statusHoldBg:         'rgba(250, 199, 117, 0.3)', statusHoldFg:      '#633806',
  statusNeedfillBg:     'rgba(212, 68, 43, 0.14)',  statusNeedfillFg:  '#791F1F',
  statusAvailableBg:    'rgba(29, 158, 117, 0.25)', statusAvailableFg: '#085041',

  // Gmail-specific (approximated, not exact Google brand colors)
  gmailBg:              '#ffffff',
  gmailHeaderBg:        '#f5f5f5',
  gmailBorder:          '#e0e0e0',
  gmailTextPrimary:     '#202124',
  gmailTextSecondary:   '#5f6368',
  gmailAccentRed:       '#d93025',
  gmailToolbarIcon:     '#5f6368',

  // Sheets-specific (approximated)
  sheetsBg:             '#ffffff',
  sheetsHeaderBg:       '#f9fbfd',
  sheetsTabActiveBg:    '#ffffff',
  sheetsTabInactiveBg:  '#f1f3f4',
  sheetsGreenAccent:    '#0f9d58',   // the Sheets-ish green used in header
  sheetsGridLine:       '#e0e0e0',
  sheetsColumnHeaderBg: '#f8f9fa',
  sheetsColumnHeaderFg: '#5f6368',
  sheetsSelectedCellOutline: '#1a73e8',  // Sheets-ish blue
};

export const FONTS = {
  display: "'Space Grotesk', 'Helvetica Neue', sans-serif",
  body:    "'Inter', 'Helvetica Neue', sans-serif",
  // Gmail/Sheets approximation: use system-ui to evoke Google's product UI feel
  // without importing Roboto (avoids the exact Google brand font)
  google:  "system-ui, -apple-system, 'Segoe UI', sans-serif",
  mono:    "'Space Grotesk', monospace",  // For the 13:00 timer
};
```

### Typography scale (use inside components)

| Element | Font | Size | Weight | Letter-spacing | Transform |
|---|---|---|---|---|---|
| Page title ("Booking") | display | 40px | 700 | -0.02em | none |
| Metric value | display | 38px | 700 | -0.02em | none |
| Brand logo ("Yonas Media") | display | 17px | 700 | -0.01em | none |
| Nav link | display | 12px | 600 | 0.05em | uppercase |
| Metric label | display | 10px | 500 | 0.12em | uppercase |
| Section label ("DATE", "ROSTER") | display | 11px | 600 | 0.1em | uppercase |
| Status pill | display | 10px | 600 | 0.08em | uppercase |
| Artist name (in table) | display | 12px | 600 | 0.02em | uppercase |
| Venue name | display | 13px | 600 | 0.02em | uppercase |
| Venue city (secondary) | body | 11px | 400 | 0 | none |
| Body / row data | body | 13px | 400 | 0 | none |
| Caption primary line | display | 18px | 500 | -0.01em | none |
| Caption secondary | body | 13px | 400 | 0 | none |
| Caption eyebrow | display | 11px | 600 | 0.1em | uppercase |

### No-line rule (Atelier system)

Avoid hairline 1px borders. Instead, use:

- 2–4px "ghost borders" at 10–50% opacity: `border: 4px solid rgba(208, 198, 171, 0.12)` on metric cards
- Surface-container shifts for hierarchy (using `surfaceLow` for section backgrounds, `surfaceLowest` for card fills)
- Alternating table row band backgrounds (subtle tonal shift, not lines)

### Gmail and Sheets chrome — important

The Beat 1 email and Beat 2 spreadsheet must read convincingly as Gmail and Google Sheets, respectively. However, **do not reproduce Google's logos verbatim**. Evoke the visual language:

- **Gmail:** Red "M"-style envelope glyph (or a generic abstract envelope icon), but use a neutral red tone (`#d93025` is fine — this is approximating, not copying). Header layout: search bar at top, left-side navigation (Inbox, Starred, etc. can be hinted at or omitted entirely), conversation view with sender avatar (colored circle with initial), subject line at top, sender name + email + timestamp, body text, reply/forward action row at the bottom.
- **Sheets:** Green grid-icon glyph in the top-left, filename "Yonas_Bookings_2026" with a small star icon and "Last edit was seconds ago" text. Menu bar (File / Edit / View / Insert / Format / Data / Tools / Extensions / Help). Toolbar with Zoom / Format / Bold / Italic / Underline / Color / Align / Wrap / Merge icons (simplified). Three sheet tabs at the bottom: Cora Lane, Jonah Ellery, The Marcel Trio — active tab has a small green underline and bold weight. Cell grid with column letters A, B, C, D, E, F, G and row numbers 1 through ~30 visible. Light gray grid lines (`#e0e0e0`). The currently-focused cell during scroll has the blue `#1a73e8` outline.

The chrome should be convincing enough that a viewer glancing at the screen immediately thinks "that's Gmail" and "that's a Google Sheet" — even if they couldn't articulate why if pressed.

---

## 4. Timing Constants (locked — use exactly)

### `tokens.ts`

```ts
export const TIMING = {
  // Beat 1: Email typing
  beat1: {
    charDelay:        28,    // ms between characters within a line
    pauseShort:       80,    // between lines within the email body
    pauseLong:        180,   // after "Hi," and before "Thanks," — natural breath pauses
    cursorBlinkMs:    900,   // period of the blinking caret
    exitFadeMs:       700,   // cross-fade to Beat 2
  },

  // Beat 2: Old way
  beat2: {
    scrollDurationMs: 1400,                               // Jan → March 1 fast-scroll
    scrollEase:       'cubic-bezier(0.22, 1, 0.36, 1)',   // cubic ease-out
    rowScaleFrom:     1.0,
    rowScaleTo:       1.9,
    rowScaleToMobile: 1.5,                                // used when container < 500px
    rowScaleOriginX:  'right',                            // CRITICAL — must be right-edge
    rowScaleOriginY:  'center',
    rowScaleEase:     'cubic-bezier(0.34, 1.56, 0.64, 1)',// spring overshoot
    rowScaleMs:       400,
    verdictStampDelay:280,
    verdictStampMs:   350,
    verdictStampEase: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    tabDwellMs:       1000,                               // hold on each verdict
    tabDipMs:         500,                                // sheet-inner fades to invisible (instant internally)
    tabFadeInMs:      800,                                // sheet-inner fades back with new data
    timerTotalMs:     13 * 60 * 1000,                    // 13:00 counted across the three tabs
    timerTickMs:      100,                                // counter update frequency
  },

  // Transition: Collapse (Variant B — timer scales up, holds, falls, then sheet cascades)
  transition: {
    timerPulseInMs:   900,
    timerPulseEase:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
    timerHoldMs:      1200,
    timerFallMs:      800,
    timerFallEase:    'cubic-bezier(0.5, 0, 0.85, 0)',    // gravity (ease-in)
    rowFallMs:        900,
    rowFallEase:      'cubic-bezier(0.5, 0, 0.85, 0)',
    rowCascadeStagger:55,                                 // ms between consecutive rows in the cascade
    focalRowIsFirst:  true,                               // the red-dash row falls before others
    tabStripFallLead: -300,                               // tabs/header fall 300ms BEFORE the last row lands
    timerFallAndRowsOverlap: 200,                         // first row starts falling 200ms before timer clears
  },

  // Beat 3a: Construction (stop-motion)
  construction: {
    pieceEase:        'cubic-bezier(0.34, 1.56, 0.64, 1)',
    pieceDurationMs:  420,
    sequence: [
      { key: 'nav',     startAtMs: 0 },
      { key: 'sidebar', startAtMs: 320 },
      { key: 'head',    startAtMs: 700 },
      { key: 'metrics', startAtMs: 980 },
      { key: 'table',   startAtMs: 1360 },
    ],
    completionPauseMs:700,                                // after table lands, pause before demo begins
  },

  // Beat 3b: Demo
  demo: {
    calendarMonthStepMs: 520,                             // per-month toggle
    dateClickPauseMs:    650,                             // after landing on Mar, before click
    cursorMoveMs:        650,
    cursorMoveEase:      'cubic-bezier(0.4, 0, 0.2, 1)',
    artistClickIntervalMs: 560,
    artistHighlightMs:    380,
    threeRowsHoldMs:      1300,                           // pause on Cora/Jonah/Marcel results
    lilaApproachMs:        280,
    pulseScale:            2.2,
    pulseDurationMs:       600,
  },

  // Caption
  caption: {
    showDelayMs:         700,                             // after Lila row lands
    piecewiseStaggerMs:  350,                             // eyebrow → line1 → line2 → divider → cta
    holdUntilInteraction:true,                            // stays until user clicks anything
    fadeOutMs:           400,
  },
};
```

---

## 5. Data

### `data.ts`

```ts
// Months (Jan, Feb, Mar 2026) — hard-coded to match the narrative
export const MONTHS = [
  { name: 'January 2026',  firstDayOfWeek: 4, daysInMonth: 31 },  // Jan 1 2026 = Thursday
  { name: 'February 2026', firstDayOfWeek: 0, daysInMonth: 28 },  // Feb 1 2026 = Sunday
  { name: 'March 2026',    firstDayOfWeek: 0, daysInMonth: 31 },  // Mar 1 2026 = Sunday
];

// 15 fictional artists
export const ARTISTS = [
  { id: 'cora',    name: 'Cora Lane' },
  { id: 'jonah',   name: 'Jonah Ellery' },
  { id: 'marcel',  name: 'The Marcel Trio' },
  { id: 'lila',    name: 'Lila Moreno' },
  { id: 'river',   name: 'River North' },
  { id: 'juno',    name: 'Juno Waverly' },
  { id: 'sable',   name: 'Sable Greene' },
  { id: 'otis',    name: 'Otis Rowan' },
  { id: 'marigold',name: 'Marigold Fox' },
  { id: 'theo',    name: 'Theo Calder' },
  { id: 'nina',    name: 'Nina Abrams' },
  { id: 'finn',    name: 'Finn Halloway' },
  { id: 'ivy',     name: 'Ivy Rockwell' },
  { id: 'hollis',  name: 'Hollis Day' },
  { id: 'dune',    name: 'Dune & the Signal' },
];

// Bookings — drives the Beat 3 table
export const BOOKINGS = {
  cora:     [ { monthIdx: 2, day: 1,  venue: 'Town Hall',         city: 'New York NY',   type: 'four-piece',        status: 'confirmed', remaining: 2  } ],
  jonah:    [ { monthIdx: 2, day: 1,  venue: 'Orpheum',           city: 'Memphis TN',    type: 'three-piece',       status: 'confirmed', remaining: 1  } ],
  marcel:   [ { monthIdx: 2, day: 1,  venue: 'Fox Theatre',       city: 'Atlanta GA',    type: 'four-piece',        status: 'hold',      remaining: 6  } ],
  lila:     [ { monthIdx: 2, day: 1,  venue: '—',                 city: '—',             type: 'singer songwriter', status: 'available', remaining: 0  } ],
  river:    [ { monthIdx: 2, day: 5,  venue: 'Silverline Arena',  city: 'Chicago IL',    type: 'three-piece',       status: 'confirmed', remaining: 3  } ],
  juno:     [ { monthIdx: 2, day: 2,  venue: 'Warehouse 7',       city: 'Detroit MI',    type: 'singer songwriter', status: 'serious',   remaining: 11 } ],
  sable:    [ { monthIdx: 2, day: 8,  venue: 'The Blue Note',     city: 'Los Angeles CA',type: 'four-piece',        status: 'confirmed', remaining: 2  } ],
  otis:     [ { monthIdx: 2, day: 10, venue: 'Paramount Theater', city: 'Seattle WA',    type: 'festival',          status: 'confirmed', remaining: 4  } ],
  marigold: [ { monthIdx: 2, day: 12, venue: 'The Foundry',       city: 'Philadelphia PA', type: 'three-piece',     status: 'serious',   remaining: 7  } ],
  theo:     [ { monthIdx: 2, day: 14, venue: 'Zion Dome',         city: 'Denver CO',     type: 'four-piece',        status: 'confirmed', remaining: 2  } ],
  nina:     [ { monthIdx: 2, day: 16, venue: 'The Basement',      city: 'Nashville TN',  type: 'singer songwriter', status: 'interest',  remaining: 9  } ],
  finn:     [ { monthIdx: 2, day: 18, venue: 'Mercury Lounge',    city: 'New York NY',   type: 'three-piece',       status: 'confirmed', remaining: 1  } ],
  ivy:      [ { monthIdx: 2, day: 20, venue: 'Neumos',            city: 'Seattle WA',    type: 'singer songwriter', status: 'offer',     remaining: 5  } ],
  hollis:   [ { monthIdx: 2, day: 22, venue: 'Turner Hall',       city: 'Milwaukee WI',  type: 'four-piece',        status: 'needfill',  remaining: 10 } ],
  dune:     [ { monthIdx: 2, day: 28, venue: 'Thalia Hall',       city: 'Chicago IL',    type: 'festival',          status: 'confirmed', remaining: 2  } ],
};

// Beat 2 procedural sheet filler — deterministic per artist so sheets look coherent
export function buildOldWaySheetData(artistSeed: number) {
  // Generate 30 days of March with statuses driven by (i + seed) % 4.
  // For the focal artist on March 1, we hand-author the entry so verdict matches.
  const rows = [];
  for (let i = 1; i <= 30; i++) {
    const seedVal = (i + artistSeed) % 4;
    let status = '';
    let venue = '';
    if (seedVal === 0) { status = 'CONFIRMED'; venue = ['Town Hall', 'Orpheum', 'Fox Theatre', 'The Blue Note', 'Warehouse 7'][seedVal + i % 5]; }
    else if (seedVal === 1) { status = 'HOLD'; venue = ''; }
    else if (seedVal === 2) { status = ''; venue = ''; }  // empty row
    else { status = 'OFFER'; venue = ['Mercury Lounge', 'Neumos', 'Silverline', 'Paramount'][i % 4]; }
    rows.push({ day: i, status, venue });
  }
  return rows;
}

// Beat 1 email body — typed out character by character
export const BEAT1_EMAIL = {
  senderName: 'Dana Reyes',
  senderEmail: 'dana@blueheronvenue.com',
  senderInitials: 'DR',
  senderAvatarColor: '#8e44ad',  // purple for the avatar bg
  to: 'ben@yonasmedia.com',
  subject: 'Booking inquiry — March 1',
  timestamp: 'Mon, Feb 16, 2:47 PM',
  lines: [
    { text: 'Hi Ben,', pauseAfter: 180 },  // long pause
    { text: '', pauseAfter: 0 },            // blank line
    { text: 'Hope you\'re doing well! We\'ve got an open slot at The Blue Heron on March 1 and would love to fill it with one of your artists. Is Cora Lane, Jonah Ellery, or The Marcel Trio available that night? Happy to send the full offer once we know who\'s free.', pauseAfter: 180 },
    { text: '', pauseAfter: 0 },
    { text: 'Thanks,', pauseAfter: 80 },
    { text: 'Dana', pauseAfter: 0 },
  ],
};
```

---

## 6. Beat-by-Beat Specifications

### Beat 1: Email (Gmail chrome)

A Gmail conversation view. The email types out character by character in the body area. Use a Gmail-like header with:

- Top toolbar row: Gmail logo glyph (abstract red envelope) + "Gmail" wordmark, search bar, user avatar on the right
- Breadcrumb-ish row: "← Back to Inbox" icon, folder tabs (Primary, Promotions, Social) muted
- Conversation header: Sender avatar (`senderInitials` on a colored circle), sender name + email, timestamp right-aligned, subject line in large text
- Email body area: typed out character by character using the lines defined in `BEAT1_EMAIL.lines`
- Bottom action bar: "Reply", "Forward" pill buttons

Typing mechanics:

- Create a new `<p>` element for each line (not one long string with `<br>` — `<p>` avoids layout shift)
- Cursor `<span>` (blinking via CSS keyframe) appears at the typing position and moves forward with each character
- Between lines, pause for `pauseShort` or `pauseLong` as specified in the data

When Beat 1 completes, cross-fade (opacity transition over 700ms) to Beat 2.

### Beat 2: Old way (Sheets chrome)

A Google Sheets window. Key structural elements:

- **Top bar:** Sheets logo glyph (abstract green grid), filename "Yonas_Bookings_2026" with a small star icon and "Last edit was seconds ago" text, then user avatar
- **Menu bar:** File / Edit / View / Insert / Format / Data / Tools / Extensions / Help (plain text, slightly muted)
- **Toolbar:** Minimal icons (zoom, bold, italic, alignment, etc.) — keep this small, it's chrome not content
- **Grid:** Column letters A–G across the top, row numbers 1–30+ down the left. Visible cell borders in light gray. Data fills columns A (Date), B (Venue), C (Status).
- **Tab strip at bottom:** Three tabs — "Cora Lane", "Jonah Ellery", "The Marcel Trio". Active tab has bold weight, green underline accent, and white background. Inactive tabs are a muted gray.

Beat 2 animation sequence:

1. Start on the Cora Lane tab. Sheet shows data rows filling January through March (generated by `buildOldWaySheetData(artistSeed)` where each artist gets a unique seed). 
2. Fast-scroll the grid from Jan to March 1 (transform-based `translateY` on the row container). March 1 row is hand-authored to match the verdict (Cora: confirmed at Town Hall).
3. When March 1 lands in center view, scale that row up to 1.9× with `transform-origin: right center`. This keeps the status column pinned to the right edge (critical — don't change the origin).
4. After row scales, the verdict stamp (red X for confirmed/booked, amber dash for hold) pops into the row's status column with its own spring overshoot.
5. Hold for `tabDwellMs` (1000ms).
6. Tab switch: `transition: none` on sheet-inner, add `.faded` class (opacity 0), re-render with next artist's data, switch active tab, scroll back to top, remove `.faded`, restore transition. This gives a hard-cut out / soft fade in.
7. Repeat for Jonah Ellery (confirmed at Orpheum, red X) and The Marcel Trio (hold at Fox Theatre, amber dash).
8. A timer in the bottom-right counts up from 00:00 to 13:00 across the three tabs. When the last tab completes, the timer reads exactly 13:00.

When Beat 2 completes, hand off to the Transition.

### Transition: Collapse (Variant B)

Sequence:

1. The 13:00 timer in the bottom-right scales up and flies to the viewport center, growing to ~180px tall, with a spring overshoot. Duration: 900ms.
2. Hold at center for 1200ms. The viewer registers the number.
3. The timer falls away: tumbles down and out of the bottom of the viewport with gravity easing (duration 800ms, `cubic-bezier(0.5, 0, 0.85, 0)`), rotating slightly (-3°).
4. Before the timer fully clears (overlap ~200ms), the focal row (the Marcel Trio's March 1 row, with the red/amber stamp) starts to fall. Then the rows above and below cascade outward from it with a 55ms stagger. Each row rotates slightly (randomized between -3° and +3°) as it falls.
5. The tab strip and column header fall 300ms before the last row lands.
6. By the end, the viewport is empty — just the `#f9f9f9` background remains.

Total transition duration: approximately 3.5 seconds.

### Beat 3a: Construction

The new tool builds itself piece by piece, each with a spring overshoot to signal "placed down":

1. **Nav** (t=0): Yonas Media logo, Booking/Contracts/Ticket Counts, Simon Ashworth user on the right
2. **Sidebar** (t=320ms): Calendar + Roster section appear together
3. **Page head** (t=700ms): "Booking" title + Export CSV / New booking buttons
4. **Metrics** (t=980ms): Four cards (Daily tasks donut, Leftover tasks warning, Today's gigs calendar icon, Monthly revenue cash icon)
5. **Table** (t=1360ms): Empty booking schedule with "No artists selected" empty state

Each piece uses: `opacity: 0 → 1`, `translateY: 12px → 0`, easing `cubic-bezier(0.34, 1.56, 0.64, 1)`, duration 420ms.

After the table lands, pause 700ms, then begin the demo.

### Beat 3b: Demo

This is where the faux cursor and pulse feedback come in. The demo runs autonomously — the user is not yet in control. All clicks during this phase are silent (`interactiveMode === false` gates all input handlers).

Sequence:

1. **Cursor appears** near the center of the tool, fades in.
2. **Cursor moves to the calendar's `›` next arrow.** Pulse ripple fires at click point. Month advances from January to February. Wait 520ms.
3. **Cursor moves back to `›` again.** Pulse ripple. Month advances to March. Wait 520ms.
4. **Cursor moves to March 1 cell.** Pulse ripple. March 1 highlights yellow. Wait 650ms.
5. **Cursor moves to the Cora Lane row in the roster.** Yellow row highlight fades in, pulse ripple fires on the checkbox, checkbox toggles on, table renders with Cora's row animating in. Wait 560ms.
6. **Cursor moves to Jonah Ellery.** Same treatment.
7. **Cursor moves to The Marcel Trio.** Same treatment.
8. **Hold 1300ms** on the three unavailable rows. This is the "same answer as the old way" beat.
9. **Cursor moves to Lila Moreno.** Pulse, check, row animates in — this one shows status `available`, with a green "Open night" readiness bar.
10. **Wait 700ms**, then the caption appears.

### Caption

Renders as a white Atelier card in the bottom-right of the tool area (28px from bottom-right). Card uses 4px ghost border at 0.5 opacity.

Structure (piecewise reveal, 350ms stagger between each):

1. **Eyebrow line** (at t=0): small green dot + "THE NEW WAY" in uppercase Space Grotesk 11px.
2. **Primary line 1** (at t=350): "Dana has her answer." in Space Grotesk 18px, weight 500.
3. **Primary line 2** (at t=700): "She books **Lila Moreno**." with the name highlighted in yellow (`secondaryContainer` background, with 4px horizontal padding).
4. **Divider** (at t=1050): 1px horizontal line at 35% opacity.
5. **CTA line** (at t=1400): "Your turn — click around" in Inter 13px, with a right-pointing arrow that nudges (translateX animation, 1.8s loop).

The caption persists until the user interacts with anything on the tool (click on calendar day, check an artist, click the New booking button, anything). On first interaction, the caption fades out (400ms), `interactiveMode` becomes `true`, and the Replay button appears in the top-right of the tool.

### Beat 3c: Live

Once the demo has completed and the caption has been dismissed:

- The calendar's arrow buttons work: clicking `‹` or `›` changes months (bounded at Jan and Mar — arrows disabled at extremes).
- Clicking any day in the calendar updates `selectedStart`; the table's urgency colors recompute based on days-to-gig from that new date.
- Clicking any artist in the roster toggles them in the selected set; the table re-renders with their bookings.
- The Replay button in the top-right (visible only after caption dismissal) re-runs the entire reel from the collapse.

---

## 7. Orchestration Contract

The parent `YonasReel` coordinates all beats via a single `runReel()` async function that uses a cancellation token pattern:

```ts
let currentToken: { cancelled: boolean } | null = null;

async function runReel() {
  if (currentToken) currentToken.cancelled = true;
  const token = { cancelled: false };
  currentToken = token;

  resetState();
  if (token.cancelled) return;
  await playBeat1(token);
  if (token.cancelled) return;
  await playBeat2(token);
  if (token.cancelled) return;
  await playTransition(token);
  if (token.cancelled) return;
  await playConstruction(token);
  if (token.cancelled) return;
  await playDemo(token);
  if (token.cancelled) return;
  showCaption();
  enterInteractiveMode();
}
```

Each beat function is an async function that runs its animations via Framer Motion's imperative `animate()` API or via `setTimeout`-backed `await wait(ms)` calls. Every sub-step checks `token.cancelled` before proceeding.

**IntersectionObserver triggers:**

- On first viewport entry: call `runReel()`
- On re-entry after leaving viewport: call `runReel()` (it resets state and replays from the top)
- On viewport exit: `currentToken.cancelled = true` — halts the current sequence

**Replay button:**

- Visible only after Beat 3c has started (interactive mode active)
- Top-right of the tool, styled as a ghost button ("↺ Replay" in 11px Space Grotesk uppercase)
- Clicking calls `runReel()`, which cancels the current token and restarts

---

## 7b. Beat 3 Technical Details (non-obvious implementation notes)

These are the pieces of Beat 3 that are easy to get wrong from the spec alone. Implement them as described.

### Donut chart math (Daily tasks card)

The donut is an SVG with two concentric circles: a light-green ring and a dark-green arc on top representing the filled percentage.

```jsx
<svg viewBox="0 0 100 100">
  {/* Background ring */}
  <circle cx="50" cy="50" r="42" fill="none" stroke="#E1F5EE" strokeWidth="14" />
  {/* Foreground arc — 88% filled */}
  <circle
    cx="50" cy="50" r="42"
    fill="none"
    stroke="#1D9E75"
    strokeWidth="14"
    strokeDasharray="232.48 264"    /* 264 = 2·π·42 ≈ full circumference; 232.48 = 88% of that */
    transform="rotate(-90 50 50)"   /* starts arc at 12 o'clock */
  />
</svg>
```

The donut sits inside the "Daily tasks" card as an inline element (not bleeding). The card uses a horizontal flex layout: label + value + footer stacked on the left (flex: 1), donut 72×72px on the right (flex-shrink: 0, align-self: center). This card is visually distinct from the other three cards — that asymmetry is intentional.

### Metric card bleed icons (normalized heights)

The three non-donut metric cards have oversized icons bleeding off the right edge at 18% opacity (32% on the yellow warning card). Per-card heights, measured from the rendered SVG:

- **Leftover tasks** (warning triangle): 79px tall
- **Today's gigs** (calendar): 79px tall
- **Monthly revenue** (cash bill): 86px tall

All three use SVG viewBoxes scaled so the icon's visual height matches these values. Position: `right: -18px`, `top: 50%`, `transform: translateY(-50%)`. Width: auto (overflows right edge naturally).

The mustard-tint stroke color for the warning triangle on the yellow card is `#705d00` — same as the primary label text on that card, keeps it on-palette.

### Calendar static-height pattern

The days grid inside the calendar must render a fixed 6-row × 7-column = 42-cell layout regardless of which month is shown. Shorter months (February, 28 days with firstDayOfWeek = 0) get trailing empty cells to fill the grid. Longer months (January, 31 days with firstDayOfWeek = 4) fit naturally into 6 rows.

Min-height on the days wrapper: 168px. This is non-negotiable — without it, the roster below jumps up when February is displayed and down when March is displayed, which is visually unacceptable.

### Readiness bar urgency logic

```ts
function getUrgency(daysToGig: number, remaining: number): {
  bar: string;      // color for the filled portion of the bar
  label: string;    // color for the "N left" text
  barWidth: number; // 0-100, as a percentage
  labelText: string;
} {
  if (remaining === 0) {
    return { bar: COLORS.confirmed, label: COLORS.confirmed, barWidth: 100, labelText: 'Ready' };
  }
  let urgencyBar: string, urgencyLabel: string;
  if (daysToGig <= 3)       { urgencyBar = COLORS.urgencyRed;    urgencyLabel = COLORS.urgencyRed; }
  else if (daysToGig <= 14) { urgencyBar = COLORS.urgencyYellow; urgencyLabel = '#854F0B'; }
  else                      { urgencyBar = COLORS.urgencyGray;   urgencyLabel = COLORS.onSurfaceVariant; }

  // Bar width: how much is remaining, capped at 12 items = 100%
  const barWidth = Math.min(100, (remaining / 12) * 100);
  return { bar: urgencyBar, label: urgencyLabel, barWidth, labelText: `${remaining} left` };
}

// Special case: status === 'available' renders a full green bar with label "Open night"
```

The bar width shows *what's left*, not what's done. The color shows urgency based on days-to-gig. This is the inverse of a typical progress bar — on purpose. A booking manager doesn't want to know what's complete; they want to know what they still owe, weighted by how soon it's due.

### Faux cursor

A small SVG arrow, absolutely positioned, transitions its `left` and `top` values when moving between click targets. Duration: 650ms with `cubic-bezier(0.4, 0, 0.2, 1)` easing.

```jsx
<svg viewBox="0 0 20 22" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' }}>
  <path
    d="M2 2 L2 18 L6.5 14 L9.5 20 L12 19 L9 13 L15 13 Z"
    fill="#1a1c1c"
    stroke="#ffffff"
    strokeWidth="0.8"
    strokeLinejoin="round"
  />
</svg>
```

The cursor appears at the start of the demo (fade in from opacity 0 to 1 over 300ms) and disappears when the caption appears (fade out before the tool becomes interactive).

### Pulse ripple

Fires at the moment of each "click" during the demo. A 32×32px yellow circle (`rgba(252, 212, 0, 0.45)`), absolutely positioned at the click point, scales from 0 to 2.2× with fade-to-zero opacity over 600ms.

```css
@keyframes pulseFire {
  0%   { transform: translate(-50%, -50%) scale(0);   opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
}
```

The pulse is spawned as a disposable DOM element each time — create it, animate it, remove it after 600ms. Don't reuse a single element, because rapid sequential pulses (e.g., during the Cora/Jonah/Marcel check sequence) would interrupt each other.

### Caption card structure

Positioned `bottom: 28px; right: 28px` inside the tool area. 340px wide. White background (`surfaceLowest`), 4px ghost border at 0.5 opacity, zero border-radius.

Internal structure (piecewise reveal, 350ms stagger):

```
┌─────────────────────────────────────┐
│ ● THE NEW WAY                       │  ← eyebrow (Space Grotesk 11px uppercase, green dot)
│                                     │
│ Dana has her answer.                │  ← line1 (Space Grotesk 18px, weight 500)
│ She books [Lila Moreno.]            │  ← line2 (yellow highlight on name, weight 600)
│ ─────────────────────               │  ← divider (1px, 35% opacity)
│ Your turn — click around →          │  ← CTA (Inter 13px, arrow nudges)
└─────────────────────────────────────┘
```

The yellow highlight on "Lila Moreno" uses `background: #fcd400` with 4px horizontal padding, inline-block. Not a full border-radius pill — a rectangular highlighter swipe.

The arrow in the CTA nudges right continuously with a 1.8-second cycle: `translateX: 0 → 4px → 0`, `ease-in-out`, `infinite`, starting 600ms after the CTA line becomes visible.

### interactiveMode flag

A single boolean in `YonasReel`'s state. When `false`, all user input handlers (`onClick` on calendar arrows, calendar days, artist rows, the "New booking" button) short-circuit without doing anything. When `true`, handlers execute normally.

The flag flips to `true` when the user clicks anywhere on the tool while the caption is visible. The same event that flips the flag also triggers the caption fade-out.

Do not use `pointer-events: none` to gate interactivity during the demo — that would also suppress hover states, which makes the tool look dead. Just short-circuit the handlers.

---

## 8. Accessibility

- `prefers-reduced-motion`: use Framer Motion's `useReducedMotion()` hook. When true:
  - Beat 1: skip typing, show full email instantly
  - Beat 2: skip scrolling and row scaling, cross-fade between tabs with 300ms opacity
  - Transition: skip cascade, instant swap with 500ms crossfade
  - Construction: skip stop-motion, all pieces appear simultaneously with 300ms fade
  - Demo: run, but without faux cursor movements — just state changes with pulse highlights
  - Caption: fade in without piecewise stagger
- Screen-reader text: include a single top-level `<h2 className="sr-only">` in `YonasReel` describing the reel's purpose: "An animated case-study reel showing a booking inquiry being answered. First an email arrives asking about three artists. The old workflow takes 13 minutes across three spreadsheets and finds all three unavailable. A new booking tool is introduced and answers the same inquiry in seconds, finding a fourth artist available."
- Keyboard: the interactive tool (Beat 3c) must be keyboard-navigable. Calendar arrows are buttons; artist rows are checkboxes; metric cards are non-interactive; replay button is a button. Use native semantics wherever possible.

---

## 9. Responsive Behavior

- **Primary target:** desktop, 1024px+ container width. The component renders at native 1440px internal design and scales down via `transform: scale`.
- **Intermediate widths (768–1024px):** same scaling approach, just scales down more.
- **Mobile (<768px):**
  - Row scale in Beat 2 drops from 1.9× to 1.5×.
  - Beat 3 hides the "City" column in the booking table (already-existing media query pattern).
  - Sidebar in Beat 3 stacks above the main content rather than beside it. Calendar and roster remain full-width.
  - Font sizes drop proportionally via media query or calc().
  - The 1440px native width + `transform: scale` approach still works on mobile — the whole thing just scales down dramatically. That's fine; readability is preserved because we're scaling a desktop layout, not re-laying out.

---

## 10. The Poster Placeholder

Before the reel mounts (i.e., when the section is far from the viewport) or if JavaScript is disabled, show a lightweight placeholder that matches the tool's aesthetic:

- Same `#f9f9f9` background as the reel
- Centered: small Space Grotesk text, 13px uppercase, color `rgba(26, 28, 28, 0.4)`: "YONAS MEDIA / A BOOKING STORY"
- A pulsing yellow dot (`#fcd400`) below the text
- Aspect ratio: match the reel's native 1440×900 (so the layout doesn't shift when the reel mounts in)

This placeholder should be a separate small component (`ReelPoster.tsx`) that's always rendered and always SSR'd — it's what shows in the initial HTML payload. The heavy `YonasReel` interior replaces it when the intersection observer fires.

---

## 11. Integration Instructions

After all files are built:

1. **Home page Yonas Media work card:** Add `YonasReel` as the primary asset. Import it via `next/dynamic` with `{ ssr: false, loading: () => <ReelPoster /> }`. Ensure the work card container provides the same padding/background (`#f7f7f7` or equivalent) as other work cards in the bento.

2. **Yonas Media case study page:** Also render `YonasReel` at the top of that page, in the hero slot. Same import pattern.

3. **Metadata:** If the portfolio has a case-study metadata convention (title, summary, tags), don't invent one — leave that for manual curation. But if there's an obvious `metadata` export pattern already in use, match it with a sensible placeholder.

4. **Test at multiple widths.** Verify the reel renders at 1920px, 1440px, 1024px, 768px, and 375px container widths. It should scale cleanly without layout breakage at all of them.

5. **Performance check.** Run Lighthouse on the home page before and after. The reel should not regress LCP or CLS on the home page. If it does, the most likely cause is the heavy `YonasReel` rendering during SSR — verify the `ssr: false` dynamic import is working.

---

## 12. Reference Code

The following sections contain the working reference implementation that was built in Claude's visualizer (with Ernest present) during the design of this reel. These code blocks are the **source of truth** for the exact motion, styling, and behavior. Port them faithfully to React + Framer Motion. Where this prompt's spec and the reference code conflict, the prompt spec wins (the prompt spec contains corrections made after the reference code was last updated).

### Reference A: Beat 1 + Beat 2 prototype (HTML/CSS/JS)

(Claude Code: this reference is documented in the companion file `how_it_was_built.md` which Ernest will place alongside this prompt in the repo. Read that file before implementing Beats 1 and 2. It covers the typing engine, the scroll mechanics, the row scale origin problem, the verdict stamp grid-cell technique, the tab-dip transition pattern, and the IntersectionObserver cancellation token pattern.)

### Reference B: Beat 3 tool details

The non-obvious implementation details for Beat 3 (donut math, calendar static-height, readiness urgency formula, faux cursor SVG, pulse ripple, caption card structure, interactiveMode flag) are all documented in section 7b above. Refer to that section when implementing Beat 3.

### Reference C: Collapse animation variant B

(Claude Code: The chosen collapse variant is "B" from the five-option comparison: timer scales up center, pulses, holds 1200ms, then falls away with gravity easing, with the first sheet row starting to fall 200ms before the timer clears, followed by a cascade outward from the focal row with 55ms stagger. The tabs and column header fall 300ms before the last row lands.)

---

## 13. Definition of Done

- All six beat components exist and render.
- The parent `YonasReel` orchestrates them end to end without JavaScript errors.
- IntersectionObserver mounting and unmounting work correctly; scrolling past and back triggers replays.
- Caption persists until the user clicks anything, then fades and hands off to interactive mode.
- Calendar navigation, artist toggle, and table re-render all function correctly in Beat 3c.
- `prefers-reduced-motion` is respected with the specified fallbacks.
- The home page Yonas Media work card displays the reel; the case study page also displays it; both autoplay on viewport entry.
- Build passes (`npm run build`) with no new warnings introduced by this code.
- No layout shift on mount (poster placeholder matches reel dimensions).

When complete, write a brief `BUILD_NOTES.md` file alongside the components summarizing:
- Any decisions made via `// DECISION:` comments
- Any deviations from this spec (and why)
- Any known issues to revisit
- Performance observations (LCP impact, bundle size of the reel chunk)

---

**End of prompt. Begin inspection, then build. Do not stop to ask questions.**
