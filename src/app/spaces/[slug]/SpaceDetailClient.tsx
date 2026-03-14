"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Star, Users, Maximize2, ArrowRight, Check, ChevronLeft, Train, Bus, ArrowUpRight, Wifi, Coffee, Bike, Zap, Shield, Clock, Calendar } from "lucide-react";
import { Space } from "@/data/spaces";

const amenityIconMap: Record<string, React.ReactNode> = {
  "High-speed Wi-Fi": <Wifi size={16} />,
  "Café on-site": <Coffee size={16} />,
  "Bike storage": <Bike size={16} />,
  "EV charging": <Zap size={16} />,
  "24/7 access": <Clock size={16} />,
  "Meeting rooms": <Users size={16} />,
  "Showers": <Shield size={16} />,
};

export default function SpaceDetailClient({ space, similar }: { space: Space; similar: Space[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", teamSize: "", moveIn: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Our team will be in touch within 24 hours.");
    setShowEnquiry(false);
  };

  const allImages = [space.image, ...space.gallery.slice(1)];

  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      {/* Breadcrumb */}
      <div className="bg-[#09090F] pt-24 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/spaces" className="hover:text-white/70 transition-colors">Spaces</Link>
            <span>/</span>
            <span className="text-white/80">{space.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="relative rounded-2xl overflow-hidden mb-4 group">
              <img
                src={allImages[activeImage] || space.image}
                alt={space.name}
                className="w-full h-[420px] object-cover"
              />
              {space.isNew && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-[#E8622A] text-white text-sm font-semibold rounded-lg">New</span>
                </div>
              )}
              {space.grade && (
                <div className="absolute top-4 left-4 mt-10">
                  <span className="px-3 py-1.5 bg-[#C9A84C] text-white text-sm font-semibold rounded-lg">{space.grade}</span>
                </div>
              )}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
                <Star size={13} className="text-[#C9A84C] fill-[#C9A84C]" />
                <span className="text-white text-sm font-semibold">{space.rating}</span>
                <span className="text-white/60 text-xs">({space.reviewCount} reviews)</span>
              </div>
              <button className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg text-white text-xs hover:bg-black/70 transition-colors">
                <Maximize2 size={12} />
                View gallery
              </button>
            </div>

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="flex gap-2 mb-8">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === activeImage ? "border-[#E8622A]" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="bg-white rounded-2xl p-8 mb-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-[#E8622A] text-sm font-medium mb-2">
                    <MapPin size={14} />
                    {space.neighbourhood}, {space.postcode}
                  </div>
                  <h1 className="text-3xl text-[#09090F] mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 400 }}>
                    {space.name}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {space.type.map((t) => (
                      <span key={t} className="px-3 py-1 bg-[#F4F1EA] text-[#09090F] text-xs rounded-full font-semibold capitalize">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-4 bg-[#F4F1EA] rounded-xl">
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">Team size</div>
                  <div className="font-semibold text-[#09090F] text-sm">{space.capacity.min}–{space.capacity.max} people</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">Area</div>
                  <div className="font-semibold text-[#09090F] text-sm">{space.sqft.min.toLocaleString()}–{space.sqft.max.toLocaleString()} sq ft</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">Contract</div>
                  <div className="font-semibold text-[#09090F] text-sm">Monthly rolling</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">Available</div>
                  <div className="font-semibold text-[#7B9E87] text-sm">Now</div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-base mb-0">{space.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-8 mb-6">
              <h2 className="text-xl font-semibold text-[#09090F] mb-6">What&apos;s included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {space.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E8622A]/10 flex items-center justify-center text-[#E8622A] shrink-0">
                      {amenityIconMap[a] || <Check size={14} />}
                    </div>
                    <span className="text-sm text-gray-600">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transport */}
            <div className="bg-white rounded-2xl p-8 mb-6">
              <h2 className="text-xl font-semibold text-[#09090F] mb-6">Getting here</h2>
              <div className="space-y-3">
                {space.transport.map((t) => (
                  <div key={t.name} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      t.type === "tube" ? "bg-[#E32017]/10 text-[#E32017]" :
                      t.type === "rail" ? "bg-[#1F7A1F]/10 text-[#1F7A1F]" : "bg-blue-50 text-blue-600"
                    }`}>
                      {t.type === "bus" ? <Bus size={14} /> : <Train size={14} />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#09090F] text-sm">{t.name}</div>
                      <div className="text-xs text-gray-400 capitalize">{t.type} station</div>
                    </div>
                    <div className="text-sm font-semibold text-gray-500">{t.time} walk</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar spaces */}
            {similar.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-[#09090F] mb-6">You might also like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similar.map((s) => (
                    <Link
                      key={s.id}
                      href={`/spaces/${s.slug}`}
                      className="group bg-white rounded-xl overflow-hidden hover:shadow-md transition-all"
                    >
                      <div className="h-32 overflow-hidden">
                        <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-[#E8622A] font-medium mb-1">{s.neighbourhood}</div>
                        <div className="font-semibold text-[#09090F] text-sm">{s.name}</div>
                        <div className="text-xs text-gray-400 mt-1">From £{s.priceFrom.toLocaleString()}/{s.priceUnit}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
                <div className="mb-4">
                  <span className="text-gray-400 text-xs">Starting from</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-bold text-[#09090F]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      £{space.priceFrom.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm">/{space.priceUnit}</span>
                  </div>
                  <span className="text-xs text-[#7B9E87] font-medium">✓ No hidden fees · Flexible contracts</span>
                </div>

                <button
                  onClick={() => setShowEnquiry(!showEnquiry)}
                  className="w-full py-3.5 bg-[#E8622A] text-white font-semibold rounded-xl hover:bg-[#d4561e] transition-colors mb-3"
                >
                  Enquire about this space
                </button>
                <button className="w-full py-3.5 bg-[#F4F1EA] text-[#09090F] font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <Calendar size={16} />
                  Book a viewing
                </button>
              </div>

              {/* Enquiry form */}
              {showEnquiry && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-semibold text-[#09090F] mb-4">Send an enquiry</h3>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {[
                      { key: "name", label: "Full name", type: "text" },
                      { key: "email", label: "Email address", type: "email" },
                      { key: "phone", label: "Phone number", type: "tel" },
                    ].map((f) => (
                      <input
                        key={f.key}
                        type={f.type}
                        placeholder={f.label}
                        value={formData[f.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[#09090F] placeholder-gray-400 focus:outline-none focus:border-[#E8622A]"
                        required
                      />
                    ))}
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[#09090F] focus:outline-none focus:border-[#E8622A] bg-white"
                    >
                      <option value="">Team size</option>
                      <option>1–5 people</option>
                      <option>6–15 people</option>
                      <option>16–50 people</option>
                      <option>51+ people</option>
                    </select>
                    <textarea
                      placeholder="Tell us about your requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[#09090F] placeholder-gray-400 focus:outline-none focus:border-[#E8622A] resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#09090F] text-white font-semibold rounded-xl hover:bg-black transition-colors"
                    >
                      Send enquiry
                    </button>
                    <p className="text-xs text-gray-400 text-center">We respond within 24 hours</p>
                  </form>
                </div>
              )}

              {/* Quick contact */}
              <div className="bg-[#09090F] rounded-2xl p-6 mt-4">
                <p className="text-white/80 text-sm mb-3">Prefer to talk?</p>
                <a href="tel:02071383307" className="flex items-center gap-2 text-white font-semibold hover:text-[#E8622A] transition-colors">
                  <ArrowUpRight size={16} className="text-[#E8622A]" />
                  020 7138 3307
                </a>
                <p className="text-white/40 text-xs mt-1">Mon–Fri, 9am–6pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
