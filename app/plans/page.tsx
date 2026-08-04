import type { Metadata } from "next";
import AllPlans from "@/components/sections/AllPlans";

export const metadata: Metadata = {
  title: { absolute: "Plans & Pricing | GOGETFIT" },
  description:
    "Solo, couples, or family GOGETFIT coaching plans — pricing, duration, and everything included.",
};

export default function PlansPage() {
  return <AllPlans />;
}
