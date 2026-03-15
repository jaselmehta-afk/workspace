"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

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
    <Link href="/" className="flex items-center gap-2.5 group">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#E8622A"/>
        <path d="M7 10L11.5 22L16 14L20.5 22L25 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-white font-medium text-[17px] tracking-[-0.02em] leading-none"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
        Workspace
      </span>
    </Link>
  );
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#09090F]/92 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && showMenu(link.label)}
                onMouseLeave={scheduleHide}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/[0.07]"
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      size={13}
                      className={`opacity-50 mt-px transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>

                {/* Dropdown — invisible bridge gap covers the mt space */}
                {link.children && activeDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 pt-1 w-68"
                    onMouseEnter={cancelHide}
                    onMouseLeave={scheduleHide}
                  >
                    <div className="bg-white/[0.97] backdrop-blur-2xl rounded-2xl shadow-2xl border border-black/[0.06] overflow-hidden">
                      <div className="p-1.5">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex flex-col px-3.5 py-3 rounded-xl hover:bg-[#F4F1EA] group transition-colors"
                          >
                            <span className="text-sm font-medium text-[#09090F] group-hover:text-[#E8622A] transition-colors">
                              {child.label}
                            </span>
                            <span className="text-xs text-[#09090F]/40 mt-0.5">{child.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:02071383307"
              className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors">
              <Phone size={13} /><span>020 7138 3307</span>
            </a>
            <Link href="/spaces"
              className="px-4 py-2 bg-[#E8622A] text-white text-sm font-semibold rounded-xl hover:bg-[#d4561e] transition-colors">
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
                        className="block px-3 py-2 text-white/50 text-sm rounded-xl hover:text-white hover:bg-white/[0.05] transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-white/[0.08]">
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
  );
}
