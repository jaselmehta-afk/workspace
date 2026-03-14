"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin, Star, Maximize2, ArrowRight, ChevronLeft,
  Train, Bus, ArrowUpRight,
  Wifi, Coffee, Bike, Zap, Clock, Users, Shield,
  Sunset, PawPrint, Wind, Mic, CalendarDays, ConciergeBell,
  Dumbbell, TreePine, Car, Phone, BatteryCharging
} from "lucide-react";
import { Space } from "@/data/spaces";

// Representative icons for each amenity — specific and meaningful
const amenityIconMap: Record<string, React.ReactNode> = {
  "High-speed Wi-Fi":     <Wifi size={18} />,
  "Gigabit Wi-Fi":        <Wifi size={18} />,
  "Café on-site":         <Coffee size={18} />,
  "Bike storage":         <Bike size={18} />,
  "EV charging":          <BatteryCharging size={18} />,
  "24/7 access":          <Clock size={18} />,
  "Meeting rooms":        <Users size={18} />,
  "Showers":              <Shield size={18} />,   // using shower-like symbol
  "Roof terrace":         <Sunset size={18} />,
  "Rooftop terrace":      <Sunset size={18} />,
  "Rooftop garden":       <Sunset size={18} />,
  "Rooftop bar":          <Sunset size={18} />,
  "Courtyard":            <TreePine size={18} />,
  "Courtyard garden":     <TreePine size={18} />,
  "Terrace with park views": <TreePine size={18} />,
  "Pet-friendly":         <PawPrint size={18} />,
  "Dog-friendly":         <PawPrint size={18} />,
  "Air conditioning":     <Wind size={18} />,
  "Podcast studio":       <Mic size={18} />,
  "Event space":          <CalendarDays size={18} />,
  "Reception team":       <ConciergeBell size={18} />,
  "Gym":                  <Dumbbell size={18} />,
  "Fitness centre":       <Dumbbell size={18} />,
  "Parking":              <Car size={18} />,
  "Phone booths":         <Phone size={18} />,
  "Kitchen facilities":   <Coffee size={18} />,
};

