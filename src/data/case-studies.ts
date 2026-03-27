import type { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "akqaqt",
    title: "AKQA — Reducing Context Switching for Airline Agents",
    subtitle: "A streamlined experience for managing creative projects at scale.",
    meta: {
      company: "AKQA",
      role: "Lead UX Designer",
      projectType: "Enterprise SaaS",
      year: "2023",
    },
    problem:
      "AKQA's internal client portal was fragmented across multiple tools, making it difficult for project managers and clients to track deliverables, timelines, and feedback in one place.",
    outcome:
      "Delivered a unified portal that reduced project tracking time by 40% and improved client satisfaction scores. The design system established during this project became the foundation for future internal tools.",
    problemPoints: [
      "Average call length was too high:",
      "Users were navigating multiple tools while on calls with customers",
      "Users were repeating tasks while trying to resolve customer problems",
    ],
    outcomePoints: [
      "Reduced steps to access Miles data from five to one",
      "Eliminated the most common repeated task: checking flight details",
    ],
    bentoMedia: [
      { type: "video", src: "/videos/AKQA-cancel-flow.mov", alt: "Cancel flow walkthrough", scale: 1.08, translateY: 30 },
      { type: "image", src: "/images/akqa/cs-specialist-mobile.png", alt: "CS specialist mobile view" },
      { type: "video", src: "/videos/AKQA-data-viz-animation.mov", alt: "Data viz animation" },
    ],
    sections: [
      {
        heading: "Research & Discovery",
        body: "Conducted stakeholder interviews with 12 project managers and 8 client-side users to map pain points. Created journey maps highlighting the disconnect between internal workflows and client-facing touchpoints.",
        imageLabel: "Research synthesis wall",
      },
      {
        heading: "Information Architecture",
        body: "Restructured the portal around three core views — Dashboard, Projects, and Communications — reducing navigation depth from 5 levels to 2. Card sorting with users validated the new taxonomy.",
        imageLabel: "IA diagram",
      },
      {
        heading: "Design & Iteration",
        body: "Built high-fidelity prototypes in Figma, iterating through 3 rounds of usability testing. Key improvements included a unified timeline view, inline feedback threads, and a smart notification system that surfaced only actionable items.",
        imageLabel: "Final UI screens",
      },
    ],
    nextSlug: "cdlxqt",
    nextTitle: "Cardlytics",
  },
  {
    slug: "cdlxqt",
    title: "Cardlytics — Eliminating Data Validation Bottlenecks for Data Scientists",
    subtitle: "Transforming raw transaction data into actionable marketing insights.",
    meta: {
      company: "Cardlytics",
      role: "Sr UX Designer",
      projectType: "Fintech / Data Visualization",
      year: "2022",
    },
    problem:
      "Cardlytics' advertising partners struggled to interpret purchase intelligence data. The existing dashboard overwhelmed users with raw metrics and lacked clear pathways from insight to action.",
    outcome:
      "Redesigned the analytics dashboard with progressive disclosure patterns that increased user engagement by 55% and reduced support tickets related to data interpretation by 30%.",
    bentoLayout: "hero-hero",
    bentoMedia: [
      { type: "video", src: "/videos/CDLX-TQ-animation.mov", alt: "TQ animation", scale: 0.83, translateY: -55 },
      { type: "video", src: "/videos/CDLX-analytics-animation.mov", alt: "Analytics animation", scale: 0.85 },
    ],
    problemPoints: [
      "Data scientists were manually seeking out sources of truth when checking transaction data",
      "Users waited up to three weeks for their data cleaning work to be verified",
    ],
    outcomePoints: [
      "Increased task efficiency by 75%",
      "Decreased backlog items by 45%",
    ],
    sections: [
      {
        heading: "User Research",
        body: "Shadowed 6 advertising partners during their weekly reporting workflows. Discovered that most users only needed 3-4 key metrics but were presented with 20+ on the landing page.",
        imageLabel: "User research findings",
      },
      {
        heading: "Data Visualization Strategy",
        body: "Partnered with the data science team to identify the most impactful metrics. Designed a progressive disclosure system: headline KPIs on the dashboard, with drill-down capability into detailed breakdowns.",
        imageLabel: "Dashboard wireframes",
      },
      {
        heading: "Component Library",
        body: "Created a comprehensive chart component library including custom visualizations for purchase funnel analysis, geographic spend distribution, and temporal trend comparison. Each component was designed for both light and dark contexts.",
        imageLabel: "Component library",
      },
    ],
    nextSlug: "atqt",
    nextTitle: "Autotrader",
  },
  {
    slug: "atqt",
    title: "Autotrader — Improving Search Filter Adoption for Car Buyers",
    subtitle: "Helping dealers manage inventory and connect with buyers faster.",
    meta: {
      company: "Autotrader",
      role: "UX Designer",
      projectType: "Automotive / Marketplace",
      year: "2021",
    },
    problem:
      "Autotrader's dealer portal was built incrementally over years, resulting in an inconsistent experience that frustrated dealers. Key workflows like inventory management and lead response took too many steps.",
    outcome:
      "Reduced inventory listing time from 15 minutes to under 5 minutes. Dealer NPS improved from 32 to 58 within 6 months of launch. The streamlined lead response flow increased dealer reply rates by 25%.",
    bentoLayout: "hero-triple",
    bentoMedia: [
      { type: "video", src: "/videos/AT-SRP-filters.mov", alt: "SRP filters walkthrough", loopDelay: 1000 },
      { type: "image", src: "/images/autotrader/at-mobile-1.png", alt: "Search results" },
      { type: "image", src: "/images/autotrader/at-mobile-2.png", alt: "Search filters" },
      { type: "image", src: "/images/autotrader/at-mobile-3.png", alt: "Home screen" },
    ],
    problemPoints: [
      "Users were not using filters to refine search results",
      "Results page bounce rate was 70% - higher than the 45% benchmark",
    ],
    outcomePoints: [
      "Increased filter engagement by 8%",
      "Decreased bounce rate by 15%",
    ],
    sections: [
      {
        heading: "Competitive Analysis",
        body: "Audited 8 competing dealer platforms to identify table-stakes features and opportunities for differentiation. Benchmarked key workflow completion times to set measurable improvement targets.",
        imageLabel: "Competitive analysis matrix",
      },
      {
        heading: "Workflow Optimization",
        body: "Mapped the existing inventory management flow (23 steps) and redesigned it to 9 steps by introducing smart defaults, bulk actions, and auto-populated fields from VIN decoding.",
        imageLabel: "Workflow comparison",
      },
      {
        heading: "Design System",
        body: "Established Autotrader's first formalized design system with reusable components, interaction patterns, and accessibility guidelines. This reduced design-to-development handoff time by 60%.",
        imageLabel: "Design system overview",
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
