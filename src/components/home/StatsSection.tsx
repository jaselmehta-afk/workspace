const stats = [
  { value: "60+",   label: "London buildings",      sub: "Across every major neighbourhood" },
  { value: "4,000+",label: "Businesses growing",    sub: "From solo founders to 200-person teams" },
  { value: "5M",    label: "Square feet managed",   sub: "Across our entire portfolio" },
  { value: "35+",   label: "Years in London",        sub: "Rooted in the city since 1987" },
];

export default function StatsSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ background: "linear-gradient(135deg, #0E0E1A 0%, #1a0f08 50%, #0E0E1A 100%)" }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E8622A]/10 blur-[100px] rounded-full" />
      </div>
      <div className="relative max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className={`text-center lg:text-left p-6 rounded-2xl glass ${i === 0 ? "border-[#E8622A]/20" : ""}`}>
            <div className="text-4xl lg:text-5xl text-white mb-2 leading-none font-light" style={{ fontFamily: "'Fraunces', serif" }}>
              {stat.value}
            </div>
            <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
            <div className="text-white/40 text-xs leading-relaxed">{stat.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
