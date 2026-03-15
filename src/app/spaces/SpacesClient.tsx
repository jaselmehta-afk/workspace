"use client";

import { useState, useMemo, useEffect, useRef, useCallback, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import {
  Search, MapPin, X, Star, ArrowRight, Grid3X3, List, Map,
  Scale, TrendingUp, ArrowUpDown, ChevronDown, ChevronUp,
  Mic, MicOff,
} from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SR = new () => any;
import { spaces, Space, Area, amenityOptions } from "@/data/spaces";
import FavouriteButton from "@/components/FavouriteButton";
import ShareButton from "@/components/ShareButton";
import { useCompare } from "@/context/CompareContext";

const SpaceMap = dynamic(() => import("@/components/SpaceMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl" style={{ background: "#09090F" }} />
  ),
});

const areaOptions: { value: Area | ""; label: string }[] = [
  { value: "", label: "All London" },
  { value: "central", label: "Central" },
  { value: "east", label: "East" },
  { value: "south", label: "South" },
  { value: "west", label: "West" },
  { value: "north", label: "North" },
];

const typeOptions = [
  { value: "", label: "Any type" },
  { value: "private", label: "Private office" },
  { value: "coworking", label: "Coworking" },
  { value: "studio", label: "Studio" },
];

const sizeOptions = [
  { value: "", label: "Any size" },
  { value: "1-5", label: "1–5" },
  { value: "6-15", label: "6–15" },
  { value: "16-50", label: "16–50" },
  { value: "51+", label: "51+" },
];

const GALLERY_INTERVAL = 3500;

