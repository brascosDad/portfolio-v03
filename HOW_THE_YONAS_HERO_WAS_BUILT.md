# How the Yonas Media reel is built

A reference document covering the techniques used across all six beats, written with enough explanation of the vocabulary that future animation conversations can skip the preamble. Read this once, skim it later.

## The stack

Pure HTML, CSS, and vanilla JavaScript for the visualizer prototypes. React + Framer Motion for the production build in the Next.js portfolio. No video, no Lottie, no animation libraries beyond Framer Motion itself. The entire six-beat reel runs on native browser APIs (CSS transitions, keyframes, requestAnimationFrame) coordinated by async functions with cancellation tokens.

## Vocabulary you'll want

### CSS transforms (the properties that animate things)

`translateX(value)` and `translateY(value)` move an element left-right or up-down without affecting layout. Measured in pixels, percentages (of the element's own size), or viewport units. When you want something to slide, you translate it.

`scale(value)` grows or shrinks an element. `scale(1)` is native size. `scale(2)` is twice as big in both dimensions. `scale(0)` makes it invisible by collapsing it to a point. Critical detail: scaling happens from the `transform-origin`, which defaults to the element's center. Change the origin to `right center` and the element grows leftward while its right edge stays pinned.

`rotate(value)` spins an element around its transform-origin. Measured in degrees. Negative rotates counter-clockwise.

These three can be chained: `transform: translateY(100px) rotate(-6deg) scale(0.9)` does all three at once. Browser compositors handle this efficiently on the GPU.

`opacity` fades an element. `0` is invisible, `1` is fully visible. Like transforms, opacity is GPU-accelerated.

**The performance rule:** Only animate `transform` and `opacity`. Animating `width`, `height`, `top`, `left`, `margin`, or `padding` causes the browser to re-lay-out the page, which is slow and stutters on lower-end devices. Everything in this reel animates transform or opacity.

### Easing (how the animation feels)

Linear easing is robotic — it moves at the same speed the whole way through. Nothing in the physical world moves that way, so linear animations read as mechanical.

`ease-in` starts slow and speeds up. Good for things falling (gravity).

`ease-out` starts fast and slows down. Good for things arriving (they decelerate as they settle).

`ease-in-out` does both. Feels gentle and natural for most UI movement.

`cubic-bezier(x1, y1, x2, y2)` lets you specify a custom easing curve with four control points. We use specific curves throughout:

- `cubic-bezier(0.22, 1, 0.36, 1)` — a strong ease-out, used for the Beat 2 fast-scroll. Feels like flicking a scroll wheel.
- `cubic-bezier(0.5, 0, 0.85, 0)` — gravity-like ease-in, used for the collapse. Things that fall don't slow down at the end.
- `cubic-bezier(0.34, 1.56, 0.64, 1)` — a spring curve that overshoots past the endpoint before settling. Used for the row scale in Beat 2 and every construction piece in Beat 3. Makes things feel alive rather than mechanical.

When something "springs" or "bounces" into place, it's a spring curve. When something "drops" or "falls," it's gravity easing.

### Duration conventions

- **Under 150ms:** reads as instant. Good for hover states and state changes.
- **300–500ms:** standard UI animation. Most transitions live here.
- **600–900ms:** deliberate, noticeable. Used when the motion itself is the content (row scale, collapse, pulse-in).
- **Over 1000ms:** cinematic. Used sparingly for hero moments (the 13:00 pulse hold, the scroll across a spreadsheet).

### Stagger and delay

`animation-delay` holds an animation back before it starts. A "stagger" is a series of similar animations each offset by a fixed amount — like the construction sequence in Beat 3 where nav plays at 0ms, sidebar at 320ms, head at 700ms, etc. Stagger creates rhythm. Without it, everything animating together reads as one blob; with it, you get a sense of sequence.

## Beat 1: the typed-out email

**Visual chrome:** Gmail-style. Header toolbar, sender avatar, subject line, body area, reply/forward actions.

**The typing mechanic:** each line of the email is a separate `<p>` element, not one long string with `<br>` tags. This matters because paragraph elements have predictable margins — trying to simulate paragraph breaks inside one string causes inconsistent spacing.

A `typeLines(lines)` async function iterates through the lines. For each line, it creates a `<p>`, appends characters one at a time with a ~28ms delay between each, and inserts a blinking cursor `<span>` at the current typing position. Between lines, it pauses — `pauseShort` (80ms) for adjacent paragraphs, `pauseLong` (180ms) after "Hi," and before "Thanks,". The long pauses mimic the natural breath a human takes between sections of an email.

The cursor blinks via a CSS `@keyframes blink` rule running at 0.9-second intervals.

When the email finishes typing, the whole Beat 1 container cross-fades its opacity to 0 while Beat 2 fades in — a 700ms transition. No motion, just opacity, which feels clean and fast.

## Beat 2: the Google Sheets spreadsheet

**Visual chrome:** Google Sheets-style. Top bar with filename, menu bar, toolbar, column letters A/B/C, row numbers, cell grid, three sheet tabs at the bottom (Cora Lane, Jonah Ellery, The Marcel Trio).

**Data generation:** each artist's workbook is procedurally generated to look like real booking data. A `filler(seed)` function produces a pseudo-random but deterministic pattern of venues and statuses using modular arithmetic like `(i + seed) % 4 === 0`. Seeds differ per artist so the three sheets don't look identical. For the focal March 1 row, data is hand-authored to guarantee the correct verdict.

### The fast scroll

The sheet rows live inside a fixed-height viewport with `overflow: hidden`. Scrolling is done by animating the `transform: translateY()` value on the row container, not by manipulating `scrollTop`. Transform-based scrolling is GPU-composited and runs at 60fps. Scrolling via scrollTop triggers layout recalculation on every frame and stutters.

The scroll function uses `requestAnimationFrame` in a loop, computing the current position on each frame based on elapsed time with a cubic ease-out curve applied. Ease-out was chosen deliberately: linear scrolling feels mechanical, ease-in-out feels slow at both ends, but ease-out feels like a hand flicking a scroll wheel — fast to start, soft landing.

### The row focus

When the scroll lands on March 1, two things happen in sequence:

1. All non-target rows get a `.dimmed` class (opacity drops to 0.22)
2. The target row gets a `.target-scaled` class — `transform: scale(1.9)` with `transform-origin: right center`

The right-edge origin is critical. The default center origin would cause the row to scale outward in both directions, pushing the Status column past the right viewport edge. With the right-edge origin, the row grows leftward from its anchored right edge, and the status column stays pinned in place.

The scale uses the spring curve (`cubic-bezier(0.34, 1.56, 0.64, 1)`), which overshoots 1.9× briefly before settling — gives the row a small bounce that makes it feel alive.

### The verdict stamp

The stamp is a 16×16px circular element with `aspect-ratio: 1 / 1` that sits inside a dedicated grid column in the row's layout. It's *not* absolutely positioned — it lives in the grid naturally, which means it participates in the row's scale transform and stays perfectly round.

An earlier iteration had the stamp absolutely positioned with `translateY(-50%)` for vertical centering. This caused it to deform into an oval when the row scaled, because the translateY percentage was being calculated against the pre-scale bounding box and then composed with the parent's scale transform. Moving the stamp into a grid cell eliminated the composed transform problem entirely.

The stamp's inner SVG uses a `-5 -5 10 10` viewBox with `<line>` elements drawn symmetrically around the origin. This centers the X's mathematical center at the viewBox's geometric center, so rounded line caps extend equally in all directions.

The stamp's own scale animation (`scale(0) → scale(1)`) uses the same spring curve as the row, with a 250–350ms delay so it pops in after the row has settled.

### The tab switch

The hardest part of Beat 2. Four iterations led to the final approach:

1. Tab color change only — too subtle, the content swap didn't register as a tab switch.
2. Staggered row-by-row fade with a blue header pulse — too much happening, signal diffused across 90 rows.
3. Dip everything to 30% opacity with a grayscale filter — reads as "dimming" not "resetting."
4. **Final:** sheet contents fade from opacity 0 to opacity 1 after the new tab snaps active.

The trick in the final approach: *disable the CSS transition, apply all the changes, then re-enable the transition*. This gives you a hard cut on the way out (invisible) and a smooth fade on the way in.

In code:
```js
sheetInner.style.transition = 'none';
sheetInner.classList.add('faded');        // opacity 0, but no transition so no fade
renderSheet(newArtistData);                // swap out content
activeTab.classList.toggle('active');      // switch tab styling
scrollTrack.style.transform = 'translateY(0)';  // reset scroll
// Force a reflow so the browser commits the above changes
void sheetInner.offsetWidth;
sheetInner.style.transition = '';          // restore transition
sheetInner.classList.remove('faded');      // NOW fade from 0 to 1 over 800ms
```

The `offsetWidth` read is a classic "force reflow" technique — reading a layout property forces the browser to commit pending style changes before moving on. Without it, the enable/disable transition trick doesn't reliably work because all the style changes get batched together.

### The 13:00 timer

A small element in the bottom-right counts up from 00:00 to 13:00 across each loop of the three-tab sequence. Uses `setInterval` at 100ms ticks. Internal counter scales against the known total duration of the sequence so it always lands on exactly 13:00 when the third tab completes — regardless of how the pacing of individual animations is tuned.

This is the only piece of explicit narrative in Beat 2. The rest of the beat is pure demonstration; the timer is the caption.

## The transition: collapse

After Beat 2's final frame (Marcel's March 1 row with the amber "hold" dash, 13:00 on the timer), the collapse begins.

