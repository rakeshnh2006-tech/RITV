export interface CycleEntry {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  flowIntensity?: "spotting" | "light" | "medium" | "heavy" | "very_heavy";
  crampingIntensity?: number; // 0-10
  notes?: string;
  createdAt: string;
}

export interface HealthEntry {
  id: string;
  entryDate: string; // YYYY-MM-DD
  symptoms: string[];
  mood?: "calm" | "energetic" | "anxious" | "exhausted" | "irritable" | "neutral";
  energyLevel?: "very_low" | "low" | "moderate" | "high" | "vibrant";
  sleepHours?: number;
  painScore?: number; // 0-10
  notes?: string;
  createdAt: string;
}

export interface SavedClinicianSummary {
  id: string;
  title: string;
  chiefComplaint: string;
  dateRange: string;
  includedSymptoms: string[];
  cycleInfoSummary?: string;
  questionsForDoctor: string[];
  patientNotes?: string;
  createdAt: string;
}

export interface UserPreferences {
  enableTracking: boolean;
  enableVoice: boolean;
  storeChatHistory: boolean;
  preferredLanguage: string;
}
