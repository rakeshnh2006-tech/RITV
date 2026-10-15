"use client";

import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Search,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { PCOS_MODULES, PcosTopicModule } from "@/content/health/pcos";

export default function PcosLearningCenterPage() {
  const { t } = useLanguage();
  const [selectedModule, setSelectedModule] = useState<PcosTopicModule>(PCOS_MODULES[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModules = PCOS_MODULES.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F2EFF8] text-[#7963A8] border border-[#E6DFEF]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Evidence-Based Clinical Education</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#34213D]">
          {t("pcos.title")}
        </h1>
        <p className="text-sm text-[#6B6475] max-w-3xl leading-relaxed">
          {t("pcos.subtitle")} {t("pcos.disclaimer")}
        </p>
      </div>

      {/* Critical Non-Diagnostic Disclaimer Card */}
      <div className="clay-card-coral p-4.5 flex items-start gap-3 text-xs text-amber-950 leading-relaxed border-amber-200">
        <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-900">Medical Notice:</strong> PCOS is an endocrinological variation requiring individualized evaluation by a licensed physician. It cannot be diagnosed through checklists, facial pictures, or automated apps. We do not promote restrictive crash diets, supplements claiming guaranteed hormone cures, or unproven remedies.
        </div>
      </div>

      {/* Search & Topic Selector Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search PCOS topics (e.g. insulin, Rotterdam criteria, cycles, fertility, acne)..."
          className="clay-input w-full pl-10 pr-4 py-3 text-xs sm:text-sm"
        />
        <Search className="w-4 h-4 text-[#6B6475] absolute left-3.5 top-3.5" />
      </div>

      {/* Main Layout: Left Modules List / Right Detailed View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Module Selection List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#6B6475] px-1">
            Curated Modules ({filteredModules.length})
          </div>

          <div className="space-y-3">
            {filteredModules.map((mod) => {
              const isSelected = selectedModule.id === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModule(mod)}
                  className={`w-full text-left p-4.5 rounded-2xl transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? "clay-btn"
                      : "clay-card text-[#29252F]"
                  }`}
                >
                  <div className="space-y-1">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isSelected ? "clay-badge bg-white/20 text-white border-white/20" : "clay-badge text-[#7963A8]"
                      }`}
                    >
                      {mod.badge}
                    </span>
                    <h3 className="text-sm font-bold leading-snug">{mod.title}</h3>
                    <p
                      className={`text-xs line-clamp-2 leading-relaxed ${
                        isSelected ? "text-white/85" : "text-[#6B6475]"
                      }`}
                    >
                      {mod.summary}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 flex-shrink-0 ${
                      isSelected ? "text-white" : "text-[#6B6475]"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Module View (Glass Card) */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-2 border-b border-[#E6DFEF]/70 pb-4">
            <span className="text-xs font-bold text-[#7963A8] uppercase tracking-wider clay-badge px-2.5 py-0.5">
              {selectedModule.badge}
            </span>
            <h2 className="text-2xl font-bold font-serif text-[#34213D] mt-1">
              {selectedModule.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6475] leading-relaxed">
              {selectedModule.summary}
            </p>
          </div>

          {/* Educational Paragraphs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#34213D]">
              Clinical Context & Physiology
            </h4>
            {selectedModule.content.map((p, idx) => (
              <p key={idx} className="text-xs sm:text-sm text-[#29252F] leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Key Clinical Takeaways */}
          <div className="clay-card p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7963A8] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#E98E83]" />
              <span>Key Evidence Takeaways</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#29252F]">
              {selectedModule.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8EA187] flex-shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinician Discussion Points */}
          <div className="clay-card p-5 space-y-3 bg-[#F2EFF8]/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#34213D] flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-[#7963A8]" />
              <span>Questions to Discuss with Your Doctor</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#29252F]">
              {selectedModule.clinicianDiscussionPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#7963A8] font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Evidence Source Citation */}
          <div className="clay-card p-4.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6B6475] block">
                Evidence Source Citation ({selectedModule.evidenceSource.clinicalStatus})
              </span>
              <span className="font-semibold text-[#34213D]">
                {selectedModule.evidenceSource.title}
              </span>
              <div className="text-[11px] text-[#6B6475]">
                {selectedModule.evidenceSource.organization} • Reviewed: {selectedModule.evidenceSource.lastReviewed}
              </div>
            </div>
            <a
              href={selectedModule.evidenceSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold gap-1.5"
            >
              <span>View Guideline</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
