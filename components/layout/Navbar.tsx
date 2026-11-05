"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import GlassButton from "@/components/shared/GlassButton";
import SmartLink from "@/components/shared/SmartLink";
import GoGetFitLogo from "@/components/brand/GoGetFitLogo";
import { cn, toSectionHref } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open: Escape closes it (focus back to the toggle), a tap
  // outside closes it, growing to the desktop nav closes it, and the page
  // behind is frozen (same modal:toggle signal useDialog uses for Lenis/SnapScroll).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1152px)");
    const onDesktop = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onDesktop);
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("modal:toggle", { detail: true }));
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onDesktop);
      root.style.overflow = prevOverflow;
      window.dispatchEvent(new CustomEvent("modal:toggle", { detail: false }));
    };
  }, [open]);

  /** Menu item to highlight: the page on /plans and /faq, else the homepage section on screen. */
  const currentHref = () => {
    if (pathname === "/plans") return "#plans";
    if (pathname === "/faq") return "#faq";
    if (!isHome) return null;
    let current: string = NAV_LINKS[0].href;
    for (const l of NAV_LINKS) {
      const el = document.querySelector(l.href);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = l.href;
    }
    return current;
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        aria-label="Main"
        className={cn(
          "flex w-full max-w-[1400px] items-center justify-between rounded-2xl px-5 py-2.5 transition-colors duration-300",
          scrolled ? "glass-strong" : "border border-transparent"
        )}
      >
        {/* Logo */}
        <SmartLink href={isHome ? "#hero" : "/"} aria-label="GOGETFIT Home" className="shrink-0">
          <GoGetFitLogo alt="" className="h-8 md:h-10" priority />
        </SmartLink>

        {/* Desktop links — from 1152px only: logo + links + buttons need ~1090px
            with padding, so anything narrower collides and uses the menu instead */}
        <div className="hidden items-center gap-8 min-[1152px]:flex">
          {NAV_LINKS.map((l) => (
            <SmartLink
              key={l.href}
              href={toSectionHref(l.href, isHome)}
              className="text-[13px] font-medium text-silver transition-colors duration-300 hover:text-white"
            >
              {l.label}
            </SmartLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 min-[1152px]:flex">
          <GlassButton href={toSectionHref("#download", isHome)} className="px-5 py-2.5 text-xs">
            <Download size={14} /> Download
          </GlassButton>
          <GlassButton
            href={toSectionHref("#contact", isHome)}
            variant="primary"
            className="px-5 py-2.5 text-xs"
          >
            Book Consultation
          </GlassButton>
        </div>

        {/* Menu toggle — mobile, tablet and narrow laptops (< 1152px) */}
        <button
          ref={toggleRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => {
            if (!open) setActive(currentHref());
            setOpen(!open);
          }}
          className={cn(
            "rounded-full p-2.5 min-[1152px]:hidden",
            open ? "glass-strong text-white" : "glass"
          )}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Menu panel — solid charcoal (no see-through glass) so labels never clash
          with the page behind; full-width on phones, a right-aligned panel above that */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="absolute top-full right-4 left-4 mt-3 flex max-h-[calc(100svh-6.5rem)] flex-col overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-raised px-6 pt-3 pb-6 shadow-[0_24px_60px_rgba(0,0,0,0.6)] sm:left-auto sm:w-96 min-[1152px]:hidden"
          >
            <ul className="divide-y divide-white/10">
              {NAV_LINKS.map((l) => {
                const isActive = active === l.href;
                return (
                  <li key={l.href}>
                    <SmartLink
                      href={toSectionHref(l.href, isHome)}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? (isHome ? "location" : "page") : undefined}
                      className={cn(
                        "headline relative flex items-center py-4 pl-5 text-xl font-semibold transition-colors",
                        isActive ? "text-primary" : "text-white hover:text-primary"
                      )}
                    >
                      {isActive && (
                        <span
                          aria-hidden
                          className="absolute top-1/2 left-0 h-7 w-[3px] -translate-y-1/2 rounded-full bg-primary"
                        />
                      )}
                      {l.label}
                    </SmartLink>
                  </li>
                );
              })}
            </ul>
            <GlassButton
              href={toSectionHref("#contact", isHome)}
              variant="primary"
              onClick={() => setOpen(false)}
              className="mt-4 w-full py-4 text-base"
            >
              Book Free Consultation
            </GlassButton>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
