import { caseStudies } from "@/data/case-studies";
import { SectionWrapper } from "./section-wrapper";
import { WorkCard } from "./work-card";

export function WorkSection() {
  return (
    <SectionWrapper id="work">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Work</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <WorkCard key={study.slug} study={study} />
        ))}
      </div>
    </SectionWrapper>
  );
}
