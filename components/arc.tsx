"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./primitives";

type Phase = {
  hour: number;
  clock: string;
  label: string;
  title: string;
  body: string;
  /** Sky gradient for this moment: [top, bottom]. */
  sky: [string, string];
  /** Whether type sitting on the sky band should be light. */
  night?: boolean;
};

const PHASES: Phase[] = [
  {
    hour: 0,
    clock: "Hour 00",
    label: "First light",
    title: "Opening circle",
    body: "Everyone in one room before a single line is written. A short meditation, the ground rules, and the reminder that what you leave with matters more than what you take home.",
    sky: ["#f6d5d5", "#fbf0e3"],
  },
  {
    hour: 2,
    clock: "Hour 02",
    label: "Morning",
    title: "Teams and challenges lock",
    body: "You already picked your challenge in the application. Now teams finalize, mentors are matched, and the plan you proposed meets the people you will actually build it with.",
    sky: ["#f5e0dc", "#fbf5ee"],
  },
  {
    hour: 6,
    clock: "Hour 06",
    label: "Midday",
    title: "First working thing",
    body: "The bar for the first six hours is deliberately low and deliberately real: something that runs. Scaffolding, data access, a rough screen. Momentum beats architecture this early.",
    sky: ["#f9ece1", "#fefaf4"],
  },
  {
    hour: 11,
    clock: "Hour 11",
    label: "Golden hour",
    title: "Mentor rounds",
    body: "AOLF tech leads walk every table. Half the conversation is technical, half is making sure you are solving the problem the community actually described rather than the one that is fun to build.",
    sky: ["#edb863", "#f8dfb0"],
  },
  {
    hour: 16,
    clock: "Hour 16",
    label: "Dusk",
    title: "Scope meets reality",
    body: "The honest checkpoint. Cut what will not land, protect the one thing that makes the demo make sense, and decide as a team what good enough looks like by morning.",
    sky: ["#5c3a45", "#e8a33c"],
  },
  {
    hour: 22,
    clock: "Hour 22",
    label: "The long stretch",
    title: "Overnight",
    body: "Quiet hours. Food stays out, the room stays open, and the teams that pace themselves pull ahead of the ones that sprint. Sleep is allowed. Encouraged, even.",
    sky: ["#123f3f", "#1f5757"],
    night: true,
  },
  {
    hour: 28,
    clock: "Hour 28",
    label: "Second sunrise",
    title: "Reset and breathe",
    body: "The second dawn of the event, and the reason it is measured in sunrises. A short guided practice, then back in, with a clearer head than anyone expects at hour twenty-eight.",
    sky: ["#d99ba0", "#f6d9a8"],
  },
  {
    hour: 33,
    clock: "Hour 33",
    label: "Freeze",
    title: "Code freeze and rehearsal",
    body: "Hands off the keyboard, onto the story. Three minutes to show what you built and who it is for. Teams that rehearse twice always demo better than teams that commit twice.",
    sky: ["#f2e6de", "#fbf6ef"],
  },
  {
    hour: 36,
    clock: "Hour 36",
    label: "Closing",
    title: "Demos and closing circle",
    body: "Every team presents what they built and who it is for. Then everyone sits together one last time to close out the thirty-six hours.",
    sky: ["#f3dcda", "#fcf3e8"],
  },
];

/* Quadratic bezier the nodes are laid out along. */
const P0 = { x: 40, y: 188 };
const P1 = { x: 500, y: -16 };
const P2 = { x: 960, y: 188 };

