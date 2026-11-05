import { Check } from "lucide-react";
import { PLAN_INCLUDES, PLAN_NEXT_STEPS, PLAN_TERMS, PLAN_ELIGIBILITY, type Plan } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Shared plan write-up — description + fine print — used by the popup and the full plans page. */
export default function PlanInfo({
  plan,
  headingClassName = "text-xl md:text-2xl",
  headingLevel: Heading = "h3",
}: {
  plan: Plan;
  headingClassName?: string;
  /** h3 inside the homepage popup (under the section h2); h2 on /plans (under the page h1) */
  headingLevel?: "h2" | "h3";
}) {
  const Sub = Heading === "h2" ? "h3" : "h4";
  return (
    <>
      <Heading className={cn("headline text-white", headingClassName)}>{plan.name}</Heading>

      <p className="mt-4 text-sm leading-relaxed text-silver">{plan.description}</p>

      <Sub className="mt-6 text-sm font-medium text-white">
        {plan.duration} plan includes
      </Sub>
      <ul className="mt-3 space-y-2">
        {PLAN_INCLUDES.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-silver">
            <Check size={15} className="mt-0.5 shrink-0 text-silver-dim" />
            {f}
          </li>
        ))}
      </ul>

      <Sub className="mt-6 text-sm font-medium text-white">
        What next, once you&apos;ve enrolled?
      </Sub>
      <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-silver">
        {PLAN_NEXT_STEPS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>

      <Sub className="mt-6 text-sm font-medium text-white">
        Terms and conditions
      </Sub>
      <ul className="mt-3 list-disc space-y-1.5 pl-4 text-xs text-silver-dim">
        {PLAN_TERMS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <Sub className="mt-6 text-sm font-medium text-white">Eligibility</Sub>
      <p className="mt-2 text-xs text-silver-dim">{PLAN_ELIGIBILITY}</p>
    </>
  );
}
