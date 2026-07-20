"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { QUERY_DESKTOP } from "@/lib/breakpoints";

gsap.registerPlugin(Observer, ScrollToPlugin);

/** Snap destinations, in order. Footer rides along as the final chapter. */
export const SNAP_SECTIONS = [
  "hero",
  "about",
  "features",
  "coaches",
  "leadership",
  "transformations",
  "contact",
  "download",
  "footer",
] as const;

/** Post-transition quiet window so trackpad inertia can't chain-skip. */
const COOLDOWN_MS = 450;

/**
 * Keynote-style section navigation (desktop only, motion-safe only):
 * one deliberate wheel/touch gesture = exactly one section. GSAP Observer
 * intercepts input, a scroll lock rejects gestures mid-flight, and the
 * viewport tweens to the target section while the outgoing/incoming
 * sections get a subtle cinematic fade + scale. Mobile keeps native scroll.
 */
export default function SnapScroll() {
  const goToRef = useRef<(idx: number) => void>(() => {});

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { isDesktop: QUERY_DESKTOP, reduced: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { isDesktop, reduced } = context.conditions as {
          isDesktop: boolean;
          reduced: boolean;
        };
        if (!isDesktop || reduced) return;

        const els = SNAP_SECTIONS.map((id) => document.getElementById(id)).filter(
          Boolean
        ) as HTMLElement[];
        if (els.length < 2) return;

    const s = { current: 0, animating: false, unlockAt: 0 };

    // resync on reload mid-page
    const y = window.scrollY;
    s.current = els.reduce(
      (best, el, i) =>
        Math.abs(el.offsetTop - y) < Math.abs(els[best].offsetTop - y) ? i : best,
      0
    );
    // announce the starting section (next frame, once listeners are mounted)
    const rafId = requestAnimationFrame(() =>
      window.dispatchEvent(new CustomEvent("snap:section", { detail: s.current }))
    );

    // Self-heal against late browser scroll restoration: on a back/forward
    // navigation the browser can restore scrollY *after* this effect's
    // initial read above, leaving s.current stuck on the wrong section (the
    // phone/footer never re-sync since nothing else here watches native
    // scroll). Any native scroll while not mid-snap corrects it.
    const resync = () => {
      if (s.animating) return;
      const y = window.scrollY;
      const nearest = els.reduce(
        (best, el, i) =>
          Math.abs(el.offsetTop - y) < Math.abs(els[best].offsetTop - y) ? i : best,
        0
      );
      if (nearest !== s.current) {
        s.current = nearest;
        window.dispatchEvent(new CustomEvent("snap:section", { detail: nearest }));
      }
    };
    window.addEventListener("scroll", resync, { passive: true });

    const goTo = (idx: number) => {
      const target = gsap.utils.clamp(0, els.length - 1, idx);
      if (s.animating || target === s.current) return;
      const fromEl = els[s.current];
      const toEl = els[target];
      s.animating = true;
      s.current = target;
      window.dispatchEvent(
        new CustomEvent("snap:section", { detail: target })
      );

      gsap
        .timeline({
          onComplete: () => {
            gsap.set([fromEl, toEl], { clearProps: "opacity,transform" });
            s.animating = false;
            s.unlockAt = performance.now() + COOLDOWN_MS;
          },
        })
        .to(fromEl, { opacity: 0.3, scale: 0.985, duration: 0.4, ease: "power2.in" }, 0)
        .to(
          window,
          // offsetTop, not the element: the entry scale transform shifts its
          // rect and would land the scroll a few px off target
          { scrollTo: { y: toEl.offsetTop, autoKill: false }, duration: 1.05, ease: "power4.inOut" },
          0
        )
        .fromTo(
          toEl,
          { opacity: 0.3, scale: 0.985 },
          { opacity: 1, scale: 1, duration: 0.65, ease: "power3.out" },
          0.45
        );
    };
    goToRef.current = goTo;

    const step = (dir: 1 | -1) => {
      if (s.animating || performance.now() < s.unlockAt) return;
      goTo(s.current + dir);
    };

    // Observer: positive wheel delta (scrolling down) fires onDown => next
    const obs = Observer.create({
      target: window,
      type: "wheel,touch",
      onDown: () => step(1),
      onUp: () => step(-1),
      tolerance: 12,
      preventDefault: true,
      allowClicks: true,
    });

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          step(1);
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          step(-1);
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(els.length - 1);
          break;
      }
    };
    window.addEventListener("keydown", onKey);

    // Route in-page anchor clicks (navbar, CTAs) through the snap system
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const idx = (SNAP_SECTIONS as readonly string[]).indexOf(
        a.getAttribute("href")!.slice(1)
      );
      if (idx === -1) return;
      e.preventDefault();
      goTo(idx);
    };
    document.addEventListener("click", onClick);

        return () => {
          cancelAnimationFrame(rafId);
          obs.kill();
          window.removeEventListener("scroll", resync);
          window.removeEventListener("keydown", onKey);
          document.removeEventListener("click", onClick);
          gsap.killTweensOf(window);
        };
      }
    );
    return () => mm.revert();
  }, []);

  // Pure orchestration — no visible UI. Section state travels via the
  // snap:section CustomEvent; goToRef exists only for potential future
  // programmatic navigation (e.g. a re-added indicator or dev tooling).
  return null;
}
