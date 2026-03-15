"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Users, Palette, CalendarDays, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const types = [
  {
    icon: Building2,
    title: "Private Offices",
    desc: "Your floor, your culture. Fully customisable suites for teams of 2 to 200.",
    href: "/spaces?type=private",
    from: "From £550",
    unit: "/desk/mo",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85",
    tag: "Most popular",
    color: "#E8622A",
  },
  {
    icon: Users,
    title: "Coworking",
    desc: "Hot desks and dedicated desks in buzzing shared spaces. Month-to-month.",
    href: "/spaces?type=coworking",
    from: "From £250",
    unit: "/mo",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=85",
    tag: null,
    color: "#7B9E87",
  },
  {
    icon: Palette,
    title: "Studios",
    desc: "Purpose-built creative spaces for photographers, designers and makers.",
    href: "/spaces?type=studio",
    from: "From £400",
    unit: "/mo",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=85",
    tag: null,
    color: "#C9A84C",
  },
  {
    icon: CalendarDays,
    title: "Meeting Rooms",
    desc: "Tech-equipped rooms bookable by the hour. Members and non-members welcome.",
    href: "/meeting-rooms",
    from: "From £25",
    unit: "/hr",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=85",
    tag: null,
    color: "#E8622A",
  },
];

export default function SpaceTypesSection() {
  const [hovered, setHovered] = useState<number | null>(0);

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <ScrollReveal>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E8622A] mb-4">Space types</p>
              <h2
                className="text-5xl sm:text-6xl text-[#09090F] leading-[0.95] tracking-[-0.03em]"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
              >
                Find the space
                <br />that fits.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link href="/spaces" className="flex items-center gap-2 text-sm font-semibold text-[#E8622A] hover:gap-3 transition-all group">
              Browse all spaces <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        {/* ── Desktop: expanding accordion panels (Airbnb/Dribbble-inspired) ── */}
        <ScrollReveal>
          <div className="hidden md:flex gap-3 h-[500px]">
            {types.map((type, i) => {
              const Icon = type.icon;
              const isOpen = hovered === i;
              return (
                <Link
                  key={type.title}
                  href={type.href}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(0)}
                  className="relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group"
                  style={{ flex: isOpen ? "3.5" : "1" }}
                  aria-label={type.title}
                >
                  {/* Background image */}
                  <img
                    src={type.image}
                    alt={type.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
                    style={{ transform: isOpen ? "scale(1.04)" : "scale(1.0)" }}
                  />

                  {/* Gradient — stronger at bottom, fades to subtle at top */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: isOpen
                        ? "linear-gradient(to top, rgba(9,9,15,0.92) 0%, rgba(9,9,15,0.4) 45%, rgba(9,9,15,0.15) 100%)"
                        : "linear-gradient(to top, rgba(9,9,15,0.85) 0%, rgba(9,9,15,0.3) 60%, transparent 100%)",
                    }}
                  />

                  {/* Icon — always visible, shifts on expand */}
                  <div
                    className="absolute left-5 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{ top: isOpen ? "20px" : "50%", transform: isOpen ? "none" : "translateY(-50%)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500"
                      style={{
                        background: isOpen ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.18)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <Icon size={18} className="text-white" />
                    </div>
                  </div>

                  {/* Badge */}
                  {type.tag && isOpen && (
                    <div className="absolute top-5 right-5 px-2.5 py-1 bg-[#E8622A] text-white text-[10px] font-semibold rounded-full animate-fade-up">
                      {type.tag}
                    </div>
                  )}

                  {/* Collapsed: rotated title */}
                  {!isOpen && (
                    <div className="absolute inset-0 flex items-end justify-center pb-7 px-3">
                      <span
                        className="text-white font-semibold text-sm whitespace-nowrap"
                        style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {type.title}
                      </span>
                    </div>
                  )}

                  {/* Expanded content — slides up from bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-7 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateY(0)" : "translateY(16px)",
                    }}
                  >
                    <div className="flex items-baseline gap-1 mb-1">
                      <span
                        className="text-3xl font-bold text-white"
                        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                      >
                        {type.from}
                      </span>
                      <span className="text-white/65 text-sm">{type.unit}</span>
                    </div>

                    <h3
                      className="text-white text-xl font-semibold mb-2 leading-tight"
                      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                    >
                      {type.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-xs">{type.desc}</p>

                    <span className="inline-flex items-center gap-2 text-white text-sm font-semibold group-hover:gap-3 transition-all">
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ── Mobile: standard cards (clean, accessible) ── */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {types.map((type) => {
            const Icon = type.icon;
            return (
              <Link
                key={type.title}
                href={type.href}
                className="group relative overflow-hidden rounded-2xl h-56 block"
              >
                <img
                  src={type.image}
                  alt={type.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090F]/85 via-[#09090F]/20 to-transparent" />
                <div className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}>
                  <Icon size={16} className="text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-white/65 text-xs mb-0.5">{type.from}{type.unit}</div>
                  <h3 className="text-white font-semibold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {type.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
