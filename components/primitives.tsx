"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";
import { type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ Reveal */

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.075, ease: [0.16, 1, 0.3, 1] },
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
  as?: "div" | "li" | "section" | "header";
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

/* ------------------------------------------------------------------ Button */

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full text-[0.9375rem] font-medium " +
  "transition-[transform,background-color,border-color,box-shadow] duration-300 ease-[var(--ease-out-expo)] " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-ink px-6 py-3.5 text-cream shadow-lift hover:-translate-y-0.5 hover:bg-dusk hover:shadow-raise",
  gold: "sun-gradient px-6 py-3.5 text-ink shadow-lift hover:-translate-y-0.5 hover:shadow-raise",
  outline:
    "border border-line bg-paper/70 px-6 py-3.5 text-ink backdrop-blur hover:-translate-y-0.5 hover:border-ink-4 hover:bg-paper",
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

/* -------------------------------------------------------------------- Pill */

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-paper/80 px-3.5 py-1.5",
        "text-[0.8125rem] font-medium text-ink-2 backdrop-blur",
        className,
      )}
    >
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
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="text-[clamp(2.1rem,4.4vw,3.35rem)] leading-[1.12] text-balance">{title}</h2>
      {lede ? <p className="max-w-xl text-[1.0625rem] leading-relaxed text-ink-2">{lede}</p> : null}
    </Reveal>
  );
}

/* ------------------------------------------------------------------- Arrow */

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
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
