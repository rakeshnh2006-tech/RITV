import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { calculateHealthInsights } from "../lib/insights/calculator";
import { CycleEntry, HealthEntry } from "../lib/db/types";

describe("Health Insights Calculator - Empirical Integrity", () => {
  it("returns insufficient data flags when no records exist", () => {
    const insights = calculateHealthInsights([], []);
    assert.equal(insights.hasSufficientHealthData, false);
    assert.equal(insights.cycleStats.hasSufficientData, false);
    assert.equal(insights.cycleStats.averageCycleLengthDays, null);
    assert.equal(insights.topSymptoms.length, 0);
    assert.equal(insights.averagePainScore, null);
  });

  it("calculates cycle length accurately between recorded cycles", () => {
    const cycles: CycleEntry[] = [
      { id: "c1", startDate: "2026-07-01", createdAt: "" },
      { id: "c2", startDate: "2026-07-29", createdAt: "" }, // 28 days
      { id: "c3", startDate: "2026-08-26", createdAt: "" }, // 28 days
    ];
    const insights = calculateHealthInsights(cycles, []);
    assert.equal(insights.cycleStats.hasSufficientData, true);
    assert.equal(insights.cycleStats.averageCycleLengthDays, 28);
    assert.equal(insights.cycleStats.minCycleLengthDays, 28);
    assert.equal(insights.cycleStats.maxCycleLengthDays, 28);
    assert.equal(insights.cycleStats.isIrregular, false);
  });

  it("detects cycle irregularity when variance exceeds physiological thresholds", () => {
    const cycles: CycleEntry[] = [
      { id: "c1", startDate: "2026-05-01", createdAt: "" },
      { id: "c2", startDate: "2026-06-12", createdAt: "" }, // 42 days
      { id: "c3", startDate: "2026-07-05", createdAt: "" }, // 23 days
    ];
    const insights = calculateHealthInsights(cycles, []);
    assert.equal(insights.cycleStats.hasSufficientData, true);
    assert.equal(insights.cycleStats.isIrregular, true);
    assert.ok(insights.clinicianDiscussionNotes.length > 0);
  });

  it("calculates symptom frequencies and average pain score accurately", () => {
    const health: HealthEntry[] = [
      { id: "h1", entryDate: "2026-09-01", symptoms: ["Cramping", "Bloating"], painScore: 6, createdAt: "" },
      { id: "h2", entryDate: "2026-09-02", symptoms: ["Cramping", "Fatigue"], painScore: 4, createdAt: "" },
    ];
    const insights = calculateHealthInsights([], health);
    assert.equal(insights.hasSufficientHealthData, true);
    assert.equal(insights.averagePainScore, 5.0);
    assert.equal(insights.topSymptoms[0].symptom, "Cramping");
    assert.equal(insights.topSymptoms[0].count, 2);
  });
});
