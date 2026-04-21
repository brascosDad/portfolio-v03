"use client";

interface DotRatingProps {
  filled: number;
}

function DotRating({ filled }: DotRatingProps) {
  return (
    <div className="flex gap-[4px] items-center mb-[5px]">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[7px] h-[7px] rounded-full bg-[#222]"
          style={{ opacity: i < filled ? 0.75 : 0.1 }}
        />
      ))}
    </div>
  );
}

interface CellData {
  dots: number;
  note: string;
}

interface HighlightCellData {
  tag: string;
  tagVariant: "none" | "none-hi";
  note: string;
}

interface PlatformRow {
  name?: string;
  blurName?: string;
  alias?: string;
  sub: string;
  isOurs?: boolean;
  cells: CellData[];
  highlights: HighlightCellData[];
  blurNotes?: boolean;
}

const platforms: PlatformRow[] = [
  {
    name: "Path to Pro Network",
    sub: "Home Depot",
    isOurs: true,
    cells: [
      { dots: 2, note: "Multiple entry points create confusion for first-time candidates." },
      { dots: 3, note: "Mobile-first design handles the majority of candidate traffic well." },
      { dots: 3, note: "Detailed trade-specific fields give candidates a thorough profile." },
      { dots: 1, note: "Badge system exists but lacks third-party or verified credentialing." },
      { dots: 2, note: "Location and trade filtering available; keyword search is limited." },
      { dots: 1, note: "Profiles are searchable but not proactively surfaced to hiring Pros." },
      { dots: 1, note: "No persistent search saving or candidate alert system in place." },
    ],
    highlights: [
      { tag: "None", tagVariant: "none-hi", note: "No AI assistance present at any stage of profile creation." },
      { tag: "None", tagVariant: "none-hi", note: "No ratings, hire history, or company verification shown to candidates." },
    ],
  },
  {
    blurName: "Trades Network Pro",
    alias: "Platform A",
    sub: "Trades-focused job board",
    blurNotes: true,
    cells: [
      { dots: 3, note: "Clear top-level navigation with intuitive category structure throughout." },
      { dots: 2, note: "Responsive layout works on mobile but not optimized for small screens." },
      { dots: 1, note: "Basic name and trade fields only, no free-form description supported." },
      { dots: 1, note: "No credentialing system; candidates self-report skills without validation." },
      { dots: 2, note: "Trade and location filters present; no radius or availability filtering." },
      { dots: 1, note: "Candidates appear in keyword results only; no proactive matching exists." },
      { dots: 2, note: "Email alerts for new job postings available; no saved search management." },
    ],
    highlights: [
      { tag: "None", tagVariant: "none", note: "No AI tooling present at any point in the profile creation flow." },
      { tag: "None", tagVariant: "none", note: "Job postings display basic info only; no company ratings or hire data." },
    ],
  },
  {
    blurName: "LaborLink Markets",
    alias: "Platform B",
    sub: "General labor marketplace",
    blurNotes: true,
    cells: [
      { dots: 3, note: "Dashboard-led navigation makes key actions easy to find on first visit." },
      { dots: 3, note: "Native app available; mobile experience closely mirrors the desktop product." },
      { dots: 2, note: "Supports work history and photo uploads; no trade-specific field structure." },
      { dots: 1, note: "Self-reported skills only; no external verification or badge system present." },
      { dots: 3, note: "Robust filtering across pay rate, distance, availability, and job type." },
      { dots: 2, note: "Profiles surfaced in recommended results; visibility tied to completeness score." },
      { dots: 2, note: "Saved searches with email and push notification alerts supported." },
    ],
    highlights: [
      { tag: "None", tagVariant: "none", note: "No AI features in profile creation despite broader AI investment in the product." },
      { tag: "None", tagVariant: "none", note: "Postings lack employer ratings, response rate data, or hiring history signals." },
    ],
  },
  {
    blurName: "BuildForce Connect",
    alias: "Platform C",
    sub: "Construction-specific network",
    blurNotes: true,
    cells: [
      { dots: 1, note: "Dense information architecture; new users frequently report disorientation." },
      { dots: 2, note: "Mobile-responsive but some key workflows still require desktop to complete." },
      { dots: 2, note: "Work portfolio and license fields supported; narrative description limited." },
      { dots: 2, note: "License upload feature present but verification is manual and slow." },
      { dots: 1, note: "Trade filtering only; no location radius, availability, or experience level." },
      { dots: 1, note: "Candidates visible in search but no recommendation or surfacing system." },
      { dots: 1, note: "No saved search feature; users must re-enter criteria on each visit." },
    ],
    highlights: [
      { tag: "None", tagVariant: "none", note: "Profile creation is fully manual with no AI or suggestion tooling present." },
      { tag: "None", tagVariant: "none", note: "No employer trust signals; candidates have no way to evaluate job quality." },
    ],
  },
];

const columnHeaders = [
  "Navigation ease",
  "Mobile experience",
  "Custom profile",
  "Skills credentialing",
  "Advanced search",
  "Candidate visibility",
  "Saved searches & alerts",
];

