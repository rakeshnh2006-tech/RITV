"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  AlertCircle,
  Calendar,
  Activity,
  ShieldCheck,
  ArrowRight,
  Info,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { LocalStore } from "@/lib/db/store";
import { calculateHealthInsights, HealthInsights } from "@/lib/insights/calculator";
import { CycleEntry, HealthEntry } from "@/lib/db/types";

export default function InsightsPage() {
  const { t } = useLanguage();
  const [cycles, setCycles] = useState<CycleEntry[]>([]);
  const [healthEntries, setHealthEntries] = useState<HealthEntry[]>([]);
  const [insights, setInsights] = useState<HealthInsights | null>(null);

  useEffect(() => {
    const c = LocalStore.getCycleEntries();
    const h = LocalStore.getHealthEntries();
    setCycles(c);
    setHealthEntries(h);
    setInsights(calculateHealthInsights(c, h));
  }, []);

  const hasData =
    (insights?.cycleStats.hasSufficientData ?? false) ||
    (insights?.hasSufficientHealthData ?? false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F2EFF8] text-[#7963A8] border border-[#E6DFEF]">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Empirical Self-Reported Patterns</span>
        </div>
        <h1 className="text-3xl font-bold font-serif text-[#34213D]">
          {t("nav.insights")}
        </h1>
        <p className="text-sm text-[#6B6475]">
          Objective observations calculated strictly from your saved records. These mathematical summaries reflect recorded associations, not medical diagnoses.
        </p>
      </div>

      {/* Insufficient Data State */}
      {!hasData ? (
        <div className="p-8 sm:p-12 text-center rounded-3xl border-2 border-dashed border-[#E6DFEF] bg-[#FAF7FC] space-y-4">
          <div className="p-3.5 w-12 h-12 mx-auto rounded-full bg-[#F2EFF8] text-[#7963A8] flex items-center justify-center">
            <Info className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#34213D]">
            More Logged Observations Needed for Insights
          </h3>
          <p className="text-xs text-[#6B6475] max-w-md mx-auto leading-relaxed">
            To prevent speculative conclusions, RITVYA requires at least two cycle records or multiple health observations before generating frequency trends.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/app/track"
              className="px-5 py-2.5 rounded-xl font-semibold text-white bg-[#34213D] text-xs shadow-xs hover:bg-[#24142B] transition-colors"
            >
              Add Health Observations
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Average Cycle Length */}
            <div className="p-6 rounded-2xl bg-white border border-[#E6DFEF] shadow-2xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6475]">
                Average Observed Cycle
              </span>
              <div className="text-3xl font-bold font-serif text-[#34213D]">
                {insights?.cycleStats.averageCycleLengthDays
                  ? `${insights.cycleStats.averageCycleLengthDays} Days`
                  : "N/A"}
              </div>
              <p className="text-[11px] text-[#6B6475]">
                {insights?.cycleStats.hasSufficientData
                  ? `Across ${insights.cycleStats.cycleIntervals.length} recorded intervals`
                  : "Need at least 2 cycle start dates"}
              </p>
            </div>

            {/* Cycle Variance */}
            <div className="p-6 rounded-2xl bg-white border border-[#E6DFEF] shadow-2xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6475]">
                Cycle Length Range
              </span>
              <div className="text-2xl font-bold font-serif text-[#34213D]">
                {insights?.cycleStats.minCycleLengthDays && insights?.cycleStats.maxCycleLengthDays
                  ? `${insights.cycleStats.minCycleLengthDays} – ${insights.cycleStats.maxCycleLengthDays} Days`
                  : "—"}
              </div>
              <p className="text-[11px] text-[#6B6475]">
                {insights?.cycleStats.isIrregular
                  ? "Variance > 8 days (discuss with doctor)"
                  : "Within routine menstrual physiological bounds"}
              </p>
            </div>

            {/* Average Pain Score */}
            <div className="p-6 rounded-2xl bg-white border border-[#E6DFEF] shadow-2xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6475]">
                Average Pain Score
              </span>
              <div className="text-3xl font-bold font-serif text-[#34213D]">
                {insights?.averagePainScore !== null
                  ? `${insights?.averagePainScore} / 10`
                  : "—"}
              </div>
              <p className="text-[11px] text-[#6B6475]">
                Based on {healthEntries.filter((h) => typeof h.painScore === "number").length} logged scores
              </p>
            </div>
          </div>

          {/* Symptom Frequency Distribution */}
          {insights && insights.topSymptoms.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DFEF] shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#34213D]">
                Most Frequently Reported Physical Observations
              </h3>
              <div className="space-y-3">
                {insights.topSymptoms.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#34213D]">{item.symptom}</span>
                      <span className="text-[#6B6475]">
                        {item.count} times ({item.percentage}% of entries)
                      </span>
                    </div>
                    {/* Visual Bar */}
                    <div className="w-full bg-[#F2EFF8] rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-[#7963A8] h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(item.percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clinician Discussion Points */}
          {insights && insights.clinicianDiscussionNotes.length > 0 && (
            <div className="p-6 rounded-3xl bg-[#F2EFF8] border border-[#E6DFEF] space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#34213D] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#7963A8]" />
                <span>Patterns to Share with Your Doctor</span>
              </h3>
              <ul className="space-y-2 text-xs text-[#29252F]">
                {insights.clinicianDiscussionNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#7963A8] font-bold">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Link
                  href="/app/consultation"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7963A8] hover:text-[#34213D]"
                >
                  <span>Build Appointment Summary with these Trends</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Medical Notice */}
          <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E6DFEF] text-[11px] text-[#6B6475] italic leading-relaxed">
            <strong>Statistical Disclaimer:</strong> Observed trends represent mathematical frequencies of your self-entered entries over time. Correlation between symptoms does not prove medical causation or pathology. Always review concerning trends with a qualified clinician.
          </div>
        </div>
      )}
    </div>
  );
}
