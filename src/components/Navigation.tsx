"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Sun, Moon, MapPin, ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useFavourites } from "@/context/FavouritesContext";
import { spaces } from "@/data/spaces";

const navLinks = [
  {
    label: "Find a Space",
    href: "/spaces",
    children: [
      { label: "Browse All Spaces",  href: "/spaces",              desc: "60+ buildings across London" },
      { label: "Private Offices",    href: "/spaces?type=private",  desc: "Your own floor, your own culture" },
      { label: "Coworking",          href: "/spaces?type=coworking",desc: "Flexible hot desks & dedicated desks" },
      { label: "Studios",            href: "/spaces?type=studio",   desc: "Creative space for makers" },
      { label: "New Developments",   href: "/spaces?filter=new",    desc: "Freshly renovated buildings" },
    ],
  },
  {
    label: "Meeting Rooms",
    href: "/meeting-rooms",
    children: [
      { label: "Book a Room",    href: "/meeting-rooms",              desc: "Available across all locations" },
      { label: "Event Spaces",   href: "/meeting-rooms?type=event",   desc: "Host your next big moment" },
      { label: "Board Rooms",    href: "/meeting-rooms?type=boardroom",desc: "Impress clients and investors" },
    ],
  },
  {
    label: "Community",
    href: "/community",
    children: [
      { label: "Events",        href: "/community/events",  desc: "Workshops, talks & networking" },
      { label: "Member Stories",href: "/community/stories", desc: "London's brightest businesses" },
      { label: "Content Hub",   href: "/content-hub",       desc: "Insights for growing businesses" },
    ],
  },
  { label: "About", href: "/about" },
];

