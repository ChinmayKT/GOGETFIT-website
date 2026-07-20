"use client";

import { useEffect, useRef } from "react";
import { motion, type MotionStyle, type Variants } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { QUERY_MOBILE } from "@/lib/breakpoints";

gsap.registerPlugin(ScrollTrigger);

const variants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const OFFSET_X: Record<"left" | "right", number> = { left: -60, right: 60 };

/** Fade-up + unblur on scroll into view. */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  margin = "-15% 0px",
  style,
  mobileReveal,
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
  /**
   * On mobile only (<768px), reveal via a repeating GSAP ScrollTrigger
   * (replays every time the element re-enters the viewport, either scroll
   * direction) instead of Framer's once-only whileInView — sliding in from
   * the given side. Tablet/desktop are unaffected: they keep exactly
   * today's Framer fade-up, as if this prop weren't passed. Entirely
   * independent of the travelling-phone GSAP timeline — different element,
   * different ScrollTrigger instances, only ever kills the trigger this
   * one instance creates.
   *
   * Don't combine with a `style` that sets a static x (e.g. a "-50%"
   * centering trick) — both would fight over the same transform.
   */
  mobileReveal?: "left" | "right";
}) {
  const isMobile = useIsMobile();
  const elRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mobileReveal || !isMobile) return;
    const el = elRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(
      { isMobile: QUERY_MOBILE, reduced: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { isMobile: match, reduced } = context.conditions as {
          isMobile: boolean;
          reduced: boolean;
        };
        if (!match || reduced) return;

        const x = OFFSET_X[mobileReveal];
        const hide = () => gsap.set(el, { opacity: 0, x, scale: 0.97 });
        const reveal = () =>
          gsap.to(el, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            overwrite: "auto",
          });

        hide();
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          end: "bottom 12%",
          onEnter: reveal,
          onEnterBack: reveal,
          onLeave: hide,
          onLeaveBack: hide,
        });

        return () => st.kill();
      }
    );

    return () => mm.revert();
  }, [mobileReveal, isMobile]);

  if (mobileReveal && isMobile) {
    const Tag = as;
    return (
      <Tag
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={elRef as any}
        data-mobile-reveal={mobileReveal}
        className={cn(className)}
        style={style as CSSProperties}
      >
        {children}
      </Tag>
    );
  }

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
