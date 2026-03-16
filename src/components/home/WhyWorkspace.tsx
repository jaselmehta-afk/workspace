import { FileText, Hammer, MapPin, Users2 } from "lucide-react";

const reasons = [
  {
    icon: FileText,
    title: "Flexible contracts",
    desc: "Start with a monthly agreement and scale up when you're ready. No lengthy leases, no hidden fees, no small print.",
    color: "#E8622A",
    accent: "border-t-2 border-[#E8622A]",
  },
  {
    icon: Hammer,
    title: "Make it yours",
    desc: "Unlike most providers, we encourage you to customise your space completely — paint the walls, rebrand the doors, transform it.",
    color: "#7B9E87",
    accent: "border-t-2 border-[#7B9E87]",
  },
  {
    icon: MapPin,
    title: "Prime London locations",
    desc: "60+ buildings in London's most exciting neighbourhoods. From Shoreditch to Richmond, Bermondsey to Chiswick.",
    color: "#C9A84C",
    accent: "border-t-2 border-[#C9A84C]",
  },
  {
    icon: Users2,
    title: "A thriving community",
    desc: "Join 4,000+ businesses, connect at events, collaborate in communal spaces, and tap into a network of London's best.",
    color: "#E8622A",
    accent: "border-t-2 border-[#E8622A]",
  },
];

export default function WhyWorkspace() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">
            Why Workspace
          </p>
          <h2
            className="text-4xl sm:text-5xl text-[#09090F] leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
          >
            Not just an office.
            <br />
            A home for your business.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className={`rounded-2xl p-8 flex gap-6 bg-white ${reason.accent}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-1"
                  style={{ backgroundColor: `${reason.color}15` }}
                >
                  <Icon size={22} style={{ color: reason.color }} />
                </div>
                <div>
                  <h3
                    className="font-semibold text-xl mb-3 text-[#09090F]"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#09090F]/60">
                    {reason.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
