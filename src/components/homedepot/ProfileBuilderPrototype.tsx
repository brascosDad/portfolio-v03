"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type ScreenIndex = 0 | 1 | 2 | 7;

const TRADES = [
  "Electrical",
  "Plumbing",
  "Carpentry",
  "HVAC",
  "General Labor",
  "Painting",
  "Welding",
  "Roofing",
  "Masonry",
  "Flooring",
  "Drywall",
  "Landscaping",
  "Concrete",
] as const;

type Trade = (typeof TRADES)[number];

const EXPERIENCE_OPTIONS = [
  { label: "Entry level", range: "0\u20132 years" },
  { label: "Intermediate", range: "3\u20135 years" },
  { label: "Experienced", range: "6\u201310 years" },
  { label: "Expert", range: "10+ years" },
] as const;

type ExperienceLabel = (typeof EXPERIENCE_OPTIONS)[number]["label"];

// ── Helpers ────────────────────────────────────────────────────────────────────
function formatTradeList(trades: Trade[]): string {
  if (trades.length === 0) return "skilled trades";
  if (trades.length === 1) return trades[0];
  if (trades.length === 2) return `${trades[0]} and ${trades[1]}`;
  return `${trades.slice(0, -1).join(", ")}, and ${trades[trades.length - 1]}`;
}

function getExperienceRange(level: string): string {
  const match = EXPERIENCE_OPTIONS.find((o) => o.label === level);
  return match ? match.range : "";
}

function generatePrimaryAiText(
  trades: Trade[],
  userText: string,
  experience: string
): string {
  if (userText.trim()) {
    return `With ${experience ? getExperienceRange(experience) + " of" : ""} experience, I bring a methodical approach to every project. I focus on quality workmanship and clear communication with clients and team members.`;
  }
  return `With extensive experience in ${formatTradeList(trades)}, I bring a hands-on approach to every job site. I'm known for reliable work, clean execution, and clear communication with clients and contractors alike.`;
}

function generateAltAiText(
  trades: Trade[],
  userText: string,
  experience: string
): string {
  if (userText.trim()) {
    const tradeLabel =
      trades.length > 0
        ? formatTradeList(trades).toLowerCase()
        : "skilled trades";
    return `I'm a ${tradeLabel} professional with ${experience ? getExperienceRange(experience) : "years"} of experience. My work is defined by attention to detail and a commitment to getting things right the first time. I take pride in delivering projects on time and maintaining strong relationships with every client.`;
  }
  return `Skilled in ${formatTradeList(trades)}, I approach each project with precision and pride. Whether it's a residential job or a commercial build, I'm committed to delivering work that's done right \u2014 on time, on budget, and built to last.`;
}

// ── Sub-components: Icons ──────────────────────────────────────────────────────
function HamburgerIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="4" width="18" height="2" rx="1" fill="#222222" />
      <rect x="2" y="10" width="18" height="2" rx="1" fill="#222222" />
      <rect x="2" y="16" width="18" height="2" rx="1" fill="#222222" />
    </svg>
  );
}

function CrateIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 90 90" fill="none">
      <rect x="2" y="29" width="86" height="7" fill="#222222" opacity="0.28" />
      <rect x="2" y="54" width="86" height="7" fill="#222222" opacity="0.28" />
      <rect
        x="29"
        y="2"
        width="7"
        height="86"
        fill="#222222"
        opacity="0.28"
      />
      <rect
        x="54"
        y="2"
        width="7"
        height="86"
        fill="#222222"
        opacity="0.28"
      />
      <rect
        x="19"
        y="19"
        width="18"
        height="18"
        rx="3"
        fill="none"
        stroke="#222222"
        strokeWidth="2"
        opacity="0.6"
      />
      <rect
        x="53"
        y="19"
        width="18"
        height="18"
        rx="3"
        fill="none"
        stroke="#222222"
        strokeWidth="2"
        opacity="0.6"
      />
      <rect
        x="19"
        y="53"
        width="18"
        height="18"
        rx="3"
        fill="none"
        stroke="#222222"
        strokeWidth="2"
        opacity="0.6"
      />
      <rect
        x="53"
        y="53"
        width="18"
        height="18"
        rx="3"
        fill="none"
        stroke="#222222"
        strokeWidth="2"
        opacity="0.6"
      />
    </svg>
  );
}

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="#222222"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z"
        stroke={active ? "#1a3a6e" : "#999"}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ active }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke={active ? "#1a3a6e" : "#999"}
        strokeWidth="2"
      />
      <path
        d="M16 16L20 20"
        stroke={active ? "#1a3a6e" : "#999"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SavedIcon({ active }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 3H19V21L12 16L5 21V3Z"
        stroke={active ? "#1a3a6e" : "#999"}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileIcon({ active }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="8"
        r="4"
        stroke={active ? "#1a3a6e" : "#999"}
        strokeWidth="2"
      />
      <path
        d="M4 20C4 17 8 15 12 15C16 15 20 17 20 20"
        stroke={active ? "#1a3a6e" : "#999"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M8 16L14 22L24 10"
        stroke="#059669"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path
        d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MultiColorSparkle({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <defs>
        <linearGradient id="pbSparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path
        d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
        fill="url(#pbSparkleGrad)"
      />
    </svg>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-[24px] shrink-0" style={{ height: 44, backgroundColor: "#fff" }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: "#222", letterSpacing: 0.5 }}>9:41</span>
      <div className="flex items-center" style={{ gap: 6 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="9" width="3" height="3" rx="0.5" fill="#222" />
          <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="#222" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" fill="#222" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="#222" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 11a1 1 0 100-2 1 1 0 000 2z" fill="#222" />
          <path d="M5 8.5a4.2 4.2 0 016 0" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2.5 6a7.5 7.5 0 0111 0" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="#222" strokeOpacity="0.35" />
          <rect x="2" y="2" width="19" height="9" rx="1.5" fill="#222" />
          <path d="M24 4.5v4a2.5 2.5 0 000-4z" fill="#222" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

function HomeIndicator() {
  return (
    <div className="flex items-end justify-center shrink-0" style={{ height: 34, backgroundColor: "#fff" }}>
      <div style={{ width: 134, height: 5, borderRadius: 100, backgroundColor: "#222", marginBottom: 8 }} />
    </div>
  );
}

// ── Shared chrome ──────────────────────────────────────────────────────────────
function NavBar() {
  return (
    <div
      className="flex items-center justify-between shrink-0"
      style={{
        height: 56,
        borderBottom: "1px solid #f0f0f0",
        padding: "0 16px",
        backgroundColor: "#fff",
      }}
    >
      <HamburgerIcon />
      <span style={{ fontFamily: "var(--font-alpha-slab), serif", fontSize: 22, color: "#222", lineHeight: 1 }}>JD</span>
      <div
        className="flex items-center justify-center"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "#1a3a6e",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        SR
      </div>
    </div>
  );
}

function AppFooter() {
  return (
    <div
      className="flex items-center justify-around shrink-0"
      style={{
        height: 56,
        borderTop: "1px solid #f0f0f0",
        backgroundColor: "#fff",
      }}
    >
      <div className="flex flex-col items-center cursor-pointer">
        <HomeIcon />
        <span style={{ fontSize: 11, color: "#767676", marginTop: 2 }}>Home</span>
      </div>
      <div className="flex flex-col items-center cursor-pointer">
        <SearchIcon />
        <span style={{ fontSize: 11, color: "#767676", marginTop: 2 }}>
          Search
        </span>
      </div>
      <div className="flex flex-col items-center cursor-pointer">
        <SavedIcon />
        <span style={{ fontSize: 11, color: "#767676", marginTop: 2 }}>
          Saved
        </span>
      </div>
      <div className="flex flex-col items-center cursor-pointer">
        <ProfileIcon active />
        <span style={{ fontSize: 11, color: "#1a3a6e", marginTop: 2 }}>
          Profile
        </span>
      </div>
    </div>
  );
}

// ── Pulse animation style (injected once) ──────────────────────────────────────
const PULSE_KEYFRAMES = `
@keyframes pulseRing {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.08, 1.25); opacity: 0; }
}
@keyframes dotBounce {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
}
@keyframes buttonPop {
  0% { transform: scale(1); }
  40% { transform: scale(1.08); }
  100% { transform: scale(1); }
}
@keyframes scrimShimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;

// ── Main component ─────────────────────────────────────────────────────────────
export function ProfileBuilderPrototype() {
  const [currentScreen, setCurrentScreen] = useState<ScreenIndex>(0);
  const [prevScreen, setPrevScreen] = useState<ScreenIndex | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [selectedTrades, setSelectedTrades] = useState<Trade[]>([]);
  const [experienceLevels, setExperienceLevels] = useState<Record<string, string>>({});
  const [currentTradeIdx, setCurrentTradeIdx] = useState(0);
  const [userText, setUserText] = useState("");
  const [acceptedText, setAcceptedText] = useState("");
  const [aiGenCount, setAiGenCount] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);
  const [pulseActive, setPulseActive] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Navigation helper
  const navigateTo = useCallback(
    (target: ScreenIndex, direction: "left" | "right" = "left") => {
      if (isTransitioning) return;
      setPrevScreen(currentScreen);
      setSlideDirection(direction);
      setCurrentScreen(target);
      setIsTransitioning(true);
      setTimeout(() => {
        setPrevScreen(null);
        setIsTransitioning(false);
      }, 300);
    },
    [currentScreen, isTransitioning]
  );

  // Compute primary experience level for AI text
  const primaryExperience = (() => {
    const levels = Object.values(experienceLevels);
    if (levels.length === 0) return "";
    const order = ["Expert", "Experienced", "Intermediate", "Entry level"];
    for (const l of order) if (levels.includes(l)) return l;
    return levels[0] || "";
  })();

  // AI generation: overlay scrim on textarea, then populate
  useEffect(() => {
    if (!aiLoading) return;
    const timer = setTimeout(() => {
      const text = aiGenCount % 2 === 0
        ? generatePrimaryAiText(selectedTrades, "", primaryExperience)
        : generateAltAiText(selectedTrades, "", primaryExperience);
      setUserText(text);
      setAiGenCount((prev) => prev + 1);
      setAiLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [aiLoading, aiGenCount, selectedTrades, primaryExperience]);

  // Trade toggle
  const toggleTrade = (trade: Trade) => {
    if (pulseActive) setPulseActive(false);
    setSelectedTrades((prev) =>
      prev.includes(trade) ? prev.filter((t) => t !== trade) : [...prev, trade]
    );
  };

  // Reset all state
  const resetAll = () => {
    setSelectedTrades([]);
    setExperienceLevels({});
    setCurrentTradeIdx(0);
    setUserText("");
    setAcceptedText("");
    setAiGenCount(0);
    setAiLoading(false);
    setPulseActive(true);
    navigateTo(0, "right");
  };

  // ── Screen renderers ───────────────────────────────────────────────────────
  function renderScreen(screenIndex: ScreenIndex) {
    switch (screenIndex) {
      case 0:
        return ScreenTradeSelection();
      case 1:
        return ScreenExperience();
      case 2:
        return ScreenWorkStyle();
      case 7:
        return ScreenComplete();
      default:
        return null;
    }
  }

  // ── Screen 1: Trade Selection ──────────────────────────────────────────────
  function ScreenTradeSelection() {
    const hasSelection = selectedTrades.length > 0;
    return (
      <div className="flex flex-col h-full">
        <div
          className="flex-1 overflow-y-auto"
          style={{ padding: "24px 20px" }}
        >
          <h2
            style={{
              fontSize: 21,
              fontWeight: 700,
              color: "#222",
              marginBottom: 6,
            }}
          >
            What trades do you work in?
          </h2>
          <p style={{ fontSize: 15, color: "#666", marginBottom: 24 }}>
            Select all that apply
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TRADES.map((trade, idx) => {
              const isSelected = selectedTrades.includes(trade);
              const showPulse = pulseActive && idx === 0 && !isSelected;
              return (
                <div key={trade} style={{ position: "relative" }}>
                  {showPulse && (
                    <>
                      <span style={{ position: "absolute", inset: 0, borderRadius: 10, border: "2px solid #1a3a6e", animation: "pulseRing 1.5s ease-out infinite", pointerEvents: "none" }} />
                      <span style={{ position: "absolute", inset: 0, borderRadius: 10, border: "2px solid #1a3a6e", animation: "pulseRing 1.5s ease-out 0.5s infinite", pointerEvents: "none" }} />
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleTrade(trade)}
                    className="cursor-pointer"
                    style={{
                      position: "relative",
                      zIndex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      width: "100%",
                      border: isSelected ? "1px solid #1a3a6e" : "1px solid #949494",
                      borderRadius: 10,
                      padding: "12px 14px",
                      fontSize: 17,
                      color: isSelected ? "#222" : "#444",
                      backgroundColor: isSelected ? "#f8faff" : "#fff",
                      textAlign: "left",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        border: isSelected ? "2px solid #1a3a6e" : "2px solid #949494",
                        backgroundColor: isSelected ? "#1a3a6e" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.15s ease",
                      }}
                    >
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    {trade}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ padding: "16px 20px" }}>
          <button
            type="button"
            onClick={() => { setCurrentTradeIdx(0); navigateTo(1, "left"); }}
            disabled={!hasSelection}
            className="cursor-pointer"
            style={{
              width: "100%",
              backgroundColor: "#1a3a6e",
              color: "#fff",
              fontSize: 17,
              fontWeight: 700,
              borderRadius: 9999,
              padding: "14px 0",
              border: "none",
              opacity: hasSelection ? 1 : 0.4,
              pointerEvents: hasSelection ? "auto" : "none",
              transition: "opacity 0.15s ease",
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // ── Screen 2: Experience (per-trade) ───────────────────────────────────────
  function ScreenExperience() {
    const currentTrade = selectedTrades[currentTradeIdx];
    const currentLevel = currentTrade ? experienceLevels[currentTrade] || "" : "";
    const hasSelection = currentLevel !== "";
    const isLastTrade = currentTradeIdx >= selectedTrades.length - 1;

    const handleBack = () => {
      if (currentTradeIdx > 0) {
        setCurrentTradeIdx(currentTradeIdx - 1);
      } else {
        navigateTo(0, "right");
      }
    };

    const handleNext = () => {
      if (isLastTrade) {
        navigateTo(2, "left");
      } else {
        setCurrentTradeIdx(currentTradeIdx + 1);
      }
    };

    const selectLevel = (label: string) => {
      setExperienceLevels((prev) => ({ ...prev, [currentTrade]: label }));
    };

    return (
      <div className="flex flex-col h-full">
        {/* Back arrow pinned to top */}
        <div style={{ padding: "24px 20px 0" }}>
          <button
            type="button"
            onClick={handleBack}
            className="cursor-pointer"
            style={{
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            <BackArrow />
          </button>
        </div>

        {/* Centered question + options + next button */}
        <div
          className="flex-1 flex flex-col items-center justify-center"
          style={{ padding: "0 20px" }}
        >
          <div style={{ width: "100%" }}>
            <h2
              style={{
                fontSize: 21,
                fontWeight: 700,
                color: "#222",
                marginBottom: 16,
              }}
            >
              How much {currentTrade} experience do you have?
            </h2>

            {EXPERIENCE_OPTIONS.map((opt) => {
              const isSelected = currentLevel === opt.label;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => selectLevel(opt.label)}
                  className="cursor-pointer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    border: isSelected
                      ? "1px solid #1a3a6e"
                      : "1px solid #949494",
                    borderRadius: 10,
                    padding: "12px 14px",
                    marginBottom: 8,
                    backgroundColor: isSelected ? "#f8faff" : "transparent",
                    textAlign: "left",
                    gap: 14,
                    transition: "all 0.15s ease",
                  }}
                >
                  {/* Radio dot */}
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: isSelected
                        ? "2px solid #1a3a6e"
                        : "2px solid #949494",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#1a3a6e",
                        }}
                      />
                    )}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#222" }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: 15, color: "#767676" }}>
                    {opt.range}
                  </div>
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleNext}
              disabled={!hasSelection}
              className="cursor-pointer"
              style={{
                width: "100%",
                marginTop: 8,
                backgroundColor: "#1a3a6e",
                color: "#fff",
                fontSize: 17,
                fontWeight: 700,
                borderRadius: 9999,
                padding: "14px 0",
                border: "none",
                opacity: hasSelection ? 1 : 0.4,
                pointerEvents: hasSelection ? "auto" : "none",
                transition: "opacity 0.15s ease",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Screen 3: Work Style ──────��──────────────────────────���─────────────────
  function ScreenWorkStyle() {
    const hasText = userText.trim().length > 0;
    const aiButtonLabel = aiGenCount === 0 ? "AI Assist" : "Try again";

    return (
      <div className="flex flex-col h-full">
        <div
          className="flex-1 overflow-y-auto"
          style={{ padding: "24px 20px" }}
        >
          {/* Back arrow */}
          <button
            type="button"
            onClick={() => { setCurrentTradeIdx(selectedTrades.length - 1); navigateTo(1, "right"); }}
            className="cursor-pointer"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              marginBottom: 16,
            }}
          >
            <BackArrow />
          </button>

          <h2
            style={{
              fontSize: 21,
              fontWeight: 700,
              color: "#222",
              marginBottom: 6,
            }}
          >
            Describe your work style
          </h2>
          <p style={{ fontSize: 15, color: "#666", marginBottom: 20 }}>
            Type your own description or let AI write one for you.
          </p>

          {/* AI Assist / Try again button */}
          <div
            key={`ai-btn-${aiGenCount}`}
            style={{
              marginBottom: 16,
              animation: aiGenCount > 0 ? "buttonPop 0.4s ease" : "none",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #6366f1, #ec4899, #f59e0b)",
                borderRadius: 9999,
                padding: 2,
                display: "inline-flex",
              }}
            >
              <button
                type="button"
                onClick={() => { if (!aiLoading) setAiLoading(true); }}
                className="cursor-pointer flex items-center justify-center"
                style={{
                  background: "#fff",
                  borderRadius: 9999,
                  border: "none",
                  padding: "10px 20px",
                  fontSize: 15,
                  fontWeight: 600,
                  color: aiLoading ? "#999" : "#444",
                  gap: 8,
                  opacity: aiLoading ? 0.6 : 1,
                  pointerEvents: aiLoading ? "none" : "auto",
                  transition: "opacity 0.15s ease",
                }}
              >
                <MultiColorSparkle size={16} />
                {aiButtonLabel}
              </button>
            </div>
          </div>

          {/* Textarea with gradient scrim overlay during AI generation */}
          <div style={{ position: "relative" }}>
            <textarea
              ref={textareaRef}
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="I'm a detail-oriented electrician who takes pride in clean, code-compliant work..."
              disabled={aiLoading}
              style={{
                width: "100%",
                minHeight: 160,
                border: "1px solid #949494",
                borderRadius: 12,
                padding: 16,
                fontSize: 17,
                color: "#222",
                resize: "vertical",
                outline: "none",
                fontFamily: "inherit",
                lineHeight: 1.5,
              }}
            />
            {/* Gradient scrim overlay */}
            {aiLoading && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 12,
                  overflow: "hidden",
                  pointerEvents: "none",
                }}
              >
                {/* Animated gradient border */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #6366f1, #ec4899, #f59e0b, #6366f1, #ec4899)",
                    backgroundSize: "300% 300%",
                    animation: "scrimShimmer 2s ease infinite",
                  }}
                />
                {/* Inner gray fill */}
                <div
                  style={{
                    position: "absolute",
                    inset: 3,
                    borderRadius: 10,
                    background: "linear-gradient(135deg, rgba(245,245,245,0.92), rgba(235,235,240,0.95), rgba(245,245,245,0.92))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#6366f1",
                        opacity: 0.6,
                        animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: "16px 20px" }}>
          <button
            type="button"
            onClick={() => {
              setAcceptedText(userText);
              navigateTo(7, "left");
            }}
            disabled={!hasText}
            className="cursor-pointer"
            style={{
              width: "100%",
              backgroundColor: "#1a3a6e",
              color: "#fff",
              fontSize: 17,
              fontWeight: 700,
              borderRadius: 9999,
              padding: "14px 0",
              border: "none",
              opacity: hasText ? 1 : 0.4,
              pointerEvents: hasText ? "auto" : "none",
              transition: "opacity 0.15s ease",
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // ── Screen 8: Complete ─────────────────────────────────────────────────────
  function ScreenComplete() {
    return (
      <div className="flex flex-col h-full">
        <div
          className="flex-1 overflow-y-auto flex flex-col items-center"
          style={{ padding: "40px 20px 24px" }}
        >
          {/* Checkmark circle */}
          <div
            className="flex items-center justify-center"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#ecfdf5",
            }}
          >
            <CheckIcon />
          </div>

          <h2
            style={{
              fontSize: 23,
              fontWeight: 700,
              color: "#222",
              marginTop: 20,
            }}
          >
            Profile updated
          </h2>

          {/* Profile card */}
          <div
            style={{
              width: "100%",
              backgroundColor: "#fff",
              border: "1px solid #949494",
              borderRadius: 12,
              padding: 16,
              marginTop: 24,
              textAlign: "left",
            }}
          >
            <div
              style={{ fontSize: 19, fontWeight: 700, color: "#222" }}
            >
              Sarah Rivera
            </div>

            {/* Trade tags */}
            <div
              className="flex flex-wrap"
              style={{ gap: 6, marginTop: 8 }}
            >
              {selectedTrades.map((trade) => (
                <span
                  key={trade}
                  style={{
                    backgroundColor: "#eef2ff",
                    color: "#1a3a6e",
                    fontSize: 14,
                    padding: "4px 10px",
                    borderRadius: 9999,
                  }}
                >
                  {trade}
                </span>
              ))}
            </div>

            {/* Per-trade experience */}
            {selectedTrades.some((t) => experienceLevels[t]) && (
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
                {selectedTrades.map((trade) => {
                  const level = experienceLevels[trade];
                  if (!level) return null;
                  return (
                    <div key={trade} style={{ fontSize: 14, color: "#666" }}>
                      {trade}: {level} · {getExperienceRange(level)}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Description */}
            {acceptedText && (
              <p
                style={{
                  fontSize: 15,
                  color: "#444",
                  fontStyle: "italic",
                  marginTop: 8,
                  lineHeight: 1.6,
                }}
              >
                {acceptedText}
              </p>
            )}
          </div>
        </div>

        {/* Start over */}
        <div style={{ padding: "16px 20px", textAlign: "center" }}>
          <button
            type="button"
            onClick={resetAll}
            className="cursor-pointer"
            style={{
              background: "none",
              border: "none",
              color: "#1a3a6e",
              fontSize: 17,
            }}
          >
            &larr; Start over
          </button>
        </div>
      </div>
    );
  }

  // ── Transition positioning ─────────────────────────────────────────────────
  function getTransform(
    screenIdx: ScreenIndex,
    role: "current" | "prev"
  ): string {
    if (role === "current") {
      // The newly-entered screen starts off-screen then slides in
      if (isTransitioning) {
        // It should be at translateX(0) once transition starts
        return "translateX(0)";
      }
      return "translateX(0)";
    }
    // "prev" — the outgoing screen
    if (isTransitioning) {
      return slideDirection === "left"
        ? "translateX(-100%)"
        : "translateX(100%)";
    }
    return "translateX(0)";
  }

  function getInitialTransform(): string {
    return slideDirection === "left"
      ? "translateX(100%)"
      : "translateX(-100%)";
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="flex items-center justify-center"
      style={{ fontFamily: "var(--font-roboto)" }}
    >
      {/* Inject keyframes */}
      <style>{PULSE_KEYFRAMES}</style>

      {/* Phone frame */}
      <div
        style={{
          width: 390,
          height: 780,
          borderRadius: 40,
          border: "1px solid #949494",
          backgroundColor: "#fff",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <StatusBar />
        <NavBar />

        {/* Screen container */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Previous screen (sliding out) */}
          {prevScreen !== null && (
            <div
              key={`prev-${prevScreen}`}
              style={{
                position: "absolute",
                inset: 0,
                transform: getTransform(prevScreen, "prev"),
                transition: "transform 0.3s ease",
              }}
            >
              {renderScreen(prevScreen)}
            </div>
          )}

          {/* Current screen (sliding in) */}
          <ScreenSlider
            key={`current-${currentScreen}`}
            initialTransform={
              prevScreen !== null ? getInitialTransform() : "translateX(0)"
            }
          >
            {renderScreen(currentScreen)}
          </ScreenSlider>
        </div>

        <AppFooter />
        <HomeIndicator />
      </div>
    </div>
  );
}

// ── ScreenSlider: handles the initial → final transform animation ────────────
function ScreenSlider({
  children,
  initialTransform,
}: {
  children: React.ReactNode;
  initialTransform: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Force a reflow so the browser paints at initialTransform first
    if (ref.current) {
      void ref.current.offsetHeight;
    }
    // Then trigger the slide-in
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        transform: mounted ? "translateX(0)" : initialTransform,
        transition: "transform 0.3s ease",
      }}
    >
      {children}
    </div>
  );
}