const pointAt = (t: number) => ({
  x: (1 - t) ** 2 * P0.x + 2 * (1 - t) * t * P1.x + t ** 2 * P2.x,
  y: (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y,
});

export function Arc() {
  const [index, setIndex] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const active = PHASES[index]!;

  const focusTab = useCallback((next: number) => {
    setIndex(next);
    tabsRef.current[next]?.focus();
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: PHASES.length - 1,
    };
    const next = map[event.key];
    if (next === undefined) return;
    event.preventDefault();
    focusTab(Math.min(PHASES.length - 1, Math.max(0, next)));
  };

  return (
    <section id="arc" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Dawn, dark, dawn"
          title="The arc of thirty-six hours"
          lede="One overnight push, bookended by two sunrises. Move along the arc to see what is happening at each point."
        />

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-raise">
            {/* ---------------------------------------------- sky + arc */}
            <div className="relative">
              <motion.div
                aria-hidden="true"
                animate={{
                  background: `linear-gradient(175deg, ${active.sky[0]}, ${active.sky[1]})`,
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              />

              {/* The tablist overlay must share the SVG's exact box so the
                  percentage-positioned hit targets land on the drawn nodes,
                  hence the padding lives on the outer element and the inner
                  wrapper is sized purely by the SVG. */}
              <div className="px-4 pt-8 pb-6 sm:px-8">
                <div className="relative">
                  <svg
                    viewBox="0 0 1000 210"
                    className="hidden h-auto w-full overflow-visible sm:block"
                    aria-hidden="true"
                  >
                    <path
                      d={`M${P0.x} ${P0.y} Q${P1.x} ${P1.y} ${P2.x} ${P2.y}`}
                      fill="none"
                      stroke={active.night ? "rgba(255,255,255,0.32)" : "rgba(46,27,33,0.22)"}
                      strokeWidth="1.5"
                      strokeDasharray="5 7"
                      className="transition-[stroke] duration-700"
                    />

                    {PHASES.map((phase, i) => {
                      const { x, y } = pointAt(phase.hour / 36);
                      const isActive = i === index;
                      return (
                        <g key={phase.hour}>
                          {isActive ? (
                            <motion.circle
                              layoutId={`${baseId}-halo`}
                              cx={x}
                              cy={y}
                              r="17"
                              fill={
                                active.night ? "rgba(255,255,255,0.16)" : "rgba(163,59,82,0.18)"
                              }
                              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            />
                          ) : null}
                          <circle
                            cx={x}
                            cy={y}
                            r={isActive ? 7 : 4}
                            fill={
                              isActive
                                ? "var(--color-accent-fill)"
                                : active.night
                                  ? "rgba(255,255,255,0.55)"
                                  : "rgba(46,27,33,0.34)"
                            }
                            className="transition-all duration-500"
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* Node buttons, absolutely positioned over the arc. */}
                  <div
                    role="tablist"
                    aria-label="Hackathon timeline"
                    onKeyDown={onKeyDown}
                    className={cn(
                      "flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1",
                      "sm:pointer-events-none sm:absolute sm:inset-0 sm:block sm:gap-0 sm:overflow-visible sm:pb-0",
                    )}
                  >
                    {PHASES.map((phase, i) => {
                      const { x, y } = pointAt(phase.hour / 36);
                      const isActive = i === index;
                      return (
                        <button
                          key={phase.hour}
                          ref={(el) => {
                            tabsRef.current[i] = el;
                          }}
                          role="tab"
                          id={`${baseId}-tab-${i}`}
                          aria-selected={isActive}
                          aria-controls={`${baseId}-panel`}
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => setIndex(i)}
                          onPointerEnter={() => setIndex(i)}
                          style={{ left: `${(x / 1000) * 100}%`, top: `${(y / 210) * 100}%` }}
                          className={cn(
                            "pointer-events-auto shrink-0 snap-start rounded-full border px-3 py-1.5",
                            "text-[0.6875rem] font-bold tracking-[0.1em] whitespace-nowrap uppercase transition-colors duration-300",
                            "sm:absolute sm:size-11 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:border-0 sm:bg-transparent sm:p-0",
                            "focus-visible:outline-2 focus-visible:outline-offset-2",
                            active.night
                              ? "border-white/25 text-white/70 focus-visible:outline-white"
                              : "border-ink/15 text-ink/60 focus-visible:outline-accent",
                            isActive &&
                              (active.night
                                ? "border-white/60 bg-white/15 text-white"
                                : "border-accent/50 bg-accent/10 text-accent"),
                          )}
                        >
                          <span aria-hidden="true" className="sm:hidden">
                            {phase.clock}
                          </span>
                          <span className="sr-only">
                            {phase.clock}: {phase.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Hour ticks under the arc */}
              <div
                aria-hidden="true"
                className={cn(
                  "relative hidden items-center justify-between border-t px-6 py-3 text-[0.6875rem] font-semibold tracking-[0.18em] uppercase transition-colors duration-700 sm:flex sm:px-10",
                  active.night ? "border-white/15 text-white/60" : "border-ink/10 text-ink/55",
                )}
              >
                <span>Sunrise · hour 00</span>
                <span className="hidden sm:inline">Overnight</span>
                <span>Hour 36 · closing</span>
              </div>
            </div>

            {/* ---------------------------------------------- detail panel */}
            <div
              role="tabpanel"
              id={`${baseId}-panel`}
              aria-labelledby={`${baseId}-tab-${index}`}
              className="grid gap-6 border-t border-line bg-paper p-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8 sm:p-10"
            >
              <div className="flex flex-col gap-1.5">
                <span className="numeric text-[3.1rem] leading-none font-bold tracking-[-0.045em] text-ink">
                  {String(active.hour).padStart(2, "0")}
                </span>
                <span className="eyebrow">{active.label}</span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.hour}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="text-[clamp(1.4rem,2.9vw,1.85rem)] leading-snug">
                    {active.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[0.9875rem] leading-relaxed font-medium text-ink-2">
                    {active.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <p className="mt-4 text-center text-[0.8125rem] font-medium text-ink-4">
            Tap a point or use the arrow keys to move through the timeline. Exact clock times land
            with the schedule.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
