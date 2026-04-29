"use client";

import { useState } from "react";
import { Lightbox } from "../lightbox";
import { Caption } from "../caption";

const map = {
  src: "/images/yonas-media/journey-map-ben.png",
  alt: "Ben — current-state journey map (booking inquiry response)",
};

export function JourneyMaps() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div>
        <button
          type="button"
          aria-label="Open journey map at full size"
          onClick={() => setLightboxOpen(true)}
          className="relative w-full aspect-[4/5] overflow-hidden rounded-lg border border-border bg-bg-secondary cursor-zoom-in block"
        >
          <img
            src={map.src}
            alt={map.alt}
            className="absolute top-0 left-0 w-[150%] max-w-none h-auto journey-map-pan"
            draggable={false}
          />
          <span
            className="absolute bottom-[12px] right-[12px] inline-flex items-center gap-[6px] rounded-sm pointer-events-none select-none"
            style={{
              background: "rgba(34, 34, 34, 0.85)",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: 500,
              padding: "6px 10px",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          >
            View full size ↗
          </span>
        </button>

        <Caption label="Current-state journey map — Ben." className="mt-[12px]">
          Booking inquiry response flow, documented before any design work began. Five stages, peak frustration at stage two.
        </Caption>
      </div>

      {lightboxOpen && (
        <Lightbox src={map.src} alt={map.alt} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
}
