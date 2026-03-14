"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, MapPin, Users, Sparkles, Star } from "lucide-react";
import { spaces } from "@/data/spaces";

type Step = 1 | 2 | 3 | 4;

const steps = [
  { step: 1, label: "Team size" },
  { step: 2, label: "Location" },
  { step: 3, label: "Priorities" },
  { step: 4, label: "Your matches" },
];

const teamSizeOptions = [
  { value: "1-5", label: "Just me or a small crew", sub: "1–5 people", emoji: "🌱" },
  { value: "6-15", label: "A growing team", sub: "6–15 people", emoji: "🚀" },
  { value: "16-50", label: "A proper company", sub: "16–50 people", emoji: "🏢" },
  { value: "51+", label: "A large organisation", sub: "51+ people", emoji: "🌆" },
];

const areaOptions = [
  { value: "central", label: "Central", desc: "Shoreditch, Clerkenwell, City" },
  { value: "east", label: "East", desc: "Hackney, Bow, Stratford" },
  { value: "south", label: "South", desc: "Bermondsey, Wandsworth, Wimbledon" },
  { value: "west", label: "West", desc: "Chiswick, Richmond, Hammersmith" },
  { value: "north", label: "North", desc: "Islington, Camden, Highbury" },
  { value: "any", label: "Anywhere", desc: "Show me the best across London" },
];

const priorityOptions = [
  { value: "price", label: "Best value", emoji: "💰" },
  { value: "design", label: "Beautiful design", emoji: "✨" },
  { value: "transport", label: "Great transport links", emoji: "🚇" },
  { value: "community", label: "Thriving community", emoji: "🤝" },
  { value: "flexibility", label: "Maximum flexibility", emoji: "🔄" },
  { value: "sustainability", label: "Sustainability", emoji: "🌿" },
];