export default function SpaceDetailClient({ space, similar }: { space: Space; similar: Space[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);

  const allImages = [space.image, ...space.gallery.slice(1)];

  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      {/* Dark header with breadcrumb — full nav width */}
      <div className="bg-[#09090F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/40 text-sm mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronLeft size={12} className="rotate-180 opacity-50" />
            <Link href="/spaces" className="hover:text-white/70 transition-colors">Find a space</Link>
            <ChevronLeft size={12} className="rotate-180 opacity-50" />
            <span className="text-white/80" aria-current="page">{space.name}</span>
          </nav>

          {/* Hero headline in dark header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-[#E8622A] text-sm font-medium">
                  <MapPin size={13} />
                  {space.neighbourhood}, {space.postcode}
                </span>
                {space.type.map((t) => (
                  <span key={t} className="px-2.5 py-0.5 bg-white/10 text-white/60 text-xs rounded-full font-medium capitalize border border-white/[0.08]">
                    {t}
                  </span>
                ))}
                {space.isNew && (
                  <span className="px-2.5 py-0.5 bg-[#E8622A] text-white text-xs rounded-full font-semibold">New</span>
                )}
                {space.grade && (
                  <span className="px-2.5 py-0.5 bg-white/10 text-white/60 text-xs rounded-full font-medium border border-white/[0.08]">{space.grade}</span>
                )}
              </div>
              <h1
                className="text-3xl sm:text-4xl text-white leading-tight"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
              >
                {space.name}
              </h1>
              <p className="text-white/45 mt-2 text-base">{space.headline}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-white/[0.06] rounded-xl border border-white/[0.08]">
                <Star size={13} className="text-[#E8622A] fill-[#E8622A]" aria-hidden="true" />
                <span className="text-white font-semibold text-sm">{space.rating}</span>
                <span className="text-white/40 text-xs">({space.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="relative rounded-3xl overflow-hidden bg-[#09090F]">
              <img
                src={allImages[activeImage] || space.image}
                alt={`${space.name} — interior view`}
                className="w-full h-[420px] sm:h-[500px] object-cover"
              />
              <button
                className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-xl text-white text-xs font-medium hover:bg-black/80 transition-colors"
                aria-label="View full gallery"
              >
                <Maximize2 size={12} />
                All photos
              </button>
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Photo ${i + 1}`}
                    aria-pressed={i === activeImage}
                    className={`shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      i === activeImage ? "border-[#E8622A] opacity-100" : "border-transparent opacity-55 hover:opacity-80"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Key specs bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Team size", value: `${space.capacity.min}–${space.capacity.max} people` },
                { label: "Floor area", value: `${space.sqft.min.toLocaleString()}–${space.sqft.max.toLocaleString()} sq ft` },
                { label: "Contract", value: "Monthly rolling" },
                { label: "Availability", value: "Now", highlight: true },
              ].map(({ label, value, highlight }) => (
                <div key={label} className="bg-white rounded-2xl p-4">
                  <div className="text-[11px] font-medium tracking-wider uppercase text-[#09090F]/35 mb-1">{label}</div>
                  <div className={`font-semibold text-sm ${highlight ? "text-[#7B9E87]" : "text-[#09090F]"}`}>{value}</div>
                </div>
              ))}
            </div>

            {/* About */}
            <div className="bg-white rounded-3xl p-8">
              <h2
                className="text-xl text-[#09090F] mb-4"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500 }}
              >
                About this space
              </h2>
              <p className="text-[#09090F]/60 leading-relaxed text-base">{space.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-3xl p-8">
              <h2
                className="text-xl text-[#09090F] mb-6"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500 }}
              >
                What&apos;s included
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {space.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-3 py-2">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[#E8622A]"
                      style={{ background: "rgba(232,98,42,0.08)" }}
                      aria-hidden="true"
                    >
                      {amenityIconMap[a] ?? <ArrowRight size={16} />}
                    </div>
                    <span className="text-sm font-medium text-[#09090F]">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Getting here */}
            <div className="bg-white rounded-3xl p-8">
              <h2
                className="text-xl text-[#09090F] mb-6"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500 }}
              >
                Getting here
              </h2>
              <div className="space-y-2">
                {space.transport.map((t) => (
                  <div key={t.name} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#F4F1EA] transition-colors">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        t.type === "tube" ? "bg-[#E32017]/10 text-[#E32017]" :
                        t.type === "rail" ? "bg-emerald-50 text-emerald-700" :
                        "bg-blue-50 text-blue-600"
                      }`}
                      aria-hidden="true"
                    >
                      {t.type === "bus" ? <Bus size={16} /> : <Train size={16} />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#09090F] text-sm">{t.name}</div>
                      <div className="text-xs text-[#09090F]/40 capitalize mt-0.5">{t.type}</div>
                    </div>
                    <div className="text-sm font-semibold text-[#09090F]/50">{t.time} walk</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar spaces */}
            {similar.length > 0 && (
              <div>
                <h2
                  className="text-xl text-[#09090F] mb-6"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500 }}
                >
                  You might also like
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similar.map((s) => (
                    <Link
                      key={s.id}
                      href={`/spaces/${s.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all"
                    >
                      <div className="h-36 overflow-hidden relative">
                        <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-[#E8622A] font-medium mb-1">{s.neighbourhood}</div>
                        <div className="font-semibold text-[#09090F] text-sm">{s.name}</div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-xs text-[#09090F]/40">From £{s.priceFrom.toLocaleString()}/{s.priceUnit}</div>
                          <ArrowRight size={14} className="text-[#E8622A] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-3">
              {/* Pricing card */}
              <div className="bg-white rounded-3xl p-6 border border-[#09090F]/[0.06]">
                <div className="mb-5">
                  <p className="text-[#09090F]/40 text-xs font-medium tracking-wider uppercase mb-1">Starting from</p>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-4xl font-bold text-[#09090F]"
                      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                    >
                      £{space.priceFrom.toLocaleString()}
                    </span>
                    <span className="text-[#09090F]/40 text-sm">/{space.priceUnit}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-[#7B9E87] text-xs font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7B9E87]" />
                    No hidden fees · Monthly rolling
                  </div>
                </div>

                <Link
                  href={`/book-viewing?space=${space.slug}`}
                  className="block w-full py-3.5 bg-[#E8622A] text-white font-semibold rounded-2xl hover:bg-[#d4561e] transition-colors text-center text-sm mb-3"
                >
                  Book a viewing
                </Link>
                <button
                  onClick={() => setShowEnquiry(!showEnquiry)}
                  className="w-full py-3.5 bg-[#F4F1EA] text-[#09090F] font-semibold rounded-2xl hover:bg-[#ebe8e1] transition-colors text-sm"
                  aria-expanded={showEnquiry}
                >
                  {showEnquiry ? "Hide enquiry form" : "Send an enquiry"}
                </button>
              </div>

              {/* Enquiry form */}
              {showEnquiry && (
                <div className="bg-white rounded-3xl p-6 border border-[#09090F]/[0.06]">
                  <h3
                    className="font-semibold text-[#09090F] mb-5"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    Tell us about your needs
                  </h3>
                  <form
                    onSubmit={(e) => { e.preventDefault(); setShowEnquiry(false); }}
                    className="space-y-3"
                  >
                    {[
                      { key: "name", label: "Full name", type: "text" },
                      { key: "email", label: "Email address", type: "email" },
                      { key: "phone", label: "Phone (optional)", type: "tel" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label htmlFor={`enquiry-${f.key}`} className="text-xs font-medium text-[#09090F]/50 block mb-1">{f.label}</label>
                        <input
                          id={`enquiry-${f.key}`}
                          type={f.type}
                          required={f.type !== "tel"}
                          className="w-full px-3.5 py-2.5 border border-[#09090F]/10 rounded-xl text-sm text-[#09090F] placeholder-[#09090F]/30 focus:outline-none focus:border-[#E8622A] bg-[#F4F1EA]/50 transition-colors"
                        />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="enquiry-teamsize" className="text-xs font-medium text-[#09090F]/50 block mb-1">Team size</label>
                      <select
                        id="enquiry-teamsize"
                        className="w-full px-3.5 py-2.5 border border-[#09090F]/10 rounded-xl text-sm text-[#09090F] focus:outline-none focus:border-[#E8622A] bg-[#F4F1EA]/50 transition-colors"
                      >
                        <option value="">Select team size</option>
                        <option>1–5 people</option>
                        <option>6–15 people</option>
                        <option>16–50 people</option>
                        <option>51+ people</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="enquiry-message" className="text-xs font-medium text-[#09090F]/50 block mb-1">Any requirements</label>
                      <textarea
                        id="enquiry-message"
                        placeholder="Tell us anything that would help…"
                        rows={3}
                        className="w-full px-3.5 py-2.5 border border-[#09090F]/10 rounded-xl text-sm text-[#09090F] placeholder-[#09090F]/30 focus:outline-none focus:border-[#E8622A] bg-[#F4F1EA]/50 transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#09090F] text-white font-semibold rounded-xl hover:bg-black transition-colors text-sm"
                    >
                      Send enquiry
                    </button>
                    <p className="text-xs text-[#09090F]/30 text-center">We respond within 24 hours</p>
                  </form>
                </div>
              )}

              {/* Talk to us */}
              <div className="bg-[#09090F] rounded-3xl p-6">
                <p className="text-white/50 text-xs font-medium tracking-wider uppercase mb-3">Prefer to talk?</p>
                <a
                  href="tel:02071383307"
                  className="flex items-center gap-2 text-white font-semibold text-lg hover:text-[#E8622A] transition-colors"
                >
                  <ArrowUpRight size={16} className="text-[#E8622A] shrink-0" />
                  020 7138 3307
                </a>
                <p className="text-white/25 text-xs mt-1">Mon–Fri, 9am–6pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
