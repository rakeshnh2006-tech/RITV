import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.chiefComplaint) {
      return NextResponse.json(
        { error: "chiefComplaint is required." },
        { status: 400 }
      );
    }

    const savedSummary = {
      id: `sum_${Date.now()}`,
      title: body.title || "Doctor Consultation Summary",
      chiefComplaint: body.chiefComplaint,
      dateRange: body.dateRange || new Date().toISOString().split("T")[0],
      includedSymptoms: body.includedSymptoms || [],
      questionsForDoctor: body.questionsForDoctor || [],
      patientNotes: body.patientNotes || "",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, summary: savedSummary });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
