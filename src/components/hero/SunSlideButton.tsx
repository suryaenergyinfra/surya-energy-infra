"use client";

import React, { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { Sun, Sparkles } from "lucide-react";

interface SunSlideButtonProps {
  className?: string;
}

export function SunSlideButton({ className = "" }: SunSlideButtonProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const [maxTravel, setMaxTravel] = useState(200);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  const targetUrl =
    "https://wa.me/919494953848?text=Hi%20Surya%20Energy%20Infra%2C%20I%27d%20like%20a%20free%20solar%20quote";

  useEffect(() => {
    const updateTravel = () => {
      if (trackRef.current) {
        setMaxTravel(Math.max(120, trackRef.current.clientWidth - 56));
      }
    };
    updateTravel();
    window.addEventListener("resize", updateTravel);
    return () => window.removeEventListener("resize", updateTravel);
  }, []);

  const triggerCompletion = useCallback(() => {
    setIsCompleted(true);
    setDragProgress(1);

    // Haptic vibration feedback
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // Ignore vibration errors
      }
    }

    // Short ray burst before opening link
    setTimeout(() => {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
      setTimeout(() => {
        setIsCompleted(false);
        setDragProgress(0);
      }, 1200);
    }, 450);
  }, [targetUrl]);

  // Handle pointer down (mouse or touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isCompleted) return;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current || isCompleted) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const knobWidth = 48; // knob size
    const maxDistance = trackRect.width - knobWidth - 8; // 4px padding each side
    const currentX = e.clientX - trackRect.left - knobWidth / 2;
    const clampedProgress = Math.max(0, Math.min(1, currentX / maxDistance));

    setDragProgress(clampedProgress);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || isCompleted) return;
    setIsDragging(false);

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    // Rule C.1: At >= 90% release it snaps to end and triggers
    if (dragProgress >= 0.9) {
      triggerCompletion();
    } else {
      // Under 90% it springs back
      setDragProgress(0);
    }
  };

  // Keyboard accessibility: Enter, Space, or ArrowRight triggers
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
      e.preventDefault();
      triggerCompletion();
    }
  };

  // Desktop Magnetic Hover (translate up to 6px toward cursor)
  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    if (isDragging || isCompleted) return;

    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
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
      ref={trackRef}
      onMouseMove={handleMagneticMove}
      onMouseLeave={handleMagneticLeave}
      style={{
        transform: `translate3d(${magneticOffset.x}px, ${magneticOffset.y}px, 0)`,
        transition: isDragging ? "none" : "transform 0.25s ease-out",
      }}
      className={`relative w-full sm:w-[260px] h-16 rounded-full bg-[#072A19] border border-[#8CC63F]/40 shadow-[0_4px_24px_rgba(4,20,12,0.8),0_0_15px_rgba(140,198,63,0.18)] select-none overflow-hidden touch-none p-1 flex items-center ${className}`}
      aria-label="Slide the sun to get a free solar quote on WhatsApp"
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(dragProgress * 100)}
    >
      {/* Dynamic Leaf-Gradient Fill behind the knob */}
      <div
        className="absolute left-1 top-1 bottom-1 rounded-full pointer-events-none transition-all"
        style={{
          width: `calc(${dragProgress * 100}% + 48px)`,
          maxWidth: "calc(100% - 8px)",
          background: "linear-gradient(135deg, #3F8F3A 0%, #8CC63F 100%)",
          opacity: dragProgress > 0.05 ? 0.95 : 0,
          transition: isDragging ? "none" : "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Track Label Text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 pl-10 pr-4"
        style={{
          opacity: 1 - dragProgress * 1.5,
        }}
      >
        <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#9DB3A5] flex items-center gap-1.5 whitespace-nowrap">
          Slide to get quote <span className="text-[#8CC63F] font-bold">→</span>
        </span>
      </div>

      {/* Draggable Circular Knob with Sun-Leaf Logo */}
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          transform: `translateX(${dragProgress * maxTravel}px)`,
          transition: isDragging ? "none" : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={`relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-[#3F8F3A] to-[#8CC63F] text-[#04140C] flex items-center justify-center shadow-[0_4px_16px_rgba(140,198,63,0.5)] cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-[#8CC63F] focus:ring-offset-2 focus:ring-offset-[#072A19] shrink-0 transition-shadow ${
          isCompleted ? "scale-105" : ""
        }`}
        aria-label="Drag knob to request quote"
      >
        {isCompleted ? (
          <Sparkles className="w-5 h-5 text-[#04140C] animate-spin" />
        ) : (
          <Sun className="w-5 h-5 fill-current text-[#04140C]" />
        )}

        {/* Burst effect on completion */}
        {isCompleted && (
          <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75 pointer-events-none" />
        )}
      </div>

      {/* Visually hidden normal link for accessibility and crawlers */}
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
