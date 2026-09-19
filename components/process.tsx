"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./primitives";

const STEPS = [
  {
    tag: "Community input",
    title: "We ask the community for real problems",
    body: "PTCs, full-time teachers, ashram and retreat-center teams, organizers and volunteers answer one prompt: if you had a magic wand, what would you fix? That runs alongside direct input from Operations, Marketing, Data and Executive teams.",
  },
  {
    tag: "Curation",
    title: "Responses become a short list of challenges",
    body: "Every response is categorized and shaped into a limited set of structured challenges, each with context and success criteria, sized to roughly four or five teams for simpler problems, seven or eight for the harder ones.",
  },
  {
    tag: "Application",
    title: "You apply with a challenge and a plan",
    body: "Problem statements go out to every applicant before the event. Pick the ones that speak to you and submit a short proposed approach with your application.",
  },
  {
    tag: "Build",
    title: "Thirty-six hours, start to finish",
    body: "Building happens only during the event itself: one continuous sunrise-to-sunrise sprint, with mentors on hand the whole way through.",
  },
  {
    tag: "Demo day",
    title: "You show what you built",
    body: "Three minutes per team to walk through the problem you took on and what you shipped, followed by a closing circle to end the thirty-six hours together.",
  },
] as const;

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const glowY = useTransform(progress, (v) => `${v * 100}%`);

  /* The rail's leading edge lights each step as it passes it. Tracking the
     index rather than the raw value means one render per step, not per frame. */
  const [reached, setReached] = useState(-1);
  useMotionValueEvent(progress, "change", (v) => {
    setReached(Math.floor(v * STEPS.length - 0.35));
  });

  return (
    <section id="process" className="scroll-mt-24 border-y border-line bg-sand py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="The path to build day"
          title="Nothing about this starts cold"
          lede="The problems, the teams and the plan are all in place before hour one. Here is the whole sequence, end to end."
        />

        <ol ref={ref} className="relative mt-16 sm:mt-20">
          {/* Rail + scroll-linked fill */}
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-6 left-[1.4375rem] w-px bg-line sm:left-[2.1875rem]"
          >
            <motion.div
              style={{ scaleY: progress }}
              className="h-full w-full origin-top bg-[linear-gradient(180deg,var(--color-night-2),var(--color-accent-fill)_55%,var(--color-marigold))]"
            />
            <motion.span
              style={{ top: glowY }}
              className="absolute -left-[3px] size-[7px] -translate-y-1/2 rounded-full bg-marigold shadow-[0_0_0_4px_rgba(232,163,60,0.26)]"
            />
          </div>

          {STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.tag}
              index={i}
              className="group relative flex gap-6 pb-12 sm:gap-9"
            >
              <span
                className={cn(
                  "relative z-10 mt-0.5 flex size-12 shrink-0 items-center justify-center rounded-full border numeric text-xl font-bold tracking-[-0.04em] shadow-lift",
                  "transition-[transform,border-color,color,background-color,box-shadow] duration-700 ease-[var(--ease-spring)]",
                  "group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:text-accent",
                  "sm:size-[4.375rem] sm:text-[1.7rem]",
                  reached >= i
                    ? "-translate-y-0.5 border-accent/45 bg-tint text-accent shadow-raise"
                    : "border-line bg-paper text-ink",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="pt-1.5 sm:pt-4">
                <span className="eyebrow">{step.tag}</span>
                <h3 className="mt-2.5 text-[clamp(1.28rem,2.6vw,1.7rem)] leading-snug">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[0.9875rem] leading-relaxed font-medium text-ink-2">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
