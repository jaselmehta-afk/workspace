"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Sparkles, Mic, MicOff, ChevronDown, Clock } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { spaces } from "@/data/spaces";

const VERBS = ["grow.", "think.", "build.", "thrive."];

const EXAMPLES = [
  "A creative studio for 12 people in East London…",
  "Quiet private office near London Bridge with bike storage…",
  "Coworking space in Shoreditch for a small scrappy team…",
  "Somewhere characterful in Chiswick for 30 people…",
  "A big event space in South London with great transport…",
];

const QUICK = [
  { label: "Private offices", q: "private office" },
  { label: "Coworking", q: "coworking" },
  { label: "Creative studios", q: "creative studio" },
  { label: "East London", q: "east london" },
  { label: "South London", q: "south london" },
];

function parse(q: string) {
  const s = q.toLowerCase();
  const p: Record<string, string> = {};
  const m = s.match(/(\d+)\s*(people|person|desk|desks|team|staff)/);
  if (m) { const n = +m[1]; p.size = n <= 5 ? "1-5" : n <= 15 ? "6-15" : n <= 50 ? "16-50" : "51+"; }
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

function getTimeOfDayOverlay(): { gradient: string; accent: string; label: string } {
  const h = new Date().getHours();
  if (h >= 5 && h < 9) {
    return {
      gradient: "linear-gradient(to bottom, rgba(120,60,20,0.65) 0%, rgba(9,9,15,0.25) 50%, rgba(9,9,15,0.70) 100%)",
      accent: "rgba(232,120,42,0.18)", label: "Good morning",
    };
  }
  if (h >= 9 && h < 17) {
    return {
      gradient: "linear-gradient(to bottom, rgba(9,9,15,0.72) 0%, rgba(9,9,15,0.22) 50%, rgba(9,9,15,0.68) 100%)",
      accent: "rgba(123,158,135,0.10)", label: "",
    };
  }
  if (h >= 17 && h < 21) {
    return {
      gradient: "linear-gradient(to bottom, rgba(80,30,10,0.72) 0%, rgba(20,10,5,0.28) 50%, rgba(9,9,15,0.80) 100%)",
      accent: "rgba(200,80,40,0.20)", label: "Good evening",
    };
  }
  return {
    gradient: "linear-gradient(to bottom, rgba(10,8,30,0.82) 0%, rgba(9,9,15,0.30) 50%, rgba(9,9,15,0.85) 100%)",
    accent: "rgba(60,40,120,0.20)", label: "Working late?",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SR = new () => any;

export default function HeroSection() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorBlobRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const [query, setQuery] = useState("");
  const [ph, setPh] = useState("");
  const [ei, setEi] = useState(0);
  const [ci, setCi] = useState(0);
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState<"idle" | "thinking">("idle");
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(() => {
    if (typeof window === "undefined") return false;
    const w = window as Window & { SpeechRecognition?: SR; webkitSpeechRecognition?: SR };
    return !!(w.SpeechRecognition || w.webkitSpeechRecognition);
  });
  const [timeOverlay, setTimeOverlay] = useState<ReturnType<typeof getTimeOfDayOverlay> | null>(() =>
    typeof window !== "undefined" ? getTimeOfDayOverlay() : null
  );
  const [verbIdx, setVerbIdx] = useState(0);
  const [verbPhase, setVerbPhase] = useState<"in" | "out">("in");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("ws_recent_queries") || "[]"); } catch { return []; }
  });

  // Cursor-reactive warm blob
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const blob = cursorBlobRef.current;
      if (!blob) return;
      const rect = blob.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      blob.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(232,98,42,0.07) 0%, transparent 42%)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);


  // Verb cycling
  useEffect(() => {
    const t = setTimeout(() => {
      setVerbPhase("out");
      setTimeout(() => { setVerbIdx(i => (i + 1) % VERBS.length); setVerbPhase("in"); }, 320);
    }, 2800);
    return () => clearTimeout(t);
  }, [verbIdx]);

  // Typewriter
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

  const go = useCallback((q = query) => {
    if (!q.trim()) return;
    setStatus("thinking");
    setShowSuggestions(false);
    const p = parse(q);
    try { localStorage.setItem("ws_last_search", JSON.stringify({ ...p, timestamp: Date.now() })); } catch {}
    try {
      const stored = JSON.parse(localStorage.getItem("ws_recent_queries") || "[]") as string[];
      const updated = [q, ...stored.filter((s: string) => s !== q)].slice(0, 5);
      localStorage.setItem("ws_recent_queries", JSON.stringify(updated));
      setRecentSearches(updated);
    } catch {}
    setTimeout(() => { router.push(`/spaces?${new URLSearchParams(p)}`); }, 1200);
  }, [query, router]);

  const startVoice = useCallback(() => {
    const w = window as Window & { SpeechRecognition?: SR; webkitSpeechRecognition?: SR };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) return;
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = "en-GB";
    recognition.interimResults = true;
    recognition.continuous = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transcript = Array.from(e.results).map((r: any) => r[0].transcript).join("");
      setQuery(transcript);
      if (e.results[0].isFinal) { setListening(false); setTimeout(() => go(transcript), 400); }
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
    inputRef.current?.focus();
  }, [listening, go]);

  // Autocomplete suggestions with total match count
  const searchResults = useMemo(() => {
    if (!query || query.length < 2) return { hits: [] as typeof spaces, total: 0 };
    const q = query.toLowerCase();
    const all = spaces.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.neighbourhood.toLowerCase().includes(q) ||
      s.postcode.toLowerCase().includes(q)
    );
    return { hits: all.slice(0, 4), total: all.length };
  }, [query]);

  const scrollDown = () => window.scrollBy({ top: window.innerHeight, behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#09090F]">

      {/* ── Background layers ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Warm London workspace interior — characterful, high-ceilinged, natural light */}
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&q=85"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover animate-kenburns hero-parallax-bg"
        />
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{ background: timeOverlay?.gradient ?? "linear-gradient(to bottom, rgba(9,9,15,0.72) 0%, rgba(9,9,15,0.22) 50%, rgba(9,9,15,0.68) 100%)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090F]/55 via-transparent to-[#09090F]/15" />
        {timeOverlay?.accent && (
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${timeOverlay.accent} 0%, transparent 65%)` }}
          />
        )}
        <div ref={cursorBlobRef} className="absolute inset-0 transition-[background] duration-300 ease-out pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat", backgroundSize: "128px 128px",
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E8622A]/30 to-transparent" />
      </div>

      {/* ── Content — centered in the viewport ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 hero-content-scroll pb-16 pt-24">

        {/* Combined status chip */}
        <Link
          href="/spaces?filter=new"
          className="inline-flex items-center gap-2.5 mb-10 px-4 py-2 glass rounded-full text-sm text-white/70 hover:text-white transition-all duration-300 hover:border-white/20 group animate-fade-up"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7B9E87] animate-pulse shrink-0" />
          <span className="text-white/50 font-normal">60+ buildings · London</span>
          <span className="w-px h-3 bg-white/20 shrink-0" />
          3 new spaces this month
          <ArrowRight size={11} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </Link>

        {/* Time greeting — inline, very subtle */}
        {timeOverlay?.label && (
          <p className="text-xs text-white/55 tracking-[0.2em] uppercase mb-4 animate-fade-up">
            {timeOverlay.label}
          </p>
        )}

        {/* ── Headline ── */}
        <div className="max-w-5xl mb-9 overflow-hidden text-center">
          <h1 className="text-white leading-[0.9] tracking-[-0.04em]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            <span className="block text-[clamp(60px,9.5vw,120px)] font-light word-up" style={{ animationDelay: "0.08s" }}>
              Space to
            </span>
            <span className="block text-[clamp(70px,11vw,144px)] font-bold word-up" style={{ animationDelay: "0.18s" }}>
              <span
                className={`inline-block ${verbPhase === "in" ? "verb-in" : "verb-out"}`}
                style={{
                  background: "linear-gradient(115deg, #E8622A 0%, #f5935a 40%, #E8622A 80%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {VERBS[verbIdx]}
              </span>
            </span>
          </h1>

          <p className="text-white/65 text-lg sm:text-xl mt-6 leading-relaxed word-up" style={{ animationDelay: "0.32s" }}>
            Describe what you need. We&apos;ll find the space.
          </p>
        </div>

        {/* ── Search bar ── */}
        <div className="w-full max-w-2xl word-up" style={{ animationDelay: "0.44s" }}>
          <div className={`relative glass rounded-2xl transition-all duration-300 ${focused ? "glow-orange border-[#E8622A]/25" : ""}`}>
            <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              {status === "thinking"
                ? <div className="w-4 h-4 border-2 border-[#E8622A]/40 border-t-[#E8622A] rounded-full animate-spin" />
                : <Sparkles size={17} className={`transition-colors duration-200 ${focused || query ? "text-[#E8622A]" : "text-white/40"}`} />
              }
            </div>
            <input
              ref={inputRef}
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
              onKeyDown={e => {
                if (e.key === "Enter") go();
                if (e.key === "Escape") setShowSuggestions(false);
              }}
              onFocus={() => { setFocused(true); setShowSuggestions(true); }}
              onBlur={() => { setFocused(false); setTimeout(() => setShowSuggestions(false), 150); }}
              placeholder={focused ? "Describe your ideal workspace…" : ph || "Describe your ideal workspace…"}
              disabled={status === "thinking"}
              aria-label="Describe your ideal workspace"
              className="w-full bg-transparent text-white placeholder-white/40 text-base sm:text-lg py-[18px] pl-14 pr-44 focus:outline-none rounded-2xl disabled:opacity-60"
            />
            {voiceSupported && (
              <button
                onClick={startVoice}
                aria-label={listening ? "Stop listening" : "Search by voice"}
                disabled={status === "thinking"}
                className={`absolute right-[7.5rem] top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200
                  ${listening ? "bg-[#E8622A]/20 text-[#E8622A] animate-pulse" : "text-white/50 hover:text-white/80 hover:bg-white/[0.06]"}
                  disabled:opacity-30`}
              >
                {listening ? <MicOff size={15} /> : <Mic size={15} />}
              </button>
            )}
            <MagneticButton
              onClick={() => go()}
              disabled={status === "thinking" || !query.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 px-5 py-2.5 bg-[#E8622A] text-white font-semibold text-sm rounded-xl hover:bg-[#d4561e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === "thinking" ? (
                <span className="flex gap-1 items-center px-1">
                  {[0, 120, 240].map(d => <span key={d} className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                </span>
              ) : (
                <>Search <ArrowRight size={14} /></>
              )}
            </MagneticButton>

            {/* Recent searches — shown when focused with no query */}
            {showSuggestions && !query && recentSearches.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden shadow-2xl z-50"
                style={{ background: "rgba(9,9,15,0.97)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(24px)" }}>
                <div className="px-4 py-2.5 border-b border-white/[0.06]">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/35">Recent searches</span>
                </div>
                {recentSearches.map((recent) => (
                  <button
                    key={recent}
                    onMouseDown={() => { setQuery(recent); go(recent); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.05] transition-colors text-left group"
                  >
                    <Clock size={13} className="text-white/30 shrink-0" />
                    <span className="text-white/75 text-sm flex-1 truncate">{recent}</span>
                    <ArrowRight size={12} className="text-white/25 group-hover:text-[#E8622A] transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {/* Autocomplete dropdown — space suggestions + match count */}
            {showSuggestions && query && searchResults.hits.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden shadow-2xl z-50"
                style={{ background: "rgba(9,9,15,0.97)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(24px)" }}>
                {searchResults.hits.map(space => (
                  <button
                    key={space.id}
                    onMouseDown={() => { setQuery(space.name); go(space.name); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.05] transition-colors text-left group"
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                      <img src={space.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">{space.name}</div>
                      <div className="text-white/55 text-xs">{space.neighbourhood} · from £{space.priceFrom.toLocaleString()}/{space.priceUnit}</div>
                    </div>
                    <Link
                      href={`/spaces/${space.slug}`}
                      onMouseDown={e => e.stopPropagation()}
                      className="text-[#E8622A] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowRight size={14} />
                    </Link>
                  </button>
                ))}
                <div className="border-t border-white/[0.06] px-4 py-2.5 flex items-center justify-between">
                  <span className="text-xs text-white/40">
                    {searchResults.total} space{searchResults.total !== 1 ? "s" : ""} match
                  </span>
                  <button
                    onMouseDown={() => go()}
                    className="text-xs text-[#E8622A] font-semibold hover:text-[#f5935a] transition-colors"
                  >
                    View all →
                  </button>
                </div>
              </div>
            )}
          </div>

          {listening && (
            <p className="text-[#E8622A]/90 text-sm mt-3 animate-fade-up pl-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8622A] animate-pulse inline-block" />
              Listening… speak now
            </p>
          )}
          {status === "thinking" && !listening && (
            <p className="text-[#E8622A]/80 text-sm mt-3 animate-fade-up pl-1">✦ Matching spaces…</p>
          )}

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4">
            <span className="text-white/60 text-sm">Try:</span>
            {QUICK.map(({ label, q }) => (
              <button
                key={label}
                onClick={() => { setQuery(q); go(q); }}
                className="text-white/60 text-sm hover:text-white underline-offset-2 hover:underline transition-all duration-200"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        onClick={scrollDown}
        aria-label="Scroll to explore"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/30 hover:text-white/60 transition-colors duration-300 z-10 group"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-white/60 group-hover:text-white/80 transition-colors">
          Explore
        </span>
        <div className="relative w-px h-12 overflow-hidden" style={{ background: "rgba(255,255,255,0.10)" }}>
          <div className="absolute inset-0 w-full bg-white animate-scroll-line" />
        </div>
        <ChevronDown size={14} className="opacity-50" />
      </button>
    </section>
  );
}
