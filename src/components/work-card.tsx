import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import { PlaceholderImage } from "./placeholder-image";

interface WorkCardProps {
  study: CaseStudy;
}

export function WorkCard({ study }: WorkCardProps) {
  return (
    <Link
      href={`/${study.slug}`}
      className="group block rounded-2xl border border-border bg-bg-primary p-6 transition-shadow hover:shadow-lg"
    >
      <PlaceholderImage label={study.title.split(" — ")[0]} aspect="video" />
      <h3 className="mt-5 text-xl font-semibold tracking-tight group-hover:text-accent transition-colors">
        {study.title}
      </h3>
      <p className="mt-2 text-sm text-text-muted">{study.subtitle}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-text-muted">
        <div>
          <span className="font-medium text-text-primary">Company</span>
          <br />
          {study.meta.company}
        </div>
        <div>
          <span className="font-medium text-text-primary">Role</span>
          <br />
          {study.meta.role}
        </div>
        <div>
          <span className="font-medium text-text-primary">Type</span>
          <br />
          {study.meta.projectType}
        </div>
        <div>
          <span className="font-medium text-text-primary">Year</span>
          <br />
          {study.meta.year}
        </div>
      </div>
      <p className="mt-5 text-sm font-medium text-accent">
        See more &rarr;
      </p>
    </Link>
  );
}
