"use client";

import React from "react";
import Image from "next/image";
import { motion, MotionValue } from "motion/react";

interface SkyLayersProps {
  dawnOpacity: MotionValue<number>;
  middayOpacity: MotionValue<number>;
  goldenOpacity: MotionValue<number>;
}

export function SkyLayers({ dawnOpacity, middayOpacity, goldenOpacity }: SkyLayersProps) {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 bg-[#04140C]">
      {/* 1. Dawn Sky Plate (Preloaded for LCP) */}
      <motion.div
        style={{ opacity: dawnOpacity }}
        className="absolute inset-0 transition-opacity duration-300 will-change-transform"
      >
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/hero/sky-dawn-m.webp" />
          <Image
            src="/images/hero/sky-dawn.webp"
            alt="Dawn sky over residential rooftops"
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </picture>
      </motion.div>

      {/* 2. Midday Sky Plate */}
      <motion.div
        style={{ opacity: middayOpacity }}
        className="absolute inset-0 transition-opacity duration-300 will-change-transform"
      >
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/hero/sky-midday-m.webp" />
          <Image
            src="/images/hero/sky-midday.webp"
            alt="Midday sky over residential rooftops"
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </picture>
      </motion.div>

      {/* 3. Golden Hour Sky Plate */}
      <motion.div
        style={{ opacity: goldenOpacity }}
        className="absolute inset-0 transition-opacity duration-300 will-change-transform"
      >
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/hero/sky-golden-m.webp" />
          <Image
            src="/images/hero/sky-golden.webp"
            alt="Golden hour sky over residential rooftops"
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </picture>
      </motion.div>

      {/* 4. Film Grain Texture Overlay (6% opacity, tileable) */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url('/images/hero/grain.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* 5. Forest-950 scrim overlay behind typography for guaranteed AA contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#04140C] via-[#04140C]/50 to-[#04140C]/30" />
      <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#04140C]/90 via-[#04140C]/60 to-transparent" />
    </div>
  );
}
