import Link from "next/link";
import { X, Check, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const traditional = [
  { item: "12-month minimum lease", cost: "Lock-in risk" },
  { item: "Fit-out & furnishing", cost: "£50k–£200k upfront" },
  { item: "Business rates", cost: "~£18/sq ft/yr" },
  { item: "Legal & agent fees", cost: "~£15,000" },
  { item: "IT & infrastructure", cost: "£5k–£25k" },
  { item: "Service charge & rates", cost: "Unpredictable" },
];

const workspace = [
  { item: "Monthly rolling contract", note: "Leave with 30 days notice" },
  { item: "Move-in ready — day one", note: "Fully furnished & fitted" },
  { item: "All-inclusive pricing", note: "Rates, utilities, WiFi" },
  { item: "Zero agency fees", note: "Deal direct, always" },
  { item: "IT-ready from day one", note: "Gigabit fibre included" },
  { item: "Fixed monthly cost", note: "No surprises" },
];

export default function PricingComparison() {
  return (
    <section className="bg-[#09090F] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E8622A] mb-4">The honest comparison</p>
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] tracking-[-0.03em]"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
            >
              Stop overpaying
              <br />
              for your office.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 relative">
          {/* Divider line — desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.06] -translate-x-px" />

          {/* Traditional */}
          <ScrollReveal delay={0.1}>
            <div className="lg:pr-12 xl:pr-20">
              <div className="mb-6">
                <p className="text-white/25 text-xs tracking-[0.15em] uppercase font-medium mb-2">The traditional way</p>
                <p className="text-white/50 text-2xl font-light" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  £2,800–£4,200
                  <span className="text-white/25 text-base font-normal ml-2">/desk/month in Zone 1</span>
                </p>
              </div>
              <div className="space-y-3">
                {traditional.map(({ item, cost }) => (
                  <div key={item} className="flex items-start gap-4 py-3 border-b border-white/[0.05]">
                    <div className="w-6 h-6 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={12} className="text-white/30" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white/50 text-sm">{item}</div>
                      <div className="text-white/25 text-xs mt-0.5">{cost}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Workspace */}
          <ScrollReveal delay={0.2}>
            <div className="lg:pl-12 xl:pl-20">
              <div className="mb-6">
                <p className="text-[#E8622A] text-xs tracking-[0.15em] uppercase font-medium mb-2">The Workspace way</p>
                <p className="text-white text-2xl font-semibold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  From £550
                  <span className="text-white/40 text-base font-normal ml-2">/desk/month, all-in</span>
                </p>
              </div>
              <div className="space-y-3">
                {workspace.map(({ item, note }) => (
                  <div key={item} className="flex items-start gap-4 py-3 border-b border-white/[0.05]">
                    <div className="w-6 h-6 rounded-full bg-[#E8622A]/15 border border-[#E8622A]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-[#E8622A]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm">{item}</div>
                      <div className="text-white/40 text-xs mt-0.5">{note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-white/[0.06]">
            <div>
              <p
                className="text-3xl sm:text-4xl text-white font-light"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                Save up to{" "}
                <span className="font-bold text-[#E8622A]">65%</span>
                {" "}vs a traditional lease.
              </p>
              <p className="text-white/35 text-sm mt-2">Based on a 10-person team in Zone 1, 12-month comparison.</p>
            </div>
            <Link
              href="/spaces"
              className="shrink-0 flex items-center gap-2 px-8 py-4 bg-[#E8622A] text-white font-semibold rounded-2xl hover:bg-[#d4561e] transition-colors text-base whitespace-nowrap"
            >
              See available spaces <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
