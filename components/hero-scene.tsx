/**
 * The hero's dawn: a sun low in a warm sky, and a launch arcing up out of it.
 *
 * Deliberately restrained. The rocket is a silhouette — a narrow lozenge with
 * swept fins, no porthole or cartoon flame — riding a dashed trajectory that
 * borrows the curve from the 36-hour timeline further down the page, so the
 * two read as the same drawing language. Everything is plum or marigold over
 * the page's own warm gradient; the scene contributes no colour of its own.
 *
 * All decorative, so it is hidden from assistive tech, and the global
 * reduced-motion rule stops every animation in it.
 */

const INK = "#3a222a";
const PLUM = "#5c3a45";
const MARIGOLD = "#e8a33c";

export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 700 760"
      aria-hidden="true"
      focusable="false"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="dawn-bloom">
          <stop offset="0%" stopColor="#fff6e4" stopOpacity="0.95" />
          <stop offset="34%" stopColor="#ffdca4" stopOpacity="0.6" />
          <stop offset="100%" stopColor={MARIGOLD} stopOpacity="0" />
        </radialGradient>

        <radialGradient id="dawn-core">
          <stop offset="0%" stopColor="#fffdf7" stopOpacity="1" />
          <stop offset="70%" stopColor="#ffeac2" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#ffdca4" stopOpacity="0.4" />
        </radialGradient>

        {/* Low banks of haze, the only thing standing in for landscape. */}
        <linearGradient id="bank" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="exhaust" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={MARIGOLD} stopOpacity="0.45" />
          <stop offset="100%" stopColor={MARIGOLD} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ---------------------------------------------------------- sun */}
      <circle cx="404" cy="330" r="250" fill="url(#dawn-bloom)" />
      <g className="hero-breathe" style={{ transformOrigin: "404px 330px" }}>
        <circle cx="404" cy="330" r="62" fill="url(#dawn-core)" />
      </g>

      {/* Haze banks, thinning as they rise. */}
      <ellipse cx="380" cy="560" rx="360" ry="46" fill="url(#bank)" />
      <ellipse cx="470" cy="482" rx="230" ry="26" fill="url(#bank)" opacity="0.7" />

      {/* --------------------------------------------------- trajectory */}
      {/* The same dashed curve the timeline uses, so the hero and the arc
          further down the page are visibly the same drawing. */}
      <path
        d="M252 548 C 296 496, 328 436, 356 372 C 392 306, 430 250, 474 202"
        fill="none"
        stroke={PLUM}
        strokeOpacity="0.28"
        strokeWidth="1.6"
        strokeDasharray="5 9"
        strokeLinecap="round"
      />

      {/* Markers along it, the way the timeline marks its hours. */}
      {[
        { x: 272, y: 522 },
        { x: 316, y: 456 },
        { x: 356, y: 372 },
        { x: 424, y: 258 },
      ].map((p, i) => (
        <circle
          key={`${p.x}-${p.y}`}
          cx={p.x}
          cy={p.y}
          r={3.4}
          fill={PLUM}
          opacity={0.18 + i * 0.08}
        />
      ))}

      {/* ------------------------------------------------------- launch */}
      <g className="hero-lift">
        {/* Exhaust: a short taper, not a plume. */}
        <path
          d="M476 222 C 486 244, 494 268, 498 292 C 486 270, 474 250, 466 234 Z"
          fill="url(#exhaust)"
          opacity="0.75"
        />
        <Rocket />
      </g>
    </svg>
  );
}

/** Narrow body, swept fins, a thin flame. Drawn nose-up, then tilted. */
function Rocket() {
  return (
    <g transform="translate(470 198) rotate(34)">
      <g className="hero-flame" style={{ transformOrigin: "0px 14px" }}>
        <path d="M-3.4 13 C -1.6 25, 0 31, 0 40 C 0 31, 1.6 25, 3.4 13 Z" fill={MARIGOLD} />
      </g>

      <path d="M-8 1 L -17 19 L -8 13 Z" fill={PLUM} />
      <path d="M8 1 L 17 19 L 8 13 Z" fill={PLUM} />

      <path
        d="M0 -50 C 6.5 -33, 9.5 -12, 9 11 C 9 14, 5 16, 0 16 C -5 16, -9 14, -9 11 C -9.5 -12, -6.5 -33, 0 -50 Z"
        fill={INK}
      />
      {/* One lit edge, since the sun sits below and to the left. */}
      <path
        d="M0 -50 C -6.5 -33, -9.5 -12, -9 11 C -9 14, -5 16, 0 16 L 0 -50 Z"
        fill={PLUM}
        opacity="0.55"
      />
      <circle cx="0" cy="-14" r="2.6" fill="#faf6ee" opacity="0.8" />
    </g>
  );
}
