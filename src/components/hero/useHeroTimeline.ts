"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useSpring, useTransform, MotionValue } from "motion/react";

export interface HeroTimelineState {
  containerRef: React.RefObject<HTMLDivElement | null>;
  rawProgress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
  dawnOpacity: MotionValue<number>;
  middayOpacity: MotionValue<number>;
  goldenOpacity: MotionValue<number>;
  sunX: MotionValue<number>;
  sunY: MotionValue<number>;
  sunScale: MotionValue<number>;
  panelGlow: MotionValue<number>;
  particleIntensity: MotionValue<number>;
  isFallback: boolean;
  reducedMotion: boolean;
}

function checkInitialFallback(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return true;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      hardwareConcurrency?: number;
    };
    if (nav.connection?.saveData || (nav.hardwareConcurrency && nav.hardwareConcurrency < 4)) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
}

function checkInitialReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useHeroTimeline(): HeroTimelineState {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFallback, setIsFallback] = useState<boolean>(checkInitialFallback);
  const [reducedMotion, setReducedMotion] = useState<boolean>(checkInitialReducedMotion);

  // Monitor dynamic changes (reduced-motion toggle & low FPS)
  useEffect(() => {
    // 1. Reduced motion listener
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setIsFallback(true);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // 2. Low FPS detector (under 30fps for 2 seconds)
    let frameCount = 0;
    let lastTime = performance.now();
    let lowFpsTime = 0;
    let animId: number;

    const checkFps = (now: number) => {
      frameCount++;
      const elapsed = now - lastTime;
      if (elapsed >= 500) {
        const fps = (frameCount / elapsed) * 1000;
        if (fps < 30) {
          lowFpsTime += elapsed;
          if (lowFpsTime >= 2000) {
            setIsFallback(true);
            return;
          }
        } else {
          lowFpsTime = 0;
        }
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(checkFps);
    };

    animId = requestAnimationFrame(checkFps);
    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      cancelAnimationFrame(animId);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Layer 1 sky cross-fades
  const dawnOpacity = useTransform(smoothProgress, [0, 0.35, 0.5], [1, 0.4, 0]);
  const middayOpacity = useTransform(smoothProgress, [0.15, 0.45, 0.65, 0.85], [0, 1, 1, 0]);
  const goldenOpacity = useTransform(smoothProgress, [0.55, 0.85, 1], [0, 0.85, 1]);

  // Sun Orb 3D Arc trajectory
  const sunX = useTransform(smoothProgress, [0, 1], [-5.5, 5.5]);
  const sunY = useTransform(smoothProgress, [0, 0.48, 1], [0.2, 4.2, 1.2]);
  const sunScale = useTransform(smoothProgress, [0, 0.5, 1], [0.9, 1.25, 1.1]);

  // Panel emissive intensity ramps as sun illuminates the roof
  const panelGlow = useTransform(smoothProgress, [0.1, 0.6, 1], [0.1, 0.9, 1.0]);

  // Energy particle flow ramps as generation increases
  const particleIntensity = useTransform(smoothProgress, [0.2, 0.7, 1], [0.15, 0.85, 1.0]);

  return {
    containerRef,
    rawProgress: scrollYProgress,
    smoothProgress,
    dawnOpacity,
    middayOpacity,
    goldenOpacity,
    sunX,
    sunY,
    sunScale,
    panelGlow,
    particleIntensity,
    isFallback,
    reducedMotion,
  };
}
