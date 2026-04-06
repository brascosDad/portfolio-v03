"use client";

import { useState, useEffect } from "react";

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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a6 6 0 0112 0v1" />
    </svg>
  );
}

function BackArrow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <CrateIcon />
      <div className="w-[32px] h-[32px] rounded-full bg-[#1a3a6e] flex items-center justify-center text-white text-[12px] font-bold leading-none">
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
          <span className={`text-[11px] leading-none ${t.active ? "text-[#1a3a6e] font-semibold" : "text-[#999]"}`}>
            {t.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------- screens ---------- */

function Screen1({ onViewJob, pulseActive }: { onViewJob: () => void; pulseActive: boolean }) {
  return (
    <div className="flex flex-col h-full">
      {/* sub-header */}
      <div className="flex items-center justify-between px-[16px] py-[12px] bg-white border-b border-[#f0f0f0] shrink-0">
        <div className="flex items-center gap-[8px]">
          <span className="text-[18px] text-[#222] cursor-pointer select-none">&larr;</span>
          <span className="text-[18px] font-bold text-[#222]">Jobs near you</span>
        </div>
        <div className="flex items-center gap-[4px]">
          <PinIcon />
          <span className="text-[14px] text-[#666]">Marietta, GA</span>
        </div>
      </div>

      {/* filter chips */}
      <div className="flex gap-[8px] px-[16px] py-[10px] shrink-0">
        <span className="bg-[#1a3a6e] text-white text-[14px] rounded-full px-[16px] py-[6px]">Electrician</span>
        <span className="bg-[#1a3a6e] text-white text-[14px] rounded-full px-[16px] py-[6px]">Construction</span>
      </div>

      {/* scrollable job list */}
      <div className="flex-1 overflow-y-auto px-[16px] pb-[16px]">
        <div className="flex flex-col gap-[12px]">
          {JOBS.map((job, i) => (
            <div key={i} className="bg-white border border-[#e8e8e8] rounded-[12px] p-[16px]">
              <p className="text-[16px] font-bold text-[#222] leading-snug">{job.title}</p>
              <p className="text-[14px] text-[#666] mt-[2px]">{job.company}</p>
              <div className="flex items-center gap-[8px] mt-[6px]">
                <span className="text-[14px] text-[#999] flex items-center gap-[2px]">
                  {job.rating}{" "}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </span>
                <span className="text-[14px] text-[#999]">{job.posted}</span>
              </div>
              {job.openings && (
                <span className="inline-block mt-[8px] bg-[#eef2ff] text-[#1a3a6e] text-[13px] px-[8px] py-[2px] rounded-full">
                  {job.openings} openings
                </span>
              )}
              <div className="mt-[12px] relative inline-block">
                {i === 0 && pulseActive && (
                  <>
                    <span className="absolute inset-0 rounded-full border-2 border-[#1a3a6e] animate-[pulseRing_1.5s_ease-out_infinite]" />
                    <span className="absolute inset-0 rounded-full border-2 border-[#1a3a6e] animate-[pulseRing_1.5s_ease-out_0.5s_infinite]" />
                  </>
                )}
                <button
                  onClick={onViewJob}
                  className="relative z-10 border border-[#1a3a6e] text-[#1a3a6e] text-[16px] rounded-full px-[16px] py-[8px] bg-white cursor-pointer hover:bg-[#f0f4ff] transition-colors"
                >
                  View job
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Screen2({ onBack, onApply }: { onBack: () => void; onApply: () => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {/* top bar */}
      <div className="flex items-center justify-between px-[16px] py-[12px] bg-white border-b border-[#f0f0f0] shrink-0">
        <button onClick={onBack} className="cursor-pointer p-[4px]" aria-label="Back">
          <BackArrow />
        </button>
        <button onClick={() => setSaved(!saved)} className="cursor-pointer p-[4px]" aria-label="Save">
          <HeartIcon filled={saved} />
        </button>
      </div>

      {/* scrollable content */}
      <div className="flex-1 overflow-y-auto px-[16px] pb-[16px]">
        {/* company info */}
        <div className="mt-[20px]">
          <p className="text-[18px] font-bold text-[#222]">Reliable Heating & Air</p>
          <p className="text-[14px] text-[#666] mt-[2px]">Marietta, GA</p>
        </div>

        {/* stats row */}
        <div className="flex items-center gap-[12px] mt-[14px]">
          <span className="text-[14px] text-[#666]">Est. 2008</span>
          <span className="text-[14px] text-[#ccc]">|</span>
          <span className="text-[14px] text-[#666]">42 hires</span>
          <span className="text-[14px] text-[#ccc]">|</span>
          <span className="text-[14px] text-[#666] flex items-center gap-[2px]">
            4.8{" "}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </span>
        </div>

        {/* job title */}
        <p className="text-[20px] font-bold text-[#222] mt-[20px]">Electrician &mdash; Full Time</p>

        {/* description */}
        <p className="text-[16px] text-[#444] leading-relaxed mt-[12px]">
          Join our growing team as a full-time electrician. You&apos;ll work on residential and commercial projects
          across the Marietta area. Must have at least 3 years of experience and hold a valid Georgia
          electrician&apos;s license.
        </p>

        {/* hiring manager */}
        <div className="mt-[20px]">
          <p className="text-[13px] text-[#999]">Hiring manager</p>
          <p className="text-[16px] text-[#222] mt-[2px]">William Torres</p>
        </div>

        {/* buttons */}
        <button
          onClick={onApply}
          className="w-full mt-[24px] bg-[#1a3a6e] text-white text-[16px] font-bold rounded-full py-[14px] cursor-pointer hover:bg-[#15305c] transition-colors"
        >
          Apply to this job
        </button>
        <button className="w-full mt-[10px] border border-[#e0e0e0] text-[#666] text-[16px] rounded-full py-[14px] cursor-pointer hover:bg-[#fafafa] transition-colors">
          Save for later
        </button>
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
        <span className="text-[18px] font-bold text-[#222] ml-[8px]">Review and apply</span>
      </div>

      {/* scrollable content */}
      <div className="flex-1 overflow-y-auto px-[16px] pb-[16px]">
        {/* your profile label */}
        <p className="text-[14px] text-[#999] mt-[20px]">Your profile</p>

        {/* profile card */}
        <div className="bg-white border border-[#e8e8e8] rounded-[12px] p-[16px] mt-[8px]">
          <p className="text-[18px] font-bold text-[#222]">Sarah Rivera</p>
          <p className="text-[14px] text-[#666] mt-[2px]">Electrician &middot; 13 years</p>
          <span className="inline-block mt-[8px] bg-[#ecfdf5] text-[#059669] text-[13px] px-[8px] py-[2px] rounded-full">
            Available
          </span>
          <div className="flex flex-wrap gap-[6px] mt-[10px]">
            {["Residential", "Commercial", "Industrial"].map((s) => (
              <span key={s} className="bg-[#f5f5f5] text-[#666] text-[13px] px-[8px] py-[4px] rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* edit profile link */}
        <button className="mt-[10px] text-[#1a3a6e] text-[14px] cursor-pointer hover:underline bg-transparent border-none p-0">
          Edit profile &rarr;
        </button>

        {/* applying to */}
        <p className="text-[14px] text-[#999] mt-[24px]">Applying to</p>
        <div className="bg-white border border-[#e8e8e8] rounded-[12px] p-[16px] mt-[8px]">
          <p className="text-[16px] font-bold text-[#222]">Electrician &mdash; Full Time</p>
          <p className="text-[14px] text-[#666] mt-[2px]">Reliable Heating & Air</p>
        </div>

        {/* submit */}
        <button
          onClick={onSubmit}
          className="w-full mt-[24px] bg-[#1a3a6e] text-white text-[16px] font-bold rounded-full py-[14px] cursor-pointer hover:bg-[#15305c] transition-colors"
        >
          Submit application
        </button>
      </div>
    </div>
  );
}

function Screen4({ onReset }: { onReset: () => void }) {
  const [notifOn, setNotifOn] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {/* centered confirmation */}
      <div className="flex-1 flex flex-col items-center justify-center px-[24px]">
        {/* check circle */}
        <div className="w-[64px] h-[64px] rounded-full bg-[#ecfdf5] flex items-center justify-center">
          <CheckCircle />
        </div>

        <p className="text-[22px] font-bold text-[#222] mt-[20px]">You&apos;re in the running</p>
        <p className="text-[16px] text-[#666] text-center mt-[8px]">
          Your application has been submitted to Reliable Heating & Air.
        </p>

        {/* action rows */}
        <div className="w-full mt-[32px] flex flex-col gap-[4px]">
          {/* notifications toggle */}
          <button
            onClick={() => setNotifOn(!notifOn)}
            className="flex items-center justify-between w-full px-[16px] py-[14px] bg-white border border-[#e8e8e8] rounded-[12px] cursor-pointer"
          >
            <div className="flex items-center gap-[10px]">
              <BellIcon />
              <span className="text-[16px] text-[#222]">
                {notifOn ? "Notifications on" : "Get notified on updates"}
              </span>
              {notifOn && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              )}
            </div>
            {/* toggle */}
            <div
              className={`w-[40px] h-[24px] rounded-full relative transition-colors duration-200 ${notifOn ? "bg-[#1a3a6e]" : "bg-[#e0e0e0]"}`}
            >
              <div
                className={`absolute top-[2px] w-[20px] h-[20px] rounded-full bg-white shadow transition-transform duration-200 ${notifOn ? "translate-x-[18px]" : "translate-x-[2px]"}`}
              />
            </div>
          </button>

          {/* explore similar */}
          <button
            onClick={onReset}
            className="flex items-center justify-between w-full px-[16px] py-[14px] bg-white border border-[#e8e8e8] rounded-[12px] cursor-pointer"
          >
            <div className="flex items-center gap-[10px]">
              <SearchIconSmall />
              <span className="text-[16px] text-[#222]">Explore similar jobs</span>
            </div>
            <ArrowRight />
          </button>
        </div>

        {/* back to job search */}
        <button
          onClick={onReset}
          className="mt-[28px] text-[16px] text-[#1a3a6e] cursor-pointer bg-transparent border-none p-0 hover:underline"
        >
          &larr; Back to job search
        </button>
      </div>
    </div>
  );
}

/* ---------- main component ---------- */

export function ApplyFlowPrototype() {
  const [screen, setScreen] = useState(0);
  const [prevScreen, setPrevScreen] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pulseActive, setPulseActive] = useState(true);

  // Determine direction: forward if going to higher screen, backward if lower
  const direction = screen >= prevScreen ? "forward" : "backward";

  const goTo = (next: number) => {
    if (isAnimating) return;
    setPrevScreen(screen);
    setScreen(next);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 320);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleViewJob = () => {
    setPulseActive(false);
    goTo(1);
  };

  const handleReset = () => {
    goTo(0);
  };

  const screens = [
    <Screen1 key="s1" onViewJob={handleViewJob} pulseActive={pulseActive} />,
    <Screen2 key="s2" onBack={() => goTo(0)} onApply={() => goTo(2)} />,
    <Screen3 key="s3" onBack={() => goTo(1)} onSubmit={() => goTo(3)} />,
    <Screen4 key="s4" onReset={handleReset} />,
  ];

  return (
    <div className="flex items-center justify-center" style={{ fontFamily: "var(--font-roboto)" }}>
      {/* inject keyframes */}
      <style>{`
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
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
        className="relative w-[390px] h-[780px] rounded-[40px] border border-[#e0e0e0] bg-white overflow-hidden"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
      >
        {/* global nav */}
        <GlobalNav />

        {/* screen area */}
        <div className="relative flex-1" style={{ height: "calc(100% - 112px)" }}>
          {screens.map((s, idx) => {
            let animName = "none";
            let transform = "translateX(100%)";
            const visible = idx === screen || (idx === prevScreen && isAnimating);

            if (idx === screen && isAnimating) {
              animName = direction === "forward" ? "slideInFromRight" : "slideInFromLeft";
              transform = "translateX(0)";
            } else if (idx === prevScreen && isAnimating) {
              animName = direction === "forward" ? "slideOutToLeft" : "slideOutToRight";
              transform = direction === "forward" ? "translateX(-100%)" : "translateX(100%)";
            } else if (idx === screen) {
              transform = "translateX(0)";
            } else if (idx < screen) {
              transform = "translateX(-100%)";
            }

            return (
              <div
                key={idx}
                className="absolute inset-0"
                style={{
                  transform: animName === "none" ? transform : undefined,
                  animation: animName !== "none" ? `${animName} 0.3s ease forwards` : undefined,
                  pointerEvents: idx === screen ? "auto" : "none",
                  visibility: visible || idx === screen ? "visible" : "hidden",
                }}
              >
                {s}
              </div>
            );
          })}
        </div>

        {/* app footer */}
        <AppFooter />
      </div>
    </div>
  );
}
