"use client";

import { useState } from "react";
import { MapPin, Clock, ArrowRight } from "lucide-react";

const events = [
  {
    id: "1",
    title: "Startup Pitch Night",
    description: "Ten founders. Five minutes each. One panel of investors. Whether you're pitching or watching, it's an unmissable evening of ambition and candour.",
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

// Solid backgrounds — always legible on any card background
const categoryStyles: Record<string, { bg: string; text: string }> = {
  Networking: { bg: "bg-[#E8622A]",  text: "text-white" },
  Community:  { bg: "bg-[#7B9E87]",  text: "text-white" },
  Workshop:   { bg: "bg-[#C9A84C]",  text: "text-white" },
  Panel:      { bg: "bg-[#4A6FA5]",  text: "text-white" },
};

export default function EventsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? events : events.filter((e) => e.category.toLowerCase() === filter);

  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      <div className="bg-[#09090F] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">Community events</p>
          <h1 className="text-4xl sm:text-5xl text-white mb-4 font-light" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
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
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                filter === cat
                  ? "bg-[#09090F] text-white"
                  : "bg-white text-[#09090F]/60 hover:bg-[#09090F]/[0.05] hover:text-[#09090F]"
              }`}
            >
              {cat === "all" ? "All events" : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((event) => {
            const date = new Date(event.date);
            const day = date.getDate();
            const month = date.toLocaleString("en-GB", { month: "short" }).toUpperCase();
            const spotsLeft = event.capacity - event.attending;
            const catStyle = categoryStyles[event.category] ?? { bg: "bg-[#09090F]", text: "text-white" };

            return (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer flex flex-col">

                {/* Image */}
                <div className="relative h-44 overflow-hidden shrink-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Category badge — top left, always solid */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase rounded-md ${catStyle.bg} ${catStyle.text}`}>
                      {event.category}
                    </span>
                  </div>

                  {/* Date badge — top right */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 text-center shadow-sm min-w-[48px]">
                    <div className="text-xl font-bold text-[#09090F] leading-none">{day}</div>
                    <div className="text-[9px] font-semibold tracking-wider text-[#09090F]/45 uppercase mt-0.5">{month}</div>
                  </div>

                  {/* Spots left — bottom left, over image */}
                  {spotsLeft > 0 && spotsLeft <= 15 && (
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-1 text-[10px] font-semibold text-white bg-black/50 backdrop-blur-sm rounded-md">
                        {spotsLeft} spots left
                      </span>
                    </div>
                  )}
                  {spotsLeft === 0 && (
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-1 text-[10px] font-semibold text-white bg-red-500/80 rounded-md">Sold out</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3
                    className="font-semibold text-[#09090F] text-base mb-1.5 group-hover:text-[#E8622A] transition-colors leading-snug"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    {event.title}
                  </h3>
                  <p className="text-xs text-[#09090F]/50 mb-4 line-clamp-2 leading-relaxed flex-1">{event.description}</p>

                  {/* Metadata */}
                  <div className="flex flex-col gap-1 mb-4">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#09090F]/45">
                      <Clock size={11} className="shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#09090F]/45">
                      <MapPin size={11} className="shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  {/* Price left · Register right — register is small text link, not loud button */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#09090F]/[0.06]">
                    <div className="flex items-baseline gap-1">
                      <span className={`font-semibold text-base ${event.free ? "text-[#7B9E87]" : "text-[#09090F]"}`}>
                        {event.price}
                      </span>
                      {event.free && (
                        <span className="text-[11px] text-[#09090F]/35">entry</span>
                      )}
                    </div>
                    <button
                      disabled={spotsLeft === 0}
                      className={`group/btn inline-flex items-center gap-1 text-xs font-semibold transition-all duration-150 ${
                        spotsLeft > 0
                          ? "text-[#E8622A] hover:gap-2"
                          : "text-[#09090F]/25 cursor-not-allowed"
                      }`}
                    >
                      {spotsLeft > 0 ? (
                        <>Register <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform duration-150" /></>
                      ) : "Sold out"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
