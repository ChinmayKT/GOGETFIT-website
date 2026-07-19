"use client";

import { useEffect, useState } from "react";
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
  const isHome = usePathname() === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-[1400px] items-center justify-between rounded-full px-5 py-2.5 transition-all duration-700",
          scrolled ? "glass-strong" : "border border-transparent"
        )}
      >
        {/* Logo */}
        <SmartLink href={isHome ? "#hero" : "/"} aria-label="GOGETFIT Home" className="shrink-0">
          <GoGetFitLogo alt="" className="h-8 md:h-10" priority />
        </SmartLink>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
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

        <div className="hidden items-center gap-3 md:flex">
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

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="glass rounded-full p-2.5 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong absolute top-full right-4 left-4 mt-2 flex flex-col gap-1 rounded-3xl p-4 md:hidden"
          >
            {NAV_LINKS.map((l) => (
              <SmartLink
                key={l.href}
                href={toSectionHref(l.href, isHome)}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-silver transition hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </SmartLink>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <GlassButton
                href={toSectionHref("#download", isHome)}
                onClick={() => setOpen(false)}
                className="text-xs"
              >
                <Download size={14} /> Download App
              </GlassButton>
              <GlassButton
                href={toSectionHref("#contact", isHome)}
                variant="primary"
                onClick={() => setOpen(false)}
                className="text-xs"
              >
                Book Consultation
              </GlassButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
