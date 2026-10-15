import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    request.nextUrl.origin ||
    "http://localhost:3000";

  const redirectUri = `${baseUrl}/api/auth/callback/google`;

  if (!clientId) {
    // If Google Client ID is not yet placed in .env.local, redirect with helpful prompt
    return NextResponse.redirect(
      new URL("/login?error=google_not_configured", request.url)
    );
  }

  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleAuthUrl.searchParams.set("client_id", clientId);
  googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
  googleAuthUrl.searchParams.set("response_type", "code");
  googleAuthUrl.searchParams.set("scope", "openid email profile");
  googleAuthUrl.searchParams.set("access_type", "offline");
  googleAuthUrl.searchParams.set("prompt", "select_account");

  return NextResponse.redirect(googleAuthUrl.toString());
}
