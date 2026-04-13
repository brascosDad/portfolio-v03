"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { CaseStudy } from "@/lib/types";

const ApplyFlowPrototype = dynamic(
  () => import("./homedepot/ApplyFlowPrototype").then((m) => m.ApplyFlowPrototype),
);
const ProfileBuilderPrototype = dynamic(
  () => import("./homedepot/ProfileBuilderPrototype").then((m) => m.ProfileBuilderPrototype),
);

interface HomeDepotCardProps {
  study: CaseStudy;
}

const PHONE_W = 390 + 16; // screen + bezel
const PHONE_H = 780 + 16;

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[44px] bg-[#1a1a1a] p-[8px] shadow-xl">
      <div
        className="relative rounded-[36px] overflow-hidden bg-white"
        style={{ width: 390, height: 780 }}
      >
        {/* Dynamic island */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-full z-10" />
        {children}
      </div>
    </div>
  );
}

function ResponsivePhone({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const available = el.clientWidth;
      setScale(Math.min(1, available / PHONE_W));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <div
        style={{
          width: Math.round(PHONE_W * scale),
          height: Math.round(PHONE_H * scale),
        }}
      >
        <div
          className="origin-top-left"
          style={{
            width: PHONE_W,
            height: PHONE_H,
            transform: scale < 1 ? `scale(${scale})` : undefined,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function LockIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="2" y="7" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function LockButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-[6px] bg-bg-secondary text-text-muted hover:text-text-primary align-middle transition-colors cursor-pointer"
      aria-label="View locked content"
    >
      <LockIcon />
    </button>
  );
}

function DiscreetModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Locked content"
    >
      <div
        className="bg-bg-primary rounded-md p-[30px] max-w-[400px] w-full mx-[20px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-sm bg-bg-secondary text-text-muted">
          <LockIcon size={18} />
        </div>

        <h3 className="mt-[16px] text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-text-primary">
          Sorry, need to be discreet...
        </h3>

        <p className="mt-[10px] text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
          I&apos;m happy to set up time to walk you through the full case study.
        </p>

        <div className="mt-[24px] flex flex-col gap-[10px]">
          <a
            href="mailto:ernestleeson@gmail.com?subject=Home%20Depot%20case%20study%20%E2%80%94%20let%27s%20connect"
            className="flex items-center justify-center px-[20px] py-[10px] bg-accent hover:bg-accent-hover text-white rounded-sm text-[16px] md:text-[18px] font-medium transition-colors"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/ernestleeson"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-[20px] py-[10px] border border-border text-text-primary rounded-sm text-[16px] md:text-[18px] font-medium hover:bg-bg-secondary transition-colors"
          >
            Connect on LinkedIn
          </a>
          <button
            onClick={onClose}
            className="flex items-center justify-center px-[20px] py-[10px] text-text-muted rounded-sm text-[16px] md:text-[18px] font-medium hover:text-text-primary transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function HomeDepotCard({ study }: HomeDepotCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const outcomePoints = [
    "6 competing prototypes built and tested with real tradespeople",
    "All 3 directions moved to the product roadmap",
  ];

  const aiTools = ["NotebookLM", "Gemini", "Figma Make"];

  return (
    <div className="group pt-[10px]">
      {/* Year */}
      <p className="text-[12px] md:text-[14px] lg:text-[16px] font-medium tracking-wider text-text-secondary">
        2025
      </p>

      {/* Title */}
      <h3 className="mt-[5px] text-[20px] md:text-[22px] lg:text-[24px] font-semibold tracking-tight text-text-primary">
        Rethinking Job Search for Skilled Tradespeople
      </h3>

      {/* AI tool badges */}
      <div className="mt-[10px] flex flex-wrap gap-[8px]">
        {aiTools.map((tool) => (
          <span
            key={tool}
            className="px-[12px] py-[4px] text-[12px] md:text-[14px] lg:text-[16px] text-text-muted bg-bg-secondary rounded-full"
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Interactive prototypes in phone frames */}
      <div className="mt-[20px] grid grid-cols-1 md:grid-cols-2 gap-[30px]">
        {([ApplyFlowPrototype, ProfileBuilderPrototype] as const).map((Component, i) => (
          <div key={i} className="bg-bg-secondary rounded-md py-[40px] px-[20px]">
            <ResponsivePhone>
              <PhoneFrame>
                <Component />
              </PhoneFrame>
            </ResponsivePhone>
          </div>
        ))}
      </div>

      {/* Meta row: Company, Role, Problem, Outcome */}
      <div className="mt-[30px] grid grid-cols-1 gap-[30px] md:grid-cols-[auto_auto_1fr_1fr] md:gap-[40px] lg:gap-[80px]">
        <div>
          <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium uppercase tracking-wider text-text-muted">
            Company
          </h4>
          <p className="mt-[5px] md:mt-[20px] text-[16px] md:text-[18px] lg:text-[20px] text-text-primary">
            {study.meta.company}
          </p>
        </div>
        <div>
          <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium uppercase tracking-wider text-text-muted">
            Role
          </h4>
          <p className="mt-[5px] md:mt-[20px] text-[16px] md:text-[18px] lg:text-[20px] text-text-primary">
            {study.meta.role}
          </p>
        </div>
        <div>
          <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium uppercase tracking-wider text-text-muted">
            Problem
          </h4>
          <div className="mt-[5px] md:mt-[20px] space-y-2">
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-text-primary leading-snug">
              Onboarding drop-off was <LockButton onClick={openModal} />% higher than desired
            </p>
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-text-primary leading-snug">
              Application rate was <LockButton onClick={openModal} />% lower than expected
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium uppercase tracking-wider text-text-muted">
            Outcome
          </h4>
          <div className="mt-[5px] md:mt-[20px] space-y-2">
            {outcomePoints.map((point, i) => (
              <div key={i} className="relative pl-0">
                <span className="absolute -left-[30px] top-[2px]">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9" stroke="#F23505" strokeWidth="2" />
                    <path d="M6.5 10L9 12.5L13.5 7.5" stroke="#F23505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="text-[16px] md:text-[18px] lg:text-[20px] text-text-primary leading-snug">
                  {point}
                </p>
              </div>
            ))}
            <Link
              href={`/${study.slug}`}
              className="inline-flex items-center gap-2 mt-2 text-[16px] md:text-[18px] lg:text-[20px] font-medium text-accent hover:underline"
            >
              More details
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <DiscreetModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}
