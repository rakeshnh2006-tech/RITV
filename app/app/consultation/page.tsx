"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Printer,
  Copy,
  Check,
  Calendar,
  AlertCircle,
  HelpCircle,
  Download,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { LocalStore } from "@/lib/db/store";
import { CycleEntry, HealthEntry, SavedClinicianSummary } from "@/lib/db/types";

export default function ClinicianSummaryPage() {
  const { t } = useLanguage();
  const [cycles, setCycles] = useState<CycleEntry[]>([]);
  const [healthEntries, setHealthEntries] = useState<HealthEntry[]>([]);

  // Form states
  const [chiefComplaint, setChiefComplaint] = useState(
    "Irregular menstrual cycle timing (ranging 35-48 days) with pelvic cramping and occasional acne."
  );
  const [doctorQuestions, setDoctorQuestions] = useState([
    "Would a baseline hormone panel (total/free testosterone, TSH, prolactin) and metabolic markers (HbA1c) be appropriate?",
    "Could my cycle irregularity be related to insulin resistance?",
    "What signs or symptom changes should prompt me to contact you sooner?",
  ]);
  const [newQuestionInput, setNewQuestionInput] = useState("");
  const [patientNotes, setPatientNotes] = useState(
    "Diet is mostly home-cooked; sleep averages 7 hours; experiencing work-related stress."
  );

  // Selection states
  const [selectedCycleIds, setSelectedCycleIds] = useState<string[]>([]);
  const [selectedHealthIds, setSelectedHealthIds] = useState<string[]>([]);

  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [currentDate, setCurrentDate] = useState("2026-10-15");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
    const c = LocalStore.getCycleEntries();
    const h = LocalStore.getHealthEntries();
    setCycles(c);
    setHealthEntries(h);
    // By default select all existing
    setSelectedCycleIds(c.map((item) => item.id));
    setSelectedHealthIds(h.map((item) => item.id));
  }, []);

  const toggleCycle = (id: string) => {
    setSelectedCycleIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleHealth = (id: string) => {
    setSelectedHealthIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addQuestion = () => {
    if (newQuestionInput.trim()) {
      setDoctorQuestions([...doctorQuestions, newQuestionInput.trim()]);
      setNewQuestionInput("");
    }
  };

  const removeQuestion = (idx: number) => {
    setDoctorQuestions(doctorQuestions.filter((_, i) => i !== idx));
  };

  const selectedCycles = cycles.filter((c) => selectedCycleIds.includes(c.id));
  const selectedHealth = healthEntries.filter((h) => selectedHealthIds.includes(h.id));

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
RITVYA CLINICIAN APPOINTMENT SUMMARY
Date Generated: ${new Date().toLocaleDateString()}
Disclaimer: This document contains self-reported observations prepared by the patient. It is not an electronic medical record or clinical diagnosis.

CHIEF CONCERN (In Patient's Own Words):
${chiefComplaint}

QUESTIONS FOR CLINICIAN:
${doctorQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}

USER-RECORDED CYCLE HISTORY (${selectedCycles.length} entries included):
${
  selectedCycles.length === 0
    ? "No cycle records selected."
    : selectedCycles
        .map(
          (c) =>
            `• Start: ${c.startDate}${c.endDate ? ` to ${c.endDate}` : ""} | Flow: ${c.flowIntensity || "Unspecified"} | Cramping: ${c.crampingIntensity || 0}/10${c.notes ? ` (${c.notes})` : ""}`
        )
        .join("\n")
}

RECORDED PHYSICAL OBSERVATIONS (${selectedHealth.length} entries included):
${
  selectedHealth.length === 0
    ? "No daily symptom records selected."
    : selectedHealth
        .map(
          (h) =>
            `• ${h.entryDate}: ${h.symptoms.join(", ")} | Pain: ${h.painScore ?? 0}/10 | Mood: ${h.mood || "neutral"}`
        )
        .join("\n")
}

PATIENT CONTEXT NOTES:
${patientNotes || "None provided."}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveSummary = () => {
    LocalStore.saveClinicianSummary({
      title: `Summary for Doctor (${new Date().toLocaleDateString()})`,
      chiefComplaint,
      dateRange: `${new Date().toLocaleDateString()}`,
      includedSymptoms: Array.from(new Set(selectedHealth.flatMap((h) => h.symptoms))),
      questionsForDoctor: doctorQuestions,
      patientNotes,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header - Screen Only */}
      <div className="no-print space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FBE6E3] text-[#E98E83] border border-[#F7D4DA]">
          <FileText className="w-3.5 h-3.5" />
          <span>Patient-Prepared Clinical Summary</span>
        </div>
        <h1 className="text-3xl font-bold font-serif text-[#34213D]">
          {t("summary.title")}
        </h1>
        <p className="text-sm text-[#6B6475]">
          {t("summary.subtitle")}
        </p>
      </div>

      {/* Editor Controls Card - Screen Only (Clay Card) */}
      <div className="no-print clay-card p-6 sm:p-8 space-y-6">
        <h2 className="text-base font-bold text-[#34213D]">
          Customize Your Summary Contents
        </h2>

        {/* 1. Chief Complaint */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#34213D]">
            {t("summary.chiefComplaint")} *
          </label>
          <textarea
            rows={2}
            value={chiefComplaint}
            onChange={(e) => setChiefComplaint(e.target.value)}
            className="clay-input w-full p-3 text-xs"
          />
        </div>

        {/* 2. Questions for Doctor */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#34213D]">
            {t("summary.questionsForDoc")}
          </label>
          <div className="space-y-2">
            {doctorQuestions.map((q, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#7963A8]">{idx + 1}.</span>
                <input
                  type="text"
                  value={q}
                  onChange={(e) => {
                    const updated = [...doctorQuestions];
                    updated[idx] = e.target.value;
                    setDoctorQuestions(updated);
                  }}
                  className="clay-input flex-1 px-3 py-2 text-xs"
                />
                <button
                  type="button"
                  onClick={() => removeQuestion(idx)}
                  className="text-xs text-red-600 hover:underline px-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <input
              type="text"
              value={newQuestionInput}
              onChange={(e) => setNewQuestionInput(e.target.value)}
              placeholder="Add another question for your appointment..."
              className="clay-input flex-1 px-3 py-2 text-xs"
            />
            <button
              type="button"
              onClick={addQuestion}
              className="clay-btn-secondary px-3.5 py-2 text-xs font-semibold"
            >
              Add Question
            </button>
          </div>
        </div>

        {/* 3. Record Selection Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Cycle Entries Select */}
          <div className="clay-card p-4 space-y-2 bg-[#FAF7FC]/80">
            <span className="text-xs font-bold text-[#34213D] block">
              Include Menstrual Cycle Records ({selectedCycles.length}/{cycles.length})
            </span>
            {cycles.length === 0 ? (
              <p className="text-[11px] text-[#6B6475]">No cycle records to include.</p>
            ) : (
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {cycles.map((c) => (
                  <label key={c.id} className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCycleIds.includes(c.id)}
                      onChange={() => toggleCycle(c.id)}
                      className="rounded border-[#E6DFEF] text-[#7963A8]"
                    />
                    <span>{c.startDate} ({c.flowIntensity || "cycle"})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Health Entries Select */}
          <div className="clay-card p-4 space-y-2 bg-[#FAF7FC]/80">
            <span className="text-xs font-bold text-[#34213D] block">
              Include Daily Observations ({selectedHealth.length}/{healthEntries.length})
            </span>
            {healthEntries.length === 0 ? (
              <p className="text-[11px] text-[#6B6475]">No daily observations logged.</p>
            ) : (
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {healthEntries.map((h) => (
                  <label key={h.id} className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedHealthIds.includes(h.id)}
                      onChange={() => toggleHealth(h.id)}
                      className="rounded border-[#E6DFEF] text-[#7963A8]"
                    />
                    <span>{h.entryDate}: {h.symptoms.slice(0, 2).join(", ")}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 4. Action Buttons */}
        <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#E6DFEF]/70">
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="clay-btn px-4 py-2.5 text-xs font-semibold gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>{t("summary.print")}</span>
            </button>
            <button
              type="button"
              onClick={handleCopyText}
              className="clay-btn-secondary px-4 py-2.5 text-xs font-semibold gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-[#8EA187]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied to Clipboard" : t("summary.exportText")}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleSaveSummary}
            className="clay-badge px-4 py-2 text-xs font-bold text-[#7963A8] hover:text-[#34213D]"
          >
            {savedSuccess ? "Saved to History ✓" : "Save Summary to Account"}
          </button>
        </div>
      </div>

      {/* PRINTABLE CLINICIAN SUMMARY PREVIEW (Glassmorphism Sheet) */}
      <div className="glass-card p-8 sm:p-10 shadow-xl space-y-6 text-[#29252F]">
        {/* Clinician Sheet Header */}
        <div className="border-b-2 border-[#34213D] pb-4 flex items-center justify-between">
          <div>
            <div className="text-xl font-bold font-serif text-[#34213D]">RITVYA</div>
            <div className="text-[11px] text-[#7963A8] font-medium tracking-wide">
              Ancient Wisdom. Intelligent Care. • Patient-Prepared Consultation Summary
            </div>
          </div>
          <div className="text-right text-xs text-[#6B6475]">
            <div>Date Generated: <strong>{currentDate}</strong></div>
            <div className="text-[10px]">Self-Reported Observations</div>
          </div>
        </div>

        {/* Chief Concern */}
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#34213D]">
            1. Chief Concern in Patient&apos;s Own Words
          </h3>
          <p className="text-xs sm:text-sm clay-card p-4 leading-relaxed">
            {chiefComplaint}
          </p>
        </div>

        {/* Questions for Clinician */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#34213D]">
            2. Questions Prepared for the Healthcare Professional
          </h3>
          <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#29252F]">
            {doctorQuestions.map((q, idx) => (
              <li key={idx} className="leading-relaxed font-medium">
                {q}
              </li>
            ))}
          </ol>
        </div>

        {/* Selected Menstrual Cycle History */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#34213D]">
            3. Selected Menstrual Cycle Records ({selectedCycles.length} recorded)
          </h3>
          {selectedCycles.length === 0 ? (
            <p className="text-xs text-[#6B6475] italic">No menstrual cycle records included.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {selectedCycles.map((c) => (
                <div key={c.id} className="clay-card p-3">
                  <div className="font-semibold text-[#34213D]">
                    Start Date: {c.startDate} {c.endDate ? `(ended ${c.endDate})` : ""}
                  </div>
                  <div className="text-[11px] text-[#6B6475]">
                    Flow: {c.flowIntensity || "Unspecified"} • Cramping: {c.crampingIntensity || 0}/10
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Physical Observations */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#34213D]">
            4. Selected Physical Sensations & Daily Log ({selectedHealth.length} entries)
          </h3>
          {selectedHealth.length === 0 ? (
            <p className="text-xs text-[#6B6475] italic">No daily observations selected.</p>
          ) : (
            <div className="space-y-1.5 text-xs">
              {selectedHealth.map((h) => (
                <div key={h.id} className="p-2 rounded-lg border border-[#E6DFEF] bg-white flex justify-between">
                  <span><strong>{h.entryDate}:</strong> {h.symptoms.join(", ")}</span>
                  <span className="text-[#6B6475]">Pain: {h.painScore ?? 0}/10</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notes & Context */}
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#34213D]">
            5. Additional Context & Notes
          </h3>
          <p className="text-xs text-[#6B6475] italic bg-[#FAF7FC] p-3 rounded-xl border border-[#E6DFEF]">
            {patientNotes || "None provided."}
          </p>
        </div>

        {/* Mandatory Medical Disclaimer Box */}
        <div className="border-t border-[#E6DFEF] pt-4 text-[10px] text-[#6B6475] leading-relaxed italic">
          <strong>Clinical Notice for Attending Healthcare Professional:</strong> {t("summary.disclaimer")}
        </div>
      </div>
    </div>
  );
}
