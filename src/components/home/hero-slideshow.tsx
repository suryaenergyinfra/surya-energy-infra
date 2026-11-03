"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useWhatsAppModal } from "@/components/ui/whatsapp-modal-context";
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

// PLACEHOLDER: replace with client's real photo (Rule D)
const HERO_SLIDES = [
  {
    image: "/images/hero-1.webp",
    fallback: "/images/hero-1.jpg",
    headlineLine1: "Power Your Home.",
    headlineLine2: "Cut Your Bill.",
    subline: "PM Surya Ghar authorised rooftop solar, installed end to end across Andhra Pradesh.",
    badge: "Authorised PM Surya Ghar Vendor, Andhra Pradesh",
  },
  {
    image: "/images/hero-2.webp",
    fallback: "/images/hero-2.jpg",
    headlineLine1: "Premium Topcon.",
    headlineLine2: "Maximum Yield.",
    subline: "High-efficiency Topcon solar panels, inverters and structures engineered for residential homes.",
    badge: "Residential Solar EPC Specialist",
  },
  {
    image: "/images/hero-3.webp",
    fallback: "/images/hero-3.jpg",
    headlineLine1: "₹78,000 Subsidy.",
    headlineLine2: "Loans from 5.75%.",
    subline: "Subsidy and bank loan guidance for residential on-grid systems from 3 kW to 10 kW.", // TODO confirm with client
    badge: "3 kW to 10 kW Residential Systems",
  },
];

export function HeroSlideshow() {
  const { openEnquiryModal } = useWhatsAppModal();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#04140C] text-white pt-24 pb-20 md:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Solar Slideshow"
    >
      {/* Background Slides with Ken Burns motion & subtle forest-green gradient overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-[#04140C] via-[#072A19] to-[#04140C]"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 8, ease: "linear" }}
            className="relative w-full h-full"
          >
            {/* PLACEHOLDER: replace with client's real photo */}
            <Image
              src={slide.image}
              alt="Surya Energy Infra Rooftop Solar"
              fill
              sizes="100vw"
              priority={currentSlide === 0}
              className="object-cover object-center"
            />
          </motion.div>

          {/* Balanced Overlays: Rich solar photo visibility on the right, high text legibility on the left */}
          <div className="absolute inset-0 bg-[#04140C]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04140C] via-[#04140C]/75 to-transparent sm:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04140C] via-[#04140C]/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Action CTAs */}
          <div className="lg:col-span-7">
            {/* Official Vendor Pill Badge */}
            <motion.div
              key={`badge-${currentSlide}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#072A19]/90 backdrop-blur-md border border-[rgba(255,255,255,0.18)] text-[#8CC63F] text-xs sm:text-sm font-medium mb-5 shadow-lg"
            >
              <ShieldCheck className="w-4 h-4 text-[#8CC63F] shrink-0" />
              <span>{slide.badge}</span>
            </motion.div>

            {/* Short bold two-line headline (Rule C.6: weight 500, tracking -0.03em, leading 1.1) */}
            <motion.h1
              key={`headline-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-7xl font-medium font-heading text-white tracking-[-0.03em] leading-[1.08] mb-5 sm:mb-6"
            >
              {slide.headlineLine1} <br />
              <span className="text-[#8CC63F]">{slide.headlineLine2}</span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              key={`subline-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-lg lg:text-xl text-[#9DB3A5] font-normal leading-relaxed mb-8 max-w-2xl"
            >
              {slide.subline}
            </motion.p>

            {/* Two Action CTAs (Rule A.1: on dark use leaf-light with forest-950 text) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <button
                type="button"
                onClick={() =>
                  openEnquiryModal({
                    title: "Get Free Solar Quote",
                    defaultRequirement: "Free Rooftop Survey & Quote",
                    defaultNotes: "Interested in residential rooftop solar in Andhra Pradesh. Looking for PM Surya Ghar subsidy details.",
                  })
                }
                className="bg-[#8CC63F] text-[#04140C] font-semibold hover:bg-[#9ae045] active:scale-95 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base shadow-lg transition-all cursor-pointer"
              >
                Get Free Quote
              </button>
              <Link
                href="/packages"
                className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-[#04140C] px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-medium flex items-center gap-2 transition-all group"
              >
                <span>View Packages</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Mobile Key Fact Badges (Under CTAs on mobile only) */}
            <div className="mt-8 pt-6 border-t border-white/10 flex lg:hidden items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
              <div className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#072A19]/90 border border-white/10 text-xs text-[#8CC63F] font-medium">
                ₹66,000 / kW Complete
              </div>
              <div className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#072A19]/90 border border-white/10 text-xs text-[#8CC63F] font-medium">
                ₹78,000 Subsidy
              </div>
              <div className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#072A19]/90 border border-white/10 text-xs text-white/90 font-medium">
                Loans from 5.75%
              </div>
            </div>
          </div>

          {/* Right Column: Balanced Floating Fact Card so right half is not empty (Rule C.5) */}
          <div className="hidden lg:block lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-[#072A19]/85 backdrop-blur-xl border border-[rgba(255,255,255,0.14)] rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[rgba(255,255,255,0.14)]">
                <div className="w-9 h-9 rounded-xl bg-[#3F8F3A]/20 flex items-center justify-center text-[#8CC63F]">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="text-base font-medium font-heading text-white">
                    PM Surya Ghar Authorised
                  </h3>
                  <span className="text-xs text-[#9DB3A5]">Andhra Pradesh Residential Solar</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#04140C]/60 border border-[rgba(255,255,255,0.1)]">
                  <span className="text-[#9DB3A5]">Turnkey EPC Rate:</span>
                  <span className="font-semibold text-[#8CC63F]">₹66,000 / kW Complete</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#04140C]/60 border border-[rgba(255,255,255,0.1)]">
                  <span className="text-[#9DB3A5]">Central Subsidy:</span>
                  <span className="font-semibold text-[#8CC63F]">₹78,000 (≥ 3 kW)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#04140C]/60 border border-[rgba(255,255,255,0.1)]">
                  <span className="text-[#9DB3A5]">Bank Loan Rate:</span>
                  <span className="font-semibold text-white">From 5.75% p.a. (up to ₹2 Lakh)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#04140C]/60 border border-[rgba(255,255,255,0.1)]">
                  <span className="text-[#9DB3A5]">Working Hours:</span>
                  <span className="font-semibold text-white">Mon – Sat, 9 AM – 6 PM</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.14)] flex items-center gap-2 text-xs text-[#9DB3A5]">
                <CheckCircle2 className="w-4 h-4 text-[#8CC63F]" />
                <span>Premium Topcon panels, inverters & structures</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Prev / Next Navigation Controls - Lifted on mobile to avoid bottom sticky bar */}
      <div className="absolute bottom-20 sm:bottom-8 right-4 sm:right-12 z-20 flex items-center gap-2.5">
        <span className="text-xs font-mono text-[#9DB3A5] mr-1">
          0{currentSlide + 1} / 0{HERO_SLIDES.length}
        </span>

        <button
          onClick={prevSlide}
          aria-label="Previous Hero Slide"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#04140C]/60 hover:bg-[#072A19] active:scale-95 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Hero Slide"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#04140C]/60 hover:bg-[#072A19] active:scale-95 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators on bottom left - Lifted on mobile to avoid bottom sticky bar */}
      <div className="absolute bottom-21 sm:bottom-9 left-4 sm:left-12 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentSlide ? "w-8 bg-[#8CC63F]" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
