"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen, Mic, Video, Lightbulb, Users, TrendingUp, Play } from "lucide-react";

const categories = [
  { value: "all", label: "All", icon: BookOpen },
  { value: "story", label: "Member Stories", icon: Users },
  { value: "insight", label: "Insights", icon: Lightbulb },
  { value: "podcast", label: "Podcast", icon: Mic },
  { value: "video", label: "Video", icon: Video },
  { value: "news", label: "News", icon: TrendingUp },
];

const articles = [
  {
    id: "1",
    title: "How Depop built a global marketplace from a Shoreditch studio",
    excerpt: "When Depop first took an office at Central House in 2016, they had 20 employees and a big idea. Eight years later, they'd sold to Etsy for $1.6 billion.",
    category: "story",
    readTime: "8 min read",
    date: "10 Mar 2026",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    featured: true,
    author: { name: "The Workspace Team", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&q=80" },
  },
  {
    id: "2",
    title: "The case for flexible leases: why London's smartest businesses are rethinking real estate",
    excerpt: "A traditional 10-year lease made sense in 2005. Today, the world's fastest-growing companies are choosing flexibility over permanence.",
    category: "insight",
    readTime: "6 min read",
    date: "5 Mar 2026",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    featured: false,
    author: { name: "Emma Richardson", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&q=80" },
  },
  {
    id: "3",
    title: "Episode 48: The future of work with Dr. Grace Chen, Head of Future of Work at McKinsey",
    excerpt: "Why the companies winning the talent war are the ones who've mastered the art of intentional office design.",
    category: "podcast",
    readTime: "42 min listen",
    date: "1 Mar 2026",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
    featured: false,
    author: { name: "The London Business Podcast", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&q=80" },
  },
  {
    id: "4",
    title: "Inside Marshmallow's transformation from startup to unicorn",
    excerpt: "The insurance startup went from 5 people in a hot-desk to 350 people across three floors. This is their office story.",
    category: "story",
    readTime: "7 min read",
    date: "25 Feb 2026",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    featured: false,
    author: { name: "James Park", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80" },
  },
  {
    id: "5",
    title: "10 ways to design an office that makes your team never want to leave",
    excerpt: "The best offices aren't just beautiful — they're functional, human, and filled with intention.",
    category: "insight",
    readTime: "5 min read",
    date: "20 Feb 2026",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    featured: false,
    author: { name: "Alex Torres", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&q=80" },
  },
  {
    id: "6",
    title: "Video tour: The Light Bulb, Wandsworth",
    excerpt: "Take an exclusive tour of one of our most beloved buildings and meet some of the businesses that call it home.",
    category: "video",
    readTime: "4 min watch",
    date: "15 Feb 2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    featured: false,
    author: { name: "The Workspace Team", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&q=80" },
  },
];

// Visual treatment config per category
const cardTheme: Record<string, {
  bg: string;
  label: string;
  labelBg: string;
  titleColor: string;
  bodyColor: string;
  borderColor: string;
}> = {
  story: {
    bg: "bg-white",
    label: "Member story",
    labelBg: "bg-[#E8622A]/10 text-[#E8622A]",
    titleColor: "text-[#09090F]",
    bodyColor: "text-gray-400",
    borderColor: "border-gray-100",
  },
  insight: {
    bg: "bg-[#F4F1EA]",
    label: "Insight",
    labelBg: "bg-[#09090F]/8 text-[#09090F]/60",
    titleColor: "text-[#09090F]",
    bodyColor: "text-[#09090F]/45",
    borderColor: "border-[#09090F]/[0.06]",
  },
  podcast: {
    bg: "bg-[#09090F]",
    label: "Podcast",
    labelBg: "bg-white/10 text-white/70",
    titleColor: "text-white",
    bodyColor: "text-white/40",
    borderColor: "border-white/[0.08]",
  },
  video: {
    bg: "bg-white",
    label: "Video",
    labelBg: "bg-[#E8622A]/10 text-[#E8622A]",
    titleColor: "text-[#09090F]",
    bodyColor: "text-gray-400",
    borderColor: "border-gray-100",
  },
  news: {
    bg: "bg-white",
    label: "News",
    labelBg: "bg-[#C9A84C]/15 text-[#C9A84C]",
    titleColor: "text-[#09090F]",
    bodyColor: "text-gray-400",
    borderColor: "border-gray-100",
  },
};

const categoryIconMap: Record<string, React.ReactNode> = {
  story: <Users size={12} />,
  insight: <Lightbulb size={12} />,
  podcast: <Mic size={12} />,
  video: <Video size={12} />,
  news: <TrendingUp size={12} />,
};

export default function ContentHubPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = articles.filter((a) => activeCategory === "all" || a.category === activeCategory);
  const featured = articles.find((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      {/* Header */}
      <div className="bg-[#09090F] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">Content hub</p>
          <h1
            className="text-4xl sm:text-5xl text-white mb-4 font-light"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Stories, insights and ideas
            <br />
            <span className="italic">for London&apos;s builders.</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.value
                    ? "bg-[#E8622A] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={14} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Featured article */}
        {activeCategory === "all" && featured && (
          <Link href="#" className="block bg-white rounded-2xl overflow-hidden mb-8 hover:shadow-xl transition-all group cursor-pointer">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-[#E8622A]/10 text-[#E8622A] text-xs rounded-full font-semibold">
                    {categoryIconMap[featured.category]}
                    Featured
                  </span>
                  <span className="text-xs text-gray-400">{featured.date}</span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl text-[#09090F] mb-4 leading-snug font-light"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  {featured.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6 text-sm">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={featured.author.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-medium text-[#09090F]">{featured.author.name}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[#E8622A] font-semibold text-sm group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Article grid — equal height, category-specific treatment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {rest.map((article) => {
            const theme = cardTheme[article.category] ?? cardTheme.story;
            const isVideo = article.category === "video";
            const isPodcast = article.category === "podcast";
            const isInsight = article.category === "insight";

            return (
              <Link
                key={article.id}
                href="#"
                className={`flex flex-col rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer h-full ${theme.bg}`}
              >
                {/* Image — all categories have an image except insight which gets text treatment */}
                {isInsight ? (
                  /* Insight: text-only header block */
                  <div className="h-44 flex items-end p-6 bg-[#E8E4DA] relative overflow-hidden">
                    <div
                      className="absolute top-5 right-5 text-[80px] font-bold leading-none select-none pointer-events-none"
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        color: "rgba(9,9,15,0.06)",
                      }}
                    >
                      →
                    </div>
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${theme.labelBg}`}>
                      {categoryIconMap[article.category]}
                      {theme.label}
                    </span>
                  </div>
                ) : (
                  <div className="relative h-44 overflow-hidden shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          <Play size={16} className="text-[#09090F] ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    )}
                    {isPodcast && (
                      /* Dark overlay on podcast cards */
                      <div className="absolute inset-0 bg-[#09090F]/50" />
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Label + read time */}
                  <div className="flex items-center gap-2 mb-3">
                    {!isInsight && (
                      <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${theme.labelBg}`}>
                        {categoryIconMap[article.category]}
                        {theme.label}
                      </span>
                    )}
                    <span className={`flex items-center gap-1 text-xs ${isPodcast ? "text-white/35" : "text-gray-400"}`}>
                      <Clock size={10} />{article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-semibold leading-snug mb-2 ${theme.titleColor} group-hover:text-[#E8622A] transition-colors`}
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className={`text-xs leading-relaxed line-clamp-2 mb-4 flex-1 ${theme.bodyColor}`}>
                    {article.excerpt}
                  </p>

                  {/* Footer — always at bottom */}
                  <div className={`flex items-center justify-between pt-3 border-t mt-auto ${theme.borderColor}`}>
                    <div className="flex items-center gap-2">
                      <img src={article.author.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                      <span className={`text-xs ${isPodcast ? "text-white/35" : "text-gray-400"}`}>{article.date}</span>
                    </div>
                    <ArrowRight
                      size={14}
                      className={`${isPodcast ? "text-white/20" : "text-gray-300"} group-hover:text-[#E8622A] transition-colors`}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load more */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:border-[#E8622A] hover:text-[#E8622A] transition-colors">
            Load more articles
          </button>
        </div>
      </div>
    </div>
  );
}
