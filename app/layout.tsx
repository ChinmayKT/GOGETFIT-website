import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { FOOTER_LINKS } from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/site";
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

const DESCRIPTION =
  "GOGETFIT is a science-backed fitness app that simplifies fitness through personalized diet plans, workout plans, expert coaching, nutrition guidance, education, progress tracking, and a supportive community.";

/** Site-wide defaults; each page sets its own title, description, canonical and social tags via pageMetadata(). */
export const metadata: Metadata = {
  ...(SITE_URL && { metadataBase: new URL(SITE_URL) }),
  title: "GOGETFIT – Simplifying Fitness for the World | Personalized Fitness & Nutrition",
  description: DESCRIPTION,
  keywords: [
    "weight loss India",
    "health transformation",
    "fitness coach",
    "nutrition plan",
    "healthy weight gain",
    "GOGETFIT",
  ],
  // no `robots` here: index/follow is the default, and the 404 page gets Next's noindex alone
};

// Every value mirrors what the site itself displays (lib/data.ts) — no extra claims.
const { contact, social } = FOOTER_LINKS;
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  ...(SITE_URL && { url: SITE_URL, logo: `${SITE_URL}/apple-icon.png` }),
  description: DESCRIPTION,
  email: contact.email,
  telephone: contact.phone.replace(/\s/g, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: "11th cross road, Malleshwaram",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560003",
    addressCountry: "IN",
  },
  sameAs: social.map((s) => s.href),
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
        {/* honour the OS "reduce motion" setting: no slides/blur, fades only */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
