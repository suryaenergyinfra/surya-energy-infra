"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SOLAR_PACKAGES, formatINR } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { useWhatsAppModal } from "@/components/ui/whatsapp-modal-context";
import { MessageSquare, Download, ArrowRight, Zap } from "lucide-react";

export function PackageLineup() {
  const { openEnquiryModal } = useWhatsAppModal();
  const [filterKw, setFilterKw] = useState<number | null>(null);

  const displayedPackages = filterKw
    ? SOLAR_PACKAGES.filter((p) => p.kw === filterKw)
    : SOLAR_PACKAGES;

  return (
    <section className="bg-[#F1F8EC] py-20 lg:py-28 text-[#06180F] border-b border-[#D5E6CC]" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-white border border-[#D5E6CC] px-3.5 py-1.5 rounded-full inline-block mb-3 font-mono">
              Residential Lineup
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium font-heading text-[#06180F] tracking-[-0.03em]">
              3 kW to 10 kW Packages
            </h2>
            <p className="text-sm sm:text-base text-[#06180F]/70 mt-2 max-w-2xl font-normal">
              Turnkey residential on-grid installations with premium Topcon solar panels, inverters, and mounting structures.
            </p>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B4A2B] hover:text-[#072A19] transition-colors group shrink-0"
          >
            <span>Compare all 8 packages</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* System Size Filter Chips (Rule B.4: No ★, no POPULAR badges) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setFilterKw(null)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterKw === null
                ? "bg-[#0B4A2B] text-white shadow-sm"
                : "bg-white border border-[#D5E6CC] text-[#06180F] hover:bg-white/80"
            }`}
          >
            All Packages (8)
          </button>
          {SOLAR_PACKAGES.map((pkg) => (
            <button
              key={pkg.kw}
              onClick={() => setFilterKw(pkg.kw)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                filterKw === pkg.kw
                  ? "bg-[#0B4A2B] text-white shadow-sm"
                  : "bg-white border border-[#D5E6CC] text-[#06180F] hover:bg-white/80"
              }`}
            >
              {pkg.kw} kW
            </button>
          ))}
        </div>

        {/* 4x2 Grid on desktop, 2 columns on tablet, 1 on mobile: Exactly 8 cards, 0 orphans (Rule C.2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPackages.map((pkg) => (
            <div
              key={pkg.kw}
              id={`pkg-${pkg.kw}kw`}
              className="rounded-[28px] p-6 sm:p-7 transition-all duration-200 flex flex-col justify-between bg-white border border-[#D5E6CC] shadow-sm hover:shadow-md hover:border-[#0B4A2B]/40"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#F1F8EC] border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A]">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium font-heading text-[#06180F]">
                      {pkg.kw} kW System
                    </h3>
                    <span className="text-[11px] text-[#06180F]/60">Residential On-Grid</span>
                  </div>
                </div>

                {/* Sizing & pricing facts only (Rule B.4: no appliance claims) */}
                <div className="space-y-3 py-4 border-y border-[#D5E6CC]/70 text-xs mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[#06180F]/70">Monthly Units:</span>
                    <span className="font-semibold text-[#06180F]">
                      {pkg.monthlyUnitsMin} – {pkg.monthlyUnitsMax} units
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#06180F]/70">Required Roof:</span>
                    <span className="font-semibold text-[#06180F]">~{pkg.roofAreaSqFt} sq ft</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#06180F]/70">Gross Price:</span>
                    <span className="text-[#06180F]/80">{formatINR(pkg.grossCost)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#3F8F3A] font-semibold">
                    <span>Govt Subsidy:</span>
                    <span>- {formatINR(pkg.subsidy)}</span>
                  </div>
                </div>

                {/* Net price in brand-deep (Rule A.2) */}
                <div className="mb-6">
                  <span className="text-[10px] uppercase tracking-wider text-[#06180F]/60 block mb-0.5 font-mono">
                    Net Investment After Subsidy
                  </span>
                  <div className="text-3xl font-medium font-heading text-[#0B4A2B] tracking-[-0.03em]">
                    {formatINR(pkg.netCost)}
                  </div>
                  <span className="text-[11px] text-[#3F8F3A] font-medium">Turnkey Complete EPC</span>
                </div>
              </div>

              {/* Action Buttons (Rule A.1: on light sections use brand-deep with white text) */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() =>
                    openEnquiryModal({
                      title: `${pkg.kw} kW Package Enquiry`,
                      defaultKw: pkg.kw,
                      defaultRequirement: `${pkg.kw} kW On-Grid System (Net: ${formatINR(pkg.netCost)})`,
                      defaultNotes: `Gross: ${formatINR(pkg.grossCost)}, Subsidy: ${formatINR(pkg.subsidy)}, Est. Units: ${pkg.monthlyUnitsMin}–${pkg.monthlyUnitsMax}/mo, Roof: ~${pkg.roofAreaSqFt} sq ft.`,
                    })
                  }
                  className="w-full bg-[#0B4A2B] hover:bg-[#072A19] active:scale-[0.99] text-white py-3 px-4 rounded-full text-xs font-medium flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Get This Package</span>
                </button>

                {siteConfig.flags.hasBrochurePdf && (
                  <a
                    href={siteConfig.flags.brochurePdfUrl}
                    download
                    className="flex items-center justify-center gap-1 text-[11px] text-[#06180F]/70 hover:text-[#06180F] py-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Brochure (PDF)</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
