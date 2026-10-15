"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  History,
  CalendarHeart,
  Activity,
  FileText,
  Trash2,
  ExternalLink,
  PlusCircle,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { LocalStore } from "@/lib/db/store";
import { CycleEntry, HealthEntry, SavedClinicianSummary } from "@/lib/db/types";

export default function HistoryPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "cycles" | "health" | "summaries">("all");
  const [cycles, setCycles] = useState<CycleEntry[]>([]);
  const [healthEntries, setHealthEntries] = useState<HealthEntry[]>([]);
  const [summaries, setSummaries] = useState<SavedClinicianSummary[]>([]);

  const loadAll = () => {
    setCycles(LocalStore.getCycleEntries());
    setHealthEntries(LocalStore.getHealthEntries());
    setSummaries(LocalStore.getSavedSummaries());
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleDeleteCycle = (id: string) => {
    if (confirm("Delete this cycle entry permanently?")) {
      LocalStore.deleteCycleEntry(id);
      loadAll();
    }
  };

  const handleDeleteHealth = (id: string) => {
    if (confirm("Delete this health observation entry permanently?")) {
      LocalStore.deleteHealthEntry(id);
      loadAll();
    }
  };

  const handleDeleteSummary = (id: string) => {
    if (confirm("Delete this saved doctor summary permanently?")) {
      LocalStore.deleteClinicianSummary(id);
      loadAll();
    }
  };

  const totalCount = cycles.length + healthEntries.length + summaries.length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F2EFF8] text-[#7963A8] border border-[#E6DFEF]">
            <History className="w-3.5 h-3.5" />
            <span>Chronological Archives</span>
          </div>
          <h1 className="text-3xl font-bold font-serif text-[#34213D]">
            {t("nav.history")}
          </h1>
          <p className="text-xs text-[#6B6475]">
            Review, manage, or delete all self-reported records and saved doctor summaries.
          </p>
        </div>

        <Link
          href="/app/track"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#34213D] hover:bg-[#24142B] transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Entry</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-[#E6DFEF] gap-2 overflow-x-auto">
        {[
          { key: "all", label: `All Records (${totalCount})` },
          { key: "cycles", label: `Cycles (${cycles.length})` },
          { key: "health", label: `Daily Observations (${healthEntries.length})` },
          { key: "summaries", label: `Doctor Summaries (${summaries.length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`pb-3 px-3 text-xs font-semibold whitespace-nowrap transition-all ${
              filter === tab.key
                ? "border-b-2 border-[#7963A8] text-[#34213D]"
                : "text-[#6B6475] hover:text-[#34213D]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Records Listing */}
      {totalCount === 0 ? (
        <div className="p-10 text-center rounded-3xl border-2 border-dashed border-[#E6DFEF] bg-[#FAF7FC] space-y-3">
          <History className="w-8 h-8 text-[#7963A8] mx-auto opacity-70" />
          <h3 className="text-sm font-bold text-[#34213D]">No saved records found</h3>
          <p className="text-xs text-[#6B6475] max-w-sm mx-auto">
            You have not recorded any health entries or saved any consultation summaries yet.
          </p>
          <div className="pt-2">
            <Link
              href="/app/track"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#7963A8] hover:bg-[#685396]"
            >
              Add First Entry
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Menstrual Cycles */}
          {(filter === "all" || filter === "cycles") &&
            cycles.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-white border border-[#E6DFEF] shadow-2xs flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F2EFF8] text-[#7963A8] mt-0.5">
                    <CalendarHeart className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-[#34213D] text-sm">
                      Cycle Period: {c.startDate} {c.endDate ? `to ${c.endDate}` : "(Ongoing)"}
                    </div>
                    <div className="text-[#6B6475]">
                      Flow: {c.flowIntensity || "Unspecified"} • Cramping: {c.crampingIntensity || 0}/10
                    </div>
                    {c.notes && <p className="text-xs text-[#29252F] italic">{c.notes}</p>}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteCycle(c.id)}
                  className="p-2 text-[#6B6475] hover:text-red-600 rounded-lg transition-colors"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

          {/* Health Entries */}
          {(filter === "all" || filter === "health") &&
            healthEntries.map((h) => (
              <div
                key={h.id}
                className="p-5 rounded-2xl bg-white border border-[#E6DFEF] shadow-2xs flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF7FC] text-[#7963A8] border border-[#E6DFEF] mt-0.5">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-[#34213D] text-sm">
                      Observation Date: {h.entryDate}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {h.symptoms.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#F2EFF8] text-[#7963A8] text-[10px] font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="text-[#6B6475]">
                      Pain: {h.painScore ?? 0}/10 • Mood: {h.mood || "neutral"} • Energy: {h.energyLevel || "moderate"}
                    </div>
                    {h.notes && <p className="text-xs text-[#29252F] italic">{h.notes}</p>}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteHealth(h.id)}
                  className="p-2 text-[#6B6475] hover:text-red-600 rounded-lg transition-colors"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

          {/* Clinician Summaries */}
          {(filter === "all" || filter === "summaries") &&
            summaries.map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-2xl bg-white border border-[#E6DFEF] shadow-2xs flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FBE6E3] text-[#E98E83] mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-[#34213D] text-sm">{s.title}</div>
                    <p className="text-xs text-[#6B6475]">
                      Chief Concern: {s.chiefComplaint}
                    </p>
                    <div className="text-[11px] text-[#7963A8]">
                      Includes {s.questionsForDoctor.length} questions for physician
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/app/consultation"
                    className="p-2 text-[#7963A8] hover:text-[#34213D]"
                    title="Open in Summary Builder"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDeleteSummary(s.id)}
                    className="p-2 text-[#6B6475] hover:text-red-600 rounded-lg transition-colors"
                    title="Delete summary"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
