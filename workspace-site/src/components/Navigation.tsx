"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

const navLinks = [
  {
    label: "Find a Space",
    href: "/spaces",
    children: [
      { label: "Browse All Spaces", href: "/spaces", desc: "60+ buildings across London" },
      { label: "Private Offices", href: "/spaces?type=private", desc: "Your own floor, your own culture" },
      { label: "Coworking", href: "/spaces?type=coworking", desc: "Flexible hot desks & dedicated desks" },
      { label: "Studios", href: "/spaces?type=studio", desc: "Creative space for makers" },
      { label: "New Developments", href: "/spaces?filter=new", desc: "Freshly renovated buildings" },
    ],
  },
  {
    label: "Meeting Rooms",
    href: "/meeting-rooms",
    children: [
      { label: "Book a Room", href: "/meeting-rooms", desc: "Available across all locations" },
      { label: "Event Spaces", href: "/meeting-rooms?type=event", desc: "Host your next big moment" },
      { label: "Board Rooms", href: "/meeting-rooms?type=boardroom", desc: "Impress clients and investors" },
    ],
  },
  {
    label: "Community",
    href: "/community",
    children: [
      { label: "Events", href: "/community/events", desc: "Workshops, talks & networking" },
      { label: "Member Stories", href: "/community/stories", desc: "London's brightest businesses" },
      { label: "Content Hub", href: "/content-hub", desc: "Insights for growing businesses" },
    ],
  },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1C1C2E]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#E8622A] rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-tight">W</span>
            </div>
            <span
              className="text-white font-semibold text-lg tracking-wide"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Workspace
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/10"
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} className="opacity-60" />}
                </Link>

                {/* Dropdown */}
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex flex-col px-3 py-3 rounded-lg hover:bg-[#FAF8F4] group transition-colors"
                        >
                          <span className="text-sm font-medium text-[#1C1C2E] group-hover:text-[#E8622A] transition-colors">
                            {child.label}
                          </span>
                          <span className="text-xs text-gray-500 mt-0.5">{child.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:02071383307"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Phone size={14} />
              <span>020 7138 3307</span>
            </a>
            <Link
              href="/spaces"
              className="px-4 py-2 bg-[#E8622A] text-white text-sm font-semibold rounded-lg hover:bg-[#d4561e] transition-colors"
            >
              Find a Space
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#1C1C2E] border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block px-3 py-3 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
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
                        className="block px-3 py-2 text-white/60 text-sm rounded-lg hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-white/10">
              <Link
                href="/spaces"
                className="block text-center px-4 py-3 bg-[#E8622A] text-white font-semibold rounded-lg hover:bg-[#d4561e] transition-colors"
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
