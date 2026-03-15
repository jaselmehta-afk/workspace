"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

/**
 * Drop-in replacement for next/link that wraps navigation in the
 * native View Transitions API (document.startViewTransition) when available.
 * Falls back to normal navigation in browsers that don't support it.
 */
export default function ViewTransitionLink({ href, onClick, children, ...props }: Props) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;

    const target = typeof href === "string" ? href : href.pathname ?? "";
    // Only intercept same-origin href strings
    if (!target.startsWith("/")) return;

    if (!("startViewTransition" in document)) return; // browser fallback

    e.preventDefault();
    (document as Document & { startViewTransition: (cb: () => void) => void })
      .startViewTransition(() => {
        router.push(target);
      });
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
