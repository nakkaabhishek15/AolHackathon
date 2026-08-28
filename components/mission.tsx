import { Reveal } from "./primitives";

const PILLARS = [
  {
    title: "A team that outlasts the event",
    body: "The deliverable isn't a demo. It's the volunteers who keep building together the week after.",
    icon: "team",
  },
  {
    title: "Real problems, not prompts",
    body: "Every challenge comes from Operations, Marketing, Data, Executive teams and a community-wide survey.",
    icon: "target",
  },
  {
    title: "Free, always",
    body: "No application fee, no ticket. Meals, mentorship and a place to build are on us.",
    icon: "heart",
  },
  {
    title: "Challenges shared up front",
    body: "You'll know exactly what you're solving — and propose your approach — before hour one.",
    icon: "compass",
  },
] as const;

export function Mission() {
  return (
    <section id="mission" className="scroll-mt-24 border-t border-line-soft py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow">Why this exists</span>
            <h2 className="mt-5 text-[clamp(2.1rem,4.4vw,3.45rem)] leading-[1.1]">
              Not a hackathon looking for a cause. A cause looking for{" "}
              <span className="text-gold italic">hackers.</span>
            </h2>
          </Reveal>

          <div className="flex flex-col gap-6 text-[1.0625rem] leading-relaxed text-ink-2">
            <Reveal index={1}>
              <p>
                Our teachers, ashram teams, organizers and volunteers hit the same friction points
                over and over. A manual process here. Information nobody can find there. A
                bottleneck no one has had the bandwidth to fix. Real problems, quietly stacking up.
              </p>
            </Reveal>
            <Reveal index={2}>
              <p>
                This event closes that gap from both ends at once: it{" "}
                <strong className="font-semibold text-ink">
                  builds a standing volunteer tech team
                </strong>{" "}
                that keeps showing up after the closing circle, and along the way it{" "}
                <strong className="font-semibold text-ink">ships real solutions</strong> to problems
                sourced from our own community rather than invented for the occasion.
              </p>
            </Reveal>

            <Reveal index={3}>
              <figure className="relative mt-4 rounded-2xl border border-line bg-gold-tint/70 p-7 sm:p-9">
                <span
                  aria-hidden="true"
                  className="absolute top-3 left-6 font-display text-7xl leading-none text-amber/40"
                >
                  &ldquo;
                </span>
                <blockquote className="relative font-display text-[clamp(1.4rem,2.7vw,1.8rem)] leading-snug text-ink">
                  If you had a magic wand, what problem would you solve?
                </blockquote>
                <figcaption className="mt-4 text-sm text-ink-3">
                  The one question behind every challenge on the list. Each track traces back to a
                  real person&rsquo;s answer.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <Reveal
              as="li"
              key={pillar.title}
              index={i}
              className="group flex flex-col gap-4 bg-paper p-7 transition-colors duration-500 hover:bg-gold-tint/60"
            >
              <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-cream text-gold transition-colors duration-500 group-hover:border-amber/50 group-hover:bg-paper">
                <PillarIcon name={pillar.icon} />
              </span>
              <h3 className="text-[1.28rem] leading-snug">{pillar.title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-ink-3">{pillar.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

const PATHS: Record<string, React.ReactNode> = {
  team: (
    <>
      <path d="M16.5 19v-1a3.5 3.5 0 0 0-3.5-3.5H7A3.5 3.5 0 0 0 3.5 18v1" />
      <circle cx="10" cy="7" r="3.2" />
      <path d="M20.5 19v-1a3.5 3.5 0 0 0-2.6-3.4M15.8 4.2a3.2 3.2 0 0 1 0 6.2" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  heart: (
    <path d="M12 20.5S3.8 15.4 3.8 9.9A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 8.2 2.3c0 5.5-8.2 10.6-8.2 10.6Z" />
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.2 8.8-1.9 4.5-4.5 1.9 1.9-4.5 4.5-1.9Z" />
    </>
  ),
};

function PillarIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
