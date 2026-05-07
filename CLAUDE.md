# Portfolio v03 — Project Guide

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4.2.1 — CSS-first configuration via `@theme` in `globals.css`
- **PostCSS:** `@tailwindcss/postcss` (see `postcss.config.mjs`)
- **Animation:** Motion (Framer Motion v12)
- **Linting:** ESLint with `next/core-web-vitals` + `next/typescript`
- **Utilities:** `clsx` for conditional class merging

## Important: No `tailwind.config.js`

This project uses Tailwind v4's CSS-first approach. All design tokens live in `src/app/globals.css` inside the `@theme` block. Do NOT create a `tailwind.config.js` or `tailwind.config.ts`.

## Design System

**Source of truth:** `DESIGN_SYSTEM.md` at the project root. Always reference it for token names, values, and usage patterns.

### Colors (quick ref)

| Utility             | Hex       | Use for                        |
| ------------------- | --------- | ------------------------------ |
| `text-text-primary`   | `#222222` | Headings, primary content      |
| `text-text-secondary` | `#696969` | Subtitles, labels              |
| `text-text-muted`     | `#676767` | Body copy, descriptions        |
| `text-accent`         | `#F23505` | Links, highlights              |
| `bg-accent`           | `#F23505` | CTA buttons                    |
| `bg-accent-hover`     | `#F23205` | Hover state on accent buttons  |
| `bg-bg-primary`       | `#FFFFFF` | Page background, card surfaces |
| `bg-bg-secondary`     | `#F7F7F7` | Alternate section backgrounds  |
| `border-border`       | `#E5E5E5` | Dividers, card borders         |

### Typography

- **Hanken Grotesk** is the single typeface for the whole site. All three font tokens (`font-display`, `font-sans`, `font-heading`) alias to it via `--font-hanken`.
- Loaded in `layout.tsx` via `next/font/google` (`Hanken_Grotesk`). A few additional families (Roboto, Alfa Slab One, Space Grotesk, Inter) are also wired up as CSS variables for ad-hoc use, but the design system defaults to Hanken Grotesk everywhere.
- Do NOT apply `font-display` to general headings. It's reserved for the name/logo treatment in case it's ever swapped to a distinct display face.

### Radii

- `rounded-sm` (10px) — buttons, small elements
- `rounded-md` (20px) — cards, containers
- `rounded-lg` (30px) — hero images, large elements

## Project Structure

```
src/
├── app/
│   ├── globals.css                  # Tailwind @theme tokens + global styles
│   ├── layout.tsx                   # Root layout, font loading, Nav, GA4
│   ├── page.tsx                     # Home page
│   ├── about/page.tsx               # About page (full-bleed logo background)
│   └── work/                        # All case studies live under /work/
│       ├── akqaqt/page.tsx
│       ├── atqt/page.tsx
│       ├── cdlxqt/page.tsx
│       ├── homedepot/page.tsx       # Password-gated full version at /work/homedepot/full
│       └── yonas-media/page.tsx
├── components/
│   ├── nav.tsx                      # Sticky navigation
│   ├── hero.tsx                     # Hero section: stacked role words + info bar
│   ├── work-section.tsx             # Case study grid
│   ├── work-card.tsx                # Individual case study card
│   ├── case-study-page.tsx          # Case study detail layout
│   ├── case-study-block.tsx         # Content block within case study
│   ├── case-study-meta.tsx          # Meta sidebar (company, role, etc.)
│   ├── case-study-cta.tsx           # Bottom CTA on case studies
│   ├── experience.tsx               # Work experience list
│   ├── hardware-section.tsx         # Hardware/tools grid
│   ├── hardware-card.tsx            # Individual hardware card
│   ├── marquee.tsx                  # Scrolling text marquee
│   ├── footer.tsx                   # Footer with contact CTA
│   ├── section-wrapper.tsx          # Reusable section container
│   ├── caption.tsx                  # Shared left-bordered caption block (bold label + body)
│   ├── auto-carousel.tsx            # Auto-advancing carousel with per-slide caption + selection badge
│   ├── lightbox.tsx                 # Modal full-size image viewer
│   ├── placeholder-image.tsx
│   ├── homedepot/                   # HD-specific blocks (sprint structure, prototypes, etc.)
│   └── yonas-media/                 # Yonas-specific blocks (journey maps, MVP table, reel/)
├── data/
│   ├── site.ts                      # Site-wide data (name, email, links)
│   ├── case-studies.ts              # Case study meta/sections
│   ├── experience.ts
│   ├── hardware.ts
│   └── skills.ts
└── lib/
    ├── types.ts                     # Shared TypeScript interfaces
    ├── analytics.ts                 # GA4 helpers + measurement ID
    └── use-is-lg.ts                 # Hook for lg-breakpoint media query
```

## Conventions

### Components
- One exported component per file, named export (not default)
- Use `interface` for props, defined in the same file
- Use `clsx` for conditional/merged class names
- `SectionWrapper` for consistent section spacing (`max-w-6xl px-6 py-16 md:py-24`)

### Styling
- Use Tailwind utility classes. Avoid inline styles.
- Use design system tokens — don't hardcode hex values in components.
- For conditional classes, use `clsx()` (already a dependency).

### Data
- Site-wide data lives in `src/data/site.ts` (name, email, LinkedIn, etc.)
- Case study data is co-located or imported per route.
- Types are in `src/lib/types.ts`.

### Path aliases
- `@/*` maps to `./src/*` (configured in `tsconfig.json`)

## Do NOT

- Create `tailwind.config.js` or `tailwind.config.ts`
- Apply `font-display` (Tektur) to anything other than the name/logo
- Apply `font-heading` to h1-h6 tags globally (this was removed intentionally)
- Hardcode color values — always use the token utilities
- Add dependencies without asking first

## Commands

```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run lint    # ESLint check
```

## Reference

- Framer reference site: https://ernestleeson.com
- Design tokens: `DESIGN_SYSTEM.md`
- Favicon/logo source: `public/logo.svg` (accent orange `#F23505`)
