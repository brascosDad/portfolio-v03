import type { Metadata } from "next";
import { getCaseStudy } from "@/data/case-studies";
import { CaseStudyPage } from "@/components/case-study-page";

const study = getCaseStudy("cdlxqt")!;

export const metadata: Metadata = {
  title: `${study.meta.company} — Ernest Son`,
  description: study.subtitle,
};

export default function CdlxqtPage() {
  return <CaseStudyPage study={study} />;
}
