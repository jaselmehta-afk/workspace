import Link from "next/link";
import { ArrowRight } from "lucide-react";

const rows = [
  { label: "Commitment",  old: "10-year lease",           ws: "Month-to-month" },
  { label: "Guarantee",   old: "Personal guarantee",      ws: "None required" },
  { label: "Space",       old: "Blank shell, you fit it", ws: "Move-in ready" },
  { label: "Branding",    old: "Landlord's rules",        ws: "Paint it. Own it." },
  { label: "Flexibility", old: "Fixed headcount",         ws: "Scale any time" },
  { label: "Access",      old: "One location",            ws: "All 60 buildings" },
];

export default function ComparisonSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F1EA]">
      <div className="max-w-4xl mx-auto">

        <div className="mb-12">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#09090F]/30 mb-4">
            The difference
          </p>
          <h2
            className="text-4xl sm:text-5xl leading-[0.95] tracking-[-0.03em] text-[#09090F]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
          >
            The new way
            <br />
            <span className="text-[#09090F]/30">to office.</span>
          </h2>
        </div>

        {/* Comparison table */}
        <div className="rounded-2xl overflow-hidden border border-[#09090F]/[0.06] shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-[1.2fr,1fr,1fr] bg-[#09090F]">
            <div className="px-6 py-4" />
            <div className="px-6 py-4">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40">
                Traditional lease
              </span>
            </div>
            <div className="px-6 py-4">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#E8622A]">
                Workspace
              </span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.2fr,1fr,1fr] group transition-colors ${
                i % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]"
              } hover:bg-[#F4F1EA]/70`}
            >
              {/* Label */}
              <div className="px-5 py-3 flex items-center">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#09090F]/35">
                  {row.label}
                </span>
              </div>

              {/* Traditional */}
              <div className="px-5 py-3 flex items-center gap-2 border-l border-[#09090F]/[0.04]">
                <span className="text-[#09090F]/25 text-xs leading-none shrink-0">✕</span>
                <span className="text-sm text-[#09090F]/45">{row.old}</span>
              </div>

              {/* Workspace */}
              <div className="px-5 py-3 flex items-center gap-2 border-l border-[#09090F]/[0.04]">
                <span className="text-[#7B9E87] text-xs leading-none shrink-0">✓</span>
                <span className="text-sm font-medium text-[#09090F]">{row.ws}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-6">
          <Link
            href="/spaces"
            className="group inline-flex items-center gap-2 text-[#09090F] text-sm font-semibold hover:text-[#E8622A] transition-colors"
          >
            Find your space
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link href="/about" className="text-[#09090F]/35 hover:text-[#09090F]/70 text-sm transition-colors">
            About Workspace →
          </Link>
        </div>

      </div>
    </section>
  );
}
