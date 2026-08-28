"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Hairline dawn bar across the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-[2px] origin-left bg-[linear-gradient(90deg,var(--color-amber),var(--color-glow)_45%,var(--color-ember-fill)_78%,var(--color-amber))]"
    />
  );
}
