import { hardware } from "@/data/hardware";
import { SectionWrapper } from "./section-wrapper";
import { HardwareCard } from "./hardware-card";

export function HardwareSection() {
  return (
    <SectionWrapper id="hardware">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        Hardware Products
      </h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {hardware.map((item) => (
          <HardwareCard key={item.name} item={item} />
        ))}
      </div>
    </SectionWrapper>
  );
}
