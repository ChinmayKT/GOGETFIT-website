"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import type { FaqItem } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Shared accordion list — used by the homepage FAQ teaser and the full /faq page. */
export default function FaqAccordion({
  items,
  defaultOpenFirst = false,
}: {
  items: FaqItem[];
  defaultOpenFirst?: boolean;
}) {
  const [open, setOpen] = useState<string | null>(
    defaultOpenFirst ? (items[0]?.id ?? null) : null
  );

  return (
    <div className="flex flex-col gap-3">
      {items.map((f, i) => {
        const isOpen = open === f.id;
        return (
          <Reveal
            key={f.id}
            delay={0.22 + i * 0.05}
            margin="0px"
            mobileReveal={i % 2 === 0 ? "left" : "right"}
          >
            <div className="glass overflow-hidden rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : f.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-primary">{f.question}</span>
                <ChevronDown
                  size={18}
                  className={cn(
                    "shrink-0 text-primary transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-sm leading-relaxed text-white">{f.answer}</p>
              </motion.div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
