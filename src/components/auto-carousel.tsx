"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Caption } from "./caption";

interface AutoCarouselImage {
  src: string;
  alt: string;
  selected?: boolean;
  caption?: { label: string; body: string };
}

interface AutoCarouselProps {
  images: AutoCarouselImage[];
  intervalMs?: number;
  crossfadeMs?: number;
  aspectClass?: string;
  objectPosition?: string;
  // "cover" fills the slot and may crop (default). "contain" fits the
  // whole image inside the slot with padding so nothing is cropped —
  // the right choice when cropping would lose meaningful content
  // (e.g. product screenshots).
  fit?: "cover" | "contain";
}

export function AutoCarousel({
  images,
  intervalMs,
  crossfadeMs = 700,
  aspectClass = "aspect-[4/3]",
  objectPosition = "center top",
  fit = "cover",
}: AutoCarouselProps) {
  const hasCaptions = images.some((img) => img.caption);
  // Captioned slides need more dwell time so users can finish reading
  // before the next slide; uncaptioned carousels keep the snappier pace.
  const effectiveInterval = intervalMs ?? (hasCaptions ? 8000 : 3500);

  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, effectiveInterval);
    return () => clearInterval(id);
  }, [images.length, effectiveInterval, reducedMotion]);

  if (images.length === 0) return null;

  const isContain = fit === "contain";
  const current = images[index];
  const hasBadge = typeof current.selected === "boolean";

  return (
    <div className="w-full">
      <div
        className={`relative w-full ${aspectClass} overflow-hidden rounded-md bg-bg-secondary border border-border`}
      >
        {/* Inner slot. For "contain" mode this gives images breathing room
            so the edges of the image never touch the container border. */}
        <div
          className={`absolute inset-0 ${isContain ? "p-[16px] md:p-[24px]" : ""}`}
        >
          <div className="relative w-full h-full">
            <AnimatePresence initial={false} mode="sync">
              <motion.img
                key={index}
                src={current.src}
                alt={current.alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: crossfadeMs / 1000, ease: "linear" }}
                className={`absolute inset-0 w-full h-full ${isContain ? "object-contain" : "object-cover"}`}
                style={{ objectPosition: isContain ? "center center" : objectPosition }}
                draggable={false}
              />
            </AnimatePresence>
          </div>
        </div>

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

      {hasBadge && (
        <div className="mt-[12px] flex justify-center min-h-[24px]">
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={`badge-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: crossfadeMs / 1000, ease: "linear" }}
              className="inline-flex items-center gap-[4px]"
              style={{
                background: current.selected ? "#1a1a1a" : "rgba(212, 68, 43, 0.12)",
                color: current.selected ? "#ffffff" : "#D4442B",
                fontSize: "11px",
                fontWeight: 500,
                padding: "3px 8px",
                borderRadius: "4px",
                letterSpacing: "0.02em",
              }}
            >
              <span aria-hidden>{current.selected ? "✓" : "✗"}</span>
              <span>{current.selected ? "Selected direction" : "Not selected"}</span>
            </motion.span>
          </AnimatePresence>
        </div>
      )}

      {hasCaptions && (
        <div className={`relative ${hasBadge ? "mt-[8px]" : "mt-[12px]"}`}>
          {/* All captions occupy the same grid cell so the block height
              equals the tallest caption — no layout jump on swap. */}
          <div className="grid">
            {images.map((img, i) => {
              const isActive = i === index;
              return (
                <div
                  key={i}
                  aria-hidden={!isActive}
                  style={{
                    gridArea: "1 / 1",
                    opacity: isActive ? 1 : 0,
                    transition: `opacity ${crossfadeMs}ms linear`,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {img.caption && (
                    <Caption label={img.caption.label}>{img.caption.body}</Caption>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
