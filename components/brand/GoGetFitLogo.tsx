import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official GOGETFIT brand assets, sourced from the shipped mobile app
 * (GoGetFit 2.0/assets/branding/gogetfit_logo.png — true alpha PNG, not the
 * flattened JPEGs in the handoff /logo folder, which had no usable
 * transparency). "wordmark" is the same asset cropped just above the
 * tagline for contexts too small to render "THE RIGHT WAY" legibly.
 */
const ASSETS = {
  transparent: {
    full: { src: "/brand/gogetfit-logo-transparent.png", width: 994, height: 234 },
    wordmark: { src: "/brand/gogetfit-wordmark-transparent.png", width: 994, height: 163 },
  },
  normal: {
    full: { src: "/brand/gogetfit-logo-normal.png", width: 932, height: 228 },
  },
} as const;

export default function GoGetFitLogo({
  variant = "transparent",
  lockup = "full",
  alt = "GOGETFIT — The Right Way",
  className,
  priority,
}: {
  /** transparent = white+orange, for dark surfaces (the whole site). normal = black+orange, for light surfaces. */
  variant?: "transparent" | "normal";
  /** full = wordmark + tagline. wordmark = just the mark, no tagline (small contexts, e.g. navbar). */
  lockup?: "full" | "wordmark";
  /** Pass "" when a parent link/heading already carries the accessible name. */
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const asset =
    variant === "transparent" && lockup === "wordmark"
      ? ASSETS.transparent.wordmark
      : ASSETS[variant].full;

  return (
    <Image
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt={alt}
      priority={priority}
      className={cn("h-auto w-auto", className)}
    />
  );
}
