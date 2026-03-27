"use client";

import { motion } from "motion/react";

const logos = [
  { name: "AKQA", src: "/logos/akqa.svg", height: 28 },
  { name: "Cardlytics", src: "/logos/cardlytics.svg", height: 26 },
  { name: "Autotrader", src: "/logos/autotrader.svg", height: 28 },
  { name: "Home Depot", src: "/logos/homedepot.svg", height: 32 },
  { name: "Newell Brands", src: "/logos/newell.svg", height: 24 },
  { name: "Coca-Cola", src: "/logos/cocacola.svg", height: 28 },
  { name: "Honeywell", src: "/logos/honeywell.svg", height: 22 },
];

export function Marquee() {
  const doubled = [...logos, ...logos];

  return (
    <section className="overflow-hidden border-y border-border py-10">
      <motion.div
        className="flex items-center gap-[60px] whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {doubled.map((logo, i) => (
          <img
            key={`${logo.name}-${i}`}
            src={logo.src}
            alt={logo.name}
            style={{ height: logo.height }}
            className="w-auto object-contain opacity-60 grayscale"
          />
        ))}
      </motion.div>
    </section>
  );
}
