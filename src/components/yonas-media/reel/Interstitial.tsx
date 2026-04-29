"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { COLORS, FONTS } from "./tokens";

interface InterstitialProps {
  heading: string;
  bullets: readonly ReactNode[];
  intro?: string;
  reducedMotion: boolean;
  onComplete: () => void;
}

const FADE_IN_MS = 300;
const HOLD_MS = 3000;
const FADE_OUT_MS = 500;

export function Interstitial({
  heading,
  bullets,
  intro,
  reducedMotion,
  onComplete,
}: InterstitialProps) {
  const [opacity, setOpacity] = useState(reducedMotion ? 1 : 0);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let cancelled = false;
    if (reducedMotion) {
      const t = setTimeout(() => {
        if (!cancelled) onCompleteRef.current();
      }, 600);
      return () => {
        cancelled = true;
        clearTimeout(t);
      };
    }

    const fadeIn = requestAnimationFrame(() => {
      if (!cancelled) setOpacity(1);
    });
    const startFadeOut = setTimeout(() => {
      if (!cancelled) setOpacity(0);
    }, FADE_IN_MS + HOLD_MS);
    const done = setTimeout(() => {
      if (!cancelled) onCompleteRef.current();
    }, FADE_IN_MS + HOLD_MS + FADE_OUT_MS);

    return () => {
      cancelled = true;
      cancelAnimationFrame(fadeIn);
      clearTimeout(startFadeOut);
      clearTimeout(done);
    };
  }, [reducedMotion]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        padding: "0 80px",
        opacity,
        transition: `opacity ${opacity === 1 ? FADE_IN_MS : FADE_OUT_MS}ms ease`,
      }}
    >
      {intro && (
        <p
          style={{
            margin: 0,
            fontFamily: FONTS.display,
            fontSize: 22,
            fontWeight: 500,
            fontStyle: "italic",
            color: COLORS.onSurfaceVariant,
            textAlign: "center",
            maxWidth: 880,
            lineHeight: 1.4,
          }}
        >
          {intro}
        </p>
      )}
      <h3
        style={{
          margin: 0,
          fontFamily: FONTS.display,
          fontSize: 56,
          fontWeight: 600,
          color: COLORS.onSurface,
          textAlign: "center",
          letterSpacing: "-0.01em",
        }}
      >
        {heading}
      </h3>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          fontFamily: FONTS.display,
          fontSize: 24,
          fontWeight: 400,
          color: COLORS.onSurfaceVariant,
          textAlign: "center",
        }}
      >
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
