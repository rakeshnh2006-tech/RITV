import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { evaluateSafety } from "../lib/safety/rules";

describe("Healthcare Safety Layer - Deterministic Escalation", () => {
  it("allows benign educational queries to proceed safely", () => {
    const assessment = evaluateSafety("Can irregular periods be a sign of PCOS? I also have some mild facial acne.");
    assert.equal(assessment.isSafeForEducation, true);
    assert.equal(assessment.severity, "ROUTINE");
    assert.equal(assessment.matchedRuleIds.length, 0);
  });

  it("escalates severe vaginal hemorrhage with pads soaking", () => {
    const assessment = evaluateSafety("I have been soaking through 2 large pads every hour and feel faint and pale.");
    assert.equal(assessment.isSafeForEducation, false);
    assert.equal(assessment.severity, "EMERGENCY");
    assert.ok(assessment.matchedRuleIds.includes("RULE_HEMORRHAGE"));
    assert.ok(assessment.emergencyContacts.length > 0);
  });

  it("escalates acute sharp pelvic pain with shoulder pain / suspected ectopic", () => {
    const assessment = evaluateSafety("I missed my period, took a pregnancy test, and suddenly have severe stabbing lower abdomen pain with shoulder tip pain.");
    assert.equal(assessment.isSafeForEducation, false);
    assert.equal(assessment.severity, "EMERGENCY");
    assert.ok(assessment.matchedRuleIds.includes("RULE_ECTOPIC_ACUTE_ABDOMEN"));
  });

  it("escalates chest pain and cardiac distress", () => {
    const assessment = evaluateSafety("I have severe crushing chest pain radiating to left arm and cannot breathe.");
    assert.equal(assessment.isSafeForEducation, false);
    assert.equal(assessment.severity, "EMERGENCY");
    assert.ok(assessment.matchedRuleIds.includes("RULE_CARDIAC_CHEST_PAIN"));
  });

  it("escalates self-harm or suicidal ideation with compassion and hotlines", () => {
    const assessment = evaluateSafety("I feel hopeless, I want to end my life and die.");
    assert.equal(assessment.isSafeForEducation, false);
    assert.equal(assessment.severity, "EMERGENCY");
    assert.ok(assessment.matchedRuleIds.includes("RULE_CRISIS_SELF_HARM"));
    assert.ok(assessment.recommendedActions.some((a) => a.includes("Tele-MANAS")));
  });

  it("escalates non-English emergency keywords (Hindi)", () => {
    const assessment = evaluateSafety("खूब खून बह रहा है और चक्कर आ रहे हैं");
    assert.equal(assessment.isSafeForEducation, false);
    assert.equal(assessment.severity, "EMERGENCY");
    assert.ok(assessment.matchedRuleIds.includes("RULE_HEMORRHAGE"));
  });

  it("escalates non-English emergency keywords (Kannada)", () => {
    const assessment = evaluateSafety("ತೀವ್ರ ಹೊಟ್ಟೆ ನೋವು ಮತ್ತು ತಲೆತಿರುಗುವಿಕೆ ಇದೆ");
    assert.equal(assessment.isSafeForEducation, false);
    assert.equal(assessment.severity, "EMERGENCY");
  });

  it("escalates post-procedure infection or sepsis to urgent evaluation", () => {
    const assessment = evaluateSafety("I have a high fever and foul smelling discharge after my D&C procedure last week.");
    assert.equal(assessment.isSafeForEducation, false);
    assert.equal(assessment.severity, "URGENT");
    assert.ok(assessment.matchedRuleIds.includes("RULE_SEPSIS_INFECTION"));
  });
});