function SpacesInner() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("location") || "");
  const [area, setArea] = useState<Area | "">((searchParams.get("area") as Area) || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [size, setSize] = useState(searchParams.get("size") || "");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showAmenities, setShowAmenities] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [sortBy, setSortBy] = useState("recommended");
  const [mapActiveId, setMapActiveId] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const recognitionRef = useRef<InstanceType<SR> | null>(null);

  useEffect(() => {
    const w = window as Window & { SpeechRecognition?: SR; webkitSpeechRecognition?: SR };
    setVoiceSupported(!!(w.SpeechRecognition || w.webkitSpeechRecognition));
  }, []);

  const startVoice = useCallback(() => {
    const w = window as Window & { SpeechRecognition?: SR; webkitSpeechRecognition?: SR };
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-GB";
    recognition.interimResults = true;
    recognition.continuous = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transcript = Array.from(e.results).map((r: any) => r[0].transcript).join("");
      setSearch(transcript);
      if (e.results[0].isFinal) setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
  }, [listening]);

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
      if (
        search &&
        !s.name.toLowerCase().includes(search.toLowerCase()) &&
        !s.neighbourhood.toLowerCase().includes(search.toLowerCase()) &&
        !s.postcode.toLowerCase().includes(search.toLowerCase())
      ) return false;
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

  const activeFilterCount =
    [area, type, size].filter(Boolean).length + selectedAmenities.length;

  const clearAll = () => {
    setSearch("");
    setArea("");
    setType("");
    setSize("");
    setSelectedAmenities([]);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--ws-bg)" }}>
      {/* ── Dark hero header with integrated filters ── */}
      <div className="bg-[#09090F] pt-28 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl text-white mb-2 font-light tracking-[-0.03em]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Find your perfect space
          </h1>
          <p className="text-white/50 text-sm mb-6">
            {spaces.length} buildings across London ·{" "}
            <span className="text-[#7B9E87]">
              {spaces.filter((s) => s.isNew || s.isFeatured).length} with immediate availability
            </span>
          </p>

          {/* Search — dark glass */}
          <div className="flex gap-2.5 mb-5">
            <div className="flex-1 flex items-center gap-3 glass rounded-xl px-4 py-3">
              <Search size={16} className="text-white/40 shrink-0" />
              <input
                type="text"
                placeholder="Search by name, area or postcode…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm text-white placeholder-white/30 bg-transparent focus:outline-none"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-white/30 hover:text-white/60 transition-colors">
                  <X size={14} />
                </button>
              )}
              {voiceSupported && (
                <button
                  onClick={startVoice}
                  aria-label={listening ? "Stop listening" : "Search by voice"}
                  className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 shrink-0 ${
                    listening
                      ? "bg-[#E8622A] text-white shadow-[0_0_16px_rgba(232,98,42,0.5)]"
                      : "text-white/40 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {listening ? (
                    <MicOff size={14} />
                  ) : (
                    <Mic size={14} />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* ── Filter chips row 1: Area ── */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar mb-2">
            <span className="text-white/30 text-[11px] uppercase tracking-widest font-medium shrink-0 mr-1">Area</span>
            {areaOptions.map((o) => (
              <button
                key={o.value}
                onClick={() => setArea(o.value as Area | "")}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                  area === o.value
                    ? "bg-white text-[#09090F]"
                    : "bg-white/8 text-white/60 hover:bg-white/15 hover:text-white"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          {/* ── Filter chips row 2: Type + Size ── */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar mb-3">
            <span className="text-white/30 text-[11px] uppercase tracking-widest font-medium shrink-0 mr-1">Type</span>
            {typeOptions.filter((o) => o.value).map((o) => (
              <button
                key={o.value}
                onClick={() => setType(type === o.value ? "" : o.value)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                  type === o.value
                    ? "bg-[#E8622A] text-white"
                    : "bg-white/8 text-white/60 hover:bg-white/15 hover:text-white"
                }`}
              >
                {o.label}
              </button>
            ))}

            <span className="w-px h-4 bg-white/15 mx-1 shrink-0" />

            <span className="text-white/30 text-[11px] uppercase tracking-widest font-medium shrink-0">Team</span>
            {sizeOptions.filter((o) => o.value).map((o) => (
              <button
                key={o.value}
                onClick={() => setSize(size === o.value ? "" : o.value)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                  size === o.value
                    ? "bg-[#E8622A] text-white"
                    : "bg-white/8 text-white/60 hover:bg-white/15 hover:text-white"
                }`}
              >
                {o.label}
              </button>
            ))}

            <span className="w-px h-4 bg-white/15 mx-1 shrink-0" />

            {/* Amenities toggle */}
            <button
              onClick={() => setShowAmenities(!showAmenities)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                selectedAmenities.length > 0
                  ? "bg-[#E8622A] text-white"
                  : "bg-white/8 text-white/60 hover:bg-white/15 hover:text-white"
              }`}
            >
              Amenities
              {selectedAmenities.length > 0 && (
                <span className="bg-white/20 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                  {selectedAmenities.length}
                </span>
              )}
              {showAmenities ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
          </div>

          {/* Amenities panel (inline, no separate drawer) */}
          {showAmenities && (
            <div className="flex flex-wrap gap-2 pb-2 pt-1 border-t border-white/[0.06] mt-1">
              {amenityOptions.map((a) => (
                <button
                  key={a}
                  onClick={() => toggleAmenity(a)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                    selectedAmenities.includes(a)
                      ? "bg-[#E8622A] text-white"
                      : "bg-white/8 text-white/55 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Active filter chips + results bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm" style={{ color: "var(--ws-text-muted)" }}>
              <span className="font-semibold" style={{ color: "var(--ws-text)" }}>{filtered.length}</span>
              {" "}space{filtered.length !== 1 ? "s" : ""}
              {activeFilterCount > 0 && " found"}
            </p>

            {/* Active dismissible chips */}
            {area && (
              <button
                onClick={() => setArea("")}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#09090F] text-white"
              >
                {areaOptions.find((o) => o.value === area)?.label}
                <X size={10} />
              </button>
            )}
            {type && (
              <button
                onClick={() => setType("")}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#09090F] text-white"
              >
                {typeOptions.find((o) => o.value === type)?.label}
                <X size={10} />
              </button>
            )}
            {size && (
              <button
                onClick={() => setSize("")}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#09090F] text-white"
              >
                {sizeOptions.find((o) => o.value === size)?.label} people
                <X size={10} />
              </button>
            )}
            {selectedAmenities.map((a) => (
              <button
                key={a}
                onClick={() => toggleAmenity(a)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#09090F] text-white"
              >
                {a} <X size={10} />
              </button>
            ))}
            {activeFilterCount > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-[#E8622A] hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Sort + view controls */}
          <div className="flex items-center gap-3">
            {viewMode !== "map" && (
              <div className="flex items-center gap-1 p-1 rounded-xl border" style={{ borderColor: "var(--ws-border)", backgroundColor: "var(--ws-surface)" }}>
                {[
                  { value: "recommended", label: "Best", icon: <Star size={11} /> },
                  { value: "price-asc", label: "Price ↑", icon: <ArrowUpDown size={11} /> },
                  { value: "price-desc", label: "Price ↓", icon: <ArrowUpDown size={11} className="rotate-180" /> },
                  { value: "rating", label: "Rating", icon: <TrendingUp size={11} /> },
                ].map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSortBy(s.value)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                      sortBy === s.value
                        ? "bg-[#09090F] text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                    style={sortBy !== s.value ? { color: "var(--ws-text-muted)" } : {}}
                  >
                    {s.icon}
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* View mode toggle */}
            <div className="flex gap-0.5 border rounded-xl overflow-hidden p-0.5" style={{ borderColor: "var(--ws-border)", backgroundColor: "var(--ws-surface)" }}>
              {(["grid", "list", "map"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  aria-label={`${mode} view`}
                  className={`p-2 rounded-lg transition-all duration-150 ${
                    viewMode === mode
                      ? "bg-[#09090F] text-white"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  style={viewMode !== mode ? { color: "var(--ws-text-muted)" } : {}}
                >
                  {mode === "grid" && <Grid3X3 size={14} />}
                  {mode === "list" && <List size={14} />}
                  {mode === "map" && <Map size={14} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <div className="text-center py-28">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: "var(--ws-surface)" }}
            >
              <Search size={22} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--ws-text)" }}>
              No spaces match
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--ws-text-muted)" }}>
              Try broadening your search or removing a filter
            </p>
            <button onClick={clearAll} className="text-sm text-[#E8622A] hover:underline">
              Clear all filters
            </button>
          </div>
        ) : viewMode === "map" ? (
          <div className="flex gap-4" style={{ height: "calc(100vh - 280px)", minHeight: 520 }}>
            <div className="w-80 shrink-0 overflow-y-auto space-y-3 pr-1">
              {filtered.map((space) => (
                <SpaceCardMapSidebar
                  key={space.id}
                  space={space}
                  active={mapActiveId === space.id}
                  onHover={setMapActiveId}
                />
              ))}
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden sticky top-24">
              <SpaceMap
                spaces={filtered}
                activeId={mapActiveId}
                onMarkerClick={setMapActiveId}
              />
            </div>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                : "space-y-4"
            }
          >
            {filtered.map((space) =>
              viewMode === "grid" ? (
                <SpaceCardGrid key={space.id} space={space} />
              ) : (
                <SpaceCardList key={space.id} space={space} />
              )
            )}
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

/* ─────────────────────────────────────────────────────────────────
   Grid card — fully image-dominant, all content overlaid
───────────────────────────────────────────────────────────────── */
function SpaceCardGrid({ space }: { space: Space }) {
  const { add, remove, isComparing } = useCompare();
  const comparing = isComparing(space.id);
  const gallery = space.gallery.length > 1 ? space.gallery : [space.image];

  const [imgIdx, setImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  // Track render count to key the animation
  const [animKey, setAnimKey] = useState(0);

  const startCycle = useCallback(() => {
    if (gallery.length <= 1) return;
    setIsHovered(true);
    intervalRef.current = setInterval(() => {
      setImgIdx((i) => {
        setAnimKey((k) => k + 1);
        return (i + 1) % gallery.length;
      });
    }, GALLERY_INTERVAL);
  }, [gallery.length]);

  const stopCycle = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsHovered(false);
    setImgIdx(0);
    setAnimKey(0);
  }, []);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <article
      className="group rounded-3xl overflow-hidden cursor-pointer"
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
      style={{ aspectRatio: "3/4" }}
    >
      <Link href={`/spaces/${space.slug}`} className="relative block w-full h-full">
        {/* Image */}
        <img
          key={animKey}
          src={gallery[imgIdx]}
          alt={space.name}
          className="absolute inset-0 w-full h-full object-cover gallery-fade-in group-hover:scale-[1.03] transition-transform duration-700"
          style={{
            viewTransitionName: imgIdx === 0 ? `space-img-${space.slug}` : undefined,
          }}
        />

        {/* Stories-style progress bars */}
        {gallery.length > 1 && isHovered && (
          <div className="absolute top-3.5 inset-x-3.5 flex gap-1 z-20">
            {gallery.map((_, i) => (
              <div key={i} className="flex-1 h-0.5 rounded-full bg-white/25 overflow-hidden">
                <div
                  key={i === imgIdx ? `prog-${animKey}` : i}
                  className="h-full bg-white rounded-full"
                  style={
                    i < imgIdx
                      ? { width: "100%" }
                      : i === imgIdx
                      ? { width: "0%", animation: `galleryProgress ${GALLERY_INTERVAL}ms linear forwards` }
                      : { width: "0%" }
                  }
                />
              </div>
            ))}
          </div>
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

        {/* Badges — top-left (below progress bars) */}
        <div className="absolute top-4 left-4 flex gap-1.5 z-10" style={{ marginTop: gallery.length > 1 && isHovered ? "18px" : "0" }}>
          {space.isNew && (
            <span className="px-2.5 py-1 bg-[#E8622A] text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
              New
            </span>
          )}
          {space.grade && (
            <span className="px-2.5 py-1 bg-[#C9A84C] text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
              Listed
            </span>
          )}
        </div>

        {/* Share + Favourite — top-right */}
        <div className="absolute top-4 right-4 z-10 flex gap-1.5">
          <ShareButton data={{ title: space.name, text: space.headline, slug: space.slug }} />
          <FavouriteButton spaceId={space.id} />
        </div>

        {/* Content overlay — bottom */}
        <div className="absolute bottom-0 inset-x-0 p-5 z-10">
          {/* Neighbourhood + rating row */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1 text-[#E8622A] text-[11px] font-semibold tracking-wide">
              <MapPin size={10} />
              {space.neighbourhood}
            </div>
            <div className="flex items-center gap-1 glass rounded-full px-2 py-0.5">
              <Star size={9} className="text-[#C9A84C] fill-[#C9A84C]" />
              <span className="text-white text-[11px] font-semibold">{space.rating}</span>
              <span className="text-white/50 text-[10px]">({space.reviewCount})</span>
            </div>
          </div>

          {/* Space name */}
          <h3
            className="text-white font-light text-xl leading-tight mb-3"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            {space.name}
          </h3>

          {/* Price + CTA row */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white/55 text-xs">From </span>
              <span className="text-white font-bold text-base">
                £{space.priceFrom.toLocaleString()}
              </span>
              <span className="text-white/55 text-xs">/{space.priceUnit}</span>
            </div>
            <div
              className={`transition-all duration-300 ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
              }`}
            >
              <span className="flex items-center gap-1.5 bg-white text-[#09090F] text-xs font-bold px-3.5 py-2 rounded-full">
                View <ArrowRight size={11} />
              </span>
            </div>
          </div>

          {/* Compare — subtle */}
          <button
            onClick={(e) => {
              e.preventDefault();
              comparing ? remove(space.id) : add(space.id);
            }}
            className={`mt-3 text-[11px] font-medium flex items-center gap-1 transition-colors ${
              comparing ? "text-[#E8622A]" : "text-white/30 hover:text-white/60"
            }`}
          >
            <Scale size={10} />
            {comparing ? "Comparing" : "Compare"}
          </button>
        </div>
      </Link>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────
   List card — side-by-side, image left, content right
───────────────────────────────────────────────────────────────── */
function SpaceCardList({ space }: { space: Space }) {
  const { add, remove, isComparing } = useCompare();
  const comparing = isComparing(space.id);
  const gallery = space.gallery.length > 1 ? space.gallery : [space.image];

  const [imgIdx, setImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const [animKey, setAnimKey] = useState(0);

  const startCycle = useCallback(() => {
    if (gallery.length <= 1) return;
    setIsHovered(true);
    intervalRef.current = setInterval(() => {
      setImgIdx((i) => {
        setAnimKey((k) => k + 1);
        return (i + 1) % gallery.length;
      });
    }, GALLERY_INTERVAL);
  }, [gallery.length]);

  const stopCycle = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsHovered(false);
    setImgIdx(0);
    setAnimKey(0);
  }, []);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <article
      className="group rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-shadow duration-300"
      style={{ backgroundColor: "var(--ws-surface)" }}
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
    >
      {/* Image */}
      <div className="relative w-full sm:w-64 shrink-0" style={{ aspectRatio: "4/3" }}>
        <Link href={`/spaces/${space.slug}`} className="absolute inset-0 block overflow-hidden">
          <img
            key={animKey}
            src={gallery[imgIdx]}
            alt={space.name}
            className="absolute inset-0 w-full h-full object-cover gallery-fade-in group-hover:scale-[1.04] transition-transform duration-700"
            style={{ viewTransitionName: `space-img-${space.slug}` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Badges */}
          {space.isNew && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#E8622A] text-white text-[10px] font-bold rounded-lg uppercase tracking-wider z-10">
              New
            </span>
          )}
        </Link>

        {/* Actions on image */}
        <div className="absolute top-2.5 right-2.5 z-10 flex gap-1.5">
          <ShareButton data={{ title: space.name, text: space.headline, slug: space.slug }} />
          <FavouriteButton spaceId={space.id} />
        </div>

        {/* Gallery dots */}
        {gallery.length > 1 && isHovered && (
          <div className="absolute bottom-2.5 inset-x-3 flex gap-1 z-10">
            {gallery.map((_, i) => (
              <div key={i} className="flex-1 h-0.5 rounded-full bg-white/25 overflow-hidden">
                <div
                  key={i === imgIdx ? `listprog-${animKey}` : i}
                  className="h-full bg-white rounded-full"
                  style={
                    i < imgIdx
                      ? { width: "100%" }
                      : i === imgIdx
                      ? { width: "0%", animation: `galleryProgress ${GALLERY_INTERVAL}ms linear forwards` }
                      : { width: "0%" }
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <Link href={`/spaces/${space.slug}`} className="block flex-1">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <div className="flex items-center gap-1 text-[#E8622A] text-[11px] font-semibold mb-1 tracking-wide">
                <MapPin size={10} />
                {space.neighbourhood}, {space.postcode}
              </div>
              <h3 className="font-semibold text-lg leading-snug" style={{ color: "var(--ws-text)" }}>
                {space.name}
              </h3>
            </div>
            <div className="flex items-center gap-1 shrink-0 mt-0.5">
              <Star size={11} className="text-[#C9A84C] fill-[#C9A84C]" />
              <span className="text-sm font-semibold" style={{ color: "var(--ws-text)" }}>
                {space.rating}
              </span>
              <span className="text-xs" style={{ color: "var(--ws-text-muted)" }}>
                ({space.reviewCount})
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--ws-text-muted)" }}>
            {space.headline}
          </p>
        </Link>

        <div
          className="flex items-center justify-between mt-4 pt-4 border-t"
          style={{ borderColor: "var(--ws-border)" }}
        >
          <div>
            <span className="text-xs" style={{ color: "var(--ws-text-muted)" }}>From </span>
            <span className="font-bold text-lg" style={{ color: "var(--ws-text)" }}>
              £{space.priceFrom.toLocaleString()}
            </span>
            <span className="text-xs" style={{ color: "var(--ws-text-muted)" }}>/{space.priceUnit}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => (comparing ? remove(space.id) : add(space.id))}
              aria-label={comparing ? "Remove from comparison" : "Compare"}
              title={comparing ? "Remove from comparison" : "Compare this space"}
              className={`transition-colors ${
                comparing ? "text-[#E8622A]" : "text-gray-300 hover:text-[#E8622A]"
              }`}
            >
              <Scale size={15} />
            </button>
            <Link
              href={`/spaces/${space.slug}`}
              className="flex items-center gap-2 px-4 py-2 bg-[#09090F] text-white text-sm font-semibold rounded-xl hover:bg-[#E8622A] transition-colors duration-200"
            >
              View space <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Map sidebar card — compact
───────────────────────────────────────────────────────────────── */
function SpaceCardMapSidebar({
  space,
  active,
  onHover,
}: {
  space: Space;
  active: boolean;
  onHover: (id: string | null) => void;
}) {
  return (
    <article
      onMouseEnter={() => onHover(space.id)}
      onMouseLeave={() => onHover(null)}
      className={`group flex gap-3 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 p-3 ${
        active ? "shadow-lg ring-2 ring-[#E8622A]" : "hover:shadow-md"
      }`}
      style={{ backgroundColor: "var(--ws-surface)" }}
    >
      <Link href={`/spaces/${space.slug}`} className="shrink-0 w-20 h-20 rounded-xl overflow-hidden block">
        <img
          src={space.image}
          alt={space.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-center gap-1 text-[#E8622A] text-[10px] font-semibold mb-0.5">
            <MapPin size={9} />
            {space.neighbourhood}
          </div>
          <Link href={`/spaces/${space.slug}`} className="block">
            <h3 className="text-sm font-semibold leading-snug truncate" style={{ color: "var(--ws-text)" }}>
              {space.name}
            </h3>
          </Link>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div>
            <span className="text-xs font-bold" style={{ color: "var(--ws-text)" }}>
              £{space.priceFrom.toLocaleString()}
            </span>
            <span className="text-[10px]" style={{ color: "var(--ws-text-muted)" }}>
              /{space.priceUnit}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={9} className="text-[#C9A84C] fill-[#C9A84C]" />
            <span className="text-[10px] font-semibold" style={{ color: "var(--ws-text)" }}>
              {space.rating}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
