"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { FOOTER_LINKS } from "@/lib/data";
import SocialIcon from "@/components/shared/SocialIcon";
import SmartLink from "@/components/shared/SmartLink";
import GoGetFitLogo from "@/components/brand/GoGetFitLogo";
import { toSectionHref } from "@/lib/utils";
import { MapPin, Mail, Phone } from "lucide-react";

const SOCIAL_ICON: Record<string, "instagram" | "youtube" | "linkedin" | "x"> = {
  Instagram: "instagram",
  YouTube: "youtube",
  LinkedIn: "linkedin",
  X: "x",
};

const COLUMNS = [
  { heading: "Company", items: FOOTER_LINKS.company },
  { heading: "Product", items: FOOTER_LINKS.product },
  { heading: "Legal", items: FOOTER_LINKS.legal },
] as const;

/**
 * Footer — the final chapter, calm on purpose: nothing here moves in 3D.
 * A huge low-opacity wordmark, real navigation, and real contact/social
 * data (same source the rest of the site uses).
 *
 * Self-contained on every route: the entrance plays off an
 * IntersectionObserver on the section itself, not the homepage-only
 * SnapScroll event system. That's what makes it safe to drop into legal
 * pages (no SnapScroll mounted there at all) and keeps it correct after a
 * browser back/forward navigation restores scroll straight to the footer,
 * where a snap-index-based trigger could otherwise miss its event and
 * leave the wordmark stuck invisible.
 */
export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const isHome = usePathname() === "/";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      let tl: gsap.core.Timeline | null = null;
      const play = () => {
        tl?.kill();
        const t = gsap.timeline();
        tl = t;
        t.fromTo(
          "[data-ft-wordmark]",
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: "power2.out" },
          0
        );
        t.fromTo(
          section.querySelectorAll("[data-ft-head] > *"),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" },
          0.1
        );
        t.fromTo(
          section.querySelectorAll("[data-ft-col]"),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          0.3
        );
        t.fromTo(
          "[data-ft-social] > *",
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" },
          0.55
        );
        t.fromTo(
          "[data-ft-bottom]",
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          0.7
        );
      };
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) play();
        },
        { threshold: 0.2 }
      );
      observer.observe(section);
      return () => {
        observer.disconnect();
        tl?.kill();
      };
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="footer"
      ref={sectionRef}
      className="relative z-10 flex min-h-screen flex-col overflow-hidden px-6 py-20 lg:h-screen lg:min-h-[100svh] lg:py-0 lg:pt-[11vh] lg:pb-8"
    >
      {/* Huge low-opacity closing wordmark — the official logo at the same
          scale the old styled text occupied (~80vw). */}
      <div
        data-ft-wordmark
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-20 hidden justify-center lg:flex"
        style={{ opacity: 0 }}
      >
        <GoGetFitLogo alt="" className="w-[80vw] opacity-[0.05]" priority />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,106,0,0.07), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
        {/* Header */}
        <div data-ft-head className="text-center">
          <div>
            <GoGetFitLogo alt="GOGETFIT — The Right Way" className="mx-auto h-12 md:h-14" priority />
          </div>
          <p className="mx-auto mt-4 max-w-md text-sm text-silver-dim">
            Transform your health. Build a lifestyle that lasts.
          </p>
        </div>

        {/* Nav columns + contact */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {COLUMNS.map((col) => (
            <div key={col.heading} data-ft-col>
              <h3 className="text-xs font-semibold tracking-widest text-silver-dim uppercase">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((l) => (
                  <li key={l.label}>
                    <SmartLink
                      href={toSectionHref(l.href, isHome)}
                      className="text-sm text-silver transition-colors hover:text-primary"
                    >
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div data-ft-col>
            <h3 className="text-xs font-semibold tracking-widest text-silver-dim uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-silver">
              <li className="flex gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
                <span className="text-xs leading-relaxed">{FOOTER_LINKS.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="shrink-0 text-primary" />
                <a
                  href={`mailto:${FOOTER_LINKS.contact.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {FOOTER_LINKS.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="shrink-0 text-primary" />
                <a
                  href={`tel:${FOOTER_LINKS.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-primary"
                >
                  {FOOTER_LINKS.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social */}
        <div data-ft-social className="mt-8 flex justify-center gap-3 lg:mt-9">
          {FOOTER_LINKS.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-silver transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_16px_rgba(255,106,0,0.3)]"
            >
              <SocialIcon name={SOCIAL_ICON[s.label] ?? "x"} />
            </a>
          ))}
        </div>

        {/* Bottom line */}
        <div
          data-ft-bottom
          className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-silver-dim sm:flex-row lg:mt-auto"
        >
          <span>© {new Date().getFullYear()} GOGETFIT Health Pvt. Ltd. All rights reserved.</span>
          <span>Made for transformations that last.</span>
        </div>
      </div>
    </footer>
  );
}
