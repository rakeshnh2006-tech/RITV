"use client";

import React from "react";
import { AlertTriangle, PhoneCall, Hospital, X, ShieldAlert } from "lucide-react";
import { SafetyAssessment } from "@/lib/safety/types";
import { useLanguage } from "@/lib/i18n/context";

interface EmergencyModalProps {
  assessment: SafetyAssessment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyModal({ assessment, isOpen, onClose }: EmergencyModalProps) {
  const { t } = useLanguage();

  if (!isOpen || !assessment) return null;

  const isCritical = assessment.severity === "EMERGENCY";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl glass-modal border-2 border-red-500 overflow-hidden text-neutral-900 shadow-2xl">
        {/* Header Banner */}
        <div className={`p-6 flex items-start gap-4 ${isCritical ? "bg-linear-to-r from-red-600 to-red-700 text-white" : "bg-linear-to-r from-amber-600 to-amber-700 text-white"}`}>
          <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-xs flex-shrink-0">
            {isCritical ? <ShieldAlert className="w-7 h-7" /> : <AlertTriangle className="w-7 h-7" />}
          </div>
          <div className="flex-1 pr-4">
            <span className="text-xs uppercase font-bold tracking-widest opacity-90">
              Healthcare Safety Layer Alert
            </span>
            <h2 id="emergency-dialog-title" className="text-xl font-bold leading-tight mt-0.5">
              {isCritical ? t("safety.alertTitle") : "Prompt Medical Evaluation Recommended"}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close safety alert"
            className="text-white/80 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-5 max-h-[75vh] overflow-y-auto">
          <div className="clay-card-coral p-5 text-sm text-red-950 leading-relaxed border-red-200">
            <p className="font-bold text-red-800 mb-1">Clinical Safety Rationale:</p>
            <p>{assessment.rationale}</p>
            {assessment.matchedRuleNames.length > 0 && (
              <p className="mt-2 text-xs text-red-700 font-medium">
                Triggered criteria: {assessment.matchedRuleNames.join(" • ")}
              </p>
            )}
          </div>

          {/* Recommended Immediate Actions */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#34213D]">
              Recommended Immediate Actions
            </h3>
            <ul className="space-y-2 text-sm text-neutral-800">
              {assessment.recommendedActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full clay-badge text-red-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Helplines & Numbers */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#34213D]">
              Verified Emergency Contacts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {assessment.emergencyContacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={`tel:${contact.number.split(" ")[0].replace(/[^0-9]/g, "")}`}
                  className="clay-card p-3.5 flex items-center justify-between hover:scale-[1.02] transition-transform group"
                >
                  <div>
                    <div className="text-[11px] font-semibold text-[#6B6475]">{contact.label}</div>
                    <div className="text-base font-bold text-red-600 group-hover:underline">
                      {contact.number}
                    </div>
                  </div>
                  <div className="clay-icon w-9 h-9 text-red-600 group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Limitation reminder */}
          <p className="text-xs text-[#6B6475] italic border-t border-[#E6DFEF]/70 pt-3">
            RITVYA is an educational platform and is not connected to dispatch operators or hospital networks. If you are experiencing an acute emergency, please contact your local emergency services or visit an emergency room immediately without waiting.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#FAF7FC]/80 border-t border-[#E6DFEF]/70 flex flex-wrap justify-end gap-3">
          <button
            onClick={onClose}
            className="clay-btn-secondary px-4 py-2 text-xs font-semibold"
          >
            I Understand & Wish to Review
          </button>
          <a
            href="tel:112"
            className="clay-btn-coral px-5 py-2.5 text-xs font-bold gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Emergency (112)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
