"use client";

import Reveal from "@/components/shared/Reveal";
import TiltCard from "@/components/cards/TiltCard";
import { VALUES } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 flex min-h-screen items-center px-6 py-28 lg:h-screen lg:min-h-[100svh] lg:overflow-hidden lg:py-0"
    >
      {/* Massive glass G */}
      <div
        aria-hidden
        className="headline pointer-events-none absolute top-1/2 left-[2%] -translate-y-1/2 text-[60vh] leading-none font-bold text-transparent select-none"
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
          What is GOGETFIT
        </Reveal>

        <Reveal as="h2" delay={0.1} className="headline mt-5 text-5xl md:text-6xl">
          <span className="text-gradient-silver">Transformation,</span>
          <br />
          <span className="text-gradient-orange">The Right Way.</span>
        </Reveal>

        <Reveal as="p" delay={0.2} className="mt-8 max-w-3xl text-base leading-relaxed text-silver md:text-lg">
          GOGETFIT began with one belief — that lasting change doesn&apos;t come
          from gyms, fads, or willpower alone. It comes from a coach in your
          corner, a plan built for your life, and someone who refuses to let
          you quit.
        </Reveal>

        <Reveal as="p" delay={0.3} className="mt-4 max-w-3xl text-base leading-relaxed text-silver-dim md:text-lg">
          Our mission: make personal, human-led health transformation
          accessible to every Indian — around the food you already eat and
          the life you already live.
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:gap-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={0.15 + i * 0.08}>
              <TiltCard className="h-full p-6">
                <div className="headline text-sm text-primary">0{i + 1}</div>
                <h3 className="mt-2 text-base font-semibold text-white">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-dim">
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
