import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/db/client";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/app";

  if (code && isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error("Supabase OAuth code exchange error:", error);
    }
  }

  return NextResponse.redirect(new URL(next, request.url));
}
