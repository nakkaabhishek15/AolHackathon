import { siteConfig } from "@/lib/site-config";
import { NotifyForm } from "./notify-form";
import { Reveal } from "./primitives";
import { SunMark } from "./sun-mark";

export function Cta() {
  return (
    <section id="notify" className="scroll-mt-24 border-t border-line-soft">
      <div className="grain relative overflow-hidden">
        {/* Dawn band — the page ends where the hero began. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-cream)_0%,#fbf0dc_46%,#ffe3b0_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[38%] left-1/2 w-[min(60rem,120%)] -translate-x-1/2 text-ink/25"
        >
          <SunMark id="cta" rays={40} />
        </div>

        <div className="relative container-page py-24 sm:py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Reveal>
              <span className="eyebrow">Be first to know</span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.08]">
                Applications aren&rsquo;t open yet.
                <br />
                <span className="text-gold italic">Your seat can be waiting.</span>
              </h2>
            </Reveal>

            <Reveal index={2}>
              <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-ink-2">
                Challenges, dates and venue are being locked in now. Leave an address and we will
                tell you the moment applications go live.
              </p>
            </Reveal>

            <Reveal index={3} className="mt-9 flex w-full justify-center">
              <NotifyForm />
            </Reveal>

            <Reveal index={4}>
              <p className="mt-8 text-[0.9375rem] text-ink-3">
                Or reach us directly at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-ink underline decoration-amber/50 underline-offset-4 transition-colors hover:decoration-amber"
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
