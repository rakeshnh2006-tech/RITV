"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, ShieldAlert, Heart, ExternalLink, Mail, HelpCircle, LifeBuoy } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { BRAND } from "@/lib/brand";
import { useLanguage } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#E6DFEF] bg-linear-to-b from-[#FAF7FC]/80 to-[#F2EFF8]/90 text-[#29252F] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="lg" showTagline={true} taglineVariant="primary" />
            <p className="text-sm text-[#6B6475] leading-relaxed">
              {BRAND.description} Empowering women with culturally sensitive, non-diagnostic health education and clinical preparation tools.
            </p>
            <div className="inline-block px-3 py-1.5 rounded-full clay-badge text-xs text-[#7963A8] font-medium">
              {BRAND.secondaryTagline}
            </div>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#34213D]">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#6B6475]">
              <li>
                <Link href="/app/understand" className="hover:text-[#34213D] transition-colors">
                  {t("nav.understand")}
                </Link>
              </li>
              <li>
                <Link href="/app/pcos" className="hover:text-[#34213D] transition-colors">
                  {t("nav.pcos")}
                </Link>
              </li>
              <li>
                <Link href="/app/chat" className="hover:text-[#34213D] transition-colors">
                  {t("nav.chat")}
                </Link>
              </li>
              <li>
                <Link href="/app/track" className="hover:text-[#34213D] transition-colors">
                  {t("nav.track")}
                </Link>
              </li>
              <li>
                <Link href="/app/consultation" className="hover:text-[#34213D] transition-colors">
                  {t("nav.consultation")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Ethics & Safety */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#34213D]">
              Ethics & Transparency
            </h4>
            <ul className="space-y-2 text-sm text-[#6B6475]">
              <li>
                <Link href="/about" className="hover:text-[#34213D] transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-[#34213D] transition-colors">
                  {t("nav.safety")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#34213D] transition-colors">
                  {t("nav.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/app/settings" className="hover:text-[#34213D] transition-colors">
                  {t("nav.settings")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support / Help Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#34213D] flex items-center gap-1.5">
              <LifeBuoy className="w-3.5 h-3.5 text-[#7963A8]" />
              <span>Support & Help</span>
            </h4>
            <p className="text-xs text-[#6B6475] leading-relaxed">
              Have questions, feedback, or need assistance? Our support team is here to assist you.
            </p>
            <div className="clay-card p-3.5 space-y-2">
              <span className="text-[11px] font-semibold text-[#7963A8] block">Direct Support Mail:</span>
              <a
                href={`mailto:${BRAND.supportEmail}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#34213D] hover:text-[#7963A8] transition-colors break-all"
                title="Send an email to RITVYA Support"
              >
                <Mail className="w-4 h-4 text-[#E98E83] flex-shrink-0" />
                <span>{BRAND.supportEmail}</span>
              </a>
              <p className="text-[10px] text-[#6B6475]">
                We typically respond within 24–48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Helplines Callout Box (Clay card styling) */}
        <div className="clay-card p-6 space-y-3">
          <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <span>Emergency Guidance & Helplines (Not an Emergency Service)</span>
          </div>
          <p className="text-xs text-[#6B6475] leading-relaxed">
            RITVYA does not provide emergency medical interventions. If you are experiencing acute hemorrhaging, unmanageable abdominal pain, chest tightness, or thoughts of self-harm, contact emergency services immediately:
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#29252F]">
            <span className="clay-badge px-3 py-1.5 text-xs gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>India Emergency: <strong>112</strong></span>
            </span>
            <span className="clay-badge px-3 py-1.5 text-xs gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>Medical / Ambulance: <strong>108</strong></span>
            </span>
            <span className="clay-badge px-3 py-1.5 text-xs gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>Maternity Relief: <strong>102</strong></span>
            </span>
            <span className="clay-badge px-3 py-1.5 text-xs gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>Tele-MANAS Mental Health: <strong>14416</strong></span>
            </span>
            <span className="text-[#6B6475] font-normal text-xs">
              Outside India: Call 911 / 999 / 112 or visit your nearest emergency room.
            </span>
          </div>
        </div>

        {/* Medical & Legal Disclaimer & Direct Support Mail Bar */}
        <div className="border-t border-[#E6DFEF] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B6475]">
          <p className="max-w-2xl leading-relaxed">
            <strong>Medical Disclaimer:</strong> {BRAND.disclaimer}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
            <a
              href={`mailto:${BRAND.supportEmail}`}
              className="clay-badge px-3 py-1 text-xs font-semibold text-[#34213D] hover:text-[#7963A8] transition-colors gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#E98E83]" />
              <span>Support / Help: <strong>{BRAND.supportEmail}</strong></span>
            </a>
            <span className="text-[#7963A8]">© 2026 {BRAND.name}. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
