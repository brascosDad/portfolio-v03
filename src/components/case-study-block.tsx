"use client";

import { useRef, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import type { CaseStudySection } from "@/lib/types";
import { PlaceholderImage } from "./placeholder-image";
import { Lightbox } from "./lightbox";
import { AutoCarousel } from "./auto-carousel";

const CompetitiveGrid = dynamic(
  () => import("./homedepot/CompetitiveGrid").then((m) => m.CompetitiveGrid),
);
const SprintStructure = dynamic(
  () => import("./homedepot/SprintStructure").then((m) => m.SprintStructure),
);
const PrototypesShowcase = dynamic(
  () => import("./homedepot/PrototypesShowcase").then((m) => m.PrototypesShowcase),
);
const JourneyMaps = dynamic(
  () => import("./yonas-media/JourneyMaps").then((m) => m.JourneyMaps),
);
const YonasMvpTable = dynamic(
  () => import("./yonas-media/YonasMvpTable").then((m) => m.YonasMvpTable),
);

const customComponentMap: Record<string, React.ComponentType> = {
  "competitive-grid": CompetitiveGrid,
  "sprint-structure": SprintStructure,
  "prototypes": PrototypesShowcase,
  "journey-maps": JourneyMaps,
  "yonas-mvp-table": YonasMvpTable,
};

interface CaseStudyBlockProps {
  section: CaseStudySection;
  index: number;
}

export function CaseStudyBlock({ section, index }: CaseStudyBlockProps) {
  const isReversed = index % 2 !== 0;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<{ src: string; alt: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = useCallback(() => {
    if (videoRef.current) {
      setTimeout(() => {
        videoRef.current?.play();
      }, 1000);
    }
  }, []);

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc({ src, alt });
    setLightboxOpen(true);
  };

  // Custom component layout: full-width stacked
  if (section.customComponent) {
    const CustomComponent = customComponentMap[section.customComponent];
    return (
      <>
        <div>
          {section.subtitle && (
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-text-secondary italic mb-[4px]">
              {section.subtitle}
            </p>
          )}
          <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary">
            {section.heading}
          </h3>
          <div className="mt-[16px] max-w-[720px]">
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
              {section.body}
            </p>
            {section.bodyExtra && (
              <p className="mt-[16px] text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
                {section.bodyExtra}
              </p>
            )}
          </div>
          {CustomComponent && (
            <div className="mt-[30px]">
              <CustomComponent />
            </div>
          )}
          {section.gateBlock && (
            <div className="mt-[40px] rounded-md border border-border bg-bg-secondary p-[24px] md:p-[30px] flex items-start gap-[16px]">
              <svg className="w-[20px] h-[20px] text-text-muted flex-shrink-0 mt-[2px]" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="7" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <div>
                <p className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary">
                  {section.gateBlock.heading}
                </p>
                <p className="mt-[8px] text-[14px] md:text-[16px] text-text-muted leading-snug">
                  {section.gateBlock.body}
                </p>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  // Standard 2-column alternating layout
  const renderMedia = () => {
    // Quote block with portrait
    if (section.quotes && section.quotes.length > 0) {
      return (
        <div className="overflow-hidden rounded-md bg-bg-secondary border border-border relative flex items-center gap-[20px] px-[30px] pt-[30px] pb-0 min-h-[200px] md:min-h-[260px]">
          <div className="flex-1 flex flex-col gap-[16px] pb-[30px] z-10">
            {section.quotes.map((quote, i) => (
              <p
                key={i}
                className="text-[19px] md:text-[22px] lg:text-[24px] font-medium text-text-primary leading-snug"
              >
                {quote}
              </p>
            ))}
          </div>
          {section.portraitSrc && (
            <div className="w-[100px] md:w-[120px] flex-shrink-0 self-end">
              <img
                src={section.portraitSrc}
                alt=""
                className="w-full block"
                style={{ mixBlendMode: "multiply", transform: "translateY(10px)" }}
              />
            </div>
          )}
        </div>
      );
    }

    // Video block
    if (section.videoSrc) {
      return (
        <div className="overflow-hidden rounded-md bg-bg-secondary border border-border flex items-center justify-center px-[20px] py-[20px]">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="object-contain w-[50%]"
            onEnded={handleEnded}
          >
            <source src={section.videoSrc} />
          </video>
        </div>
      );
    }

    // Auto-playing crossfade carousel
    if (section.imageCarousel && section.imageCarousel.length > 0) {
      return <AutoCarousel images={section.imageCarousel} aspectClass="aspect-[4/5]" />;
    }

    // Multiple images grid
    if (section.images && section.images.length > 0) {
      return (
        <div className="grid grid-cols-2 gap-[10px]">
          {section.images.map((img) => (
            <button
              key={img.src}
              onClick={() => openLightbox(img.src, img.label)}
              className="overflow-hidden rounded-md bg-bg-secondary border border-border cursor-zoom-in"
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full object-contain"
              />
            </button>
          ))}
        </div>
      );
    }

    // Single image
    if (section.imageSrc) {
      return (
        <button
          onClick={() => openLightbox(section.imageSrc!, section.imageLabel || "")}
          className="w-full overflow-hidden rounded-md bg-bg-secondary border border-border cursor-zoom-in"
        >
          <img
            src={section.imageSrc}
            alt={section.imageLabel || ""}
            className="w-full object-contain"
          />
        </button>
      );
    }

    // Placeholder fallback
    return (
      <PlaceholderImage
        label={section.imageLabel ?? "Image"}
        aspect="video"
      />
    );
  };

  return (
    <>
      <div className="grid gap-[30px] md:grid-cols-2 md:items-center md:gap-[60px]">
        <div className={isReversed ? "md:order-2" : ""}>
          <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary">
            {section.heading}
          </h3>
          <p className="mt-[10px] text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
            {section.body}
          </p>
        </div>
        <div className={isReversed ? "md:order-1" : ""}>
          {renderMedia()}
        </div>
      </div>
      {lightboxOpen && lightboxSrc && (
        <Lightbox
          src={lightboxSrc.src}
          alt={lightboxSrc.alt}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
