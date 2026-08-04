"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Check, X } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import GlassButton from "@/components/shared/GlassButton";
import {
  PLANS,
  PLAN_INCLUDES,
  PLAN_NEXT_STEPS,
  PLAN_TERMS,
  PLAN_ELIGIBILITY,
  type Plan,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const PEOPLE_LABEL: Record<number, string> = { 1: "1 Person", 2: "2 People", 4: "4 People" };

function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

/** Plans — phone rides the RIGHT (booking pose family), content fills the left ~66%. */
export default function Plans() {
  const [selected, setSelected] = useState<Plan | null>(null);

  return (
    <section
      id="plans"
      className={cn(
        "relative flex min-h-[100svh] items-center px-6 py-28 lg:h-screen lg:items-start lg:overflow-hidden lg:py-0 lg:pt-[11vh]",
        // Bumped above the persistent floating phone (fixed, z-40) only while
        // the popup is open — otherwise this section sits at the normal z-10
        // shared by every other section.
        selected ? "z-[90]" : "z-10"
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] lg:pr-[34%]">
        <Reveal as="p" className="text-xs font-semibold tracking-[0.35em] text-primary uppercase">
          Plans & Pricing
        </Reveal>
        <Reveal as="h2" delay={0.08} mobileReveal="left" className="headline mt-3 text-4xl md:text-5xl lg:text-[3.2rem]">
          <span className="text-gradient-silver">Coaching that fits</span>{" "}
          <span className="text-gradient-orange">your goals.</span>
        </Reveal>
        <Reveal as="p" delay={0.15} mobileReveal="right" className="mt-3 max-w-lg text-sm text-silver-dim md:text-base">
          Pick a plan and get a dedicated coach, a personalized program, and real accountability.
        </Reveal>

        <div className="mt-6 flex flex-col gap-3">
          {PLANS.map((p, i) => (
            <Reveal
              key={p.id}
              delay={0.22 + i * 0.04}
              margin="0px"
              mobileReveal={i % 2 === 0 ? "left" : "right"}
            >
              <button
                type="button"
                onClick={() => setSelected(p)}
                className={cn(
                  "glass flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 px-5 py-4 text-left transition-colors hover:border-primary/40",
                  p.highlighted && "border-primary/50"
                )}
              >
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-white md:text-base">{p.name}</span>
                  {p.highlighted && (
                    <span className="rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-semibold tracking-wide text-white uppercase">
                      Popular
                    </span>
                  )}
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="headline text-gradient-silver text-lg">
                    {formatPrice(p.price)}
                  </span>
                  <ChevronRight size={18} className="shrink-0 text-primary" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Plan details popup — landscape dialog, contained inside the Plans section */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[80] flex items-center justify-center p-6"
            style={{ background: "rgba(8,8,8,0.88)", backdropFilter: "blur(12px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 12, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-y-auto rounded-[28px] md:h-[min(760px,90vh)] md:flex-row md:overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close plan details"
                onClick={() => setSelected(null)}
                className="glass absolute top-4 right-4 z-10 rounded-full p-3 transition hover:bg-white/10"
              >
                <X size={18} />
              </button>

              {/* Left — scrollable description + fine print */}
              <div className="min-w-0 flex-1 overflow-y-auto p-7 pt-14 md:p-9 md:pt-9">
                <h3 className="headline text-xl text-white/95 md:text-2xl">{selected.name}</h3>

                <p className="mt-4 text-sm leading-relaxed text-silver">{selected.description}</p>

                <h4 className="mt-6 text-xs font-semibold tracking-wide text-white uppercase">
                  {selected.duration} plan includes
                </h4>
                <ul className="mt-3 space-y-2">
                  {PLAN_INCLUDES.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-silver">
                      <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>

                <h4 className="mt-6 text-xs font-semibold tracking-wide text-white uppercase">
                  What next, once you&apos;ve enrolled?
                </h4>
                <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-silver">
                  {PLAN_NEXT_STEPS.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>

                <h4 className="mt-6 text-xs font-semibold tracking-wide text-white uppercase">
                  Terms and conditions
                </h4>
                <ul className="mt-3 list-disc space-y-1.5 pl-4 text-xs text-silver-dim">
                  {PLAN_TERMS.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                <h4 className="mt-6 text-xs font-semibold tracking-wide text-white uppercase">
                  Eligibility
                </h4>
                <p className="mt-2 text-xs text-silver-dim">{PLAN_ELIGIBILITY}</p>
              </div>

              {/* Right — price + CTA, always visible, never scrolls away */}
              <div className="flex shrink-0 flex-col border-t border-white/10 p-7 md:w-[260px] md:border-t-0 md:border-l md:p-8">
                {selected.highlighted && (
                  <span className="mb-3 inline-flex w-fit items-center rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-semibold tracking-wide text-white uppercase">
                    Popular
                  </span>
                )}
                <div className="headline text-gradient-silver text-3xl">
                  {formatPrice(selected.price)}
                </div>
                <p className="mt-1 text-xs text-silver-dim">Inclusive of taxes</p>

                <div className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm text-silver">
                  <div className="flex justify-between gap-3">
                    <span className="text-silver-dim">Duration</span>
                    <span>{selected.duration}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-silver-dim">Group size</span>
                    <span>{PEOPLE_LABEL[selected.people] ?? `${selected.people} People`}</span>
                  </div>
                </div>

                <GlassButton
                  href="#contact"
                  variant={selected.highlighted ? "primary" : "glass"}
                  className="mt-auto w-full text-sm"
                >
                  Book Now
                </GlassButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
