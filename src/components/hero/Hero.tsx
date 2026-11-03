"use client";

import React, { useState, useRef, useEffect, Suspense, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { useHeroTimeline } from "./useHeroTimeline";
import { SkyLayers } from "./SkyLayers";
import { SunSlideButton } from "./SunSlideButton";
import { KwDial } from "./KwDial";
import { CallButton } from "./CallButton";
import { HoldToCharge } from "./HoldToCharge";
import { motion, useTransform } from "motion/react";

// Dynamically import the 3D Canvas (SSR: false) so LCP is the static poster
const HeroScene = dynamic(
  () => import("./HeroScene").then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => null,
  }
);

const emptySubscribe = () => () => {};

export function Hero() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const {
    containerRef,
    smoothProgress,
    dawnOpacity,
    middayOpacity,
    goldenOpacity,
    isFallback,
  } = useHeroTimeline();

  const [selectedKw, setSelectedKw] = useState<number>(5); // Default 5 kW
  const [isMobileSmall, setIsMobileSmall] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 480;
    }
    return false;
  });

  // Mutable refs for high-frequency 60fps frame loop without React re-renders
  const progressNumRef = useRef<number>(0);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Sync motion smoothProgress to mutable number ref
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      progressNumRef.current = latest;
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Mobile small screen check (< 480px for HoldToCharge button)
  useEffect(() => {
    const handleResize = () => {
      setIsMobileSmall(window.innerWidth < 480);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop Pointer Parallax Tracking
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1 to +1
    const ny = -(e.clientY / window.innerHeight) * 2 + 1; // -1 to +1
    pointerRef.current = { x: nx, y: ny };
  };

  // Optional Gyroscope tilt on mobile if DeviceOrientationEvent is available
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // Clamp gamma (-45 to 45) and beta (0 to 60)
        const gx = Math.max(-1, Math.min(1, e.gamma / 30));
        const gy = Math.max(-1, Math.min(1, (e.beta - 30) / 30));
        pointerRef.current = { x: gx, y: -gy };
      }
    };

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation);
      return () => window.removeEventListener("deviceorientation", handleOrientation);
    }
  }, []);

  // Scroll Progress Rail percentage fill
  const railFillWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative w-full h-[200vh] lg:h-[220vh] bg-[#04140C] text-white"
      aria-label="Sunrise on Your Roof 3D Experience"
    >
      {/* Sticky Inner Container: Locks to viewport for the scroll timeline scrub */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between select-none">
        {/* Layer 1: Sky Plates Backdrop (Dawn, Midday, Golden Hour) */}
        <SkyLayers
          dawnOpacity={dawnOpacity}
          middayOpacity={middayOpacity}
          goldenOpacity={goldenOpacity}
        />

        {/* Layer 2: 3D React Three Fiber Scene OR Static Poster Fallback */}
        {isClient && !isFallback ? (
          <Suspense fallback={null}>
            <HeroScene
              progressRef={progressNumRef}
              selectedKw={selectedKw}
              pointerRef={pointerRef}
            />
          </Suspense>
        ) : (
          /* Static Fallback Poster: House reference with CSS parallax */
          <div
            className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center lg:justify-end lg:pr-16"
            aria-hidden="true"
          >
            <div className="relative w-full max-w-[500px] lg:max-w-[620px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 opacity-90">
              <Image
                src="/images/hero/house-ref.webp"
                alt="Surya Energy Infra 3D rooftop solar reference"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04140C] via-transparent to-transparent" />
            </div>
          </div>
        )}

        {/* Layer 4: HTML Content Overlay (Always accessible, semantic HTML) */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-24 lg:pt-28 pointer-events-none">
          <div className="max-w-2xl pointer-events-auto">
            {/* Authorised Vendor Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#072A19]/90 backdrop-blur-md border border-[rgba(255,255,255,0.18)] text-[#8CC63F] text-xs sm:text-sm font-medium mb-3.5 sm:mb-5 shadow-lg">
              <ShieldCheck className="w-4 h-4 text-[#8CC63F] shrink-0" />
              <span>Authorised PM Surya Ghar Vendor · Andhra Pradesh</span>
            </div>

            {/* H1 (Rule A: two lines, second line in leaf-light, weight 500, tracking -0.03em) */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium font-heading text-white tracking-[-0.03em] leading-[1.08] mb-3.5 sm:mb-5">
              Your Roof. <br />
              <span className="text-[#8CC63F]">Your Power Plant.</span>
            </h1>

            {/* Subline (Rule A: client facts only) */}
            <p className="text-sm sm:text-base lg:text-lg text-[#9DB3A5] font-normal leading-relaxed mb-6 sm:mb-8 max-w-xl">
              Residential solar EPC with premium Topcon panels, inverters and structures. 3 kW to 10 kW.
            </p>

            {/* Interactive Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Primary Action: Slide the Sun OR Mobile Hold to Charge */}
              {isMobileSmall ? (
                <HoldToCharge />
              ) : (
                <SunSlideButton />
              )}

              {/* Tertiary Action: Phone Call with solar ray ripples */}
              <div className="flex items-center gap-3">
                <CallButton />
              </div>
            </div>

            {/* Secondary Action: Interactive kW Dial Segment */}
            <div className="mt-4 sm:mt-5">
              <KwDial
                selectedKw={selectedKw}
                onSelectKw={(kw) => setSelectedKw(kw)}
              />
            </div>
          </div>
        </div>

        {/* Bottom Rail: Timeline Scroll Progress "Dawn → Golden hour" */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-4 sm:pb-6 pointer-events-none">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#9DB3A5] mb-2 pointer-events-auto">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3F8F3A]" />
              Dawn
            </span>
            <span className="text-white/60">Midday</span>
            <span className="flex items-center gap-1.5 text-[#8CC63F]">
              Golden Hour
              <span className="w-2 h-2 rounded-full bg-[#8CC63F]" />
            </span>
          </div>

          {/* Thin Progress Rail with Signature Leaf Gradient Fill */}
          <div className="relative w-full h-1.5 rounded-full bg-white/15 overflow-hidden backdrop-blur-sm pointer-events-auto">
            <motion.div
              style={{ width: railFillWidth }}
              className="h-full rounded-full bg-gradient-to-r from-[#3F8F3A] to-[#8CC63F] shadow-[0_0_10px_rgba(140,198,63,0.6)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
