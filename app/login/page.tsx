"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/lib/auth/context";
import { supabase, isSupabaseConfigured } from "@/lib/db/client";
import { Sparkles, ArrowRight, Lock, Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { loginDemoUser, isSupabaseActive } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSupabaseSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isSupabaseConfigured || !supabase) {
      // If not configured, seamlessly log into Demo Mode
      loginDemoUser();
      router.push("/app");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push("/app");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    loginDemoUser();
    router.push("/app");
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
              Sign in to RITVYA
            </h1>
            <p className="text-xs text-[#6B6475]">
              Access your saved health diary, symptom observations, and doctor summaries.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E6DFEF] shadow-md space-y-6">
            {/* Quick Member Access Option */}
            <div className="p-4 rounded-2xl bg-[#F2EFF8] border border-[#E6DFEF] space-y-2 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#7963A8]">
                <Sparkles className="w-4 h-4 text-[#E98E83]" />
                <span>Quick Member Access</span>
              </div>
              <p className="text-[11px] text-[#6B6475]">
                Access all clinical educational modules, health tracking, and clinician tools instantly.
              </p>
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#34213D] hover:bg-[#24142B] transition-all hover:scale-[1.01]"
              >
                Continue with Instant Access
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#E6DFEF] w-full" />
              <span className="bg-white px-3 text-[11px] font-semibold text-[#6B6475] uppercase tracking-wider relative">
                Or Sign In with Account
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSupabaseSignIn} className="space-y-4">
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
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E6DFEF] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#7963A8]"
                    required
                  />
                  <Lock className="w-4 h-4 text-[#6B6475] absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#7963A8] hover:bg-[#685396] transition-colors disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In with Password"}
              </button>
            </form>

            <div className="text-center text-xs text-[#6B6475]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-[#7963A8] hover:underline">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
