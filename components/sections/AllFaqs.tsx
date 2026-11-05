import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LegalHero from "@/components/legal/LegalHero";
import { FAQS } from "@/lib/data";

/**
 * Full FAQ list — normal-scroll page (no SmoothScroll/SnapScroll/
 * FloatingPhone), same shell as the legal pages. Every question is a
 * fully-expanded card (no accordion) — nothing to click, just read.
 */
export default function AllFaqs() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 mx-auto max-w-4xl px-6 pt-36 pb-24 md:px-8 md:pt-40">
        <LegalHero
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about GOGETFIT — plans, coaching, and how to get started."
        />

        <div className="mt-14 flex flex-col gap-6">
          {FAQS.map((f) => (
            <div key={f.id} className="glass-strong rounded-[20px] p-8 md:p-10">
              <h2 className="headline text-xl text-primary md:text-2xl">{f.question}</h2>
              <p className="mt-4 text-base leading-relaxed text-white md:text-lg">{f.answer}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
