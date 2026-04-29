import type { Metadata } from "next";
import Image from "next/image";
import { siteData } from "@/data/site";

export const metadata: Metadata = {
  title: "About — Ernest Son",
  description:
    "Ernest Son — Lead UX Designer in Atlanta, GA. From mechanical engineering to product design.",
};

const EMAIL_HREF = `mailto:${siteData.email}`;

// The logo composition renders slightly wider than the viewport (105vw)
// and repeats vertically to fill the page. Opacity lives inside the SVG
// itself (fill-opacity="0.75" on each circle), so no wrapper opacity needed.
const BACKGROUND_STYLE: React.CSSProperties = {
  backgroundImage: "url(/about/logo-not-clipped.svg)",
  backgroundSize: "105vw auto",
  backgroundRepeat: "repeat-y",
  backgroundPosition: "center top",
};

function NameTitleBlock() {
  return (
    <div>
      <p className="font-sans text-[18px] font-semibold leading-snug">
        Ernest Son
      </p>
      <p className="font-sans text-[16px] leading-snug mt-5">
        <span className="font-semibold">Lead UX Designer</span>
        <span className="mx-5">·</span>
        Atlanta, GA
      </p>
    </div>
  );
}

function OpeningLine({ className }: { className?: string }) {
  return (
    <p className={`font-sans text-[24px] font-semibold leading-snug ${className ?? ""}`}>
      I&apos;ve always built things. The materials just changed.
    </p>
  );
}

function Paragraph2({ className }: { className?: string }) {
  return (
    <p className={`font-sans text-[16px] leading-[1.7] ${className ?? ""}`}>
      In 2014, I was a mechanical engineer at Coca-Cola Freestyle when I was
      introduced to a coding bootcamp. Creating things using Ruby on Rails was
      contagious and revelatory — for the first time, I could see exactly what I
      wanted to do with my career. That curiosity led me to UX, and I haven&apos;t
      looked back.
    </p>
  );
}

function Paragraph3({ className }: { className?: string }) {
  return (
    <p className={`font-sans text-[16px] leading-[1.7] ${className ?? ""}`}>
      Before I was designing interfaces, I was designing physical things.
      Cameras for children, lancing devices for diabetes patients, bassinets
      and pack-and-plays for babies. That background continues to shape how I
      work: how I think about products as systems, how they make people feel,
      and whether a product holds up in the real world.
    </p>
  );
}

function BottomCardBody({ className }: { className?: string }) {
  return (
    <div className={`font-sans text-[16px] leading-[1.7] space-y-20 ${className ?? ""}`}>
      <p>
        Lately I&apos;ve been diving deeper into the build itself. Working
        alongside AI tools — primarily Claude and Claude Code — has changed how
        I move from research to production. I can take a brief from concept to
        a working, deployed product. That changes what&apos;s possible, and I
        find that genuinely exciting.
      </p>
      <p>
        When I&apos;m not at my desk, you&apos;ll find me on a tennis court or
        soccer field near Candler Park. On weekends, my family and I love to go
        hiking or just get the dogs out for a run. For a wind-down, I&apos;ll
        sit down at a drum kit or relax on the front porch with my acoustic
        guitar.
      </p>
      <p>
        Transitioning careers wasn&apos;t the easiest decision, but when I
        discovered UX I knew I had to make the move. The listening, the
        synthesis, the moment when something complicated becomes simple, when
        something problematic becomes solved — that&apos;s what drives me.
      </p>
      <p>
        If that sounds like someone worth talking to,{" "}
        <a
          href={EMAIL_HREF}
          className="text-[#f5f5f5] underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4"
        >
          let&apos;s connect
        </a>
        .
      </p>
    </div>
  );
}

const DARK_CARD_CLASSES = "bg-[#1a1a1a] text-[#f5f5f5] rounded-sm";

// Foreground accent circles are absolutely positioned inside the desktop
// content canvas (max-w:1200). Because they share the canvas's coordinate
// system with the cards and photos, the overlap ratio stays constant as
// the layout responds — a circle tuned to nick a corner at 1440w still
// nicks that same corner at 900w. Sizes and positions are tuned so each
// circle only overlaps non-content areas (padding, photo background, or
// corners outside text zones). Desktop only; hidden on mobile.
interface AccentCircleProps {
  size: number;
  top: number | string;
  left?: number | string;
  right?: number | string;
  zIndex?: number;
}

function AccentCircle({ size, top, left, right, zIndex = 4 }: AccentCircleProps) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        width: size,
        height: size,
        top,
        left,
        right,
        zIndex,
        background: "#F24405",
        opacity: 0.75,
        borderRadius: "50%",
        pointerEvents: "none",
      }}
    />
  );
}