function Logo() {
  return (
    <Link href="/" aria-label="Workspace — home">
      <span
        className="text-[20px] font-bold tracking-[-0.045em] leading-none animate-gradient-logo"
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          background: "linear-gradient(90deg, #ffffff 0%, #f5935a 20%, #E8622A 38%, #C9A84C 56%, #7B9E87 74%, #ffffff 100%)",
          backgroundSize: "250% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Workspace
      </span>
    </Link>
  );
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [savedOpen, setSavedOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedPanelRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { theme, toggle: toggleTheme } = useTheme();
  const { ids, toggle: toggleFav } = useFavourites();
  const savedSpaces = spaces.filter(s => ids.includes(s.id));

  // Hide on focused flow pages that have their own header
  if (pathname === "/book-viewing") return null;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close saved panel on outside click
  useEffect(() => {
    if (!savedOpen) return;
    const handler = (e: MouseEvent) => {
      if (savedPanelRef.current && !savedPanelRef.current.contains(e.target as Node)) {
        setSavedOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [savedOpen]);

  const showMenu = (label: string) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setActiveDropdown(label);
  };
  const scheduleHide = () => {
    hideTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };
  const cancelHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#09090F]/80 backdrop-blur-2xl border-b border-white/[0.05]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop Nav — floating glass pill */}
            <nav
              className="hidden lg:flex items-center gap-0.5 px-2 py-2 rounded-full transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.055)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(24px)",
              }}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => link.children && showMenu(link.label)}
                    onMouseLeave={scheduleHide}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                        isActive
                          ? "bg-white/[0.11] text-white font-medium"
                          : "text-white/65 hover:text-white hover:bg-white/[0.07] font-normal"
                      }`}
                    >
                      {link.label}
                    </Link>

                    {link.children && activeDropdown === link.label && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64"
                        onMouseEnter={cancelHide}
                        onMouseLeave={scheduleHide}
                      >
                        {/* Arrow notch */}
                        <div className="mx-auto w-3 h-3 -mb-1.5 rotate-45 rounded-sm"
                          style={{ background: "rgba(30,28,40,0.98)", border: "1px solid rgba(255,255,255,0.08)", clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)", borderRight: "none", borderBottom: "none" }} />
                        <div className="rounded-2xl overflow-hidden shadow-2xl"
                          style={{ background: "rgba(18,16,28,0.97)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(24px)" }}>
                          <div className="p-1.5">
                            {link.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => setActiveDropdown(null)}
                                className="flex flex-col px-3.5 py-3 rounded-xl hover:bg-white/[0.06] group transition-colors"
                              >
                                <span className="text-sm font-medium text-white/90 group-hover:text-[#E8622A] transition-colors">
                                  {child.label}
                                </span>
                                <span className="text-xs text-white/40 mt-0.5">{child.desc}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* CTA + controls */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="flex items-center justify-center w-8 h-8 rounded-full text-white/35 hover:text-white/80 transition-colors"
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </button>

              {/* Saved spaces */}
              <button
                onClick={() => setSavedOpen(o => !o)}
                aria-label={`Saved spaces (${ids.length})`}
                className="relative flex items-center justify-center w-8 h-8 rounded-full text-white/35 hover:text-white/80 transition-colors"
              >
                <Heart size={14} fill={ids.length > 0 ? "#E8622A" : "none"} className={ids.length > 0 ? "text-[#E8622A]" : ""} />
                {ids.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#E8622A] rounded-full text-white text-[8px] font-bold flex items-center justify-center">
                    {ids.length}
                  </span>
                )}
              </button>

              <Link href="/spaces"
                className="px-4 py-2 bg-[#E8622A] text-white text-sm font-semibold rounded-full hover:bg-[#d4561e] transition-all hover:scale-105 active:scale-100">
                Find a Space
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#09090F] border-t border-white/[0.08]">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className="block px-3 py-3 text-white font-medium rounded-xl hover:bg-white/[0.07] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-4 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-3 py-2 text-white/65 text-sm rounded-xl hover:text-white hover:bg-white/[0.05] transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
                <button onClick={toggleTheme} className="flex items-center gap-2 px-3 py-3 text-white/60 hover:text-white text-sm rounded-xl hover:bg-white/[0.07] transition-colors">
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </button>
              </div>
              <div className="pt-2">
                <Link
                  href="/spaces"
                  className="block text-center px-4 py-3 bg-[#E8622A] text-white font-semibold rounded-xl hover:bg-[#d4561e] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Find a Space
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Saved spaces side panel */}
      {savedOpen && (
        <div className="fixed inset-0 z-[60]" aria-modal="true" role="dialog" aria-label="Saved spaces">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSavedOpen(false)}
          />
          {/* Panel */}
          <div
            ref={savedPanelRef}
            className="absolute top-0 right-0 h-full w-full max-w-sm bg-[#09090F] border-l border-white/[0.08] flex flex-col animate-slide-in-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
              <div>
                <h2 className="text-white font-semibold text-lg" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Saved spaces
                </h2>
                <p className="text-white/60 text-xs mt-0.5">
                  {savedSpaces.length === 0 ? "None saved yet" : `${savedSpaces.length} space${savedSpaces.length !== 1 ? "s" : ""}`}
                </p>
              </div>
              <button
                onClick={() => setSavedOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors"
                aria-label="Close saved panel"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-3">
              {savedSpaces.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center pb-16">
                  <div className="w-16 h-16 rounded-full bg-white/[0.04] flex items-center justify-center mb-4">
                    <Heart size={24} className="text-white/20" />
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Tap the heart on any space<br />to save it here.
                  </p>
                  <Link
                    href="/spaces"
                    onClick={() => setSavedOpen(false)}
                    className="mt-6 flex items-center gap-2 text-[#E8622A] text-sm font-medium hover:gap-3 transition-all"
                  >
                    Browse spaces <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                savedSpaces.map(space => (
                  <div key={space.id} className="group bg-white/[0.04] hover:bg-white/[0.07] rounded-2xl overflow-hidden transition-colors">
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={space.image}
                        alt={space.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090F]/60 to-transparent" />
                      <button
                        onClick={() => toggleFav(space.id)}
                        aria-label="Remove from saved"
                        className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-[#E8622A] hover:bg-[#E8622A] hover:text-white transition-all"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-1 text-[#E8622A] text-[10px] font-medium mb-1">
                        <MapPin size={9} />{space.neighbourhood}
                      </div>
                      <h3 className="text-white text-sm font-medium mb-0.5" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                        {space.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-white/60 text-xs">From £{space.priceFrom.toLocaleString()}/{space.priceUnit}</span>
                        <Link
                          href={`/spaces/${space.slug}`}
                          onClick={() => setSavedOpen(false)}
                          className="flex items-center gap-1 text-[#E8622A] text-xs font-medium hover:gap-2 transition-all"
                        >
                          View <ArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {savedSpaces.length > 0 && (
              <div className="px-4 py-4 border-t border-white/[0.08]">
                <Link
                  href="/spaces"
                  onClick={() => setSavedOpen(false)}
                  className="block text-center py-3 bg-[#E8622A] text-white text-sm font-semibold rounded-xl hover:bg-[#d4561e] transition-colors"
                >
                  Browse all spaces
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
