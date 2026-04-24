# About page — build notes

## Asset naming

Photos were copied from the existing `portfolio wireframes/` source folder as
PNGs (`hiking.png`, `guitar.png`, `dogs.png`) rather than the `.jpg`
filenames in the spec, because the source files are PNGs. Renaming the
extension would misrepresent the file format.

## Background composition

- A single SVG (`/about/logo-not-clipped.svg`) acts as the repeating background
  for the entire page. It's applied via CSS:
  `background-size: 105vw auto; background-repeat: repeat-y; background-position: center top;`
  so the composition is always slightly wider than the viewport and tiles
  vertically to cover the page.
- The outer wrapper has no `overflow: hidden` — each tile is clipped to the
  page width naturally by the background painter, and content scrolls freely.
- Opacity is baked into the SVG (`fill-opacity="0.75"` on each circle), so
  the page does not need a wrapper opacity. This keeps every other layer
  (cards, photos, CTA) at full opacity without manual exceptions.

### SVG viewBox fix

The source SVG Ernest provided (1440×1530, viewBox `0 0 1440 1530`) still
clipped three of the four small edge circles at the viewBox boundary (top,
left, right). I widened the viewBox to `-112.5 -90 1665 1620` (and updated
`width`/`height` to match) so every circle is fully contained before the
tile repeats. This preserves the original intent — tiled backgrounds have
breathing room at seams and nothing appears cut in half — without
repositioning any circle inside the composition.

## Layout decisions

- Desktop uses an absolute-positioned canvas (`height: 2100px`) inside a
  `max-w-[1200px]` container, tuned against `public/about/reference-layout.png`.
  Canvas height was lifted from 1680 → 2100 so the bottom card is fully
  scrollable; the previous value was causing the bottom card to be clipped.
- Mobile (< 768px) collapses to a `flex-col` stack with full-width cards and
  photos. The same repeating background applies — there is no separate
  in-flow circle treatment on mobile anymore.
- Dark cards use a literal `#1a1a1a` background + `#f5f5f5` text per spec,
  `rounded-sm` (10px), no border.
- Photos use `rounded-md` (20px) for a softer edge that sits between the
  sharper `rounded-sm` card radius and the larger decorative orange circles.

## Design-system compliance

All paddings, margins, gaps, and radii use design-system tokens from
`src/app/globals.css`:

- Legal spacing scale: `0 / 5 / 10 / 20 / 30 / 40 / 50 / 60 / 80 / 100 / 120 / 160 / 200`
- Legal radii: `rounded-sm` (10px), `rounded-md` (20px), `rounded-lg` (30px)

Paddings (`p-30` on content cards, `p-40` on CTA card, `p-20` on mobile
sections, `px-20 py-10` on the button), section margins (`pt-120 pb-80` on
desktop, `pt-100 pb-60` on mobile), inter-section gaps (`gap-30` mobile,
`gap-20` inside CTA card), and inline rhythm (`mt-5 / mt-20 / mt-30`,
`mx-5`, `space-y-20`) are all token-aligned. Exceptions that remain as
arbitrary values are layout dimensions (not spacing): canvas height,
`max-w-[1200px]`, individual card widths and organic absolute positions,
and the negative-offset accent circles anchored above cards.

## Bottom CTA

Added a dedicated "Let's connect" card below both layouts so the page ends
with a clear call to action at any viewport. The inline `let's connect`
link at the end of the bottom card's copy is still there per the original
spec.

## Email link

All `mailto:` targets use `siteData.email` from `src/data/site.ts`, matching
the existing Nav and Footer contact links.

## Deviations

- The SVG's circles use `#F24405` (from the source file), not the `#F23505`
  listed in the spec. Under the baked-in `fill-opacity="0.75"` this is
  visually indistinguishable from spec.

## Accent color accessibility

`#F23505` (brand accent) fails WCAG AA 4.5:1 as body text against both
`#1a1a1a` (4.38:1) and `#ffffff` (3.97:1). For this page, accent is used
as a *decorative* treatment only — borders, underlines, button background
— never as legible body/link text color. Specifically:

- "Lead UX Designer" is rendered in `#f5f5f5` (inherits card text color),
  font-semibold, no underline.
- The inline "let's connect" link in the bottom card is rendered in
  `#f5f5f5` with a 2px accent underline; hover thickens the underline to
  4px (no hover color change).
- The "Send me an email" CTA button keeps the `bg-accent` background but
  switches text from `text-white` (3.97:1) to `text-black` (5.29:1 — passes
  AA 4.5:1).

## Foreground accent circles

Beyond the repeating background tile, a small set of circles sit in the
*foreground* (z-index 4) to create depth with the cards and photos.
Placements are tuned so each circle only overlaps non-content regions
(photo background edges or card padding zones), and each is anchored to
an element that guarantees a constant relative position across
breakpoints:

- **Hiking photo left edge** (`size 180 · top 260 · left 610`, pinned to
  the content canvas) — covers landscape/sky at the photo's upper-left,
  never the subject.
- **Bottom card (Lately I've been diving deeper) top-right** (`size 140
  · top −120 · right 40`, **anchored inside the card itself**) — sits
  above the card with only a ~20px sliver into the top padding zone.
  Because it's a child of the card (not the canvas), it stays in the
  exact same relationship to the card at every breakpoint — earlier
  placements pinned to canvas coordinates drifted over the text column
  as the canvas narrowed.
- **CTA card top-right corner** (`size 140 · top −40 · right 40`,
  anchored to the CTA card) — the CTA copy is all left-aligned with a
  `max-w-[560px]` paragraph, so the card's upper-right is always empty
  padding.

Desktop only. Mobile keeps just the tiled ambient background (no
foreground layer — content stacks edge-to-edge and a corner nick would
read as an error, not an accent).
