import type { CaseStudySection } from "@/lib/types";
import { PlaceholderImage } from "./placeholder-image";

interface CaseStudyBlockProps {
  section: CaseStudySection;
  index: number;
}

export function CaseStudyBlock({ section, index }: CaseStudyBlockProps) {
  const isReversed = index % 2 !== 0;

  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-center">
      <div className={isReversed ? "md:order-2" : ""}>
        <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
          {section.heading}
        </h3>
        <p className="mt-4 text-text-muted leading-relaxed">{section.body}</p>
      </div>
      <div className={isReversed ? "md:order-1" : ""}>
        <PlaceholderImage
          label={section.imageLabel ?? "Image"}
          aspect="video"
        />
      </div>
    </div>
  );
}
