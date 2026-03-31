import Link from "next/link";
import { siteData } from "@/data/site";

interface CaseStudyCtaProps {
  nextSlug?: string;
  nextTitle?: string;
}

export function CaseStudyCta({ nextSlug, nextTitle }: CaseStudyCtaProps) {
  return (
    <div className="mt-[80px] border-t border-border pt-[40px]">
      <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary">
        Want to hear more?
      </h3>
      <p className="mt-[5px] text-[16px] md:text-[18px] lg:text-[20px] text-text-muted">
        Let&apos;s talk.
      </p>
      <div className="mt-[20px] flex gap-[10px]">
        <a
          href={`mailto:${siteData.email}`}
          className="inline-flex items-center rounded-[16px] bg-accent px-[20px] py-[10px] text-[16px] md:text-[18px] lg:text-[20px] font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Email me
        </a>
        {nextSlug ? (
          <Link
            href={`/${nextSlug}`}
            className="inline-flex items-center rounded-[16px] border border-border px-[20px] py-[10px] text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary transition-colors hover:bg-bg-secondary"
          >
            Next case study &rarr;
          </Link>
        ) : (
          <Link
            href="/"
            className="inline-flex items-center rounded-[16px] border border-border px-[20px] py-[10px] text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary transition-colors hover:bg-bg-secondary"
          >
            Back to home
          </Link>
        )}
      </div>
    </div>
  );
}
