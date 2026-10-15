/**
 * Healthcare Safety Layer Types
 */

export type SafetySeverity = "EMERGENCY" | "URGENT" | "ROUTINE";

export interface EmergencyContact {
  label: string;
  number: string;
  region: string;
  description: string;
}

export interface SafetyRule {
  id: string;
  name: string;
  severity: SafetySeverity;
  description: string;
  keywords: string[];
  patterns: RegExp[];
  recommendedActions: string[];
  clinicalRationale: string;
}

export interface SafetyAssessment {
  isSafeForEducation: boolean;
  severity: SafetySeverity;
  matchedRuleIds: string[];
  matchedRuleNames: string[];
  rationale: string;
  recommendedActions: string[];
  emergencyContacts: EmergencyContact[];
  timestamp: string;
}
