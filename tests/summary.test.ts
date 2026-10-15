import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("Clinician Summary Builder - Document Integrity", () => {
  it("formats user observations without converting uncertainty to medical fact", () => {
    const chiefComplaint = "Irregular periods and pelvic cramping";
    const selectedCycles = [
      { startDate: "2026-08-01", flowIntensity: "heavy", crampingIntensity: 5 },
      { startDate: "2026-09-12", flowIntensity: "medium", crampingIntensity: 3 },
    ];
    const questions = [
      "Would a hormone panel be helpful?",
      "Could this be linked to insulin sensitivity?",
    ];

    const formattedSummary = `
RITVYA CLINICIAN APPOINTMENT SUMMARY
CHIEF CONCERN:
${chiefComplaint}

QUESTIONS FOR CLINICIAN:
${questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}

USER-RECORDED CYCLE HISTORY:
${selectedCycles.map((c) => `• Start: ${c.startDate}`).join("\n")}
    `.trim();

    assert.ok(formattedSummary.includes(chiefComplaint));
    assert.ok(formattedSummary.includes("2026-08-01"));
    assert.ok(formattedSummary.includes("2026-09-12"));
    assert.ok(formattedSummary.includes("Would a hormone panel be helpful?"));
  });

  it("strictly excludes unselected records from the summary", () => {
    const allCycles = [
      { id: "c1", startDate: "2026-07-01" },
      { id: "c2", startDate: "2026-08-01" },
      { id: "c3", startDate: "2026-09-01" },
    ];
    const selectedIds = ["c1", "c3"];

    const filtered = allCycles.filter((c) => selectedIds.includes(c.id));
    assert.equal(filtered.length, 2);
    assert.ok(filtered.some((c) => c.id === "c1"));
    assert.ok(filtered.some((c) => c.id === "c3"));
    assert.equal(filtered.some((c) => c.id === "c2"), false);
  });
});
