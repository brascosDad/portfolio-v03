import type { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
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
  },
  {
    slug: "homedepot",
    title: "Rethinking Job Search for Skilled Tradespeople",
    subtitle: "Identifying and validating opportunity areas for the Path to Pro Network candidate experience.",
    eyebrow: "The Home Depot \u00b7 2024\u20132025",
    meta: {
      company: "The Home Depot",
      role: "Lead UX Designer",
      projectType: "Design Sprint, Competitive Analysis, Usability Testing",
      year: "2024\u20132025",
    },
    brief: "The Path to Pro Network was growing on the hiring side. Contractors and business owners were finding skilled labor through the platform \u2014 but the candidates they were looking for weren\u2019t showing up in the numbers we expected.",
    problem: "Candidate experience was inherited and untested \u2014 no one knew what was working or where job seekers were dropping off",
    outcome: "3 opportunity areas identified and validated, each moved to the product roadmap",
    thumbnails: [
      { label: "Apply flow" },
      { label: "Profile builder" },
    ],
    restricted: true,
    restrictedLabel: "Full case study on request",
    bentoMedia: [
      { type: "placeholder", alt: "The Home Depot \u2014 Path to Pro Network" },
    ],
    sections: [],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
