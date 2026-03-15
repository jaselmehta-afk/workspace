"use client";

import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const INTERVAL = 5000; // ms per slide

const testimonials = [
  {
    quote: "Moving into a Workspace building was the best decision we made as a growing startup. The flexibility meant we could double our team within a year without the headache of a new lease.",
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    company: "Aether Labs",
    location: "Central House, Shoreditch",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&q=80",
    rating: 5,
    teamSize: "25 people",
  },
  {
    quote: "The Light Bulb gave us the kind of space we always dreamed of — industrial, creative, with real character. Our clients always comment on it. It's become part of our brand.",
    name: "Marcus Williams",
    role: "Creative Director",
    company: "Studio Collective",
    location: "The Light Bulb, Wandsworth",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    rating: 5,
    teamSize: "12 people",
  },
  {
    quote: "We love that we can actually customise our space. We've painted murals, added our branding, and made it feel like home. No other provider would allow that.",
    name: "Priya Sharma",
    role: "Head of Operations",
    company: "Verdant Finance",
    location: "Leather, Hide & Wool Exchange",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&q=80",
    rating: 5,
    teamSize: "40 people",
  },
  {
    quote: "From day one, the Workspace community events connected us with our best partnerships and even a couple of our key hires. The network effect is real.",
    name: "James Okafor",
    role: "Founder",
    company: "Kite Digital",
    location: "Lock Studios, Bow",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
    rating: 5,
    teamSize: "8 people",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fading, setFading] = useState(false);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number) => {
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setProgress(0);
      setFading(false);
    }, 220);
  };

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((active + 1) % testimonials.length);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    progressRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return p;
        return p + (100 / (INTERVAL / 50));
      });
    }, 50);
    advanceRef.current = setTimeout(() => {
      goTo((active + 1) % testimonials.length);
    }, INTERVAL);
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
      if (advanceRef.current) clearTimeout(advanceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused]);

  const t = testimonials[active];

  return (
    <section
      className="py-28 px-4 sm:px-6 lg:px-8 bg-[#09090F] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left — headline + controls */}
          <ScrollReveal className="lg:w-72 shrink-0">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#E8622A] mb-5">Member stories</p>
            <h2
              className="text-4xl sm:text-5xl text-white leading-[0.95] tracking-[-0.03em] mb-10"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
            >
              Real businesses.
              <br />
              <span className="italic font-light">Real growth.</span>
            </h2>

            {/* Stacked person previews */}
            <div className="space-y-3 mb-10">
              {testimonials.map((item, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all duration-200 ${
                    i === active
                      ? "bg-white/[0.07] border border-white/10"
                      : "hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                    style={{ opacity: i === active ? 1 : 0.45 }}
                  />
                  <div className="min-w-0">
                    <div className={`text-sm font-medium truncate transition-colors ${i === active ? "text-white" : "text-white/45"}`}>
                      {item.name}
                    </div>
                    <div className={`text-xs truncate transition-colors ${i === active ? "text-white/55" : "text-white/25"}`}>
                      {item.company}
                    </div>
                  </div>
                  {i === active && (
                    <div
                      className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "#E8622A" }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Prev / next */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:text-white transition-colors text-white/40"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:text-white transition-colors text-white/40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </ScrollReveal>

          {/* Right — quote card */}
          <div className="flex-1">
            <ScrollReveal delay={0.1}>
              <div
                className="relative bg-white/[0.04] border border-white/[0.07] rounded-3xl p-8 sm:p-12 overflow-hidden transition-opacity duration-220"
                style={{ opacity: fading ? 0 : 1, transition: "opacity 0.22s ease" }}
              >
                {/* Subtle glow */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                  style={{ background: "radial-gradient(circle at top right, rgba(232,98,42,0.07) 0%, transparent 70%)" }}
                />

                {/* Stars */}
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={15} className="text-[#C9A84C] fill-[#C9A84C]" />
                  ))}
                </div>

                {/* Quote — big */}
                <blockquote
                  className="text-2xl sm:text-3xl lg:text-[2rem] text-white leading-[1.35] font-light mb-10"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Person */}
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-white/10"
                  />
                  <div>
                    <div className="font-semibold text-white text-sm mb-0.5">{t.name}</div>
                    <div className="text-white/55 text-xs">{t.role}, {t.company}</div>
                    <div className="text-[#E8622A] text-xs mt-1">{t.location} · {t.teamSize}</div>
                  </div>
                </div>

                {/* Animated progress bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.05]">
                  <div
                    className="h-full bg-[#E8622A] transition-none"
                    style={{
                      width: `${progress}%`,
                      transition: paused ? "none" : "width 50ms linear",
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
