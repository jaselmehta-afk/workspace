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
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3
                className="text-2xl font-light text-white mb-2"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                Stay in the loop
              </h3>
              <p className="text-white/60 text-sm">
                Events, new spaces, and insights for London&apos;s growing businesses.
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
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <svg width="28" height="24" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3L9 25L16 11L23 25L30 3" stroke="#E8622A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-white font-semibold text-[17px] tracking-[-0.02em]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
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
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
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
            <div className="flex flex-wrap gap-6 text-sm text-white/50">
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
            <div className="flex flex-wrap gap-4 text-xs text-white/30">
              <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Use</Link>
              <Link href="/cookies" className="hover:text-white/60 transition-colors">Cookie Settings</Link>
              <Link href="/accessibility" className="hover:text-white/60 transition-colors">Accessibility</Link>
            </div>
          </div>
          <p className="mt-4 text-xs text-white/25">
            © {new Date().getFullYear()} Workspace Group plc. Registered in England & Wales. Company No. 2041612. FTSE 250 listed.
          </p>
        </div>
      </div>
    </footer>
  );
}
