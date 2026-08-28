import { cn } from "@/lib/utils";

/**
 * The Art of Living rising sun, redrawn as vector so it can be tinted,
 * animated and scaled without shipping the raster mark everywhere.
 * Ray lengths alternate long/short exactly like the printed logo.
 */
export function SunMark({
  className,
  rays = 28,
  id = "sun",
}: {
  className?: string;
  rays?: number;
  id?: string;
}) {
  const gradientId = `${id}-fill`;

  return (
    <svg viewBox="0 0 200 116" className={cn("h-auto w-full", className)} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-ember)" />
          <stop offset="55%" stopColor="var(--color-amber)" />
          <stop offset="100%" stopColor="var(--color-sun)" />
        </linearGradient>
      </defs>

      <g stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
        {Array.from({ length: rays }, (_, i) => {
          const angle = Math.PI * (i / (rays - 1));
          const inner = 52;
          const outer = i % 2 === 0 ? 74 : 65;
          return (
            <line
              key={i}
              x1={100 - Math.cos(angle) * inner}
              y1={100 - Math.sin(angle) * inner}
              x2={100 - Math.cos(angle) * outer}
              y2={100 - Math.sin(angle) * outer}
            />
          );
        })}
      </g>

      <path d="M55 100a45 45 0 0 1 90 0Z" fill={`url(#${gradientId})`} />
      <path d="M55 100a45 45 0 0 1 90 0" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <line
        x1="4"
        y1="100.6"
        x2="196"
        y2="100.6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Compact lockup for the nav bar and footer. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="w-9 shrink-0 text-ink">
        <SunMark id="wordmark" rays={20} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.2rem] tracking-tight text-ink">Hackathon</span>
        <span className="mt-1 text-[0.5625rem] font-semibold tracking-[0.2em] text-ink-3 uppercase">
          The Art of Living
        </span>
      </span>
    </span>
  );
}
