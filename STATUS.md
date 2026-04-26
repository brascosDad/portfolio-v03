# Portfolio v03 — Session Status

Last updated: 2026-04-26
Branch: `feature/yonas-hero-reel`

## What changed this session

All work focused on the Home Depot case study (`/homedepot`).

### 1. Sprint diagram (`SprintStructure.tsx`)
- Reverted "Opportunity prioritization" card description to its original one-sentence form (a prior session had appended unreadable narrative copy to the card; that narrative was moved to the body paragraph above the diagram in `case-studies.ts`).
- In the Output card, replaced the "Details available on request" lock row with three white-bg pill chips: **Onboarding · Profile building · Job application**. Pills sit between "Opportunity areas identified" and the "Each backed by converging evidence…" subtext. Applied in both desktop and mobile blocks. `LockIcon` helper removed (no remaining usage).

### 2. Section heading rename
- "Making the Time" → **"Finding a Strong Signal"** (in `case-studies.ts`).

### 3. New component: `OnboardingWireframes`
Path: `src/components/homedepot/OnboardingWireframes.tsx`. Static, no interactivity.
- Renders two competing onboarding prototypes — Proto A (Ultra-short, 2 screens) and Proto B (Standard, 4 screens).
- Style: black/white only, `#2C2C2A` for borders/text, `#696969` for solid button fill (lightened from the original dark per design feedback), `#B4B2A9` for field borders, `#888780` for muted text. No pure black, no brand color.
- Font: `var(--font-roboto)` (chosen over the default body font so the wireframes read as mobile UI rather than long-form prose).
- Layout responsive across breakpoints:
  - **Below `md`**: two prototypes stacked vertically, each prototype's flow stacked vertically with `↓` arrows.
  - **`md` and up**: each prototype's flow goes left-to-right with `→` arrows; phones use `flex-1 basis-0 max-w-[220px]` so they shrink to fit the 720px body container.
  - **`lg` and up**: entire wireframe section scales 1.10× via `transform: scale` with `transform-origin: top left`. `lg:pb-32` on the section absorbs the resulting vertical overhang.
- Both prototype flow rows use `md:justify-start` so phones sit flush with the column-label left edge.
- Inserted into the "Finding a Strong Signal" section between the first and second `bodyExtra` paragraphs (after "…month or more.", before "Our bar for a meaningful signal…").

### 4. Inline-component plumbing
To support placing a component between paragraphs of `bodyExtra`, added:
- `inlineComponent?: { id: string; afterParagraph: number }` field on `CaseStudySection` (`src/lib/types.ts`).
- Registry + render logic in `case-study-block.tsx` (`inlineComponentMap`, paragraph-aware splitting). `afterParagraph: 0` would render before the first `bodyExtra` paragraph; `afterParagraph: 1` is the only value used today.

### 5. Case study brief — second paragraph
Added a paragraph to the Home Depot brief covering team composition (sole designer; cross-functional team with FE + BE devs, PM, two marketing stakeholders, dedicated UX researcher) and noting the close collaboration with the PM and UX researcher.

## Branch state
- Local branch is **9 commits ahead** of `origin/feature/yonas-hero-reel` (8 prior + 1 new from this session).
- An untracked `package-lock 2.json` sits at the project root — looks accidental (duplicate lockfile from a copy/merge). **Not committed.** Consider deleting.

## Anything pending / worth eyeballing
- The 1.10× scale on `OnboardingWireframes` at `lg` is a `transform: scale` (not actual size growth). Inner text remains pixel-sized so the visual fidelity is fine, but if you ever change content height significantly, re-check that `lg:pb-32` still absorbs the overhang.
- I have not opened `/homedepot` in a browser to spot-check the visual changes — `npm run build` passed clean but visual QA is on you.
