"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRICE_PER_KW, FLAT_SUBSIDY_3KW_PLUS, formatINR } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

interface KwDialProps {
  selectedKw: number;
  onSelectKw: (kw: number) => void;
  className?: string;
}

export function KwDial({ selectedKw, onSelectKw, className = "" }: KwDialProps) {
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  const grossCost = selectedKw * PRICE_PER_KW;
  const subsidy = selectedKw >= 3 ? FLAT_SUBSIDY_3KW_PLUS : 0;
  const netCost = grossCost - subsidy;

  // Desktop Magnetic Hover (up to 6px)
  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = ((e.clientX - centerX) / (rect.width / 2)) * 6;
    const dy = ((e.clientY - centerY) / (rect.height / 2)) * 6;
    setMagneticOffset({ x: dx, y: dy });
  };

  const handleMagneticLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMagneticMove}
      onMouseLeave={handleMagneticLeave}
      style={{
        transform: `translate3d(${magneticOffset.x}px, ${magneticOffset.y}px, 0)`,
        transition: "transform 0.25s ease-out",
      }}
      className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#072A19]/90 border border-white/15 backdrop-blur-md shadow-lg w-full sm:w-auto ${className}`}
    >
      {/* 3-Segment Pill Switcher */}
      <div className="grid grid-cols-3 sm:flex items-center bg-[#04140C]/90 rounded-full p-1 border border-white/10 shrink-0">
        {[3, 5, 10].map((kw) => {
          const isActive = selectedKw === kw;
          return (
            <button
              key={kw}
              type="button"
              onClick={() => onSelectKw(kw)}
              aria-label={`Select ${kw} kilowatt system`}
              className={`relative px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer select-none text-center ${
                isActive
                  ? "bg-[#8CC63F] text-[#04140C] shadow-md font-bold"
                  : "text-[#9DB3A5] hover:text-white"
              }`}
            >
              {kw} kW
            </button>
          );
        })}
      </div>

      {/* Live Net Cost Label & Package Link */}
      <Link
        href="/packages"
        aria-label={`View ${selectedKw} kW package details, ${formatINR(netCost)} net after subsidy`}
        className="group flex items-center justify-between sm:justify-start gap-1.5 px-3 py-1 text-[11px] sm:text-xs text-[#9DB3A5] hover:text-white transition-colors cursor-pointer"
      >
        <span>
          <strong className="text-white font-semibold">{selectedKw} kW</strong> ·{" "}
          <span className="text-[#8CC63F] font-semibold">{formatINR(netCost)}</span> net
        </span>
        <span className="text-[10px] text-[#8CC63F] font-medium flex items-center gap-0.5">
          View details
          <ArrowUpRight className="w-3 h-3 text-[#8CC63F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </div>
  );
}
