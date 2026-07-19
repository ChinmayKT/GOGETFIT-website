import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://gogetfit.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GOGETFIT — Your Transformation Starts Here",
    template: "%s · GOGETFIT",
  },
  description:
    "India's health transformation company. Lose weight, gain healthy weight, and build a lasting lifestyle with dedicated coaches, personalized nutrition, and real accountability.",
  keywords: [
    "weight loss India",
    "health transformation",
    "fitness coach",
    "nutrition plan",
    "healthy weight gain",
    "GOGETFIT",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "GOGETFIT",
    title: "GOGETFIT — Your Transformation Starts Here",
    description:
      "400+ transformations. Dedicated coaches, personalized plans, real accountability. India's most personal health transformation company.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "GOGETFIT — Your Transformation Starts Here",
    description:
      "400+ transformations. Dedicated coaches, personalized plans, real accountability.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GOGETFIT",
  url: SITE_URL,
  description:
    "Indian health transformation company offering dedicated coaching, personalized workout plans, and nutrition guidance.",
  email: "hello@gogetfit.in",
  telephone: "+91-98765-43210",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560038",
    addressCountry: "IN",
  },
  sameAs: [
    "https://instagram.com/gogetfit",
    "https://youtube.com/@gogetfit",
    "https://linkedin.com/company/gogetfit",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} noise antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
