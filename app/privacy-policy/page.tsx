import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { privacyPolicy } from "@/data/legal/privacyPolicy";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | GOGETFIT" },
  description: "Read the GOGETFIT Privacy Policy.",
};

export default function PrivacyPolicyPage() {
  return <LegalPageLayout data={privacyPolicy} />;
}
