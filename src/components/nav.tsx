import Link from "next/link";
import { siteData } from "@/data/site";

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block ml-[2px] md:ml-[3px] lg:ml-[4px] w-[12px] h-[12px] md:w-[14px] md:h-[14px] lg:w-[16px] lg:h-[16px]"
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

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between px-10 md:px-30 lg:px-60 py-10 md:py-[15px] lg:py-[15px]">
        <Link href="/" className="flex items-center gap-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Ernest Son" className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] lg:w-[32px] lg:h-[32px]" />
        </Link>
        <div className="flex items-center gap-20 md:gap-[24px] lg:gap-30 text-[16px] md:text-[18px] lg:text-[20px] text-text-muted [text-box-trim:both] [text-box-edge:cap_alphabetic] lg:[text-box-trim:none]">
          <a href={`mailto:${siteData.email}`}>
            Email
            <ArrowUpRight />
          </a>
          <a
            href={siteData.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <ArrowUpRight />
          </a>
          <a
            href={siteData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </nav>
  );
}
