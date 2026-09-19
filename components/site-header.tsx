"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NOTIFY_MAILTO } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./primitives";
import { Wordmark } from "./wordmark";

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
  const [tucked, setTucked] = useState(false);
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setCondensed(y > 40);

    /* Reading down hides the bar; any upward movement brings it straight
       back. The 6px deadzone keeps momentum scrolling from flickering it. */
    const delta = y - lastY.current;
    if (Math.abs(delta) > 6) {
      setTucked(y > 420 && delta > 0);
      lastY.current = y;
    }
  });

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

  // At the top the bar floats over the dark hero, so it wears light type.
  // Once the page scrolls it becomes a pale glass rail over light sections.
  const onDark = !condensed && !open;

  return (
    <motion.header
      animate={{ y: tucked && !open ? "-100%" : 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        animate={{
          backgroundColor: onDark ? "rgba(58,34,42,0)" : "rgba(250,246,238,0.88)",
          borderBottomColor: onDark ? "rgba(255,255,255,0)" : "rgba(235,218,210,1)",
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="border-b backdrop-blur-xl backdrop-saturate-150"
      >
        <nav className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="#top" className="group/mark" aria-label="AOLF Hackathon, top of page">
            <Wordmark invert={onDark} />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-300",
                    onDark
                      ? active === item.href
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                      : active === item.href
                        ? "text-ink"
                        : "text-ink-3 hover:text-ink",
                  )}
                >
                  {item.label}
                  {active === item.href ? (
                    <motion.span
                      layoutId="nav-active"
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-px",
                        onDark ? "bg-glow" : "bg-accent",
                      )}
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
              variant={onDark ? "invert" : "primary"}
              className="hidden px-5 py-2.5 text-sm sm:inline-flex"
            >
              Notify me
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "flex size-10 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden",
                onDark
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-line bg-paper/70 text-ink",
              )}
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
            className="border-b border-line bg-shell/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-page flex flex-col py-4">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line-soft py-4 text-2xl font-bold tracking-[-0.03em] text-ink last:border-0"
                  >
                    {item.label}
                  </Link>
                </motion.li>
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
    </motion.header>
  );
}
