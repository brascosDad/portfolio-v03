import { experience } from "@/data/experience";
import { SectionWrapper } from "./section-wrapper";
import { PlaceholderImage } from "./placeholder-image";

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Experience</h2>
      <div className="mt-10 divide-y divide-border">
        {experience.map((entry) => (
          <div
            key={`${entry.company}-${entry.period}`}
            className="flex items-center justify-between gap-4 py-5"
          >
            <div>
              <p className="font-medium">{entry.title}</p>
              <p className="text-sm text-text-muted">
                {entry.company} &middot; {entry.period}
              </p>
            </div>
            <PlaceholderImage
              label={entry.company[0]}
              aspect="square"
              className="h-10 w-10 shrink-0 text-xs"
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
