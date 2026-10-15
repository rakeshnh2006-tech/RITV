export interface SymptomInput {
  concern: string;
  onset?: string;
  duration?: string;
  severity?: "mild" | "moderate" | "severe" | "variable";
  progression?: "stable" | "worsening" | "improving" | "fluctuating";
  associatedSymptoms?: string[];
  contextNotes?: string;
  locale?: string;
}

export interface PossibleExplanation {
  topic: string;
  discussion: string;
  caution: string;
}

export interface MedicalSourceReference {
  title: string;
  organization: string;
  url: string;
  evidenceType: string;
}

export interface StructuredHealthResult {
  id: string;
  restatement: string;
  educationalOverview: string;
  possibleExplanations: PossibleExplanation[];
  questionsToConsider: string[];
  reasonableSelfCare: string[];
  whenToSeekProfessionalAssessment: string;
  warningSignsRequiringUrgentCare: string[];
  suggestedQuestionsForDoctor: string[];
  verifiedSources: MedicalSourceReference[];
  medicalDisclaimer: string;
  isDemoResponse: boolean;
  modelIdentifier: string;
  generatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  safetyAlert?: boolean;
}
