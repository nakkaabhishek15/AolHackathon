"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type CSSProperties } from "react";
import { NOTIFY_MAILTO, siteConfig } from "@/lib/site-config";
import { AnnouncementPlate } from "./announcement-plate";
import { ArrowIcon, ButtonLink, Pill } from "./primitives";

const STATS = [
  { value: "36", unit: "hrs", label: "One continuous sprint" },
  { value: "100", unit: "%", label: "Problems from real needs" },
] as const;

const HEADLINE = ["Thirty-six hours", "between one", "sunrise and"] as const;

/** Typed helper for the `--delay` custom property used by the CSS entrances. */
const delay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The sun climbs and the copy drifts as the hero leaves the viewport.
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", "-32%"]);
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const rayRotate = useTransform(scrollYProgress, [0, 1], [0, 26]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 68]);
  const copyFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Pointer parallax — a few pixels only, so it reads as light shifting.
  const pointerX = useSpring(useMotionValue(0), { stiffness: 90, damping: 22, mass: 0.6 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 90, damping: 22, mass: 0.6 });

  const onPointerMove = (event: React.PointerEvent) => {
    if (reduced) return;
    pointerX.set((event.clientX / window.innerWidth - 0.5) * 22);
    pointerY.set((event.clientY / window.innerHeight - 0.5) * 14);
  };

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden pt-[7.5rem] pb-16 sm:pb-24 lg:pt-[9.5rem]"
    >
      <HeroBackdrop
        y={sunY}
        scale={sunScale}
        rotate={rayRotate}
        pointerX={pointerX}
        pointerY={pointerY}
      />

      <motion.div
        style={reduced ? undefined : { y: copyY, opacity: copyFade }}
        className="container-page"
      >
        <div className="max-w-3xl">
          <div className="flex fade-up flex-wrap gap-2">
            <Pill>Free to join</Pill>
            <Pill>Open to every skill, not just code</Pill>
          </div>

          <h1 className="mt-8 text-[clamp(2.9rem,7.9vw,5.9rem)] leading-[1.02] tracking-[-0.015em]">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span className="block rise-line" style={delay(0.08 + i * 0.09)}>
                  {line}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="block rise-line" style={delay(0.35)}>
                <span className="text-sun-gradient italic">the next.</span>
              </span>
            </span>
          </h1>

          <p
            className="mt-8 max-w-xl fade-up text-[1.0625rem] leading-relaxed text-ink-2 sm:text-lg"
            style={delay(0.42)}
          >
            The {siteConfig.org}&rsquo;s first hackathon. One continuous build against problems our
            own community is living with right now &mdash; and, when the last demo ends, a standing
            volunteer tech team that keeps solving them.
          </p>

          <div className="mt-9 flex fade-up flex-col gap-4" style={delay(0.52)}>
            <AnnouncementPlate />
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <ButtonLink href={NOTIFY_MAILTO} variant="primary">
                Notify me when applications open
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink href="#process" variant="outline">
                See how it works
              </ButtonLink>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container-page mt-16 sm:mt-24">
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="fade-up bg-paper/80 px-5 py-6 backdrop-blur"
              style={delay(0.6 + i * 0.06)}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display numeric text-[2.35rem] leading-none text-ink">
                  {stat.value}
                </span>
                <span className="ml-1 font-display text-xl text-gold">{stat.unit}</span>
                <span className="mt-2 block text-[0.8125rem] leading-snug text-ink-3">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function HeroBackdrop({
  y,
  scale,
  rotate,
  pointerX,
  pointerY,
}: {
  y: MotionValue<string>;
  scale: MotionValue<number>;
  rotate: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Warm wash rising from the horizon. */}
      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(120%_80%_at_78%_100%,rgba(255,201,60,0.24)_0%,rgba(240,152,14,0.12)_38%,transparent_72%)]" />

      <motion.div
        style={{ y, scale, x: pointerX }}
        className="absolute top-[8%] right-[-16%] w-[min(46rem,86vw)] opacity-70 sm:opacity-100 lg:top-[3%] lg:right-[1%] lg:w-[min(38rem,44vw)]"
      >
        <motion.div style={{ rotate, translateY: pointerY }} className="origin-bottom">
          <SunGraphic />
        </motion.div>
      </motion.div>

      {/* Horizon rule the sun sits on. */}
      <div className="absolute inset-x-0 top-[46%] hidden lg:block">
        <div className="rule-fade" />
      </div>
    </div>
  );
}

function SunGraphic() {
  const rays = 44;
  return (
    <svg viewBox="0 0 400 240" className="h-auto w-full">
      <defs>
        <linearGradient id="hero-sun" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="var(--color-ember)" />
          <stop offset="48%" stopColor="var(--color-amber)" />
          <stop offset="100%" stopColor="var(--color-sun)" />
        </linearGradient>
        <radialGradient id="hero-halo" cx="0.5" cy="1" r="0.75">
          <stop offset="0%" stopColor="var(--color-amber)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-amber)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="190" fill="url(#hero-halo)" />

      <g stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round">
        {Array.from({ length: rays }, (_, i) => {
          const angle = Math.PI * (i / (rays - 1));
          const inner = 104;
          const outer = i % 2 === 0 ? 152 : 130;
          return (
            <line
              key={i}
              x1={200 - Math.cos(angle) * inner}
              y1={200 - Math.sin(angle) * inner}
              x2={200 - Math.cos(angle) * outer}
              y2={200 - Math.sin(angle) * outer}
              strokeDasharray="60"
              style={{
                animation: "draw-ray 0.9s var(--ease-out-expo) both",
                animationDelay: `${0.5 + i * 0.014}s`,
              }}
            />
          );
        })}
      </g>

      <g
        style={{
          transformOrigin: "200px 200px",
          animation: "sun-in 1.1s var(--ease-out-expo) both",
          animationDelay: "0.2s",
        }}
      >
        <path d="M110 200a90 90 0 0 1 180 0Z" fill="url(#hero-sun)" />
        <path
          d="M110 200a90 90 0 0 1 180 0"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
