import Link from "next/link";
import { siteData } from "@/data/site";

interface CaseStudyCtaProps {
  nextSlug?: string;
  nextTitle?: string;
}

export function CaseStudyCta({ nextSlug, nextTitle }: CaseStudyCtaProps) {
  return (
    <div className="mt-16 flex flex-col items-center gap-4 border-t border-border pt-16 sm:flex-row sm:justify-center">
      {nextSlug && nextTitle && (
        <Link
          href={`/${nextSlug}`}
          className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-border"
        >
          Next quick tour: {nextTitle} &rarr;
        </Link>
      )}
      <a
        href={`mailto:${siteData.email}`}
        className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Email me
      </a>
    </div>
  );
}
