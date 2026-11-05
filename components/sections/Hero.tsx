"use client";

import { motion } from "framer-motion";
import { STATS, IOS_APP_STORE_URL, ANDROID_PLAY_STORE_URL } from "@/lib/data";
import GlassButton from "@/components/shared/GlassButton";
import StoreButton from "@/components/shared/StoreButton";
import DeviceFrame from "@/components/phone/DeviceFrame";
import { PhoneScreen } from "@/components/phone/screens";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-[100svh] items-center overflow-hidden px-6 pt-28 pb-16 lg:h-screen lg:items-center-safe lg:pt-0 lg:pb-0 lg-short:pt-12"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-[1440px] lg:pr-[30%]"
      >
        <motion.div
          variants={item}
          className="eyebrow mb-8 lg-short:mb-4"
        >
          India&apos;s most personal health transformation company
        </motion.div>

        <motion.h1
          variants={item}
          className="headline text-[clamp(2.4rem,11vw,4.5rem)] break-words sm:text-7xl lg:text-[5.6rem] xl:text-8xl lg-short:text-[4.2rem]"
        >
          Simplifying Fitness
          <br />
          for the World
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-base leading-relaxed text-silver md:text-lg lg-short:mt-4"
        >
          GOGETFIT is a science-backed social fitness platform that
          educates, empowers, and guides people towards healthier lifestyles
          through personalized coaching, nutrition, technology, and
          community.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-3 max-w-2xl text-base leading-relaxed text-silver md:text-lg"
        >
          Fitness isn&apos;t a privilege. It&apos;s everyone&apos;s right.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4 lg-short:mt-6">
          <StoreButton
            store="apple"
            href={IOS_APP_STORE_URL}
            label="Download GOGETFIT on the App Store"
          />
          <StoreButton
            store="google"
            href={ANDROID_PLAY_STORE_URL}
            label="Get GOGETFIT on Google Play"
          />
          <GlassButton href="#contact" variant="primary">
            Book Free Consultation
          </GlassButton>
        </motion.div>

        {/* Mobile phone (stacked storytelling) */}
        <motion.div variants={item} className="mt-14 flex justify-center lg:hidden">
          <div style={{ transform: "perspective(1600px) rotateY(-8deg) rotateX(2deg)", transformStyle: "preserve-3d" }}>
          <DeviceFrame className="w-[clamp(200px,62vw,260px)]">
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
          className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-6 lg:mt-16 lg-short:mt-6 lg-short:pt-4"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="headline text-3xl text-white tabular-nums lg:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-[13px] text-silver-dim">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

    </section>
  );
}