function getRecommendations(teamSize: string, area: string, priorities: string[]) {
  let filtered = spaces.filter((s) => {
    if (teamSize === "1-5") return s.capacity.min <= 5;
    if (teamSize === "6-15") return s.capacity.min <= 15 && s.capacity.max >= 6;
    if (teamSize === "16-50") return s.capacity.max >= 16;
    if (teamSize === "51+") return s.capacity.max >= 51;
    return true;
  });

  if (area !== "any") {
    filtered = filtered.filter((s) => s.area === area);
    if (filtered.length === 0) filtered = spaces;
  }

  // Score by priorities
  const scored = filtered.map((s) => {
    let score = s.rating * 10;
    if (priorities.includes("price")) score += (1000 - s.priceFrom) / 100;
    if (priorities.includes("community")) score += s.reviewCount / 20;
    if (priorities.includes("design") && s.isFeatured) score += 15;
    if (priorities.includes("flexibility")) score += 10;
    if (priorities.includes("sustainability") && s.amenities.includes("EV charging")) score += 10;
    return { space: s, score, match: Math.min(99, Math.floor(70 + score / 5)) };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}

export default function SpaceFinderPage() {
  const [step, setStep] = useState<Step>(1);
  const [teamSize, setTeamSize] = useState("");
  const [area, setArea] = useState("");
  const [priorities, setPriorities] = useState<string[]>([]);

  const togglePriority = (val: string) => {
    setPriorities((prev) =>
      prev.includes(val) ? prev.filter((p) => p !== val) : prev.length < 3 ? [...prev, val] : prev
    );
  };

  const recommendations = step === 4 ? getRecommendations(teamSize, area, priorities) : [];

  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      {/* Header */}
      <div className="bg-[#09090F] pt-28 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8622A]/20 rounded-full text-[#E8622A] text-xs font-semibold mb-4">
            <Sparkles size={13} />
            AI Space Finder
          </div>
          <h1
            className="text-3xl sm:text-4xl text-white mb-3 font-light"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Find your perfect workspace
          </h1>
          <p className="text-white/60">Answer 3 quick questions and we&apos;ll match you to your ideal Workspace building.</p>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {steps.map((s, i) => (
              <div key={s.step} className="flex items-center gap-2">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    step > s.step
                      ? "bg-[#7B9E87] text-white"
                      : step === s.step
                      ? "bg-[#E8622A] text-white"
                      : "bg-white/10 text-white/40"
                  }`}
                >
                  {step > s.step ? <Check size={14} /> : s.step}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px ${step > s.step ? "bg-[#7B9E87]" : "bg-white/20"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Step 1: Team size */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold text-[#09090F] mb-2 text-center" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              How big is your team?
            </h2>
            <p className="text-gray-500 text-center mb-8">This helps us find spaces with the right capacity.</p>
            <div className="space-y-3">
              {teamSizeOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setTeamSize(opt.value); setStep(2); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all hover:border-[#E8622A] hover:shadow-md ${
                    teamSize === opt.value ? "border-[#E8622A] bg-[#E8622A]/5" : "border-gray-200 bg-white"
                  }`}
                >
                  <span className="text-3xl">{opt.emoji}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-[#09090F]">{opt.label}</div>
                    <div className="text-sm text-gray-500">{opt.sub}</div>
                  </div>
                  {teamSize === opt.value && <Check size={18} className="text-[#E8622A]" />}
                  <ArrowRight size={16} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold text-[#09090F] mb-2 text-center" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Which part of London?
            </h2>
            <p className="text-gray-500 text-center mb-8">Pick the area that works best for your team.</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {areaOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setArea(opt.value)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all hover:border-[#E8622A] hover:shadow-md ${
                    area === opt.value ? "border-[#E8622A] bg-[#E8622A]/5" : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#09090F]">{opt.label}</span>
                    {area === opt.value && <Check size={16} className="text-[#E8622A]" />}
                  </div>
                  <div className="text-xs text-gray-400">{opt.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-gray-300">
                <ArrowLeft size={14} />Back
              </button>
              <button
                onClick={() => area && setStep(3)}
                disabled={!area}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#E8622A] text-white font-semibold rounded-xl hover:bg-[#d4561e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Priorities */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold text-[#09090F] mb-2 text-center" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              What matters most to you?
            </h2>
            <p className="text-gray-500 text-center mb-8">Pick up to 3 priorities. We&apos;ll weight your recommendations accordingly.</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {priorityOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => togglePriority(opt.value)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all hover:border-[#E8622A] hover:shadow-md ${
                    priorities.includes(opt.value) ? "border-[#E8622A] bg-[#E8622A]/5" : "border-gray-200 bg-white"
                  }`}
                >
                  <span className="text-2xl mb-2 block">{opt.emoji}</span>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#09090F] text-sm">{opt.label}</span>
                    {priorities.includes(opt.value) && <Check size={14} className="text-[#E8622A]" />}
                  </div>
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-400 text-center mb-6">
              {priorities.length === 0 ? "Select at least 1 priority" : `${priorities.length}/3 selected`}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-gray-300">
                <ArrowLeft size={14} />Back
              </button>
              <button
                onClick={() => priorities.length > 0 && setStep(4)}
                disabled={priorities.length === 0}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#E8622A] text-white font-semibold rounded-xl hover:bg-[#d4561e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Sparkles size={16} />
                Find my spaces
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#E8622A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={28} className="text-[#E8622A]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#09090F] mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Your top matches
              </h2>
              <p className="text-gray-500 text-sm">Based on your preferences, here are your ideal Workspace buildings.</p>
            </div>

            <div className="space-y-4 mb-8">
              {recommendations.map(({ space, match }, i) => (
                <Link
                  key={space.id}
                  href={`/spaces/${space.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-40 h-32 sm:h-auto overflow-hidden shrink-0">
                      <img src={space.image} alt={space.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      {i === 0 && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-[#E8622A] text-white text-xs font-bold rounded-md">
                          #1 Match
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-1 text-[#E8622A] text-xs font-medium mb-1">
                            <MapPin size={11} />{space.neighbourhood}
                          </div>
                          <h3 className="font-semibold text-[#09090F]">{space.name}</h3>
                        </div>
                        <div className="text-center shrink-0">
                          <div className="text-2xl font-bold text-[#E8622A]">{match}%</div>
                          <div className="text-xs text-gray-400">match</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{space.headline}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star size={11} className="text-[#C9A84C] fill-[#C9A84C]" />
                          <span className="text-xs font-semibold">{space.rating}</span>
                          <span className="text-xs text-gray-400">· from £{space.priceFrom.toLocaleString()}/{space.priceUnit}</span>
                        </div>
                        <span className="flex items-center gap-1 text-[#E8622A] text-xs font-semibold group-hover:gap-2 transition-all">
                          View space <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { setStep(1); setTeamSize(""); setArea(""); setPriorities([]); }}
                className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-gray-300"
              >
                <ArrowLeft size={14} />Start again
              </button>
              <Link
                href="/spaces"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#09090F] text-white font-semibold rounded-xl hover:bg-black transition-colors"
              >
                Browse all spaces <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
