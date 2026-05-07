"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

const heroTextStyle = {
  lineHeight: 0.72,
  color: "#737373",
  opacity: 0.6,
  letterSpacing: "-0.02em",
  textBoxTrim: "both" as const,
  textBoxEdge: "cap alphabetic" as const,
}as unknown as React.CSSProperties;

const infoTextStyle = {
  lineHeight: 0.72,
  textBoxTrim: "both" as const,
  textBoxEdge: "cap alphabetic" as const,
}as unknown as React.CSSProperties;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Image parallax — all move up faster than content
  const cafeY = useTransform(scrollYProgress, [0, 1], [0, -160]);    // 30% faster
  const boatY = useTransform(scrollYProgress, [0, 1], [0, -80]);     // 15% faster
  const guitarY = useTransform(scrollYProgress, [0, 1], [0, -250]);  // 50% faster

  // Hero words — alternating left/right slide
  const slideLeft = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const slideRight = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const slideLeftFast = useTransform(scrollYProgress, [0, 1], [0, -240]);   // Innovator
  const slideRightFast = useTransform(scrollYProgress, [0, 1], [0, 240]);   // Designer

  return (
    <section
      ref={sectionRef}
      className="w-full bg-bg-primary pt-100 md:pt-[160px] lg:pt-[240px] pb-[140px] md:pb-80 lg:pb-[100px]"
    >
      <div className="relative overflow-visible h-[310px] md:h-[220px] lg:h-[270px] max-w-[1440px] mx-auto">

        {/* === Photos === */}
        {/* Cafe - ErnInProof (moves faster — up) */}
        <motion.div
          className="absolute left-[6%] md:left-[30px] lg:left-[60px] top-[5px] md:top-[5px] w-[110px] h-[110px] md:w-[168px] md:h-[168px] lg:w-[210px] lg:h-[210px] -rotate-3"
          style={{ y: cafeY }}
        >
          <Image src="/photos/ErnInProof.png" alt="Ernest woodworking" fill className="object-contain" sizes="(max-width: 768px) 110px, (max-width: 1024px) 168px, 210px" />
        </motion.div>
        {/* Fishing - RowingErn (moves slower — lags) */}
        <motion.div
          className="absolute left-[87%] md:left-[57%] top-[153px] md:top-[55px] lg:top-[85px] w-[143px] h-[143px] md:w-[150px] md:h-[150px] lg:w-[188px] lg:h-[188px] -translate-x-1/2 -rotate-[4deg] z-10"
          style={{ y: boatY }}
        >
          <Image src="/photos/RowingErn.png" alt="Ernest rowing" fill className="object-contain" sizes="(max-width: 768px) 143px, (max-width: 1024px) 150px, 188px" />
        </motion.div>
        {/* Guitar - SingingErn (moves slower — lags more, overflows) */}
        <motion.div
          className="absolute left-[10px] md:left-auto md:right-[30px] lg:right-[60px] top-[300px] md:top-[145px] lg:top-[185px] w-[176px] h-[176px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] rotate-2 z-20"
          style={{ y: guitarY }}
        >
          <Image src="/photos/SingingErn.png" alt="Ernest at a concert" fill className="object-contain" sizes="(max-width: 768px) 176px, (max-width: 1024px) 120px, 150px" />
        </motion.div>

        {/* === Hero words === */}
        {/* Innovator — slides left */}
        <motion.span
          className="absolute font-heading font-black select-none text-[66px] md:text-[96px] lg:text-[120px] left-[22%] md:left-[160px] lg:left-[200px] top-[80px] md:top-[33px]"
          style={{ ...heroTextStyle, x: slideLeftFast }}
        >
          Innovator
        </motion.span>

        {/* Researcher — slides right */}
        <motion.span
          className="absolute font-heading font-black select-none text-[66px] md:text-[96px] lg:text-[120px] right-[20%] md:right-[30px] lg:right-[60px] top-[116px] md:top-[33px]"
          style={{ ...heroTextStyle, x: slideRight }}
        >
          Researcher
        </motion.span>

        {/* Strategist — slides left */}
        <motion.span
          className="absolute font-heading font-black select-none text-[66px] md:text-[96px] lg:text-[120px] right-[25%] md:right-auto md:left-[170px] lg:left-[210px] top-[152px] md:top-[88px] lg:top-[105px]"
          style={{ ...heroTextStyle, x: slideLeft }}
        >
          Strategist
        </motion.span>

        {/* Designer — slides right */}
        <motion.span
          className="absolute font-heading font-black select-none text-[66px] md:text-[96px] lg:text-[120px] right-[35%] md:right-[30px] lg:right-[60px] top-[188px] md:top-[88px] lg:top-[105px]"
          style={{ ...heroTextStyle, x: slideRightFast }}
        >
          Designer
        </motion.span>

        {/* Builder — slides left */}
        <motion.span
          className="absolute font-heading font-black select-none text-[66px] md:text-[96px] lg:text-[120px] left-[29%] md:left-[30px] lg:left-[60px] top-[224px] md:top-[143px] lg:top-[177px]"
          style={{ ...heroTextStyle, x: slideLeft }}
        >
          Builder
        </motion.span>

        {/* Collaborator — slides right */}
        <motion.span
          className="absolute font-heading font-black select-none text-[66px] md:text-[96px] lg:text-[120px] left-[100px] md:left-auto md:right-[20px] lg:right-[210px] top-[260px] md:top-[143px] lg:top-[177px]"
          style={{ ...heroTextStyle, x: slideRight }}
        >
          Collaborator
        </motion.span>

        {/* === Info bar — desktop/tablet === */}
        {/* DECISION: left offset is tied to the cafe photo's right edge (198px on md, 270px on lg)
           plus ~20px breathing, instead of a uniform "1/6 of viewport" — percentage values don't
           clear the photo at every breakpoint because the photo is fixed-size per breakpoint.
           Top-aligned with "Innovator" / "Researcher" at top-[33px]; z-30 keeps the row above the
           big words and the photos so they animate underneath. */}
        <div className="hidden md:flex absolute z-30 items-start justify-between top-[33px] left-[220px] lg:left-[290px] right-[36px] lg:right-[66px]">
          <span className="font-sans text-[16px] lg:text-[18px] font-semibold text-text-primary" style={infoTextStyle}>
            Ernest Son
          </span>
          <span className="font-sans text-[16px] lg:text-[18px] font-semibold text-text-primary" style={infoTextStyle}>
            Lead UX Designer
          </span>
          <span className="font-sans text-[16px] lg:text-[18px] font-semibold text-text-primary" style={infoTextStyle}>
            10 years in B2C &amp; B2B/Enterprise
          </span>
          <span className="font-sans text-[16px] lg:text-[18px] font-semibold text-text-primary" style={infoTextStyle}>
            Atlanta, GA
          </span>
        </div>

        {/* === Info bar — mobile (right-justified; bottom aligns with cap-top of "Innovator") === */}
        {/* bottom-[230px] = h-[310px] − Innovator's top-[80px], so the cap-alphabetic baseline of
           the last line meets Innovator's cap-top. gap-5 condenses the previously 28px stack. */}
        <div className="md:hidden absolute z-30 right-[10px] bottom-[230px] flex flex-col items-end gap-10 font-sans text-[14px] font-bold text-text-primary">
          <span style={infoTextStyle}>Ernest Son</span>
          <span style={infoTextStyle}>Lead UX Designer</span>
          <span className="whitespace-nowrap" style={infoTextStyle}>10 yrs · B2C &amp; B2B</span>
          <span style={infoTextStyle}>Atlanta, GA</span>
        </div>
      </div>
    </section>
  );
}
