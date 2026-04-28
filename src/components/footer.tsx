"use client";

import { siteData } from "@/data/site";
import { trackCtaClick } from "@/lib/analytics";

function ArrowUpRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block ml-[5px]"
    >
      <path
        d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 pt-20 pb-10 md:pt-20 md:pb-10">
      <h2 className="text-[16px] md:text-[18px] lg:text-[20px] md:text-[22px] lg:text-[24px] font-semibold tracking-tight text-text-primary">
        Let&apos;s work together
      </h2>
      <p className="mt-[10px] max-w-lg text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
        Do you have a problem you need to solve or a creative idea you need to bring to fruition? Let&apos;s talk!
      </p>
      <a
        href={`mailto:${siteData.email}`}
        onClick={() => trackCtaClick("home")}
        className="mt-[30px] inline-flex items-center rounded-[16px] bg-accent px-6 py-3 text-[16px] md:text-[18px] lg:text-[20px] font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Send me an email
        <ArrowUpRight />
      </a>
      <div className="mt-[140px] text-[12px] md:text-[14px] lg:text-[16px] text-text-muted">
        <p>&copy; {new Date().getFullYear()} {siteData.name}</p>
      </div>
    </footer>
  );
}
