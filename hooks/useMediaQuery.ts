"use client";

import { useEffect, useState } from "react";
import { QUERY_MOBILE, QUERY_TABLET, QUERY_DESKTOP } from "@/lib/breakpoints";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Desktop = phone choreography enabled. */
export function useIsDesktop() {
  return useMediaQuery(QUERY_DESKTOP);
}

/** Tablet = 768-1023px, gets a compact nav + simplified animation. */
export function useIsTablet() {
  return useMediaQuery(QUERY_TABLET);
}

/** Mobile = below 768px, gets no floating nav and no scroll-jacked animation. */
export function useIsMobile() {
  return useMediaQuery(QUERY_MOBILE);
}
