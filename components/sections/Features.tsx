"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { APP_SHOWCASE } from "@/lib/data";
import { SNAP_SECTIONS } from "@/components/animations/SnapScroll";
import { QUERY_DESKTOP } from "@/lib/breakpoints";
import { cn } from "@/lib/utils";
import DeviceFrame from "@/components/phone/DeviceFrame";
import { PhoneScreen, type ScreenKey } from "@/components/phone/screens";
import Reveal from "@/components/shared/Reveal";
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

    const mm = gsap.matchMedia();
    mm.add(
      { isDesktop: QUERY_DESKTOP, reduced: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { isDesktop, reduced } = context.conditions as {
          isDesktop: boolean;
          reduced: boolean;
        };
        if (!isDesktop || reduced) return;

        const ctx = gsap.context(() => {
      const header = section.querySelectorAll("[data-showcase-header] > *");
      const phones = gsap.utils.toArray<HTMLElement>("[data-showcase-item]");
      const floats = gsap.utils.toArray<HTMLElement>("[data-float]");
      let tl: gsap.core.Timeline | null = null;
      let prevIdx = -1;

      // Labels live in their own row now (not nested under the phone article),
      // so they're paired with their phone by the shared data-id instead of
      // DOM descendance.
      const labelById = new Map(
        gsap.utils.toArray<HTMLElement>("[data-label]").map((el) => [el.dataset.id, el])
      );
      const labelOf = (a: HTMLElement) => labelById.get(a.dataset.id) ?? null;
      const floatOf = (a: HTMLElement) => a.querySelector<HTMLElement>("[data-float]");

      /**
       * Rotating left→right wave, timed to the hero phone's landing.
       * The traveler becomes #1 (down) / #6 (up); each following
       * device rotates out of its neighbour —
       * side-facing on the hero's side, turning toward the camera while it
       * travels into its slot. Position/opacity live on the article, the
       * Y-rotation on the device layer, so the app screen is revealed by the
       * physical turn itself. Labels ride the wave.
       */
      const play = (dir: 1 | -1) => {
        tl?.kill();
        const heroIdx = dir > 0 ? 0 : phones.length - 1;
        const hero = phones[heroIdx];
        const rest = dir > 0 ? phones.slice(1) : phones.slice(0, -1).reverse();

        gsap.set(phones, { opacity: 0, x: 0, y: 0, scale: 1 });
        gsap.set(floats, { opacity: 1, rotationY: 0, rotationZ: 0 });
        gsap.set(phones.map(labelOf), { opacity: 0, y: 10 });

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
        const WAVE = 1.28; // wave start
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
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 py-24 lg:h-screen lg:justify-center-safe lg:overflow-hidden lg:pt-[88px] lg:pb-4 lg-short:pt-20"
    >
      {/* Header */}
      <div data-showcase-header className="relative mx-auto max-w-6xl text-center">
        <p className="eyebrow justify-center">
          One Platform. Endless Possibilities.
        </p>
        <h2 className="headline mt-4 text-4xl text-balance md:text-5xl lg:text-4xl xl:text-5xl lg-short:mt-3 lg-short:text-[2.1rem]">
          Everything you need to build a healthier lifestyle—powered by science, personalized for you.
        </h2>
        <p className="mt-4 text-base text-silver-dim md:text-lg 2xl:text-xl lg-short:mt-2">
          Powerful tools. Real coaches. Real results.
        </p>
      </div>

      {/* Six-device stage — desktop only. Tablet/mobile get their own
          non-carousel layouts below (see APP_SHOWCASE.map blocks). Labels and
          phones are two separate rows (not stacked per column) so a longer
          description never pushes its phone out of line with the rest —
          the phones row always starts straight regardless of label height. */}
      <div
        ref={stageRef}
        className="app-stage no-scrollbar relative mt-10 hidden snap-x snap-mandatory gap-6 overflow-x-auto px-2 lg:mt-6 lg:flex lg:flex-col lg-short:mt-4 lg-short:gap-3 lg:snap-none lg:overflow-visible"
      >
        {/* Labels row */}
        <div className="hidden lg:flex lg:justify-center lg:gap-[1.6vw]">
          {APP_SHOWCASE.map((f, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={f.id}
                data-label
                data-id={f.id}
                className="flex w-[13.5vw] items-start gap-2.5 px-1"
              >
                <span className="glass shrink-0 rounded-xl p-2 text-silver">
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
            );
          })}
        </div>

        {/* Phones row — straight baseline, independent of label height above */}
        <div className="flex justify-center gap-[1.6vw] overflow-visible lg:mt-4 lg-short:mt-0">
          {APP_SHOWCASE.map((f, i) => {
            return (
              <article
                key={f.id}
                data-showcase-item
                data-id={f.id}
                aria-label={f.alt}
                className="w-[72vw] shrink-0 snap-center sm:w-[46vw] md:w-[30vw] lg:w-[13.5vw] lg:min-w-0"
              >
                <div className="app-phone lg:mx-auto lg:w-[min(100%,22vh)] lg-short:w-[min(100%,17vh)]" style={{ transformStyle: "preserve-3d" }}>
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
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Tablet — alternating text | phone rows, simple reveal, no carousel */}
      <div className="mt-10 hidden flex-col gap-16 md:flex lg:hidden">
        {APP_SHOWCASE.map((f, i) => {
          const Icon = ICONS[i];
          const reverse = i % 2 === 1;
          return (
            <div
              key={f.id}
              className={cn("flex items-center gap-10", reverse && "flex-row-reverse")}
            >
              <Reveal className="flex-1">
                <span className="glass inline-flex shrink-0 rounded-xl p-2 text-silver">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <h3 className="app-title mt-3 text-lg font-semibold text-white">
                  {i + 1}. {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                  {f.desc}
                </p>
              </Reveal>
              <Reveal delay={0.1} className="flex flex-1 justify-center">
                <DeviceFrame className="w-[clamp(200px,62vw,260px)]">
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
              </Reveal>
            </div>
          );
        })}
      </div>

      {/* Mobile — fully vertical, one feature per screen, simple reveal, native scroll */}
      <div className="mt-10 flex flex-col gap-16 md:hidden">
        {APP_SHOWCASE.map((f, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal
              key={f.id}
              className="flex flex-col items-center gap-5 text-center"
            >
              <span className="glass inline-flex shrink-0 rounded-xl p-2 text-silver">
                <Icon size={18} strokeWidth={2} />
              </span>
              <div>
                <h3 className="app-title text-lg font-semibold text-white">
                  {i + 1}. {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                  {f.desc}
                </p>
              </div>
              <DeviceFrame className="w-[clamp(200px,62vw,260px)]">
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
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
