const COMPANIES = [
  { name: "Transferwise", style: { fontWeight: 700, letterSpacing: "-0.02em" } },
  { name: "Monzo", style: { fontWeight: 800, letterSpacing: "0.01em" } },
  { name: "Depop", style: { fontWeight: 700, letterSpacing: "-0.01em" } },
  { name: "Bulb", style: { fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase" as const } },
  { name: "Babylon Health", style: { fontWeight: 500, letterSpacing: "0.01em" } },
  { name: "Marshmallow", style: { fontWeight: 600, letterSpacing: "-0.01em" } },
  { name: "Nested", style: { fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" as const } },
  { name: "Cleo", style: { fontWeight: 800, letterSpacing: "-0.03em" } },
  { name: "Tide", style: { fontWeight: 700, letterSpacing: "0.02em" } },
  { name: "Octopus Energy", style: { fontWeight: 600, letterSpacing: "-0.01em" } },
];

export default function TenantLogos() {
  const items = [...COMPANIES, ...COMPANIES, ...COMPANIES];

  return (
    <div className="bg-white border-y border-[#09090F]/[0.06] py-10 overflow-hidden">
      <p className="text-center text-[10px] font-semibold tracking-[0.25em] uppercase text-[#09090F]/45 mb-7">
        Trusted by London&apos;s most ambitious businesses
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-0 animate-marquee whitespace-nowrap select-none">
          {items.map((company, i) => (
            <span
              key={`${company.name}-${i}`}
              className="inline-flex items-center gap-10 px-10 text-[15px] text-[#09090F]/40 hover:text-[#09090F]/75 transition-colors cursor-default"
              style={company.style}
            >
              {company.name}
              <span className="w-1 h-1 rounded-full bg-[#E8622A]/25 shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="flex items-center justify-center gap-8 mt-8 flex-wrap px-4">
        {[
          { stat: "4,000+", label: "businesses" },
          { stat: "Est. 1987", label: "in London" },
          { stat: "FTSE 250", label: "listed" },
          { stat: "60+", label: "buildings" },
        ].map(({ stat, label }) => (
          <div key={stat} className="flex items-center gap-2 text-center">
            <span className="text-sm font-bold text-[#09090F]/80" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{stat}</span>
            <span className="text-xs text-[#09090F]/50">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
