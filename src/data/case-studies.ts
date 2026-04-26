import type { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "homedepot",
    title: "The Home Depot \u2014 Rethinking Job Search for Skilled Tradespeople",
    subtitle: "Identifying and validating opportunity areas for the Path to Pro Network candidate experience.",
    meta: {
      company: "The Home Depot",
      role: "Lead UX Designer",
      projectType: "B2B2C \u00b7 Mobile, Web",
      year: "2025\u20132026",
    },
    brief: "The candidate experience on Path to Pro had gone untouched for two years. Research had already identified several areas that needed attention, but the product had been in KTLO and nothing had been acted on. When a new team was assembled to pick it back up, I joined a few weeks later \u2014 and the question of where to focus was still wide open.\n\nI was the sole designer on a cross-functional team that included front-end and back-end developers, a product manager, two marketing stakeholders, and a dedicated UX researcher. I collaborated closely with both the product manager and the UX researcher throughout the project — the researcher brought deep product history that shaped every design decision.",
    problem: "Candidate experience was inherited and untested \u2014 no one knew what was working or where job seekers were dropping off",
    outcome: "Three opportunity areas \u2014 each with tested, evidence-backed direction \u2014 moved into the FY26 product roadmap. Work that would typically take months was completed in under three weeks, using an AI-assisted workflow that compressed the cycle without cutting corners on rigor.",
    problemPoints: [
      "Onboarding drop-off was significantly above the acceptable threshold.",
      "Job application rate was well below expectations.",
    ],
    outcomePoints: [
      "6 competing prototypes built and tested with real tradespeople",
      "All 3 directions moved to the product roadmap",
    ],
    aiTools: ["NotebookLM", "Gemini", "Figma Make"],
    bentoLayout: "side-by-side",
    bentoMedia: [
      { type: "component", componentId: "apply-flow", alt: "Apply flow", scale: 0.8 },
      { type: "component", componentId: "profile-builder", alt: "Profile builder", scale: 0.8 },
    ],
    sections: [
      {
        heading: "Reading the Landscape",
        body: "With a stale product and a backlog of unresolved research, one thing missing was an understanding of how competitors were serving candidates in the trades space. I mapped what they were doing across navigation, search, profile building, and job posting quality. I also used NotebookLM to collect and synthesize all existing research \u2014 asking questions of it quickly rather than combing through documents manually.",
        customComponent: "competitive-grid",
      },
      {
        heading: "Where the Work Was",
        body: "The product team had identified the candidate experience as the area with the most friction \u2014 but not <em>where</em> in that experience. Before any design work could begin, we needed to find the seam. I ran a focused design sprint to locate it: structured activities, real constraints, a clear output. That sprint defined the problem space the rest of the project was built around. The full team — UX research, product, and engineering — reviewed the research together and dot voted on where we had the most open questions and risk. Three areas rose to the top.",
        customComponent: "sprint-structure",
      },
      {
        heading: "Finding a Strong Signal",
        body: "Development had slowed around Thanksgiving, and the product manager and I saw it as the perfect time for discovery on the areas the team had flagged during the sprint.",
        bodyExtra: "For each area, I used Gemini to help conceive the research plan \u2014 iterating on it until the approach felt right, then building competing prototype pairs in Figma Make. Each pair tested a different hypothesis about what candidates actually needed. Where testing surfaced unclear findings, we iterated and ran another cycle. We put the prototypes in front of real tradespeople, watched how they responded, synthesized the findings, and presented back to the team. The prototypes themselves were more interactive than anything Figma alone could have handled cleanly \u2014 Figma Make made the complexity manageable. The three areas consumed about two and a half weeks \u2014 work that would typically stretch across a month or more.\n\nOur bar for a meaningful signal wasn\u2019t a perfect score \u2014 it was 80% of participants responding with genuine, unprompted enthusiasm. Prompted responses carry inherent social bias and tell you what people will tolerate. Unprompted ones tell you what they actually want.\n\nOne usability finding stood out. Early prototypes asked candidates to rate their years of experience directly alongside a skill selection \u2014 two questions in close proximity. Participants consistently glossed over the experience input. Separating them into sequential steps changed the behavior immediately.\n\nOne direction generated the strongest signal of the entire study. An AI-assisted profile builder produced 100% unprompted enthusiasm across every participant. That finding directly shaped the design direction that moved into development.",
        inlineComponent: { id: "onboarding-wireframes", afterParagraph: 1 },
        customComponent: "prototypes",
      },
    ],
    ctaText: "This project is under active development at The Home Depot. A full walkthrough \u2014 including the sprint findings, prototype approaches, and usability results \u2014 is available on request.",
    ctaButtonLabel: "Let\u2019s talk",
    ctaButtonHref: "mailto:ernestleeson@gmail.com",
    nextSlug: "work/yonas-media",
    nextTitle: "Yonas Media",
  },
  {
    slug: "work/yonas-media",
    title: "Yonas Media \u2014 Collapsing a 13-Minute Workflow for a Music Booking Team",
    subtitle: "A custom booking system replacing 15 spreadsheets and two disconnected venue databases for a music management company\u2019s full team.",
    meta: {
      company: "Yonas Media",
      role: "Designer + Developer + Strategist",
      projectType: "Enterprise",
      year: "2026",
    },
    brief: "I wasn\u2019t handed this project \u2014 I went looking for it. The goal was to find a real company with a real problem and solve it end-to-end: define what to build, design it, and build it.\n\nYonas Media manages roughly 15 active touring artists. Their booking operation ran across 15 individual Google Sheets, a CRM with 9,000+ venue records disconnected from the booking calendar, and verbal handoffs between three core team members.\n\nAfter an introductory meeting with Ben, I constructed a brief with a clear goal: establish a consolidated live view of every artist, their availability, booking status, and venue data \u2014 built for how the team worked.",
    problem: "15 spreadsheets, a disconnected CRM, and email handoffs \u2014 no single person could see the full booking picture",
    outcome: "Booking inquiry time: 13 min \u2192 1 min 10 sec. Contract entry time: 1 min 15 sec \u2192 ~5 sec. Live and in active daily use.",
    problemPoints: [
      "15 individual spreadsheets, one per artist \u2014 no unified view of availability",
      "9,000+ venue records in a CRM disconnected from the booking calendar",
      "Contracts built by hand from the booking calendar",
    ],
    outcomePoints: [
      "Reduced booking inquiry time from 13 min to 1 min 10 sec",
      "Reduced contract entry time from 1 min 15 sec to ~5 sec",
      "90% daily active usage across a 15-person team",
    ],
    bentoLayout: "hero-hero" as const,
    bentoMedia: [
      { type: "component" as const, componentId: "yonas-reel", alt: "Yonas Media — animated booking story" },
    ],
    mediaInsertIndex: 4,
    sections: [
      {
        heading: "The Hidden Cost",
        body: "Before writing a line of code, we timed the work. Benchmarking with Ben revealed that evaluating a single booking inquiry \u2014 checking artist availability, cross-referencing routing, looking up a venue \u2014 took 13 minutes. He handles 10 to 15 of them a day. Downstream, Kylie was spending 1 minute 15 seconds re-entering confirmed booking data into the contract system \u2014 the same data Ben had already entered, copied by hand. Two people. Two workflows. We now had the benchmarks that would define success.",
        customComponent: "journey-maps",
      },
      {
        heading: "Built Around How They Think",
        body: "The decisions that shaped the tool came directly from working sessions with Ben and Kylie. Listening for how they actually thought about their work \u2014 not what they asked for \u2014 is what drove the directions sketched out here: a date-first entry model, and a venue search that considered both a venue-name approach and a broader search by city or state.",
        imageCarousel: [
          { src: "/images/yonas-media/sketch-date-first.png", alt: "Date-first filter view" },
          { src: "/images/yonas-media/sketch-venue-search.png", alt: "Venue name autocomplete directions" },
          { src: "/images/yonas-media/sketch-calendar-first.png", alt: "Calendar-first layout direction" },
        ],
      },
      {
        heading: "Finding the Visual Language",
        body: "Before writing a line of CSS, I wanted to understand how the team thought about the tool aesthetically \u2014 not just functionally. A short moodboarding exercise with the team surfaced what tools they used daily, what products they admired, and how they wanted the tool to feel. The direction that emerged was confident and utilitarian \u2014 something that felt built for professionals, not assembled from a template.",
        imageCarousel: [
          { src: "/images/yonas-media/visual-direction-1.png", alt: "Visual direction 1" },
          { src: "/images/yonas-media/visual-direction-2.png", alt: "Visual direction 2" },
          { src: "/images/yonas-media/visual-direction-3.png", alt: "Visual direction 3" },
        ],
        imageCarouselFit: "contain",
      },
      {
        heading: "Built to Be Used",
        body: "There was no handoff on this project because there was no one to hand off to. As the designer and the developer, every decision from research to deployment was the same person\u2019s call \u2014 which compressed the feedback loop from days to minutes, and meant the tool could be in beta with real users while it was still being built. The constraint was the same one Ben faces every day: booking season doesn\u2019t wait. The tool had to be reliable before it had to be perfect.",
        customComponent: "yonas-mvp-table",
      },
      {
        heading: "A New Baseline",
        body: "Two weeks after launch, we ran the same timed sessions with Ben and Kylie \u2014 same tasks, same conditions. The goal was simple: find out if the benchmarks we\u2019d set before building anything had moved.",
      },
    ],
    ctaText: "This is a live product, in active daily use by a team of ~20. The work isn\u2019t finished \u2014 it\u2019s in its second cycle, with a third already visible on the horizon. Want to see where this goes next?",
    ctaButtonLabel: "Let\u2019s talk",
    nextSlug: "akqaqt",
    nextTitle: "AKQA",
  },
  {
    slug: "akqaqt",
    title: "AKQA — Unifying the Airline Agent Workflow",
    subtitle: "A streamlined experience for managing creative projects at scale.",
    meta: {
      company: "AKQA",
      role: "Lead UX Designer",
      projectType: "Service Design, Desktop",
      year: "2022",
    },
    brief: "Delta engaged AKQA to reduce time spent per customer call. Specialists were navigating multiple tools mid-conversation, slowing resolution times.",
    problem:
      "Average call length was too high. Users were navigating multiple tools while on calls with customers and repeating tasks while trying to resolve customer problems.",
    outcome:
      "Reduced steps to access Miles data from five to one. Eliminated the most common repeated task: checking flight details.",
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
        heading: "In the Field",
        body: "I traveled to the Dallas hub to observe specialists on live calls. I mapped every action \u2014 tool switches, repeated lookups, total steps \u2014 and turned it into a task analysis the team could act on.",
        imageLabel: "Task analysis / research artifacts",
        imageSrc: "/images/akqa/task-analysis.png",
      },
      {
        heading: "Laying the Groundwork",
        body: "Armed with the task analysis, I facilitated a UX Strategy Blueprint session \u2014 translating what we observed in Dallas into goals the full team could design toward. Mapping user needs against business goals meant that when it came time to choose a direction, the Blueprint pointed the way.",
        imageLabel: "UX Strategy Blueprint",
        imageSrc: "/images/akqa/ux-strategy-blueprint.png",
      },
      {
        heading: "Two Directions",
        body: "The task analysis had a clear focal point: removing passengers from a flight was the task specialists repeated most, and it required leaving their primary workflow entirely. Two directions emerged for how to solve it. \u201CSingle\u201D surfaced everything at once. \u201CFlo\u201D used contextual panels \u2014 surfacing the right information at the right moment in a call. Both had merit, but would either solve the problem the way specialists needed?",
        imageLabel: "Early concept wireframes",
        imageSrc: "/images/akqa/early-concepts.png",
      },
      {
        heading: "Specialists Set Us Straight",
        body: "We brought both directions back to specialists. Their feedback was direct: a busy screen wasn\u2019t the issue \u2014 irrelevant information at the wrong moment was. Flo was the right call. We refined it around what they told us.",
        imageLabel: "Annotated wireframes + feedback",
        imageSrc: "/images/akqa/annotated-feedback.png",
      },
    ],
    nextSlug: "cdlxqt",
    nextTitle: "Cardlytics",
  },
  {
    slug: "cdlxqt",
    title: "Cardlytics \u2014 Streamlining Validation for Data Scientists",
    subtitle: "Transforming raw transaction data into actionable marketing insights.",
    meta: {
      company: "Cardlytics",
      role: "Sr UX Designer / Researcher",
      projectType: "Service Design, Desktop",
      year: "2020",
    },
    brief: "Cardlytics data scientists were manually hunting for sources of truth when validating transaction data \u2014 and waiting up to three weeks to find out if their work was right. The cost was measured in backlog items, wasted effort, and slow iteration cycles.",
    problem:
      "Data scientists were manually seeking out sources of truth when checking transaction data. Users waited up to three weeks for their data cleaning work to be verified.",
    outcome:
      "Increased task efficiency by 75%. Decreased backlog items by 45%.",
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
    metrics: [
      { value: "75%", label: "increase in task efficiency" },
      { value: "45%", label: "decrease in backlog items" },
    ],
    sections: [
      {
        heading: "Choosing the Right Problem",
        body: "Before designing anything, the team needed agreement on what to tackle first. During quarterly planning, I ran a prioritization exercise with design, product, and engineering \u2014 mapping every potential initiative against impact and effort. My job was to make sure there was a balance between user needs and business goals.",
        imageLabel: "Impact / effort prioritization matrix",
        imageSrc: "/images/cdlx/impact-effort-matrix.png",
      },
      {
        heading: "Into the Work",
        body: "With priority set, I structured research in two phases: user interviews to understand attitudes and behaviors, and contextual interviews to observe data scientists on the job. The output was a current-state journey map built with all key stakeholders \u2014 creating shared agreement not just on what was broken, but on how it felt to experience it.",
        imageLabel: "Journey map \u2014 Rate the Data Scientist",
        imageSrc: "/images/cdlx/journey-map.png",
      },
      {
        heading: "Drawing Clear Lines",
        body: "The journey map surfaced overlapping pain points across multiple tools. Rather than guess at boundaries, I ran a card sorting activity with data scientists to let them define which needs belonged where. It gave us defensible product boundaries and eliminated the feature overlap debates that slow cross-team work.",
        imageLabel: "Card sorting \u2014 Bin / Rabbit Queue / Turtle Queue",
        imageSrc: "/images/cdlx/card-sort.png",
      },
      {
        heading: "Two Approaches",
        body: "With boundaries clear, I moved into concepts. Two directions explored how data scientists might validate transaction strings \u2014 one surfacing algorithm matches with confidence scores for quick review, the other guiding them through a structured decision flow. We tested both to find out which fit how they actually work.",
        imageLabel: "Use case concept screens",
        imageSrc: "/images/cdlx/use-case-concepts.png",
      },
    ],
    solutionHeading: "One Source of Truth",
    solutionBody: "The final design gave data scientists a single place to search, review, and validate transaction strings \u2014 replacing the multi-system lookup that had been eating hours per day. Algorithm matches surfaced with confidence scores, recommendations guided the decision, and approved strings moved directly to the purchase graph without leaving the tool.",
    solutionImages: [
      { src: "/images/cdlx/final-design-screen.png", label: "Validation tool \u2014 queue view" },
    ],
    nextSlug: "atqt",
    nextTitle: "Autotrader",
  },
  {
    slug: "atqt",
    title: "Autotrader — Improving Filter Discoverability for Car Buyers",
    subtitle: "Helping users find the right car faster through smarter filter design.",
    meta: {
      company: "Autotrader",
      role: "UX Designer",
      projectType: "B2C, Web & Native iOS / Android",
      year: "2019",
    },
    brief: "65\u2009% of users landing on Autotrader\u2019s search results page weren\u2019t engaging with filters at all \u2014 and 45\u2009% were bouncing. Filters existed, but people weren\u2019t using them.",
    problem:
      "Users were not engaging with search filters. 65% of users ignored filters entirely and 45% bounced from the results page.",
    outcome:
      "Increased filter engagement by 8%. Decreased bounce rate by 3%. Increased conversions by 10%.",
    bentoLayout: "hero-triple",
    bentoMedia: [
      { type: "video", src: "/videos/AT-SRP-filters.mov", alt: "SRP filters walkthrough", loopDelay: 1000 },
      { type: "image", src: "/images/autotrader/at-mobile-1.png", alt: "Search results" },
      { type: "image", src: "/images/autotrader/at-mobile-2.png", alt: "Search filters" },
      { type: "image", src: "/images/autotrader/at-mobile-3.png", alt: "Home screen" },
    ],
    problemPoints: [
      "Users were not using filters to refine search results",
      "Results page bounce rate was higher than the 45% benchmark",
    ],
    outcomePoints: [
      "Increased filter engagement by 8%",
      "Decreased bounce rate by 3%",
      "Increased conversions by 10%",
    ],
    metrics: [
      { value: "8%", label: "increase in filter engagement" },
      { value: "3%", label: "decrease in bounce rate" },
      { value: "10%", label: "increase in conversions" },
    ],
    sections: [
      {
        heading: "Prioritizing the Right Problem",
        body: "Our squad used bullseye diagramming as a recurring exercise to keep strategy current \u2014 separating immediate priorities from longer-term bets. Filter engagement surfaced as one of the highest-impact, most addressable problems on the board. That\u2019s what pointed us here.",
        imageLabel: "Bullseye / squad strategy diagram",
        imageSrc: "/images/autotrader/bullseye-diagram.png",
      },
      {
        heading: "What the Data Told Us",
        body: "With filter engagement confirmed as the priority, we dug into the numbers. Make, Model, and Body Style were the most commonly used filters \u2014 and users who selected both a Make and Model were most likely to convert. The filters that drove results were buried among ones that didn\u2019t. The problem wasn\u2019t the filters. It was how we were presenting them.",
        imageLabel: "Analytics / search results page with filter UI",
        videoSrc: "/videos/AT-filter-scroll.mov",
      },
      {
        heading: "What Users Told Us",
        body: "User testing confirmed what the data suggested. Users felt overwhelmed the moment they landed on the results page. Too many options, too little guidance \u2014 users didn\u2019t know where to start, so most didn\u2019t.",
        quotes: [
          "I\u2019m not sure which filters to use..",
          "What\u2019s a \u2018drive type\u2019?",
        ],
        portraitSrc: "/images/autotrader/ernest-portrait.png",
      },
      {
        heading: "Two Directions",
        body: "Armed with a clear problem, I moved into lo-fi concepts. The question was how to surface the most relevant filters without overwhelming users on arrival. I built a decision matrix to help the squad work through a genuinely difficult decision \u2014 each criterion carried different weight, and the matrix made that visible. Two directions emerged. We tested both to find out which helped users move faster.",
        imageLabel: "Lo-fi concept screens",
        images: [
          { src: "/images/autotrader/concept-a.png", label: "Direction A" },
          { src: "/images/autotrader/concept-b.png", label: "Direction B" },
        ],
      },
      {
        heading: "Built to Last",
        body: "Shipping at this scale meant staying involved past the design file. I established guiding principles for the engineering team, helped fill gaps as they emerged, and treated the handoff as a delivery \u2014 staying close to the implementation until the feature was live and behaving as intended.",
        imageLabel: "Component spec / delivery documentation",
        imageSrc: "/images/autotrader/component-spec.png",
      },
    ],
    solutionHeading: "Final Design",
    solutionBody: "The solution was a contextual suggested filters layer \u2014 a recommendation service at the top of the results page based on how the user had arrived at the page. Rather than presenting every filter at once, the design guided users toward Make and Model first, the two filters most correlated with finding a car. Usability testing showed 80\u2009% of users engaged with suggested filters first, and 75\u2009% continued into the sidebar without confusion.",
    solutionImages: [
      { src: "/images/autotrader/final-design.png", label: "Suggested filters \u2014 final design" },
    ],
    solutionInsertIndex: 4,
    nextSlug: "homedepot",
    nextTitle: "The Home Depot",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
