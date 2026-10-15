import { NextRequest, NextResponse } from "next/server";
import { analyzeSymptomEducational } from "@/lib/ai/adapter";
import { SymptomInput } from "@/lib/ai/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || !body.concern || typeof body.concern !== "string" || !body.concern.trim()) {
      return NextResponse.json(
        { error: "A symptom concern description is required." },
        { status: 400 }
      );
    }

    const input: SymptomInput = {
      concern: body.concern.trim(),
      onset: body.onset?.trim() || undefined,
      duration: body.duration?.trim() || undefined,
      severity: body.severity || undefined,
      progression: body.progression || undefined,
      associatedSymptoms: Array.isArray(body.associatedSymptoms)
        ? body.associatedSymptoms
        : [],
      contextNotes: body.contextNotes?.trim() || undefined,
      locale: body.locale || "en",
    };

    const customKey = req.headers.get("x-gemini-key") || body?.apiKey;
    const outcome = await analyzeSymptomEducational(input, customKey);

    return NextResponse.json(outcome, { status: 200 });
  } catch (error: any) {
    console.error("API /api/understand error:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred while analyzing the symptom.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
