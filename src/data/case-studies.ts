import type { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "akqaqt",
    title: "AKQA — Reimagining the Client Portal",
    subtitle: "A streamlined experience for managing creative projects at scale.",
    meta: {
      company: "AKQA",
      role: "Senior Product Designer",
      projectType: "Enterprise SaaS",
      year: "2023",
    },
    problem:
      "AKQA's internal client portal was fragmented across multiple tools, making it difficult for project managers and clients to track deliverables, timelines, and feedback in one place.",
    outcome:
      "Delivered a unified portal that reduced project tracking time by 40% and improved client satisfaction scores. The design system established during this project became the foundation for future internal tools.",
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
    title: "Cardlytics — Purchase Intelligence Dashboard",
    subtitle: "Transforming raw transaction data into actionable marketing insights.",
    meta: {
      company: "Cardlytics",
      role: "Product Designer",
      projectType: "Fintech / Data Visualization",
      year: "2022",
    },
    problem:
      "Cardlytics' advertising partners struggled to interpret purchase intelligence data. The existing dashboard overwhelmed users with raw metrics and lacked clear pathways from insight to action.",
    outcome:
      "Redesigned the analytics dashboard with progressive disclosure patterns that increased user engagement by 55% and reduced support tickets related to data interpretation by 30%.",
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
    title: "Autotrader — Dealer Experience Redesign",
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
