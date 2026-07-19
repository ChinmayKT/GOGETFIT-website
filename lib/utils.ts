import { type ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * In-page section anchors (#about, #contact, ...) only resolve on the
 * homepage. From any other route, prefix with "/" so the link navigates
 * home first, then to the section. Non-hash hrefs pass through untouched.
 */
export function toSectionHref(href: string, isHome: boolean) {
  return href.startsWith("#") && !isHome ? `/${href}` : href;
}
