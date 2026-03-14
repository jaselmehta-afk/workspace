import { Leaf, Bike, Zap, Recycle } from "lucide-react";

const commitments = [
  { icon: Leaf, label: "Net zero", sub: "by 2030 target", color: "#7B9E87" },
  { icon: Bike, label: "12,000+", sub: "cycle journeys/month", color: "#7B9E87" },
  { icon: Zap, label: "100%", sub: "renewable electricity", color: "#7B9E87" },
  { icon: Recycle, label: "Zero", sub: "landfill waste", color: "#7B9E87" },
];

export default function SustainabilitySection() {
  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(135deg, #09090F 0%, #0d1a10 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#7B9E87] mb-3">
              Sustainability
            </p>
            <h2
              className="text-4xl sm:text-5xl text-white leading-tight mb-6"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
            >
              Good for your business.
              <br />
              <span className="text-[#7B9E87]">Good for the planet.</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8 text-lg">
              We&apos;re committed to making Workspace the most sustainable portfolio of office buildings in London — from renewable energy and waste reduction to active travel and biodiversity.
            </p>
            <a
              href="/about/sustainability"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#7B9E87] text-white font-semibold rounded-xl hover:bg-[#6a8a75] transition-colors"
            >
              <Leaf size={16} />
              Our ESG commitments
            </a>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
            {commitments.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#7B9E87]/20 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} style={{ color: c.color }} />
                  </div>
                  <div
                    className="text-3xl text-white mb-1"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
                  >
                    {c.label}
                  </div>
                  <div className="text-white/50 text-sm">{c.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
