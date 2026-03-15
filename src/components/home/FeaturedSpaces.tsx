"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { spaces } from "@/data/spaces";
import ScrollReveal from "@/components/ScrollReveal";
import FavouriteButton from "@/components/FavouriteButton";
import ShareButton from "@/components/ShareButton";

// Extra images per slot to give the carousel something to flip through
const POOL = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=85",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=85",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=85",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=85",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85",
];

function buildImageList(primary: string, offset: number): string[] {
  return [primary, POOL[offset % POOL.length], POOL[(offset + 2) % POOL.length]];
}

interface CarouselCardProps {
  slug: string;
  imageIndex: number;
  images: string[];
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  className?: string;
}

function CarouselCard({
  slug, imageIndex, images, isHovered,
  onEnter, onLeave, onMouseMove, children, className = "",
}: CarouselCardProps) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMouseMove}
    >
      {/* Image layers — crossfade */}
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden={i !== imageIndex}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{
            opacity: i === imageIndex ? 1 : 0,
            transform: i === imageIndex && !isHovered ? "scale(1)" : i === imageIndex ? "scale(1.04)" : "scale(1)",
            transition: "opacity 0.35s ease, transform 0.7s ease",
            viewTransitionName: i === 0 ? `space-img-${slug}` : undefined,
          }}
        />
      ))}

      {/* Dot navigation — appears on hover */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 transition-all duration-200"
        style={{ opacity: isHovered ? 1 : 0, transform: `translateX(-50%) translateY(${isHovered ? 0 : -4}px)` }}
        aria-hidden="true"
      >
        {images.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-200"
            style={{
              width: i === imageIndex ? 20 : 6,
              height: 6,
              background: i === imageIndex ? "white" : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </div>

      {children}
    </div>
  );
}

export default function FeaturedSpaces() {
  const featured = spaces.filter(s => s.isFeatured).slice(0, 3);
  const [main, ...rest] = featured;

  // imageIndex per card
  const [imageIdxMap, setImageIdxMap] = useState<Record<string, number>>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleMouseMove = useCallback((id: string, e: React.MouseEvent<HTMLDivElement>, count: number) => {
    const el = cardRefs.current[id];
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const pct = (e.clientX - left) / width;
    const idx = Math.min(Math.floor(pct * count), count - 1);
    setImageIdxMap(prev => prev[id] === idx ? prev : { ...prev, [id]: idx });
  }, []);

  const enter = useCallback((id: string) => setHoveredId(id), []);
  const leave = useCallback((id: string) => {
    setHoveredId(null);
    setImageIdxMap(prev => ({ ...prev, [id]: 0 }));
  }, []);

  const mainImages = main ? buildImageList(main.image, 0) : [];

  return (
    <section className="section-dark py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">

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
            <Link href="/spaces" className="flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium transition-colors group">
              View all 60+ spaces
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Main card */}
          {main && (
            <ScrollReveal className="lg:col-span-7" delay={0.05}>
              <div
                ref={el => { cardRefs.current[main.id] = el; }}
                className="h-full min-h-[480px] lg:min-h-[560px]"
              >
                <CarouselCard
                  slug={main.slug}
                  imageIndex={imageIdxMap[main.id] ?? 0}
                  images={mainImages}
                  isHovered={hoveredId === main.id}
                  onEnter={() => enter(main.id)}
                  onLeave={() => leave(main.id)}
                  onMouseMove={e => handleMouseMove(main.id, e, mainImages.length)}
                  className="h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090F]/90 via-[#09090F]/20 to-transparent" />

                  <div className="absolute top-5 left-5 flex gap-2 z-10">
                    {main.isNew && <span className="px-2.5 py-1 bg-[#E8622A] text-white text-xs font-semibold rounded-lg">New</span>}
                    {main.grade && <span className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-lg border border-white/20">{main.grade}</span>}
                  </div>

                  <Link href={`/spaces/${main.slug}`} className="group absolute inset-0 z-10">
                    <div className="absolute bottom-0 left-0 right-0 p-7">
                      <div className="flex items-center gap-1.5 text-[#E8622A] text-xs font-medium mb-2">
                        <MapPin size={11} />{main.neighbourhood}, {main.postcode}
                      </div>
                      <h3 className="text-white text-3xl mb-3 leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 400 }}>
                        {main.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-white/70 text-sm">{main.headline}</p>
                        <div className="flex items-center gap-1.5 text-white text-sm font-semibold group-hover:gap-3 transition-all shrink-0 ml-4">
                          View <ArrowRight size={14} />
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-white/55 text-xs">From <span className="text-white font-medium">£{main.priceFrom.toLocaleString()}/{main.priceUnit}</span></span>
                        <div className="flex gap-1">
                          {main.type.map(t => (
                            <span key={t} className="px-2 py-0.5 bg-white/[0.07] text-white/40 text-[10px] rounded-full capitalize">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="absolute top-5 right-5 z-20 flex gap-2">
                    <ShareButton data={{ title: main.name, text: main.headline, slug: main.slug }} />
                    <FavouriteButton spaceId={main.id} />
                  </div>
                </CarouselCard>
              </div>
            </ScrollReveal>
          )}

          {/* Right column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {rest.map((space, i) => {
              const imgs = buildImageList(space.image, i + 1);
              return (
                <ScrollReveal key={space.id} delay={0.12 + i * 0.08}>
                  <div ref={el => { cardRefs.current[space.id] = el; }}>
                    <CarouselCard
                      slug={space.slug}
                      imageIndex={imageIdxMap[space.id] ?? 0}
                      images={imgs}
                      isHovered={hoveredId === space.id}
                      onEnter={() => enter(space.id)}
                      onLeave={() => leave(space.id)}
                      onMouseMove={e => handleMouseMove(space.id, e, imgs.length)}
                      className="h-[240px] sm:h-[265px]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090F]/85 via-[#09090F]/20 to-transparent" />

                      <Link href={`/spaces/${space.slug}`} className="group absolute inset-0 z-10">
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <div className="flex items-center gap-1 text-[#E8622A] text-[11px] font-medium mb-1.5">
                            <MapPin size={10} />{space.neighbourhood}, {space.postcode}
                          </div>
                          <div className="flex items-end justify-between">
                            <div>
                              <h3 className="text-white text-xl font-medium leading-tight mb-0.5" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                                {space.name}
                              </h3>
                              <p className="text-white/60 text-xs">From £{space.priceFrom.toLocaleString()}/{space.priceUnit}</p>
                            </div>
                            <div className="flex items-center gap-1 text-white/70 text-sm group-hover:gap-2 group-hover:text-white transition-all shrink-0 ml-3">
                              View <ArrowRight size={13} />
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="absolute top-3.5 right-3.5 z-20 flex gap-1.5">
                        <ShareButton data={{ title: space.name, text: space.headline, slug: space.slug }} />
                        <FavouriteButton spaceId={space.id} />
                      </div>
                    </CarouselCard>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        <div className="lg:hidden mt-8 text-center">
          <Link href="/spaces" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors">
            View all 60+ spaces <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
