"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode, ComponentProps } from "react";

const MotionLink = motion.create(Link);

type Props = {
  children: ReactNode;
  variant?: "primary" | "glass";
  className?: string;
  href: string;
} & Omit<ComponentProps<typeof motion.a>, "href">;

const motionProps = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.96 },
  transition: { type: "spring", stiffness: 400, damping: 22 } as const,
};

/**
 * "#section" hashes stay a native <motion.a> — SnapScroll's document click
 * listener owns those for the cinematic same-page snap. Anything else (a
 * real route, or "/#section" from a non-home page) goes through Next's Link
 * for a client-side transition instead of a full page reload.
 */
export default function GlassButton({
  children,
  variant = "glass",
  className,
  href,
  ...rest
}: Props) {
  const classes = cn(
    "glass-sheen inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide select-none",
    variant === "primary"
      ? "bg-primary text-white shadow-[0_0_32px_var(--glow-orange),inset_0_1px_0_rgba(255,255,255,0.35)]"
      : "glass text-white",
    className
  );

  if (href.startsWith("#")) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...rest}>
        {children}
      </motion.a>
    );
  }

  return (
    <MotionLink href={href} className={classes} {...motionProps} {...rest}>
      {children}
    </MotionLink>
  );
}
