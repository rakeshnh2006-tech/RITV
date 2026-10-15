"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Stethoscope,
  MessageSquare,
  BookOpen,
  CalendarHeart,
  History,
  TrendingUp,
  FileText,
  Settings,
  Sparkles,
  Globe,
  ChevronDown,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { SupportedLocale } from "@/lib/i18n/types";

export function AppNav() {
  const pathname = usePathname();
  const { t, locale, setLocale, languages, currentLanguage } = useLanguage();
  const { user, isDemo, signOut } = useAuth();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/app", label: t("nav.dashboard"), icon: LayoutDashboard },
    { href: "/app/understand", label: t("nav.understand"), icon: Stethoscope },
    { href: "/app/chat", label: t("nav.chat"), icon: MessageSquare },
    { href: "/app/pcos", label: t("nav.pcos"), icon: BookOpen },
    { href: "/app/track", label: t("nav.track"), icon: CalendarHeart },
    { href: "/app/history", label: t("nav.history"), icon: History },
    { href: "/app/insights", label: t("nav.insights"), icon: TrendingUp },
    { href: "/app/consultation", label: t("nav.consultation"), icon: FileText },
    { href: "/app/settings", label: t("nav.settings"), icon: Settings },
  ];

  return (
    <>
      {/* Top App Header Bar */}
      <header className="sticky top-0 z-40 w-full glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden clay-icon p-2 text-[#34213D] focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Logo size="sm" showTagline={false} />
            <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold clay-badge text-[#7963A8]">
              App Workspace
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Clinical AI Active Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold clay-badge text-emerald-800 bg-emerald-50/80 border-emerald-200" title="Clinical Intelligence Engine Active">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">Clinical AI Active</span>
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="clay-btn-secondary px-3 py-1.5 text-xs font-medium text-[#34213D] gap-1.5 focus:outline-hidden"
                aria-label="Change language"
              >
                <Globe className="w-3.5 h-3.5 text-[#7963A8]" />
                <span>{currentLanguage.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-[#6B6475]" />
              </button>

              {langOpen && (
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
                          setLangOpen(false);
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

            {/* User Greeting / Sign Out */}
            <button
              onClick={() => signOut()}
              title="Sign Out / Reset Session"
              className="clay-icon p-2 text-[#6B6475] hover:text-[#34213D] focus:outline-hidden"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop Horizontal Navigation Bar */}
        <div className="hidden lg:block border-t border-[#E6DFEF]/60 bg-white/70 backdrop-blur-md overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "clay-btn font-bold text-white shadow-sm"
                      : "text-[#6B6475] hover:text-[#34213D] hover:bg-[#F2EFF8]/70"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex">
          <div className="w-72 bg-[#FFFDF9] h-full shadow-2xl p-4 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6DFEF]">
                <Logo size="sm" showTagline={false} />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-lg text-[#6B6475] hover:bg-[#F2EFF8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#34213D] text-white font-semibold"
                          : "text-[#29252F] hover:bg-[#F2EFF8]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-[#E6DFEF] space-y-2">
              <Link
                href="/"
                className="w-full block text-center py-2 px-3 rounded-lg text-xs font-medium text-[#6B6475] hover:bg-[#F2EFF8]"
              >
                Return to Public Website
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setMobileOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
