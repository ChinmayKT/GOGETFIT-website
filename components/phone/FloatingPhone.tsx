"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import DeviceFrame from "./DeviceFrame";
import { PhoneScreen, type ScreenKey } from "./screens";
import { SNAP_SECTIONS } from "@/components/animations/SnapScroll";
import { useIsDesktop } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

/** Base device width in px — showcase scale is derived against this. */
const DEVICE_W = 340;

/** Phone pose per section. x = vw offset from center (±33 → centers at 17%/83%). */
const POSES: Record<
  string,
  { x: number; y: number; rotate: number; rotateY: number; scale: number; screen: ScreenKey | null }
> = {
  hero: { x: 33, y: 2, rotate: -2, rotateY: -9, scale: 1, screen: "dashboard" },
  about: { x: -33, y: 0, rotate: 2, rotateY: 9, scale: 0.88, screen: "onboarding" },
  coaches: { x: -33, y: 0, rotate: 2, rotateY: 8, scale: 0.9, screen: "coachProfile" },
  leadership: { x: 33, y: 2, rotate: -2, rotateY: -9, scale: 0.85, screen: "brand" },
  // transformations: phone lower-left beneath the headline (reference layout)
  transformations: { x: -33, y: 2, rotate: 2, rotateY: 8, scale: 0.9, screen: "gallery" },
  contact: { x: 33, y: 0, rotate: -1.5, rotateY: -8, scale: 0.92, screen: "booking" },
  // download: this phone becomes the LEFT / iOS device of the twin-device
  // reveal; a second (Android) phone lives entirely in DownloadCta and
  // materializes to its right. Angled outward to fan away from Android.
  // download is the FINAL pose — the phone journey ends here, never
  // traveling into the footer (see FOOTER_IDX handling below).
  download: { x: 5, y: -3, rotate: -6, rotateY: 14, scale: 0.8, screen: "qr" },
};

const FEAT_IDX = (SNAP_SECTIONS as readonly string[]).indexOf("features");
const DOWNLOAD_IDX = (SNAP_SECTIONS as readonly string[]).indexOf("download");
const FOOTER_IDX = (SNAP_SECTIONS as readonly string[]).indexOf("footer");

/** Stage poses of showcase phones #1/#6 (must mirror STAGE_POSE in Features). */
const STAGE_ROT = {
  first: { rotY: 5, rotZ: -1.2, screen: "dashboard" as ScreenKey, id: "dashboard" },
  last: { rotY: -5, rotZ: 1.2, screen: "progress" as ScreenKey, id: "progress" },
};

/**
 * The ONE hero phone. Fixed at viewport center; snap navigation drives its
 * pose per section. At the "Inside the App" boundary it performs a measured
 * FLIP-style handoff: it flies onto showcase phone #1 (down) or #6 (up),
 * matching position/scale/rotation/screen, then swaps with the identical
 * DOM device in the same frame — one continuous phone, never two.
 */
