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
- `let's connect` in the body copy uses the project's `text-accent` utility
  (mapped to `#F23505`) so the token stays consistent with other accent
  copy on the site.
