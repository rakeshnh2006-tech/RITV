/**
 * RITVYA Brand Identity and Design Tokens
 * 
 * Official Brand Name: RITVYA
 * Primary Tagline: Ancient Wisdom. Intelligent Care.
 * Secondary Tagline: Understand Your Body. Find Your Next Step.
 */

export const BRAND = {
  name: "RITVYA",
  primaryTagline: "Ancient Wisdom. Intelligent Care.",
  secondaryTagline: "Understand Your Body. Find Your Next Step.",
  description: "A calm, intelligent, multilingual women's health education and care-navigation platform.",
  logoUrl: "/images/ritvya-logo.jpg",
  supportEmail: "ritvyasupport@gmail.com",
  disclaimer: "RITVYA provides health education and care navigation only. It is not a substitute for professional clinical medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for personal medical concerns. In an emergency, contact your local emergency services immediately.",
  palette: {
    plum: "#34213D",
    plumDark: "#24142B",
    plumLight: "#4C3358",
    violet: "#7963A8",
    violetLight: "#9D88C8",
    lavender: "#F2EFF8",
    lavenderSubtle: "#FAF7FC",
    ivory: "#FFFDF9",
    coral: "#E98E83",
    coralLight: "#FBE6E3",
    sage: "#8EA187",
    sageLight: "#E4EBE2",
    textMain: "#29252F",
    textMuted: "#6B6475",
    border: "#E6DFEF",
  },
  emergency: {
    indiaNational: "112",
    indiaAmbulance: "108",
    indiaPregnancyAmbulance: "102",
    indiaWomenHelpline: "1091",
    indiaMentalHealth: "14416 (Tele-MANAS)",
    globalGeneral: "Contact your local emergency number or nearest emergency department immediately.",
  }
} as const;