export default function FloatingPhone() {
  const isDesktop = useIsDesktop();
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null); // section pose + travel
  const tiltRef = useRef<HTMLDivElement>(null); // mouse tilt
  const spinRef = useRef<HTMLDivElement>(null); // rolls / idle showcase
  const breatheRef = useRef<HTMLDivElement>(null);
  const portalLayerRef = useRef<HTMLDivElement>(null);
  const [screen, setScreen] = useState<ScreenKey>("dashboard");
  const [coach, setCoach] = useState<{ name: string; portrait: boolean }>({
    name: "Arjun Mehta",
    portrait: true,
  });

  // Screen morph + coach identity requests from sections
  useEffect(() => {
    const onScreen = (e: Event) => setScreen((e as CustomEvent<ScreenKey>).detail);
    const onCoach = (e: Event) =>
      setCoach((e as CustomEvent<{ name: string; portrait: boolean }>).detail);
    window.addEventListener("phone:screen", onScreen);
    window.addEventListener("phone:coach", onCoach);
    return () => {
      window.removeEventListener("phone:screen", onScreen);
      window.removeEventListener("phone:coach", onCoach);
    };
  }, []);

  // Master choreography — snap-driven (single source of truth, no per-section
  // ScrollTriggers fighting the handoff travel)
  useEffect(() => {
    if (!isDesktop) return;
    const root = rootRef.current;
    const wrap = wrapRef.current;
    const tilt = tiltRef.current;
    const spin = spinRef.current;
    const breathe = breatheRef.current;
    if (!root || !wrap || !tilt || !spin || !breathe) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vw = () => window.innerWidth / 100;
    const vh = () => window.innerHeight / 100;
    let prev = -1;

    const setPose = (id: string, animate: boolean) => {
      const p = POSES[id];
      if (!p) return;
      const vars = {
        x: p.x * vw(),
        y: p.y * vh(),
        rotation: p.rotate,
        rotationY: p.rotateY,
        scale: p.scale,
        transformPerspective: 2000,
      };
      if (animate) {
        gsap.to(wrap, { ...vars, duration: 1.4, ease: "power3.out", overwrite: "auto" });
      } else {
        gsap.set(wrap, vars);
      }
      if (p.screen) setScreen(p.screen);
    };

    /** Measure a showcase phone's slot (the un-rotated float wrapper). */
    const measure = (which: "first" | "last") => {
      const el = document.querySelector<HTMLElement>(
        `[data-stage-phone="${STAGE_ROT[which].id}"]`
      );
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - window.innerWidth / 2,
        y: r.top + r.height / 2 - window.innerHeight / 2,
        scale: r.width / DEVICE_W,
      };
    };

    const calmMotionLayers = () => {
      breathe.style.animation = "none";
      gsap.killTweensOf(spin);
      gsap.set(spin, { rotationY: 0 });
      gsap.to(tilt, { rotationX: 0, rotationY: 0, duration: 0.35, overwrite: "auto" });
    };

    const barrelRoll = (dir: 1 | -1) => {
      const cur = Number(gsap.getProperty(spin, "rotationY")) || 0;
      const target =
        dir > 0 ? Math.ceil((cur + 1) / 360) * 360 : Math.floor((cur - 1) / 360) * 360;
      gsap.to(spin, {
        rotationY: target,
        duration: 2,
        ease: "sine.inOut",
        onComplete: () => gsap.set(spin, { rotationY: 0 }),
      });
    };

    /** Travel down/up INTO the showcase and become phone #1 / #6. */
    const enterShowcase = (dir: 1 | -1) => {
      const which = dir > 0 ? "first" : "last";
      calmMotionLayers();
      // let Features reset its stage (sync listener) before measuring
      requestAnimationFrame(() => {
        const t = measure(which);
        if (!t) {
          gsap.to(root, { autoAlpha: 0, duration: 0.5 });
          return;
        }
        // the slot is measured before the viewport tween: shift by the scroll
        // distance so the traveler lands where the slot WILL be on arrival
        const sec = document.getElementById("features");
        if (sec) t.y -= sec.offsetTop - window.scrollY;
        gsap.delayedCall(0.4, () => setScreen(STAGE_ROT[which].screen));
        gsap.to(wrap, {
          x: t.x,
          y: t.y,
          scale: t.scale,
          rotation: STAGE_ROT[which].rotZ,
          rotationY: STAGE_ROT[which].rotY,
          duration: 1.05,
          ease: "power4.inOut",
          overwrite: "auto",
          onComplete: () => {
            // pixel-identical device underneath — instant swap, no crossfade
            gsap.set(root, { autoAlpha: 0 });
            window.dispatchEvent(new CustomEvent("showcase:landed", { detail: dir }));
          },
        });
      });
    };

    /** Detach from phone #6 / #1 and travel to the next section's pose. */
    const exitShowcase = (idx: number, dir: 1 | -1) => {
      const which = dir > 0 ? "last" : "first";
      // Features normalizes its stage + hides the hero device (sync)
      window.dispatchEvent(new CustomEvent("showcase:exit", { detail: dir }));
      requestAnimationFrame(() => {
        const t = measure(which);
        const targetId = SNAP_SECTIONS[idx];
        if (t) {
          setScreen(STAGE_ROT[which].screen);
          gsap.set(wrap, {
            x: t.x,
            y: t.y,
            scale: t.scale,
            rotation: STAGE_ROT[which].rotZ,
            rotationY: STAGE_ROT[which].rotY,
            transformPerspective: 2000,
          });
        }
        gsap.set(root, { autoAlpha: 1 });
        const p = POSES[targetId];
        if (p) {
          // screen switches mid-journey, not at the moment of departure
          gsap.delayedCall(0.55, () => p.screen && setScreen(p.screen));
          gsap.to(wrap, {
            x: p.x * vw(),
            y: p.y * vh(),
            rotation: p.rotate,
            rotationY: p.rotateY,
            scale: p.scale,
            duration: 1.15,
            ease: "power4.inOut",
            overwrite: "auto",
            onComplete: () => {
              breathe.style.animation = "";
              gsap.set(root, { clearProps: "opacity,visibility" });
            },
          });
        }
      });
    };

    const onSnap = (e: Event) => {
      const idx = (e as CustomEvent<number>).detail;
      const from = prev;
      const dir: 1 | -1 = from === -1 || idx >= from ? 1 : -1;
      prev = idx;

      if (reduced) {
        gsap.set(root, { autoAlpha: idx === FEAT_IDX || idx === FOOTER_IDX ? 0 : 1 });
        if (idx !== FOOTER_IDX) setPose(SNAP_SECTIONS[idx], false);
        return;
      }

      // Download is the FINAL destination of the phone journey — the phone
      // never travels into the footer. Hide in place; unhide + repose
      // normally when scrolling back up (handled by the from===FOOTER_IDX
      // branch below).
      if (idx === FOOTER_IDX) {
        calmMotionLayers();
        gsap.to(root, { autoAlpha: 0, duration: 0.5, overwrite: "auto" });
        return;
      }

      if (idx === FEAT_IDX) {
        if (from === -1) {
          // reload directly into the showcase — phone stays hidden
          gsap.set(root, { autoAlpha: 0 });
          return;
        }
        enterShowcase(dir);
        return;
      }

      if (from === FEAT_IDX) {
        exitShowcase(idx, dir);
        return;
      }

      // Returning from the footer: the phone was hidden there (autoAlpha:0),
      // so a plain clearProps would snap it to full opacity instantly, right
      // as the upward scroll starts — visible well before the section is
      // back in view. Fade it in instead, matching AndroidPhone's own enter().
      if (from === FOOTER_IDX) {
        gsap.killTweensOf(root);
        gsap.set(root, { autoAlpha: 0 });
        breathe.style.animation = "";
        setPose(SNAP_SECTIONS[idx], true);
        // SnapScroll's own scroll+crossfade runs ~1.05s; stay fully hidden
        // through it so the phone never bleeds over the outgoing footer,
        // then fade in only once Download has essentially arrived.
        gsap.to(root, { autoAlpha: 1, duration: 0.6, ease: "power2.out", delay: 0.85 });
        return;
      }

      // normal section-to-section travel
      gsap.set(root, { clearProps: "opacity,visibility" });
      breathe.style.animation = "";
      setPose(SNAP_SECTIONS[idx], from !== -1);
      // no barrel roll into the twin-device reveal — it must arrive mostly
      // front-facing, never spinning, for the one-phone-becomes-two moment
      if (from !== -1 && idx !== DOWNLOAD_IDX) barrelRoll(dir);
    };

    window.addEventListener("snap:section", onSnap);

    // sections hold the phone during their own choreography (coach transfer):
    // breathing pauses so measured landings stay pixel-accurate
    const onHold = (e: Event) => {
      breathe.style.animationPlayState = (e as CustomEvent<boolean>).detail
        ? "paused"
        : "";
    };
    window.addEventListener("phone:hold", onHold);

    // scroll-velocity lean (works with tweened scroll too)
    const leanTo = gsap.quickTo(wrap, "rotationX", { duration: 0.6, ease: "power2.out" });
    const lean = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-3, 3, self.getVelocity() / 600);
        leanTo(-v);
      },
    });

    return () => {
      window.removeEventListener("snap:section", onSnap);
      window.removeEventListener("phone:hold", onHold);
      lean.kill();
      gsap.killTweensOf([wrap, spin, tilt, root]);
    };
  }, [isDesktop]);

  // Idle showcase spin: parked in a section for 2s → full 360°
  useEffect(() => {
    if (!isDesktop) return;
    const spin = spinRef.current;
    const root = rootRef.current;
    if (!spin || !root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout>;
    let spinning = false;
    let held = false; // sections can hold the spin during their own phone work
    // coaches: rotate once on landing only. transformations: the stream
    // measures anchors inside the screen — a spinning phone would flip them.
    // download: this phone is one half of a twin-device product shot — no
    // spinning, only the ±1deg idle sway allowed for a showcase device.
    let inCalmSection = false;

    const calmIdxs = ["coaches", "transformations", "download"].map((id) =>
      (SNAP_SECTIONS as readonly string[]).indexOf(id)
    );
    const onSection = (e: Event) => {
      inCalmSection = calmIdxs.includes((e as CustomEvent<number>).detail);
    };
    window.addEventListener("snap:section", onSection);

    const doSpin = () => {
      if (held || inCalmSection || getComputedStyle(root).visibility === "hidden") {
        arm();
        return;
      }
      spinning = true;
      gsap.to(spin, {
        rotationY: 360,
        duration: 3.4,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(spin, { rotationY: 0 });
          spinning = false;
          arm();
        },
      });
    };

    const arm = () => {
      clearTimeout(timer);
      timer = setTimeout(doSpin, 2000);
    };

    const onScroll = () => {
      if (!spinning) arm();
    };

    const onHold = (e: Event) => {
      held = (e as CustomEvent<boolean>).detail;
      if (held) {
        clearTimeout(timer);
        if (spinning) {
          gsap.killTweensOf(spin);
          gsap.to(spin, { rotationY: 0, duration: 0.25, overwrite: true });
          spinning = false;
        }
      } else {
        arm();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("phone:hold", onHold);
    arm();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("phone:hold", onHold);
      window.removeEventListener("snap:section", onSection);
      gsap.killTweensOf(spin);
      gsap.set(spin, { rotationY: 0 });
    };
  }, [isDesktop]);

  // Transformation portal — Phase A: on each stream emission a mini story
  // card appears INSIDE the clipped screen and slides out through its right
  // edge (duration matches the world card's delayed launch).
  useEffect(() => {
    if (!isDesktop) return;
    const layer = portalLayerRef.current;
    if (!layer) return;

    const onPortal = (e: Event) => {
      const { image, result } = (e as CustomEvent<{ image: string; result: string }>)
        .detail;
      const mini = document.createElement("div");
      mini.className = "absolute overflow-hidden rounded-xl border border-white/15";
      mini.style.cssText =
        "width:30%;aspect-ratio:3/4;left:55%;top:46%;transform:translate(-50%,-50%) scale(0.6);opacity:0;box-shadow:0 8px 20px rgba(0,0,0,.5)";
      mini.innerHTML = `
        <img src="${image}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />
        <span style="position:absolute;left:0;right:0;bottom:0;padding:6px 8px;font-size:11px;font-weight:700;color:#FF8A3D;background:linear-gradient(180deg,transparent,rgba(8,8,8,.9))">${result}</span>`;
      layer.appendChild(mini);
      gsap
        .timeline({ onComplete: () => mini.remove() })
        .to(mini, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" })
        .to(mini, { left: "128%", duration: 0.75, ease: "power1.in" }, 0.25);
    };
    window.addEventListener("tstream:portal", onPortal);
    return () => window.removeEventListener("tstream:portal", onPortal);
  }, [isDesktop]);

  // Mouse-reactive 3D tilt
  useEffect(() => {
    if (!isDesktop) return;
    const tilt = tiltRef.current;
    if (!tilt) return;

    const rotX = gsap.quickTo(tilt, "rotationX", { duration: 0.9, ease: "power3.out" });
    const rotY = gsap.quickTo(tilt, "rotationY", { duration: 0.9, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      rotY(nx * 4);
      rotX(-ny * 3);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 hidden items-center justify-center lg:flex"
      style={{ perspective: 1400 }}
    >
      <div
        ref={wrapRef}
        className="will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div ref={tiltRef} style={{ transformStyle: "preserve-3d" }}>
          <div
            ref={spinRef}
            data-phone-spin
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              ref={breatheRef}
              className="breathe"
              style={{ transformStyle: "preserve-3d" }}
            >
              <DeviceFrame>
                {/* Morph transition — scale + blur, never a plain fade */}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={
                      screen === "chat" || screen === "coachIntro"
                        ? `${screen}-${coach.name}`
                        : screen
                    }
                    initial={{ scale: 1.15, opacity: 0, filter: "blur(14px)", y: 24 }}
                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, filter: "blur(10px)", y: -18 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full"
                    style={{
                      background:
                        "linear-gradient(160deg, #101014 0%, #0a0a0c 60%, #16100b 100%)",
                    }}
                  >
                    <PhoneScreen
                      screen={screen}
                      coachName={coach.name}
                      coachPortraitVisible={coach.portrait}
                    />
                  </motion.div>
                </AnimatePresence>
                {/* Transformation Stream portal — Phase A lives INSIDE the
                    clipped screen: a mini story card appears in the app and
                    slides out through the right screen edge. Anchors below
                    are measured live (3D pose baked in) by the stream. */}
                <div
                  ref={portalLayerRef}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[15] overflow-hidden"
                />
                <span
                  data-portal-spawn
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{ left: "55%", top: "46%", width: 2, height: 2 }}
                />
                <span
                  data-portal-exit
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{ left: "100%", top: "50%", width: 2, height: 2 }}
                />
              </DeviceFrame>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Sections call this to morph the phone screen. */
export function setPhoneScreen(screen: ScreenKey) {
  window.dispatchEvent(new CustomEvent("phone:screen", { detail: screen }));
}

/** Set the coach identity shown by coach-aware screens (chat, coachIntro). */
export function setPhoneCoach(name: string, portrait = true) {
  window.dispatchEvent(
    new CustomEvent("phone:coach", { detail: { name, portrait } })
  );
}

/** Pause/resume the idle 360° spin while a section drives its own phone moment. */
export function holdPhone(held: boolean) {
  window.dispatchEvent(new CustomEvent("phone:hold", { detail: held }));
}