const highlightHeaders = [
  "AI profile assist",
  "Job posting validation",
];

export function CompetitiveGrid() {
  return (
    <div style={{ fontFamily: "var(--font-roboto)" }} className="py-[1rem]">
      <p className="text-[11px] text-[#999] mb-[1rem]">
        Competitive landscape — Competitor details anonymized. Based on review conducted during sprint.
      </p>

      <div className="w-full overflow-x-auto">
        <table className="border-collapse min-w-[960px] w-full" style={{ fontFamily: "var(--font-roboto)" }}>
          <thead>
            <tr>
              <th className="min-w-[170px] w-[170px] text-left text-[11px] font-medium text-[#999] pb-[8px] px-[8px] border-b border-[#e0e0e0]">
                Platform
              </th>
              {columnHeaders.map((h) => (
                <th
                  key={h}
                  className="w-[90px] min-w-[90px] text-left text-[10px] font-medium text-[#999] leading-[1.35] px-[8px] pb-[8px] border-b border-[#e0e0e0]"
                >
                  {h}
                </th>
              ))}
              {highlightHeaders.map((h) => (
                <th
                  key={h}
                  className="w-[100px] min-w-[100px] text-left text-[10px] font-medium text-[#b45309] leading-[1.35] px-[8px] pb-[8px] border-b border-[#e0e0e0] bg-[#fffbeb]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {platforms.map((platform, rowIdx) => (
              <tr
                key={rowIdx}
                className={platform.isOurs ? "bg-[#f7f7f7]" : ""}
              >
                {/* Platform name cell */}
                <td className="py-[10px] px-[8px] pl-0 align-middle border-b border-[#f0f0f0]">
                  {platform.isOurs ? (
                    <>
                      <span className="text-[13px] font-bold text-[#222] block">
                        {platform.name}
                      </span>
                      <span className="text-[11px] text-[#999] block mt-[2px]">
                        {platform.sub}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[13px] font-bold text-[#222] block">
                        <span
                          className="inline text-[12px] font-normal text-[#696969] select-none"
                          style={{ filter: "blur(3.5px)" }}
                        >
                          {platform.blurName}
                        </span>
                        {" "}
                        <span className="text-[11px] font-normal text-[#999]">
                          ({platform.alias})
                        </span>
                      </span>
                      <span className="text-[11px] text-[#999] block mt-[2px]">
                        {platform.sub}
                      </span>
                    </>
                  )}
                </td>

                {/* Standard data cells */}
                {platform.cells.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={`py-[10px] px-[8px] align-top border-b border-[#f0f0f0] ${
                      platform.isOurs ? "bg-[#f7f7f7]" : ""
                    }`}
                  >
                    <DotRating filled={cell.dots} />
                    <p
                      className="text-[10px] text-[#999] leading-[1.4]"
                      style={platform.blurNotes ? { filter: "blur(3px)", userSelect: "none" } : undefined}
                    >
                      {cell.note}
                    </p>
                  </td>
                ))}

                {/* Highlight cells (amber bg) */}
                {platform.highlights.map((cell, hIdx) => (
                  <td
                    key={`h-${hIdx}`}
                    className="py-[10px] px-[8px] align-top border-b border-[#f0f0f0] bg-[#fffbeb]"
                  >
                    {cell.tagVariant === "none-hi" ? (
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wide px-[5px] py-[2px] rounded-[3px] mb-[5px] bg-[#b45309] text-white">
                        {cell.tag}
                      </span>
                    ) : (
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wide px-[5px] py-[2px] rounded-[3px] mb-[5px] bg-[#fef2f2] text-[#dc2626]">
                        {cell.tag}
                      </span>
                    )}
                    <p
                      className="text-[10px] text-[#999] leading-[1.4]"
                      style={platform.blurNotes ? { filter: "blur(3px)", userSelect: "none" } : undefined}
                    >
                      {cell.note}
                    </p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-[1.25rem] mt-[1rem] flex-wrap">
        {[
          { filled: 3, label: "Strong" },
          { filled: 2, label: "Moderate" },
          { filled: 1, label: "Limited" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-[5px] text-[11px] text-[#999]">
            <div className="flex gap-[3px]">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-[7px] h-[7px] rounded-full bg-[#222]"
                  style={{ opacity: i < item.filled ? 0.75 : 0.1 }}
                />
              ))}
            </div>
            {item.label}
          </div>
        ))}
      </div>

      {/* Gap callout */}
      <div className="mt-[1rem] border-l-2 border-accent py-[10px] px-[14px] rounded-r-[6px] bg-accent/[0.06]">
        <p className="font-sans text-[12px] md:text-[14px] lg:text-[16px] text-text-primary leading-[1.5]">
          <strong className="font-bold">Two gaps, no one addressing them.</strong>{" "}
          Across every platform reviewed, AI assistance for profile building and validation of job posting quality were entirely absent. These became the clearest opportunities coming out of the sprint.
        </p>
      </div>
    </div>
  );
}
