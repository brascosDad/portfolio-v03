import type { CaseStudyMeta as Meta } from "@/lib/types";

interface CaseStudyMetaProps {
  meta: Meta;
}

export function CaseStudyMeta({ meta }: CaseStudyMetaProps) {
  const items = [
    { label: "Company", value: meta.company },
    { label: "Role", value: meta.role },
    { label: "Type", value: meta.projectType },
    { label: "Year", value: meta.year },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:flex gap-[30px] md:gap-[40px] lg:gap-[80px]">
      {items.map((item) => (
        <div key={item.label}>
          <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium uppercase tracking-wider text-text-muted">
            {item.label}
          </h4>
          <p className="mt-[5px] md:mt-[10px] text-[16px] md:text-[18px] lg:text-[20px] text-text-primary">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
