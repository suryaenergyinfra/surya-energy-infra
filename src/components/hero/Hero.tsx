"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShieldCheck, Zap } from "lucide-react";
import { useHeroTimeline } from "./useHeroTimeline";
import { SkyLayers } from "./SkyLayers";
import { SunSlideButton } from "./SunSlideButton";
import { KwDial } from "./KwDial";
import { CallButton } from "./CallButton";
import { HoldToCharge } from "./HoldToCharge";
import { motion, useTransform } from "motion/react";

export function Hero() {
  const {
    containerRef,
    smoothProgress,
    dawnOpacity,
    middayOpacity,
    goldenOpacity,
  } = useHeroTimeline();

  const [selectedKw, setSelectedKw] = useState<number>(5); // Default 5 kW
  const [isMobileSmall, setIsMobileSmall] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 480;
    }
    return false;
  });

  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Mobile small screen check (< 480px for HoldToCharge button)
  useEffect(() => {
    const handleResize = () => {
      setIsMobileSmall(window.innerWidth < 480);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop Pointer Parallax Tracking for subtle card depth
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1 to +1
    const ny = (e.clientY / window.innerHeight) * 2 - 1; // -1 to +1
    setMouseOffset({ x: -nx * 8, y: -ny * 6 });
  };

  // Scroll Progress Rail percentage fill
  const railFillWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative w-full h-[200vh] lg:h-[220vh] bg-[#04140C] text-white"
      aria-label="Sunrise on Your Roof Solar Experience"
    >
      {/* Sticky Inner Container: Locks to viewport for the scroll timeline scrub */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between select-none">
        {/* Layer 1: Sky Plates Backdrop (Dawn, Midday, Golden Hour) */}
        <SkyLayers
          dawnOpacity={dawnOpacity}
          middayOpacity={middayOpacity}
          goldenOpacity={goldenOpacity}
        />

        {/* Layer 2: Main Hero Content & Isometric Solar Card */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 sm:pt-20 lg:pt-24 pb-2 my-auto pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center w-full">
            {/* Left Column: Heading, Subtitle, CTA buttons, kW Dial */}
            <div className="lg:col-span-7 pointer-events-auto">
              {/* Authorised Vendor Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#072A19]/90 backdrop-blur-md border border-[rgba(255,255,255,0.18)] text-[#8CC63F] text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-[#8CC63F] shrink-0" />
                <span>Authorised PM Surya Ghar Vendor · Andhra Pradesh</span>
              </div>

              {/* H1 (Rule A: two lines, second line in leaf-light, weight 500, tracking -0.03em) */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium font-heading text-white tracking-[-0.03em] leading-[1.08] mb-3 sm:mb-4">
                Your Roof. <br />
                <span className="text-[#8CC63F]">Your Power Plant.</span>
              </h1>

              {/* Subline (Rule A: client facts only) */}
              <p className="text-xs sm:text-base lg:text-lg text-[#9DB3A5] font-normal leading-relaxed mb-4 sm:mb-6 max-w-xl">
                Residential solar EPC with premium Topcon panels, inverters and structures. 3 kW to 10 kW.
              </p>

              {/* Interactive Action Buttons */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                {/* Primary Action: Slide the Sun OR Mobile Hold to Charge */}
                <div className="flex-1 sm:flex-none">
                  {isMobileSmall ? (
                    <HoldToCharge />
                  ) : (
                    <SunSlideButton />
                  )}
                </div>

                {/* Tertiary Action: Phone Call with solar ray ripples */}
                <CallButton />
              </div>

              {/* Secondary Action: Interactive kW Dial Segment */}
              <div className="mt-3 sm:mt-4">
                <KwDial
                  selectedKw={selectedKw}
                  onSelectKw={(kw) => setSelectedKw(kw)}
                />
              </div>
            </div>

            {/* Right Column (Desktop) / Lower Card (Mobile): High-Fidelity 3D Solar Home Card */}
            <div className="lg:col-span-5 pointer-events-auto flex justify-center lg:justify-end">
              <div
                className="group relative w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[580px] aspect-[16/10] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(4,20,12,0.9)] border border-white/15 bg-[#04140C]/60 backdrop-blur-md transition-all duration-300 hover:border-[#8CC63F]/40"
                style={{
                  transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                  transition: "transform 0.25s ease-out",
                }}
              >
                <Image
                  src="/images/hero/house-ref.webp"
                  alt="Surya Energy Infra modern residential rooftop solar installation"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Atmospheric Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04140C]/90 via-[#04140C]/20 to-transparent pointer-events-none" />

                {/* Floating Top-Left Chip: Active System Size */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 px-3 py-1.5 rounded-full bg-[#072A19]/90 backdrop-blur-md border border-[#8CC63F]/50 shadow-lg flex items-center gap-2 text-[#8CC63F] text-xs font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CC63F] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8CC63F]" />
                  </span>
                  <span>{selectedKw} kW Topcon Solar Array</span>
                </div>

                {/* Floating Bottom-Right Chip: Fixed Central Subsidy */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 px-3 py-1.5 rounded-full bg-[#072A19]/90 backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-1.5 text-white text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5 text-[#8CC63F] fill-current" />
                  <span>₹78,000 Direct Central Subsidy</span>
                </div>

                {/* Floating Bottom-Left Chip (Tablet & Desktop): Turnkey Rate */}
                <div className="hidden sm:flex absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 px-3 py-1.5 rounded-full bg-[#072A19]/90 backdrop-blur-md border border-white/15 shadow-lg text-[#9DB3A5] text-xs font-medium">
                  ₹66,000 / kW Complete EPC
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rail: Timeline Scroll Progress "Dawn → Golden hour" */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-5 sm:pb-8 lg:pb-10 pointer-events-none">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#9DB3A5] mb-2 pointer-events-auto px-1">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#04140C]/70 backdrop-blur-md border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#3F8F3A]" />
              Dawn
            </span>
            <span className="text-white/70 px-2.5 py-0.5 rounded-full bg-[#04140C]/70 backdrop-blur-md border border-white/10">
              Midday
            </span>
            <span className="flex items-center gap-1.5 text-[#8CC63F] px-2.5 py-0.5 rounded-full bg-[#04140C]/70 backdrop-blur-md border border-[#8CC63F]/30">
              Golden Hour
              <span className="w-2 h-2 rounded-full bg-[#8CC63F]" />
            </span>
          </div>

          {/* Thin Progress Rail with Signature Leaf Gradient Fill */}
          <div className="relative w-full h-1.5 rounded-full bg-white/20 overflow-hidden backdrop-blur-sm pointer-events-auto shadow-inner">
            <motion.div
              style={{ width: railFillWidth }}
              className="h-full rounded-full bg-gradient-to-r from-[#3F8F3A] to-[#8CC63F] shadow-[0_0_12px_rgba(140,198,63,0.7)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
