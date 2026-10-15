"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Lock, ShieldCheck, Download, Trash2, CheckCircle2 } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#29252F]">
      <Header />
      <main className="flex-1 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#F2EFF8] text-[#7963A8] border border-[#E6DFEF]">
              <Lock className="w-4 h-4 text-[#7963A8]" />
              <span>Privacy by Design</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#34213D]">
              Your Health. Your Privacy. Your Control.
            </h1>
            <p className="text-base text-[#6B6475] max-w-2xl mx-auto leading-relaxed">
              We believe women&apos;s reproductive and personal health records deserve the highest standard of ethical protection and individual agency.
            </p>
          </div>

          {/* Privacy Guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E6DFEF] shadow-2xs space-y-3">
              <div className="p-2.5 w-10 h-10 rounded-xl bg-[#F2EFF8] text-[#7963A8] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#34213D]">No Data Selling or Advertising</h3>
              <p className="text-xs text-[#6B6475] leading-relaxed">
                RITVYA does not sell personal health information, serve behavioral advertisements, or monetize your cycles and symptom descriptions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E6DFEF] shadow-2xs space-y-3">
              <div className="p-2.5 w-10 h-10 rounded-xl bg-[#F2EFF8] text-[#7963A8] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#34213D]">Row Level Security (RLS)</h3>
              <p className="text-xs text-[#6B6475] leading-relaxed">
                When using a cloud account, every record is isolated by strict database-level Row Level Security policies. Cross-account access is cryptographically blocked.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E6DFEF] shadow-2xs space-y-3">
              <div className="p-2.5 w-10 h-10 rounded-xl bg-[#FBE6E3] text-[#E98E83] flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#34213D]">Complete Portability</h3>
              <p className="text-xs text-[#6B6475] leading-relaxed">
                You can export your recorded health entries, cycle intervals, and consultation summaries in readable JSON or CSV format at any time with a single click.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E6DFEF] shadow-2xs space-y-3">
              <div className="p-2.5 w-10 h-10 rounded-xl bg-[#FBE6E3] text-[#E98E83] flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#34213D]">Permanent Deletion Rights</h3>
              <p className="text-xs text-[#6B6475] leading-relaxed">
                You hold absolute rights to purge individual entries or erase all locally stored health records and chat logs permanently from Settings.
              </p>
            </div>
          </div>

          {/* Data Practices Breakdown */}
          <div className="p-8 rounded-3xl bg-white border border-[#E6DFEF] shadow-sm space-y-6">
            <h2 className="text-2xl font-bold font-serif text-[#34213D]">
              What We Collect and Why
            </h2>

            <div className="space-y-4 text-xs text-[#29252F]">
              <div className="p-4 rounded-xl bg-[#FAF7FC] border border-[#E6DFEF] space-y-1">
                <div className="font-bold text-sm text-[#34213D]">1. Symptom Descriptions & Educational Inquiries</div>
                <p className="text-[#6B6475] leading-relaxed">
                  Collected transiently to generate educational explanations, questions for your doctor, and safety evaluations. In Private Mode, these stay safely in your browser.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7FC] border border-[#E6DFEF] space-y-1">
                <div className="font-bold text-sm text-[#34213D]">2. Health & Menstrual Cycle Entries (Optional)</div>
                <p className="text-[#6B6475] leading-relaxed">
                  Recorded only if you actively choose to use the tracking diary. Used solely to display your chronological history and help calculate cycle variation for your doctor discussions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7FC] border border-[#E6DFEF] space-y-1">
                <div className="font-bold text-sm text-[#34213D]">3. Voice Audio (Optional)</div>
                <p className="text-[#6B6475] leading-relaxed">
                  Processed on your device through the browser Web Speech API. Audio is never stored continuously, and raw recordings are never saved to our servers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7FC] border border-[#E6DFEF] space-y-1">
                <div className="font-bold text-sm text-[#34213D]">4. Third-Party AI Disclosure</div>
                <p className="text-[#6B6475] leading-relaxed">
                  When the optional Google Gemini API is configured by the server administrator, symptom queries are sent securely to the AI provider. No personal identifying names or cycle histories are linked to the external prompt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
