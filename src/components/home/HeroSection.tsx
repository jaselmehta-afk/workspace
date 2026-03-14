"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";

const EXAMPLES = [
  "A creative studio for 12 people in East London…",
  "Quiet private office near London Bridge with bike storage…",
  "Coworking space in Shoreditch for a small scrappy team…",
  "Somewhere characterful in Chiswick for 30 people…",
  "A big event space in South London with great transport…",
];

const QUICK = [
  { label: "Private offices", q: "private office" },
  { label: "Coworking", q: "coworking hot desk" },
  { label: "Creative studios", q: "creative studio" },
  { label: "East London", q: "east london" },
  { label: "South London", q: "south london" },
];

function parse(q: string) {
  const s = q.toLowerCase();
  const p: Record<string, string> = {};
  const m = s.match(/(\d+)\s*(people|person|desk|desks|team|staff)/);
  if (m) {
    const n = +m[1];
    p.size = n <= 5 ? "1-5" : n <= 15 ? "6-15" : n <= 50 ? "16-50" : "51+";
  }
  if (/studio|creative|photog|maker/.test(s)) p.type = "studio";
  else if (/cowork|hot.?desk|shared|flex/.test(s)) p.type = "coworking";
  else if (/private|own\s|floor|suite/.test(s)) p.type = "private";
  const areas: [RegExp, string][] = [
    [/shoreditch|clerkenwell|farringdon|central|city of london|ec\d|wc\d/, "central"],
    [/hackney|bow|stratford|bethnal|east london|e\d\b/, "east"],
    [/bermondsey|wandsworth|wimbledon|brixton|clapham|south london|se\d|sw\d\b/, "south"],
    [/chiswick|richmond|hammersmith|fulham|notting|west london|w\d\b/, "west"],
    [/islington|camden|highbury|angel|north london|n\d\b/, "north"],
  ];
  for (const [re, area] of areas) if (re.test(s)) { p.area = area; break; }
  const loc = s.match(/\b(shoreditch|bermondsey|wandsworth|chiswick|richmond|wimbledon|islington|hackney|bow|clerkenwell)\b/);
  if (loc) p.location = loc[1][0].toUpperCase() + loc[1].slice(1);
  return p;
}

export default function HeroSection() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [ph, setPh] = useState("");
  const [ei, setEi] = useState(0);
  const [ci, setCi] = useState(0);
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState<"idle" | "thinking">("idle");

  useEffect(() => {
    if (focused || query) return;
    const ex = EXAMPLES[ei];
    if (ci < ex.length) {
      const t = setTimeout(() => { setPh(ex.slice(0, ci + 1)); setCi(c => c + 1); }, 40);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setCi(0); setEi(i => (i + 1) % EXAMPLES.length); setPh(""); }, 2600);
    return () => clearTimeout(t);
  }, [ci, ei, focused, query]);

  const go = (q = query) => {
    if (!q.trim()) return;
    setStatus("thinking");
    const p = parse(q);
    setTimeout(() => { router.push(`/spaces?${new URLSearchParams(p)}`); }, 1300);
  };

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden mesh-dark">
      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full bg-[#E8622A]/10 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] rounded-full bg-[#7B9E87]/8 blur-[100px] animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "80px 80px"
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-28 text-center">
        {/* Plain label — no card treatment */}
        <p className="text-white/30 text-xs font-medium tracking-widest uppercase mb-10">
          60+ inspiring buildings across London
        </p>

        <h1
          className="text-6xl sm:text-7xl lg:text-[88px] text-white mb-6 leading-[1.0] tracking-[-0.03em]"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
        >
          Space to{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #E8622A 0%, #f0844a 60%, #E8622A 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 600,
            }}
          >grow.</span>
        </h1>

        <p className="text-white/40 text-lg sm:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
          Describe what you need in plain English and we&apos;ll find your perfect London workspace.
        </p>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-5">
          <div className={`relative glass rounded-2xl transition-all duration-300 ${focused ? "glow-orange border-[#E8622A]/25" : ""}`}>
            <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              {status === "thinking"
                ? <div className="w-4 h-4 border-2 border-[#E8622A]/40 border-t-[#E8622A] rounded-full animate-spin" />
                : <Sparkles size={17} className={`transition-colors duration-200 ${focused || query ? "text-[#E8622A]" : "text-white/20"}`} />
              }
            </div>
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && go()}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={focused ? "Describe your ideal workspace…" : ph || "Describe your ideal workspace…"}
              disabled={status === "thinking"}
              className="w-full bg-transparent text-white placeholder-white/25 text-base sm:text-lg py-[18px] pl-14 pr-36 focus:outline-none rounded-2xl disabled:opacity-60"
            />
            <button
              onClick={() => go()}
              disabled={status === "thinking" || !query.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 px-5 py-2.5 bg-[#E8622A] text-white font-semibold text-sm rounded-xl hover:bg-[#d4561e] hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
            >
              {status === "thinking" ? (
                <span className="flex gap-1 items-center px-1">
                  {[0, 120, 240].map(d => (
                    <span key={d} className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </span>
              ) : (
                <>Search <ArrowRight size={14} /></>
              )}
            </button>
          </div>
          {status === "thinking" && (
            <p className="text-[#E8622A]/70 text-sm mt-3 animate-fade-up text-left pl-1">
              ✦ Understanding your query and matching spaces…
            </p>
          )}
        </div>

        {/* Quick links — clearly interactive with underline hover */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          <span className="text-white/20 text-sm self-center">Try:</span>
          {QUICK.map(({ label, q }) => (
            <button
              key={label}
              onClick={() => { setQuery(q); go(q); }}
              className="text-white/45 text-sm hover:text-white underline-offset-2 hover:underline transition-all duration-200"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Inline stats — pure text, clearly non-interactive */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-white/35">
          <div className="text-center">
            <div className="text-2xl font-semibold text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>60+</div>
            <div className="text-xs tracking-wide mt-0.5">London buildings</div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div className="text-center">
            <div className="text-2xl font-semibold text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>4,000+</div>
            <div className="text-xs tracking-wide mt-0.5">Businesses growing</div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div className="text-center">
            <div className="text-2xl font-semibold text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Monthly</div>
            <div className="text-xs tracking-wide mt-0.5">Rolling contracts</div>
          </div>
        </div>
      </div>

      {/* Scroll down arrow */}
      <button
        onClick={scrollDown}
        aria-label="Scroll down to explore spaces"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors duration-300 group"
      >
        <span className="text-[10px] tracking-widest uppercase font-medium">Explore</span>
        <ChevronDown
          size={20}
          className="animate-bounce"
          style={{ animationDuration: "1.8s" }}
        />
      </button>
    </section>
  );
}
