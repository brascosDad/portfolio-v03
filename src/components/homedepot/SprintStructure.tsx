"use client";

function ArrowIcon() {
  return (
    <svg className="w-[24px] h-[24px] text-[#ccc]" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const opportunityAreas = ["Onboarding", "Profile building", "Job application"];

function OpportunityChips() {
  return (
    <div className="flex items-center justify-center gap-[6px] flex-wrap mt-[10px] mb-[10px]">
      {opportunityAreas.map((area) => (
        <span
          key={area}
          className="bg-white border border-[#d0d0d0] rounded-full px-[10px] py-[3px] text-[10px] text-[#1a1a1a] whitespace-nowrap"
        >
          {area}
        </span>
      ))}
    </div>
  );
}

const inputs = [
  {
    title: "Current state audit",
    description:
      "End-to-end mapping of the existing candidate journey — from landing page through job application — with friction points documented at each stage.",
  },
  {
    title: "Competitive review",
    description:
      "Documentation of how comparable platforms handle onboarding, profile building, search, and job matching for candidates.",
  },
  {
    title: "Existing research",
    description:
      "Prior user feedback, usability findings, and drop-off data collected across previous quarters — brought into the sprint as a third signal.",
  },
];

const activities = [
  {
    title: "Opportunity mapping",
    description:
      "Used the current state audit as a baseline to identify where experience gaps were largest and where a future state could meaningfully diverge.",
  },
  {
    title: "Competitive benchmarking",
    description:
      "Scored each platform across nine dimensions to surface experience gaps, shared pain points, and heuristic violations across the field.",
  },
  {
    title: "Thematic research review",
    description:
      "Resurfaced recurring themes from prior user feedback — frustrations, unmet needs, and patterns that had appeared across multiple sessions but not yet been addressed.",
  },
];

const anchorActivity = {
  title: "Opportunity prioritization",
  description:
    "Ranked candidate areas by signal strength — where findings from the audit, competitive review, and existing research all pointed in the same direction.",
};

export function SprintStructure() {
  return (
    <div style={{ fontFamily: "var(--font-roboto)" }} className="py-[1.5rem] max-w-[680px] bg-transparent">
      <p className="text-[11px] text-[#999] mb-[1.5rem] tracking-[0.02em]">
        Sprint structure — Path to Pro Network candidate experience, 2024
      </p>

      {/* Desktop: 3-column grid */}
      <div className="hidden md:grid grid-cols-[1fr_36px_1fr_36px_1fr] gap-0 items-start">
        {/* Inputs column */}
        <div>
          <div className="text-[10px] font-medium tracking-[0.07em] uppercase text-[#aaa] mb-[10px]">
            Inputs
          </div>
          <div className="flex flex-col gap-[8px]">
            {inputs.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-[#e8e8e8] rounded-[6px] py-[12px] px-[14px]"
              >
                <div className="text-[12px] font-bold text-[#1a1a1a] mb-[3px]">
                  {item.title}
                </div>
                <div className="text-[11px] text-[#888] leading-[1.5]">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center pt-[56px]">
          <ArrowIcon />
        </div>

        {/* Activities column */}
        <div>
          <div className="text-[10px] font-medium tracking-[0.07em] uppercase text-[#aaa] mb-[10px]">
            Sprint activities
          </div>
          <div className="flex flex-col gap-[8px]">
            {activities.map((item) => (
              <div
                key={item.title}
                className="bg-[#f7f7f7] border border-[#e4e4e4] rounded-[6px] py-[12px] px-[14px]"
              >
                <div className="text-[12px] font-bold text-[#1a1a1a] mb-[3px]">
                  {item.title}
                </div>
                <div className="text-[11px] text-[#888] leading-[1.5]">
                  {item.description}
                </div>
              </div>
            ))}
            <div className="h-[1px] bg-[#e8e8e8] my-[6px]" />
            <div className="bg-[#f7f7f7] border border-[#d0d0d0] rounded-[6px] py-[12px] px-[14px]">
              <div className="text-[9px] font-medium tracking-[0.06em] uppercase text-[#bbb] mb-[5px]">
                Draws from all three inputs
              </div>
              <div className="text-[12px] font-bold text-[#1a1a1a] mb-[3px]">
                {anchorActivity.title}
              </div>
              <div className="text-[11px] text-[#888] leading-[1.5]">
                {anchorActivity.description}
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center pt-[56px]">
          <ArrowIcon />
        </div>

        {/* Output column */}
        <div>
          <div className="text-[10px] font-medium tracking-[0.07em] uppercase text-[#aaa] mb-[10px]">
            Output
          </div>
          <div className="bg-[#f7f7f7] border border-dashed border-[#d0d0d0] rounded-[6px] py-[20px] px-[14px] text-center">
            <div className="text-[34px] font-bold text-[#1a1a1a] leading-none mb-[6px]">
              3
            </div>
            <div className="text-[12px] font-medium text-[#1a1a1a] mb-[5px]">
              Opportunity areas identified
            </div>
            <OpportunityChips />
            <div className="text-[11px] text-[#999] leading-[1.45]">
              Each backed by converging evidence from the current state, competitive landscape, and existing research.
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked layout */}
      <div className="md:hidden flex flex-col gap-[24px]">
        {/* Inputs */}
        <div>
          <div className="text-[10px] font-medium tracking-[0.07em] uppercase text-[#aaa] mb-[10px]">
            Inputs
          </div>
          <div className="flex flex-col gap-[8px]">
            {inputs.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-[#e8e8e8] rounded-[6px] py-[12px] px-[14px]"
              >
                <div className="text-[12px] font-bold text-[#1a1a1a] mb-[3px]">
                  {item.title}
                </div>
                <div className="text-[11px] text-[#888] leading-[1.5]">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowIcon />
        </div>

        {/* Activities */}
        <div>
          <div className="text-[10px] font-medium tracking-[0.07em] uppercase text-[#aaa] mb-[10px]">
            Sprint activities
          </div>
          <div className="flex flex-col gap-[8px]">
            {activities.map((item) => (
              <div
                key={item.title}
                className="bg-[#f7f7f7] border border-[#e4e4e4] rounded-[6px] py-[12px] px-[14px]"
              >
                <div className="text-[12px] font-bold text-[#1a1a1a] mb-[3px]">
                  {item.title}
                </div>
                <div className="text-[11px] text-[#888] leading-[1.5]">
                  {item.description}
                </div>
              </div>
            ))}
            <div className="h-[1px] bg-[#e8e8e8] my-[6px]" />
            <div className="bg-[#f7f7f7] border border-[#d0d0d0] rounded-[6px] py-[12px] px-[14px]">
              <div className="text-[9px] font-medium tracking-[0.06em] uppercase text-[#bbb] mb-[5px]">
                Draws from all three inputs
              </div>
              <div className="text-[12px] font-bold text-[#1a1a1a] mb-[3px]">
                {anchorActivity.title}
              </div>
              <div className="text-[11px] text-[#888] leading-[1.5]">
                {anchorActivity.description}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowIcon />
        </div>

        {/* Output */}
        <div>
          <div className="text-[10px] font-medium tracking-[0.07em] uppercase text-[#aaa] mb-[10px]">
            Output
          </div>
          <div className="bg-[#f7f7f7] border border-dashed border-[#d0d0d0] rounded-[6px] py-[20px] px-[14px] text-center">
            <div className="text-[34px] font-bold text-[#1a1a1a] leading-none mb-[6px]">
              3
            </div>
            <div className="text-[12px] font-medium text-[#1a1a1a] mb-[5px]">
              Opportunity areas identified
            </div>
            <OpportunityChips />
            <div className="text-[11px] text-[#999] leading-[1.45]">
              Each backed by converging evidence from the current state, competitive landscape, and existing research.
            </div>
          </div>
        </div>
      </div>

      {/* Footer line */}
      <div className="mt-[1.25rem] border-l-2 border-accent py-[10px] px-[14px] rounded-r-[6px] bg-accent/[0.06]">
        <p className="font-sans text-[12px] md:text-[14px] lg:text-[16px] text-text-primary leading-[1.5]">
          The sprint didn&apos;t produce designs. It produced the right questions — three areas where the evidence was strong enough to prototype and test.
        </p>
      </div>
    </div>
  );
}
