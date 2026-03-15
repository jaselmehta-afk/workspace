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
      <div className="max-w-5xl mx-auto">

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Old way — dark card, muted */}
          <div className="rounded-2xl bg-[#09090F] p-8">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/45 mb-8">
              Traditional lease
            </p>
            <ul className="space-y-5">
              {rows.map(row => (
                <li key={row.label} className="flex items-start gap-3">
                  <span className="text-white/35 text-base leading-none mt-px shrink-0">✕</span>
                  <div>
                    <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-1">
                      {row.label}
                    </div>
                    <div className="text-white/60 text-sm">{row.old}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Workspace — white card, confident */}
          <div className="rounded-2xl bg-white p-8">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#E8622A] mb-8">
              Workspace
            </p>
            <ul className="space-y-5">
              {rows.map(row => (
                <li key={row.label} className="flex items-start gap-3">
                  <span className="text-[#7B9E87] text-base leading-none mt-px shrink-0">✓</span>
                  <div>
                    <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#09090F]/30 mb-1">
                      {row.label}
                    </div>
                    <div className="text-[#09090F] text-sm font-medium">{row.ws}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-10 flex items-center gap-6">
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
