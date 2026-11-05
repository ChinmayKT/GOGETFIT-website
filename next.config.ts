import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old placeholder legal pages were removed; the PDFs are the official policies.
  async redirects() {
    return ["privacy-policy", "terms-of-service", "refund-policy"].map((name) => ({
      source: `/${name}`,
      destination: `/documents/${name}.pdf`,
      permanent: true,
    }));
  },
};

export default nextConfig;
