import GlassButton from "@/components/shared/GlassButton";
import { PLAN_PEOPLE_LABEL, formatPlanPrice, type Plan } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Shared price/meta/CTA block — used by the popup's sidebar and the full plans page. */
export default function PlanPriceSidebar({
  plan,
  bookHref,
  className,
  ctaClassName = "mt-6 w-full text-sm",
}: {
  plan: Plan;
  bookHref: string;
  className?: string;
  ctaClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="headline text-gradient-silver text-3xl">{formatPlanPrice(plan.price)}</div>
      <p className="mt-1 text-xs text-silver-dim">Inclusive of taxes</p>

      <div className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm text-silver">
        <div className="flex justify-between gap-3">
          <span className="text-silver-dim">Duration</span>
          <span>{plan.duration}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-silver-dim">Group size</span>
          <span>{PLAN_PEOPLE_LABEL[plan.people] ?? `${plan.people} People`}</span>
        </div>
      </div>

      <GlassButton href={bookHref} variant="primary" className={ctaClassName}>
        Book Now
      </GlassButton>
    </div>
  );
}
