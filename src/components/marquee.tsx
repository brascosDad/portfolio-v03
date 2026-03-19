"use client";

import { motion } from "motion/react";
import { skills } from "@/data/skills";

export function Marquee() {
  const doubled = [...skills, ...skills];

  return (
    <section className="overflow-hidden border-y border-border py-6">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
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
        {doubled.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="text-sm font-medium text-text-muted"
          >
            {skill}
            <span className="ml-8 text-border">&bull;</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
