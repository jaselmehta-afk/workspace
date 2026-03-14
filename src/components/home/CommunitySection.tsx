import Link from "next/link";
import { Calendar, ArrowRight, Mic, BookOpen, Lightbulb } from "lucide-react";

const events = [
  {
    title: "Startup Pitch Night",
    date: "18 Mar 2026",
    location: "Central House, Shoreditch",
    category: "Networking",
    attendees: 120,
  },
  {
    title: "Female Founders Brunch",
    date: "22 Mar 2026",
    location: "The Light Bulb, Wandsworth",
    category: "Community",
    attendees: 45,
  },
  {
    title: "Growth Marketing Masterclass",
    date: "1 Apr 2026",
    location: "Leather Exchange, Bermondsey",
    category: "Workshop",
    attendees: 60,
  },
];

const articles = [
  {
    title: "How Depop built a global marketplace from a Shoreditch studio",
    category: "Member Story",
    readTime: "5 min read",
    icon: BookOpen,
  },
  {
    title: "The case for flexible leases: why London's best businesses are rethinking real estate",
    category: "Insight",
    readTime: "7 min read",
    icon: Lightbulb,
  },
  {
    title: "Episode 42: Building culture in a remote-first world",
    category: "Podcast",
    readTime: "38 min listen",
    icon: Mic,
  },
];

export default function CommunitySection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">
            Community & content
          </p>
          <h2
            className="text-4xl sm:text-5xl text-[#09090F] leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
          >
            More than a desk.
            <br />A community.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-[#09090F] text-lg flex items-center gap-2">
                <Calendar size={18} className="text-[#E8622A]" />
                Upcoming events
              </h3>
              <Link href="/community/events" className="text-sm text-[#E8622A] hover:underline flex items-center gap-1">
                All events <ArrowRight size={13} />
              </Link>
            </div>
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.title}
                  className="bg-white rounded-xl p-5 flex gap-4 transition-shadow"
                >
                  <div className="text-center min-w-[3rem]">
                    <div className="text-xs text-gray-400 font-medium">
                      {event.date.split(" ")[1]}
                    </div>
                    <div className="text-2xl font-bold text-[#09090F]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {event.date.split(" ")[0]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 bg-[#E8622A]/10 text-[#E8622A] rounded-full font-medium">
                        {event.category}
                      </span>
                      <span className="text-xs text-gray-400">{event.attendees} attending</span>
                    </div>
                    <h4 className="font-semibold text-[#09090F] text-sm transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Articles */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-[#09090F] text-lg flex items-center gap-2">
                <BookOpen size={18} className="text-[#E8622A]" />
                From the content hub
              </h3>
              <Link href="/content-hub" className="text-sm text-[#E8622A] hover:underline flex items-center gap-1">
                All articles <ArrowRight size={13} />
              </Link>
            </div>
            <div className="space-y-3">
              {articles.map((article) => {
                const Icon = article.icon;
                return (
                  <div
                    key={article.title}
                    className="bg-white rounded-xl p-5 flex gap-4 transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#F4F1EA] flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#E8622A]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs px-2 py-0.5 bg-[#09090F]/5 text-[#09090F]/60 rounded-full font-medium">
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-400">{article.readTime}</span>
                      </div>
                      <h4 className="font-semibold text-[#09090F] text-sm leading-snug transition-colors">
                        {article.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
