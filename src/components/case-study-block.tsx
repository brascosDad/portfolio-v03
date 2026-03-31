"use client";

import { useRef, useCallback, useState } from "react";
import type { CaseStudySection } from "@/lib/types";
import { PlaceholderImage } from "./placeholder-image";
import { Lightbox } from "./lightbox";

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

  // Render the media/asset side
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