**Variant B of five explored:** the timer scales up to viewport center, pulses, holds, then falls away; then the sheet rows cascade outward from the focal row.

### The timer's big moment

The 13:00 timer element transitions from its small corner position to large-center via CSS animation. The animation scales from 0.6 to 1.15 at the 40% mark (overshooting), then settles to 1.0. Opacity ramps from 0 to 1 across the same duration.

```css
@keyframes timerPulse {
  0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
  40%  { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
```

The `translate(-50%, -50%)` is a centering technique: positioning the element at `top: 50%; left: 50%` places its top-left corner at the center of its container. The negative-50% translation shifts it by half its own size in each direction, centering it exactly regardless of its dimensions.

Hold duration: 1200ms. Long enough for the viewer to register what 13:00 means.

### The timer falls

A second animation replaces the first:

```css
@keyframes timerBigFall {
  to { opacity: 0; transform: translate(-50%, 400px) scale(0.9) rotate(-3deg); }
}
```

Note the easing is `cubic-bezier(0.5, 0, 0.85, 0)` — gravity ease-in. Things that fall don't slow down.

### The row cascade

The focal row starts falling ~200ms before the timer fully clears — an intentional overlap that reads as a single continuous collapse rather than two sequential events.

The cascade pattern: rows nearest the focal row fall first, rows farther away fall later, with a 55ms stagger. If the focal row is at index 9 (of, say, 16 visible), the order is:

