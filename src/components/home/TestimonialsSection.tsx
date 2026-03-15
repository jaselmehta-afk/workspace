"use client";

import { useState, useEffect } from "react";

const INTERVAL = 6000;

const testimonials = [
  {
    quote: "Moving into a Workspace building was the best decision we made as a growing startup.",
    name: "Sarah Chen",
    role: "CEO & Co-founder, Aether Labs",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=85&fit=crop&crop=face",
  },
  {
    quote: "The Light Bulb gave us the kind of space we always dreamed of — industrial, creative, with real character. Our clients always comment on it.",
    name: "Marcus Williams",
    role: "Creative Director, Studio Collective",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=85&fit=crop&crop=face",
  },
  {
    quote: "We love that we can actually customise our space. We've painted murals, added our branding, and made it feel like home.",
    name: "Priya Sharma",
    role: "Head of Operations, Verdant Finance",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=85&fit=crop&crop=face",
  },
  {
    quote: "From day one, the Workspace community events connected us with our best partnerships and even a couple of our key hires.",
    name: "James Okafor",
    role: "Founder, Kite Digital",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=85&fit=crop&crop=face",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = (idx: number) => {
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setProgress(0);
      setFading(false);
    }, 280);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (paused) return;
    const progressTimer = setInterval(() => {
      setProgress(p => (p < 100 ? p + 100 / (INTERVAL / 50) : p));
    }, 50);
    const advanceTimer = setTimeout(() => {
      goTo((active + 1) % testimonials.length);
    }, INTERVAL);
    return () => {
      clearInterval(progressTimer);
      clearTimeout(advanceTimer);
    };
  }, [active, paused]);

  const t = testimonials[active];

  return (
    <section
      className="py-28 px-4 bg-[#09090F]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-2xl mx-auto">

        <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-white/20 text-center mb-16">
          Member stories
        </p>

        {/* Quote + person */}
        <div
          style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 0.28s ease",
            minHeight: 220,
          }}
        >
          <blockquote
            className="text-2xl sm:text-[1.7rem] text-white text-center leading-[1.45] mb-10"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <div className="flex items-center gap-3 justify-center">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-9 h-9 rounded-full object-cover"
              style={{ opacity: 0.75 }}
            />
            <div>
              <div className="text-white/85 text-sm font-medium tracking-[-0.01em]">{t.name}</div>
              <div className="text-white/30 text-xs mt-0.5">{t.role}</div>
            </div>
          </div>
        </div>

        {/* Progress bars — one per testimonial, fills from left to right */}
        <div className="flex gap-2 mt-14">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Testimonial ${i + 1}`}
              className="flex-1 h-px relative overflow-hidden cursor-pointer"
              style={{ background: "rgba(255,255,255,0.10)" }}
            >
              <div
                className="absolute inset-y-0 left-0"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  width:
                    i < active
                      ? "100%"
                      : i === active
                      ? `${progress}%`
                      : "0%",
                  transition:
                    i === active && !paused ? "width 50ms linear" : "none",
                }}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
