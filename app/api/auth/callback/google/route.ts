import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    request.nextUrl.origin ||
    "http://localhost:3000";

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error)}`, baseUrl)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=no_code_provided", baseUrl)
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${baseUrl}/api/auth/callback/google`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      new URL("/login?error=google_credentials_missing", baseUrl)
    );
  }

  try {
    // 1. Exchange authorization code for Google access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errBody = await tokenResponse.text();
      console.error("Google token exchange error:", errBody);
      return NextResponse.redirect(
        new URL("/login?error=token_exchange_failed", baseUrl)
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Fetch authenticated Google user profile
    const profileResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!profileResponse.ok) {
      return NextResponse.redirect(
        new URL("/login?error=failed_to_fetch_profile", baseUrl)
      );
    }

    const profile = await profileResponse.json();

    const userData = {
      id: profile.id,
      email: profile.email,
      name: profile.name || profile.given_name || profile.email?.split("@")[0],
      avatar: profile.picture,
      provider: "google",
      authenticatedAt: new Date().toISOString(),
    };

    // 3. Set cookie and redirect to application workspace
    const response = NextResponse.redirect(new URL("/app?auth=google_success", baseUrl));

    response.cookies.set("ritvya_user_session", JSON.stringify(userData), {
      httpOnly: false, // accessible to client auth context
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (err: any) {
    console.error("Google OAuth Callback Handler error:", err);
    return NextResponse.redirect(
      new URL("/login?error=internal_auth_error", baseUrl)
    );
  }
}
