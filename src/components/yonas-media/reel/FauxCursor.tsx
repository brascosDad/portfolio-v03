import { TIMING } from "./tokens";

interface FauxCursorProps {
  x: number | null;
  y: number | null;
  visible: boolean;
}

export function FauxCursor({ x, y, visible }: FauxCursorProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: x ?? 0,
        top: y ?? 0,
        width: 20,
        height: 22,
        pointerEvents: "none",
        opacity: visible && x !== null ? 1 : 0,
        transform: "translate(-4px, -4px)",
        transition: `left ${TIMING.demo.cursorMoveMs}ms ${TIMING.demo.cursorMoveEase}, top ${TIMING.demo.cursorMoveMs}ms ${TIMING.demo.cursorMoveEase}, opacity 300ms ease`,
        zIndex: 30,
      }}
    >
      <svg width="20" height="22" viewBox="0 0 20 22" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.25))" }}>
        <path
          d="M2 2 L2 18 L6.5 14 L9.5 20 L12 19 L9 13 L15 13 Z"
          fill="#1a1c1c"
          stroke="#ffffff"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
