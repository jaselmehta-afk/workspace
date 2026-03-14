"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Monitor, Coffee, Wifi, Clock, MapPin, ArrowRight, Check, Calendar } from "lucide-react";

const rooms = [
  {
    id: "1",
    name: "The Boardroom",
    location: "Central House, Shoreditch",
    capacity: 16,
    sqft: 400,
    priceHour: 75,
    priceHalfDay: 280,
    priceFullDay: 500,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    amenities: ["4K display", "Video conferencing", "Whiteboard", "Wi-Fi", "Catering available", "Natural light"],
    type: "boardroom",
    available: true,
  },
  {
    id: "2",
    name: "The Studio",
    location: "The Light Bulb, Wandsworth",
    capacity: 8,
    sqft: 200,
    priceHour: 45,
    priceHalfDay: 175,
    priceFullDay: 300,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    amenities: ["55\" display", "Video conferencing", "Wi-Fi", "Flipchart", "Breakout chairs", "Sound system"],
    type: "meeting",
    available: true,
  },
  {
    id: "3",
    name: "The Exchange Hall",
    location: "Leather Exchange, Bermondsey",
    capacity: 80,
    sqft: 1500,
    priceHour: 250,
    priceHalfDay: 950,
    priceFullDay: 1600,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    amenities: ["Stage & PA system", "AV equipment", "Catering kitchen", "Wi-Fi", "Breakout areas", "Natural light"],
    type: "event",
    available: true,
  },
  {
    id: "4",
    name: "Focus Room A",
    location: "Swan Court, Wimbledon",
    capacity: 4,
    sqft: 100,
    priceHour: 25,
    priceHalfDay: 90,
    priceFullDay: 160,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    amenities: ["Display screen", "Wi-Fi", "Whiteboard", "Phone booth quality"],
    type: "meeting",
    available: false,
  },
  {
    id: "5",
    name: "The Loft",
    location: "Lock Studios, Bow",
    capacity: 24,
    sqft: 600,
    priceHour: 120,
    priceHalfDay: 450,
    priceFullDay: 780,
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
    amenities: ["Dual 85\" displays", "Video conferencing", "Sound system", "Wi-Fi", "Catering available", "Exposed brick"],
    type: "boardroom",
    available: true,
  },
  {
    id: "6",
    name: "The Greenhouse",
    location: "Evergreen Studios, Richmond",
    capacity: 12,
    sqft: 280,
    priceHour: 60,
    priceHalfDay: 220,
    priceFullDay: 390,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    amenities: ["4K display", "Natural light", "Garden terrace access", "Wi-Fi", "Coffee station"],
    type: "meeting",
    available: true,
  },
];

const typeFilters = [
  { value: "all", label: "All rooms" },
  { value: "meeting", label: "Meeting rooms" },
  { value: "boardroom", label: "Boardrooms" },
  { value: "event", label: "Event spaces" },
];

export default function MeetingRoomsPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [capacity, setCapacity] = useState("");
  const [date, setDate] = useState("");

  const filtered = rooms.filter((r) => {
    if (selectedType !== "all" && r.type !== selectedType) return false;
    if (capacity) {
      const cap = parseInt(capacity);
      if (r.capacity < cap) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      {/* Header */}
      <div className="bg-[#1C1C2E] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">Meeting rooms</p>
            <h1
              className="text-4xl sm:text-5xl text-white mb-4 font-light"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Every kind of room.
              <br />
              <span className="italic">Every kind of meeting.</span>
            </h1>
            <p className="text-white/60 text-lg">
              From intimate four-person focus rooms to 80-person event halls — all with world-class AV, fast Wi-Fi, and no hassle.
            </p>
          </div>

          {/* Quick filter bar */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-4 py-3 bg-white rounded-xl text-sm text-[#1C1C2E] focus:outline-none focus:ring-2 focus:ring-[#E8622A]"
            />
            <select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="px-4 py-3 bg-white rounded-xl text-sm text-[#1C1C2E] focus:outline-none focus:ring-2 focus:ring-[#E8622A]"
            >
              <option value="">Any capacity</option>
              <option value="4">4+ people</option>
              <option value="8">8+ people</option>
              <option value="16">16+ people</option>
              <option value="24">24+ people</option>
              <option value="50">50+ people</option>
            </select>
            <div className="flex gap-2">
              {typeFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setSelectedType(f.value)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    selectedType === f.value
                      ? "bg-[#E8622A] text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rooms grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-gray-500 mb-6">
          Showing <span className="font-semibold text-[#1C1C2E]">{filtered.length}</span> rooms
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((room) => (
            <div key={room.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {!room.available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Currently unavailable</span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-md font-medium capitalize">
                    {room.type}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-3 text-white">
                  <span className="flex items-center gap-1 text-xs">
                    <Users size={11} />{room.capacity} people
                  </span>
                  <span className="text-xs opacity-70">{room.sqft} sq ft</span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 text-[#E8622A] text-xs font-medium mb-1">
                  <MapPin size={11} />{room.location}
                </div>
                <h3 className="font-semibold text-[#1C1C2E] text-lg mb-3">{room.name}</h3>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {room.amenities.slice(0, 4).map((a) => (
                    <span key={a} className="flex items-center gap-1 text-xs px-2 py-1 bg-[#FAF8F4] text-gray-500 rounded-md">
                      <Check size={10} className="text-[#7B9E87]" />{a}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="text-xs text-gray-400">+{room.amenities.length - 4} more</span>
                  )}
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-[#FAF8F4] rounded-xl">
                  {[
                    { label: "Per hour", price: room.priceHour },
                    { label: "Half day", price: room.priceHalfDay },
                    { label: "Full day", price: room.priceFullDay },
                  ].map((p) => (
                    <div key={p.label} className="text-center">
                      <div className="font-bold text-[#1C1C2E]">£{p.price}</div>
                      <div className="text-xs text-gray-400">{p.label}</div>
                    </div>
                  ))}
                </div>

                <button
                  disabled={!room.available}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                    room.available
                      ? "bg-[#E8622A] text-white hover:bg-[#d4561e]"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Calendar size={15} />
                  {room.available ? "Book this room" : "Not available"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Member upsell */}
        <div className="mt-16 bg-[#1C1C2E] rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl text-white mb-3 font-light" style={{ fontFamily: "'Fraunces', serif" }}>
              Member? Get <span className="text-[#E8622A]">30% off</span> every room.
            </h2>
            <p className="text-white/60 leading-relaxed">
              Workspace members enjoy discounted rates on all meeting rooms across every building — plus priority booking for the most popular slots.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              href="/spaces"
              className="px-6 py-3 bg-[#E8622A] text-white font-semibold rounded-xl hover:bg-[#d4561e] transition-colors text-center whitespace-nowrap"
            >
              Become a member
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors text-center"
            >
              Already a member? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
