"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, SlidersHorizontal, X, Star, ArrowRight, Grid3X3, List, Wifi, Coffee, Bike, Zap, Dog, Mic } from "lucide-react";
import { spaces, Space, Area, amenityOptions } from "@/data/spaces";

const areaOptions: { value: Area | ""; label: string }[] = [
  { value: "", label: "All London" },
  { value: "central", label: "Central" },
  { value: "east", label: "East London" },
  { value: "south", label: "South London" },
  { value: "west", label: "West London" },
  { value: "north", label: "North London" },
];

const typeOptions = [
  { value: "", label: "Any type" },
  { value: "private", label: "Private Office" },
  { value: "coworking", label: "Coworking" },
  { value: "studio", label: "Studio" },
];

const sizeOptions = [
  { value: "", label: "Any size" },
  { value: "1-5", label: "1–5 people" },
  { value: "6-15", label: "6–15 people" },
  { value: "16-50", label: "16–50 people" },
  { value: "51+", label: "51+ people" },
];

const amenityIcons: Record<string, React.ReactNode> = {
  "High-speed Wi-Fi": <Wifi size={12} />,
  "Café on-site": <Coffee size={12} />,
  "Bike storage": <Bike size={12} />,
  "EV charging": <Zap size={12} />,
  "Pet-friendly": <Dog size={12} />,
  "Podcast studio": <Mic size={12} />,
};

