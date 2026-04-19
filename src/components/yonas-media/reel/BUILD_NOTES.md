# Yonas Hero Reel — Build Notes

A summary of how this reel was built against `YONAS_HERO_SEQUENCE_PROMPT.md`, what deviated, and what's still worth revisiting.

## Decisions made during the build

- **Animation library.** The project uses `motion` v12 (the successor package to `framer-motion`, same API). All imports use `motion/react`. `useReducedMotion` comes from there.
- **File placement.** No `components/case-studies/` directory existed; the reel lives in `src/components/yonas-media/reel/` alongside the existing `JourneyMaps.tsx`.
- **Orchestration pattern.** YonasReel's parent orchestrator uses a promise-based `awaitBeat()` handoff. Each beat component runs its own async sequence internally and calls `onComplete` when it's done; the orchestrator `await`s that promise before advancing phase. Cancellation is handled by a per-mount token plus a local `cancelled` flag in each beat's `useEffect` cleanup.
- **Beat 3 subphase state.** Rather than flatten construction/demo/caption/interactive into YonasReel's phase enum, they live inside `Beat3Panel` as a single "beat3" phase with an internal `subphase`. This keeps Beat 3 self-contained and lets the Replay path restart from Beat 1 via a single `replayCount` bump at the YonasReel level.
- **Sheet data shape.** `buildOldWaySheetData` produces 90 rows (Jan + Feb + Mar) so the fast-scroll across months reads as a real sweep rather than a 30-row shuffle. The March 1 focal row is hand-authored per artist to match the verdict.
- **Tab-dip technique.** Implemented with a React state flag (`innerFaded`) rather than the vanilla-JS `transition: none` + reflow trick from the reference doc. The effect is similar — opacity snaps to 0 during the dip, then fades in at 800ms when the next tab mounts — but it relies on React's render cycle instead of forcing a browser reflow. If the dip ever feels soft rather than hard, swap in the reflow approach.
- **Transition continuity.** `TransitionCollapse` renders its own simplified sheet snapshot (15 rows, focal at index 7) reusing the chrome components exported from `Beat2OldWay`. A true cross-fade with Beat 2's exact final frame would require either keeping Beat 2 mounted during the collapse or snapshotting DOM state — both add complexity for a handoff that lasts one frame.
- **Cursor targeting.** Demo cursor positions are computed at run-time via `getBoundingClientRect()` of each target, converted into native 1440-space coordinates by dividing through the scaler's scale factor. Ref callbacks on Beat3Tool's interactive elements populate a map in Beat3Panel.
- **interactiveMode gating.** Click handlers in Beat3Tool short-circuit the actual state change when `interactiveMode` is false, but still call `onAnyInteraction`. This preserves hover states during demo/caption and lets the first real click during the caption phase trigger the fade-out.

## Deviations from the spec

- **Bleed icon heights.** The prompt calls for per-icon pixel heights (warning 79px, calendar 79px, cash 86px). The current icons use a 90×90 viewBox with `width="auto"` and approximate shapes rather than the exact normalized heights. Visual intent is right; dimensions are close but not measured.
- **Cross-fade between beats.** The prompt describes a 700ms opacity cross-fade on Beat 1 → Beat 2. Beat 1 fades out before unmounting, but Beat 2 mounts at full opacity right after — no overlapping fade. Fine for a handoff at 1440×900 but could be tightened with `AnimatePresence mode="sync"`.
- **Sheets chrome fidelity.** Top bar, menu bar, toolbar, and column headers are visually evocative but not pixel-exact to Google Sheets. The prompt specifies "approximated, not copying"; the current chrome meets that bar without full brand mimicry.
- **Calendar wiring during demo.** The demo always advances forward via `onAdvanceMonth` (increments `selectedMonthIdx`). The `prevMonth` cursor target exists for symmetry with interactive mode but isn't used in the scripted sequence.

## Known issues to revisit

- **No AnimatePresence cross-fades** between phases — Beat 1/Beat 2/Transition/Beat 3 swap via unmount/mount. Visually acceptable but not as smooth as the spec implies.
- **Bleed-icon visual weight.** Icons are drawn inline with simple `<path>` strokes rather than pulled from Lucide or a custom set. If they feel thin, swap to lucide-react's `AlertTriangle`, `Calendar`, `Banknote` at 90px with stroke-width 2.
- **Responsive behavior for mobile.** The scaler handles width scaling cleanly. The spec asks for Beat 2 row-scale to drop from 1.9× to 1.5× below 500px and the Beat 3 table to hide the City column; neither is implemented. Current approach: the entire 1440 layout scales down proportionally, so text gets small but still readable.
- **Accessibility keyboard path.** Screen reader `<h2 class="sr-only">` exists. Keyboard navigation through interactive mode's calendar arrows, day grid, and artist rows works via native button/button-like elements, but hasn't been end-to-end keyboard-tested.
- **Reduced motion.** Implemented at each beat (skip typing, skip cursor, show pieces at once, etc.), but not verified in a real `prefers-reduced-motion` session.

## Performance notes

- The reel is code-split via `next/dynamic` with `ssr: false` at both consumption sites (homepage `WorkCard` and `/work/yonas-media` hero), so its JS doesn't land in the initial home-page bundle.
- `IntersectionObserver` gates mount-of-interior to within ~1.5× viewport, and unmounts when further than ~2× away. Scrolling past and back re-runs the orchestrator from Beat 1.
- `ResizeObserver` recomputes the scale on container-width changes.
- Only `transform` and `opacity` are animated throughout; no layout-triggering properties.
- Production build (`npm run build`) compiles cleanly with no new warnings; LCP/CLS impact not measured against a baseline yet.

## File map

```
src/components/yonas-media/reel/
├── tokens.ts               # Colors, fonts, TIMING constants, native dimensions
├── data.ts                 # Months, artists, bookings, email body, sheet filler
├── ReelPoster.tsx          # SSR-safe placeholder
├── YonasReel.tsx           # Parent: IntersectionObserver, scale-to-fit, phase orchestrator
├── Beat1Email.tsx          # Gmail chrome + typing engine
├── Beat2OldWay.tsx         # Sheets chrome + three-tab sequence + 13:00 timer
├── TransitionCollapse.tsx  # Timer fly-to-center + row cascade
├── Beat3Panel.tsx          # Beat 3 subphase orchestrator + refs
├── Beat3Tool.tsx           # Atelier tool UI (nav, sidebar, metrics, table)
├── Beat3Demo.tsx           # Auto-demo overlay with cursor + pulses
├── ReelCaption.tsx         # Piecewise caption card
├── FauxCursor.tsx          # Demo cursor SVG
├── index.ts                # Re-exports YonasReel + ReelPoster
└── BUILD_NOTES.md          # This file
```
