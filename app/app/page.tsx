"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Stethoscope,
  BookOpen,
  CalendarHeart,
  FileText,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  PlusCircle,
  Clock,
  Heart,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { useLanguage } from "@/lib/i18n/context";
import { LocalStore } from "@/lib/db/store";
import { CycleEntry, HealthEntry, SavedClinicianSummary } from "@/lib/db/types";

export default function DashboardPage() {
  const { user, isDemo } = useAuth();
  const { t } = useLanguage();

  const [cycles, setCycles] = useState<CycleEntry[]>([]);
  const [healthEntries, setHealthEntries] = useState<HealthEntry[]>([]);
  const [summaries, setSummaries] = useState<SavedClinicianSummary[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCycles(LocalStore.getCycleEntries());
    setHealthEntries(LocalStore.getHealthEntries());
    setSummaries(LocalStore.getSavedSummaries());
  }, []);

  const greetingName = user?.name || "Friend";

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner (Glassmorphism Plum) */}
      <div className="relative overflow-hidden glass-card-plum p-8 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold clay-badge text-white/90 bg-white/10 border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#E98E83]" />
            <span>Personal Health Sanctuary</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">
            Welcome, {greetingName}
          </h1>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed">
            Ancient Wisdom. Intelligent Care. Explore your symptoms, deepen your understanding of PCOS and hormone balance, and prepare for confident conversations with your doctor.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/app/understand"
              className="clay-btn-secondary px-5 py-2.5 text-sm font-semibold gap-2"
            >
              <Stethoscope className="w-4 h-4 text-[#7963A8]" />
              <span>Understand a Symptom</span>
            </Link>
            <Link
              href="/app/pcos"
              className="clay-badge px-5 py-2.5 text-sm font-semibold text-white bg-white/15 border-white/25 hover:bg-white/25 gap-2 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore PCOS Center</span>
            </Link>
          </div>
        </div>

        {/* Decorative backdrop elements */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial from-[#E98E83]/20 to-transparent pointer-events-none" />
      </div>

      {/* Safety Notice Reminder (Clay Card Coral) */}
      <div className="clay-card-coral p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#6B6475]">
        <div className="flex items-center gap-2.5">
          <div className="clay-icon-coral w-7 h-7 flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span>
            <strong className="text-[#34213D]">Educational Care Navigation:</strong> RITVYA provides non-diagnostic guidance. In an emergency, always call 112 / 108 or visit an emergency room.
          </span>
        </div>
        <Link href="/safety" className="clay-badge px-3 py-1 font-bold text-[#7963A8] hover:text-[#34213D] whitespace-nowrap self-end sm:self-center">
          Safety Protocol
        </Link>
      </div>

      {/* Core Action Cards (Clay Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Symptom Understanding */}
        <div className="clay-card p-7 flex flex-col justify-between space-y-5">
          <div className="space-y-3.5">
            <div className="clay-icon w-13 h-13 text-[#7963A8]">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#34213D]">Guided Symptom Understanding</h3>
            <p className="text-xs text-[#6B6475] leading-relaxed">
              Describe what you feel in your own words. Receive grounded educational context, warning sign checks, and doctor questions.
            </p>
          </div>
          <Link
            href="/app/understand"
            className="clay-btn-secondary w-full py-2.5 px-4 text-xs font-semibold justify-between"
          >
            <span>Start Symptom Review</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* AI Health Education Chat */}
        <div className="clay-card p-7 flex flex-col justify-between space-y-5">
          <div className="space-y-3.5">
            <div className="clay-icon w-13 h-13 text-[#7963A8]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#34213D]">Health Education Chat</h3>
            <p className="text-xs text-[#6B6475] leading-relaxed">
              Engage in a supportive, nonjudgmental conversation about female physiology, menstrual cycles, and hormonal wellness.
            </p>
          </div>
          <Link
            href="/app/chat"
            className="clay-btn-secondary w-full py-2.5 px-4 text-xs font-semibold justify-between"
          >
            <span>Open Health Chat</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Clinician Summary Builder */}
        <div className="clay-card p-7 flex flex-col justify-between space-y-5">
          <div className="space-y-3.5">
            <div className="clay-icon-coral w-13 h-13">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#34213D]">Doctor Consultation Summary</h3>
            <p className="text-xs text-[#6B6475] leading-relaxed">
              Prepare for your next doctor appointment by selecting observations, cycle intervals, and specific questions into a printable summary.
            </p>
          </div>
          <Link
            href="/app/consultation"
            className="clay-btn-secondary w-full py-2.5 px-4 text-xs font-semibold justify-between"
          >
            <span className="text-[#E98E83]">Build Doctor Summary</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Tracking & Saved Records Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Cycle & Health Observations (Glass Panel) */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-serif text-[#34213D]">
                Recent Health & Cycle Observations
              </h2>
              <p className="text-xs text-[#6B6475]">
                Strictly your self-reported records — no fabricated data or estimations.
              </p>
            </div>
            <Link
              href="/app/track"
              className="clay-btn px-4 py-2 text-xs font-semibold gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Entry</span>
            </Link>
          </div>

          {mounted && healthEntries.length === 0 && cycles.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-[#E6DFEF] bg-[#FAF7FC]/70 space-y-3">
              <div className="clay-icon w-12 h-12 mx-auto text-[#7963A8]">
                <CalendarHeart className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#34213D]">No health records logged yet</h4>
              <p className="text-xs text-[#6B6475] max-w-sm mx-auto">
                Tracking is completely optional. You can log cycle dates, discomfort, energy, and mood to build your personal timeline for doctor visits.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <Link
                  href="/app/track"
                  className="clay-btn px-5 py-2.5 text-xs font-semibold"
                >
                  Log First Entry
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    LocalStore.loadSampleData();
                    setCycles(LocalStore.getCycleEntries());
                    setHealthEntries(LocalStore.getHealthEntries());
                  }}
                  className="clay-btn-secondary px-4 py-2 text-xs font-semibold"
                >
                  Load Example Cycle Timeline
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              {cycles.slice(0, 2).map((c) => (
                <div
                  key={c.id}
                  className="clay-card p-4 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#34213D]">Menstrual Cycle Start: {c.startDate}</span>
                    <p className="text-[#6B6475]">
                      Flow: {c.flowIntensity || "Unspecified"} • Cramping score: {c.crampingIntensity || 0}/10
                    </p>
                  </div>
                  <span className="clay-badge text-[10px] text-[#7963A8] font-bold px-3 py-1">
                    Recorded Cycle
                  </span>
                </div>
              ))}

              {healthEntries.slice(0, 3).map((h) => (
                <div
                  key={h.id}
                  className="clay-card p-4 flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-[#34213D]">{h.entryDate}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {h.symptoms.map((s, idx) => (
                        <span
                          key={idx}
                          className="clay-pill px-2.5 py-0.5 text-[10px] font-medium text-[#7963A8]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  {typeof h.painScore === "number" && (
                    <span className="clay-badge px-2.5 py-1 text-xs font-bold text-[#6B6475]">
                      Pain: {h.painScore}/10
                    </span>
                  )}
                </div>
              ))}

              <div className="pt-2 text-right">
                <Link
                  href="/app/history"
                  className="text-xs font-semibold text-[#7963A8] hover:underline"
                >
                  View All Saved Records ({cycles.length + healthEntries.length}) →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Trends & PCOS Quick Hub */}
        <div className="space-y-6">
          {/* Trends Preview Card */}
          <div className="clay-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#34213D]">Trends & Observations</h3>
              <div className="clay-icon w-8 h-8 text-[#7963A8]">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-[#6B6475]">
              Objective statistical patterns derived only from what you enter.
            </p>
            <div className="clay-card p-4 text-center space-y-1.5 bg-[#FAF7FC]/80">
              <div className="text-2xl font-bold font-serif text-[#34213D]">
                {cycles.length >= 2 ? `${Math.round((new Date(cycles[0].startDate).getTime() - new Date(cycles[1].startDate).getTime()) / (1000 * 60 * 60 * 24))} Days` : "—"}
              </div>
              <div className="text-[11px] text-[#6B6475]">
                {cycles.length >= 2 ? "Observed Interval Between Last 2 Cycles" : "Log 2+ cycles to view interval"}
              </div>
            </div>
            <Link
              href="/app/insights"
              className="clay-btn-secondary w-full py-2.5 px-3 text-xs font-semibold"
            >
              Inspect Data-Derived Trends
            </Link>
          </div>

          {/* PCOS Highlights Card */}
          <div className="clay-card p-6 space-y-3.5 bg-linear-to-br from-[#FAF7FC] to-[#F2EFF8]">
            <span className="clay-badge px-2.5 py-0.5 text-[10px] font-bold text-[#7963A8]">
              Featured Guide
            </span>
            <h3 className="text-base font-bold text-[#34213D]">Understanding Rotterdam Criteria</h3>
            <p className="text-xs text-[#6B6475] leading-relaxed">
              Why an ultrasound alone never diagnoses PCOS, and which 3 clinical features physicians look for.
            </p>
            <Link
              href="/app/pcos"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7963A8] hover:text-[#34213D] pt-1"
            >
              <span>Explore in PCOS Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
