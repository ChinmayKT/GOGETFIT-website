"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import { FAQS } from "@/lib/data";
import { cn } from "@/lib/utils";

/** FAQ — phone rides the LEFT (gallery pose family), content fills the right ~66%. */
export default function FAQ() {
  const [open, setOpen] = useState<string | null>(FAQS[0]?.id ?? null);

  return (
    <section
      id="faq"
      className="relative z-10 flex min-h-[100svh] items-center px-6 py-28 lg:h-screen lg:items-start lg:overflow-hidden lg:py-0 lg:pt-[11vh]"
    >
      <div className="mx-auto w-full max-w-[1440px] lg:pl-[32%]">
        <Reveal as="p" className="text-xs font-semibold tracking-[0.35em] text-primary uppercase">
          FAQ
        </Reveal>
        <Reveal as="h2" delay={0.08} mobileReveal="left" className="headline mt-3 text-4xl md:text-5xl lg:text-[3.2rem]">
          <span className="text-gradient-silver">Got</span>{" "}
          <span className="text-gradient-orange">questions?</span>
        </Reveal>
        <Reveal as="p" delay={0.15} mobileReveal="right" className="mt-3 max-w-lg text-sm text-silver-dim md:text-base">
          Everything you need to know before you get started.
        </Reveal>

        <div className="mt-6 flex flex-col gap-3">
          {FAQS.map((f, i) => {
            const isOpen = open === f.id;
            return (
              <Reveal
                key={f.id}
                delay={0.22 + i * 0.05}
                margin="0px"
                mobileReveal={i % 2 === 0 ? "left" : "right"}
              >
                <div className="glass overflow-hidden rounded-2xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-white">{f.question}</span>
                    <ChevronDown
                      size={18}
                      className={cn(
                        "shrink-0 text-primary transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-silver-dim">
                      {f.answer}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
