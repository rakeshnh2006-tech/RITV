"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  taglineVariant?: "primary" | "secondary";
  asLink?: boolean;
  className?: string;
  theme?: "light" | "dark";
}

export function Logo({
  size = "md",
  showTagline = false,
  taglineVariant = "primary",
  asLink = true,
  className = "",
  theme = "light",
}: LogoProps) {
  const dimensions = {
    sm: { width: 36, height: 36, text: "text-lg", tag: "text-[10px]" },
    md: { width: 48, height: 48, text: "text-xl", tag: "text-xs" },
    lg: { width: 64, height: 64, text: "text-2xl", tag: "text-sm" },
    xl: { width: 96, height: 96, text: "text-3xl", tag: "text-base" },
  }[size];

  const tagline =
    taglineVariant === "primary" ? BRAND.primaryTagline : BRAND.secondaryTagline;

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div
        className="relative overflow-hidden rounded-2xl border border-white/90 shadow-[3px_4px_10px_rgba(52,33,61,0.08),-2px_-2px_6px_rgba(255,255,255,0.95),inset_1px_1px_2px_rgba(255,255,255,0.9)] transition-transform duration-200 hover:scale-[1.03] flex-shrink-0 bg-[#FFFDF9]"
        style={{
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        <Image
          src={BRAND.logoUrl}
          alt="RITVYA Official Logo"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="object-contain w-full h-full"
        />
      </div>
      <div className="flex flex-col">
        <span
          className={`font-semibold tracking-wider font-serif ${dimensions.text} leading-none`}
          style={{ color: theme === "dark" ? "#FFFDF9" : "#34213D" }}
        >
          {BRAND.name}
        </span>
        {showTagline && (
          <span
            className={`${dimensions.tag} font-medium tracking-wide mt-1 leading-tight`}
            style={{ color: theme === "dark" ? "#E6DFEF" : "#7963A8" }}
          >
            {tagline}
          </span>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className="inline-block focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#7963A8] rounded-xl">
        {content}
      </Link>
    );
  }

  return content;
}
