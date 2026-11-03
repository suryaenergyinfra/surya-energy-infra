"use client";

import React from "react";
import { formatINR, SolarPackage } from "@/lib/data";
import { useWhatsAppModal } from "@/components/ui/whatsapp-modal-context";
import { ArrowRight, MessageSquare } from "lucide-react";

export function PackageEnquiryButton({
  pkg,
  variant = "card",
}: {
  pkg: SolarPackage;
  variant?: "card" | "table";
}) {
  const { openEnquiryModal } = useWhatsAppModal();

  const handleOpen = () => {
    openEnquiryModal({
      title: `${pkg.kw} kW Package Enquiry`,
      defaultKw: pkg.kw,
      defaultRequirement: `${pkg.kw} kW On-Grid System (Net: ${formatINR(pkg.netCost)})`,
      defaultNotes: `Gross: ${formatINR(pkg.grossCost)}, Subsidy: ${formatINR(pkg.subsidy)}, Est. Units: ${pkg.monthlyUnitsMin}–${pkg.monthlyUnitsMax}/mo, Roof: ~${pkg.roofAreaSqFt} sq ft.`,
    });
  };

  if (variant === "table") {
    return (
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B4A2B] hover:text-[#072A19] bg-white px-3.5 py-1.5 rounded-full border border-[#D5E6CC] shadow-sm hover:shadow transition-all cursor-pointer"
      >
        <span>Enquire</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleOpen}
      className="w-full bg-[#0B4A2B] hover:bg-[#072A19] active:scale-[0.99] text-white py-3 px-4 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
    >
      <MessageSquare className="w-3.5 h-3.5 fill-current" />
      <span>Enquire on WhatsApp</span>
    </button>
  );
}
