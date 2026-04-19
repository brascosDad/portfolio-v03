"use client";

import { useEffect, useRef, useState } from "react";
import { BEAT1_EMAIL } from "./data";
import { COLORS, FONTS, TIMING } from "./tokens";

interface Beat1EmailProps {
  reducedMotion: boolean;
  onComplete: () => void;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function Beat1Email({ reducedMotion, onComplete }: Beat1EmailProps) {
  const [typed, setTyped] = useState<string[]>(() => BEAT1_EMAIL.lines.map(() => ""));
  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const [finished, setFinished] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (reducedMotion) {
        setTyped(BEAT1_EMAIL.lines.map((l) => l.text));
        setFinished(true);
        await wait(300);
        if (cancelled) return;
        onCompleteRef.current();
        return;
      }

      for (let lineIdx = 0; lineIdx < BEAT1_EMAIL.lines.length; lineIdx++) {
        if (cancelled) return;
        const line = BEAT1_EMAIL.lines[lineIdx];
        setActiveLineIdx(lineIdx);
        for (let charIdx = 0; charIdx < line.text.length; charIdx++) {
          if (cancelled) return;
          setTyped((prev) => {
            const next = prev.slice();
            next[lineIdx] = line.text.slice(0, charIdx + 1);
            return next;
          });
          await wait(TIMING.beat1.charDelay);
        }
        const pause = line.pauseAfter || TIMING.beat1.pauseShort;
        await wait(pause);
      }

      if (cancelled) return;
      setFinished(true);
      await wait(TIMING.beat1.exitFadeMs);
      if (cancelled) return;
      onCompleteRef.current();
    })();

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.gmailBg,
        fontFamily: FONTS.google,
        color: COLORS.gmailTextPrimary,
        display: "flex",
        flexDirection: "column",
        opacity: finished ? 0 : 1,
        transition: `opacity ${TIMING.beat1.exitFadeMs}ms ease`,
      }}
    >
      <GmailTopBar />
      <GmailConversation
        lines={BEAT1_EMAIL.lines.map((line, i) => ({
          text: typed[i],
          hasCursor: !finished && activeLineIdx === i,
          empty: line.text === "",
        }))}
      />
      <style>{`
        @keyframes yonasCursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function GmailTopBar() {
  return (
    <div
      style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 24px",
        background: COLORS.gmailHeaderBg,
        borderBottom: `1px solid ${COLORS.gmailBorder}`,
      }}
    >
      {/* Hamburger */}
      <div
        aria-hidden
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: 18,
          height: 14,
          justifyContent: "center",
        }}
      >
        <span style={{ display: "block", height: 2, background: COLORS.gmailToolbarIcon, borderRadius: 1 }} />
        <span style={{ display: "block", height: 2, background: COLORS.gmailToolbarIcon, borderRadius: 1 }} />
        <span style={{ display: "block", height: 2, background: COLORS.gmailToolbarIcon, borderRadius: 1 }} />
      </div>

      {/* Envelope glyph + "Gmail" wordmark (approximated, not the Google logotype) */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="28" height="22" viewBox="0 0 28 22" aria-hidden>
          <rect x="1" y="1" width="26" height="20" rx="2" fill="none" stroke={COLORS.gmailAccentRed} strokeWidth="2" />
          <path d="M1 3 L14 13 L27 3" fill="none" stroke={COLORS.gmailAccentRed} strokeWidth="2" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: 18, color: COLORS.gmailTextSecondary, fontWeight: 500 }}>Mail</span>
      </div>

      {/* Search pill */}
      <div
        style={{
          flex: 1,
          maxWidth: 720,
          height: 44,
          background: COLORS.gmailBg,
          borderRadius: 22,
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          gap: 12,
          color: COLORS.gmailTextSecondary,
          fontSize: 14,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke={COLORS.gmailTextSecondary} strokeWidth="2" />
          <path d="M20 20L16.5 16.5" stroke={COLORS.gmailTextSecondary} strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span style={{ color: COLORS.gmailTextSecondary }}>Search mail</span>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
        {/* Three dot icons as placeholders for toolbar icons */}
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "transparent",
              border: `2px solid ${COLORS.gmailToolbarIcon}`,
              opacity: 0.35,
            }}
          />
        ))}
        {/* User avatar */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#1a73e8",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          B
        </div>
      </div>
    </div>
  );
}

function GmailConversation({
  lines,
}: {
  lines: { text: string; hasCursor: boolean; empty: boolean }[];
}) {
  return (
    <div
      style={{
        flex: 1,
        overflow: "hidden",
        padding: "36px 72px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Back-to-inbox row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: COLORS.gmailTextSecondary,
          fontSize: 13,
          marginBottom: 24,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke={COLORS.gmailTextSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Back to Inbox</span>
      </div>

      {/* Subject line */}
      <h3
        style={{
          margin: 0,
          fontSize: 26,
          fontWeight: 400,
          color: COLORS.gmailTextPrimary,
          marginBottom: 24,
        }}
      >
        {BEAT1_EMAIL.subject}
      </h3>

      {/* Sender row */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: BEAT1_EMAIL.senderAvatarColor,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          {BEAT1_EMAIL.senderInitials}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: COLORS.gmailTextPrimary }}>
              {BEAT1_EMAIL.senderName}
            </span>
            <span style={{ fontSize: 13, color: COLORS.gmailTextSecondary }}>
              &lt;{BEAT1_EMAIL.senderEmail}&gt;
            </span>
          </div>
          <span style={{ fontSize: 13, color: COLORS.gmailTextSecondary }}>
            to {BEAT1_EMAIL.to.split("@")[0]}
          </span>
        </div>
        <span style={{ fontSize: 13, color: COLORS.gmailTextSecondary }}>{BEAT1_EMAIL.timestamp}</span>
      </div>

      {/* Email body */}
      <div
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: COLORS.gmailTextPrimary,
          maxWidth: 840,
        }}
      >
        {lines.map((line, i) => (
          <p key={i} style={{ margin: 0, minHeight: line.empty ? 16 : undefined, marginBottom: line.empty ? 8 : 16 }}>
            {line.text}
            {line.hasCursor && (
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1.1em",
                  verticalAlign: "-0.2em",
                  background: COLORS.gmailTextPrimary,
                  marginLeft: 2,
                  animation: `yonasCursorBlink ${TIMING.beat1.cursorBlinkMs}ms step-end infinite`,
                }}
              />
            )}
          </p>
        ))}
      </div>

      {/* Action row */}
      <div style={{ marginTop: "auto", display: "flex", gap: 12, paddingTop: 24 }}>
        {["Reply", "Forward"].map((label) => (
          <button
            key={label}
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 22px",
              border: `1px solid ${COLORS.gmailBorder}`,
              borderRadius: 999,
              background: COLORS.gmailBg,
              color: COLORS.gmailTextPrimary,
              fontSize: 14,
              cursor: "default",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              {label === "Reply" ? (
                <path d="M9 12L4 7L9 2M4 7H14C17.866 7 21 10.134 21 14V22" stroke={COLORS.gmailTextSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M15 12L20 7L15 2M20 7H10C6.134 7 3 10.134 3 14V22" stroke={COLORS.gmailTextSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
