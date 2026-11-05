import type { Metadata } from "next";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/animations/SmoothScroll";
import SnapScroll from "@/components/animations/SnapScroll";
import AmbientBackground from "@/components/3d/AmbientBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Coaches from "@/components/sections/Coaches";
import Leadership from "@/components/sections/Leadership";
import Transformations from "@/components/sections/Transformations";
import Plans from "@/components/sections/Plans";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import DownloadCta from "@/components/sections/DownloadCta";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "GOGETFIT – Simplifying Fitness for the World | Personalized Fitness & Nutrition",
  description:
    "GOGETFIT is a science-backed fitness app that simplifies fitness through personalized diet plans, workout plans, expert coaching, nutrition guidance, education, progress tracking, and a supportive community.",
  path: "/",
});

// The phone only renders on desktop — load it lazily to keep mobile bundles lean.
const FloatingPhone = dynamic(
  () => import("@/components/phone/FloatingPhone")
);

export default function Home() {
  return (
    <SmoothScroll>
      <AmbientBackground />
      <Navbar />
      <SnapScroll />
      <FloatingPhone />
      <main>
        <Hero />
        <About />
        <Features />
        <Coaches />
        <Leadership />
        <Transformations />
        <Plans />
        <FAQ />
        <Contact />
        <DownloadCta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
