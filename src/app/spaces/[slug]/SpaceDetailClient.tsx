"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const SpaceMapSingle = dynamic(() => import("@/components/SpaceMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full" style={{ background: "#09090F" }} />,
});
import {
  MapPin, Star, Maximize2, ArrowRight, ChevronLeft, ChevronRight,
  Train, Bus, ArrowUpRight, ExternalLink,
  Wifi, Coffee, Bike, Zap, Clock, Users, Sunset,
  PawPrint, Mic, CalendarDays, ConciergeBell,
  Dumbbell, TreePine, Car, Phone, BatteryCharging, Play, X, Navigation2, Scale
} from "lucide-react";
import { Space } from "@/data/spaces";
import MagneticButton from "@/components/MagneticButton";
import ScrollReveal from "@/components/ScrollReveal";
import FavouriteButton from "@/components/FavouriteButton";
import ShareButton from "@/components/ShareButton";
import { useCompare } from "@/context/CompareContext";

const amenityIconMap: Record<string, React.ReactNode> = {
  "High-speed Wi-Fi":       <Wifi size={18} />,
  "Gigabit Wi-Fi":          <Wifi size={18} />,
  "Café on-site":           <Coffee size={18} />,
  "Bike storage":           <Bike size={18} />,
  "EV charging":            <BatteryCharging size={18} />,
  "24/7 access":            <Clock size={18} />,
  "Meeting rooms":          <Users size={18} />,
  "Showers":                <Zap size={18} />,
  "Roof terrace":           <Sunset size={18} />,
  "Rooftop terrace":        <Sunset size={18} />,
  "Rooftop garden":         <Sunset size={18} />,
  "Rooftop bar":            <Sunset size={18} />,
  "Courtyard":              <TreePine size={18} />,
  "Courtyard garden":       <TreePine size={18} />,
  "Terrace with park views":<TreePine size={18} />,
  "Pet-friendly":           <PawPrint size={18} />,
  "Dog-friendly":           <PawPrint size={18} />,
  "Air conditioning":       <Zap size={18} />,
  "Podcast studio":         <Mic size={18} />,
  "Event space":            <CalendarDays size={18} />,
  "Reception team":         <ConciergeBell size={18} />,
  "Gym":                    <Dumbbell size={18} />,
  "Parking":                <Car size={18} />,
  "Phone booths":           <Phone size={18} />,
  "Kitchen facilities":     <Coffee size={18} />,
};

const PROOF_MESSAGES = [
  "Sarah from Hackney enquired 2h ago",
  "12 people viewed this space today",
  "3 viewings booked this week",
  "This building is 94% occupied",
  "Last space at this location taken in 4 days",
];

