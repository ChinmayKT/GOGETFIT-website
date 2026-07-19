"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LegalSection from "./LegalSection";
import type { LegalSection as LegalSectionType } from "@/data/legal/types";

export default function LegalContent({ sections }: { sections: LegalSectionType[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[200px_1fr] lg:gap-16"
    >
      {/* Sticky table of contents — desktop only */}
      <nav aria-label="On this page" className="hidden lg:block">
        <div className="sticky top-32">
          <p className="text-xs font-semibold tracking-widest text-silver-dim uppercase">
            On This Page
          </p>
          <ul className="mt-4 space-y-2.5 border-l border-white/[0.06]">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={scrollToSection(s.id)}
                  className={`-ml-px block border-l-2 py-0.5 pl-4 text-sm transition-colors duration-300 ${
                    activeId === s.id
                      ? "border-primary text-primary"
                      : "border-transparent text-silver-dim hover:text-silver"
                  }`}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Document */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 top-1/3 -z-10 h-72 opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(255,106,0,0.2), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div className="glass rounded-[28px] px-6 py-10 sm:px-10 sm:py-12">
          {sections.map((section, i) => (
            <LegalSection key={section.id} section={section} isLast={i === sections.length - 1} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