- Focal row (index 9) → delay 0
- Index 8 → delay 55
- Index 10 → delay 110
- Index 7 → delay 165
- Index 11 → delay 220
- ...and so on outward

Each row rotates a small random amount (between -3° and +3°) and translates down ~450 pixels with the gravity ease-in. The random rotation is what makes the cascade feel physical — if every row rotated the same amount, it would look like a rehearsal.

The tab strip and column headers fall 300ms *before* the last row lands, so they're on their way out by the time the cascade completes. By the end, the viewport is empty `#f9f9f9` background — clean slate for Beat 3.

Total transition duration: ~3.5 seconds.

## Beat 3a: construction

The new tool assembles itself piece by piece. Each piece is wrapped in a `.build-piece` class:

```css
.build-piece {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 420ms cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.build-piece.placed {
  opacity: 1;
  transform: translateY(0);
}
```

A piece starts 12 pixels below its final position with zero opacity. When you add the `.placed` class, it slides up 12px and fades in, with the spring curve causing a tiny overshoot. Reads as "set down on the page."

The sequence adds the `.placed` class to each piece with specific delays:

```js
await wait(0);    buildPieces.nav.classList.add('placed');
await wait(320);  buildPieces.sidebar.classList.add('placed');
await wait(380);  buildPieces.head.classList.add('placed');
await wait(280);  buildPieces.metrics.classList.add('placed');
await wait(380);  buildPieces.table.classList.add('placed');
```

The `wait(ms)` helper is a Promise-wrapped `setTimeout`:
```js
function wait(ms) { return new Promise(r => setTimeout(r, ms)); }
```

This lets the orchestration be written as linear `async/await` code rather than nested callbacks.

