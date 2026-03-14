const stats = [
  { value: "60+",    label: "London buildings",   sub: "Across every major neighbourhood" },
  { value: "4,000+", label: "Businesses growing", sub: "From solo founders to 200-person teams" },
  { value: "5M",     label: "Square feet managed", sub: "Across our entire portfolio" },
  { value: "35+",    label: "Years in London",     sub: "Rooted in the city since 1987" },
];

export default function StatsSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 section-dark">
      {/* Single glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#E8622A]/8 blur-[120px] rounded-full" />
      </div>
      <div className="relative max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`p-6 rounded-2xl glass ${i === 0 ? "border-[#E8622A]/15" : ""}`}
          >
            <div
              className="text-4xl lg:text-5xl text-white mb-2 leading-none font-light"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              {stat.value}
            </div>
            <div className="text-white font-medium text-sm mb-1">{stat.label}</div>
            <div className="text-white/35 text-xs leading-relaxed">{stat.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
