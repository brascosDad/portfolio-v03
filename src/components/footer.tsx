import { siteData } from "@/data/site";

function ArrowUpRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block ml-1"
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
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Let&apos;s work together
        </h2>
        <p className="mt-4 max-w-lg text-text-muted">
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>
        <a
          href={`mailto:${siteData.email}`}
          className="mt-8 inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Send me an email
          <ArrowUpRight />
        </a>
        <div className="mt-16 flex flex-col gap-4 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {siteData.name}</p>
          <div className="flex gap-6">
            <a
              href={siteData.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primarytransition-colors"
            >
              LinkedIn
              <ArrowUpRight />
            </a>
            <a
              href={siteData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primarytransition-colors"
            >
              Resume
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
