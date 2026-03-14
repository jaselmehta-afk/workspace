import Link from "next/link";
import { Building2, Users, Palette, CalendarDays, ArrowRight } from "lucide-react";

const types = [
  {
    icon: Building2,
    title: "Private Offices",
    desc: "Your floor, your culture. Fully customisable suites for teams of 2 to 200.",
    href: "/spaces?type=private",
    from: "From £550/desk/month",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    icon: Users,
    title: "Coworking",
    desc: "Hot desks and dedicated desks in buzzing shared spaces. Month-to-month.",
    href: "/spaces?type=coworking",
    from: "From £250/month",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
  },
  {
    icon: Palette,
    title: "Studios",
    desc: "Purpose-built creative spaces for photographers, designers and makers.",
    href: "/spaces?type=studio",
    from: "From £400/month",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
  },
  {
    icon: CalendarDays,
    title: "Meeting Rooms",
    desc: "Tech-equipped rooms bookable by the hour. Available to members and guests.",
    href: "/meeting-rooms",
    from: "From £25/hour",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
  },
];

export default function SpaceTypesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">Space types</p>
            <h2
              className="text-4xl sm:text-5xl text-[#09090F] leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300 }}
            >
              Find the space<br />that fits.
            </h2>
          </div>
          <Link href="/spaces" className="flex items-center gap-2 text-sm font-semibold text-[#E8622A] hover:gap-3 transition-all">
            Browse all spaces <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {types.map((type) => {
            const Icon = type.icon;
            return (
              <Link
                key={type.title}
                href={type.href}
                className="group relative overflow-hidden rounded-2xl bg-white hover:shadow-2xl transition-all duration-400 hover:-translate-y-1.5"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                  <div className="absolute top-3 right-3 w-9 h-9 glass rounded-xl flex items-center justify-center">
                    <Icon size={16} className="text-[#E8622A]" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#09090F] mb-1.5 group-hover:text-[#E8622A] transition-colors">{type.title}</h3>
                  <p className="text-sm text-[#09090F]/45 leading-relaxed mb-4">{type.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#E8622A]">{type.from}</span>
                    <ArrowRight size={14} className="text-gray-200 group-hover:text-[#E8622A] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
