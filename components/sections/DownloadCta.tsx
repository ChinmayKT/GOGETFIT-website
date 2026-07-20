"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import DeviceFrame from "@/components/phone/DeviceFrame";
import { PhoneScreen } from "@/components/phone/screens";
import Reveal from "@/components/shared/Reveal";
import StoreButton from "@/components/shared/StoreButton";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SNAP_SECTIONS } from "@/components/animations/SnapScroll";
import { QUERY_DESKTOP, QUERY_MOBILE } from "@/lib/breakpoints";
import {
  DOWNLOAD_BENEFITS,
  IOS_APP_STORE_URL,
  ANDROID_PLAY_STORE_URL,
} from "@/lib/data";
import { Dumbbell, Utensils, BarChart3, MessageSquare, Apple, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_OFFSET_X: Record<"left" | "right", number> = { left: -60, right: 60 };

const DOWNLOAD_IDX = (SNAP_SECTIONS as readonly string[]).indexOf("download");
const FOOTER_IDX = (SNAP_SECTIONS as readonly string[]).indexOf("footer");
const BENEFIT_ICON = { dumbbell: Dumbbell, utensils: Utensils, chart: BarChart3, chat: MessageSquare };

/** Android's resting pose — mirrors FloatingPhone's POSES.download (iOS) so
 * the two form one symmetric V, screens still ~85-90% front-facing. Also
 * used to position the Google Play badge so it sits directly under this phone. */
const ANDROID_VW = 26; // vw offset from center — iOS sits at IOS_VW
const ANDROID_VH = -3;
const ANDROID_ROTATE = 6;
const ANDROID_ROTATE_Y = -14;
const ANDROID_SCALE = 0.76;
const IOS_VW = 5; // must match POSES.download.x in FloatingPhone.tsx

/**
 * The second (Android) device. Lives entirely inside this section — the
 * persistent traveling phone (see FloatingPhone, POSES.download) IS the iOS
 * device; this component never touches its transform. On entering the
 * section it measures the persistent phone's live on-screen rect via
 * [data-phone-spin] and starts hidden directly behind it (z-30, under the
 * persistent phone's z-40), then fans out to the right. Reverse tucks it
 * back behind iOS and hides it — never a third phone, never a duplicate.
 */
function AndroidPhone() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const mm = gsap.matchMedia();
    mm.add(QUERY_DESKTOP, () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(root, { autoAlpha: 0 });

    let prev = -1;
    let tl: gsap.core.Timeline | null = null;

    // Android sits to the RIGHT of the persistent (iOS) phone, mirroring its
    // POSES.download tilt to form one symmetric V-shaped product composition.
    const finalPose = () => ({
      x: (window.innerWidth * ANDROID_VW) / 100,
      y: (window.innerHeight * ANDROID_VH) / 100,
      rotate: ANDROID_ROTATE,
      rotationY: ANDROID_ROTATE_Y,
      scale: ANDROID_SCALE,
    });

    const enter = (fromFooter: boolean) => {
      tl?.kill();
      const iosEl = document.querySelector<HTMLElement>("[data-phone-spin]");
      const iosRect = iosEl?.getBoundingClientRect();
      const hiddenX = iosRect ? iosRect.left + iosRect.width / 2 - window.innerWidth / 2 : 0;
      const hiddenY = iosRect ? iosRect.top + iosRect.height / 2 - window.innerHeight / 2 : 0;

      if (reduced) {
        const f = finalPose();
        gsap.set(root, { autoAlpha: 1 });
        gsap.set(stage, { x: f.x, y: f.y, rotate: f.rotate, rotationY: 0, scale: f.scale, opacity: 1 });
        return;
      }

      gsap.set(root, { autoAlpha: 1 });
      gsap.set(stage, {
        x: hiddenX,
        y: hiddenY + 10,
        rotate: 3,
        rotationY: -16,
        scale: 0.9,
        opacity: 0,
        transformPerspective: 1600,
      });

      const f = finalPose();
      // Returning from the footer: Android was hidden there too, and
      // SnapScroll's own scroll+crossfade runs ~1.05s — start the reveal
      // only once Download has essentially arrived, so it never bleeds over
      // the outgoing footer (matches FloatingPhone's own footer-return fade).
      tl = gsap.timeline({ delay: fromFooter ? 0.85 : 0.3 });
      tl.to(stage, { opacity: 1, duration: 0.35, ease: "power1.out" }, 0);
      tl.to(
        stage,
        {
          x: f.x,
          y: f.y,
          rotate: f.rotate,
          rotationY: f.rotationY,
          scale: f.scale,
          duration: 1.1,
          ease: "power4.inOut",
        },
        0
      );
      // idle sway once settled — matched to the persistent phone's own idle language
      tl.call(() => {
        gsap.to(stage, {
          y: "+=4",
          rotationY: f.rotationY + 1,
          duration: 3.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    };

    const exit = () => {
      tl?.kill();
      const iosEl = document.querySelector<HTMLElement>("[data-phone-spin]");
      const iosRect = iosEl?.getBoundingClientRect();
      const behindX = iosRect ? iosRect.left + iosRect.width / 2 - window.innerWidth / 2 : 0;
      const behindY = iosRect ? iosRect.top + iosRect.height / 2 - window.innerHeight / 2 : 0;

      if (reduced) {
        gsap.set(root, { autoAlpha: 0 });
        return;
      }
      gsap.killTweensOf(stage);
      tl = gsap.timeline({ onComplete: () => gsap.set(root, { autoAlpha: 0 }) });
      tl.to(stage, {
        x: behindX,
        y: behindY + 10,
        rotate: 3,
        rotationY: -16,
        scale: 0.9,
        duration: 0.65,
        ease: "power3.in",
      }).to(stage, { opacity: 0, duration: 0.35, ease: "power1.in" }, 0.3);
    };

    const onSnap = (e: Event) => {
      const idx = (e as CustomEvent<number>).detail;
      const from = prev;
      prev = idx;
      // Download → Footer is NOT a reverse merge — the phone journey ends at
      // Download, so Android just leaves with the section (instant hide, no
      // travel-behind-iOS). Footer → Download replays the full reveal below.
      if (idx === FOOTER_IDX) {
        tl?.kill();
        gsap.killTweensOf(stage);
        gsap.set(root, { autoAlpha: 0 });
        return;
      }
      if (idx === DOWNLOAD_IDX && from !== DOWNLOAD_IDX) {
        if (from === -1) return; // direct reload — stay hidden, no phantom emergence
        enter(from === FOOTER_IDX);
      } else if (from === DOWNLOAD_IDX && idx !== DOWNLOAD_IDX) {
        exit();
      }
    };
    window.addEventListener("snap:section", onSnap);
    return () => {
      window.removeEventListener("snap:section", onSnap);
      tl?.kill();
    };
    });
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden items-center justify-center lg:flex"
      style={{ perspective: 1600, opacity: 0, visibility: "hidden" }}
    >
      <div ref={stageRef} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
        <DeviceFrame>
          <div
            className="h-full w-full"
            style={{ background: "linear-gradient(160deg, #101014 0%, #0a0a0c 60%, #16100b 100%)" }}
          >
            <PhoneScreen screen="downloadAndroid" />
          </div>
        </DeviceFrame>
      </div>
    </div>
  );
}

function BenefitRow({
  icon,
  title,
  desc,
}: {
  icon: keyof typeof BENEFIT_ICON;
  title: string;
  desc: string;
}) {
  const Icon = BENEFIT_ICON[icon];
  return (
    <div className="flex items-center gap-3.5">
      <span className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-primary/30 text-primary">
        <Icon size={18} />
      </span>
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="text-xs text-silver-dim">{desc}</div>
      </div>
    </div>
  );
}

/**
 * Download — the culmination of the phone journey. The persistent traveling
 * phone arrives, settles as the iOS device, and a second Android device
 * emerges from directly behind it (AndroidPhone above); together they stand
 * on a glowing product-stage ring. LEFT ~38%: headline + benefits. Bottom:
 * one glass trust bar.
 */
export default function DownloadCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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
      let tl: gsap.core.Timeline | null = null;
      const play = () => {
        tl?.kill();
        const t = gsap.timeline();
        tl = t;
        t.fromTo(
          section.querySelectorAll("[data-dl-head] > *"),
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          0.1
        );
        t.fromTo(
          section.querySelectorAll("[data-dl-benefit]"),
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          0.45
        );
        t.fromTo(
          "[data-dl-platform]",
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
          0.3
        );
      };
      const onSnap = (e: Event) => {
        if ((e as CustomEvent<number>).detail === DOWNLOAD_IDX) play();
      };
      window.addEventListener("snap:section", onSnap);
      return () => {
        window.removeEventListener("snap:section", onSnap);
        tl?.kill();
      };
        }, section);
        return () => ctx.revert();
      }
    );

    // Mobile — repeating alternating left/right reveal on the headline block
    // and each benefit row. Independent of the desktop timeline above and of
    // the travelling-phone system (never touches [data-phone-spin]/AndroidPhone).
    mm.add(
      { isMobile: QUERY_MOBILE, reduced: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { isMobile, reduced } = context.conditions as {
          isMobile: boolean;
          reduced: boolean;
        };
        if (!isMobile || reduced) return;

        const targets = [
          section.querySelector<HTMLElement>("[data-dl-head]"),
          ...gsap.utils.toArray<HTMLElement>("[data-dl-benefit]", section),
        ].filter((el): el is HTMLElement => el !== null);

        const triggers: ScrollTrigger[] = [];
        targets.forEach((el, i) => {
          const dir = i % 2 === 0 ? "left" : "right";
          const x = MOBILE_OFFSET_X[dir];
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
          triggers.push(
            ScrollTrigger.create({
              trigger: el,
              start: "top 88%",
              end: "bottom 12%",
              onEnter: reveal,
              onEnterBack: reveal,
              onLeave: hide,
              onLeaveBack: hide,
            })
          );
        });

        return () => triggers.forEach((t) => t.kill());
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="download"
      ref={sectionRef}
      className="relative z-10 flex min-h-[100svh] flex-col px-6 py-28 lg:h-screen lg:overflow-hidden lg:py-0 lg:pt-[11vh] lg:pb-3"
    >
      {/* Black titanium product-display platform the twin devices stand on.
          Centered under the midpoint of iOS (IOS_VW) and Android (ANDROID_VW)
          so both phones visually rest on the same stage. Layered: ambient
          glow → filled surface → dim back rim → bright front rim → per-phone
          contact shadows. Front (bottom arc) is brighter than back (top arc)
          to read as a real lit stage, not a flat neon ring. */}
      <div
        data-dl-platform
        aria-hidden
        className="pointer-events-none absolute bottom-[1%] hidden lg:block"
        style={{
          left: `calc(50% + ${(IOS_VW + ANDROID_VW) / 2}vw)`,
          transform: "translateX(-50%)",
          width: "50vw",
          height: "20vh",
        }}
      >
        {/* ambient bloom */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 62% 58% at 50% 52%, rgba(255,106,0,0.3), transparent 72%)",
            filter: "blur(22px)",
          }}
        />
        <svg viewBox="0 0 600 220" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="dlSurface" cx="50%" cy="42%" r="65%">
              <stop offset="0%" stopColor="#2a2a2d" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#131315" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#080808" stopOpacity="0" />
            </radialGradient>
            <filter id="dlBlurSm"><feGaussianBlur stdDeviation="4" /></filter>
          </defs>
          {/* surface */}
          <ellipse cx="300" cy="90" rx="290" ry="48" fill="url(#dlSurface)" />
          {/* back rim — dimmer */}
          <path
            d="M14,90 A286,46 0 0 1 586,90"
            fill="none"
            stroke="#FF6A00"
            strokeOpacity="0.3"
            strokeWidth="2.5"
          />
          {/* front rim — bloom then sharp bright stroke */}
          <path
            d="M14,90 A286,46 0 0 0 586,90"
            fill="none"
            stroke="#FF6A00"
            strokeOpacity="0.6"
            strokeWidth="11"
            filter="url(#dlBlurSm)"
          />
          <path
            d="M14,90 A286,46 0 0 0 586,90"
            fill="none"
            stroke="#FFB37A"
            strokeOpacity="1"
            strokeWidth="2.5"
          />
        </svg>
        {/* contact shadows directly beneath each phone */}
        <div
          className="absolute rounded-[50%] bg-black/70"
          style={{
            left: `calc(50% + ${((IOS_VW - (IOS_VW + ANDROID_VW) / 2) / 50) * 100}%)`,
            top: "40%",
            width: "16vw",
            height: "3.4vh",
            transform: "translateX(-50%)",
            filter: "blur(10px)",
          }}
        />
        <div
          className="absolute rounded-[50%] bg-black/70"
          style={{
            left: `calc(50% + ${((ANDROID_VW - (IOS_VW + ANDROID_VW) / 2) / 50) * 100}%)`,
            top: "40%",
            width: "16vw",
            height: "3.4vh",
            transform: "translateX(-50%)",
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* The Android device — the persistent phone (FloatingPhone) is the iOS device */}
      <AndroidPhone />

      <div className="mx-auto grid w-full max-w-[1500px] flex-1 items-center gap-8 lg:grid-cols-[38%_1fr]">
        {/* LEFT: headline + benefits */}
        <div data-dl-head>
          <p className="text-xs font-semibold tracking-[0.35em] text-primary uppercase">
            Carry Your Coach
          </p>
          <h2 className="headline mt-4 text-4xl md:text-5xl lg:text-[3.1rem]">
            <span className="text-gradient-silver">Your transformation.</span>
            <br />
            <span className="text-gradient-silver">Now in your</span>{" "}
            <span className="text-gradient-orange">pocket.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm text-silver-dim md:text-base">
            Your coach, your plan, your progress — wherever you go.
          </p>

          <div className="mt-7 space-y-5">
            {DOWNLOAD_BENEFITS.map((b) => (
              <div key={b.title} data-dl-benefit>
                <BenefitRow icon={b.icon} title={b.title} desc={b.desc} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: reserved stage — both phones are fixed overlays positioned via
            FloatingPhone's POSES.download (iOS) and AndroidPhone above */}
        <div aria-hidden className="hidden lg:block" />
      </div>

      {/* Store badges — each individually centered under ITS OWN phone (same
          vw coordinate space the phones animate in), not a generic centered
          row. App Store under iOS, Google Play under Android. Each Reveal IS
          the positioned element directly — a wrapper wrapping only absolute
          children would collapse to zero height and break `bottom` math. */}
      <Reveal
        margin="0px"
        className="absolute bottom-[2%] z-10 hidden lg:block"
        style={{ left: `calc(50% + ${IOS_VW}vw)`, x: "-50%" }}
      >
        <StoreButton
          icon={<Apple size={20} className="text-white" />}
          top="Download on the"
          bottom="App Store"
          href={IOS_APP_STORE_URL}
          label="Download GOGETFIT on the App Store"
        />
      </Reveal>
      <Reveal
        margin="0px"
        delay={0.08}
        className="absolute bottom-[2%] z-10 hidden lg:block"
        style={{ left: `calc(50% + ${ANDROID_VW}vw)`, x: "-50%" }}
      >
        <StoreButton
          icon={<Play size={18} className="text-white" />}
          top="Get it on"
          bottom="Google Play"
          href={ANDROID_PLAY_STORE_URL}
          label="Get GOGETFIT on Google Play"
        />
      </Reveal>

      {/* Mobile: static single-phone showcase (no persistent-phone choreography) */}
      <div className="mt-10 flex flex-col items-center gap-6 lg:hidden">
        <DeviceFrame className="w-[clamp(200px,62vw,260px)]">
          <div
            className="h-full w-full"
            style={{ background: "linear-gradient(160deg, #101014 0%, #0a0a0c 60%, #16100b 100%)" }}
          >
            <PhoneScreen screen="qr" />
          </div>
        </DeviceFrame>
        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row md:flex-wrap md:justify-center md:gap-3">
          <StoreButton
            icon={<Apple size={20} className="text-white" />}
            top="Download on the"
            bottom="App Store"
            href={IOS_APP_STORE_URL}
            label="Download GOGETFIT on the App Store"
            className="cta-shimmer mx-auto w-[90%] max-w-[420px] justify-center md:mx-0 md:w-auto md:max-w-none md:justify-start"
          />
          <StoreButton
            icon={<Play size={18} className="text-white" />}
            top="Get it on"
            bottom="Google Play"
            href={ANDROID_PLAY_STORE_URL}
            label="Get GOGETFIT on Google Play"
            className="cta-shimmer mx-auto w-[90%] max-w-[420px] justify-center md:mx-0 md:w-auto md:max-w-none md:justify-start"
          />
        </div>
      </div>
    </section>
  );
}
