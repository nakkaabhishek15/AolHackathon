import { Reveal, SectionHeading } from "./primitives";

const ITEMS = [
  {
    title: "Meals and snacks",
    body: "Fed through all thirty-six hours, overnight stretch included. Nobody builds well on an empty stomach.",
    icon: "bowl",
    wide: true,
  },
  {
    title: "Swag and shirts",
    body: "Something worth wearing after the event — a reminder of the team you built it with.",
    icon: "shirt",
  },
  {
    title: "Certificates and recognition",
    body: "Formal recognition for every participant, plus a spotlight on standout solutions.",
    icon: "award",
  },
  {
    title: "Mentorship throughout",
    body: "AOLF tech leads on the floor the whole way — for the technical problem and for the question of which problem you are really solving.",
    icon: "compass",
    wide: true,
  },
] as const;

export function Included() {
  return (
    <section className="border-t border-line-soft py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="On us"
          title="Free means free"
          lede="No entry fee, no ticket, no catch. Everything below is covered for every participant."
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              index={i}
              className={
                "group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-paper p-8 " +
                ("wide" in item && item.wide ? "md:col-span-2" : "")
              }
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-[radial-gradient(circle,rgba(255,201,60,0.2),transparent_65%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
              <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-cream text-gold">
                <Icon name={item.icon} />
              </span>
              <h3 className="text-[1.32rem] leading-snug">{item.title}</h3>
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-3">{item.body}</p>
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
