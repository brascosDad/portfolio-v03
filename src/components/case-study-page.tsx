import type { CaseStudy } from "@/lib/types";
import { SectionWrapper } from "./section-wrapper";
import { CaseStudyMeta } from "./case-study-meta";
import { CaseStudyBlock } from "./case-study-block";
import { CaseStudyCta } from "./case-study-cta";
import { PlaceholderImage } from "./placeholder-image";
import { Footer } from "./footer";

interface CaseStudyPageProps {
  study: CaseStudy;
}

export function CaseStudyPage({ study }: CaseStudyPageProps) {
  return (
    <>
      <SectionWrapper className="py-20 md:py-28">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          {study.title}
        </h1>
        <p className="mt-4 text-lg text-text-muted max-w-2xl">{study.subtitle}</p>

        <div className="mt-10">
          <CaseStudyMeta meta={study.meta} />
        </div>

        <div className="mt-12">
          <PlaceholderImage label="Hero image" aspect="wide" />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xs font-medium uppercase tracking-wider text-text-muted">
              Problem
            </h2>
            <p className="mt-3 leading-relaxed">{study.problem}</p>
          </div>
          <div>
            <h2 className="text-xs font-medium uppercase tracking-wider text-text-muted">
              Outcome
            </h2>
            <p className="mt-3 leading-relaxed">{study.outcome}</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="space-y-20">
        {study.sections.map((section, i) => (
          <CaseStudyBlock key={section.heading} section={section} index={i} />
        ))}

        <CaseStudyCta nextSlug={study.nextSlug} nextTitle={study.nextTitle} />
      </SectionWrapper>

      <Footer />
    </>
  );
}
