"use client";

import React, { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { ShieldCheck, Zap, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { useWhatsAppModal } from "@/components/ui/whatsapp-modal-context";
import { Hero3DModule } from "@/components/home/hero-3d-module";

interface SystemSpec {
  kw: number;
  label: string;
  gross: string;
  subsidy: string;
  net: string;
  units: string;
  savings: string;
  emi10Yr: string;
  netPositive: string;
  roof: string;
  image: string;
}

const SYSTEMS: Record<number, SystemSpec> = {
  3: {
    kw: 3,
    label: "3 kW Residential",
    gross: "₹1,98,000",
    subsidy: "₹78,000",
    net: "₹1,20,000",
    units: "375 kWh / month",
    savings: "₹2,813 / mo",
    emi10Yr: "₹1,317 / mo (10 Yrs @ 5.75%)",
    netPositive: "+₹1,496/mo surplus over EMI",
    roof: "300 sq. ft",
    image: "/images/feature-topcon.webp",
  },
  5: {
    kw: 5,
    label: "5 kW Residential",
    gross: "₹3,30,000",
    subsidy: "₹78,000",
    net: "₹2,52,000",
    units: "625 kWh / month",
    savings: "₹4,688 / mo",
    emi10Yr: "₹3,057 / mo (10 Yrs)",
    netPositive: "+₹1,631/mo surplus over EMI",
    roof: "500 sq. ft",
    image: "/images/installation-rajampalli.jpg",
  },
  10: {
    kw: 10,
    label: "10 kW Residential",
    gross: "₹6,60,000",
    subsidy: "₹78,000",
    net: "₹5,82,000",
    units: "1,250 kWh / month",
    savings: "₹9,375 / mo",
    emi10Yr: "₹7,061 / mo (10 Yrs)",
    netPositive: "+₹2,314/mo surplus over EMI",
    roof: "1,000 sq. ft",
    image: "/images/hero-2.webp",
  },
};

export function HeroSolarCard() {
  const { openEnquiryModal } = useWhatsAppModal();
  const [selectedKw, setSelectedKw] = useState<number>(3);
  const [viewMode, setViewMode] = useState<"3d" | "specs">("3d");
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Perspective Tilt on Mouse Movement (Desktop Only)
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glintPos, setGlintPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const current = SYSTEMS[selectedKw];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    if (viewMode === "3d") return; // Keep tilt subtle or off during 3D drag

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 4;
    const rotY = ((x - centerX) / centerX) * 5;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlintPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlintPos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          isHovered && viewMode === "specs"
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            : undefined,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="relative w-full rounded-2xl sm:rounded-[32px] bg-[#072A19]/95 backdrop-blur-2xl border border-[rgba(255,255,255,0.18)] p-4 sm:p-6 shadow-[0_20px_60px_rgba(4,20,12,0.85)] text-white overflow-hidden will-change-transform"
    >
      {/* Specular Glare Sheen (Desktop Only) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 hidden sm:block"
        style={{
          opacity: isHovered ? 0.2 : 0.06,
          background: `radial-gradient(circle 350px at ${glintPos.x}% ${glintPos.y}%, rgba(255,255,255,0.6) 0%, rgba(140,198,63,0.18) 40%, transparent 80%)`,
        }}
      />

      {/* Card Header with View Switcher (Matches Image 2 & 3) */}
      <div className="relative z-10 flex items-center justify-between pb-3 sm:pb-3.5 border-b border-[rgba(255,255,255,0.14)] gap-2">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#3F8F3A]/25 border border-[#8CC63F]/40 flex items-center justify-center text-[#8CC63F] shrink-0">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h3 className="text-xs sm:text-sm font-semibold font-heading text-white truncate">
                Topcon N-Type Bi-Facial
              </h3>
              <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-[#8CC63F]/20 text-[#8CC63F] border border-[#8CC63F]/40 font-mono shrink-0">
                3D Interactive
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#9DB3A5] truncate">
              Real-time AP Rooftop Module Visualisation
            </p>
          </div>
        </div>

        {/* View Switcher Pill: [3D Model] / [Specs] */}
        <div className="flex items-center bg-[#04140C]/90 rounded-full p-1 border border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => setViewMode("3d")}
            className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "3d"
                ? "bg-[#8CC63F] text-[#04140C] shadow-sm"
                : "text-[#9DB3A5] hover:text-white"
            }`}
          >
            3D Model
          </button>
          <button
            type="button"
            onClick={() => setViewMode("specs")}
            className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "specs"
                ? "bg-[#8CC63F] text-[#04140C] shadow-sm"
                : "text-[#9DB3A5] hover:text-white"
            }`}
          >
            Specs & Loans
          </button>
        </div>
      </div>

      {/* Middle Interactive Zone */}
      {viewMode === "3d" ? (
        /* 3D Interactive Topcon Model Canvas (Exact match to Image 2) */
        <div className="relative z-10 mt-2 sm:mt-3">
          <Hero3DModule />
        </div>
      ) : (
        /* Specs & Sizing View with 10-Year Bank Loan (Matches Image 3) */
        <div className="relative z-10 mt-3 space-y-3">
          {/* kW Selector */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-[#9DB3A5] font-medium">Select System Size:</span>
            <div className="flex items-center bg-[#04140C]/90 rounded-full p-0.5 border border-white/10 shrink-0">
              {[3, 5, 10].map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => setSelectedKw(kw)}
                  className={`py-1 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedKw === kw
                      ? "bg-[#8CC63F] text-[#04140C] shadow-sm"
                      : "text-[#9DB3A5] hover:text-white"
                  }`}
                >
                  {kw} kW
                </button>
              ))}
            </div>
          </div>

          {/* Photo Frame with Net Cost Overlay */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] w-full border border-[rgba(255,255,255,0.14)] bg-[#04140C] shadow-inner group">
            <Image
              src={current.image}
              alt={`${current.label} rooftop solar installation`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04140C]/95 via-[#04140C]/30 to-transparent" />

            <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#04140C]/85 backdrop-blur-md border border-white/15 text-[10px] text-[#8CC63F] font-medium">
              <ShieldCheck className="w-3 h-3" />
              <span>Topcon N-Type Panels</span>
            </div>

            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between gap-2">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#9DB3A5] block">
                  Net Cost (after ₹78,000 subsidy)
                </span>
                <span className="text-xl font-semibold font-heading text-[#8CC63F] tracking-tight block">
                  {current.net}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3F8F3A]/30 backdrop-blur-md border border-[#8CC63F]/40 text-[#8CC63F] font-mono">
                {current.units}
              </span>
            </div>
          </div>

          {/* Key Facts & 10-Yr Loan Math */}
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#04140C]/60 border border-[rgba(255,255,255,0.08)]">
              <span className="text-[#9DB3A5]">10-Yr Bank EMI:</span>
              <span className="font-semibold text-[#8CC63F]">{current.emi10Yr}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-[#04140C]/60 border border-[rgba(255,255,255,0.08)]">
              <span className="text-[#9DB3A5]">Monthly Bill Savings:</span>
              <span className="font-semibold text-white">{current.savings}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-[#0B4A2B]/40 border border-[#8CC63F]/30 text-[11px]">
              <span className="text-[#8CC63F] flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>Zero Out-of-Pocket:</span>
              </span>
              <span className="font-semibold text-white">{current.netPositive}</span>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Bottom CTA Banner (Always Visible) */}
      <div className="relative z-10 mt-3 pt-3 border-t border-[rgba(255,255,255,0.12)]">
        <button
          type="button"
          onClick={() =>
            openEnquiryModal({
              title: `Enquiry for ${current.label}`,
              defaultRequirement: `${current.kw} kW Rooftop Solar`,
              defaultNotes: `Interested in ${current.label} system with ₹78,000 PM Surya Ghar subsidy and 10-year bank loan in Andhra Pradesh.`,
            })
          }
          className="w-full bg-[#8CC63F] hover:bg-[#9ae045] active:scale-[0.98] text-[#04140C] font-semibold py-3 px-4 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#8CC63F]/20 transition-all cursor-pointer"
        >
          <span>Get {current.kw} kW WhatsApp Estimate</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="mt-2 flex items-center justify-between text-[10px] sm:text-[11px] text-[#9DB3A5] px-1">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#8CC63F]" />
            <span>Turnkey EPC: ₹66,000 / kW</span>
          </div>
          <span className="font-mono text-[#8CC63F]">AP DISCOM Net Metered</span>
        </div>
      </div>
    </div>
  );
}
