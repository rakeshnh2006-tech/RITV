"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Stethoscope,
  BookOpen,
  CalendarHeart,
  FileText,
  Lock,
  Globe,
  Sparkles,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { BRAND } from "@/lib/brand";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n/types";

export default function LandingPage() {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is RITVYA a replacement for seeing a doctor?",
      a: "No. RITVYA is designed for health education and care navigation only. It never provides definitive medical diagnoses, clinical treatment plans, or prescription recommendations. We help you understand medical concepts in plain language and prepare targeted questions to discuss with your healthcare provider.",
    },
    {
      q: "How does the Healthcare Safety Layer work?",
      a: "Before any information is shown or processed, a deterministic safety engine evaluates your input for acute clinical red flags (such as sudden severe pelvic pain, heavy hemorrhaging, or chest tightness). If potential emergency indicators are found, educational responses are immediately halted in favor of urgent care guidance and verified emergency contact numbers.",
    },
    {
      q: "Is my personal health data private?",
      a: "Yes. By default, your health diary and tracking entries are stored exclusively within your local device session or in your secure account with Row Level Security (RLS). We never sell your data, use personal health entries for ad targeting, or share sensitive records without explicit consent.",
    },
    {
      q: "Which languages are supported?",
      a: "RITVYA supports eight languages: English, Hindi (हिन्दी), Kannada (ಕನ್ನಡ), Telugu (తెలుగు), Tamil (தமிழ்), Malayalam (മലയാളം), Marathi (मराठी), and Bengali (বাংলা). You can switch your preferred language at any time from the header or settings.",
    },
    {
      q: "Can RITVYA diagnose PCOS?",
      a: "No. PCOS is a complex endocrinological condition requiring clinical evaluation under international standards (such as the Rotterdam criteria), laboratory blood assays, and physical exams by a licensed physician. RITVYA provides evidence-based education on PCOS features and helps you prepare for clinical consultations.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-ambient-mesh text-[#29252F]">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-14 pb-20 lg:pt-24 lg:pb-32">
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#F2EFF8] blur-3xl" />
            <div className="absolute top-60 -left-20 w-80 h-80 rounded-full bg-[#FBE6E3] blur-3xl" />
            <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full bg-[#E4EBE2] blur-3xl opacity-60" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center space-y-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold clay-badge text-[#34213D]">
                <Sparkles className="w-3.5 h-3.5 text-[#E98E83]" />
                <span>{t("hero.badge")}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-[#34213D] leading-tight drop-shadow-xs">
                {t("hero.title")}
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-[#6B6475] leading-relaxed max-w-2xl mx-auto">
                {t("hero.subtitle")}
              </p>

              {/* CTAs */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/app/understand"
                  className="w-full sm:w-auto clay-btn px-8 py-3.5 text-sm font-bold gap-2"
                >
                  <span>{t("hero.ctaPrimary")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto clay-btn-secondary px-7 py-3.5 text-sm font-semibold"
                >
                  {t("hero.ctaSecondary")}
                </a>
              </div>

              {/* Safety notice pill */}
              <div className="pt-4 flex items-center justify-center gap-2">
                <div className="clay-pill px-4 py-1.5 text-xs font-medium text-[#7963A8] gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8EA187]" />
                  <span>{t("hero.safetyNotice")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: HOW IT WORKS */}
        <section id="how-it-works" className="py-24 border-y border-[#E6DFEF]/70 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7963A8] clay-badge px-3 py-1">
                Thoughtful Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#34213D]">
                How RITVYA Guides Your Health Journey
              </h2>
              <p className="text-sm text-[#6B6475]">
                A careful, 4-step workflow designed around medical safety, evidence-grounded education, and clear doctor communication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Describe in Your Words",
                  desc: "Share your symptoms, onset, and sensations naturally in any of our 8 supported Indian languages or English.",
                  icon: Stethoscope,
                },
                {
                  step: "02",
                  title: "Safety Pre-Screening",
                  desc: "Deterministic safety rules evaluate acute red flags before any educational response is formulated.",
                  icon: ShieldCheck,
                },
                {
                  step: "03",
                  title: "Grounded Health Education",
                  desc: "Explore physiological mechanisms, peer-reviewed sources, and thoughtful questions for your clinician.",
                  icon: BookOpen,
                },
                {
                  step: "04",
                  title: "Clinician-Ready Summary",
                  desc: "Compile an organized, user-reviewed summary of observations and questions to share at your doctor's visit.",
                  icon: FileText,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="clay-card p-7 space-y-4 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold font-serif text-[#7963A8]/30">
                        {item.step}
                      </span>
                      <div className="clay-icon w-12 h-12 text-[#7963A8]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-[#34213D]">{item.title}</h3>
                      <p className="text-xs text-[#6B6475] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2: DESCRIBE SYMPTOMS IN YOUR OWN WORDS */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold clay-badge text-[#E98E83]">
                  <span>Non-Diagnostic Guidance</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#34213D]">
                  Describe Your Symptoms Naturally, Without Medical Jargon
                </h2>
                <p className="text-base text-[#6B6475] leading-relaxed">
                  Too often, medical apps force you into rigid checklists or jump to alarming conclusions. RITVYA invites you to express what you are experiencing in ordinary, comfortable language.
                </p>
                <ul className="space-y-3.5 text-sm text-[#29252F]">
                  {[
                    "Plain-language restatement to confirm understanding",
                    "Cautious physiological context with verified citations",
                    "Care-navigation guidance indicating when to see a specialist",
                    "Suggested questions to ask during your consultation",
                  ].map((pt, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="clay-icon w-6 h-6 text-[#8EA187] flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3">
                  <Link
                    href="/app/understand"
                    className="clay-btn px-7 py-3.5 text-sm font-semibold gap-2"
                  >
                    <span>Try Symptom Understanding</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Visual Card Mockup (Glassmorphism + Clay Elements) */}
              <div className="glass-card p-6 sm:p-8 space-y-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-[#E6DFEF]/70 pb-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7963A8]">
                    <Stethoscope className="w-4 h-4" />
                    <span>Sample Educational Output</span>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full clay-badge text-[#8EA187] font-semibold">
                    Safe for Education
                  </span>
                </div>

                <div className="clay-card p-4 text-xs text-[#29252F]">
                  <span className="font-semibold text-[#7963A8] block mb-1">User Query:</span>
                  &quot;My cycles have been 45 to 50 days apart for 4 months, and I notice unexpected facial hair and fatigue.&quot;
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#34213D]">What Medical Literature Explains:</div>
                  <p className="text-xs text-[#6B6475] leading-relaxed">
                    Cycles longer than 35 days reflect ovulatory pauses (oligo-ovulation). In clinical settings, the combination of irregular cycles and signs of androgen sensitivity is often evaluated under the Rotterdam criteria for PCOS, while ruling out thyroid and prolactin variations.
                  </p>
                  <div className="clay-card p-4 text-xs text-[#34213D] space-y-1.5">
                    <span className="font-semibold block text-[#7963A8]">Questions for Your Doctor:</span>
                    <p className="text-[#6B6475]">
                      • &quot;Would a hormonal panel (total/free testosterone, TSH, prolactin) help clarify my cycle timing?&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: EXPLORE PCOS CENTER */}
        <section className="py-24 border-y border-[#E6DFEF]/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7963A8] clay-badge px-3 py-1">
                Evidence-Based Learning
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#34213D]">
                PCOS Learning Center
              </h2>
              <p className="text-sm text-[#6B6475]">
                Clear, medically sound modules curated from WHO, Endocrine Society, and international consensus guidelines — free from shame, fad diets, and false cure promises.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "What is PCOS?",
                  desc: "Understand the endocrine-metabolic mechanisms, follicular biology, and why symptoms differ for every woman.",
                  tag: "Pathophysiology",
                },
                {
                  title: "Cycle & Ovulatory Rhythms",
                  desc: "Why ovulatory pauses happen, why progesterone drops, and how to maintain long-term uterine health.",
                  tag: "Cycles",
                },
                {
                  title: "Metabolic Health & Insulin",
                  desc: "Learn how cellular insulin sensitivity directly impacts androgen production without blaming personal willpower.",
                  tag: "Metabolic Care",
                },
                {
                  title: "Fertility Facts vs. Myths",
                  desc: "Debunking the myth of permanent sterility: explore modern ovulatory support and conception timelines.",
                  tag: "Fertility",
                },
                {
                  title: "Skin, Hair & Androgens",
                  desc: "Compassionate, clinical facts regarding hirsutism, jawline acne, and androgen-receptor sensitivity.",
                  tag: "Dermatology",
                },
                {
                  title: "How Doctors Assess PCOS",
                  desc: "The 3 Rotterdam diagnostic criteria, differential exclusions (TSH, prolactin), and what tests measure.",
                  tag: "Clinical Standards",
                },
              ].map((mod, i) => (
                <div
                  key={i}
                  className="clay-card p-7 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="clay-badge px-3 py-1 text-[11px] font-bold text-[#7963A8]">
                      {mod.tag}
                    </span>
                    <h3 className="text-base font-bold text-[#34213D]">{mod.title}</h3>
                    <p className="text-xs text-[#6B6475] leading-relaxed">{mod.desc}</p>
                  </div>
                  <Link
                    href="/app/pcos"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7963A8] hover:text-[#34213D] transition-colors pt-2"
                  >
                    <span>Read Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 & 5: TRACKING & CLINICIAN SUMMARY */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#7963A8] clay-badge px-3 py-1">
                  Empowered Consultations
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#34213D]">
                  Keep Optional Records & Build Doctor-Ready Summaries
                </h2>
                <p className="text-sm text-[#6B6475] leading-relaxed">
                  Doctor appointments are often brief. RITVYA lets you maintain an optional personal health diary and selectively assemble your timeline, symptom patterns, and questions into a printable summary.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="clay-card p-5 space-y-2.5">
                    <div className="clay-icon-coral w-10 h-10">
                      <CalendarHeart className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-[#34213D]">Optional Tracking</h4>
                    <p className="text-xs text-[#6B6475]">
                      Log cycle dates, energy, mood, and pain scores only when you wish. No artificial data fabrication.
                    </p>
                  </div>
                  <div className="clay-card p-5 space-y-2.5">
                    <div className="clay-icon w-10 h-10 text-[#7963A8]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-[#34213D]">Doctor Summary</h4>
                    <p className="text-xs text-[#6B6475]">
                      Select which entries to share, edit your notes, and export or print directly for your visit.
                    </p>
                  </div>
                </div>
                <div className="pt-3 flex flex-wrap gap-4">
                  <Link
                    href="/app/consultation"
                    className="clay-btn px-6 py-3 text-sm font-semibold gap-2"
                  >
                    <span>Summary Builder</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/app/track"
                    className="clay-btn-secondary px-6 py-3 text-sm font-semibold"
                  >
                    <span>Health Diary</span>
                  </Link>
                </div>
              </div>

              <div className="glass-card p-6 sm:p-8 space-y-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-[#E6DFEF]/70 pb-3">
                  <div className="text-xs font-bold text-[#34213D]">Clinician Summary Preview</div>
                  <span className="text-[10px] clay-badge px-2.5 py-0.5 text-[#6B6475]">User-Reviewed Document</span>
                </div>
                <div className="space-y-3.5 text-xs">
                  <div className="clay-card p-4 space-y-1">
                    <span className="font-semibold text-[#34213D] block">Chief Concern:</span>
                    <p className="text-[#6B6475]">
                      &quot;Irregular cycle frequency (average 42 days) accompanied by pelvic cramping and energy fluctuations.&quot;
                    </p>
                  </div>
                  <div className="clay-card p-4 space-y-1">
                    <span className="font-semibold text-[#34213D] block">Recorded Timeline:</span>
                    <p className="text-[#6B6475]">
                      Last period: 18 days ago • Cramping intensity: 4/10 • 3 recorded cycle entries included.
                    </p>
                  </div>
                  <div className="clay-card p-4 space-y-1">
                    <span className="font-semibold text-[#34213D] block">Questions for Physician:</span>
                    <p className="text-[#6B6475]">
                      1. Should we run an endocrine panel (TSH, free testosterone, HbA1c)?<br />
                      2. Are there lifestyle adjustments suitable for my metabolic goals?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 & 7: SUPPORTED LANGUAGES & PRIVACY */}
        <section className="py-24 border-t border-[#E6DFEF]/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7963A8] clay-badge px-3 py-1">
                Inclusion & Trust
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#34213D]">
                Built for Cultural Sensitivity & Rigorous Privacy
              </h2>
              <p className="text-sm text-[#6B6475]">
                Health information should be accessible in your mother tongue and completely protected under your control.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <div
                  key={lang.code}
                  className="clay-card p-5 text-center cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <div className="text-lg font-bold text-[#34213D]">{lang.nativeName}</div>
                  <div className="text-xs text-[#6B6475] mt-0.5">{lang.name}</div>
                </div>
              ))}
            </div>

            <div className="glass-card p-8 sm:p-10 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="clay-card p-6 space-y-3">
                <div className="clay-icon w-11 h-11 text-[#7963A8]">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#34213D]">Privacy by Design</h4>
                <p className="text-xs text-[#6B6475] leading-relaxed">
                  Your records are isolated by Row Level Security or stored strictly on your local device. No selling of health metrics.
                </p>
              </div>

              <div className="clay-card p-6 space-y-3">
                <div className="clay-icon w-11 h-11 text-[#7963A8]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#34213D]">Safety Layer First</h4>
                <p className="text-xs text-[#6B6475] leading-relaxed">
                  Deterministic medical red flags halt educational responses immediately when urgent or emergency care is warranted.
                </p>
              </div>

              <div className="clay-card p-6 space-y-3">
                <div className="clay-icon w-11 h-11 text-[#7963A8]">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#34213D]">No Shame or Stigma</h4>
                <p className="text-xs text-[#6B6475] leading-relaxed">
                  Respectful, non-judgmental language across menstruation, fertility, hormonal skin, and reproductive wellness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: FAQS */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7963A8] clay-badge px-3 py-1">
                Transparency
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#34213D]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="clay-card overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-[#34213D] hover:bg-[#FAF7FC]/50 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-[#7963A8] transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-[#6B6475] leading-relaxed border-t border-[#F2EFF8]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
