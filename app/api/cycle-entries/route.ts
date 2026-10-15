import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Cycle entries endpoint active. Storage managed with user-controlled RLS / local demo repository.",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.startDate) {
      return NextResponse.json({ error: "startDate is required." }, { status: 400 });
    }
    return NextResponse.json({
      success: true,
      entry: {
        id: `cyc_${Date.now()}`,
        ...body,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
