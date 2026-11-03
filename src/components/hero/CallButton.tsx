"use client";

import React, { useState } from "react";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

interface CallButtonProps {
  className?: string;
}

export function CallButton({ className = "" }: CallButtonProps) {
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  // Desktop Magnetic Hover (up to 6px)
  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <a
      href={siteConfig.contact.phoneTel}
      onMouseMove={handleMagneticMove}
      onMouseLeave={handleMagneticLeave}
      style={{
        transform: `translate3d(${magneticOffset.x}px, ${magneticOffset.y}px, 0)`,
        transition: "transform 0.25s ease-out",
      }}
      aria-label="Call Surya Energy Infra at +91 94949 53848"
      className={`group relative inline-flex items-center gap-2.5 h-14 sm:h-16 px-4 rounded-full bg-[#072A19] border border-white/20 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8CC63F] focus:ring-offset-2 focus:ring-offset-[#04140C] select-none transition-all cursor-pointer ${className}`}
    >
      {/* Slow radiating ripple rings (like sun rays) */}
      <span className="absolute -inset-1 rounded-full border border-[#8CC63F]/20 animate-ping opacity-75 pointer-events-none duration-1000" />
      <span className="absolute -inset-2.5 rounded-full border border-[#8CC63F]/15 animate-pulse pointer-events-none" />

      {/* Circular Phone Icon Badge */}
      <div className="w-10 h-10 rounded-full bg-[#04140C] border border-[#8CC63F]/40 flex items-center justify-center text-[#8CC63F] group-hover:scale-105 group-hover:text-white transition-all shrink-0">
        <Phone className="w-4 h-4 fill-current" />
      </div>

      {/* Desktop Text Label */}
      <span className="hidden sm:inline-block pr-2 text-xs sm:text-sm font-semibold tracking-wide text-white group-hover:text-[#8CC63F] transition-colors whitespace-nowrap">
        Call Now
      </span>
    </a>
  );
}
