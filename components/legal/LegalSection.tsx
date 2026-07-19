import { cn } from "@/lib/utils";
import type { LegalSection as LegalSectionType } from "@/data/legal/types";

export default function LegalSection({
  section,
  isLast,
}: {
  section: LegalSectionType;
  isLast: boolean;
}) {
  return (
    <section
      id={section.id}
      className={cn("scroll-mt-32", !isLast && "mb-8 border-b border-white/[0.06] pb-8")}
    >
      <span className="headline text-sm font-semibold text-primary">{section.number}</span>
      <h2 className="headline mt-2 text-xl text-white sm:text-2xl">{section.title}</h2>
      <div className="mt-4 space-y-4">
        {section.content.map((paragraph, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-silver sm:text-base">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
