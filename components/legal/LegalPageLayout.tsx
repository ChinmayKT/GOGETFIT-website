import AmbientBackground from "@/components/3d/AmbientBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LegalHero from "./LegalHero";
import LegalContent from "./LegalContent";
import type { LegalPageData } from "@/data/legal/types";

/**
 * Normal-scroll shell for legal/content pages — no SmoothScroll/SnapScroll,
 * no FloatingPhone. Keeps the same background, navbar, footer and design
 * tokens as the homepage so these routes read as part of the same site.
 */
export default function LegalPageLayout({ data }: { data: LegalPageData }) {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-[1000px] px-6 pt-36 pb-24 md:px-8 md:pt-40">
        <LegalHero
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
          lastUpdated={data.lastUpdated}
        />
        <LegalContent sections={data.sections} />
      </main>
      <Footer />
    </>
  );
}
