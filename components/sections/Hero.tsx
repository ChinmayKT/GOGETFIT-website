"use client";

import { motion } from "framer-motion";
import { STATS, IOS_APP_STORE_URL, ANDROID_PLAY_STORE_URL } from "@/lib/data";
import GlassButton from "@/components/shared/GlassButton";
import StoreButton from "@/components/shared/StoreButton";
import DeviceFrame from "@/components/phone/DeviceFrame";
import { PhoneScreen } from "@/components/phone/screens";
import { ArrowDown, Sparkles, Apple, Play } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-center px-6 pt-28 pb-16 lg:h-screen lg:min-h-[100svh] lg:overflow-hidden lg:pt-0 lg:pb-0"
    >
      {/* Big orange floor glow */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-[40vh] w-[120vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255,106,0,0.18), transparent 65%)",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-[1440px] lg:pr-[30%]"
      >
        <motion.div
          variants={item}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-silver"
        >
          <Sparkles size={13} className="text-primary" />
          India&apos;s most personal health transformation company
        </motion.div>

        <motion.h1
          variants={item}
          className="headline text-[13vw] font-bold sm:text-7xl lg:text-[5.6rem] xl:text-8xl"
        >
          <span className="text-gradient-silver">Your Transformation</span>
          <br />
          <span className="text-gradient-orange">Starts Here.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-base leading-relaxed text-silver md:text-lg"
        >
          Lose weight. Gain strength. Build a lifestyle that lasts — with a
          dedicated coach, personalized nutrition, and accountability that
          never sleeps.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <GlassButton href="#contact" variant="primary">
            Book Free Consultation
          </GlassButton>
          <StoreButton
            icon={<Apple size={20} className="text-white" />}
            top="Download on the"
            bottom="App Store"
            href={IOS_APP_STORE_URL}
            label="Download GOGETFIT on the App Store"
          />
          <StoreButton
            icon={<Play size={18} className="text-white" />}
            top="Get it on"
            bottom="Google Play"
            href={ANDROID_PLAY_STORE_URL}
            label="Get GOGETFIT on Google Play"
          />
        </motion.div>

        {/* Mobile phone (stacked storytelling) */}
        <motion.div variants={item} className="mt-14 flex justify-center lg:hidden">
          <div
            style={{
              transform: "perspective(1600px) rotateY(-8deg) rotateX(2deg)",
              transformStyle: "preserve-3d",
            }}
          >
          <DeviceFrame className="w-[240px]">
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(160deg, #101014 0%, #0a0a0c 60%, #16100b 100%)",
              }}
            >
              <PhoneScreen screen="dashboard" />
            </div>
          </DeviceFrame>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="mt-14 grid max-w-2xl grid-cols-3 gap-4 lg:mt-20"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="glass glass-sheen rounded-3xl p-5 text-center lg:text-left"
            >
              <div className="headline text-3xl text-white lg:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-[11px] font-medium tracking-wide text-silver-dim uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[10px] tracking-[0.3em] text-silver-dim uppercase">
          Scroll
        </span>
        <div className="glass flex h-10 w-6 justify-center rounded-full pt-2">
          <ArrowDown size={12} className="scroll-dot text-primary" />
        </div>
      </motion.a>
    </section>
  );
}
