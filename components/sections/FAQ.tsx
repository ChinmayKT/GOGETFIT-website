"use client";

import { ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import GlassButton from "@/components/shared/GlassButton";
import FaqAccordion from "./FaqAccordion";
import { FAQS } from "@/lib/data";

const PREVIEW_COUNT = 3;

/** FAQ — phone rides the LEFT (gallery pose family), content fills the right ~66%. */
export default function FAQ() {
  const preview = FAQS.slice(0, PREVIEW_COUNT);

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

        <div className="mt-6">
          <FaqAccordion items={preview} defaultOpenFirst />
        </div>

        <Reveal delay={0.22 + preview.length * 0.05} margin="0px" mobileReveal="left" className="mt-4">
          <GlassButton href="/faq" className="inline-flex text-sm">
            View All FAQs
            <ArrowRight size={15} />
          </GlassButton>
        </Reveal>
      </div>
    </section>
  );
}
