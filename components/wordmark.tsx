import { cn } from "@/lib/utils";

/**
 * Nav lockup. A plain type lockup with a numeral tile: the event is measured
 * in hours, so the mark says 36 rather than drawing anything.
 */
export function Wordmark({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl border text-[0.8125rem] font-bold tracking-[-0.03em] transition-transform duration-500 ease-[var(--ease-spring)] group-hover/mark:-translate-y-0.5",
          invert ? "border-white/25 bg-white/10 text-white" : "border-line bg-sand text-accent",
        )}
      >
        36
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.15rem] font-bold tracking-[-0.03em]",
            invert ? "text-white" : "text-ink",
          )}
        >
          Hackathon
        </span>
        <span
          className={cn(
            "mt-1 text-[0.5625rem] font-bold tracking-[0.22em] uppercase",
            invert ? "text-glow" : "text-ink-3",
          )}
        >
          The Art of Living
        </span>
      </span>
    </span>
  );
}
