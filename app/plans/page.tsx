import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import AllPlans from "@/components/sections/AllPlans";

export const metadata: Metadata = pageMetadata({
  title: "Plans & Pricing | GOGETFIT",
  description:
    "Compare GOGETFIT coaching plans — 12, 24 and 52-week solo plans, couples plans and a family plan — with prices, what each plan includes and how enrolment works.",
  path: "/plans",
});

export default function PlansPage() {
  return <AllPlans />;
}
