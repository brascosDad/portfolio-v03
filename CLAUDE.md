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

- **Tektur** (`font-display`) — Display font. Used ONLY for the name/logo. Do NOT apply to general headings.
- **SUSE** (`font-sans`) — Default for everything: headings, body text, UI elements.
- Fonts are loaded via `next/font/google` in `layout.tsx` with CSS variables `--font-tektur` and `--font-suse`.

### Radii

- `rounded-sm` (10px) — buttons, small elements
- `rounded-md` (20px) — cards, containers
- `rounded-lg` (24px) — hero images, large elements

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind @theme tokens + global styles
│   ├── layout.tsx           # Root layout, font loading, Nav
│   ├── page.tsx             # Home page
│   ├── akqaqt/page.tsx      # Case study
│   ├── cdlxqt/page.tsx      # Case study
│   └── atqt/page.tsx        # Case study
├── components/
│   ├── nav.tsx              # Sticky navigation
│   ├── hero.tsx             # Hero section with name + bio
│   ├── work-section.tsx     # Case study grid
│   ├── work-card.tsx        # Individual case study card
│   ├── case-study-page.tsx  # Case study detail layout
│   ├── case-study-block.tsx # Content block within case study
│   ├── case-study-meta.tsx  # Meta sidebar (company, role, etc.)
│   ├── case-study-cta.tsx   # Bottom CTA on case studies
│   ├── experience.tsx       # Work experience list
│   ├── hardware-section.tsx # Hardware/tools grid
│   ├── hardware-card.tsx    # Individual hardware card
│   ├── marquee.tsx          # Scrolling text marquee
│   ├── footer.tsx           # Footer with contact CTA
│   ├── section-wrapper.tsx  # Reusable section container (max-w-6xl, px-6)
│   └── placeholder-image.tsx # Placeholder for images not yet added
├── data/
│   └── site.ts              # Central site data (name, bio, links)
└── lib/
    └── types.ts             # Shared TypeScript interfaces
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
