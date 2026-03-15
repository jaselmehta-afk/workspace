import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SpaceFinderCTA() {
  return (
    <section className="relative overflow-hidden bg-[#09090F]" style={{ minHeight: 480 }}>
      {/* Full-bleed image — different building to hero, portrait warmth */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1920&q=85"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ opacity: 0.22 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(9,9,15,0.92) 35%, rgba(9,9,15,0.55) 65%, rgba(9,9,15,0.82) 100%)" }} />
      </div>

      {/* Content — left-aligned, editorial */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-32 flex flex-col justify-center" style={{ minHeight: 480 }}>
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/30 mb-7">
          Est. 1987 &nbsp;·&nbsp; FTSE 250 &nbsp;·&nbsp; 4,000+ businesses
        </p>

        <h2
          className="text-white leading-[0.9] tracking-[-0.04em] mb-10"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 300 }}
        >
          Ready to
          <br />
          <span style={{
            background: "linear-gradient(115deg, #E8622A 0%, #f5935a 40%, #C9A84C 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 700,
          }}>
            move in?
          </span>
        </h2>

        <p className="text-white/55 text-lg mb-10 max-w-sm leading-relaxed">
          60 buildings. Flexible contracts. No hidden fees.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <Link
            href="/spaces"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#E8622A] text-white font-semibold rounded-xl hover:bg-[#d4561e] transition-all hover:scale-[1.02] active:scale-100 text-base"
            style={{ boxShadow: "0 0 40px rgba(232,98,42,0.3)" }}
          >
            Browse all spaces
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/space-finder"
            className="inline-flex items-center gap-2 px-8 py-4 text-white/60 hover:text-white font-medium transition-colors text-base"
          >
            Or use the space finder →
          </Link>
        </div>
      </div>
    </section>
  );
}
