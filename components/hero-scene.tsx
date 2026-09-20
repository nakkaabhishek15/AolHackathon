/**
 * The hero's dawn scene: a low sun over still water, and a rocket climbing
 * out of it toward the light.
 *
 * The rocket is cream against the dark half of the sky rather than a
 * silhouette — it is the one thing here that should read as built, so it
 * catches the light instead of blocking it. Its trail falls back to the
 * waterline and its reflection sits under it, which is what ties the launch
 * to the lake instead of leaving it floating.
 *
 * The viewBox is close to the aspect of the panel it fills, so the artwork
 * lands near 1:1 instead of being zoomed into a blur. All decorative, so it is
 * hidden from assistive tech and stops moving under `prefers-reduced-motion`.
 */

const CREAM = "#faf6ee";
const INK = "#2b1a20";
const LOTUS = "#d99ba0";
const MARIGOLD = "#e8a33c";

/** Waterline, in the SVG's own user units. */
const WATER = 400;

export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 700 900"
      aria-hidden="true"
      focusable="false"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="sun-bloom">
          <stop offset="0%" stopColor={MARIGOLD} stopOpacity="0.72" />
          <stop offset="30%" stopColor={MARIGOLD} stopOpacity="0.34" />
          <stop offset="62%" stopColor={LOTUS} stopOpacity="0.16" />
          <stop offset="100%" stopColor={LOTUS} stopOpacity="0" />
        </radialGradient>

        <radialGradient id="sun-core">
          <stop offset="0%" stopColor="#ffe6bd" stopOpacity="0.95" />
          <stop offset="60%" stopColor={MARIGOLD} stopOpacity="0.9" />
          <stop offset="100%" stopColor={MARIGOLD} stopOpacity="0.45" />
        </radialGradient>

        {/* Haze sitting on the horizon, which is what sells distance. */}
        <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={MARIGOLD} stopOpacity="0" />
          <stop offset="70%" stopColor={MARIGOLD} stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffe6bd" stopOpacity="0.42" />
        </linearGradient>

        {/* Water: brightest at the horizon, sinking to plum at the bottom. */}
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.5" />
          <stop offset="18%" stopColor={LOTUS} stopOpacity="0.3" />
          <stop offset="60%" stopColor="#5c3a45" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2e1b21" stopOpacity="0.55" />
        </linearGradient>

        {/* The sun's road on the water. Radial, so it has no edge to give
            itself away as a shape — a hard-sided trapezoid reads as carpet. */}
        <radialGradient id="road">
          <stop offset="0%" stopColor="#ffe0ae" stopOpacity="0.6" />
          <stop offset="38%" stopColor={MARIGOLD} stopOpacity="0.3" />
          <stop offset="100%" stopColor={MARIGOLD} stopOpacity="0" />
        </radialGradient>

        {/* The lit line where water meets sky. */}
        <radialGradient id="horizon-glow">
          <stop offset="0%" stopColor="#fff0d2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffe0ae" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="reflection-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <mask id="reflection-mask">
          <rect x="0" y={WATER} width="700" height={900 - WATER} fill="url(#reflection-fade)" />
        </mask>

        <filter id="soften" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* ---------------------------------------------------------- sky */}
      <circle cx="430" cy="266" r="320" fill="url(#sun-bloom)" />
      <g className="hero-breathe" style={{ transformOrigin: "430px 266px" }}>
        <circle cx="430" cy="266" r="72" fill="url(#sun-core)" />
      </g>
      <rect x="0" y={WATER - 120} width="700" height="120" fill="url(#haze)" />

      {/* -------------------------------------------------------- water */}
      <rect x="0" y={WATER} width="700" height={900 - WATER} fill="url(#water)" />
      <ellipse cx="430" cy={WATER} rx="330" ry="26" fill="url(#horizon-glow)" />
      <ellipse cx="430" cy={WATER + 30} rx="205" ry="290" fill="url(#road)" />

      {/* Glitter on the road, each band out of step with the last. */}
      <g filter="url(#soften)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <ellipse
            key={i}
            cx={430 + (i % 2 === 0 ? -10 : 12)}
            cy={WATER + 30 + i * 52}
            rx={30 + i * 11}
            ry="3"
            fill="#ffe0ae"
            opacity={0.34 - i * 0.04}
            className="hero-shimmer"
            style={{ animationDelay: `${i * 0.38}s` }}
          />
        ))}
      </g>

      {/* ------------------------------------------------------- launch */}
      <Launch />
    </svg>
  );
}

