import { CycleEntry, HealthEntry } from "../db/types";

export interface CycleStats {
  hasSufficientData: boolean;
  totalCyclesRecorded: number;
  averageCycleLengthDays: number | null;
  minCycleLengthDays: number | null;
  maxCycleLengthDays: number | null;
  isIrregular: boolean | null;
  cycleIntervals: { start: string; nextStart: string; lengthDays: number }[];
}

export interface SymptomFrequency {
  symptom: string;
  count: number;
  percentage: number;
}

export interface HealthInsights {
  totalHealthEntries: number;
  hasSufficientHealthData: boolean;
  cycleStats: CycleStats;
  topSymptoms: SymptomFrequency[];
  averagePainScore: number | null;
  moodDistribution: Record<string, number>;
  energyDistribution: Record<string, number>;
  clinicianDiscussionNotes: string[];
}

/**
 * Derives factual statistical insights strictly from user's recorded entries.
 * Returns empty/insufficient states when data is scarce.
 */
export function calculateHealthInsights(
  cycles: CycleEntry[],
  healthEntries: HealthEntry[]
): HealthInsights {
  // Sort chronologically ascending
  const sortedCycles = [...cycles].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  // 1. Cycle Length Calculations
  const cycleIntervals: { start: string; nextStart: string; lengthDays: number }[] = [];
  for (let i = 0; i < sortedCycles.length - 1; i++) {
    const startA = new Date(sortedCycles[i].startDate);
    const startB = new Date(sortedCycles[i + 1].startDate);
    const diffDays = Math.round(
      (startB.getTime() - startA.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays > 0 && diffDays < 180) {
      cycleIntervals.push({
        start: sortedCycles[i].startDate,
        nextStart: sortedCycles[i + 1].startDate,
        lengthDays: diffDays,
      });
    }
  }

  const hasSufficientCycleData = cycleIntervals.length >= 1;
  let avgCycleLength: number | null = null;
  let minCycleLength: number | null = null;
  let maxCycleLength: number | null = null;
  let isIrregular: boolean | null = null;

  if (hasSufficientCycleData) {
    const sum = cycleIntervals.reduce((acc, c) => acc + c.lengthDays, 0);
    avgCycleLength = Math.round(sum / cycleIntervals.length);
    const lengths = cycleIntervals.map((c) => c.lengthDays);
    minCycleLength = Math.min(...lengths);
    maxCycleLength = Math.max(...lengths);
    // Clinical definition: normal cycle length is 21-35 days; variation > 8-10 days suggests irregularity
    const variance = maxCycleLength - minCycleLength;
    isIrregular = avgCycleLength < 21 || avgCycleLength > 35 || variance > 8;
  }

  // 2. Symptom Frequency from Health Entries
  const symptomCounts: Record<string, number> = {};
  let totalSymptomInstances = 0;
  let totalPain = 0;
  let painCount = 0;
  const moodDistribution: Record<string, number> = {};
  const energyDistribution: Record<string, number> = {};

  for (const entry of healthEntries) {
    if (entry.symptoms && Array.isArray(entry.symptoms)) {
      for (const sym of entry.symptoms) {
        symptomCounts[sym] = (symptomCounts[sym] || 0) + 1;
        totalSymptomInstances++;
      }
    }

    if (typeof entry.painScore === "number") {
      totalPain += entry.painScore;
      painCount++;
    }

    if (entry.mood) {
      moodDistribution[entry.mood] = (moodDistribution[entry.mood] || 0) + 1;
    }

    if (entry.energyLevel) {
      energyDistribution[entry.energyLevel] =
        (energyDistribution[entry.energyLevel] || 0) + 1;
    }
  }

  const topSymptoms: SymptomFrequency[] = Object.entries(symptomCounts)
    .map(([symptom, count]) => ({
      symptom,
      count,
      percentage: Math.round((count / (healthEntries.length || 1)) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  const averagePainScore =
    painCount > 0 ? Number((totalPain / painCount).toFixed(1)) : null;

  // 3. Clinician Discussion Notes (Observations, not diagnoses)
  const notes: string[] = [];
  if (hasSufficientCycleData && isIrregular) {
    notes.push(
      `Cycle length variation of ${
        (maxCycleLength || 0) - (minCycleLength || 0)
      } days noted across recorded cycles (ranging from ${minCycleLength} to ${maxCycleLength} days). Worth reviewing with a doctor.`
    );
  }

  if (topSymptoms.length > 0) {
    const frequent = topSymptoms.slice(0, 3).map((s) => s.symptom).join(", ");
    notes.push(`Most frequently reported physical observations: ${frequent}.`);
  }

  if (averagePainScore !== null && averagePainScore >= 5) {
    notes.push(
      `Average reported discomfort score is ${averagePainScore}/10. Discuss potential pain management strategies or imaging with your doctor.`
    );
  }

  return {
    totalHealthEntries: healthEntries.length,
    hasSufficientHealthData: healthEntries.length >= 2,
    cycleStats: {
      hasSufficientData: hasSufficientCycleData,
      totalCyclesRecorded: cycles.length,
      averageCycleLengthDays: avgCycleLength,
      minCycleLengthDays: minCycleLength,
      maxCycleLengthDays: maxCycleLength,
      isIrregular,
      cycleIntervals,
    },
    topSymptoms,
    averagePainScore,
    moodDistribution,
    energyDistribution,
    clinicianDiscussionNotes: notes,
  };
}
