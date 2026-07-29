import Image from "next/image";
import { cn } from "@/lib/utils";

const BADGE_HEIGHT = 44;

export const BADGES = {
  apple: { src: "/badges/apple-app-store-badge.png", width: 807, height: 249 },
  google: { src: "/badges/google-play-badge.png", width: 819, height: 249 },
} as const;

/** Official Apple/Google store badge — used in Hero and the Download section. */
export default function StoreButton({
  store,
  href,
  label,
  className,
}: {
  store: keyof typeof BADGES;
  href: string;
  label: string;
  className?: string;
}) {
  const badge = BADGES[store];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex items-center transition-transform duration-300 hover:scale-105 active:scale-95",
        className
      )}
    >
      <Image
        src={badge.src}
        alt={label}
        width={badge.width}
        height={badge.height}
        style={{ height: BADGE_HEIGHT, width: "auto" }}
      />
    </a>
  );
}
