"use client";

import { useState } from "react";
import { Lightbox } from "../lightbox";

const map = {
  src: "/images/yonas-media/journey-map-ben.png",
  label: "Ben \u2014 current-state journey map (booking inquiry response)",
};

export function JourneyMaps() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setLightboxOpen(true)}
        className="max-w-[50%] overflow-hidden rounded-md bg-bg-secondary border border-border cursor-zoom-in"
      >
        <img
          src={map.src}
          alt={map.label}
          className="w-full object-contain"
        />
        <p className="py-[8px] text-[12px] md:text-[14px] lg:text-[16px] text-text-muted">
          {map.label}
        </p>
      </button>
      {lightboxOpen && (
        <Lightbox src={map.src} alt={map.label} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
}
