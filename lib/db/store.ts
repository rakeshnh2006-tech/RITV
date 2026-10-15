"use client";

import { CycleEntry, HealthEntry, SavedClinicianSummary, UserPreferences } from "./types";

const KEYS = {
  CYCLES: "ritvya_cycle_entries",
  HEALTH: "ritvya_health_entries",
  SUMMARIES: "ritvya_saved_summaries",
  PREFS: "ritvya_user_preferences",
};

const DEFAULT_PREFS: UserPreferences = {
  enableTracking: true,
  enableVoice: false,
  storeChatHistory: true,
  preferredLanguage: "en",
};

function safeGet<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors
  }
}

export const LocalStore = {
  // Cycle Entries
  getCycleEntries(): CycleEntry[] {
    return safeGet<CycleEntry[]>(KEYS.CYCLES, []).sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  },

  addCycleEntry(entry: Omit<CycleEntry, "id" | "createdAt">): CycleEntry {
    const entries = this.getCycleEntries();
    const newEntry: CycleEntry = {
      ...entry,
      id: `cyc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    safeSet(KEYS.CYCLES, [newEntry, ...entries]);
    return newEntry;
  },

  deleteCycleEntry(id: string): void {
    const entries = this.getCycleEntries().filter((e) => e.id !== id);
    safeSet(KEYS.CYCLES, entries);
  },

  // Health Entries
  getHealthEntries(): HealthEntry[] {
    return safeGet<HealthEntry[]>(KEYS.HEALTH, []).sort(
      (a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
    );
  },

  addHealthEntry(entry: Omit<HealthEntry, "id" | "createdAt">): HealthEntry {
    const entries = this.getHealthEntries();
    const newEntry: HealthEntry = {
      ...entry,
      id: `hlt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    safeSet(KEYS.HEALTH, [newEntry, ...entries]);
    return newEntry;
  },

  updateHealthEntry(updated: HealthEntry): void {
    const entries = this.getHealthEntries().map((e) =>
      e.id === updated.id ? updated : e
    );
    safeSet(KEYS.HEALTH, entries);
  },

  deleteHealthEntry(id: string): void {
    const entries = this.getHealthEntries().filter((e) => e.id !== id);
    safeSet(KEYS.HEALTH, entries);
  },

  // Clinician Summaries
  getSavedSummaries(): SavedClinicianSummary[] {
    return safeGet<SavedClinicianSummary[]>(KEYS.SUMMARIES, []);
  },

  saveClinicianSummary(
    summary: Omit<SavedClinicianSummary, "id" | "createdAt">
  ): SavedClinicianSummary {
    const summaries = this.getSavedSummaries();
    const newSummary: SavedClinicianSummary = {
      ...summary,
      id: `sum_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    safeSet(KEYS.SUMMARIES, [newSummary, ...summaries]);
    return newSummary;
  },

  deleteClinicianSummary(id: string): void {
    const summaries = this.getSavedSummaries().filter((s) => s.id !== id);
    safeSet(KEYS.SUMMARIES, summaries);
  },

  // Preferences
  getUserPreferences(): UserPreferences {
    return safeGet<UserPreferences>(KEYS.PREFS, DEFAULT_PREFS);
  },

  saveUserPreferences(prefs: Partial<UserPreferences>): UserPreferences {
    const current = this.getUserPreferences();
    const updated = { ...current, ...prefs };
    safeSet(KEYS.PREFS, updated);
    return updated;
  },

  // Optional Sample Data Loader (Explicitly user-triggered only)
  loadSampleData(): void {
    const sampleCycles: CycleEntry[] = [
      {
        id: "cyc_sample_1",
        startDate: "2026-09-02",
        endDate: "2026-09-07",
        flowIntensity: "medium",
        crampingIntensity: 4,
        notes: "Mild cramping on day 1, relieved with warm compress.",
        createdAt: new Date().toISOString(),
      },
      {
        id: "cyc_sample_2",
        startDate: "2026-08-01",
        endDate: "2026-08-06",
        flowIntensity: "heavy",
        crampingIntensity: 6,
        notes: "Cycle was 32 days long.",
        createdAt: new Date().toISOString(),
      },
    ];

    const sampleHealth: HealthEntry[] = [
      {
        id: "hlt_sample_1",
        entryDate: "2026-09-20",
        symptoms: ["Bloating", "Fatigue", "Mild pelvic ache"],
        mood: "calm",
        energyLevel: "moderate",
        sleepHours: 7.5,
        painScore: 3,
        notes: "Practiced 20 minutes gentle yoga.",
        createdAt: new Date().toISOString(),
      },
      {
        id: "hlt_sample_2",
        entryDate: "2026-09-15",
        symptoms: ["Facial acne breakout", "Insomnia"],
        mood: "anxious",
        energyLevel: "low",
        sleepHours: 5.5,
        painScore: 1,
        notes: "Work stress elevated.",
        createdAt: new Date().toISOString(),
      },
    ];

    safeSet(KEYS.CYCLES, sampleCycles);
    safeSet(KEYS.HEALTH, sampleHealth);
  },

  // Export Data as JSON
  exportDataJSON(): string {
    const data = {
      exportedAt: new Date().toISOString(),
      brand: "RITVYA",
      disclaimer: "User-controlled export of self-reported observations.",
      cycles: this.getCycleEntries(),
      healthEntries: this.getHealthEntries(),
      summaries: this.getSavedSummaries(),
      preferences: this.getUserPreferences(),
    };
    return JSON.stringify(data, null, 2);
  },

  // Clear all data permanently
  clearAllData(): void {
    if (typeof window === "undefined") return;
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  },
};
