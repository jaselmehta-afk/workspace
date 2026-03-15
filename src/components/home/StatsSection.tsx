import CountUp from "@/components/CountUp";
import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { value: 60,    suffix: "+",  label: "London buildings",   sub: "Across every major neighbourhood" },
  { value: 4000,  suffix: "+",  label: "Businesses growing", sub: "From solo founders to 200-person teams" },
  { value: 5,     suffix: "M",  label: "Square feet managed", sub: "Across our entire portfolio" },
  { value: 35,    suffix: "+",  label: "Years in London",     sub: "Rooted in the city since 1987" },
];

export default function StatsSection() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 section-dark overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#E8622A]/6 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-3xl overflow-hidden">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.07}>
              <div className="bg-[#09090F] p-8 lg:p-10 flex flex-col justify-between min-h-[180px]">
                <div
                  className="text-5xl lg:text-6xl text-white mb-3 leading-none font-light"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </div>
                <div>
                  <div className="text-white font-medium text-sm mb-1">{stat.label}</div>
                  <div className="text-white/55 text-xs leading-relaxed">{stat.sub}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
