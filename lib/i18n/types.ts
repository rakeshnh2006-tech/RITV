export type SupportedLocale = "en" | "hi" | "kn" | "te" | "ta" | "ml" | "mr" | "bn";

export interface LanguageMeta {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  script: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: "en", name: "English", nativeName: "English", script: "Latin" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", script: "Devanagari" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", script: "Kannada" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", script: "Telugu" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", script: "Tamil" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", script: "Malayalam" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", script: "Devanagari" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", script: "Bengali" },
];

export type TranslationDictionary = Record<string, string>;
