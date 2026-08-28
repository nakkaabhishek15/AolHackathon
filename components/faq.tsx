"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./primitives";

const FAQS = [
  {
    q: "Is it really free to join?",
    a: "Yes. There is no cost to apply and no cost to attend. Meals, mentorship, swag and certificates are all included. This is a community event, not a fundraiser.",
  },
  {
    q: "Who can apply?",
    a: "AOLF volunteers, students, professionals, and anyone in our extended community who wants to help build the volunteer tech team. Good software takes more than developers: designers, writers, project coordinators and organizers are just as welcome.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. Teams need a mix of skills: development, design, content and coordination all matter. If you cannot write code but want in, apply anyway and tell us what you bring.",
  },
  {
    q: "When and where is it happening?",
    a: "Dates, location, and whether it runs in person, virtually or as a hybrid are still being finalized and will be announced here first. What is fixed is the shape: one continuous thirty-six-hour block. Join the notify list and you will hear the moment it is set.",
  },
  {
    q: "How are the challenges chosen?",
    a: "From real needs, not brainstorms. Operations, Marketing, Data and Executive teams contribute problem areas directly, and a community-wide survey asks PTCs, teachers, ashram teams, organizers and volunteers what they would fix with a magic wand. Responses get categorized and shaped into a limited set of structured challenges.",
  },
  {
    q: "How do I apply, and can I apply solo?",
    a: "Applications open once the challenges are finalized. When they do, you will choose one or more tracks and submit a short proposed approach alongside your application. Apply solo and we will help you find a team, or apply as a group you have already formed.",
  },
  {
    q: "Are there prizes?",
    a: "Yes. There are exciting prizes for the teams whose work stands out, and details go out with the rest of the schedule. Worth saying plainly though: the prize is not the reason to come. The team you leave with is.",
  },
  {
    q: "What happens after the closing circle?",
    a: "That is the real point of the event. Every participant is invited into AOLF's ongoing volunteer tech team, and promising solutions get support to move toward real use. Building does not stop when the thirty-six hours do.",
  },
] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-page max-w-3xl">
        <SectionHeading
          eyebrow="Good questions"
          title="Everything we know so far"
          lede="More detail lands here as dates, venue and challenges are locked in."
        />

        <Reveal className="mt-12 divide-y divide-line border-y border-line">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={cn(
                        "text-[1.1rem] leading-snug font-bold tracking-[-0.02em] transition-colors duration-300 sm:text-[1.22rem]",
                        isOpen ? "text-ink" : "text-ink-2 hover:text-ink",
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                        isOpen
                          ? "border-amber bg-gold-tint text-gold"
                          : "border-line text-ink-3 group-hover:border-ink-4",
                      )}
                    >
                      <motion.svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        className="size-3.5"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        aria-hidden="true"
                      >
                        <path d="m4 6 4 4 4-4" />
                      </motion.svg>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pr-10 pb-7 text-[0.9875rem] leading-relaxed font-medium text-ink-2">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>

        <Reveal className="mt-8 text-center text-[0.9375rem] font-medium text-ink-3">
          Still have a question?{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-bold text-gold underline decoration-amber/50 underline-offset-4 transition-colors hover:decoration-amber"
          >
            {siteConfig.email}
          </a>
          . We read every message.
        </Reveal>
      </div>
    </section>
  );
}
