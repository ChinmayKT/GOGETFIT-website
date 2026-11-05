import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import AllFaqs from "@/components/sections/AllFaqs";

export const metadata: Metadata = pageMetadata({
  title: "FAQ | GOGETFIT",
  description:
    "Answers to common questions about GOGETFIT: what the app offers, whether it is free, personal coaching, diet and workout plans, progress tracking and how to get started.",
  path: "/faq",
});

export default function FaqPage() {
  return <AllFaqs />;
}
