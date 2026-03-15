import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { spaces } from "@/data/spaces";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import FavouriteButton from "@/components/FavouriteButton";
import ShareButton from "@/components/ShareButton";

export default function FeaturedSpaces() {
  const featured = spaces.filter(s => s.isFeatured).slice(0, 3);
  const [main, ...rest] = featured;

  return (
    <section className="section-dark py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex items-end justify-between mb-14">
          <ScrollReveal>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#E8622A] mb-4">Selected buildings</p>
              <h2
                className="text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] tracking-[-0.03em]"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
              >
                London&apos;s most
                <br />
                characterful buildings.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="hidden lg:block">
            <Link
              href="/spaces"
              className="flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium transition-colors group"
            >
              View all 60+ spaces
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Main space — large left card */}
          {main && (
            <ScrollReveal className="lg:col-span-7" delay={0.05}>
              <TiltCard className="relative rounded-3xl overflow-hidden h-full min-h-[480px] lg:min-h-[560px]" intensity={5}>
                {/* Ghost index */}
                <span
                  className="absolute top-4 left-6 text-[120px] font-bold text-white/[0.03] leading-none select-none pointer-events-none z-0"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  01
                </span>

                <Link href={`/spaces/${main.slug}`} className="group block absolute inset-0">
                  <img
                    src={main.image}
                    alt={main.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out space-img"
                    style={{ viewTransitionName: `space-img-${main.slug}` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090F]/90 via-[#09090F]/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-5 left-5 flex gap-2 z-10">
                    {main.isNew && <span className="px-2.5 py-1 bg-[#E8622A] text-white text-xs font-semibold rounded-lg">New</span>}
                    {main.grade && <span className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-lg border border-white/20">{main.grade}</span>}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                    <div className="flex items-center gap-1.5 text-[#E8622A] text-xs font-medium mb-2">
                      <MapPin size={11} />
                      {main.neighbourhood}, {main.postcode}
                    </div>
                    <h3
                      className="text-white text-3xl mb-3 leading-tight"
                      style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 400 }}
                    >
                      {main.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-white/50 text-sm">{main.headline}</p>
                      <div className="flex items-center gap-1.5 text-white text-sm font-semibold group-hover:gap-3 transition-all shrink-0 ml-4">
                        View <ArrowRight size={14} />
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-white/30 text-xs">From <span className="text-white/70">£{main.priceFrom.toLocaleString()}/{main.priceUnit}</span></span>
                      <div className="flex gap-1">
                        {main.type.map(t => (
                          <span key={t} className="px-2 py-0.5 bg-white/[0.07] text-white/40 text-[10px] rounded-full capitalize">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Floating actions — outside Link to prevent navigation on click */}
                <div className="absolute top-5 right-5 z-20 flex gap-2">
                  <ShareButton data={{ title: main.name, text: main.headline, slug: main.slug }} />
                  <FavouriteButton spaceId={main.id} />
                </div>
              </TiltCard>
            </ScrollReveal>
          )}

          {/* Right column — two stacked cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {rest.map((space, i) => (
              <ScrollReveal key={space.id} delay={0.12 + i * 0.08}>
                <TiltCard className="relative rounded-3xl overflow-hidden h-[240px] sm:h-[265px]" intensity={6}>
                  {/* Ghost index */}
                  <span
                    className="absolute top-3 left-5 text-[80px] font-bold text-white/[0.04] leading-none select-none pointer-events-none z-0"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    0{i + 2}
                  </span>

                  <Link href={`/spaces/${space.slug}`} className="group block absolute inset-0">
                    <img
                      src={space.image}
                      alt={space.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out space-img"
                      style={{ viewTransitionName: `space-img-${space.slug}` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090F]/85 via-[#09090F]/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <div className="flex items-center gap-1 text-[#E8622A] text-[11px] font-medium mb-1.5">
                        <MapPin size={10} />
                        {space.neighbourhood}, {space.postcode}
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <h3
                            className="text-white text-xl font-medium leading-tight mb-0.5"
                            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                          >
                            {space.name}
                          </h3>
                          <p className="text-white/40 text-xs">From £{space.priceFrom.toLocaleString()}/{space.priceUnit}</p>
                        </div>
                        <div className="flex items-center gap-1 text-white/60 text-sm group-hover:gap-2 group-hover:text-white transition-all shrink-0 ml-3">
                          View <ArrowRight size={13} />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Floating actions */}
                  <div className="absolute top-3.5 right-3.5 z-20 flex gap-1.5">
                    <ShareButton data={{ title: space.name, text: space.headline, slug: space.slug }} />
                    <FavouriteButton spaceId={space.id} />
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile view-all */}
        <div className="lg:hidden mt-8 text-center">
          <Link href="/spaces" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors">
            View all 60+ spaces <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
