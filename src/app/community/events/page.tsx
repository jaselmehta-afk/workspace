"use client";

import { useState } from "react";
import { Calendar, MapPin, Users, Clock, ArrowRight, Filter } from "lucide-react";

const events = [
  {
    id: "1",
    title: "Startup Pitch Night",
    description: "Ten founders. Five minutes each. One panel of investors. Whether you&apos;re pitching or watching, it&apos;s an unmissable evening of ambition and candour.",
    date: "2026-03-18",
    time: "6:00pm – 9:00pm",
    location: "Central House, Shoreditch",
    category: "Networking",
    capacity: 120,
    attending: 87,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    free: false,
    price: "£15",
  },
  {
    id: "2",
    title: "Female Founders Brunch",
    description: "A relaxed, candid morning for women building businesses. Great coffee, great company, no agenda — just connection.",
    date: "2026-03-22",
    time: "10:00am – 12:30pm",
    location: "The Light Bulb, Wandsworth",
    category: "Community",
    capacity: 45,
    attending: 38,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    free: true,
    price: "Free",
  },
  {
    id: "3",
    title: "Growth Marketing Masterclass",
    description: "Head of Growth at Monzo, the performance marketing lead from Octopus Energy, and a SEO specialist from Ooni — all in one room, sharing what actually works.",
    date: "2026-04-01",
    time: "3:00pm – 6:00pm",
    location: "Leather Exchange, Bermondsey",
    category: "Workshop",
    capacity: 60,
    attending: 41,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    free: false,
    price: "£25",
  },
  {
    id: "4",
    title: "East London Creative Meetup",
    description: "Monthly gathering for designers, photographers, makers and creatives of all kinds. Bring your portfolio, your questions, and your openness.",
    date: "2026-04-09",
    time: "7:00pm – 9:30pm",
    location: "Lock Studios, Bow",
    category: "Networking",
    capacity: 80,
    attending: 52,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    free: true,
    price: "Free",
  },
  {
    id: "5",
    title: "Building a Sustainable Business",
    description: "A panel conversation with three founders who are building profitable, planet-positive businesses — and how they made the economic case internally.",
    date: "2026-04-15",
    time: "6:30pm – 8:30pm",
    location: "Evergreen Studios, Richmond",
    category: "Panel",
    capacity: 40,
    attending: 28,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    free: false,
    price: "£10",
  },
];

const categoryColors: Record<string, string> = {
  Networking: "bg-[#E8622A]/10 text-[#E8622A]",
  Community: "bg-[#7B9E87]/10 text-[#7B9E87]",
  Workshop: "bg-[#C9A84C]/10 text-[#C9A84C]",
  Panel: "bg-blue-100 text-blue-600",
};

export default function EventsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? events : events.filter((e) => e.category.toLowerCase() === filter);

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <div className="bg-[#1C1C2E] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">Community events</p>
          <h1 className="text-4xl sm:text-5xl text-white mb-4 font-light" style={{ fontFamily: "'Fraunces', serif" }}>
            What&apos;s on at Workspace
          </h1>
          <p className="text-white/60 text-lg">Workshops, talks, networking and community moments — happening across our buildings every week.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["all", "networking", "workshop", "panel", "community"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                filter === cat ? "bg-[#E8622A] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat === "all" ? "All events" : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => {
            const date = new Date(event.date);
            const day = date.getDate();
            const month = date.toLocaleString("en-GB", { month: "short" });
            const spotsLeft = event.capacity - event.attending;

            return (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-md ${categoryColors[event.category] || "bg-gray-100 text-gray-600"}`}>
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-xl px-3 py-2 text-center shadow">
                    <div className="text-xl font-bold text-[#1C1C2E] leading-none">{day}</div>
                    <div className="text-xs text-gray-400 uppercase">{month}</div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-lg text-white text-sm font-bold ${event.free ? "bg-[#7B9E87]" : "bg-[#E8622A]"}`}>
                      {event.price}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-[#1C1C2E] text-lg mb-2 group-hover:text-[#E8622A] transition-colors" style={{ fontFamily: "'Fraunces', serif" }}>
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock size={12} />{event.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin size={12} />{event.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Users size={12} />{event.attending} attending · {spotsLeft > 0 ? `${spotsLeft} spots left` : "Sold out"}
                    </div>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                    <div
                      className="bg-[#E8622A] h-1.5 rounded-full transition-all"
                      style={{ width: `${(event.attending / event.capacity) * 100}%` }}
                    />
                  </div>

                  <button
                    disabled={spotsLeft === 0}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                      spotsLeft > 0
                        ? "bg-[#E8622A] text-white hover:bg-[#d4561e]"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {spotsLeft > 0 ? (
                      <>Register now <ArrowRight size={14} /></>
                    ) : "Sold out — join waitlist"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
