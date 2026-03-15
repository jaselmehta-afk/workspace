"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, ChevronDown, Mic, MicOff } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

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

/** Returns a subtle overlay tint that shifts with the time of day */
function getTimeOfDayOverlay(): { gradient: string; accent: string; label: string } {
  const h = new Date().getHours();
  if (h >= 5 && h < 9) {
    // Dawn — warm amber blush
    return {
      gradient: "linear-gradient(to bottom, rgba(120,60,20,0.65) 0%, rgba(9,9,15,0.25) 50%, rgba(9,9,15,0.70) 100%)",
      accent: "rgba(232,120,42,0.18)",
      label: "Good morning",
    };
  }
  if (h >= 9 && h < 17) {
    // Daytime — neutral, architectural
    return {
      gradient: "linear-gradient(to bottom, rgba(9,9,15,0.72) 0%, rgba(9,9,15,0.22) 50%, rgba(9,9,15,0.68) 100%)",
      accent: "rgba(123,158,135,0.10)",
      label: "",
    };
  }
  if (h >= 17 && h < 21) {
    // Dusk — amber-rose
    return {
      gradient: "linear-gradient(to bottom, rgba(80,30,10,0.72) 0%, rgba(20,10,5,0.28) 50%, rgba(9,9,15,0.80) 100%)",
      accent: "rgba(200,80,40,0.20)",
      label: "Good evening",
    };
  }
  // Night — deep indigo
  return {
    gradient: "linear-gradient(to bottom, rgba(10,8,30,0.82) 0%, rgba(9,9,15,0.30) 50%, rgba(9,9,15,0.85) 100%)",
    accent: "rgba(60,40,120,0.20)",
    label: "Working late?",
  };
}

