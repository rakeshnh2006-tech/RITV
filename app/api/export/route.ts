import { NextRequest, NextResponse } from "next/server";
import { BRAND } from "@/lib/brand";

export async function GET(req: NextRequest) {
  try {
    const exportPayload = {
      brand: BRAND.name,
      primaryTagline: BRAND.primaryTagline,
      disclaimer: BRAND.disclaimer,
      exportedAt: new Date().toISOString(),
      formatVersion: "1.0",
      description: "RITVYA User Health Observations Export",
    };

    return NextResponse.json(exportPayload, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="ritvya_export_${Date.now()}.json"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
