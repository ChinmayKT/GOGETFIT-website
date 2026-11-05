import AmbientBackground from "@/components/3d/AmbientBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LegalHero from "@/components/legal/LegalHero";
import PlanInfo from "./PlanInfo";
import PlanPriceSidebar from "./PlanPriceSidebar";
import { PLANS } from "@/lib/data";

/**
 * Full plans catalogue — normal-scroll page (no SmoothScroll/SnapScroll/
 * FloatingPhone), same shell as the legal pages. Every plan is fully
 * expanded; the price/CTA sidebar sticks near the top of the viewport
 * while its own card scrolls past, then hands off to the next plan's.
 */
export default function AllPlans() {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-[1800px] px-6 pt-36 pb-24 md:px-10 md:pt-40">
        <LegalHero
          eyebrow="Plans & Pricing"
          title="All GOGETFIT Plans"
          description="Solo, couples, or family — pick the plan that fits your life and get a dedicated coach, a personalized program, and real accountability."
        />

        <div className="mt-14 flex flex-col gap-6">
          {PLANS.map((p) => (
            <div
              key={p.id}
              // no overflow-hidden here — it would make this card the nearest
              // scroll container and break the sidebar's sticky positioning
              className="glass-strong flex flex-col rounded-[28px] md:flex-row"
            >
              <div className="min-w-0 flex-1 p-7 md:p-10">
                <div className="max-w-3xl">
                  <PlanInfo plan={p} headingLevel="h2" />
                </div>
              </div>
              <PlanPriceSidebar
                plan={p}
                bookHref="/#contact"
                className="shrink-0 border-t border-white/10 p-7 md:sticky md:top-28 md:w-[320px] md:self-start md:border-t-0 md:border-l md:p-9"
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
