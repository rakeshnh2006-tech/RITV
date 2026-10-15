import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Health entries endpoint active.",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.entryDate) {
      return NextResponse.json({ error: "entryDate is required." }, { status: 400 });
    }
    return NextResponse.json({
      success: true,
      entry: {
        id: `hlt_${Date.now()}`,
        ...body,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
