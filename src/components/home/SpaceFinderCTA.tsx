import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function SpaceFinderCTA() {
  return (
    <section className="relative overflow-hidden bg-[#09090F] py-32 px-4 sm:px-6 lg:px-8">
      {/* Background image — real building, heavily darkened */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090F]/60 via-transparent to-[#09090F]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090F]/70 via-transparent to-[#09090F]/70" />
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E8622A]/8 blur-[120px] rounded-full" />
      </div>

      {/* Dot-grid — matches hero */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 glass rounded-full text-sm text-white/65">
          <Sparkles size={13} className="text-[#E8622A]" />
          AI Space Finder
        </div>

        {/* Headline */}
        <h2
          className="text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.92] tracking-[-0.04em] mb-8"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
        >
          Not sure where
          <br />
          <span
            className="font-bold"
            style={{
              background: "linear-gradient(115deg, #E8622A 0%, #f5935a 45%, #E8622A 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            to start?
          </span>
        </h2>

        <p className="text-white/65 text-lg sm:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
          Answer 4 quick questions. We&apos;ll match you with the right buildings, right now.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/space-finder"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#E8622A] text-white font-semibold rounded-2xl hover:bg-[#d4561e] transition-all duration-200 text-base hover:scale-105 shadow-[0_0_40px_rgba(232,98,42,0.35)]"
          >
            Find my space
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/spaces"
            className="inline-flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-2xl hover:border-white/25 transition-all text-base"
          >
            Browse all 60+ spaces
          </Link>
        </div>

        <p className="text-white/45 text-sm mt-8">
          Takes less than 2 minutes · No commitment required
        </p>

        {/* Decorative rule */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-white/15" />
          <span className="text-white/20 text-[11px] tracking-[0.3em] uppercase font-medium">Est. 1987</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-white/15" />
        </div>
      </div>
    </section>
  );
}
