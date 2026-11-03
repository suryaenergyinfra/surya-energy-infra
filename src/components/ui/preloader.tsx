"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

export function Preloader() {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    // Asynchronous check to avoid synchronous cascading renders
    const startTimer = setTimeout(() => {
      const hasSeenPreloader = sessionStorage.getItem("sei_preloader_seen");
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (hasSeenPreloader || prefersReducedMotion) {
        setLoading(false);
        return;
      }

      setShouldRender(true);

      // Sequence 0% -> 50% -> 100% under ~1.8 seconds total
      const t1 = setTimeout(() => setProgress(50), 300);
      const t2 = setTimeout(() => setProgress(100), 850);
      const t3 = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("sei_preloader_seen", "true");
      }, 1500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }, 10);

    return () => clearTimeout(startTimer);
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#04140C] text-white select-none px-6"
        >
          {/* Subtle background glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#3F8F3A]/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
            {/* Circular Leaf Mark */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-24 h-24 mb-6 rounded-full overflow-hidden p-1 bg-white/5 border border-white/10 shadow-2xl flex items-center justify-center"
            >
              <Image
                src="/leaf-mark.png"
                alt="Charging"
                width={80}
                height={80}
                className="w-18 h-18 object-contain"
                priority
              />
              {/* Charging pulse ring */}
              <div
                className="absolute inset-0 rounded-full border border-[#8CC63F]/40 animate-ping opacity-30"
                style={{ animationDuration: "2s" }}
              />
            </motion.div>

            {/* Wordmark */}
            <h2 className="text-xl md:text-2xl font-bold font-heading tracking-tight mb-2 text-white">
              SURYA ENERGY INFRA<span className="text-[#8CC63F] text-sm align-super">™</span>
            </h2>

            {/* Charging indicator */}
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-[#8CC63F] animate-pulse" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#9DB3A5] font-medium">
                Charging {progress}%
              </p>
            </div>

            {/* Progress Bar with Signature Leaf Gradient */}
            <div className="w-full h-1.5 bg-[#072A19] rounded-full overflow-hidden border border-white/10 p-[1px]">
              <motion.div
                className="h-full rounded-full gradient-leaf"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            <p className="mt-4 text-xs text-[#9DB3A5]/70 tracking-widest uppercase">
              Andhra Pradesh Residential Solar EPC
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
