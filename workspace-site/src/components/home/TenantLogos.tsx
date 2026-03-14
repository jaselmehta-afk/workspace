export default function TenantLogos() {
  const companies = [
    "Transferwise", "Monzo", "Depop", "Bulb Energy", "Babylon Health",
    "Marshmallow", "Nested", "Cleo", "Tide", "Octopus Energy",
  ];

  return (
    <div className="bg-white border-y border-gray-100 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-gray-400">
          Trusted by London&apos;s most ambitious businesses
        </p>
      </div>
      <div className="flex gap-12 animate-none overflow-x-auto scrollbar-hide px-8">
        {[...companies, ...companies].map((company, i) => (
          <div
            key={`${company}-${i}`}
            className="shrink-0 flex items-center justify-center px-4"
          >
            <span className="text-gray-300 font-semibold text-sm tracking-wide whitespace-nowrap hover:text-gray-500 transition-colors cursor-default">
              {company}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