## Beat 3: the Atelier tool

"Precision Atelier" refers to the visual language — geometric Space Grotesk display face, generous white surfaces, ghost borders, yellow (#fcd400) as the sole accent color, no hairline 1px dividers anywhere.

### The 1440px scale-to-fit pattern

The tool is designed natively at 1440px wide. Inside a smaller container, it scales down proportionally via `transform: scale(n)`. A `ResizeObserver` recomputes the scale whenever the container size changes.

```js
function scaleToFit() {
  const frame = document.getElementById('reel-frame');
  const scaler = document.getElementById('reel-scaler');
  const scale = Math.min(1, frame.clientWidth / 1440);
  scaler.style.transform = 'scale(' + scale + ')';
  frame.style.height = (scaler.offsetHeight * scale) + 'px';
}
```

The frame height adjustment is important: a scaled element's visual bounds shrink but its layout height is unchanged, so the frame would leave empty space below. Setting the frame's height to the scaled height closes that gap.

This approach means the tool's CSS is all authored at desktop dimensions — text is 13px, cards are 170px tall, the donut is 72px — and the scale transform handles the responsive sizing. No media queries needed for the core layout.

### The calendar static-height pattern

Each month renders a fixed 6×7 = 42-cell grid regardless of how many days are in the month. Shorter months (February with 28 days + Sunday start = 28 cells used) get padded with empty cells to fill the grid. The days-grid container has `min-height: 168px`, which accommodates the tallest possible layout.

Without this pattern, switching from March (uses 37 cells in 6 rows) to February (uses 28 cells in 5 rows) would cause the calendar to shrink vertically, which would push the roster below it upward. Users would see the page shifting every time they change months — visually unacceptable.

### The urgency-coded readiness bars

The bar shows *what's remaining*, not *what's done*. The color encodes urgency based on days-to-gig:

- 0–3 days: red (#D4442B)
- 4–14 days: yellow (#F5B500)
- 15+ days: gray (#B4B2A9)
- 0 remaining: green, full bar, label "Ready"

The bar width is computed as `Math.min(100, (remaining / 12) * 100)` — capped at 12 items = 100%, so longer remaining lists don't overflow.

The semantic inversion (bar length = work remaining, not progress) is deliberate. A booking manager asks "what do I still owe" more often than "how much is done." This matches their mental model.

### The SVG donut chart

Inside the Daily tasks card. Two concentric SVG circles with thick strokes:

```jsx
<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="42" fill="none" stroke="#E1F5EE" strokeWidth="14" />
  <circle cx="50" cy="50" r="42" fill="none"
          stroke="#1D9E75" strokeWidth="14"
          strokeDasharray="232.48 264"
          transform="rotate(-90 50 50)" />
</svg>
```

The math: circumference of the circle is `2 × π × radius` = `2 × π × 42` ≈ 264 units. For 88% filled, the visible portion is `0.88 × 264` = 232.48 units. The `stroke-dasharray` property takes two values: the length of the visible dash segment, then the length of the gap. Setting it to `232.48 264` means "draw 232.48 units, then gap for 264 units" — but since 264 is the full circumference, the arc is effectively "232.48 units visible, then stop." The `rotate(-90)` starts the arc at 12 o'clock instead of 3 o'clock (SVG's default).

### The bleed icons with normalized heights

The three non-donut metric cards have oversized icons bleeding off the right edge at low opacity (18% on white cards, 32% on the yellow warning card). Each icon is in an SVG with a 90×90 viewBox, but the icons themselves occupy different heights within that viewBox:

- Warning triangle: ~79 SVG units tall
- Calendar: ~79 units tall
- Cash bill: ~86 units tall (wider shapes look smaller, so the dollar bill is scaled up 20%)

The bleed wrapper is positioned `right: -18px; top: 50%; transform: translateY(-50%)` and the SVG width is `auto`. The negative right-position is what causes the icons to overflow the card edge — combined with `overflow: hidden` on the card container, the icons get cleanly cropped at the card border.

### The faux cursor pattern

During the auto-demo, a small cursor SVG moves between interaction points. It's absolutely positioned inside the tool area, and its `left`/`top` values transition smoothly when updated:

```css
.reel-cursor {
  position: absolute;
  width: 20px; height: 20px;
  transition: left 650ms cubic-bezier(0.4, 0, 0.2, 1),
              top 650ms cubic-bezier(0.4, 0, 0.2, 1),
              opacity 300ms ease;
}
```

Changing `cursor.style.left = '400px'` and `cursor.style.top = '200px'` animates the cursor to those coordinates over 650ms. The 0.4/0/0.2/1 easing is a smoothed ease-in-out — feels like a hand moving between targets.

### The pulse ripple

Fires at the moment of each demo "click." A yellow circle scales from 0 to 2.2× with fading opacity over 600ms:

```css
@keyframes pulseFire {
  0%   { transform: translate(-50%, -50%) scale(0);   opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
}
```

Each pulse is a fresh DOM element — created, animated, removed after 600ms. Don't reuse a single pulse element: rapid sequential pulses (during the Cora/Jonah/Marcel sequence) would interrupt each other.

### The caption card

Styled to match the Atelier system: white card, 4px ghost border at 0.5 opacity, zero border-radius. Positioned `bottom: 28px; right: 28px` inside the tool area.

The piecewise reveal is done with staggered class additions. Each sub-element (eyebrow, line1, line2, divider, cta) starts with `opacity: 0; transform: translateY(4px)` and a CSS transition. JavaScript adds the `.in` class to each in sequence with 350ms delays.

```js
await wait(0);    eyebrow.classList.add('in');
await wait(350);  line1.classList.add('in');
await wait(350);  line2.classList.add('in');
await wait(350);  divider.classList.add('in');
await wait(350);  cta.classList.add('in');
```

The "Lila Moreno" highlight is `background: #fcd400` applied inline to a `<span>` with horizontal padding. Not a rounded pill — a rectangular highlighter swipe, more editorial.

The nudging arrow uses an infinite CSS animation:
```css
@keyframes arrowNudge {
  0%, 100% { transform: translateX(0); }
  50%      { transform: translateX(4px); }
}
.cta.in .arrow { animation: arrowNudge 1.8s ease-in-out infinite 600ms; }
```

The `600ms` at the end is a starting delay — waits for the CTA's fade-in to finish before the nudging begins.

## Orchestration: the cancellation token pattern

The reel is one long async function. A single `runReel()` coordinates all beats:

```js
let currentToken = null;

async function runReel() {
  if (currentToken) currentToken.cancelled = true;
  const token = { cancelled: false };
  currentToken = token;

  await playBeat1(token);
  if (token.cancelled) return;
  await playBeat2(token);
  if (token.cancelled) return;
  // ...and so on
}
```

Each beat function checks `token.cancelled` at every `await` point and returns early if cancelled. The cancellation is triggered by the IntersectionObserver — when the reel scrolls out of view, the token flips cancelled, and all in-flight animations halt cleanly.

Without this pattern, zombie timers would continue firing even after the reel is off-screen, degrading performance and causing visual glitches when the user scrolls back.

## The loop behavior

An `IntersectionObserver` with a 0.3 threshold watches the reel container:

```js
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      runReel();
    } else {
      if (currentToken) currentToken.cancelled = true;
    }
  });
}, { threshold: 0.3 });
```

When the reel becomes 30% visible, it plays from the start. When it leaves the viewport, the current playback is cancelled. The viewer always sees a fresh reel whenever they enter the case study.

## Mobile behavior

Below 500px viewport width, a media query kicks in:
- Hides the City column in the booking table
- Shrinks font sizes proportionally
- Drops the target row's scale in Beat 2 from 1.9× to 1.5× so it doesn't push past the viewport edges
- Stacks the sidebar above the main content

No additional JavaScript is needed — all mobile adaptation is pure CSS. The 1440px native width + transform scale approach still works: the whole thing just scales down more dramatically on small screens.

## Why this approach

Building the reel in live code rather than video or Lottie means:
- **Infinite editability** — every tweak is a one-line change, not a re-export from a motion design tool
- **Native responsiveness** — scales and adapts without re-authoring per breakpoint
- **Narrative consistency** — the reel is itself an artifact of the Claude + Claude Code workflow the case study describes
- **Performance** — the whole reel weighs less than a single hero photograph

Every decision in this document was made in response to a specific design or UX concern that came up during the build.
