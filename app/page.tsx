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
import Contact from "@/components/sections/Contact";
import DownloadCta from "@/components/sections/DownloadCta";

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
        <Contact />
        <DownloadCta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
