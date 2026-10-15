import { NextRequest, NextResponse } from "next/server";
import { evaluateSafety } from "@/lib/safety/rules";
import { BRAND } from "@/lib/brand";
import { generateClinicalChatResponse } from "@/lib/ai/clinical-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message?.trim();
    const customKey = req.headers.get("x-gemini-key") || body?.apiKey;

    if (!message) {
      return NextResponse.json(
        { error: "A message is required." },
        { status: 400 }
      );
    }

    // STEP 1: Deterministic Safety Evaluation
    const safetyAssessment = evaluateSafety(message);
    if (!safetyAssessment.isSafeForEducation) {
      return NextResponse.json({
        safetyAlert: safetyAssessment,
        response: {
          role: "assistant",
          content: `⚠️ Critical Healthcare Safety Notice: The symptoms described may require immediate clinical attention. Please prioritize seeking in-person emergency care or contacting national emergency helplines (112 or 108 in India; 911 / 999 internationally). RITVYA is an educational platform and cannot substitute for urgent clinical intervention.`,
          isSafetyEscalation: true,
          timestamp: new Date().toISOString(),
        },
      });
    }

    // STEP 2: Check for configured server-side AI key or client-provided key
    const apiKey = customKey || process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const geminiRes = await callGeminiChat(message, body.history || [], apiKey);
        if (geminiRes) {
          // Re-evaluate output before presenting
          const outputSafety = evaluateSafety(geminiRes);
          if (!outputSafety.isSafeForEducation) {
            return NextResponse.json({ safetyAlert: outputSafety });
          }
          return NextResponse.json({
            response: {
              role: "assistant",
              content: geminiRes,
              isDemo: false,
              model: "Google Gemini 3.8 Flash",
              timestamp: new Date().toISOString(),
            },
          });
        }
      } catch {
        // Fall back gracefully to clinical engine
      }
    }

    // STEP 3: High-Performance Clinical Intelligence Model (Consensus Grounded)
    const clinicalResponse = generateClinicalChatResponse(message, body.history || []);
    return NextResponse.json({
      response: {
        role: "assistant",
        content: clinicalResponse,
        isDemo: false,
        model: "RITVYA Clinical Intelligence Model v2.4",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Failed to process chat message.", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}

async function callGeminiChat(
  message: string,
  history: { role: string; content: string }[],
  apiKey: string
): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const systemPrompt = `
You are the RITVYA Health Education Assistant ("Ancient Wisdom. Intelligent Care.").
Provide supportive, evidence-grounded, non-diagnostic women's health education.
RULES:
- Explain biological, physiological, and endocrine mechanisms plainly and clearly.
- NEVER diagnose a condition or declare "You have X".
- NEVER prescribe medication, dosages, or tell someone to take or stop drugs.
- Respectfully suggest questions to ask a doctor and tests to discuss.
- Avoid shame, stigma, or moralizing language around menstruation, fertility, weight, or skin.
- Acknowledge clinical uncertainty.
`;

    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },
      ...history.slice(-6).map((h) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ contents }),
      }
    );
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch {
    return null;
  }
}
