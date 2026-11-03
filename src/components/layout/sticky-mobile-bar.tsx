"use client";

import React from "react";
import { siteConfig } from "@/lib/site";
import { useWhatsAppModal } from "@/components/ui/whatsapp-modal-context";
import { Phone, MessageSquare } from "lucide-react";

export function StickyMobileBar() {
  const { openEnquiryModal } = useWhatsAppModal();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#04140C]/95 backdrop-blur-xl border-t border-white/15 px-4 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-[0_-8px_25px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {/* Call Button */}
        <a
          href={siteConfig.contact.phoneTel}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white font-medium text-sm transition-colors text-center"
        >
          <Phone className="w-4 h-4 text-[#8CC63F]" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <button
          type="button"
          onClick={() =>
            openEnquiryModal({
              title: "Quick WhatsApp Enquiry",
              defaultRequirement: "Residential Rooftop Solar Query",
            })
          }
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#8CC63F] hover:bg-[#9ae045] active:bg-[#7cb534] text-[#04140C] font-semibold text-sm transition-colors text-center shadow-lg shadow-[#8CC63F]/20 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
