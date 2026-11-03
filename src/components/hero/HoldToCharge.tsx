"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { BatteryCharging, Zap } from "lucide-react";

interface HoldToChargeProps {
  className?: string;
}

export function HoldToCharge({ className = "" }: HoldToChargeProps) {
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 1
  const [isCharging, setIsCharging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastTapRef = useRef<number>(0);

  const targetUrl =
    "https://wa.me/919494953848?text=Hi%20Surya%20Energy%20Infra%2C%20I%27d%20like%20a%20free%20solar%20quote";

  const triggerCompletion = useCallback(() => {
    setIsCompleted(true);
    setHoldProgress(1);

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([20, 40, 20]);
      } catch {
        // Ignore
      }
    }

    setTimeout(() => {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
      setTimeout(() => {
        setIsCompleted(false);
        setHoldProgress(0);
      }, 1000);
    }, 350);
  }, [targetUrl]);

  const startCharging = () => {
    if (isCompleted) return;
    setIsCharging(true);
    startTimeRef.current = Date.now();

    const duration = 1200; // 1.2 seconds required
    const interval = 16; // ~60fps

    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(1, elapsed / duration);
      setHoldProgress(progress);

      if (progress >= 1) {
        if (timerRef.current) clearInterval(timerRef.current);
        triggerCompletion();
      }
    }, interval);
  };

  const cancelCharging = () => {
    if (isCompleted) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsCharging(false);
    setHoldProgress(0);
  };

  // Tap-twice fallback: if user taps twice quickly (< 300ms), triggers immediately
  const handleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      triggerCompletion();
    }
    lastTapRef.current = now;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div
      onPointerDown={startCharging}
      onPointerUp={cancelCharging}
      onPointerCancel={cancelCharging}
      onPointerLeave={cancelCharging}
      onClick={handleTap}
      className={`relative w-full h-14 rounded-full bg-[#072A19] border border-[#8CC63F]/40 shadow-[0_4px_20px_rgba(4,20,12,0.8)] select-none overflow-hidden touch-none flex items-center justify-center p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8CC63F] ${className}`}
      aria-label="Press and hold 1.2 seconds to charge and get a solar quote on WhatsApp, or tap twice"
      role="button"
      tabIndex={0}
    >
      {/* Dynamic Charge Fill from Left */}
      <div
        className="absolute left-0 top-0 bottom-0 pointer-events-none transition-all"
        style={{
          width: `${holdProgress * 100}%`,
          background: "linear-gradient(135deg, #3F8F3A 0%, #8CC63F 100%)",
          opacity: 0.9,
          transition: isCharging ? "none" : "width 0.3s ease-out",
        }}
      />

      {/* Button Content */}
      <div className="relative z-10 flex items-center justify-center gap-2 text-white">
        <div className="w-8 h-8 rounded-full bg-[#04140C]/70 border border-white/20 flex items-center justify-center text-[#8CC63F]">
          {isCharging || isCompleted ? (
            <BatteryCharging className="w-4 h-4 text-[#8CC63F] animate-pulse" />
          ) : (
            <Zap className="w-4 h-4 fill-current text-[#8CC63F]" />
          )}
        </div>

        <span className="text-xs font-semibold tracking-wide">
          {isCompleted
            ? "Ready! Opening WhatsApp..."
            : isCharging
            ? `Charging... ${Math.round(holdProgress * 100)}%`
            : "Hold to Charge & Get Quote →"}
        </span>
      </div>

      {/* Accessible fallback link */}
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="sr-only"
        tabIndex={-1}
      >
        Get Free Solar Quote on WhatsApp
      </a>
    </div>
  );
}
