"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/lib/auth/context";
import { supabase, isSupabaseConfigured } from "@/lib/db/client";
import { Sparkles, Lock, Mail, User, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { loginDemoUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consentEducation, setConsentEducation] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!consentEducation || !consentPrivacy) {
      setErrorMsg("Please acknowledge the educational terms and privacy agreement.");
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      // If Supabase is not configured, register demo user
      loginDemoUser();
      router.push("/app");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });
      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push("/app");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during account creation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#29252F]">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <Logo size="lg" showTagline={false} asLink={false} />
            </div>
            <h1 className="text-2xl font-bold font-serif text-[#34213D]">
              Create Your RITVYA Account
            </h1>
            <p className="text-xs text-[#6B6475]">
              Begin your journey to understand your body and prepare for clinical appointments.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E6DFEF] shadow-md space-y-5">
            {/* Google Authentication */}
            <a
              href="/api/auth/google"
              className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#1d1522] bg-white border border-[#dcd3e8] hover:bg-[#faf7fc] transition-all flex items-center justify-center gap-2.5 shadow-xs hover:border-[#7963A8]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign up with Google</span>
            </a>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#E6DFEF] w-full" />
              <span className="bg-white px-3 text-[11px] font-semibold text-[#4e4558] uppercase tracking-wider relative">
                Or Register with Email
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#34213D]">Preferred Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E6DFEF] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#7963A8]"
                    required
                  />
                  <User className="w-4 h-4 text-[#6B6475] absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#34213D]">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E6DFEF] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#7963A8]"
                    required
                  />
                  <Mail className="w-4 h-4 text-[#6B6475] absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#34213D]">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E6DFEF] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#7963A8]"
                    minLength={6}
                    required
                  />
                  <Lock className="w-4 h-4 text-[#6B6475] absolute left-3 top-3" />
                </div>
              </div>

              {/* Explicit Consents */}
              <div className="pt-2 space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#29252F]">
                  <input
                    type="checkbox"
                    checked={consentEducation}
                    onChange={(e) => setConsentEducation(e.target.checked)}
                    className="mt-0.5 rounded border-[#E6DFEF] text-[#7963A8] focus:ring-[#7963A8]"
                  />
                  <span>
                    I understand that RITVYA provides health education and navigation, NOT medical diagnosis or treatment.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#29252F]">
                  <input
                    type="checkbox"
                    checked={consentPrivacy}
                    onChange={(e) => setConsentPrivacy(e.target.checked)}
                    className="mt-0.5 rounded border-[#E6DFEF] text-[#7963A8] focus:ring-[#7963A8]"
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="/privacy" className="text-[#7963A8] underline" target="_blank">
                      Privacy Policy
                    </Link>{" "}
                    and consent to storing my optional health observations under my control.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#34213D] hover:bg-[#24142B] transition-colors disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="text-center text-xs text-[#6B6475]">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[#7963A8] hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
