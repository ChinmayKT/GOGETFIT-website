import type { ReactNode } from "react";

/** App Store / Google Play badge — used in Hero and the Download section. */
export default function StoreButton({
  icon,
  top,
  bottom,
  href,
  label,
}: {
  icon: ReactNode;
  top: string;
  bottom: string;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-black px-5 py-2.5 transition-transform duration-300 hover:scale-105 active:scale-95"
    >
      {icon}
      <span className="text-left leading-tight">
        <span className="block text-[9px] text-white/70 uppercase">{top}</span>
        <span className="block text-sm font-bold text-white">{bottom}</span>
      </span>
    </a>
  );
}
