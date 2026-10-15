"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Send,
  Sparkles,
  Trash2,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  User,
  Bot,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { SafetyAssessment } from "@/lib/safety/types";
import { EmergencyModal } from "@/components/safety/EmergencyModal";

interface ChatEntry {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  model?: string;
}

const CHAT_STORAGE_KEY = "ritvya_chat_messages";

export default function ChatPage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [safetyAlert, setSafetyAlert] = useState<SafetyAssessment | null>(null);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What are the most common signs of PCOS?",
    "Why can menstrual cycles become delayed or irregular?",
    "How does cellular insulin resistance affect ovarian hormones?",
    "What specific questions should I ask my gynecologist about my cycle?",
    "How does chronic stress or cortisol impact menstrual rhythm?",
  ];

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        // Welcome intro message
        setMessages([
          {
            id: "welcome_msg",
            role: "assistant",
            content:
              "Welcome to RITVYA Health Education Chat. I am powered by active clinical intelligence grounded in WHO, ACOG, and Monash consensus guidelines. What would you like to explore or understand about your health today?",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            model: "Google Gemini 3.8 Flash",
          },
        ]);
      }
    } catch {}
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMessage: ChatEntry = {
      id: `usr_${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (data.safetyAlert) {
        setSafetyAlert(data.safetyAlert);
        setSafetyModalOpen(true);
      }

      if (data.response) {
        const assistantMessage: ChatEntry = {
          id: `ast_${Date.now()}`,
          role: "assistant",
          content: data.response.content,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          model: data.response.model || "Google Gemini 3.8 Flash",
        };
        const updated = [...newMessages, assistantMessage];
        setMessages(updated);
        try {
          localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updated));
        } catch {}
      }
    } catch (err) {
      console.error("Chat request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear your conversation history?")) {
      setMessages([]);
      try {
        localStorage.removeItem(CHAT_STORAGE_KEY);
      } catch {}
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6DFEF] pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7963A8] uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Supportive Health Education</span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-[#34213D]">
            {t("nav.chat")}
          </h1>
          <p className="text-xs text-[#6B6475]">
            Non-judgmental, evidence-grounded health conversation. Non-diagnostic.
          </p>
        </div>

        <button
          onClick={handleClearHistory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#6B6475] hover:text-red-600 hover:bg-red-50 border border-[#E6DFEF] transition-colors"
          title="Clear chat history"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Safety Notice Banner */}
      <div className="clay-card-coral p-3.5 flex items-center justify-between gap-3 text-xs text-[#6B6475]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#8EA187] flex-shrink-0" />
          <span>Safety Layer active. Acute medical concerns are flagged automatically.</span>
        </div>
        <span className="clay-badge px-2.5 py-0.5 text-[11px] font-bold text-[#7963A8]">Non-Diagnostic</span>
      </div>

      {/* Chat Messages Container (Glassmorphism & Claymorphism) */}
      <div className="glass-card shadow-2xl flex flex-col h-[600px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#FAF7FC]/40">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    isUser ? "clay-btn" : "clay-icon text-[#7963A8]"
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1">
                  <div
                    className={`p-4.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? "clay-btn text-white rounded-tr-xs"
                        : "clay-card text-[#29252F] rounded-tl-xs"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>

                  {/* Message Meta */}
                  <div className={`flex items-center gap-2 text-[10px] text-[#6B6475] ${isUser ? "justify-end" : "justify-start"} px-1`}>
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <span className="clay-badge px-2 py-0.5 text-emerald-800 bg-emerald-50/90 border-emerald-200 font-medium text-[9px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{msg.model || "Google Gemini 3.8 Flash"}</span>
                      </span>
                    )}
                    {!isUser && (
                      <button
                        onClick={() => handleCopyText(msg.id, msg.content)}
                        className="hover:text-[#34213D] transition-colors p-0.5"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-[#8EA187]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 mr-auto">
              <div className="w-9 h-9 clay-icon text-[#7963A8]">
                <Bot className="w-4 h-4" />
              </div>
              <div className="clay-card p-4 flex items-center gap-2 text-xs text-[#6B6475]">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#7963A8]" />
                <span>Formulating calm, evidence-grounded response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Chips Carousel */}
        <div className="p-3 border-t border-[#E6DFEF]/70 bg-white/70 backdrop-blur-md overflow-x-auto">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#6B6475] uppercase whitespace-nowrap pl-1">
              Suggestions:
            </span>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                disabled={loading}
                className="clay-pill px-3 py-1.5 text-xs font-medium text-[#34213D] whitespace-nowrap flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white/80 backdrop-blur-md border-t border-[#E6DFEF]/70">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about menstrual cycles, hormones, or PCOS..."
              className="clay-input flex-1 px-4 py-3 text-xs sm:text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="clay-btn p-3 rounded-2xl disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Safety Interception Modal */}
      <EmergencyModal
        assessment={safetyAlert}
        isOpen={safetyModalOpen}
        onClose={() => setSafetyModalOpen(false)}
      />
    </div>
  );
}
