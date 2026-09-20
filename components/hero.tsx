"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { NOTIFY_MAILTO, siteConfig } from "@/lib/site-config";
import { AnnouncementPlate } from "./announcement-plate";
import { HeroScene } from "./hero-scene";
import { ArrowIcon, ButtonLink, Counter, Magnetic, Marquee, Pill } from "./primitives";

const STATS = [
  { value: 36, unit: "hrs", label: "One continuous sprint", prefix: "" },
  { value: 100, unit: "%", label: "Problems from real needs", prefix: "" },
  { value: 0, unit: "", label: "Cost to apply or attend", prefix: "$" },
] as const;

const HEADLINE = ["Thirty-six hours", "between one", "sunrise and"] as const;

const RIBBON = [
  "36 hours",
  "Free to join",
  "Real problems",
  "Every skill welcome",
  "Mentors on the floor",
  "Exciting prizes",
  "Two sunrises",
] as const;

/** Typed helper for the `--delay` custom property used by the CSS entrances. */
const delay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The copy drifts and fades as the hero leaves the viewport.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 76]);
  const copyFade = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate overflow-hidden bg-night pt-[7.5rem] pb-0 text-white lg:pt-[10rem]"
    >
      <HeroBackdrop />

      <motion.div
        style={reduced ? undefined : { y: copyY, opacity: copyFade }}
        className="container-page pb-16 sm:pb-20"
      >
        <div className="max-w-3xl">
          <div className="flex fade-up flex-wrap gap-2">
            <HeroPill dot>Applications opening soon</HeroPill>
            <HeroPill>Every skill welcome</HeroPill>
          </div>

          <h1 className="mt-8 text-[clamp(2.05rem,8.6vw,6.1rem)] leading-[0.99] font-bold tracking-[-0.042em] text-white">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className="block rise-line" style={delay(0.08 + i * 0.09)}>
                  {line}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="block rise-line" style={delay(0.35)}>
                <span className="text-emphasis-invert">the next.</span>
              </span>
            </span>
          </h1>

          <p
            className="mt-8 max-w-xl fade-up text-[1.0625rem] leading-relaxed font-medium text-white/65 sm:text-lg"
            style={delay(0.42)}
          >
            The {siteConfig.org}&rsquo;s first hackathon. One continuous build against problems our
            own community is living with right now, with mentors on the floor and everything you
            need for the full thirty-six hours.
          </p>

          <div className="mt-9 flex fade-up flex-col gap-5" style={delay(0.52)}>
            <AnnouncementPlate />
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <ButtonLink href={NOTIFY_MAILTO} variant="invert">
                  Notify me when applications open
                  <ArrowIcon />
                </ButtonLink>
              </Magnetic>
              <ButtonLink href="#process" variant="outlineInvert">
                See how it works
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------- stats */}
        <dl className="mt-16 grid gap-x-10 gap-y-8 sm:mt-20 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="fade-up border-t border-white/15 pt-5"
              style={delay(0.62 + i * 0.07)}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="flex items-baseline text-[clamp(2.1rem,9vw,2.6rem)] leading-none font-bold tracking-[-0.04em] text-white">
                  {stat.prefix ? <span className="text-glow">{stat.prefix}</span> : null}
                  <Counter value={stat.value} />
                  {stat.unit ? (
                    <span className="ml-1 text-[1.35rem] text-glow">{stat.unit}</span>
                  ) : null}
                </span>
                <span className="mt-2.5 block text-[0.8125rem] leading-snug font-medium text-white/55">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>

      {/* ------------------------------------------------------- ribbon */}
      {/* A solid lotus band rather than another pane of white glass: it closes
          the dark hero and hands off to the cream page below. */}
      <div className="relative bg-lotus py-3.5 text-ink">
        <Marquee items={RIBBON} duration={46} />
      </div>
    </section>
  );
}

function HeroPill({ children, dot }: { children: React.ReactNode; dot?: boolean }) {
  return (
    <Pill
      dot={dot}
      className="border-white/18 bg-white/8 text-white/85 backdrop-blur-md hover:bg-white/12"
    >
      {children}
    </Pill>
  );
}

/* ------------------------------------------------------------------ backdrop */

/**
 * A sunrise rather than a flat field. The plum ground is lit from the lower
 * right by a sun disc and a real photograph of dawn, both dissolved into the
 * palette so no foreign colour survives. Everything left of centre stays
 * under a scrim, because that is where the type lives.
 */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Ground: dawn breaking from the lower right. */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_105%_at_74%_106%,#7a3f4c_0%,#4a2b35_44%,#2e1b21_100%)]" />

      {/* Type scrim first, scene second: the scrim protects the headline on
          the left, and the mask already keeps the scene clear of it, so the
          water is free to stay bright instead of being dimmed to mud. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(46,27,33,0.88)_0%,rgba(46,27,33,0.62)_46%,rgba(46,27,33,0.78)_100%)] lg:bg-[linear-gradient(90deg,rgba(46,27,33,0.96)_0%,rgba(46,27,33,0.9)_38%,rgba(46,27,33,0.4)_62%,rgba(46,27,33,0.12)_100%)]" />

      {/* The scene holds the right of the frame on desktop and sinks to a
          lower band on a phone, where the copy needs the room. It fades out
          before the bottom so the stats never sit on lit water. */}
      <div className="absolute inset-x-0 bottom-0 h-[54%] [mask-image:linear-gradient(180deg,transparent,black_42%,black_72%,transparent)] opacity-60 sm:opacity-75 lg:inset-y-0 lg:left-auto lg:h-full lg:w-[54%] lg:[mask-image:linear-gradient(90deg,transparent,black_34%),linear-gradient(180deg,black_74%,transparent)] lg:[mask-image:linear-gradient(90deg,transparent,black_34%)] lg:[mask-composite:intersect]">
        <HeroScene className="h-full w-full" />
      </div>

      <div className="absolute inset-0 grid-lines [mask-image:linear-gradient(180deg,black,transparent_62%)] opacity-70" />

      <div className="absolute top-[-22%] right-[-8%] size-[46rem] drift-a rounded-full bg-[radial-gradient(circle,rgba(217,155,160,0.28),transparent_66%)] blur-3xl" />
      <div className="absolute bottom-[-28%] left-[-12%] size-[36rem] drift-b rounded-full bg-[radial-gradient(circle,rgba(232,163,60,0.20),transparent_66%)] blur-3xl" />

      {/* Floor gradient, so the ribbon reads as ground. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(31,17,21,0.72))]" />
    </div>
  );
}
