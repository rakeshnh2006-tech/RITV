"use client";

import React, { useState } from "react";
import {
  Stethoscope,
  ShieldAlert,
  Mic,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  FilePlus,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { StructuredHealthResult } from "@/lib/ai/types";
import { SafetyAssessment } from "@/lib/safety/types";
import { EmergencyModal } from "@/components/safety/EmergencyModal";
import { voiceController } from "@/lib/voice/speech";
import { LocalStore } from "@/lib/db/store";

export default function UnderstandPage() {
  const { t, locale } = useLanguage();

  // Form states
  const [concern, setConcern] = useState("");
  const [onset, setOnset] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState<"mild" | "moderate" | "severe" | "variable">("moderate");
  const [progression, setProgression] = useState<"stable" | "worsening" | "improving" | "fluctuating">("stable");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [contextNotes, setContextNotes] = useState("");

  // Voice recognition states
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [voiceError, setVoiceError] = useState("");

  // Result & Safety states
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StructuredHealthResult | null>(null);
  const [safetyAlert, setSafetyAlert] = useState<SafetyAssessment | null>(null);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [copiedQuestion, setCopiedQuestion] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const symptomOptions = [
    { id: "Pelvic cramping", key: "understand.chip.pelvicCramping" },
    { id: "Irregular cycle timing", key: "understand.chip.irregularCycle" },
    { id: "Missed period (>35 days)", key: "understand.chip.missedPeriod" },
    { id: "Facial or chin acne", key: "understand.chip.facialAcne" },
    { id: "Unwanted hair growth (hirsutism)", key: "understand.chip.hirsutism" },
    { id: "Hair thinning on scalp", key: "understand.chip.hairThinning" },
    { id: "Bloating & fluid retention", key: "understand.chip.bloating" },
    { id: "Unexplained fatigue", key: "understand.chip.fatigue" },
    { id: "Mood sensitivity / irritability", key: "understand.chip.moodSensitivity" },
    { id: "Sleep disruption", key: "understand.chip.sleepDisruption" },
    { id: "Heavy bleeding with clots", key: "understand.chip.heavyBleeding" },
  ];

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  // Voice handler
  const handleStartVoice = () => {
    setVoiceError("");
    setVoiceTranscript("");

    if (!voiceController.isSupported()) {
      setVoiceError("Speech recognition is not supported in this browser. Please type your concern.");
      return;
    }

    setIsRecording(true);
    setVoiceModalOpen(true);

    const langCode = locale === "hi" ? "hi-IN" : locale === "kn" ? "kn-IN" : "en-US";

    voiceController.startListening(
      (res) => {
        setVoiceTranscript(res.transcript);
      },
      (err) => {
        setVoiceError(err);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      },
      langCode
    );
  };

  const handleStopVoice = () => {
    voiceController.stopListening();
    setIsRecording(false);
  };

  const handleApplyVoiceTranscript = () => {
    if (voiceTranscript.trim()) {
      setConcern((prev) => (prev ? `${prev} ${voiceTranscript}` : voiceTranscript));
    }
    setVoiceModalOpen(false);
  };

  // Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concern.trim()) return;

    setLoading(true);
    setResult(null);
    setSafetyAlert(null);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/understand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concern,
          onset,
          duration,
          severity,
          progression,
          associatedSymptoms: selectedSymptoms,
          contextNotes,
          locale,
        }),
      });

      const data = await res.json();

      if (data.safetyAlert) {
        setSafetyAlert(data.safetyAlert);
        setSafetyModalOpen(true);
      } else if (data.result) {
        setResult(data.result);
      }
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToHistory = () => {
    if (!result) return;
    LocalStore.addHealthEntry({
      entryDate: new Date().toISOString().split("T")[0],
      symptoms: selectedSymptoms.length > 0 ? selectedSymptoms : [concern.slice(0, 40)],
      painScore: severity === "severe" ? 7 : severity === "moderate" ? 4 : 2,
      notes: `Restatement: ${result.restatement}`,
    });
    setSaveSuccess(true);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-1 sm:px-0">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold clay-badge text-[#7963A8]">
          <Stethoscope className="w-4 h-4" />
          <span>Non-Diagnostic Educational Care Navigation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#34213D] leading-tight">
          {t("understand.title")}
        </h1>
        <p className="text-sm sm:text-base text-[#6B6475] leading-relaxed">
          {t("understand.subtitle")}
        </p>
      </div>

      {/* Main Guided Input Form (Clay Card) */}
      <div className="clay-card p-6 sm:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Concern Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#34213D]">
                {t("understand.inputLabel")} *
              </label>
              <button
                type="button"
                onClick={handleStartVoice}
                className="clay-btn-secondary px-3.5 py-2 text-xs sm:text-sm font-medium text-[#7963A8] gap-2"
              >
                <Mic className="w-4 h-4 text-[#E98E83]" />
                <span>{t("understand.voiceInput")}</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              placeholder={t("understand.inputPlaceholder")}
              className="clay-input w-full p-4 text-sm sm:text-base leading-relaxed"
              required
            />
          </div>

          {/* Quick Symptoms Chips */}
          <div className="space-y-2.5">
            <label className="text-xs sm:text-sm font-semibold text-[#6B6475]">
              {t("understand.commonChipsLabel")}
            </label>
            <div className="flex flex-wrap gap-2">
              {symptomOptions.map((opt) => {
                const isSelected = selectedSymptoms.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleSymptom(opt.id)}
                    className={`clay-pill px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                      isSelected
                        ? "active font-bold"
                        : "text-[#34213D]"
                    }`}
                  >
                    {t(opt.key)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Structured Context Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-[#6B6475]">
                {t("understand.onsetLabel")}
              </label>
              <input
                type="text"
                value={onset}
                onChange={(e) => setOnset(e.target.value)}
                placeholder="e.g. 2 weeks ago"
                className="clay-input w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-[#6B6475]">
                {t("understand.durationLabel")}
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 4 months"
                className="clay-input w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-[#6B6475]">
                {t("understand.severityLabel")}
              </label>
              <select
                value={severity}
                onChange={(e: any) => setSeverity(e.target.value)}
                className="clay-input w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl"
              >
                <option value="mild">{t("understand.severity.mild")}</option>
                <option value="moderate">{t("understand.severity.moderate")}</option>
                <option value="severe">{t("understand.severity.severe")}</option>
                <option value="variable">{t("understand.severity.variable")}</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-[#6B6475]">
                {t("understand.progressionLabel")}
              </label>
              <select
                value={progression}
                onChange={(e: any) => setProgression(e.target.value)}
                className="clay-input w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl"
              >
                <option value="stable">{t("understand.progression.stable")}</option>
                <option value="worsening">{t("understand.progression.worsening")}</option>
                <option value="improving">{t("understand.progression.improving")}</option>
                <option value="fluctuating">{t("understand.progression.fluctuating")}</option>
              </select>
            </div>
          </div>

          {/* Context Notes */}
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-[#6B6475]">
              {t("understand.contextLabel")}
            </label>
            <input
              type="text"
              value={contextNotes}
              onChange={(e) => setContextNotes(e.target.value)}
              placeholder={t("understand.contextPlaceholder")}
              className="clay-input w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-xs sm:text-sm text-[#6B6475] italic">
              {t("understand.safetyCheckNotice")}
            </span>
            <button
              type="submit"
              disabled={loading || !concern.trim()}
              className="clay-btn px-8 py-3.5 text-sm sm:text-base font-bold disabled:opacity-50 self-end sm:self-auto"
            >
              {loading ? t("understand.analyzing") : t("understand.submit")}
            </button>
          </div>
        </form>
      </div>

      {/* Voice Review & Edit Modal */}
      {voiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 border border-[#E6DFEF] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E6DFEF] pb-3">
              <div className="flex items-center gap-2">
                <Mic className={`w-5 h-5 ${isRecording ? "text-red-500 animate-pulse" : "text-[#7963A8]"}`} />
                <h3 className="text-sm font-bold text-[#34213D]">
                  {isRecording ? "Listening to Your Description..." : "Review Voice Transcript"}
                </h3>
              </div>
              {isRecording ? (
                <button
                  onClick={handleStopVoice}
                  className="px-3 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-semibold"
                >
                  Stop Recording
                </button>
              ) : null}
            </div>

            {voiceError ? (
              <div className="p-3 rounded-xl bg-red-50 text-xs text-red-700">
                {voiceError}
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-[#6B6475]">
                  You can edit the recognized text before inserting it into your concern:
                </p>
                <textarea
                  rows={4}
                  value={voiceTranscript}
                  onChange={(e) => setVoiceTranscript(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E6DFEF] text-sm focus:ring-2 focus:ring-[#7963A8]"
                  placeholder="Recognized words will appear here..."
                />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setVoiceModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#6B6475] hover:bg-[#F2EFF8]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyVoiceTranscript}
                disabled={!voiceTranscript.trim()}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#34213D] hover:bg-[#24142B] disabled:opacity-50"
              >
                Insert into Description
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Safety Interception Modal */}
      <EmergencyModal
        assessment={safetyAlert}
        isOpen={safetyModalOpen}
        onClose={() => setSafetyModalOpen(false)}
      />

      {/* Structured Educational Result Card (Glassmorphism & Claymorphism) */}
      {result && (
        <div className="glass-card p-6 sm:p-8 space-y-8 shadow-xl animate-in fade-in duration-300">
          {/* Result Header Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E6DFEF]/70 pb-4">
            <div className="space-y-1">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7963A8] clay-badge px-3 py-1">
                {t("understand.result.badge")}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#34213D] mt-1">
                {t("understand.result.title")}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full clay-badge text-emerald-800 bg-emerald-50/80 border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{result.modelIdentifier || "Google Gemini 3.8 Flash"}</span>
              </span>
              <button
                type="button"
                onClick={handleSaveToHistory}
                disabled={saveSuccess}
                className="clay-btn-secondary px-4 py-2 text-xs sm:text-sm font-semibold gap-1.5"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#8EA187]" />
                    <span>{t("understand.result.saved")}</span>
                  </>
                ) : (
                  <>
                    <FilePlus className="w-4 h-4 text-[#7963A8]" />
                    <span>{t("understand.result.save")}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 1. Restatement */}
          <div className="clay-card p-5 sm:p-6 space-y-2">
            <span className="text-xs sm:text-sm font-bold text-[#7963A8] uppercase tracking-wider">
              {t("understand.result.summaryTitle")}
            </span>
            <p className="text-sm sm:text-base text-[#29252F] leading-relaxed">
              {result.restatement}
            </p>
          </div>

          {/* 2. Educational Overview */}
          <div className="space-y-2.5">
            <h3 className="text-base sm:text-lg font-bold text-[#34213D]">
              {t("understand.result.physiologyTitle")}
            </h3>
            <p className="text-sm sm:text-base text-[#6B6475] leading-relaxed">
              {result.educationalOverview}
            </p>
          </div>

          {/* 3. Possible Explanations (Cautious) */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-[#34213D]">
              {t("understand.result.explanationsTitle")}
            </h3>
            <div className="space-y-3.5">
              {result.possibleExplanations.map((exp, idx) => (
                <div
                  key={idx}
                  className="clay-card p-5 sm:p-6 space-y-2.5"
                >
                  <h4 className="text-sm sm:text-base font-bold text-[#7963A8]">{exp.topic}</h4>
                  <p className="text-xs sm:text-sm text-[#29252F] leading-relaxed">{exp.discussion}</p>
                  <div className="clay-card p-3.5 text-xs sm:text-sm text-[#6B6475] italic bg-[#FAF7FC]/80">
                    <strong>{t("understand.result.medicalCaveat")}</strong> {exp.caution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 & 5. Questions to Consider & Self-Care */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="clay-card p-5 sm:p-6 space-y-3">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#34213D]">
                {t("understand.result.reflectionsTitle")}
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#6B6475]">
                {result.questionsToConsider.map((q, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#7963A8] font-bold text-base leading-none">•</span>
                    <span className="leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="clay-card p-5 sm:p-6 space-y-3">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#34213D]">
                {t("understand.result.selfCareTitle")}
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#6B6475]">
                {result.reasonableSelfCare.map((sc, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#8EA187] font-bold text-base leading-none">✓</span>
                    <span className="leading-relaxed">{sc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 6. When to Seek Professional Assessment */}
          <div className="clay-card p-5 sm:p-6 space-y-2 bg-[#F2EFF8]/60">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#34213D]">
              {t("understand.result.navigationTitle")}
            </h4>
            <p className="text-xs sm:text-sm text-[#29252F] leading-relaxed">
              {result.whenToSeekProfessionalAssessment}
            </p>
          </div>

          {/* 7. Warning Signs Requiring Urgent Assessment */}
          <div className="clay-card-coral p-5 sm:p-6 space-y-3 text-red-950 border-red-200">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider text-red-800">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{t("understand.result.warningsTitle")}</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-red-900">
              {result.warningSignsRequiringUrgentCare.map((ws, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />
                  <span className="leading-relaxed">{ws}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 8. Questions for Your Healthcare Professional */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-[#34213D]">
              {t("understand.result.doctorQuestionsTitle")}
            </h3>
            <div className="space-y-2.5">
              {result.suggestedQuestionsForDoctor.map((q, idx) => (
                <div
                  key={idx}
                  className="clay-card p-4 sm:p-5 flex items-center justify-between gap-4 text-xs sm:text-sm group"
                >
                  <span className="text-[#29252F] font-medium leading-relaxed">{q}</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(q);
                      setCopiedQuestion(q);
                      setTimeout(() => setCopiedQuestion(null), 2000);
                    }}
                    className="clay-icon p-2.5 text-[#6B6475] hover:text-[#34213D] transition-colors"
                    title="Copy question"
                  >
                    {copiedQuestion === q ? (
                      <Check className="w-4 h-4 text-[#8EA187]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 9. Verified Medical Sources */}
          <div className="space-y-3 pt-2 border-t border-[#E6DFEF]/70">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#6B6475]">
              {t("understand.result.evidenceTitle")}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.verifiedSources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-card p-4 text-xs sm:text-sm transition-colors flex items-center justify-between group hover:border-[#7963A8]"
                >
                  <div className="pr-2">
                    <div className="font-semibold text-[#34213D] group-hover:underline">
                      {src.title}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#6B6475] mt-0.5">
                      {src.organization} • {src.evidenceType}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#7963A8] flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* 10. Medical Disclaimer */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7FC] border border-[#E6DFEF] text-xs sm:text-sm text-[#6B6475] leading-relaxed italic">
            <strong>{t("understand.result.medicalCaveat")}</strong> {result.medicalDisclaimer || t("understand.result.disclaimer")}
          </div>
        </div>
      )}
    </div>
  );
}
