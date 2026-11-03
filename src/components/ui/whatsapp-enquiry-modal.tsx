"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useWhatsAppModal, WhatsAppEnquiryOptions } from "./whatsapp-modal-context";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";
import {
  X,
  MessageSquare,
  ShieldCheck,
  MapPin,
  User,
  Zap,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const QUICK_REQUIREMENTS = [
  "3 kW Rooftop Solar",
  "5 kW Rooftop Solar",
  "Free Rooftop Survey",
  "PM Surya Ghar Subsidy Guide",
  "Bank Loan Guidance",
];

function ModalInner({
  options,
  onClose,
}: {
  options: WhatsAppEnquiryOptions;
  onClose: () => void;
}) {
  const [name, setName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("surya_customer_name") || "";
    }
    return "";
  });

  const [place, setPlace] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("surya_customer_place") || "";
    }
    return "";
  });

  const [requirement, setRequirement] = useState<string>(() => {
    if (options.defaultRequirement) return options.defaultRequirement;
    if (options.defaultKw) return `${options.defaultKw} kW On-Grid Rooftop Solar`;
    return "3 kW Rooftop Solar (PM Surya Ghar)";
  });

  // User questions/notes (never polluted with system estimate strings)
  const [userNotes, setUserNotes] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; place?: string }>({});

  const validate = () => {
    const errs: { name?: string; place?: string } = {};
    if (!name.trim()) {
      errs.name = "Please enter your full name.";
    }
    if (!place.trim()) {
      errs.place = "Please enter your town or village in Andhra Pradesh.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (typeof window !== "undefined") {
      localStorage.setItem("surya_customer_name", name.trim());
      localStorage.setItem("surya_customer_place", place.trim());
    }

    const message = `Hello Surya Energy Infra, I am submitting a solar inquiry:
• Name: ${name.trim()}
• Location: ${place.trim()}, Andhra Pradesh
• Requirement: ${requirement.trim() || "Residential Rooftop Solar"}
${options.defaultNotes ? `• Estimated Specs: ${options.defaultNotes}` : ""}
${userNotes.trim() ? `• Customer Notes: ${userNotes.trim()}` : ""}

Please share the pricing proposal and schedule a rooftop survey.`;

    const url = getWhatsAppUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 15 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative w-full max-w-lg bg-white border border-[#D5E6CC] rounded-[28px] sm:rounded-[32px] text-[#06180F] shadow-2xl z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      {/* Signature Leaf Brand Gradient Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#3F8F3A] to-[#8CC63F] shrink-0" />

      {/* Scrollable Container */}
      <div className="overflow-y-auto p-5 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F8EC] border border-[#D5E6CC] text-xs text-[#0B4A2B] font-mono font-semibold mb-2 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3F8F3A]" />
              <span>Authorised PM Surya Ghar Vendor</span>
            </div>
            <h3
              id="modal-headline"
              className="text-2xl sm:text-3xl font-medium font-heading text-[#06180F] tracking-[-0.03em] leading-tight"
            >
              {options.title || "WhatsApp Solar Enquiry"}
            </h3>
            <p className="text-xs sm:text-sm text-[#06180F]/70 mt-1 leading-relaxed">
              Connect directly with our local Andhra Pradesh solar engineers on WhatsApp.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-full bg-[#F1F8EC] hover:bg-[#E3EFE0] active:scale-95 text-[#06180F]/70 hover:text-[#06180F] flex items-center justify-center transition-all cursor-pointer shrink-0 border border-[#D5E6CC]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Solar Estimate Summary Card (If attached from Calculator or Packages) */}
        {options.defaultNotes && (
          <div className="bg-[#F1F8EC] border border-[#D5E6CC] rounded-2xl p-4 shadow-xs">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#06180F] block">
                    {options.defaultRequirement || "Calculated System"}
                  </span>
                  <span className="text-xs text-[#0B4A2B] font-medium leading-snug block mt-0.5">
                    {options.defaultNotes}
                  </span>
                </div>
              </div>

              <span className="shrink-0 text-[11px] font-mono font-bold text-[#0B4A2B] bg-white px-2.5 py-1 rounded-full border border-[#D5E6CC]">
                ₹78k Subsidy
              </span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#06180F]/80 mb-1.5 font-mono">
              Your Full Name <span className="text-[#3F8F3A]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#06180F]/45">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="e.g. Ramesh Reddy"
                className={`w-full pl-10 pr-4 py-3 bg-[#F1F8EC]/60 hover:bg-[#F1F8EC] focus:bg-white border rounded-2xl text-sm text-[#06180F] placeholder-[#06180F]/40 focus:outline-none focus:border-[#0B4A2B] focus:ring-2 focus:ring-[#8CC63F]/30 transition-all ${
                  errors.name ? "border-red-400 bg-red-50/50" : "border-[#D5E6CC]"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Town / Village in Andhra Pradesh */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#06180F]/80 mb-1.5 font-mono">
              Town / Village (Andhra Pradesh) <span className="text-[#3F8F3A]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#06180F]/45">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={place}
                onChange={(e) => {
                  setPlace(e.target.value);
                  if (errors.place) setErrors((prev) => ({ ...prev, place: undefined }));
                }}
                placeholder="e.g. Darsi, Ongole, Podili, Guntur"
                className={`w-full pl-10 pr-4 py-3 bg-[#F1F8EC]/60 hover:bg-[#F1F8EC] focus:bg-white border rounded-2xl text-sm text-[#06180F] placeholder-[#06180F]/40 focus:outline-none focus:border-[#0B4A2B] focus:ring-2 focus:ring-[#8CC63F]/30 transition-all ${
                  errors.place ? "border-red-400 bg-red-50/50" : "border-[#D5E6CC]"
                }`}
              />
            </div>
            {errors.place && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.place}</span>
              </p>
            )}
          </div>

          {/* System Requirement */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#06180F]/80 mb-1.5 font-mono">
              System Requirement
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {QUICK_REQUIREMENTS.map((req) => (
                <button
                  key={req}
                  type="button"
                  onClick={() => setRequirement(req)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer font-medium ${
                    requirement === req
                      ? "bg-[#0B4A2B] text-white shadow-xs"
                      : "bg-[#F1F8EC] text-[#06180F]/75 hover:bg-[#E3EFE0] border border-[#D5E6CC]"
                  }`}
                >
                  {req}
                </button>
              ))}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#06180F]/45">
                <Zap className="w-4 h-4 text-[#3F8F3A]" />
              </div>
              <input
                type="text"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="e.g. 3 kW system or Monthly Bill ₹4,000"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F1F8EC]/60 hover:bg-[#F1F8EC] focus:bg-white border border-[#D5E6CC] rounded-2xl text-sm text-[#06180F] placeholder-[#06180F]/40 focus:outline-none focus:border-[#0B4A2B] focus:ring-2 focus:ring-[#8CC63F]/30 transition-all"
              />
            </div>
          </div>

          {/* Custom Notes / Specific Questions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#06180F]/80 mb-1.5 font-mono">
              Specific Query / Terrace Details (Optional)
            </label>
            <textarea
              rows={2}
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="e.g. RCC terrace area ~500 sq ft, questions on net meter process, bank loans..."
              className="w-full px-4 py-2.5 bg-[#F1F8EC]/60 hover:bg-[#F1F8EC] focus:bg-white border border-[#D5E6CC] rounded-2xl text-sm text-[#06180F] placeholder-[#06180F]/40 focus:outline-none focus:border-[#0B4A2B] focus:ring-2 focus:ring-[#8CC63F]/30 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#0B4A2B] hover:bg-[#072A19] active:scale-[0.99] text-white font-medium py-3.5 sm:py-4 px-6 rounded-full text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-[#0B4A2B]/15 transition-all cursor-pointer group"
            >
              <MessageSquare className="w-4 h-4 text-[#8CC63F] fill-current" />
              <span>Send Enquiry on WhatsApp</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#06180F]/60 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#3F8F3A]" />
            <span>Connects directly with Surya Energy Infra ({siteConfig.contact.displayPhone})</span>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export function WhatsAppEnquiryModal() {
  const { isOpen, options, closeEnquiryModal } = useWhatsAppModal();

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with soft blur and dark tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEnquiryModal}
            className="fixed inset-0 bg-[#04140C]/75 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <ModalInner options={options} onClose={closeEnquiryModal} />
        </div>
      )}
    </AnimatePresence>
  );
}
