"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Users, ArrowRight, Play } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&q=85",
];

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [spaceType, setSpaceType] = useState("");
  const [teamSize, setTeamSize] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (spaceType) params.set("type", spaceType);
    if (teamSize) params.set("size", teamSize);
    window.location.href = `/spaces?${params.toString()}`;
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImages[0]}
          alt="Workspace interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C2E]/90 via-[#1C1C2E]/70 to-[#1C1C2E]/40" />
        {/* Geometric accent */}
        <div className="absolute bottom-0 right-0 w-1/3 h-2/3 bg-[#E8622A]/10 rounded-tl-[120px] blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-[#E8622A] rounded-full animate-pulse" />
            60+ buildings across London
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-[1.05] tracking-tight"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
          >
            Space to{" "}
            <span className="italic text-[#E8622A]">grow.</span>
            <br />
            Space to{" "}
            <span className="italic">shine.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 mb-10 leading-relaxed max-w-xl">
            Flexible, inspiring offices for London&apos;s brightest businesses.
            From hot desks to entire floors — on your terms.
          </p>

          {/* Search form */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2 mb-8"
          >
            <div className="flex items-center gap-2 flex-1 px-3 py-2 border-b sm:border-b-0 sm:border-r border-gray-100">
              <MapPin size={16} className="text-[#E8622A] shrink-0" />
              <input
                type="text"
                placeholder="Area, postcode or building"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-sm text-[#1C1C2E] placeholder-gray-400 focus:outline-none bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-gray-100">
              <Search size={16} className="text-gray-400 shrink-0" />
              <select
                value={spaceType}
                onChange={(e) => setSpaceType(e.target.value)}
                className="text-sm text-[#1C1C2E] focus:outline-none bg-transparent cursor-pointer pr-4"
              >
                <option value="">Space type</option>
                <option value="private">Private Office</option>
                <option value="coworking">Coworking</option>
                <option value="studio">Studio</option>
                <option value="event">Event Space</option>
              </select>
            </div>
            <div className="flex items-center gap-2 px-3 py-2">
              <Users size={16} className="text-gray-400 shrink-0" />
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className="text-sm text-[#1C1C2E] focus:outline-none bg-transparent cursor-pointer pr-4"
              >
                <option value="">Team size</option>
                <option value="1-5">1–5 people</option>
                <option value="6-15">6–15 people</option>
                <option value="16-50">16–50 people</option>
                <option value="51+">51+ people</option>
              </select>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#E8622A] text-white font-semibold text-sm rounded-xl hover:bg-[#d4561e] transition-colors shrink-0"
            >
              <Search size={16} />
              Search
            </button>
          </form>

          {/* Quick links */}
          <div className="flex flex-wrap gap-2">
            <span className="text-white/50 text-sm">Popular:</span>
            {["Shoreditch", "Bermondsey", "Wandsworth", "Chiswick", "Islington"].map((area) => (
              <Link
                key={area}
                href={`/spaces?location=${area}`}
                className="text-sm text-white/70 hover:text-white underline underline-offset-2 transition-colors"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="absolute right-8 bottom-24 hidden xl:flex flex-col gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
            <div className="text-3xl font-light mb-1" style={{ fontFamily: "'Fraunces', serif" }}>60+</div>
            <div className="text-xs text-white/60">London buildings</div>
          </div>
          <div className="bg-[#E8622A] rounded-2xl p-4 text-white">
            <div className="text-3xl font-light mb-1" style={{ fontFamily: "'Fraunces', serif" }}>4,000+</div>
            <div className="text-xs text-white/80">Businesses growing</div>
          </div>
        </div>
      </div>

      {/* Video tour CTA */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-3">
        <button className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
            <Play size={12} className="ml-0.5" />
          </div>
          <span className="text-sm">Watch our story</span>
        </button>
      </div>
    </section>
  );
}
