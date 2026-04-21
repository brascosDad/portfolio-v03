"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface AutoCarouselProps {
  images: { src: string; alt: string }[];
  intervalMs?: number;
  crossfadeMs?: number;
  aspectClass?: string;
  objectPosition?: string;
}

export function AutoCarousel({
  images,
  intervalMs = 3500,
  crossfadeMs = 700,
  aspectClass = "aspect-[4/3]",
  objectPosition = "center top",
}: AutoCarouselProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs, reducedMotion]);

  if (images.length === 0) return null;

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-md bg-bg-secondary border border-border`}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={index}
          src={images[index].src}
          alt={images[index].alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: crossfadeMs / 1000, ease: "linear" }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition }}
          draggable={false}
        />
      </AnimatePresence>

      <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 flex gap-[6px] pointer-events-none">
        {images.map((_, i) => (
          <span
            key={i}
            className="w-[6px] h-[6px] rounded-full transition-colors"
            style={{
              background: i === index ? "rgba(34,34,34,0.7)" : "rgba(34,34,34,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
