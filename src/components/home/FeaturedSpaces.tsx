import Link from "next/link";
import { MapPin, Star, ArrowRight, Wifi, Coffee, Bike } from "lucide-react";
import { spaces } from "@/data/spaces";

const amenityIcons: Record<string, React.ReactNode> = {
  "High-speed Wi-Fi": <Wifi size={12} />,
  "Café on-site": <Coffee size={12} />,
  "Bike storage": <Bike size={12} />,
};

export default function FeaturedSpaces() {
  const featured = spaces.filter((s) => s.isFeatured).slice(0, 3);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 section-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">
              Featured spaces
            </p>
            <h2
              className="text-4xl sm:text-5xl text-white leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
            >
              London&apos;s most
              <br />
              characterful buildings.
            </h2>
          </div>
          <Link
            href="/spaces"
            className="flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white hover:gap-3 transition-all"
          >
            View all 60+ spaces <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {featured.map((space, i) => (
            <Link
              key={space.id}
              href={`/spaces/${space.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-[#E8622A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#E8622A]/10 ${
                i === 0 ? "lg:col-span-1 lg:row-span-2" : ""
              }`}
            >
              <div className={`overflow-hidden ${i === 0 ? "h-72" : "h-52"}`}>
                <img
                  src={space.image}
                  alt={space.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" style={{ height: i === 0 ? "18rem" : "13rem" }} />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {space.isNew && (
                    <span className="px-2 py-1 bg-[#E8622A] text-white text-xs font-semibold rounded-md">
                      New
                    </span>
                  )}
                  {space.grade && (
                    <span className="px-2 py-1 bg-[#C9A84C] text-white text-xs font-semibold rounded-md">
                      {space.grade}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-md">
                  <Star size={10} className="text-[#C9A84C] fill-[#C9A84C]" />
                  <span className="text-white text-xs font-semibold">{space.rating}</span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 text-[#E8622A] text-xs font-medium mb-1">
                  <MapPin size={11} />
                  {space.neighbourhood}, {space.postcode}
                </div>
                <h3 className="text-white font-semibold text-lg mb-1 leading-snug">{space.name}</h3>
                <p className="text-white/50 text-sm mb-4 line-clamp-2">{space.headline}</p>

                {/* Amenity pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {space.amenities.slice(0, 3).map((a) => (
                    <span
                      key={a}
                      className="flex items-center gap-1.5 px-2 py-1 bg-white/10 rounded-md text-white/60 text-xs"
                    >
                      {amenityIcons[a] || null}
                      {a}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <span className="text-white/40 text-xs">From</span>
                    <div className="text-white font-bold text-lg">
                      £{space.priceFrom.toLocaleString()}
                      <span className="text-white/40 text-sm font-normal">/{space.priceUnit}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#E8622A] text-sm font-semibold group-hover:gap-3 transition-all">
                    View space <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