/**
 * The launch: trail first so the rocket sits on top of it, then the rocket
 * itself, then its reflection in the water below.
 */
function Launch() {
  return (
    <g>
      {/* Exhaust, widening and dispersing as it falls back to the water. */}
      <g filter="url(#soften)">
        <path
          d={`M316 330 C 322 ${WATER - 40}, 300 ${WATER - 10}, 284 ${WATER + 4} C 318 ${WATER}, 344 ${WATER - 30}, 340 330 Z`}
          fill={CREAM}
          opacity="0.16"
        />
        <path
          d={`M322 330 C 326 ${WATER - 60}, 314 ${WATER - 24}, 306 ${WATER - 6} C 326 ${WATER - 12}, 338 ${WATER - 44}, 336 330 Z`}
          fill={CREAM}
          opacity="0.2"
        />
      </g>

      {/* Puffs along the trail, each pulsing out of step with the next. */}
      {[
        { x: 300, y: 372, r: 13, d: 0 },
        { x: 342, y: 350, r: 9, d: 0.7 },
        { x: 296, y: 336, r: 7, d: 1.5 },
        { x: 346, y: 392, r: 11, d: 2.1 },
      ].map((p) => (
        <circle
          key={`${p.x}-${p.y}`}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill={CREAM}
          opacity="0.15"
          className="hero-shimmer"
          style={{ animationDelay: `${p.d}s` }}
        />
      ))}

      {/* Where the exhaust meets the lake, and the same again inverted. */}
      <ellipse cx="300" cy={WATER + 2} rx="66" ry="9" fill={CREAM} opacity="0.14" />
      <g mask="url(#reflection-mask)" opacity="0.34" filter="url(#soften)">
        <g transform={`translate(0 ${WATER * 2}) scale(1 -1)`}>
          <Rocket />
        </g>
      </g>

      <g className="hero-lift">
        <Rocket />
      </g>
    </g>
  );
}

/** Body, window, fins and flame, drawn nose-up and then tilted into a climb. */
function Rocket() {
  return (
    <g transform="translate(322 300) rotate(16)">
      {/* flame, behind the body so the nozzle overlaps it */}
      <g className="hero-flame" style={{ transformOrigin: "0px 34px" }}>
        <path d="M-9 32 C -5 48, 0 58, 0 72 C 0 58, 5 48, 9 32 Z" fill={MARIGOLD} opacity="0.85" />
        <path d="M-4.5 33 C -2 44, 0 50, 0 60 C 0 50, 2 44, 4.5 33 Z" fill="#fff0d2" />
      </g>

      {/* fins */}
      <path d="M-11 12 C -22 20, -26 30, -25 40 L -11 30 Z" fill={LOTUS} />
      <path d="M11 12 C 22 20, 26 30, 25 40 L 11 30 Z" fill={LOTUS} />

      {/* body */}
      <path
        d="M0 -50 C 10 -32, 15 -8, 13 20 C 12 28, 8 34, 0 34 C -8 34, -12 28, -13 20 C -15 -8, -10 -32, 0 -50 Z"
        fill={CREAM}
      />
      {/* the lit edge, since the sun is to its right */}
      <path
        d="M0 -50 C 10 -32, 15 -8, 13 20 C 12 28, 8 34, 0 34 L 0 -50 Z"
        fill="#ffe6bd"
        opacity="0.55"
      />
      <circle cx="0" cy="-10" r="6" fill={INK} opacity="0.75" />
      <circle cx="0" cy="-10" r="3.4" fill={MARIGOLD} opacity="0.9" />
      <path d="M-13 22 L 13 22 L 11 30 L -11 30 Z" fill={INK} opacity="0.25" />
    </g>
  );
}
