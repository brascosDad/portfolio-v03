import type { Metadata } from "next";
import { getCaseStudy } from "@/data/case-studies";
import { CaseStudyPage } from "@/components/case-study-page";

const study = getCaseStudy("akqaqt")!;

export const metadata: Metadata = {
  title: `${study.meta.company} — Ernest Son`,
  description: study.subtitle,
};

export default function AkqaqtPage() {
  return <CaseStudyPage study={study} />;
}
