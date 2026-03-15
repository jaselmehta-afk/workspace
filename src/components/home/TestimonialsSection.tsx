"use client";

import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";

const INTERVAL = 6000;

const testimonials = [
  {
    quote: "Moving into a Workspace building was the best decision we made as a growing startup. The flexibility meant we could double our team within a year without the headache of a new lease.",
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    company: "Aether Labs",
    location: "Central House, Shoreditch",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&q=85&fit=crop&crop=face",
    rating: 5,
    teamSize: "25 people",
  },
  {
    quote: "The Light Bulb gave us the kind of space we always dreamed of — industrial, creative, with real character. Our clients always comment on it. It's become part of our brand.",
    name: "Marcus Williams",
    role: "Creative Director",
    company: "Studio Collective",
    location: "The Light Bulb, Wandsworth",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85&fit=crop&crop=face",
    rating: 5,
    teamSize: "12 people",
  },
  {
    quote: "We love that we can actually customise our space. We've painted murals, added our branding, and made it feel like home. No other provider would allow that.",
    name: "Priya Sharma",
    role: "Head of Operations",
    company: "Verdant Finance",
    location: "Leather, Hide & Wool Exchange",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=85&fit=crop&crop=face",
    rating: 5,
    teamSize: "40 people",
  },
  {
    quote: "From day one, the Workspace community events connected us with our best partnerships and even a couple of our key hires. The network effect is real.",
    name: "James Okafor",
    role: "Founder",
    company: "Kite Digital",
    location: "Lock Studios, Bow",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85&fit=crop&crop=face",
    rating: 5,
    teamSize: "8 people",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [animated, setAnimated] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [progress, setProgress] = useState(0);

  // Trigger polaroid animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay so initial state renders first
          setTimeout(() => {
            setAnimated(true);
            setTimeout(() => setQuoteVisible(true), 550);
          }, 80);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = (idx: number) => {
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setProgress(0);
      setFading(false);
    }, 250);
  };

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    progressRef.current = setInterval(() => {
      setProgress(p => (p >= 100 ? p : p + 100 / (INTERVAL / 50)));
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
      ref={sectionRef}
      className="py-28 px-4 bg-[#09090F] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-4xl mx-auto">

        {/* Overline + headline */}
        <div className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#E8622A] mb-4">
            Member stories
          </p>
          <h2
            className="text-4xl sm:text-5xl text-white leading-[0.95] tracking-[-0.03em]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
          >
            Real businesses.
            <br />
            <span className="italic font-light">Real growth.</span>
          </h2>
        </div>

        {/* Polaroid + frame zone */}
        <div className="relative flex items-center justify-center" style={{ minHeight: 380 }}>

          {/* Animated black frame — starts wide, snaps to polaroid */}
          <div
            className="absolute border-[3px] border-black pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: animated ? 252 : "min(82vw, 620px)",
              height: animated ? 358 : "min(58vw, 460px)",
              transition: animated
                ? "width 1.05s cubic-bezier(0.16, 1, 0.3, 1), height 1.05s cubic-bezier(0.16, 1, 0.3, 1)"
                : "none",
              zIndex: 2,
            }}
          />

          {/* Polaroid card */}
          <div
            className="relative z-10 bg-white shadow-2xl"
            style={{
              width: 240,
              padding: "12px 12px 52px",
              opacity: fading ? 0 : 1,
              transition: "opacity 0.25s ease",
            }}
          >
            {/* B&W photo */}
            <img
              src={t.avatar}
              alt={t.name}
              className="w-full object-cover block"
              style={{
                height: 268,
                filter: "grayscale(100%) contrast(1.05)",
                display: "block",
              }}
            />

            {/* Polaroid caption strip */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-4 pt-3">
              <span
                className="text-[11px] text-black/60 tracking-wide"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontStyle: "italic" }}
              >
                {t.name}
              </span>
            </div>
          </div>
        </div>

        {/* Quote + person — fades in after frame snaps */}
        <div
          className="text-center mt-12 max-w-2xl mx-auto"
          style={{
            opacity: quoteVisible && !fading ? 1 : 0,
            transform: quoteVisible && !fading ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={14} className="text-[#C9A84C] fill-[#C9A84C]" />
            ))}
          </div>

          {/* Quote */}
          <blockquote
            className="text-xl sm:text-2xl lg:text-[1.65rem] text-white leading-[1.45] mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400 }}
          >
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          {/* Person */}
          <div className="flex flex-col items-center gap-1">
            <div className="font-semibold text-white text-sm">{t.name}</div>
            <div className="text-white/50 text-xs">{t.role}, {t.company}</div>
            <div className="text-[#E8622A] text-xs mt-0.5">{t.location} · {t.teamSize}</div>
          </div>
        </div>

        {/* Navigation dots + progress */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
              style={{
                width: i === active ? 32 : 8,
                background: i === active ? "rgba(232,98,42,0.25)" : "rgba(255,255,255,0.15)",
              }}
            >
              {i === active && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#E8622A] rounded-full"
                  style={{
                    width: `${progress}%`,
                    transition: paused ? "none" : "width 50ms linear",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Thumbnail strip */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`View ${item.name}'s testimonial`}
              className="rounded-full overflow-hidden transition-all duration-300"
              style={{
                width: i === active ? 40 : 28,
                height: i === active ? 40 : 28,
                opacity: i === active ? 1 : 0.35,
                ring: i === active ? "2px solid #E8622A" : "none",
                outline: i === active ? "2px solid #E8622A" : "none",
                outlineOffset: 2,
              }}
            >
              <img
                src={item.avatar}
                alt={item.name}
                className="w-full h-full object-cover"
                style={{ filter: i === active ? "none" : "grayscale(60%)" }}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
