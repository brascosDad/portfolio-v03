// Yonas Media hero reel — design tokens and timing constants.
// Values are copied verbatim from the spec in YONAS_HERO_SEQUENCE_PROMPT.md.

export const COLORS = {
  // Atelier system (Beat 3)
  bg: "#f9f9f9",
  surfaceLow: "#f3f3f3",
  surfaceLowest: "#ffffff",
  surfaceHigh: "#e8e8e8",
  onSurface: "#1a1c1c",
  onSurfaceVariant: "#4d4732",
  outline: "#7e775f",
  outlineVariant: "#d0c6ab",

  // Accent
  secondary: "#705d00",
  secondaryContainer: "#fcd400",
  onSecondaryContainer: "#6e5c00",

  // Semantic
  confirmed: "#1D9E75",
  confirmedLight: "rgba(29, 158, 117, 0.22)",
  donutGreenRing: "#E1F5EE",
  donutGreenFill: "#1D9E75",

  // Urgency
  urgencyRed: "#D4442B",
  urgencyYellow: "#F5B500",
  urgencyGray: "#B4B2A9",

  // Status pills
  statusConfirmedBg: "rgba(29, 158, 117, 0.15)",
  statusConfirmedFg: "#085041",
  statusOfferBg: "rgba(23, 95, 165, 0.12)",
  statusOfferFg: "#0C447C",
  statusSeriousBg: "rgba(120, 50, 150, 0.12)",
  statusSeriousFg: "#3C3489",
  statusInterestBg: "rgba(180, 178, 169, 0.3)",
  statusInterestFg: "#444441",
  statusHoldBg: "rgba(250, 199, 117, 0.3)",
  statusHoldFg: "#633806",
  statusNeedfillBg: "rgba(212, 68, 43, 0.14)",
  statusNeedfillFg: "#791F1F",
  statusAvailableBg: "rgba(29, 158, 117, 0.25)",
  statusAvailableFg: "#085041",

  // Gmail chrome (approximated)
  gmailBg: "#ffffff",
  gmailHeaderBg: "#f5f5f5",
  gmailBorder: "#e0e0e0",
  gmailTextPrimary: "#202124",
  gmailTextSecondary: "#5f6368",
  gmailAccentRed: "#d93025",
  gmailToolbarIcon: "#5f6368",

  // Sheets chrome (approximated)
  sheetsBg: "#ffffff",
  sheetsHeaderBg: "#f9fbfd",
  sheetsTabActiveBg: "#ffffff",
  sheetsTabInactiveBg: "#f1f3f4",
  sheetsGreenAccent: "#0f9d58",
  sheetsGridLine: "#e0e0e0",
  sheetsColumnHeaderBg: "#f8f9fa",
  sheetsColumnHeaderFg: "#5f6368",
  sheetsSelectedCellOutline: "#1a73e8",
};

export const FONTS = {
  // Fonts are loaded via next/font/google in app/layout.tsx and exposed as CSS vars.
  display: "var(--font-space-grotesk), 'Helvetica Neue', sans-serif",
  body: "var(--font-inter), 'Helvetica Neue', sans-serif",
  google: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  mono: "var(--font-space-grotesk), monospace",
};

export const TIMING = {
  beat1: {
    charDelay: 28,
    pauseShort: 80,
    pauseLong: 180,
    cursorBlinkMs: 900,
    exitFadeMs: 700,
  },

  beat2: {
    scrollDurationMs: 1400,
    scrollEase: "cubic-bezier(0.22, 1, 0.36, 1)",
    rowScaleFrom: 1.0,
    rowScaleTo: 1.9,
    rowScaleToMobile: 1.5,
    rowScaleOriginX: "right",
    rowScaleOriginY: "center",
    rowScaleEase: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    rowScaleMs: 400,
    verdictStampDelay: 280,
    verdictStampMs: 350,
    verdictStampEase: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    tabDwellMs: 1000,
    tabDipMs: 500,
    tabFadeInMs: 800,
    timerTotalMs: 13 * 60 * 1000,
    timerTickMs: 100,
  },

  transition: {
    timerPulseInMs: 900,
    timerPulseEase: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    timerHoldMs: 1200,
    timerFallMs: 800,
    timerFallEase: "cubic-bezier(0.5, 0, 0.85, 0)",
    rowFallMs: 900,
    rowFallEase: "cubic-bezier(0.5, 0, 0.85, 0)",
    rowCascadeStagger: 55,
    focalRowIsFirst: true,
    tabStripFallLead: -300,
    timerFallAndRowsOverlap: 200,
  },

  construction: {
    pieceEase: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    pieceDurationMs: 420,
    sequence: [
      { key: "nav", startAtMs: 0 },
      { key: "sidebar", startAtMs: 320 },
      { key: "head", startAtMs: 700 },
      { key: "metrics", startAtMs: 980 },
      { key: "table", startAtMs: 1360 },
    ] as const,
    completionPauseMs: 700,
  },

  demo: {
    calendarMonthStepMs: 520,
    dateClickPauseMs: 650,
    cursorMoveMs: 650,
    cursorMoveEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    artistClickIntervalMs: 560,
    artistHighlightMs: 380,
    threeRowsHoldMs: 1300,
    lilaApproachMs: 280,
    pulseScale: 2.2,
    pulseDurationMs: 600,
  },

  caption: {
    showDelayMs: 700,
    piecewiseStaggerMs: 350,
    holdUntilInteraction: true,
    fadeOutMs: 400,
  },
};

// Native design width. Reel scales down via transform: scale to fit the container.
export const NATIVE_WIDTH = 1440;
export const NATIVE_HEIGHT = 900;
