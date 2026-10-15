"use client";

import React, { useState } from "react";
import {
  Settings,
  Globe,
  Mic,
  Shield,
  Download,
  Trash2,
  Lock,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Info,
  Mail,
  LifeBuoy,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { LocalStore } from "@/lib/db/store";
import { SupportedLocale } from "@/lib/i18n/types";
import { BRAND } from "@/lib/brand";

export default function SettingsPage() {
  const { t, locale, setLocale, languages, currentLanguage } = useLanguage();
  const { user, isDemo, signOut } = useAuth();

  const [enableVoice, setEnableVoice] = useState(false);
  const [enableTracking, setEnableTracking] = useState(true);
  const [storeChatHistory, setStoreChatHistory] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  const handleExportJSON = () => {
    const jsonStr = LocalStore.exportDataJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ritvya_health_export_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setNotification("Health data exported as JSON.");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleClearAllData = () => {
    if (confirm(t("settings.confirmDeleteAll"))) {
      LocalStore.clearAllData();
      localStorage.removeItem("ritvya_chat_messages");
      setNotification("All local health observations and chat logs have been permanently deleted.");
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F2EFF8] text-[#7963A8] border border-[#E6DFEF]">
          <Settings className="w-3.5 h-3.5" />
          <span>User Preferences & Governance</span>
        </div>
        <h1 className="text-3xl font-bold font-serif text-[#34213D]">
          {t("settings.title")}
        </h1>
        <p className="text-sm text-[#6B6475]">
          Control your language, tracking opt-ins, data portability, and privacy settings.
        </p>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Account & Session Status */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DFEF] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#34213D]">Session & Account Status</h2>
            <p className="text-xs text-[#6B6475]">
              Signed in as {user?.email || "member@ritvya.health"} • Active Session
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Clinical AI Active</span>
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF7FC] border border-[#E6DFEF] text-xs text-[#6B6475] space-y-1">
          <span className="font-semibold text-[#34213D] block">Data Privacy Guarantee:</span>
          <p>
            Your health entries and consultation summaries are encrypted and stored safely on your device. We uphold zero-knowledge privacy standards and never sell or monetize your sensitive cycle data.
          </p>
        </div>
      </div>

      {/* 1. Language Preferences */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DFEF] shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-[#34213D] font-bold text-base">
          <Globe className="w-5 h-5 text-[#7963A8]" />
          <span>{t("settings.language")}</span>
        </div>
        <p className="text-xs text-[#6B6475]">
          Choose the language for application labels, symptom understanding prompts, and navigation:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {languages.map((lang) => {
            const isSelected = locale === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code as SupportedLocale)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? "bg-[#34213D] text-white border-[#34213D] shadow-xs font-bold"
                    : "bg-[#FAF7FC] text-[#29252F] border-[#E6DFEF] hover:bg-[#F2EFF8]"
                }`}
              >
                <div className="text-sm">{lang.nativeName}</div>
                <div className={`text-[10px] ${isSelected ? "text-white/80" : "text-[#6B6475]"}`}>
                  {lang.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Tracking & Voice Opt-Ins */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DFEF] shadow-sm space-y-6">
        <h2 className="text-base font-bold text-[#34213D]">
          Feature Consents & Opt-Ins
        </h2>

        <div className="space-y-4 text-xs">
          <label className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#FAF7FC] border border-[#E6DFEF] cursor-pointer">
            <div className="space-y-0.5">
              <span className="font-bold text-[#34213D] text-sm block">
                Health & Menstrual Cycle Tracking
              </span>
              <p className="text-[#6B6475]">
                Allow the application to maintain your optional health diary and cycle intervals.
              </p>
            </div>
            <input
              type="checkbox"
              checked={enableTracking}
              onChange={(e) => setEnableTracking(e.target.checked)}
              className="mt-1 rounded border-[#E6DFEF] text-[#7963A8] focus:ring-[#7963A8]"
            />
          </label>

          <label className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#FAF7FC] border border-[#E6DFEF] cursor-pointer">
            <div className="space-y-0.5">
              <span className="font-bold text-[#34213D] text-sm block">
                Store Educational Chat History
              </span>
              <p className="text-[#6B6475]">
                Save recent health chat messages locally so you can review previous conversations.
              </p>
            </div>
            <input
              type="checkbox"
              checked={storeChatHistory}
              onChange={(e) => setStoreChatHistory(e.target.checked)}
              className="mt-1 rounded border-[#E6DFEF] text-[#7963A8] focus:ring-[#7963A8]"
            />
          </label>
        </div>
      </div>

      {/* 3. Data Portability & Permanent Deletion */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DFEF] shadow-sm space-y-6">
        <h2 className="text-base font-bold text-[#34213D]">
          Data Export & Permanent Erasure
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-[#E6DFEF] bg-[#FAF7FC] space-y-3">
            <Download className="w-5 h-5 text-[#7963A8]" />
            <h4 className="text-sm font-bold text-[#34213D]">{t("settings.dataExport")}</h4>
            <p className="text-xs text-[#6B6475]">
              Download a complete JSON file containing your self-reported cycle dates, health notes, and saved doctor summaries.
            </p>
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#34213D] bg-white border border-[#E6DFEF] hover:bg-[#F2EFF8] shadow-2xs transition-colors"
            >
              <span>Download JSON Export</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl border border-red-200 bg-red-50/50 space-y-3">
            <Trash2 className="w-5 h-5 text-red-600" />
            <h4 className="text-sm font-bold text-red-950">{t("settings.deleteAll")}</h4>
            <p className="text-xs text-red-800 leading-relaxed">
              Permanently purge all saved cycles, daily symptoms, consultation summaries, and conversation logs from this device.
            </p>
            <button
              onClick={handleClearAllData}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              <span>Delete All Stored Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Support & Help Mail Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DFEF] shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-[#34213D] font-bold text-base">
          <LifeBuoy className="w-5 h-5 text-[#7963A8]" />
          <span>Support & Help Center</span>
        </div>
        <p className="text-xs text-[#6B6475] leading-relaxed">
          Need technical assistance, have questions regarding health education modules, or wish to provide product feedback? Our team is dedicated to supporting your experience.
        </p>
        <div className="clay-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[#7963A8] block">Direct Support Mail:</span>
            <a
              href={`mailto:${BRAND.supportEmail}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#34213D] hover:text-[#7963A8] transition-colors"
              title="Email RITVYA Support"
            >
              <Mail className="w-4 h-4 text-[#E98E83]" />
              <span>{BRAND.supportEmail}</span>
            </a>
            <p className="text-[10px] text-[#6B6475]">
              Response turnaround: Typically within 24–48 hours.
            </p>
          </div>
          <a
            href={`mailto:${BRAND.supportEmail}?subject=RITVYA%20Support%20Request`}
            className="clay-btn px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5 self-start sm:self-center"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Send Support Mail</span>
          </a>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={() => signOut()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-[#6B6475] hover:text-red-600 border border-[#E6DFEF] bg-white hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>{t("nav.signOut")} / Reset Session</span>
        </button>
      </div>
    </div>
  );
}
