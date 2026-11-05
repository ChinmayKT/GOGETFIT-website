"use client";

import { motion, type MotionStyle, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

/** Short fade and rise on scroll into view. */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  margin = "-15% 0px",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
  /**
   * Viewport shrink margin for the whileInView trigger. The -15% default
   * assumes content scrolls gradually into place; elements pinned near the
   * very top/bottom edge of a 100vh snap section (which appears all at once)
   * can sit outside that shrunk box and never fire — pass "0px" for those.
   */
  margin?: string;
  /**
   * Passed through untouched — e.g. for computed absolute positioning. Use
   * Framer's own x/y shorthand (not a raw `transform` string) for centering:
   * Framer recomputes `transform` from its animated props each frame, which
   * silently drops any static transform string set here.
   */
  style?: MotionStyle;
}) {
  const Tag = motion[as];
  return (
    <Tag
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      className={cn(className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
