"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import type { HardwareEntry } from "@/lib/types";

interface HardwareCardProps {
  item: HardwareEntry;
}

export function HardwareCard({ item }: HardwareCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -75% 0px", once: false });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-md aspect-[3/4] bg-bg-secondary"
    >
      {/* Product image */}
      <div className="absolute inset-0 bg-bg-secondary" />
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ transform: `scale(${item.scale ?? 1}) translateY(${item.translateY ?? -40}px)` }}
        />
      )}

      {/* Light overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: inView
            ? "rgba(255, 255, 255, 0.52)"
            : "rgba(255, 255, 255, 0)",
          transition: "background-color 0.5s ease",
        }}
      />

      {/* Text block */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-[20px]"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.42s ease 0.16s, transform 0.42s ease 0.16s",
        }}
      >
        <p className="ml-[10px] text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary">
          {item.name}
        </p>
        <p className="ml-[10px] mt-0 text-[16px] md:text-[18px] lg:text-[20px] text-text-secondary">
          {item.company}
        </p>
        <div className="mt-[10px] flex flex-wrap gap-[5px]">
          {item.roles.map((role) => (
            <span
              key={role}
              className="text-[12px] md:text-[14px] lg:text-[16px] uppercase tracking-wider px-[10px] py-[5px] text-text-muted border border-border"
              style={{ borderRadius: "20px" }}
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
