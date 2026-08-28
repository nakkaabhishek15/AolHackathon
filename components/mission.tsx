import { Reveal, SpotlightCard, WordReveal } from "./primitives";

const PILLARS = [
  {
    title: "Small teams, real scope",
    body: "Challenges are sized so a team of four or five can finish something that actually runs.",
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
    body: "You'll know exactly what you're solving, and propose your approach, before hour one.",
    icon: "compass",
  },
] as const;

export function Mission() {
  return (
    <section id="mission" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <Reveal>
              <span className="eyebrow">Why this exists</span>
            </Reveal>
            <h2 className="mt-5 text-[clamp(1.85rem,6vw,3.3rem)] leading-[1.06]">
              <WordReveal text="Not a hackathon looking for a cause." />{" "}
              <WordReveal
                text="A cause looking for hackers."
                className="text-emphasis"
                delay={0.18}
              />
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-[1.0625rem] leading-relaxed font-medium text-ink-2">
            <Reveal index={1}>
              <p>
                Every challenge on the list came from someone inside the organization describing a
                problem they run into over and over. You get the context, the constraints and what a
                good outcome looks like before you write a line of code.
              </p>
            </Reveal>

          </div>
        </div>

        <ul className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <Reveal as="li" key={pillar.title} index={i}>
              <SpotlightCard className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-paper p-7 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift">
                <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-sand text-accent transition-colors duration-500 group-hover:border-accent/40 group-hover:bg-tint">
                  <PillarIcon name={pillar.icon} />
                </span>
                <h3 className="text-[1.2rem] leading-snug">{pillar.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed font-medium text-ink-3">
                  {pillar.body}
                </p>
              </SpotlightCard>
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
