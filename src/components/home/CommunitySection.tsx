import Link from "next/link";
import { ArrowRight, BookOpen, Mic, Lightbulb } from "lucide-react";

const events = [
  {
    day: "18",
    month: "Mar",
    title: "Startup Pitch Night",
    meta: "Networking · Central House, Shoreditch",
    badge: "Networking",
  },
  {
    day: "22",
    month: "Mar",
    title: "Female Founders Brunch",
    meta: "Community · The Light Bulb, Wandsworth",
    badge: "Community",
  },
  {
    day: "1",
    month: "Apr",
    title: "Growth Marketing Masterclass",
    meta: "Workshop · Leather Exchange, Bermondsey",
    badge: "Workshop",
  },
];

const articles = [
  {
    title: "How Depop built a global marketplace from a Shoreditch studio",
    meta: "Member Story · 5 min read",
    icon: BookOpen,
  },
  {
    title: "The case for flexible leases: why London's best businesses are rethinking real estate",
    meta: "Insight · 7 min read",
    icon: Lightbulb,
  },
  {
    title: "Episode 42: Building culture in a remote-first world",
    meta: "Podcast · 38 min listen",
    icon: Mic,
  },
];

export default function CommunitySection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#09090F]/40 mb-4">
              Community &amp; content
            </p>
            <h2
              className="text-4xl sm:text-5xl text-[#09090F] leading-[0.95] tracking-[-0.03em]"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
            >
              More than a desk.
              <br />
              <span className="text-[#09090F]/40">A community.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Upcoming events */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#09090F]/40">
                Upcoming events
              </h3>
              <Link href="/community/events" className="group text-xs text-[#E8622A] flex items-center gap-1 font-medium hover:gap-1.5 transition-all duration-150">
                All events <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-150" />
              </Link>
            </div>
            <div className="space-y-2">
              {events.map((event) => (
                <Link
                  key={event.title}
                  href="/community/events"
                  className="group bg-white rounded-xl p-4 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  {/* Date block */}
                  <div className="w-12 shrink-0 text-center">
                    <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#09090F]/45">
                      {event.month}
                    </div>
                    <div
                      className="text-2xl font-bold leading-none text-[#09090F]"
                      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                    >
                      {event.day}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-8 bg-[#09090F]/10 shrink-0" />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#09090F] leading-snug truncate group-hover:text-[#E8622A] transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-[11px] text-[#09090F]/50 mt-0.5 truncate">{event.meta}</p>
                  </div>

                  <ArrowRight size={13} className="text-[#09090F]/25 group-hover:text-[#E8622A] group-hover:translate-x-1.5 transition-all duration-150 shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* From the content hub */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#09090F]/40">
                From the content hub
              </h3>
              <Link href="/content-hub" className="group text-xs text-[#E8622A] flex items-center gap-1 font-medium hover:gap-1.5 transition-all duration-150">
                All articles <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-150" />
              </Link>
            </div>
            <div className="space-y-2">
              {articles.map((article) => {
                const Icon = article.icon;
                return (
                  <Link
                    key={article.title}
                    href="/content-hub"
                    className="group bg-white rounded-xl p-4 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {/* Icon block — same size as date block */}
                    <div className="w-12 h-12 shrink-0 rounded-lg bg-[#F4F1EA] flex items-center justify-center group-hover:bg-[#E8622A]/10 transition-colors">
                      <Icon size={16} className="text-[#09090F]/50 group-hover:text-[#E8622A] transition-colors" />
                    </div>

                    {/* Divider */}
                    <div className="w-px h-8 bg-[#09090F]/10 shrink-0" />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#09090F] leading-snug line-clamp-2 group-hover:text-[#E8622A] transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-[11px] text-[#09090F]/50 mt-0.5">{article.meta}</p>
                    </div>

                    <ArrowRight size={13} className="text-[#09090F]/25 group-hover:text-[#E8622A] group-hover:translate-x-1.5 transition-all duration-150 shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
