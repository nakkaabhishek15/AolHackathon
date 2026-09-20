/**
 * The hero's dawn scene: a sun clear of the horizon, still water, and two
 * swans holding the middle distance.
 *
 * Drawn rather than photographed, for three reasons: every colour is a palette
 * token so nothing fights the plum ground, it weighs a couple of kilobytes
 * instead of a couple of hundred, and it can move — the swans glide, the water
 * shimmers, the sun breathes. All of it is decorative, so the whole scene is
 * hidden from assistive tech and stops moving under `prefers-reduced-motion`.
 */

const CREAM = "#faf6ee";
const LOTUS = "#d99ba0";
const MARIGOLD = "#e8a33c";

/** Waterline, in the SVG's own user units. */
const WATER = 244;

export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 420"
      aria-hidden="true"
      focusable="false"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* The sun's halo, and the softer bloom it throws across the sky. */}
        <radialGradient id="sun-core">
          <stop offset="0%" stopColor={MARIGOLD} stopOpacity="0.95" />
          <stop offset="55%" stopColor={MARIGOLD} stopOpacity="0.55" />
          <stop offset="100%" stopColor={MARIGOLD} stopOpacity="0" />
        </radialGradient>

        <radialGradient id="sun-bloom">
          <stop offset="0%" stopColor={MARIGOLD} stopOpacity="0.38" />
          <stop offset="45%" stopColor={LOTUS} stopOpacity="0.18" />
          <stop offset="100%" stopColor={LOTUS} stopOpacity="0" />
        </radialGradient>

        {/* Water darkens with depth, so the horizon stays the lightest line. */}
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={LOTUS} stopOpacity="0.34" />
          <stop offset="35%" stopColor={LOTUS} stopOpacity="0.16" />
          <stop offset="100%" stopColor="#2e1b21" stopOpacity="0.28" />
        </linearGradient>

        {/* The sun's path on the water, narrow at the horizon and spreading. */}
        <linearGradient id="glitter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={MARIGOLD} stopOpacity="0.5" />
          <stop offset="100%" stopColor={MARIGOLD} stopOpacity="0" />
        </linearGradient>

        <linearGradient id="reflection-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <mask id="reflection-mask">
          <rect x="0" y={WATER} width="600" height={420 - WATER} fill="url(#reflection-fade)" />
        </mask>

        <filter id="soften" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* ---------------------------------------------------------- sky */}
      <circle cx="430" cy="150" r="190" fill="url(#sun-bloom)" />
      <g className="hero-breathe" style={{ transformOrigin: "430px 150px" }}>
        <circle cx="430" cy="150" r="96" fill="url(#sun-core)" />
        <circle cx="430" cy="150" r="34" fill={MARIGOLD} opacity="0.75" />
      </g>

      {/* A far shoreline, just enough to sit the water against something. */}
      <path
        d={`M0 ${WATER} C 120 ${WATER - 9}, 210 ${WATER - 3}, 330 ${WATER - 7} C 440 ${WATER - 11}, 520 ${WATER - 4}, 600 ${WATER - 8}`}
        fill="none"
        stroke={LOTUS}
        strokeOpacity="0.45"
        strokeWidth="1.2"
      />

      {/* -------------------------------------------------------- water */}
      <rect x="0" y={WATER} width="600" height={420 - WATER} fill="url(#water)" />

      {/* The sun's column, broken into bands that shimmer out of step. */}
      <g>
        <path d={`M406 ${WATER} L454 ${WATER} L486 420 L374 420 Z`} fill="url(#glitter)" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <ellipse
            key={i}
            cx={430 + (i % 2 === 0 ? -6 : 7)}
            cy={WATER + 14 + i * 26}
            rx={20 + i * 7}
            ry="2.2"
            fill={MARIGOLD}
            opacity="0.34"
            className="hero-shimmer"
            style={{ animationDelay: `${i * 0.45}s` }}
          />
        ))}
      </g>

      {/* Still-water lines, to read as a surface rather than a fill. */}
      {[18, 46, 82, 126, 172].map((offset, i) => (
        <line
          key={offset}
          x1={40 + i * 18}
          y1={WATER + offset}
          x2={560 - i * 12}
          y2={WATER + offset}
          stroke={CREAM}
          strokeOpacity={0.09 - i * 0.012}
          strokeWidth="1"
        />
      ))}

      {/* -------------------------------------------------------- swans */}
      {/* The far swan is smaller, paler and slower, which is the whole of the
          depth cue — no perspective maths needed. */}
      <Swan x={318} y={WATER - 4} scale={0.58} opacity={0.72} duration={54} delay={-8} />
      <Swan x={432} y={WATER + 34} scale={0.92} opacity={0.95} duration={42} delay={0} />

      {/* Reeds, to break the left edge where the scene meets the scrim. */}
      <g stroke={LOTUS} strokeOpacity="0.3" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d={`M44 420 C 40 ${WATER + 96}, 48 ${WATER + 70}, 42 ${WATER + 44}`} />
        <path d={`M58 420 C 56 ${WATER + 104}, 64 ${WATER + 82}, 60 ${WATER + 58}`} />
        <path d={`M30 420 C 28 ${WATER + 112}, 34 ${WATER + 92}, 30 ${WATER + 74}`} />
      </g>
    </svg>
  );
}

/**
 * One swan: body, S-neck, head and beak, with a mirrored reflection that the
 * mask fades out as it sinks. Gliding and bobbing are separate transforms on
 * separate groups so neither overwrites the other.
 */
function Swan({
  x,
  y,
  scale,
  opacity,
  duration,
  delay,
}: {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  duration: number;
  delay: number;
}) {
  return (
    <g
      className="hero-glide"
      style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
        {/* reflection */}
        <g mask="url(#reflection-mask)" opacity="0.4" filter="url(#soften)">
          <g transform="scale(1 -1) translate(0 -6)">
            <SwanBody />
          </g>
        </g>

        {/* ripples where the body meets the water */}
        <ellipse
          cx="-2"
          cy="4"
          rx="34"
          ry="3.4"
          fill="none"
          stroke={CREAM}
          strokeOpacity="0.22"
          strokeWidth="1"
          className="hero-ripple"
        />
        <ellipse
          cx="-2"
          cy="5"
          rx="48"
          ry="4.6"
          fill="none"
          stroke={CREAM}
          strokeOpacity="0.14"
          strokeWidth="1"
          className="hero-ripple"
          style={{ animationDelay: "1.2s" }}
        />

        <g className="hero-bob" style={{ animationDelay: `${delay / 2}s` }}>
          <SwanBody />
        </g>
      </g>
    </g>
  );
}

function SwanBody() {
  return (
    <g>
      {/* body, tail lifted at the back */}
      <path
        d="M-34 -2 C -36 -12, -24 -17, -10 -16 C 6 -15, 18 -9, 21 -2 C 23 3, 14 8, -2 8 C -18 8, -32 6, -34 -2 Z"
        fill={CREAM}
      />
      <path d="M-30 -6 C -38 -13, -44 -18, -48 -22 C -40 -21, -33 -16, -28 -11 Z" fill={CREAM} />

      {/* neck: one continuous S, thinning toward the head */}
      <path
        d="M14 -8 C 26 -16, 28 -32, 18 -42"
        fill="none"
        stroke={CREAM}
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      <circle cx="19" cy="-45" r="4.6" fill={CREAM} />
      <path d="M23 -46.5 L32 -44.5 L23 -42 Z" fill={MARIGOLD} />
    </g>
  );
}
