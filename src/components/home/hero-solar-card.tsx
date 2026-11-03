"use client";

import React, { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { ShieldCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { useWhatsAppModal } from "@/components/ui/whatsapp-modal-context";

interface SystemSpec {
  kw: number;
  label: string;
  gross: string;
  subsidy: string;
  net: string;
  units: string;
  savings: string;
  roof: string;
  loan: string;
  image: string;
  badge: string;
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
    roof: "300 sq. ft",
    loan: "5.75% p.a. (up to ₹2 Lakh)",
    image: "/images/feature-topcon.webp",
    badge: "PM Surya Ghar Standard",
  },
  5: {
    kw: 5,
    label: "5 kW Residential",
    gross: "₹3,30,000",
    subsidy: "₹78,000",
    net: "₹2,52,000",
    units: "625 kWh / month",
    savings: "₹4,688 / mo",
    roof: "500 sq. ft",
    loan: "From 7.25% p.a.",
    image: "/images/installation-rajampalli.jpg",
    badge: "High Yield Bi-Facial",
  },
  10: {
    kw: 10,
    label: "10 kW Residential",
    gross: "₹6,60,000",
    subsidy: "₹78,000",
    net: "₹5,82,000",
    units: "1,250 kWh / month",
    savings: "₹9,375 / mo",
    roof: "1,000 sq. ft",
    loan: "Bank Loan Guidance",
    image: "/images/hero-2.webp",
    badge: "Max Residential Yield",
  },
};

export function HeroSolarCard() {
  const { openEnquiryModal } = useWhatsAppModal();
  const [selectedKw, setSelectedKw] = useState<number>(3);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glintPos, setGlintPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const current = SYSTEMS[selectedKw];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    // Only apply 3D tilt on larger desktop screens with pointer
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D perspective tilt
    const rotX = -((y - centerY) / centerY) * 5;
    const rotY = ((x - centerX) / centerX) * 6;

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
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          : undefined,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="relative w-full rounded-2xl sm:rounded-[32px] bg-[#072A19]/95 backdrop-blur-2xl border border-[rgba(255,255,255,0.18)] p-4 sm:p-7 shadow-[0_20px_60px_rgba(4,20,12,0.85)] text-white overflow-hidden will-change-transform"
    >
      {/* Specular sunlight glare sheen that follows mouse on desktop */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 hidden sm:block"
        style={{
          opacity: isHovered ? 0.25 : 0.08,
          background: `radial-gradient(circle 350px at ${glintPos.x}% ${glintPos.y}%, rgba(255,255,255,0.65) 0%, rgba(140,198,63,0.2) 40%, transparent 80%)`,
        }}
      />

      {/* Top Header: System Size Selector */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 sm:pb-4 border-b border-[rgba(255,255,255,0.14)] gap-2.5 sm:gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#3F8F3A]/25 border border-[#8CC63F]/40 flex items-center justify-center text-[#8CC63F] shrink-0">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-semibold font-heading text-white whitespace-nowrap">
              Turnkey Solar EPC
            </h3>
            <span className="text-[10px] sm:text-[11px] text-[#9DB3A5] block truncate">
              PM Surya Ghar · Andhra Pradesh
            </span>
          </div>
        </div>

        {/* 3 kW / 5 kW / 10 kW Pill Tabs: Full width equal 3-col grid on mobile */}
        <div className="grid grid-cols-3 sm:flex items-center bg-[#04140C]/90 rounded-full p-1 border border-white/10 w-full sm:w-auto shrink-0">
          {[3, 5, 10].map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => setSelectedKw(kw)}
              className={`py-1.5 sm:py-1 px-2.5 sm:px-3 rounded-full text-xs font-semibold transition-all cursor-pointer text-center ${
                selectedKw === kw
                  ? "bg-[#8CC63F] text-[#04140C] shadow-sm font-bold"
                  : "text-[#9DB3A5] hover:text-white"
              }`}
            >
              {kw} kW
            </button>
          ))}
        </div>
      </div>

      {/* Realistic Solar Visual Frame */}
      <div className="relative z-10 mt-3 sm:mt-4 rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/9] w-full border border-[rgba(255,255,255,0.14)] bg-[#04140C] shadow-inner group">
        <Image
          src={current.image}
          alt={`${current.label} rooftop solar installation`}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          priority
        />

        {/* Subtle glass gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04140C]/95 via-[#04140C]/30 to-transparent" />

        {/* Badge: Topcon Bi-facial */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#04140C]/85 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] text-[#8CC63F] font-medium">
          <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Topcon N-Type Panels</span>
        </div>

        {/* Net Price Overlay */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#9DB3A5] block truncate">
              Net Cost (after ₹78,000 subsidy)
            </span>
            <span className="text-xl sm:text-2xl font-semibold font-heading text-[#8CC63F] tracking-tight block">
              {current.net}
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#3F8F3A]/30 backdrop-blur-md border border-[#8CC63F]/40 text-[#8CC63F] font-mono shrink-0">
            {current.units}
          </span>
        </div>
      </div>

      {/* Specs Key Facts Grid (Client Facts Only) */}
      <div className="relative z-10 mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs">
        <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-[#04140C]/50 border border-[rgba(255,255,255,0.08)]">
          <span className="text-[#9DB3A5]">Central Govt. Subsidy:</span>
          <span className="font-semibold text-[#8CC63F]">{current.subsidy} (Fixed)</span>
        </div>

        <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-[#04140C]/50 border border-[rgba(255,255,255,0.08)]">
          <span className="text-[#9DB3A5]">Required Roof Area:</span>
          <span className="font-semibold text-white">{current.roof}</span>
        </div>

        <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-[#04140C]/50 border border-[rgba(255,255,255,0.08)]">
          <span className="text-[#9DB3A5]">Bank Loan Guidance:</span>
          <span className="font-semibold text-white">{current.loan}</span>
        </div>
      </div>

      {/* Dedicated CTA Button */}
      <div className="relative z-10 mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[rgba(255,255,255,0.12)]">
        <button
          type="button"
          onClick={() =>
            openEnquiryModal({
              title: `Enquiry for ${current.label}`,
              defaultRequirement: `${current.kw} kW Rooftop Solar`,
              defaultNotes: `Interested in the ${current.label} system with ₹78,000 PM Surya Ghar subsidy in Andhra Pradesh.`,
            })
          }
          className="w-full bg-[#8CC63F] hover:bg-[#9ae045] active:scale-[0.98] text-[#04140C] font-semibold py-3 sm:py-3.5 px-4 sm:px-6 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          <span>Get {current.kw} kW WhatsApp Estimate</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-[#9DB3A5]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#8CC63F]" />
          <span>Turnkey EPC Rate: ₹66,000 / kW Complete</span>
        </div>
      </div>
    </div>
  );
}
