"use client";

import { useState, useEffect } from "react";
import { motion, LayoutGroup } from "motion/react";

/* ---------- tiny SVG helpers ---------- */

function HamburgerIcon() {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
      <rect y="0" width="22" height="2.5" rx="1.25" fill="#222" />
      <rect y="7.5" width="22" height="2.5" rx="1.25" fill="#222" />
      <rect y="15" width="22" height="2.5" rx="1.25" fill="#222" />
    </svg>
  );
}

function CrateIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 90 90" fill="none">
      <rect x="2" y="29" width="86" height="7" fill="#222222" opacity="0.28" />
      <rect x="2" y="54" width="86" height="7" fill="#222222" opacity="0.28" />
      <rect x="29" y="2" width="7" height="86" fill="#222222" opacity="0.28" />
      <rect x="54" y="2" width="7" height="86" fill="#222222" opacity="0.28" />
      <rect x="19" y="19" width="18" height="18" rx="3" fill="none" stroke="#222222" strokeWidth="2" opacity="0.6" />
      <rect x="53" y="19" width="18" height="18" rx="3" fill="none" stroke="#222222" strokeWidth="2" opacity="0.6" />
      <rect x="19" y="53" width="18" height="18" rx="3" fill="none" stroke="#222222" strokeWidth="2" opacity="0.6" />
      <rect x="53" y="53" width="18" height="18" rx="3" fill="none" stroke="#222222" strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  const c = active ? "#1a3a6e" : "#999";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function SearchIcon({ active }: { active: boolean }) {
  const c = active ? "#1a3a6e" : "#999";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function SaveIcon({ active }: { active: boolean }) {
  const c = active ? "#1a3a6e" : "#999";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  const c = active ? "#1a3a6e" : "#999";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={c} strokeWidth="2" />
      <path d="M4 20C4 17 8 15 12 15C16 15 20 17 20 20" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BackArrow() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "#ef4444" : "none"} stroke={filled ? "#ef4444" : "#222"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4" />
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

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function SearchIconSmall() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

/* ---------- data ---------- */

interface Job {
  title: string;
  company: string;
  rating: number;
  posted: string;
  openings?: number;
}

const JOBS: Job[] = [
  { title: "Electrician", company: "Reliable Heating & Air", rating: 4.8, posted: "1 day ago" },
  { title: "General Laborer", company: "Apex Contracting", rating: 4.2, posted: "2 days ago", openings: 2 },
  { title: "HVAC Technician", company: "Cool Air Solutions", rating: 4.9, posted: "1 day ago" },
  { title: "Electrician Apprentice", company: "PowerPro Electric", rating: 3.8, posted: "2 days ago", openings: 3 },
];

/* ---------- sub-components ---------- */

function GlobalNav() {
  return (
    <div className="flex items-center justify-between px-[16px] h-[56px] bg-white border-b border-[#f0f0f0] shrink-0">
      <button className="cursor-pointer p-[4px]" aria-label="Menu">
        <HamburgerIcon />
      </button>
      <span style={{ fontFamily: "var(--font-alpha-slab), serif", fontSize: 22, color: "#222", lineHeight: 1 }}>JD</span>
      <div className="w-[32px] h-[32px] rounded-full bg-[#1a3a6e] flex items-center justify-center text-white text-[13px] font-bold leading-none">
        SR
      </div>
    </div>
  );
}

function AppFooter() {
  const tabs: { label: string; icon: (a: boolean) => React.ReactNode; active: boolean }[] = [
    { label: "Home", icon: (a) => <HomeIcon active={a} />, active: true },
    { label: "Search", icon: (a) => <SearchIcon active={a} />, active: false },
    { label: "Saved", icon: (a) => <SaveIcon active={a} />, active: false },
    { label: "Profile", icon: (a) => <ProfileIcon active={a} />, active: false },
  ];

  return (
    <div className="flex items-center justify-around h-[56px] bg-white border-t border-[#f0f0f0] shrink-0">
      {tabs.map((t) => (
        <div key={t.label} className="flex flex-col items-center gap-[2px] cursor-pointer">
          {t.icon(t.active)}
          <span className={`text-[12px] leading-none ${t.active ? "text-[#1a3a6e] font-semibold" : "text-[#767676]"}`}>
            {t.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------- screens ---------- */

function Screen1({
  onViewJob,
  pulseActive,
  selectedJob,
  detailOpen,
}: {
  onViewJob: (e: React.MouseEvent<HTMLButtonElement>, jobIndex: number) => void;
  pulseActive: boolean;
  selectedJob: number | null;
  detailOpen: boolean;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* sub-header */}
      <div className="flex items-center justify-between px-[16px] py-[12px] bg-white border-b border-[#f0f0f0] shrink-0">
        <div className="flex items-center gap-[8px]">
          <span className="text-[19px] text-[#222] cursor-pointer select-none">&larr;</span>
          <span className="text-[19px] font-bold text-[#222]">Jobs near you</span>
        </div>
        <div className="flex items-center gap-[4px]">
          <PinIcon />
          <span className="text-[15px] text-[#666]">Marietta, GA</span>
        </div>
      </div>

      {/* filter chips */}
      <div className="flex gap-[8px] px-[16px] py-[10px] shrink-0">
        <span className="bg-[#1a3a6e] text-white text-[15px] rounded-full px-[16px] py-[6px]">Electrician</span>
        <span className="bg-[#1a3a6e] text-white text-[15px] rounded-full px-[16px] py-[6px]">Construction</span>
      </div>

      {/* scrollable job list */}
      <div className="flex-1 overflow-y-auto px-[16px] pb-[16px]">
        <div className="flex flex-col gap-[12px]">
          {JOBS.map((job, i) => {
            const isSelected = detailOpen && selectedJob === i;

            return isSelected ? (
              /* Invisible placeholder to preserve layout */
              <div key={i} className="bg-white border border-[#949494] rounded-[12px] p-[16px] relative opacity-0 pointer-events-none" aria-hidden>
                <div className="flex items-start justify-between">
                  <p className="text-[17px] font-bold text-[#222] leading-snug">{job.title}</p>
                  {job.openings && (
                    <span className="shrink-0 ml-[8px] bg-[#eef2ff] text-[#1a3a6e] text-[14px] px-[8px] py-[2px] rounded-full">
                      {job.openings} openings
                    </span>
                  )}
                </div>
                <p className="text-[15px] text-[#666] mt-[2px]">{job.company}</p>
                <div className="flex items-center gap-[8px] mt-[6px]">
                  <span className="text-[15px] text-[#767676] flex items-center gap-[2px]">
                    {job.rating}{" "}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </span>
                  <span className="text-[15px] text-[#767676]">{job.posted}</span>
                </div>
                <div className="mt-[12px] relative inline-block">
                  <button className="relative z-10 border border-[#1a3a6e] text-[#1a3a6e] text-[17px] rounded-full px-[16px] py-[8px] bg-white">
                    View job
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                key={i}
                layoutId={`card-bg-${i}`}
                data-job-card
                className="bg-white border border-[#949494] rounded-[12px] p-[16px] relative"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="flex items-start justify-between">
                  <motion.p layoutId={`title-${i}`} className="text-[17px] font-bold text-[#222] leading-snug">{job.title}</motion.p>
                  {job.openings && (
                    <span className="shrink-0 ml-[8px] bg-[#eef2ff] text-[#1a3a6e] text-[14px] px-[8px] py-[2px] rounded-full">
                      {job.openings} openings
                    </span>
                  )}
                </div>
                <motion.p layoutId={`company-${i}`} className="text-[15px] text-[#666] mt-[2px]">{job.company}</motion.p>
                <div className="flex items-center gap-[8px] mt-[6px]">
                  <span className="text-[15px] text-[#767676] flex items-center gap-[2px]">
                    {job.rating}{" "}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </span>
                  <span className="text-[15px] text-[#767676]">{job.posted}</span>
                </div>
                <div className="mt-[12px] relative inline-block">
                  {i === 0 && pulseActive && (
                    <>
                      <span className="absolute inset-0 rounded-full border-2 border-[#1a3a6e] animate-[pulseRing_1.5s_ease-out_infinite]" />
                      <span className="absolute inset-0 rounded-full border-2 border-[#1a3a6e] animate-[pulseRing_1.5s_ease-out_0.5s_infinite]" />
                    </>
                  )}
                  <button
                    onClick={(e) => onViewJob(e, i)}
                    className="relative z-10 border border-[#1a3a6e] text-[#1a3a6e] text-[17px] rounded-full px-[16px] py-[8px] bg-white cursor-pointer hover:bg-[#f0f4ff] transition-colors"
                  >
                    View job
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Screen3({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* top bar */}
      <div className="flex items-center px-[16px] py-[12px] bg-white border-b border-[#f0f0f0] shrink-0">
        <button onClick={onBack} className="cursor-pointer p-[4px]" aria-label="Back">
          <BackArrow />
        </button>
        <span className="text-[19px] font-bold text-[#222] ml-[8px]">Review and apply</span>
      </div>

      {/* scrollable content */}
      <div className="flex-1 overflow-y-auto px-[16px] pb-[16px]">
        {/* your profile label */}
        <div className="flex items-center justify-between mt-[20px]">
          <p className="text-[15px] text-[#767676]">Your profile</p>
          <p className="text-[15px] text-[#767676] italic">Edited 3 days ago</p>
        </div>

        {/* profile card */}
        <div className="bg-white border border-[#949494] rounded-[12px] p-[16px] mt-[8px]">
          <p className="text-[19px] font-bold text-[#222]">Sarah Rivera</p>
          <p className="text-[15px] text-[#666] mt-[2px]">Electrician &middot; 13 years</p>
          <span className="inline-block mt-[8px] bg-[#ecfdf5] text-[#059669] text-[14px] px-[8px] py-[2px] rounded-full">
            Available
          </span>
          <div className="flex flex-wrap gap-[6px] mt-[10px]">
            {["Residential", "Commercial", "Industrial"].map((s) => (
              <span key={s} className="bg-[#f5f5f5] text-[#666] text-[14px] px-[8px] py-[4px] rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* edit profile link */}
        <button className="mt-[10px] text-[#1a3a6e] text-[15px] cursor-pointer hover:underline bg-transparent border-none p-0">
          Edit profile &rarr;
        </button>

        {/* applying to */}
        <p className="text-[15px] text-[#767676] mt-[24px]">Applying to</p>
        <div className="bg-white border border-[#949494] rounded-[12px] p-[16px] mt-[8px]">
          <p className="text-[17px] font-bold text-[#222]">Electrician &mdash; Full Time</p>
          <p className="text-[15px] text-[#666] mt-[2px]">Reliable Heating & Air</p>
        </div>

        {/* submit */}
        <button
          onClick={onSubmit}
          className="w-full mt-[24px] bg-[#1a3a6e] text-white text-[17px] font-bold rounded-full py-[14px] cursor-pointer hover:bg-[#15305c] transition-colors"
        >
          Submit application
        </button>
      </div>
    </div>
  );
}

function Screen4({ onReset }: { onReset: () => void }) {

  return (
    <div className="flex flex-col h-full">
      {/* centered confirmation */}
      <div className="flex-1 flex flex-col items-center justify-center px-[24px]">
        {/* check circle */}
        <div className="w-[64px] h-[64px] rounded-full bg-[#ecfdf5] flex items-center justify-center">
          <CheckCircle />
        </div>

        <p className="text-[23px] font-bold text-[#222] mt-[20px]">You&apos;re in the running</p>
        <p className="text-[17px] text-[#666] text-center mt-[8px]">
          Your application has been submitted to Reliable Heating & Air.
        </p>

        {/* action rows */}
        <div className="w-full mt-[32px] flex flex-col gap-[4px]">
          {/* notifications row (static — prompts native OS permission) */}
          <div
            className="flex items-center w-full px-[16px] py-[14px] bg-white border border-[#949494] rounded-[12px]"
          >
            <div className="flex items-center gap-[10px]">
              <BellIcon />
              <span className="text-[17px] text-[#222]">
                Get notified on updates
              </span>
            </div>
          </div>

          {/* explore similar */}
          <button
            onClick={onReset}
            className="flex items-center justify-between w-full px-[16px] py-[14px] bg-white border border-[#949494] rounded-[12px] cursor-pointer"
          >
            <div className="flex items-center gap-[10px]">
              <SearchIconSmall />
              <span className="text-[17px] text-[#222]">Explore similar jobs</span>
            </div>
            <ArrowRight />
          </button>
        </div>

        {/* back to job search */}
        <button
          onClick={onReset}
          className="mt-[28px] text-[17px] text-[#1a3a6e] cursor-pointer bg-transparent border-none p-0 hover:underline"
        >
          &larr; Back to job search
        </button>
      </div>
    </div>
  );
}

/* ---------- main component ---------- */

export function ApplyFlowPrototype() {
  const [pulseActive, setPulseActive] = useState(true);

  // Card expand / collapse (Screen 0 ↔ detail overlay)
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [saved, setSaved] = useState(false);

  // Detail sub-navigation (0=detail, 1=review, 2=confirmation)
  const [detailScreen, setDetailScreen] = useState(0);
  const [prevDetailScreen, setPrevDetailScreen] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const detailDirection = detailScreen >= prevDetailScreen ? "forward" : "backward";

  // Open detail overlay — expand from card
  const handleViewJob = (e: React.MouseEvent<HTMLButtonElement>, jobIndex: number) => {
    setPulseActive(false);
    setSelectedJob(jobIndex);
    setDetailOpen(true);
    setDetailScreen(0);
    setPrevDetailScreen(0);
    setSaved(false);
  };

  // Close detail overlay — two-phase: fade out content, then unmount to trigger layoutId reverse
  const handleCloseDetail = () => {
    setIsClosing(true);
    setTimeout(() => {
      setDetailOpen(false);
      setIsClosing(false);
      setSelectedJob(null);
      setDetailScreen(0);
    }, 150);
  };

  // Slide within detail flow (detail → review → confirmation)
  const goDetailScreen = (next: number) => {
    if (isSliding) return;
    setPrevDetailScreen(detailScreen);
    setDetailScreen(next);
    setIsSliding(true);
  };

  useEffect(() => {
    if (isSliding) {
      const timer = setTimeout(() => setIsSliding(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isSliding]);

  const job = selectedJob !== null ? JOBS[selectedJob] : null;

  // Screen2 is now inlined into the detail overlay (shared elements use layoutId).
  // Screen3 and Screen4 remain as standalone components.
  const detailScreens = [
    // Screen2 content — title in top bar, company info below description
    <div key="s2" className="flex flex-col h-full">
      {/* top bar: back / title / heart */}
      <div className="flex items-start gap-[10px] px-[16px] py-[10px] bg-white border-b border-[#f0f0f0] shrink-0">
        <button onClick={handleCloseDetail} className="cursor-pointer p-[4px] shrink-0" aria-label="Back">
          <BackArrow />
        </button>
        <motion.p
          layoutId={selectedJob !== null ? `title-${selectedJob}` : undefined}
          className="flex-1 min-w-0 text-[19px] font-bold text-[#222] leading-snug"
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          {job?.title} &mdash; Full Time
        </motion.p>
        <button onClick={() => setSaved(!saved)} className="cursor-pointer p-[4px] shrink-0" aria-label="Save">
          <HeartIcon filled={saved} />
        </button>
      </div>

      {/* scrollable content */}
      <div className="flex-1 overflow-y-auto px-[16px] pb-[16px]">
        {/* Openings badge */}
        {job?.openings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            transition={{ duration: 0.2, delay: isClosing ? 0 : 0.15 }}
            className="mt-[16px]"
          >
            <span className="inline-block bg-[#eef2ff] text-[#1a3a6e] text-[14px] px-[10px] py-[3px] rounded-full">
              {job.openings} openings
            </span>
          </motion.div>
        )}

        {/* Description (fades in) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosing ? 0 : 1 }}
          transition={{ duration: 0.2, delay: isClosing ? 0 : 0.15 }}
        >
          <p className="text-[17px] text-[#444] leading-relaxed mt-[20px]">
            Join our growing team as a full-time electrician. You&apos;ll work on residential and commercial projects
            across the Marietta area. Must have at least 3 years of experience and hold a valid Georgia
            electrician&apos;s license.
          </p>
        </motion.div>

        {/* Company card */}
        <div className="flex gap-[14px] border border-[#949494] rounded-[12px] p-[14px] mt-[30px] overflow-hidden">
          {/* Left: company info */}
          <div className="flex-1 min-w-0">
            <motion.p
              layoutId={selectedJob !== null ? `company-${selectedJob}` : undefined}
              className="text-[19px] font-normal text-[#222]"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              {job?.company}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isClosing ? 0 : 1 }}
              transition={{ duration: 0.2, delay: isClosing ? 0 : 0.15 }}
            >
              <p className="text-[15px] text-[#666] mt-[2px]">Marietta, GA</p>
              <div className="flex flex-wrap items-center gap-x-[10px] gap-y-[2px] mt-[6px]">
                <span className="text-[15px] text-[#666]">Est. 2008</span>
                <span className="text-[15px] text-[#767676]">|</span>
                <span className="text-[15px] text-[#666]">42 hires</span>
                <span className="text-[15px] text-[#767676]">|</span>
                <span className="text-[15px] text-[#666] flex items-center gap-[2px]">
                  4.8{" "}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: business image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            transition={{ duration: 0.2, delay: isClosing ? 0 : 0.15 }}
            className="shrink-0 w-[90px] h-[90px] rounded-[8px] overflow-hidden bg-[#f0f0f0]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=180&h=180&fit=crop&crop=center"
              alt="Business exterior"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Hiring manager + buttons (fade in) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosing ? 0 : 1 }}
          transition={{ duration: 0.2, delay: isClosing ? 0 : 0.15 }}
        >
          {/* hiring manager */}
          <div className="mt-[20px]">
            <p className="text-[14px] text-[#767676]">Hiring manager</p>
            <div className="flex items-center gap-[10px] mt-[6px]">
              <div className="w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 bg-[#f0f0f0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=72&h=72&fit=crop&crop=face"
                  alt="William Torres"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[17px] text-[#222]">William Torres</p>
            </div>
          </div>

          {/* buttons */}
          <button
            onClick={() => goDetailScreen(1)}
            className="w-full mt-[24px] bg-[#1a3a6e] text-white text-[17px] font-bold rounded-full py-[14px] cursor-pointer hover:bg-[#15305c] transition-colors"
          >
            Apply to this job
          </button>
          <button className="w-full mt-[10px] border border-[#949494] text-[#666] text-[17px] rounded-full py-[14px] cursor-pointer hover:bg-[#fafafa] transition-colors">
            Save for later
          </button>
        </motion.div>
      </div>
    </div>,
    <Screen3 key="s3" onBack={() => goDetailScreen(0)} onSubmit={() => goDetailScreen(2)} />,
    <Screen4 key="s4" onReset={handleCloseDetail} />,
  ];

  return (
    <div className="flex items-center justify-center" style={{ fontFamily: "var(--font-roboto)" }}>
      {/* inject keyframes */}
      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes slideInFromRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideOutToLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        @keyframes slideInFromLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideOutToRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
      `}</style>

      {/* phone frame */}
      <div
        className="relative w-[390px] h-[780px] rounded-[40px] border border-[#949494] bg-white overflow-hidden flex flex-col"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
      >
        <StatusBar />

        {/* global nav */}
        <GlobalNav />

        {/* screen area */}
        <LayoutGroup>
          <div className="relative flex-1 overflow-hidden">
            {/* Job list — always rendered underneath */}
            <div className="absolute inset-0">
              <Screen1 onViewJob={handleViewJob} pulseActive={pulseActive} selectedJob={selectedJob} detailOpen={detailOpen} />
            </div>

            {/* Detail overlay — card expands via layoutId */}
            {detailOpen && selectedJob !== null && (
              <motion.div
                layoutId={`card-bg-${selectedJob}`}
                className="absolute inset-0 bg-white z-10"
                style={{ borderRadius: 0, border: "none" }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                {detailScreens.map((s, idx) => {
                  let animName = "none";
                  let transform = "translateX(100%)";
                  const visible = idx === detailScreen || (idx === prevDetailScreen && isSliding);

                  if (idx === detailScreen && isSliding) {
                    animName = detailDirection === "forward" ? "slideInFromRight" : "slideInFromLeft";
                    transform = "translateX(0)";
                  } else if (idx === prevDetailScreen && isSliding) {
                    animName = detailDirection === "forward" ? "slideOutToLeft" : "slideOutToRight";
                    transform = detailDirection === "forward" ? "translateX(-100%)" : "translateX(100%)";
                  } else if (idx === detailScreen) {
                    transform = "translateX(0)";
                  } else if (idx < detailScreen) {
                    transform = "translateX(-100%)";
                  }

                  return (
                    <div
                      key={idx}
                      className="absolute inset-0"
                      style={{
                        transform: animName === "none" ? transform : undefined,
                        animation: animName !== "none" ? `${animName} 0.3s ease forwards` : undefined,
                        pointerEvents: idx === detailScreen ? "auto" : "none",
                        visibility: visible || idx === detailScreen ? "visible" : "hidden",
                      }}
                    >
                      {s}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </LayoutGroup>

        {/* app footer */}
        <AppFooter />

        <HomeIndicator />
      </div>
    </div>
  );
}
