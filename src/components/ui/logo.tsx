"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "onDark" | "onLight";
  size?: "sm" | "md" | "lg";
  className?: string;
  linkToHome?: boolean;
}

export function Logo({
  variant = "onDark",
  size = "md",
  className,
  linkToHome = true,
}: LogoProps) {
  // Check if logo-white.svg exists
  const [useWhiteSvg, setUseWhiteSvg] = useState<boolean>(true);

  useEffect(() => {
    // Probe logo-white.svg availability
    fetch("/logo-white.svg", { method: "HEAD" })
      .then((res) => {
        if (!res.ok) setUseWhiteSvg(false);
      })
      .catch(() => setUseWhiteSvg(false));
  }, []);

  const dimensions = {
    sm: { width: 140, height: 32, heightClass: "h-8" },
    md: { width: 180, height: 42, heightClass: "h-10" },
    lg: { width: 230, height: 54, heightClass: "h-13" },
  }[size];

  const content = (
    <div
      className={cn(
        "inline-flex items-center transition-transform duration-200 active:scale-95",
        variant === "onDark" && !useWhiteSvg && "bg-white px-3 py-1.5 rounded-full shadow-md",
        variant === "onDark" && useWhiteSvg && "hover:opacity-90",
        variant === "onLight" && "hover:opacity-90",
        className
      )}
    >
      {variant === "onDark" && useWhiteSvg ? (
        <div className="relative flex items-center">
          <Image
            src="/logo-white.svg"
            alt="Surya Energy Infra™ Logo"
            width={dimensions.width}
            height={dimensions.height}
            className={cn("w-auto object-contain", dimensions.heightClass)}
            priority
          />
        </div>
      ) : (
        <div className="relative flex items-center">
          <Image
            src="/logo.jpeg"
            alt="Surya Energy Infra™ Logo"
            width={dimensions.width}
            height={dimensions.height}
            className={cn(
              "w-auto object-contain",
              dimensions.heightClass,
              variant === "onLight" ? "rounded-lg" : "rounded-full"
            )}
            priority
          />
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" aria-label="Surya Energy Infra - Return to Home" className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
