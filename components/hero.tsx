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
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-dawn)_0%,var(--color-dawn-2)_34%,var(--color-dawn-3)_66%,var(--color-shell)_100%)] pt-[7.5rem] pb-0 text-ink lg:pt-[10rem]"
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

          <h1 className="mt-8 text-[clamp(2.05rem,8.6vw,6.1rem)] leading-[0.99] font-bold tracking-[-0.042em] text-ink">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className="block rise-line" style={delay(0.08 + i * 0.09)}>
                  {line}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="block rise-line" style={delay(0.35)}>
                <span className="text-emphasis">the next.</span>
              </span>
            </span>
          </h1>

          <p
            className="mt-8 max-w-xl fade-up text-[1.0625rem] leading-relaxed font-medium text-ink-2 sm:text-lg"
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
                <ButtonLink href={NOTIFY_MAILTO} variant="primary">
                  Notify me when applications open
                  <ArrowIcon />
                </ButtonLink>
              </Magnetic>
              <ButtonLink href="#process" variant="outline">
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
              className="fade-up border-t border-ink/12 pt-5"
              style={delay(0.62 + i * 0.07)}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="flex items-baseline text-[clamp(2.1rem,9vw,2.6rem)] leading-none font-bold tracking-[-0.04em] text-ink">
                  {stat.prefix ? <span className="text-ember">{stat.prefix}</span> : null}
                  <Counter value={stat.value} />
                  {stat.unit ? (
                    <span className="ml-1 text-[1.35rem] text-ember">{stat.unit}</span>
                  ) : null}
                </span>
                <span className="mt-2.5 block text-[0.8125rem] leading-snug font-medium text-ink-3">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>

      {/* ------------------------------------------------------- ribbon */}
      {/* The hero above is light, so the band goes dark: it draws the line
          under the sky and hands off to the cream page below. */}
      <div className="relative bg-night py-3.5 text-glow">
        <Marquee items={RIBBON} duration={46} />
      </div>
    </section>
  );
}

function HeroPill({ children, dot }: { children: React.ReactNode; dot?: boolean }) {
  return (
    <Pill
      dot={dot}
      className="border-ink/12 bg-paper/60 text-ink-2 backdrop-blur-md hover:bg-paper/85"
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
      {/* The scene holds the right of the frame on desktop and the upper band
          on a phone, above the copy rather than behind it. */}
      <div className="absolute inset-x-0 top-0 h-[54%] [mask-image:linear-gradient(180deg,black_58%,transparent)] opacity-80 lg:inset-y-0 lg:left-auto lg:h-full lg:w-[58%] lg:[mask-image:linear-gradient(90deg,transparent,black_38%)]">
        <HeroScene className="h-full w-full" />
      </div>

      {/* Keeps the headline off the brightest part of the sky without
          flattening the gradient behind it. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,238,0.34)_0%,rgba(250,246,238,0)_40%)] lg:bg-[linear-gradient(90deg,rgba(250,246,238,0.58)_0%,rgba(250,246,238,0.18)_44%,rgba(250,246,238,0)_72%)]" />

      <div className="absolute top-[-18%] left-[-10%] size-[38rem] drift-b rounded-full bg-[radial-gradient(circle,rgba(217,155,160,0.34),transparent_66%)] blur-3xl" />
    </div>
  );
}
