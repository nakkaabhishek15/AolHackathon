"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { NOTIFY_MAILTO, siteConfig } from "@/lib/site-config";
import { AnnouncementPlate } from "./announcement-plate";
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
      <div className="relative border-t border-white/10 bg-white/[0.03] py-3.5 text-white/50 backdrop-blur-sm">
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
 * Light, not illustration. A faint grid plus two slow warm washes, so the
 * hero has depth without a graphic competing with the headline.
 */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="grid-lines absolute inset-0 [mask-image:linear-gradient(180deg,black,transparent_78%)]" />

      <div className="drift-a absolute top-[-22%] right-[-8%] size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(79,83,255,0.42),transparent_66%)] blur-3xl" />
      <div className="drift-b absolute bottom-[-28%] left-[-12%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(253,112,98,0.26),transparent_66%)] blur-3xl" />
      <div className="drift-a absolute top-[34%] right-[26%] size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(145,179,250,0.20),transparent_68%)] blur-3xl" />

      {/* Floor gradient, so the ribbon reads as ground. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(9,12,32,0.62))]" />
    </div>
  );
}
