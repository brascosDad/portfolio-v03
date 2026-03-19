import type { HardwareEntry } from "@/lib/types";
import { PlaceholderImage } from "./placeholder-image";

interface HardwareCardProps {
  item: HardwareEntry;
}

export function HardwareCard({ item }: HardwareCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-bg-primary p-6">
      <PlaceholderImage label={item.name} aspect="video" />
      <p className="mt-1 text-xs text-text-muted">{item.category}</p>
      <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
      <p className="mt-2 text-sm text-text-muted leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}
