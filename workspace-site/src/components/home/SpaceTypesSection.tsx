import Link from "next/link";
import { Building2, Users, Palette, CalendarDays, ArrowRight } from "lucide-react";

const types = [
  {
    icon: Building2,
    title: "Private Offices",
    desc: "Your floor, your culture. Fully customisable private suites for teams of 2 to 200.",
    href: "/spaces?type=private",
    from: "From £550/desk/month",
    color: "#E8622A",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    icon: Users,
    title: "Coworking",
    desc: "Hot desks and dedicated desks in buzzing shared spaces. Month-to-month, no commitment.",
    href: "/spaces?type=coworking",
    from: "From £250/month",
    color: "#7B9E87",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
  },
  {
    icon: Palette,
    title: "Studios",
    desc: "Purpose-built creative and production studios for photographers, designers and makers.",
    href: "/spaces?type=studio",
    from: "From £400/month",
    color: "#C9A84C",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
  },
  {
    icon: CalendarDays,
    title: "Meeting Rooms",
    desc: "Beautiful, tech-equipped meeting rooms bookable by the hour. Available to members and guests.",
    href: "/meeting-rooms",
    from: "From £25/hour",
    color: "#1C1C2E",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
  },
];

export default function SpaceTypesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">
              Space types
            </p>
            <h2
              className="text-4xl sm:text-5xl text-[#1C1C2E] leading-tight"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
            >
              Find the space
              <br />
              that fits.
            </h2>
          </div>
          <Link
            href="/spaces"
            className="flex items-center gap-2 text-sm font-semibold text-[#E8622A] hover:gap-3 transition-all"
          >
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
                className="group relative overflow-hidden rounded-2xl bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 h-48 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${type.color}15` }}
                  >
                    <Icon size={18} style={{ color: type.color }} />
                  </div>
                  <h3 className="font-semibold text-[#1C1C2E] mb-2">{type.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{type.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold" style={{ color: type.color }}>
                      {type.from}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-gray-300 group-hover:text-[#E8622A] group-hover:translate-x-1 transition-all"
                    />
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
