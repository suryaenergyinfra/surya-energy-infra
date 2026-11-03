"use client";

import React from "react";
import { siteConfig } from "@/lib/site";
import { useWhatsAppModal } from "@/components/ui/whatsapp-modal-context";
import { MessageSquare, Phone, ShieldCheck } from "lucide-react";

export function CtaBanner() {
  const { openEnquiryModal } = useWhatsAppModal();

  return (
    <section className="bg-[#F1F8EC] py-20 lg:py-32 text-[#06180F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dark card uses forest-900 with 1px border rgba(255,255,255,0.14), 32-40px radius & leaf glow (Rule C.7 & A) */}
        <div className="bg-[#072A19] rounded-[36px] p-8 sm:p-14 lg:p-16 text-white text-center relative overflow-hidden border border-[rgba(255,255,255,0.14)] shadow-2xl card-soft-shadow">
          {/* Subtle leaf ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#3F8F3A]/15 blur-[120px] pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#04140C] border border-[rgba(255,255,255,0.14)] text-[#8CC63F] text-xs font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Authorised PM Surya Ghar Vendor • Andhra Pradesh</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium font-heading text-white tracking-[-0.03em] mb-6 max-w-3xl mx-auto">
              Ready to Power Your Home With Clean Solar?
            </h2>

            {/* Rule B.1: No "90%" claims */}
            <p className="text-base sm:text-lg text-[#9DB3A5] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Avail your ₹78,000 PM Surya Ghar subsidy and cut your electricity bill with turnkey residential on-grid solar.
            </p>

            {/* Action buttons (Rule A.1: on dark use leaf-light background with forest-950 text) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() =>
                  openEnquiryModal({
                    title: "Schedule Free Rooftop Survey",
                    defaultRequirement: "Free Rooftop Survey & Site Feasibility",
                  })
                }
                className="w-full sm:w-auto bg-[#8CC63F] hover:bg-[#9ae045] active:scale-[0.99] text-[#04140C] py-4 px-8 rounded-full text-sm sm:text-base font-semibold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>Schedule Free Roof Survey on WhatsApp</span>
              </button>

              <a
                href={siteConfig.contact.phoneTel}
                className="w-full sm:w-auto bg-transparent border border-white/40 hover:bg-white hover:text-[#04140C] text-white py-4 px-8 rounded-full text-sm sm:text-base font-medium flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>Call {siteConfig.contact.displayPhone}</span>
              </a>
            </div>

            {/* Subtext: Client facts only (Rule B.9) */}
            <p className="mt-8 text-xs text-[#9DB3A5]">
              Head Office: Kurichedu Road, Darsi, Prakasam District • Mon to Sat, 9 AM – 6 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
