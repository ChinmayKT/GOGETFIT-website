"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

/**
 * Modal behaviour for the site's popups: focus moves in on open, Tab is
 * trapped inside, Escape closes, page scroll is locked, and focus returns
 * to the opener on close. Fires `modal:toggle` so the scroll systems
 * (SnapScroll's wheel observer, Lenis) pause while a dialog is up.
 * Attach the returned ref to the element carrying role="dialog".
 */
export function useDialog<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;

    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevOverflow = [root.style.overflow, document.body.style.overflow];
    root.style.overflow = document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("modal:toggle", { detail: true }));

    const focusables = () => [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)];
    (focusables()[0] ?? dialog).focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return e.preventDefault();
      const first = items[0];
      const last = items[items.length - 1];
      const inside = dialog.contains(document.activeElement);
      if (e.shiftKey && (!inside || document.activeElement === first)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (!inside || document.activeElement === last)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      [root.style.overflow, document.body.style.overflow] = prevOverflow;
      window.dispatchEvent(new CustomEvent("modal:toggle", { detail: false }));
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  return ref;
}
