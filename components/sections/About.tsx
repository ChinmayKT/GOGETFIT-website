"use client";

import Reveal from "@/components/shared/Reveal";
import { VALUES } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 flex min-h-[100svh] items-center overflow-hidden px-6 py-28 lg:h-screen lg:items-center-safe lg:py-0 lg:pt-20"
    >
      <div className="mx-auto w-full max-w-[1440px] lg:pl-[30%]">
        <Reveal as="p" className="eyebrow">
          Why GOGETFIT Exists?
        </Reveal>

        <Reveal as="h2" delay={0.1} className="headline mt-5 text-5xl md:text-6xl lg-short:mt-3 lg-short:text-[2.6rem]">
          Fitness shouldn&apos;t be complicated.
          <br />
          It should be simple, accessible, and sustainable.
        </Reveal>

        <Reveal as="p" delay={0.2} className="mt-8 max-w-3xl text-base leading-relaxed text-silver md:text-lg lg-short:mt-4 lg-short:text-base">
          Every year, millions of people begin their fitness journey, only to
          give up because of confusing advice, unrealistic expectations, and
          the absence of proper guidance.
        </Reveal>

        <Reveal as="p" delay={0.3} className="mt-4 max-w-3xl text-base leading-relaxed text-silver md:text-lg lg-short:mt-2 lg-short:text-base">
          GOGETFIT was built to change that.
        </Reveal>

        <Reveal as="p" delay={0.4} className="mt-4 max-w-3xl text-base leading-relaxed text-silver-dim md:text-lg lg-short:mt-2 lg-short:text-base">
          We simplify fitness through science-backed coaching, personalized
          nutrition, education, technology, and a supportive
          community—empowering people to build healthier lifestyles that
          last a lifetime.
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:mt-8 lg-short:mt-5 lg-short:min-[1200px]:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={0.15 + i * 0.08}>
              <div className="h-full border-t border-white/10 pt-4">
                <h3 className="text-base font-medium text-white">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-dim lg-short:mt-1">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
