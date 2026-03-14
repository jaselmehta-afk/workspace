"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Calendar, Clock, Video, Building2, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { spaces } from "@/data/spaces";
import { Suspense } from "react";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface BookingData {
  spaceSlug: string;
  viewingType: "in-person" | "virtual" | "";
  teamSize: "" | "1-5" | "6-15" | "16-50" | "51+";
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
}

const TIMES = [
  "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "13:00",
  "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00",
];

function getDates() {
  const dates: { label: string; short: string; value: string; day: string }[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1); // start tomorrow
  for (let i = 0; i < 14; i++) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) { // skip weekends
      dates.push({
        value: d.toISOString().split("T")[0],
        label: d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }),
        short: d.toLocaleDateString("en-GB", { weekday: "short" }),
        day: String(d.getDate()),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

function BookingFlow() {
  const params = useSearchParams();
  const initialSlug = params.get("space") || spaces[0].slug;
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<BookingData>({
    spaceSlug: initialSlug,
    viewingType: "",
    teamSize: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
  });
  const dates = getDates();
  const inputRef = useRef<HTMLInputElement>(null);
  const space = spaces.find(s => s.slug === data.spaceSlug) || spaces[0];

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  const next = () => setStep(s => Math.min(s + 1, 7) as Step);
  const back = () => setStep(s => Math.max(s - 1, 1) as Step);

  const progress = ((step - 1) / 6) * 100;

  if (step === 7) {
    // Confirmation
    return (
      <div className="min-h-screen bg-[#09090F] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-16 h-16 bg-[#E8622A] rounded-full flex items-center justify-center mb-6">
          <Check size={28} className="text-white" />
        </div>
        <h1
          className="text-3xl sm:text-4xl text-white mb-4"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
        >
          You&apos;re booked in.
        </h1>
        <p className="text-white/50 mb-2 max-w-sm">
          We&apos;ll confirm your {data.viewingType === "virtual" ? "virtual" : "in-person"} viewing of{" "}
          <strong className="text-white/80">{space.name}</strong> via email within the hour.
        </p>
        <div className="mt-6 inline-flex flex-col items-center gap-1 px-6 py-4 bg-white/[0.05] rounded-2xl border border-white/[0.08] text-sm">
          <span className="text-white/40 text-xs tracking-wider uppercase mb-1">Your appointment</span>
          <span className="text-white font-medium">{data.date && new Date(data.date + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</span>
          <span className="text-white/50">{data.time} · {data.viewingType === "virtual" ? "Video call" : space.neighbourhood}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-10">
          <Link href={`/spaces/${space.slug}`} className="px-6 py-3 bg-[#E8622A] text-white font-semibold rounded-xl hover:bg-[#d4561e] transition-colors">
            View space details
          </Link>
          <Link href="/spaces" className="px-6 py-3 bg-white/[0.07] text-white rounded-xl hover:bg-white/10 transition-colors">
            Browse more spaces
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090F] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-5 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="7" fill="#E8622A"/>
            <path d="M7 10L11.5 22L16 14L20.5 22L25 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-white/80 font-medium text-[15px]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Workspace
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-white/30 text-xs">{step} of 6</span>
          {step > 1 && (
            <button onClick={back} className="flex items-center gap-1 text-white/40 hover:text-white/70 text-sm transition-colors">
              <ArrowLeft size={14} /> Back
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-white/[0.06]">
        <div
          className="h-full bg-[#E8622A] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">

          {/* Step 1: Choose space */}
          {step === 1 && (
            <StepWrapper
              q="Which space would you like to view?"
              hint="Select from our available buildings"
            >
              <div className="grid gap-3">
                {spaces.map(s => (
                  <button
                    key={s.slug}
                    onClick={() => { setData(d => ({ ...d, spaceSlug: s.slug })); setTimeout(next, 220); }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-150 ${
                      data.spaceSlug === s.slug
                        ? "border-[#E8622A] bg-[#E8622A]/8"
                        : "border-white/[0.08] bg-white/[0.03] hover:border-white/20"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                      <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm">{s.name}</div>
                      <div className="text-white/40 text-xs mt-0.5">{s.neighbourhood}, {s.postcode}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      data.spaceSlug === s.slug ? "border-[#E8622A] bg-[#E8622A]" : "border-white/20"
                    }`}>
                      {data.spaceSlug === s.slug && <Check size={11} className="text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {/* Step 2: Viewing type */}
          {step === 2 && (
            <StepWrapper q="How would you like to view it?" hint="Both are free and take around 30 minutes">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { value: "in-person", icon: Building2, title: "In person", sub: "Visit the building with one of our team" },
                  { value: "virtual", icon: Video, title: "Virtual tour", sub: "Live video walkthrough from anywhere" },
                ].map(({ value, icon: Icon, title, sub }) => (
                  <button
                    key={value}
                    onClick={() => { setData(d => ({ ...d, viewingType: value as BookingData["viewingType"] })); setTimeout(next, 220); }}
                    className={`flex flex-col items-start p-6 rounded-2xl border text-left transition-all duration-150 ${
                      data.viewingType === value
                        ? "border-[#E8622A] bg-[#E8622A]/8"
                        : "border-white/[0.08] bg-white/[0.03] hover:border-white/20"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                      data.viewingType === value ? "bg-[#E8622A]/20 text-[#E8622A]" : "bg-white/[0.06] text-white/40"
                    }`}>
                      <Icon size={20} />
                    </div>
                    <div className="font-semibold text-white text-base mb-1">{title}</div>
                    <div className="text-white/40 text-sm leading-relaxed">{sub}</div>
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {/* Step 3: Team size */}
          {step === 3 && (
            <StepWrapper q="How big is your team?" hint="This helps us recommend the right spaces">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "1-5", label: "1–5 people", sub: "Solo to small" },
                  { value: "6-15", label: "6–15 people", sub: "Growing team" },
                  { value: "16-50", label: "16–50 people", sub: "Scale-up" },
                  { value: "51+", label: "51+ people", sub: "Enterprise" },
                ].map(({ value, label, sub }) => (
                  <button
                    key={value}
                    onClick={() => { setData(d => ({ ...d, teamSize: value as BookingData["teamSize"] })); setTimeout(next, 220); }}
                    className={`flex flex-col p-5 rounded-2xl border text-left transition-all duration-150 ${
                      data.teamSize === value
                        ? "border-[#E8622A] bg-[#E8622A]/8"
                        : "border-white/[0.08] bg-white/[0.03] hover:border-white/20"
                    }`}
                  >
                    <Users size={18} className={data.teamSize === value ? "text-[#E8622A] mb-3" : "text-white/25 mb-3"} />
                    <div className="font-semibold text-white text-base">{label}</div>
                    <div className="text-white/40 text-xs mt-0.5">{sub}</div>
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {/* Step 4: Date */}
          {step === 4 && (
            <StepWrapper q="Pick a date" hint="Available Mon–Fri, next 2 weeks">
              <div className="grid grid-cols-5 gap-2">
                {dates.map(d => (
                  <button
                    key={d.value}
                    onClick={() => { setData(dd => ({ ...dd, date: d.value })); setTimeout(next, 220); }}
                    className={`flex flex-col items-center py-3 px-1 rounded-2xl border text-center transition-all duration-150 ${
                      data.date === d.value
                        ? "border-[#E8622A] bg-[#E8622A]/8"
                        : "border-white/[0.08] bg-white/[0.03] hover:border-white/20"
                    }`}
                  >
                    <span className="text-white/35 text-[10px] font-medium uppercase tracking-wider">{d.short}</span>
                    <span className={`text-xl font-bold mt-1 ${data.date === d.value ? "text-[#E8622A]" : "text-white"}`} style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {d.day}
                    </span>
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {/* Step 5: Time */}
          {step === 5 && (
            <StepWrapper q="What time works best?" hint="Each slot is 30–45 minutes">
              <div className="grid grid-cols-4 gap-2">
                {TIMES.map(t => (
                  <button
                    key={t}
                    onClick={() => { setData(d => ({ ...d, time: t })); setTimeout(next, 220); }}
                    className={`py-3 rounded-2xl border text-sm font-medium transition-all duration-150 ${
                      data.time === t
                        ? "border-[#E8622A] bg-[#E8622A]/8 text-[#E8622A]"
                        : "border-white/[0.08] bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {/* Step 6: Your details */}
          {step === 6 && (
            <StepWrapper q="Last step — who should we expect?" hint="We'll send confirmation to your email">
              <form
                onSubmit={(e) => { e.preventDefault(); next(); }}
                className="space-y-4"
              >
                {[
                  { key: "name", label: "Full name", type: "text", required: true, placeholder: "Jane Smith" },
                  { key: "email", label: "Email address", type: "email", required: true, placeholder: "jane@company.com" },
                  { key: "phone", label: "Phone number", type: "tel", required: false, placeholder: "+44 7700 000000" },
                ].map((f, i) => (
                  <div key={f.key}>
                    <label htmlFor={`book-${f.key}`} className="text-white/40 text-xs font-medium tracking-wider uppercase block mb-2">
                      {f.label}{!f.required && <span className="ml-1 text-white/20">(optional)</span>}
                    </label>
                    <input
                      id={`book-${f.key}`}
                      ref={i === 0 ? inputRef : undefined}
                      type={f.type}
                      required={f.required}
                      placeholder={f.placeholder}
                      value={data[f.key as keyof BookingData] as string}
                      onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))}
                      className="w-full px-5 py-4 bg-white/[0.04] border border-white/[0.1] rounded-2xl text-white placeholder-white/20 text-base focus:outline-none focus:border-[#E8622A] transition-colors"
                    />
                  </div>
                ))}

                {/* Booking summary */}
                <div className="mt-6 p-4 bg-white/[0.04] rounded-2xl border border-white/[0.07] space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/40">Space</span>
                    <span className="text-white font-medium">{space.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Type</span>
                    <span className="text-white/70 capitalize">{data.viewingType === "virtual" ? "Virtual tour" : "In-person viewing"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">When</span>
                    <span className="text-white/70">
                      {data.date && new Date(data.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })} at {data.time}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#E8622A] text-white font-semibold rounded-2xl hover:bg-[#d4561e] transition-colors text-base mt-2 flex items-center justify-center gap-2"
                >
                  Confirm booking <ArrowRight size={18} />
                </button>
                <p className="text-white/25 text-xs text-center">Free cancellation up to 24 hours before</p>
              </form>
            </StepWrapper>
          )}
        </div>
      </div>
    </div>
  );
}

function StepWrapper({ q, hint, children }: { q: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-up">
      <p className="text-white/30 text-xs font-medium tracking-widest uppercase mb-4">{hint}</p>
      <h2
        className="text-2xl sm:text-3xl text-white mb-8 leading-tight"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
      >
        {q}
      </h2>
      {children}
    </div>
  );
}

export default function BookViewingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090F]" />}>
      <BookingFlow />
    </Suspense>
  );
}