export default function SpaceDetailClient({ space, similar }: { space: Space; similar: Space[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [proofIndex, setProofIndex] = useState(0);
  const [proofVisible, setProofVisible] = useState(false);
  const { add, remove, isComparing } = useCompare();
  const comparing = isComparing(space.id);

  // Social proof ticker — appears after 4s, cycles every 5s
  useEffect(() => {
    const showTimer = setTimeout(() => setProofVisible(true), 4000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!proofVisible) return;
    const interval = setInterval(() => {
      setProofVisible(false);
      setTimeout(() => {
        setProofIndex(i => (i + 1) % PROOF_MESSAGES.length);
        setProofVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [proofVisible]);

  const allImages = [space.image, ...space.gallery.slice(1)];

  const lightboxPrev = useCallback(() => setActiveImage(i => (i - 1 + allImages.length) % allImages.length), [allImages.length]);
  const lightboxNext = useCallback(() => setActiveImage(i => (i + 1) % allImages.length), [allImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") lightboxPrev();
      else if (e.key === "ArrowRight") lightboxNext();
      else if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, lightboxPrev, lightboxNext]);

  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      {/* Dark header */}
      <div className="bg-[#09090F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/35 text-sm mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronLeft size={12} className="rotate-180 opacity-40" />
            <Link href="/spaces" className="hover:text-white/70 transition-colors">Find a space</Link>
            <ChevronLeft size={12} className="rotate-180 opacity-40" />
            <span className="text-white/70" aria-current="page">{space.name}</span>
          </nav>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-[#E8622A] text-sm font-medium">
                <MapPin size={13} />{space.neighbourhood}, {space.postcode}
              </span>
              {space.type.map(t => (
                <span key={t} className="px-2.5 py-0.5 bg-white/[0.07] text-white/60 text-xs rounded-full font-medium border border-white/[0.07] capitalize">{t}</span>
              ))}
              {space.isNew && <span className="px-2.5 py-0.5 bg-[#E8622A] text-white text-xs rounded-full font-semibold">New</span>}
              {space.grade && <span className="px-2.5 py-0.5 bg-white/[0.07] text-white/60 text-xs rounded-full font-medium border border-white/[0.07]">{space.grade}</span>}
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-[-0.03em]"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
            >
              {space.name}
            </h1>
            <p className="text-white/60 mt-2 text-base">{space.headline}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">

            {/* Gallery */}
            <ScrollReveal>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={allImages[activeImage] || space.image}
                  alt={`${space.name} — view ${activeImage + 1}`}
                  className="w-full h-[420px] sm:h-[520px] object-cover"
                  style={{ viewTransitionName: `space-img-${space.slug}` }}
                />

                {/* Rating + share + favourite — top right on image */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                  <div className="flex items-center gap-1.5 glass rounded-full px-3 py-1.5">
                    <Star size={12} className="text-[#C9A84C] fill-[#C9A84C]" />
                    <span className="text-white font-semibold text-sm">{space.rating}</span>
                    <span className="text-white/55 text-xs">({space.reviewCount})</span>
                  </div>
                  <ShareButton data={{ title: space.name, text: space.headline, slug: space.slug }} />
                  <FavouriteButton spaceId={space.id} />
                </div>

                <button
                  onClick={() => setShowVirtualTour(true)}
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-[#09090F] text-xs font-semibold hover:bg-white transition-colors shadow-lg"
                >
                  <Play size={13} className="text-[#E8622A]" />
                  Virtual tour
                </button>
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-xl text-white text-xs font-medium hover:bg-black/80 transition-colors"
                  aria-label="View all photos"
                >
                  <Maximize2 size={12} />
                  All photos ({allImages.length})
                </button>
              </div>
            </ScrollReveal>

            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Photo ${i + 1}`}
                    aria-pressed={i === activeImage}
                    className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === activeImage ? "border-[#E8622A]" : "border-transparent opacity-50 hover:opacity-75"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Specs */}
            <ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Team size", value: `${space.capacity.min}–${space.capacity.max} people` },
                  { label: "Floor area", value: `${space.sqft.min.toLocaleString()}–${space.sqft.max.toLocaleString()} sq ft` },
                  { label: "Contract", value: "Monthly rolling" },
                  { label: "Available", value: "Now", green: true },
                ].map(({ label, value, green }) => (
                  <div key={label} className="bg-white rounded-lg p-4">
                    <div className="text-[11px] font-medium tracking-wider uppercase text-[#09090F]/30 mb-1">{label}</div>
                    <div className={`font-semibold text-sm ${green ? "text-[#7B9E87]" : "text-[#09090F]"}`}>{value}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* About */}
            <ScrollReveal>
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-xl text-[#09090F] mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500 }}>
                  About this space
                </h2>
                <p className="text-[#09090F]/65 leading-relaxed">{space.description}</p>
              </div>
            </ScrollReveal>

            {/* Amenities */}
            <ScrollReveal>
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-xl text-[#09090F] mb-6" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500 }}>
                  What&apos;s included
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {space.amenities.map(a => (
                    <div key={a} className="flex items-center gap-3 py-2">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-[#E8622A]"
                        style={{ background: "rgba(232,98,42,0.07)" }} aria-hidden="true">
                        {amenityIconMap[a] ?? <ArrowRight size={16} />}
                      </div>
                      <span className="text-sm font-medium text-[#09090F]">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Getting here */}
            <ScrollReveal>
              <div className="bg-[#09090F] rounded-lg overflow-hidden">
                {/* Dark Leaflet map — consistent with the map view on the listing page */}
                <div className="h-56">
                  <SpaceMapSingle
                    spaces={[space]}
                    activeId={null}
                    onMarkerClick={() => {}}
                  />
                </div>

                <div className="p-6 pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 400 }}>
                      Getting here
                    </h2>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${space.lat},${space.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#E8622A] text-white text-xs font-semibold rounded-xl hover:bg-[#d4561e] transition-colors"
                      aria-label="Get directions in Google Maps"
                    >
                      <Navigation2 size={11} />
                      Directions
                      <ExternalLink size={10} className="opacity-70" />
                    </a>
                  </div>

                  {/* Transport pills */}
                  <div className="flex flex-wrap gap-2">
                    {space.transport.map(t => (
                      <div
                        key={t.name}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium ${
                          t.type === "tube"
                            ? "bg-[#E32017]/20 text-red-300 border border-[#E32017]/30"
                            : t.type === "rail"
                            ? "bg-emerald-900/40 text-emerald-300 border border-emerald-700/40"
                            : "bg-blue-900/40 text-blue-300 border border-blue-700/40"
                        }`}
                      >
                        {t.type === "bus" ? <Bus size={13} /> : <Train size={13} />}
                        <span>{t.name}</span>
                        <span className="opacity-60 text-xs font-normal">{t.time}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-white/40 mt-4">
                    {space.neighbourhood}, {space.postcode}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Similar spaces */}
            {similar.length > 0 && (
              <ScrollReveal>
                <div>
                  <h2 className="text-xl text-[#09090F] mb-5" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500 }}>
                    You might also like
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {similar.map(s => (
                      <Link key={s.id} href={`/spaces/${s.slug}`}
                        className="group bg-white rounded-lg overflow-hidden hover:shadow-md transition-all">
                        <div className="h-36 overflow-hidden relative">
                          <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-4">
                          <div className="text-xs text-[#E8622A] font-medium mb-1">{s.neighbourhood}</div>
                          <div className="font-semibold text-[#09090F] text-sm">{s.name}</div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-xs text-[#09090F]/35">From £{s.priceFrom.toLocaleString()}/{s.priceUnit}</div>
                            <ArrowRight size={14} className="text-[#E8622A] group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-3">
              {/* Pricing */}
              <div className="bg-white rounded-lg p-6 border border-[#09090F]/[0.05]">
                <div className="mb-5">
                  <p className="text-[#09090F]/35 text-[11px] font-medium tracking-[0.15em] uppercase mb-1">Starting from</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#09090F]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      £{space.priceFrom.toLocaleString()}
                    </span>
                    <span className="text-[#09090F]/35 text-sm">/{space.priceUnit}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-[#7B9E87] text-xs font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7B9E87]" />
                    All-inclusive · No hidden fees
                  </div>
                </div>

                <Link
                  href={`/book-viewing?space=${space.slug}`}
                  className="block w-full py-3.5 bg-[#E8622A] text-white font-semibold rounded-xl hover:bg-[#d4561e] transition-colors text-center text-sm mb-3"
                >
                  Book a viewing
                </Link>
                <MagneticButton
                  onClick={() => setShowEnquiry(!showEnquiry)}
                  className="w-full py-3.5 bg-[#F4F1EA] text-[#09090F] font-semibold rounded-xl hover:bg-[#ebe8e1] transition-colors text-sm mb-3"
                >
                  {showEnquiry ? "Hide enquiry" : "Send an enquiry"}
                </MagneticButton>
                <button
                  onClick={() => comparing ? remove(space.id) : add(space.id)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                    comparing
                      ? "border-[#E8622A] text-[#E8622A] bg-[#E8622A]/[0.06]"
                      : "border-[#09090F]/[0.08] text-[#09090F]/50 hover:border-[#E8622A] hover:text-[#E8622A]"
                  }`}
                >
                  <Scale size={14} />
                  {comparing ? "Remove from comparison" : "Add to comparison"}
                </button>

                {/* Social proof ticker */}
                <div className="mt-4 h-8 overflow-hidden">
                  {proofVisible && (
                    <p className="text-[#09090F]/35 text-xs flex items-center gap-1.5 animate-fade-up">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7B9E87] shrink-0" />
                      {PROOF_MESSAGES[proofIndex]}
                    </p>
                  )}
                </div>
              </div>

              {/* Enquiry form */}
              {showEnquiry && (
                <div className="bg-white rounded-3xl p-6 border border-[#09090F]/[0.05] animate-scale-in">
                  <h3 className="font-semibold text-[#09090F] mb-5" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Tell us about your needs
                  </h3>
                  <form onSubmit={e => { e.preventDefault(); setShowEnquiry(false); }} className="space-y-3">
                    {[
                      { key: "name", label: "Full name", type: "text", required: true },
                      { key: "email", label: "Email address", type: "email", required: true },
                      { key: "phone", label: "Phone (optional)", type: "tel", required: false },
                    ].map(f => (
                      <div key={f.key}>
                        <label htmlFor={`eq-${f.key}`} className="text-[11px] font-medium text-[#09090F]/40 uppercase tracking-wider block mb-1">{f.label}</label>
                        <input
                          id={`eq-${f.key}`}
                          type={f.type}
                          required={f.required}
                          className="w-full px-3.5 py-2.5 border border-[#09090F]/[0.08] rounded-xl text-sm text-[#09090F] focus:outline-none focus:border-[#E8622A] bg-[#F4F1EA]/40 transition-colors"
                        />
                      </div>
                    ))}
                    <select className="w-full px-3.5 py-2.5 border border-[#09090F]/[0.08] rounded-xl text-sm text-[#09090F] focus:outline-none focus:border-[#E8622A] bg-[#F4F1EA]/40">
                      <option value="">Team size</option>
                      {["1–5 people","6–15 people","16–50 people","51+ people"].map(o => <option key={o}>{o}</option>)}
                    </select>
                    <textarea rows={3} placeholder="Any requirements…"
                      className="w-full px-3.5 py-2.5 border border-[#09090F]/[0.08] rounded-xl text-sm text-[#09090F] placeholder-[#09090F]/25 focus:outline-none focus:border-[#E8622A] bg-[#F4F1EA]/40 resize-none transition-colors" />
                    <button type="submit"
                      className="w-full py-3 bg-[#09090F] text-white font-semibold rounded-xl hover:bg-black transition-colors text-sm">
                      Send enquiry
                    </button>
                    <p className="text-xs text-[#09090F]/25 text-center">We respond within 24 hours</p>
                  </form>
                </div>
              )}

              {/* Talk */}
              <div className="bg-[#09090F] rounded-3xl p-6">
                <p className="text-white/65 text-[11px] font-medium tracking-[0.15em] uppercase mb-3">Prefer to talk?</p>
                <a href="tel:02071383307"
                  className="flex items-center gap-2 text-white font-semibold text-lg hover:text-[#E8622A] transition-colors">
                  <ArrowUpRight size={16} className="text-[#E8622A] shrink-0" />
                  020 7138 3307
                </a>
                <p className="text-white/50 text-xs mt-1">Mon–Fri, 9am–6pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#09090F]/98 backdrop-blur-xl flex flex-col"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 shrink-0" onClick={e => e.stopPropagation()}>
            <span className="text-white/40 text-sm">{activeImage + 1} / {allImages.length}</span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
            >
              <X size={16} /> Close
            </button>
          </div>

          {/* Main image */}
          <div className="flex-1 flex items-center justify-center px-16 relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={lightboxPrev}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
            <img
              key={activeImage}
              src={allImages[activeImage]}
              alt={`${space.name} — photo ${activeImage + 1}`}
              className="max-w-full max-h-full object-contain rounded-2xl space-img"
            />
            <button
              onClick={lightboxNext}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="shrink-0 px-6 py-4 flex gap-2 overflow-x-auto justify-center" onClick={e => e.stopPropagation()}>
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  i === activeImage ? "border-[#E8622A]" : "border-transparent opacity-40 hover:opacity-70"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Virtual tour modal */}
      {showVirtualTour && (
        <div
          className="fixed inset-0 z-50 bg-[#09090F]/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setShowVirtualTour(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowVirtualTour(false)}
              className="absolute -top-12 right-0 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
            >
              <X size={16} /> Close tour
            </button>
            <div className="aspect-video rounded-3xl overflow-hidden bg-[#09090F] border border-white/10">
              {/* Simulated virtual tour — in production this would be a real 360° embed */}
              <div className="relative w-full h-full">
                <img
                  src={space.image}
                  alt="Virtual tour preview"
                  className="w-full h-full object-cover animate-kenburns"
                />
                <div className="absolute inset-0 bg-[#09090F]/50 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4">
                    <Play size={24} className="text-white ml-1" />
                  </div>
                  <p className="text-white font-semibold text-lg mb-1">{space.name}</p>
                  <p className="text-white/50 text-sm">Virtual tour · 360° walkthrough</p>
                  <p className="text-white/25 text-xs mt-4">Live video tours available — book a slot below</p>
                  <Link
                    href={`/book-viewing?space=${space.slug}`}
                    className="mt-4 px-6 py-2.5 bg-[#E8622A] text-white font-semibold rounded-xl hover:bg-[#d4561e] transition-colors text-sm"
                    onClick={() => setShowVirtualTour(false)}
                  >
                    Book a live virtual tour
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
