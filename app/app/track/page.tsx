"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarHeart,
  PlusCircle,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Calendar,
  Activity,
  Smile,
  Moon,
  Flame,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { LocalStore } from "@/lib/db/store";
import { CycleEntry, HealthEntry } from "@/lib/db/types";

export default function HealthTrackingPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"health" | "cycle">("health");

  // Health Form States
  const [entryDate, setEntryDate] = useState("2026-10-15");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [mood, setMood] = useState<HealthEntry["mood"]>("calm");
  const [energyLevel, setEnergyLevel] = useState<HealthEntry["energyLevel"]>("moderate");
  const [sleepHours, setSleepHours] = useState(7.5);
  const [painScore, setPainScore] = useState(2);
  const [healthNotes, setHealthNotes] = useState("");

  // Cycle Form States
  const [cycleStartDate, setCycleStartDate] = useState("2026-10-15");
  const [cycleEndDate, setCycleEndDate] = useState("");
  const [flowIntensity, setFlowIntensity] = useState<CycleEntry["flowIntensity"]>("medium");
  const [crampingIntensity, setCrampingIntensity] = useState(3);
  const [cycleNotes, setCycleNotes] = useState("");

  // Storage data
  const [cycles, setCycles] = useState<CycleEntry[]>([]);
  const [healthEntries, setHealthEntries] = useState<HealthEntry[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const availableSymptoms = [
    "Pelvic cramping",
    "Bloating",
    "Headache / Migraine",
    "Breast tenderness",
    "Facial acne",
    "Fatigue",
    "Lower back pain",
    "Nausea",
    "Mood sensitivity",
    "Insomnia",
    "Heavy flow",
    "Spotting",
  ];

  const refreshData = () => {
    setCycles(LocalStore.getCycleEntries());
    setHealthEntries(LocalStore.getHealthEntries());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleSaveHealthEntry = (e: React.FormEvent) => {
    e.preventDefault();
    LocalStore.addHealthEntry({
      entryDate,
      symptoms: selectedSymptoms,
      mood,
      energyLevel,
      sleepHours,
      painScore,
      notes: healthNotes,
    });
    setNotification("Health entry saved successfully.");
    setTimeout(() => setNotification(null), 3000);
    setSelectedSymptoms([]);
    setHealthNotes("");
    refreshData();
  };

  const handleSaveCycleEntry = (e: React.FormEvent) => {
    e.preventDefault();
    LocalStore.addCycleEntry({
      startDate: cycleStartDate,
      endDate: cycleEndDate || undefined,
      flowIntensity,
      crampingIntensity,
      notes: cycleNotes,
    });
    setNotification("Menstrual cycle entry saved successfully.");
    setTimeout(() => setNotification(null), 3000);
    setCycleNotes("");
    setCycleEndDate("");
    refreshData();
  };

  const handleDeleteCycle = (id: string) => {
    if (confirm(t("track.confirmDelete"))) {
      LocalStore.deleteCycleEntry(id);
      refreshData();
    }
  };

  const handleDeleteHealth = (id: string) => {
    if (confirm(t("track.confirmDelete"))) {
      LocalStore.deleteHealthEntry(id);
      refreshData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F2EFF8] text-[#7963A8] border border-[#E6DFEF]">
          <CalendarHeart className="w-3.5 h-3.5" />
          <span>User-Controlled Health Diary</span>
        </div>
        <h1 className="text-3xl font-bold font-serif text-[#34213D]">
          {t("track.title")}
        </h1>
        <p className="text-sm text-[#6B6475]">
          {t("track.subtitle")}
        </p>
      </div>

      {/* Cycle Estimation Medical Notice */}
      <div className="clay-card p-4.5 text-xs text-[#6B6475] space-y-1">
        <div className="font-semibold text-[#34213D] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#8EA187]" />
          <span>Clinical Tracking Notice</span>
        </div>
        <p>
          Cycle intervals naturally fluctuate based on sleep, stress, illness, and ovulatory timing. Any interval calculations are mathematical observations, not diagnostic predictions of fertility or pregnancy.
        </p>
      </div>

      {notification && (
        <div className="clay-badge p-3.5 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in bg-emerald-50/80 border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Tabs Styled with Clay pills */}
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => setActiveTab("health")}
          className={`px-4 py-2 text-xs font-semibold transition-all ${
            activeTab === "health"
              ? "clay-btn text-white"
              : "clay-pill text-[#6B6475] hover:text-[#34213D]"
          }`}
        >
          <Activity className="w-4 h-4 mr-1.5 inline" />
          <span>Log Daily Symptoms & Mood</span>
        </button>
        <button
          onClick={() => setActiveTab("cycle")}
          className={`px-4 py-2 text-xs font-semibold transition-all ${
            activeTab === "cycle"
              ? "clay-btn text-white"
              : "clay-pill text-[#6B6475] hover:text-[#34213D]"
          }`}
        >
          <Calendar className="w-4 h-4 mr-1.5 inline" />
          <span>Log Menstrual Cycle Dates</span>
        </button>
      </div>

      {/* Form Container (Clay Card) */}
      <div className="clay-card p-6 sm:p-8 space-y-6">
        {activeTab === "health" ? (
          <form onSubmit={handleSaveHealthEntry} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#34213D]">Entry Date</label>
                <input
                  type="date"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                  className="clay-input w-full px-3 py-2.5 text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#34213D]">Mood</label>
                <select
                  value={mood}
                  onChange={(e: any) => setMood(e.target.value)}
                  className="clay-input w-full px-3 py-2.5 text-xs"
                >
                  <option value="calm">Calm & Centered</option>
                  <option value="energetic">Energetic</option>
                  <option value="anxious">Anxious / Overwhelmed</option>
                  <option value="exhausted">Exhausted / Low Energy</option>
                  <option value="irritable">Sensitive / Irritable</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#34213D]">Energy Level</label>
                <select
                  value={energyLevel}
                  onChange={(e: any) => setEnergyLevel(e.target.value)}
                  className="clay-input w-full px-3 py-2.5 text-xs"
                >
                  <option value="very_low">Very Low</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="vibrant">Vibrant</option>
                </select>
              </div>
            </div>

            {/* Symptoms Multi-Select */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#34213D]">
                Observed Physical Sensations (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {availableSymptoms.map((sym) => {
                  const isChecked = selectedSymptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`clay-pill px-3 py-1.5 text-xs font-medium transition-all ${
                        isChecked
                          ? "active font-bold"
                          : "text-[#34213D]"
                      }`}
                    >
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pain Score Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#34213D]">
                  Discomfort / Pain Level: {painScore} / 10
                </span>
                <span className="text-[#6B6475]">
                  {painScore === 0 ? "None" : painScore <= 3 ? "Mild" : painScore <= 6 ? "Moderate" : "Severe"}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={painScore}
                onChange={(e) => setPainScore(Number(e.target.value))}
                className="w-full accent-[#7963A8] cursor-pointer"
              />
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#34213D]">
                Personal Notes (Sleep, hydration, digestion, or thoughts)
              </label>
              <textarea
                rows={2}
                value={healthNotes}
                onChange={(e) => setHealthNotes(e.target.value)}
                placeholder="e.g. Took warm chamomile tea; pelvic warmth applied; 7.5 hrs sleep"
                className="w-full p-3 rounded-xl border border-[#E6DFEF] text-xs bg-[#FAF7FC]"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="clay-btn px-6 py-2.5 text-xs font-semibold"
              >
                {t("track.save")}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSaveCycleEntry} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#34213D]">
                  Period / Cycle Start Date *
                </label>
                <input
                  type="date"
                  value={cycleStartDate}
                  onChange={(e) => setCycleStartDate(e.target.value)}
                  className="clay-input w-full px-3 py-2.5 text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#34213D]">
                  Period End Date (Optional if ongoing)
                </label>
                <input
                  type="date"
                  value={cycleEndDate}
                  onChange={(e) => setCycleEndDate(e.target.value)}
                  className="clay-input w-full px-3 py-2.5 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#34213D]">Flow Intensity</label>
                <select
                  value={flowIntensity}
                  onChange={(e: any) => setFlowIntensity(e.target.value)}
                  className="clay-input w-full px-3 py-2.5 text-xs"
                >
                  <option value="spotting">Spotting only</option>
                  <option value="light">Light flow</option>
                  <option value="medium">Medium regular flow</option>
                  <option value="heavy">Heavy flow</option>
                  <option value="very_heavy">Very heavy (frequent pad changes)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#34213D]">
                  Cramping Intensity (0-10): {crampingIntensity}
                </label>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={crampingIntensity}
                  onChange={(e) => setCrampingIntensity(Number(e.target.value))}
                  className="w-full mt-2 accent-[#7963A8] cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#34213D]">Cycle Notes</label>
              <textarea
                rows={2}
                value={cycleNotes}
                onChange={(e) => setCycleNotes(e.target.value)}
                placeholder="e.g. 32 days since previous cycle; heavy on day 2"
                className="clay-input w-full p-3 text-xs"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="clay-btn px-6 py-2.5 text-xs font-semibold"
              >
                Save Cycle Entry
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Chronological History List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold font-serif text-[#34213D]">
          Your Chronological Observations
        </h3>

        {activeTab === "cycle" ? (
          cycles.length === 0 ? (
            <div className="clay-card p-8 text-center text-xs text-[#6B6475]">
              No cycle dates logged yet. Enter your first period start date above.
            </div>
          ) : (
            <div className="space-y-3">
              {cycles.map((c) => (
                <div
                  key={c.id}
                  className="clay-card p-4.5 flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-[#34213D]">
                      Period Start: {c.startDate} {c.endDate ? `to ${c.endDate}` : "(Ongoing)"}
                    </div>
                    <div className="text-[#6B6475]">
                      Flow: {c.flowIntensity} • Cramping: {c.crampingIntensity}/10
                    </div>
                    {c.notes && <p className="text-[11px] text-[#29252F] italic">{c.notes}</p>}
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
            </div>
          )
        ) : healthEntries.length === 0 ? (
          <div className="clay-card p-8 text-center text-xs text-[#6B6475]">
            No health observations logged yet. Add your first entry above.
          </div>
        ) : (
          <div className="space-y-3">
            {healthEntries.map((h) => (
              <div
                key={h.id}
                className="clay-card p-4.5 flex items-center justify-between text-xs"
              >
                <div className="space-y-1.5">
                  <div className="font-bold text-[#34213D]">{h.entryDate}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {h.symptoms.map((s, idx) => (
                      <span
                        key={idx}
                        className="clay-pill px-2.5 py-0.5 text-[#7963A8] text-[10px] font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] text-[#6B6475]">
                    Mood: {h.mood || "neutral"} • Energy: {h.energyLevel || "moderate"} • Pain: {h.painScore ?? 0}/10
                  </div>
                  {h.notes && <p className="text-[11px] text-[#29252F] italic">{h.notes}</p>}
                </div>
                <button
                  onClick={() => handleDeleteHealth(h.id)}
                  className="clay-icon p-2 text-[#6B6475] hover:text-red-600 transition-colors"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
