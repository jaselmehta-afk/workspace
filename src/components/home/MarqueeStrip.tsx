const ITEMS = [
  "Flexible contracts",
  "Prime London locations",
  "Monthly rolling",
  "60+ buildings",
  "Space to grow",
  "No fit-out costs",
  "Move in this month",
  "Thriving community",
  "35 years in London",
  "No hidden fees",
];

export default function MarqueeStrip({ dark = false }: { dark?: boolean }) {
  const items = [...ITEMS, ...ITEMS]; // duplicate for seamless loop

  return (
    <div className={`overflow-hidden py-4 border-y ${dark ? "bg-[#09090F] border-white/[0.06]" : "bg-[#E8622A] border-[#E8622A]"}`}>
      <div className="flex gap-0 animate-marquee whitespace-nowrap select-none">
        {items.map((item, i) => (
          <span key={i} className={`inline-flex items-center gap-4 px-6 text-sm font-semibold tracking-[0.12em] uppercase ${dark ? "text-white/50" : "text-white/85"}`}>
            {item}
            <span className={`w-1 h-1 rounded-full shrink-0 ${dark ? "bg-white/25" : "bg-white/50"}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
