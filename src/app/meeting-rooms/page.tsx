"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Users, MapPin, Check, Calendar, Clock } from "lucide-react";

const rooms = [
  {
    id: "1", name: "The Boardroom", location: "Central House, Shoreditch",
    capacity: 16, sqft: 400, priceHour: 75, priceHalfDay: 280, priceFullDay: 500,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    amenities: ["4K display", "Video conferencing", "Whiteboard", "Wi-Fi", "Catering available", "Natural light"],
    type: "boardroom", available: true,
  },
  {
    id: "2", name: "The Studio", location: "The Light Bulb, Wandsworth",
    capacity: 8, sqft: 200, priceHour: 45, priceHalfDay: 175, priceFullDay: 300,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    amenities: ["55\" display", "Video conferencing", "Wi-Fi", "Flipchart", "Sound system"],
    type: "meeting", available: true,
  },
  {
    id: "3", name: "The Exchange Hall", location: "Leather Exchange, Bermondsey",
    capacity: 80, sqft: 1500, priceHour: 250, priceHalfDay: 950, priceFullDay: 1600,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    amenities: ["Stage & PA system", "AV equipment", "Catering kitchen", "Wi-Fi", "Breakout areas"],
    type: "event", available: true,
  },
  {
    id: "4", name: "Focus Room A", location: "Swan Court, Wimbledon",
    capacity: 4, sqft: 100, priceHour: 25, priceHalfDay: 90, priceFullDay: 160,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    amenities: ["Display screen", "Wi-Fi", "Whiteboard"],
    type: "meeting", available: false,
  },
  {
    id: "5", name: "The Loft", location: "Lock Studios, Bow",
    capacity: 24, sqft: 600, priceHour: 120, priceHalfDay: 450, priceFullDay: 780,
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
    amenities: ["Dual 85\" displays", "Video conferencing", "Sound system", "Wi-Fi", "Catering available"],
    type: "boardroom", available: true,
  },
  {
    id: "6", name: "The Greenhouse", location: "Evergreen Studios, Richmond",
    capacity: 12, sqft: 280, priceHour: 60, priceHalfDay: 220, priceFullDay: 390,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    amenities: ["4K display", "Natural light", "Garden terrace", "Wi-Fi", "Coffee station"],
    type: "meeting", available: true,
  },
  {
    id: "7", name: "The Grand Hall", location: "Central House, Shoreditch",
    capacity: 120, sqft: 2500, priceHour: 400, priceHalfDay: 1500, priceFullDay: 2600,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    amenities: ["Full stage", "Professional AV", "Catering", "Wi-Fi", "Green room", "400 theatre-style"],
    type: "event", available: true,
  },
  {
    id: "8", name: "Directors Suite", location: "Leather Exchange, Bermondsey",
    capacity: 10, sqft: 250, priceHour: 90, priceHalfDay: 340, priceFullDay: 580,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    amenities: ["Dual screens", "Video bar", "Wi-Fi", "Espresso machine", "Natural light"],
    type: "boardroom", available: true,
  },
];

const FILTERS = [
  { value: "all",       label: "All rooms" },
  { value: "meeting",   label: "Meeting rooms" },
  { value: "boardroom", label: "Boardrooms" },
  { value: "event",     label: "Event spaces" },
];

function MeetingRoomsInner() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "all";
  const [selectedType, setSelectedType] = useState(initialType);
  const [capacity, setCapacity] = useState("");

  // Keep in sync if URL changes (e.g. back/forward nav)
  useEffect(() => {
    const t = searchParams.get("type") || "all";
    setSelectedType(t);
  }, [searchParams]);

  const filtered = rooms.filter(r => {
    if (selectedType !== "all" && r.type !== selectedType) return false;
    if (capacity && r.capacity < parseInt(capacity)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      {/* Dark header */}
      <div className="relative overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8 mesh-dark">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">Meeting rooms</p>
          <h1 className="text-4xl sm:text-5xl text-white mb-4 font-light" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Every kind of room.<br /><span className="italic">Every kind of meeting.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mb-10">From intimate four-person focus rooms to 120-person event halls — tech-equipped and hassle-free.</p>

          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <select
              value={capacity}
              onChange={e => setCapacity(e.target.value)}
              className="glass text-white/80 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#E8622A]/50 bg-transparent"
            >
              <option value="" className="bg-[#0E0E1A]">Any capacity</option>
              {["4","8","16","24","50","80"].map(c => (
                <option key={c} value={c} className="bg-[#0E0E1A]">{c}+ people</option>
              ))}
            </select>
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map(f => (
                <button
                  key={f.value}
                  onClick={() => setSelectedType(f.value)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedType === f.value
                      ? "bg-[#E8622A] text-white shadow-lg glow-orange-sm"
                      : "glass text-white/60 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-sm text-gray-400 mb-6">Showing <span className="font-semibold text-[#0E0E1A]">{filtered.length}</span> rooms</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(room => (
            <div key={room.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group">
              <div className="relative h-48 overflow-hidden">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {!room.available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="glass text-white font-semibold px-4 py-2 rounded-xl">Currently unavailable</span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="glass-dark text-white/80 text-xs px-2.5 py-1 rounded-lg font-medium capitalize">{room.type}</span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-3 text-white">
                  <span className="flex items-center gap-1 text-xs"><Users size={11} />{room.capacity} people</span>
                  <span className="text-xs opacity-60">{room.sqft} sq ft</span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 text-[#E8622A] text-xs font-medium mb-1"><MapPin size={11} />{room.location}</div>
                <h3 className="font-semibold text-[#0E0E1A] text-lg mb-3">{room.name}</h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {room.amenities.slice(0, 4).map(a => (
                    <span key={a} className="flex items-center gap-1 text-xs px-2 py-1 bg-[#F4F1EA] text-gray-500 rounded-md">
                      <Check size={9} className="text-[#7B9E87]" />{a}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-[#F4F1EA] rounded-xl text-center">
                  {[["Per hour", room.priceHour], ["Half day", room.priceHalfDay], ["Full day", room.priceFullDay]].map(([l, p]) => (
                    <div key={l as string}>
                      <div className="font-bold text-[#0E0E1A] text-sm">£{p}</div>
                      <div className="text-xs text-gray-400">{l}</div>
                    </div>
                  ))}
                </div>
                <button
                  disabled={!room.available}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                    room.available ? "bg-[#E8622A] text-white hover:bg-[#d4561e] hover:shadow-lg" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Calendar size={14} />{room.available ? "Book this room" : "Not available"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No rooms match those filters</p>
            <button onClick={() => { setSelectedType("all"); setCapacity(""); }} className="text-[#E8622A] hover:underline text-sm">Clear filters</button>
          </div>
        )}

        {/* Member upsell */}
        <div className="mt-16 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8 mesh-dark">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl text-white mb-3 font-light" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Member? Get <span className="text-[#E8622A]">30% off</span> every room.
            </h2>
            <p className="text-white/50 leading-relaxed">Members enjoy discounted rates on all rooms across every building, plus priority booking.</p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link href="/spaces" className="px-6 py-3 bg-[#E8622A] text-white font-semibold rounded-xl hover:bg-[#d4561e] transition-colors text-center whitespace-nowrap">
              Become a member
            </Link>
            <Link href="/contact" className="px-6 py-3 glass text-white font-semibold rounded-xl hover:border-white/20 transition-colors text-center">
              Already a member?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MeetingRoomsPage() {
  return (
    <Suspense>
      <MeetingRoomsInner />
    </Suspense>
  );
}
