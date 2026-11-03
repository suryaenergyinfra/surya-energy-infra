"use client";

import React from "react";
import { useWhatsAppModal } from "./whatsapp-modal-context";
import { MessageSquare } from "lucide-react";

export function FloatingWhatsApp() {
  const { openEnquiryModal } = useWhatsAppModal();

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <button
        type="button"
        onClick={() =>
          openEnquiryModal({
            title: "Quick WhatsApp Enquiry",
            defaultRequirement: "Residential Rooftop Solar Query",
          })
        }
        aria-label="Enquire on WhatsApp"
        className="group relative flex items-center gap-2.5 bg-[#8CC63F] hover:bg-[#9ae045] active:scale-95 text-[#04140C] font-semibold py-3 px-5 rounded-full shadow-[0_8px_25px_rgba(140,198,63,0.35)] transition-all cursor-pointer border border-white/20"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#04140C] opacity-30" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#04140C]" />
        </span>
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-xs font-semibold tracking-wide">Enquire on WhatsApp</span>
      </button>
    </div>
  );
}
