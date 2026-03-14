"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, Building2, Briefcase, Star } from "lucide-react";

const enquiryTypes = [
  { value: "space", label: "Finding a space", icon: Building2 },
  { value: "meeting", label: "Meeting rooms", icon: Clock },
  { value: "general", label: "General enquiry", icon: MessageSquare },
  { value: "press", label: "Press & media", icon: Star },
  { value: "careers", label: "Careers", icon: Briefcase },
];

export default function ContactPage() {
  const [enquiryType, setEnquiryType] = useState("space");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      {/* Header */}
      <div className="bg-[#09090F] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#E8622A] mb-3">Get in touch</p>
          <h1
            className="text-4xl sm:text-5xl text-white mb-4 font-light"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            We&apos;d love to hear
            <br />
            <span className="italic">from you.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Whether you&apos;re looking for your first office or expanding for the tenth time — our team is here to help you find the right space.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-[#09090F] mb-4">Contact us directly</h3>
                <div className="space-y-4">
                  <a href="tel:02071383307" className="flex items-start gap-3 group">
                    <div className="w-9 h-9 bg-[#E8622A]/10 rounded-lg flex items-center justify-center text-[#E8622A] shrink-0 mt-0.5">
                      <Phone size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5">Phone</div>
                      <div className="font-semibold text-[#09090F] group-hover:text-[#E8622A] transition-colors">020 7138 3307</div>
                      <div className="text-xs text-gray-400">Mon–Fri, 9am–6pm</div>
                    </div>
                  </a>
                  <a href="mailto:hello@workspace.co.uk" className="flex items-start gap-3 group">
                    <div className="w-9 h-9 bg-[#E8622A]/10 rounded-lg flex items-center justify-center text-[#E8622A] shrink-0 mt-0.5">
                      <Mail size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5">Email</div>
                      <div className="font-semibold text-[#09090F] group-hover:text-[#E8622A] transition-colors text-sm">hello@workspace.co.uk</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[#E8622A]/10 rounded-lg flex items-center justify-center text-[#E8622A] shrink-0 mt-0.5">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5">Head office</div>
                      <div className="text-sm text-[#09090F]">Canterbury Court<br />1–3 Brixton Road<br />London SW9 6DE</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#09090F] rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-3">Need a space urgently?</h3>
                <p className="text-white/60 text-sm mb-4">
                  Our team can usually show you around within 24 hours and get you set up within a week.
                </p>
                <a
                  href="tel:02071383307"
                  className="flex items-center gap-2 px-4 py-3 bg-[#E8622A] text-white font-semibold rounded-xl hover:bg-[#d4561e] transition-colors text-sm"
                >
                  <Phone size={14} />
                  Call us now
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-[#7B9E87]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✓</span>
                </div>
                <h2 className="text-2xl text-[#09090F] mb-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Message received!</h2>
                <p className="text-gray-500 mb-6">Our team will be in touch within 24 hours. In the meantime, feel free to browse our available spaces.</p>
                <a href="/spaces" className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8622A] text-white font-semibold rounded-xl hover:bg-[#d4561e] transition-colors">
                  Browse spaces
                </a>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl text-[#09090F] mb-6 font-semibold">Send a message</h2>

                {/* Enquiry type */}
                <div className="mb-6">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">What can we help with?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {enquiryTypes.map((t) => {
                      const Icon = t.icon;
                      return (
                        <button
                          key={t.value}
                          onClick={() => setEnquiryType(t.value)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors text-left ${
                            enquiryType === t.value
                              ? "bg-[#E8622A]/10 border-[#E8622A] text-[#E8622A]"
                              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          <Icon size={15} />
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block">Full name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#09090F] focus:outline-none focus:border-[#E8622A] transition-colors"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#09090F] focus:outline-none focus:border-[#E8622A] transition-colors"
                        placeholder="Acme Ltd"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#09090F] focus:outline-none focus:border-[#E8622A] transition-colors"
                        placeholder="jane@acme.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#09090F] focus:outline-none focus:border-[#E8622A] transition-colors"
                        placeholder="07700 000000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Message *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#09090F] focus:outline-none focus:border-[#E8622A] transition-colors resize-none"
                      placeholder="Tell us about what you're looking for — team size, preferred area, move-in date, any specific requirements..."
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">We respond to all enquiries within 24 hours</p>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#E8622A] text-white font-semibold rounded-xl hover:bg-[#d4561e] transition-colors"
                    >
                      Send message
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
