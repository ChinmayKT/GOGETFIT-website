import type { Metadata } from "next";
import AllFaqs from "@/components/sections/AllFaqs";

export const metadata: Metadata = {
  title: { absolute: "FAQ | GOGETFIT" },
  description: "Frequently asked questions about GOGETFIT — plans, coaching, and getting started.",
};

export default function FaqPage() {
  return <AllFaqs />;
}
