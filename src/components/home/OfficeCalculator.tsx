"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, TrendingDown, Check, X as XIcon } from "lucide-react";

// Cost model — conservative real-world London numbers
function calcTraditional(desks: number) {
  const rentPerDesk = 900;           // avg Zone 1/2 London per desk/month
  const serviceCharge = desks * 120; // ~13% on top
  const businessRates = desks * 200; // typical SME rates
  const fit_out = (desks * 3000) / 36; // amortised 3-year fit-out
  const utilities = desks * 80;
  const cleaning = desks * 40;
  const insurance = desks * 15;
  const it = desks * 60;
  return {
    rent: desks * rentPerDesk,
    serviceCharge,
    businessRates,
    fit_out: Math.round(fit_out),
    utilities,
    cleaning,
    insurance,
    it,
    total: Math.round(
      desks * rentPerDesk + serviceCharge + businessRates +
      fit_out + utilities + cleaning + insurance + it
    ),
  };
}

function calcWorkspace(desks: number) {
  // Workspace tiered pricing (realistic)
  let pricePerDesk: number;
  if (desks <= 5) pricePerDesk = 650;
  else if (desks <= 15) pricePerDesk = 590;
  else if (desks <= 30) pricePerDesk = 540;
  else if (desks <= 60) pricePerDesk = 490;
  else pricePerDesk = 450;

  return {
    total: desks * pricePerDesk,
    perDesk: pricePerDesk,
  };
}

function AnimatedNumber({ value, prefix = "£", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState(value);
  const prevRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    const duration = 500;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(from + (to - from) * ease));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        prevRef.current = to;
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value]);

  return (
    <span>
      {prefix}{displayed.toLocaleString()}{suffix}
    </span>
  );
}

const TRADITIONAL_LINE_ITEMS = [
  { key: "rent", label: "Rent" },
  { key: "serviceCharge", label: "Service charge" },
  { key: "businessRates", label: "Business rates" },
  { key: "fit_out", label: "Fit-out (amortised)" },
  { key: "utilities", label: "Utilities" },
  { key: "cleaning", label: "Cleaning" },
  { key: "insurance", label: "Insurance" },
  { key: "it", label: "IT infrastructure" },
];

