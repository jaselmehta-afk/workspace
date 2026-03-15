"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useCompare } from "@/context/CompareContext";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const { ids } = useCompare();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slide up to avoid compare tray
  const bottom = ids.length > 0 ? "bottom-24" : "bottom-6";

  return (
    <div
      className={`fixed right-5 z-40 transition-all duration-500 ${bottom} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <Link
        href="/book-viewing"
        className="group flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-white text-sm font-semibold shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-[#d4561e]"
        style={{ background: "#E8622A" }}
      >
        <CalendarDays size={15} className="text-white/80" />
        Book a viewing
        <span
          className="ml-1 w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
