import { SymptomInput, StructuredHealthResult, MedicalSourceReference } from "./types";
import { evaluateSafety } from "../safety/rules";
import { BRAND } from "../brand";
import { analyzeSymptomClinical, CLINICAL_SOURCES } from "./clinical-engine";

/**
 * Generate a grounded, evidence-based educational result for a symptom inquiry.
 * Evaluates safety first, then routes to configured AI provider or our
 * built-in clinical intelligence model.
 */
export async function analyzeSymptomEducational(
  input: SymptomInput,
  customApiKey?: string
): Promise<{
  result?: StructuredHealthResult;
  safetyAlert?: ReturnType<typeof evaluateSafety>;
}> {
  // STEP 1: Mandatory Deterministic Safety Pre-Check
  const combinedText = [
    input.concern,
    input.onset,
    input.severity,
    input.progression,
    input.associatedSymptoms?.join(", "),
    input.contextNotes,
  ]
    .filter(Boolean)
    .join(". ");

  const safetyAssessment = evaluateSafety(combinedText);
  if (!safetyAssessment.isSafeForEducation) {
    return { safetyAlert: safetyAssessment };
  }

  // STEP 2: Check for configured server-side AI key or user-provided key
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const response = await callGeminiApi(input, apiKey);
      if (response) {
        // Run safety check on AI response before presenting
        const responseSafety = evaluateSafety(response.educationalOverview);
        if (!responseSafety.isSafeForEducation) {
          return { safetyAlert: responseSafety };
        }
        return { result: response };
      }
    } catch {
      // Gracefully fall back to clinical intelligence engine
    }
  }

  // STEP 3: High-Precision Clinical Intelligence Model (Consensus Grounded)
  const clinicalResult = analyzeSymptomClinical(input);
  return { result: clinicalResult };
}

/**
 * Calls Gemini REST API with structured response schema and automatic timeout
 */
async function callGeminiApi(
  input: SymptomInput,
  apiKey: string
): Promise<StructuredHealthResult | null> {
  const systemPrompt = `
You are the senior clinical healthcare educational assistant for RITVYA ("Ancient Wisdom. Intelligent Care.").
You provide calm, evidence-grounded health education and care navigation for women.
CRITICAL SAFETY & CLINICAL RULES:
1. NEVER diagnose a disease, condition, or syndrome. Do NOT claim "You have X".
2. NEVER prescribe medication, dosages, or tell someone to stop/start prescription drugs.
3. NEVER calculate or output a numerical probability score or disease confidence percentage.
4. Frame all explanations cautiously: "In medical literature, these signs are sometimes discussed in the context of..."
5. Distinguish user-reported sensations from confirmed clinical diagnoses.
6. Provide helpful questions for the user to ask a qualified doctor.
7. Return strictly valid JSON adhering to the specified format.
`;

  const userPrompt = `
Analyze the following symptom inquiry from a women's health perspective:
- Main Concern: ${input.concern}
- Onset: ${input.onset || "Not specified"}
- Duration: ${input.duration || "Not specified"}
- Severity: ${input.severity || "Not specified"}
- Progression: ${input.progression || "Not specified"}
- Associated Symptoms: ${input.associatedSymptoms?.join(", ") || "None mentioned"}
- Personal Context: ${input.contextNotes || "None provided"}
- Language: ${input.locale || "en"}
${
  input.locale && input.locale !== "en"
    ? `CRITICAL LANGUAGE REQUIREMENT: The user's active interface language is "${input.locale}". Translate and formulate ALL text values (restatement, educationalOverview, topic, discussion, caution, questionsToConsider, reasonableSelfCare, whenToSeekProfessionalAssessment, warningSignsRequiringUrgentCare, suggestedQuestionsForDoctor) ENTIRELY in ${
        input.locale === "kn"
          ? "fluent, natural Kannada (ಕನ್ನಡ)"
          : input.locale === "hi"
          ? "fluent, natural Hindi (हिन्दी)"
          : input.locale
      }. Do NOT use English sentences in the text values.`
    : ""
}

Respond in pure JSON matching this exact structure:
{
  "restatement": "Plain language restatement of the concern acknowledging specifics",
  "educationalOverview": "Detailed objective educational explanation of the underlying physiology",
  "possibleExplanations": [
    {
      "topic": "Condition or physiological mechanism discussed in literature",
      "discussion": "Why clinicians consider this and what mechanisms are involved",
      "caution": "Why this is an educational possibility, not a clinical diagnosis"
    }
  ],
  "questionsToConsider": ["Questions the user can reflect upon regarding lifestyle, cycles, patterns"],
  "reasonableSelfCare": ["Evidence-supported non-pharmacological comfort steps, nutrition, hydration, sleep"],
  "whenToSeekProfessionalAssessment": "Clear clinical guidance on when an in-person doctor visit is advised",
  "warningSignsRequiringUrgentCare": ["Red flags that require prompt or emergency care"],
  "suggestedQuestionsForDoctor": ["3-5 clear questions for their gynecologist or general physician"]
}
`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        }),
      }
    );
    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;

    const parsed = JSON.parse(text);

    return {
      id: `edu_${Date.now()}`,
      restatement: parsed.restatement || input.concern,
      educationalOverview: parsed.educationalOverview || "",
      possibleExplanations: parsed.possibleExplanations || [],
      questionsToConsider: parsed.questionsToConsider || [],
      reasonableSelfCare: parsed.reasonableSelfCare || [],
      whenToSeekProfessionalAssessment:
        parsed.whenToSeekProfessionalAssessment || "Schedule an evaluation with your healthcare provider.",
      warningSignsRequiringUrgentCare: parsed.warningSignsRequiringUrgentCare || [
        "Severe acute pelvic pain",
        "Heavy bleeding soaking through pads rapidly",
        "High fever with chills",
      ],
      suggestedQuestionsForDoctor: parsed.suggestedQuestionsForDoctor || [],
      verifiedSources: CLINICAL_SOURCES,
      medicalDisclaimer: BRAND.disclaimer,
      isDemoResponse: false,
      modelIdentifier: "Google Gemini 3.8 Flash via RITVYA Safety Layer",
      generatedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
