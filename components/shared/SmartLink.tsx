import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<"a"> & { href: string };

/**
 * Plain "#section" hashes stay a native <a> — SnapScroll's document click
 * listener owns those for the cinematic same-page snap. Anything else
 * (a real route, or "/#section" from a non-home page) goes through Next's
 * Link for a client-side transition instead of a full page reload.
 */
export default function SmartLink({ href, children, ...rest }: Props) {
  if (href.startsWith("#")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
