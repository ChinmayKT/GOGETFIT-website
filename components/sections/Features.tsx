"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { APP_SHOWCASE } from "@/lib/data";
import { SNAP_SECTIONS } from "@/components/animations/SnapScroll";
import DeviceFrame from "@/components/phone/DeviceFrame";
import { PhoneScreen, type ScreenKey } from "@/components/phone/screens";
import {
  Activity,
  UtensilsCrossed,
  Dumbbell,
  Droplets,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

const ICONS = [Activity, UtensilsCrossed, Dumbbell, Droplets, MessageCircle, TrendingUp];
const FEATURES_IDX = (SNAP_SECTIONS as readonly string[]).indexOf("features");

/** Subtle staging: each device slightly turned, never enough to hurt readability. */
const STAGE_POSE = [
  "perspective(1600px) rotateY(5deg) rotateZ(-1.2deg)",
  "perspective(1600px) rotateY(1.5deg)",
  "perspective(1600px) rotateY(-4deg) rotateZ(0.6deg)",
  "perspective(1600px) rotateY(4deg) rotateZ(-0.6deg)",
  "perspective(1600px) rotateY(-1.5deg)",
  "perspective(1600px) rotateY(-5deg) rotateZ(1.2deg)",
];

/**
 * "Inside the App" — six real app screens on six devices, visible at once.
 * No stepper, no timers: everything readable in one glance. GSAP center-out
 * entrance runs on every snap into the section; the persistent floating
 * phone hides itself while this stage is active (see FloatingPhone).
 */
export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Entrance choreography + idle float + stage parallax (desktop, motion-safe)
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const header = section.querySelectorAll("[data-showcase-header] > *");
      const phones = gsap.utils.toArray<HTMLElement>("[data-showcase-item]");
      const floats = gsap.utils.toArray<HTMLElement>("[data-float]");
      let tl: gsap.core.Timeline | null = null;
      let prevIdx = -1;

      const labelOf = (a: HTMLElement) => a.querySelector<HTMLElement>("[data-label]");
      const floatOf = (a: HTMLElement) => a.querySelector<HTMLElement>("[data-float]");
      const reflOf = (a: HTMLElement) => a.querySelector<HTMLElement>("[data-refl]");

      /**
       * Rotating left→right wave, timed to the hero phone's landing.
       * The traveler becomes #1 (down) / #6 (up); after a small rim-light
       * pulse each following device rotates out of its neighbour —
       * side-facing on the hero's side, turning toward the camera while it
       * travels into its slot. Position/opacity live on the article, the
       * Y-rotation on the device layer, so the app screen is revealed by the
       * physical turn itself. Labels + orange floor light ride the wave.
       */
      const play = (dir: 1 | -1) => {
        tl?.kill();
        const heroIdx = dir > 0 ? 0 : phones.length - 1;
        const hero = phones[heroIdx];
        const rest = dir > 0 ? phones.slice(1) : phones.slice(0, -1).reverse();

        gsap.set(phones, { opacity: 0, x: 0, y: 0, scale: 1 });
        gsap.set(floats, { opacity: 1, rotationY: 0, rotationZ: 0 });
        gsap.set(phones.map(labelOf), { opacity: 0, y: 10 });
        gsap.set(phones.map(reflOf), { opacity: 1, scaleX: 1 });

        const t = gsap.timeline();
        tl = t;
        t.fromTo(
          header,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" },
          0
        );

        // hero slot fills the instant the traveling phone lands on it
        t.set(hero, { opacity: 1 }, 1.05);
        t.to(labelOf(hero), { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 1.1);
        // orange energy pulse that kicks off the wave
        t.fromTo(
          reflOf(hero),
          { opacity: 0.4, scaleX: 0.7 },
          { opacity: 1, scaleX: 1.35, duration: 0.28, ease: "power2.out" },
          1.05
        ).to(reflOf(hero), { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, 1.35);

        const WAVE = 1.28; // wave start — right after the pulse
        const EACH = 0.16;
        const DUR = 0.85;

        rest.forEach((article, i) => {
          const at = WAVE + i * EACH;
          const float = floatOf(article);
          // article carries the arc: from the neighbour's side, low + small
          t.fromTo(
            article,
            { opacity: 0, x: dir > 0 ? -120 : 120, y: 26, scale: 0.9 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: DUR,
              ease: "power3.out",
              immediateRender: false,
            },
            at
          );
          // device layer carries the turn: side-facing → front-facing
          t.fromTo(
            float,
            {
              rotationY: dir > 0 ? -65 : 65,
              rotationZ: dir > 0 ? -6 : 6,
              transformPerspective: 1200,
            },
            {
              rotationY: 0,
              rotationZ: 0,
              duration: DUR,
              ease: "power3.out",
              immediateRender: false,
            },
            at
          );
          // rim/floor light activates as the phone turns toward the viewer
          t.fromTo(
            reflOf(article),
            { opacity: 0.15, scaleX: 0.7 },
            { opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.out", immediateRender: false },
            at + DUR * 0.35
          );
          // label lands once the screen is readable (~60% of the turn)
          t.to(
            labelOf(article),
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            at + DUR * 0.6
          );
        });
      };

      const onSnap = (e: Event) => {
        const idx = (e as CustomEvent<number>).detail;
        const dir: 1 | -1 = prevIdx === -1 || idx >= prevIdx ? 1 : -1;
        const cameFrom = prevIdx;
        prevIdx = idx;
        if (idx !== FEATURES_IDX) return;
        if (cameFrom === -1) return; // reload straight into section — stay static
        play(dir);
      };
      window.addEventListener("snap:section", onSnap);

      // Exit handoff: the hero device hides (the traveler takes its place in
      // the same frame) and the rest collapse away from the hero — rotating
      // back to side-facing while sliding toward it, far side first.
      const onExit = (e: Event) => {
        const dir = (e as CustomEvent<number>).detail;
        tl?.kill();
        gsap.set(phones, { opacity: 1, x: 0, y: 0, scale: 1 });
        gsap.set(floats, { opacity: 1, rotationY: 0, rotationZ: 0 });
        gsap.set(phones.map(labelOf), { opacity: 1, y: 0 });
        const heroIdx = dir > 0 ? phones.length - 1 : 0;
        const heroFloat = floatOf(phones[heroIdx]);
        if (heroFloat) gsap.set(heroFloat, { opacity: 0 });

        // farthest-from-hero collapses first, wave travels toward the hero
        const rest = phones.filter((_, i) => i !== heroIdx);
        const ordered = dir > 0 ? rest : rest.slice().reverse();
        ordered.forEach((article, i) => {
          const at = i * 0.06;
          gsap.to(article, {
            opacity: 0,
            x: dir > 0 ? 90 : -90,
            scale: 0.93,
            duration: 0.55,
            ease: "power2.in",
            delay: at,
          });
          gsap.to(floatOf(article), {
            rotationY: dir > 0 ? 55 : -55,
            duration: 0.55,
            ease: "power2.in",
            delay: at,
          });
        });
      };
      window.addEventListener("showcase:exit", onExit);

      // near-imperceptible idle float on a dedicated wrapper — never the
      // entrance-animated article, so the two can't fight over `y`
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
        gsap.to(el, {
          y: 3,
          duration: 2.8 + i * 0.35,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.4,
        });
      });

      // whole stage drifts a few px with the cursor — one product display
      const qx = gsap.quickTo(stage, "x", { duration: 1, ease: "power3.out" });
      const qy = gsap.quickTo(stage, "y", { duration: 1, ease: "power3.out" });
      const onMove = (e: MouseEvent) => {
        qx((e.clientX / window.innerWidth - 0.5) * 10);
        qy((e.clientY / window.innerHeight - 0.5) * 6);
      };
      window.addEventListener("mousemove", onMove);

      return () => {
        window.removeEventListener("snap:section", onSnap);
        window.removeEventListener("showcase:exit", onExit);
        window.removeEventListener("mousemove", onMove);
        tl?.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-24 lg:h-screen lg:min-h-[100svh] lg:overflow-hidden lg:pt-24 lg:pb-4"
    >
      {/* Stage glow — light rising off the product floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh]"
        style={{
          background:
            "radial-gradient(ellipse 75% 100% at 50% 100%, rgba(255,106,0,0.16), transparent 70%)",
        }}
      />

      {/* Header */}
      <div data-showcase-header className="relative mx-auto max-w-6xl text-center">
        <p className="text-xs font-semibold tracking-[0.35em] text-primary uppercase">
          Inside the App
        </p>
        <h2 className="headline text-gradient-silver mt-4 text-4xl md:text-5xl xl:text-6xl lg:whitespace-nowrap">
          Everything you need, all in one place.
        </h2>
        <p className="mt-4 text-base text-silver-dim md:text-lg">
          Powerful tools. Real coaches. Real results.
        </p>
      </div>

      {/* Six-device stage — desktop row / mobile swipe */}
      <div
        ref={stageRef}
        className="app-stage no-scrollbar relative mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-2 lg:mt-8 lg:snap-none lg:justify-center lg:gap-[1.6vw] lg:overflow-visible"
      >
        {APP_SHOWCASE.map((f, i) => {
          const Icon = ICONS[i];
          return (
            <article
              key={f.id}
              data-showcase-item
              aria-label={f.alt}
              className="w-[72vw] shrink-0 snap-center sm:w-[46vw] md:w-[30vw] lg:w-[11.8vw] lg:min-w-0"
            >
              {/* Floating label */}
              <div data-label className="flex items-start gap-2.5 px-1">
                <span className="glass shrink-0 rounded-xl p-2 text-primary">
                  <Icon size={15} strokeWidth={2} />
                </span>
                <div>
                  <h3 className="app-title text-sm font-semibold text-white transition-colors duration-300">
                    {i + 1}. {f.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-white/60">
                    {f.desc}
                  </p>
                </div>
              </div>

              {/* Device */}
              <div
                className="app-phone mt-4"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  data-float
                  data-stage-phone={f.id}
                  style={{ transformStyle: "preserve-3d" }}
                >
                <div style={{ transform: STAGE_POSE[i], transformStyle: "preserve-3d" }}>
                  <DeviceFrame className="w-full">
                    <div
                      className="h-full w-full"
                      style={{
                        background:
                          "linear-gradient(160deg, #101014 0%, #0a0a0c 60%, #16100b 100%)",
                      }}
                    >
                      <PhoneScreen screen={f.screen as ScreenKey} />
                    </div>
                  </DeviceFrame>
                </div>
                </div>
                {/* floor reflection */}
                <div
                  data-refl
                  aria-hidden
                  className="mx-auto mt-3 h-3 w-3/4 rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse, rgba(255,106,0,0.25), transparent 70%)",
                    filter: "blur(6px)",
                  }}
                />
              </div>
            </article>
          );
        })}
      </div>

      {/* Mobile pagination hint */}
      <p className="mt-6 text-center text-xs tracking-[0.3em] text-silver-dim lg:hidden">
        SWIPE · 01 / 06
      </p>
    </section>
  );
}
