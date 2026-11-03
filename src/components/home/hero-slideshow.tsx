"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useWhatsAppModal } from "@/components/ui/whatsapp-modal-context";
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight } from "lucide-react";
import { HeroSolarCard } from "@/components/home/hero-solar-card";

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
    image: "/images/client-family.jpg",
    fallback: "/images/client-family.jpg",
    headlineLine1: "Happy Clients.",
    headlineLine2: "Zero Power Bills.",
    subline: "Real Andhra Pradesh homeowners in Darsi and Prakasam saving every month with rooftop solar.",
    badge: "Real Installations Across Andhra Pradesh",
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
      className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#04140C] text-white pt-24 pb-16 lg:pt-28 lg:pb-20"
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
              className="text-3xl sm:text-5xl lg:text-6xl font-medium font-heading text-white tracking-[-0.03em] leading-[1.1] mb-4 sm:mb-5"
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
              className="text-sm sm:text-base lg:text-lg text-[#9DB3A5] font-normal leading-relaxed mb-6 sm:mb-8 max-w-xl"
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
                className="bg-[#8CC63F] text-[#04140C] font-semibold hover:bg-[#9ae045] active:scale-95 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base shadow-[0_8px_25px_rgba(140,198,63,0.3)] transition-all cursor-pointer"
              >
                Get Free Quote
              </button>
              <Link
                href="/packages"
                className="bg-white/10 hover:bg-white text-white hover:text-[#04140C] border border-white/30 backdrop-blur-sm px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-medium flex items-center gap-2 transition-all group shadow-sm active:scale-95"
              >
                <span>View Packages</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Mobile Solar Card */}
            <div className="mt-8 block lg:hidden">
              <HeroSolarCard />
            </div>

            {/* Mobile Key Fact Badges (Under CTAs on mobile) */}
            <div className="mt-6 pt-4 border-t border-white/10 flex lg:hidden items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
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

          {/* Right Column: Realistic 3D Interactive Solar Module Card */}
          <div className="hidden lg:block lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HeroSolarCard />
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
