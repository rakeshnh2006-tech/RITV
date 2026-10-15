"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BRAND } from "@/lib/brand";
import { Sparkles, Shield, HeartHandshake, Eye, BookOpen, Compass } from "lucide-react";

export default function AboutPage() {
  const principles = [
    {
      title: "Education, Not Diagnosis",
      desc: "We explain biological concepts and physiological mechanisms without ever pretending to diagnose your specific condition or replace a clinical consultation.",
      icon: BookOpen,
    },
    {
      title: "Care Navigation, Not Prescription",
      desc: "Our mission is to help you recognize reasonable next steps, form clear questions, and identify when professional clinical care is necessary.",
      icon: Compass,
    },
    {
      title: "Safety Before Engagement",
      desc: "Acute warning signs immediately take precedence over AI conversations. Urgent symptoms route directly to clinical safety guidance.",
      icon: Shield,
    },
    {
      title: "Evidence Over Speculation",
      desc: "We rely on reputable public health bodies (WHO, ACOG, Endocrine Society, ICMR) and clearly distinguish established clinical data from hypotheses.",
      icon: Eye,
    },
    {
      title: "Ancient Wisdom. Intelligent Care.",
      desc: "Honoring the intuitive, holistic bodily awareness passed down through generations while upholding rigorous evidence-based medical science.",
      icon: Sparkles,
    },
    {
      title: "Zero Shame or Stigma",
      desc: "We speak plainly, kindly, and without moralizing language regarding menstrual health, hormonal acne, hair growth, fertility, and body changes.",
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#29252F]">
      <Header />
      <main className="flex-1 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7963A8]">
              About RITVYA
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#34213D]">
              Ancient Wisdom. Intelligent Care.
            </h1>
            <p className="text-base sm:text-lg text-[#6B6475] leading-relaxed max-w-2xl mx-auto">
              RITVYA was founded to give every woman a calm, trustworthy, and culturally aware companion to understand her body, navigate healthcare, and speak confidently with her doctor.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="p-8 rounded-3xl bg-[#F2EFF8]/60 border border-[#E6DFEF] space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#34213D]">Our Mission</h2>
            <p className="text-sm text-[#29252F] leading-relaxed">
              Women&apos;s healthcare is frequently rushed, complicated by clinical jargon, or clouded by misinformation on social media. Too many women navigate cycle irregularities, PCOS symptoms, or hormonal changes alone, unsure whether their sensations are routine variations or reasons to see a specialist.
            </p>
            <p className="text-sm text-[#29252F] leading-relaxed">
              RITVYA bridges this divide. By uniting compassionate cultural awareness with strict deterministic healthcare safety protocols and verified peer-reviewed guidelines, we provide women with an educational sanctuary where their concerns are heard in their mother tongue.
            </p>
          </div>

          {/* Core Principles */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-[#34213D] text-center">
              Our Non-Negotiable Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {principles.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-[#E6DFEF] shadow-2xs space-y-3"
                  >
                    <div className="p-2.5 w-10 h-10 rounded-xl bg-[#F2EFF8] text-[#7963A8] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#34213D]">{p.title}</h3>
                    <p className="text-xs text-[#6B6475] leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Medical Disclaimer Banner */}
          <div className="p-6 rounded-2xl border border-amber-200 bg-amber-50/60 text-xs text-amber-900 space-y-2">
            <div className="font-bold flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-700" />
              <span>Medical & Clinical Boundaries</span>
            </div>
            <p className="leading-relaxed">
              {BRAND.disclaimer} RITVYA does not provide emergency medical services or clinical diagnoses. Never delay seeking professional medical treatment because of something you read on RITVYA.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
