import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primaryOnDark" | "primaryOnLight" | "secondaryOnDark" | "secondaryOnLight" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  showArrow?: boolean;
}

export function Button({
  children,
  className,
  variant = "primaryOnLight",
  size = "md",
  href,
  isExternal = false,
  icon,
  showArrow = false,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer rounded-full group focus-visible:outline-2 focus-visible:outline-[#8CC63F] focus-visible:outline-offset-2";

  const sizeClasses = {
    sm: "px-4 py-2 text-xs sm:text-sm gap-1.5",
    md: "px-6 py-3 text-sm sm:text-base gap-2",
    lg: "px-8 py-3.5 sm:py-4 text-base font-medium gap-2.5",
  }[size];

  const variantClasses = {
    // Primary on dark: leaf-light (#8CC63F) with forest-950 (#04140C) text (Rule A.1)
    primaryOnDark:
      "bg-[#8CC63F] text-[#04140C] font-semibold hover:bg-[#9ae045] hover:-translate-y-0.5 active:translate-y-0 shadow-sm",
    // Primary on light: brand-deep (#0B4A2B) with white text (Rule A.1)
    primaryOnLight:
      "bg-[#0B4A2B] text-white font-medium hover:bg-[#072A19] hover:-translate-y-0.5 active:translate-y-0 shadow-sm",
    // Secondary on dark: transparent with 1px border-white/40, fills white with forest-950 text on hover
    secondaryOnDark:
      "bg-transparent border border-white/40 text-white hover:bg-white hover:text-[#04140C] hover:-translate-y-0.5 active:translate-y-0",
    // Secondary on light: transparent with border-light (#D5E6CC) and text-[#06180F]
    secondaryOnLight:
      "bg-transparent border border-[#D5E6CC] text-[#06180F] hover:bg-[#F1F8EC] hover:border-[#0B4A2B] hover:-translate-y-0.5 active:translate-y-0",
    // Minimal ghost link
    ghost:
      "bg-transparent text-[#0B4A2B] hover:text-[#3F8F3A] p-0 hover:bg-transparent justify-start gap-1.5",
  }[variant];

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
      )}
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseClasses, sizeClasses, variantClasses, className)}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={cn(baseClasses, sizeClasses, variantClasses, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cn(baseClasses, sizeClasses, variantClasses, className)} {...props}>
      {content}
    </button>
  );
}
