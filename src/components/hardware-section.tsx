import { hardware } from "@/data/hardware";
import { HardwareCard } from "./hardware-card";

export function HardwareSection() {
  return (
    <section id="hardware" className="w-full bg-bg-primary max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 py-16 md:py-24">
      <h2 className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold uppercase tracking-wider text-text-secondary">
        Beyond the Screen
      </h2>
      <div className="mt-[0px] pt-[20px] grid gap-[20px] sm:grid-cols-2 lg:grid-cols-3">
        {hardware.map((item) => (
          <HardwareCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
