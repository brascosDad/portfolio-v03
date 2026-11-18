# Design System — Ernest Son Portfolio

> Single source of truth for all styling decisions.
> Tokens defined in `src/app/globals.css` via the Tailwind v4 `@theme` block.

---

## Colors

### Text

| Token                  | Value     | Utility              | Usage                              |
| ---------------------- | --------- | -------------------- | ---------------------------------- |
| `--color-text-primary`   | `#222222` | `text-text-primary`    | Headings, primary content          |
| `--color-text-secondary` | `#696969` | `text-text-secondary`  | Subtitles, labels                  |
| `--color-text-muted`     | `#676767` | `text-text-muted`      | Body copy, descriptions, metadata  |

### Accent

| Token                  | Value     | Utility              | Usage                              |
| ---------------------- | --------- | -------------------- | ---------------------------------- |
| `--color-accent`         | `#F23505` | `text-accent` `bg-accent` | CTAs, links, highlights, selection |
| `--color-accent-hover`   | `#F23205` | `bg-accent-hover`    | Hover/active states on accent      |

### Background

| Token                  | Value     | Utility              | Usage                              |
| ---------------------- | --------- | -------------------- | ---------------------------------- |
| `--color-bg-primary`     | `#FFFFFF` | `bg-bg-primary`      | Page background, card surfaces     |
| `--color-bg-secondary`   | `#F7F7F7` | `bg-bg-secondary`    | Alternate section backgrounds      |

### Border

| Token                  | Value     | Utility              | Usage                              |
| ---------------------- | --------- | -------------------- | ---------------------------------- |
| `--color-border`         | `#E5E5E5` | `border-border`      | Dividers, card borders, separators |

---

## Typography

### Font Families

| Token            | Font            | Utility        | Usage                                    |
| ---------------- | --------------- | -------------- | ---------------------------------------- |
| `--font-display` | Hanken Grotesk  | `font-display` | Display — name/logo treatment            |
| `--font-sans`    | Hanken Grotesk  | `font-sans`    | Everything — headings, body, UI          |
| `--font-heading` | Hanken Grotesk  | `font-heading` | Hero text, large display headings        |

### Type Scale

| Level     | Example                                              | Desktop (lg) | Tablet (md) | Mobile (default) |
| --------- | ---------------------------------------------------- | ------------ | ----------- | ---------------- |
| Display   | Role Descriptors (hero words)                        | 120px        | 100px       | 80px             |
| Heading   | "Let's work together", Case Study titles             | 24px         | 22px        | 20px             |
| Body      | Section headers, subtitles, nav links, button text, body copy, metadata | 20px | 18px | 16px |
| Caption   | Copyright, badges, fine print                        | 16px         | 14px        | 12px             |

> Breakpoint mapping: Mobile = default, Tablet = `md:` (768px), Desktop = `lg:` (1024px)

---

## Spacing

Pixel-based scale defined as `--spacing-{n}`.

| Token | Value | Tailwind class |
| ----- | ----- | -------------- |
| `0`   | 0px   | `p-0` `m-0`   |
| `5`   | 5px   | `p-5` `gap-5`  |
| `10`  | 10px  | `p-10` `gap-10` |
| `20`  | 20px  | `p-20` `gap-20` |
| `30`  | 30px  | `p-30` `gap-30` |
| `40`  | 40px  | `p-40` `gap-40` |
| `50`  | 50px  | `p-50` `gap-50` |
| `60`  | 60px  | `p-60` `gap-60` |
| `80`  | 80px  | `p-80` `gap-80` |
| `100` | 100px | `p-100`        |
| `120` | 120px | `p-120`        |
| `160` | 160px | `p-160`        |
| `200` | 200px | `p-200`        |

---

## Border Radius

| Token          | Value | Utility      | Usage                        |
| -------------- | ----- | ------------ | ---------------------------- |
| `--radius-sm`  | 10px  | `rounded-sm` | Buttons, small elements      |
| `--radius-md`  | 20px  | `rounded-md` | Cards, containers            |
| `--radius-lg`  | 30px  | `rounded-lg` | Hero images, large elements  |

---

## Breakpoints (reference)

| Name         | Width    | Description                |
| ------------ | -------- | -------------------------- |
| Small Mobile | < 390px  | Compact single column      |
| Mobile       | 390px+   | Standard single column     |
| Tablet       | 810px+   | Two column where needed    |
| Desktop      | 1200px+  | Full layout                |

> In code, use Tailwind's `sm:` (640px), `md:` (768px) and `lg:` (1024px) breakpoints
> as close approximations, or add a custom `xs:` (390px) breakpoint if needed.

---

## Components

### Walkthrough card (`walkthroughs-section.tsx`)

Home page video card: 16:9 thumbnail, title, subtitle. Data in `src/data/walkthroughs.ts`.

| Part           | Tokens                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| Thumbnail      | `aspect-video rounded-md border border-border bg-bg-secondary`          |
| Play button    | 56px mobile / 72px md+, `rounded-full bg-accent text-bg-primary`         |
| Duration chip  | `rounded-sm bg-text-primary text-bg-primary px-10 py-5`, Caption size    |
| Title          | Heading scale, `font-bold text-text-primary`                            |
| Subtitle       | Body scale, `text-text-muted`                                           |
| Details line   | Caption scale, `text-text-secondary`                                    |
| Card gap       | `gap-20` thumbnail to text, `gap-5` title to subtitle                   |
| Grid           | 1 column, `gap-40`; 2 columns at `md:`, `gap-30`                         |

States:

| State        | Behavior                                                                 |
| ------------ | ------------------------------------------------------------------------ |
| Not recorded | No `loomId`. Play button `bg-text-secondary`, chip reads "Coming soon", button disabled. Section hidden in production until every card is recorded. |
| Default      | Poster (or plain surface), accent play button, duration chip.            |
| Hover        | Play button `bg-accent-hover`, scales to 105%.                          |
| Focus        | Inset `ring-2 ring-accent` on the thumbnail button.                     |
| Playing      | Thumbnail swaps for the Loom embed (autoplay). Details line and optional link pill appear under the subtitle. Fires GA4 `walkthrough_play` once per video. |

---

## Quick Reference

```html
<!-- Display heading (name only) -->
<h1 class="font-display text-4xl font-semibold">Ernest Son</h1>

<!-- Subtitle / role -->
<p class="text-text-secondary">Lead Product Designer</p>

<!-- Body copy -->
<p class="text-text-muted">Description text here...</p>

<!-- Accent CTA button -->
<a class="bg-accent hover:bg-accent-hover text-white rounded-sm px-20 py-10">
  Get in touch
</a>

<!-- Card -->
<div class="bg-bg-primary border border-border rounded-md p-20">
  Card content
</div>

<!-- Alternate section -->
<section class="bg-bg-secondary py-80">
  Section content
</section>
```
