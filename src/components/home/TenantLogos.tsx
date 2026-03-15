const COMPANIES = [
  "Transferwise", "Monzo", "Depop", "Bulb Energy", "Babylon Health",
  "Marshmallow", "Nested", "Cleo", "Tide", "Octopus Energy",
];

export default function TenantLogos() {
  // Triple the items for a gapless infinite loop
  const items = [...COMPANIES, ...COMPANIES, ...COMPANIES];

  return (
    <div className="bg-white border-y border-[#09090F]/[0.06] py-8 overflow-hidden">
      <p className="text-center text-[11px] font-semibold tracking-[0.2em] uppercase text-[#09090F]/50 mb-6">
        Trusted by London&apos;s most ambitious businesses
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-0 animate-marquee whitespace-nowrap select-none">
          {items.map((company, i) => (
            <span
              key={`${company}-${i}`}
              className="inline-flex items-center gap-6 px-8 text-sm font-semibold text-[#09090F]/45 tracking-wide hover:text-[#09090F]/80 transition-colors cursor-default"
            >
              {company}
              <span className="w-1 h-1 rounded-full bg-[#09090F]/15 shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
