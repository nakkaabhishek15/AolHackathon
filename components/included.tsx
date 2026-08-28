import { Reveal, SectionHeading, SpotlightCard } from "./primitives";

const ITEMS = [
  {
    title: "Meals and snacks",
    body: "Fed through all thirty-six hours, overnight stretch included. Nobody builds well on an empty stomach.",
    icon: "bowl",
    wide: true,
  },
  {
    title: "Swag and shirts",
    body: "Something worth wearing after the event, a reminder of the team you built it with.",
    icon: "shirt",
  },
  {
    title: "Exciting prizes",
    body: "There are exciting prizes for the teams whose work stands out. Details land with the rest of the schedule.",
    icon: "gift",
  },
  {
    title: "Certificates and recognition",
    body: "Formal recognition for every participant, plus a spotlight on standout solutions.",
    icon: "award",
  },
  {
    title: "Mentorship throughout",
    body: "AOLF tech leads on the floor the whole way, for the technical problem and for the question of which problem you are really solving.",
    icon: "compass",
  },
] as const;

export function Included() {
  return (
    <section className="relative isolate overflow-hidden bg-night py-24 text-white sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_35%,black,transparent)]" />
        <div className="drift-b absolute top-[-20%] right-[-8%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(224,167,46,0.42),transparent_66%)] blur-3xl" />
        <div className="drift-a absolute bottom-[-30%] left-[-10%] size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(224,122,52,0.2),transparent_66%)] blur-3xl" />
      </div>

      <div className="container-page">
        <SectionHeading
          eyebrow="On us"
          title="What is covered"
          lede="No entry fee and no ticket. Everything below is covered for every participant."
          invert
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              index={i}
              className={"wide" in item && item.wide ? "md:col-span-2" : undefined}
            >
              <SpotlightCard
                tint="rgba(236,216,174,0.16)"
                className="flex h-full flex-col gap-4 rounded-2xl border border-white/12 bg-white/[0.045] p-8 backdrop-blur-sm transition-[border-color,transform,background-color] duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]"
              >
                <span className="flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/8 text-glow transition-colors duration-500 group-hover:text-white">
                  <Icon name={item.icon} />
                </span>
                <h3 className="text-[1.24rem] leading-snug text-white">{item.title}</h3>
                <p className="max-w-md text-[0.9375rem] leading-relaxed font-medium text-white/60">
                  {item.body}
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
  bowl: (
    <>
      <path d="M4 10c1.4-3.8 4.3-5.7 8-5.7s6.6 1.9 8 5.7" />
      <path d="M3 10h18l-1.4 7.6A2 2 0 0 1 17.6 19H6.4a2 2 0 0 1-2-1.4Z" />
      <path d="M9.2 10a2.8 2.8 0 0 1 5.6 0" />
    </>
  ),
  shirt: <path d="M8.5 3.5 12 6l3.5-2.5 4 3.6-2.9 2.6.9 8.8H6.5l.9-8.8-2.9-2.6 4-3.6Z" />,
  gift: (
    <>
      <rect x="3.2" y="9.6" width="17.6" height="10.4" rx="1.8" />
      <path d="M2.2 9.6h19.6M12 9.6V20" />
      <path d="M12 9.6S10.8 4 8.4 4a2.2 2.2 0 0 0 0 5.6M12 9.6S13.2 4 15.6 4a2.2 2.2 0 0 1 0 5.6" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.2" />
      <path d="M8.6 13.5 7.2 20.5 12 18.1l4.8 2.4-1.4-7" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.2 8.8-1.9 4.5-4.5 1.9 1.9-4.5 4.5-1.9Z" />
    </>
  ),
};

function Icon({ name }: { name: string }) {
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
