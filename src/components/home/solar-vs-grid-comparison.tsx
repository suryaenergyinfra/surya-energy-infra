"use client";

import React from "react";
import Link from "next/link";
import { Check, X, Zap, ArrowRight, MessageSquare, TrendingUp, ShieldCheck } from "lucide-react";
import { useWhatsAppModal } from "@/components/ui/whatsapp-modal-context";

const COMPARISON_ROWS = [
  {
    feature: "Monthly Cash Outflow",
    grid: "₹2,500 – ₹7,000+ every month forever with 0 asset",
    solar: "Fixed 10-Yr loan EMI from ₹1,317/mo — often less than your current bill!",
  },
  {
    feature: "Government Support",
    grid: "Zero subsidy on grid consumption",
    solar: "₹78,000 fixed direct central subsidy under PM Surya Ghar",
  },
  {
    feature: "25-Year Lifetime Cost",
    grid: "₹15 Lakh to ₹25 Lakhs paid to utility company with ₹0 return",
    solar: "Payback in 3.5 to 4 years, followed by 20+ years of 100% FREE electricity",
  },
  {
    feature: "Tariff Inflation Protection",
    grid: "Vulnerable to periodic electricity tariff hikes (5%–8% every few years)",
    solar: "100% hedge against power price inflation — your roof generates your power",
  },
  {
    feature: "Rooftop Property Value",
    grid: "Empty terrace generating zero financial return",
    solar: "Permanent clean energy asset that increases house valuation & independence",
  },
  {
    feature: "Power Export (Net-Metering)",
    grid: "Unused electricity cannot be saved or credited",
    solar: "Bi-directional net-metering exports daytime surplus to AP DISCOM grid",
  },
];

export function SolarVsGridComparison() {
  const { openEnquiryModal } = useWhatsAppModal();

  return (
    <section className="bg-white py-20 lg:py-28 text-[#06180F] border-b border-[#D5E6CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-[#F1F8EC] border border-[#D5E6CC] px-4 py-1.5 rounded-full inline-block mb-3 font-mono">
            Smart Financial Comparison
          </span>
          <h2 className="text-3xl sm:text-5xl font-medium font-heading text-[#06180F] tracking-[-0.03em] mb-4">
            Paying Electricity Bills vs. Owning Rooftop Solar
          </h2>
          <p className="text-sm sm:text-base text-[#06180F]/70 leading-relaxed font-normal">
            See why thousands of Andhra Pradesh families are switching to PM Surya Ghar on-grid solar. With a 10-year bank loan at 5.75%, solar pays for itself from Month 1.
          </p>
        </div>

        {/* 2-Column Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          {/* Column 1: Traditional Grid Power */}
          <div className="bg-[#FAFBF9] rounded-3xl p-6 sm:p-10 border border-[#D5E6CC]/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D5E6CC]/80">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#06180F]/50 block mb-1">
                    Traditional Route
                  </span>
                  <h3 className="text-2xl font-medium font-heading text-[#06180F]">
                    Monthly Grid Electricity
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-500">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-6">
                {COMPARISON_ROWS.map((row, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-100/70 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#06180F]/60 uppercase tracking-wider block font-mono">
                        {row.feature}
                      </span>
                      <p className="text-sm text-[#06180F]/80 mt-0.5 font-normal">
                        {row.grid}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D5E6CC]/80 text-xs text-[#06180F]/60 text-center">
              Total lifetime bill: Over ₹15–₹25 Lakhs with ₹0 equity created.
            </div>
          </div>

          {/* Column 2: Surya Energy Infra On-Grid Solar EPC */}
          <div className="bg-[#072A19] text-white rounded-3xl p-6 sm:p-10 border border-[#8CC63F]/40 shadow-xl relative overflow-hidden flex flex-col justify-between card-soft-shadow">
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#3F8F3A]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/15">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#8CC63F] font-semibold block mb-1">
                    PM Surya Ghar Authorised
                  </span>
                  <h3 className="text-2xl font-medium font-heading text-white">
                    Surya Energy Solar EPC
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#04140C] border border-[#8CC63F]/40 flex items-center justify-center text-[#8CC63F]">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
              </div>

              <div className="space-y-6">
                {COMPARISON_ROWS.map((row, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#3F8F3A] text-[#04140C] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#8CC63F] uppercase tracking-wider block font-mono">
                        {row.feature}
                      </span>
                      <p className="text-sm text-white/90 mt-0.5 font-normal leading-relaxed">
                        {row.solar}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/15">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#9DB3A5] block">Optional 10-Yr EMI starts from:</span>
                  <span className="text-2xl font-medium font-heading text-[#8CC63F]">
                    ₹1,317 <span className="text-xs text-white/70 font-sans">/ month (3 kW)</span>
                  </span>
                  <span className="text-[10px] text-[#8CC63F]/90 block font-mono mt-0.5">
                    * Loan is completely optional (for info) · Upfront payment accepted
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openEnquiryModal({
                      title: "Solar Consultation & Quote",
                      defaultRequirement: "Free Rooftop Survey & 10-Yr Loan Guidance",
                      defaultNotes: "Looking to replace monthly electricity bills with a PM Surya Ghar rooftop solar system.",
                    })
                  }
                  className="w-full sm:w-auto bg-[#8CC63F] hover:bg-[#9ae045] active:scale-[0.99] text-[#04140C] py-3 px-6 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Get Solar Quote on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Local Andhra Pradesh DISCOM & Telugu Guidance Strip */}
        <div className="bg-[#F1F8EC] rounded-2xl p-4 sm:p-6 border border-[#D5E6CC] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#D5E6CC] flex items-center justify-center text-[#0B4A2B] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0B4A2B] block">
                ఆంధ్రప్రదేశ్ వినియోగదారుల కొరకు ప్రత్యేక సదుపాయం (Local AP EPC Team)
              </span>
              <p className="text-xs text-[#06180F]/70">
                100% turnkey liaisoning with APCPDCL, APSPDCL & APEPDCL. Free rooftop survey in Darsi, Podili, Ongole & across AP.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/subsidy-finance"
              className="text-xs font-semibold text-[#0B4A2B] hover:text-[#072A19] flex items-center gap-1 transition-colors"
            >
              <span>Explore 10-Yr Loan Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