function DesktopLayout() {
  const CANVAS_HEIGHT = 2100;

  return (
    <div className="hidden md:block relative w-full max-w-[1440px] mx-auto px-60 lg:px-80 pt-120 pb-80">
      <div className="relative mx-auto" style={{ height: CANVAS_HEIGHT, maxWidth: 1200 }}>
        {/* Top zone — dark card (left) */}
        <div
          className={`absolute p-30 ${DARK_CARD_CLASSES}`}
          style={{ top: 40, left: 0, width: 460, zIndex: 3 }}
        >
          <NameTitleBlock />
          <OpeningLine className="mt-30" />
          <Paragraph2 className="mt-20" />
        </div>

        {/* Top zone — hiking photo (upper right) */}
        <div
          className="absolute"
          style={{ top: 80, right: 0, width: 520, zIndex: 2 }}
        >
          <Image
            src="/about/hiking.png"
            alt="Ernest standing on a rocky overlook"
            width={1600}
            height={1200}
            className="w-full h-auto block rounded-md"
            priority
          />
        </div>

        {/* Middle zone — paragraph 3 card (center-left) */}
        <div
          className={`absolute p-30 ${DARK_CARD_CLASSES}`}
          style={{ top: 690, left: 240, width: 500, zIndex: 3 }}
        >
          <Paragraph3 />
        </div>

        {/* Middle zone — guitar photo (right) */}
        <div
          className="absolute"
          style={{ top: 900, right: 40, width: 340, zIndex: 2 }}
        >
          <Image
            src="/about/guitar.png"
            alt="Ernest playing an acoustic guitar"
            width={1200}
            height={900}
            className="w-full h-auto block rounded-md"
          />
        </div>

        {/* Bottom zone — dogs photo (left) */}
        <div
          className="absolute"
          style={{ top: 1280, left: 0, width: 640, zIndex: 2 }}
        >
          <Image
            src="/about/dogs.png"
            alt="Two dogs running"
            width={1400}
            height={700}
            className="w-full h-auto block rounded-md"
          />
        </div>

        {/* Bottom zone — paragraphs 4–6 + inline CTA card (right) */}
        <div
          className={`absolute p-30 ${DARK_CARD_CLASSES}`}
          style={{ top: 1380, right: 0, width: 460, zIndex: 3 }}
        >
          <BottomCardBody />
          {/* Anchored to this card (not the canvas), so it stays in the
              same relative position as the layout reflows. Sits above the
              card's top edge with only a sliver into the top padding —
              never reaches the text column. */}
          <AccentCircle size={140} top={-120} right={40} />
        </div>

        {/* Foreground accent circle — pinned to the canvas so the
            overlap ratio with content stays constant as the layout
            reflows. */}
        {/* A: overlaps the left edge (landscape/sky) of the hiking photo */}
        <AccentCircle size={180} top={260} left={610} />
      </div>
    </div>
  );
}

function MobileLayout() {
  return (
    <div className="block md:hidden max-w-[1440px] mx-auto px-20 pt-100 pb-60">
      <div className="flex flex-col gap-30">
        <section className={`p-20 ${DARK_CARD_CLASSES}`}>
          <NameTitleBlock />
          <OpeningLine className="mt-20" />
          <Paragraph2 className="mt-20" />
        </section>

        <Image
          src="/about/hiking.png"
          alt="Ernest standing on a rocky overlook"
          width={1600}
          height={1200}
          className="w-full h-auto block rounded-md"
        />

        <section className={`p-20 ${DARK_CARD_CLASSES}`}>
          <Paragraph3 />
        </section>

        <Image
          src="/about/guitar.png"
          alt="Ernest playing an acoustic guitar"
          width={1200}
          height={900}
          className="w-full h-auto block rounded-md"
        />

        <Image
          src="/about/dogs.png"
          alt="Two dogs running"
          width={1400}
          height={700}
          className="w-full h-auto block rounded-md"
        />

        <section className={`p-20 ${DARK_CARD_CLASSES}`}>
          <BottomCardBody />
        </section>
      </div>
    </div>
  );
}

function BottomCta() {
  return (
    <section className="relative z-10 w-full max-w-[1440px] mx-auto px-20 md:px-60 lg:px-80 pb-120 pt-40 md:pt-80">
      <div className="relative">
        {/* Desktop-only corner accent peeking onto the CTA card's top-right
            padding zone — never reaches text/button. */}
        <div className="hidden md:block">
          <AccentCircle size={140} top={-40} right={40} />
        </div>

        <div
          className={`relative p-40 ${DARK_CARD_CLASSES} flex flex-col items-start gap-20`}
          style={{ zIndex: 3 }}
        >
          <h2 className="font-sans text-[22px] md:text-[28px] lg:text-[32px] font-semibold leading-snug">
            Let&apos;s connect.
          </h2>
          <p className="font-sans text-[16px] md:text-[18px] leading-[1.7] max-w-[560px]">
            If anything here sparks a conversation — a role, a project, or just
            a hello — I&apos;d love to hear from you.
          </p>
          <a
            href={EMAIL_HREF}
            className="inline-flex items-center rounded-sm bg-accent hover:bg-accent-hover px-20 py-10 text-[16px] md:text-[18px] font-semibold text-black transition-colors"
          >
            Send me an email
          </a>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="relative" style={BACKGROUND_STYLE}>
      <DesktopLayout />
      <MobileLayout />
      <BottomCta />
    </div>
  );
}
