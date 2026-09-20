"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  animate,
  type Variants,
} from "motion/react";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ Reveal */

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
};

/** Fade-and-lift on first scroll into view. Respects reduced-motion. */
export function Reveal({
  children,
  index = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "li" | "section" | "header" | "figure";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag
      data-reveal=""
      className={className}
      custom={index}
      variants={revealVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------- WordReveal */

/**
 * Splits a string on spaces and lifts each word out of its own clipping box.
 * Used for section headings, where a single block fade reads flat next to the
 * hero's line-by-line entrance.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h2" | "h3";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "108%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-14% 0px -10% 0px" }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ----------------------------------------------------------------- Counter */

/**
 * Counts from zero to `value` the first time it scrolls into view. The DOM
 * node is written directly rather than through state so a 60fps count does
 * not schedule 60 React renders a second.
 */
export function Counter({
  value,
  duration = 1.6,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduced) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  // The final value is what renders on the server and before the count runs,
  // so the figure is correct even if the animation never starts.
  return (
    <span ref={ref} className={cn("numeric", className)}>
      {value}
    </span>
  );
}

/* ------------------------------------------------------------------ Button */

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full text-[0.9375rem] font-bold tracking-[-0.01em] " +
  "transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-[var(--ease-out-expo)] " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "sheen bg-ink px-6 py-3.5 text-white shadow-lift hover:-translate-y-0.5 hover:bg-night-2 hover:shadow-raise",
  outline:
    "border border-line bg-paper/70 px-6 py-3.5 text-ink backdrop-blur hover:-translate-y-0.5 hover:border-ink-4 hover:bg-paper",
  invert:
    "sheen bg-white px-6 py-3.5 text-ink shadow-lift hover:-translate-y-0.5 hover:bg-glow hover:shadow-raise",
  outlineInvert:
    "border border-white/25 px-6 py-3.5 text-white hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10",
  ghost: "px-2 py-1.5 text-ink-2 hover:text-ink",
} as const;

type ButtonVariant = keyof typeof variants;

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------- Magnetic */

/**
 * Nudges its child a few pixels toward the cursor. Pointer-fine only: on
 * touch there is no hover state to reward, and the transform would just
 * fight the tap.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  useEffect(() => {
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  if (reduced || !enabled) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      className={cn("inline-block", className)}
      onPointerMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------- Spotlight */

/**
 * A card that lights up under the cursor. The highlight is a radial gradient
 * driven by two motion values, so tracking the pointer never re-renders the
 * card or its children.
 */
export function SpotlightCard({
  children,
  className,
  tint = "rgba(163,59,82,0.10)",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  tint?: string;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const Tag = motion[as];

  const background = useMotionTemplate`radial-gradient(16rem 16rem at ${mx}px ${my}px, ${tint}, transparent 72%)`;

  return (
    <Tag
      ref={ref as never}
      onPointerMove={(event: React.PointerEvent) => {
        if (reduced) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set(event.clientX - rect.left);
        my.set(event.clientY - rect.top);
      }}
      onPointerLeave={() => {
        mx.set(-500);
        my.set(-500);
      }}
      className={cn("group relative isolate overflow-hidden", className)}
    >
      {!reduced ? (
        <motion.span
          aria-hidden="true"
          style={{ background }}
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      ) : null}
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------- Pill */

export function Pill({
  children,
  className,
  dot = false,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-paper/80 px-3.5 py-1.5",
        "text-[0.8125rem] font-semibold text-ink-2 backdrop-blur",
        className,
      )}
    >
      {dot ? (
        <span aria-hidden="true" className="relative flex size-1.5">
          <span className="absolute inset-0 animate-[pulse-ring_2.4s_ease-out_infinite] rounded-full bg-marigold" />
          <span className="relative size-1.5 rounded-full bg-ember" />
        </span>
      ) : null}
      {children}
    </span>
  );
}

/* --------------------------------------------------------- SectionHeading */

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  invert = false,
  className,
}: {
  /** Optional: some sections read better with the heading standing alone. */
  eyebrow?: string;
  /** Plain strings get the per-word lift; nodes are revealed as one block. */
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
}) {
  const headingClass = cn(
    "text-[clamp(1.8rem,6vw,3.15rem)] leading-[1.08] text-balance",
    invert && "text-white",
  );

  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <span className={invert ? "eyebrow-invert" : "eyebrow"}>
            <span aria-hidden="true" className="h-px w-6 shrink-0 bg-current opacity-50" />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}

      {typeof title === "string" ? (
        <WordReveal as="h2" text={title} className={headingClass} delay={0.05} />
      ) : (
        <Reveal index={1}>
          <h2 className={headingClass}>{title}</h2>
        </Reveal>
      )}

      {lede ? (
        <Reveal index={2}>
          <p
            className={cn(
              "max-w-xl text-[1.0625rem] leading-relaxed font-medium",
              invert ? "text-glow" : "text-ink-2",
            )}
          >
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------- Parallax */

/**
 * Drifts its child vertically as the element crosses the viewport. The child
 * must be laid out taller than its frame (see PhotoStrip) so the drift never
 * exposes an edge. Scroll-linked rather than time-based, so it tracks the
 * user's own movement instead of playing at them.
 */
export function Parallax({
  children,
  range = 28,
  className,
}: {
  children: ReactNode;
  /** Peak offset in pixels, applied as -range at entry and +range at exit. */
  range?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------- DrawIn */

/**
 * Draws a line icon on, stroke-first, the first time it scrolls into view.
 * The dash maths lives in the `icon-draw` utility and is driven by a single
 * data attribute, so the icon sets stay plain SVG nodes and the animation
 * runs on the compositor rather than through React.
 */
export function DrawIn({
  children,
  className,
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      data-drawn={inView ? "" : undefined}
      style={{ ...style, transitionDelay: `${delay}s` }}
      className={cn("icon-draw", className)}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------- Marquee */

/**
 * Seamless infinite strip. The track holds the children twice, so a -50%
 * translate lands exactly on the start of the second copy.
 */
export function Marquee({
  items,
  duration = 42,
  className,
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
}) {
  const run = [...items, ...items];

  return (
    <div className={cn("overflow-hidden marquee-mask", className)} aria-hidden="true">
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {run.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-6 pr-6">
            <span className="text-[0.8125rem] font-bold tracking-[0.22em] whitespace-nowrap uppercase">
              {item}
            </span>
            <span className="size-1 shrink-0 rounded-full bg-current opacity-40" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- Arrow */

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "size-4 transition-transform duration-300 group-hover:translate-x-0.5",
        className,
      )}
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
