"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { walkthroughs } from "@/data/walkthroughs";
import { trackWalkthroughPlay } from "@/lib/analytics";
import type { Walkthrough } from "@/lib/types";

// Hidden on the production site until every video is recorded; preview
// deploys and local dev always show it so the layout can be reviewed.
const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
const allRecorded = walkthroughs.every((w) => Boolean(w.loomId));

function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="ml-[3px]">
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  );
}

function WalkthroughCard({ item }: { item: Walkthrough }) {
  const [playing, setPlaying] = useState(false);
  const recorded = Boolean(item.loomId);

  const play = () => {
    if (!recorded) return;
    trackWalkthroughPlay(item.id);
    setPlaying(true);
  };

  return (
    <article className="flex flex-col gap-20">
      <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-bg-secondary">
        {playing ? (
          <iframe
            src={`https://www.loom.com/embed/${item.loomId}?autoplay=1&hide_owner=true&hide_share=true&hideEmbedTopBar=true`}
            title={`${item.title} walkthrough`}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={play}
            disabled={!recorded}
            aria-label={recorded ? `Play ${item.title} walkthrough, ${item.duration}` : `${item.title} walkthrough, coming soon`}
            className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent disabled:cursor-default"
          >
            {item.poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
            )}
            <span
              className={clsx(
                "relative flex h-[56px] w-[56px] md:h-[72px] md:w-[72px] items-center justify-center rounded-full text-bg-primary transition-transform",
                recorded ? "bg-accent group-hover:bg-accent-hover group-hover:scale-105" : "bg-text-secondary",
              )}
            >
              <PlayIcon />
            </span>
            <span className="absolute bottom-10 right-10 md:bottom-20 md:right-20 rounded-sm bg-text-primary px-10 py-5 text-[12px] md:text-[14px] font-semibold text-bg-primary">
              {recorded ? item.duration : "Coming soon"}
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-col gap-5">
        <h3 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-text-primary">{item.title}</h3>
        <p className="text-[16px] md:text-[18px] lg:text-[20px] text-text-muted">{item.subtitle}</p>
        {playing && item.details && (
          <p className="mt-5 text-[14px] md:text-[16px] text-text-secondary">{item.details}</p>
        )}
        {playing && item.link?.href && (
          <a
            href={item.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 self-start rounded-sm border border-border px-20 py-10 text-[14px] md:text-[16px] font-semibold text-accent hover:border-accent"
          >
            {item.link.label}
          </a>
        )}
      </div>
    </article>
  );
}

export function WalkthroughsSection() {
  if (isProduction && !allRecorded) return null;

  return (
    <section id="walkthroughs" className="w-full bg-bg-primary max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60">
      <div className="flex flex-col gap-5 md:flex-row md:items-baseline md:justify-between">
        <h2 className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold uppercase tracking-wider text-text-secondary">
          Walkthroughs
        </h2>
        <p className="text-[14px] md:text-[16px] text-text-secondary">Two short videos · about 4 min each</p>
      </div>
      <div className="mt-[20px] grid grid-cols-1 gap-40 md:grid-cols-2 md:gap-30">
        {walkthroughs.map((item) => (
          <WalkthroughCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
