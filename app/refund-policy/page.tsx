import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { refundPolicy } from "@/data/legal/refundPolicy";

export const metadata: Metadata = {
  title: { absolute: "Refund Policy | GOGETFIT" },
  description: "Read the GOGETFIT Refund Policy.",
};

export default function RefundPolicyPage() {
  return <LegalPageLayout data={refundPolicy} />;
}
