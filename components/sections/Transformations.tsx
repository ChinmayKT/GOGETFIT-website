"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import {
  TRANSFORMATION_ROWS,
  type TransformationStory,
} from "@/lib/data";
import { SNAP_SECTIONS } from "@/components/animations/SnapScroll";
import { QUERY_DESKTOP } from "@/lib/breakpoints";
import { useDialog } from "@/hooks/useDialog";
import {
  Play,
  X,
  Users,
  Heart,
  Flame,
  Dumbbell,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

const TRANS_IDX = (SNAP_SECTIONS as readonly string[]).indexOf("transformations");
const ROW_ICONS = [Flame, Dumbbell, Star];

/**
 * One horizontal transformation carousel row — arrows, drag, partial peek,
 * near-imperceptible idle drift (paused on interaction / reduced motion).
 */
function CarouselRow({
  title,
  icon: Icon,
  items,
  onOpen,
}: {
  title: string;
  icon: typeof Flame;
  items: readonly TransformationStory[];
  onOpen: (s: TransformationStory) => void;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const idleTween = useRef<gsap.core.Tween | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bounds = () => {
    const vp = viewportRef.current!;
    const tr = trackRef.current!;
    return Math.max(0, tr.scrollWidth - vp.clientWidth);
  };

  const glide = (to: number, dur = 0.75) => {
    pos.current = gsap.utils.clamp(-bounds(), 0, to);
    gsap.to(trackRef.current, {
      x: pos.current,
      duration: dur,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  };

  const step = (dir: 1 | -1) => {
    pause();
    const card = trackRef.current?.children[0] as HTMLElement | undefined;
    const w = card ? card.offsetWidth + 14 : 200;
    glide(pos.current + dir * w * 2);
    scheduleResume();
  };

  /** barely-visible autonomous drift, bouncing between the ends */
  const drift = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const b = bounds();
    if (b <= 0) return;
    idleTween.current?.kill();
    idleTween.current = gsap.to(trackRef.current, {
      x: -b,
      duration: b / 9, // ~9px per second
      ease: "none",
      repeat: -1,
      yoyo: true,
      onUpdate: () => {
        pos.current = Number(gsap.getProperty(trackRef.current, "x"));
      },
    });
  };
  const pause = () => idleTween.current?.kill();
  const scheduleResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(drift, 4000);
  };

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(QUERY_DESKTOP, () => {
      const t = setTimeout(drift, 3500);

      // drag support
      const vp = viewportRef.current!;
      let dragging = false;
      let startX = 0;
      let startPos = 0;
      const onDown = (e: PointerEvent) => {
        dragging = true;
        startX = e.clientX;
        startPos = pos.current;
        pause();
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        pos.current = gsap.utils.clamp(-bounds(), 0, startPos + e.clientX - startX);
        gsap.set(trackRef.current, { x: pos.current });
      };
      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        scheduleResume();
      };
      vp.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);

      return () => {
        clearTimeout(t);
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
        idleTween.current?.kill();
        vp.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      data-trow
      className="rounded-2xl border border-white/10 bg-white/[0.025] p-3"
      onMouseEnter={pause}
      onMouseLeave={scheduleResume}
      // keyboard users: stop the drift and bring the focused card into view
      onFocus={(e) => {
        pause();
        const card = (e.target as HTMLElement).closest<HTMLElement>("[data-tcard]");
        const vp = viewportRef.current;
        if (!card || !vp || getComputedStyle(vp).overflowX !== "hidden") return;
        vp.scrollLeft = 0; // the browser scrolls hidden overflow on focus; the track moves via transform
        const left = card.offsetLeft + pos.current;
        if (left < 0 || left + card.offsetWidth > vp.clientWidth)
          glide((vp.clientWidth - card.offsetWidth) / 2 - card.offsetLeft, 0.4);
      }}
      onBlur={scheduleResume}
    >
      {/* Row header */}
      <div className="mb-2 flex items-center px-1">
        <h3 className="flex items-center gap-2 text-sm font-medium text-white">
          <Icon size={15} className="text-silver-dim" /> {title}
        </h3>
      </div>

      {/* Viewport with intentional partial peek + edge arrows */}
      <div className="relative">
        <div
          ref={viewportRef}
          className="no-scrollbar cursor-grab overflow-hidden active:cursor-grabbing max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto lg:touch-pan-y"
        >
          <div ref={trackRef} className="flex gap-3.5 will-change-transform">
            {items.map((s) => (
              <button
                key={s.id}
                type="button"
                data-tcard
                aria-label={
                  s.type === "video"
                    ? `Play ${s.name}'s transformation story`
                    : s.alt
                }
                onClick={() => onOpen(s)}
                className="tf-card group/card relative shrink-0 snap-center overflow-hidden rounded-xl border border-white/10 text-left"
                style={{ aspectRatio: s.selfCaptioned ? "4/5" : "3/4" }}
              >
                <Image
                  src={s.type === "video" ? s.poster! : s.image!}
                  alt=""
                  fill
                  sizes="230px"
                  className="object-cover transition-transform duration-500"
                />
                {s.type === "video" && (
                  <span className="glass absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-2.5 transition-colors duration-150">
                    <Play size={13} className="text-white" fill="white" />
                  </span>
                )}
                {!s.selfCaptioned && (
                  <span
                    className="absolute inset-x-0 bottom-0 p-2.5 pt-8"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent, rgba(8,8,8,0.92) 78%)",
                    }}
                  >
                    <span className="headline block text-base leading-tight text-white lg:text-lg">
                      {s.result}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-silver-dim">
                      {s.name} · {s.duration}
                    </span>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label={`Scroll ${title} left`}
          onClick={() => step(-1)}
          className="glass-strong absolute top-1/2 -left-3 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-white transition active:scale-[0.98] lg:flex"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          aria-label={`Scroll ${title} right`}
          onClick={() => step(1)}
          className="glass-strong absolute top-1/2 -right-3 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-white transition active:scale-[0.98] lg:flex"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/**
 * "Proof, not promises" — reference-faithful Results section.
 * LEFT 30%: the persistent phone (GoGetFeed) via its global pose. RIGHT:
 * header above three carousel rows. Bottom: editorial trust bar + View-all pill.
 */
export default function Transformations() {
  const sectionRef = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState<TransformationStory | null>(null);
  const dialogRef = useDialog<HTMLDivElement>(!!focused, () => setFocused(null));

  // Entrance choreography: heading → rows cascade → stats
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
          section.querySelectorAll("[data-thead] > *"),
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          0.15
        );
        section.querySelectorAll("[data-trow]").forEach((row, i) => {
          const at = 0.5 + i * 0.22;
          t.fromTo(
            row,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            at
          );
          t.fromTo(
            row.querySelectorAll("[data-tcard]"),
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" },
            at + 0.15
          );
        });
        t.fromTo(
          "[data-tstats] > *",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" },
          1.25
        );
      };
      const onSnap = (e: Event) => {
        if ((e as CustomEvent<number>).detail === TRANS_IDX) play();
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
    return () => mm.revert();
  }, []);

  return (
    <section
      id="transformations"
      ref={sectionRef}
      className="relative z-10 flex min-h-[100svh] flex-col px-6 py-28 lg:h-screen lg:overflow-hidden lg:py-0 lg:pt-[9.5vh] lg:pb-3 lg-short:pt-[11.5vh]"
    >
      {/* ---------- Header: same columns as the rows below, so it clears the phone ---------- */}
      <div className="mx-auto mb-4 w-full max-w-[1400px] lg:mb-[2.4vh] lg:grid lg:grid-cols-[30%_1fr] lg:gap-8">
        <div data-thead className="min-w-0 text-center lg:col-start-2">
          <p className="eyebrow justify-center">
            Real Transformations
          </p>
          <h2 className="headline mt-3 text-4xl md:text-5xl xl:text-[3.2rem] lg:whitespace-nowrap lg-short:mt-1 lg-short:text-[2.4rem]">
            Proof, not{" "}
            promises
          </h2>
          <p className="mt-1 text-base text-silver-dim lg-short:text-sm">
            Every transformation tells a story of consistency, commitment, and
            the right guidance. Real people. Real journeys. Real results.
          </p>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] flex-1 gap-8 lg:grid-cols-[30%_1fr]">
        {/* ---------- LEFT: phone zone ---------- */}
        <div className="relative hidden lg:block">
          {/* the persistent phone occupies this space via its global pose */}
        </div>

        {/* ---------- RIGHT: three carousel rows ---------- */}
        <div className="flex min-w-0 flex-col justify-center gap-4 lg:gap-[1.8vh]">
          {TRANSFORMATION_ROWS.map((row, i) => (
            <CarouselRow
              key={row.id}
              title={row.title}
              icon={ROW_ICONS[i]}
              items={row.items}
              onOpen={setFocused}
            />
          ))}
        </div>
      </div>

      {/* ---------- Bottom trust bar ---------- */}
      <div
        data-tstats
        className="mx-auto mt-6 mb-1 flex w-full max-w-[1400px] flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:mt-[0.6vh] lg:justify-end"
      >
        <span className="flex items-center gap-2.5 text-sm text-silver">
          <Users size={16} className="text-silver-dim" />
          <span>
            <b className="text-white">400+</b> Transformations
          </span>
        </span>
        <span aria-hidden className="hidden h-4 w-px bg-white/15 lg:block" />
        <span className="flex items-center gap-2.5 text-sm text-silver">
          <Heart size={16} className="text-silver-dim" />
          <span>
            <b className="text-white">500+</b> Happy Clients
          </span>
        </span>
        <span aria-hidden className="hidden h-4 w-px bg-white/15 lg:block" />
        <span className="flex items-center gap-2.5 text-sm text-silver">
          <MessageCircle size={16} className="text-silver-dim" /> Personalized Coaching
        </span>
        <span aria-hidden className="hidden h-4 w-px bg-white/15 lg:block" />
        <span className="flex items-center gap-2.5 text-sm text-silver">
          <Play size={16} className="text-silver-dim" /> Real Client Stories
        </span>
      </div>

      {/* ---------- Focused story / video modal ---------- */}
      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-6"
            style={{ background: "rgba(8,8,8,0.88)", backdropFilter: "blur(12px)" }}
            onClick={() => setFocused(null)}
          >
            <motion.div
              initial={{ scale: 0.88, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={focused.alt}
              tabIndex={-1}
              className="glass-strong relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[20px] outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: focused.selfCaptioned ? "4/5" : "3/4" }}
              >
                {focused.type === "video" && focused.videoSrc ? (
                  <video
                    src={focused.videoSrc}
                    poster={focused.poster}
                    controls
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <Image
                      src={focused.type === "video" ? focused.poster! : focused.image!}
                      alt={focused.alt}
                      fill
                      sizes="480px"
                      className="object-cover"
                    />
                    {focused.type === "video" && (
                      <span className="glass absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-5">
                        <Play size={22} className="text-white" fill="white" />
                      </span>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-end justify-between p-6">
                <div>
                  {!focused.selfCaptioned && (
                    <>
                      <div className="headline text-3xl text-primary">
                        {focused.result}
                      </div>
                      <div className="mt-1 text-sm text-silver">
                        {focused.name} · {focused.duration}
                      </div>
                    </>
                  )}
                  {focused.type === "video" && !focused.videoSrc && (
                    <div className="mt-2 text-xs text-silver-dim">
                      Video testimonial coming soon.
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  aria-label="Close story"
                  onClick={() => setFocused(null)}
                  className="glass rounded-full p-3 transition hover:bg-white/10"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
