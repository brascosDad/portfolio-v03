# Yonas Hero Reel — Build Notes

Snapshot of how the reel is wired today. Updated after the story-strip
redesign, range-selection calendar, and value-statement beat.

## Where it runs

- **Homepage** — `WorkCard` mounts `YonasReel` (the full narrative: email → sheets → crumble → new tool → interactive).
- **Case study `/work/yonas-media`** — `YonasMediaHero` mounts `YonasPrototype` (Beat 3 only, interactive from first frame, no story strip).

Both surfaces are code-split with `next/dynamic` + `ssr: false`, with `ReelPoster` as the fallback.

## Narrative architecture

The narration is **outside the screen**. A dark `StoryStrip` sits above the silver MacBook-style laptop frame; the frame wraps the 1440×900 scaled content. This keeps the copy from competing with the animation and lets the strip carry the story across phase/subphase boundaries without in-reel overlays.

- **Bezel color**: `#8a8a8c` (space-gray silver), 15px thick, 20px outer radius.
- **Strip**: fixed 64px height so the timer or Replay button appearing/disappearing can't re-flow the layout. Cross-fades the eyebrow + body text when either changes.

`StoryState` shape:
```
{ eyebrow: string; text: string; timerMs: number | null; emphasize: boolean }
```

`emphasize = true` flips the eyebrow to yellow and swaps the right slot from the timer pill to the **Replay demo ↓** button. `onReplay` is owned by `YonasReel` and passed directly into `StoryStrip` — neither `Beat3Panel` nor `Beat3Tool` touch it.

## Phases and subphases

| Phase | Subphase | Strip eyebrow | Strip text | Timer |
|---|---|---|---|---|
| `beat1` | — | `Inquiry` | "Dana at Blue Heron asks Ben if Cora, Jonah, or The Marcel Trio are free on March 1, 2027." | none |
| `beat2` | — | `The old way` | cycles per tab: scroll → verdict (6 lines total) | 00:00 → 13:00 |
| `transition` | — | `The old way` | "No match. Time to try something else." | 13:00 (frozen) |
| `beat3` | `construction` | `The new way` | "Same inquiry. New tool." | none |
| `beat3` | `demo` | `The new way` | "Pick the date" → "Scan the roster" → "Who's free?" | 00:00 → 01:10 |
| `beat3` | `caption` | `The new way` | "Dana has her answer. She books Lila Moreno." | 01:10 (frozen) |
| `beat3` | `value` | `The new way` | "01:10 vs 13:00 — 91% faster." | 01:10 (frozen) |
| `beat3` | `interactive` | `Your turn` (yellow) | "Click around!" | none → **Replay demo ↓** |

The case-study prototype (`YonasPrototype`) mounts Beat 3 with `startInteractive`, skipping every subphase before `interactive` and running the tool silent — no story emission.

## Data model (2027)

All dates shifted to **January / February / March 2027**.

- `MONTHS` — three month records with correct `firstDayOfWeek` offsets.
- `BOOKINGS` — 15 artists, each with 2–3 bookings spread across the three months. **Lila Moreno has no March 1 booking on purpose** — that absence is the "open night" answer the demo lands on.
- Every booking carries a `readiness` field (0–45). Because every gig is ~a year out, values are intentionally low across the board. The readiness bar just renders dark gray at the % width; 0 = empty track.
- `BookingStatus` union covers `confirmed | hold | offer | serious | interest | needfill`. "Available" is derived from booking absence, not a status value.
- Email: subject/body reference "March 1, 2027" and the Sheets filename is `Yonas_Bookings_2027`.

## Date-range selection

`Beat3Panel` owns `rangeStart`, `rangeEnd`, `pendingCommit` (DateKey-based). Click rules:

1. If `!pendingCommit`: any click starts a fresh selection — `start = click`, `end = null`, `pendingCommit = true`.
2. If `pendingCommit && !end`: click after start sets end; click ≤ start resets start.
3. If `pendingCommit && end`: third click in-calendar resets to a fresh start.

