import { siteConfig } from "@/lib/site-config";
import { Reveal, SectionHeading, SpotlightCard } from "./primitives";

export function Challenges() {
  const tracks = siteConfig.tracks;

  return (
    <section id="challenges" className="scroll-mt-24 border-y border-line bg-sand py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Challenge tracks"
          title={
            <>
              The challenges are still being written{" "}
              <span className="text-emphasis">by you</span>
            </>
          }
          lede="Survey answers and program-team input are being categorized into a short list of structured challenges right now. This is where they will appear."
        />
      </div>

      <div className="container-page mt-14">
        {tracks.status === "set" ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.value.map((track, i) => (
              <Reveal as="li" key={track.slug} index={i}>
                <SpotlightCard className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-paper p-7 shadow-lift transition-transform duration-500 hover:-translate-y-1">
                  <span className="eyebrow">{track.source}</span>
                  <h3 className="text-[1.24rem] leading-snug">{track.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed font-medium text-ink-3">
                    {track.summary}
                  </p>
                  <span className="mt-auto pt-4 text-[0.8125rem] font-medium text-ink-4">
                    {track.teams}
                  </span>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: siteConfig.plannedTrackCount }, (_, i) => (
              <LockedTrack key={i} index={i} />
            ))}
          </ul>
        )}

        <Reveal className="mt-10">
          <div className="flex flex-col gap-4 rounded-2xl border border-accent/25 bg-tint/70 p-7 sm:flex-row sm:items-start sm:gap-5 sm:p-8">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-paper text-accent shadow-lift">
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
                <path d="M12 3 2.5 7.2 12 11.4l9.5-4.2L12 3Z" />
                <path d="m2.5 16.8 9.5 4.2 9.5-4.2M2.5 12l9.5 4.2 9.5-4.2" />
              </svg>
            </span>
            <p className="text-[0.9875rem] leading-relaxed font-medium text-ink-2">
              <strong className="text-ink">
                Every finalized challenge goes out to applicants before the event
              </strong>{" "}
              with full context and success criteria, so you choose what genuinely interests
              you and arrive with a plan instead of a blank page.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LockedTrack({ index }: { index: number }) {
  return (
    <Reveal as="li" index={index}>
      <SpotlightCard className="flex min-h-[13rem] flex-col justify-between rounded-2xl border border-dashed border-line bg-paper/60 p-7 transition-colors duration-500 hover:border-accent/35">
        <span className="flex size-9 items-center justify-center rounded-lg border border-line bg-sand text-ink-4 transition-colors duration-500 group-hover:text-accent">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
            aria-hidden="true"
          >
            <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
            <path d="M8 10.5V7.4a4 4 0 0 1 8 0v3.1" />
          </svg>
        </span>

        {/* Skeleton lines shimmer in sequence, so a card that has nothing to
            say still reads as "being written" rather than "broken". */}
        <div className="mt-8 flex flex-col gap-2.5" aria-hidden="true">
          {[80, 60, 40].map((width, i) => (
            <span
              key={width}
              className="animate-breathe h-2.5 rounded-full bg-line"
              style={{ width: `${width}%`, animationDelay: `${index * 0.15 + i * 0.22}s` }}
            />
          ))}
        </div>

        <span className="mt-6 text-[0.75rem] font-bold tracking-[0.16em] text-ink-4 uppercase">
          Track {String(index + 1).padStart(2, "0")} · in curation
        </span>
      </SpotlightCard>
    </Reveal>
  );
}
