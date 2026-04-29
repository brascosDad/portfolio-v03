import { COLORS, FONTS, NATIVE_WIDTH, NATIVE_HEIGHT } from "./tokens";

// Lightweight SSR-safe placeholder. Matches the reel's native 1440×900 aspect so there
// is no layout shift when the heavy interior mounts.
export function ReelPoster() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: `${NATIVE_WIDTH} / ${NATIVE_HEIGHT}`,
        background: COLORS.bg,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <p
          style={{
            fontFamily: FONTS.display,
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(26, 28, 28, 0.4)",
          }}
        >
          Yonas Media &nbsp;/&nbsp; A Booking Story
        </p>
        <span
          aria-hidden
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: COLORS.secondaryContainer,
            animation: "yonasPosterPulse 1.8s ease-in-out infinite",
          }}
        />
      </div>
      <style>{`
        @keyframes yonasPosterPulse {
          0%, 100% { opacity: 0.45; transform: scale(0.9); }
          50%      { opacity: 1;    transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
