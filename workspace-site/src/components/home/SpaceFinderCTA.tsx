import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function SpaceFinderCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F4]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8622A]/10 rounded-full text-[#E8622A] text-sm font-semibold mb-6">
          <Sparkles size={15} />
          AI Space Finder
        </div>
        <h2
          className="text-4xl sm:text-5xl text-[#1C1C2E] leading-tight mb-6"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
        >
          Not sure where to start?
          <br />
          Let us <span className="italic">find your match.</span>
        </h2>
        <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Answer 4 quick questions about your team, location preference and priorities — and we&apos;ll recommend your ideal Workspace buildings.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/space-finder"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E8622A] text-white font-semibold rounded-xl hover:bg-[#d4561e] transition-colors text-lg"
          >
            Start the quiz <ArrowRight size={18} />
          </Link>
          <Link
            href="/spaces"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1C1C2E] font-semibold rounded-xl border border-gray-200 hover:border-[#E8622A] hover:text-[#E8622A] transition-colors text-lg"
          >
            Browse all spaces
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-6">Takes less than 2 minutes. No commitment required.</p>
      </div>
    </section>
  );
}
