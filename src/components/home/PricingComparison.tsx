import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const rows = [
  {
    pain:    { label: "12-month minimum lease",   badge: "Lock-in risk" },
    gain:    { label: "Monthly rolling contract", badge: "30 days notice" },
  },
  {
    pain:    { label: "£50k–£200k fit-out costs",  badge: "Upfront capital" },
    gain:    { label: "Fully furnished, day one",  badge: "£0 upfront" },
  },
  {
    pain:    { label: "Business rates + utilities", badge: "~£18/sqft/yr extra" },
    gain:    { label: "All-inclusive pricing",      badge: "Rates & WiFi in" },
  },
  {
    pain:    { label: "Legal & agent fees",   badge: "~£15,000" },
    gain:    { label: "Zero agency fees",     badge: "Deal direct" },
  },
  {
    pain:    { label: "IT setup & infrastructure", badge: "£5k–£25k" },
    gain:    { label: "Gigabit fibre, day one",    badge: "Included" },
  },
  {
    pain:    { label: "Unpredictable service charges", badge: "Varies" },
    gain:    { label: "One fixed monthly invoice",     badge: "No surprises" },
  },
];

export default function PricingComparison() {
  return (
    <section className="bg-[#09090F] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E8622A] mb-4">The honest comparison</p>
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] tracking-[-0.03em]"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
            >
              Stop overpaying
              <br />
              for your office.
            </h2>
          </div>
        </ScrollReveal>

        {/* Column headers */}
        <ScrollReveal delay={0.08}>
          <div className="grid grid-cols-[1fr_32px_1fr] mb-4 px-1">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-white/25 mb-1">The traditional way</p>
              <p className="text-white/40 text-xl font-light" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                ~£4,200<span className="text-sm text-white/20 ml-1">/desk/mo</span>
              </p>
            </div>
            <div />
            <div className="text-right">
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#E8622A] mb-1">The Workspace way</p>
              <p className="text-white text-xl font-semibold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                From £550<span className="text-sm text-white/40 font-normal ml-1">/desk/mo all-in</span>
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-1" />

        {/* Rows */}
        <div>
          {rows.map(({ pain, gain }, i) => (
            <ScrollReveal key={pain.label} delay={0.04 + i * 0.05}>
              <div className="grid grid-cols-[1fr_32px_1fr] items-center py-4 border-b border-white/[0.04] group hover:bg-white/[0.015] -mx-3 px-3 rounded-lg transition-colors duration-200">

                {/* Left — the pain */}
                <div className="flex items-center justify-between gap-3 pr-4">
                  <span className="text-white/40 text-sm group-hover:text-white/55 transition-colors">
                    {pain.label}
                  </span>
                  <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={{
                      background: "rgba(255,80,60,0.08)",
                      color: "rgba(255,120,100,0.55)",
                      border: "1px solid rgba(255,80,60,0.12)",
                    }}>
                    {pain.badge}
                  </span>
                </div>

                {/* Centre arrow */}
                <div className="flex items-center justify-center text-white/15 group-hover:text-white/30 transition-colors">
                  <ArrowRight size={13} />
                </div>

                {/* Right — the gain */}
                <div className="flex items-center justify-between gap-3 pl-4">
                  <span className="text-white text-sm font-medium">
                    {gain.label}
                  </span>
                  <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={{
                      background: "rgba(123,158,135,0.12)",
                      color: "#7B9E87",
                      border: "1px solid rgba(123,158,135,0.2)",
                    }}>
                    {gain.badge}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Savings bar */}
        <ScrollReveal delay={0.35}>
          <div className="mt-10 rounded-2xl p-6 sm:p-8"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-white/45 text-xs tracking-widest uppercase font-medium mb-2">Typical saving</p>
                <p className="text-white text-3xl sm:text-4xl font-light" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Up to <span className="font-bold text-[#E8622A]">65% less</span> than a traditional lease.
                </p>
                <p className="text-white/30 text-xs mt-2">10-person team, Zone 1, 12-month comparison.</p>
              </div>
              <Link
                href="/spaces"
                className="shrink-0 flex items-center gap-2 px-7 py-3.5 bg-[#E8622A] text-white font-semibold rounded-full hover:bg-[#d4561e] transition-all hover:scale-105 text-sm whitespace-nowrap"
              >
                See available spaces <ArrowRight size={15} />
              </Link>
            </div>

            {/* Visual cost bar */}
            <div className="mt-7 space-y-3">
              {[
                { label: "Traditional lease", value: 4200, max: 4200, muted: true },
                { label: "Workspace",         value: 550,  max: 4200, muted: false },
              ].map(({ label, value, max, muted }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className={`text-xs w-32 shrink-0 ${muted ? "text-white/30" : "text-white/70"}`}>{label}</span>
                  <div className="flex-1 h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${(value / max) * 100}%`,
                        background: muted
                          ? "rgba(255,255,255,0.12)"
                          : "linear-gradient(90deg, #7B9E87, #E8622A)",
                      }}
                    />
                  </div>
                  <span className={`text-xs w-20 text-right shrink-0 font-medium ${muted ? "text-white/25" : "text-white/80"}`}>
                    £{value.toLocaleString()}/mo
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
