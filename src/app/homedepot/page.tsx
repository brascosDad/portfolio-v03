import type { Metadata } from "next";
import Link from "next/link";
import { siteData } from "@/data/site";
import { PlaceholderImage } from "@/components/placeholder-image";
import { CompetitiveGrid } from "@/components/homedepot/CompetitiveGrid";
import { SprintStructure } from "@/components/homedepot/SprintStructure";
import { ApplyFlowPrototype } from "@/components/homedepot/ApplyFlowPrototype";
import { ProfileBuilderPrototype } from "@/components/homedepot/ProfileBuilderPrototype";

export const metadata: Metadata = {
  title: "The Home Depot — Ernest Son",
  description:
    "Rethinking Job Search for Skilled Tradespeople — Path to Pro Network case study.",
};

export default function HomeDepotPage() {
  return (
    <>
      {/* Back link */}
      <div className="w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 pt-[40px]">
        <Link
          href="/"
          className="inline-flex items-center gap-[10px] text-[16px] md:text-[18px] lg:text-[20px] text-text-muted hover:text-text-primary transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M16 10H4M4 10L9 5M4 10L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </Link>
      </div>

      {/* Header */}
      <section className="w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 pt-[40px]">
        <p className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold uppercase tracking-wider text-text-secondary">
          Home Depot &middot; Path to Pro Network &middot; 2024&ndash;2025
        </p>
        <h1 className="mt-[10px] text-[20px] md:text-[22px] lg:text-[24px] font-semibold tracking-tight text-text-primary">
          Rethinking Job Search for Skilled Tradespeople
        </h1>

        {/* Meta row */}
        <div className="mt-[40px] flex flex-wrap gap-[30px] md:gap-[40px] lg:gap-[80px]">
          {[
            { label: "Company", value: "The Home Depot" },
            { label: "Role", value: "Lead UX Designer" },
            { label: "Methods", value: "Design Sprint, Competitive Analysis, Usability Testing" },
            { label: "Platform", value: "Web & Mobile" },
          ].map((item) => (
            <div key={item.label}>
              <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium uppercase tracking-wider text-text-muted">
                {item.label}
              </h4>
              <p className="mt-[5px] md:mt-[10px] text-[16px] md:text-[18px] lg:text-[20px] text-text-primary">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <hr className="mt-[40px] border-border" />
      </section>

      {/* ── Section 1: The Brief ──────────────────────────────────── */}
      <section className="w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 py-[60px]">
        <div className="grid gap-[30px] md:grid-cols-2 md:items-start md:gap-[60px]">
          <div>
            <p className="text-[12px] md:text-[14px] font-medium uppercase tracking-wider text-text-muted mb-[8px]">
              01
            </p>
            <h2 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary">
              The Brief
            </h2>
            <p className="mt-[16px] text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
              The Path to Pro Network was growing on the hiring side. Contractors and business owners were finding skilled labor through the platform — but the candidates they were looking for weren&apos;t showing up in the numbers we expected. The experience for job seekers, the skilled tradespeople at the center of the platform&apos;s mission, hadn&apos;t been meaningfully tested with real users since the product launched.
            </p>
            <p className="mt-[16px] text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
              To understand where to invest, I ran a design sprint. That meant auditing the current experience, studying what competitors were building for the same user, and synthesizing research that had already been collected but never fully acted on. The goal was to cut through the backlog of assumptions and identify where the greatest opportunities actually were — before a single screen got redesigned.
            </p>
          </div>
          <div>
            <PlaceholderImage label="Current state UX map — Asset 1" aspect="video" />
          </div>
        </div>

        <p className="mt-[30px] text-[14px] md:text-[16px] italic text-text-muted">
          The sprint wasn&apos;t about designing anything new. It was about earning the right to know what to design.
        </p>
      </section>

      {/* ── Section 2: Reading the Landscape ──────────────────────── */}
      <section className="w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 py-[60px]">
        <p className="text-[12px] md:text-[14px] font-medium uppercase tracking-wider text-text-muted mb-[8px]">
          02
        </p>
        <h2 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary">
          Reading the Landscape
        </h2>
        <p className="mt-[4px] text-[16px] md:text-[18px] lg:text-[20px] text-text-secondary italic">
          What the market was already telling us.
        </p>

        <div className="mt-[24px] grid gap-[30px] md:grid-cols-2 md:items-start md:gap-[60px]">
          <div>
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
              Before proposing anything, I needed to understand what the market looked like for skilled tradespeople. I mapped the competitive landscape — reviewing how other platforms handled navigation, mobile experience, profile building, search, and credentialing.
            </p>
            <p className="mt-[16px] text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
              The audit surfaced two areas where no major competitor was investing: AI-assisted profile creation and job posting validation. Both were unaddressed across the market. That mattered — it meant we weren&apos;t just catching up, we had a chance to lead.
            </p>
          </div>
        </div>

        <div className="mt-[30px]">
          <CompetitiveGrid />
        </div>
      </section>

      {/* ── Section 3: Where the Work Was ─────────────────────────── */}
      <section className="w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 py-[60px]">
        <p className="text-[12px] md:text-[14px] font-medium uppercase tracking-wider text-text-muted mb-[8px]">
          03
        </p>
        <h2 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary">
          Where the Work Was
        </h2>
        <p className="mt-[4px] text-[16px] md:text-[18px] lg:text-[20px] text-text-secondary italic">
          Three areas. Each with real evidence behind it.
        </p>

        <p className="mt-[24px] text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug max-w-[720px]">
          The sprint brought together three input streams — a current-state audit, the competitive review, and previously collected but unanalyzed research. Each activity built on the one before it, narrowing from broad landscape observations to specific, evidence-backed opportunity areas.
        </p>

        <div className="mt-[30px]">
          <SprintStructure />
        </div>

        {/* Gate block */}
        <div className="mt-[40px] rounded-md border border-border bg-bg-secondary p-[24px] md:p-[30px] flex items-start gap-[16px]">
          <svg className="w-[20px] h-[20px] text-text-muted flex-shrink-0 mt-[2px]" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="7" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <div>
            <p className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary">
              Full findings available on request
            </p>
            <p className="mt-[8px] text-[14px] md:text-[16px] text-text-muted leading-snug">
              The three opportunity areas, prototype approaches, and usability findings are documented in a detailed walkthrough. This project is under active development — reach out and I&apos;ll share the full version.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 4: From Questions to Prototypes ───────────────── */}
      <section className="w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 py-[60px]">
        <p className="text-[12px] md:text-[14px] font-medium uppercase tracking-wider text-text-muted mb-[8px]">
          04
        </p>
        <h2 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary">
          From Questions to Prototypes
        </h2>
        <p className="mt-[4px] text-[16px] md:text-[18px] lg:text-[20px] text-text-secondary italic">
          Three areas, six prototypes, real tradespeople.
        </p>

        <div className="mt-[24px] max-w-[720px]">
          <p className="text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
            Each opportunity area was explored through competing prototype approaches — two directions per area, six prototypes total. The prototypes weren&apos;t polished concepts; they were built to test specific assumptions about how tradespeople search for work and present themselves to employers.
          </p>
          <p className="mt-[16px] text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
            We put all six in front of real tradespeople — electricians, HVAC technicians, general laborers — and watched how they responded. The sessions told us which approaches matched how these users actually think about finding work.
          </p>
        </div>

        {/* Tap to explore label */}
        <p className="mt-[40px] text-[14px] italic text-text-muted">
          Tap to explore
        </p>

        {/* Two prototypes side by side */}
        <div className="mt-[16px] flex flex-col lg:flex-row gap-[40px] lg:gap-[60px] items-start justify-center">
          <div className="flex flex-col items-center">
            <ApplyFlowPrototype />
            <p className="mt-[12px] text-[14px] text-text-muted">Apply flow</p>
          </div>
          <div className="flex flex-col items-center">
            <ProfileBuilderPrototype />
            <p className="mt-[12px] text-[14px] text-text-muted">Profile builder</p>
          </div>
        </div>
      </section>

      {/* ── Section 5: The Result ─────────────────────────────────── */}
      <section className="w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 py-[60px]">
        <p className="text-[12px] md:text-[14px] font-medium uppercase tracking-wider text-text-muted mb-[8px]">
          05
        </p>
        <h2 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary">
          The Result
        </h2>

        <p className="mt-[16px] text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug max-w-[720px]">
          The sprint delivered three validated opportunity areas, each with evidence from competitive analysis, existing research, and direct user testing. All three were accepted into the product roadmap.
        </p>

        {/* Stat cards */}
        <div className="mt-[30px] grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          {[
            { value: "3", label: "opportunity areas identified" },
            { value: "6", label: "competing prototypes built and tested" },
            { value: "3", label: "directions validated and moved to roadmap" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-md bg-bg-secondary p-[24px] md:p-[30px]"
            >
              <span className="text-[28px] md:text-[32px] lg:text-[36px] font-semibold text-text-primary leading-none">
                {stat.value}
              </span>
              <p className="mt-[8px] text-[14px] md:text-[16px] text-text-muted leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 pb-[80px]">
        <div className="border-t border-border pt-[40px]">
          <p className="text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug max-w-[640px]">
            This project is under active development at The Home Depot. A full walkthrough — including the sprint findings, prototype approaches, and usability results — is available on request.
          </p>
          <div className="mt-[20px]">
            <a
              href={`mailto:${siteData.email}`}
              className="inline-flex items-center rounded-[16px] bg-accent px-[20px] py-[10px] text-[16px] md:text-[18px] lg:text-[20px] font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
