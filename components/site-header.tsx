"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NOTIFY_MAILTO } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./primitives";
import { Wordmark } from "./sun-mark";

const NAV = [
  { href: "#mission", label: "Mission" },
  { href: "#process", label: "How it works" },
  { href: "#arc", label: "The 36 hours" },
  { href: "#challenges", label: "Challenges" },
  { href: "#faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useMotionValueEvent(scrollY, "change", (y) => setCondensed(y > 40));

  // Scroll-spy: the last section whose top has passed a third of the viewport.
  useEffect(() => {
    const sections = NAV.map((n) => document.querySelector(n.href)).filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-33% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        animate={{
          backgroundColor: condensed ? "rgba(250,246,238,0.82)" : "rgba(250,246,238,0)",
          borderBottomColor: condensed ? "var(--color-line-soft)" : "rgba(228,217,197,0)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="border-b backdrop-blur-xl backdrop-saturate-150"
      >
        <nav className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="#top" aria-label={`${"AOLF Hackathon"} — top of page`}>
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                    active === item.href ? "text-ink" : "text-ink-3 hover:text-ink",
                  )}
                >
                  {item.label}
                  {active === item.href ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-gold"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ButtonLink
              href={NOTIFY_MAILTO}
              variant="primary"
              className="hidden px-5 py-2.5 text-sm sm:inline-flex"
            >
              Notify me
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 items-center justify-center rounded-full border border-line bg-paper/70 text-ink lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-0 top-0 h-[1.5px] origin-center rounded bg-current"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-0 bottom-0 h-[1.5px] origin-center rounded bg-current"
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-line bg-cream/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-page flex flex-col py-4">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line-soft py-4 font-display text-2xl text-ink last:border-0"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <ButtonLink href={NOTIFY_MAILTO} className="w-full" onClick={() => setOpen(false)}>
                  Notify me when applications open
                </ButtonLink>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
