import type { ReactNode } from "react";
import clsx from "clsx";

interface CaptionProps {
  label?: string;
  children?: ReactNode;
  className?: string;
}

export function Caption({ label, children, className }: CaptionProps) {
  return (
    <div
      className={clsx(
        "border-l-2 border-accent py-[10px] px-[14px] rounded-r-[6px] bg-accent/[0.06]",
        className,
      )}
    >
      <p className="font-sans text-[12px] md:text-[14px] lg:text-[16px] text-text-primary leading-[1.5]">
        {label && <strong className="font-semibold">{label}</strong>}
        {label ? " " : null}
        {children}
      </p>
    </div>
  );
}
