"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X, Shield, Sparkles, ChevronDown } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { SupportedLocale } from "@/lib/i18n/types";

export function Header() {
  const pathname = usePathname();
  const { t, locale, setLocale, languages, currentLanguage } = useLanguage();
  const { user, isDemo } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { href: "/app/understand", label: t("nav.understand") },
    { href: "/app/pcos", label: t("nav.pcos") },
    { href: "/about", label: t("nav.about") },
    { href: "/safety", label: t("nav.safety") },
    { href: "/privacy", label: t("nav.privacy") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Logo size="md" showTagline={true} taglineVariant="primary" />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all px-3 py-1.5 rounded-xl hover:text-[#34213D] ${
                  isActive
                    ? "text-[#34213D] font-bold clay-badge shadow-[2px_3px_6px_rgba(52,33,61,0.06),-2px_-2px_5px_rgba(255,255,255,0.95)]"
                    : "text-[#6B6475] hover:bg-[#F2EFF8]/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Clinical AI Active Indicator */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold clay-badge text-emerald-800 bg-emerald-50/80 border-emerald-200" title="RITVYA Clinical Intelligence Active">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Clinical AI Active</span>
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="clay-btn-secondary px-3 py-2 text-xs font-medium text-[#34213D] gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#7963A8]"
              aria-label="Select language"
              aria-expanded={langDropdownOpen}
            >
              <Globe className="w-4 h-4 text-[#7963A8]" />
              <span>{currentLanguage.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-[#6B6475]" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 glass-card p-1.5 z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[#6B6475] uppercase tracking-wider border-b border-[#E6DFEF]/60">
                  Select Language
                </div>
                <div className="mt-1 space-y-0.5">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code as SupportedLocale);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        locale === lang.code
                          ? "clay-badge font-bold text-[#34213D]"
                          : "text-[#29252F] hover:bg-[#FAF7FC]"
                      }`}
                    >
                      <span>{lang.nativeName}</span>
                      <span className="text-[10px] text-[#6B6475]">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <Link
            href="/app"
            className="clay-btn px-5 py-2.5 text-sm font-semibold tracking-wide"
          >
            {user ? t("nav.dashboard") : t("hero.ctaPrimary")}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden clay-icon p-2.5 text-[#34213D] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#7963A8]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E6DFEF] bg-[#FFFDF9] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#29252F] hover:bg-[#F2EFF8] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E6DFEF] flex flex-col gap-2">
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-[#34213D]"
            >
              {t("nav.dashboard")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
