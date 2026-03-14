"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Moving into a Workspace building was the best decision we made as a growing startup. The flexibility meant we could double our team within a year without the headache of a new lease.",
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    company: "Aether Labs",
    location: "Central House, Shoreditch",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
    rating: 5,
    teamSize: "25 people",
  },
  {
    quote: "The Light Bulb gave us the kind of space we always dreamed of — industrial, creative, with real character. Our clients always comment on it when they visit. It's become part of our brand.",
    name: "Marcus Williams",
    role: "Creative Director",
    company: "Studio Collective",
    location: "The Light Bulb, Wandsworth",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    teamSize: "12 people",
  },
  {
    quote: "We love that we can actually customise our space. We've painted murals, added our branding, and made it feel like home. No other provider would allow that.",
    name: "Priya Sharma",
    role: "Head of Operations",
    company: "Verdant Finance",
    location: "Leather, Hide & Wool Exchange, Bermondsey",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80",
    rating: 5,
    teamSize: "40 people",
  },
  {
    quote: "From day one, the Workspace community events connected us with our best partnerships and even a couple of our key hires. The network effect is real.",
    name: "James Okafor",
    role: "Founder",
    company: "Kite Digital",
    location: "Lock Studios, Bow",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    teamSize: "8 people",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">
            Member stories
          </p>
          <h2
            className="text-4xl sm:text-5xl text-[#1C1C2E] leading-tight"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
          >
            Real businesses.
            <br />
            Real <span className="italic">growth.</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#FAF8F4] rounded-3xl p-8 sm:p-12">
            {/* Quote icon */}
            <Quote size={48} className="text-[#E8622A]/20 mb-6" />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} className="text-[#C9A84C] fill-[#C9A84C]" />
              ))}
            </div>

            {/* Quote */}
            <blockquote
              className="text-xl sm:text-2xl text-[#1C1C2E] leading-relaxed mb-8 font-light"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Person */}
            <div className="flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-[#1C1C2E] text-sm">{t.name}</div>
                <div className="text-gray-500 text-xs">{t.role}, {t.company}</div>
                <div className="text-[#E8622A] text-xs mt-0.5">{t.location} · {t.teamSize}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-8 bg-[#E8622A]" : "w-1.5 bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#E8622A] hover:text-[#E8622A] transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#E8622A] hover:text-[#E8622A] transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