// Extend window for webkit speech
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export default function HeroSection() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const [query, setQuery] = useState("");
  const [ph, setPh] = useState("");
  const [ei, setEi] = useState(0);
  const [ci, setCi] = useState(0);
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState<"idle" | "thinking">("idle");
  const [returning, setReturning] = useState<{ area: string; type: string } | null>(null);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [timeOverlay, setTimeOverlay] = useState<ReturnType<typeof getTimeOfDayOverlay> | null>(null);

  // Returning visitor personalisation
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ws_last_search");
      if (saved) {
        const parsed = JSON.parse(saved);
        const age = Date.now() - (parsed.timestamp || 0);
        if (age < 7 * 24 * 60 * 60 * 1000 && (parsed.area || parsed.type)) {
          setReturning({ area: parsed.area || "", type: parsed.type || "" });
        }
      }
    } catch {}

    // Check voice support
    setVoiceSupported(!!(window.SpeechRecognition || window.webkitSpeechRecognition));

    // Time-of-day overlay (client-side only to avoid hydration mismatch)
    setTimeOverlay(getTimeOfDayOverlay());
  }, []);

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
    const p = parse(q);
    try { localStorage.setItem("ws_last_search", JSON.stringify({ ...p, timestamp: Date.now() })); } catch {}
    setTimeout(() => { router.push(`/spaces?${new URLSearchParams(p)}`); }, 1200);
  }, [query, router]);

  const startVoice = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = "en-GB";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = Array.from(e.results)
        .map(r => r[0].transcript)
        .join("");
      setQuery(transcript);
      if (e.results[0].isFinal) {
        setListening(false);
        // Short pause then search
        setTimeout(() => go(transcript), 400);
      }
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
    inputRef.current?.focus();
  }, [listening, go]);

  const scrollDown = () => window.scrollBy({ top: window.innerHeight, behavior: "smooth" });

  const returningLabel = returning
    ? [
        returning.type ? returning.type.charAt(0).toUpperCase() + returning.type.slice(1) : "",
        returning.area ? returning.area.charAt(0).toUpperCase() + returning.area.slice(1) + " London" : "",
      ].filter(Boolean).join(" · ")
    : "";

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#09090F]">
      {/* Cinematic background with Ken Burns + scroll parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover animate-kenburns hero-parallax-bg"
        />
        {/* Time-of-day gradient overlay — updates based on local hour */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{ background: timeOverlay?.gradient ?? "linear-gradient(to bottom, rgba(9,9,15,0.72) 0%, rgba(9,9,15,0.22) 50%, rgba(9,9,15,0.68) 100%)" }}
        />
        {/* Directional overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090F]/60 via-transparent to-transparent" />
        {/* Time accent blush */}
        {timeOverlay?.accent && (
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${timeOverlay.accent} 0%, transparent 65%)` }}
          />
        )}
        {/* Subtle noise grain */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat", backgroundSize: "128px 128px" }} />
      </div>

      {/* Content — scroll-exits as you scroll down */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 mt-16 hero-content-scroll">

        {/* Time-of-day greeting */}
        {timeOverlay?.label && (
          <div className="mb-4 inline-flex items-center gap-2 text-xs text-white/30 animate-fade-up">
            <span className="w-1 h-1 rounded-full bg-white/30 inline-block" />
            {timeOverlay.label}
          </div>
        )}

        {/* Returning visitor banner */}
        {returning && (
          <div className="mb-8 inline-flex items-center gap-2 text-xs text-white/50 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B9E87] inline-block" />
            Welcome back — still searching for {returningLabel}?{" "}
            <button
              onClick={() => router.push(`/spaces?area=${returning.area}&type=${returning.type}`)}
              className="text-white/80 underline underline-offset-2 hover:text-white transition-colors"
            >
              See those spaces
            </button>
          </div>
        )}

        {/* Headline */}
        <div className="max-w-4xl mb-10">
          <p className="text-white/30 text-[11px] font-medium tracking-[0.2em] uppercase mb-6">
            60+ buildings across London
          </p>
          <h1
            className="text-white leading-[0.92] tracking-[-0.04em]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            <span className="block text-[clamp(64px,10vw,130px)] font-light">Space to</span>
            <span
              className="block text-[clamp(72px,11.5vw,148px)] font-bold"
              style={{
                background: "linear-gradient(110deg, #E8622A 0%, #f5935a 45%, #E8622A 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              grow.
            </span>
          </h1>

          <p className="text-white/65 text-lg sm:text-xl mt-6 max-w-md leading-relaxed">
            Describe what you need. We&apos;ll find the space.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl">
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
              aria-label="Describe your ideal workspace"
              className="w-full bg-transparent text-white placeholder-white/25 text-base sm:text-lg py-[18px] pl-14 pr-44 focus:outline-none rounded-2xl disabled:opacity-60"
            />

            {/* Voice button */}
            {voiceSupported && (
              <button
                onClick={startVoice}
                aria-label={listening ? "Stop listening" : "Search by voice"}
                disabled={status === "thinking"}
                className={`absolute right-[7.5rem] top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200
                  ${listening
                    ? "bg-[#E8622A]/20 text-[#E8622A] animate-pulse"
                    : "text-white/25 hover:text-white/60 hover:bg-white/[0.06]"
                  } disabled:opacity-30`}
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
          </div>

          {/* Voice listening indicator */}
          {listening && (
            <p className="text-[#E8622A]/80 text-sm mt-3 animate-fade-up pl-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8622A] animate-pulse inline-block" />
              Listening… speak now
            </p>
          )}

          {status === "thinking" && !listening && (
            <p className="text-[#E8622A]/70 text-sm mt-3 animate-fade-up pl-1">✦ Matching spaces…</p>
          )}

          {/* Quick links */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
            <span className="text-white/20 text-sm">Try:</span>
            {QUICK.map(({ label, q }) => (
              <button
                key={label}
                onClick={() => { setQuery(q); go(q); }}
                className="text-white/40 text-sm hover:text-white underline-offset-2 hover:underline transition-all duration-200"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Inline stats */}
        <div className="flex flex-wrap items-center gap-8 mt-12 text-white/25">
          {[
            { n: "60+", label: "buildings" },
            { n: "4,000+", label: "businesses" },
            { n: "£550", label: "from/desk/mo" },
          ].map(({ n, label }, i) => (
            <div key={label} className="flex items-baseline gap-2">
              {i > 0 && <div className="w-px h-4 bg-white/10 mr-6" />}
              <span className="text-white text-xl font-semibold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{n}</span>
              <span className="text-xs tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll arrow */}
      <button
        onClick={scrollDown}
        aria-label="Scroll to explore"
        className="absolute bottom-8 right-8 flex flex-col items-center gap-1.5 text-white/20 hover:text-white/50 transition-colors duration-300 z-10"
      >
        <span className="text-[9px] tracking-[0.2em] uppercase font-medium rotate-90 mb-1">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" style={{ animationDuration: "2s" }} />
      </button>
    </section>
  );
}
