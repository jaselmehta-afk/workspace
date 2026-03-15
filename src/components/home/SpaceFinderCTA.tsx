import Link from "next/link";
import { ArrowRight } from "lucide-react";

const POINTS = [
  "Month-to-month contracts",
  "Move-in ready, or blank canvas",
  "Scale as your team grows",
  "No hidden costs or guarantees",
];

export default function SpaceFinderCTA() {
  return (
    <section className="bg-[#09090F] py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-end">

        {/* Left — large number display */}
        <div>
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-white/40 mb-8">
            Est. 1987 · FTSE 250 · London
          </p>
          <div
            className="text-white leading-none tracking-[-0.05em] mb-3 select-none"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(100px, 14vw, 200px)",
            }}
          >
            60
          </div>
          <div
            className="text-white/55 leading-tight"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(22px, 3vw, 36px)",
            }}
          >
            London buildings.
          </div>
        </div>

        {/* Right — headline + list + CTA */}
        <div className="pb-3">
          <h2
            className="text-white leading-[1.1] tracking-[-0.03em] mb-8"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(28px, 3.5vw, 44px)",
            }}
          >
            Flexible from day one.
            <br />
            <span className="text-white/55">Yours to make your own.</span>
          </h2>

          <ul className="space-y-3 mb-10">
            {POINTS.map(point => (
              <li key={point} className="flex items-center gap-3 text-white/65 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8622A] shrink-0" />
                {point}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <Link
              href="/spaces"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#E8622A] text-white text-sm font-semibold rounded-xl hover:bg-[#d4561e] transition-colors"
            >
              Browse all spaces
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/space-finder"
              className="text-white/55 hover:text-white/80 text-sm transition-colors"
            >
              Use the space finder →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
