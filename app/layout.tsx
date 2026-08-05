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
    default: "GOGETFIT – Simplifying Fitness for the World | Personalized Fitness & Nutrition",
    template: "%s · GOGETFIT",
  },
  description:
    "GOGETFIT is a science-backed fitness app that simplifies fitness through personalized diet plans, workout plans, expert coaching, nutrition guidance, education, progress tracking, and a supportive community.",
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
    title: "GOGETFIT – Simplifying Fitness for the World | Personalized Fitness & Nutrition",
    description:
      "GOGETFIT is a science-backed fitness app that simplifies fitness through personalized diet plans, workout plans, expert coaching, nutrition guidance, education, progress tracking, and a supportive community.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "GOGETFIT – Simplifying Fitness for the World | Personalized Fitness & Nutrition",
    description:
      "GOGETFIT is a science-backed fitness app that simplifies fitness through personalized diet plans, workout plans, expert coaching, nutrition guidance, education, progress tracking, and a supportive community.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GOGETFIT",
  url: SITE_URL,
  description:
    "GOGETFIT is a science-backed fitness app that simplifies fitness through personalized diet plans, workout plans, expert coaching, nutrition guidance, education, progress tracking, and a supportive community.",
  email: "prajwal@gogetfitonline.com",
  telephone: "+91-98765-43210",
  address: {
    "@type": "PostalAddress",
    streetAddress: "11th cross road, Malleshwaram",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560003",
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
