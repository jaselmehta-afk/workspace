"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Wraps page content with:
 * 1. Native View Transitions API (Chrome 111+) for cross-page morphing
 * 2. Framer Motion fade/slide as universal fallback
 *
 * Named elements with `view-transition-name` CSS property (e.g. space card images)
 * will automatically morph between pages when the API is supported.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const prevPath = useRef(pathname);

  // Intercept same-origin link clicks and wrap in startViewTransition
  useEffect(() => {
    if (!("startViewTransition" in document)) return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      // Skip if link has data-no-transition or is external
      if (anchor.hasAttribute("data-no-transition")) return;

      e.preventDefault();
      (document as Document & { startViewTransition: (cb: () => void) => unknown })
        .startViewTransition(() => {
          router.push(href);
        });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [router]);

  // Track path changes
  useEffect(() => {
    prevPath.current = pathname;
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
