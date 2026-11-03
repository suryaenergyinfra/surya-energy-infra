"use client";

import React, { useState, useEffect } from "react";
import { useWhatsAppModal } from "./whatsapp-modal-context";
import { MessageSquare } from "lucide-react";

export function FloatingWhatsApp() {
  const { openEnquiryModal } = useWhatsAppModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating button only after scrolling past the hero section (400px)
      // This prevents any overlap with hero cards or hero buttons
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
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
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#04140C] opacity-30" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#04140C]" />
        </span>
        <MessageSquare className="w-4 h-4 fill-current" />
        <span className="text-xs font-semibold tracking-wide">Enquire on WhatsApp</span>
      </button>
    </div>
  );
}
