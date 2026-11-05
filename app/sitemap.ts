import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PAGES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/plans", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
] as const;

/** Only real public pages; empty until SITE_URL (the production domain) is configured. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];
  return PAGES.map(({ path, ...rest }) => ({ ...rest, url: `${SITE_URL}${path}`, lastModified: new Date() }));
}