export default function OfficeCalculator() {
  const [desks, setDesks] = useState(10);
  const traditional = calcTraditional(desks);
  const workspace = calcWorkspace(desks);
  const saving = traditional.total - workspace.total;
  const savingPct = Math.round((saving / traditional.total) * 100);
  const annualSaving = saving * 12;

  return (
    <section className="bg-[#09090F] py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="max-w-2xl mb-14">
          <p className="text-[#E8622A] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Cost Calculator
          </p>
          <h2
            className="text-4xl sm:text-5xl text-white leading-[1.05] tracking-[-0.03em] mb-4"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
          >
            How much could you{" "}
            <span style={{ fontWeight: 700 }}>save?</span>
          </h2>
          <p className="text-white/45 text-lg leading-relaxed">
            Drag the slider to see a real-time comparison between a traditional London office lease and an all-inclusive Workspace membership.
          </p>
        </div>

        {/* Slider */}
        <div className="mb-10">
          <div className="flex items-end justify-between mb-3">
            <label htmlFor="desk-slider" className="text-white/50 text-sm font-medium">
              Team size
            </label>
            <div
              className="text-5xl text-white font-bold tabular-nums"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              aria-live="polite"
              aria-atomic="true"
            >
              {desks} <span className="text-xl text-white/25 font-normal">desk{desks !== 1 ? "s" : ""}</span>
            </div>
          </div>
          <div className="relative">
            <input
              id="desk-slider"
              type="range"
              min={1}
              max={100}
              value={desks}
              onChange={e => setDesks(Number(e.target.value))}
              className="w-full h-1 appearance-none bg-white/[0.07] rounded-full outline-none cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to right, #E8622A ${desks}%, transparent ${desks}%)`,
              }}
              aria-label="Number of desks"
              aria-valuemin={1}
              aria-valuemax={100}
              aria-valuenow={desks}
            />
          </div>
          <div className="flex justify-between text-white/20 text-xs mt-2">
            <span>1</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>

        {/* Comparison columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

          {/* Traditional */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-7">
            <div className="flex items-center gap-2.5 mb-1">
              <XIcon size={14} className="text-white/30" />
              <p className="text-white/40 text-xs font-semibold tracking-[0.15em] uppercase">Traditional London Lease</p>
            </div>
            <div
              className="text-4xl text-white/80 mb-6 mt-3 tabular-nums"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
            >
              <AnimatedNumber value={traditional.total} /><span className="text-lg text-white/25 font-normal ml-1">/mo</span>
            </div>
            <div className="space-y-2.5">
              {TRADITIONAL_LINE_ITEMS.map(({ key, label }) => {
                const val = traditional[key as keyof typeof traditional] as number;
                return (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-white/35">{label}</span>
                    <span className="text-white/50 tabular-nums font-medium">£{val.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Workspace */}
          <div className="bg-[#E8622A]/[0.08] border border-[#E8622A]/20 rounded-3xl p-7 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#E8622A]/[0.12] blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2.5 mb-1">
              <Check size={14} className="text-[#E8622A]" />
              <p className="text-[#E8622A]/70 text-xs font-semibold tracking-[0.15em] uppercase">Workspace Membership</p>
            </div>
            <div
              className="text-4xl text-white mb-6 mt-3 tabular-nums"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
            >
              <AnimatedNumber value={workspace.total} /><span className="text-lg text-white/30 font-normal ml-1">/mo</span>
            </div>

            <div className="space-y-2.5">
              {[
                "Rent, rates & service charge",
                "Utilities & cleaning",
                "Furniture & fit-out",
                "IT & infrastructure",
                "Reception & building team",
                "Meeting room access",
                "Events & community",
                "Flexible, monthly rolling",
              ].map(item => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-white/70">
                  <Check size={13} className="text-[#E8622A] shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-[#E8622A]/20">
              <p className="text-[#E8622A]/60 text-xs font-medium">
                £<AnimatedNumber value={workspace.perDesk} prefix="" /> per desk/month · all-inclusive
              </p>
            </div>
          </div>
        </div>

        {/* Saving callout */}
        <div className="bg-gradient-to-r from-[#E8622A]/[0.12] to-[#E8622A]/[0.05] border border-[#E8622A]/20 rounded-3xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8622A]/15 flex items-center justify-center shrink-0">
              <TrendingDown size={20} className="text-[#E8622A]" />
            </div>
            <div>
              <p className="text-white/40 text-xs font-medium uppercase tracking-[0.15em] mb-1">Your estimated monthly saving</p>
              <p
                className="text-3xl text-white tabular-nums"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
                aria-live="polite"
                aria-atomic="true"
              >
                <AnimatedNumber value={saving} />
                <span className="text-[#E8622A] ml-2 text-xl">({savingPct}%)</span>
              </p>
              <p className="text-white/30 text-sm mt-0.5">
                That&apos;s <AnimatedNumber value={annualSaving} /> saved over a year
              </p>
            </div>
          </div>
          <Link
            href={`/spaces${desks > 30 ? "?type=private" : ""}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E8622A] text-white font-semibold rounded-2xl hover:bg-[#d4561e] transition-colors text-sm shrink-0"
          >
            Find spaces for {desks} {desks === 1 ? "person" : "people"}
            <ArrowRight size={15} />
          </Link>
        </div>

        <p className="text-white/15 text-xs mt-5 text-center">
          Estimates based on average Central/Zone 2 London market rates (2025). Actual savings vary by location and lease terms.
        </p>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #E8622A;
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(232, 98, 42, 0.2);
          transition: box-shadow 0.15s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 7px rgba(232, 98, 42, 0.15);
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #E8622A;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 0 4px rgba(232, 98, 42, 0.2);
        }
      `}</style>
    </section>
  );
}
