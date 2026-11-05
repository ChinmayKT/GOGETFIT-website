import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassButton from "@/components/shared/GlassButton";

// Next.js adds <meta name="robots" content="noindex"> to not-found responses itself.
export const metadata: Metadata = {
  title: { absolute: "Page not found | GOGETFIT" },
};

/** Branded 404 — same shell as /plans and /faq, served with a real 404 status. */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 mx-auto flex min-h-[80svh] max-w-4xl flex-col justify-center px-6 pt-36 pb-24 md:px-8 md:pt-40">
        <p className="eyebrow">
          Error 404
        </p>
        <h1 className="headline mt-3 text-4xl text-white sm:text-5xl md:text-6xl">
          Page not found
        </h1>
        <p className="mt-5 max-w-2xl text-base text-silver md:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Head back to the homepage, or explore our plans and FAQs.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <GlassButton href="/" variant="primary">
            Back to Home
          </GlassButton>
          <GlassButton href="/plans">View Plans</GlassButton>
          <GlassButton href="/faq">Read FAQs</GlassButton>
        </div>
      </main>
      <Footer />
    </>
  );
}
