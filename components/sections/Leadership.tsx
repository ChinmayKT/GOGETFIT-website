"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { LEADERSHIP } from "@/lib/data";
import { SNAP_SECTIONS } from "@/components/animations/SnapScroll";

const LEADERSHIP_IDX = (SNAP_SECTIONS as readonly string[]).indexOf("leadership");

/**
 * Leadership — heading commands the top; four executive portraits sit
 * left/center below it, the persistent phone keeps its right-side journey
 * (outer 30% zone, pose owned by the global choreography). On section
 * entry the portraits unveil left→right with a curtain reveal; role, then
 * name, follow each portrait. Restrained, executive motion only.
 */
export default function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const header = section.querySelectorAll("[data-lead-header] > *");
      const cards = gsap.utils.toArray<HTMLElement>("[data-lead-card]");
      const grid = section.querySelector<HTMLElement>(".lead-grid");
      let tl: gsap.core.Timeline | null = null;
      let prevIdx = -1;

      // deck order: nearest to the phone first — Director, CTO, CEO, Founder
      const dealOrder = [...cards].reverse();
      const ROT_Z = [5, -3, 3, -4];

      /** Stack origin: just left of the phone body (phone center sits at 83vw). */
      const originX = () => window.innerWidth * 0.83 - 205;

      /**
       * Deck deal: all four cards start stacked edge-on behind the phone's
       * left edge, then spread right→left one after another — overlapping
       * mid-flight, arcing slightly, rotating from edge-on to front-facing —
       * and land exactly on their untouched DOM positions (transforms → 0).
       */
      const play = () => {
        tl?.kill();
        grid?.classList.add("is-dealing"); // suspend hover + pointer while moving
        const ox = originX();

        dealOrder.forEach((card, i) => {
          const r = card.getBoundingClientRect();
          // rect may carry a previous transform — anchor on layout position
          const cx = r.left + r.width / 2 - Number(gsap.getProperty(card, "x"));
          gsap.set(card, {
            x: ox - cx,
            y: 26,
            rotationY: -38,
            rotationZ: ROT_Z[i],
            scale: 0.85,
            opacity: 0,
            zIndex: 30 - i, // earlier cards sit on top of the ones still stacked
            transformPerspective: 1200,
            boxShadow: "-18px 12px 30px rgba(0,0,0,0.55)",
          });
        });

        const t = gsap.timeline({
          onComplete: () => {
            gsap.set(cards, { clearProps: "zIndex,boxShadow" });
            grid?.classList.remove("is-dealing");
          },
        });
        tl = t;

        t.fromTo(
          header,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power3.out" },
          0
        );

        dealOrder.forEach((card, i) => {
          const at = 0.45 + i * 0.16;
          t.to(card, { opacity: 1, duration: 0.28, ease: "power1.out" }, at);
          // horizontal spread + un-rotation toward the viewer
          t.to(
            card,
            {
              x: 0,
              rotationY: 0,
              rotationZ: 0,
              scale: 1,
              boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
              duration: 1.1,
              ease: "power3.out",
            },
            at
          );
          // subtle arc: lift outward from the phone, then settle down
          t.to(card, { y: -14, duration: 0.5, ease: "power2.out" }, at).to(
            card,
            { y: 0, duration: 0.6, ease: "power2.inOut" },
            at + 0.5
          );
        });
      };

      /** Reverse-up exit: cards collapse left→right back into the phone. */
      const collapse = () => {
        tl?.kill();
        grid?.classList.add("is-dealing");
        const ox = originX();
        // Founder first, wave travels toward the phone
        cards.forEach((card, i) => {
          const r = card.getBoundingClientRect();
          const cx = r.left + r.width / 2 - Number(gsap.getProperty(card, "x"));
          gsap.to(card, {
            x: ox - cx,
            y: 26,
            rotationY: -38,
            rotationZ: ROT_Z[3 - i],
            scale: 0.85,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
            delay: i * 0.06,
          });
        });
      };

      const onSnap = (e: Event) => {
        const idx = (e as CustomEvent<number>).detail;
        const from = prevIdx;
        prevIdx = idx;
        if (idx === LEADERSHIP_IDX) {
          if (from === -1) return; // direct reload into section — stay static
          play();
        } else if (from === LEADERSHIP_IDX && idx < LEADERSHIP_IDX) {
          collapse();
        }
      };
      window.addEventListener("snap:section", onSnap);
      return () => {
        window.removeEventListener("snap:section", onSnap);
        tl?.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="leadership"
      ref={sectionRef}
      className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-28 lg:h-screen lg:min-h-[100svh] lg:justify-start lg:overflow-hidden lg:py-0 lg:pt-[12vh]"
    >
      {/* Header — commands the top so the row below gets full width */}
      <div
        data-lead-header
        className="mx-auto w-full max-w-[1440px] text-center lg:pr-[30%] lg:text-left"
      >
        <p className="text-xs font-semibold tracking-[0.35em] text-primary uppercase">
          Leadership
        </p>
        <h2 className="headline mt-4 text-4xl md:text-5xl xl:text-[3.4rem] lg:whitespace-nowrap">
          <span className="text-gradient-silver">The people behind the</span>{" "}
          <span className="text-gradient-orange">transformation.</span>
        </h2>
      </div>

      {/* Portraits left / persistent phone zone right (outer 30%) */}
      <div className="mx-auto mt-12 w-full max-w-[1440px] lg:mt-[3.5vh] lg:pr-[30%]">
        <div className="lead-grid grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-[1.2vw]">
          {LEADERSHIP.map((m) => (
            /* frameless portrait panel — image fills everything, role + name
               overlaid inside the lower area, orange floor light beneath */
            /* portrait panel + plain text below it — no card around the text */
            <article key={m.id} data-lead-card className="lead-card">
              <div
                data-lead-img
                className="relative w-full overflow-hidden rounded-2xl border border-white/[0.07]"
                style={{
                  aspectRatio: "1/2",
                  boxShadow: "0 30px 60px -18px rgba(255,106,0,0.16)",
                }}
              >
                <Image
                  src={m.image}
                  alt={m.alt}
                  fill
                  sizes="(min-width: 1024px) 18vw, 45vw"
                  className="lead-photo object-cover"
                  style={m.objectPosition ? { objectPosition: m.objectPosition } : undefined}
                />
                {/* orange floor light on the portrait's bottom edge */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,106,0,0.55), transparent)",
                  }}
                />
              </div>
              <div data-lead-label className="pt-4">
                <p className="text-[10px] font-semibold tracking-[0.3em] text-primary uppercase">
                  {m.role}
                </p>
                <h3 className="lead-name headline mt-1.5 text-xl text-white/95 lg:text-2xl">
                  {m.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
