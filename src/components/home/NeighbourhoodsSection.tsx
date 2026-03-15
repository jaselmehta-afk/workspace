import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const areas = [
  {
    name: "Shoreditch",
    desc: "East London's creative heart",
    count: 14,
    from: "£450",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=700&q=85",
    href: "/spaces?area=east",
    accent: "#E8622A",
  },
  {
    name: "Bermondsey",
    desc: "Arches, makers & design studios",
    count: 8,
    from: "£380",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=700&q=85",
    href: "/spaces?area=south",
    accent: "#7B9E87",
  },
  {
    name: "Clerkenwell",
    desc: "The highest concentration of creative agencies in the world",
    count: 11,
    from: "£520",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85",
    href: "/spaces?area=central",
    accent: "#C9A84C",
  },
  {
    name: "Chiswick",
    desc: "Calm, connected & surprisingly cool",
    count: 7,
    from: "£420",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=700&q=85",
    href: "/spaces?area=west",
    accent: "#E8622A",
  },
  {
    name: "Wandsworth",
    desc: "River views, converted industrial spaces",
    count: 9,
    from: "£360",
    image: "https://images.unsplash.com/photo-1569779213435-ba3167dde7cc?w=700&q=85",
    href: "/spaces?area=south",
    accent: "#7B9E87",
  },
  {
    name: "Islington",
    desc: "Georgian townhouses meet modern tech",
    count: 6,
    from: "£490",
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c92a?w=700&q=85",
    href: "/spaces?area=north",
    accent: "#C9A84C",
  },
];

export default function NeighbourhoodsSection() {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#09090F]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <ScrollReveal>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#E8622A] mb-4">Browse by area</p>
              <h2
                className="text-5xl sm:text-6xl text-white leading-[0.95] tracking-[-0.03em]"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
              >
                60+ buildings.
                <br />
                One city.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link href="/spaces" className="flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium transition-colors group">
              All locations
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        {/* 3 × 2 grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {areas.map((area, i) => (
            <ScrollReveal key={area.name} delay={i * 0.06}>
              <Link
                href={area.href}
                className="group relative block overflow-hidden rounded-2xl sm:rounded-3xl aspect-[3/4] sm:aspect-[4/5]"
              >
                {/* Image */}
                <img
                  src={area.image}
                  alt={area.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090F]/90 via-[#09090F]/30 to-[#09090F]/10 transition-opacity duration-300" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(9,9,15,0.96) 0%, rgba(9,9,15,0.50) 50%, transparent 100%)" }}
                />

                {/* Count badge — top right */}
                <div className="absolute top-4 right-4 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-white"
                  style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  {area.count} spaces
                </div>

                {/* Content — bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="text-white/55 text-xs mb-1.5 transition-colors group-hover:text-white/75">
                    from {area.from}/desk/mo
                  </div>
                  <h3
                    className="text-white text-xl sm:text-2xl font-semibold leading-tight mb-2 transition-all"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    {area.name}
                  </h3>
                  <p className="text-white/55 text-xs leading-relaxed max-w-[200px] hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {area.desc}
                  </p>

                  {/* Explore link — slides up on hover */}
                  <div className="flex items-center gap-1.5 text-sm font-semibold mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    style={{ color: area.accent }}>
                    Explore {area.name} <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom strip — total coverage */}
        <ScrollReveal delay={0.2}>
          <div className="mt-6 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-white/50 text-sm">
              Can&apos;t find your area? We have buildings across all of London.
            </p>
            <Link href="/spaces" className="flex items-center gap-2 text-[#E8622A] text-sm font-semibold hover:gap-3 transition-all group">
              Browse all 60+ buildings <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
