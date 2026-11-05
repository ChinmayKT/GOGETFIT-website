"use client";

import Reveal from "@/components/shared/Reveal";
import TiltCard from "@/components/cards/TiltCard";
import { VALUES } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 flex min-h-[100svh] items-center overflow-hidden px-6 py-28 lg:h-screen lg:items-center-safe lg:py-0 lg:pt-20"
    >
      {/* Massive glass G */}
      <div
        aria-hidden
        className="headline pointer-events-none absolute top-1/2 left-[2%] -translate-y-1/2 text-[38vh] leading-none font-bold text-transparent select-none sm:text-[46vh] lg:text-[60vh]"
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.06)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,106,0,0.05))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        G
      </div>

      <div className="mx-auto w-full max-w-[1440px] lg:pl-[30%]">
        <Reveal as="p" className="text-xs font-semibold tracking-[0.35em] text-primary uppercase">
          Why GOGETFIT Exists?
        </Reveal>

        <Reveal as="h2" delay={0.1} mobileReveal="left" className="headline mt-5 text-5xl md:text-6xl lg-short:mt-3 lg-short:text-[2.6rem]">
          <span className="text-gradient-silver">Fitness shouldn&apos;t be complicated.</span>
          <br />
          <span className="text-gradient-orange">It should be simple, accessible, and sustainable.</span>
        </Reveal>

        <Reveal as="p" delay={0.2} mobileReveal="right" className="mt-8 max-w-3xl text-base leading-relaxed text-silver md:text-lg lg-short:mt-4 lg-short:text-base">
          Every year, millions of people begin their fitness journey, only to
          give up because of confusing advice, unrealistic expectations, and
          the absence of proper guidance.
        </Reveal>

        <Reveal as="p" delay={0.3} mobileReveal="left" className="mt-4 max-w-3xl text-base leading-relaxed text-silver md:text-lg lg-short:mt-2 lg-short:text-base">
          GOGETFIT was built to change that.
        </Reveal>

        <Reveal as="p" delay={0.4} mobileReveal="left" className="mt-4 max-w-3xl text-base leading-relaxed text-silver-dim md:text-lg lg-short:mt-2 lg-short:text-base">
          We simplify fitness through science-backed coaching, personalized
          nutrition, education, technology, and a supportive
          community—empowering people to build healthier lifestyles that
          last a lifetime.
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:gap-3 lg-short:mt-5 lg-short:min-[1200px]:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={0.15 + i * 0.08} mobileReveal={i % 2 === 0 ? "right" : "left"}>
              <TiltCard className="h-full p-6 lg-short:p-4">
                <div className="headline text-sm text-primary">0{i + 1}</div>
                <h3 className="mt-2 text-base font-semibold text-white lg-short:mt-1">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-dim lg-short:mt-1">
                  {v.body}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
