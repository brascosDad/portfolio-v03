"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import type { CaseStudy } from "@/lib/types";

interface HomeDepotCardProps {
  study: CaseStudy;
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
    "3 opportunity areas identified and validated",
    "6 competing prototypes built and tested with real tradespeople",
    "All 3 directions moved to the product roadmap",
  ];

  const aiTools = ["NotebookLM", "Gemini", "Figma Make"];

  return (
    <div className="group pt-[10px]">
      {/* Eyebrow */}
      <p className="text-[12px] md:text-[14px] lg:text-[16px] font-medium tracking-wider text-text-secondary">
        2024–2025
      </p>

      {/* Title */}
      <h3 className="mt-[5px] text-[20px] md:text-[22px] lg:text-[24px] font-semibold tracking-tight text-text-primary">
        Rethinking Job Search for Skilled Tradespeople
      </h3>

      {/* Prototype preview frames */}
      <div className="mt-[20px] grid grid-cols-1 md:grid-cols-2 gap-[30px]">
        <div className="bg-bg-secondary rounded-md px-[20px] py-[30px] h-[200px] md:h-[300px] flex items-center justify-center">
          <p className="text-[14px] md:text-[16px] text-text-muted text-center">
            Apply flow prototype · 4 screens · interactive
          </p>
        </div>
        <div className="bg-bg-secondary rounded-md px-[20px] py-[30px] h-[200px] md:h-[300px] flex items-center justify-center">
          <p className="text-[14px] md:text-[16px] text-text-muted text-center">
            Profile builder prototype · 8 screens · AI assist
          </p>
        </div>
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
              Onboarding drop-off was at <LockButton onClick={openModal} />
            </p>
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-text-primary leading-snug">
              <LockButton onClick={openModal} />% viewed job details but did not apply
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
                    <path d="M10 14.5V5.5M10 5.5L6.5 9M10 5.5L13.5 9" stroke="#F23505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

      {/* AI tools strip */}
      <div className="mt-[30px] pt-[20px] border-t border-border flex items-center justify-between">
        <span className="text-[12px] md:text-[14px] lg:text-[16px] font-medium uppercase tracking-wider text-text-muted">
          AI tools
        </span>
        <div className="flex gap-[10px]">
          {aiTools.map((tool) => (
            <span
              key={tool}
              className="px-[12px] py-[4px] text-[12px] md:text-[14px] lg:text-[16px] text-text-muted bg-bg-secondary rounded-full"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <DiscreetModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}
