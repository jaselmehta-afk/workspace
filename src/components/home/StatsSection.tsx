const stats = [
  { value: "60+", label: "London buildings", sub: "Across every major neighbourhood" },
  { value: "4,000+", label: "Businesses growing", sub: "From solo founders to 200-person teams" },
  { value: "5M", label: "Square feet managed", sub: "Across our entire portfolio" },
  { value: "35+", label: "Years in London", sub: "Rooted in the city since 1987" },
];

export default function StatsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#E8622A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div
                className="text-5xl lg:text-6xl text-white mb-2 leading-none"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
              >
                {stat.value}
              </div>
              <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
              <div className="text-white/60 text-xs leading-relaxed">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
