"use client";

import { m } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in pixels before the element settles. */
  distance?: number;
}

/** Fades content up once as it enters the viewport. Use below the fold only. */
export function Reveal({ children, className, delay = 0, distance = 28 }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </m.div>
  );
}

/** Slow scale-and-fade for image frames. The frame itself provides the crop. */
export function ImageReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, scale: 1.06 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.6, ease }}
    >
      {children}
    </m.div>
  );
}
