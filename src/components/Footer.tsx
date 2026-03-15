"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Linkedin, Twitter, Instagram, ArrowRight } from "lucide-react";

const footerLinks = {
  "Find a Space": [
    { label: "Private Offices", href: "/spaces?type=private" },
    { label: "Coworking", href: "/spaces?type=coworking" },
    { label: "Studios", href: "/spaces?type=studio" },
    { label: "Meeting Rooms", href: "/meeting-rooms" },
    { label: "New Developments", href: "/spaces?filter=new" },
  ],
  "Locations": [
    { label: "Central London", href: "/spaces?area=central" },
    { label: "East London", href: "/spaces?area=east" },
    { label: "South London", href: "/spaces?area=south" },
    { label: "West London", href: "/spaces?area=west" },
    { label: "North London", href: "/spaces?area=north" },
  ],
  "Company": [
    { label: "About Us", href: "/about" },
    { label: "Sustainability", href: "/about/sustainability" },
    { label: "Investors", href: "/about/investors" },
    { label: "Press & Media", href: "/about/press" },
    { label: "Careers", href: "/careers" },
  ],
  "Resources": [
    { label: "Content Hub", href: "/content-hub" },
    { label: "Events", href: "/community/events" },
    { label: "Member Stories", href: "/community/stories" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#09090F] text-white">

      {/* ── Animated marquee ribbon ── */}
      <div className="border-b border-white/[0.06] overflow-hidden py-5">
        <div className="flex whitespace-nowrap animate-marquee-slow select-none" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-8 px-8 text-white/40 text-[11px] font-medium tracking-[0.3em] uppercase">
              <span>London&apos;s brightest offices</span>
              <span className="text-[#E8622A]">✦</span>
              <span>60+ Buildings</span>
              <span className="text-[#E8622A]">✦</span>
              <span>Space to grow</span>
              <span className="text-[#E8622A]">✦</span>
              <span>Est. 1987</span>
              <span className="text-[#E8622A]">✦</span>
              <span>4,000+ businesses</span>
              <span className="text-[#E8622A]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3
                className="text-2xl font-light text-white mb-2"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                New spaces move fast.
              </h3>
              <p className="text-white/60 text-sm">
                Be first to hear about new buildings, events, and member stories.
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-72 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#E8622A] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#E8622A] text-white text-sm font-semibold rounded-lg hover:bg-[#d4561e] transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-block mb-5" aria-label="Workspace — home">
              <span
                className="text-[22px] font-bold tracking-[-0.045em] leading-none animate-gradient-logo"
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
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Flexible, inspiring space for London&apos;s brightest businesses. 60+ buildings. Thousands of growing teams.
            </p>
            <div className="flex gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E8622A] transition-colors">
                <Linkedin size={15} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E8622A] transition-colors">
                <Twitter size={15} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E8622A] transition-colors">
                <Instagram size={15} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-white/60">
              <a href="tel:02071383307" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={13} />
                020 7138 3307
              </a>
              <a href="mailto:hello@workspace.co.uk" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={13} />
                hello@workspace.co.uk
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={13} />
                Canterbury Court, Kennington Park, London
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-white/45">
              <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Use</Link>
              <Link href="/cookies" className="hover:text-white/60 transition-colors">Cookie Settings</Link>
              <Link href="/accessibility" className="hover:text-white/60 transition-colors">Accessibility</Link>
            </div>
          </div>
          <p className="mt-4 text-xs text-white/40">
            © {new Date().getFullYear()} Workspace Group plc. Registered in England & Wales. Company No. 2041612. FTSE 250 listed.
          </p>
        </div>
      </div>

      {/* ── Large ghost wordmark ── */}
      <div className="overflow-hidden border-t border-white/[0.04] pt-6 pb-2 select-none pointer-events-none" aria-hidden="true">
        <div
          className="text-center font-bold leading-[0.85] tracking-[-0.05em]"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "clamp(72px, 14vw, 192px)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Workspace
        </div>
      </div>
    </footer>
  );
}
