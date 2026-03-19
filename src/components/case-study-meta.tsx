import type { CaseStudyMeta as Meta } from "@/lib/types";

interface CaseStudyMetaProps {
  meta: Meta;
}

export function CaseStudyMeta({ meta }: CaseStudyMetaProps) {
  const items = [
    { label: "Company", value: meta.company },
    { label: "Role", value: meta.role },
    { label: "Project Type", value: meta.projectType },
    { label: "Year", value: meta.year },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
            {item.label}
          </p>
          <p className="mt-1 text-sm font-medium">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