function SpacesInner() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("location") || "");
  const [area, setArea] = useState<Area | "">((searchParams.get("area") as Area) || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [size, setSize] = useState(searchParams.get("size") || "");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recommended");

  // Re-sync if URL changes (e.g. natural language search redirects)
  useEffect(() => {
    setSearch(searchParams.get("location") || "");
    setArea((searchParams.get("area") as Area) || "");
    setType(searchParams.get("type") || "");
    setSize(searchParams.get("size") || "");
  }, [searchParams]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const filtered = useMemo(() => {
    let result = spaces.filter((s) => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) &&
        !s.neighbourhood.toLowerCase().includes(search.toLowerCase()) &&
        !s.postcode.toLowerCase().includes(search.toLowerCase())) return false;
      if (area && s.area !== area) return false;
      if (type && !s.type.includes(type as Space["type"][0])) return false;
      if (size) {
        const [min] = size.split("-").map(Number);
        if (size === "51+") { if (s.capacity.max < 51) return false; }
        else if (s.capacity.max < min) return false;
      }
      if (selectedAmenities.length > 0) {
        if (!selectedAmenities.every((a) => s.amenities.includes(a))) return false;
      }
      return true;
    });

    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.priceFrom - b.priceFrom);
    if (sortBy === "price-desc") result = [...result].sort((a, b) => b.priceFrom - a.priceFrom);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [search, area, type, size, selectedAmenities, sortBy]);

  const activeFilterCount = [area, type, size].filter(Boolean).length + selectedAmenities.length;

  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      {/* Header */}
      <div className="bg-[#09090F] pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl text-white mb-4 font-light"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Find your perfect space
          </h1>
          <p className="text-white/60 text-lg mb-8">
            {spaces.length} buildings across London — private offices, coworking, and studios.
          </p>

          {/* Search bar */}
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by name, area or postcode..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm text-[#09090F] placeholder-gray-400 focus:outline-none"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">
                  <X size={15} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
                showFilters || activeFilterCount > 0
                  ? "bg-[#E8622A] text-white"
                  : "bg-white text-[#09090F] hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-white/20 rounded-full text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Area</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value as Area | "")}
                  className="w-full text-sm text-[#09090F] border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#E8622A] bg-white"
                >
                  {areaOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Space type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full text-sm text-[#09090F] border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#E8622A] bg-white"
                >
                  {typeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Team size</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full text-sm text-[#09090F] border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#E8622A] bg-white"
                >
                  {sizeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map((a) => (
                  <button
                    key={a}
                    onClick={() => toggleAmenity(a)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      selectedAmenities.includes(a)
                        ? "bg-[#E8622A] text-white border-[#E8622A]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#E8622A] hover:text-[#E8622A]"
                    }`}
                  >
                    {amenityIcons[a] || null}
                    {a}
                  </button>
                ))}
              </div>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={() => { setArea(""); setType(""); setSize(""); setSelectedAmenities([]); }}
                className="mt-4 text-sm text-gray-400 hover:text-[#E8622A] transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Results bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-[#09090F]">{filtered.length}</span> of {spaces.length} spaces
          </p>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm text-[#09090F] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E8622A] bg-white"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="rating">Top rated</option>
            </select>
            <div className="flex gap-1 border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "bg-[#09090F] text-white" : "bg-white text-gray-400 hover:text-gray-600"}`}
              >
                <Grid3X3 size={15} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${viewMode === "list" ? "bg-[#09090F] text-white" : "bg-white text-gray-400 hover:text-gray-600"}`}
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Space cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-[#09090F] mb-2">No spaces found</h3>
            <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search term</p>
            <button
              onClick={() => { setSearch(""); setArea(""); setType(""); setSize(""); setSelectedAmenities([]); }}
              className="text-sm text-[#E8622A] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" : "space-y-4"}>
            {filtered.map((space) => (
              viewMode === "grid" ? (
                <SpaceCardGrid key={space.id} space={space} />
              ) : (
                <SpaceCardList key={space.id} space={space} />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SpacesClient() {
  return (
    <Suspense>
      <SpacesInner />
    </Suspense>
  );
}

function SpaceCardGrid({ space }: { space: Space }) {
  return (
    <Link
      href={`/spaces/${space.slug}`}
      className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={space.image}
          alt={space.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {space.isNew && <span className="px-2 py-1 bg-[#E8622A] text-white text-xs font-semibold rounded-md">New</span>}
          {space.grade && <span className="px-2 py-1 bg-[#C9A84C] text-white text-xs font-semibold rounded-md">Listed</span>}
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-md">
          <Star size={10} className="text-[#C9A84C] fill-[#C9A84C]" />
          <span className="text-white text-xs font-semibold">{space.rating}</span>
          <span className="text-white/60 text-xs">({space.reviewCount})</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1 text-[#E8622A] text-xs font-medium mb-1">
          <MapPin size={11} />{space.neighbourhood}, {space.postcode}
        </div>
        <h3 className="font-semibold text-[#09090F] mb-1">{space.name}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{space.headline}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {space.type.map((t) => (
            <span key={t} className="px-2 py-0.5 bg-[#F4F1EA] text-[#09090F] text-xs rounded-md font-medium capitalize">{t}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-gray-400 text-xs">From </span>
            <span className="font-bold text-[#09090F]">£{space.priceFrom.toLocaleString()}</span>
            <span className="text-gray-400 text-xs">/{space.priceUnit}</span>
          </div>
          <span className="flex items-center gap-1 text-[#E8622A] text-xs font-semibold group-hover:gap-2 transition-all">
            View <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SpaceCardList({ space }: { space: Space }) {
  return (
    <Link
      href={`/spaces/${space.slug}`}
      className="group bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col sm:flex-row"
    >
      <div className="relative w-full sm:w-56 h-44 sm:h-auto overflow-hidden shrink-0">
        <img
          src={space.image}
          alt={space.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {space.isNew && <span className="px-2 py-1 bg-[#E8622A] text-white text-xs font-semibold rounded-md">New</span>}
        </div>
      </div>
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <div className="flex items-center gap-1 text-[#E8622A] text-xs font-medium mb-1">
                <MapPin size={11} />{space.neighbourhood}, {space.postcode}
              </div>
              <h3 className="font-semibold text-[#09090F] text-lg">{space.name}</h3>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Star size={12} className="text-[#C9A84C] fill-[#C9A84C]" />
              <span className="text-sm font-semibold text-[#09090F]">{space.rating}</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-3">{space.headline}</p>
          <div className="flex flex-wrap gap-1.5">
            {space.amenities.slice(0, 4).map((a) => (
              <span key={a} className="flex items-center gap-1 px-2 py-1 bg-[#F4F1EA] text-gray-500 text-xs rounded-md">
                {amenityIcons[a] || null}{a}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <span className="text-gray-400 text-xs">From </span>
            <span className="font-bold text-[#09090F] text-lg">£{space.priceFrom.toLocaleString()}</span>
            <span className="text-gray-400 text-xs">/{space.priceUnit}</span>
          </div>
          <span className="flex items-center gap-2 px-4 py-2 bg-[#E8622A] text-white text-sm font-semibold rounded-lg group-hover:bg-[#d4561e] transition-colors">
            View space <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
