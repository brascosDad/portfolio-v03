import { caseStudies } from "@/data/case-studies";
import { WorkCard } from "./work-card";

export function WorkSection() {
  return (
    <section id="work" className="w-full bg-bg-primary max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 py-16 md:py-24">
      <h2 className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold uppercase tracking-wider text-text-secondary">
        Case Studies
      </h2>
      <div className="mt-[0px] flex flex-col gap-80 md:gap-120">
        {caseStudies.map((study) => (
          <WorkCard key={study.slug} study={study} />
        ))}
      </div>
    </section>
  );
}
