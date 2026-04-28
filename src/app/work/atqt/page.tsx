import type { Metadata } from "next";
import { getCaseStudy } from "@/data/case-studies";
import { CaseStudyPage } from "@/components/case-study-page";

const study = getCaseStudy("work/atqt")!;

export const metadata: Metadata = {
  title: `${study.meta.company} — Ernest Son`,
  description: study.subtitle,
};

export default function AtqtPage() {
  return <CaseStudyPage study={study} />;
}
