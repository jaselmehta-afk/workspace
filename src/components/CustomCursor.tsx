"use client";

import { useEffect, useState, useRef } from "react";

// Lerp factor — 0.22 means the ring closes ~22% of the gap each frame (~60fps)
// At 60fps this gives a ~8-frame lag rather than ~20 at 0.12
const LERP = 0.22;

export default function CustomCursor() {
  const [ring, setRing] = useState({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Refs avoid stale closure in the RAF loop
  const posRef  = useRef({ x: -200, y: -200 });
  const ringRef = useRef({ x: -200, y: -200 });
  const dotRef  = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    setIsMounted(true);

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      // Move dot instantly via direct DOM mutation — zero React overhead
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const style = window.getComputedStyle(el);
        const isP = style.cursor === "pointer" || el.tagName === "A" || el.tagName === "BUTTON"
          || el.closest("a") !== null || el.closest("button") !== null;
        setIsPointer(p => p === isP ? p : isP);
      }
    };

    const onLeave  = () => setIsHidden(true);
    const onEnter  = () => setIsHidden(false);
    const onClick  = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 350);
    };

    // Stable RAF loop — reads posRef directly, no stale closures
    const animate = () => {
      const px = posRef.current.x;
      const py = posRef.current.y;
      const rx = ringRef.current.x + (px - ringRef.current.x) * LERP;
      const ry = ringRef.current.y + (py - ringRef.current.y) * LERP;
      ringRef.current = { x: rx, y: ry };
      setRing({ x: rx, y: ry });
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onClick);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, []); // stable — no deps needed

  if (!isMounted) return null;

  const size   = isPointer ? 40 : 28;
  const offset = size / 2;

  return (
    <>
      {/* Dot — moves via direct DOM mutation for zero-lag */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "white",
          transform: `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`,
          opacity: isHidden ? 0 : 1,
          transition: "opacity 0.2s",
          willChange: "transform",
        }}
      />

      {/* Ring — lerp-follows, expands on pointer, pulses on click */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `1.5px solid rgba(255,255,255,${isPointer ? 0.9 : 0.75})`,
          transform: `translate(${ring.x - offset}px, ${ring.y - offset}px) scale(${clicked ? 0.6 : 1})`,
          opacity: isHidden ? 0 : 1,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s, border-color 0.15s, transform 0.15s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
