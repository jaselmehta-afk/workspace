"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [ring, setRing] = useState({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ringRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;
    setIsMounted(true);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const style = window.getComputedStyle(el);
        setIsPointer(style.cursor === "pointer" || el.tagName === "A" || el.tagName === "BUTTON");
      }
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    // Smooth ring follow with RAF
    const animate = () => {
      setRing(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [pos.x, pos.y]);

  if (!isMounted) return null;

  return (
    <>
      {/* Dot — instant */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "white",
          transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
          opacity: isHidden ? 0 : 1,
          transition: "opacity 0.2s",
        }}
      />
      {/* Ring — lagged */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          width: isPointer ? 44 : 28,
          height: isPointer ? 44 : 28,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.8)",
          transform: `translate(${ring.x - (isPointer ? 22 : 14)}px, ${ring.y - (isPointer ? 22 : 14)}px)`,
          opacity: isHidden ? 0 : 1,
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.2s",
        }}
      />
    </>
  );
}
