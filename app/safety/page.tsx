"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShieldAlert, AlertTriangle, PhoneCall, HeartPulse, CheckCircle2 } from "lucide-react";
import { VERIFIED_EMERGENCY_CONTACTS } from "@/lib/safety/rules";

export default function SafetyPage() {
  const redFlags = [
    {
      category: "Severe Vaginal Hemorrhaging",
      signs: [
        "Soaking through two or more large sanitary pads or tampons every hour for two consecutive hours",
        "Passing large blood clots (lemon-sized or larger)",
        "Feeling sudden dizziness, profound weakness, or fainting upon standing",
      ],
      action: "Seek emergency room care immediately. Do not drive yourself.",
    },
    {
      category: "Acute Pelvic / Abdominal Emergency",
      signs: [
        "Sudden, sharp, agonizing lower abdominal or pelvic pain (especially on one side)",
        "Pain accompanied by a missed period or positive pregnancy test (risk of ectopic pregnancy)",
        "Shoulder tip pain alongside pelvic cramping",
      ],
      action: "Go to an emergency department immediately for urgent ultrasound evaluation.",
    },
    {
      category: "Chest Pain & Cardiovascular Warning Signs",
      signs: [
        "Crushing pressure, fullness, or squeezing in the center of the chest",
        "Discomfort radiating to the jaw, neck, back, or left arm",
        "Sudden unexplained shortness of breath, cold sweat, or nausea",
      ],
      action: "Call 112 / 108 immediately.",
    },
    {
      category: "Obstetric Emergencies (During Pregnancy)",
      signs: [
        "Sudden severe headache unresponsive to rest, visual disturbances, or facial swelling",
        "Sudden fluid gush or continuous vaginal leaking",
        "Noticeable cessation or sharp reduction in baby movements during the third trimester",
      ],
      action: "Go directly to an obstetric emergency triage or labor ward.",
    },
    {
      category: "Psychiatric Crisis & Self-Harm",
      signs: [
        "Intense impulses or thoughts of ending your life or hurting yourself",
        "Overwhelming psychological agony without relief",
      ],
      action: "In India, call Tele-MANAS toll-free at 14416 (24/7) or 112. Supportive help is always available.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#29252F]">
      <Header />
      <main className="flex-1 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
              <ShieldAlert className="w-4 h-4 text-red-700" />
              <span>Independent Healthcare Safety Layer</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#34213D]">
              Safety, Limitations & Emergency Guidance
            </h1>
            <p className="text-base text-[#6B6475] max-w-2xl mx-auto leading-relaxed">
              At RITVYA, user safety takes absolute precedence over conversation. We never compromise on clinical boundaries, diagnostic limitations, or urgent symptom escalation.
            </p>
          </div>

          {/* Emergency Helplines Callout Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-red-50 border-2 border-red-200 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-600 text-white flex-shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-red-950">
                  Immediate Emergency Hotlines
                </h2>
                <p className="text-xs text-red-800">
                  If you are experiencing an acute medical emergency, call now:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {VERIFIED_EMERGENCY_CONTACTS.map((c, i) => (
                <div key={i} className="p-4 rounded-xl bg-white border border-red-200 space-y-1 shadow-2xs">
                  <div className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider">{c.label}</div>
                  <div className="text-xl font-bold text-red-600">{c.number}</div>
                  <div className="text-[11px] text-neutral-500">{c.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Deterministic Rules Architecture */}
          <div className="p-8 rounded-3xl bg-white border border-[#E6DFEF] shadow-sm space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#34213D]">
              How the Independent Safety Layer Operates
            </h2>
            <p className="text-sm text-[#6B6475] leading-relaxed">
              Most standard chatbot applications feed user input straight into an LLM, hoping the model remembers to be safe. RITVYA rejects that approach.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8EA187] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#29252F]">
                  <strong>Pre-Execution Screening:</strong> Every symptom query is evaluated by a deterministic rule engine before any AI model is invoked. If an acute red flag is matched, the normal educational workflow is aborted.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8EA187] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#29252F]">
                  <strong>Post-Generation Screening:</strong> Even when an educational explanation is produced, a secondary safety filter verifies the output to ensure no unauthorized reassurance, diagnosis, or medication recommendation was generated.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8EA187] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#29252F]">
                  <strong>Failsafe Architecture:</strong> If the AI service or network is unavailable, the application falls back safely to verified evidence-based educational text without inventing facts.
                </p>
              </div>
            </div>
          </div>

          {/* Red Flag Warning Signs Table */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-[#34213D]">
              Recognizing Acute Warning Signs
            </h2>
            <div className="space-y-4">
              {redFlags.map((rf, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#E6DFEF] shadow-2xs space-y-3"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-red-700">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{rf.category}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#29252F] pl-4 list-disc">
                    {rf.signs.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                  <div className="p-3 rounded-xl bg-red-50 text-xs font-semibold text-red-900">
                    Required Action: {rf.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
