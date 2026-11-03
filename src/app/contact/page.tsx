"use client";

import React, { useState } from "react";
import { siteConfig, getWhatsAppUrl } from "@/lib/site";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  AlertCircle,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    villageTown: "",
    monthlyConsumption: "",
    preferredKw: "3 kW",
    notes: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errs.name = "Please enter your full name.";
    }

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile number.";
    }

    if (!formData.villageTown.trim()) {
      errs.villageTown = "Please enter your town, village, or mandal.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = `Hello Surya Energy Infra, I am submitting an inquiry for residential rooftop solar:
- Name: ${formData.name.trim()}
- Mobile: ${formData.phone.trim()}
- Location: ${formData.villageTown.trim()}, Andhra Pradesh
- Monthly Consumption / Bill: ${formData.monthlyConsumption || "Not specified"}
- Preferred System Size: ${formData.preferredKw}
${formData.notes.trim() ? `- Notes: ${formData.notes.trim()}` : ""}

Please contact me to schedule a free site survey and quotation.`;

    const url = getWhatsAppUrl(message);
    window.open(url, "_blank");
  };

  return (
    <div className="bg-[#F1F8EC] min-h-screen text-[#06180F] pt-28 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-[#F1F8EC] border border-[#D5E6CC] px-4 py-1.5 rounded-full inline-block mb-4 font-mono">
            Contact & Site Survey
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium font-heading text-[#06180F] tracking-[-0.03em] mb-4">
            Get in Touch with Surya Energy Infra
          </h1>
          <p className="text-base sm:text-lg text-[#06180F]/70 font-normal">
            Reach out for a rooftop solar survey, PM Surya Ghar subsidy guidance, or an on-grid quotation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Contact Information & Office Details (Mint cards with #D5E6CC borders) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F1F8EC] border border-[#D5E6CC] rounded-[32px] p-8 shadow-sm">
              <h2 className="text-2xl font-medium font-heading text-[#06180F] mb-6">
                Head Office & Support
              </h2>

              <ul className="space-y-6 text-sm text-[#06180F]/80">
                {/* Address */}
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#06180F] block mb-1">Head Office Address</strong>
                    <a
                      href={siteConfig.contact.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#0B4A2B] transition-colors leading-relaxed block"
                    >
                      {siteConfig.contact.address.full}
                    </a>
                  </div>
                </li>

                {/* Phone */}
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#06180F] block mb-1">Phone & WhatsApp</strong>
                    <a
                      href={siteConfig.contact.phoneTel}
                      className="text-base font-semibold text-[#0B4A2B] hover:text-[#072A19] transition-colors block"
                    >
                      {siteConfig.contact.displayPhone}
                    </a>
                    <span className="text-xs text-[#06180F]/60">Available during office hours</span>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#06180F] block mb-1">Official Email</strong>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="hover:text-[#0B4A2B] transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </li>

                {/* Hours */}
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#06180F] block mb-1">Working Hours</strong>
                    <span>{siteConfig.contact.hours}</span>
                  </div>
                </li>

                {/* Instagram (Only social channel provided - Rule B.9) */}
                <li className="flex items-start gap-4 pt-4 border-t border-[#D5E6CC]">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] shrink-0 mt-0.5">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#06180F] block mb-1">Instagram</strong>
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#0B4A2B] transition-colors inline-flex items-center gap-1 text-xs text-[#06180F] font-semibold"
                    >
                      <span>@suryaenergyinfra</span>
                    </a>
                    <p className="text-xs text-[#06180F]/60">Follow real installation updates on Instagram</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Direct Quick WhatsApp Button */}
            <div className="bg-[#F1F8EC] border border-[#D5E6CC] rounded-3xl p-6 text-center shadow-sm">
              <span className="text-xs uppercase tracking-wider text-[#06180F]/60 block mb-3 font-mono">
                Immediate Response
              </span>
              <a
                href={getWhatsAppUrl("Hello Surya Energy Infra, I would like to chat about rooftop solar for my home in Andhra Pradesh.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#0B4A2B] hover:bg-[#072A19] text-white py-3.5 px-6 rounded-full text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp Now</span>
              </a>
            </div>
          </div>

          {/* Validated Inquiry Form that opens WhatsApp */}
          <div className="lg:col-span-7 bg-[#F1F8EC] border border-[#D5E6CC] rounded-[32px] p-8 sm:p-10 shadow-sm">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold block mb-1 font-mono">
                Site Survey Request
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium font-heading text-[#06180F]">
                Book a Free Rooftop Solar Survey
              </h2>
              <p className="text-sm text-[#06180F]/70 mt-1">
                Fill in your details below to open a pre-filled WhatsApp message directly with our team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider text-[#06180F]/70 block mb-1.5">
                  Full Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#D5E6CC] rounded-2xl text-[#06180F] text-sm focus:outline-none focus:border-[#0B4A2B] focus:ring-2 focus:ring-[#8CC63F]/20"
                />
                {errors.name && (
                  <span className="text-xs text-[#0B4A2B] mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                  </span>
                )}
              </div>

              {/* Mobile Phone & Village/Town */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="text-xs font-semibold uppercase tracking-wider text-[#06180F]/70 block mb-1.5">
                    10-Digit Mobile Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="e.g. 9494953848"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#D5E6CC] rounded-2xl text-[#06180F] text-sm focus:outline-none focus:border-[#0B4A2B] focus:ring-2 focus:ring-[#8CC63F]/20"
                  />
                  {errors.phone && (
                    <span className="text-xs text-[#0B4A2B] mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-location" className="text-xs font-semibold uppercase tracking-wider text-[#06180F]/70 block mb-1.5">
                    Town / Village / Mandal *
                  </label>
                  <input
                    id="contact-location"
                    type="text"
                    placeholder="e.g. Darsi, Prakasam Dist."
                    value={formData.villageTown}
                    onChange={(e) => setFormData({ ...formData, villageTown: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#D5E6CC] rounded-2xl text-[#06180F] text-sm focus:outline-none focus:border-[#0B4A2B] focus:ring-2 focus:ring-[#8CC63F]/20"
                  />
                  {errors.villageTown && (
                    <span className="text-xs text-[#0B4A2B] mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.villageTown}
                    </span>
                  )}
                </div>
              </div>

              {/* Monthly Units / Bill & Preferred kW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-units" className="text-xs font-semibold uppercase tracking-wider text-[#06180F]/70 block mb-1.5">
                    Monthly Units or Bill (Approx)
                  </label>
                  <input
                    id="contact-units"
                    type="text"
                    placeholder="e.g. 450 units or ₹3,500"
                    value={formData.monthlyConsumption}
                    onChange={(e) => setFormData({ ...formData, monthlyConsumption: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#D5E6CC] rounded-2xl text-[#06180F] text-sm focus:outline-none focus:border-[#0B4A2B] focus:ring-2 focus:ring-[#8CC63F]/20"
                  />
                </div>

                <div>
                  <label htmlFor="contact-kw" className="text-xs font-semibold uppercase tracking-wider text-[#06180F]/70 block mb-1.5">
                    Preferred System Size
                  </label>
                  <select
                    id="contact-kw"
                    value={formData.preferredKw}
                    onChange={(e) => setFormData({ ...formData, preferredKw: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#D5E6CC] rounded-2xl text-[#06180F] text-sm focus:outline-none focus:border-[#0B4A2B] focus:ring-2 focus:ring-[#8CC63F]/20"
                  >
                    <option value="3 kW">3 kW (~300 units/mo)</option>
                    <option value="4 kW">4 kW (~480 units/mo)</option>
                    <option value="5 kW">5 kW (~600 units/mo)</option>
                    <option value="6 kW">6 kW (~720 units/mo)</option>
                    <option value="7 kW">7 kW (~840 units/mo)</option>
                    <option value="8 kW">8 kW (~960 units/mo)</option>
                    <option value="9 kW">9 kW (~1,080 units/mo)</option>
                    <option value="10 kW">10 kW (~1,200 units/mo)</option>
                    <option value="Not Sure / Need Advice">Not Sure / Need Advice</option>
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label htmlFor="contact-notes" className="text-xs font-semibold uppercase tracking-wider text-[#06180F]/70 block mb-1.5">
                  Rooftop Details or Questions (Optional)
                </label>
                <textarea
                  id="contact-notes"
                  rows={3}
                  placeholder="e.g. Flat RCC roof with shadow-free area..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#D5E6CC] rounded-2xl text-[#06180F] text-sm focus:outline-none focus:border-[#0B4A2B] focus:ring-2 focus:ring-[#8CC63F]/20"
                />
              </div>

              {/* Submit Button (Rule A.1: on light use brand-deep with white text) */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#0B4A2B] hover:bg-[#072A19] text-white py-4 px-8 rounded-full text-base font-medium flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>
                <p className="text-center text-xs text-[#06180F]/60 mt-3">
                  Clicking opens a pre-filled WhatsApp message to 9494953848.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Location Map Container */}
        <div className="bg-[#F1F8EC] rounded-[32px] p-8 lg:p-12 text-[#06180F] shadow-sm border border-[#D5E6CC]">
          <div className="max-w-2xl mb-6">
            <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-white border border-[#D5E6CC] px-3 py-1 rounded-full inline-block mb-2 font-mono">
              Physical Location
            </span>
            <h3 className="text-2xl font-medium font-heading text-[#06180F]">
              Visit Our Head Office in Darsi
            </h3>
            <p className="text-xs sm:text-sm text-[#06180F]/70 mt-1">
              {siteConfig.contact.address.full}
            </p>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#D5E6CC] bg-white relative flex items-center justify-center">
            <iframe
              title="Surya Energy Infra Head Office Location"
              src="https://maps.google.com/maps?q=Kurichedu+Road,+Darsi,+Prakasam+District,+Andhra+Pradesh+523247&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <div className="mt-4 text-right">
            <a
              href={siteConfig.contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4A2B] hover:text-[#072A19]"
            >
              <MapPin className="w-4 h-4 text-[#3F8F3A]" />
              <span>Open Directions in Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
