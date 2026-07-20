"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { QUERY_DESKTOP } from "@/lib/breakpoints";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll infrastructure:
 * - Desktop (motion-safe): the SnapScroll system owns the wheel and tweens
 *   the viewport itself — Lenis is NOT initialized (it would fight the
 *   Observer). ScrollTrigger updates from native scroll events.
 * - Mobile / reduced-motion: natural scrolling, smoothed by Lenis on touch
 *   devices, with ScrollTrigger wired into its raf loop.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { isDesktop: QUERY_DESKTOP, reduced: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { isDesktop, reduced } = context.conditions as {
          isDesktop: boolean;
          reduced: boolean;
        };
        // Snap mode owns desktop scrolling; reduced-motion users get native scroll.
        if (isDesktop || reduced) return;

        const lenis = new Lenis({
          lerp: 0.09,
          wheelMultiplier: 1,
          touchMultiplier: 1.4,
        });

        lenis.on("scroll", ScrollTrigger.update);

        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        return () => {
          gsap.ticker.remove(raf);
          lenis.destroy();
        };
      }
    );
    return () => mm.revert();
  }, []);

  return <>{children}</>;
}
