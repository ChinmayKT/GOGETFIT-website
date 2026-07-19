import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { termsOfService } from "@/data/legal/termsOfService";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | GOGETFIT" },
  description: "Read the GOGETFIT Terms of Service.",
};

export default function TermsOfServicePage() {
  return <LegalPageLayout data={termsOfService} />;
}
