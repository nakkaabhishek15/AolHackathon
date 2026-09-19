import { siteConfig } from "@/lib/site-config";
import { NotifyForm } from "./notify-form";
import { Reveal, WordReveal } from "./primitives";

/**
 * The closing band. Warm, but built from washes rather than a graphic, so it
 * lifts off the page without another illustration competing for attention.
 */
export function Cta() {
  return (
    <section id="notify" className="scroll-mt-24">
      <div className="grain relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-shell)_0%,var(--color-sand)_38%,var(--color-cream)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-12%] left-[6%] size-[30rem] drift-a rounded-full bg-[radial-gradient(circle,rgba(217,155,160,0.32),transparent_66%)] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[4%] bottom-[-24%] size-[32rem] drift-b rounded-full bg-[radial-gradient(circle,rgba(232,163,60,0.16),transparent_66%)] blur-3xl"
        />

        <div className="relative container-page py-24 sm:py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Reveal>
              <span className="eyebrow">Be first to know</span>
            </Reveal>

            <h2 className="mt-5 text-[clamp(1.85rem,6.4vw,3.6rem)] leading-[1.04]">
              <WordReveal text="Applications aren't open yet." />
              <span className="block">
                <WordReveal
                  text="Your seat can be waiting."
                  className="text-emphasis"
                  delay={0.16}
                />
              </span>
            </h2>

            <Reveal index={2}>
              <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed font-medium text-ink-2">
                Challenges, dates and venue are being locked in now. Leave an address and we will
                tell you the moment applications go live.
              </p>
            </Reveal>

            <Reveal index={3} className="mt-9 flex w-full justify-center">
              <NotifyForm />
            </Reveal>

            <Reveal index={4}>
              <p className="mt-8 text-[0.9375rem] font-medium text-ink-3">
                Or reach us directly at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-bold text-ink underline decoration-ember/50 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {siteConfig.email}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
