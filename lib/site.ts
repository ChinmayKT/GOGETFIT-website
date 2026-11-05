import type { Metadata } from "next";

/**
 * Production origin, e.g. "https://www.example.com" — the ONE place the
 * domain is configured. Set `SITE_URL` in the environment before
 * `npm run build` (metadata, sitemap and robots are generated at build time).
 *
 * Left unset (production domain not confirmed yet), nothing domain-dependent
 * is published: no canonical, og:url or sitemap entries —
 * better missing than pointing search engines at the wrong site.
 */
export const SITE_URL = process.env.SITE_URL?.replace(/\/+$/, "") || undefined;
if (SITE_URL && !/^https:\/\/[^/]+$/.test(SITE_URL)) {
  throw new Error(`SITE_URL must be a bare https origin like https://www.example.com — got "${SITE_URL}"`);
}

export const SITE_NAME = "GOGETFIT";

/** Title, description, canonical, Open Graph and Twitter metadata for one page. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    ...(SITE_URL && { alternates: { canonical: path } }),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_IN",
      title,
      description,
      ...(SITE_URL && { url: path }),
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
