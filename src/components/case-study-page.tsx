"use client";

import { useRef, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import type { CaseStudy, BentoMediaItem } from "@/lib/types";
import { CaseStudyMeta } from "./case-study-meta";
import { CaseStudyBlock } from "./case-study-block";
import { CaseStudyCta } from "./case-study-cta";
import { Lightbox } from "./lightbox";
import { ReelPoster } from "./yonas-media/reel/ReelPoster";
import { useIsLg } from "@/lib/use-is-lg";

const YonasPrototype = dynamic(
  () => import("./yonas-media/reel").then((m) => m.YonasPrototype),
  { ssr: false, loading: () => <ReelPoster /> },
);
const YonasStatic = dynamic(
  () => import("./yonas-media/reel").then((m) => m.YonasStatic),
  { ssr: false, loading: () => <ReelPoster /> },
);

interface CaseStudyPageProps {
  study: CaseStudy;
}

function MediaBlock({ media, label }: { media: BentoMediaItem; label?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isLg = useIsLg();

  const handleEnded = useCallback(() => {
    if (media.loopDelay && videoRef.current) {
      setTimeout(() => {
        videoRef.current?.play();
      }, media.loopDelay);
    }
  }, [media.loopDelay]);

  if (media.type === "component" && media.componentId === "yonas-reel") {
    // Below the `lg` breakpoint the interactive prototype is replaced
    // with a frozen, non-interactive snapshot of the tool — same aspect,
    // same chrome, no layout shift. Interactivity reads poorly on small
    // screens and the reel is meant to be explored, not pecked at.
    const showInteractive = isLg === true;
    return (
      <div>
        <div
          className="overflow-hidden"
          style={{
            border: "15px solid #8a8a8c",
            background: "#8a8a8c",
            borderRadius: 20,
          }}
        >
          {showInteractive ? <YonasPrototype /> : <YonasStatic />}
        </div>
        {label && (
          <div className="mt-[1rem] border-l-2 border-accent py-[10px] px-[14px] rounded-r-[6px] bg-accent/[0.06]">
            <p className="font-sans text-[12px] md:text-[14px] lg:text-[16px] text-text-primary leading-[1.5]">
              <strong className="font-bold">Live prototype.</strong>{" "}
              {label}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (media.type === "video" && media.src) {
    const hasTransform = media.scale || media.translateY;
    return (
      <div className="overflow-hidden rounded-md bg-bg-secondary border border-border flex flex-col items-center justify-center px-[30px] pt-[20px] pb-[20px]">
        <div className="overflow-hidden aspect-video w-full">
          <video
            ref={videoRef}
            autoPlay
            loop={!media.loopDelay}
            muted
            playsInline
            className="w-full object-cover"
            style={hasTransform ? {
              transform: `scale(${media.scale ?? 1}) translateY(${media.translateY ?? 0}px)`,
            } : undefined}
            onEnded={media.loopDelay ? handleEnded : undefined}
          >
            <source src={media.src} />
          </video>
        </div>
        {label && (
          <p className="mt-[10px] text-[12px] md:text-[14px] lg:text-[16px] text-text-muted">
            {label}
          </p>
        )}
      </div>
    );
  }

  if (media.type === "image" && media.src) {
    return (
      <div className="overflow-hidden rounded-md bg-bg-secondary border border-border px-[30px] py-[20px]">
        <img
          src={media.src}
          alt={media.alt || ""}
          className="mx-auto object-contain rounded-lg"
        />
      </div>
    );
  }

  return null;
}

function MvpToReelDivider() {
  return (
    <div className="flex items-center justify-between gap-4 py-5">
      <span className="text-[12px] uppercase tracking-wider whitespace-nowrap text-text-secondary">
        Initial build <span className="text-text-muted">↑</span>
      </span>
      <div className="flex-1 h-px bg-border" />
      <span className="text-[12px] uppercase tracking-wider whitespace-nowrap text-text-secondary">
        <span className="text-text-muted">↓</span> Final prototype
      </span>
    </div>
  );
}

export function CaseStudyPage({ study }: CaseStudyPageProps) {
  const [lightboxSrc, setLightboxSrc] = useState<{ src: string; alt: string } | null>(null);

  // Split title on " — " or " \u2014 " (em dash)
  const displayTitle = study.title.split(/\s[—\u2014]\s/)[1] || study.title;

  return (
    <>
      {/* Header */}
      <section className="w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 pt-[60px] md:pt-[90px] lg:pt-[100px]">
        <p className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold uppercase tracking-wider text-text-secondary">
          {study.eyebrow || "Case Study"}
        </p>
        <h1 className="mt-[10px] text-[20px] md:text-[22px] lg:text-[24px] font-semibold tracking-tight text-text-primary">
          {displayTitle}
        </h1>

        {/* Meta: Company, Role, Type */}
        <div className="mt-[40px]">
          <CaseStudyMeta meta={study.meta} />
        </div>

        {/* The Brief */}
        {study.brief && (
          <div className="mt-[40px] md:mt-[80px]">
            <h2 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary">
              The Brief
            </h2>
            <div className="mt-[10px] space-y-[16px]">
              {study.brief.split(/\n\n+/).map((para, i) => (
                <p key={i} className="text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <hr className="mt-[40px] border-border" />
      </section>

      {/* Content sections — alternating image + text */}
      <section className="w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 py-[60px]">
        {(() => {
          const insertIdx = study.solutionInsertIndex ?? study.sections.length;
          const preSections = study.sections.slice(0, insertIdx);
          const postSections = study.sections.slice(insertIdx);
          const mediaIdx = study.mediaInsertIndex;
          const heroMedia = study.bentoMedia?.[0];
          const heroMediaLabel =
            heroMedia?.type === "component" && heroMedia.componentId === "yonas-reel"
              ? "Pan the calendar, toggle artists, click any date to explore."
              : "One Tool, One Flow — interaction demo";

          const renderSections = (sections: typeof study.sections, baseIndex: number) => {
            if (mediaIdx === undefined || !heroMedia) {
              return sections.map((section, i) => (
                <CaseStudyBlock key={section.heading} section={section} index={baseIndex + i} />
              ));
            }
            const out: React.ReactNode[] = [];
            const isYonasReel =
              heroMedia.type === "component" && heroMedia.componentId === "yonas-reel";
            sections.forEach((section, i) => {
              const absoluteIdx = baseIndex + i;
              if (absoluteIdx === mediaIdx) {
                if (isYonasReel) {
                  out.push(<MvpToReelDivider key="__media-insert-divider__" />);
                }
                out.push(
                  <MediaBlock
                    key="__media-insert__"
                    media={heroMedia}
                    label={heroMediaLabel}
                  />,
                );
              }
              out.push(
                <CaseStudyBlock key={section.heading} section={section} index={absoluteIdx} />,
              );
            });
            if (mediaIdx === baseIndex + sections.length) {
              if (isYonasReel) {
                out.push(<MvpToReelDivider key="__media-insert-divider-tail__" />);
              }
              out.push(
                <MediaBlock
                  key="__media-insert-tail__"
                  media={heroMedia}
                  label={heroMediaLabel}
                />,
              );
            }
            return out;
          };

          return (
            <>
              <div className="space-y-[60px]">
                {renderSections(preSections, 0)}
              </div>

              {/* Solution section (optional) */}
              {study.solutionHeading && study.solutionBody && (
                <div className="mt-[60px]">
                  <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary">
                    {study.solutionHeading}
                  </h3>
                  <p className="mt-[10px] text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
                    {study.solutionBody}
                  </p>
                  {study.solutionImages && study.solutionImages.length > 0 && (
                    <div className={`mt-[30px] grid gap-[20px] ${study.solutionImages.length > 1 ? "md:grid-cols-2" : "grid-cols-1"}`}>
                      {study.solutionImages.map((img) => (
                        <button
                          key={img.src}
                          onClick={() => setLightboxSrc({ src: img.src, alt: img.label })}
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
                  )}
                </div>
              )}

              {postSections.length > 0 && (
                <div className="mt-[60px] space-y-[60px]">
                  {renderSections(postSections, insertIdx)}
                </div>
              )}
            </>
          );
        })()}

        {/* Animation / video block (only if no solution section AND no inline media insert) */}
        {!study.solutionHeading && study.mediaInsertIndex === undefined && study.bentoMedia && study.bentoMedia.length > 0 && (
          <div className="mt-[60px]">
            <MediaBlock
              media={study.bentoMedia[0]}
              label={
                study.bentoMedia[0].type === "component" && study.bentoMedia[0].componentId === "yonas-reel"
                  ? "Pan the calendar, toggle artists, click any date to explore."
                  : "One Tool, One Flow — interaction demo"
              }
            />
          </div>
        )}

        {/* The Result block */}
        <div className="mt-[60px] rounded-md bg-bg-secondary p-[30px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-text-primary">
            The Result
          </h2>
          {study.metrics ? (
            <div className="mt-[20px] flex gap-[40px] md:gap-[60px]">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col gap-[5px]">
                  <span className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-text-primary">
                    {metric.value}
                  </span>
                  <span className="text-[12px] md:text-[14px] lg:text-[16px] text-text-muted">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-[10px] space-y-2">
              {(study.resultPoints || study.outcomePoints || [study.outcome]).map((point, i) => (
                <p key={i} className="text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
                  {point}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <CaseStudyCta
          nextSlug={study.nextSlug}
          nextTitle={study.nextTitle}
          ctaText={study.ctaText}
          ctaButtonLabel={study.ctaButtonLabel}
          ctaButtonHref={study.ctaButtonHref}
        />
      </section>

      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc.src}
          alt={lightboxSrc.alt}
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </>
  );
}
