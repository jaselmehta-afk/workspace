import Link from "next/link";
import { ArrowRight } from "lucide-react";

const rows = [
  { label: "Commitment",  old: "10-year lease",          ws: "Month-to-month" },
  { label: "Guarantee",   old: "Personal guarantee",     ws: "None required" },
  { label: "Space",       old: "Blank shell, you fit it", ws: "Move-in ready" },
  { label: "Branding",    old: "Landlord rules",          ws: "Paint it, own it" },
  { label: "Flexibility", old: "Fixed headcount",         ws: "Scale any time" },
  { label: "Access",      old: "One location",            ws: "All 60 buildings" },
];

export default function ComparisonSection() {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#F4F1EA]">
      <div className="max-w-4xl mx-auto">

        <div className="mb-14">
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

        {/* Column headers */}
        <div className="grid grid-cols-3 gap-4 mb-3 px-1">
          <div /> {/* label column */}
          <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#09090F]/30 text-center">
            Traditional lease
          </div>
          <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#09090F] text-center">
            Workspace
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y" style={{ borderColor: "rgba(9,9,15,0.07)" }}>
          {rows.map((row, i) => (
            <div key={row.label} className="grid grid-cols-3 gap-4 py-4 items-center px-1">
              {/* Label */}
              <div className="text-xs font-semibold tracking-[0.08em] uppercase text-[#09090F]/35">
                {row.label}
              </div>

              {/* Old way */}
              <div className="text-sm text-[#09090F]/35 text-center line-through decoration-[#09090F]/15">
                {row.old}
              </div>

              {/* Workspace */}
              <div
                className="text-sm font-medium text-[#09090F] text-center"
                style={{
                  // Stagger a subtle highlight on alternate rows
                  background: i % 2 === 0 ? "transparent" : undefined,
                }}
              >
                {row.ws}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex items-center gap-6">
          <Link
            href="/spaces"
            className="group inline-flex items-center gap-2 text-[#09090F] text-sm font-semibold hover:text-[#E8622A] transition-colors"
          >
            Find your space
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="text-[#09090F]/35 hover:text-[#09090F]/70 text-sm transition-colors"
          >
            About Workspace →
          </Link>
        </div>

      </div>
    </section>
  );
}
