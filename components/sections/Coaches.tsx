"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { gsap } from "gsap";
import Reveal from "@/components/shared/Reveal";
import { COACHES, type Coach } from "@/lib/data";
import { CoachPortrait } from "@/components/phone/screens";
import { setPhoneScreen, setPhoneCoach } from "@/components/phone/FloatingPhone";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_SCREEN = "coachProfile" as const;

/**
 * Coaches — LEFT sends the leftmost coach straight into the phone (instant
 * placement, no travel animation), RIGHT returns them one by one. Every
 * coach can enter the phone; when the last one returns, the phone falls
 * back to the Coach Profile screen.
 */
export default function Coaches() {
  const [order, setOrder] = useState<Coach[]>(COACHES);
  const [stack, setStack] = useState<Coach[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const orderRef = useRef(order);
  const stackRef = useRef(stack);
  orderRef.current = order;
  stackRef.current = stack;

  /** LEFT — leftmost coach instantly appears inside the phone. */
  const sendToPhone = () => {
    const order = orderRef.current;
    const track = trackRef.current;
    if (busy.current || !track || order.length === 0) return;
    const coach = order[0];
    busy.current = true;

    // coach sits in the phone immediately
    setPhoneCoach(coach.name, true);
    setPhoneScreen("coachIntro");

    const finish = () => {
      flushSync(() => {
        setStack((s) => [...s, coach]);
        setOrder((o) => o.slice(1));
      });
      gsap.set(track, { x: 0 });
      busy.current = false;
    };

    if (track.children.length > 1) {
      const first = track.children[0].getBoundingClientRect();
      const second = track.children[1].getBoundingClientRect();
      const step = second.left - first.left;
      (track.children[0] as HTMLElement).style.visibility = "hidden";
      gsap.to(track, {
        x: -step,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          (track.children[0] as HTMLElement).style.visibility = "";
          finish();
        },
      });
    } else {
      finish();
    }
  };

  /** RIGHT — the active coach instantly returns to the front of the carousel. */
  const returnFromPhone = () => {
    const stack = stackRef.current;
    const track = trackRef.current;
    if (busy.current || !track || stack.length === 0) return;
    const coach = stack[stack.length - 1];
    const prevCoach = stack[stack.length - 2];
    busy.current = true;

    flushSync(() => {
      setStack((s) => s.slice(0, -1));
      setOrder((o) => [coach, ...o]);
    });

    // phone updates immediately: previous coach, or back to the profile screen
    if (prevCoach) {
      setPhoneCoach(prevCoach.name, true);
      setPhoneScreen("coachIntro");
    } else {
      setPhoneScreen(DEFAULT_SCREEN);
    }

    const t = trackRef.current!;
    if (t.children.length > 1) {
      const first = t.children[0].getBoundingClientRect();
      const second = t.children[1].getBoundingClientRect();
      const step = second.left - first.left;
      gsap.set(t, { x: -step });
      gsap.to(t, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          busy.current = false;
        },
      });
    } else {
      busy.current = false;
    }
  };

  const canSend = order.length > 0;
  const canReturn = stack.length > 0;

  return (
    <section
      id="coaches"
      className="relative z-10 flex min-h-screen items-center px-6 py-28 lg:h-screen lg:min-h-[100svh] lg:items-start lg:overflow-hidden lg:py-0 lg:pt-[13vh]"
    >
      <div className="mx-auto w-full max-w-[1440px] lg:pl-[30%]">
        <Reveal as="p" className="text-xs font-semibold tracking-[0.35em] text-primary uppercase">
          Your Corner
        </Reveal>
        <Reveal as="h2" delay={0.1} className="headline mt-4 text-5xl md:text-6xl">
          <span className="text-gradient-silver">Coaches who never</span>{" "}
          <span className="text-gradient-orange">let go.</span>
        </Reveal>
        <Reveal as="p" delay={0.2} className="mt-5 max-w-xl text-base text-silver-dim md:text-lg">
          Certified experts. Daily check-ins. Weekly plan reviews. Real humans
          who know your name, your goals, and your journey.
        </Reveal>

        {/* Carousel */}
        <Reveal delay={0.25} className="relative mt-8">
          <div className="no-scrollbar snap-x snap-mandatory overflow-x-auto lg:snap-none lg:overflow-hidden lg:pr-8">
            <div ref={trackRef} className="flex gap-4 will-change-transform">
              {order.map((c) => (
                <article
                  key={c.id}
                  aria-label={c.alt}
                  className="relative w-[62vw] shrink-0 snap-center overflow-hidden rounded-[28px] border border-white/10 sm:w-[38vw] md:w-[26vw] lg:w-[calc(33.333%-11px)]"
                  style={{ aspectRatio: "3/4" }}
                >
                  <CoachPortrait name={c.name} />
                  <div
                    className="absolute inset-x-0 bottom-0 p-4 pt-10 text-center"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent, rgba(8,8,8,0.85) 70%)",
                    }}
                  >
                    <h3 className="headline text-xl text-white/90">{c.name}</h3>
                  </div>
                </article>
              ))}
              {order.length === 0 && (
                <div className="relative w-full">
                  {/* invisible card-sized spacer — keeps the wrapper (and the
                      arrows centered on it) at exactly the same height */}
                  <div
                    aria-hidden
                    className="invisible w-[62vw] sm:w-[38vw] md:w-[26vw] lg:w-[calc(33.333%-11px)]"
                    style={{ aspectRatio: "3/4" }}
                  />
                  <p className="absolute inset-0 flex items-center justify-center text-sm text-silver-dim">
                    All coaches are in the app — press → to bring them back.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* LEFT — send coach into the phone */}
          <button
            aria-label="Previous coach — send coach into the app"
            onClick={sendToPhone}
            disabled={!canSend}
            className="glass-strong group absolute top-1/2 -left-16 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(255,106,0,0.35)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 lg:flex"
          >
            <ChevronLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>
          {/* RIGHT — bring the active coach back */}
          <button
            aria-label="Next coach — bring coach back from the app"
            onClick={returnFromPhone}
            disabled={!canReturn}
            className="glass-strong group absolute top-1/2 -right-2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(255,106,0,0.35)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 lg:flex"
          >
            <ChevronRight size={20} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </Reveal>

        <p className="mt-5 hidden text-xs text-silver-dim lg:block">
          ← send a coach into the app&nbsp;&nbsp;·&nbsp;&nbsp;→ bring them back
        </p>
      </div>
    </section>
  );
}
