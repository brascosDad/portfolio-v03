"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { clsx } from "clsx";
import type { CaseStudy, BentoMediaItem } from "@/lib/types";
import { PlaceholderImage } from "./placeholder-image";

const ApplyFlowPrototype = dynamic(
  () => import("./homedepot/ApplyFlowPrototype").then((m) => m.ApplyFlowPrototype),
);
const ProfileBuilderPrototype = dynamic(
  () => import("./homedepot/ProfileBuilderPrototype").then((m) => m.ProfileBuilderPrototype),
);

const componentMap: Record<string, React.ComponentType> = {
  "apply-flow": ApplyFlowPrototype,
  "profile-builder": ProfileBuilderPrototype,
};

interface WorkCardProps {
  study: CaseStudy;
}

function DelayedVideo({ media, className, style }: { media: BentoMediaItem; className?: string; style?: React.CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = useCallback(() => {
    if (media.loopDelay && videoRef.current) {
      setTimeout(() => {
        videoRef.current?.play();
      }, media.loopDelay);
    }
  }, [media.loopDelay]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop={!media.loopDelay}
      muted
      playsInline
      className={className}
      style={style}
      onEnded={media.loopDelay ? handleEnded : undefined}
    >
      <source src={media.src || ""} />
    </video>
  );
}

function BentoCell({ media }: { media: BentoMediaItem }) {
  if (media.type === "video" && media.src) {
    const hasTransform = media.scale || media.translateY;
    return (
      <div className="overflow-hidden aspect-video">
        <DelayedVideo
          media={media}
          className="w-full object-cover"
          style={hasTransform ? {
            transform: `scale(${media.scale ?? 1}) translateY(${media.translateY ?? 0}px)`,
          } : undefined}
        />
      </div>
    );
  }

  if (media.type === "image" && media.src) {
    return (
      <img
        src={media.src}
        alt={media.alt || ""}
        className="mx-auto object-contain rounded-lg w-1/2"
      />
    );
  }

  if (media.type === "component" && media.componentId) {
    const Component = componentMap[media.componentId];
    if (!Component) return <PlaceholderImage label={media.alt || "Component"} aspect="video" />;
    const s = media.scale ?? 0.8;
    return (
      <div
        className="relative overflow-hidden rounded-lg mx-auto"
        style={{ width: Math.round(390 * s), height: Math.round(780 * s) }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{ transform: `scale(${s})`, width: 390, height: 780 }}
        >
          <Component />
        </div>
      </div>
    );
  }

  return <PlaceholderImage label={media.alt || "Image"} aspect="video" />;
}

export function WorkCard({ study }: WorkCardProps) {
  const layout = study.bentoLayout || "hero-split";
  const media = study.bentoMedia || [
    { type: "placeholder" as const, alt: study.meta.company },
    { type: "placeholder" as const, alt: "Detail" },
    { type: "placeholder" as const, alt: "Detail" },
  ];

  return (
    <div className="group pt-[10px]">
      {/* Year */}
      <p className="text-[12px] md:text-[14px] lg:text-[16px] font-medium tracking-wider text-text-secondary">
        {study.meta.year}
      </p>

      {/* Title */}
      <h3 className="mt-[5px] text-[20px] md:text-[22px] lg:text-[24px] font-semibold tracking-tight text-text-primary">
        {study.title.split(/\s[—\u2014]\s/)[1] || study.title}
      </h3>

      {/* Bento media grid — each cell has its own bg, white gaps between */}
      <div className="mt-[20px] grid grid-cols-1 md:grid-cols-2 gap-[30px]">
        {layout === "side-by-side" && media.map((item, i) => (
          <div key={i} className="bg-bg-secondary rounded-md px-[20px] py-[30px] h-[350px] md:h-[700px] overflow-hidden flex items-center justify-center">
            <BentoCell media={item} />
          </div>
        ))}

        {layout !== "side-by-side" && (
          <div className="md:col-span-2 bg-bg-secondary rounded-md px-[30px] pt-[20px] pb-0">
            <BentoCell media={media[0]} />
          </div>
        )}

        {layout === "hero-split" && media[1] && media[2] && (
          <>
            <div className="bg-bg-secondary rounded-md px-[40px] py-[30px] h-[350px] md:h-[700px] overflow-hidden">
              <img
                src={media[1].src || ""}
                alt={media[1].alt || ""}
                className="mx-auto object-contain rounded-lg h-full"
              />
            </div>
            <div className="bg-bg-secondary rounded-md px-[40px] py-[30px] h-[350px] md:h-[700px] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain rounded-lg"
              >
                <source src={media[2].src || ""} />
              </video>
            </div>
          </>
        )}

        {layout === "hero-hero" && media[1] && (
          <div className="md:col-span-2 bg-bg-secondary rounded-md px-[30px] py-[30px] aspect-[3/1] overflow-hidden flex items-center justify-center">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="object-contain"
              style={{
                transform: `scale(${media[1].scale ?? 1}) translateY(${media[1].translateY ?? 0}px)`,
                maxHeight: "100%",
                maxWidth: "100%",
              }}
            >
              <source src={media[1].src || ""} />
            </video>
          </div>
        )}

        {layout === "hero-triple" && (
          <div className="md:col-span-2 bg-bg-secondary rounded-md py-[40px] px-[30px] overflow-hidden">
            <div className="flex items-center justify-center gap-[20px] h-[250px] md:h-[500px]">
              {media.slice(1).map((item, i) => (
                <img
                  key={i}
                  src={item.src || ""}
                  alt={item.alt || ""}
                  className="h-full min-w-0 object-contain"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Meta row: Company, Role, Problem, Outcome */}
      <div className="mt-[30px] grid grid-cols-1 gap-[30px] md:grid-cols-[auto_auto_1fr_1fr] md:gap-[40px] lg:gap-[80px]">
        <div>
          <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium uppercase tracking-wider text-text-muted">
            Company
          </h4>
          <p className="mt-[5px] md:mt-[20px] text-[16px] md:text-[18px] lg:text-[20px] text-text-primary">
            {study.meta.company}
          </p>
        </div>
        <div>
          <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium uppercase tracking-wider text-text-muted">
            Role
          </h4>
          <p className="mt-[5px] md:mt-[20px] text-[16px] md:text-[18px] lg:text-[20px] text-text-primary">
            {study.meta.role}
          </p>
        </div>
        <div>
          <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium uppercase tracking-wider text-text-muted">
            Problem
          </h4>
          <div className="mt-[5px] md:mt-[20px] space-y-2">
            {(study.problemPoints || [study.problem]).map((point, i) => (
              <p key={i} className={clsx("text-[16px] md:text-[18px] lg:text-[20px] text-text-primary leading-snug", i === 0 && point.endsWith(":") && "font-medium")}>
                {point}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium uppercase tracking-wider text-text-muted">
            Outcome
          </h4>
          <div className="mt-[5px] md:mt-[20px] space-y-2">
            {(study.outcomePoints || [study.outcome]).map((point, i) => (
              <div key={i} className="relative pl-0">
                <span className="absolute -left-[30px] top-[2px]">
                  {/eliminat/i.test(point) ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="9" stroke="#F23505" strokeWidth="2" />
                      <path d="M7 7L13 13M13 7L7 13" stroke="#F23505" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : /decreas|reduc/i.test(point) ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="9" stroke="#F23505" strokeWidth="2" />
                      <path d="M10 5.5V14.5M10 14.5L6.5 11M10 14.5L13.5 11" stroke="#F23505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="9" stroke="#F23505" strokeWidth="2" />
                      <path d="M10 14.5V5.5M10 5.5L6.5 9M10 5.5L13.5 9" stroke="#F23505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <p className="text-[16px] md:text-[18px] lg:text-[20px] text-text-primary leading-snug">
                  {point}
                </p>
              </div>
            ))}
            <Link
              href={`/${study.slug}`}
              className="inline-flex items-center gap-2 mt-2 text-[16px] md:text-[18px] lg:text-[20px] font-medium text-accent hover:underline"
            >
              More details
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