**Commit triggers** (all call `setPendingCommit(false)`):
- `onMouseLeave` on the calendar card (desktop).
- Document-level `pointerdown` outside the card (touch + any click elsewhere).
- `onBlur` with `relatedTarget` outside the card (keyboard tab-out).

Visual highlight: start and end cells get solid yellow (`secondaryContainer`); days strictly between get 40% opacity yellow. Range footer below the grid shows `Jan 12, 2027 → Jan 15, 2027` (or `Pick a date` placeholder, or `Jan 12, 2027 → pick end` while pending).

## Bookings table

`buildTableRows` drives rendering:

- **Range mode** (both start and end set): one row per **(artist × date in range)**, grouped by artist. The artist name is shown only on the first row of each artist's group — subsequent rows leave the name cell blank for a natural indented feel.
- **Single-date mode** (start only): one row per selected artist for that day.
- **No selection fallback**: artist's first booking in the currently-viewed month, or "Available" if none.
- **Empty state**: only when zero artists are selected.

"Available" rows show `Available` in plain body text (no pill) and an empty readiness bar. The readiness bar has no text label under it — the bar alone carries the signal.

## Demo (Beat 3)

`Beat3Demo` drives the scripted auto-demo: faux cursor + pulses. The demo currently picks **Mar 1, 2027** as a single date (no range) and toggles Cora → Jonah → Marcel → Lila. All prop callbacks are mirrored into refs inside `Beat3Demo` so the orchestration effect can be a true one-shot with `[reducedMotion]` deps without stale-closure risk.

## Timer math

- **Old-way** (Beat 2): real elapsed mapped to 0..780000ms over the per-tab orchestration total. Freezes at 13:00 when the Marcel verdict lands.
- **New-way** (Beat 3 demo): real elapsed mapped to 0..70000ms over `BEAT3_DEMO_REAL_MS` (≈12s). Freezes at 01:10 on demo complete, held through caption + value, cleared at interactive.
- Both timers are state-owned by the relevant beat and pushed to the strip via `onStoryUpdate({ timerMs })` on each tick (~10 Hz).

## Refs as latest-callback

Every beat uses a "ref the prop, read `.current` inside async effects" pattern so orchestration effects can mount once and not restart when parents re-render. The assignment is done inside a `useEffect` (not during render) so React 19's `react-hooks/refs` rule stays happy.

## File map

```
src/components/yonas-media/reel/
├── tokens.ts               # Colors, fonts, TIMING constants, native 1440×900
├── data.ts                 # Months, artists, bookings, DateKey helpers, email body
├── StoryStrip.tsx          # Dark narration ribbon above the screen; timer + Replay slot
├── ReelPoster.tsx          # SSR-safe placeholder
├── YonasReel.tsx           # Full reel: phase orchestrator, scale-to-fit, strip + framed screen
├── YonasPrototype.tsx      # Case-study variant: Beat 3 in interactive-only mode
├── Beat1Email.tsx          # Gmail chrome + typing engine
├── Beat2OldWay.tsx         # Sheets chrome + 3-tab sequence + running 13:00 timer
├── TransitionCollapse.tsx  # Crumble + fall-apart handoff (no more fly-to-center)
├── Beat3Panel.tsx          # Beat 3 subphase orchestrator + range/day/artist state
├── Beat3Tool.tsx           # Atelier tool UI (nav, sidebar, metrics, table)
├── Beat3Demo.tsx           # Auto-demo cursor + pulses
├── FauxCursor.tsx          # Demo cursor SVG
├── index.ts                # Re-exports YonasReel, YonasPrototype, ReelPoster
└── BUILD_NOTES.md          # This file
```

## Known follow-ups / not done

- The three `<img>` lint warnings in `work-card.tsx` and the one in `JourneyMaps.tsx` predate this work and haven't been migrated to `next/image`.
- The demo doesn't exercise the range feature — it picks a single date. Range selection is purely discovered in interactive mode after the hand-off.
- The new-way timer tick assumes `BEAT3_DEMO_REAL_MS ≈ 12000`; if the scripted demo timings in `TIMING.demo` shift significantly, re-calibrate that constant so the timer still lands at 01:10 on demo complete.
