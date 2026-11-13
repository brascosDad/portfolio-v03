import type { Walkthrough } from "@/lib/types";

// Home page "Walkthroughs" section. The section stays hidden in production
// until every entry has a loomId (see walkthroughs-section.tsx), so it's
// safe to merge before the videos are recorded.
export const walkthroughs: Walkthrough[] = [
  {
    id: "fall-fest",
    title: "Fall Fest map",
    subtitle: "A design system an AI agent builds against",
    duration: "4 min",
    loomId: "",
    details:
      "Design co-chair · About two weeks · Digital map (QR) + print companion · About 1,100 people used it, over 90% on phones",
    // link: { label: "View the live map", href: "" },
  },
  {
    id: "niagara",
    title: "Niagara",
    subtitle: "Simplifying a twenty-year-old expert tool",
    duration: "4 min",
    loomId: "",
  },
];
