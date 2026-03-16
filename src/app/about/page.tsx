import Link from "next/link";
import { ArrowRight, Leaf, Building2, Users2, TrendingUp } from "lucide-react";

const timeline = [
  { year: "1987", event: "Workspace founded to manage the Greater London Council's industrial property portfolio" },
  { year: "1993", event: "First major refurbishment programme begins, transforming industrial buildings into inspiring offices" },
  { year: "2000", event: "Listed on the London Stock Exchange, joining the FTSE SmallCap index" },
  { year: "2010", event: "Strategic pivot to creative and technology businesses — the future of London's economy" },
  { year: "2015", event: "Joined FTSE 250 as portfolio expands past 3 million sq ft" },
  { year: "2020", event: "Launched ESG roadmap with net-zero commitment and community investment fund" },
  { year: "2024", event: "Over 60 buildings, 4,000+ businesses, and London's most characterful office portfolio" },
];

const values = [
  {
    icon: Building2,
    title: "Space with soul",
    desc: "We believe the best offices have character, history and personality. We seek out buildings with stories and make them exceptional places to work.",
  },
  {
    icon: Users2,
    title: "Community first",
    desc: "Our tenants are partners, not just customers. We invest in community, events and connections because we know great things happen when people come together.",
  },
  {
    icon: TrendingUp,
    title: "Freedom to grow",
    desc: "Flexible contracts, customisable spaces and honest pricing give businesses the freedom to grow at their own pace — without the constraints of traditional leases.",
  },
  {
    icon: Leaf,
    title: "Built for tomorrow",
    desc: "We're committed to making Workspace the most sustainable office portfolio in London — because the businesses of the future need spaces that think about the future.",
  },
];

const team = [
  { name: "Graham Clemett", role: "Chief Executive Officer", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80" },
  { name: "Dave Benson", role: "Chief Financial Officer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
  { name: "Chris Pieroni", role: "Chief Operating Officer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { name: "Amanda Lim", role: "Chief People Officer", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80" },
];

export const metadata = {
  title: "About Workspace — Our Story and Mission",
  description: "Learn about Workspace Group, London's premier flexible office space provider — our history, values, and commitment to London's business community.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      {/* Hero */}
      <div className="relative bg-[#09090F] pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-[#E8622A] to-transparent rounded-bl-[200px]" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">Our story</p>
          <h1
            className="text-5xl sm:text-6xl text-white mb-6 max-w-3xl font-light leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            We give London&apos;s best
            <br />
            businesses <span className="italic">space to thrive.</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl leading-relaxed">
            Since 1987, we&apos;ve been transforming London&apos;s most characterful buildings into inspiring homes for ambitious businesses. Over 35 years, we&apos;ve become the city&apos;s leading flexible office provider — but our purpose has never changed.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">What we believe</p>
            <h2 className="text-4xl sm:text-5xl text-[#09090F] font-light" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Our values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="flex gap-5 p-6 bg-[#F4F1EA] rounded-2xl">
                  <div className="w-12 h-12 bg-[#E8622A]/10 rounded-xl flex items-center justify-center text-[#E8622A] shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#09090F] text-lg mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{v.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F1EA]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">Our history</p>
            <h2 className="text-4xl sm:text-5xl text-[#09090F] font-light" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              35+ years in London
            </h2>
          </div>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex items-start gap-0">
                {/* Year label */}
                <div className="w-16 shrink-0 text-right pr-4 pt-1.5">
                  <span className="font-bold text-[#E8622A] text-sm">{item.year}</span>
                </div>

                {/* Dot + vertical connector */}
                <div className="shrink-0 flex flex-col items-center w-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E8622A] ring-4 ring-[#F4F1EA] shrink-0 mt-1.5" />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-[#09090F]/10 mt-1 min-h-[2.5rem]" />
                  )}
                </div>

                {/* Content card */}
                <div className="flex-1 pl-5 pb-7">
                  <div className="bg-white rounded-xl px-5 py-4 shadow-sm">
                    <p className="text-sm text-[#09090F]/65 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">Leadership</p>
            <h2 className="text-4xl sm:text-5xl text-[#09090F] font-light" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              The team
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-[#09090F]">{member.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investors & ESG */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090F]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl text-white mb-4 font-light" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Investor relations</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Workspace Group plc is listed on the London Stock Exchange and is a constituent of the FTSE 250 Index. We are committed to transparent reporting and long-term value creation for our shareholders.
            </p>
            <a href="#" className="flex items-center gap-2 text-[#E8622A] font-semibold text-sm hover:gap-3 transition-all">
              Investor portal <ArrowRight size={14} />
            </a>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl text-white mb-4 font-light" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Sustainability</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Our ESG programme covers carbon reduction, biodiversity, active travel, community investment and supply chain ethics. Read our latest sustainability report.
            </p>
            <Link href="/about/sustainability" className="flex items-center gap-2 text-[#7B9E87] font-semibold text-sm hover:gap-3 transition-all">
              ESG report <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
