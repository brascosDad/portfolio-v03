import type { Metadata } from "next";
import { getCaseStudy } from "@/data/case-studies";
import { CaseStudyPage } from "@/components/case-study-page";
import { YonasMediaHero } from "./YonasMediaHero";

const study = getCaseStudy("work/yonas-media")!;

export const metadata: Metadata = {
  title: `${study.meta.company} — Ernest Son`,
  description: study.subtitle,
};

export default function YonasMediaPage() {
  return (
    <>
      <YonasMediaHero />
      <CaseStudyPage study={study} />
    </>
  );
}
