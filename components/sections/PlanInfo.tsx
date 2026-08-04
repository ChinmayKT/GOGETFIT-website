import { Check } from "lucide-react";
import { PLAN_INCLUDES, PLAN_NEXT_STEPS, PLAN_TERMS, PLAN_ELIGIBILITY, type Plan } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Shared plan write-up — description + fine print — used by the popup and the full plans page. */
export default function PlanInfo({
  plan,
  headingClassName = "text-xl md:text-2xl",
}: {
  plan: Plan;
  headingClassName?: string;
}) {
  return (
    <>
      <h3 className={cn("headline text-primary", headingClassName)}>{plan.name}</h3>

      <p className="mt-4 text-sm leading-relaxed text-silver">{plan.description}</p>

      <h4 className="mt-6 text-xs font-semibold tracking-wide text-white uppercase">
        {plan.duration} plan includes
      </h4>
      <ul className="mt-3 space-y-2">
        {PLAN_INCLUDES.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-silver">
            <Check size={15} className="mt-0.5 shrink-0 text-primary" />
            {f}
          </li>
        ))}
      </ul>

      <h4 className="mt-6 text-xs font-semibold tracking-wide text-white uppercase">
        What next, once you&apos;ve enrolled?
      </h4>
      <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-silver">
        {PLAN_NEXT_STEPS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>

      <h4 className="mt-6 text-xs font-semibold tracking-wide text-white uppercase">
        Terms and conditions
      </h4>
      <ul className="mt-3 list-disc space-y-1.5 pl-4 text-xs text-silver-dim">
        {PLAN_TERMS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <h4 className="mt-6 text-xs font-semibold tracking-wide text-white uppercase">Eligibility</h4>
      <p className="mt-2 text-xs text-silver-dim">{PLAN_ELIGIBILITY}</p>
    </>
  );
}
