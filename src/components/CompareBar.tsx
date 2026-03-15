"use client";

import { X, Scale, ArrowRight, Star, MapPin, Check } from "lucide-react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { spaces } from "@/data/spaces";

const COMPARE_ROWS: { label: string; key: (s: typeof spaces[0]) => string }[] = [
  { label: "Location",    key: s => `${s.neighbourhood}, ${s.postcode}` },
  { label: "From",        key: s => `£${s.priceFrom.toLocaleString()}/${s.priceUnit}` },
  { label: "Team size",   key: s => `${s.capacity.min}–${s.capacity.max} people` },
  { label: "Floor area",  key: s => `${s.sqft.min.toLocaleString()}–${s.sqft.max.toLocaleString()} sq ft` },
  { label: "Contract",    key: () => "Monthly rolling" },
  { label: "Rating",      key: s => `${s.rating} (${s.reviewCount} reviews)` },
];

const KEY_AMENITIES = [
  "High-speed Wi-Fi", "Gigabit Wi-Fi", "Café on-site",
  "Rooftop terrace", "Rooftop garden", "Rooftop bar",
  "Bike storage", "24/7 access", "Meeting rooms",
  "Event space", "Pet-friendly", "EV charging", "Podcast studio",
];

export default function CompareBar() {
  const { ids, remove, clear, modalOpen, setModalOpen } = useCompare();
  const selected = ids.map(id => spaces.find(s => s.id === id)).filter(Boolean) as typeof spaces;

  if (ids.length === 0) return null;

  return (
    <>
      {/* Fixed tray */}
      <div className="fixed bottom-0 inset-x-0 z-40 flex justify-center pointer-events-none">
        <div
          className="pointer-events-auto mx-4 mb-4 rounded-2xl border border-white/[0.1] shadow-2xl
            flex items-center gap-3 px-4 py-3 animate-slide-in-right"
          style={{ background: "rgba(9,9,15,0.95)", backdropFilter: "blur(20px)" }}
        >
          {/* Thumbnails */}
          <div className="flex gap-2">
            {selected.map(space => (
              <div key={space.id} className="relative">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                  <img src={space.image} alt={space.name} className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => remove(space.id)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#E8622A] transition-colors"
                  aria-label={`Remove ${space.name} from comparison`}
                >
                  <X size={9} />
                </button>
              </div>
            ))}
            {/* Empty slots */}
            {Array.from({ length: 3 - selected.length }).map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-xl border border-dashed border-white/20 flex items-center justify-center"
              >
                <span className="text-white/20 text-xs">+</span>
              </div>
            ))}
          </div>

          <div className="w-px h-10 bg-white/10 mx-1" />

          <div>
            <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {ids.length} space{ids.length !== 1 ? "s" : ""} selected
            </p>
            <p className="text-white/55 text-xs">{3 - ids.length} more slot{3 - ids.length !== 1 ? "s" : ""} available</p>
          </div>

          <div className="flex items-center gap-2 ml-2">
            {ids.length >= 2 && (
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#E8622A] text-white text-sm font-semibold rounded-xl hover:bg-[#d4561e] transition-colors"
              >
                <Scale size={14} />
                Compare
              </button>
            )}
            <button
              onClick={clear}
              className="px-3 py-2 text-white/40 hover:text-white text-sm transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Comparison modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: "rgba(9,9,15,0.97)", backdropFilter: "blur(24px)" }}
        >
          {/* Modal header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] shrink-0">
            <div className="flex items-center gap-3">
              <Scale size={18} className="text-[#E8622A]" />
              <h2 className="text-white font-semibold text-lg" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Comparing {selected.length} spaces
              </h2>
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Close comparison"
            >
              <X size={18} />
            </button>
          </div>

          {/* Comparison table */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-6 py-8">
              {/* Space headers */}
              <div
                className="grid gap-4 mb-0"
                style={{ gridTemplateColumns: `180px repeat(${selected.length}, 1fr)` }}
              >
                <div /> {/* label column header */}
                {selected.map(space => (
                  <div key={space.id} className="relative">
                    <div className="rounded-2xl overflow-hidden h-44 mb-3">
                      <img src={space.image} alt={space.name} className="w-full h-full object-cover" />
                    </div>
                    <button
                      onClick={() => remove(space.id)}
                      className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white/60 hover:text-white hover:bg-[#E8622A] transition-all"
                    >
                      <X size={12} />
                    </button>
                    <div className="flex items-center gap-1 text-[#E8622A] text-xs font-medium mb-1">
                      <MapPin size={10} />{space.neighbourhood}
                    </div>
                    <h3 className="text-white font-semibold leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {space.name}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Key stats rows */}
              <div className="mt-6 border-t border-white/[0.06]">
                {COMPARE_ROWS.map(row => (
                  <div
                    key={row.label}
                    className="grid gap-4 py-4 border-b border-white/[0.05] items-center"
                    style={{ gridTemplateColumns: `180px repeat(${selected.length}, 1fr)` }}
                  >
                    <div className="text-white/55 text-xs font-semibold uppercase tracking-wider">
                      {row.label}
                    </div>
                    {selected.map(space => (
                      <div key={space.id} className="text-white/80 text-sm font-medium">
                        {row.label === "Rating" ? (
                          <span className="flex items-center gap-1.5">
                            <Star size={12} className="text-[#C9A84C] fill-[#C9A84C]" />
                            {row.key(space)}
                          </span>
                        ) : row.key(space)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Amenities rows */}
              <div className="mt-2">
                <div
                  className="grid gap-4 py-3 items-center"
                  style={{ gridTemplateColumns: `180px repeat(${selected.length}, 1fr)` }}
                >
                  <div className="text-white/55 text-xs font-semibold uppercase tracking-wider pt-4">
                    Amenities
                  </div>
                </div>
                {KEY_AMENITIES.map(amenity => {
                  const hasAny = selected.some(s =>
                    s.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase().split(" ")[0]))
                  );
                  if (!hasAny) return null;
                  return (
                    <div
                      key={amenity}
                      className="grid gap-4 py-3 border-b border-white/[0.04] items-center"
                      style={{ gridTemplateColumns: `180px repeat(${selected.length}, 1fr)` }}
                    >
                      <div className="text-white/65 text-xs">{amenity}</div>
                      {selected.map(space => {
                        const has = space.amenities.some(a =>
                          a.toLowerCase().includes(amenity.toLowerCase().split(" ")[0])
                        );
                        return (
                          <div key={space.id}>
                            {has
                              ? <Check size={15} className="text-[#7B9E87]" />
                              : <span className="w-3 h-px bg-white/10 block mt-2" />
                            }
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div
                className="grid gap-4 mt-8"
                style={{ gridTemplateColumns: `180px repeat(${selected.length}, 1fr)` }}
              >
                <div />
                {selected.map(space => (
                  <div key={space.id} className="flex flex-col gap-2">
                    <Link
                      href={`/book-viewing?space=${space.slug}`}
                      onClick={() => setModalOpen(false)}
                      className="flex items-center justify-center gap-2 py-3 bg-[#E8622A] text-white text-sm font-semibold rounded-xl hover:bg-[#d4561e] transition-colors"
                    >
                      Book viewing
                    </Link>
                    <Link
                      href={`/spaces/${space.slug}`}
                      onClick={() => setModalOpen(false)}
                      className="flex items-center justify-center gap-1 text-white/60 hover:text-white text-xs transition-colors"
                    >
                      Full details <ArrowRight size={11} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
