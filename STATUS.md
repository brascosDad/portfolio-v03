# Portfolio v03 — Session Status

Last updated: 2026-04-28
Branch: `feature/yonas-hero-reel`

## What changed this session

All work focused on the Yonas Media case study (`/work/yonas-media`), plus a global caption-style consistency pass and supporting infrastructure.

### 1. Yonas role label
`src/data/case-studies.ts` — Yonas meta `role` updated:
- "Designer + Developer + Strategist" → "Solo Designer, Developer & Project Lead"

### 2. New shared `Caption` component
- `src/components/caption.tsx` — left-bordered, accent-tinted caption block (`border-l-2 border-accent`, `bg-accent/[0.06]`, `rounded-r-[6px]`). Optional bold `label` inline with the body text.
- Adopted on the live-prototype caption (`case-study-page.tsx`), the video MediaBlock caption (pulled out of the video frame so it isn't double-bordered), `JourneyMaps`, the Home Depot `PrototypesShowcase`, and per-slide carousel captions.
- `SprintStructure` and `CompetitiveGrid` already used the same inline classes — left as-is.

### 3. Sketch carousel — captions + reorder
"Built Around How They Think" sketches now appear in the order Calendar-first → Date-first → Venue, each with a bold-label caption rendered via the AutoCarousel's per-slide caption support.

### 4. Visual direction carousel — badge + caption
- Per-slide selection badge (✓ Selected direction / ✗ Not selected) in the top-right of the image earlier, then moved to a centered row directly below the image (above the caption block) per design feedback. Dots stay inside the image at bottom-center.
- Per-slide bold-label caption (Neo-Swiss / Cyber-Tactical / Refined Industrial) rendered in the new shared Caption style.
- AutoCarousel default dwell extended to 8s when any slide has a caption (3.5s otherwise).

### 5. AutoCarousel infra
`src/components/auto-carousel.tsx` — `imageCarousel` items now accept optional `selected: boolean` and `caption: { label, body }` fields. Captions stack in a single grid cell (so block height matches the tallest caption — no layout jump on swap). Badge crossfades on slide change via Framer Motion `AnimatePresence`.

### 6. Journey map — F-pattern pan + lightbox
`src/components/yonas-media/JourneyMaps.tsx` rewritten:
- Portrait container (`aspect-[4/5]`), image at `w-[150%]` with `max-w-none` so Tailwind preflight's `img { max-width: 100% }` doesn't cap the override.
- F-pattern CSS keyframe animation (`journeyMapPan` in `globals.css`): top header L→R → step down through actions / touchpoints / thinking & feeling → pan right across thinking & feeling for the emotional column → step down through pain points → opportunities → hold. Held at `scale(2)` throughout (no zoom-out at the end). 36s total duration, `ease-in-out`.
- `prefers-reduced-motion` users see the top-left static state.
- Click anywhere on the container opens the lightbox at full size (replaced the previous inline-expand pattern).
- Caption beneath via the new Caption component.

### 7. `customComponentLayout` field on `CaseStudySection`
- Added `customComponentLayout?: "stacked" | "side-by-side"` to `src/lib/types.ts`.
- `case-study-block.tsx` extended: when set to `"side-by-side"`, the section renders heading/body/bodyExtra in one column and the custom component in the other (using the same alternating left/right logic as image sections).
- "The Hidden Cost" uses this flag so the journey map sits in a 2-col row alongside the body copy instead of full-width-stacked.

### 8. Section copy — bodyExtra additions
- "Built to Be Used" — added a paragraph on the column-reduction tradeoff (Google Sheets had 8–10 columns, simplification meant pushback but cognitive load was the real cost).
- "A New Baseline" — added a paragraph on the post-launch date-range adjustment (eleventh-hour but unsurprising).
- `case-study-block.tsx` text-only path now renders `bodyExtra` paragraphs (the custom-component path already did).

### 9. Tailwind preflight gotcha (worth remembering)
Tailwind preflight applies `img { max-width: 100% }`, which silently caps any `w-[NNN%]` set via utility class. When you need an `<img>` larger than its container (e.g., for a pan-zoom animation), add `max-w-none` alongside the width utility.

## Files touched
- `src/lib/types.ts`
- `src/data/case-studies.ts`
- `src/components/caption.tsx` (new)
- `src/components/case-study-block.tsx`
- `src/components/case-study-page.tsx`
- `src/components/auto-carousel.tsx`
- `src/components/yonas-media/JourneyMaps.tsx`
- `src/components/homedepot/PrototypesShowcase.tsx`
- `src/app/globals.css`
- `CLAUDE.md`
- `STATUS.md`

## Branch state
- All changes verified with `npm run build` (clean).
- Untracked `package-lock 2.json` at project root — accidental, **not committed**, consider deleting.

## Up next
- Pick which row/column percentages need nudging on the journey map after viewing in dev.
- Decide whether to roll the Caption refactor into `SprintStructure` and `CompetitiveGrid` for code consistency (they already match visually).
