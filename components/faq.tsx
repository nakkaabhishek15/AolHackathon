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
    a: "AOLF volunteers, students, professionals, and anyone in our extended community who wants to build something useful. Good software takes more than developers: designers, writers, project coordinators and organizers are just as welcome.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. Teams need a mix of skills: development, design, content and coordination all matter. If you cannot write code but want in, apply anyway and tell us what you bring.",
  },
  {
    q: "Who is running it?",
    a: "The Art of Living Foundation. It is organized by people inside the organization, and AOLF tech leads are on the floor the whole way through as mentors — both for the technical problem and for the question of which problem you are really solving.",
  },
  {
    q: "How big is a team?",
    a: "Small. Challenges are deliberately sized so four or five people can finish something that actually runs in thirty-six hours. Come with a team you have already formed, or come alone and we will help you find one.",
  },
  {
    q: "Can I start building before the event?",
    a: "Thinking, yes. Building, no. You will have the challenges well before the event and you submit a proposed approach with your application, so arriving with a plan is expected. The implementation itself happens inside the thirty-six hours, which is what keeps it fair for everyone.",
  },
  {
    q: "What should I bring?",
    a: "A laptop and a charger at minimum. A full list goes out once the venue and format are confirmed.",
  },
  {
    q: "Do I have to stay awake the whole time?",
    a: "No, and the teams that pace themselves usually pull ahead of the ones that sprint. Quiet hours run overnight, the room stays open, food stays out, and sleep is encouraged. Rest arrangements are confirmed with the venue.",
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
    q: "What happens to what we build?",
    a: "The strongest solutions get support to move toward real use inside the organization, so the work does not stop at the demo. You will hear what happened to your build rather than watching it disappear after the weekend.",
  },
] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  /* Split down the middle rather than dealing left-right, so reading order
     still runs top-to-bottom within a column. */
  const half = Math.ceil(FAQS.length / 2);
  const columns = [FAQS.slice(0, half), FAQS.slice(half)];

  return (
    <section id="faq" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-page max-w-5xl">
        <SectionHeading
          eyebrow="Good questions"
          title="Everything we know so far"
          lede="More detail lands here as dates, venue and challenges are locked in."
        />

        <div className="mt-12 grid md:grid-cols-2 md:gap-x-14">
          {columns.map((column, c) => (
            <Reveal
              key={c}
              index={c}
              className={cn(
                "divide-y divide-line border-y border-line",
                /* Stacked on a phone the two blocks meet, and two 1px borders
                   would read as one thick one. */
                c > 0 && "-mt-px md:mt-0",
              )}
            >
              {column.map((item, j) => {
                const i = c * half + j;
                return (
                  <FaqItem
                    key={item.q}
                    item={item}
                    index={i}
                    isOpen={open === i}
                    onToggle={() => setOpen(open === i ? null : i)}
                  />
                );
              })}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center text-[0.9375rem] font-medium text-ink-3">
          Still have a question?{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-bold text-accent underline decoration-accent/45 underline-offset-4 transition-colors hover:decoration-accent"
          >
            {siteConfig.email}
          </a>
          . We read every message.
        </Reveal>
      </div>
    </section>
  );
}

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQS)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${index}`}
          className="group flex w-full items-start justify-between gap-5 py-6 text-left"
        >
          <span
            className={cn(
              "text-[1.05rem] leading-snug font-bold tracking-[-0.02em] transition-colors duration-300 sm:text-[1.14rem]",
              isOpen ? "text-ink" : "text-ink-2 hover:text-ink",
            )}
          >
            {item.q}
          </span>
          <span
            className={cn(
              "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
              isOpen
                ? "border-accent bg-tint text-accent"
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
            id={`faq-panel-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pr-6 pb-7 text-[0.9375rem] leading-relaxed font-medium text-ink-2">
              {item.a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
